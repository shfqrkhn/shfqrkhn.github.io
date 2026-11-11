"""CR-v23 checker: identity, registry, ledger and shared-engine consistency. Read-only; writes one receipt.

Usage (from the repository root): python converge/v23_check.py [--save converge/receipts/v23-execution.json]
Exit 0 when no check fails. Results are PASS, FAIL or NOT_RUN; this script never builds, installs or publishes.
"""
import collections
import glob
import hashlib
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
res = {}


def sha(p):
    return hashlib.sha256(open(p, "rb").read()).hexdigest()


def rec(key, ok, note=""):
    res[key] = {"outcome": "PASS" if ok else "FAIL", "note": note}
    print(("PASS " if ok else "FAIL ") + key + (": " + note if note else ""))


def git(*a):
    try:
        return subprocess.run(["git", *a], cwd=ROOT, capture_output=True, text=True).stdout.strip()
    except OSError:
        return ""


# CR-1 identity
reg_p = os.path.join(ROOT, "builder", "registry.json")
led_p = os.path.join(ROOT, "converge", "reporadar-ledger.json")
ident = {"brief_v23_sha256": "550acb73f53cfa20a23f692bc410fea7bf0cca91bd8649de32adfa779e42447b", "head": git("rev-parse", "HEAD"), "dirty": bool(git("status", "--short")), "python": sys.version.split()[0],
         "registry_sha256": sha(reg_p), "ledger_sha256": sha(led_p)}
try:
    import playwright  # noqa: F401
    from importlib.metadata import version
    ident["playwright"] = version("playwright")
except Exception:
    ident["playwright"] = "NOT_RUN: not installed"
h = hashlib.sha256()
for dp, dn, fn in os.walk(os.path.join(ROOT, "site")):
    dn[:] = sorted(d for d in dn if d not in ("__pycache__", ".git"))
    for f in sorted(fn):
        full = os.path.join(dp, f)
        h.update((os.path.relpath(full, ROOT).replace(os.sep, "/") + "\0" + sha(full) + "\n").encode())
ident["site_tree_sha256"] = h.hexdigest()
h2 = hashlib.sha256()
for dp, dn, fn in os.walk(os.path.join(ROOT, "sources")):
    dn[:] = sorted(dn)
    for f in sorted(fn):
        full = os.path.join(dp, f)
        h2.update((os.path.relpath(full, ROOT).replace(os.sep, "/") + "\0" + sha(full) + "\n").encode())
ident["sources_tree_sha256"] = h2.hexdigest()
print(json.dumps(ident, indent=1))
rec("CR-1 identity", bool(ident["head"]), "HEAD " + ident["head"][:7] + (" (working tree has changes)" if ident["dirty"] else ""))

# CR-2 registry against output
pages = json.load(open(reg_p, encoding="utf-8"))["pages"]
apps = [p for p in pages if p["kind"] == "apps"]
arch = [p for p in pages if p.get("archived")]
missing = [p["slug"] for p in pages if not os.path.isfile(os.path.join(ROOT, "site", p["kind"], p["slug"], "index.html"))]
ids = [p["id"] for p in pages]
rec("CR-2 registry", not missing and len(ids) == len(set(ids)) and len(pages) == 41 and len(arch) == 8, "%d pages (%d by kind apps), %d archived, %d missing output, ids unique=%s" % (len(pages), len(apps), len(arch), len(missing), len(ids) == len(set(ids))))

# CR-3 ledger
led = json.load(open(led_p, encoding="utf-8"))
ents = led["entries"]
lid = [e["id"] for e in ents]
cnt = collections.Counter(e["disposition"] for e in ents)
rec("CR-3 ledger", len(ents) == 523 and len(lid) == len(set(lid)) and dict(cnt) == led["counts"],
    "%d entries, ids unique=%s, counts match header=%s" % (len(ents), len(lid) == len(set(lid)), dict(cnt) == led["counts"]))

