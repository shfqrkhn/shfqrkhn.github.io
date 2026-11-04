"""Converge scan: the executed evidence for Omni 8.4 and 8.7. Standard library only.
  python scan.py [--root <folder>] [--baseline <receipt.json>] [--save <receipt.json>] [--full]
                 [--sections 7,8,10,16] [--manifest <manifest.json>] [--open "<path>=<open defect>"]... [--cap "<path>=<capped claim and lowest rung>"]...
                 [--clear-cap "<path>"]... [--note "<text>"] [--all] [--outcome ASSURED_CONVERGED] [--control]
(--all lists every file per status, not the first 15; --save records the relation index as each item's links, the run number, the
 last FULL run and the notes; --clear-cap removes an inherited cap after a fresh full review.)
Walks the sources (never archive, .git, or a folder named in private-skip.txt), hashes every file by bytes, builds the relation index (wikilinks,
markdown links, file stems named in text; links are symmetric), and computes each item's closure key: own bytes + the content
hashes of every linked item + the manifest entry for the item (claim, sources, environment: anything a script cannot identify)
+ the evaluator (the bytes of this script and omni_check.py) + the text of the named governing Omni sections.
Status per item against the baseline: NEW, CHANGED (own bytes), IMPACT (a neighbour or the key inputs changed), REFRESH (refresh
window, an "as of" date (YYYY-MM-DD, YYYY-MM or Month YYYY) older than the window, a passed "recheck" date in the same forms, or an open defect), CARRIED (same key), REMOVED.
--save writes the receipt of this run; give --outcome ASSURED_CONVERGED only after the run completed, because --baseline refuses any other receipt. --control runs a planted-defect check
that the script itself must flag. Reads no credential or plugin data; sources outside the scanned folder are not seen (cap their claims)."""
import datetime, hashlib, json, os, re, sys, tempfile

SKIP_DIRS = {".obsidian", ".git", "archive", "node_modules", "__pycache__", "receipts", "history"}  # receipts: a run must not hash its own records
TEXT = {".md", ".html", ".json", ".txt", ".css", ".js", ".csv", ".py", ".yml", ".yaml"}
WINDOW_RUNS, WINDOW_DAYS = 4, 90
HERE = os.path.dirname(os.path.abspath(__file__))
MONTHS = {m: i + 1 for i, m in enumerate("january february march april may june july august september october november december".split())}
MONTHS.update({k[:3]: v for k, v in list(MONTHS.items())}); MONTHS["sept"] = 9  # abbreviations: Nov 2025, Sept 2025


def dates_after(label, text):
    """Dates written after a label: YYYY-MM-DD, YYYY-MM, or Month YYYY (the first day of the month is used)."""
    out = []
    label = r"(?<![A-Za-z])" + label
    for m in re.finditer(label + r"[:\s]*(?:by |on |after )?(\d{4})-(\d{2})(?:-(\d{2}))?|" + label + r"[:\s]*(?:by |on |after )?([A-Za-z]+)\.? (\d{4})", text, flags=re.I):
        try:
            if m.group(1):
                out.append(datetime.date(int(m.group(1)), int(m.group(2)), int(m.group(3) or 1)).isoformat())
            elif m.group(4).lower() in MONTHS:
                out.append(datetime.date(int(m.group(5)), MONTHS[m.group(4).lower()], 1).isoformat())
        except ValueError:
            pass
    return out


def private_prefixes():
    """Folder-name prefixes this machine keeps out of every scan, one per line in converge/private-skip.txt (git-ignored)."""
    p = os.path.join(HERE, "private-skip.txt")
    return tuple(x.strip().upper() for x in open(p, encoding="utf-8-sig") if x.strip()) if os.path.exists(p) else ()


PRIVATE = private_prefixes()


def skip(name):
    return name in SKIP_DIRS or (bool(PRIVATE) and name.upper().startswith(PRIVATE))


def h(b):
    return hashlib.sha256(b).hexdigest()[:16]


def evaluator():
    return "scan:" + h(b"".join(open(os.path.join(HERE, n), "rb").read() for n in ("scan.py", "omni_check.py") if os.path.exists(os.path.join(HERE, n))))


