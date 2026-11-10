"""Pre-commit gate that skips the slow self-test when it cannot matter.

Usage (repository root): python converge/fastgate.py
Looks at the changed files (working tree against HEAD). If any file is outside the documentation-only set below, the full self-test must run, so this prints FULL and exits 1. Otherwise the build, the document gate and the baseline checks are enough: it runs them, prints DOCS-ONLY OK and exits 0.
Documentation-only: converge/*.md, converge/*.json, converge/change-requests/*, README.md, AGENTS.md, CONTRIBUTING.md, SECURITY.md, PRIVACY.md, docs/*.md.
Anything else (builder, site, sources, workflows, requirements, converge scripts) means FULL.
"""
import fnmatch
import subprocess
import sys

DOC_ONLY = ["converge/*.md", "converge/*.json", "converge/change-requests/*", "README.md", "AGENTS.md", "CONTRIBUTING.md", "SECURITY.md", "PRIVACY.md", "docs/*.md"]


def run(*a):
    return subprocess.run(a, capture_output=True, text=True)


def main():
    names = set(run("git", "diff", "--name-only", "HEAD").stdout.split()) | set(run("git", "ls-files", "--others", "--exclude-standard").stdout.split())
    if not names:
        print("nothing changed")
        return 0
    other = sorted(n for n in names if not any(fnmatch.fnmatch(n, g) for g in DOC_ONLY))
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
