(() => {
  "use strict";
  var e,
    t = {
      412: (e, t, n) => {
        var a = n(6664),
          r = n(2833);
        const l = (e, t = !("true" === e.getAttribute("aria-expanded"))) => {
          const n = document.querySelector(
            `#${e.getAttribute("aria-controls")}`,
          );
          n &&
            (e.setAttribute("aria-expanded", `${t}`),
            t
              ? n.removeAttribute("hidden")
              : "onbeforematch" in document.body
              ? n.setAttribute("hidden", "until-found")
              : n.setAttribute("hidden", ""),
            e.dispatchEvent(
              new CustomEvent("commentAnchorVisibilityChange", { bubbles: !0 }),
            ),
            e.dispatchEvent(
              new CustomEvent("wagtail:panel-toggle", {
                bubbles: !0,
                cancelable: !1,
                detail: { expanded: t },
              }),
            ));
        };
        function i(e) {
          const t = e.closest("[data-panel]"),
            n = document.querySelector(`#${e.getAttribute("aria-controls")}`);
          if (!n || !t || t.collapsibleInitialised) return;
          t.collapsibleInitialised = !0;
          const a = l.bind(null, e),
            r = t.classList.contains("collapsed"),
            i = n.querySelector(
              '[aria-invalid="true"], .error, .w-field--error',
            ),
            o = r && !i;
          o && a(!1), e.addEventListener("click", a.bind(null, void 0));
          const s = t.querySelector("[data-panel-heading]");
          s && s.addEventListener("click", a.bind(null, void 0)),
            n.addEventListener("beforematch", a.bind(null, !0)),
            e.dispatchEvent(
              new CustomEvent("wagtail:panel-init", {
                bubbles: !0,
                cancelable: !1,
                detail: { expanded: !o },
              }),
            );
        }
        var o = n(2427),
          s = n.n(o),
          c = n(6931),
          d = n.n(c),
          u = n(8667),
          m = n(1238);
        const p = ({
            expanded: e,
            floating: t,
            insideMinimap: n,
            onClick: a,
          }) =>
            s().createElement(
              "button",
              {
                type: "button",
                "aria-expanded": e,
                onClick: a,
                className: `button button-small button-secondary w-minimap__collapse-all ${
                  t ? "w-minimap__collapse-all--floating" : ""
                } ${n ? "w-minimap__collapse-all--inside" : ""}`,
              },
              s().createElement(m.A, {
                name: e ? "collapse-up" : "collapse-down",
              }),
              e ? (0, r.AP)("Collapse all") : (0, r.AP)("Expand all"),
            ),
          g = s().createElement("span", { className: "w-required-mark" }, "*"),
          f = ({ item: e, intersects: t, expanded: n, onClick: a }) => {
            const {
                href: l,
                label: i,
                icon: o,
                required: c,
                errorCount: d,
                level: u,
              } = e,
              p = d > 0,
              f = (0, r.WI)("%(num)s error", "%(num)s errors", d).replace(
                "%(num)s",
                `${d}`,
              ),
              h = i.length > 22 ? `${i.substring(0, 22)}…` : i;
            return s().createElement(
              "a",
              {
                href: l,
                className: `w-minimap-item w-minimap-item--${u} ${
                  t ? "w-minimap-item--active" : ""
                } ${p ? "w-minimap-item--error" : ""}`,
                onClick: a.bind(null, e),
                "aria-current": t,
                tabIndex: n ? void 0 : -1,
                "aria-describedby": n ? void 0 : "w-minimap-toggle",
              },
              p
                ? s().createElement(
                    "div",
                    { className: "w-minimap-item__errors", "aria-label": f },
                    d,
                  )
                : null,
              s().createElement(m.A, {
                name: "minus",
                className: "w-minimap-item__placeholder",
              }),
              "h1" !== u && "h2" !== u
                ? s().createElement(m.A, {
                    name: o,
                    className: "w-minimap-item__icon",
                  })
                : null,
              s().createElement(
                "span",
                { className: "w-minimap-item__label" },
                s().createElement(
                  "span",
                  { className: "w-minimap-item__text" },
                  h,
                ),
                c ? g : null,
              ),
            );
          },
          h = { root: null, rootMargin: "-50px 0px -70px 0px", threshold: 0.1 },
          b = (e, { target: t, isIntersecting: n }) => {
            const a = t.closest("[data-panel]")?.id;
            return a ? ((e[`#${a}`] = n), e) : e;
          },
          v = ({
            container: e,
            anchorsContainer: t,
            links: n,
            onUpdate: a,
            toggleAllPanels: i,
          }) => {
            const c = (0, o.useMemo)(
                () =>
                  (() => {
                    let e = "false";
                    try {
                      e = localStorage.getItem("wagtail:minimap-expanded") || e;
                    } catch {}
                    return "true" === e;
                  })(),
                [],
              ),
              [d, g] = (0, o.useState)(c),
              v = (0, o.useCallback)(
                (e = !d) => {
                  g(e), document.body.classList.toggle("minimap-open", e);
                  try {
                    localStorage.setItem(
                      "wagtail:minimap-expanded",
                      e ? "true" : "false",
                    );
                  } catch {}
                },
                [d, g],
              ),
              [y, E] = (0, o.useState)(!0),
              [w, S] = (0, o.useState)({}),
              x = (0, o.useRef)(null),
              A = (0, o.useRef)({}),
              q = (0, o.useRef)(null),
              L = (0, o.useRef)(null),
              _ = (e, t) => {
                d || t.preventDefault(), l(e.toggle, !0), v(!0);
              };
            return (
              (0, o.useEffect)(() => {
                v(c);
              }, []),
              (0, o.useEffect)(() => {
                x.current ||
                  (x.current = new IntersectionObserver((t) => {
                    (A.current = t.reduce(b, { ...A.current })),
                      q.current ||
                        (q.current = (0, u.s)((e) => {
                          S(e),
                            ((e) => {
                              const t = e.querySelectorAll(
                                'a[aria-current="true"]',
                              );
                              if (
                                0 === t.length ||
                                e.scrollHeight === e.clientHeight
                              )
                                return;
                              const n = t[0],
                                a = t[t.length - 1];
                              let r = e.scrollTop;
                              n &&
                                n.offsetTop < e.scrollTop &&
                                (r = n.offsetTop),
                                a &&
                                  a.offsetTop > e.scrollTop + e.offsetHeight &&
                                  (r =
                                    a.offsetTop -
                                    e.offsetHeight +
                                    a.offsetHeight),
                                (e.scrollTop = r);
                            })(L.current);
                        }, 100)),
                      q.current(A.current),
                      t.forEach(({ target: t }) => {
                        t.closest(".deleted") && a(e);
                      });
                  }, h));
                const t = x.current;
                return (
                  t.disconnect(),
                  n.forEach(({ panel: e, toggle: n }) => {
                    const a =
                      e.matches(".w-panel--nested") &&
                      null === e.closest("[data-field]");
                    t.observe(a ? n : e);
                  }),
                  () => {
                    t.disconnect();
                  }
                );
              }, [n, e]),
              (0, o.useEffect)(() => {
                E(!0);
              }, [t, E]),
              s().createElement(
                "div",
                null,
                s().createElement(p, {
                  expanded: y,
                  onClick: () => {
                    E(!y), i(!y);
                  },
                  floating: !0,
                  insideMinimap: d,
                }),
                s().createElement(
                  "div",
                  {
                    className: "w-minimap " + (d ? "w-minimap--expanded" : ""),
                  },
                  s().createElement(
                    "div",
                    { className: "w-minimap__header" },
                    s().createElement(
                      "button",
                      {
                        id: "w-minimap-toggle",
                        type: "button",
                        "aria-expanded": d,
                        onClick: () => v(!d),
                        className: "w-minimap__toggle",
                        "aria-label": (0, r.AP)("Toggle side panel"),
                      },
                      s().createElement(m.A, { name: "expand-right" }),
                    ),
                  ),
                  s().createElement(
                    "ol",
                    { className: "w-minimap__list", ref: L },
                    n.map((e) =>
                      s().createElement(
                        "li",
                        { key: e.href },
                        s().createElement(f, {
                          item: e,
                          intersects: w[e.href],
                          expanded: d,
                          onClick: _,
                        }),
                      ),
                    ),
                  ),
                  s().createElement("div", { className: "w-minimap__footer" }),
                ),
              )
            );
          },
          y = (e) => {
            const t = e.closest("[data-panel]"),
              n = t?.getAttribute("aria-labelledby"),
              a = t?.querySelector(`#${n}`),
              r = t?.querySelector("[data-panel-toggle]"),
              l = e.closest("[data-inline-panel-child].deleted");
            if (!t || !a || !r || l) return null;
            const i = a.querySelector("[data-panel-heading-text]"),
              o =
                i?.textContent ||
                a.textContent?.replace(/\s+\*\s+$/g, "").trim(),
              s = null !== t.querySelector("[data-panel-required]"),
              c = r.querySelector("use"),
              d = c?.getAttribute("href")?.replace("#icon-", "") || "",
              u = `h${a.getAttribute("aria-level") || a.tagName[1] || 2}`,
              m = [].slice
                .call(t.querySelectorAll(".error-message"))
                .filter((e) => e.closest("[data-panel]") === t).length;
            return {
              anchor: e,
              toggle: r,
              panel: t,
              icon: d,
              label: o || "",
              href: e.getAttribute("href") || "",
              required: s,
              errorCount: m,
              level: u,
            };
          },
          E = (e) => {
            let t = document.body;
            const n = document.querySelector("[data-tabs]");
            if (n) {
              const e = n.querySelector('[role="tab"][aria-selected="true"]'),
                a = e?.getAttribute("aria-controls");
              t = n.querySelector(`#${a}`) || t;
            }
            const a = t.querySelectorAll("[data-panel-anchor]"),
              r = [].slice.call(a).map(y).filter(Boolean);
            d().render(
              s().createElement(v, {
                container: e,
                anchorsContainer: t,
                links: r,
                onUpdate: E,
                toggleAllPanels: (e) => {
                  r.forEach((t, n) => {
                    (0 === n && t.href.includes("title")) || l(t.toggle, e);
                  });
                },
              }),
              e,
            );
          };
        document.addEventListener("DOMContentLoaded", () => {
          (0, a.d)(),
            (function () {
              const e = document.querySelector("[data-form-side]");
              if (!e) return;
              const t = "formSideExplorer" in e.dataset,
                n = document.querySelector("[data-form-side-resize-grip]"),
                a = document.querySelector("[data-form-side-width-input]"),
                l = () => {
                  const t = getComputedStyle(e),
                    n = parseFloat(t.minWidth),
                    a = parseFloat(t.maxWidth),
                    r = parseFloat(t.width),
                    l = a - n;
                  return {
                    minWidth: n,
                    maxWidth: a,
                    width: r,
                    range: l,
                    percentage: ((r - n) / l) * 100,
                  };
                },
                i = (e) =>
                  "rtl" === document.documentElement.dir ? e : 100 - e;
              let o;
              const s = (n) => {
                clearTimeout(o);
                const r = document.querySelector("body"),
                  s = document.querySelector(`[data-side-panel-toggle="${n}"]`);
                if (
                  (!n || s) &&
                  ("" === n
                    ? (e.classList.remove("form-side--open"),
                      e.removeAttribute("aria-labelledby"))
                    : (e.classList.add("form-side--open"),
                      e.setAttribute(
                        "aria-labelledby",
                        `side-panel-${n}-title`,
                      )),
                  document
                    .querySelectorAll("[data-side-panel]")
                    .forEach((t) => {
                      const a = t.dataset.sidePanel;
                      if (a === n)
                        t.hidden &&
                          ((t.hidden = !1),
                          t.dispatchEvent(new CustomEvent("show")),
                          e.classList.add(`form-side--${a}`),
                          r.classList.add("side-panel-open"));
                      else if (!t.hidden) {
                        const l = () => {
                          (t.hidden = !0),
                            t.dispatchEvent(new CustomEvent("hide")),
                            e.classList.remove(`form-side--${a}`);
                        };
                        "" === n
                          ? (r.classList.remove("side-panel-open"),
                            (o = setTimeout(l, 500)))
                          : l();
                      }
                    }),
                  document
                    .querySelectorAll("[data-side-panel-toggle]")
                    .forEach((e) => {
                      e.setAttribute(
                        "aria-expanded",
                        e.dataset.sidePanelToggle === n ? "true" : "false",
                      );
                    }),
                  !t)
                ) {
                  try {
                    localStorage.setItem("wagtail:side-panel-open", n);
                  } catch (e) {}
                  setTimeout(() => {
                    const { percentage: e } = l();
                    a.value = i(e);
                  }, 500);
                }
              };
              document.querySelectorAll("[data-side-panel]").forEach((e) => {
                e.addEventListener("open", () => {
                  s(e.dataset.sidePanel);
                });
              }),
                document
                  .querySelectorAll("[data-side-panel-toggle]")
                  .forEach((e) => {
                    e.addEventListener("click", () => {
                      ((e) => {
                        const t = !document
                          .querySelector(`[data-side-panel="${e}"]`)
                          .hasAttribute("hidden");
                        s(t ? "" : e);
                      })(e.dataset.sidePanelToggle);
                    });
                  });
              const c = document.querySelector("[data-form-side-close-button]");
              c instanceof HTMLButtonElement &&
                c.addEventListener("click", () => {
                  s("");
                });
              const d = (e) => {
                const { minWidth: n, maxWidth: o, range: s, width: c } = l(),
                  d = parseInt(Math.max(n, Math.min(e, o)), 10) || c,
                  u = (0, r.WI)("%(num)s pixel", "%(num)s pixels", d).replace(
                    "%(num)s",
                    d,
                  );
                document.documentElement.style.setProperty(
                  "--side-panel-width",
                  `${d}px`,
                );
                const m = ((d - n) / s) * 100;
                if (((a.value = i(m)), a.setAttribute("aria-valuetext", u), !t))
                  try {
                    localStorage.setItem("wagtail:side-panel-width", d);
                  } catch (e) {}
              };
              let u, m;
              const p = (e) => {
                  if (!e.screenX || !u || !m) return;
                  const t = "rtl" === document.documentElement.dir ? -1 : 1,
                    n = u - e.screenX;
                  d(m + n * t);
                },
                g = (e) => {
                  n.releasePointerCapture(e.pointerId),
                    n.removeEventListener("pointermove", p),
                    document.removeEventListener("pointerup", g),
                    document.body.classList.remove("side-panel-resizing");
                };
              n.addEventListener("pointerdown", (e) => {
                0 === e.button &&
                  ((u = e.screenX),
                  (m = l().width),
                  document.body.classList.add("side-panel-resizing"),
                  n.setPointerCapture(e.pointerId),
                  n.addEventListener("pointermove", p),
                  document.addEventListener("pointerup", g));
              }),
                a.addEventListener("change", (e) => {
                  const { minWidth: t, range: n } = l(),
                    a = parseInt(e.target.value, 10),
                    r = i(a);
                  d(t + (n * r) / 100);
                }),
                setTimeout(() => {
                  try {
                    const e = localStorage.getItem("wagtail:side-panel-open");
                    !t && e && s(e),
                      d(localStorage.getItem("wagtail:side-panel-width"));
                  } catch (e) {}
                  setTimeout(() => {
                    e.classList.remove("form-side--initial");
                  });
                });
            })(),
            (function (e = document.querySelectorAll("[data-panel-toggle]")) {
              e.forEach(i);
            })();
        }),
          window.addEventListener("load", () => {
            !(function (e = document.querySelector("[data-panel]:target")) {
              e && e.scrollIntoView({ behavior: "smooth" });
            })(),
              ((e = document.querySelector("[data-minimap-container]")) => {
                if (!e) return;
                if (
                  !document.body.querySelectorAll("[data-panel-anchor]").length
                )
                  return;
                const t = (0, u.s)(E.bind(null, e), 100);
                document.addEventListener("wagtail:tab-changed", t),
                  document.addEventListener("wagtail:panel-init", t);
                const n = () =>
                    e.style.setProperty("--offset-top", `${e.offsetTop}px`),
                  a = (0, u.s)(n, 100);
                document.addEventListener("resize", a), n(), t(e);
              })();
          });
      },
    },
    n = {};
  function a(e) {
    var r = n[e];
    if (void 0 !== r) return r.exports;
    var l = (n[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(l.exports, l, l.exports, a), (l.loaded = !0), l.exports;
  }
  (a.m = t),
    (e = []),
    (a.O = (t, n, r, l) => {
      if (!n) {
        var i = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [n, r, l] = e[d], o = !0, s = 0; s < n.length; s++)
            (!1 & l || i >= l) && Object.keys(a.O).every((e) => a.O[e](n[s]))
              ? n.splice(s--, 1)
              : ((o = !1), l < i && (i = l));
          if (o) {
            e.splice(d--, 1);
            var c = r();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      l = l || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > l; d--) e[d] = e[d - 1];
      e[d] = [n, r, l];
    }),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (a.d = (e, t) => {
      for (var n in t)
        a.o(t, n) &&
          !a.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
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
    (a.j = 445),
    (() => {
      var e = { 445: 0 };
      a.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var r,
            l,
            [i, o, s] = n,
            c = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (r in o) a.o(o, r) && (a.m[r] = o[r]);
            if (s) var d = s(a);
          }
          for (t && t(n); c < i.length; c++)
            (l = i[c]), a.o(e, l) && e[l] && e[l][0](), (e[l] = 0);
          return a.O(d);
        },
        n = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })();
  var r = a.O(void 0, [321], () => a(412));
  r = a.O(r);
})();
