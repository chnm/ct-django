(() => {
  "use strict";
  var e,
    r = {
      7023: (e, r, o) => {
        var t = o(9465);
        class n extends t.y {
          chooserModalClass = DocumentChooserModal;
        }
        (window.DocumentChooser = n), (window.DocumentChooser = n);
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    o = {};
  function t(e) {
    var n = o[e];
    if (void 0 !== n) return n.exports;
    var a = (o[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(a.exports, a, a.exports, t), (a.loaded = !0), a.exports;
  }
  (t.m = r),
    (e = []),
    (t.O = (r, o, n, a) => {
      if (!o) {
        var i = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [o, n, a] = e[u], l = !0, s = 0; s < o.length; s++)
            (!1 & a || i >= a) && Object.keys(t.O).every((e) => t.O[e](o[s]))
              ? o.splice(s--, 1)
              : ((l = !1), a < i && (i = a));
          if (l) {
            e.splice(u--, 1);
            var d = n();
            void 0 !== d && (r = d);
          }
        }
        return r;
      }
      a = a || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > a; u--) e[u] = e[u - 1];
      e[u] = [o, n, a];
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
    (t.j = 844),
    (() => {
      var e = { 844: 0 };
      t.O.j = (r) => 0 === e[r];
      var r = (r, o) => {
          var n,
            a,
            [i, l, s] = o,
            d = 0;
          if (i.some((r) => 0 !== e[r])) {
            for (n in l) t.o(l, n) && (t.m[n] = l[n]);
            if (s) var u = s(t);
          }
          for (r && r(o); d < i.length; d++)
            (a = i[d]), t.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
          return t.O(u);
        },
        o = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      o.forEach(r.bind(null, 0)), (o.push = r.bind(null, o.push.bind(o)));
    })();
  var n = t.O(void 0, [321], () => t(7023));
  n = t.O(n);
})();
