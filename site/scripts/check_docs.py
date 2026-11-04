"""Documentation gate. Standard library only. Run from anywhere: python site/scripts/check_docs.py

The repository documents must be high signal and low noise, cheap to read and cheap for an AI to load:
  - no filler phrases, no em or en dashes, no emoji
  - DRY: no sentence of 10 or more words appears twice (one rule, one home)
  - readable: Flesch-Kincaid grade and average sentence length stay under a limit per document
  - structure: one H1 first, no skipped heading levels, every code fence names its language
  - token budget: each document stays under its size budget (raise a budget on purpose, in this file)
Errors fail the check.
"""
import os, re, sys

HOME = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# document: (max bytes, max Flesch-Kincaid grade, max average sentence length in words)
DOCS = {
    "README.md": (6_000, 10, 18),
    "AGENTS.md": (4_500, 10, 18),
    "CONTRIBUTING.md": (1_500, 10, 18),
    "SECURITY.md": (2_500, 11, 20),
    "docs/PRIVACY.md": (3_500, 10, 18),
    "docs/FRAMEWORK.md": (50_000, 12, 22),
}
FILLER = ("in order to", "it is important to note", "please note", "basically", "obviously", "needless to say", "it should be noted",
          "due to the fact", "at this point in time", "a number of", "as a matter of fact", "it goes without saying", "needless")
EMOJI = re.compile("[\U0001F000-\U0001FAFF☀-➿⬀-⯿\ufe0f]")
errors = []


def prose(text):
    """The text a person reads: no code, tables, comments, inline code or link targets."""
    t = re.sub(r"```.*?```", "", text, flags=re.S)
    t = re.sub(r"<!--.*?-->", "", t, flags=re.S)
    t = re.sub(r"^\|.*$", "", t, flags=re.M)
    t = re.sub(r"`[^`\n]*`", "x", t)
    t = re.sub(r"\]\([^)]*\)", "]", t)
    return t


def sentences(t):
    return [s.strip(" -*#>") for s in re.split(r"(?<=[.!?])\s+|\n+", t) if len(s.split()) >= 3]


def syllables(w):
    w = w.lower()
    n = len(re.findall(r"[aeiouy]+", w))
    if w.endswith("e") and n > 1:
        n -= 1
    return max(n, 1)


def grade(t):
    words = re.findall(r"[A-Za-z']+", t)
    sents = sentences(t)
    if not words or not sents:
        return 0.0, 0.0
    avg = len(words) / len(sents)
    return 0.39 * avg + 11.8 * sum(syllables(w) for w in words) / len(words) - 15.59, avg


def main():
    seen = {}
    for rel, (budget, max_grade, max_avg) in DOCS.items():
        path = os.path.join(HOME, *rel.split("/"))
        if not os.path.exists(path):
            errors.append("%s: the document is missing (update the list in check_docs.py if it moved)" % rel)
            continue
        raw = open(path, encoding="utf-8").read()
        low = raw.lower()
        if len(raw.encode("utf-8")) > budget:
            errors.append("%s: %d bytes is over its %d byte budget (cut text, or raise the budget in check_docs.py on purpose)" % (rel, len(raw.encode("utf-8")), budget))
        for f in FILLER:
            if f in low:
                errors.append("%s: filler phrase '%s' (say it shorter)" % (rel, f))
        if re.search("[–—]", raw):
            errors.append("%s: em or en dash (house style)" % rel)
        if EMOJI.search(raw):
            errors.append("%s: emoji (house style)" % rel)
        g, avg = grade(prose(raw))
        if g > max_grade:
            errors.append("%s: reading grade %.1f is over %d (shorter sentences, plainer words)" % (rel, g, max_grade))
        if avg > max_avg:
            errors.append("%s: average sentence is %.1f words, over %d" % (rel, avg, max_avg))
        level, fence, first = 0, False, True
        for n, line in enumerate(raw.split("\n"), 1):
            if line.startswith("```"):
                if not fence and line.strip() == "```":
                    errors.append("%s:%d: code fence without a language" % (rel, n))
                fence = not fence
                continue
            if fence:
                continue
            m = re.match(r"(#{1,6}) ", line)
            if m:
                lv = len(m.group(1))
                if first and lv != 1:
                    errors.append("%s:%d: the first heading must be H1" % (rel, n))
                if not first and lv == 1:
                    errors.append("%s:%d: a second H1" % (rel, n))
                if level and lv > level + 1:
                    errors.append("%s:%d: heading jumps from H%d to H%d" % (rel, n, level, lv))
                level, first = lv, False
            if line != line.rstrip():
                errors.append("%s:%d: trailing whitespace" % (rel, n))
        for s in sentences(prose(raw)):
            if len(s.split()) >= 10:
                seen.setdefault(re.sub(r"\s+", " ", s.lower()), []).append(rel)
    for s, where in seen.items():
        if len(where) > 1:
            errors.append("DRY: one sentence appears %d times (%s): %s" % (len(where), ", ".join(sorted(set(where))), s[:80]))
    if errors:
        print("docs gate: %d problem(s)" % len(errors))
        for e in errors[:40]:
            print("  FAIL " + e)
        sys.exit(1)
    print("docs gate: OK (%d documents)" % len(DOCS))


if __name__ == "__main__":
    main()
