"""Pre-commit gate that skips the slow self-test when it cannot matter.

Usage (repository root): python converge/fastgate.py
Looks at every changed, deleted, moved or new file (git status). If any file is outside the documentation-only set below, the full self-test must run, so this prints FULL and exits 1. Otherwise the build, the document gate and the baseline checks are enough: it runs them, prints DOCS-ONLY OK and exits 0.
Documentation-only: *.md and *.json directly in converge/, *.md directly in converge/change-requests/ and docs/, and README.md, AGENTS.md, CONTRIBUTING.md, SECURITY.md, PRIVACY.md.
Anything else (builder, site, sources, workflows, requirements, converge scripts) means FULL.
"""
import os
import subprocess
import sys

DOC_DIRS = {"converge": {".md", ".json"}, "converge/change-requests": {".md"}, "docs": {".md"}}  # one folder level, listed extensions only
DOC_FILES = {"README.md", "AGENTS.md", "CONTRIBUTING.md", "SECURITY.md", "PRIVACY.md"}


def doc_only(n):
    return n in DOC_FILES or os.path.splitext(n)[1] in DOC_DIRS.get(os.path.dirname(n), ())


def run(*a):
    return subprocess.run(a, capture_output=True, text=True)


def main():
    # no rename detection, NUL separated: a moved file lists both its old and new path
    try:
        st = run("git", "status", "--porcelain=v1", "-z", "--no-renames", "--untracked-files=all")
    except OSError as e:
        print("FULL: git is unavailable (%s)" % e)
        return 1
    if st.returncode:
        print("FULL: git status failed (%s)" % st.stderr.strip()[:200])
        return 1
    out = st.stdout
    names = {e[3:] for e in out.split("\0") if len(e) > 3}
    if not names:
        print("nothing changed")
        return 0
    other = sorted(n for n in names if not doc_only(n))
    if other:
        print("FULL: run builder/selftest.py (changed outside documentation: %s)" % ", ".join(other[:5]))
        return 1
    for cmd in (["python", "builder/build.py"], ["python", "site/scripts/check_docs.py"]):
        r = run(*cmd)
        if r.returncode:
            print("FAIL", " ".join(cmd))
            print((r.stdout + r.stderr)[-1500:])
            return 2
    r = run("python", "converge/v23_check.py")
    if "FAIL" in r.stdout or r.returncode:
        print("FAIL converge/v23_check.py")
        print(r.stdout[-1500:])
        return 2
    print("DOCS-ONLY OK (%d files)" % len(names))
    return 0


sys.exit(main())
