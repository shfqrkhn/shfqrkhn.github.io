"""Restore the full Phosphor Icons pack (MIT), which the repository keeps only in part (the icons in use) to stay small.
  python builder/fetch_icons.py
Reads the pinned version from builder/icons/phosphor/package.json, downloads that exact package from the npm registry (about 1.4 MB), and fills
in every missing icon under builder/icons/phosphor/regular and fill. Existing files are never changed. Needs an internet connection once.
Run it when a page needs an icon that the trimmed pack does not hold (the build then stops with 'icon not found')."""
import io, json, os, sys, tarfile, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
PACK = os.path.join(HERE, "icons", "phosphor")


def main():
    ver = json.load(open(os.path.join(PACK, "package.json"), encoding="utf-8"))["version"]
    url = "https://registry.npmjs.org/@phosphor-icons/core/-/core-%s.tgz" % ver
    print("downloading %s" % url)
    data = urllib.request.urlopen(url, timeout=90).read()
    t = tarfile.open(fileobj=io.BytesIO(data), mode="r:gz")
    added = 0
    for m in t.getmembers():
        if not m.isfile():
            continue
        for w in ("regular", "fill"):
            pre = "package/assets/%s/" % w
            if m.name.startswith(pre) and m.name.endswith(".svg"):
                dst = os.path.join(PACK, w, os.path.basename(m.name))
                if not os.path.exists(dst):
                    os.makedirs(os.path.dirname(dst), exist_ok=True)
                    open(dst, "wb").write(t.extractfile(m).read()); added += 1
    print("Phosphor Icons %s: %d icon files added, pack now holds %d regular and %d fill icons" % (
        ver, added, len(os.listdir(os.path.join(PACK, "regular"))), len(os.listdir(os.path.join(PACK, "fill")))))
    return 0


if __name__ == "__main__":
    sys.exit(main())
