(() => {
  "use strict";
  var e,
    r = {
      6173: (e, r, t) => {
        var o = t(3410);
        window.buildExpandingFormset = function (e, r = {}) {
          return new o.n(e, r);
        };
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    t = {};
  function o(e) {
    var n = t[e];
    if (void 0 !== n) return n.exports;
    var i = (t[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(i.exports, i, i.exports, o), (i.loaded = !0), i.exports;
  }
  (o.m = r),
    (e = []),
    (o.O = (r, t, n, i) => {
      if (!t) {
        var a = 1 / 0;
        for (f = 0; f < e.length; f++) {
          for (var [t, n, i] = e[f], l = !0, u = 0; u < t.length; u++)
            (!1 & i || a >= i) && Object.keys(o.O).every((e) => o.O[e](t[u]))
              ? t.splice(u--, 1)
              : ((l = !1), i < a && (a = i));
          if (l) {
            e.splice(f--, 1);
            var d = n();
            void 0 !== d && (r = d);
          }
        }
        return r;
      }
      i = i || 0;
      for (var f = e.length; f > 0 && e[f - 1][2] > i; f--) e[f] = e[f - 1];
      e[f] = [t, n, i];
    }),
    (o.n = (e) => {
      var r = e && e.__esModule ? () => e.default : () => e;
      return o.d(r, { a: r }), r;
    }),
    (o.d = (e, r) => {
      for (var t in r)
        o.o(r, t) &&
          !o.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: r[t] });
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (o.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (o.j = 184),
    (() => {
      var e = { 184: 0 };
      o.O.j = (r) => 0 === e[r];
      var r = (r, t) => {
          var n,
            i,
            [a, l, u] = t,
            d = 0;
          if (a.some((r) => 0 !== e[r])) {
            for (n in l) o.o(l, n) && (o.m[n] = l[n]);
            if (u) var f = u(o);
          }
          for (r && r(t); d < a.length; d++)
            (i = a[d]), o.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return o.O(f);
        },
        t = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      t.forEach(r.bind(null, 0)), (t.push = r.bind(null, t.push.bind(t)));
    })();
  var n = o.O(void 0, [321], () => o(6173));
  n = o.O(n);
})();
