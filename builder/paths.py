"""Where things live. Every Omnevum tool imports its folders from here, so a folder name is set in exactly one place.

  builder/    this folder: the tools, the registry, the icon list
  sources/    what people write: apps/ (one HTML file per app) and method/ (Prompt Clipboard, Knowledge Distiller, Resource Catalogue)
  docs/       the framework note (FRAMEWORK.md, the source of truth) and PRIVACY.md
  site/       what is published: authored files (scripts/, content/, robots.txt) plus everything build.py generates (git ignores the generated part)
  converge/   review scripts and their receipts
  history/    optional local safety copies made by archive.py (git ignores it; git history is the real history)

The repository root is the parent of this folder. The self-test sets OMNEVUM_BUILDER when it runs a copy of the builder.
It also holds the two hashes the builder tools share (csp_hash, tree_hash). site/scripts keeps its own copies because site/ is
published and runs alone; check_pages.py and check_site.py must stay in step with these."""
import base64, hashlib, os

OM = os.environ.get("OMNEVUM_BUILDER") or os.path.dirname(os.path.abspath(__file__))
HOME = os.path.dirname(OM)
OUT = os.path.join(HOME, "site")
V = os.path.join(HOME, "sources")
APPS_DIR = os.path.join(V, "apps")
DOCS = os.path.join(HOME, "docs")
SUP = os.path.join(HOME, "history")
CONVERGE = os.path.join(HOME, "converge")


def csp_hash(text):
    """CSP or SRI token for an inline script or style: 'sha256-' plus base64 of the sha256 of its UTF-8 text, after CRLF and CR
    become LF (browsers normalise line endings before hashing). Takes text or bytes."""
    if isinstance(text, str):
        text = text.encode("utf-8")
    return "sha256-" + base64.b64encode(hashlib.sha256(text.replace(b"\r\n", b"\n").replace(b"\r", b"\n")).digest()).decode()


def tree_files(d):
    """Every file under d as (path with forward slashes, full path), sorted by path; skips .git, __pycache__ and node_modules."""
    out = []
    for dp, dn, fn in os.walk(d):
        dn[:] = sorted(x for x in dn if x not in (".git", "__pycache__", "node_modules"))
        for f in sorted(fn):
            full = os.path.join(dp, f); out.append((os.path.relpath(full, d).replace(os.sep, "/"), full))
    return sorted(out)


def tree_hash(d, skip=()):
    """sha256 over 'path NUL file-sha256' lines, sorted by path (site/scripts/check_site.py uses the same algorithm). skip: paths to leave out."""
    h = hashlib.sha256()
    for rel, full in tree_files(d):
        if rel not in skip:
            h.update((rel + chr(0) + hashlib.sha256(open(full, "rb").read()).hexdigest() + chr(10)).encode())
    return h.hexdigest()
