(() => {
  "use strict";
  var e,
    t = {
      6788: (e, t, l) => {
        var r = l(1669),
          a = l.n(r);
        a()(() => {
          a()('[data-widget="filtered-select"]').each(function () {
            const e = a()("#" + this.dataset.filterField),
              t = a()(this),
              l = [];
            function r() {
              const r = t.val();
              t.empty();
              const o = e.val();
              let i;
              if ("" === o) i = l;
              else {
                i = [];
                for (let e = 0; e < l.length; e += 1)
                  ("" !== l[e].value && -1 === l[e].filterValue.indexOf(o)) ||
                    i.push(l[e]);
              }
              let n = !1;
              for (let e = 0; e < i.length; e += 1) {
                const l = a()("<option>");
                l.attr("value", i[e].value),
                  i[e].value === r && (n = !0),
                  l.text(i[e].label),
                  t.append(l);
              }
              n ? t.val(r) : t.val("");
            }
            a()("option", this).each(function () {
              let e;
              (e =
                "filterValue" in this.dataset
                  ? this.dataset.filterValue.split(",")
                  : []),
                l.push({
                  value: this.value,
                  label: this.label,
                  filterValue: e,
                });
            }),
              r(),
              e.change(r);
          });
        });
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    l = {};
  function r(e) {
    var a = l[e];
    if (void 0 !== a) return a.exports;
    var o = (l[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
  }
  (r.m = t),
    (e = []),
    (r.O = (t, l, a, o) => {
      if (!l) {
        var i = 1 / 0;
        for (f = 0; f < e.length; f++) {
          for (var [l, a, o] = e[f], n = !0, s = 0; s < l.length; s++)
            (!1 & o || i >= o) && Object.keys(r.O).every((e) => r.O[e](l[s]))
              ? l.splice(s--, 1)
              : ((n = !1), o < i && (i = o));
          if (n) {
            e.splice(f--, 1);
            var u = a();
            void 0 !== u && (t = u);
          }
        }
        return t;
      }
      o = o || 0;
      for (var f = e.length; f > 0 && e[f - 1][2] > o; f--) e[f] = e[f - 1];
      e[f] = [l, a, o];
    }),
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
    (r.d = (e, t) => {
      for (var l in t)
        r.o(t, l) &&
          !r.o(e, l) &&
          Object.defineProperty(e, l, { enumerable: !0, get: t[l] });
    }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (r.j = 491),
    (() => {
      var e = { 491: 0 };
      r.O.j = (t) => 0 === e[t];
      var t = (t, l) => {
          var a,
            o,
            [i, n, s] = l,
            u = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (a in n) r.o(n, a) && (r.m[a] = n[a]);
            if (s) var f = s(r);
          }
          for (t && t(l); u < i.length; u++)
            (o = i[u]), r.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return r.O(f);
        },
        l = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      l.forEach(t.bind(null, 0)), (l.push = t.bind(null, l.push.bind(l)));
    })();
  var a = r.O(void 0, [321], () => r(6788));
  a = r.O(a);
})();
