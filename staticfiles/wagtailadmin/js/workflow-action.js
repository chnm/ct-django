(() => {
  "use strict";
  var o,
    e = {
      8080: (o, e, t) => {
        var n = t(1669),
          r = t.n(n);
        function a(o, e, t) {
          const n = document.createElement("input");
          (n.type = "hidden"), (n.name = e), (n.value = t), o.appendChild(n);
        }
        (window._addHiddenInput = a),
          (window.ActivateWorkflowActionsForDashboard = function (o) {
            document
              .querySelectorAll("[data-workflow-action-url]")
              .forEach((e) => {
                e.addEventListener(
                  "click",
                  (t) => {
                    if ((t.preventDefault(), "launchModal" in e.dataset))
                      ModalWorkflow({
                        url: e.dataset.workflowActionUrl,
                        onload: {
                          action(o) {
                            const e = document.createElement("input");
                            (e.type = "hidden"),
                              (e.name = "next"),
                              (e.value = window.location),
                              r()("form", o.body).append(e),
                              o.ajaxifyForm(r()("form", o.body));
                          },
                          success(o, e) {
                            window.location.href = e.redirect;
                          },
                        },
                      });
                    else {
                      const t = document.createElement("form");
                      (t.action = e.dataset.workflowActionUrl),
                        (t.method = "POST"),
                        a(t, "csrfmiddlewaretoken", o),
                        a(t, "next", window.location),
                        document.body.appendChild(t),
                        t.submit();
                    }
                  },
                  { capture: !0 },
                );
              });
          }),
          (window.ActivateWorkflowActionsForEditView = function (o) {
            const e = r()(o).get(0);
            document
              .querySelectorAll("[data-workflow-action-name]")
              .forEach((o) => {
                o.addEventListener(
                  "click",
                  (t) => {
                    "workflowActionModalUrl" in o.dataset
                      ? (t.preventDefault(),
                        t.stopPropagation(),
                        ModalWorkflow({
                          url: o.dataset.workflowActionModalUrl,
                          onload: {
                            action(o) {
                              o.ajaxifyForm(r()("form", o.body));
                            },
                            success(t, n) {
                              a(e, "action-workflow-action", "true"),
                                a(
                                  e,
                                  "workflow-action-name",
                                  o.dataset.workflowActionName,
                                ),
                                a(
                                  e,
                                  "workflow-action-extra-data",
                                  JSON.stringify(n.cleaned_data),
                                ),
                                r()(e).submit();
                            },
                          },
                        }))
                      : (a(e, "action-workflow-action", "true"),
                        a(
                          e,
                          "workflow-action-name",
                          o.dataset.workflowActionName,
                        ));
                  },
                  { capture: !0 },
                );
              });
          });
      },
      1669: (o) => {
        o.exports = jQuery;
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var a = (t[o] = { id: o, loaded: !1, exports: {} });
    return e[o].call(a.exports, a, a.exports, n), (a.loaded = !0), a.exports;
  }
  (n.m = e),
    (o = []),
    (n.O = (e, t, r, a) => {
      if (!t) {
        var i = 1 / 0;
        for (f = 0; f < o.length; f++) {
          for (var [t, r, a] = o[f], l = !0, d = 0; d < t.length; d++)
            (!1 & a || i >= a) && Object.keys(n.O).every((o) => n.O[o](t[d]))
              ? t.splice(d--, 1)
              : ((l = !1), a < i && (i = a));
          if (l) {
            o.splice(f--, 1);
            var c = r();
            void 0 !== c && (e = c);
          }
        }
        return e;
      }
      a = a || 0;
      for (var f = o.length; f > 0 && o[f - 1][2] > a; f--) o[f] = o[f - 1];
      o[f] = [t, r, a];
    }),
    (n.n = (o) => {
      var e = o && o.__esModule ? () => o.default : () => o;
      return n.d(e, { a: e }), e;
    }),
    (n.d = (o, e) => {
      for (var t in e)
        n.o(e, t) &&
          !n.o(o, t) &&
          Object.defineProperty(o, t, { enumerable: !0, get: e[t] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (o) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (o, e) => Object.prototype.hasOwnProperty.call(o, e)),
    (n.r = (o) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(o, "__esModule", { value: !0 });
    }),
    (n.nmd = (o) => ((o.paths = []), o.children || (o.children = []), o)),
    (n.j = 327),
    (() => {
      var o = { 327: 0 };
      n.O.j = (e) => 0 === o[e];
      var e = (e, t) => {
          var r,
            a,
            [i, l, d] = t,
            c = 0;
          if (i.some((e) => 0 !== o[e])) {
            for (r in l) n.o(l, r) && (n.m[r] = l[r]);
            if (d) var f = d(n);
          }
          for (e && e(t); c < i.length; c++)
            (a = i[c]), n.o(o, a) && o[a] && o[a][0](), (o[a] = 0);
          return n.O(f);
        },
        t = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      t.forEach(e.bind(null, 0)), (t.push = e.bind(null, t.push.bind(t)));
    })();
  var r = n.O(void 0, [321], () => n(8080));
  r = n.O(r);
})();
