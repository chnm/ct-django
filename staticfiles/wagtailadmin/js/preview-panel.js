(() => {
  "use strict";
  var e,
    t = {
      9989: (e, t, r) => {
        var a = r(8609),
          n = r.n(a),
          o = r(2178),
          i = r(6508),
          l = r(8667),
          c = r(2833);
        function s() {
          const e = document.querySelector('[data-side-panel="preview"]'),
            t = document.querySelector('[data-side-panel="checks"]');
          if (!e) return;
          const r = e.querySelector("[data-preview-panel]"),
            a = r.querySelectorAll("[data-device-width]"),
            s = r.querySelector("[data-default-size]"),
            d = (e) => {
              const t = r.classList.contains("preview-panel--unavailable");
              let a = e;
              (e && !t) || (a = s.dataset.deviceWidth),
                r.style.setProperty("--preview-device-width", a);
            },
            u = (e) => {
              const t = e.target.value,
                n = e.target.dataset.deviceWidth;
              d(n);
              try {
                localStorage.setItem("wagtail:preview-panel-device", t);
              } catch (e) {}
              a.forEach((e) => {
                r.classList.toggle(`preview-panel--${e.value}`, e.value === t);
              });
            };
          a.forEach((e) => e.addEventListener("change", u)),
            new ResizeObserver((e) =>
              r.style.setProperty(
                "--preview-panel-width",
                e[0].contentRect.width,
              ),
            ).observe(r);
          const v = r.querySelector("[data-preview-new-tab]"),
            h = r.querySelector("[data-refresh-preview]"),
            w = r.querySelector("[data-preview-spinner]"),
            p = document.querySelector("[data-edit-form]"),
            m = r.dataset.action,
            f = document.querySelector("[data-preview-mode-select]");
          let y,
            g = r.querySelector("[data-preview-iframe]"),
            E = !1,
            S = !1;
          const L = () => {
              clearTimeout(y), w.classList.add("w-hidden"), (E = !1);
            },
            b = () => {
              const e = document.createElement("iframe"),
                t = new URL(m, window.location.href);
              f && t.searchParams.set("mode", f.value),
                t.searchParams.set("in_preview_panel", "true"),
                (e.style.width = 0),
                (e.style.height = 0),
                (e.style.opacity = 0),
                (e.style.position = "absolute"),
                (e.src = t.toString()),
                g.insertAdjacentElement("afterend", e);
              const r = () => {
                Array.from(g.attributes).forEach((t) => {
                  "src" !== t.nodeName &&
                    e.setAttribute(t.nodeName, t.nodeValue);
                }),
                  e.contentWindow.scroll(
                    g.contentWindow.scrollX,
                    g.contentWindow.scrollY,
                  ),
                  g.remove(),
                  (g = e),
                  (e.style = null),
                  L(),
                  e.removeEventListener("load", r),
                  (async (e) => {
                    const t = document.querySelector(
                        "#w-a11y-result-row-template",
                      ),
                      r = document.querySelector(
                        "#w-a11y-result-selector-template",
                      ),
                      a = document.querySelector("[data-checks-panel]"),
                      i = (0, o.$R)(document.body),
                      l = document.querySelector(
                        '[data-side-panel-toggle="checks"] [data-side-panel-toggle-counter]',
                      ),
                      c = document.querySelector(
                        '[data-side-panel="checks"] [data-a11y-result-count]',
                      );
                    if (!(t && r && i && l && c)) return;
                    const s = {
                      include: {
                        fromFrames: ["#preview-iframe"].concat(
                          i.context.include,
                        ),
                      },
                    };
                    i.context.exclude?.length > 0 &&
                      (s.exclude = {
                        fromFrames: ["#preview-iframe"].concat(
                          i.context.exclude,
                        ),
                      });
                    const d = await n().run(s, i.options),
                      u = d.violations.reduce((e, t) => e + t.nodes.length, 0);
                    (l.innerText = u.toString()),
                      (l.hidden = 0 === u),
                      (c.innerText = u.toString()),
                      c.classList.toggle("has-errors", u > 0),
                      (0, o.ZG)(a, d, i, t, r, () => v.click());
                  })();
              };
              e.addEventListener("load", r);
            },
            _ = () =>
              E
                ? Promise.resolve()
                : ((E = !0),
                  (y = setTimeout(() => w.classList.remove("w-hidden"), 2e3)),
                  fetch(m, { method: "POST", body: new FormData(p) })
                    .then((e) => e.json())
                    .then(
                      (e) => (
                        r.classList.toggle(
                          "preview-panel--has-errors",
                          !e.is_valid,
                        ),
                        r.classList.toggle(
                          "preview-panel--unavailable",
                          !e.is_available,
                        ),
                        e.is_available || d(),
                        e.is_valid
                          ? b()
                          : S
                          ? L()
                          : (fetch(m, {
                              headers: {
                                [i.HE.CSRF_HEADER_NAME]: i.HE.CSRF_TOKEN,
                              },
                              method: "DELETE",
                            }),
                            (S = !0),
                            b()),
                        e.is_valid
                      ),
                    )
                    .catch((e) => {
                      throw (L(), e);
                    })),
            T = () =>
              _().catch(() => {
                window.alert((0, c.AP)("Error while sending preview data."));
              });
          if (
            (v.addEventListener("click", (e) => {
              e.preventDefault();
              const t = window.open("", m);
              t.focus(),
                T().then((e) => {
                  if (e) {
                    const e = new URL(v.href);
                    t.document.location = e.toString();
                  } else window.focus(), t.close();
                });
            }),
            h && h.addEventListener("click", T),
            i.HE.WAGTAIL_AUTO_UPDATE_PREVIEW)
          ) {
            let r,
              a = "";
            const n = () => {
                const e = new URLSearchParams(new FormData(p)).toString(),
                  t = a !== e;
                return (a = e), t;
              },
              o = (0, l.s)(_, i.HE.WAGTAIL_AUTO_UPDATE_PREVIEW_INTERVAL),
              c = () => {
                !E && n() && o();
              };
            e.addEventListener("show", () => {
              c(),
                (r = setInterval(c, i.HE.WAGTAIL_AUTO_UPDATE_PREVIEW_INTERVAL));
            }),
              t?.addEventListener("show", () => {
                c(),
                  (r = setInterval(
                    c,
                    i.HE.WAGTAIL_AUTO_UPDATE_PREVIEW_INTERVAL,
                  ));
              }),
              e.addEventListener("hide", () => {
                clearInterval(r);
              }),
              t?.addEventListener("hide", () => {
                clearInterval(r);
              });
          } else
            e.addEventListener("show", () => {
              _();
            }),
              t?.addEventListener("show", () => {
                _();
              });
          f &&
            f.addEventListener("change", (e) => {
              const t = e.target.value,
                r = new URL(m, window.location.href);
              r.searchParams.set("mode", t),
                r.searchParams.delete("in_preview_panel"),
                (v.href = r.toString()),
                T();
            });
          let A = null;
          try {
            A = localStorage.getItem("wagtail:preview-panel-device");
          } catch (e) {}
          (r.querySelector(`[data-device-width][value="${A}"]`) || s).click();
        }
        document.addEventListener("DOMContentLoaded", () => {
          s();
        });
      },
    },
    r = {};
  function a(e) {
    var n = r[e];
    if (void 0 !== n) return n.exports;
    var o = (r[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(o.exports, o, o.exports, a), (o.loaded = !0), o.exports;
  }
  (a.m = t),
    (e = []),
    (a.O = (t, r, n, o) => {
      if (!r) {
        var i = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [r, n, o] = e[d], l = !0, c = 0; c < r.length; c++)
            (!1 & o || i >= o) && Object.keys(a.O).every((e) => a.O[e](r[c]))
              ? r.splice(c--, 1)
              : ((l = !1), o < i && (i = o));
          if (l) {
            e.splice(d--, 1);
            var s = n();
            void 0 !== s && (t = s);
          }
        }
        return t;
      }
      o = o || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
      e[d] = [r, n, o];
    }),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (a.d = (e, t) => {
      for (var r in t)
        a.o(t, r) &&
          !a.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (a.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (a.j = 52),
    (() => {
      var e = { 52: 0 };
      a.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var n,
            o,
            [i, l, c] = r,
            s = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (n in l) a.o(l, n) && (a.m[n] = l[n]);
            if (c) var d = c(a);
          }
          for (t && t(r); s < i.length; s++)
            (o = i[s]), a.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return a.O(d);
        },
        r = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var n = a.O(void 0, [321], () => a(9989));
  n = a.O(n);
})();
