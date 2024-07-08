(() => {
  "use strict";
  var e,
    t = {
      7007: (e) => {
        var t,
          i = "object" == typeof Reflect ? Reflect : null,
          n =
            i && "function" == typeof i.apply
              ? i.apply
              : function (e, t, i) {
                  return Function.prototype.apply.call(e, t, i);
                };
        t =
          i && "function" == typeof i.ownKeys
            ? i.ownKeys
            : Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e),
                );
              }
            : function (e) {
                return Object.getOwnPropertyNames(e);
              };
        var s =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function o() {
          o.init.call(this);
        }
        (e.exports = o),
          (e.exports.once = function (e, t) {
            return new Promise(function (i, n) {
              function s(i) {
                e.removeListener(t, o), n(i);
              }
              function o() {
                "function" == typeof e.removeListener &&
                  e.removeListener("error", s),
                  i([].slice.call(arguments));
              }
              m(e, t, o, { once: !0 }),
                "error" !== t &&
                  (function (e, t, i) {
                    "function" == typeof e.on && m(e, "error", t, { once: !0 });
                  })(e, s);
            });
          }),
          (o.EventEmitter = o),
          (o.prototype._events = void 0),
          (o.prototype._eventsCount = 0),
          (o.prototype._maxListeners = void 0);
        var r = 10;
        function l(e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof e,
            );
        }
        function a(e) {
          return void 0 === e._maxListeners
            ? o.defaultMaxListeners
            : e._maxListeners;
        }
        function c(e, t, i, n) {
          var s, o, r, c;
          if (
            (l(i),
            void 0 === (o = e._events)
              ? ((o = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== o.newListener &&
                  (e.emit("newListener", t, i.listener ? i.listener : i),
                  (o = e._events)),
                (r = o[t])),
            void 0 === r)
          )
            (r = o[t] = i), ++e._eventsCount;
          else if (
            ("function" == typeof r
              ? (r = o[t] = n ? [i, r] : [r, i])
              : n
              ? r.unshift(i)
              : r.push(i),
            (s = a(e)) > 0 && r.length > s && !r.warned)
          ) {
            r.warned = !0;
            var d = new Error(
              "Possible EventEmitter memory leak detected. " +
                r.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit",
            );
            (d.name = "MaxListenersExceededWarning"),
              (d.emitter = e),
              (d.type = t),
              (d.count = r.length),
              (c = d),
              console && console.warn && console.warn(c);
          }
          return e;
        }
        function d() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function h(e, t, i) {
          var n = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: i,
            },
            s = d.bind(n);
          return (s.listener = i), (n.wrapFn = s), s;
        }
        function u(e, t, i) {
          var n = e._events;
          if (void 0 === n) return [];
          var s = n[t];
          return void 0 === s
            ? []
            : "function" == typeof s
            ? i
              ? [s.listener || s]
              : [s]
            : i
            ? (function (e) {
                for (var t = new Array(e.length), i = 0; i < t.length; ++i)
                  t[i] = e[i].listener || e[i];
                return t;
              })(s)
            : f(s, s.length);
        }
        function p(e) {
          var t = this._events;
          if (void 0 !== t) {
            var i = t[e];
            if ("function" == typeof i) return 1;
            if (void 0 !== i) return i.length;
          }
          return 0;
        }
        function f(e, t) {
          for (var i = new Array(t), n = 0; n < t; ++n) i[n] = e[n];
          return i;
        }
        function m(e, t, i, n) {
          if ("function" == typeof e.on) n.once ? e.once(t, i) : e.on(t, i);
          else {
            if ("function" != typeof e.addEventListener)
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof e,
              );
            e.addEventListener(t, function s(o) {
              n.once && e.removeEventListener(t, s), i(o);
            });
          }
        }
        Object.defineProperty(o, "defaultMaxListeners", {
          enumerable: !0,
          get: function () {
            return r;
          },
          set: function (e) {
            if ("number" != typeof e || e < 0 || s(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  ".",
              );
            r = e;
          },
        }),
          (o.init = function () {
            (void 0 !== this._events &&
              this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (o.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || s(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  ".",
              );
            return (this._maxListeners = e), this;
          }),
          (o.prototype.getMaxListeners = function () {
            return a(this);
          }),
          (o.prototype.emit = function (e) {
            for (var t = [], i = 1; i < arguments.length; i++)
              t.push(arguments[i]);
            var s = "error" === e,
              o = this._events;
            if (void 0 !== o) s = s && void 0 === o.error;
            else if (!s) return !1;
            if (s) {
              var r;
              if ((t.length > 0 && (r = t[0]), r instanceof Error)) throw r;
              var l = new Error(
                "Unhandled error." + (r ? " (" + r.message + ")" : ""),
              );
              throw ((l.context = r), l);
            }
            var a = o[e];
            if (void 0 === a) return !1;
            if ("function" == typeof a) n(a, this, t);
            else {
              var c = a.length,
                d = f(a, c);
              for (i = 0; i < c; ++i) n(d[i], this, t);
            }
            return !0;
          }),
          (o.prototype.addListener = function (e, t) {
            return c(this, e, t, !1);
          }),
          (o.prototype.on = o.prototype.addListener),
          (o.prototype.prependListener = function (e, t) {
            return c(this, e, t, !0);
          }),
          (o.prototype.once = function (e, t) {
            return l(t), this.on(e, h(this, e, t)), this;
          }),
          (o.prototype.prependOnceListener = function (e, t) {
            return l(t), this.prependListener(e, h(this, e, t)), this;
          }),
          (o.prototype.removeListener = function (e, t) {
            var i, n, s, o, r;
            if ((l(t), void 0 === (n = this._events))) return this;
            if (void 0 === (i = n[e])) return this;
            if (i === t || i.listener === t)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete n[e],
                  n.removeListener &&
                    this.emit("removeListener", e, i.listener || t));
            else if ("function" != typeof i) {
              for (s = -1, o = i.length - 1; o >= 0; o--)
                if (i[o] === t || i[o].listener === t) {
                  (r = i[o].listener), (s = o);
                  break;
                }
              if (s < 0) return this;
              0 === s
                ? i.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(i, s),
                1 === i.length && (n[e] = i[0]),
                void 0 !== n.removeListener &&
                  this.emit("removeListener", e, r || t);
            }
            return this;
          }),
          (o.prototype.off = o.prototype.removeListener),
          (o.prototype.removeAllListeners = function (e) {
            var t, i, n;
            if (void 0 === (i = this._events)) return this;
            if (void 0 === i.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)),
                    (this._eventsCount = 0))
                  : void 0 !== i[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = Object.create(null))
                      : delete i[e]),
                this
              );
            if (0 === arguments.length) {
              var s,
                o = Object.keys(i);
              for (n = 0; n < o.length; ++n)
                "removeListener" !== (s = o[n]) && this.removeAllListeners(s);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = i[e])) this.removeListener(e, t);
            else if (void 0 !== t)
              for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
            return this;
          }),
          (o.prototype.listeners = function (e) {
            return u(this, e, !0);
          }),
          (o.prototype.rawListeners = function (e) {
            return u(this, e, !1);
          }),
          (o.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : p.call(e, t);
          }),
          (o.prototype.listenerCount = p),
          (o.prototype.eventNames = function () {
            return this._eventsCount > 0 ? t(this._events) : [];
          });
      },
      5815: (e, t, i) => {
        var n = i(6931),
          s = i.n(n),
          o = i(2427),
          r = i.n(o),
          l = i(4327),
          a = i(1238);
        class c {
          constructor(e, t, i, n, o, c) {
            (this.blockDef = e), (this.type = e.name);
            const d = $(
              `\n      <div class="w-field__wrapper" data-field-wrapper>\n        <div class="${(0,
              l.Z)(
                this.blockDef.meta.classname,
              )}" data-field>\n          <div class="w-field__errors" id="${i}-errors" data-field-errors>\n            <svg class="icon icon-warning w-field__errors-icon" aria-hidden="true" hidden><use href="#icon-warning"></use></svg>\n          </div>\n          <div class="w-field__help" id="${i}-helptext" data-field-help></div>\n          <div class="w-field__input" data-field-input>\n            <div data-streamfield-widget></div>\n          </div>\n        </div>\n      </div>\n    `,
            );
            $(t).replaceWith(d);
            const h = d.find("[data-streamfield-widget]").get(0);
            (this.element = d[0]),
              (this.field = this.element.querySelector("[data-field]")),
              (this.parentCapabilities = c || new Map()),
              (this.prefix = i);
            const u = { attributes: this.getAttributes() };
            try {
              this.widget = this.blockDef.widget.render(
                h,
                i,
                i,
                n,
                this.parentCapabilities,
                u,
              );
            } catch (e) {
              return (
                console.error(e),
                void this.setError({
                  messages: [
                    "This widget failed to render, please check the console for details",
                  ],
                })
              );
            }
            if (
              ((this.idForLabel = this.widget.idForLabel),
              this.blockDef.meta.helpText)
            ) {
              const e = document.createElement("p");
              e.classList.add("help"),
                (e.innerHTML = this.blockDef.meta.helpText),
                this.field.querySelector("[data-field-help]").appendChild(e);
            }
            if (window.comments && this.blockDef.meta.showAddCommentButton) {
              const t = document.createElement("button");
              (t.type = "button"),
                t.setAttribute("aria-label", e.meta.strings.ADD_COMMENT),
                t.setAttribute("data-comment-add", ""),
                t.classList.add(
                  "w-field__comment-button",
                  "w-field__comment-button--add",
                ),
                s().render(
                  r().createElement(
                    r().Fragment,
                    null,
                    r().createElement(a.A, { name: "comment-add" }),
                    r().createElement(a.A, { name: "comment-add-reversed" }),
                  ),
                  t,
                ),
                this.field.classList.add("w-field--commentable"),
                this.field.querySelector("[data-field-input]").appendChild(t),
                window.comments.initAddCommentButton(t);
            }
            o && this.setError(o);
          }
          setCapabilityOptions(e, t) {
            Object.assign(this.parentCapabilities.get(e), t),
              this.widget &&
                this.widget.setCapabilityOptions &&
                this.widget.setCapabilityOptions(e, t);
          }
          setState(e) {
            this.widget && this.widget.setState(e);
          }
          setError(e) {
            const t = this.field.querySelector("[data-field-errors]");
            if (
              (t.querySelectorAll(".error-message").forEach((e) => e.remove()),
              e)
            ) {
              this.field.classList.add("w-field--error"),
                t.querySelector(".icon").removeAttribute("hidden");
              const i = document.createElement("p");
              i.classList.add("error-message"),
                e.messages.forEach((e) => {
                  const t = document.createElement("span");
                  (t.textContent = e), i.appendChild(t);
                }),
                t.appendChild(i);
            } else
              this.field.classList.remove("w-field--error"),
                t.querySelector(".icon").setAttribute("hidden", "true");
          }
          getAttributes() {
            const e = this.prefix,
              t = {};
            return (
              this.blockDef.meta.helpText &&
                (t["aria-describedby"] = `${e}-helptext`),
              this.blockDef.meta.required && (t.required = ""),
              this.blockDef.meta.maxLength &&
                (t.maxLength = this.blockDef.meta.maxLength),
              t
            );
          }
          getState() {
            return this.widget.getState();
          }
          getValue() {
            return this.widget.getValue();
          }
          getTextLabel(e) {
            return this.widget.getTextLabel
              ? this.widget.getTextLabel(e)
              : null;
          }
          focus(e) {
            this.widget && this.widget.focus(e);
          }
        }
        class d {
          constructor(e, t, i) {
            (this.name = e), (this.widget = t), (this.meta = i);
          }
          render(e, t, i, n, s) {
            return new c(this, e, t, i, n, s);
          }
        }
        class h {
          constructor(e, t) {
            this.blockDef = e;
            const i = document.createElement("div");
            this.blockDef.meta.html
              ? (i.innerHTML = this.blockDef.meta.html)
              : (i.innerHTML = (0, l.Z)(this.blockDef.meta.text)),
              t.replaceWith(i);
          }
          setState(e) {}
          setError(e) {}
          getState() {
            return null;
          }
          getValue() {
            return null;
          }
          focus() {}
        }
        class u {
          constructor(e, t) {
            (this.name = e), (this.meta = t);
          }
          render(e) {
            return new h(this, e);
          }
        }
        var p = i(4188),
          f = i(4545);
        class m {
          constructor(e, t, i, n, s) {
            const o = n || {};
            if (
              ((this.blockDef = e),
              (this.type = e.name),
              (this.childBlocks = {}),
              e.meta.formTemplate)
            ) {
              const n = e.meta.formTemplate.replace(/__PREFIX__/g, i),
                r = $(n);
              $(t).replaceWith(r);
              const l = s?.blockErrors || {};
              this.blockDef.childBlockDefs.forEach((e) => {
                const t = r
                    .find('[data-structblock-child="' + e.name + '"]')
                    .get(0),
                  n = e.render(t, i + "-" + e.name, o[e.name], l[e.name]);
                this.childBlocks[e.name] = n;
              }),
                (this.container = r);
            } else {
              const e = $(
                `\n        <div class="${(0, l.Z)(
                  this.blockDef.meta.classname || "",
                )}">\n        </div>\n      `,
              );
              $(t).replaceWith(e),
                this.blockDef.meta.helpText &&
                  e.append(
                    `\n          <div class="c-sf-help">\n            <div class="help">\n              ${this.blockDef.meta.helpText}\n            </div>\n          </div>\n        `,
                  ),
                this.blockDef.childBlockDefs.forEach((t) => {
                  const n = $(
                    `\n        <div data-contentpath="${
                      t.name
                    }">\n          <label class="w-field__label">${(0, l.Z)(
                      t.meta.label,
                    )}${
                      t.meta.required
                        ? '<span class="w-required-mark">*</span>'
                        : ""
                    }</label>\n            <div data-streamfield-block></div>\n          </div>\n        `,
                  );
                  e.append(n);
                  const r = n.find("[data-streamfield-block]").get(0),
                    a = n.find("label").get(0),
                    c = s?.blockErrors || {},
                    d = t.render(
                      r,
                      i + "-" + t.name,
                      o[t.name],
                      c[t.name],
                      new Map(),
                    );
                  (this.childBlocks[t.name] = d),
                    d.idForLabel && a.setAttribute("for", d.idForLabel);
                }),
                (this.container = e);
            }
          }
          setState(e) {
            for (const t in e) this.childBlocks[t].setState(e[t]);
          }
          setError(e) {
            if (!e) return;
            const t = this.container[0];
            if (
              ((0, f.$)(t),
              e.messages && (0, f.U)(t, e.messages),
              e.blockErrors)
            )
              for (const t in e.blockErrors)
                (0, p.$)(e.blockErrors, t) &&
                  this.childBlocks[t].setError(e.blockErrors[t]);
          }
          getState() {
            const e = {};
            for (const t in this.childBlocks)
              e[t] = this.childBlocks[t].getState();
            return e;
          }
          getDuplicatedState() {
            const e = {};
            for (const t in this.childBlocks) {
              const i = this.childBlocks[t];
              e[t] =
                void 0 === i.getDuplicatedState
                  ? i.getState()
                  : i.getDuplicatedState();
            }
            return e;
          }
          getValue() {
            const e = {};
            for (const t in this.childBlocks)
              e[t] = this.childBlocks[t].getValue();
            return e;
          }
          getTextLabel(e) {
            if (this.blockDef.meta.labelFormat)
              return this.blockDef.meta.labelFormat.replace(
                /\{(\w+)\}/g,
                (t, i) => {
                  const n = this.childBlocks[i];
                  return n && n.getTextLabel ? n.getTextLabel(e) : "";
                },
              );
            for (const t of this.blockDef.childBlockDefs) {
              const i = this.childBlocks[t.name];
              if (i.getTextLabel) {
                const t = i.getTextLabel(e);
                if (t) return t;
              }
            }
            return null;
          }
          focus(e) {
            if (this.blockDef.childBlockDefs.length) {
              const t = this.blockDef.childBlockDefs[0].name;
              this.childBlocks[t].focus(e);
            }
          }
        }
        class b {
          constructor(e, t, i) {
            (this.name = e), (this.childBlockDefs = t), (this.meta = i);
          }
          render(e, t, i, n) {
            return new m(this, e, t, i, n);
          }
        }
        const g = {
          randomUUID:
            "undefined" != typeof crypto &&
            crypto.randomUUID &&
            crypto.randomUUID.bind(crypto),
        };
        let v;
        const k = new Uint8Array(16);
        function w() {
          if (
            !v &&
            ((v =
              "undefined" != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)),
            !v)
          )
            throw new Error(
              "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
            );
          return v(k);
        }
        const y = [];
        for (let e = 0; e < 256; ++e) y.push((e + 256).toString(16).slice(1));
        const D = function (e, t, i) {
          if (g.randomUUID && !t && !e) return g.randomUUID();
          const n = (e = e || {}).random || (e.rng || w)();
          if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t)) {
            i = i || 0;
            for (let e = 0; e < 16; ++e) t[i + e] = n[e];
            return t;
          }
          return (function (e, t = 0) {
            return (
              y[e[t + 0]] +
              y[e[t + 1]] +
              y[e[t + 2]] +
              y[e[t + 3]] +
              "-" +
              y[e[t + 4]] +
              y[e[t + 5]] +
              "-" +
              y[e[t + 6]] +
              y[e[t + 7]] +
              "-" +
              y[e[t + 8]] +
              y[e[t + 9]] +
              "-" +
              y[e[t + 10]] +
              y[e[t + 11]] +
              y[e[t + 12]] +
              y[e[t + 13]] +
              y[e[t + 14]] +
              y[e[t + 15]]
            );
          })(n);
        };
        var x = i(7007),
          C = i.n(x);
        const B = (e, t = !("true" === e.getAttribute("aria-expanded"))) => {
          const i = document.querySelector(
            `#${e.getAttribute("aria-controls")}`,
          );
          i &&
            (e.setAttribute("aria-expanded", `${t}`),
            t
              ? i.removeAttribute("hidden")
              : "onbeforematch" in document.body
              ? i.setAttribute("hidden", "until-found")
              : i.setAttribute("hidden", ""),
            e.dispatchEvent(
              new CustomEvent("commentAnchorVisibilityChange", { bubbles: !0 }),
            ),
            e.dispatchEvent(
              new CustomEvent("wagtail:panel-toggle", {
                bubbles: !0,
                cancelable: !1,
                detail: { expanded: t },
              }),
            ));
        };
        var E = i(9675);
        class _ {
          constructor(e) {
            this.sequenceChild = e;
          }
          render(e) {
            const t =
              this.sequenceChild.strings[this.labelIdentifier] ||
              this.labelIdentifier;
            (this.dom = $(
              `\n      <button type="button" class="button button--icon text-replace white" title="${(0,
              l.Z)(t)}">\n        <svg class="icon icon-${(0, l.Z)(
                this.icon,
              )}" aria-hidden="true">\n          <use href="#icon-${(0, l.Z)(
                this.icon,
              )}"></use>\n        </svg>\n      </button>\n    `,
            )),
              this.dom.on("click", () => (this.onClick && this.onClick(), !1)),
              $(e).append(this.dom),
              this.enableEvent &&
                this.sequenceChild.on(this.enableEvent, () => {
                  this.enable();
                }),
              this.disableEvent &&
                this.sequenceChild.on(this.disableEvent, () => {
                  this.disable();
                }),
              this.initiallyDisabled && this.disable();
          }
          enable() {
            this.dom.removeAttr("disabled");
          }
          disable() {
            this.dom.attr("disabled", "true");
          }
        }
        class S extends _ {
          enableEvent = "enableMoveUp";
          disableEvent = "disableMoveUp";
          initiallyDisabled = !0;
          icon = "arrow-up";
          labelIdentifier = "MOVE_UP";
          onClick() {
            this.sequenceChild.moveUp();
          }
        }
        class L extends _ {
          enableEvent = "enableMoveDown";
          disableEvent = "disableMoveDown";
          initiallyDisabled = !0;
          icon = "arrow-down";
          labelIdentifier = "MOVE_DOWN";
          onClick() {
            this.sequenceChild.moveDown();
          }
        }
        class I extends _ {
          enableEvent = "enableDuplication";
          disableEvent = "disableDuplication";
          icon = "copy";
          labelIdentifier = "DUPLICATE";
          onClick() {
            this.sequenceChild.duplicate({ animate: !0 });
          }
        }
        class q extends _ {
          icon = "bin";
          labelIdentifier = "DELETE";
          onClick() {
            this.sequenceChild.delete({ animate: !0 });
          }
        }
        class M extends C() {
          constructor(e, t, i, n, s, o, r, a) {
            super(),
              (this.blockDef = e),
              (this.type = e.name),
              (this.prefix = i),
              (this.index = n),
              (this.id = s),
              (this.sequence = r);
            const c = a && a.animate,
              d = a && a.focus,
              h = a && a.collapsed;
            this.strings = (a && a.strings) || {};
            const u = `block-${s}-section`,
              p = `block-${s}-heading`,
              f = `block-${s}-content`,
              m = (0, l.Z)(this.blockDef.meta.icon),
              b = (0, l.Z)(this.blockDef.meta.label),
              g = $(
                `\n      <div ${
                  this.id
                    ? `data-contentpath="${(0, l.Z)(this.id)}"`
                    : "data-contentpath-disabled"
                }>\n        <input type="hidden" name="${
                  this.prefix
                }-deleted" value="">\n        <input type="hidden" name="${
                  this.prefix
                }-order" value="${n}">\n        <input type="hidden" name="${
                  this.prefix
                }-type" value="${(0, l.Z)(
                  this.type || "",
                )}">\n        <input type="hidden" name="${
                  this.prefix
                }-id" value="${(0, l.Z)(
                  this.id || "",
                )}">\n        <section class="w-panel w-panel--nested" id="${u}" aria-labelledby="${p}" data-panel>\n          <div class="w-panel__header">\n            <a class="w-panel__anchor w-panel__anchor--prefix" href="#${u}" aria-labelledby="${p}" data-panel-anchor>\n              <svg class="icon icon-link w-panel__icon" aria-hidden="true">\n                <use href="#icon-link"></use>\n              </svg>\n            </a>\n            <button class="w-panel__toggle" type="button" aria-label="Toggle section" aria-describedby="${p}" data-panel-toggle aria-controls="${f}" aria-expanded="true">\n              <svg class="icon icon-${m} w-panel__icon" aria-hidden="true">\n                <use href="#icon-${m}"></use>\n              </svg>\n            </button>\n            <h2 class="w-panel__heading w-panel__heading--label" aria-level="3" id="${p}" data-panel-heading>\n              <span data-panel-heading-text class="c-sf-block__title"></span>\n              <span class="c-sf-block__type">${b}</span>\n              ${
                  e.meta.required
                    ? '<span class="w-required-mark" data-panel-required>*</span>'
                    : ""
                }\n            </h2>\n            <a class="w-panel__anchor w-panel__anchor--suffix" href="#${u}" aria-labelledby="${p}">\n              <svg class="icon icon-link w-panel__icon" aria-hidden="true">\n                <use href="#icon-link"></use>\n              </svg>\n            </a>\n            <div class="w-panel__divider"></div>\n            <div class="w-panel__controls" data-panel-controls></div>\n          </div>\n          <div id="${f}" class="w-panel__content">\n            <div data-streamfield-block></div>\n          </div>\n        </section>\n      </div>\n    `,
              );
            $(t).replaceWith(g), (this.element = g.get(0));
            const v = g.find("[data-streamfield-block]").get(0);
            (this.actionsContainerElement = g
              .find("[data-panel-controls]")
              .get(0)),
              (this.titleElement = g.find("[data-panel-heading-text]")),
              (this.toggleElement = this.element.querySelector(
                "[data-panel-toggle]",
              )),
              (this.deletedInput = g.find(
                `input[name="${this.prefix}-deleted"]`,
              )),
              (this.indexInput = g.find(`input[name="${this.prefix}-order"]`)),
              this.addActionButton(new S(this)),
              this.addActionButton(new L(this)),
              this.addActionButton(new I(this)),
              this.addActionButton(new q(this));
            const k = new Map();
            k.set("duplicate", { enabled: !0, fn: this.duplicate }),
              k.set("split", { enabled: !0, fn: this.split.bind(this) }),
              k.set("addSibling", {
                enabled: !0,
                fn: this.addSibling.bind(this),
                blockGroups: this.sequence.getBlockGroups(),
                getBlockCount: this.sequence.getBlockCount.bind(this.sequence),
                getBlockMax: this.sequence.getBlockMax.bind(this.sequence),
              }),
              (this.block = this.blockDef.render(
                v,
                this.prefix + "-value",
                o,
                void 0,
                k,
              )),
              (function (e) {
                const t = e.closest("[data-panel]"),
                  i = document.querySelector(
                    `#${e.getAttribute("aria-controls")}`,
                  );
                if (!i || !t || t.collapsibleInitialised) return;
                t.collapsibleInitialised = !0;
                const n = B.bind(null, e),
                  s = t.classList.contains("collapsed"),
                  o = i.querySelector(
                    '[aria-invalid="true"], .error, .w-field--error',
                  ),
                  r = s && !o;
                r && n(!1), e.addEventListener("click", n.bind(null, void 0));
                const l = t.querySelector("[data-panel-heading]");
                l && l.addEventListener("click", n.bind(null, void 0)),
                  i.addEventListener("beforematch", n.bind(null, !0)),
                  e.dispatchEvent(
                    new CustomEvent("wagtail:panel-init", {
                      bubbles: !0,
                      cancelable: !1,
                      detail: { expanded: !r },
                    }),
                  );
              })(this.element.querySelector("[data-panel-toggle]")),
              h && this.collapse(),
              this.toggleElement.addEventListener(
                "wagtail:panel-toggle",
                () => {
                  const e = this.getTextLabel({ maxLength: 50 });
                  this.titleElement.text(e || "");
                },
              );
            const w = this.getTextLabel({ maxLength: 50 });
            this.titleElement.text(w || ""),
              c
                ? (g.hide(),
                  setTimeout(() => {
                    g.slideDown(), d && this.block.focus({ soft: !0 });
                  }, 10))
                : d && this.block.focus({ soft: !0 });
          }
          addActionButton(e) {
            e.render(this.actionsContainerElement);
          }
          addSibling(e) {
            this.sequence._onRequestInsert(this.index + 1, e);
          }
          moveUp() {
            this.sequence.moveBlockUp(this.index);
          }
          moveDown() {
            this.sequence.moveBlockDown(this.index);
          }
          duplicate(e) {
            this.sequence.duplicateBlock(this.index, e);
          }
          delete(e) {
            this.sequence.deleteBlock(this.index, e);
          }
          markDeleted({ animate: e = !1 }) {
            this.deletedInput.val("1"),
              e
                ? $(this.element)
                    .slideUp()
                    .dequeue()
                    .fadeOut()
                    .attr("aria-hidden", "true")
                : $(this.element).hide().attr("aria-hidden", "true");
            const t = this.getContentPath();
            t &&
              window.comments.commentApp &&
              window.comments.commentApp.invalidateContentPath(t);
          }
          getContentPath() {
            return window.comments?.getContentPath(this.element);
          }
          enableDuplication() {
            this.emit("enableDuplication"),
              this.block &&
                this.block.setCapabilityOptions &&
                this.block.setCapabilityOptions("duplicate", { enabled: !0 });
          }
          disableDuplication() {
            this.emit("disableDuplication"),
              this.block &&
                this.block.setCapabilityOptions &&
                this.block.setCapabilityOptions("duplicate", { enabled: !1 });
          }
          enableSplit() {
            this.block &&
              this.block.setCapabilityOptions &&
              this.block.setCapabilityOptions("split", { enabled: !0 });
          }
          disableSplit() {
            this.block &&
              this.block.setCapabilityOptions &&
              this.block.setCapabilityOptions("split", { enabled: !1 });
          }
          enableMoveUp() {
            this.emit("enableMoveUp");
          }
          disableMoveUp() {
            this.emit("disableMoveUp");
          }
          enableMoveDown() {
            this.emit("enableMoveDown");
          }
          disableMoveDown() {
            this.emit("disableMoveDown");
          }
          setIndex(e) {
            (this.index = e), this.indexInput.val(e);
          }
          setError(e) {
            this.block.setError(e), e && B(this.toggleElement, !0);
          }
          focus(e) {
            this.block.focus(e);
          }
          getTextLabel(e) {
            return this.block.getTextLabel ? this.block.getTextLabel(e) : null;
          }
          collapse() {
            B(this.toggleElement, !1);
          }
          getDuplicatedState() {
            return {
              id: D(),
              value:
                void 0 === this.block.getDuplicatedState
                  ? this.block.getState()
                  : this.block.getDuplicatedState(),
            };
          }
        }
        class A {
          constructor(e, t) {
            (this.index = t && t.index),
              (this.onRequestInsert = t && t.onRequestInsert);
          }
          setIndex(e) {
            this.index = e;
          }
          delete({ animate: e = !1 }) {
            e
              ? $(this.element).slideUp().attr("aria-hidden", "true")
              : $(this.element).hide().attr("aria-hidden", "true");
          }
        }
        class T {
          _createChild(e, t, i, n, s, o, r, l) {
            throw new Error("not implemented");
          }
          _createInsertionControl(e, t) {
            throw new Error("not implemented");
          }
          _getChildDataForInsertion(e) {
            throw new Error("not implemented");
          }
          getBlockGroups() {
            throw new Error("not implemented");
          }
          clear() {
            this.countInput.val(0),
              this.sequenceContainer.empty(),
              (this.children = []),
              (this.blockCounter = 0);
            const e = document.createElement("div");
            this.sequenceContainer.append(e),
              (this.inserters = [
                this._createInsertionControl(e, {
                  index: 0,
                  onRequestInsert: (e, t) => {
                    this._onRequestInsert(e, t);
                  },
                  strings: this.blockDef.meta.strings,
                }),
              ]),
              this.blockCountChanged();
          }
          _onRequestInsert(e, t) {
            const [i, n, s] = this._getChildDataForInsertion(t);
            this._insert(i, n, s || null, e, { animate: !0, focus: !0 });
          }
          blockCountChanged() {}
          _insert(e, t, i, n, s) {
            const o = this.prefix + "-" + this.blockCounter,
              r = s && s.animate,
              l = s && s.focus,
              a = s && s.collapsed;
            this.blockCounter += 1;
            const c = this.inserters[n].element,
              d = document.createElement("div"),
              h = document.createElement("div");
            $(d).insertAfter(c),
              $(h).insertAfter(d),
              (0, E.y)(n, this.children.length).forEach((e) => {
                this.children[e].setIndex(e + 1);
              }),
              (0, E.y)(n + 1, this.inserters.length).forEach((e) => {
                this.inserters[e].setIndex(e + 1);
              });
            const u = this._createChild(e, d, o, n, i, t, this, {
              animate: r,
              focus: l,
              collapsed: a,
              strings: this.blockDef.meta.strings,
            });
            this.children.splice(n, 0, u);
            const p = this._createInsertionControl(h, {
              index: n + 1,
              onRequestInsert: (e, t) => {
                this._onRequestInsert(e, t);
              },
              strings: this.blockDef.meta.strings,
              animate: r,
            });
            this.inserters.splice(n + 1, 0, p),
              this.countInput.val(this.blockCounter);
            const f = 0 === n,
              m = n === this.children.length - 1;
            return (
              f ||
                (u.enableMoveUp(), m && this.children[n - 1].enableMoveDown()),
              m ||
                (u.enableMoveDown(), f && this.children[n + 1].enableMoveUp()),
              this.blockCountChanged(),
              u
            );
          }
          deleteBlock(e, t) {
            const i = t && t.animate;
            this.children[e].markDeleted({ animate: i }),
              this.inserters[e].delete({ animate: i }),
              this.children.splice(e, 1),
              this.inserters.splice(e, 1),
              (0, E.y)(e, this.children.length).forEach((e) => {
                this.children[e].setIndex(e);
              }),
              (0, E.y)(e, this.inserters.length).forEach((e) => {
                this.inserters[e].setIndex(e);
              }),
              0 === e &&
                this.children.length > 0 &&
                this.children[0].disableMoveUp(),
              e === this.children.length &&
                this.children.length > 0 &&
                this.children[this.children.length - 1].disableMoveDown(),
              this.blockCountChanged();
          }
          moveBlock(e, t) {
            if (e === t) return;
            const i = this.inserters[e],
              n = this.children[e];
            t > e
              ? $(i.element).insertAfter(this.children[t].element)
              : $(i.element).insertBefore(this.inserters[t].element),
              $(n.element).insertAfter(i.element),
              this.inserters.splice(e, 1),
              this.inserters.splice(t, 0, i),
              this.children.splice(e, 1),
              this.children.splice(t, 0, n),
              t > e
                ? (0, E.y)(e, t + 1).forEach((e) => {
                    this.inserters[e].setIndex(e), this.children[e].setIndex(e);
                  })
                : (0, E.y)(t, e + 1).forEach((e) => {
                    this.inserters[e].setIndex(e), this.children[e].setIndex(e);
                  });
            const s = this.children.length - 1;
            0 === e && (n.enableMoveUp(), this.children[0].disableMoveUp()),
              e === s &&
                (n.enableMoveDown(), this.children[s].disableMoveDown()),
              0 === t && (n.disableMoveUp(), this.children[1].enableMoveUp()),
              t === s &&
                (n.disableMoveDown(), this.children[s - 1].enableMoveDown());
          }
          moveBlockUp(e) {
            this.moveBlock(e, e - 1);
          }
          moveBlockDown(e) {
            this.moveBlock(e, e + 1);
          }
          setState(e) {
            this.clear(),
              e.forEach((e, t) => {
                this.insert(e, t);
              });
          }
          getState() {
            return this.children.map((e) => e.getState());
          }
          getDuplicatedState() {
            return this.children.map((e) => e.getDuplicatedState());
          }
          getValue() {
            return this.children.map((e) => e.getValue());
          }
          getTextLabel(e) {
            const t = e && e.maxLength;
            let i = "";
            for (const e of this.children) {
              const n = e.getTextLabel({ maxLength: t });
              if (n)
                if (i) {
                  const e = i + ", " + n;
                  if (t && e.length > t - 1)
                    return i.endsWith("…") || (i += "…"), i;
                  i = e;
                } else i = n;
            }
            return i;
          }
          focus(e) {
            this.children.length && this.children[0].focus(e);
          }
        }
        class O extends M {
          getState() {
            return { id: this.id, value: this.block.getState() };
          }
          getValue() {
            return this.block.getValue();
          }
          setState({ value: e, id: t }) {
            this.block.setState(e), (this.id = t);
          }
          setValue(e) {
            this.block.setState(e);
          }
          split(e, t, i, n) {
            this.sequence.splitBlock(this.index, e, t, i, n);
          }
        }
        class U extends A {
          constructor(e, t) {
            super(e, t), (this.onRequestInsert = t && t.onRequestInsert);
            const i = t && t.animate,
              n = (0, l.Z)(t.strings.ADD),
              s = $(
                `\n      <button type="button" title="${n}" data-streamfield-list-add class="c-sf-add-button">\n        <svg class="icon icon-plus" aria-hidden="true"><use href="#icon-plus"></use></svg>\n      </button>\n    `,
              );
            $(e).replaceWith(s),
              (this.element = s.get(0)),
              s.click(() => {
                this.onRequestInsert && this.onRequestInsert(this.index);
              }),
              i && s.hide().slideDown();
          }
          enable() {
            $(this.element).removeAttr("disabled");
          }
          disable() {
            $(this.element).attr("disabled", "true");
          }
        }
        class R extends T {
          constructor(e, t, i, n, s) {
            super(),
              (this.blockDef = e),
              (this.type = e.name),
              (this.prefix = i);
            const o = $(
              `\n      <div class="${(0, l.Z)(
                this.blockDef.meta.classname || "",
              )}">\n        <input type="hidden" name="${(0, l.Z)(
                i,
              )}-count" data-streamfield-list-count value="0">\n\n        <div data-streamfield-list-container></div>\n      </div>\n    `,
            );
            $(t).replaceWith(o),
              this.blockDef.meta.helpText &&
                $(
                  `\n        <div class="c-sf-help">\n          <div class="help">\n            ${this.blockDef.meta.helpText}\n          </div>\n        </div>\n      `,
                ).insertBefore(o),
              (this.children = []),
              (this.inserters = []),
              (this.blockCounter = 0),
              (this.countInput = o.find("[data-streamfield-list-count]")),
              (this.sequenceContainer = o.find(
                "[data-streamfield-list-container]",
              )),
              (this.container = o),
              this.setState(n || []),
              this.blockDef.meta.collapsed &&
                this.children.forEach((e) => {
                  e.collapse();
                }),
              s && this.setError(s);
          }
          setState(e) {
            this.clear(),
              e.forEach(({ value: e, id: t }, i) => {
                this.insert(e, i, { id: t || D() });
              });
          }
          _getChildDataForInsertion() {
            return [
              this.blockDef.childBlockDef,
              this.blockDef.initialChildState,
            ];
          }
          _createChild(e, t, i, n, s, o, r, l) {
            return new O(e, t, i, n, s, o, r, l);
          }
          _createInsertionControl(e, t) {
            return new U(e, t);
          }
          blockCountChanged() {
            super.blockCountChanged(),
              "number" == typeof this.blockDef.meta.maxNum &&
                (this.children.length >= this.blockDef.meta.maxNum
                  ? (0, E.y)(0, this.inserters.length).forEach((e) => {
                      this.inserters[e].disable();
                    })
                  : (0, E.y)(0, this.inserters.length).forEach((e) => {
                      this.inserters[e].enable();
                    }));
          }
          insert(e, t, i) {
            return this._insert(this.blockDef.childBlockDef, e, i?.id, t, i);
          }
          duplicateBlock(e, t) {
            const i = this.children[e],
              { id: n, value: s } = i.getDuplicatedState(),
              o = t && t.animate;
            this.insert(s, e + 1, {
              animate: o,
              focus: !0,
              collapsed: i.collapsed,
              id: n,
            });
          }
          splitBlock(e, t, i, n, s) {
            const o = this.children[e],
              r = s && s.animate;
            o.setValue(t);
            const l = this.insert(i, e + 1, {
                animate: r,
                focus: !0,
                collapsed: o.collapsed,
              }),
              a = o.getContentPath(),
              c = l.getContentPath(),
              d = window.comments?.commentApp;
            a &&
              c &&
              d &&
              d.utils
                .selectCommentsForContentPathFactory(a)(d.store.getState())
                .forEach((e) => {
                  n(e) && d.updateContentPath(e.localId, c);
                });
          }
          setError(e) {
            if (!e) return;
            const t = this.container[0];
            (0, f.$)(t),
              e.messages && (0, f.U)(t, e.messages),
              e.blockErrors &&
                Object.entries(e.blockErrors).forEach(([e, t]) => {
                  this.children[e].setError(t);
                });
          }
          getBlockGroups() {
            return [["", [this.blockDef.childBlockDef]]];
          }
          getBlockCount() {
            return this.children.length;
          }
          getBlockMax() {
            return this.blockDef.meta.maxNum || 0;
          }
        }
        class F {
          constructor(e, t, i, n) {
            (this.name = e),
              (this.childBlockDef = t),
              (this.initialChildState = i),
              (this.meta = n);
          }
          render(e, t, i, n) {
            return new R(this, e, t, i, n);
          }
        }
        var P = i(7381),
          j = i(1596),
          N = i(2891);
        i(1083);
        const V = {
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
        N.Controller;
        class Z extends M {
          getState() {
            return {
              type: this.type,
              value: this.block.getState(),
              id: this.id,
            };
          }
          getDuplicatedState() {
            return { ...super.getDuplicatedState(), type: this.type };
          }
          setState({ type: e, value: t, id: i }) {
            (this.type = e), this.block.setState(t), (this.id = i);
          }
          getValue() {
            return {
              type: this.type,
              value: this.block.getValue(),
              id: this.id,
            };
          }
          split(e, t, i, n) {
            this.sequence.splitBlock(this.index, e, t, i, n);
          }
        }
        class W extends A {
          constructor(e, t) {
            super(e, t), (this.groupedChildBlockDefs = t.groupedChildBlockDefs);
            const i = $(
              `\n      <div>\n        <button type="button" title="${j.Mn}" class="c-sf-add-button">\n          <svg class="icon icon-plus" aria-hidden="true"><use href="#icon-plus"></use></svg>\n        </button>\n      </div>\n    `,
            );
            $(e).replaceWith(i),
              (this.element = i.get(0)),
              (this.addButton = i.find("button"));
            const n = this.blockItems;
            1 !== n.length || 1 !== n[0].items.length
              ? ((this.combobox = document.createElement("div")),
                (this.canAddBlock = !0),
                (this.disabledBlockTypes = new Set()),
                (this.tooltip = (0, P.Ay)(this.addButton.get(0), {
                  content: this.combobox,
                  trigger: "click",
                  interactive: !0,
                  theme: "dropdown",
                  arrow: !1,
                  placement: "bottom",
                  plugins: [V],
                  onShow: this.renderMenu.bind(this),
                  onHidden: () => {
                    s().render(null, this.combobox);
                  },
                })))
              : this.addButton.click(() => {
                  this.onRequestInsert &&
                    this.onRequestInsert(this.index, n[0].items[0]);
                });
          }
          get blockItems() {
            return this.groupedChildBlockDefs.map(([e, t]) => ({
              label: e || "",
              type: e || "",
              items: t.map((e) => ({
                type: e.name,
                label: e.meta.label,
                icon: e.meta.icon,
              })),
            }));
          }
          renderMenu() {
            const e = this.blockItems;
            s().render(
              r().createElement(j.Ay, {
                label: j.qc,
                placeholder: j.qc,
                items: e,
                getItemLabel: (e, t) => t.label,
                getItemDescription: (e) => e.label,
                getSearchFields: (e) => [e.label, e.type],
                noResultsText: j.b5,
                onSelect: this.onSelectBlock.bind(this),
              }),
              this.combobox,
            );
          }
          onSelectBlock(e) {
            this.onRequestInsert &&
              this.onRequestInsert(this.index, { type: e.selectedItem.type }),
              this.close();
          }
          setNewBlockRestrictions(e, t) {
            (this.canAddBlock = e),
              (this.disabledBlockTypes = t),
              this.canAddBlock
                ? this.addButton.removeAttr("disabled")
                : this.addButton.attr("disabled", "true");
          }
          open() {
            this.canAddBlock &&
              (this.addButton.attr("aria-expanded", "true"),
              this.tooltip.show());
          }
          close() {
            this.addButton.attr("aria-expanded", "false"), this.tooltip.hide();
          }
        }
        class G extends T {
          constructor(e, t, i, n, s) {
            super(),
              (this.blockDef = e),
              (this.type = e.name),
              (this.prefix = i);
            const o = $(
              `\n      <div class="${(0, l.Z)(
                this.blockDef.meta.classname || "",
              )}">\n        <input type="hidden" name="${(0, l.Z)(
                i,
              )}-count" data-streamfield-stream-count value="0">\n        <div data-streamfield-stream-container></div>\n      </div>\n    `,
            );
            $(t).replaceWith(o),
              this.blockDef.meta.helpText &&
                $(
                  `\n        <div class="c-sf-help">\n          <div class="help">\n            ${this.blockDef.meta.helpText}\n          </div>\n        </div>\n      `,
                ).insertBefore(o),
              (this.children = []),
              (this.childBlockCounts = new Map()),
              (this.inserters = []),
              (this.blockCounter = 0),
              (this.countInput = o.find("[data-streamfield-stream-count]")),
              (this.sequenceContainer = o.find(
                "[data-streamfield-stream-container]",
              )),
              this.setState(n || []),
              this.blockDef.meta.collapsed &&
                this.children.forEach((e) => {
                  e.collapse();
                }),
              (this.container = o),
              s && this.setError(s);
          }
          getBlockGroups() {
            return this.blockDef.groupedChildBlockDefs;
          }
          getBlockCount(e) {
            return e
              ? (this.childBlockCounts.has(e) || this._updateBlockCount(e),
                this.childBlockCounts.get(e) || 0)
              : this.children.length;
          }
          getBlockMax(e) {
            return e
              ? this.blockDef.meta.blockCounts[e]?.max_num
              : this.blockDef.meta.maxNum;
          }
          _updateBlockCount(e) {
            const t = this.children.filter((t) => t.type === e).length;
            this.childBlockCounts.set(e, t);
          }
          blockCountChanged() {
            super.blockCountChanged(),
              (this.canAddBlock = !0),
              this.childBlockCounts.clear(),
              "number" == typeof this.blockDef.meta.maxNum &&
                this.children.length >= this.blockDef.meta.maxNum &&
                (this.canAddBlock = !1),
              (this.disabledBlockTypes = new Set());
            for (const e in this.blockDef.meta.blockCounts)
              if ((0, p.$)(this.blockDef.meta.blockCounts, e)) {
                const t = this.getBlockMax(e);
                "number" == typeof t &&
                  this.getBlockCount(e) >= t &&
                  this.disabledBlockTypes.add(e);
              }
            (0, E.y)(0, this.inserters.length).forEach((e) => {
              this.inserters[e].setNewBlockRestrictions(
                this.canAddBlock,
                this.disabledBlockTypes,
              );
            });
          }
          _createChild(e, t, i, n, s, o, r, l) {
            return new Z(e, t, i, n, s, o, r, l);
          }
          _createInsertionControl(e, t) {
            return (
              (t.groupedChildBlockDefs = this.blockDef.groupedChildBlockDefs),
              new W(e, t)
            );
          }
          insert({ type: e, value: t, id: i }, n, s) {
            const o = this.blockDef.childBlockDefsByName[e];
            return this._insert(o, t, i, n, s);
          }
          _getChildDataForInsertion({ type: e }) {
            return [
              this.blockDef.childBlockDefsByName[e],
              this.blockDef.initialChildStates[e],
              D(),
            ];
          }
          duplicateBlock(e, t) {
            const i = this.children[e],
              n = i.getDuplicatedState(),
              s = t && t.animate;
            this.insert(n, e + 1, {
              animate: s,
              focus: !0,
              collapsed: i.collapsed,
            });
          }
          splitBlock(e, t, i, n, s) {
            const o = this.children[e],
              r = s && s.animate,
              l = o.getState(),
              a = this.insert({ type: l.type, id: D(), value: i }, e + 1, {
                animate: r,
                focus: !0,
                collapsed: o.collapsed,
              });
            o.setState({ type: l.type, id: l.id, value: t });
            const c = o.getContentPath(),
              d = a.getContentPath(),
              h = window.comments?.commentApp;
            c &&
              d &&
              h &&
              h.utils
                .selectCommentsForContentPathFactory(c)(h.store.getState())
                .forEach((e) => {
                  n(e) && h.updateContentPath(e.localId, d);
                });
          }
          setState(e) {
            super.setState(e);
          }
          setError(e) {
            if (!e) return;
            const t = this.container[0];
            if (
              ((0, f.$)(t),
              e.messages && (0, f.U)(t, e.messages),
              e.blockErrors)
            )
              for (const t in e.blockErrors)
                (0, p.$)(e.blockErrors, t) &&
                  this.children[t].setError(e.blockErrors[t]);
          }
        }
        class H {
          constructor(e, t, i, n) {
            (this.name = e),
              (this.groupedChildBlockDefs = t),
              (this.initialChildStates = i),
              (this.childBlockDefsByName = {}),
              this.groupedChildBlockDefs.forEach(([e, t]) => {
                t.forEach((e) => {
                  this.childBlockDefsByName[e.name] = e;
                });
              }),
              (this.meta = n);
          }
          render(e, t, i, n) {
            return new G(this, e, t, i, n);
          }
        }
        const K = window.wagtailStreamField || {};
        (K.blocks = {
          FieldBlock: c,
          FieldBlockDefinition: d,
          StaticBlock: h,
          StaticBlockDefinition: u,
          StructBlock: m,
          StructBlockDefinition: b,
          ListBlock: R,
          ListBlockDefinition: F,
          StreamBlock: G,
          StreamBlockDefinition: H,
        }),
          window.telepath.register("wagtail.blocks.FieldBlock", d),
          window.telepath.register("wagtail.blocks.StaticBlock", u),
          window.telepath.register("wagtail.blocks.StructBlock", b),
          window.telepath.register("wagtail.blocks.ListBlock", F),
          window.telepath.register("wagtail.blocks.StreamBlock", H),
          (window.wagtailStreamField = K);
      },
    },
    i = {};
  function n(e) {
    var s = i[e];
    if (void 0 !== s) return s.exports;
    var o = (i[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(o.exports, o, o.exports, n), (o.loaded = !0), o.exports;
  }
  (n.m = t),
    (e = []),
    (n.O = (t, i, s, o) => {
      if (!i) {
        var r = 1 / 0;
        for (d = 0; d < e.length; d++) {
          for (var [i, s, o] = e[d], l = !0, a = 0; a < i.length; a++)
            (!1 & o || r >= o) && Object.keys(n.O).every((e) => n.O[e](i[a]))
              ? i.splice(a--, 1)
              : ((l = !1), o < r && (r = o));
          if (l) {
            e.splice(d--, 1);
            var c = s();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      o = o || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
      e[d] = [i, s, o];
    }),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var i in t)
        n.o(t, i) &&
          !n.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (n.j = 591),
    (() => {
      var e = { 591: 0 };
      n.O.j = (t) => 0 === e[t];
      var t = (t, i) => {
          var s,
            o,
            [r, l, a] = i,
            c = 0;
          if (r.some((t) => 0 !== e[t])) {
            for (s in l) n.o(l, s) && (n.m[s] = l[s]);
            if (a) var d = a(n);
          }
          for (t && t(i); c < r.length; c++)
            (o = r[c]), n.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return n.O(d);
        },
        i = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      i.forEach(t.bind(null, 0)), (i.push = t.bind(null, i.push.bind(i)));
    })();
  var s = n.O(void 0, [321], () => n(5815));
  s = n.O(s);
})();
