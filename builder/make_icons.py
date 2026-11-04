"""Render the install icons from one drawing. Run only when the logo changes (needs Playwright):
  python builder/make_icons.py
Writes build/omnevum/pwa-icons/: icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png, favicon.svg.
The build copies them to /icons/ on the site. Keeping the images as files (not rendered at build time) keeps the build free of a browser."""
import os, sys
sys.dont_write_bytecode = True
from playwright.sync_api import sync_playwright
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pwa-icons")
os.makedirs(OUT, exist_ok=True)
ACC = "#2a5584"
MARK = '<circle cx="256" cy="256" r="148" fill="none" stroke="#fff" stroke-width="38"/><circle cx="256" cy="256" r="58" fill="#fff"/>'
# 'any' purpose: rounded square on a transparent corner; maskable: full bleed, mark inside the central 80% safe zone; apple: full bleed (iOS rounds it)
ANY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="%s"/>%s</svg>' % (ACC, MARK)
FULL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="%s"/>%s</svg>' % (ACC, MARK)
open(os.path.join(OUT, "favicon.svg"), "w", encoding="utf-8", newline="\n").write(ANY + "\n")
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, svg, size, transparent in (("icon-192.png", ANY, 192, True), ("icon-512.png", ANY, 512, True), ("icon-maskable-512.png", FULL, 512, False), ("apple-touch-icon.png", FULL, 180, False)):
        pg = b.new_page(viewport={"width": size, "height": size}, device_scale_factor=1)
        pg.set_content('<html><body style="margin:0;background:transparent">%s</body></html>' % svg.replace('viewBox', 'width="%d" height="%d" viewBox' % (size, size), 1))
        pg.screenshot(path=os.path.join(OUT, name), omit_background=transparent, clip={"x": 0, "y": 0, "width": size, "height": size}); pg.close()
    b.close()
print("icons written to", OUT)