# CR-4 shared study engine
bad, n, engines, mids = [], 0, set(), []
for p in pages:
    f = os.path.join(ROOT, "site", p["kind"], p["slug"], "index.html")
    if not os.path.isfile(f):
        continue
    t = open(f, encoding="utf-8").read()
    m = re.search(r'<template data-kd="base">(.*?)</template>', t, re.S)
    if not m:
        continue
    n += 1
    engines.update(re.findall(r"kd-app/[\d.]+", t))
    try:
        d = json.loads(m.group(1))
    except ValueError:
        d = None
    if not isinstance(d, dict) or not isinstance(d.get("meta"), dict) or not d["meta"].get("id") or not isinstance(d.get("levels"), list):
        bad.append(p["slug"] + ": data block is not a JSON object with meta.id and levels")
        continue
    mids.append(d.get("meta", {}).get("id"))
    chapters = [c for lv in d["levels"] if isinstance(lv, dict) for c in lv.get("chapters", []) if isinstance(c, dict)]
    if any(not c.get("id") for c in chapters):
        bad.append(p["slug"] + ": chapter without an id")
    cids = [c.get("id") for c in chapters]
    if len(cids) != len(set(cids)):
        bad.append(p["slug"] + ": duplicate chapter id")
    acts = [a for a in d.get("activities", []) if isinstance(a, dict)]
    aids = [a.get("id") for a in acts]
    if len(aids) != len(set(aids)):
        bad.append(p["slug"] + ": duplicate activity id")
    for a in acts:
        for c in a.get("claims", []):
            cid, _, ix = str(c).partition(":")  # a claim is a chapter id, optionally ":n" for its n-th check question
            ch = next((x for x in chapters if x.get("id") == cid), None)
            if ch is None or (ix and (not (ix.isascii() and ix.isdigit()) or int(ix) >= len(ch.get("check", [])))):
                bad.append("%s: activity %s claims unknown chapter or question %s" % (p["slug"], a.get("id"), c))
    sids = {s.get("id") for s in d.get("sources", [])}
    for c in chapters:
        for s in c.get("src", []):
            if s not in sids:
                bad.append("%s: chapter %s cites unknown source %s" % (p["slug"], c.get("id"), s))
        for q in c.get("check", []):
            if not isinstance(q, dict) or not str(q.get("q", "")).strip() or not str(q.get("a", "")).strip():
                bad.append("%s: chapter %s has an empty question or answer" % (p["slug"], c.get("id")))
if len(set(mids)) != len(mids):
    bad.append("duplicate meta.id across readers")
rec("CR-4 shared engine", not bad and n == 19 and len(engines) == 1,
    "%d readers, engine %s, %d problems %s" % (n, sorted(engines), len(bad), bad[:5]))

siteonly = [q for q in glob.glob(os.path.join(ROOT, "site", "*", "*", "index.html")) if os.path.relpath(os.path.dirname(q), os.path.join(ROOT, "site")).replace(os.sep, "/") not in {x["kind"] + "/" + x["slug"] for x in pages}]
rec("CR-2b output not in registry", not siteonly, "%d extra pages %s" % (len(siteonly), siteonly[:3]))
goals_p = os.path.join(ROOT, "converge", "app-goals.json")
gids = [a.get("id") for a in json.load(open(goals_p, encoding="utf-8")).get("apps", [])] if os.path.exists(goals_p) else []
gmiss = sorted(set(ids) - set(gids))
rec("CR-24-7 every page has a goal row", not gmiss and len(gids) == len(set(gids)), "%d goal rows, %d pages missing %s" % (len(gids), len(gmiss), gmiss[:3]))
rm_p = os.path.join(ROOT, "converge", "resource-map.json")
rm = json.load(open(rm_p, encoding="utf-8")) if os.path.exists(rm_p) else {}
led_ids = {str(e.get("id", "")).lower() for e in json.load(open(os.path.join(ROOT, "converge", "reporadar-ledger.json"), encoding="utf-8")).get("entries", [])}
rm_bad = [r.get("id") for r in rm.get("rows", []) if str(r.get("id", "")).lower() not in led_ids or r.get("role") not in rm.get("roles", []) or r.get("result") not in rm.get("results", [])]
rec("CR-24-2 resource map", bool(rm.get("rows")) and not rm_bad, "%d rows, %d not in the ledger or with a bad role or result %s" % (len(rm.get("rows", [])), len(rm_bad), rm_bad[:3]))
out = {"identity": ident, "results": res, "not_run": ["CR-5 gates and CR-6 offline update are recorded by their own runs", "A08 to A40 depth reviews", "domain answers against primary sources", "rights checks"]}
if "--save" in sys.argv:
    p = sys.argv[sys.argv.index("--save") + 1] if sys.argv.index("--save") + 1 < len(sys.argv) else "converge/receipts/v23-execution.json"
    assert not os.path.isabs(p) and ".." not in p.replace(os.sep, "/").split("/"), "the receipt path must stay inside the repository"
    os.makedirs(os.path.dirname(os.path.join(ROOT, p)), exist_ok=True)
    full = os.path.join(ROOT, p)
    old = json.load(open(full, encoding="utf-8")) if os.path.isfile(full) else {"results": {}}
    old["results"].update(out["results"])  # keep the CR-5 to CR-7 rows written by other runs
    old["identity"], old["not_run"] = out["identity"], out["not_run"]
    json.dump(old, open(full, "w", encoding="utf-8"), indent=1)
sys.exit(1 if any(v["outcome"] == "FAIL" for v in res.values()) else 0)