def governing(root, sections):
    best = None
    for dp, dn, fn in (x for base in (root, os.path.join(os.path.dirname(HERE), "sources")) for x in os.walk(base)):  # the scanned root, then the repository's sources/method
        dn[:] = [d for d in dn if not skip(d)]
        for f in fn:
            m = re.fullmatch(r"TECH-AINT-Omni-v(\d+)\.(\d+)\.(\d+)\.md", f)
            if m:
                v = tuple(int(x) for x in m.groups())
                if not best or v > best[0]:
                    best = (v, os.path.join(dp, f))
    if not best:
        print("warning: no TECH-AINT-Omni-v*.md found under the root or sources/: the governing-section text is not in the keys")
        return "no-omni"
    text = open(best[1], encoding="utf-8").read()
    parts = re.split(r"(?m)^(?=## \d+\. )", text)
    wanted = {str(x) for x in sections}
    body = "".join(p for p in parts if (re.match(r"## (\d+)\. ", p) or [None, None])[1] in wanted)
    return ".".join(map(str, best[0])) + ":§" + ",".join(sorted(wanted)) + ":" + h(body.encode())


def scan(root, base=None, full=False, sections=(7, 8, 10, 16), manifest=None, opens=None, today=None, caps=None, outcome="UNACCEPTED"):
    today = today or datetime.date.today()
    had_manifest = bool(manifest)
    manifest, opens, caps = manifest or {}, opens or {}, caps or {}
    files, texts = {}, {}
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if not skip(d)]
        for f in fn:
            p = os.path.join(dp, f)
            rel = os.path.relpath(p, root).replace("\\", "/")
            b = open(p, "rb").read()
            files[rel] = h(b)
            if os.path.splitext(f)[1].lower() in TEXT:
                texts[rel] = b.decode("utf-8", "replace")
    byname = {}
    for rel in files:
        byname.setdefault(os.path.splitext(os.path.basename(rel))[0], []).append(rel)
    stems = {}
    for rel in files:
        stems.setdefault(re.sub(r"-v\d+\.\d+\.\d+$", "", os.path.splitext(os.path.basename(rel))[0]), []).append(rel)
    edges = {r: set() for r in files}
    broken = []

    def link(a, targets):
        for t in targets:
            if t != a:
                edges[a].add(t); edges[t].add(a)

    for rel, t in texts.items():
        for stem, rels in stems.items():
            if len(stem) >= 8 and stem in t:
                link(rel, rels)
        body = re.sub(r"```.*?```|`[^`\n]*`", "", t, flags=re.S)
        for w in re.findall(r"\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]", body):
            w = w.strip()
            if not re.fullmatch(r"[^\W_][\w ./()-]{0,120}", w):
                continue
            name = os.path.splitext(os.path.basename(w))[0]
            hit = byname.get(name, []) or [r for r in files if r == w]
            if hit:
                link(rel, hit)
            elif rel.endswith(".md"):
                broken.append("%s -> [[%s]]" % (rel, w))
        for w in re.findall(r"\]\(([^)#\s]+?)(?:#[^)]*)?\)", body):
            if re.match(r"[a-z]+:", w) or w.startswith("#") or not re.fullmatch(r"[\w .%/-]+\.(?:md|html|pdf|png|jpe?g|svg|xlsx|docx|json|txt|csv)", w):
                continue
            tgt = os.path.normpath(os.path.join(os.path.dirname(rel), w)).replace("\\", "/")
            if tgt in files:
                link(rel, [tgt])
            elif rel.endswith(".md") and not w.startswith(("http", "mailto")):
                broken.append("%s -> (%s)" % (rel, w))
    gov, ev = governing(root, sections), evaluator()
    keys = {r: h((files[r] + "|" + "".join(sorted(files[n] for n in edges[r])) + "|" + str(manifest.get(r, "")) + "|" + ev + "|" + gov).encode()) for r in files}
    out = {k: [] for k in ("CARRIED", "NEW", "CHANGED", "IMPACT", "REFRESH", "REMOVED")}
    items = (base or {}).get("items", {})
    cutoff = (today - datetime.timedelta(days=WINDOW_DAYS)).isoformat()
    for r in sorted(files):
        b = items.get(r)
        if full or not b:
            out["NEW" if not b else "CHANGED"].append(r); continue
        t = texts.get(r, "")
        stale = [x for x in dates_after("as of", t) if x < cutoff]
        passed = [x for x in dates_after("recheck", t) if x <= today.isoformat()]
        due = bool(stale or passed or b.get("defect") or b.get("runs", 0) + 1 >= WINDOW_RUNS or (today - datetime.date.fromisoformat(b["reviewed"])).days >= WINDOW_DAYS)
        if b["own"] != files[r]:
            out["CHANGED"].append(r)
        elif b["key"] != keys[r]:
            out["IMPACT"].append(r)
        elif due:
            out["REFRESH"].append(r)
        else:
            out["CARRIED"].append(r)
    out["REMOVED"] = sorted(set(items) - set(files))
    return dict(files=files, keys=keys, out=out, broken=broken, gov=gov, ev=ev, items=items, today=today, opens=opens, caps=caps, outcome=outcome,
                manifest=had_manifest, edges=edges, base=base, full=full, clear=set(), note="")


