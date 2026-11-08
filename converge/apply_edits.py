"""Apply token-efficiency edit proposals with a mechanical fidelity gate. Standard library only.
  python apply_edits.py <proposal.json> [--apply] [--fix-mode] [--min-saving 0.10]
A proposal is {"file": "<path relative to sources/>", "edits": [{"old", "new", "why"}]}. An edit is accepted only when:
  - "old" occurs exactly once in the file and does not overlap an accepted edit;
  - every section reference (§...), number, backticked term, ALL-CAPS term, file name or path in "old" is still in "new";
  - "new" is at least --min-saving shorter and contains no em or en dash;
  - "old" is not inside an html script or style element.
Negations and modals (never, not, no, must, may, only, always ...) must survive in the same order; the accepted edits are printed and a person must read them, because no script proves that meaning is kept. A proposal naming an excluded path (ADIS, FinTrak, archive, hidden tool folders, trailing-dot forms) is refused before the file is opened. Without --apply it only reports. --control checks that the gate rejects planted bad edits. --fix-mode accepts edits that add text (definitions, dates) and deletions whose tokens (numbers, `code`, ALL-CAPS terms, file names) all survive elsewhere in the file; a person must read every fix-mode deletion, because a token check is not a fact check. With --apply the original is copied to history/token-pass first."""
import json, os, re, shutil, sys

_H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = os.path.join(_H, "sources").replace("\\", "/") + "/"
ARCH = os.path.join(_H, "history", "token-pass").replace("\\", "/") + "/"


def facts(t):
    f = set(re.findall(r"§\s?\d+(?:\.\d+)*", t))
    f |= set(re.findall(r"\d+(?:[.,:/-]\d+)*", t))
    f |= set(re.findall(r"`[^`\n]+`", t))
    f |= set(re.findall(r"\b[A-Z][A-Z0-9_]{2,}\b", t))
    f |= set(re.findall(r"[\w./\\-]+\.(?:md|html|json|py|js|css|txt)\b", t))
    f |= {"w:" + w.lower() for w in re.findall(r"\b(?:never|not|no|nor|cannot|without|must|may|only|always|unless|except|forbidden|required)\b", t, flags=re.I)}  # a negation or modal may not be dropped
    return f


def modals(t):
    """The negations and modals in order: swapping them changes the meaning, so the order must survive."""
    return [w.lower() for w in re.findall(r"\b(?:never|not|no|nor|cannot|without|must|may|only|always|unless|except|forbidden|required)\b", t, flags=re.I)]


def numbers(t):
    return re.findall(r"\d+(?:[.,:/-]\d+)*", t)


def excluded(rel):
    """True when a path component names an excluded folder or file (ADIS*, a FinTrak name, .obsidian, .git, archive, .claude, 99-ARCV)."""
    for c in re.split(r"[\/]+", rel):
        c = c.rstrip(". ")  # Windows ignores trailing dots and spaces when it opens a path
        u = c.upper()
        if c.lower() in {".obsidian", ".git", "archive", "99-arcv", ".claude", "history", "receipts"} or u.startswith("ADIS") or "FINTRAK" in u or c == "..":
            return True
    return False


def judge(work, edits, ms, fix):
    """The gate: (accepted (start, end, new) spans, rejected (why, old) pairs) for edits against the LF text."""
    spans = [(m.start(), m.end()) for m in re.finditer(r"<(script|style)\b.*?</\1>", work, flags=re.S | re.I)]
    ok, rejected, taken = [], [], []
    for e in edits:
        old, new = e.get("old", ""), e.get("new", "")
        why = None
        if len(old) < 30 or old == new:
            why = "trivial"
        elif work.count(old) != 1:
            why = "old found %d times" % work.count(old)
        else:
            i = work.index(old); j = i + len(old)
            if any(s < j and i < t for s, t in spans):
                why = "inside script or style"
            elif any(s < j and i < t for s, t in taken):
                why = "overlaps an accepted edit"
            elif re.search("[\u2013\u2014]", new):
                why = "dash in new text"
            elif len(new) > len(old) * (1 - ms):
                why = "saving under %d%%" % int(ms * 100)
            else:
                lost = facts(old) - facts(new)
                keep_o, keep_n = set(numbers(old)), set(numbers(new))
                order = set()  # order checks never take the fix-mode survival rescue below
                if modals(old) != modals(new):
                    order.add("negation or modal order")
                if [n for n in numbers(old) if n in keep_n] != [n for n in numbers(new) if n in keep_o]:
                    order.add("number order")
                if lost and fix and len(new) < len(old) * 0.9:
                    rest, at = "", 0  # what remains once every accepted edit and this one are applied: a fact must survive there
                    for s0, t0, n0 in sorted([(s1, t1, nn) for (s1, t1, nn) in ok] + [(i, j, new)]):
                        rest += work[at:s0] + n0; at = t0
                    lost = lost - facts(rest + work[at:])
                lost = lost | order
                if lost:
                    why = "drops " + ", ".join(sorted(lost)[:4])
        if why:
            rejected.append((why, old[:70].replace("\n", " ")))
        else:
            ok.append((i, j, new)); taken.append((i, j))
    return ok, rejected


