(() => {
  "use strict";
  var e,
    r = {
      8878: (e, r, t) => {
        var o = t(9465);
        window.telepath.register("wagtail.admin.widgets.Chooser", o._);
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
        for (s = 0; s < e.length; s++) {
          for (var [t, n, i] = e[s], l = !0, d = 0; d < t.length; d++)
            (!1 & i || a >= i) && Object.keys(o.O).every((e) => o.O[e](t[d]))
              ? t.splice(d--, 1)
              : ((l = !1), i < a && (a = i));
          if (l) {
            e.splice(s--, 1);
            var u = n();
            void 0 !== u && (r = u);
          }
        }
        return r;
      }
      i = i || 0;
      for (var s = e.length; s > 0 && e[s - 1][2] > i; s--) e[s] = e[s - 1];
      e[s] = [t, n, i];
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
    (o.j = 577),
    (() => {
      var e = { 577: 0 };
      o.O.j = (r) => 0 === e[r];
      var r = (r, t) => {
          var n,
            i,
            [a, l, d] = t,
            u = 0;
          if (a.some((r) => 0 !== e[r])) {
            for (n in l) o.o(l, n) && (o.m[n] = l[n]);
            if (d) var s = d(o);
          }
          for (r && r(t); u < a.length; u++)
            (i = a[u]), o.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return o.O(s);
        },
        t = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      t.forEach(r.bind(null, 0)), (t.push = r.bind(null, t.push.bind(t)));
    })();
  var n = o.O(void 0, [321], () => o(8878));
  n = o.O(n);
})();
