"""RepoRadar refresh: find what is new or changed upstream and write a review report. Read-only; never edits the ledger or any page.

Usage (repository root): python converge/radar_refresh.py [--out converge/receipts/radar-report.md] [--max-queries N]
Uses only the standard library and the public GitHub API (set GITHUB_TOKEN for a higher rate limit; it is never printed).
Three checks:
  1. NEW: popular, recently pushed, openly licensed repositories for each query in converge/radar-queries.json that the ledger does not know.
  2. DRIFT: ledger entries marked adopt, adapt or study that are now archived, renamed or stale (no push for 18 months).
  3. PINS: GitHub Actions pinned in .github/workflows whose latest release tag differs from the pinned comment.
Every candidate still goes through the normal path: read the README, add a ledger entry with a disposition and a reason, then a change request.
Exit 0 always unless the API is unreachable for every request (exit 2), so a weekly job reports instead of failing on noise.
"""
import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://api.github.com"
TOKEN = os.environ.get("GITHUB_TOKEN", "")
STALE_DAYS = 548
calls = {"ok": 0, "fail": 0}


def get(path):
    req = urllib.request.Request(API + path, headers={"Accept": "application/vnd.github+json", "User-Agent": "radar-refresh"})
    if TOKEN:
        req.add_header("Authorization", "Bearer " + TOKEN)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            calls["ok"] += 1
            return json.load(r)
    except Exception:  # any network or decoding failure counts as one failed call
        calls["fail"] += 1
        return None


def days_since(iso):
    try:
        t = datetime.datetime.fromisoformat(iso.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return 99999
    return (datetime.datetime.now(datetime.timezone.utc) - t).days


def main():
    out = "converge/receipts/radar-report.md"
    maxq = 99
    args = sys.argv[1:]
    if "--out" in args and args.index("--out") + 1 < len(args):
        out = args[args.index("--out") + 1]
    if "--max-queries" in args and args.index("--max-queries") + 1 < len(args) and args[args.index("--max-queries") + 1].isdigit():
        maxq = int(args[args.index("--max-queries") + 1])
    full = os.path.realpath(os.path.join(ROOT, out))
    try:
        inside = os.path.commonpath([full, os.path.realpath(ROOT)]) == os.path.realpath(ROOT) and full != os.path.realpath(ROOT) and full.lower().endswith((".md", ".txt"))
    except ValueError:  # another drive
        inside = False
    if not inside or os.path.relpath(full, os.path.realpath(ROOT)).split(os.sep)[0] in (".git", ".github"):
        sys.exit("the report path must stay inside the repository and outside .git and .github, and end in .md or .txt")
    led = json.load(open(os.path.join(ROOT, "converge", "reporadar-ledger.json"), encoding="utf-8"))
    known = {str(e.get("id", "")).lower(): e for e in led["entries"]}
    cfg = json.load(open(os.path.join(ROOT, "converge", "radar-queries.json"), encoding="utf-8"))
    lines = ["# RepoRadar refresh report", "", "Generated %s. Candidates only: nothing here is adopted until it has a ledger entry, a reason and a change request." % datetime.date.today().isoformat(), ""]

    lines += ["## 1. New candidates", ""]
    seen = set()
    q_fail = calls["fail"]
    for q in cfg["queries"][:maxq]:
        if not q.get("q") or not q.get("name"):
            continue
        if calls["ok"] + calls["fail"] > cfg["max_calls"]:
            break
        qs = "%s pushed:>%s stars:>=%d archived:false" % (q["q"], (datetime.date.today() - datetime.timedelta(days=180)).isoformat(), cfg["min_stars"])
        res = get("/search/repositories?" + urllib.parse.urlencode({"q": qs, "sort": "stars", "order": "desc", "per_page": cfg["per_query"]}))
        rows = []
        for r in ((res if isinstance(res, dict) else {}).get("items") or []):
            if not r.get("full_name"):
                continue
            fid = r["full_name"].lower()
            lic = (r.get("license") or {}).get("spdx_id") or "NONE"
            if fid in known or fid in seen or lic in ("NONE", "NOASSERTION"):
                continue
            seen.add(fid)
            rows.append("- %s (%s stars, %s, pushed %s): `%s`" % (r["full_name"], r.get("stargazers_count", "?"), lic, (r.get("pushed_at") or "unknown")[:10], re.sub(r"[`\s]+", " ", str(r.get("description") or ""))[:100]))
        lines += ["### %s (serves: %s)" % (q["name"], q.get("serves", "")), ""] + (rows or ["- none new" if res is not None else "- UNCHECKED: the search call failed (rate limit or network); rerun later"]) + [""]

    lines += ["## 2. Drift in adopted, adapted or studied entries", ""]
    drift = []
    f2 = calls["fail"]
    for e in led["entries"]:
        if calls["ok"] + calls["fail"] > cfg["max_calls"]:
            drift.append("- stopped at the call budget; rerun later")
            break
        if e.get("disposition") not in ("adopt", "adapt", "study") or "/" not in str(e.get("id", "")):
            continue
        r = get("/repos/" + e["id"])
        if r is None:
            continue
        if r.get("archived"):
            drift.append("- %s: archived upstream" % e["id"])
        elif (r.get("full_name") or "").lower() != e["id"].lower():
            drift.append("- %s: renamed to %s" % (e["id"], r.get("full_name")))
        elif days_since(r.get("pushed_at")) > STALE_DAYS:
            drift.append("- %s: no push since %s" % (e["id"], (r.get("pushed_at") or "unknown")[:10]))
        if calls["ok"] + calls["fail"] > cfg["max_calls"]:
            drift.append("- stopped at the call budget; rerun later")
            break
    lines += (drift or ["- none"]) + (["- UNCHECKED: %d lookups failed; the list above may be incomplete" % (calls["fail"] - f2)] if calls["fail"] > f2 else []) + [""]

    lines += ["## 3. Pinned actions", ""]
    pins = []
    f3 = calls["fail"]
    wf = os.path.join(ROOT, ".github", "workflows")
    for name in sorted(os.listdir(wf)) if os.path.isdir(wf) else []:
        for m in re.finditer(r"uses:\s*([\w.-]+/[\w.-]+)@([0-9a-f]{40})\s*#\s*(\S+)", open(os.path.join(wf, name), encoding="utf-8").read()):
            repo, _, tag = m.groups()
            r = get("/repos/%s/releases/latest" % repo)
            if r and r.get("tag_name") and r["tag_name"] != tag:
                pins.append("- %s (%s): pinned `%s`, latest `%s`" % (repo, name, tag, re.sub(r"[`\s]+", " ", str(r["tag_name"]))[:60]))
    lines += (pins or ["- all checked pins match the latest release"]) + (["- UNCHECKED: %d release lookups failed" % (calls["fail"] - f3)] if calls["fail"] > f3 else []) + [""]

    lines += ["API calls: %d ok, %d failed." % (calls["ok"], calls["fail"])]
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8", newline="\n").write("\n".join(lines) + "\n")
    print("wrote %s: %d new candidates, %d drift, %d pin updates, %d calls failed" % (out, len(seen), len(drift), len(pins), calls["fail"]))
    return 2 if calls["ok"] == 0 and calls["fail"] else 0


sys.exit(main())
