"""Render one source with its markers filled (engine, kit core) to a file you can open, without a full build.
Usage: python builder/preview.py <source.html> [out.html]   (default out: <system temp>/omnevum-preview/<name>)"""
import os, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from inline import read_source

src = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(tempfile.gettempdir(), "omnevum-preview", os.path.basename(src))
os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
open(out, "wb").write(read_source(src))
print(out)
