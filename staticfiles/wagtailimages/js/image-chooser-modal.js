(() => {
  "use strict";
  var e,
    o = {
      3188: (e, o, t) => {
        var r = t(1669),
          a = t.n(r),
          i = t(2614);
        class n extends i.C4 {
          ajaxifyLinks(e, o) {
            super.ajaxifyLinks(e, o),
              a()("a.upload-one-now").on("click", (e) => {
                const o = a()("#id_collection_id").val();
                o && a()("#id_image-chooser-upload-collection").val(o),
                  e.preventDefault();
              });
          }
          onLoadChooseStep(e) {
            super.onLoadChooseStep(e),
              a()("a.suggested-tag").on(
                "click",
                (e) => (
                  a()("#id_q").val(""),
                  this.searchController.search({
                    tag: a()(e.currentTarget).text(),
                    collection_id: a()("#id_collection_id").val(),
                  }),
                  !1
                ),
              );
          }
          onLoadDuplicateFoundStep(e, o) {
            a()("#tab-upload", e.body).replaceWith(o.htmlFragment),
              a()(".use-new-image", e.body).on(
                "click",
                (o) => (e.loadUrl(o.currentTarget.href), !1),
              ),
              a()(".use-existing-image", e.body).on("click", (o) => {
                var t = a()(o.currentTarget).closest("form"),
                  r = a()('input[name="csrfmiddlewaretoken"]', t).val();
                return (
                  e.postForm(o.currentTarget.href, { csrfmiddlewaretoken: r }),
                  !1
                );
              });
          }
          onLoadSelectFormatStep(e) {
            var o = document.querySelector(
                "#id_image-chooser-insertion-image_is_decorative",
              ),
              t = document.querySelector(
                "#id_image-chooser-insertion-alt_text",
              ),
              r = document.querySelector(
                '[for="id_image-chooser-insertion-alt_text"]',
              );
            function i() {
              t.setAttribute("disabled", "disabled"),
                r.classList.remove("required");
            }
            function n() {
              t.removeAttribute("disabled"), r.classList.add("required");
            }
            o.checked ? i() : n(),
              o.addEventListener("change", (e) => {
                e.target.checked ? i() : n();
              }),
              a()("form", e.body).on(
                "submit",
                (o) => (
                  a().post(
                    o.currentTarget.action,
                    a()(o.currentTarget).serialize(),
                    e.loadResponseText,
                    "text",
                  ),
                  !1
                ),
              );
          }
          getOnLoadHandlers() {
            const e = super.getOnLoadHandlers();
            return (
              (e.duplicate_found = (e, o) => {
                this.onLoadDuplicateFoundStep(e, o);
              }),
              (e.select_format = (e, o) => {
                this.onLoadSelectFormatStep(e, o);
              }),
              e
            );
          }
        }
        window.IMAGE_CHOOSER_MODAL_ONLOAD_HANDLERS = new n({
          creationFormFileFieldSelector: "#id_image-chooser-upload-file",
          creationFormTitleFieldSelector: "#id_image-chooser-upload-title",
          creationFormEventName: "wagtail:images-upload",
          creationFormTabSelector: "#tab-upload",
        }).getOnLoadHandlers();
        class l extends i.ZZ {
          onloadHandlers = window.IMAGE_CHOOSER_MODAL_ONLOAD_HANDLERS;
        }
        window.ImageChooserModal = l;
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    t = {};
  function r(e) {
    var a = t[e];
    if (void 0 !== a) return a.exports;
    var i = (t[e] = { id: e, loaded: !1, exports: {} });
    return o[e].call(i.exports, i, i.exports, r), (i.loaded = !0), i.exports;
  }
  (r.m = o),
    (e = []),
    (r.O = (o, t, a, i) => {
      if (!t) {
        var n = 1 / 0;
        for (s = 0; s < e.length; s++) {
          for (var [t, a, i] = e[s], l = !0, d = 0; d < t.length; d++)
            (!1 & i || n >= i) && Object.keys(r.O).every((e) => r.O[e](t[d]))
              ? t.splice(d--, 1)
              : ((l = !1), i < n && (n = i));
          if (l) {
            e.splice(s--, 1);
            var c = a();
            void 0 !== c && (o = c);
          }
        }
        return o;
      }
      i = i || 0;
      for (var s = e.length; s > 0 && e[s - 1][2] > i; s--) e[s] = e[s - 1];
      e[s] = [t, a, i];
    }),
    (r.n = (e) => {
      var o = e && e.__esModule ? () => e.default : () => e;
      return r.d(o, { a: o }), o;
    }),
    (r.d = (e, o) => {
      for (var t in o)
        r.o(o, t) &&
          !r.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: o[t] });
    }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (r.j = 678),
    (() => {
      var e = { 678: 0 };
      r.O.j = (o) => 0 === e[o];
      var o = (o, t) => {
          var a,
            i,
            [n, l, d] = t,
            c = 0;
          if (n.some((o) => 0 !== e[o])) {
            for (a in l) r.o(l, a) && (r.m[a] = l[a]);
            if (d) var s = d(r);
          }
          for (o && o(t); c < n.length; c++)
            (i = n[c]), r.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return r.O(s);
        },
        t = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      t.forEach(o.bind(null, 0)), (t.push = o.bind(null, t.push.bind(t)));
    })();
  var a = r.O(void 0, [321], () => r(3188));
  a = r.O(a);
})();