def control():
    work = "Run three passes under \u00a78.4 with scan.py and keep the CARRIED items as they are today.\n"
    bad = [{"old": "Run three passes under \u00a78.4 with scan.py", "new": "Run passes with the script"},  # drops a section, a file name
           {"old": "keep the CARRIED items as they are today.", "new": "keep the items."},  # drops an ALL-CAPS term
           {"old": "Run three passes under \u00a78.4 with scan.py and keep", "new": "Run \u00a78.4 scan.py \u2014 keep"}]  # dash
    bad += [{"old": "Never write outside the vault under §8.4 for 3 runs, and keep every CARRIED record.", "new": "Write outside the vault under §8.4 for 3 runs, keep CARRIED records."},  # drops a negation
            {"old": "Use no more than 5 passes and at least 2 reviewers, as stated in the framework text.", "new": "Use no more than 2 passes and at least 5 reviewers."}]  # swaps numbers
    bad += [{"old": "Never delete the file report.md under §8.4; always keep the copy in 3 places.", "new": "Always delete report.md §8.4; never keep copy 3."}]  # swaps polarity
    good = [{"old": "keep the CARRIED items as they are today.", "new": "keep CARRIED items."}]
    ok_bad, _ = judge(work, bad, 0.10, False)
    ok_good, _ = judge(work, good, 0.10, False)
    passed = not ok_bad and len(ok_good) == 1
    print("control: planted bad edits %s, a good edit %s" % ("all rejected" if not ok_bad else "NOT all rejected", "accepted" if len(ok_good) == 1 else "NOT accepted"))
    return 0 if passed else 1


def main():
    a = sys.argv[1:]
    if "--control" in a:
        sys.exit(control())
    if not a:
        sys.exit("usage: python apply_edits.py <proposal.json> [--apply] [--fix-mode] [--min-saving 0.10] | --control")
    try:
        prop = json.load(open(a[0], encoding="utf-8"))
    except (OSError, ValueError) as e:
        sys.exit("error: cannot read the proposal: %s" % e.__class__.__name__)
    if not isinstance(prop, dict) or not isinstance(prop.get("file"), str) or not isinstance(prop.get("edits"), list):
        sys.exit("error: the proposal must be {\"file\": \"<path under sources/>\", \"edits\": [...]}")
    apply = "--apply" in a
    ms = float(a[a.index("--min-saving") + 1]) if "--min-saving" in a else 0.10
    if "--fix-mode" in a:
        ms = -10.0  # fixes may add text; deletions must keep every fact somewhere else in the file
    if excluded(prop["file"]) or excluded(os.path.relpath(os.path.realpath(V + prop["file"]), os.path.realpath(V.rstrip("/")))):
        sys.exit("refused: the proposal names an excluded path (ADIS, FinTrak, archive or a hidden tool folder): the file is not opened")
    path = V + prop["file"]
    if not os.path.realpath(path).startswith(os.path.realpath(V.rstrip("/")) + os.sep):
        sys.exit("refused: the proposal names a file outside sources/: " + prop["file"])
    if not os.path.isfile(path):
        sys.exit("error: no such file under sources/: " + prop["file"])
    text = open(path, encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in text else "\n"
    work = text.replace("\r\n", "\n")
    ok, rejected = judge(work, prop["edits"], ms, "--fix-mode" in a)
    saved = sum((j - i) - len(n) for i, j, n in ok)
    print("%s: %d edits proposed, %d accepted, %d rejected, %d characters saved (%.1f%% of the file)" % (
        prop["file"], len(prop["edits"]), len(ok), len(rejected), saved, 100.0 * saved / max(1, len(work))))
    for i, j, n in sorted(ok):  # every accepted edit, in full: what is printed is exactly what --apply writes
        print("  accepted: %s  ->  %s" % (work[i:j].replace(chr(10), " "), n.replace(chr(10), " ")))
    for why, o in rejected[:12]:
        print("  rejected (%s): %s" % (why, o))
    if apply and ok:
        os.makedirs(ARCH, exist_ok=True)
        dst = ARCH + os.path.basename(path)
        if not os.path.exists(dst):
            shutil.copy2(path, dst)
        out = work
        for i, j, n in sorted(ok, reverse=True):
            out = out[:i] + n + out[j:]
        open(path, "w", encoding="utf-8", newline="").write(out.replace("\n", nl))
        print("  applied; original kept at " + dst)


if __name__ == "__main__":
    main()
