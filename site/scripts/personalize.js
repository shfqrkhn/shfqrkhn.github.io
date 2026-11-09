/* Omnevum personalization. Applies the visitor's accent hue and text size, saved on the hub, to this page.
   Loaded at the end of the page head so nothing flashes. Safe when storage is blocked: the page keeps its own look.
   Stored in localStorage "hub.prefs.v1" as {schemaVersion, look, hue (0-359 or null), size (90, 115, 130 or null)}.
   A page that saves its own look keeps the hue and size, because writes to that key are merged. */
(function () {
  "use strict";
  var K = "hub.prefs.v1", d = document.documentElement, h0 = d.style.getPropertyValue("--hue"), f0 = d.style.fontSize;
  try {
    var set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      if (k === K && this === window.localStorage) {
        try {
          var o = JSON.parse(v), p = JSON.parse(this.getItem(K) || "null") || {};
          ["hue", "size"].forEach(function (f) { if (o[f] === undefined && p[f] !== undefined) o[f] = p[f]; });
          v = JSON.stringify(o);
        } catch (e) {}
      }
      return set.call(this, k, v);
    };
  } catch (e) {}
  function read() { try { return JSON.parse(localStorage.getItem(K) || "null") || {}; } catch (e) { return {}; } }
  function apply() {
    var p = read();
    if (Number.isInteger(p.hue) && p.hue >= 0 && p.hue < 360) d.style.setProperty("--hue", String(p.hue));
    else if (h0) d.style.setProperty("--hue", h0);
    else d.style.removeProperty("--hue");
    if ([90, 115, 130].indexOf(p.size) >= 0) d.style.fontSize = p.size + "%";
    else if (f0) d.style.fontSize = f0;
    else d.style.removeProperty("font-size");
  }
  apply();
  window.addEventListener("storage", function (e) { if (e.key === K || e.key === null) apply(); });
  window.omnevumApply = apply;
})();