def receipt(res):
    new, today = {}, res["today"]
    base = res["base"]
    run = 1 if (res["full"] or not base) else base.get("run", 0) + 1
    last_full = today.isoformat() if (res["full"] or not base) else base.get("last_full", base.get("date"))
    for r, own in res["files"].items():
        prev = res["items"].get(r)
        carried = r in res["out"]["CARRIED"]
        runs = prev.get("runs", 0) + 1 if carried else int(res["keys"][r], 16) % WINDOW_RUNS  # staggers refresh dates across items reviewed together
        status = "CARRIED" if carried else ("REFRESHED" if r in res["out"]["REFRESH"] else "REVIEWED")
        new[r] = {"own": own, "key": res["keys"][r], "status": status, "reviewed": prev["reviewed"] if carried else today.isoformat(), "runs": runs,
                  "reviewed_run": prev.get("reviewed_run", 0) if carried else run, "links": sorted(res["edges"][r])}
        if r in res["opens"]:
            new[r]["defect"] = res["opens"][r]
        if r in res["caps"]:
            new[r]["cap"] = res["caps"][r]
        elif prev and prev.get("cap") and not new[r].get("defect") and r not in res["clear"]:
            new[r]["cap"] = prev["cap"]  # a cap is inherited until a run clears it explicitly (--clear-cap)
    return {"date": today.isoformat(), "run": run, "last_full": last_full, "governing": res["gov"], "evaluator": res["ev"], "outcome": res["outcome"],
            "manifest": "present" if res["manifest"] else "absent", "notes": res["note"], "items": new}


def control():
    """Planted-defect check: a dangling link, a changed neighbour and a stale 'as of' date must each be flagged."""
    d = tempfile.mkdtemp()
    os.makedirs(os.path.join(d, "TECH"))
    w = lambda n, t: open(os.path.join(d, n), "w", encoding="utf-8").write(t)
    w("alpha-notes.md", "See [[beta-notes]] and [[missing-note]]. Rate as of 2020-01-01.\n")
    w("beta-notes.md", "Beta v1.\n")
    first = scan(d, today=datetime.date(2026, 1, 1))
    base = receipt(first)
    w("beta-notes.md", "Beta v2 changed.\n")
    second = scan(d, base=base, today=datetime.date(2026, 1, 2))
    ok = (any("missing-note" in x for x in first["broken"]) and "beta-notes.md" in second["out"]["CHANGED"]
          and "alpha-notes.md" in second["out"]["IMPACT"] and "alpha-notes.md" not in second["out"]["CARRIED"])
    stale = scan(d, base=receipt(scan(d, today=datetime.date(2026, 1, 1))), today=datetime.date(2026, 1, 2))
    ok = ok and "alpha-notes.md" in stale["out"]["REFRESH"]
    w("alpha-notes.md", "See [[beta-notes]]. Price as of March 2020.\n")
    ok = ok and "alpha-notes.md" in scan(d, base=receipt(scan(d, today=datetime.date(2026, 1, 1))), today=datetime.date(2026, 1, 2))["out"]["REFRESH"]
    ok = ok and dates_after("recheck", "recheck: 2020-02-01") == ["2020-02-01"]
    print("control: dangling link, changed neighbour and stale 'as of' date %s" % ("all flagged" if ok else "NOT all flagged"))
    return 0 if ok else 1


