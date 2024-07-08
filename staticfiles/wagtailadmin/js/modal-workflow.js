(() => {
  "use strict";
  var e,
    o = {
      937: (e, o, t) => {
        var n = t(1669),
          r = t.n(n),
          i = t(3476),
          a = t(2833);
        window.ModalWorkflow = function (e) {
          const o = {},
            t = e.responses || {},
            n = e.onError || i.l,
            l = !!e.dialogId;
          if (l)
            (o.dialog = document.getElementById(e.dialogId)),
              (o.url = e.url || o.dialog.dataset.url),
              (o.body = o.dialog.querySelector("[data-w-dialog-target]")),
              (o.body.innerHTML = "");
          else {
            r()("body > .modal").remove(),
              (o.triggerElement = e.triggerElement || document.activeElement),
              o.triggerElement.setAttribute("disabled", !0);
            const t =
              '<svg class="icon icon-cross" aria-hidden="true"><use href="#icon-cross"></use></svg>';
            (o.container = r()(
              '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <button type="button" class="button close button--icon text-replace" data-dismiss="modal">' +
                t +
                (0, a.AP)("Close") +
                '</button>\n      <div class="modal-body"></div>\n    </div>\x3c!-- /.modal-content --\x3e\n  </div>\x3c!-- /.modal-dialog --\x3e\n</div>',
            )),
              r()("body").append(o.container),
              o.container.modal("hide"),
              o.container.on("hide.bs.modal", () => {
                o.triggerElement.hasAttribute("data-force-disabled") ||
                  (o.triggerElement.removeAttribute("disabled"),
                  o.triggerElement.removeAttribute(
                    "data-w-progress-loading-value",
                  ));
              }),
              o.container.on("hidden.bs.modal", function () {
                o.triggerElement.focus(), o.container.remove();
              }),
              (o.url = e.url),
              (o.body = o.container.find(".modal-body"));
          }
          return (
            (o.loadUrl = function (e, t) {
              r().get(e, t, o.loadResponseText, "text").fail(n);
            }),
            (o.postForm = function (e, t) {
              r().post(e, t, o.loadResponseText, "text").fail(n);
            }),
            (o.ajaxifyForm = function (e) {
              r()(e).each(function () {
                const e = this.action;
                "get" === this.method.toLowerCase()
                  ? r()(this).on("submit", function () {
                      return o.loadUrl(e, r()(this).serialize()), !1;
                    })
                  : r()(this).on("submit", function () {
                      return o.postForm(e, r()(this).serialize()), !1;
                    });
              });
            }),
            (o.loadResponseText = function (e) {
              const t = JSON.parse(e);
              o.loadBody(t);
            }),
            (o.loadBody = function (t) {
              t.html &&
                (l
                  ? (o.body.innerHTML = t.html)
                  : (o.body.html(t.html), o.container.modal("show"))),
                e.onload &&
                  t.step &&
                  t.step in e.onload &&
                  e.onload[t.step](o, t);
            }),
            (o.respond = function (e) {
              if (e in t) {
                const n = Array.prototype.slice.call(arguments, 1);
                t[e].apply(o, n);
              }
            }),
            (o.close = function () {
              l
                ? o.dialog.dispatchEvent(new CustomEvent("w-dialog:hide"))
                : o.container.modal("hide");
            }),
            o.loadUrl(o.url, e.urlParams),
            o
          );
        };
      },
      1669: (e) => {
        e.exports = jQuery;
      },
    },
    t = {};
  function n(e) {
    var r = t[e];
    if (void 0 !== r) return r.exports;
    var i = (t[e] = { id: e, loaded: !1, exports: {} });
    return o[e].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
  }
  (n.m = o),
    (e = []),
    (n.O = (o, t, r, i) => {
      if (!t) {
        var a = 1 / 0;
        for (c = 0; c < e.length; c++) {
          for (var [t, r, i] = e[c], l = !0, d = 0; d < t.length; d++)
            (!1 & i || a >= i) && Object.keys(n.O).every((e) => n.O[e](t[d]))
              ? t.splice(d--, 1)
              : ((l = !1), i < a && (a = i));
          if (l) {
            e.splice(c--, 1);
            var s = r();
            void 0 !== s && (o = s);
          }
        }
        return o;
      }
      i = i || 0;
      for (var c = e.length; c > 0 && e[c - 1][2] > i; c--) e[c] = e[c - 1];
      e[c] = [t, r, i];
    }),
    (n.n = (e) => {
      var o = e && e.__esModule ? () => e.default : () => e;
      return n.d(o, { a: o }), o;
    }),
    (n.d = (e, o) => {
      for (var t in o)
        n.o(o, t) &&
          !n.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: o[t] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (n.j = 692),
    (() => {
      var e = { 692: 0 };
      n.O.j = (o) => 0 === e[o];
      var o = (o, t) => {
          var r,
            i,
            [a, l, d] = t,
            s = 0;
          if (a.some((o) => 0 !== e[o])) {
            for (r in l) n.o(l, r) && (n.m[r] = l[r]);
            if (d) var c = d(n);
          }
          for (o && o(t); s < a.length; s++)
            (i = a[s]), n.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return n.O(c);
        },
        t = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      t.forEach(o.bind(null, 0)), (t.push = o.bind(null, t.push.bind(t)));
    })();
  var r = n.O(void 0, [321], () => n(937));
  r = n.O(r);
})();
