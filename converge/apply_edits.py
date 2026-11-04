"""Apply token-efficiency edit proposals with a mechanical fidelity gate. Standard library only.
  python apply_edits.py <proposal.json> [--apply] [--min-saving 0.10]
A proposal is {"file": "<path relative to sources/>", "edits": [{"old", "new", "why"}]}. An edit is accepted only when:
  - "old" occurs exactly once in the file and does not overlap an accepted edit;
  - every section reference (§...), number, backticked term, ALL-CAPS term, file name or path in "old" is still in "new";
  - "new" is at least --min-saving shorter and contains no em or en dash;
  - "old" is not inside an html script or style element.
Without --apply it only reports. --fix-mode accepts edits that add text (definitions, dates) and deletions whose tokens (numbers, `code`, ALL-CAPS terms, file names) all survive elsewhere in the file; a person must read every fix-mode deletion, because a token check is not a fact check. With --apply the original is copied to history/token-pass first."""
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
    return f


def main():
    a = sys.argv[1:]
    prop = json.load(open(a[0], encoding="utf-8"))
    apply = "--apply" in a
    ms = float(a[a.index("--min-saving") + 1]) if "--min-saving" in a else 0.10
    if "--fix-mode" in a:
        ms = -10.0  # fixes may add text; deletions must keep every fact somewhere else in the file
    path = V + prop["file"]
    text = open(path, encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in text else "\n"
    work = text.replace("\r\n", "\n")
    spans = [(m.start(), m.end()) for m in re.finditer(r"<(script|style)\b.*?</\1>", work, flags=re.S | re.I)]
    ok, rejected, taken = [], [], []
    for e in prop["edits"]:
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
                if lost and "--fix-mode" in a and len(new) < len(old) * 0.9:
                    rest, at = "", 0  # what remains once every accepted edit and this one are applied: a fact must survive there
                    for s0, t0, n0 in sorted([(s1, t1, nn) for (s1, t1, nn) in ok] + [(i, j, new)]):
                        rest += work[at:s0] + n0; at = t0
                    lost = lost - facts(rest + work[at:])
                if lost:
                    why = "drops " + ", ".join(sorted(lost)[:4])
        if why:
            rejected.append((why, old[:70].replace("\n", " ")))
        else:
            ok.append((i, j, new)); taken.append((i, j))
    saved = sum((j - i) - len(n) for i, j, n in ok)
    print("%s: %d edits proposed, %d accepted, %d rejected, %d characters saved (%.1f%% of the file)" % (
        prop["file"], len(prop["edits"]), len(ok), len(rejected), saved, 100.0 * saved / max(1, len(work))))
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
