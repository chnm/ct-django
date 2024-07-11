/*! For license information please see core.js.LICENSE.txt */
(() => {
  var e,
    t = {
      6411: (e, t, n) => {
        var i;
        !(function (o, r, a) {
          if (o) {
            for (
              var s,
                l = {
                  8: "backspace",
                  9: "tab",
                  13: "enter",
                  16: "shift",
                  17: "ctrl",
                  18: "alt",
                  20: "capslock",
                  27: "esc",
                  32: "space",
                  33: "pageup",
                  34: "pagedown",
                  35: "end",
                  36: "home",
                  37: "left",
                  38: "up",
                  39: "right",
                  40: "down",
                  45: "ins",
                  46: "del",
                  91: "meta",
                  93: "meta",
                  224: "meta",
                },
                c = {
                  106: "*",
                  107: "+",
                  109: "-",
                  110: ".",
                  111: "/",
                  186: ";",
                  187: "=",
                  188: ",",
                  189: "-",
                  190: ".",
                  191: "/",
                  192: "`",
                  219: "[",
                  220: "\\",
                  221: "]",
                  222: "'",
                },
                d = {
                  "~": "`",
                  "!": "1",
                  "@": "2",
                  "#": "3",
                  $: "4",
                  "%": "5",
                  "^": "6",
                  "&": "7",
                  "*": "8",
                  "(": "9",
                  ")": "0",
                  _: "-",
                  "+": "=",
                  ":": ";",
                  '"': "'",
                  "<": ",",
                  ">": ".",
                  "?": "/",
                  "|": "\\",
                },
                h = {
                  option: "alt",
                  command: "meta",
                  return: "enter",
                  escape: "esc",
                  plus: "+",
                  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform)
                    ? "meta"
                    : "ctrl",
                },
                u = 1;
              u < 20;
              ++u
            )
              l[111 + u] = "f" + u;
            for (u = 0; u <= 9; ++u) l[u + 96] = u.toString();
            (y.prototype.bind = function (e, t, n) {
              var i = this;
              return (
                (e = e instanceof Array ? e : [e]),
                i._bindMultiple.call(i, e, t, n),
                i
              );
            }),
              (y.prototype.unbind = function (e, t) {
                return this.bind.call(this, e, function () {}, t);
              }),
              (y.prototype.trigger = function (e, t) {
                var n = this;
                return (
                  n._directMap[e + ":" + t] && n._directMap[e + ":" + t]({}, e),
                  n
                );
              }),
              (y.prototype.reset = function () {
                var e = this;
                return (e._callbacks = {}), (e._directMap = {}), e;
              }),
              (y.prototype.stopCallback = function (e, t) {
                if ((" " + t.className + " ").indexOf(" mousetrap ") > -1)
                  return !1;
                if (b(t, this.target)) return !1;
                if (
                  "composedPath" in e &&
                  "function" == typeof e.composedPath
                ) {
                  var n = e.composedPath()[0];
                  n !== e.target && (t = n);
                }
                return (
                  "INPUT" == t.tagName ||
                  "SELECT" == t.tagName ||
                  "TEXTAREA" == t.tagName ||
                  t.isContentEditable
                );
              }),
              (y.prototype.handleKey = function () {
                return this._handleKey.apply(this, arguments);
              }),
              (y.addKeycodes = function (e) {
                for (var t in e) e.hasOwnProperty(t) && (l[t] = e[t]);
                s = null;
              }),
              (y.init = function () {
                var e = y(r);
                for (var t in e)
                  "_" !== t.charAt(0) &&
                    (y[t] = (function (t) {
                      return function () {
                        return e[t].apply(e, arguments);
                      };
                    })(t));
              }),
              y.init(),
              (o.Mousetrap = y),
              e.exports && (e.exports = y),
              void 0 ===
                (i = function () {
                  return y;
                }.call(t, n, t, e)) || (e.exports = i);
          }
          function p(e, t, n) {
            e.addEventListener
              ? e.addEventListener(t, n, !1)
              : e.attachEvent("on" + t, n);
          }
          function f(e) {
            if ("keypress" == e.type) {
              var t = String.fromCharCode(e.which);
              return e.shiftKey || (t = t.toLowerCase()), t;
            }
            return l[e.which]
              ? l[e.which]
              : c[e.which]
              ? c[e.which]
              : String.fromCharCode(e.which).toLowerCase();
          }
          function m(e) {
            return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
          }
          function g(e, t, n) {
            return (
              n ||
                (n = (function () {
                  if (!s)
                    for (var e in ((s = {}), l))
                      (e > 95 && e < 112) ||
                        (l.hasOwnProperty(e) && (s[l[e]] = e));
                  return s;
                })()[e]
                  ? "keydown"
                  : "keypress"),
              "keypress" == n && t.length && (n = "keydown"),
              n
            );
          }
          function v(e, t) {
            var n,
              i,
              o,
              r = [];
            for (
              n = (function (e) {
                return "+" === e
                  ? ["+"]
                  : (e = e.replace(/\+{2}/g, "+plus")).split("+");
              })(e),
                o = 0;
              o < n.length;
              ++o
            )
              (i = n[o]),
                h[i] && (i = h[i]),
                t && "keypress" != t && d[i] && ((i = d[i]), r.push("shift")),
                m(i) && r.push(i);
            return { key: i, modifiers: r, action: (t = g(i, r, t)) };
          }
          function b(e, t) {
            return null !== e && e !== r && (e === t || b(e.parentNode, t));
          }
          function y(e) {
            var t = this;
            if (((e = e || r), !(t instanceof y))) return new y(e);
            (t.target = e), (t._callbacks = {}), (t._directMap = {});
            var n,
              i = {},
              o = !1,
              a = !1,
              s = !1;
            function l(e) {
              e = e || {};
              var t,
                n = !1;
              for (t in i) e[t] ? (n = !0) : (i[t] = 0);
              n || (s = !1);
            }
            function c(e, n, o, r, a, s) {
              var l,
                c,
                d,
                h,
                u = [],
                p = o.type;
              if (!t._callbacks[e]) return [];
              for (
                "keyup" == p && m(e) && (n = [e]), l = 0;
                l < t._callbacks[e].length;
                ++l
              )
                if (
                  ((c = t._callbacks[e][l]),
                  (r || !c.seq || i[c.seq] == c.level) &&
                    p == c.action &&
                    (("keypress" == p && !o.metaKey && !o.ctrlKey) ||
                      ((d = n),
                      (h = c.modifiers),
                      d.sort().join(",") === h.sort().join(","))))
                ) {
                  var f = !r && c.combo == a,
                    g = r && c.seq == r && c.level == s;
                  (f || g) && t._callbacks[e].splice(l, 1), u.push(c);
                }
              return u;
            }
            function d(e, n, i, o) {
              t.stopCallback(n, n.target || n.srcElement, i, o) ||
                (!1 === e(n, i) &&
                  ((function (e) {
                    e.preventDefault
                      ? e.preventDefault()
                      : (e.returnValue = !1);
                  })(n),
                  (function (e) {
                    e.stopPropagation
                      ? e.stopPropagation()
                      : (e.cancelBubble = !0);
                  })(n)));
            }
            function h(e) {
              "number" != typeof e.which && (e.which = e.keyCode);
              var n = f(e);
              n &&
                ("keyup" != e.type || o !== n
                  ? t.handleKey(
                      n,
                      (function (e) {
                        var t = [];
                        return (
                          e.shiftKey && t.push("shift"),
                          e.altKey && t.push("alt"),
                          e.ctrlKey && t.push("ctrl"),
                          e.metaKey && t.push("meta"),
                          t
                        );
                      })(e),
                      e,
                    )
                  : (o = !1));
            }
            function u(e, r, a, h, p) {
              t._directMap[e + ":" + a] = r;
              var m,
                g = (e = e.replace(/\s+/g, " ")).split(" ");
              g.length > 1
                ? (function (e, t, r, a) {
                    function c(t) {
                      return function () {
                        (s = t),
                          ++i[e],
                          clearTimeout(n),
                          (n = setTimeout(l, 1e3));
                      };
                    }
                    function h(t) {
                      d(r, t, e),
                        "keyup" !== a && (o = f(t)),
                        setTimeout(l, 10);
                    }
                    i[e] = 0;
                    for (var p = 0; p < t.length; ++p) {
                      var m =
                        p + 1 === t.length ? h : c(a || v(t[p + 1]).action);
                      u(t[p], m, a, e, p);
                    }
                  })(e, g, r, a)
                : ((m = v(e, a)),
                  (t._callbacks[m.key] = t._callbacks[m.key] || []),
                  c(m.key, m.modifiers, { type: m.action }, h, e, p),
                  t._callbacks[m.key][h ? "unshift" : "push"]({
                    callback: r,
                    modifiers: m.modifiers,
                    action: m.action,
                    seq: h,
                    level: p,
                    combo: e,
                  }));
            }
            (t._handleKey = function (e, t, n) {
              var i,
                o = c(e, t, n),
                r = {},
                h = 0,
                u = !1;
              for (i = 0; i < o.length; ++i)
                o[i].seq && (h = Math.max(h, o[i].level));
              for (i = 0; i < o.length; ++i)
                if (o[i].seq) {
                  if (o[i].level != h) continue;
                  (u = !0),
                    (r[o[i].seq] = 1),
                    d(o[i].callback, n, o[i].combo, o[i].seq);
                } else u || d(o[i].callback, n, o[i].combo);
              var p = "keypress" == n.type && a;
              n.type != s || m(e) || p || l(r), (a = u && "keydown" == n.type);
            }),
              (t._bindMultiple = function (e, t, n) {
                for (var i = 0; i < e.length; ++i) u(e[i], t, n);
              }),
              p(e, "keypress", h),
              p(e, "keydown", h),
              p(e, "keyup", h);
          }
        })(
          "undefined" != typeof window ? window : null,
          "undefined" != typeof window ? document : null,
        );
      },
      9610: () => {
        !(function (e) {
          if (e) {
            var t = {},
              n = e.prototype.stopCallback;
            (e.prototype.stopCallback = function (e, i, o, r) {
              return !!this.paused || (!t[o] && !t[r] && n.call(this, e, i, o));
            }),
              (e.prototype.bindGlobal = function (e, n, i) {
                if ((this.bind(e, n, i), e instanceof Array))
                  for (var o = 0; o < e.length; o++) t[e[o]] = !0;
                else t[e] = !0;
              }),
              e.init();
          }
        })("undefined" != typeof Mousetrap ? Mousetrap : void 0);
      },
      2029: (e, t, n) => {
        "use strict";
        var i = n(1669),
          o = n.n(i),
          r = n(2891),
          a = n(2427),
          s = n.n(a),
          l = n(1238),
          c = n(5996),
          d = n(5556),
          h = n.n(d);
        h().shape({ live: h().bool.isRequired, status: h().string.isRequired })
          .isRequired;
        var u = n(862),
          p = n.n(u);
        const f = ({
          name: e,
          component: t,
          className: n,
          duration: i,
          children: o,
        }) =>
          s().createElement(
            p(),
            {
              component: t,
              transitionEnterTimeout: i,
              transitionLeaveTimeout: i,
              transitionName: `w-transition-${e}`,
              className: n,
            },
            o,
          );
        (f.propTypes = {
          name: h().oneOf(["push", "pop"]).isRequired,
          component: h().string,
          className: h().string,
          duration: h().number,
          children: h().node,
        }),
          (f.defaultProps = {
            component: "div",
            children: null,
            className: null,
            duration: 210,
          });
        var m = n(6508);
        class g extends r.Controller {
          static values = {
            continue: { type: Boolean, default: !1 },
            url: String,
          };
          click() {
            this.element.click();
          }
          noop() {}
          post(e) {
            e.preventDefault(), e.stopPropagation();
            const t = document.createElement("form");
            (t.action = this.urlValue), (t.method = "POST");
            const n = document.createElement("input");
            if (
              ((n.type = "hidden"),
              (n.name = "csrfmiddlewaretoken"),
              (n.value = m.HE.CSRF_TOKEN),
              t.appendChild(n),
              !this.continueValue)
            ) {
              const e = document.createElement("input");
              (e.type = "hidden"),
                (e.name = "next"),
                (e.value = window.location.href),
                t.appendChild(e);
            }
            document.body.appendChild(t), t.submit();
          }
          redirect(e) {
            const t = e?.params?.url ?? e?.detail?.url ?? this.element.value;
            t && window.location.assign(t);
          }
          reset(e) {
            const t = this.element,
              n = t.value,
              { value: i = "" } = {
                value: t instanceof HTMLInputElement ? t.defaultValue : "",
                ...e?.params,
                ...e?.detail,
              };
            n !== i &&
              ((t.value = i),
              this.dispatch("change", {
                bubbles: !0,
                cancelable: !1,
                prefix: "",
                target: t,
              }));
          }
          select() {
            const e = this.element;
            e &&
              (e instanceof HTMLInputElement ||
                e instanceof HTMLTextAreaElement) &&
              e.select();
          }
        }
        var v = new Map();
        function b(e) {
          var t = v.get(e);
          t && t.destroy();
        }
        function y(e) {
          var t = v.get(e);
          t && t.update();
        }
        var w = null;
        "undefined" == typeof window
          ? (((w = function (e) {
              return e;
            }).destroy = function (e) {
              return e;
            }),
            (w.update = function (e) {
              return e;
            }))
          : (((w = function (e, t) {
              return (
                e &&
                  Array.prototype.forEach.call(
                    e.length ? e : [e],
                    function (e) {
                      return (function (e) {
                        if (
                          e &&
                          e.nodeName &&
                          "TEXTAREA" === e.nodeName &&
                          !v.has(e)
                        ) {
                          var t,
                            n = null,
                            i = window.getComputedStyle(e),
                            o =
                              ((t = e.value),
                              function () {
                                a({
                                  testForHeightReduction:
                                    "" === t || !e.value.startsWith(t),
                                  restoreTextAlign: null,
                                }),
                                  (t = e.value);
                              }),
                            r = function (t) {
                              e.removeEventListener("autosize:destroy", r),
                                e.removeEventListener("autosize:update", s),
                                e.removeEventListener("input", o),
                                window.removeEventListener("resize", s),
                                Object.keys(t).forEach(function (n) {
                                  return (e.style[n] = t[n]);
                                }),
                                v.delete(e);
                            }.bind(e, {
                              height: e.style.height,
                              resize: e.style.resize,
                              textAlign: e.style.textAlign,
                              overflowY: e.style.overflowY,
                              overflowX: e.style.overflowX,
                              wordWrap: e.style.wordWrap,
                            });
                          e.addEventListener("autosize:destroy", r),
                            e.addEventListener("autosize:update", s),
                            e.addEventListener("input", o),
                            window.addEventListener("resize", s),
                            (e.style.overflowX = "hidden"),
                            (e.style.wordWrap = "break-word"),
                            v.set(e, { destroy: r, update: s }),
                            s();
                        }
                        function a(t) {
                          var o,
                            r,
                            s = t.restoreTextAlign,
                            l = void 0 === s ? null : s,
                            c = t.testForHeightReduction,
                            d = void 0 === c || c,
                            h = i.overflowY;
                          if (
                            0 !== e.scrollHeight &&
                            ("vertical" === i.resize
                              ? (e.style.resize = "none")
                              : "both" === i.resize &&
                                (e.style.resize = "horizontal"),
                            d &&
                              ((o = (function (e) {
                                for (
                                  var t = [];
                                  e &&
                                  e.parentNode &&
                                  e.parentNode instanceof Element;

                                )
                                  e.parentNode.scrollTop &&
                                    t.push([
                                      e.parentNode,
                                      e.parentNode.scrollTop,
                                    ]),
                                    (e = e.parentNode);
                                return function () {
                                  return t.forEach(function (e) {
                                    var t = e[0],
                                      n = e[1];
                                    (t.style.scrollBehavior = "auto"),
                                      (t.scrollTop = n),
                                      (t.style.scrollBehavior = null);
                                  });
                                };
                              })(e)),
                              (e.style.height = "")),
                            (r =
                              "content-box" === i.boxSizing
                                ? e.scrollHeight -
                                  (parseFloat(i.paddingTop) +
                                    parseFloat(i.paddingBottom))
                                : e.scrollHeight +
                                  parseFloat(i.borderTopWidth) +
                                  parseFloat(i.borderBottomWidth)),
                            "none" !== i.maxHeight &&
                            r > parseFloat(i.maxHeight)
                              ? ("hidden" === i.overflowY &&
                                  (e.style.overflow = "scroll"),
                                (r = parseFloat(i.maxHeight)))
                              : "hidden" !== i.overflowY &&
                                (e.style.overflow = "hidden"),
                            (e.style.height = r + "px"),
                            l && (e.style.textAlign = l),
                            o && o(),
                            n !== r &&
                              (e.dispatchEvent(
                                new Event("autosize:resized", { bubbles: !0 }),
                              ),
                              (n = r)),
                            h !== i.overflow && !l)
                          ) {
                            var u = i.textAlign;
                            "hidden" === i.overflow &&
                              (e.style.textAlign =
                                "start" === u ? "end" : "start"),
                              a({
                                restoreTextAlign: u,
                                testForHeightReduction: !0,
                              });
                          }
                        }
                        function s() {
                          a({
                            testForHeightReduction: !0,
                            restoreTextAlign: null,
                          });
                        }
                      })(e);
                    },
                  ),
                e
              );
            }).destroy = function (e) {
              return (
                e && Array.prototype.forEach.call(e.length ? e : [e], b), e
              );
            }),
            (w.update = function (e) {
              return (
                e && Array.prototype.forEach.call(e.length ? e : [e], y), e
              );
            }));
        const E = w;
        var C = n(8667);
        class S extends r.Controller {
          resizeObserver;
          resize() {
            E.update(this.element);
          }
          initialize() {
            this.resize = (0, C.s)(this.resize.bind(this), 50);
          }
          connect() {
            E(this.element),
              (this.resizeObserver = new ResizeObserver(this.resize)),
              this.resizeObserver.observe(this.element);
          }
          disconnect() {
            this.resizeObserver?.disconnect(), E.destroy(this.element);
          }
        }
        class T extends r.Controller {
          static values = {
            arguments: { type: Array, default: [] },
            data: { type: Object, default: {} },
          };
          connect() {
            const e = window.telepath;
            if (!e) throw new Error("`window.telepath` is not available.");
            const t = this.element,
              n = t.id;
            if (!n)
              throw new Error("Controlled element needs an id attribute.");
            const i = e.unpack(this.dataValue);
            i.render(t, n, ...this.argumentsValue),
              this.dispatch("ready", { detail: { ...i }, cancelable: !1 });
          }
          static afterLoad() {
            window.initBlockWidget = (e) => {
              const t = document.querySelector("#" + e + "[data-block]");
              if (!t) return;
              const n = JSON.parse(t.dataset.data);
              if (window.telepath) {
                const i = window.telepath.unpack(n),
                  o = JSON.parse(t.dataset.value),
                  r = JSON.parse(t.dataset.error);
                i.render(t, e, o, r);
              }
            };
          }
        }
        class A extends r.Controller {
          static classes = ["actionInactive"];
          static targets = ["action", "all", "item"];
          lastChanged;
          shiftActive;
          connect() {
            this.toggle(),
              (this.handleShiftKey = this.handleShiftKey.bind(this)),
              document.addEventListener("keydown", this.handleShiftKey),
              document.addEventListener("keyup", this.handleShiftKey);
          }
          getValidTargets(
            e = null,
            t = this.itemTargets,
            n = `data-${this.identifier}-group-param`,
          ) {
            const i = t.filter(({ disabled: e }) => !e);
            if (!e) return i;
            const o = e.split(" ");
            return i.filter((e) => {
              const t = new Set((e.getAttribute(n) || "").split(" "));
              return o.some(t.has.bind(t));
            });
          }
          handleShiftKey(e) {
            if (!e) return;
            const { shiftKey: t, type: n } = e;
            "keydown" === n && t && (this.shiftActive = !0),
              "keyup" === n && this.shiftActive && (this.shiftActive = !1);
          }
          toggle(e) {
            const { group: t = null } = { ...e?.detail, ...e?.params },
              n = this.getValidTargets(t),
              i = this.lastChanged;
            if (this.shiftActive && i instanceof HTMLElement) {
              this.shiftActive = !1;
              const t = n.findIndex((e) => e === i),
                o = n.findIndex((t) => t === e?.target),
                [r, a] = [t, o].sort((e, t) => e - t);
              n.forEach((e, i) => {
                i >= r &&
                  i <= a &&
                  ((e.checked = !!n[t].checked),
                  this.dispatch("change", { target: e, bubbles: !0 }));
              });
            }
            this.lastChanged = n.find((t) => t.contains(e?.target)) ?? null;
            const o = n.filter((e) => e.checked).length,
              r = o > 0,
              a = o === n.length;
            this.getValidTargets(t, this.allTargets).forEach((e) => {
              e.checked = a;
            });
            const s = this.actionInactiveClasses;
            s.length &&
              this.actionTargets.forEach((e) => {
                s.forEach((t) => {
                  e.classList.toggle(t, !r);
                });
              });
          }
          toggleAll(e) {
            const { force: t = null, group: n = null } = {
              ...e.detail,
              ...e.params,
            };
            this.lastChanged = null;
            let i = !1;
            if ("boolean" == typeof t) i = t;
            else if (e.target instanceof HTMLInputElement) i = e.target.checked;
            else {
              const e = this.allTargets[0];
              i = !e?.checked;
            }
            this.getValidTargets(n).forEach((e) => {
              e.checked !== i &&
                ((e.checked = i),
                e.dispatchEvent(new Event("change", { bubbles: !0 })));
            }),
              this.toggle(e);
          }
          disconnect() {
            document?.removeEventListener("keydown", this.handleShiftKey),
              document?.removeEventListener("keyup", this.handleShiftKey);
          }
        }
        class _ extends r.Controller {
          static targets = ["value"];
          copy(e) {
            const {
              value: t = this.hasValueTarget
                ? this.valueTarget.value
                : this.element.value || null,
            } = { ...e.detail, ...e.params };
            t &&
              (this.dispatch("copy").defaultPrevented ||
                new Promise((e, n) => {
                  navigator.clipboard
                    ? navigator.clipboard.writeText(t).then(e, n)
                    : n();
                })
                  .then(() =>
                    this.dispatch("copied", {
                      detail: { clear: !0, type: "success" },
                    }),
                  )
                  .catch(() =>
                    this.dispatch("error", {
                      detail: { clear: !0, type: "error" },
                    }),
                  ));
          }
        }
        var k = n(3476);
        class x extends r.Controller {
          static classes = ["added", "hide", "show"];
          static targets = ["container", "template"];
          static values = {
            autoClear: { default: 0, type: Number },
            clearDelay: { default: 0, type: Number },
            showDelay: { default: 0, type: Number },
          };
          isClearing;
          add(e) {
            const {
              clear: t = !1,
              text: n = "",
              type: i = null,
            } = { ...e?.detail, ...e?.params };
            this.element.classList.add(...this.addedClasses), t && this.clear();
            const o = this.getTemplateContent(i);
            if (!o) return;
            const r = o.lastElementChild;
            r instanceof HTMLElement && n && (r.textContent = n),
              this.containerTarget.appendChild(o),
              (0, C.s)(() => {
                this.element.classList.remove(...this.hideClasses),
                  this.element.classList.add(...this.showClasses),
                  this.dispatch("added");
              }, this.showDelayValue || null)().then(() => {
                this.autoClearValue &&
                  (0, C.s)(() => {
                    this.clear();
                  }, this.autoClearValue)();
              });
          }
          clear(e) {
            if (((this.isClearing = !1), !e))
              return void (this.containerTarget.innerHTML = "");
            const t = this.clearDelayValue || null,
              n = this.element;
            (this.isClearing = !0),
              n.classList.remove(...this.addedClasses),
              n.classList.remove(...this.showClasses),
              n.classList.add(...this.hideClasses),
              (0, C.s)(k.l, t)().then(() => {
                this?.isClearing &&
                  ((this.containerTarget.innerHTML = ""),
                  this.dispatch("cleared"),
                  (this.isClearing = !1));
              });
          }
          getTemplateContent(e) {
            const t =
                (e &&
                  this.templateTargets.find(
                    ({ dataset: t }) => t.type === e,
                  )) ||
                this.templateTarget,
              n = t.content.firstElementChild?.cloneNode(!0);
            return n instanceof HTMLElement ? n : null;
          }
        }
        var O = n(2833);
        class D extends r.Controller {
          static classes = ["active"];
          static targets = ["label", "total"];
          static values = {
            container: { default: "body", type: String },
            find: { default: ".error-message,.help-critical", type: String },
            labels: { default: [], type: Array },
            min: { default: 0, type: Number },
            total: { default: 0, type: Number },
          };
          connect() {
            this.count();
          }
          count() {
            return (
              (this.totalValue = [
                ...document.querySelectorAll(this.containerValue || "body"),
              ]
                .map((e) => e.querySelectorAll(this.findValue).length)
                .reduce((e, t) => e + t, 0)),
              this.totalValue
            );
          }
          getLabel(e) {
            const t = (0, O.WI)("%(num)s error", "%(num)s errors", e);
            if (this.labelsValue.length > 1) {
              const [t, n = this.labelsValue[1], i = "__total__"] =
                this.labelsValue;
              return (0, O.WI)(t, n, e).replace(i, `${e}`);
            }
            return t.replace("%(num)s", `${e}`);
          }
          minValueChanged() {
            this.totalValueChanged(this.count());
          }
          totalValueChanged(e) {
            const t = this.minValue;
            this.hasActiveClass &&
              this.element.classList.toggle(this.activeClass, e > t),
              this.hasLabelTarget &&
                (this.labelTarget.textContent = e > t ? this.getLabel(e) : ""),
              this.hasTotalTarget &&
                (this.totalTarget.textContent = e > t ? `${e}` : "");
          }
        }
        var V = n(9104);
        class L extends r.Controller {
          static classes = ["dismissed"];
          static values = {
            dismissed: { default: !1, type: Boolean },
            id: { default: "", type: String },
          };
          toggle() {
            var e;
            this.idValue &&
              (this.element.classList.add(this.dismissedClass),
              (this.dismissedValue = !0),
              (e = { [this.idValue]: !0 }),
              fetch(m.HE.ADMIN_URLS?.DISMISSIBLES, {
                method: "PATCH",
                headers: {
                  [m.HE.CSRF_HEADER_NAME]: m.HE.CSRF_TOKEN,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(e),
                mode: "same-origin",
              }));
          }
        }
        class P extends r.Controller {
          static targets = ["count", "menu", "toggle"];
          static values = {
            activeSubmenu: { default: "", type: String },
            countAttr: { default: "", type: String },
          };
          static outlets = ["w-action", "w-dropdown"];
          countTargetConnected() {
            this.updateCount();
          }
          connect() {
            this.open = this.open.bind(this);
          }
          wActionOutletConnected(e, t) {
            t.addEventListener("click", this.open);
          }
          wActionOutletDisconnected(e, t) {
            t.removeEventListener("click", this.open);
          }
          updateCount() {
            const e = document.querySelectorAll(
              `[${this.countAttrValue}]`,
            ).length;
            this.countTargets.forEach((t) => {
              const n = t.dataset.countName,
                i = n
                  ? document.querySelectorAll(`[${this.countAttrValue}=${n}]`)
                      .length
                  : e;
              (t.hidden = 0 === i), (t.textContent = i.toString());
            });
          }
          open(e) {
            const t = e.target?.closest("button");
            this.activeSubmenuValue = t.getAttribute("aria-controls") || "";
          }
          close() {
            this.activeSubmenuValue = "";
          }
          delayedClose() {
            setTimeout(() => this.close(), 200);
          }
          activeSubmenuValueChanged(e, t) {
            if (t) {
              const e = document.querySelector(`[aria-controls="${t}"]`);
              this.toggle(!1, e);
            }
            if (e) {
              const t = document.querySelector(`[aria-controls="${e}"]`);
              this.toggle(!0, t);
            }
          }
          preventOutletClickaway(e) {
            const t = e.detail.target;
            if (!t) return;
            const n = this.toggleTargets.map((e) =>
                e.getAttribute("aria-controls"),
              ),
              i = t.closest("button")?.getAttribute("aria-controls") || "";
            n.includes(i) && e.preventDefault();
          }
          toggle(e, t) {
            this.hasWDropdownOutlet && e && this.wDropdownOutlet.show();
            const n = t.getAttribute("aria-controls"),
              i = this.element.querySelector(`#${n}`);
            i &&
              (t.setAttribute("aria-expanded", e.toString()),
              (i.hidden = !e),
              (this.menuTarget.hidden = e),
              e ? i.focus() : t.focus());
          }
        }
        var I = n(7381),
          M = n(1083);
        const N = {
          name: "hideOnEsc",
          defaultValue: !0,
          fn({ hide: e }) {
            function t(t) {
              "Escape" === t.key && e();
            }
            return {
              onShow() {
                document.addEventListener("keydown", t);
              },
              onHide() {
                document.removeEventListener("keydown", t);
              },
            };
          },
        };
        class R extends r.Controller {
          static values = {
            content: String,
            offset: Array,
            placement: { default: "bottom", type: String },
          };
          tippy;
          connect() {
            this.tippy = (0, I.Ay)(this.element, this.options);
          }
          contentValueChanged(e, t) {
            t && t !== e && this.tippy?.setProps(this.options);
          }
          placementValueChanged(e, t) {
            t && t !== e && this.tippy?.setProps(this.options);
          }
          hide() {
            this.tippy?.hide();
          }
          show() {
            this.tippy?.show();
          }
          get options() {
            return {
              content: this.contentValue,
              placement: this.placementValue,
              plugins: this.plugins,
              ...(this.hasOffsetValue && { offset: this.offsetValue }),
            };
          }
          get plugins() {
            return [N];
          }
          disconnect() {
            this.tippy?.destroy();
          }
          static afterLoad() {
            (0, M.Q)().then(() => {
              (0, I.Ay)("[data-tippy-content]", { plugins: [N] });
            });
          }
        }
        const B = {
            name: "hideTooltipOnBreadcrumbAndCollapse",
            fn({ hide: e }) {
              function t() {
                e();
              }
              return {
                onShow() {
                  document.addEventListener("w-breadcrumbs:opened", t),
                    document.addEventListener("w-breadcrumbs:closed", t);
                },
                onHide() {
                  document.removeEventListener("w-breadcrumbs:closed", t),
                    document.removeEventListener("w-breadcrumbs:opened", t);
                },
              };
            },
          },
          F = {
            name: "hideTooltipOnClickInside",
            defaultValue: !0,
            fn(e) {
              const t = () => e.hide();
              return {
                onShow() {
                  e.popper.addEventListener("click", t);
                },
                onHide() {
                  e.popper.removeEventListener("click", t);
                },
              };
            },
          },
          j = {
            name: "rotateToggleIcon",
            fn(e) {
              const t = e.reference.querySelector(
                ".icon-arrow-down, .icon-arrow-up",
              );
              return t
                ? {
                    onShow: () => t.classList.add("w-rotate-180"),
                    onHide: () => t.classList.remove("w-rotate-180"),
                  }
                : {};
            },
          };
        class H extends r.Controller {
          static targets = ["toggle", "content"];
          static values = {
            hideOnClick: { default: !1, type: Boolean },
            keepMounted: { default: !1, type: Boolean },
            offset: Array,
            theme: { default: "dropdown", type: String },
          };
          tippy;
          connect() {
            this.tippy = (0, I.Ay)(this.toggleTarget, this.options);
          }
          hide() {
            this.tippy?.hide();
          }
          show() {
            this.tippy?.show();
          }
          get options() {
            const e = this.toggleTarget.getAttribute("aria-label");
            let t;
            return (
              this.hasContentTarget && (this.contentTarget.hidden = !1),
              e &&
                (t = (0, I.Ay)(this.toggleTarget, {
                  content: e,
                  placement: "bottom",
                  plugins: [N],
                })),
              {
                ...(this.hasContentTarget
                  ? { content: this.contentTarget }
                  : {}),
                ...this.themeOptions,
                trigger: "click",
                interactive: !0,
                ...(this.hasOffsetValue && { offset: this.offsetValue }),
                getReferenceClientRect: () =>
                  this.reference.getBoundingClientRect(),
                theme: this.themeValue,
                onCreate: (e) => {
                  if (this.keepMountedValue) {
                    const { popper: t } = e;
                    this.element.append(t), (t.hidden = !0);
                  }
                },
                onShow: (e) => {
                  if ((t && t.disable(), this.keepMountedValue)) {
                    const { popper: t } = e;
                    t.hidden = !1;
                  }
                },
                onShown: () => {
                  this.dispatch("shown");
                },
                onHide: () => {
                  this.dispatch("hide"), t && t.enable();
                },
                onHidden: (e) => {
                  if (this.keepMountedValue) {
                    const { popper: t } = e;
                    this.element.append(t), (t.hidden = !0);
                  }
                },
              }
            );
          }
          get themeOptions() {
            return {
              dropdown: {
                arrow: !0,
                maxWidth: 350,
                placement: "bottom",
                plugins: this.plugins,
              },
              drilldown: {
                arrow: !1,
                maxWidth: "none",
                placement: "bottom-end",
                hideOnClick: !1,
                plugins: this.plugins.concat([this.hideTooltipOnClickAway]),
              },
              "dropdown-button": {
                arrow: !1,
                maxWidth: "none",
                placement: "bottom-start",
                plugins: this.plugins,
              },
            }[this.themeValue];
          }
          get hideTooltipOnClickAway() {
            return {
              name: "hideTooltipOnClickAway",
              fn: (e) => {
                const t = (t) => {
                  this.dispatch("clickaway", {
                    cancelable: !0,
                    detail: { target: t.target },
                  }).defaultPrevented ||
                    !e.state.isShown ||
                    (this.reference.contains(t.target) &&
                      !this.toggleTarget.contains(t.target)) ||
                    e.hide();
                };
                return {
                  onShow() {
                    document.addEventListener("click", t);
                  },
                  onHide() {
                    document.removeEventListener("click", t);
                  },
                };
              },
            };
          }
          get plugins() {
            const e = [B, N, j];
            return this.hideOnClickValue && e.push(F), e;
          }
          get reference() {
            const e = this.toggleTarget.parentElement;
            return "dropdown-button" === this.themeValue ? e.parentElement : e;
          }
        }
        class z extends r.Controller {
          static classes = ["ready", "remove"];
          static values = {
            delay: { default: -1, type: Number },
            detail: { default: {}, type: Object },
            event: { default: "", type: String },
          };
          connect() {
            this.ready();
          }
          ready() {
            const e = this.delayValue,
              t = { ...this.detailValue };
            (0, C.s)(() => !0, e < 0 ? null : e)().then(() => {
              this.element.classList.add(...this.readyClasses),
                this.element.classList.remove(...this.removeClasses),
                this.dispatch("ready", {
                  bubbles: !0,
                  cancelable: !0,
                  detail: t,
                }).defaultPrevented ||
                  (this.eventValue
                    .split(" ")
                    .filter(Boolean)
                    .forEach((e) => {
                      this.dispatch(e, {
                        bubbles: !0,
                        cancelable: !1,
                        detail: t,
                        prefix: "",
                      });
                    }),
                  this.remove());
            });
          }
          remove() {
            const e = this.element;
            this.constructor.classes.forEach((t) => {
              e.removeAttribute(`data-${this.identifier}-${t}-class`);
            }),
              Object.keys(this.constructor.values).forEach((t) => {
                e.removeAttribute(`data-${this.identifier}-${t}-value`);
              });
            const t = this.application.schema.controllerAttribute,
              n = (e.getAttribute(t)?.split(" ") ?? [])
                .filter((e) => e !== this.identifier)
                .join(" ");
            n ? e.setAttribute(t, n) : e.removeAttribute(t);
          }
        }
        var $ = n(6411),
          U = n.n($);
        n(9610);
        class q extends r.Controller {
          static values = {
            key: { default: "", type: String },
            scope: { default: "", type: String },
          };
          initialize() {
            if (
              ((this.handleKey = this.handleKey.bind(this)), !this.keyValue)
            ) {
              const e = this.element.getAttribute("aria-keyshortcuts");
              e && (this.keyValue = e);
            }
          }
          handleKey(e) {
            e.preventDefault && e.preventDefault(), this.element.click();
          }
          keyValueChanged(e, t) {
            t && t !== e && U().unbind(t),
              "global" === this.scopeValue
                ? U().bindGlobal(e, this.handleKey)
                : U().bind(e, this.handleKey);
          }
        }
        class Y extends r.Controller {
          static values = {
            attrName: { default: "href", type: String },
            preserveKeys: { default: [], type: Array },
            reflectKeys: { default: ["__all__"], type: Array },
          };
          get url() {
            return new URL(
              this.element.getAttribute(this.attrNameValue) || "",
              window.location.href,
            );
          }
          connect() {
            this.setParams();
          }
          get reflectAll() {
            return this.reflectKeysValue.includes("__all__");
          }
          setParamsFromURL(e) {
            const t = new URLSearchParams(),
              n = this.reflectAll;
            e.searchParams.forEach((e, i) => {
              i.startsWith("_w_") ||
                this.preserveKeysValue.includes(i) ||
                (!n && !this.reflectKeysValue.includes(i)) ||
                t.append(i, e);
            });
            const i = this.url;
            i.searchParams.forEach((e, n) => {
              this.preserveKeysValue.includes(n) && t.append(n, e);
            }),
              (i.search = t.toString()),
              this.element.setAttribute(this.attrNameValue, i.toString());
          }
          setParams(e) {
            e
              ? e.detail?.requestUrl &&
                this.setParamsFromURL(
                  new URL(e.detail.requestUrl, window.location.href),
                )
              : this.setParamsFromURL(new URL(window.location.href));
          }
        }
        function X(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, i);
          }
          return n;
        }
        function K(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? X(Object(n), !0).forEach(function (t) {
                  G(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : X(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t),
                  );
                });
          }
          return e;
        }
        function W(e) {
          return (
            (W =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            W(e)
          );
        }
        function G(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function Z() {
          return (
            (Z =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
                }
                return e;
              }),
            Z.apply(this, arguments)
          );
        }
        function J(e) {
          if ("undefined" != typeof window && window.navigator)
            return !!navigator.userAgent.match(e);
        }
        var Q = J(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
          ee = J(/Edge/i),
          te = J(/firefox/i),
          ne = J(/safari/i) && !J(/chrome/i) && !J(/android/i),
          ie = J(/iP(ad|od|hone)/i),
          oe = J(/chrome/i) && J(/android/i),
          re = { capture: !1, passive: !1 };
        function ae(e, t, n) {
          e.addEventListener(t, n, !Q && re);
        }
        function se(e, t, n) {
          e.removeEventListener(t, n, !Q && re);
        }
        function le(e, t) {
          if (t) {
            if ((">" === t[0] && (t = t.substring(1)), e))
              try {
                if (e.matches) return e.matches(t);
                if (e.msMatchesSelector) return e.msMatchesSelector(t);
                if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
              } catch (e) {
                return !1;
              }
            return !1;
          }
        }
        function ce(e) {
          return e.host && e !== document && e.host.nodeType
            ? e.host
            : e.parentNode;
        }
        function de(e, t, n, i) {
          if (e) {
            n = n || document;
            do {
              if (
                (null != t &&
                  (">" === t[0] ? e.parentNode === n && le(e, t) : le(e, t))) ||
                (i && e === n)
              )
                return e;
              if (e === n) break;
            } while ((e = ce(e)));
          }
          return null;
        }
        var he,
          ue = /\s+/g;
        function pe(e, t, n) {
          if (e && t)
            if (e.classList) e.classList[n ? "add" : "remove"](t);
            else {
              var i = (" " + e.className + " ")
                .replace(ue, " ")
                .replace(" " + t + " ", " ");
              e.className = (i + (n ? " " + t : "")).replace(ue, " ");
            }
        }
        function fe(e, t, n) {
          var i = e && e.style;
          if (i) {
            if (void 0 === n)
              return (
                document.defaultView && document.defaultView.getComputedStyle
                  ? (n = document.defaultView.getComputedStyle(e, ""))
                  : e.currentStyle && (n = e.currentStyle),
                void 0 === t ? n : n[t]
              );
            t in i || -1 !== t.indexOf("webkit") || (t = "-webkit-" + t),
              (i[t] = n + ("string" == typeof n ? "" : "px"));
          }
        }
        function me(e, t) {
          var n = "";
          if ("string" == typeof e) n = e;
          else
            do {
              var i = fe(e, "transform");
              i && "none" !== i && (n = i + " " + n);
            } while (!t && (e = e.parentNode));
          var o =
            window.DOMMatrix ||
            window.WebKitCSSMatrix ||
            window.CSSMatrix ||
            window.MSCSSMatrix;
          return o && new o(n);
        }
        function ge(e, t, n) {
          if (e) {
            var i = e.getElementsByTagName(t),
              o = 0,
              r = i.length;
            if (n) for (; o < r; o++) n(i[o], o);
            return i;
          }
          return [];
        }
        function ve() {
          return document.scrollingElement || document.documentElement;
        }
        function be(e, t, n, i, o) {
          if (e.getBoundingClientRect || e === window) {
            var r, a, s, l, c, d, h;
            if (
              (e !== window && e.parentNode && e !== ve()
                ? ((a = (r = e.getBoundingClientRect()).top),
                  (s = r.left),
                  (l = r.bottom),
                  (c = r.right),
                  (d = r.height),
                  (h = r.width))
                : ((a = 0),
                  (s = 0),
                  (l = window.innerHeight),
                  (c = window.innerWidth),
                  (d = window.innerHeight),
                  (h = window.innerWidth)),
              (t || n) && e !== window && ((o = o || e.parentNode), !Q))
            )
              do {
                if (
                  o &&
                  o.getBoundingClientRect &&
                  ("none" !== fe(o, "transform") ||
                    (n && "static" !== fe(o, "position")))
                ) {
                  var u = o.getBoundingClientRect();
                  (a -= u.top + parseInt(fe(o, "border-top-width"))),
                    (s -= u.left + parseInt(fe(o, "border-left-width"))),
                    (l = a + r.height),
                    (c = s + r.width);
                  break;
                }
              } while ((o = o.parentNode));
            if (i && e !== window) {
              var p = me(o || e),
                f = p && p.a,
                m = p && p.d;
              p && ((l = (a /= m) + (d /= m)), (c = (s /= f) + (h /= f)));
            }
            return {
              top: a,
              left: s,
              bottom: l,
              right: c,
              width: h,
              height: d,
            };
          }
        }
        function ye(e, t, n) {
          for (var i = Te(e, !0), o = be(e)[t]; i; ) {
            var r = be(i)[n];
            if (!("top" === n || "left" === n ? o >= r : o <= r)) return i;
            if (i === ve()) break;
            i = Te(i, !1);
          }
          return !1;
        }
        function we(e, t, n, i) {
          for (var o = 0, r = 0, a = e.children; r < a.length; ) {
            if (
              "none" !== a[r].style.display &&
              a[r] !== kt.ghost &&
              (i || a[r] !== kt.dragged) &&
              de(a[r], n.draggable, e, !1)
            ) {
              if (o === t) return a[r];
              o++;
            }
            r++;
          }
          return null;
        }
        function Ee(e, t) {
          for (
            var n = e.lastElementChild;
            n &&
            (n === kt.ghost || "none" === fe(n, "display") || (t && !le(n, t)));

          )
            n = n.previousElementSibling;
          return n || null;
        }
        function Ce(e, t) {
          var n = 0;
          if (!e || !e.parentNode) return -1;
          for (; (e = e.previousElementSibling); )
            "TEMPLATE" === e.nodeName.toUpperCase() ||
              e === kt.clone ||
              (t && !le(e, t)) ||
              n++;
          return n;
        }
        function Se(e) {
          var t = 0,
            n = 0,
            i = ve();
          if (e)
            do {
              var o = me(e),
                r = o.a,
                a = o.d;
              (t += e.scrollLeft * r), (n += e.scrollTop * a);
            } while (e !== i && (e = e.parentNode));
          return [t, n];
        }
        function Te(e, t) {
          if (!e || !e.getBoundingClientRect) return ve();
          var n = e,
            i = !1;
          do {
            if (
              n.clientWidth < n.scrollWidth ||
              n.clientHeight < n.scrollHeight
            ) {
              var o = fe(n);
              if (
                (n.clientWidth < n.scrollWidth &&
                  ("auto" == o.overflowX || "scroll" == o.overflowX)) ||
                (n.clientHeight < n.scrollHeight &&
                  ("auto" == o.overflowY || "scroll" == o.overflowY))
              ) {
                if (!n.getBoundingClientRect || n === document.body)
                  return ve();
                if (i || t) return n;
                i = !0;
              }
            }
          } while ((n = n.parentNode));
          return ve();
        }
        function Ae(e, t) {
          return (
            Math.round(e.top) === Math.round(t.top) &&
            Math.round(e.left) === Math.round(t.left) &&
            Math.round(e.height) === Math.round(t.height) &&
            Math.round(e.width) === Math.round(t.width)
          );
        }
        function _e(e, t) {
          return function () {
            if (!he) {
              var n = arguments;
              1 === n.length ? e.call(this, n[0]) : e.apply(this, n),
                (he = setTimeout(function () {
                  he = void 0;
                }, t));
            }
          };
        }
        function ke(e, t, n) {
          (e.scrollLeft += t), (e.scrollTop += n);
        }
        function xe(e) {
          var t = window.Polymer,
            n = window.jQuery || window.Zepto;
          return t && t.dom
            ? t.dom(e).cloneNode(!0)
            : n
            ? n(e).clone(!0)[0]
            : e.cloneNode(!0);
        }
        function Oe(e, t, n) {
          var i = {};
          return (
            Array.from(e.children).forEach(function (o) {
              var r, a, s, l;
              if (de(o, t.draggable, e, !1) && !o.animated && o !== n) {
                var c = be(o);
                (i.left = Math.min(
                  null !== (r = i.left) && void 0 !== r ? r : 1 / 0,
                  c.left,
                )),
                  (i.top = Math.min(
                    null !== (a = i.top) && void 0 !== a ? a : 1 / 0,
                    c.top,
                  )),
                  (i.right = Math.max(
                    null !== (s = i.right) && void 0 !== s ? s : -1 / 0,
                    c.right,
                  )),
                  (i.bottom = Math.max(
                    null !== (l = i.bottom) && void 0 !== l ? l : -1 / 0,
                    c.bottom,
                  ));
              }
            }),
            (i.width = i.right - i.left),
            (i.height = i.bottom - i.top),
            (i.x = i.left),
            (i.y = i.top),
            i
          );
        }
        var De = "Sortable" + new Date().getTime();
        var Ve = [],
          Le = { initializeByDefault: !0 },
          Pe = {
            mount: function (e) {
              for (var t in Le)
                Le.hasOwnProperty(t) && !(t in e) && (e[t] = Le[t]);
              Ve.forEach(function (t) {
                if (t.pluginName === e.pluginName)
                  throw "Sortable: Cannot mount plugin ".concat(
                    e.pluginName,
                    " more than once",
                  );
              }),
                Ve.push(e);
            },
            pluginEvent: function (e, t, n) {
              var i = this;
              (this.eventCanceled = !1),
                (n.cancel = function () {
                  i.eventCanceled = !0;
                });
              var o = e + "Global";
              Ve.forEach(function (i) {
                t[i.pluginName] &&
                  (t[i.pluginName][o] &&
                    t[i.pluginName][o](K({ sortable: t }, n)),
                  t.options[i.pluginName] &&
                    t[i.pluginName][e] &&
                    t[i.pluginName][e](K({ sortable: t }, n)));
              });
            },
            initializePlugins: function (e, t, n, i) {
              for (var o in (Ve.forEach(function (i) {
                var o = i.pluginName;
                if (e.options[o] || i.initializeByDefault) {
                  var r = new i(e, t, e.options);
                  (r.sortable = e),
                    (r.options = e.options),
                    (e[o] = r),
                    Z(n, r.defaults);
                }
              }),
              e.options))
                if (e.options.hasOwnProperty(o)) {
                  var r = this.modifyOption(e, o, e.options[o]);
                  void 0 !== r && (e.options[o] = r);
                }
            },
            getEventProperties: function (e, t) {
              var n = {};
              return (
                Ve.forEach(function (i) {
                  "function" == typeof i.eventProperties &&
                    Z(n, i.eventProperties.call(t[i.pluginName], e));
                }),
                n
              );
            },
            modifyOption: function (e, t, n) {
              var i;
              return (
                Ve.forEach(function (o) {
                  e[o.pluginName] &&
                    o.optionListeners &&
                    "function" == typeof o.optionListeners[t] &&
                    (i = o.optionListeners[t].call(e[o.pluginName], n));
                }),
                i
              );
            },
          };
        var Ie = ["evt"],
          Me = function (e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              i = n.evt,
              o = (function (e, t) {
                if (null == e) return {};
                var n,
                  i,
                  o = (function (e, t) {
                    if (null == e) return {};
                    var n,
                      i,
                      o = {},
                      r = Object.keys(e);
                    for (i = 0; i < r.length; i++)
                      (n = r[i]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                    return o;
                  })(e, t);
                if (Object.getOwnPropertySymbols) {
                  var r = Object.getOwnPropertySymbols(e);
                  for (i = 0; i < r.length; i++)
                    (n = r[i]),
                      t.indexOf(n) >= 0 ||
                        (Object.prototype.propertyIsEnumerable.call(e, n) &&
                          (o[n] = e[n]));
                }
                return o;
              })(n, Ie);
            Pe.pluginEvent.bind(kt)(
              e,
              t,
              K(
                {
                  dragEl: Re,
                  parentEl: Be,
                  ghostEl: Fe,
                  rootEl: je,
                  nextEl: He,
                  lastDownEl: ze,
                  cloneEl: $e,
                  cloneHidden: Ue,
                  dragStarted: it,
                  putSortable: Ge,
                  activeSortable: kt.active,
                  originalEvent: i,
                  oldIndex: qe,
                  oldDraggableIndex: Xe,
                  newIndex: Ye,
                  newDraggableIndex: Ke,
                  hideGhostForTarget: St,
                  unhideGhostForTarget: Tt,
                  cloneNowHidden: function () {
                    Ue = !0;
                  },
                  cloneNowShown: function () {
                    Ue = !1;
                  },
                  dispatchSortableEvent: function (e) {
                    Ne({ sortable: t, name: e, originalEvent: i });
                  },
                },
                o,
              ),
            );
          };
        function Ne(e) {
          !(function (e) {
            var t = e.sortable,
              n = e.rootEl,
              i = e.name,
              o = e.targetEl,
              r = e.cloneEl,
              a = e.toEl,
              s = e.fromEl,
              l = e.oldIndex,
              c = e.newIndex,
              d = e.oldDraggableIndex,
              h = e.newDraggableIndex,
              u = e.originalEvent,
              p = e.putSortable,
              f = e.extraEventProperties;
            if ((t = t || (n && n[De]))) {
              var m,
                g = t.options,
                v = "on" + i.charAt(0).toUpperCase() + i.substr(1);
              !window.CustomEvent || Q || ee
                ? (m = document.createEvent("Event")).initEvent(i, !0, !0)
                : (m = new CustomEvent(i, { bubbles: !0, cancelable: !0 })),
                (m.to = a || n),
                (m.from = s || n),
                (m.item = o || n),
                (m.clone = r),
                (m.oldIndex = l),
                (m.newIndex = c),
                (m.oldDraggableIndex = d),
                (m.newDraggableIndex = h),
                (m.originalEvent = u),
                (m.pullMode = p ? p.lastPutMode : void 0);
              var b = K(K({}, f), Pe.getEventProperties(i, t));
              for (var y in b) m[y] = b[y];
              n && n.dispatchEvent(m), g[v] && g[v].call(t, m);
            }
          })(
            K(
              {
                putSortable: Ge,
                cloneEl: $e,
                targetEl: Re,
                rootEl: je,
                oldIndex: qe,
                oldDraggableIndex: Xe,
                newIndex: Ye,
                newDraggableIndex: Ke,
              },
              e,
            ),
          );
        }
        var Re,
          Be,
          Fe,
          je,
          He,
          ze,
          $e,
          Ue,
          qe,
          Ye,
          Xe,
          Ke,
          We,
          Ge,
          Ze,
          Je,
          Qe,
          et,
          tt,
          nt,
          it,
          ot,
          rt,
          at,
          st,
          lt = !1,
          ct = !1,
          dt = [],
          ht = !1,
          ut = !1,
          pt = [],
          ft = !1,
          mt = [],
          gt = "undefined" != typeof document,
          vt = ie,
          bt = ee || Q ? "cssFloat" : "float",
          yt = gt && !oe && !ie && "draggable" in document.createElement("div"),
          wt = (function () {
            if (gt) {
              if (Q) return !1;
              var e = document.createElement("x");
              return (
                (e.style.cssText = "pointer-events:auto"),
                "auto" === e.style.pointerEvents
              );
            }
          })(),
          Et = function (e, t) {
            var n = fe(e),
              i =
                parseInt(n.width) -
                parseInt(n.paddingLeft) -
                parseInt(n.paddingRight) -
                parseInt(n.borderLeftWidth) -
                parseInt(n.borderRightWidth),
              o = we(e, 0, t),
              r = we(e, 1, t),
              a = o && fe(o),
              s = r && fe(r),
              l =
                a &&
                parseInt(a.marginLeft) + parseInt(a.marginRight) + be(o).width,
              c =
                s &&
                parseInt(s.marginLeft) + parseInt(s.marginRight) + be(r).width;
            if ("flex" === n.display)
              return "column" === n.flexDirection ||
                "column-reverse" === n.flexDirection
                ? "vertical"
                : "horizontal";
            if ("grid" === n.display)
              return n.gridTemplateColumns.split(" ").length <= 1
                ? "vertical"
                : "horizontal";
            if (o && a.float && "none" !== a.float) {
              var d = "left" === a.float ? "left" : "right";
              return !r || ("both" !== s.clear && s.clear !== d)
                ? "horizontal"
                : "vertical";
            }
            return o &&
              ("block" === a.display ||
                "flex" === a.display ||
                "table" === a.display ||
                "grid" === a.display ||
                (l >= i && "none" === n[bt]) ||
                (r && "none" === n[bt] && l + c > i))
              ? "vertical"
              : "horizontal";
          },
          Ct = function (e) {
            function t(e, n) {
              return function (i, o, r, a) {
                var s =
                  i.options.group.name &&
                  o.options.group.name &&
                  i.options.group.name === o.options.group.name;
                if (null == e && (n || s)) return !0;
                if (null == e || !1 === e) return !1;
                if (n && "clone" === e) return e;
                if ("function" == typeof e)
                  return t(e(i, o, r, a), n)(i, o, r, a);
                var l = (n ? i : o).options.group.name;
                return (
                  !0 === e ||
                  ("string" == typeof e && e === l) ||
                  (e.join && e.indexOf(l) > -1)
                );
              };
            }
            var n = {},
              i = e.group;
            (i && "object" == W(i)) || (i = { name: i }),
              (n.name = i.name),
              (n.checkPull = t(i.pull, !0)),
              (n.checkPut = t(i.put)),
              (n.revertClone = i.revertClone),
              (e.group = n);
          },
          St = function () {
            !wt && Fe && fe(Fe, "display", "none");
          },
          Tt = function () {
            !wt && Fe && fe(Fe, "display", "");
          };
        gt &&
          !oe &&
          document.addEventListener(
            "click",
            function (e) {
              if (ct)
                return (
                  e.preventDefault(),
                  e.stopPropagation && e.stopPropagation(),
                  e.stopImmediatePropagation && e.stopImmediatePropagation(),
                  (ct = !1),
                  !1
                );
            },
            !0,
          );
        var At = function (e) {
            if (Re) {
              e = e.touches ? e.touches[0] : e;
              var t =
                ((o = e.clientX),
                (r = e.clientY),
                dt.some(function (e) {
                  var t = e[De].options.emptyInsertThreshold;
                  if (t && !Ee(e)) {
                    var n = be(e),
                      i = o >= n.left - t && o <= n.right + t,
                      s = r >= n.top - t && r <= n.bottom + t;
                    return i && s ? (a = e) : void 0;
                  }
                }),
                a);
              if (t) {
                var n = {};
                for (var i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
                (n.target = n.rootEl = t),
                  (n.preventDefault = void 0),
                  (n.stopPropagation = void 0),
                  t[De]._onDragOver(n);
              }
            }
            var o, r, a;
          },
          _t = function (e) {
            Re && Re.parentNode[De]._isOutsideThisEl(e.target);
          };
        function kt(e, t) {
          if (!e || !e.nodeType || 1 !== e.nodeType)
            throw "Sortable: `el` must be an HTMLElement, not ".concat(
              {}.toString.call(e),
            );
          (this.el = e), (this.options = t = Z({}, t)), (e[De] = this);
          var n,
            i,
            o = {
              group: null,
              sort: !0,
              disabled: !1,
              store: null,
              handle: null,
              draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
              swapThreshold: 1,
              invertSwap: !1,
              invertedSwapThreshold: null,
              removeCloneOnHide: !0,
              direction: function () {
                return Et(e, this.options);
              },
              ghostClass: "sortable-ghost",
              chosenClass: "sortable-chosen",
              dragClass: "sortable-drag",
              ignore: "a, img",
              filter: null,
              preventOnFilter: !0,
              animation: 0,
              easing: null,
              setData: function (e, t) {
                e.setData("Text", t.textContent);
              },
              dropBubble: !1,
              dragoverBubble: !1,
              dataIdAttr: "data-id",
              delay: 0,
              delayOnTouchOnly: !1,
              touchStartThreshold:
                (Number.parseInt ? Number : window).parseInt(
                  window.devicePixelRatio,
                  10,
                ) || 1,
              forceFallback: !1,
              fallbackClass: "sortable-fallback",
              fallbackOnBody: !1,
              fallbackTolerance: 0,
              fallbackOffset: { x: 0, y: 0 },
              supportPointer:
                !1 !== kt.supportPointer && "PointerEvent" in window && !ne,
              emptyInsertThreshold: 5,
            };
          for (var r in (Pe.initializePlugins(this, e, o), o))
            !(r in t) && (t[r] = o[r]);
          for (var a in (Ct(t), this))
            "_" === a.charAt(0) &&
              "function" == typeof this[a] &&
              (this[a] = this[a].bind(this));
          (this.nativeDraggable = !t.forceFallback && yt),
            this.nativeDraggable && (this.options.touchStartThreshold = 1),
            t.supportPointer
              ? ae(e, "pointerdown", this._onTapStart)
              : (ae(e, "mousedown", this._onTapStart),
                ae(e, "touchstart", this._onTapStart)),
            this.nativeDraggable &&
              (ae(e, "dragover", this), ae(e, "dragenter", this)),
            dt.push(this.el),
            t.store && t.store.get && this.sort(t.store.get(this) || []),
            Z(
              this,
              ((i = []),
              {
                captureAnimationState: function () {
                  (i = []),
                    this.options.animation &&
                      [].slice.call(this.el.children).forEach(function (e) {
                        if ("none" !== fe(e, "display") && e !== kt.ghost) {
                          i.push({ target: e, rect: be(e) });
                          var t = K({}, i[i.length - 1].rect);
                          if (e.thisAnimationDuration) {
                            var n = me(e, !0);
                            n && ((t.top -= n.f), (t.left -= n.e));
                          }
                          e.fromRect = t;
                        }
                      });
                },
                addAnimationState: function (e) {
                  i.push(e);
                },
                removeAnimationState: function (e) {
                  i.splice(
                    (function (e, t) {
                      for (var n in e)
                        if (e.hasOwnProperty(n))
                          for (var i in t)
                            if (t.hasOwnProperty(i) && t[i] === e[n][i])
                              return Number(n);
                      return -1;
                    })(i, { target: e }),
                    1,
                  );
                },
                animateAll: function (e) {
                  var t = this;
                  if (!this.options.animation)
                    return (
                      clearTimeout(n), void ("function" == typeof e && e())
                    );
                  var o = !1,
                    r = 0;
                  i.forEach(function (e) {
                    var n = 0,
                      i = e.target,
                      a = i.fromRect,
                      s = be(i),
                      l = i.prevFromRect,
                      c = i.prevToRect,
                      d = e.rect,
                      h = me(i, !0);
                    h && ((s.top -= h.f), (s.left -= h.e)),
                      (i.toRect = s),
                      i.thisAnimationDuration &&
                        Ae(l, s) &&
                        !Ae(a, s) &&
                        (d.top - s.top) / (d.left - s.left) ==
                          (a.top - s.top) / (a.left - s.left) &&
                        (n = (function (e, t, n, i) {
                          return (
                            (Math.sqrt(
                              Math.pow(t.top - e.top, 2) +
                                Math.pow(t.left - e.left, 2),
                            ) /
                              Math.sqrt(
                                Math.pow(t.top - n.top, 2) +
                                  Math.pow(t.left - n.left, 2),
                              )) *
                            i.animation
                          );
                        })(d, l, c, t.options)),
                      Ae(s, a) ||
                        ((i.prevFromRect = a),
                        (i.prevToRect = s),
                        n || (n = t.options.animation),
                        t.animate(i, d, s, n)),
                      n &&
                        ((o = !0),
                        (r = Math.max(r, n)),
                        clearTimeout(i.animationResetTimer),
                        (i.animationResetTimer = setTimeout(function () {
                          (i.animationTime = 0),
                            (i.prevFromRect = null),
                            (i.fromRect = null),
                            (i.prevToRect = null),
                            (i.thisAnimationDuration = null);
                        }, n)),
                        (i.thisAnimationDuration = n));
                  }),
                    clearTimeout(n),
                    o
                      ? (n = setTimeout(function () {
                          "function" == typeof e && e();
                        }, r))
                      : "function" == typeof e && e(),
                    (i = []);
                },
                animate: function (e, t, n, i) {
                  if (i) {
                    fe(e, "transition", ""), fe(e, "transform", "");
                    var o = me(this.el),
                      r = o && o.a,
                      a = o && o.d,
                      s = (t.left - n.left) / (r || 1),
                      l = (t.top - n.top) / (a || 1);
                    (e.animatingX = !!s),
                      (e.animatingY = !!l),
                      fe(
                        e,
                        "transform",
                        "translate3d(" + s + "px," + l + "px,0)",
                      ),
                      (this.forRepaintDummy = (function (e) {
                        return e.offsetWidth;
                      })(e)),
                      fe(
                        e,
                        "transition",
                        "transform " +
                          i +
                          "ms" +
                          (this.options.easing
                            ? " " + this.options.easing
                            : ""),
                      ),
                      fe(e, "transform", "translate3d(0,0,0)"),
                      "number" == typeof e.animated && clearTimeout(e.animated),
                      (e.animated = setTimeout(function () {
                        fe(e, "transition", ""),
                          fe(e, "transform", ""),
                          (e.animated = !1),
                          (e.animatingX = !1),
                          (e.animatingY = !1);
                      }, i));
                  }
                },
              }),
            );
        }
        function xt(e, t, n, i, o, r, a, s) {
          var l,
            c,
            d = e[De],
            h = d.options.onMove;
          return (
            !window.CustomEvent || Q || ee
              ? (l = document.createEvent("Event")).initEvent("move", !0, !0)
              : (l = new CustomEvent("move", { bubbles: !0, cancelable: !0 })),
            (l.to = t),
            (l.from = e),
            (l.dragged = n),
            (l.draggedRect = i),
            (l.related = o || t),
            (l.relatedRect = r || be(t)),
            (l.willInsertAfter = s),
            (l.originalEvent = a),
            e.dispatchEvent(l),
            h && (c = h.call(d, l, a)),
            c
          );
        }
        function Ot(e) {
          e.draggable = !1;
        }
        function Dt() {
          ft = !1;
        }
        function Vt(e) {
          for (
            var t = e.tagName + e.className + e.src + e.href + e.textContent,
              n = t.length,
              i = 0;
            n--;

          )
            i += t.charCodeAt(n);
          return i.toString(36);
        }
        function Lt(e) {
          return setTimeout(e, 0);
        }
        function Pt(e) {
          return clearTimeout(e);
        }
        (kt.prototype = {
          constructor: kt,
          _isOutsideThisEl: function (e) {
            this.el.contains(e) || e === this.el || (ot = null);
          },
          _getDirection: function (e, t) {
            return "function" == typeof this.options.direction
              ? this.options.direction.call(this, e, t, Re)
              : this.options.direction;
          },
          _onTapStart: function (e) {
            if (e.cancelable) {
              var t = this,
                n = this.el,
                i = this.options,
                o = i.preventOnFilter,
                r = e.type,
                a =
                  (e.touches && e.touches[0]) ||
                  (e.pointerType && "touch" === e.pointerType && e),
                s = (a || e).target,
                l =
                  (e.target.shadowRoot &&
                    ((e.path && e.path[0]) ||
                      (e.composedPath && e.composedPath()[0]))) ||
                  s,
                c = i.filter;
              if (
                ((function (e) {
                  mt.length = 0;
                  for (
                    var t = e.getElementsByTagName("input"), n = t.length;
                    n--;

                  ) {
                    var i = t[n];
                    i.checked && mt.push(i);
                  }
                })(n),
                !Re &&
                  !(
                    (/mousedown|pointerdown/.test(r) && 0 !== e.button) ||
                    i.disabled
                  ) &&
                  !l.isContentEditable &&
                  (this.nativeDraggable ||
                    !ne ||
                    !s ||
                    "SELECT" !== s.tagName.toUpperCase()) &&
                  !(
                    ((s = de(s, i.draggable, n, !1)) && s.animated) ||
                    ze === s
                  ))
              ) {
                if (
                  ((qe = Ce(s)),
                  (Xe = Ce(s, i.draggable)),
                  "function" == typeof c)
                ) {
                  if (c.call(this, e, s, this))
                    return (
                      Ne({
                        sortable: t,
                        rootEl: l,
                        name: "filter",
                        targetEl: s,
                        toEl: n,
                        fromEl: n,
                      }),
                      Me("filter", t, { evt: e }),
                      void (o && e.cancelable && e.preventDefault())
                    );
                } else if (
                  c &&
                  (c = c.split(",").some(function (i) {
                    if ((i = de(l, i.trim(), n, !1)))
                      return (
                        Ne({
                          sortable: t,
                          rootEl: i,
                          name: "filter",
                          targetEl: s,
                          fromEl: n,
                          toEl: n,
                        }),
                        Me("filter", t, { evt: e }),
                        !0
                      );
                  }))
                )
                  return void (o && e.cancelable && e.preventDefault());
                (i.handle && !de(l, i.handle, n, !1)) ||
                  this._prepareDragStart(e, a, s);
              }
            }
          },
          _prepareDragStart: function (e, t, n) {
            var i,
              o = this,
              r = o.el,
              a = o.options,
              s = r.ownerDocument;
            if (n && !Re && n.parentNode === r) {
              var l = be(n);
              if (
                ((je = r),
                (Be = (Re = n).parentNode),
                (He = Re.nextSibling),
                (ze = n),
                (We = a.group),
                (kt.dragged = Re),
                (Ze = {
                  target: Re,
                  clientX: (t || e).clientX,
                  clientY: (t || e).clientY,
                }),
                (tt = Ze.clientX - l.left),
                (nt = Ze.clientY - l.top),
                (this._lastX = (t || e).clientX),
                (this._lastY = (t || e).clientY),
                (Re.style["will-change"] = "all"),
                (i = function () {
                  Me("delayEnded", o, { evt: e }),
                    kt.eventCanceled
                      ? o._onDrop()
                      : (o._disableDelayedDragEvents(),
                        !te && o.nativeDraggable && (Re.draggable = !0),
                        o._triggerDragStart(e, t),
                        Ne({ sortable: o, name: "choose", originalEvent: e }),
                        pe(Re, a.chosenClass, !0));
                }),
                a.ignore.split(",").forEach(function (e) {
                  ge(Re, e.trim(), Ot);
                }),
                ae(s, "dragover", At),
                ae(s, "mousemove", At),
                ae(s, "touchmove", At),
                ae(s, "mouseup", o._onDrop),
                ae(s, "touchend", o._onDrop),
                ae(s, "touchcancel", o._onDrop),
                te &&
                  this.nativeDraggable &&
                  ((this.options.touchStartThreshold = 4), (Re.draggable = !0)),
                Me("delayStart", this, { evt: e }),
                !a.delay ||
                  (a.delayOnTouchOnly && !t) ||
                  (this.nativeDraggable && (ee || Q)))
              )
                i();
              else {
                if (kt.eventCanceled) return void this._onDrop();
                ae(s, "mouseup", o._disableDelayedDrag),
                  ae(s, "touchend", o._disableDelayedDrag),
                  ae(s, "touchcancel", o._disableDelayedDrag),
                  ae(s, "mousemove", o._delayedDragTouchMoveHandler),
                  ae(s, "touchmove", o._delayedDragTouchMoveHandler),
                  a.supportPointer &&
                    ae(s, "pointermove", o._delayedDragTouchMoveHandler),
                  (o._dragStartTimer = setTimeout(i, a.delay));
              }
            }
          },
          _delayedDragTouchMoveHandler: function (e) {
            var t = e.touches ? e.touches[0] : e;
            Math.max(
              Math.abs(t.clientX - this._lastX),
              Math.abs(t.clientY - this._lastY),
            ) >=
              Math.floor(
                this.options.touchStartThreshold /
                  ((this.nativeDraggable && window.devicePixelRatio) || 1),
              ) && this._disableDelayedDrag();
          },
          _disableDelayedDrag: function () {
            Re && Ot(Re),
              clearTimeout(this._dragStartTimer),
              this._disableDelayedDragEvents();
          },
          _disableDelayedDragEvents: function () {
            var e = this.el.ownerDocument;
            se(e, "mouseup", this._disableDelayedDrag),
              se(e, "touchend", this._disableDelayedDrag),
              se(e, "touchcancel", this._disableDelayedDrag),
              se(e, "mousemove", this._delayedDragTouchMoveHandler),
              se(e, "touchmove", this._delayedDragTouchMoveHandler),
              se(e, "pointermove", this._delayedDragTouchMoveHandler);
          },
          _triggerDragStart: function (e, t) {
            (t = t || ("touch" == e.pointerType && e)),
              !this.nativeDraggable || t
                ? this.options.supportPointer
                  ? ae(document, "pointermove", this._onTouchMove)
                  : ae(
                      document,
                      t ? "touchmove" : "mousemove",
                      this._onTouchMove,
                    )
                : (ae(Re, "dragend", this),
                  ae(je, "dragstart", this._onDragStart));
            try {
              document.selection
                ? Lt(function () {
                    document.selection.empty();
                  })
                : window.getSelection().removeAllRanges();
            } catch (e) {}
          },
          _dragStarted: function (e, t) {
            if (((lt = !1), je && Re)) {
              Me("dragStarted", this, { evt: t }),
                this.nativeDraggable && ae(document, "dragover", _t);
              var n = this.options;
              !e && pe(Re, n.dragClass, !1),
                pe(Re, n.ghostClass, !0),
                (kt.active = this),
                e && this._appendGhost(),
                Ne({ sortable: this, name: "start", originalEvent: t });
            } else this._nulling();
          },
          _emulateDragOver: function () {
            if (Je) {
              (this._lastX = Je.clientX), (this._lastY = Je.clientY), St();
              for (
                var e = document.elementFromPoint(Je.clientX, Je.clientY),
                  t = e;
                e &&
                e.shadowRoot &&
                (e = e.shadowRoot.elementFromPoint(Je.clientX, Je.clientY)) !==
                  t;

              )
                t = e;
              if ((Re.parentNode[De]._isOutsideThisEl(e), t))
                do {
                  if (
                    t[De] &&
                    t[De]._onDragOver({
                      clientX: Je.clientX,
                      clientY: Je.clientY,
                      target: e,
                      rootEl: t,
                    }) &&
                    !this.options.dragoverBubble
                  )
                    break;
                  e = t;
                } while ((t = t.parentNode));
              Tt();
            }
          },
          _onTouchMove: function (e) {
            if (Ze) {
              var t = this.options,
                n = t.fallbackTolerance,
                i = t.fallbackOffset,
                o = e.touches ? e.touches[0] : e,
                r = Fe && me(Fe, !0),
                a = Fe && r && r.a,
                s = Fe && r && r.d,
                l = vt && st && Se(st),
                c =
                  (o.clientX - Ze.clientX + i.x) / (a || 1) +
                  (l ? l[0] - pt[0] : 0) / (a || 1),
                d =
                  (o.clientY - Ze.clientY + i.y) / (s || 1) +
                  (l ? l[1] - pt[1] : 0) / (s || 1);
              if (!kt.active && !lt) {
                if (
                  n &&
                  Math.max(
                    Math.abs(o.clientX - this._lastX),
                    Math.abs(o.clientY - this._lastY),
                  ) < n
                )
                  return;
                this._onDragStart(e, !0);
              }
              if (Fe) {
                r
                  ? ((r.e += c - (Qe || 0)), (r.f += d - (et || 0)))
                  : (r = { a: 1, b: 0, c: 0, d: 1, e: c, f: d });
                var h = "matrix("
                  .concat(r.a, ",")
                  .concat(r.b, ",")
                  .concat(r.c, ",")
                  .concat(r.d, ",")
                  .concat(r.e, ",")
                  .concat(r.f, ")");
                fe(Fe, "webkitTransform", h),
                  fe(Fe, "mozTransform", h),
                  fe(Fe, "msTransform", h),
                  fe(Fe, "transform", h),
                  (Qe = c),
                  (et = d),
                  (Je = o);
              }
              e.cancelable && e.preventDefault();
            }
          },
          _appendGhost: function () {
            if (!Fe) {
              var e = this.options.fallbackOnBody ? document.body : je,
                t = be(Re, !0, vt, !0, e),
                n = this.options;
              if (vt) {
                for (
                  st = e;
                  "static" === fe(st, "position") &&
                  "none" === fe(st, "transform") &&
                  st !== document;

                )
                  st = st.parentNode;
                st !== document.body && st !== document.documentElement
                  ? (st === document && (st = ve()),
                    (t.top += st.scrollTop),
                    (t.left += st.scrollLeft))
                  : (st = ve()),
                  (pt = Se(st));
              }
              pe((Fe = Re.cloneNode(!0)), n.ghostClass, !1),
                pe(Fe, n.fallbackClass, !0),
                pe(Fe, n.dragClass, !0),
                fe(Fe, "transition", ""),
                fe(Fe, "transform", ""),
                fe(Fe, "box-sizing", "border-box"),
                fe(Fe, "margin", 0),
                fe(Fe, "top", t.top),
                fe(Fe, "left", t.left),
                fe(Fe, "width", t.width),
                fe(Fe, "height", t.height),
                fe(Fe, "opacity", "0.8"),
                fe(Fe, "position", vt ? "absolute" : "fixed"),
                fe(Fe, "zIndex", "100000"),
                fe(Fe, "pointerEvents", "none"),
                (kt.ghost = Fe),
                e.appendChild(Fe),
                fe(
                  Fe,
                  "transform-origin",
                  (tt / parseInt(Fe.style.width)) * 100 +
                    "% " +
                    (nt / parseInt(Fe.style.height)) * 100 +
                    "%",
                );
            }
          },
          _onDragStart: function (e, t) {
            var n = this,
              i = e.dataTransfer,
              o = n.options;
            Me("dragStart", this, { evt: e }),
              kt.eventCanceled
                ? this._onDrop()
                : (Me("setupClone", this),
                  kt.eventCanceled ||
                    (($e = xe(Re)).removeAttribute("id"),
                    ($e.draggable = !1),
                    ($e.style["will-change"] = ""),
                    this._hideClone(),
                    pe($e, this.options.chosenClass, !1),
                    (kt.clone = $e)),
                  (n.cloneId = Lt(function () {
                    Me("clone", n),
                      kt.eventCanceled ||
                        (n.options.removeCloneOnHide || je.insertBefore($e, Re),
                        n._hideClone(),
                        Ne({ sortable: n, name: "clone" }));
                  })),
                  !t && pe(Re, o.dragClass, !0),
                  t
                    ? ((ct = !0),
                      (n._loopId = setInterval(n._emulateDragOver, 50)))
                    : (se(document, "mouseup", n._onDrop),
                      se(document, "touchend", n._onDrop),
                      se(document, "touchcancel", n._onDrop),
                      i &&
                        ((i.effectAllowed = "move"),
                        o.setData && o.setData.call(n, i, Re)),
                      ae(document, "drop", n),
                      fe(Re, "transform", "translateZ(0)")),
                  (lt = !0),
                  (n._dragStartId = Lt(n._dragStarted.bind(n, t, e))),
                  ae(document, "selectstart", n),
                  (it = !0),
                  ne && fe(document.body, "user-select", "none"));
          },
          _onDragOver: function (e) {
            var t,
              n,
              i,
              o,
              r = this.el,
              a = e.target,
              s = this.options,
              l = s.group,
              c = kt.active,
              d = We === l,
              h = s.sort,
              u = Ge || c,
              p = this,
              f = !1;
            if (!ft) {
              if (
                (void 0 !== e.preventDefault &&
                  e.cancelable &&
                  e.preventDefault(),
                (a = de(a, s.draggable, r, !0)),
                O("dragOver"),
                kt.eventCanceled)
              )
                return f;
              if (
                Re.contains(e.target) ||
                (a.animated && a.animatingX && a.animatingY) ||
                p._ignoreWhileAnimating === a
              )
                return V(!1);
              if (
                ((ct = !1),
                c &&
                  !s.disabled &&
                  (d
                    ? h || (i = Be !== je)
                    : Ge === this ||
                      ((this.lastPutMode = We.checkPull(this, c, Re, e)) &&
                        l.checkPut(this, c, Re, e))))
              ) {
                if (
                  ((o = "vertical" === this._getDirection(e, a)),
                  (t = be(Re)),
                  O("dragOverValid"),
                  kt.eventCanceled)
                )
                  return f;
                if (i)
                  return (
                    (Be = je),
                    D(),
                    this._hideClone(),
                    O("revert"),
                    kt.eventCanceled ||
                      (He ? je.insertBefore(Re, He) : je.appendChild(Re)),
                    V(!0)
                  );
                var m = Ee(r, s.draggable);
                if (
                  !m ||
                  ((function (e, t, n) {
                    var i = be(Ee(n.el, n.options.draggable)),
                      o = Oe(n.el, n.options, Fe);
                    return t
                      ? e.clientX > o.right + 10 ||
                          (e.clientY > i.bottom && e.clientX > i.left)
                      : e.clientY > o.bottom + 10 ||
                          (e.clientX > i.right && e.clientY > i.top);
                  })(e, o, this) &&
                    !m.animated)
                ) {
                  if (m === Re) return V(!1);
                  if (
                    (m && r === e.target && (a = m),
                    a && (n = be(a)),
                    !1 !== xt(je, r, Re, t, a, n, e, !!a))
                  )
                    return (
                      D(),
                      m && m.nextSibling
                        ? r.insertBefore(Re, m.nextSibling)
                        : r.appendChild(Re),
                      (Be = r),
                      L(),
                      V(!0)
                    );
                } else if (
                  m &&
                  (function (e, t, n) {
                    var i = be(we(n.el, 0, n.options, !0)),
                      o = Oe(n.el, n.options, Fe);
                    return t
                      ? e.clientX < o.left - 10 ||
                          (e.clientY < i.top && e.clientX < i.right)
                      : e.clientY < o.top - 10 ||
                          (e.clientY < i.bottom && e.clientX < i.left);
                  })(e, o, this)
                ) {
                  var g = we(r, 0, s, !0);
                  if (g === Re) return V(!1);
                  if (((n = be((a = g))), !1 !== xt(je, r, Re, t, a, n, e, !1)))
                    return D(), r.insertBefore(Re, g), (Be = r), L(), V(!0);
                } else if (a.parentNode === r) {
                  n = be(a);
                  var v,
                    b,
                    y,
                    w = Re.parentNode !== r,
                    E = !(function (e, t, n) {
                      var i = n ? e.left : e.top,
                        o = n ? e.right : e.bottom,
                        r = n ? e.width : e.height,
                        a = n ? t.left : t.top,
                        s = n ? t.right : t.bottom,
                        l = n ? t.width : t.height;
                      return i === a || o === s || i + r / 2 === a + l / 2;
                    })(
                      (Re.animated && Re.toRect) || t,
                      (a.animated && a.toRect) || n,
                      o,
                    ),
                    C = o ? "top" : "left",
                    S = ye(a, "top", "top") || ye(Re, "top", "top"),
                    T = S ? S.scrollTop : void 0;
                  if (
                    (ot !== a &&
                      ((b = n[C]), (ht = !1), (ut = (!E && s.invertSwap) || w)),
                    (v = (function (e, t, n, i, o, r, a, s) {
                      var l = i ? e.clientY : e.clientX,
                        c = i ? n.height : n.width,
                        d = i ? n.top : n.left,
                        h = i ? n.bottom : n.right,
                        u = !1;
                      if (!a)
                        if (s && at < c * o) {
                          if (
                            (!ht &&
                              (1 === rt
                                ? l > d + (c * r) / 2
                                : l < h - (c * r) / 2) &&
                              (ht = !0),
                            ht)
                          )
                            u = !0;
                          else if (1 === rt ? l < d + at : l > h - at)
                            return -rt;
                        } else if (
                          l > d + (c * (1 - o)) / 2 &&
                          l < h - (c * (1 - o)) / 2
                        )
                          return (function (e) {
                            return Ce(Re) < Ce(e) ? 1 : -1;
                          })(t);
                      return (u = u || a) &&
                        (l < d + (c * r) / 2 || l > h - (c * r) / 2)
                        ? l > d + c / 2
                          ? 1
                          : -1
                        : 0;
                    })(
                      e,
                      a,
                      n,
                      o,
                      E ? 1 : s.swapThreshold,
                      null == s.invertedSwapThreshold
                        ? s.swapThreshold
                        : s.invertedSwapThreshold,
                      ut,
                      ot === a,
                    )),
                    0 !== v)
                  ) {
                    var A = Ce(Re);
                    do {
                      (A -= v), (y = Be.children[A]);
                    } while (y && ("none" === fe(y, "display") || y === Fe));
                  }
                  if (0 === v || y === a) return V(!1);
                  (ot = a), (rt = v);
                  var _ = a.nextElementSibling,
                    k = !1,
                    x = xt(je, r, Re, t, a, n, e, (k = 1 === v));
                  if (!1 !== x)
                    return (
                      (1 !== x && -1 !== x) || (k = 1 === x),
                      (ft = !0),
                      setTimeout(Dt, 30),
                      D(),
                      k && !_
                        ? r.appendChild(Re)
                        : a.parentNode.insertBefore(Re, k ? _ : a),
                      S && ke(S, 0, T - S.scrollTop),
                      (Be = Re.parentNode),
                      void 0 === b || ut || (at = Math.abs(b - be(a)[C])),
                      L(),
                      V(!0)
                    );
                }
                if (r.contains(Re)) return V(!1);
              }
              return !1;
            }
            function O(s, l) {
              Me(
                s,
                p,
                K(
                  {
                    evt: e,
                    isOwner: d,
                    axis: o ? "vertical" : "horizontal",
                    revert: i,
                    dragRect: t,
                    targetRect: n,
                    canSort: h,
                    fromSortable: u,
                    target: a,
                    completed: V,
                    onMove: function (n, i) {
                      return xt(je, r, Re, t, n, be(n), e, i);
                    },
                    changed: L,
                  },
                  l,
                ),
              );
            }
            function D() {
              O("dragOverAnimationCapture"),
                p.captureAnimationState(),
                p !== u && u.captureAnimationState();
            }
            function V(t) {
              return (
                O("dragOverCompleted", { insertion: t }),
                t &&
                  (d ? c._hideClone() : c._showClone(p),
                  p !== u &&
                    (pe(
                      Re,
                      Ge ? Ge.options.ghostClass : c.options.ghostClass,
                      !1,
                    ),
                    pe(Re, s.ghostClass, !0)),
                  Ge !== p && p !== kt.active
                    ? (Ge = p)
                    : p === kt.active && Ge && (Ge = null),
                  u === p && (p._ignoreWhileAnimating = a),
                  p.animateAll(function () {
                    O("dragOverAnimationComplete"),
                      (p._ignoreWhileAnimating = null);
                  }),
                  p !== u &&
                    (u.animateAll(), (u._ignoreWhileAnimating = null))),
                ((a === Re && !Re.animated) || (a === r && !a.animated)) &&
                  (ot = null),
                s.dragoverBubble ||
                  e.rootEl ||
                  a === document ||
                  (Re.parentNode[De]._isOutsideThisEl(e.target), !t && At(e)),
                !s.dragoverBubble && e.stopPropagation && e.stopPropagation(),
                (f = !0)
              );
            }
            function L() {
              (Ye = Ce(Re)),
                (Ke = Ce(Re, s.draggable)),
                Ne({
                  sortable: p,
                  name: "change",
                  toEl: r,
                  newIndex: Ye,
                  newDraggableIndex: Ke,
                  originalEvent: e,
                });
            }
          },
          _ignoreWhileAnimating: null,
          _offMoveEvents: function () {
            se(document, "mousemove", this._onTouchMove),
              se(document, "touchmove", this._onTouchMove),
              se(document, "pointermove", this._onTouchMove),
              se(document, "dragover", At),
              se(document, "mousemove", At),
              se(document, "touchmove", At);
          },
          _offUpEvents: function () {
            var e = this.el.ownerDocument;
            se(e, "mouseup", this._onDrop),
              se(e, "touchend", this._onDrop),
              se(e, "pointerup", this._onDrop),
              se(e, "touchcancel", this._onDrop),
              se(document, "selectstart", this);
          },
          _onDrop: function (e) {
            var t = this.el,
              n = this.options;
            (Ye = Ce(Re)),
              (Ke = Ce(Re, n.draggable)),
              Me("drop", this, { evt: e }),
              (Be = Re && Re.parentNode),
              (Ye = Ce(Re)),
              (Ke = Ce(Re, n.draggable)),
              kt.eventCanceled ||
                ((lt = !1),
                (ut = !1),
                (ht = !1),
                clearInterval(this._loopId),
                clearTimeout(this._dragStartTimer),
                Pt(this.cloneId),
                Pt(this._dragStartId),
                this.nativeDraggable &&
                  (se(document, "drop", this),
                  se(t, "dragstart", this._onDragStart)),
                this._offMoveEvents(),
                this._offUpEvents(),
                ne && fe(document.body, "user-select", ""),
                fe(Re, "transform", ""),
                e &&
                  (it &&
                    (e.cancelable && e.preventDefault(),
                    !n.dropBubble && e.stopPropagation()),
                  Fe && Fe.parentNode && Fe.parentNode.removeChild(Fe),
                  (je === Be || (Ge && "clone" !== Ge.lastPutMode)) &&
                    $e &&
                    $e.parentNode &&
                    $e.parentNode.removeChild($e),
                  Re &&
                    (this.nativeDraggable && se(Re, "dragend", this),
                    Ot(Re),
                    (Re.style["will-change"] = ""),
                    it &&
                      !lt &&
                      pe(
                        Re,
                        Ge ? Ge.options.ghostClass : this.options.ghostClass,
                        !1,
                      ),
                    pe(Re, this.options.chosenClass, !1),
                    Ne({
                      sortable: this,
                      name: "unchoose",
                      toEl: Be,
                      newIndex: null,
                      newDraggableIndex: null,
                      originalEvent: e,
                    }),
                    je !== Be
                      ? (Ye >= 0 &&
                          (Ne({
                            rootEl: Be,
                            name: "add",
                            toEl: Be,
                            fromEl: je,
                            originalEvent: e,
                          }),
                          Ne({
                            sortable: this,
                            name: "remove",
                            toEl: Be,
                            originalEvent: e,
                          }),
                          Ne({
                            rootEl: Be,
                            name: "sort",
                            toEl: Be,
                            fromEl: je,
                            originalEvent: e,
                          }),
                          Ne({
                            sortable: this,
                            name: "sort",
                            toEl: Be,
                            originalEvent: e,
                          })),
                        Ge && Ge.save())
                      : Ye !== qe &&
                        Ye >= 0 &&
                        (Ne({
                          sortable: this,
                          name: "update",
                          toEl: Be,
                          originalEvent: e,
                        }),
                        Ne({
                          sortable: this,
                          name: "sort",
                          toEl: Be,
                          originalEvent: e,
                        })),
                    kt.active &&
                      ((null != Ye && -1 !== Ye) || ((Ye = qe), (Ke = Xe)),
                      Ne({
                        sortable: this,
                        name: "end",
                        toEl: Be,
                        originalEvent: e,
                      }),
                      this.save())))),
              this._nulling();
          },
          _nulling: function () {
            Me("nulling", this),
              (je =
                Re =
                Be =
                Fe =
                He =
                $e =
                ze =
                Ue =
                Ze =
                Je =
                it =
                Ye =
                Ke =
                qe =
                Xe =
                ot =
                rt =
                Ge =
                We =
                kt.dragged =
                kt.ghost =
                kt.clone =
                kt.active =
                  null),
              mt.forEach(function (e) {
                e.checked = !0;
              }),
              (mt.length = Qe = et = 0);
          },
          handleEvent: function (e) {
            switch (e.type) {
              case "drop":
              case "dragend":
                this._onDrop(e);
                break;
              case "dragenter":
              case "dragover":
                Re &&
                  (this._onDragOver(e),
                  (function (e) {
                    e.dataTransfer && (e.dataTransfer.dropEffect = "move"),
                      e.cancelable && e.preventDefault();
                  })(e));
                break;
              case "selectstart":
                e.preventDefault();
            }
          },
          toArray: function () {
            for (
              var e,
                t = [],
                n = this.el.children,
                i = 0,
                o = n.length,
                r = this.options;
              i < o;
              i++
            )
              de((e = n[i]), r.draggable, this.el, !1) &&
                t.push(e.getAttribute(r.dataIdAttr) || Vt(e));
            return t;
          },
          sort: function (e, t) {
            var n = {},
              i = this.el;
            this.toArray().forEach(function (e, t) {
              var o = i.children[t];
              de(o, this.options.draggable, i, !1) && (n[e] = o);
            }, this),
              t && this.captureAnimationState(),
              e.forEach(function (e) {
                n[e] && (i.removeChild(n[e]), i.appendChild(n[e]));
              }),
              t && this.animateAll();
          },
          save: function () {
            var e = this.options.store;
            e && e.set && e.set(this);
          },
          closest: function (e, t) {
            return de(e, t || this.options.draggable, this.el, !1);
          },
          option: function (e, t) {
            var n = this.options;
            if (void 0 === t) return n[e];
            var i = Pe.modifyOption(this, e, t);
            (n[e] = void 0 !== i ? i : t), "group" === e && Ct(n);
          },
          destroy: function () {
            Me("destroy", this);
            var e = this.el;
            (e[De] = null),
              se(e, "mousedown", this._onTapStart),
              se(e, "touchstart", this._onTapStart),
              se(e, "pointerdown", this._onTapStart),
              this.nativeDraggable &&
                (se(e, "dragover", this), se(e, "dragenter", this)),
              Array.prototype.forEach.call(
                e.querySelectorAll("[draggable]"),
                function (e) {
                  e.removeAttribute("draggable");
                },
              ),
              this._onDrop(),
              this._disableDelayedDragEvents(),
              dt.splice(dt.indexOf(this.el), 1),
              (this.el = e = null);
          },
          _hideClone: function () {
            if (!Ue) {
              if ((Me("hideClone", this), kt.eventCanceled)) return;
              fe($e, "display", "none"),
                this.options.removeCloneOnHide &&
                  $e.parentNode &&
                  $e.parentNode.removeChild($e),
                (Ue = !0);
            }
          },
          _showClone: function (e) {
            if ("clone" === e.lastPutMode) {
              if (Ue) {
                if ((Me("showClone", this), kt.eventCanceled)) return;
                Re.parentNode != je || this.options.group.revertClone
                  ? He
                    ? je.insertBefore($e, He)
                    : je.appendChild($e)
                  : je.insertBefore($e, Re),
                  this.options.group.revertClone && this.animate(Re, $e),
                  fe($e, "display", ""),
                  (Ue = !1);
              }
            } else this._hideClone();
          },
        }),
          gt &&
            ae(document, "touchmove", function (e) {
              (kt.active || lt) && e.cancelable && e.preventDefault();
            }),
          (kt.utils = {
            on: ae,
            off: se,
            css: fe,
            find: ge,
            is: function (e, t) {
              return !!de(e, t, e, !1);
            },
            extend: function (e, t) {
              if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              return e;
            },
            throttle: _e,
            closest: de,
            toggleClass: pe,
            clone: xe,
            index: Ce,
            nextTick: Lt,
            cancelNextTick: Pt,
            detectDirection: Et,
            getChild: we,
          }),
          (kt.get = function (e) {
            return e[De];
          }),
          (kt.mount = function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            t[0].constructor === Array && (t = t[0]),
              t.forEach(function (e) {
                if (!e.prototype || !e.prototype.constructor)
                  throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
                    {}.toString.call(e),
                  );
                e.utils && (kt.utils = K(K({}, kt.utils), e.utils)),
                  Pe.mount(e);
              });
          }),
          (kt.create = function (e, t) {
            return new kt(e, t);
          }),
          (kt.version = "1.15.2");
        var It,
          Mt,
          Nt,
          Rt,
          Bt,
          Ft,
          jt = [],
          Ht = !1;
        function zt() {
          jt.forEach(function (e) {
            clearInterval(e.pid);
          }),
            (jt = []);
        }
        function $t() {
          clearInterval(Ft);
        }
        var Ut = _e(function (e, t, n, i) {
            if (t.scroll) {
              var o,
                r = (e.touches ? e.touches[0] : e).clientX,
                a = (e.touches ? e.touches[0] : e).clientY,
                s = t.scrollSensitivity,
                l = t.scrollSpeed,
                c = ve(),
                d = !1;
              Mt !== n &&
                ((Mt = n),
                zt(),
                (It = t.scroll),
                (o = t.scrollFn),
                !0 === It && (It = Te(n, !0)));
              var h = 0,
                u = It;
              do {
                var p = u,
                  f = be(p),
                  m = f.top,
                  g = f.bottom,
                  v = f.left,
                  b = f.right,
                  y = f.width,
                  w = f.height,
                  E = void 0,
                  C = void 0,
                  S = p.scrollWidth,
                  T = p.scrollHeight,
                  A = fe(p),
                  _ = p.scrollLeft,
                  k = p.scrollTop;
                p === c
                  ? ((E =
                      y < S &&
                      ("auto" === A.overflowX ||
                        "scroll" === A.overflowX ||
                        "visible" === A.overflowX)),
                    (C =
                      w < T &&
                      ("auto" === A.overflowY ||
                        "scroll" === A.overflowY ||
                        "visible" === A.overflowY)))
                  : ((E =
                      y < S &&
                      ("auto" === A.overflowX || "scroll" === A.overflowX)),
                    (C =
                      w < T &&
                      ("auto" === A.overflowY || "scroll" === A.overflowY)));
                var x =
                    E &&
                    (Math.abs(b - r) <= s && _ + y < S) -
                      (Math.abs(v - r) <= s && !!_),
                  O =
                    C &&
                    (Math.abs(g - a) <= s && k + w < T) -
                      (Math.abs(m - a) <= s && !!k);
                if (!jt[h]) for (var D = 0; D <= h; D++) jt[D] || (jt[D] = {});
                (jt[h].vx == x && jt[h].vy == O && jt[h].el === p) ||
                  ((jt[h].el = p),
                  (jt[h].vx = x),
                  (jt[h].vy = O),
                  clearInterval(jt[h].pid),
                  (0 == x && 0 == O) ||
                    ((d = !0),
                    (jt[h].pid = setInterval(
                      function () {
                        i && 0 === this.layer && kt.active._onTouchMove(Bt);
                        var t = jt[this.layer].vy ? jt[this.layer].vy * l : 0,
                          n = jt[this.layer].vx ? jt[this.layer].vx * l : 0;
                        ("function" == typeof o &&
                          "continue" !==
                            o.call(
                              kt.dragged.parentNode[De],
                              n,
                              t,
                              e,
                              Bt,
                              jt[this.layer].el,
                            )) ||
                          ke(jt[this.layer].el, n, t);
                      }.bind({ layer: h }),
                      24,
                    )))),
                  h++;
              } while (t.bubbleScroll && u !== c && (u = Te(u, !1)));
              Ht = d;
            }
          }, 30),
          qt = function (e) {
            var t = e.originalEvent,
              n = e.putSortable,
              i = e.dragEl,
              o = e.activeSortable,
              r = e.dispatchSortableEvent,
              a = e.hideGhostForTarget,
              s = e.unhideGhostForTarget;
            if (t) {
              var l = n || o;
              a();
              var c =
                  t.changedTouches && t.changedTouches.length
                    ? t.changedTouches[0]
                    : t,
                d = document.elementFromPoint(c.clientX, c.clientY);
              s(),
                l &&
                  !l.el.contains(d) &&
                  (r("spill"), this.onSpill({ dragEl: i, putSortable: n }));
            }
          };
        function Yt() {}
        function Xt() {}
        (Yt.prototype = {
          startIndex: null,
          dragStart: function (e) {
            var t = e.oldDraggableIndex;
            this.startIndex = t;
          },
          onSpill: function (e) {
            var t = e.dragEl,
              n = e.putSortable;
            this.sortable.captureAnimationState(),
              n && n.captureAnimationState();
            var i = we(this.sortable.el, this.startIndex, this.options);
            i
              ? this.sortable.el.insertBefore(t, i)
              : this.sortable.el.appendChild(t),
              this.sortable.animateAll(),
              n && n.animateAll();
          },
          drop: qt,
        }),
          Z(Yt, { pluginName: "revertOnSpill" }),
          (Xt.prototype = {
            onSpill: function (e) {
              var t = e.dragEl,
                n = e.putSortable || this.sortable;
              n.captureAnimationState(),
                t.parentNode && t.parentNode.removeChild(t),
                n.animateAll();
            },
            drop: qt,
          }),
          Z(Xt, { pluginName: "removeOnSpill" }),
          kt.mount(
            new (function () {
              function e() {
                for (var e in ((this.defaults = {
                  scroll: !0,
                  forceAutoScrollFallback: !1,
                  scrollSensitivity: 30,
                  scrollSpeed: 10,
                  bubbleScroll: !0,
                }),
                this))
                  "_" === e.charAt(0) &&
                    "function" == typeof this[e] &&
                    (this[e] = this[e].bind(this));
              }
              return (
                (e.prototype = {
                  dragStarted: function (e) {
                    var t = e.originalEvent;
                    this.sortable.nativeDraggable
                      ? ae(document, "dragover", this._handleAutoScroll)
                      : this.options.supportPointer
                      ? ae(
                          document,
                          "pointermove",
                          this._handleFallbackAutoScroll,
                        )
                      : t.touches
                      ? ae(
                          document,
                          "touchmove",
                          this._handleFallbackAutoScroll,
                        )
                      : ae(
                          document,
                          "mousemove",
                          this._handleFallbackAutoScroll,
                        );
                  },
                  dragOverCompleted: function (e) {
                    var t = e.originalEvent;
                    this.options.dragOverBubble ||
                      t.rootEl ||
                      this._handleAutoScroll(t);
                  },
                  drop: function () {
                    this.sortable.nativeDraggable
                      ? se(document, "dragover", this._handleAutoScroll)
                      : (se(
                          document,
                          "pointermove",
                          this._handleFallbackAutoScroll,
                        ),
                        se(
                          document,
                          "touchmove",
                          this._handleFallbackAutoScroll,
                        ),
                        se(
                          document,
                          "mousemove",
                          this._handleFallbackAutoScroll,
                        )),
                      $t(),
                      zt(),
                      clearTimeout(he),
                      (he = void 0);
                  },
                  nulling: function () {
                    (Bt = Mt = It = Ht = Ft = Nt = Rt = null), (jt.length = 0);
                  },
                  _handleFallbackAutoScroll: function (e) {
                    this._handleAutoScroll(e, !0);
                  },
                  _handleAutoScroll: function (e, t) {
                    var n = this,
                      i = (e.touches ? e.touches[0] : e).clientX,
                      o = (e.touches ? e.touches[0] : e).clientY,
                      r = document.elementFromPoint(i, o);
                    if (
                      ((Bt = e),
                      t ||
                        this.options.forceAutoScrollFallback ||
                        ee ||
                        Q ||
                        ne)
                    ) {
                      Ut(e, this.options, r, t);
                      var a = Te(r, !0);
                      !Ht ||
                        (Ft && i === Nt && o === Rt) ||
                        (Ft && $t(),
                        (Ft = setInterval(function () {
                          var r = Te(document.elementFromPoint(i, o), !0);
                          r !== a && ((a = r), zt()), Ut(e, n.options, r, t);
                        }, 10)),
                        (Nt = i),
                        (Rt = o));
                    } else {
                      if (!this.options.bubbleScroll || Te(r, !0) === ve())
                        return void zt();
                      Ut(e, this.options, Te(r, !1), !1);
                    }
                  },
                }),
                Z(e, { pluginName: "scroll", initializeByDefault: !0 })
              );
            })(),
          ),
          kt.mount(Xt, Yt);
        const Kt = kt;
        var Wt;
        !(function (e) {
          (e.Up = "UP"), (e.Down = "DOWN");
        })(Wt || (Wt = {}));
        class Gt extends r.Controller {
          static classes = ["active", "chosen", "drag", "ghost"];
          static targets = ["handle", "item"];
          static values = {
            animation: { default: 200, type: Number },
            container: { default: "", type: String },
            message: { default: "", type: String },
            url: String,
          };
          order;
          sortable;
          constructor(e) {
            super(e), (this.order = []);
          }
          connect() {
            const e = this.containerValue,
              t = (e && this.element.querySelector(e)) || this.element;
            (this.sortable = Kt.create(t, this.options)),
              (this.order = this.sortable.toArray()),
              this.dispatch("ready", {
                cancelable: !1,
                detail: { order: this.order },
              });
          }
          get options() {
            const e = this.identifier;
            return {
              ...(this.hasGhostClass ? { ghostClass: this.ghostClass } : {}),
              ...(this.hasChosenClass ? { chosenClass: this.chosenClass } : {}),
              ...(this.hasDragClass ? { dragClass: this.dragClass } : {}),
              animation: this.animationValue,
              dataIdAttr: `data-${e}-item-id`,
              draggable: `[data-${e}-target="item"]`,
              handle: `[data-${e}-target="handle"]`,
              onStart: () => {
                this.element.classList.add(...this.activeClasses);
              },
              onEnd: ({ item: e, newIndex: t, oldIndex: n }) => {
                this.element.classList.remove(...this.activeClasses),
                  n !== t &&
                    ((this.order = this.sortable.toArray()),
                    this.submit({ ...this.getItemData(e), newIndex: t }));
              },
            };
          }
          getItemData(e) {
            const t = this.identifier,
              n =
                e instanceof HTMLElement &&
                e.closest(`[data-${t}-target='item']`);
            return n
              ? {
                  id: n.getAttribute(`data-${t}-item-id`) || "",
                  label: n.getAttribute(`data-${t}-item-label`) || "",
                }
              : { id: "", label: "" };
          }
          apply({ currentTarget: e }) {
            const { id: t, label: n } = this.getItemData(e),
              i = this.order.indexOf(t);
            this.submit({ id: t, label: n, newIndex: i });
          }
          move({ currentTarget: e }, t) {
            const n = this.identifier,
              i =
                e instanceof HTMLElement &&
                e.closest(`[data-${n}-target='item']`);
            if (!i) return;
            const o = i.getAttribute(`data-${n}-item-id`) || "",
              r = this.order.indexOf(o);
            this.order.splice(r, 1),
              t === Wt.Down
                ? this.order.splice(r + 1, 0, o)
                : t === Wt.Up && r > 0
                ? this.order.splice(r - 1, 0, o)
                : this.order.splice(r, 0, o),
              this.sortable.sort(this.order, !0);
          }
          up(e) {
            this.move(e, Wt.Up), e.currentTarget?.focus();
          }
          down(e) {
            this.move(e, Wt.Down), e.currentTarget?.focus();
          }
          submit({ id: e, label: t, newIndex: n }) {
            let i = this.urlValue.replace("999999", e);
            null !== n && (i += "?position=" + n);
            const o = (this.messageValue || "__LABEL__").replace(
                "__LABEL__",
                t,
              ),
              r = this.element.closest("form"),
              a = r && r.querySelector('input[name="csrfmiddlewaretoken"]');
            if (a instanceof HTMLInputElement) {
              const e = a.value,
                t = new FormData();
              t.append("csrfmiddlewaretoken", e),
                fetch(i, { method: "POST", body: t })
                  .then((e) => {
                    if (!e.ok)
                      throw new Error(`HTTP error! Status: ${e.status}`);
                  })
                  .then(() => {
                    this.dispatch("w-messages:add", {
                      prefix: "",
                      target: window.document,
                      detail: { clear: !0, text: o, type: "success" },
                      cancelable: !1,
                    });
                  })
                  .catch((e) => {
                    throw e;
                  });
            }
          }
          disconnect() {
            this.sortable && this.sortable.destroy();
          }
        }
        class Zt extends r.Controller {
          static classes = ["active"];
          static targets = ["label"];
          static values = {
            active: { default: "", type: String },
            duration: { default: 3e4, type: Number },
            label: { default: "", type: String },
            loading: { default: !1, type: Boolean },
          };
          timer;
          connect() {
            if (this.hasLabelTarget) return;
            const e = this.element.querySelector("em");
            e && e.setAttribute(`data-${this.identifier}-target`, "label");
          }
          activate() {
            const e = this.element.closest("form");
            (e && e.checkValidity && !e.noValidate && !e.checkValidity()) ||
              window.setTimeout(() => {
                (this.loadingValue = !0),
                  (this.timer = window.setTimeout(() => {
                    this.loadingValue = !1;
                  }, this.durationValue));
              });
          }
          loadingValueChanged(e) {
            const t = this.hasActiveClass
              ? this.activeClass
              : "button-longrunning-active";
            this.element.classList.toggle(t, e),
              this.labelValue ||
                (this.labelValue = this.hasLabelTarget
                  ? this.labelTarget.textContent
                  : this.element.textContent),
              e
                ? (this.element.setAttribute("disabled", ""),
                  this.activeValue &&
                    this.hasLabelTarget &&
                    (this.labelTarget.textContent = this.activeValue))
                : (this.element.removeAttribute("disabled"),
                  this.labelValue &&
                    this.hasLabelTarget &&
                    (this.labelTarget.textContent = this.labelValue));
          }
          disconnect() {
            this.timer && clearTimeout(this.timer);
          }
        }
        class Jt extends r.Controller {
          static classes = [
            "closed",
            "closeIcon",
            "opened",
            "openedContent",
            "openIcon",
          ];
          static targets = ["content", "toggle"];
          static values = {
            closed: { default: !1, type: Boolean },
            peeking: { default: !1, type: Boolean },
            peekTarget: { default: "", type: String },
          };
          cleanUpPeekListener;
          connect() {
            const e =
              !!this.peekTargetValue &&
              this.element.closest(this.peekTargetValue);
            if (e) {
              const t = () => {
                this.peekingValue && this.close(), (this.peekingValue = !1);
              };
              e.addEventListener("mouseleave", t, { passive: !0 }),
                (this.cleanUpPeekListener = () => {
                  e.removeEventListener("mouseleave", t);
                });
            }
            new Promise((e) => {
              setTimeout(e);
            }).then(() => {
              this.dispatch("ready", {
                cancelable: !1,
                detail: { closed: this.closedValue },
              });
            });
          }
          closedValueChanged(e, t) {
            if (t === e) return;
            const n = this.closedClasses,
              i = this.openedClasses,
              o = this.contentTargets,
              r = void 0 === t,
              a = this.peekingValue,
              s = this.openedContentClasses,
              l = this.toggles;
            if ((a || this.updateToggleIcon(e), e)) {
              if (this.dispatch("closing", { cancelable: !0 }).defaultPrevented)
                return;
              l.forEach((e) => {
                e.setAttribute("aria-expanded", "false");
              }),
                o.forEach((e) => {
                  e.classList.remove(...s), (e.hidden = !0);
                }),
                this.element.classList.add(...n),
                this.element.classList.remove(...i),
                this.dispatch("closed", { cancelable: !1 });
            } else {
              if (this.dispatch("opening", { cancelable: !0 }).defaultPrevented)
                return;
              l.forEach((e) => {
                e.setAttribute("aria-expanded", "true");
              }),
                o.forEach((e) => {
                  e.classList.add(...s), (e.hidden = !1);
                }),
                this.element.classList.remove(...n),
                this.element.classList.add(...i),
                this.dispatch("opened", { cancelable: !1 });
            }
            r ||
              l.forEach((t) => {
                this.dispatch("toggled", {
                  cancelable: !1,
                  detail: { closed: e },
                  target: t,
                });
              });
          }
          close() {
            this.closedValue = !0;
          }
          open() {
            this.closedValue = !1;
          }
          peek() {
            this.closedValue && ((this.peekingValue = !0), this.open());
          }
          toggle() {
            if (this.peekingValue)
              return (this.peekingValue = !1), void this.updateToggleIcon(!1);
            this.closedValue = !this.closedValue;
          }
          get toggles() {
            const e = this.contentTargets
              .map((e) => e.id)
              .flatMap((e) =>
                Array.from(
                  document.querySelectorAll(`[aria-controls~="${e}"]`),
                ),
              )
              .concat(...this.toggleTargets);
            return Array.from(new Set(e));
          }
          updateToggleIcon(e = !1) {
            if (!this.hasCloseIconClass || !this.hasOpenIconClass) return;
            const t = this.closeIconClass,
              n = this.openIconClass;
            t !== n &&
              this.toggles
                .map((e) => {
                  const t = e.querySelector(".icon"),
                    n = t?.querySelector("use");
                  return n && t ? [t, n] : [];
                })
                .filter(({ length: e }) => e)
                .forEach(([i, o]) => {
                  e
                    ? (i.classList.remove(t),
                      i.classList.add(n),
                      o.setAttribute("href", `#${n}`))
                    : (i.classList.remove(n),
                      i.classList.add(t),
                      o.setAttribute("href", `#${t}`));
                });
          }
          disconnect() {
            this.cleanUpPeekListener?.call(this);
          }
        }
        class Qt extends r.Controller {
          skipToTarget;
          connect() {
            this.skipToTarget = document.querySelector(
              this.element.getAttribute("href") || "main",
            );
          }
          handleBlur() {
            this.skipToTarget &&
              (this.skipToTarget.removeAttribute("tabindex"),
              this.skipToTarget.removeEventListener("blur", this.handleBlur),
              this.skipToTarget.removeEventListener(
                "focusout",
                this.handleBlur,
              ));
          }
          skip() {
            this.skipToTarget &&
              (this.skipToTarget.setAttribute("tabindex", "-1"),
              this.skipToTarget.addEventListener("blur", this.handleBlur),
              this.skipToTarget.addEventListener("focusout", this.handleBlur),
              this.skipToTarget.focus());
          }
        }
        const en = JSON.parse(
            '[{"LATIN_MAP":[["À","A"],["Á","A"],["Â","A"],["Ã","A"],["Ä","A"],["Å","A"],["Æ","AE"],["Ç","C"],["È","E"],["É","E"],["Ê","E"],["Ë","E"],["Ì","I"],["Í","I"],["Î","I"],["Ï","I"],["Ð","D"],["Ñ","N"],["Ò","O"],["Ó","O"],["Ô","O"],["Õ","O"],["Ö","O"],["Ő","O"],["Ø","O"],["Ù","U"],["Ú","U"],["Û","U"],["Ü","U"],["Ű","U"],["Ý","Y"],["Þ","TH"],["Ÿ","Y"],["ß","ss"],["à","a"],["á","a"],["â","a"],["ã","a"],["ä","a"],["å","a"],["æ","ae"],["ç","c"],["è","e"],["é","e"],["ê","e"],["ë","e"],["ì","i"],["í","i"],["î","i"],["ï","i"],["ð","d"],["ñ","n"],["ò","o"],["ó","o"],["ô","o"],["õ","o"],["ö","o"],["ő","o"],["ø","o"],["ù","u"],["ú","u"],["û","u"],["ü","u"],["ű","u"],["ý","y"],["þ","th"],["ÿ","y"]]},{"LATIN_SYMBOLS_MAP":[["©","(c)"]]},{"GREEK_MAP":[["α","a"],["β","b"],["γ","g"],["δ","d"],["ε","e"],["ζ","z"],["η","h"],["θ","8"],["ι","i"],["κ","k"],["λ","l"],["μ","m"],["ν","n"],["ξ","3"],["ο","o"],["π","p"],["ρ","r"],["σ","s"],["τ","t"],["υ","y"],["φ","f"],["χ","x"],["ψ","ps"],["ω","w"],["ά","a"],["έ","e"],["ί","i"],["ό","o"],["ύ","y"],["ή","h"],["ώ","w"],["ς","s"],["ϊ","i"],["ΰ","y"],["ϋ","y"],["ΐ","i"],["Α","A"],["Β","B"],["Γ","G"],["Δ","D"],["Ε","E"],["Ζ","Z"],["Η","H"],["Θ","8"],["Ι","I"],["Κ","K"],["Λ","L"],["Μ","M"],["Ν","N"],["Ξ","3"],["Ο","O"],["Π","P"],["Ρ","R"],["Σ","S"],["Τ","T"],["Υ","Y"],["Φ","F"],["Χ","X"],["Ψ","PS"],["Ω","W"],["Ά","A"],["Έ","E"],["Ί","I"],["Ό","O"],["Ύ","Y"],["Ή","H"],["Ώ","W"],["Ϊ","I"],["Ϋ","Y"]]},{"TURKISH_MAP":[["ş","s"],["Ş","S"],["ı","i"],["İ","I"],["ç","c"],["Ç","C"],["ü","u"],["Ü","U"],["ö","o"],["Ö","O"],["ğ","g"],["Ğ","G"]]},{"ROMANIAN_MAP":[["ă","a"],["î","i"],["ș","s"],["ț","t"],["â","a"],["Ă","A"],["Î","I"],["Ș","S"],["Ț","T"],["Â","A"]]},{"RUSSIAN_MAP":[["а","a"],["б","b"],["в","v"],["г","g"],["д","d"],["е","e"],["ё","yo"],["ж","zh"],["з","z"],["и","i"],["й","j"],["к","k"],["л","l"],["м","m"],["н","n"],["о","o"],["п","p"],["р","r"],["с","s"],["т","t"],["у","u"],["ф","f"],["х","h"],["ц","c"],["ч","ch"],["ш","sh"],["щ","sh"],["ъ",""],["ы","y"],["ь",""],["э","e"],["ю","yu"],["я","ya"],["А","A"],["Б","B"],["В","V"],["Г","G"],["Д","D"],["Е","E"],["Ё","Yo"],["Ж","Zh"],["З","Z"],["И","I"],["Й","J"],["К","K"],["Л","L"],["М","M"],["Н","N"],["О","O"],["П","P"],["Р","R"],["С","S"],["Т","T"],["У","U"],["Ф","F"],["Х","H"],["Ц","C"],["Ч","Ch"],["Ш","Sh"],["Щ","Sh"],["Ъ",""],["Ы","Y"],["Ь",""],["Э","E"],["Ю","Yu"],["Я","Ya"]]},{"UKRAINIAN_MAP":[["Є","Ye"],["І","I"],["Ї","Yi"],["Ґ","G"],["є","ye"],["і","i"],["ї","yi"],["ґ","g"]]},{"CZECH_MAP":[["č","c"],["ď","d"],["ě","e"],["ň","n"],["ř","r"],["š","s"],["ť","t"],["ů","u"],["ž","z"],["Č","C"],["Ď","D"],["Ě","E"],["Ň","N"],["Ř","R"],["Š","S"],["Ť","T"],["Ů","U"],["Ž","Z"]]},{"SLOVAK_MAP":[["á","a"],["ä","a"],["č","c"],["ď","d"],["é","e"],["í","i"],["ľ","l"],["ĺ","l"],["ň","n"],["ó","o"],["ô","o"],["ŕ","r"],["š","s"],["ť","t"],["ú","u"],["ý","y"],["ž","z"],["Á","a"],["Ä","A"],["Č","C"],["Ď","D"],["É","E"],["Í","I"],["Ľ","L"],["Ĺ","L"],["Ň","N"],["Ó","O"],["Ô","O"],["Ŕ","R"],["Š","S"],["Ť","T"],["Ú","U"],["Ý","Y"],["Ž","Z"]]},{"POLISH_MAP":[["ą","a"],["ć","c"],["ę","e"],["ł","l"],["ń","n"],["ó","o"],["ś","s"],["ź","z"],["ż","z"],["Ą","A"],["Ć","C"],["Ę","E"],["Ł","L"],["Ń","N"],["Ó","O"],["Ś","S"],["Ź","Z"],["Ż","Z"]]},{"LATVIAN_MAP":[["ā","a"],["č","c"],["ē","e"],["ģ","g"],["ī","i"],["ķ","k"],["ļ","l"],["ņ","n"],["š","s"],["ū","u"],["ž","z"],["Ā","A"],["Č","C"],["Ē","E"],["Ģ","G"],["Ī","I"],["Ķ","K"],["Ļ","L"],["Ņ","N"],["Š","S"],["Ū","U"],["Ž","Z"]]},{"ARABIC_MAP":[["أ","a"],["ب","b"],["ت","t"],["ث","th"],["ج","g"],["ح","h"],["خ","kh"],["د","d"],["ذ","th"],["ر","r"],["ز","z"],["س","s"],["ش","sh"],["ص","s"],["ض","d"],["ط","t"],["ظ","th"],["ع","aa"],["غ","gh"],["ف","f"],["ق","k"],["ك","k"],["ل","l"],["م","m"],["ن","n"],["ه","h"],["و","o"],["ي","y"]]},{"LITHUANIAN_MAP":[["ą","a"],["č","c"],["ę","e"],["ė","e"],["į","i"],["š","s"],["ų","u"],["ū","u"],["ž","z"],["Ą","A"],["Č","C"],["Ę","E"],["Ė","E"],["Į","I"],["Š","S"],["Ų","U"],["Ū","U"],["Ž","Z"]]},{"SERBIAN_MAP":[["ђ","dj"],["ј","j"],["љ","lj"],["њ","nj"],["ћ","c"],["џ","dz"],["đ","dj"],["Ђ","Dj"],["Ј","j"],["Љ","Lj"],["Њ","Nj"],["Ћ","C"],["Џ","Dz"],["Đ","Dj"]]},{"AZERBAIJANI_MAP":[["ç","c"],["ə","e"],["ğ","g"],["ı","i"],["ö","o"],["ş","s"],["ü","u"],["Ç","C"],["Ə","E"],["Ğ","G"],["İ","I"],["Ö","O"],["Ş","S"],["Ü","U"]]},{"GEORGIAN_MAP":[["ა","a"],["ბ","b"],["გ","g"],["დ","d"],["ე","e"],["ვ","v"],["ზ","z"],["თ","t"],["ი","i"],["კ","k"],["ლ","l"],["მ","m"],["ნ","n"],["ო","o"],["პ","p"],["ჟ","j"],["რ","r"],["ს","s"],["ტ","t"],["უ","u"],["ფ","f"],["ქ","q"],["ღ","g"],["ყ","y"],["შ","sh"],["ჩ","ch"],["ც","c"],["ძ","dz"],["წ","w"],["ჭ","ch"],["ხ","x"],["ჯ","j"],["ჰ","h"]]}]',
          ).reduce(
            (e, t) => (
              Object.values(t)
                .flat()
                .forEach(([t, n]) => {
                  e[t] = n;
                }),
              e
            ),
            {},
          ),
          tn = new RegExp(Object.keys(en).join("|"), "g"),
          nn = (e, { numChars: t = 255, allowUnicode: n = !1 } = {}) => {
            let i = e;
            return (
              n || (i = i.replace(tn, (e) => en[e])),
              (i = i.toLowerCase()),
              (i = n
                ? i.replace(/[^-_\p{L}\p{N}\s]/gu, "")
                : i.replace(/[^-\w\s]/g, "")),
              (i = i.replace(/^\s+|\s+$/g, "")),
              (i = i.replace(/[-\s]+/g, "-")),
              (i = i.substring(0, t)),
              (i = i.replace(/-+$/g, "")),
              i
            );
          };
        class on extends r.Controller {
          static values = { allowUnicode: { default: !1, type: Boolean } };
          compare(e) {
            if (!this.element.value) return !0;
            const t = this[
                e.detail?.compareAs || e.params?.compareAs || "slugify"
              ]({ detail: { value: e.detail?.value || "" } }, !0),
              n = this.element.value,
              i = t.trim() === n.trim();
            return i || e?.preventDefault(), i;
          }
          slugify(e, t = !1) {
            const n = this.allowUnicodeValue,
              { value: i = this.element.value } = e?.detail || {},
              o = ((e, { allowUnicode: t = !1 } = {}) =>
                t
                  ? e
                      .replace(/\s+/g, "-")
                      .replace(/[&/\\#,+()$~%.'":`@^!*?<>{}]/g, "")
                      .toLowerCase()
                  : e
                      .replace(/\s+/g, "-")
                      .replace(/[^A-Za-z0-9\-_]/g, "")
                      .toLowerCase())(i.trim(), { allowUnicode: n });
            return t || (this.element.value = o), o;
          }
          urlify(e, t = !1) {
            const n = this.allowUnicodeValue,
              { value: i = this.element.value } = e?.detail || {},
              o = i.trim(),
              r =
                nn(o, { allowUnicode: n }) ||
                this.slugify({ detail: { value: o } }, !0);
            return t || (this.element.value = r), r;
          }
        }
        class rn extends r.Controller {
          submit() {
            const e = this.element.form;
            if (!e)
              throw new Error(
                `${this.identifier} controlled element must be part of a <form />`,
              );
            e.requestSubmit ? e.requestSubmit() : e.submit();
          }
        }
        class an extends r.Controller {
          static defaultClearParam = "p";
          static targets = ["input"];
          static values = {
            icon: { default: "", type: String },
            loading: { default: !1, type: Boolean },
            reflect: { default: !1, type: Boolean },
            src: { default: "", type: String },
            target: { default: "#listing-results", type: String },
            wait: { default: 200, type: Number },
          };
          abortController;
          iconElement;
          replaceLazy;
          searchLazy;
          submitLazy;
          connect() {
            const e = this.hasInputTarget
              ? this.inputTarget.form
              : this.element;
            this.srcValue = this.srcValue || e?.getAttribute("action") || "";
            const t = this.target;
            this.iconElement = null;
            const n = (this.hasInputTarget ? this.inputTarget : this.element)
              .parentElement;
            (this.iconElement = n?.querySelector("use") || null),
              (this.iconValue = this.iconElement?.getAttribute("href") || ""),
              (this.loadingValue = !1),
              (this.replaceLazy = (0, C.s)(
                this.replace.bind(this),
                this.waitValue,
              )),
              (this.searchLazy = (0, C.s)(
                this.search.bind(this),
                this.waitValue,
              )),
              (this.submitLazy = (0, C.s)(
                this.submit.bind(this),
                this.waitValue,
              )),
              this.dispatch("ready", { cancelable: !1, target: t });
          }
          get target() {
            const e = this.targetValue,
              t = document.querySelector(e),
              n = t && t instanceof HTMLElement,
              i = !!this.srcValue,
              o = [];
            if (
              (n || o.push(`Cannot find valid target element at "${e}"`),
              i || o.push("Cannot find valid src URL value"),
              o.length)
            )
              throw new Error(o.join(", "));
            return t;
          }
          loadingValueChanged(e, t) {
            const n = void 0 === t ? null : this.target;
            e
              ? (n?.setAttribute("aria-busy", "true"),
                this.iconElement?.setAttribute("href", "#icon-spinner"))
              : (n?.removeAttribute("aria-busy"),
                this.iconElement?.setAttribute("href", this.iconValue));
          }
          search(e) {
            const t = (
                e?.detail?.clear ||
                e?.params?.clear ||
                this.constructor.defaultClearParam
              ).split(" "),
              n = this.hasInputTarget ? this.inputTarget : this.element,
              i = n.name,
              o = new URLSearchParams(window.location.search),
              r = o.get(i) || "",
              a = n.value || "";
            if (r.trim() === a.trim()) return;
            a ? o.set(i, a) : o.delete(i),
              t.forEach((e) => {
                o.delete(e);
              });
            const s = "?" + o.toString(),
              l = this.srcValue;
            this.replace(l + s).then(() => {
              window.history.replaceState(null, "", s);
            });
          }
          submit() {
            const e = this.hasInputTarget
                ? this.inputTarget.form
                : this.element,
              t = "?" + new URLSearchParams(new FormData(e)).toString(),
              n = this.srcValue;
            this.replace(n + t);
          }
          reflectParams(e) {
            const t = new URL(e, window.location.href).searchParams,
              n = new URLSearchParams();
            t.forEach((e, t) => {
              "" === e.trim() || t.startsWith("_w_") || n.append(t, e);
            });
            const i = `?${n.toString()}`;
            window.history.replaceState(null, "", i);
          }
          async replace(e) {
            const t = this.target,
              n =
                ("string" == typeof e
                  ? e
                  : e?.detail?.url || e?.params?.url || "") || this.srcValue;
            this.abortController && this.abortController.abort(),
              (this.abortController = new AbortController());
            const { signal: i } = this.abortController;
            return (
              (this.loadingValue = !0),
              this.dispatch("begin", {
                cancelable: !0,
                detail: { requestUrl: n },
                target: this.target,
              }).defaultPrevented
                ? Promise.resolve()
                : fetch(n, {
                    headers: { "x-requested-with": "XMLHttpRequest" },
                    signal: i,
                  })
                    .then((e) => {
                      if (!e.ok)
                        throw new Error(`HTTP error! Status: ${e.status}`);
                      return e.text();
                    })
                    .then(
                      (e) => (
                        (t.innerHTML = e),
                        this.reflectValue &&
                          (this.dispatch("reflect", {
                            cancelable: !0,
                            detail: { requestUrl: n },
                            target: t,
                          }).defaultPrevented ||
                            this.reflectParams(n)),
                        this.dispatch("success", {
                          cancelable: !1,
                          detail: { requestUrl: n, results: e },
                          target: t,
                        }),
                        e
                      ),
                    )
                    .catch((e) => {
                      i.aborted ||
                        (this.dispatch("error", {
                          cancelable: !1,
                          detail: { error: e, requestUrl: n },
                          target: t,
                        }),
                        console.error("Error fetching %s", n, e));
                    })
                    .finally(() => {
                      i === this.abortController?.signal &&
                        (this.loadingValue = !1);
                    })
            );
          }
          disconnect() {
            (this.loadingValue = !1),
              this.replaceLazy?.cancel(),
              this.searchLazy?.cancel(),
              this.submitLazy?.cancel();
          }
        }
        class sn extends r.Controller {
          static values = {
            debounce: { default: 100, type: Number },
            delay: { default: 0, type: Number },
            disabled: { default: !1, type: Boolean },
            quiet: { default: !1, type: Boolean },
            target: String,
          };
          connect() {
            this.processTargetElements("start", !0),
              (this.apply = (0, C.s)(
                this.apply.bind(this),
                this.debounceValue,
              ));
          }
          check() {
            this.processTargetElements("check", !0);
          }
          apply(e) {
            const t = e?.params?.apply || this.element.value,
              n = (e) => {
                (e.value = t),
                  this.quietValue ||
                    this.dispatch("change", {
                      cancelable: !1,
                      prefix: "",
                      target: e,
                    });
              };
            this.processTargetElements("apply").forEach((e) => {
              this.delayValue
                ? setTimeout(() => {
                    n(e);
                  }, this.delayValue)
                : n(e);
            });
          }
          clear() {
            this.processTargetElements("clear").forEach((e) => {
              setTimeout(() => {
                e.setAttribute("value", ""),
                  this.quietValue ||
                    this.dispatch("change", {
                      cancelable: !1,
                      prefix: "",
                      target: e,
                    });
              }, this.delayValue);
            });
          }
          ping() {
            this.processTargetElements("ping", !1, { bubbles: !0 });
          }
          processTargetElements(e, t = !1, n = {}) {
            if (!t && this.disabledValue) return [];
            const i = [...document.querySelectorAll(this.targetValue)],
              o = i.filter(
                (t) =>
                  !this.dispatch(e, {
                    bubbles: !1,
                    cancelable: !0,
                    ...n,
                    detail: {
                      element: this.element,
                      value: this.element.value,
                    },
                    target: t,
                  }).defaultPrevented,
              );
            return t && (this.disabledValue = i.length > o.length), o;
          }
        }
        class ln extends r.Controller {
          static values = {
            options: { default: {}, type: Object },
            url: String,
          };
          tagit;
          connect() {
            const e = this.cleanTag.bind(this);
            o()(this.element).tagit({
              autocomplete: { source: this.urlValue },
              preprocessTag: e,
              ...this.optionsValue,
            });
          }
          cleanTag(e) {
            return e && '"' !== e[0] && e.indexOf(" ") > -1 ? `"${e}"` : e;
          }
          clear() {
            o()(this.element).tagit("removeAll");
          }
        }
        var cn = n(2223);
        const dn = { initial: 1e4, long: 3e3, notify: 30, short: 300 };
        class hn extends r.Controller {
          static values = {
            confirmation: { default: "", type: String },
            durations: { default: dn, type: Object },
            force: { default: !1, type: Boolean },
            hasComments: { default: !1, type: Boolean },
            hasEdits: { default: !1, type: Boolean },
            watch: { default: "edits", type: String },
          };
          initialFormData;
          observer;
          runningCheck;
          initialize() {
            this.notify = (0, C.s)(
              this.notify.bind(this),
              this.durationsValue.notify,
            );
          }
          connect() {
            this.clear();
            const e = this.durationsValue,
              t = this.watchValue;
            t.includes("comments") && this.watchComments(e),
              t.includes("edits") && this.watchEdits(e),
              this.dispatch("ready", { cancelable: !1 });
          }
          get formData() {
            const e = ["comment_", "comments-", "csrfmiddlewaretoken", "next"],
              t = new FormData(this.element);
            return JSON.stringify(
              [...t.entries()].filter(([t]) => !e.some((e) => t.startsWith(e))),
              (e, t) =>
                t instanceof File
                  ? { name: t.name, size: t.size, type: t.type }
                  : t,
            );
          }
          check() {
            const { long: e, short: t } = this.durationsValue;
            return (
              this.runningCheck && this.runningCheck.cancel(),
              (this.runningCheck = (0, C.s)(
                () => {
                  this.forceValue
                    ? (this.hasEditsValue = !0)
                    : this.initialFormData
                    ? (this.hasEditsValue =
                        this.initialFormData !== this.formData)
                    : (this.hasEditsValue = !1);
                },
                this.hasEditsValue ? e : t,
              )),
              this.runningCheck()
            );
          }
          clear() {
            (this.hasCommentsValue = !1), (this.hasEditsValue = !1);
          }
          confirm(e) {
            const t = this.confirmationValue;
            return t &&
              (this.forceValue || this.hasCommentsValue || this.hasEditsValue)
              ? ((e.returnValue = t), t)
              : null;
          }
          hasCommentsValueChanged(e, t) {
            e !== t && this.notify();
          }
          hasEditsValueChanged(e, t) {
            e !== t && this.notify();
          }
          getIsValidNode(e) {
            if (!e || e.nodeType !== e.ELEMENT_NODE) return !1;
            const t = ["input", "textarea", "select"];
            return (
              t.includes(e.localName) || null !== e.querySelector(t.join(","))
            );
          }
          notify() {
            const e = this.hasCommentsValue,
              t = this.hasEditsValue;
            if (!e && !t)
              return void this.dispatch("clear", { cancelable: !1 });
            const [n] = [t && e && "all", e && "comments", t && "edits"].filter(
              Boolean,
            );
            this.dispatch("add", { cancelable: !1, detail: { type: n } });
          }
          submit() {
            this.confirmationValue = "";
          }
          watchComments({ long: e, short: t }) {
            let n;
            const { commentApp: i } = window.comments,
              o = i.selectors.selectIsDirty(i.store.getState());
            this.dispatch("watch-edits", {
              cancelable: !1,
              detail: { initialComments: o },
            }),
              (this.hasCommentsValue = o),
              i.store.subscribe(() => {
                n && n.cancel(),
                  (n = (0, C.s)(
                    () => {
                      this.hasCommentsValue = i.selectors.selectIsDirty(
                        i.store.getState(),
                      );
                    },
                    this.hasCommentsValue ? e : t,
                  )),
                  n();
              });
          }
          watchEdits({ initial: e }) {
            const t = this.element;
            (0, C.s)(() => {
              const e = this.formData;
              (this.initialFormData = e),
                this.dispatch("watch-edits", {
                  cancelable: !1,
                  detail: { initialFormData: e },
                });
              const n = new MutationObserver((e) => {
                e.some(
                  (e) =>
                    Array.from(e.addedNodes).some(this.getIsValidNode) ||
                    Array.from(e.removedNodes).some(this.getIsValidNode),
                ) && this.check();
              });
              n.observe(t, { attributes: !1, childList: !0, subtree: !0 }),
                (this.observer = n);
            }, e)();
          }
          disconnect() {
            this.runningCheck && this.runningCheck.cancel(),
              this.observer && this.observer.disconnect();
          }
          static afterLoad(e) {
            window.enableDirtyFormCheck = (
              t,
              { alwaysDirty: n = !1, confirmationMessage: i = "" },
            ) => {
              (0, M.Q)().then(() => {
                const o = document.querySelector(
                  `${t}:not([data-controller~='${e}'])`,
                );
                o instanceof HTMLFormElement &&
                  ([
                    ["data-w-unsaved-confirmation-value", i || " "],
                    ["data-w-unsaved-force-value", String(n || !1)],
                    ["data-w-unsaved-watch-value", "edits comments"],
                  ].forEach(([e, t]) => {
                    o.setAttribute(e, t);
                  }),
                  o.setAttribute(
                    "data-action",
                    [
                      o.getAttribute("data-action") || "",
                      "w-unsaved#submit",
                      "beforeunload@window->w-unsaved#confirm",
                      "change->w-unsaved#check",
                      "keyup->w-unsaved#check",
                    ]
                      .filter(Boolean)
                      .join(" "),
                  ),
                  o.setAttribute(
                    "data-controller",
                    [o.getAttribute("data-controller") || "", e]
                      .filter(Boolean)
                      .join(" "),
                  ));
              });
            };
          }
        }
        class un extends Error {
          constructor(e) {
            super(e),
              (this.message = `Version number '${e}' is not formatted correctly.`);
          }
        }
        class pn extends Error {
          constructor() {
            super(), (this.message = "Can only compare prerelease versions");
          }
        }
        class fn {
          static MAJOR = new fn("Major");
          static MINOR = new fn("Minor");
          static PATCH = new fn("Patch");
          static PRE_RELEASE_STEP = new fn("PreReleaseStep");
          static PRE_RELEASE_VERSION = new fn("PreReleaseVersion");
          constructor(e) {
            this.name = e;
          }
        }
        class mn {
          constructor(e) {
            const t = e.match(
              /^(?<major>\d+)\.{1}(?<minor>\d+)((\.{1}(?<patch>\d+))|(?<preReleaseStep>a|b|rc|\.dev){1}(?<preReleaseVersion>\d+)){0,1}$/,
            );
            if (null === t) throw new un(e);
            const n = t.groups;
            (this.major = parseInt(n.major, 10)),
              (this.minor = parseInt(n.minor, 10)),
              (this.patch = n.patch ? parseInt(n.patch, 10) : 0),
              (this.preReleaseStep = n.preReleaseStep
                ? n.preReleaseStep
                : null),
              (this.preReleaseVersion = n.preReleaseVersion
                ? parseInt(n.preReleaseVersion, 10)
                : null);
          }
          isPreRelease() {
            return null !== this.preReleaseStep;
          }
          isPreReleaseStepBehind(e) {
            if (!this.isPreRelease() || !e.isPreRelease()) throw new pn();
            return (
              ("a" === this.preReleaseStep &&
                ("b" === e.preReleaseStep || "rc" === e.preReleaseStep)) ||
              ("b" === this.preReleaseStep && "rc" === e.preReleaseStep)
            );
          }
          howMuchBehind(e) {
            if (this.major < e.major) return fn.MAJOR;
            if (this.major === e.major && this.minor < e.minor) return fn.MINOR;
            if (
              this.major === e.major &&
              this.minor === e.minor &&
              !this.isPreRelease() &&
              !e.isPreRelease() &&
              this.patch < e.patch
            )
              return fn.PATCH;
            if (
              this.major === e.major &&
              this.minor === e.minor &&
              this.isPreRelease()
            ) {
              if (!e.isPreRelease()) return fn.MINOR;
              if (this.isPreReleaseStepBehind(e)) return fn.PRE_RELEASE_STEP;
              if (
                this.preReleaseStep === e.preReleaseStep &&
                this.preReleaseVersion < e.preReleaseVersion
              )
                return fn.PRE_RELEASE_VERSION;
            }
            return null;
          }
        }
        class gn extends r.Controller {
          static classes = ["hidden"];
          static targets = ["latestVersion", "link"];
          static values = {
            currentVersion: String,
            ltsOnly: { default: !1, type: Boolean },
            url: {
              default: "https://releases.wagtail.org/latest.txt",
              type: String,
            },
          };
          connect() {
            this.checkVersion();
          }
          checkVersion() {
            const e = this.urlValue,
              t = new mn(this.currentVersionValue),
              n = this.ltsOnlyValue;
            fetch(e, { referrerPolicy: "strict-origin-when-cross-origin" })
              .then((t) => {
                if (200 !== t.status)
                  throw Error(
                    `Unexpected response from ${e}. Status: ${t.status}`,
                  );
                return t.json();
              })
              .then((e) => {
                let i = e;
                if ((i && i.lts && n && (i = i.lts), i && i.version)) {
                  const e = new mn(i.version),
                    o = t.howMuchBehind(e);
                  let r = null;
                  if (!o) return;
                  if (
                    ((r =
                      o === fn.MAJOR || o === fn.MINOR ? i.minorUrl : i.url),
                    this.latestVersionTarget instanceof HTMLElement)
                  ) {
                    const e = [i.version, n ? "(LTS)" : ""].join(" ").trim();
                    this.latestVersionTarget.textContent = e;
                  }
                  this.linkTarget instanceof HTMLElement &&
                    this.linkTarget.setAttribute("href", r || ""),
                    this.element.classList.remove(this.hiddenClass);
                }
              })
              .catch((t) => {
                console.error(`Error fetching ${e}. Error: ${t}`);
              });
          }
        }
        const vn = [
            { controllerConstructor: g, identifier: "w-action" },
            { controllerConstructor: S, identifier: "w-autosize" },
            { controllerConstructor: T, identifier: "w-block" },
            { controllerConstructor: A, identifier: "w-bulk" },
            { controllerConstructor: _, identifier: "w-clipboard" },
            { controllerConstructor: x, identifier: "w-clone" },
            { controllerConstructor: x, identifier: "w-messages" },
            { controllerConstructor: D, identifier: "w-count" },
            { controllerConstructor: V.v, identifier: "w-dialog" },
            { controllerConstructor: L, identifier: "w-dismissible" },
            { controllerConstructor: P, identifier: "w-drilldown" },
            { controllerConstructor: H, identifier: "w-dropdown" },
            { controllerConstructor: z, identifier: "w-init" },
            { controllerConstructor: q, identifier: "w-kbd" },
            { controllerConstructor: Y, identifier: "w-link" },
            { controllerConstructor: Gt, identifier: "w-orderable" },
            { controllerConstructor: Zt, identifier: "w-progress" },
            { controllerConstructor: Jt, identifier: "w-breadcrumbs" },
            { controllerConstructor: Jt, identifier: "w-reveal" },
            { controllerConstructor: Qt, identifier: "w-skip-link" },
            { controllerConstructor: on, identifier: "w-slug" },
            { controllerConstructor: rn, identifier: "w-submit" },
            { controllerConstructor: an, identifier: "w-swap" },
            { controllerConstructor: sn, identifier: "w-sync" },
            { controllerConstructor: ln, identifier: "w-tag" },
            { controllerConstructor: cn.I, identifier: "w-teleport" },
            { controllerConstructor: R, identifier: "w-tooltip" },
            { controllerConstructor: hn, identifier: "w-unsaved" },
            { controllerConstructor: gn, identifier: "w-upgrade" },
          ],
          bn = (e, t = !("true" === e.getAttribute("aria-expanded"))) => {
            const n = document.querySelector(
              `#${e.getAttribute("aria-controls")}`,
            );
            n &&
              (e.setAttribute("aria-expanded", `${t}`),
              t
                ? n.removeAttribute("hidden")
                : "onbeforematch" in document.body
                ? n.setAttribute("hidden", "until-found")
                : n.setAttribute("hidden", ""),
              e.dispatchEvent(
                new CustomEvent("commentAnchorVisibilityChange", {
                  bubbles: !0,
                }),
              ),
              e.dispatchEvent(
                new CustomEvent("wagtail:panel-toggle", {
                  bubbles: !0,
                  cancelable: !1,
                  detail: { expanded: t },
                }),
              ));
          };
        function yn(e) {
          const t = e.closest("[data-panel]"),
            n = document.querySelector(`#${e.getAttribute("aria-controls")}`);
          if (!n || !t || t.collapsibleInitialised) return;
          t.collapsibleInitialised = !0;
          const i = bn.bind(null, e),
            o = t.classList.contains("collapsed"),
            r = n.querySelector(
              '[aria-invalid="true"], .error, .w-field--error',
            ),
            a = o && !r;
          a && i(!1), e.addEventListener("click", i.bind(null, void 0));
          const s = t.querySelector("[data-panel-heading]");
          s && s.addEventListener("click", i.bind(null, void 0)),
            n.addEventListener("beforematch", i.bind(null, !0)),
            e.dispatchEvent(
              new CustomEvent("wagtail:panel-init", {
                bubbles: !0,
                cancelable: !1,
                detail: { expanded: !a },
              }),
            );
        }
        var wn = n(3410);
        class En extends wn.n {
          constructor(e) {
            super(e.formsetPrefix, e),
              (this.formsElt = o()("#" + e.formsetPrefix + "-FORMS"));
            for (let e = 0; e < this.formCount; e += 1) {
              const t = this.opts.emptyChildFormPrefix.replace(
                /__prefix__/g,
                e,
              );
              this.initChildControls(t);
            }
            this.updateControlStates(),
              setTimeout(() => {
                this.formsElt.get(0)?.dispatchEvent(
                  new CustomEvent("w-formset:ready", {
                    bubbles: !0,
                    cancelable: !1,
                    detail: { ...e },
                  }),
                );
              });
          }
          updateControlStates() {
            this.updateChildCount(),
              this.updateMoveButtonDisabledStates(),
              this.updateAddButtonState();
          }
          initChildControls(e) {
            const t = "inline_child_" + e,
              n = "id_" + e + "-DELETE",
              i = o()("#" + t),
              r = i.find("[data-inline-panel-child-move-up]:first "),
              a = i.find("[data-inline-panel-child-move-down]:first ");
            o()("#" + n + "-button").on("click", () => {
              o()("#" + n)
                .val("1")
                .get(0)
                .dispatchEvent(new Event("change", { bubbles: !0 })),
                i.addClass("deleted").slideUp(() => {
                  this.updateControlStates(),
                    i.get(0).dispatchEvent(
                      new CustomEvent("w-formset:removed", {
                        bubbles: !0,
                        cancelable: !1,
                        detail: { ...this.opts },
                      }),
                    );
                });
            }),
              this.opts.canOrder &&
                (r.on("click", () => {
                  const t = i.find(`input[name="${e}-ORDER"]`),
                    n = t.val(),
                    o = i.prevAll(":not(.deleted)").first();
                  if (!o.length) return;
                  const r = o[0].id.replace("inline_child_", ""),
                    a = o.find(`input[name="${r}-ORDER"]`),
                    s = a.val();
                  this.animateSwap(i, o),
                    i.insertBefore(o),
                    t.val(s),
                    a.val(n),
                    this.updateControlStates();
                }),
                a.on("click", () => {
                  const t = i.find(`input[name="${e}-ORDER"]`),
                    n = t.val(),
                    o = i.nextAll(":not(.deleted)").first();
                  if (!o.length) return;
                  const r = o[0].id.replace("inline_child_", ""),
                    a = o.find(`input[name="${r}-ORDER"]`),
                    s = a.val();
                  this.animateSwap(i, o),
                    i.insertAfter(o),
                    t.val(s),
                    a.val(n),
                    this.updateControlStates();
                })),
              "1" === o()("#" + n).val() &&
                (o()("#" + t)
                  .addClass("deleted")
                  .hide(0, () => {
                    this.updateControlStates();
                  }),
                o()("#" + t)
                  .find(".error-message")
                  .remove());
          }
          updateMoveButtonDisabledStates() {
            if (this.opts.canOrder) {
              const e = this.formsElt.children(":not(.deleted)");
              e.each(function (t) {
                const n = 0 === t,
                  i = t === e.length - 1;
                o()("[data-inline-panel-child-move-up]:first", this).prop(
                  "disabled",
                  n,
                ),
                  o()("[data-inline-panel-child-move-down]:first", this).prop(
                    "disabled",
                    i,
                  );
              });
            }
          }
          updateChildCount() {
            this.formsElt.children(":not(.deleted)").each(function (e) {
              o()("[data-inline-panel-child-count]", this)
                .first()
                .text(` ${e + 1}`);
            });
          }
          getChildCount() {
            return o()("> [data-inline-panel-child]", this.formsElt).not(
              ".deleted",
            ).length;
          }
          updateAddButtonState() {
            if (this.opts.maxForms) {
              const e = o()("#" + this.opts.formsetPrefix + "-ADD");
              this.getChildCount() >= this.opts.maxForms
                ? e.prop("disabled", !0)
                : e.prop("disabled", !1);
            }
          }
          animateSwap(e, t) {
            const n = this.formsElt,
              i = n.children(":not(.deleted)");
            n.css({ position: "relative", height: n.height() }),
              i
                .each(function () {
                  o()(this).css("top", o()(this).position().top);
                })
                .css({ position: "absolute", width: "100%" }),
              e.animate({ top: t.position().top }, 200, () => {
                n.removeAttr("style"), i.removeAttr("style");
              }),
              t.animate({ top: e.position().top }, 200, () => {
                n.removeAttr("style"), i.removeAttr("style");
              });
          }
          initialFocus(e) {
            e &&
              e.length &&
              (e.attr("tabindex") ||
                (e.attr("tabindex", -1),
                e.one("blur", () => {
                  "-1" === e.attr("tabindex") && e.removeAttr("tabindex");
                })),
              e[0].scrollIntoView({ behavior: "smooth" }),
              e.focus());
          }
          addForm(e = {}) {
            super.addForm({ runCallbacks: !1 });
            const t = this.formCount - 1,
              n = this.opts.emptyChildFormPrefix.replace(/__prefix__/g, t);
            this.initChildControls(n),
              this.opts.canOrder &&
                o()("#id_" + n + "-ORDER")
                  .val(t + 1)
                  .get(0)
                  .dispatchEvent(new Event("change", { bubbles: !0 })),
              this.updateControlStates(),
              (function (e = document.querySelectorAll("[data-panel-toggle]")) {
                e.forEach(yn);
              })(
                document.querySelectorAll(
                  `#inline_child_${n} [data-panel-toggle]`,
                ),
              ),
              ("runCallbacks" in e && !e.runCallbacks) ||
                (this.opts.onAdd && this.opts.onAdd(t),
                this.opts.onInit && this.opts.onInit(t)),
              this.initialFocus(o()(`#inline_child_${n}-panel-content`));
            const i = this.formsElt.children().last().get(0);
            i &&
              i.dispatchEvent(
                new CustomEvent("w-formset:added", {
                  bubbles: !0,
                  cancelable: !1,
                  detail: { formIndex: t, ...this.opts },
                }),
              );
          }
        }
        var Cn = n(4327);
        window.StimulusModule = r;
        const Sn = window.wagtail || {};
        (Sn.app = (({
          debug: e = !1,
          definitions: t = [],
          root: n = document.documentElement,
        } = {}) => {
          const i = r.Application.start(n);
          return (i.debug = e), i.load(t), i;
        })({ definitions: vn })),
          (Sn.components = { Icon: l.A, Portal: c.A }),
          (window.wagtail = Sn),
          (window.escapeHtml = Cn.Z),
          (window.InlinePanel = En),
          (window.MultipleChooserPanel = class extends En {
            constructor(e) {
              super(e),
                (this.chooserWidgetFactory = window.telepath.unpack(
                  JSON.parse(
                    document.getElementById(`${e.formsetPrefix}-CHOOSER_WIDGET`)
                      .textContent,
                  ),
                )),
                document
                  .getElementById(`${e.formsetPrefix}-OPEN_MODAL`)
                  .addEventListener("click", () => {
                    this.chooserWidgetFactory.openModal(
                      (t) => {
                        t.forEach((t) => {
                          if (e.maxForms && this.getChildCount() >= e.maxForms)
                            return;
                          this.addForm();
                          const n = this.formCount - 1,
                            i = `${e.formsetPrefix}-${n}-${e.chooserFieldName}`;
                          this.chooserWidgetFactory
                            .getById(i)
                            .setStateFromModalData(t);
                        });
                      },
                      { multiple: !0 },
                    );
                  });
            }
            updateOpenModalButtonState() {
              if (this.opts.maxForms) {
                const e = document.getElementById(
                  `${this.opts.formsetPrefix}-OPEN_MODAL`,
                );
                this.getChildCount() >= this.opts.maxForms
                  ? (e.setAttribute("disabled", "true"),
                    e.setAttribute("data-force-disabled", "true"))
                  : (e.removeAttribute("disabled"),
                    e.removeAttribute("data-force-disabled"));
              }
            }
            updateControlStates() {
              super.updateControlStates(), this.updateOpenModalButtonState();
            }
          }),
          (window.URLify = (e, t = 255, n = !1) =>
            nn(e, { numChars: t, allowUnicode: n })),
          o()(() => {
            o()(".drop-zone")
              .on("dragover", function () {
                o()(this).addClass("hovered");
              })
              .on("dragleave dragend drop", function () {
                o()(this).removeClass("hovered");
              });
          });
      },
      1669: (e) => {
        "use strict";
        e.exports = jQuery;
      },
    },
    n = {};
  function i(e) {
    var o = n[e];
    if (void 0 !== o) return o.exports;
    var r = (n[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(r.exports, r, r.exports, i), (r.loaded = !0), r.exports;
  }
  (i.m = t),
    (e = []),
    (i.O = (t, n, o, r) => {
      if (!n) {
        var a = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [n, o, r] = e[d], s = !0, l = 0; l < n.length; l++)
            (!1 & r || a >= r) && Object.keys(i.O).every((e) => i.O[e](n[l]))
              ? n.splice(l--, 1)
              : ((s = !1), r < a && (a = r));
          if (s) {
            e.splice(d--, 1);
            var c = o();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      r = r || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > r; d--) e[d] = e[d - 1];
      e[d] = [n, o, r];
    }),
    (i.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return i.d(t, { a: t }), t;
    }),
    (i.d = (e, t) => {
      for (var n in t)
        i.o(t, n) &&
          !i.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (i.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (i.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (i.j = 114),
    (() => {
      var e = { 114: 0 };
      i.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var o,
            r,
            [a, s, l] = n,
            c = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (o in s) i.o(s, o) && (i.m[o] = s[o]);
            if (l) var d = l(i);
          }
          for (t && t(n); c < a.length; c++)
            (r = a[c]), i.o(e, r) && e[r] && e[r][0](), (e[r] = 0);
          return i.O(d);
        },
        n = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })();
  var o = i.O(void 0, [321], () => i(2029));
  o = i.O(o);
})();