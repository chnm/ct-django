(() => {
  "use strict";
  var e,
    t = {
      6881: (e, t, r) => {
        var o = r(1669),
          n = r.n(o),
          a = r(6664),
          i = r(2614);
        const s = (e) => {
            n()(
              "#tab-new a.task-type-choice, #tab-new a.choose-different-task-type",
              e.body,
            ).on("click", function () {
              return e.loadUrl(this.href), !1;
            }),
              n()("form.task-create", e.body).on("submit", function () {
                return (
                  (0, i.Ch)(e, this, { errorContainerSelector: "#tab-new" }), !1
                );
              });
          },
          c = {
            chooser(e, t) {
              const r = n()("form.task-search", e.body)[0];
              !(function t(o) {
                n()("a.task-choice", o).on("click", function () {
                  return e.loadUrl(this.href), !1;
                }),
                  n()(".pagination a", o).on("click", function () {
                    const e = this.href;
                    return (
                      r.dispatchEvent(
                        new CustomEvent("navigate", { detail: { url: e } }),
                      ),
                      !1
                    );
                  }),
                  (0, a.d)(),
                  e.body[0].addEventListener(
                    "w-swap:success",
                    ({ srcElement: e }) => t(n()(e)),
                    { once: !0 },
                  );
              })(e.body),
                s(e);
            },
            task_chosen(e, t) {
              e.respond("taskChosen", t.result), e.close();
            },
            reshow_create_tab(e, t) {
              n()("#tab-new", e.body).html(t.htmlFragment), s(e);
            },
          };
        window.TASK_CHOOSER_MODAL_ONLOAD_HANDLERS = c;
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    r = {};
  function o(e) {
    var n = r[e];
    if (void 0 !== n) return n.exports;
    var a = (r[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(a.exports, a, a.exports, o), (a.loaded = !0), a.exports;
  }
  (o.m = t),
    (e = []),
    (o.O = (t, r, n, a) => {
      if (!r) {
        var i = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [r, n, a] = e[d], s = !0, c = 0; c < r.length; c++)
            (!1 & a || i >= a) && Object.keys(o.O).every((e) => o.O[e](r[c]))
              ? r.splice(c--, 1)
              : ((s = !1), a < i && (i = a));
          if (s) {
            e.splice(d--, 1);
            var l = n();
            void 0 !== l && (t = l);
          }
        }
        return t;
      }
      a = a || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > a; d--) e[d] = e[d - 1];
      e[d] = [r, n, a];
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
    (o.j = 316),
    (() => {
      var e = { 316: 0 };
      o.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var n,
            a,
            [i, s, c] = r,
            l = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (n in s) o.o(s, n) && (o.m[n] = s[n]);
            if (c) var d = c(o);
          }
          for (t && t(r); l < i.length; l++)
            (a = i[l]), o.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
          return o.O(d);
        },
        r = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var n = o.O(void 0, [321], () => o(6881));
  n = o.O(n);
})();
