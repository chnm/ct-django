(() => {
  "use strict";
  var t,
    e = {
      7290: (t, e, i) => {
        var s = i(2833),
          n = i(6032);
        class a {
          constructor(t, e, i, s, n, a) {
            const r = `:is(input,select,textarea,button)[name="${e}"]`;
            (this.input = t.matches(r) ? t : t.querySelector(r)),
              (this.idForLabel = i),
              this.setState(s),
              (this.parentCapabilities = n || new Map()),
              (this.options = a);
          }
          getValue() {
            return this.input.value;
          }
          getState() {
            return this.input.value;
          }
          setState(t) {
            this.input.value = t;
          }
          getTextLabel(t) {
            const e = this.getValue();
            if ("string" != typeof e) return null;
            const i = t && t.maxLength;
            return i && e.length > i ? e.substring(0, i - 1) + "…" : e;
          }
          focus() {
            this.input.focus();
          }
          setCapabilityOptions(t, e) {
            Object.assign(this.parentCapabilities.get(t), e);
          }
        }
        class r {
          constructor(t, e) {
            (this.html = t), (this.idPattern = e);
          }
          boundWidgetClass = a;
          render(t, e, i, s, a, r = {}) {
            const o = this.html.replace(/__NAME__/g, e).replace(/__ID__/g, i),
              l = this.idPattern.replace(/__ID__/g, i),
              c = document.createElement("div");
            c.innerHTML = o.trim();
            const u = c.firstChild;
            return (
              t.replaceWith(u),
              (0, n.v)(u),
              "object" == typeof r?.attributes &&
                Object.entries(r.attributes).forEach(([t, e]) => {
                  u.setAttribute(t, e);
                }),
              new this.boundWidgetClass(u, e, l, s, a, r)
            );
          }
        }
        window.telepath.register("wagtail.widgets.Widget", r);
        class o extends a {
          getValue() {
            return this.input.checked;
          }
          getState() {
            return this.input.checked;
          }
          setState(t) {
            this.input.checked = t;
          }
        }
        window.telepath.register(
          "wagtail.widgets.CheckboxInput",
          class extends r {
            boundWidgetClass = o;
          },
        );
        class l {
          constructor(t, e, i, s) {
            (this.element = t),
              (this.name = e),
              (this.idForLabel = i),
              (this.selector = `input[name="${e}"]:checked`),
              this.setState(s);
          }
          getValue() {
            return this.element.querySelector(this.selector)?.value;
          }
          getState() {
            return this.element.querySelector(this.selector)?.value;
          }
          setState(t) {
            const e = this.element.querySelectorAll(
              `input[name="${this.name}"]`,
            );
            for (let i = 0; i < e.length; i += 1)
              e[i].checked = e[i].value === t;
          }
          focus() {
            this.element.querySelector(`input[name="${this.name}"]`)?.focus();
          }
        }
        window.telepath.register(
          "wagtail.widgets.RadioSelect",
          class extends r {
            boundWidgetClass = l;
          },
        );
        class c extends a {
          getTextLabel() {
            const t = this.input.selectedOptions[0];
            return t ? t.text : "";
          }
        }
        window.telepath.register(
          "wagtail.widgets.Select",
          class extends r {
            boundWidgetClass = c;
          },
        );
        class u {
          constructor(t, e, i, s) {
            (this.widget = t),
              (this.blockDef = e),
              (this.addSibling = i),
              (this.split = s),
              (this.blockMax = i.getBlockMax(e.name)),
              (this.icon = e.meta.icon),
              (this.description = e.meta.label),
              (this.type = e.name);
          }
          render({ option: t }) {
            const e =
              "number" == typeof blockMax
                ? ` (${this.addSibling.getBlockCount(this.blockDef.name)}/${
                    this.blockMax
                  })`
                : "";
            return `${t.description}${e}`;
          }
          onSelect({ editorState: t }) {
            const e = window.draftail.splitState(
              window.draftail.DraftUtils.removeCommandPalettePrompt(t),
            );
            e.stateAfter.getCurrentContent().hasText()
              ? setTimeout(() => {
                  e &&
                    this.split.fn(
                      e.stateBefore,
                      e.stateAfter,
                      e.shouldMoveCommentFn,
                    ),
                    setTimeout(() => {
                      this.addSibling.fn({ type: this.blockDef.name });
                    }, 20);
                }, 50)
              : (this.widget.setState(e.stateBefore),
                setTimeout(() => {
                  this.addSibling.fn({ type: this.blockDef.name });
                }, 20));
          }
        }
        class d {
          constructor(t, e) {
            (this.widget = t),
              (this.split = e),
              (this.description = (0, s.AP)("Split block"));
          }
          icon = "cut";
          type = "split";
          onSelect({ editorState: t }) {
            const e = window.draftail.splitState(
              window.draftail.DraftUtils.removeCommandPalettePrompt(t),
            );
            setTimeout(() => {
              e &&
                this.split.fn(
                  e.stateBefore,
                  e.stateAfter,
                  e.shouldMoveCommentFn,
                );
            }, 50);
          }
        }
        class h {
          constructor(t, e, i) {
            (this.input = t),
              (this.capabilities = new Map(i)),
              (this.options = e);
            const [, s] = draftail.initEditor(
              "#" + this.input.id,
              this.getFullOptions(),
              document.currentScript,
            );
            this.setDraftailOptions = s;
          }
          getValue() {
            return this.input.value;
          }
          getState() {
            return this.input.draftailEditor.getEditorState();
          }
          setState(t) {
            this.input.draftailEditor.onChange(t);
          }
          getTextLabel(t) {
            const e = t && t.maxLength;
            if (!this.input.value) return "";
            const i = JSON.parse(this.input.value);
            if (!i || !i.blocks) return "";
            let s = "";
            for (const t of i.blocks)
              if (
                t.text &&
                ((s += s ? " " + t.text : t.text), e && s.length > e)
              )
                return s.substring(0, e - 1) + "…";
            return s;
          }
          focus() {
            setTimeout(() => {
              this.input.draftailEditor.focus();
            }, 50);
          }
          setCapabilityOptions(t, e) {
            const i = Object.assign(this.capabilities.get(t), e);
            this.capabilities.set(t, i),
              this.setDraftailOptions(this.getFullOptions());
          }
          getCapabilityOptions(t) {
            const e = {},
              i = t,
              n = i.get("split"),
              a = i.get("addSibling");
            let r = [];
            return (
              n &&
                ((r = (a && a.enabled && n.enabled ? a.blockGroups : []).map(
                  ([t, e]) => {
                    const i = e.map((t) => new u(this, t, a, n));
                    return {
                      label: t || (0, s.AP)("Blocks"),
                      type: `streamfield-${t}`,
                      items: i,
                    };
                  },
                )),
                n.enabled &&
                  r.push({
                    label: "Actions",
                    type: "custom-actions",
                    items: [new d(this, n)],
                  })),
              (e.commands = [
                { type: "blockTypes" },
                { type: "entityTypes" },
                ...r,
              ]),
              e
            );
          }
          getFullOptions() {
            return {
              ...this.options,
              ...this.getCapabilityOptions(this.capabilities),
            };
          }
        }
        window.telepath.register(
          "wagtail.widgets.DraftailRichTextArea",
          class {
            constructor(t) {
              this.options = t;
            }
            render(t, e, i, s, n, a = {}) {
              const r = document.createElement("input");
              (r.type = "hidden"),
                (r.id = i),
                (r.name = e),
                "object" == typeof a?.attributes &&
                  Object.entries(a.attributes).forEach(([t, e]) => {
                    r.setAttribute(t, e);
                  });
              const o = !!s.getCurrentContent;
              (r.value = o ? "null" : s), t.appendChild(r);
              const l = new h(r, { ...this.options, ...a }, n);
              return o && l.setState(s), l;
            }
          },
        );
        class p extends r {
          constructor(t) {
            super(), (this.options = t);
          }
          render(t, e, i, s) {
            const n = document.createElement("input");
            (n.type = "text"),
              (n.name = e),
              (n.id = i),
              t.replaceWith(n),
              this.initChooserFn(i, this.options);
            const a = {
              getValue: () => n.value,
              getState: () => n.value,
              setState(t) {
                n.value = t;
              },
              focus(t) {
                (t && t.soft) || n.focus();
              },
              idForLabel: i,
            };
            return a.setState(s), a;
          }
        }
        window.telepath.register(
          "wagtail.widgets.AdminDateInput",
          class extends p {
            initChooserFn = window.initDateChooser;
          },
        ),
          window.telepath.register(
            "wagtail.widgets.AdminTimeInput",
            class extends p {
              initChooserFn = window.initTimeChooser;
            },
          ),
          window.telepath.register(
            "wagtail.widgets.AdminDateTimeInput",
            class extends p {
              initChooserFn = window.initDateTimeChooser;
            },
          ),
          window.telepath.register(
            "wagtail.errors.ValidationError",
            class {
              constructor(t) {
                this.messages = t;
              }
            },
          );
      },
    },
    i = {};
  function s(t) {
    var n = i[t];
    if (void 0 !== n) return n.exports;
    var a = (i[t] = { id: t, loaded: !1, exports: {} });
    return e[t].call(a.exports, a, a.exports, s), (a.loaded = !0), a.exports;
  }
  (s.m = e),
    (t = []),
    (s.O = (e, i, n, a) => {
      if (!i) {
        var r = 1 / 0;
        for (u = 0; u < t.length; u++) {
          for (var [i, n, a] = t[u], o = !0, l = 0; l < i.length; l++)
            (!1 & a || r >= a) && Object.keys(s.O).every((t) => s.O[t](i[l]))
              ? i.splice(l--, 1)
              : ((o = !1), a < r && (r = a));
          if (o) {
            t.splice(u--, 1);
            var c = n();
            void 0 !== c && (e = c);
          }
        }
        return e;
      }
      a = a || 0;
      for (var u = t.length; u > 0 && t[u - 1][2] > a; u--) t[u] = t[u - 1];
      t[u] = [i, n, a];
    }),
    (s.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return s.d(e, { a: e }), e;
    }),
    (s.d = (t, e) => {
      for (var i in e)
        s.o(e, i) &&
          !s.o(t, i) &&
          Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
    }),
    (s.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (s.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (s.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
    (s.j = 136),
    (() => {
      var t = { 136: 0 };
      s.O.j = (e) => 0 === t[e];
      var e = (e, i) => {
          var n,
            a,
            [r, o, l] = i,
            c = 0;
          if (r.some((e) => 0 !== t[e])) {
            for (n in o) s.o(o, n) && (s.m[n] = o[n]);
            if (l) var u = l(s);
          }
          for (e && e(i); c < r.length; c++)
            (a = r[c]), s.o(t, a) && t[a] && t[a][0](), (t[a] = 0);
          return s.O(u);
        },
        i = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      i.forEach(e.bind(null, 0)), (i.push = e.bind(null, i.push.bind(i)));
    })();
  var n = s.O(void 0, [321], () => s(7290));
  n = s.O(n);
})();
