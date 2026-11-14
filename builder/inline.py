"""Source inlining shared by build.py and preview.py: the study-reader engine marker and the kit-core markers."""
import os, re
from paths import OUT, V, csp_hash


ENGINE_MARK = re.compile(rb"<script>\n@@KD-ENGINE ([A-Za-z0-9.+-]+)@@\n</script>")


def inline_engine(raw, what=""):
    """Study readers keep one shared program in sources/engine/ENGN-KD-<name>.js. A source holds a marker where the program goes;
    the build puts the program back and recomputes the script pin, so the published page is the same as one with the program written out.
    A source without a marker passes through unchanged."""
    m = ENGINE_MARK.search(raw)
    if not m:
        assert b"@@KD-ENGINE" not in raw, ("malformed engine marker", what)
        return raw
    path = os.path.join(V, "engine", "ENGN-KD-" + m.group(1).decode() + ".js")
    assert os.path.isfile(path), ("engine file not found", what, path)
    body = open(path, "rb").read()
    assert b"</script" not in body.lower(), ("engine text would end the script early", path)
    out = raw[:m.start()] + b"<script>\n" + body + b"\n</script>" + raw[m.end():]
    assert out.count(b"<script>") == 1 and b"@@KD-ENGINE" not in out, ("a reader must hold one inline script", what)
    pin = csp_hash(b"\n" + body + b"\n").encode()
    sm = re.search(rb"script-src[^;]*?'sha256-[A-Za-z0-9+/=]+'", out)
    assert sm, ("script-src pin not found", what)
    head = re.sub(rb"'sha256-[A-Za-z0-9+/=]+'", b"'" + pin + b"'", sm.group(0))
    return out[:sm.start()] + head + out[sm.end():]


KIT_MARKS = (b"/* @@OMNEVUM-KIT-TOKENS@@ */", b"/* @@OMNEVUM-KIT-PREFS@@ */")


def kit_core():
    """The two shared parts of every app's kit block, taken from site/scripts/ui.css: the look tokens (first rules) and the
    user-preference rules (reduced motion, reduced transparency, more contrast). Comments are dropped."""
    css = re.sub(r"/\*.*?\*/", "", open(os.path.join(OUT, "scripts", "ui.css"), encoding="utf-8").read(), flags=re.S).replace("\r\n", "\n")
    lines = [l for l in css.split("\n") if l.strip()]
    toks, prefs, i = [], [], 0
    while not lines[i].startswith(":root[data-app]"):
        toks.append(lines[i]); i += 1
    prefs = [l for l in lines if l.startswith(("@media(prefers-reduced-motion:reduce)", "@media(prefers-reduced-transparency", "@media(prefers-contrast:more)"))]
    assert toks[0].startswith(":root{") and len(prefs) == 3, "ui.css layout changed: update kit_core"
    return "\n".join(toks).encode(), "\n".join(prefs).encode()


KIT_CORE = None


def inline_kit(raw, what=""):
    """Every app's kit block holds two marker lines in place of the shared tokens and preference rules; the build writes them
    out from ui.css, so a token change reaches every app at the next build. When the page pins its styles, the pin follows."""
    global KIT_CORE
    if KIT_MARKS[0] not in raw and KIT_MARKS[1] not in raw:
        return raw
    if KIT_CORE is None:
        KIT_CORE = kit_core()
    for mark in KIT_MARKS:
        assert raw.count(mark) == 1, ("each kit marker must appear once", what, mark)
    a = raw.rfind(b"<style>", 0, raw.index(KIT_MARKS[0])) + len(b"<style>")
    b = raw.index(b"</style>", a)
    old = raw[a:b]
    assert KIT_MARKS[1] in old, ("both kit markers must sit in one style block", what)
    new = old.replace(KIT_MARKS[0], KIT_CORE[0]).replace(KIT_MARKS[1], KIT_CORE[1])
    out = raw[:a] + new + raw[b:]
    oh, nh = csp_hash(old).encode(), csp_hash(new).encode()
    if oh in out:
        out = out.replace(oh, nh)
    else:
        sm = re.search(rb"style-src[^;\"]*", out)
        assert not (sm and b"'sha256-" in sm.group(0)), ("style pin for the kit block not found", what)
    assert b"@@OMNEVUM-KIT" not in out, ("kit marker left", what)
    return out


def read_source(path):
    return inline_kit(inline_engine(open(path, "rb").read(), path), path)