def main():
    a = sys.argv[1:]
    if "--control" in a:
        sys.exit(control())
    known = {"--root", "--baseline", "--save", "--full", "--all", "--sections", "--manifest", "--open", "--cap", "--clear-cap", "--note", "--outcome", "--control"}
    bad = [x for x in a if x.startswith("--") and x not in known]
    if bad:
        print("error: unknown flag(s): " + ", ".join(bad)); sys.exit(2)
    opt = lambda k, d=None: a[a.index(k) + 1] if k in a and a.index(k) + 1 < len(a) else d
    home = os.path.dirname(HERE)
    root = opt("--root", os.path.join(home, "sources"))
    bp = opt("--baseline")
    if bp and not os.path.exists(bp):
        print("no baseline file at %s: every item is UNKNOWN" % bp); bp = None
    base = json.load(open(bp, encoding="utf-8")) if bp else None
    if base and base.get("outcome") != "ASSURED_CONVERGED":
        print("baseline refused: its outcome is %s, not ASSURED_CONVERGED; every item is UNKNOWN" % base.get("outcome")); base = None
    manifest = json.load(open(opt("--manifest"), encoding="utf-8")) if opt("--manifest") else None
    bad_pairs = [x for i, x in enumerate(a) if i and a[i - 1] in ("--open", "--cap") and "=" not in x]
    if bad_pairs:
        print("error: --open and --cap need \"<path>=<text>\": " + ", ".join(bad_pairs)); sys.exit(2)
    opens = dict(x.split("=", 1) for i, x in enumerate(a) if i and a[i - 1] == "--open")
    caps = dict(x.split("=", 1) for i, x in enumerate(a) if i and a[i - 1] == "--cap")
    sections = [int(x) for x in opt("--sections", "7,8,10,16").split(",")]
    if not os.path.isdir(root):
        print("error: the folder to scan does not exist: " + root); sys.exit(2)
    res = scan(root, base, "--full" in a, sections, manifest, opens, caps=caps, outcome=opt("--outcome", "UNACCEPTED"))
    res["clear"] = {x for i, x in enumerate(a) if i and a[i - 1] == "--clear-cap"}
    res["note"] = opt("--note", "")
    unknown = [p for p in list(opens) + list(caps) + list(res["clear"]) if p not in res["files"]]
    if unknown:
        print("error: --open or --cap names a path scan.py does not list (use the sources-relative path with forward slashes): " + ", ".join(unknown)); sys.exit(2)
    if not res["files"]:
        print("error: no file found under " + root); sys.exit(2)
    print("governing: %s  evaluator: %s  files: %d" % (res["gov"], res["ev"], len(res["files"])))
    if not manifest:
        print("manifest absent: claims, sources and environment are not in the keys; carried claims are capped to the sources bytes seen")
    for k, v in res["out"].items():
        print("%-8s %d" % (k, len(v)))
        for r in (v if "--all" in a else v[:15] if k != "CARRIED" else []):
            print("   " + r)
    print("broken links: %d" % len(res["broken"]))
    for b in res["broken"][:15]:
        print("   " + b)
    o = res["out"]
    n = len(o["NEW"]) + len(o["CHANGED"]) + len(o["IMPACT"]) + len(o["REFRESH"])
    print("review in full: %d of %d (carried %d); this is run %d since the last FULL run" % (n, len(res["files"]), len(o["CARRIED"]), 1 if ("--full" in a or not base) else base.get("run", 0) + 1))
    if opt("--save"):
        json.dump(receipt(res), open(opt("--save"), "w", encoding="utf-8"), indent=0)
        print("saved", opt("--save"))


if __name__ == "__main__":
    main()
