window.__nfSv = {
  s: "idle",
  t: 0,
  f: [],
};
window.__nfIn = {
  m: {},
  f: [],
};
window.__nfSvSet = function (s) {
  window.__nfSv.s = s;
  window.__nfSv.t = Date.now();
  window.__nfSv.f.slice().forEach(function (g) {
    g();
  });
};
const nfireDb = new Dexie("nFireDB");
nfireDb.version(1).stores({
  profiles: "++id, updated_at",
});
