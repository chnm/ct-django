(() => {
  "use strict";
  var e,
    t = {
      1566: (e, t, r) => {
        var o = r(8609),
          n = r.n(o),
          i = r(2891),
          a = r(2178),
          s = r(9104),
          l = r(2223);
        class d extends HTMLElement {
          connectedCallback() {
            const e = document.querySelector("#wagtail-userbar-template");
            if (!e) return;
            const t = this.attachShadow({ mode: "open" });
            t.appendChild(e.content.firstElementChild.cloneNode(!0)),
              e.remove();
            const r = t.querySelector("[data-wagtail-userbar]"),
              o = r?.querySelector("[data-wagtail-userbar-trigger]"),
              n = r?.querySelector("[role=menu]");
            if (!r || !o || !n) return;
            const i = n.querySelectorAll("li"),
              a = "w-userbar--active";
            (this.trigger = o), (r.style.display = "none");
            const s = (e) => {
                r.classList.add(a),
                  o.setAttribute("aria-expanded", "true"),
                  n.addEventListener("click", p, !1),
                  window.addEventListener("click", f, !1),
                  r.addEventListener("keydown", w, !1),
                  e &&
                    n.querySelector(
                      "a[href],\n    button:not([disabled]),\n    input:not([disabled])",
                    ) &&
                    setTimeout(() => {
                      u();
                    }, 300);
              },
              l = () => {
                r.classList.remove(a),
                  o.setAttribute("aria-expanded", "false"),
                  n.addEventListener("click", p, !1),
                  window.removeEventListener("click", f, !1),
                  r.removeEventListener("keydown", w, !1);
              },
              d = () => {
                i.forEach((e) => {
                  e.firstElementChild.tabIndex = -1;
                });
              },
              c = (e) => {
                d(),
                  (e.tabIndex = 0),
                  setTimeout(() => {
                    e.focus();
                  }, 100);
              },
              u = () => {
                i.length > 0 && c(i[0].firstElementChild);
              },
              h = () => {
                i.length > 0 && c(i[i.length - 1].firstElementChild);
              },
              w = (e) => {
                if ("true" === o.getAttribute("aria-expanded")) {
                  if ("Escape" === e.key)
                    return (
                      l(), o && (setTimeout(() => o.focus(), 300), d()), !1
                    );
                  if (
                    t.activeElement &&
                    t.activeElement.closest(".w-userbar-nav")
                  )
                    switch (e.key) {
                      case "ArrowDown":
                        return (
                          e.preventDefault(),
                          i.forEach((e, r) => {
                            e.firstElementChild === t.activeElement &&
                              (r + 1 < i.length
                                ? c(i[r + 1].firstElementChild)
                                : u());
                          }),
                          !1
                        );
                      case "ArrowUp":
                        return (
                          e.preventDefault(),
                          i.forEach((e, r) => {
                            e.firstElementChild === t.activeElement &&
                              (r > 0 ? c(i[r - 1].firstElementChild) : h());
                          }),
                          !1
                        );
                      case "Home":
                        return e.preventDefault(), u(), !1;
                      case "End":
                        return e.preventDefault(), h(), !1;
                    }
                }
                return !0;
              },
              p = (e) => {
                e.stopPropagation();
              },
              f = () => {
                l();
              };
            o.addEventListener(
              "click",
              (e) => {
                e.stopPropagation(), r.classList.contains(a) ? l() : s(!0);
              },
              !1,
            ),
              window.addEventListener("pageshow", l, !1),
              r.addEventListener("keydown", (e) => {
                if (
                  o === document.activeElement &&
                  "false" === o.getAttribute("aria-expanded")
                )
                  switch (e.key) {
                    case "ArrowUp":
                      e.preventDefault(), s(!1), setTimeout(() => h(), 300);
                      break;
                    case "ArrowDown":
                      e.preventDefault(), s(!1), setTimeout(() => u(), 300);
                  }
              }),
              n.addEventListener("focusout", (e) => {
                e.relatedTarget &&
                  !e.relatedTarget.closest(".w-userbar-nav") &&
                  (d(), l());
              }),
              d(),
              document.addEventListener("DOMContentLoaded", async () => {
                await this.initialiseAxe();
              });
          }
          async initialiseAxe() {
            const e = this.shadowRoot?.getElementById("accessibility-trigger"),
              t = (0, a.$R)(this.shadowRoot);
            if (!this.shadowRoot || !e || !t) return;
            const r = await n().run(t.context, t.options),
              o = r.violations.reduce((e, t) => e + t.nodes.length, 0);
            if (r.violations.length) {
              const e = document.createElement("span");
              (e.textContent = String(o)),
                e.classList.add("w-userbar-axe-count"),
                this.trigger.appendChild(e);
            }
            const d = i.Application.start(this.shadowRoot.firstElementChild);
            d.register("w-dialog", s.v), d.register("w-teleport", l.I);
            const c = new Promise((e) => {
                this.shadowRoot?.addEventListener(
                  "w-dialog:ready",
                  ({ detail: t }) => {
                    const { body: r, dialog: o } = t;
                    e({ body: r, dialog: o });
                  },
                  { once: !0, passive: !0 },
                );
              }),
              { body: u, dialog: h } = await c,
              w = this.shadowRoot.querySelector("#accessibility-results"),
              p = this.shadowRoot.querySelector("#w-a11y-result-row-template"),
              f = this.shadowRoot.querySelector(
                "#w-a11y-result-selector-template",
              ),
              v = this.shadowRoot.querySelector(
                "#w-a11y-result-outline-template",
              );
            if (!(w && p && f && v)) return;
            this.shadowRoot
              .querySelectorAll("[data-a11y-result-count]")
              .forEach((e) => {
                (e.textContent = String(o) || "0"),
                  e.classList.toggle("has-errors", r.violations.length > 0);
              });
            const g = (e) => {
              const t = document.querySelector(e),
                r = this.shadowRoot?.querySelector(
                  "[data-a11y-result-outline-container]",
                );
              r?.firstElementChild && r.removeChild(r.firstElementChild),
                r?.appendChild(v.content.cloneNode(!0));
              const o = this.shadowRoot?.querySelector(
                "[data-a11y-result-outline]",
              );
              if (!(this.shadowRoot && t && o && r)) return;
              const n = () => {
                const e = t.getBoundingClientRect();
                o.style.cssText = `\n        top: ${
                  e.height < 5
                    ? e.top + window.scrollY - 2.5 + "px"
                    : `${e.top + window.scrollY}px`
                };\n        left: ${
                  e.width < 5
                    ? e.left + window.scrollX - 2.5 + "px"
                    : `${e.left + window.scrollX}px`
                };\n        width: ${Math.max(
                  e.width,
                  5,
                )}px;\n        height: ${Math.max(
                  e.height,
                  5,
                )}px;\n        position: absolute;\n        z-index: 129;\n        outline: 1px solid #CD4444;\n        box-shadow: 0px 0px 12px 1px #FF0000;\n        `;
              };
              n(),
                window.addEventListener("resize", n),
                (t.style.scrollMargin = "6.25rem"),
                t.scrollIntoView(),
                t.focus(),
                w.addEventListener("hide", () => {
                  (o.style.cssText = ""),
                    window.removeEventListener("resize", n);
                });
            };
            e.addEventListener("click", () => {
              "true" === w.getAttribute("aria-hidden")
                ? (h.show(), (0, a.ZG)(u, r, t, p, f, g))
                : h.hide();
            });
          }
        }
        customElements.define("wagtail-userbar", d);
      },
    },
    r = {};
  function o(e) {
    var n = r[e];
    if (void 0 !== n) return n.exports;
    var i = (r[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(i.exports, i, i.exports, o), (i.loaded = !0), i.exports;
  }
  (o.m = t),
    (e = []),
    (o.O = (t, r, n, i) => {
      if (!r) {
        var a = 1 / 0;
        for (c = 0; c < e.length; c++) {
          for (var [r, n, i] = e[c], s = !0, l = 0; l < r.length; l++)
            (!1 & i || a >= i) && Object.keys(o.O).every((e) => o.O[e](r[l]))
              ? r.splice(l--, 1)
              : ((s = !1), i < a && (a = i));
          if (s) {
            e.splice(c--, 1);
            var d = n();
            void 0 !== d && (t = d);
          }
        }
        return t;
      }
      i = i || 0;
      for (var c = e.length; c > 0 && e[c - 1][2] > i; c--) e[c] = e[c - 1];
      e[c] = [r, n, i];
    }),
    (o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return o.d(t, { a: t }), t;
    }),
    (o.d = (e, t) => {
      for (var r in t)
        o.o(t, r) &&
          !o.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (o.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (o.j = 209),
    (() => {
      var e = { 209: 0 };
      o.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var n,
            i,
            [a, s, l] = r,
            d = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (n in s) o.o(s, n) && (o.m[n] = s[n]);
            if (l) var c = l(o);
          }
          for (t && t(r); d < a.length; d++)
            (i = a[d]), o.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return o.O(c);
        },
        r = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var n = o.O(void 0, [321], () => o(1566));
  n = o.O(n);
})();