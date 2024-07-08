(() => {
  "use strict";
  var e,
    r = {
      4967: (e, r, i) => {
        var a = i(1669),
          t = i.n(a);
        t()(() => {
          t()('[data-a11y-dialog-show="set-privacy"]').on("click", function () {
            return (
              ModalWorkflow({
                dialogId: "set-privacy",
                url: this.getAttribute("data-url"),
                onload: {
                  set_privacy(e) {
                    t()("form", e.body).on("submit", function () {
                      return e.postForm(this.action, t()(this).serialize()), !1;
                    });
                    const r = t()(
                        "input[name='restriction_type'][value='password']",
                        e.body,
                      ),
                      i = t()(
                        "input[name='restriction_type'][value='groups']",
                        e.body,
                      ),
                      a = t()('[name="password"]', e.body).parents(
                        "[data-field-wrapper]",
                      ),
                      o = t()("#groups-fields", e.body);
                    function n() {
                      r.is(":checked")
                        ? (a.show(), o.hide())
                        : i.is(":checked")
                        ? (a.hide(), o.show())
                        : (a.hide(), o.hide());
                    }
                    n(),
                      t()("input[name='restriction_type']", e.body).on(
                        "change",
                        n,
                      );
                  },
                  set_privacy_done(e, r) {
                    e.respond("setPermission", r.is_public), e.close();
                  },
                },
                responses: {
                  setPermission(e) {
                    e
                      ? (t()("[data-privacy-sidebar-public]").removeClass(
                          "w-hidden",
                        ),
                        t()("[data-privacy-sidebar-private]").addClass(
                          "w-hidden",
                        ),
                        t()(".privacy-indicator")
                          .removeClass("private")
                          .addClass("public"),
                        t()(".privacy-indicator-icon use").attr(
                          "href",
                          "#icon-view",
                        ))
                      : (t()("[data-privacy-sidebar-public]").addClass(
                          "w-hidden",
                        ),
                        t()("[data-privacy-sidebar-private]").removeClass(
                          "w-hidden",
                        ),
                        t()(".privacy-indicator")
                          .removeClass("public")
                          .addClass("private"),
                        t()(".privacy-indicator-icon use").attr(
                          "href",
                          "#icon-no-view",
                        ));
                  },
                },
              }),
              !1
            );
          });
        });
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    i = {};
  function a(e) {
    var t = i[e];
    if (void 0 !== t) return t.exports;
    var o = (i[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(o.exports, o, o.exports, a), (o.loaded = !0), o.exports;
  }
  (a.m = r),
    (e = []),
    (a.O = (r, i, t, o) => {
      if (!i) {
        var n = 1 / 0;
        for (c = 0; c < e.length; c++) {
          for (var [i, t, o] = e[c], s = !0, d = 0; d < i.length; d++)
            (!1 & o || n >= o) && Object.keys(a.O).every((e) => a.O[e](i[d]))
              ? i.splice(d--, 1)
              : ((s = !1), o < n && (n = o));
          if (s) {
            e.splice(c--, 1);
            var l = t();
            void 0 !== l && (r = l);
          }
        }
        return r;
      }
      o = o || 0;
      for (var c = e.length; c > 0 && e[c - 1][2] > o; c--) e[c] = e[c - 1];
      e[c] = [i, t, o];
    }),
    (a.n = (e) => {
      var r = e && e.__esModule ? () => e.default : () => e;
      return a.d(r, { a: r }), r;
    }),
    (a.d = (e, r) => {
      for (var i in r)
        a.o(r, i) &&
          !a.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: r[i] });
    }),
    (a.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (a.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (a.j = 658),
    (() => {
      var e = { 658: 0 };
      a.O.j = (r) => 0 === e[r];
      var r = (r, i) => {
          var t,
            o,
            [n, s, d] = i,
            l = 0;
          if (n.some((r) => 0 !== e[r])) {
            for (t in s) a.o(s, t) && (a.m[t] = s[t]);
            if (d) var c = d(a);
          }
          for (r && r(i); l < n.length; l++)
            (o = n[l]), a.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return a.O(c);
        },
        i = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      i.forEach(r.bind(null, 0)), (i.push = r.bind(null, i.push.bind(i)));
    })();
  var t = a.O(void 0, [321], () => a(4967));
  t = a.O(t);
})();
