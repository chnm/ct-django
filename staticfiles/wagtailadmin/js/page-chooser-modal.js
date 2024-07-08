(() => {
  "use strict";
  var e,
    t = {
      4251: (e, t, o) => {
        var r = o(1669),
          n = o.n(r),
          a = o(2614);
        const i = {
          browse(e, t) {
            n()(".link-types a", e.body).on("click", function () {
              return e.loadUrl(this.href), !1;
            }),
              n()("[data-locale-selector-link]", e.body).on(
                "click",
                function () {
                  return e.loadUrl(this.href), !1;
                },
              ),
              e.ajaxifyForm(n()("form.search-form", e.body));
            const o = n()("form.search-form", e.body).attr("action"),
              r = n()(".page-results", e.body).html();
            let a;
            function i() {
              const t = n()("#id_q", e.body).val();
              return (
                "" !== t
                  ? (a = n().ajax({
                      url: o,
                      data: { q: t },
                      success(t) {
                        (a = null), n()(".page-results", e.body).html(t), s();
                      },
                      error() {
                        a = null;
                      },
                    }))
                  : (n()(".page-results", e.body).html(r), c()),
                !1
              );
            }
            function s() {
              n()(".page-results a.choose-page", e.body).on(
                "click",
                function () {
                  const t = n()(this).data();
                  return e.respond("pageChosen", t), e.close(), !1;
                },
              ),
                n()(
                  '.page-results a.navigate-pages, .page-results [data-w-breadcrumbs-target~="content"] a',
                  e.body,
                ).on("click", function () {
                  return n()(".page-results", e.body).load(this.href, s), !1;
                }),
                n()(".page-results a.navigate-parent", e.body).on(
                  "click",
                  function () {
                    return e.loadUrl(this.href), !1;
                  },
                );
            }
            function l() {
              n()("[data-multiple-choice-select]:checked", e.body).length
                ? n()("[data-multiple-choice-submit]", e.body).removeAttr(
                    "disabled",
                  )
                : n()("[data-multiple-choice-submit]", e.body).attr(
                    "disabled",
                    !0,
                  );
            }
            function c() {
              n()(
                '.page-results a.navigate-pages, .page-results [data-w-breadcrumbs-target~="content"] a',
                e.body,
              ).on("click", function () {
                return e.loadUrl(this.href), !1;
              }),
                n()("a.choose-page", e.body).on("click", function () {
                  const o = n()(this).data();
                  return (
                    (o.parentId = t.parent_page_id),
                    e.respond("pageChosen", o),
                    e.close(),
                    !1
                  );
                }),
                n()("[data-locale-selector-link]", e.body).on(
                  "click",
                  function () {
                    return e.loadUrl(this.href), !1;
                  },
                ),
                l(),
                n()("[data-multiple-choice-select]", e.body).on(
                  "change",
                  () => {
                    l();
                  },
                );
            }
            e.ajaxifyForm(n()("form[data-multiple-choice-form]", e.body)),
              n()("#id_q", e.body).on("input", function () {
                a && a.abort(), clearTimeout(n().data(this, "timer"));
                const e = setTimeout(i, 200);
                n()(this).data("timer", e);
              }),
              c(),
              n()("#id_q", e.body).trigger("focus");
          },
          anchor_link(e) {
            n()("p.link-types a", e.body).on("click", function () {
              return e.loadUrl(this.href), !1;
            }),
              n()("form", e.body).on("submit", function () {
                return e.postForm(this.action, n()(this).serialize()), !1;
              });
          },
          email_link(e) {
            n()("p.link-types a", e.body).on("click", function () {
              return e.loadUrl(this.href), !1;
            }),
              n()("form", e.body).on("submit", function () {
                return e.postForm(this.action, n()(this).serialize()), !1;
              });
          },
          phone_link(e) {
            n()("p.link-types a", e.body).on("click", function () {
              return e.loadUrl(this.href), !1;
            }),
              n()("form", e.body).on("submit", function () {
                return e.postForm(this.action, n()(this).serialize()), !1;
              });
          },
          external_link(e) {
            n()("p.link-types a", e.body).on("click", function () {
              return e.loadUrl(this.href), !1;
            }),
              n()("form", e.body).on("submit", function () {
                return e.postForm(this.action, n()(this).serialize()), !1;
              });
          },
          external_link_chosen(e, t) {
            e.respond("pageChosen", t.result), e.close();
          },
          page_chosen(e, t) {
            e.respond("pageChosen", t.result), e.close();
          },
          confirm_external_to_internal(e, t) {
            n()("[data-action-confirm]", e.body).on("click", function () {
              return e.respond("pageChosen", t.internal), e.close(), !1;
            }),
              n()("[data-action-deny]", e.body).on("click", function () {
                return e.respond("pageChosen", t.external), e.close(), !1;
              });
          },
        };
        window.PAGE_CHOOSER_MODAL_ONLOAD_HANDLERS = i;
        class s extends a.ZZ {
          onloadHandlers = i;
          chosenResponseName = "pageChosen";
          getURL(e) {
            let t = super.getURL();
            return e.parentId && (t += e.parentId + "/"), t;
          }
          getURLParams(e) {
            const t = super.getURLParams(e);
            return (
              (t.page_type = e.modelNames.join(",")),
              e.targetPages && (t.target_pages = e.targetPages),
              e.matchSubclass && (t.match_subclass = e.matchSubclass),
              e.canChooseRoot && (t.can_choose_root = "true"),
              e.userPerms && (t.user_perms = e.userPerms),
              t
            );
          }
        }
        window.PageChooserModal = s;
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    o = {};
  function r(e) {
    var n = o[e];
    if (void 0 !== n) return n.exports;
    var a = (o[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(a.exports, a, a.exports, r), (a.loaded = !0), a.exports;
  }
  (r.m = t),
    (e = []),
    (r.O = (t, o, n, a) => {
      if (!o) {
        var i = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [o, n, a] = e[u], s = !0, l = 0; l < o.length; l++)
            (!1 & a || i >= a) && Object.keys(r.O).every((e) => r.O[e](o[l]))
              ? o.splice(l--, 1)
              : ((s = !1), a < i && (i = a));
          if (s) {
            e.splice(u--, 1);
            var c = n();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      a = a || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > a; u--) e[u] = e[u - 1];
      e[u] = [o, n, a];
    }),
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
    (r.d = (e, t) => {
      for (var o in t)
        r.o(t, o) &&
          !r.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
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
    (r.j = 282),
    (() => {
      var e = { 282: 0 };
      r.O.j = (t) => 0 === e[t];
      var t = (t, o) => {
          var n,
            a,
            [i, s, l] = o,
            c = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (n in s) r.o(s, n) && (r.m[n] = s[n]);
            if (l) var u = l(r);
          }
          for (t && t(o); c < i.length; c++)
            (a = i[c]), r.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
          return r.O(u);
        },
        o = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o)));
    })();
  var n = r.O(void 0, [321], () => r(4251));
  n = r.O(n);
})();
