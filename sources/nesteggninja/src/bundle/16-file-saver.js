var Sp = {
    exports: {},
  },
  jZ = Sp.exports,
  Vj;
function RZ() {
  return (
    Vj ||
      ((Vj = 1),
      (function (e, t) {
        (function (n, r) {
          r();
        })(jZ, function () {
          function n(c, d) {
            return (
              typeof d > "u"
                ? (d = {
                    autoBom: !1,
                  })
                : typeof d != "object" &&
                  (console.warn("Deprecated: Expected third argument to be a object"),
                  (d = {
                    autoBom: !d,
                  })),
              d.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type)
                ? new Blob(["\uFEFF", c], {
                    type: c.type,
                  })
                : c
            );
          }
          function r(c, d, h) {
            var p = new XMLHttpRequest();
            p.open("GET", c),
              (p.responseType = "blob"),
              (p.onload = function () {
                u(p.response, d, h);
              }),
              (p.onerror = function () {
                console.error("could not download file");
              }),
              p.send();
          }
          function i(c) {
            var d = new XMLHttpRequest();
            d.open("HEAD", c, !1);
            try {
              d.send();
            } catch {}
            return 200 <= d.status && 299 >= d.status;
          }
          function o(c) {
            try {
              c.dispatchEvent(new MouseEvent("click"));
            } catch {
              var d = document.createEvent("MouseEvents");
              d.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), c.dispatchEvent(d);
            }
          }
          var a =
              typeof window == "object" && window.window === window
                ? window
                : typeof self == "object" && self.self === self
                  ? self
                  : typeof Zo == "object" && Zo.global === Zo
                    ? Zo
                    : void 0,
            s =
              a.navigator &&
              /Macintosh/.test(navigator.userAgent) &&
              /AppleWebKit/.test(navigator.userAgent) &&
              !/Safari/.test(navigator.userAgent),
            u =
              a.saveAs ||
              (typeof window != "object" || window !== a
                ? function () {}
                : "download" in HTMLAnchorElement.prototype && !s
                  ? function (c, d, h) {
                      var p = a.URL || a.webkitURL,
                        v = document.createElement("a");
                      (d = d || c.name || "download"),
                        (v.download = d),
                        (v.rel = "noopener"),
                        typeof c == "string"
                          ? ((v.href = c),
                            v.origin === location.origin ? o(v) : i(v.href) ? r(c, d, h) : o(v, (v.target = "_blank")))
                          : ((v.href = p.createObjectURL(c)),
                            setTimeout(function () {
                              p.revokeObjectURL(v.href);
                            }, 4e4),
                            setTimeout(function () {
                              o(v);
                            }, 0));
                    }
                  : "msSaveOrOpenBlob" in navigator
                    ? function (c, d, h) {
                        if (((d = d || c.name || "download"), typeof c != "string"))
                          navigator.msSaveOrOpenBlob(n(c, h), d);
                        else if (i(c)) r(c, d, h);
                        else {
                          var p = document.createElement("a");
                          (p.href = c),
                            (p.target = "_blank"),
                            setTimeout(function () {
                              o(p);
                            });
                        }
                      }
                    : function (c, d, h, p) {
                        if (
                          ((p = p || open("", "_blank")),
                          p && (p.document.title = p.document.body.innerText = "downloading..."),
                          typeof c == "string")
                        )
                          return r(c, d, h);
                        var v = c.type === "application/octet-stream",
                          b = /constructor/i.test(a.HTMLElement) || a.safari,
                          y = /CriOS\/[\d]+/.test(navigator.userAgent);
                        if ((y || (v && b) || s) && typeof FileReader < "u") {
                          var w = new FileReader();
                          (w.onloadend = function () {
                            var _ = w.result;
                            (_ = y ? _ : _.replace(/^data:[^;]*;/, "data:attachment/file;")),
                              p ? (p.location.href = _) : (location = _),
                              (p = null);
                          }),
                            w.readAsDataURL(c);
                        } else {
                          var x = a.URL || a.webkitURL,
                            S = x.createObjectURL(c);
                          p ? (p.location = S) : (location.href = S),
                            (p = null),
                            setTimeout(function () {
                              x.revokeObjectURL(S);
                            }, 4e4);
                        }
                      });
          (a.saveAs = u.saveAs = u), (e.exports = u);
        });
      })(Sp)),
    Sp.exports
  );
}
var zj = RZ();
