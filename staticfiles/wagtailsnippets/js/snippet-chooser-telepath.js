(() => {
  "use strict";
  var e,
    r = {
      8039: (e, r, t) => {
        var o = t(2614),
          a = t(9465);
        class n extends o.ZZ {
          getURLParams(e) {
            const r = super.getURLParams(e);
            return (
              wagtailConfig.ACTIVE_CONTENT_LOCALE &&
                (r.locale = wagtailConfig.ACTIVE_CONTENT_LOCALE),
              r
            );
          }
        }
        class i extends a.y {
          titleStateKey = "string";
          chooserModalClass = n;
        }
        class l extends a._ {
          widgetClass = i;
          chooserModalClass = n;
        }
        window.telepath.register("wagtail.snippets.widgets.SnippetChooser", l);
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    t = {};
  function o(e) {
    var a = t[e];
    if (void 0 !== a) return a.exports;
    var n = (t[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(n.exports, n, n.exports, o), (n.loaded = !0), n.exports;
  }
  (o.m = r),
    (e = []),
    (o.O = (r, t, a, n) => {
      if (!t) {
        var i = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [t, a, n] = e[u], l = !0, s = 0; s < t.length; s++)
            (!1 & n || i >= n) && Object.keys(o.O).every((e) => o.O[e](t[s]))
              ? t.splice(s--, 1)
              : ((l = !1), n < i && (i = n));
          if (l) {
            e.splice(u--, 1);
            var d = a();
            void 0 !== d && (r = d);
          }
        }
        return r;
      }
      n = n || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > n; u--) e[u] = e[u - 1];
      e[u] = [t, a, n];
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
    (o.j = 474),
    (() => {
      var e = { 474: 0 };
      o.O.j = (r) => 0 === e[r];
      var r = (r, t) => {
          var a,
            n,
            [i, l, s] = t,
            d = 0;
          if (i.some((r) => 0 !== e[r])) {
            for (a in l) o.o(l, a) && (o.m[a] = l[a]);
            if (s) var u = s(o);
          }
          for (r && r(t); d < i.length; d++)
            (n = i[d]), o.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
          return o.O(u);
        },
        t = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      t.forEach(r.bind(null, 0)), (t.push = r.bind(null, t.push.bind(t)));
    })();
  var a = o.O(void 0, [321], () => o(8039));
  a = o.O(a);
})();
