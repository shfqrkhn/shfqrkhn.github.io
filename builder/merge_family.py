"""Merge study readers into one family page: one shell, one engine, each reader kept as a pack.

    python builder/merge_family.py families.json        # write the family sources and update the registry
    python builder/merge_family.py families.json --dry  # report only

families.json is a list of {id, title, slug, kind, topic, icon, hue, tagline, blurb, label, what, out, members: [registry slugs]}.
Each member keeps its data block unchanged (same guide id, so saved progress carries over), its accent hue, and its look rules,
scoped to its pack. Its old address and aliases forward to /<kind>/<slug>/?pack=<member slug> through alias_packs.
After a merge: python builder/rename.py --repair-csp <out>, then git rm the member sources. Engine 1.6.0 or later reads packs.
"""
import html, json, os, re, sys

OM = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(OM)
ENGINE = "App-1.6.0"
REGF = os.path.join(OM, "registry.json")


def scope_css(css, pre):
    """Prefix every selector in plain rules (and rules inside @media) with pre. Enough for the small look blocks."""
    out, i = [], 0
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    while i < len(css):
        j = css.find("{", i)
        if j < 0:
            break
        sel = css[i:j].strip()
        if sel.startswith("@"):
            depth, k = 1, j + 1
            while depth:
                depth += {"{": 1, "}": -1}.get(css[k], 0); k += 1
            out.append(sel + "{" + scope_css(css[j + 1:k - 1], pre) + "}")
            i = k
            continue
        k = css.index("}", j)
        out.append(",".join(pre + " " + s.strip() for s in sel.split(",")) + css[j:k + 1])
        i = k + 1
    return "\n".join(out)


def main(spec, dry):
    reg = json.load(open(REGF, encoding="utf-8"))
    topics = {t["id"]: t["title"] for t in json.load(open(os.path.join(OM, "topics.json"), encoding="utf-8"))}
    by_slug = {p["slug"]: p for p in reg["pages"]}
    for fam in json.load(open(spec, encoding="utf-8")):
        mem = [by_slug[s] for s in fam["members"]]
        order = list(topics)
        mem.sort(key=lambda p: (order.index(p["topic"]), fam["members"].index(p["slug"])))
        srcs = []
        for p in mem:
            pat = re.compile(re.escape(p["source"].split("/")[-1]).replace(r"\*", ".*") + "$")
            hit = sorted(f for f in os.listdir(os.path.join(ROOT, "sources", "apps")) if pat.match(f))
            assert len(hit) == 1, (p["slug"], hit)
            srcs.append(os.path.join(ROOT, "sources", "apps", hit[0]))
        shell = open(srcs[0], encoding="utf-8", newline="").read()
        assert "@@KD-ENGINE" in shell, ("not a study reader", srcs[0])
        looks, packs = [], []
        for p, f in zip(mem, srcs):
            s = open(f, encoding="utf-8", newline="").read()
            base = re.search(r'<template data-kd="base">(.*?)</template>', s, re.S).group(1)
            assert 'data-kd="more"' not in s, ("chunks are not handled yet", f)
            meta = json.loads(base)["meta"]
            pre = ":root[data-pack=%s]" % p["slug"]
            hue = re.search(r":root\[data-app\]\{--hue:(\d+)\}", s).group(1)
            look = s[s.index("/* look:"):s.index("</style>")] if "/* look:" in s else ""
            looks.append("/* pack %s */\n:root[data-app][data-pack=%s]{--hue:%s}\n%s" % (p["slug"], p["slug"], hue, scope_css(look, pre)))
            packs.append('<template data-kd="pack" data-pack="%s" data-id="%s" data-title="%s" data-blurb="%s" data-group="%s">%s</template>' % (
                p["slug"], html.escape(meta["id"]), html.escape(p["title"]), html.escape(p["blurb"]), html.escape(topics[p["topic"]]), base))
        out = shell
        if "/* look:" in out:
            out = out[:out.index("/* look:")] + out[out.index("</style>"):]
        out = re.sub(r':root\[data-app\]\{--hue:\d+\}', ":root[data-app]{--hue:%d}" % fam["hue"], out, count=1)
        out = out.replace("</style>", "\n".join(looks) + "\n</style>", 1)
        out = re.sub(r"<title>.*?</title>", "<title>%s</title>" % html.escape(fam["title"]), out, count=1)
        out = re.sub(r'<meta name="application-version"[^>]*>\r?\n?', "", out)
        out = out.replace("standalone study app 1.5.5", "standalone study app 1.6.0").replace('content="kd-app/1.5.5"', 'content="kd-app/1.6.0"').replace("Study app 1.5.5.", "Study app 1.6.0.")
        out = out.replace("@@KD-ENGINE App-1.5.5@@", "@@KD-ENGINE %s@@" % ENGINE)
        out = out.replace('"content": "The study data lives in the template element data-kd=base.',
                          '"content": "Each guide is one template element data-kd=pack (data-pack is its address, ?pack=<slug>); data-kd=shelf names the family and lists them when no pack is chosen.')
        shelf = {"meta": {"id": fam["id"] + "-shelf", "title": fam["title"], "hue": fam["hue"]}, "label": fam["label"], "what": fam["what"]}
        tpl = '<template data-kd="shelf">%s</template>\n%s' % (json.dumps(shelf, ensure_ascii=False), "\n".join(packs))
        out = re.sub(r'<template data-kd="base">.*?</template>', lambda m: tpl, out, count=1, flags=re.S)
        assert "1.5.5" not in out.split("<template")[0], "a version string was missed"
        dst = os.path.join(ROOT, "sources", "apps", fam["out"])
        aliases, apk, former, kw = [], {}, [], []
        for p in mem:
            for al in [p["kind"] + "/" + p["slug"]] + p.get("aliases", []):
                aliases.append(al); apk[al] = p["slug"]
            former += [p["title"]] + p.get("former_names", [])
            kw += p["keywords"].split() + p["title"].lower().split()
        entry = {"id": fam["id"], "title": fam["title"], "kind": fam["kind"], "slug": fam["slug"], "source": "apps/" + re.sub(r"-v[\d.]+\.html$", "-v*.html", fam["out"]),
                 "topic": fam["topic"], "blurb": fam["blurb"], "keywords": " ".join(dict.fromkeys(kw)), "icon": fam["icon"], "lazy": False, "private": False,
                 "archived": False, "former_names": former, "aliases": aliases, "alias_packs": apk, "hue": fam["hue"], "tagline": fam["tagline"]}
        print("%s: %d packs, %d KB, %d aliases" % (fam["slug"], len(packs), len(out.encode()) // 1024, len(aliases)))
        if dry:
            continue
        open(dst, "w", encoding="utf-8", newline="").write(out)
        first = min(reg["pages"].index(p) for p in mem)
        reg["pages"] = [p for p in reg["pages"] if p not in mem]
        reg["pages"].insert(first, entry)
        for f in srcs:
            print("  member source now unused:", os.path.relpath(f, ROOT))
    if not dry:
        open(REGF, "w", encoding="utf-8", newline="\n").write(json.dumps(reg, indent=1, ensure_ascii=False))  # same bytes as archive.py and rename.py write


if __name__ == "__main__":
    main(sys.argv[1], "--dry" in sys.argv)
