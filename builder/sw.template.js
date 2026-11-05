"use strict";
/* Omnevum worker. One scope (/) for the hub and every page. Generated from sw.template.js by build.py: edit the template, not sw.js.
   Offline first, fresh when it can be:
   - install caches only the hub shell (fast; never blocked by a big file) and never skips waiting
   - the hub then asks for every page in the background ("precache"), one page at a time, so one failure never blocks the rest
   - pages over 5 MB wait for the owner's tap (mobile data), everything else downloads by itself
   - every page has its own cache (app-<slug>-v<version>-<hash>), so an update replaces only that page
   - requests try the network first, but fall back to the saved copy after 3.5 s (slow networks), and straight away when offline
   - a new worker waits until the page sends "skip-waiting": nothing swaps silently under someone mid-task */
const HUB = "hub-shell-v@@VERSION@@";
const SHELL = @@SHELL@@;
const PAGES = @@PAGES@@;
const KEEP = new Set([HUB].concat(Object.keys(PAGES).map(function (k) { return PAGES[k].cache; })));
const BASE = new URL("./", self.location.href).pathname;
const SLOW = 3500;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(HUB).then(function (c) { return c.addAll(SHELL); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return !KEEP.has(k) && /^(hub-shell-|app-)/.test(k); }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function cacheFor(url) {
  var seg = url.pathname.slice(BASE.length).split("/").slice(0, 2).join("/");
  return PAGES[seg] ? PAGES[seg].cache : HUB;
}

function race(promise, ms) {
  if (!ms) return promise;
  return new Promise(function (resolve, reject) {
    var t = setTimeout(function () { reject(new Error("slow")); }, ms);
    promise.then(function (r) { clearTimeout(t); resolve(r); }, function (err) { clearTimeout(t); reject(err); });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  var name = cacheFor(url);
  e.respondWith(caches.open(name).then(function (cache) {
    return cache.match(req, { ignoreSearch: req.mode === "navigate" }).then(function (cached) {
      return race(fetch(req), cached ? SLOW : 0).then(function (res) {
        if (res && res.ok) e.waitUntil(cache.put(req, res.clone()));
        return res;
      }).catch(function () {
        if (cached) return cached;
        if (req.mode === "navigate") {
          if (url.pathname !== BASE && url.pathname !== BASE + "index.html") {
            var seg = url.pathname.slice(BASE.length).replace(/index\.html$/, "").replace(/\/+$/, "");
            if ((PAGES[seg] || SHELL.indexOf("./" + seg + "/") >= 0) && url.pathname !== BASE + seg + "/") return Response.redirect(BASE + seg + "/", 302);  // a saved page reached at another form of its address
            return caches.match("./404.html", { cacheName: HUB }).then(function (nf) { return nf || Response.redirect(BASE, 302); });  // 404 forwards old addresses and links home
          }
          return caches.match("./index.html", { cacheName: HUB }).then(function (hub) { return hub || Response.error(); });
        }
        return Response.error();
      });
    });
  }));
});

function tell(msg) {
  return self.clients.matchAll({ includeUncontrolled: true }).then(function (list) { list.forEach(function (c) { c.postMessage(msg); }); });
}

function have(key) {
  var p = PAGES[key];
  return caches.open(p.cache).then(function (c) { return c.match(p.start); }).then(function (r) { return !!r; });
}

function status() {
  var keys = Object.keys(PAGES), done = 0, bigPending = 0;
  return Promise.all(keys.map(function (k) {
    return have(k).then(function (ok) { if (ok) done++; else if (PAGES[k].big) bigPending++; });
  })).then(function () { return { type: "offline", done: done, total: keys.length, bigPending: bigPending }; });
}

var running = false, again = false;
function precache(withBig) {
  if (running) { if (withBig) again = true; return Promise.resolve(); }  // remember a later "include large pages" request instead of dropping it
  running = true;
  var keys = Object.keys(PAGES);
  return keys.reduce(function (chain, k) {
    return chain.then(function () {
      var p = PAGES[k];
      if (p.big && !withBig) return;
      return have(k).then(function (ok) {
        if (ok) return;
        return caches.open(p.cache).then(function (c) { return c.addAll(p.files || [p.start]); }).catch(function () {}).then(function () { return status().then(tell); });
      });
    });
  }, Promise.resolve()).then(function () {
    running = false;
    var next = again; again = false;
    return status().then(tell).then(function () { return next ? precache(true) : undefined; });
  }, function () { running = false; });
}

self.addEventListener("message", function (e) {
  var d = e.data || {};
  if (d.type === "skip-waiting") self.skipWaiting();
  else if (d.type === "precache") e.waitUntil(precache(!!d.big));
  else if (d.type === "status") e.waitUntil(status().then(tell));
});
