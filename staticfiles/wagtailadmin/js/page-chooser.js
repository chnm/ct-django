(() => {
  "use strict";
  var e,
    t = {
      386: (e, t, r) => {
        var o = r(9465);
        class a extends o.y {
          chooserModalClass = PageChooserModal;
          titleStateKey = "adminTitle";
          editUrlStateKey = "editUrl";
          constructor(e, t, r) {
            let o;
            (o = r || "number" == typeof t ? { parentId: t, ...r } : t || {}),
              super(e, o);
          }
          getStateFromHTML() {
            const e = super.getStateFromHTML();
            return e && (e.parentId = this.opts.parentId), e;
          }
          getModalOptions() {
            const e = {
              modelNames: this.opts.modelNames,
              targetPages: this.opts.targetPages,
              matchSubclass: this.opts.matchSubclass,
              canChooseRoot: this.opts.canChooseRoot,
              userPerms: this.opts.userPerms,
            };
            return (
              this.state &&
                this.state.parentId &&
                (e.parentId = this.state.parentId),
              e
            );
          }
        }
        window.PageChooser = a;
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    r = {};
  function o(e) {
    var a = r[e];
    if (void 0 !== a) return a.exports;
    var s = (r[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(s.exports, s, s.exports, o), (s.loaded = !0), s.exports;
  }
  (o.m = t),
    (e = []),
    (o.O = (t, r, a, s) => {
      if (!r) {
        var n = 1 / 0;
        for (p = 0; p < e.length; p++) {
          for (var [r, a, s] = e[p], i = !0, l = 0; l < r.length; l++)
            (!1 & s || n >= s) && Object.keys(o.O).every((e) => o.O[e](r[l]))
              ? r.splice(l--, 1)
              : ((i = !1), s < n && (n = s));
          if (i) {
            e.splice(p--, 1);
            var d = a();
            void 0 !== d && (t = d);
          }
        }
        return t;
      }
      s = s || 0;
      for (var p = e.length; p > 0 && e[p - 1][2] > s; p--) e[p] = e[p - 1];
      e[p] = [r, a, s];
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
    (o.j = 654),
    (() => {
      var e = { 654: 0 };
      o.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var a,
            s,
            [n, i, l] = r,
            d = 0;
          if (n.some((t) => 0 !== e[t])) {
            for (a in i) o.o(i, a) && (o.m[a] = i[a]);
            if (l) var p = l(o);
          }
          for (t && t(r); d < n.length; d++)
            (s = n[d]), o.o(e, s) && e[s] && e[s][0](), (e[s] = 0);
          return o.O(p);
        },
        r = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var a = o.O(void 0, [321], () => o(386));
  a = o.O(a);
})();
