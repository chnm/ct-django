(() => {
  "use strict";
  var e,
    t = {
      9210: (e, t, o) => {
        var s = o(9465);
        class r extends s.y {
          chooserModalClass = PageChooserModal;
          titleStateKey = "adminTitle";
          editUrlStateKey = "editUrl";
          constructor(e, t, o) {
            let s;
            (s = o || "number" == typeof t ? { parentId: t, ...o } : t || {}),
              super(e, s);
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
        class a extends s._ {
          widgetClass = r;
          chooserModalClass = PageChooserModal;
          getModalOptions() {
            return {
              modelNames: this.opts.modelNames,
              targetPages: this.opts.targetPages,
              matchSubclass: this.opts.matchSubclass,
              canChooseRoot: this.opts.canChooseRoot,
              userPerms: this.opts.userPerms,
            };
          }
        }
        window.telepath.register("wagtail.widgets.PageChooser", a);
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    o = {};
  function s(e) {
    var r = o[e];
    if (void 0 !== r) return r.exports;
    var a = (o[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(a.exports, a, a.exports, s), (a.loaded = !0), a.exports;
  }
  (s.m = t),
    (e = []),
    (s.O = (t, o, r, a) => {
      if (!o) {
        var n = 1 / 0;
        for (h = 0; h < e.length; h++) {
          for (var [o, r, a] = e[h], i = !0, l = 0; l < o.length; l++)
            (!1 & a || n >= a) && Object.keys(s.O).every((e) => s.O[e](o[l]))
              ? o.splice(l--, 1)
              : ((i = !1), a < n && (n = a));
          if (i) {
            e.splice(h--, 1);
            var d = r();
            void 0 !== d && (t = d);
          }
        }
        return t;
      }
      a = a || 0;
      for (var h = e.length; h > 0 && e[h - 1][2] > a; h--) e[h] = e[h - 1];
      e[h] = [o, r, a];
    }),
    (s.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return s.d(t, { a: t }), t;
    }),
    (s.d = (e, t) => {
      for (var o in t)
        s.o(t, o) &&
          !s.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
    (s.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (s.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (s.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (s.j = 986),
    (() => {
      var e = { 986: 0 };
      s.O.j = (t) => 0 === e[t];
      var t = (t, o) => {
          var r,
            a,
            [n, i, l] = o,
            d = 0;
          if (n.some((t) => 0 !== e[t])) {
            for (r in i) s.o(i, r) && (s.m[r] = i[r]);
            if (l) var h = l(s);
          }
          for (t && t(o); d < n.length; d++)
            (a = n[d]), s.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
          return s.O(h);
        },
        o = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o)));
    })();
  var r = s.O(void 0, [321], () => s(9210));
  r = s.O(r);
})();