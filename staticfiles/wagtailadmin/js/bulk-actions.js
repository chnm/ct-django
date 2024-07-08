(() => {
  "use strict";
  var e,
    t = {
      4625: (e, t, c) => {
        var n = c(9675);
        const o = "[data-bulk-action-checkbox]",
          r = "[data-bulk-action-select-all-checkbox]",
          d = "[data-bulk-action-footer]",
          a = "[data-bulk-action-num-objects]",
          l = "[data-bulk-action-num-objects-in-listing]";
        let i = {};
        function s(e) {
          return wagtailConfig.STRINGS.BULK_ACTIONS[
            wagtailConfig.BULK_ACTION_ITEM_TYPE
          ]
            ? wagtailConfig.STRINGS.BULK_ACTIONS[
                wagtailConfig.BULK_ACTION_ITEM_TYPE
              ][e]
            : wagtailConfig.STRINGS.BULK_ACTIONS.ITEM[e];
        }
        function u(e) {
          document.querySelectorAll(r).forEach((t) => {
            t.checked = e.target.checked;
          });
          const t = new Event("change");
          document.querySelectorAll(o).forEach((c) => {
            c.checked !== e.target.checked &&
              ((c.checked = e.target.checked),
              e.target.checked
                ? c.dispatchEvent(t)
                : c.classList.remove("show"));
          }),
            e.target.checked ||
              (i.checkedObjects.clear(),
              document.querySelector(d).classList.add("hidden"));
        }
        function h(e) {
          if (e.shiftKey && i.prevCheckedObject) {
            const t = [...document.querySelectorAll(o)],
              c = t.findIndex(
                (e) => e.dataset.objectId === i.prevCheckedObject,
              ),
              r = t.findIndex(
                (t) => t.dataset.objectId === e.target.dataset.objectId,
              ),
              d = (c > r ? r : c) + 1,
              a = c <= r ? r : c;
            (0, n.y)(d, a).forEach((e) => {
              const n = new Event("change");
              (t[e].checked = t[c].checked), t[e].dispatchEvent(n);
            }),
              (i.prevCheckedObject = e.target.dataset.objectId);
          }
        }
        function f(e) {
          i.selectAllInListing && (i.selectAllInListing = !1);
          const t = i.checkedObjects.size;
          e.target.checked
            ? i.checkedObjects.add(e.target.dataset.objectId)
            : (document.querySelectorAll(r).forEach((e) => {
                e.checked = !1;
              }),
              i.checkedObjects.delete(e.target.dataset.objectId));
          const c = i.checkedObjects.size;
          if (
            (0 === c
              ? (document.querySelector(d).classList.add("hidden"),
                document
                  .querySelectorAll(o)
                  .forEach((e) => e.classList.remove("show")))
              : 1 === c &&
                0 === t &&
                (document.querySelectorAll(o).forEach((e) => {
                  e.classList.add("show");
                }),
                document.querySelector(d).classList.remove("hidden")),
            c === i.numObjects
              ? (document.querySelectorAll(r).forEach((e) => {
                  e.checked = !0;
                }),
                i.shouldShowAllInListingText &&
                  document.querySelector(l).classList.remove("w-hidden"))
              : i.shouldShowAllInListingText &&
                document.querySelector(l).classList.add("w-hidden"),
            c > 0)
          ) {
            let e = "";
            (e =
              1 === c
                ? s("SINGULAR")
                : c === i.numObjects
                ? s("ALL").replace("%(objects)s", c)
                : s("PLURAL").replace("%(objects)s", c)),
              (document.querySelector(a).textContent = e);
          }
          i.prevCheckedObject = e.target.dataset.objectId;
        }
        function b(e) {
          e.preventDefault(),
            (i.selectAllInListing = !0),
            (document.querySelector(a).textContent = `${s("ALL_IN_LISTING")}.`),
            document.querySelector(l).classList.add("w-hidden");
        }
        function g(e) {
          e.preventDefault();
          const t = e.target.getAttribute("href"),
            c = new URLSearchParams(window.location.search);
          if (i.selectAllInListing) {
            c.append("id", "all");
            const e = document.querySelector("[data-bulk-action-parent-id]");
            if (e) {
              const t = e.dataset.bulkActionParentId;
              c.append("childOf", t);
            }
          } else
            i.checkedObjects.forEach((e) => {
              c.append("id", e);
            });
          window.location.href = `${t}&${c.toString()}`;
        }
        document.addEventListener("DOMContentLoaded", function () {
          i = {
            checkedObjects: new Set(),
            numObjects: 0,
            selectAllInListing: !1,
            shouldShowAllInListingText: !0,
            prevCheckedObject: null,
          };
          const e = new Event("change");
          document.querySelectorAll(o).forEach((e) => {
            (i.numObjects += 1),
              e.addEventListener("change", f),
              e.addEventListener("click", h);
          }),
            document.querySelectorAll(r).forEach((e) => {
              e.addEventListener("change", u);
            }),
            document
              .querySelectorAll(`${d} [data-bulk-action-button]`)
              .forEach((e) => e.addEventListener("click", g)),
            document.addEventListener("w-dropdown:shown", () => {
              document
                .querySelectorAll(`${d} [data-bulk-action-button]`)
                .forEach((e) => {
                  e.removeEventListener("click", g),
                    e.addEventListener("click", g);
                });
            });
          const t = document.querySelector(l);
          t
            ? t.addEventListener("click", b)
            : (i.shouldShowAllInListingText = !1),
            document.querySelectorAll(o).forEach((t) => {
              t.checked && t.dispatchEvent(e);
            });
        }),
          document.addEventListener("w-swap:success", function () {
            document.querySelectorAll(r).forEach((e) => {
              e.checked = !1;
            }),
              document.querySelector(d).classList.add("hidden"),
              document.querySelectorAll(r).forEach((e) => {
                e.removeEventListener("change", u),
                  e.addEventListener("change", u);
              }),
              i.checkedObjects.clear(),
              (i.numObjects = 0),
              document.querySelectorAll(o).forEach((e) => {
                (i.numObjects += 1), e.addEventListener("change", f);
              });
          });
      },
    },
    c = {};
  function n(e) {
    var o = c[e];
    if (void 0 !== o) return o.exports;
    var r = (c[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(r.exports, r, r.exports, n), (r.loaded = !0), r.exports;
  }
  (n.m = t),
    (e = []),
    (n.O = (t, c, o, r) => {
      if (!c) {
        var d = 1 / 0;
        for (s = 0; s < e.length; s++) {
          for (var [c, o, r] = e[s], a = !0, l = 0; l < c.length; l++)
            (!1 & r || d >= r) && Object.keys(n.O).every((e) => n.O[e](c[l]))
              ? c.splice(l--, 1)
              : ((a = !1), r < d && (d = r));
          if (a) {
            e.splice(s--, 1);
            var i = o();
            void 0 !== i && (t = i);
          }
        }
        return t;
      }
      r = r || 0;
      for (var s = e.length; s > 0 && e[s - 1][2] > r; s--) e[s] = e[s - 1];
      e[s] = [c, o, r];
    }),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var c in t)
        n.o(t, c) &&
          !n.o(e, c) &&
          Object.defineProperty(e, c, { enumerable: !0, get: t[c] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (n.j = 217),
    (() => {
      var e = { 217: 0 };
      n.O.j = (t) => 0 === e[t];
      var t = (t, c) => {
          var o,
            r,
            [d, a, l] = c,
            i = 0;
          if (d.some((t) => 0 !== e[t])) {
            for (o in a) n.o(a, o) && (n.m[o] = a[o]);
            if (l) var s = l(n);
          }
          for (t && t(c); i < d.length; i++)
            (r = d[i]), n.o(e, r) && e[r] && e[r][0](), (e[r] = 0);
          return n.O(s);
        },
        c = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      c.forEach(t.bind(null, 0)), (c.push = t.bind(null, c.push.bind(c)));
    })();
  var o = n.O(void 0, [321], () => n(4625));
  o = n.O(o);
})();
