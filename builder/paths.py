"""Where things live. Every Omnevum tool imports its folders from here, so a folder name is set in exactly one place.

  builder/    this folder: the tools, the registry, the icon list
  sources/    what people write: apps/ (one HTML file per app) and method/ (Omni, Prompt Clipboard, Knowledge Distiller, Resource Catalogue)
  docs/       the framework note (FRAMEWORK.md, the source of truth) and PRIVACY.md
  site/       what is published: authored files (scripts/, content/, robots.txt) plus everything build.py generates (git ignores the generated part)
  converge/   review scripts and their receipts
  history/    optional local safety copies made by archive.py (git ignores it; git history is the real history)

The repository root is the parent of this folder. The self-test sets OMNEVUM_BUILDER when it runs a copy of the builder."""
import os

OM = os.environ.get("OMNEVUM_BUILDER") or os.path.dirname(os.path.abspath(__file__))
HOME = os.path.dirname(OM)
OUT = os.path.join(HOME, "site")
V = os.path.join(HOME, "sources")
APPS_DIR = os.path.join(V, "apps")
METHOD = os.path.join(V, "method")
DOCS = os.path.join(HOME, "docs")
SUP = os.path.join(HOME, "history")
CONVERGE = os.path.join(HOME, "converge")
