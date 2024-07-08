(() => {
  "use strict";
  var e,
    r = {
      2045: (e, r, o) => {
        var t = o(1669),
          a = o.n(t);
        window.createTaskChooser = function (e) {
          const r = a()("#" + e + "-chooser"),
            o = r.find("[data-chooser-title]"),
            t = a()("#" + e),
            n = r.find("[data-chooser-edit-link]");
          a()("[data-chooser-action-choose]", r).on("click", () => {
            ModalWorkflow({
              url: r.data("chooserUrl"),
              onload: TASK_CHOOSER_MODAL_ONLOAD_HANDLERS,
              responses: {
                taskChosen(e) {
                  t.val(e.id),
                    o.text(e.name),
                    r.removeClass("blank"),
                    n.attr("href", e.edit_url);
                },
              },
            });
          });
        };
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    o = {};
  function t(e) {
    var a = o[e];
    if (void 0 !== a) return a.exports;
    var n = (o[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(n.exports, n, n.exports, t), (n.loaded = !0), n.exports;
  }
  (t.m = r),
    (e = []),
    (t.O = (r, o, a, n) => {
      if (!o) {
        var i = 1 / 0;
        for (c = 0; c < e.length; c++) {
          for (var [o, a, n] = e[c], l = !0, s = 0; s < o.length; s++)
            (!1 & n || i >= n) && Object.keys(t.O).every((e) => t.O[e](o[s]))
              ? o.splice(s--, 1)
              : ((l = !1), n < i && (i = n));
          if (l) {
            e.splice(c--, 1);
            var d = a();
            void 0 !== d && (r = d);
          }
        }
        return r;
      }
      n = n || 0;
      for (var c = e.length; c > 0 && e[c - 1][2] > n; c--) e[c] = e[c - 1];
      e[c] = [o, a, n];
    }),
    (t.n = (e) => {
      var r = e && e.__esModule ? () => e.default : () => e;
      return t.d(r, { a: r }), r;
    }),
    (t.d = (e, r) => {
      for (var o in r)
        t.o(r, o) &&
          !t.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: r[o] });
    }),
    (t.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (t.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (t.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (t.j = 764),
    (() => {
      var e = { 764: 0 };
      t.O.j = (r) => 0 === e[r];
      var r = (r, o) => {
          var a,
            n,
            [i, l, s] = o,
            d = 0;
          if (i.some((r) => 0 !== e[r])) {
            for (a in l) t.o(l, a) && (t.m[a] = l[a]);
            if (s) var c = s(t);
          }
          for (r && r(o); d < i.length; d++)
            (n = i[d]), t.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
          return t.O(c);
        },
        o = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      o.forEach(r.bind(null, 0)), (o.push = r.bind(null, o.push.bind(o)));
    })();
  var a = t.O(void 0, [321], () => t(2045));
  a = t.O(a);
})();
