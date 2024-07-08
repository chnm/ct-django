/*! For license information please see draftail.js.LICENSE.txt */
(() => {
  var t,
    e = {
      4028: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r,
          o =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          i = (function () {
            function t(t, e) {
              for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  "value" in r && (r.writable = !0),
                  Object.defineProperty(t, r.key, r);
              }
            }
            return function (e, n, r) {
              return n && t(e.prototype, n), r && t(e, r), e;
            };
          })(),
          a = n(2427),
          s = (r = a) && r.__esModule ? r : { default: r };
        e.default = function (t, e) {
          var n, r, c;
          return (
            (r = n =
              (function (n) {
                function r() {
                  return (
                    (function (t, e) {
                      if (!(t instanceof e))
                        throw new TypeError(
                          "Cannot call a class as a function",
                        );
                    })(this, r),
                    (function (t, e) {
                      if (!t)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called",
                        );
                      return !e ||
                        ("object" != typeof e && "function" != typeof e)
                        ? t
                        : e;
                    })(
                      this,
                      (r.__proto__ || Object.getPrototypeOf(r)).apply(
                        this,
                        arguments,
                      ),
                    )
                  );
                }
                return (
                  (function (t, e) {
                    if ("function" != typeof e && null !== e)
                      throw new TypeError(
                        "Super expression must either be null or a function, not " +
                          typeof e,
                      );
                    (t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e));
                  })(r, n),
                  i(r, [
                    {
                      key: "render",
                      value: function () {
                        return s.default.createElement(t, o({}, this.props, e));
                      },
                    },
                  ]),
                  r
                );
              })(a.Component)),
            (n.displayName =
              "Decorated(" +
              ((c = t).displayName || c.name || "Component") +
              ")"),
            r
          );
        };
      },
      9333: (t, e, n) => {
        "use strict";
        var r,
          o = (function () {
            function t(t, e) {
              for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  "value" in r && (r.writable = !0),
                  Object.defineProperty(t, r.key, r);
              }
            }
            return function (e, n, r) {
              return n && t(e.prototype, n), r && t(e, r), e;
            };
          })(),
          i = (r = n(9404)) && r.__esModule ? r : { default: r },
          a = "-",
          s = (function () {
            function t(e) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
                (this.decorators = i.default.List(e));
            }
            return (
              o(
                t,
                [
                  {
                    key: "getDecorations",
                    value: function (t, e) {
                      var n = new Array(t.getText().length).fill(null);
                      return (
                        this.decorators.forEach(function (r, o) {
                          r.getDecorations(t, e).forEach(function (t, e) {
                            t && (n[e] = o + a + t);
                          });
                        }),
                        i.default.List(n)
                      );
                    },
                  },
                  {
                    key: "getComponentForKey",
                    value: function (e) {
                      return this.getDecoratorForKey(e).getComponentForKey(
                        t.getInnerKey(e),
                      );
                    },
                  },
                  {
                    key: "getPropsForKey",
                    value: function (e) {
                      return this.getDecoratorForKey(e).getPropsForKey(
                        t.getInnerKey(e),
                      );
                    },
                  },
                  {
                    key: "getDecoratorForKey",
                    value: function (t) {
                      var e = t.split(a),
                        n = Number(e[0]);
                      return this.decorators.get(n);
                    },
                  },
                ],
                [
                  {
                    key: "getInnerKey",
                    value: function (t) {
                      return t.split(a).slice(1).join(a);
                    },
                  },
                ],
              ),
              t
            );
          })();
        t.exports = s;
      },
      9043: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r,
          o =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          i = n(9404),
          a = n(8335),
          s = (r = n(4028)) && r.__esModule ? r : { default: r };
        e.default = function (t, e, n) {
          var r = (0, i.List)(t)
            .map(function (t) {
              return o({}, t, {
                component: (0, s.default)(t.component, {
                  getEditorState: e,
                  setEditorState: n,
                }),
              });
            })
            .toJS();
          return new a.CompositeDecorator(r);
        };
      },
      1849: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(8335);
        e.default = {
          keyBindingFn: function (t) {
            return (0, r.getDefaultKeyBinding)(t);
          },
        };
      },
      3161: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(8335);
        e.default = {
          handleKeyCommand: function (t, e, n) {
            var o = n.setEditorState,
              i = void 0;
            switch (t) {
              case "backspace":
              case "backspace-word":
              case "backspace-to-start-of-line":
                i = r.RichUtils.onBackspace(e);
                break;
              case "delete":
              case "delete-word":
              case "delete-to-end-of-block":
                i = r.RichUtils.onDelete(e);
                break;
              default:
                return "not-handled";
            }
            return null != i ? (o(i), "handled") : "not-handled";
          },
        };
      },
      6351: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = (function () {
            function t(t, e) {
              for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  "value" in r && (r.writable = !0),
                  Object.defineProperty(t, r.key, r);
              }
            }
            return function (e, n, r) {
              return n && t(e.prototype, n), r && t(e, r), e;
            };
          })(),
          i = n(2427),
          a = g(i),
          s = g(n(5556)),
          c = n(8335),
          u = n(9404),
          l = g(n(4855)),
          f = g(n(9494)),
          p = g(n(1933)),
          d = g(n(1849)),
          h = g(n(3161));
        function g(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function y(t, e) {
          var n = {};
          for (var r in t)
            e.indexOf(r) >= 0 ||
              (Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]));
          return n;
        }
        function m(t) {
          if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
            return n;
          }
          return Array.from(t);
        }
        var v = function (t) {
            var e = void 0;
            return (
              null != t.decorators
                ? (e = t.decorators)
                : null != t._decorators && (e = t._decorators),
              null != e.size ? e.size : e.length
            );
          },
          b = (function (t) {
            function e(t) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e);
              var n = (function (t, e) {
                if (!t)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !e || ("object" != typeof e && "function" != typeof e)
                  ? t
                  : e;
              })(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
              return (
                S.call(n),
                [n.props].concat(m(n.resolvePlugins())).forEach(function (t) {
                  "function" == typeof t.initialize &&
                    t.initialize(n.getPluginMethods());
                }),
                l.default.forEach(function (t) {
                  n[t] = function () {
                    var e;
                    return (e = n.editor)[t].apply(e, arguments);
                  };
                }),
                (n.state = {}),
                n
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              o(e, [
                {
                  key: "componentWillMount",
                  value: function () {
                    var t = (0, p.default)(
                        this.props,
                        this.getEditorState,
                        this.onChange,
                      ),
                      e = c.EditorState.set(this.props.editorState, {
                        decorator: t,
                      });
                    this.onChange((0, f.default)(e));
                  },
                },
                {
                  key: "componentWillReceiveProps",
                  value: function (t) {
                    var e = this.props.editorState.getDecorator(),
                      n = t.editorState.getDecorator();
                    if (e && !(e === n || (e && n && v(e) === v(n)))) {
                      var r = c.EditorState.set(t.editorState, {
                        decorator: e,
                      });
                      this.onChange((0, f.default)(r));
                    }
                  },
                },
                {
                  key: "componentWillUnmount",
                  value: function () {
                    var t = this;
                    this.resolvePlugins().forEach(function (e) {
                      e.willUnmount &&
                        e.willUnmount({
                          getEditorState: t.getEditorState,
                          setEditorState: t.onChange,
                        });
                    });
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var t = this,
                      e = this.createPluginHooks(),
                      n = this.resolveCustomStyleMap(),
                      o = this.resolveAccessibilityProps(),
                      i = this.resolveblockRenderMap();
                    return a.default.createElement(
                      c.Editor,
                      r({}, this.props, o, e, {
                        readOnly: this.props.readOnly || this.state.readOnly,
                        customStyleMap: n,
                        blockRenderMap: i,
                        onChange: this.onChange,
                        editorState: this.props.editorState,
                        ref: function (e) {
                          t.editor = e;
                        },
                      }),
                    );
                  },
                },
              ]),
              e
            );
          })(i.Component);
        (b.propTypes = {
          editorState: s.default.object.isRequired,
          onChange: s.default.func.isRequired,
          plugins: s.default.array,
          defaultKeyBindings: s.default.bool,
          defaultKeyCommands: s.default.bool,
          defaultBlockRenderMap: s.default.bool,
          customStyleMap: s.default.object,
          decorators: s.default.array,
        }),
          (b.defaultProps = {
            defaultBlockRenderMap: !0,
            defaultKeyBindings: !0,
            defaultKeyCommands: !0,
            customStyleMap: {},
            plugins: [],
            decorators: [],
          });
        var S = function () {
          var t = this;
          (this.onChange = function (e) {
            var n = e;
            t.resolvePlugins().forEach(function (e) {
              e.onChange && (n = e.onChange(n, t.getPluginMethods()));
            }),
              t.props.onChange && t.props.onChange(n, t.getPluginMethods());
          }),
            (this.getPlugins = function () {
              return t.props.plugins.slice(0);
            }),
            (this.getProps = function () {
              return r({}, t.props);
            }),
            (this.getReadOnly = function () {
              return t.props.readOnly;
            }),
            (this.setReadOnly = function (e) {
              e !== t.state.readOnly && t.setState({ readOnly: e });
            }),
            (this.getEditorRef = function () {
              return t.editor;
            }),
            (this.getEditorState = function () {
              return t.props.editorState;
            }),
            (this.getPluginMethods = function () {
              return {
                getPlugins: t.getPlugins,
                getProps: t.getProps,
                setEditorState: t.onChange,
                getEditorState: t.getEditorState,
                getReadOnly: t.getReadOnly,
                setReadOnly: t.setReadOnly,
                getEditorRef: t.getEditorRef,
              };
            }),
            (this.createEventHooks = function (e, n) {
              return function () {
                for (var r = arguments.length, o = Array(r), i = 0; i < r; i++)
                  o[i] = arguments[i];
                var a = [].slice.apply(o);
                return (
                  a.push(t.getPluginMethods()),
                  n.some(function (t) {
                    return (
                      "function" == typeof t[e] && !0 === t[e].apply(t, m(a))
                    );
                  })
                );
              };
            }),
            (this.createHandleHooks = function (e, n) {
              return function () {
                for (var r = arguments.length, o = Array(r), i = 0; i < r; i++)
                  o[i] = arguments[i];
                var a = [].slice.apply(o);
                return (
                  a.push(t.getPluginMethods()),
                  n.some(function (t) {
                    return (
                      "function" == typeof t[e] &&
                      "handled" === t[e].apply(t, m(a))
                    );
                  })
                    ? "handled"
                    : "not-handled"
                );
              };
            }),
            (this.createFnHooks = function (e, n) {
              return function () {
                for (var o = arguments.length, i = Array(o), a = 0; a < o; a++)
                  i[a] = arguments[a];
                var s = [].slice.apply(i);
                if ((s.push(t.getPluginMethods()), "blockRendererFn" === e)) {
                  var c = { props: {} };
                  return (
                    n.forEach(function (t) {
                      if ("function" == typeof t[e]) {
                        var n = t[e].apply(t, m(s));
                        if (null != n) {
                          var o = n.props,
                            i = y(n, ["props"]),
                            a = c,
                            u = a.props,
                            l = y(a, ["props"]);
                          c = r({}, l, i, { props: r({}, u, o) });
                        }
                      }
                    }),
                    !!c.component && c
                  );
                }
                if ("blockStyleFn" === e) {
                  var u = void 0;
                  return (
                    n.forEach(function (t) {
                      if ("function" == typeof t[e]) {
                        var n = t[e].apply(t, m(s));
                        null != n && (u = (u ? u + " " : "") + n);
                      }
                    }),
                    u || ""
                  );
                }
                var l = void 0;
                return (
                  !!n.some(function (t) {
                    return (
                      "function" == typeof t[e] &&
                      void 0 !== (l = t[e].apply(t, m(s)))
                    );
                  }) && l
                );
              };
            }),
            (this.createPluginHooks = function () {
              var e = {},
                n = [],
                r = [],
                o = [],
                i = [t.props].concat(m(t.resolvePlugins()));
              return (
                i.forEach(function (t) {
                  Object.keys(t).forEach(function (t) {
                    "onChange" !== t &&
                      -1 === n.indexOf(t) &&
                      -1 === o.indexOf(t) &&
                      (0 === t.indexOf("on")
                        ? n.push(t)
                        : 0 === t.indexOf("handle")
                        ? r.push(t)
                        : t.length - 2 === t.indexOf("Fn") && o.push(t));
                  });
                }),
                n.forEach(function (n) {
                  e[n] = t.createEventHooks(n, i);
                }),
                r.forEach(function (n) {
                  e[n] = t.createHandleHooks(n, i);
                }),
                o.forEach(function (n) {
                  e[n] = t.createFnHooks(n, i);
                }),
                e
              );
            }),
            (this.resolvePlugins = function () {
              var e = t.props.plugins.slice(0);
              return (
                !0 === t.props.defaultKeyBindings && e.push(d.default),
                !0 === t.props.defaultKeyCommands && e.push(h.default),
                e
              );
            }),
            (this.resolveCustomStyleMap = function () {
              return t.props.plugins
                .filter(function (t) {
                  return void 0 !== t.customStyleMap;
                })
                .map(function (t) {
                  return t.customStyleMap;
                })
                .concat([t.props.customStyleMap])
                .reduce(function (t, e) {
                  return r({}, t, e);
                }, {});
            }),
            (this.resolveblockRenderMap = function () {
              var e = t.props.plugins
                .filter(function (t) {
                  return void 0 !== t.blockRenderMap;
                })
                .reduce(
                  function (t, e) {
                    return t.merge(e.blockRenderMap);
                  },
                  (0, u.Map)({}),
                );
              return (
                t.props.defaultBlockRenderMap &&
                  (e = c.DefaultDraftBlockRenderMap.merge(e)),
                t.props.blockRenderMap && (e = e.merge(t.props.blockRenderMap)),
                e
              );
            }),
            (this.resolveAccessibilityProps = function () {
              var e = {};
              return (
                [t.props].concat(m(t.resolvePlugins())).forEach(function (t) {
                  if ("function" == typeof t.getAccessibilityProps) {
                    var n = t.getAccessibilityProps(),
                      o = {};
                    void 0 === e.ariaHasPopup
                      ? (o.ariaHasPopup = n.ariaHasPopup)
                      : "true" === n.ariaHasPopup && (o.ariaHasPopup = "true"),
                      void 0 === e.ariaExpanded
                        ? (o.ariaExpanded = n.ariaExpanded)
                        : !0 === n.ariaExpanded && (o.ariaExpanded = !0),
                      (e = r({}, e, n, o));
                  }
                }),
                e
              );
            });
        };
        e.default = b;
      },
      9494: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(8335);
        e.default = function (t) {
          var e = t.getCurrentContent().getBlockMap(),
            n = e.last().getKey(),
            o = e.last().getLength(),
            i = new r.SelectionState({
              anchorKey: n,
              anchorOffset: o,
              focusKey: n,
              focusOffset: o,
            });
          return r.EditorState.acceptSelection(t, i);
        };
      },
      4855: (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = [
            "focus",
            "blur",
            "setMode",
            "exitCurrentMode",
            "restoreEditorDOM",
            "setRenderGuard",
            "removeRenderGuard",
            "setClipboard",
            "getClipboard",
            "getEditorKey",
            "update",
            "onDragEnter",
            "onDragLeave",
          ]);
      },
      1933: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(9404),
          o = a(n(9043)),
          i = a(n(9333));
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var s = function (t) {
          return (
            "function" == typeof t.getDecorations &&
            "function" == typeof t.getComponentForKey &&
            "function" == typeof t.getPropsForKey
          );
        };
        e.default = function (t, e, n) {
          var a = (function (t) {
              var e = t.decorators,
                n = t.plugins;
              return (0, r.List)(
                [{ decorators: e }].concat(
                  (function (t) {
                    if (Array.isArray(t)) {
                      for (var e = 0, n = Array(t.length); e < t.length; e++)
                        n[e] = t[e];
                      return n;
                    }
                    return Array.from(t);
                  })(n),
                ),
              )
                .filter(function (t) {
                  return void 0 !== t.decorators;
                })
                .flatMap(function (t) {
                  return t.decorators;
                });
            })(t),
            c = (0, o.default)(
              a.filter(function (t) {
                return !s(t);
              }),
              e,
              n,
            ),
            u = a.filter(function (t) {
              return s(t);
            });
          return new i.default(u.push(c));
        };
      },
      8865: (t, e, n) => {
        "use strict";
        e.Ay = void 0;
        var r = a(n(4986)),
          o = a(n(3377)),
          i = a(n(6351));
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }
        (e.Ay = i.default), r.default, o.default;
      },
      3377: (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = function () {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            if (0 === e.length)
              return function (t) {
                return t;
              };
            if (1 === e.length) return e[0];
            var r = e[e.length - 1];
            return function () {
              for (
                var t = r.apply(void 0, arguments), n = e.length - 2;
                n >= 0;
                n -= 1
              )
                t = (0, e[n])(t);
              return t;
            };
          });
      },
      4986: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(8335);
        e.default = function (t) {
          return r.EditorState.createWithContent(
            r.ContentState.createFromText(t),
          );
        };
      },
      5889: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(5748),
          i = n(3018),
          a = n(6840),
          s = n(5224),
          c = n(2938),
          u = n(9938),
          l = n(2242),
          f = n(9404),
          p = (n(1381), n(6991)),
          d = n(6059),
          h = c.draft_tree_data_support,
          g = h ? s : a,
          y = f.List,
          m = f.Repeat,
          v = {
            insertAtomicBlock: function (t, e, n) {
              var a = t.getCurrentContent(),
                s = t.getSelection(),
                c = u.removeRange(a, s, "backward"),
                f = c.getSelectionAfter(),
                d = u.splitBlock(c, f),
                v = d.getSelectionAfter(),
                b = u.setBlockType(d, v, "atomic"),
                S = i.create({ entity: e }),
                _ = {
                  key: p(),
                  type: "atomic",
                  text: n,
                  characterList: y(m(S, n.length)),
                },
                E = { key: p(), type: "unstyled" };
              h &&
                ((_ = r({}, _, { nextSibling: E.key })),
                (E = r({}, E, { prevSibling: _.key })));
              var w = [new g(_), new g(E)],
                C = o.createFromArray(w),
                k = u.replaceWithFragment(b, v, C),
                x = k.merge({
                  selectionBefore: s,
                  selectionAfter: k.getSelectionAfter().set("hasFocus", !0),
                });
              return l.push(t, x, "insert-fragment");
            },
            moveAtomicBlock: function (t, e, n, r) {
              var o = t.getCurrentContent(),
                i = t.getSelection(),
                a = void 0;
              if ("before" === r || "after" === r) {
                var s = o.getBlockForKey(
                  "before" === r ? n.getStartKey() : n.getEndKey(),
                );
                a = d(o, e, s, r);
              } else {
                var c = u.removeRange(o, n, "backward"),
                  f = c.getSelectionAfter(),
                  p = c.getBlockForKey(f.getFocusKey());
                if (0 === f.getStartOffset()) a = d(c, e, p, "before");
                else if (f.getEndOffset() === p.getLength())
                  a = d(c, e, p, "after");
                else {
                  var h = u.splitBlock(c, f),
                    g = h.getSelectionAfter(),
                    y = h.getBlockForKey(g.getFocusKey());
                  a = d(h, e, y, "before");
                }
              }
              var m = a.merge({
                selectionBefore: i,
                selectionAfter: a.getSelectionAfter().set("hasFocus", !0),
              });
              return l.push(t, m, "move-block");
            },
          };
        t.exports = v;
      },
      5748: (t, e, n) => {
        "use strict";
        var r = n(9404).OrderedMap,
          o = {
            createFromArray: function (t) {
              return r(
                t.map(function (t) {
                  return [t.getKey(), t];
                }),
              );
            },
          };
        t.exports = o;
      },
      9981: (t, e, n) => {
        "use strict";
        var r = n(9404),
          o = n(9395),
          i = n(8227),
          a = r.List,
          s = r.Repeat,
          c = r.Record,
          u = o.thatReturnsTrue,
          l = c({ start: null, end: null }),
          f = c({ start: null, end: null, decoratorKey: null, leaves: null }),
          p = {
            generate: function (t, e, n) {
              var r = e.getLength();
              if (!r)
                return a.of(
                  new f({
                    start: 0,
                    end: 0,
                    decoratorKey: null,
                    leaves: a.of(new l({ start: 0, end: 0 })),
                  }),
                );
              var o = [],
                c = n ? n.getDecorations(e, t) : a(s(null, r)),
                p = e.getCharacterList();
              return (
                i(c, d, u, function (t, e) {
                  var n, r, s, h;
                  o.push(
                    new f({
                      start: t,
                      end: e,
                      decoratorKey: c.get(t),
                      leaves:
                        ((n = p.slice(t, e).toList()),
                        (r = t),
                        (s = []),
                        (h = n
                          .map(function (t) {
                            return t.getStyle();
                          })
                          .toList()),
                        i(h, d, u, function (t, e) {
                          s.push(new l({ start: t + r, end: e + r }));
                        }),
                        a(s)),
                    }),
                  );
                }),
                a(o)
              );
            },
            getFingerprint: function (t) {
              return t
                .map(function (t) {
                  var e = t.get("decoratorKey");
                  return (
                    (null !== e
                      ? e + "." + (t.get("end") - t.get("start"))
                      : "") +
                    "." +
                    t.get("leaves").size
                  );
                })
                .join("-");
            },
          };
        function d(t, e) {
          return t === e;
        }
        t.exports = p;
      },
      3018: (t, e, n) => {
        "use strict";
        var r = n(9404),
          o = r.Map,
          i = r.OrderedSet,
          a = r.Record,
          s = i(),
          c = { style: s, entity: null },
          u = (function (t) {
            function e() {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(this, t.apply(this, arguments))
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.getStyle = function () {
                return this.get("style");
              }),
              (e.prototype.getEntity = function () {
                return this.get("entity");
              }),
              (e.prototype.hasStyle = function (t) {
                return this.getStyle().includes(t);
              }),
              (e.applyStyle = function (t, n) {
                var r = t.set("style", t.getStyle().add(n));
                return e.create(r);
              }),
              (e.removeStyle = function (t, n) {
                var r = t.set("style", t.getStyle().remove(n));
                return e.create(r);
              }),
              (e.applyEntity = function (t, n) {
                var r = t.getEntity() === n ? t : t.set("entity", n);
                return e.create(r);
              }),
              (e.create = function (t) {
                if (!t) return l;
                var n = o({ style: s, entity: null }).merge(t),
                  r = f.get(n);
                if (r) return r;
                var i = new e(n);
                return (f = f.set(n, i)), i;
              }),
              e
            );
          })(a(c)),
          l = new u(),
          f = o([[o(c), l]]);
        (u.EMPTY = l), (t.exports = u);
      },
      9083: (t, e, n) => {
        "use strict";
        var r = n(9404).List,
          o = (function () {
            function t(e) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
                (this._decorators = e.slice());
            }
            return (
              (t.prototype.getDecorations = function (t, e) {
                var n = Array(t.getText().length).fill(null);
                return (
                  this._decorators.forEach(function (r, o) {
                    var i = 0;
                    (0, r.strategy)(
                      t,
                      function (t, e) {
                        (function (t, e, n) {
                          for (var r = e; r < n; r++)
                            if (null != t[r]) return !1;
                          return !0;
                        })(n, t, e) &&
                          ((function (t, e, n, r) {
                            for (var o = e; o < n; o++) t[o] = r;
                          })(n, t, e, o + "." + i),
                          i++);
                      },
                      e,
                    );
                  }),
                  r(n)
                );
              }),
              (t.prototype.getComponentForKey = function (t) {
                var e = parseInt(t.split(".")[0], 10);
                return this._decorators[e].component;
              }),
              (t.prototype.getPropsForKey = function (t) {
                var e = parseInt(t.split(".")[0], 10);
                return this._decorators[e].props;
              }),
              t
            );
          })();
        t.exports = o;
      },
      6840: (t, e, n) => {
        "use strict";
        var r = n(3018),
          o = n(9404),
          i = n(8227),
          a = o.List,
          s = o.Map,
          c = o.OrderedSet,
          u = o.Record,
          l = o.Repeat,
          f = c(),
          p = (function (t) {
            function e(n) {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(
                  this,
                  t.call(
                    this,
                    (function (t) {
                      if (!t) return t;
                      var e = t.characterList,
                        n = t.text;
                      return (
                        n && !e && (t.characterList = a(l(r.EMPTY, n.length))),
                        t
                      );
                    })(n),
                  ),
                )
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.getKey = function () {
                return this.get("key");
              }),
              (e.prototype.getType = function () {
                return this.get("type");
              }),
              (e.prototype.getText = function () {
                return this.get("text");
              }),
              (e.prototype.getCharacterList = function () {
                return this.get("characterList");
              }),
              (e.prototype.getLength = function () {
                return this.getText().length;
              }),
              (e.prototype.getDepth = function () {
                return this.get("depth");
              }),
              (e.prototype.getData = function () {
                return this.get("data");
              }),
              (e.prototype.getInlineStyleAt = function (t) {
                var e = this.getCharacterList().get(t);
                return e ? e.getStyle() : f;
              }),
              (e.prototype.getEntityAt = function (t) {
                var e = this.getCharacterList().get(t);
                return e ? e.getEntity() : null;
              }),
              (e.prototype.findStyleRanges = function (t, e) {
                i(this.getCharacterList(), d, t, e);
              }),
              (e.prototype.findEntityRanges = function (t, e) {
                i(this.getCharacterList(), h, t, e);
              }),
              e
            );
          })(
            u({
              key: "",
              type: "unstyled",
              text: "",
              characterList: a(),
              depth: 0,
              data: s(),
            }),
          );
        function d(t, e) {
          return t.getStyle() === e.getStyle();
        }
        function h(t, e) {
          return t.getEntity() === e.getEntity();
        }
        t.exports = p;
      },
      5224: (t, e, n) => {
        "use strict";
        var r = n(3018),
          o = n(9404),
          i = n(8227),
          a = o.List,
          s = o.Map,
          c = o.OrderedSet,
          u = o.Record,
          l = o.Repeat,
          f = c(),
          p = {
            parent: null,
            characterList: a(),
            data: s(),
            depth: 0,
            key: "",
            text: "",
            type: "unstyled",
            children: a(),
            prevSibling: null,
            nextSibling: null,
          },
          d = function (t, e) {
            return t.getStyle() === e.getStyle();
          },
          h = function (t, e) {
            return t.getEntity() === e.getEntity();
          },
          g = (function (t) {
            function e() {
              var n =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : p;
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(
                  this,
                  t.call(
                    this,
                    (function (t) {
                      if (!t) return t;
                      var e = t.characterList,
                        n = t.text;
                      return (
                        n && !e && (t.characterList = a(l(r.EMPTY, n.length))),
                        t
                      );
                    })(n),
                  ),
                )
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.getKey = function () {
                return this.get("key");
              }),
              (e.prototype.getType = function () {
                return this.get("type");
              }),
              (e.prototype.getText = function () {
                return this.get("text");
              }),
              (e.prototype.getCharacterList = function () {
                return this.get("characterList");
              }),
              (e.prototype.getLength = function () {
                return this.getText().length;
              }),
              (e.prototype.getDepth = function () {
                return this.get("depth");
              }),
              (e.prototype.getData = function () {
                return this.get("data");
              }),
              (e.prototype.getInlineStyleAt = function (t) {
                var e = this.getCharacterList().get(t);
                return e ? e.getStyle() : f;
              }),
              (e.prototype.getEntityAt = function (t) {
                var e = this.getCharacterList().get(t);
                return e ? e.getEntity() : null;
              }),
              (e.prototype.getChildKeys = function () {
                return this.get("children");
              }),
              (e.prototype.getParentKey = function () {
                return this.get("parent");
              }),
              (e.prototype.getPrevSiblingKey = function () {
                return this.get("prevSibling");
              }),
              (e.prototype.getNextSiblingKey = function () {
                return this.get("nextSibling");
              }),
              (e.prototype.findStyleRanges = function (t, e) {
                i(this.getCharacterList(), d, t, e);
              }),
              (e.prototype.findEntityRanges = function (t, e) {
                i(this.getCharacterList(), h, t, e);
              }),
              e
            );
          })(u(p));
        t.exports = g;
      },
      7656: (t, e, n) => {
        "use strict";
        var r = n(5748),
          o = n(3018),
          i = n(6840),
          a = n(5224),
          s = n(1608),
          c = n(2938),
          u = n(9404),
          l = n(1381),
          f = n(6991),
          p = n(1721),
          d = u.List,
          h = u.Record,
          g = u.Repeat,
          y = c.draft_tree_data_support ? a : i,
          m = (function (t) {
            function e() {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(this, t.apply(this, arguments))
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.getEntityMap = function () {
                return s;
              }),
              (e.prototype.getBlockMap = function () {
                return this.get("blockMap");
              }),
              (e.prototype.getSelectionBefore = function () {
                return this.get("selectionBefore");
              }),
              (e.prototype.getSelectionAfter = function () {
                return this.get("selectionAfter");
              }),
              (e.prototype.getBlockForKey = function (t) {
                return this.getBlockMap().get(t);
              }),
              (e.prototype.getKeyBefore = function (t) {
                return this.getBlockMap()
                  .reverse()
                  .keySeq()
                  .skipUntil(function (e) {
                    return e === t;
                  })
                  .skip(1)
                  .first();
              }),
              (e.prototype.getKeyAfter = function (t) {
                return this.getBlockMap()
                  .keySeq()
                  .skipUntil(function (e) {
                    return e === t;
                  })
                  .skip(1)
                  .first();
              }),
              (e.prototype.getBlockAfter = function (t) {
                return this.getBlockMap()
                  .skipUntil(function (e, n) {
                    return n === t;
                  })
                  .skip(1)
                  .first();
              }),
              (e.prototype.getBlockBefore = function (t) {
                return this.getBlockMap()
                  .reverse()
                  .skipUntil(function (e, n) {
                    return n === t;
                  })
                  .skip(1)
                  .first();
              }),
              (e.prototype.getBlocksAsArray = function () {
                return this.getBlockMap().toArray();
              }),
              (e.prototype.getFirstBlock = function () {
                return this.getBlockMap().first();
              }),
              (e.prototype.getLastBlock = function () {
                return this.getBlockMap().last();
              }),
              (e.prototype.getPlainText = function (t) {
                return this.getBlockMap()
                  .map(function (t) {
                    return t ? t.getText() : "";
                  })
                  .join(t || "\n");
              }),
              (e.prototype.getLastCreatedEntityKey = function () {
                return s.__getLastCreatedEntityKey();
              }),
              (e.prototype.hasText = function () {
                var t = this.getBlockMap();
                return t.size > 1 || t.first().getLength() > 0;
              }),
              (e.prototype.createEntity = function (t, e, n) {
                return s.__create(t, e, n), this;
              }),
              (e.prototype.mergeEntityData = function (t, e) {
                return s.__mergeData(t, e), this;
              }),
              (e.prototype.replaceEntityData = function (t, e) {
                return s.__replaceData(t, e), this;
              }),
              (e.prototype.addEntity = function (t) {
                return s.__add(t), this;
              }),
              (e.prototype.getEntity = function (t) {
                return s.__get(t);
              }),
              (e.createFromBlockArray = function (t, n) {
                var o = Array.isArray(t) ? t : t.contentBlocks,
                  i = r.createFromArray(o),
                  a = i.isEmpty() ? new l() : l.createEmpty(i.first().getKey());
                return new e({
                  blockMap: i,
                  entityMap: n || s,
                  selectionBefore: a,
                  selectionAfter: a,
                });
              }),
              (e.createFromText = function (t) {
                var n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : /\r\n?|\n/g,
                  r = t.split(n).map(function (t) {
                    return (
                      (t = p(t)),
                      new y({
                        key: f(),
                        text: t,
                        type: "unstyled",
                        characterList: d(g(o.EMPTY, t.length)),
                      })
                    );
                  });
                return e.createFromBlockArray(r);
              }),
              e
            );
          })(
            h({
              entityMap: null,
              blockMap: null,
              selectionBefore: null,
              selectionAfter: null,
            }),
          );
        t.exports = m;
      },
      4092: (t, e, n) => {
        "use strict";
        var r = n(3018),
          o = n(9404).Map,
          i = {
            add: function (t, e, n) {
              return a(t, e, n, !0);
            },
            remove: function (t, e, n) {
              return a(t, e, n, !1);
            },
          };
        function a(t, e, n, i) {
          var a = t.getBlockMap(),
            s = e.getStartKey(),
            c = e.getStartOffset(),
            u = e.getEndKey(),
            l = e.getEndOffset(),
            f = a
              .skipUntil(function (t, e) {
                return e === s;
              })
              .takeUntil(function (t, e) {
                return e === u;
              })
              .concat(o([[u, a.get(u)]]))
              .map(function (t, e) {
                var o, a;
                s === u
                  ? ((o = c), (a = l))
                  : ((o = e === s ? c : 0), (a = e === u ? l : t.getLength()));
                for (var f, p = t.getCharacterList(); o < a; )
                  (f = p.get(o)),
                    (p = p.set(
                      o,
                      i ? r.applyStyle(f, n) : r.removeStyle(f, n),
                    )),
                    o++;
                return t.set("characterList", p);
              });
          return t.merge({
            blockMap: a.merge(f),
            selectionBefore: e,
            selectionAfter: e,
          });
        }
        t.exports = i;
      },
      3387: (t, e, n) => {
        "use strict";
        var r = n(9404).Map,
          o = n(2427),
          i = n(8003),
          a = r({
            "header-one": { element: "h1" },
            "header-two": { element: "h2" },
            "header-three": { element: "h3" },
            "header-four": { element: "h4" },
            "header-five": { element: "h5" },
            "header-six": { element: "h6" },
            "unordered-list-item": {
              element: "li",
              wrapper: o.createElement("ul", {
                className: i("public/DraftStyleDefault/ul"),
              }),
            },
            "ordered-list-item": {
              element: "li",
              wrapper: o.createElement("ol", {
                className: i("public/DraftStyleDefault/ol"),
              }),
            },
            blockquote: { element: "blockquote" },
            atomic: { element: "figure" },
            "code-block": {
              element: "pre",
              wrapper: o.createElement("pre", {
                className: i("public/DraftStyleDefault/pre"),
              }),
            },
            unstyled: { element: "div", aliasedElements: ["p"] },
          });
        t.exports = a;
      },
      7918: (t) => {
        "use strict";
        t.exports = {
          BOLD: { fontWeight: "bold" },
          CODE: { fontFamily: "monospace", wordWrap: "break-word" },
          ITALIC: { fontStyle: "italic" },
          STRIKETHROUGH: { textDecoration: "line-through" },
          UNDERLINE: { textDecoration: "underline" },
        };
      },
      5143: (t, e, n) => {
        "use strict";
        var r = n(5889),
          o = n(5748),
          i = n(3018),
          a = n(9083),
          s = n(6840),
          c = n(7656),
          u = n(3387),
          l = n(7918),
          f = n(3299),
          p = n(1124),
          d = n(1608),
          h = n(9938),
          g = n(5407),
          y = n(2242),
          m = n(9414),
          v = n(7018),
          b = n(1381),
          S = n(7470),
          _ = {
            Editor: f,
            EditorBlock: p,
            EditorState: y,
            CompositeDecorator: a,
            Entity: d,
            EntityInstance: g,
            BlockMapBuilder: o,
            CharacterMetadata: i,
            ContentBlock: s,
            ContentState: c,
            SelectionState: b,
            AtomicBlockUtils: r,
            KeyBindingUtil: m,
            Modifier: h,
            RichUtils: v,
            DefaultDraftBlockRenderMap: u,
            DefaultDraftInlineStyle: l,
            convertFromHTML: n(4712),
            convertFromRaw: n(428),
            convertToRaw: S,
            genKey: n(6991),
            getDefaultKeyBinding: n(7811),
            getVisibleSelectionRect: n(894),
          };
        t.exports = _;
      },
      3299: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(3387),
          i = n(7918),
          a = n(755),
          s = n(9777),
          c = n(2474),
          u = n(7784),
          l = n(9884),
          f = n(2242),
          p = n(2427),
          d = n(6931),
          h = n(3529),
          g = n(2935),
          y = n(4134),
          m = n(8003),
          v = n(9395),
          b = n(6991),
          S = n(7811),
          _ = n(7392),
          E = n(646),
          w = n(6408),
          C = y.isBrowser("IE"),
          k = !C,
          x = { edit: u, composite: a, drag: c, cut: null, render: null },
          T = (function (t) {
            function e(n) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e);
              var r = (function (t, e) {
                if (!t)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !e || ("object" != typeof e && "function" != typeof e)
                  ? t
                  : e;
              })(this, t.call(this, n));
              return (
                (r.focus = function (t) {
                  var e = r.props.editorState,
                    n = e.getSelection().getHasFocus(),
                    o = d.findDOMNode(r.editor);
                  if (o) {
                    var i = g.getScrollParent(o),
                      a = t || _(i),
                      s = a.x,
                      c = a.y;
                    o instanceof HTMLElement || E(!1),
                      o.focus(),
                      i === window ? window.scrollTo(s, c) : h.setTop(i, c),
                      n || r.update(f.forceSelection(e, e.getSelection()));
                  }
                }),
                (r.blur = function () {
                  var t = d.findDOMNode(r.editor);
                  t instanceof HTMLElement || E(!1), t.blur();
                }),
                (r.setMode = function (t) {
                  r._handler = x[t];
                }),
                (r.exitCurrentMode = function () {
                  r.setMode("edit");
                }),
                (r.restoreEditorDOM = function (t) {
                  r.setState(
                    { contentsKey: r.state.contentsKey + 1 },
                    function () {
                      r.focus(t);
                    },
                  );
                }),
                (r.setClipboard = function (t) {
                  r._clipboard = t;
                }),
                (r.getClipboard = function () {
                  return r._clipboard;
                }),
                (r.update = function (t) {
                  (r._latestEditorState = t), r.props.onChange(t);
                }),
                (r.onDragEnter = function () {
                  r._dragCount++;
                }),
                (r.onDragLeave = function () {
                  r._dragCount--, 0 === r._dragCount && r.exitCurrentMode();
                }),
                (r._blockSelectEvents = !1),
                (r._clipboard = null),
                (r._handler = null),
                (r._dragCount = 0),
                (r._editorKey = n.editorKey || b()),
                (r._placeholderAccessibilityID = "placeholder-" + r._editorKey),
                (r._latestEditorState = n.editorState),
                (r._latestCommittedEditorState = n.editorState),
                (r._onBeforeInput = r._buildHandler("onBeforeInput")),
                (r._onBlur = r._buildHandler("onBlur")),
                (r._onCharacterData = r._buildHandler("onCharacterData")),
                (r._onCompositionEnd = r._buildHandler("onCompositionEnd")),
                (r._onCompositionStart = r._buildHandler("onCompositionStart")),
                (r._onCopy = r._buildHandler("onCopy")),
                (r._onCut = r._buildHandler("onCut")),
                (r._onDragEnd = r._buildHandler("onDragEnd")),
                (r._onDragOver = r._buildHandler("onDragOver")),
                (r._onDragStart = r._buildHandler("onDragStart")),
                (r._onDrop = r._buildHandler("onDrop")),
                (r._onInput = r._buildHandler("onInput")),
                (r._onFocus = r._buildHandler("onFocus")),
                (r._onKeyDown = r._buildHandler("onKeyDown")),
                (r._onKeyPress = r._buildHandler("onKeyPress")),
                (r._onKeyUp = r._buildHandler("onKeyUp")),
                (r._onMouseDown = r._buildHandler("onMouseDown")),
                (r._onMouseUp = r._buildHandler("onMouseUp")),
                (r._onPaste = r._buildHandler("onPaste")),
                (r._onSelect = r._buildHandler("onSelect")),
                (r.getEditorKey = function () {
                  return r._editorKey;
                }),
                (r.state = { contentsKey: 0 }),
                r
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype._buildHandler = function (t) {
                var e = this;
                return function (n) {
                  if (!e.props.readOnly) {
                    var r = e._handler && e._handler[t];
                    r && r(e, n);
                  }
                };
              }),
              (e.prototype._showPlaceholder = function () {
                return (
                  !!this.props.placeholder &&
                  !this.props.editorState.isInCompositionMode() &&
                  !this.props.editorState.getCurrentContent().hasText()
                );
              }),
              (e.prototype._renderPlaceholder = function () {
                if (this._showPlaceholder()) {
                  var t = {
                    text: w(this.props.placeholder),
                    editorState: this.props.editorState,
                    textAlignment: this.props.textAlignment,
                    accessibilityID: this._placeholderAccessibilityID,
                  };
                  return p.createElement(l, t);
                }
                return null;
              }),
              (e.prototype.render = function () {
                var t = this,
                  e = this.props,
                  n = e.blockRenderMap,
                  o = e.blockRendererFn,
                  a = e.blockStyleFn,
                  c = e.customStyleFn,
                  u = e.customStyleMap,
                  l = e.editorState,
                  f = e.readOnly,
                  d = e.textAlignment,
                  h = e.textDirectionality,
                  g = m({
                    "DraftEditor/root": !0,
                    "DraftEditor/alignLeft": "left" === d,
                    "DraftEditor/alignRight": "right" === d,
                    "DraftEditor/alignCenter": "center" === d,
                  }),
                  y = this.props.role || "textbox",
                  v = "combobox" === y ? !!this.props.ariaExpanded : null,
                  b = {
                    blockRenderMap: n,
                    blockRendererFn: o,
                    blockStyleFn: a,
                    customStyleMap: r({}, i, u),
                    customStyleFn: c,
                    editorKey: this._editorKey,
                    editorState: l,
                    key: "contents" + this.state.contentsKey,
                    textDirectionality: h,
                  };
                return p.createElement(
                  "div",
                  { className: g },
                  this._renderPlaceholder(),
                  p.createElement(
                    "div",
                    {
                      className: m("DraftEditor/editorContainer"),
                      ref: function (e) {
                        return (t.editorContainer = e);
                      },
                    },
                    p.createElement(
                      "div",
                      {
                        "aria-activedescendant": f
                          ? null
                          : this.props.ariaActiveDescendantID,
                        "aria-autocomplete": f
                          ? null
                          : this.props.ariaAutoComplete,
                        "aria-controls": f ? null : this.props.ariaControls,
                        "aria-describedby":
                          this.props.ariaDescribedBy ||
                          this._placeholderAccessibilityID,
                        "aria-expanded": f ? null : v,
                        "aria-label": this.props.ariaLabel,
                        "aria-labelledby": this.props.ariaLabelledBy,
                        "aria-multiline": this.props.ariaMultiline,
                        autoCapitalize: this.props.autoCapitalize,
                        autoComplete: this.props.autoComplete,
                        autoCorrect: this.props.autoCorrect,
                        className: m({
                          notranslate: !f,
                          "public/DraftEditor/content": !0,
                        }),
                        contentEditable: !f,
                        "data-testid": this.props.webDriverTestID,
                        onBeforeInput: this._onBeforeInput,
                        onBlur: this._onBlur,
                        onCompositionEnd: this._onCompositionEnd,
                        onCompositionStart: this._onCompositionStart,
                        onCopy: this._onCopy,
                        onCut: this._onCut,
                        onDragEnd: this._onDragEnd,
                        onDragEnter: this.onDragEnter,
                        onDragLeave: this.onDragLeave,
                        onDragOver: this._onDragOver,
                        onDragStart: this._onDragStart,
                        onDrop: this._onDrop,
                        onFocus: this._onFocus,
                        onInput: this._onInput,
                        onKeyDown: this._onKeyDown,
                        onKeyPress: this._onKeyPress,
                        onKeyUp: this._onKeyUp,
                        onMouseUp: this._onMouseUp,
                        onPaste: this._onPaste,
                        onSelect: this._onSelect,
                        ref: function (e) {
                          return (t.editor = e);
                        },
                        role: f ? null : y,
                        spellCheck: k && this.props.spellCheck,
                        style: {
                          outline: "none",
                          userSelect: "text",
                          WebkitUserSelect: "text",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        },
                        suppressContentEditableWarning: !0,
                        tabIndex: this.props.tabIndex,
                      },
                      p.createElement(s, b),
                    ),
                  ),
                );
              }),
              (e.prototype.componentDidMount = function () {
                this.setMode("edit"),
                  C && document.execCommand("AutoUrlDetect", !1, !1);
              }),
              (e.prototype.componentWillUpdate = function (t) {
                (this._blockSelectEvents = !0),
                  (this._latestEditorState = t.editorState);
              }),
              (e.prototype.componentDidUpdate = function () {
                (this._blockSelectEvents = !1),
                  (this._latestCommittedEditorState = this.props.editorState);
              }),
              e
            );
          })(p.Component);
        (T.defaultProps = {
          blockRenderMap: o,
          blockRendererFn: v.thatReturnsNull,
          blockStyleFn: v.thatReturns(""),
          keyBindingFn: S,
          readOnly: !1,
          spellCheck: !1,
          stripPastedStyles: !1,
        }),
          (t.exports = T);
      },
      1124: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(5203),
          i = n(3885),
          a = n(2427),
          s = n(6931),
          c = n(3529),
          u = n(2935),
          l = n(8307),
          f = n(5822),
          p = n(8003),
          d = n(8527),
          h = n(7392),
          g = n(1401),
          y = n(646),
          m = n(6408),
          v = function (t, e) {
            return t.getAnchorKey() === e || t.getFocusKey() === e;
          },
          b = (function (t) {
            function e() {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(this, t.apply(this, arguments))
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.shouldComponentUpdate = function (t) {
                return (
                  this.props.block !== t.block ||
                  this.props.tree !== t.tree ||
                  this.props.direction !== t.direction ||
                  (v(t.selection, t.block.getKey()) && t.forceSelection)
                );
              }),
              (e.prototype.componentDidMount = function () {
                var t = this.props.selection,
                  e = t.getEndKey();
                if (t.getHasFocus() && e === this.props.block.getKey()) {
                  var n = s.findDOMNode(this),
                    r = u.getScrollParent(n),
                    o = h(r),
                    i = void 0;
                  if (r === window) {
                    var a = d(n);
                    (i = a.y + a.height - g().height) > 0 &&
                      window.scrollTo(o.x, o.y + i + 10);
                  } else
                    n instanceof HTMLElement || y(!1),
                      (i =
                        n.offsetHeight + n.offsetTop - (r.offsetHeight + o.y)) >
                        0 && c.setTop(r, c.getTop(r) + i + 10);
                }
              }),
              (e.prototype._renderChildren = function () {
                var t = this,
                  e = this.props.block,
                  n = e.getKey(),
                  s = e.getText(),
                  c = this.props.tree.size - 1,
                  u = v(this.props.selection, n);
                return this.props.tree
                  .map(function (p, d) {
                    var h = p.get("leaves"),
                      g = h.size - 1,
                      y = h
                        .map(function (r, l) {
                          var f = i.encode(n, d, l),
                            p = r.get("start"),
                            h = r.get("end");
                          return a.createElement(o, {
                            key: f,
                            offsetKey: f,
                            block: e,
                            start: p,
                            selection: u ? t.props.selection : null,
                            forceSelection: t.props.forceSelection,
                            text: s.slice(p, h),
                            styleSet: e.getInlineStyleAt(p),
                            customStyleMap: t.props.customStyleMap,
                            customStyleFn: t.props.customStyleFn,
                            isLast: d === c && l === g,
                          });
                        })
                        .toArray(),
                      v = p.get("decoratorKey");
                    if (null == v) return y;
                    if (!t.props.decorator) return y;
                    var b = m(t.props.decorator),
                      S = b.getComponentForKey(v);
                    if (!S) return y;
                    var _ = b.getPropsForKey(v),
                      E = i.encode(n, d, 0),
                      w = s.slice(h.first().get("start"), h.last().get("end")),
                      C = f.getHTMLDirIfDifferent(
                        l.getDirection(w),
                        t.props.direction,
                      );
                    return a.createElement(
                      S,
                      r({}, _, {
                        contentState: t.props.contentState,
                        decoratedText: w,
                        dir: C,
                        key: E,
                        entityKey: e.getEntityAt(p.get("start")),
                        offsetKey: E,
                      }),
                      y,
                    );
                  })
                  .toArray();
              }),
              (e.prototype.render = function () {
                var t = this.props,
                  e = t.direction,
                  n = t.offsetKey,
                  r = p({
                    "public/DraftStyleDefault/block": !0,
                    "public/DraftStyleDefault/ltr": "LTR" === e,
                    "public/DraftStyleDefault/rtl": "RTL" === e,
                  });
                return a.createElement(
                  "div",
                  { "data-offset-key": n, className: r },
                  this._renderChildren(),
                );
              }),
              e
            );
          })(a.Component);
        t.exports = b;
      },
      755: (t, e, n) => {
        "use strict";
        var r = n(2938),
          o = n(9938),
          i = n(2242),
          a = n(5852),
          s = n(9927),
          c = n(3680),
          u = n(7759),
          l = !1,
          f = !1,
          p = "",
          d = {
            onBeforeInput: function (t, e) {
              p = (p || "") + e.data;
            },
            onCompositionStart: function (t) {
              f = !0;
            },
            onCompositionEnd: function (t) {
              (l = !1),
                (f = !1),
                setTimeout(function () {
                  l || d.resolveComposition(t);
                }, 20);
            },
            onKeyDown: function (t, e) {
              if (!f) return d.resolveComposition(t), void t._onKeyDown(e);
              (e.which !== a.RIGHT && e.which !== a.LEFT) || e.preventDefault();
            },
            onKeyPress: function (t, e) {
              e.which === a.RETURN && e.preventDefault();
            },
            resolveComposition: function (t) {
              if (!f) {
                l = !0;
                var e = p;
                p = "";
                var n = i.set(t._latestEditorState, { inCompositionMode: !1 }),
                  a = n.getCurrentInlineStyle(),
                  d = s(n.getCurrentContent(), n.getSelection()),
                  h = !e || u(n) || a.size > 0 || null !== d;
                if ((h && t.restoreEditorDOM(), t.exitCurrentMode(), e)) {
                  if (
                    r.draft_handlebeforeinput_composed_text &&
                    t.props.handleBeforeInput &&
                    c(t.props.handleBeforeInput(e, n))
                  )
                    return;
                  var g = o.replaceText(
                    n.getCurrentContent(),
                    n.getSelection(),
                    e,
                    a,
                    d,
                  );
                  t.update(i.push(n, g, "insert-characters"));
                } else
                  h &&
                    t.update(
                      i.set(n, {
                        nativelyRenderedContent: null,
                        forceSelection: !0,
                      }),
                    );
              }
            },
          };
        t.exports = d;
      },
      3659: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(1124),
          i = n(3885),
          a = (n(2242), n(2427)),
          s = n(8003),
          c = n(798),
          u = n(6408),
          l = function (t, e, n, r) {
            return s({
              "public/DraftStyleDefault/unorderedListItem":
                "unordered-list-item" === t,
              "public/DraftStyleDefault/orderedListItem":
                "ordered-list-item" === t,
              "public/DraftStyleDefault/reset": n,
              "public/DraftStyleDefault/depth0": 0 === e,
              "public/DraftStyleDefault/depth1": 1 === e,
              "public/DraftStyleDefault/depth2": 2 === e,
              "public/DraftStyleDefault/depth3": 3 === e,
              "public/DraftStyleDefault/depth4": 4 === e,
              "public/DraftStyleDefault/listLTR": "LTR" === r,
              "public/DraftStyleDefault/listRTL": "RTL" === r,
            });
          },
          f = (function (t) {
            function e() {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(this, t.apply(this, arguments))
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.shouldComponentUpdate = function (t) {
                var e = this.props.editorState,
                  n = t.editorState;
                if (e.getDirectionMap() !== n.getDirectionMap()) return !0;
                if (
                  e.getSelection().getHasFocus() !==
                  n.getSelection().getHasFocus()
                )
                  return !0;
                var r = n.getNativelyRenderedContent(),
                  o = e.isInCompositionMode(),
                  i = n.isInCompositionMode();
                if (
                  e === n ||
                  (null !== r && n.getCurrentContent() === r) ||
                  (o && i)
                )
                  return !1;
                var a = e.getCurrentContent(),
                  s = n.getCurrentContent(),
                  c = e.getDecorator(),
                  u = n.getDecorator();
                return o !== i || a !== s || c !== u || n.mustForceSelection();
              }),
              (e.prototype.render = function () {
                for (
                  var t = this.props,
                    e = t.blockRenderMap,
                    n = t.blockRendererFn,
                    s = t.blockStyleFn,
                    f = t.customStyleMap,
                    p = t.customStyleFn,
                    d = t.editorState,
                    h = t.editorKey,
                    g = t.textDirectionality,
                    y = d.getCurrentContent(),
                    m = d.getSelection(),
                    v = d.mustForceSelection(),
                    b = d.getDecorator(),
                    S = u(d.getDirectionMap()),
                    _ = y.getBlocksAsArray(),
                    E = [],
                    w = null,
                    C = null,
                    k = 0;
                  k < _.length;
                  k++
                ) {
                  var x = _[k],
                    T = x.getKey(),
                    O = x.getType(),
                    D = n(x),
                    R = void 0,
                    M = void 0,
                    A = void 0;
                  D && ((R = D.component), (M = D.props), (A = D.editable));
                  var I = g || S.get(T),
                    B = i.encode(T, 0, 0),
                    K = {
                      contentState: y,
                      block: x,
                      blockProps: M,
                      blockStyleFn: s,
                      customStyleMap: f,
                      customStyleFn: p,
                      decorator: b,
                      direction: I,
                      forceSelection: v,
                      key: T,
                      offsetKey: B,
                      selection: m,
                      tree: d.getBlockTree(T),
                    },
                    L = e.get(O) || e.get("unstyled"),
                    N = L.wrapper,
                    P = L.element || e.get("unstyled").element,
                    F = x.getDepth(),
                    U = "";
                  s && (U = s(x)),
                    "li" === P &&
                      (U = c(U, l(O, F, C !== N || null === w || F > w, I)));
                  var j = R || o,
                    z = {
                      className: U,
                      "data-block": !0,
                      "data-editor": h,
                      "data-offset-key": B,
                      key: T,
                    };
                  void 0 !== A &&
                    (z = r({}, z, {
                      contentEditable: A,
                      suppressContentEditableWarning: !0,
                    }));
                  var H = a.createElement(P, z, a.createElement(j, K));
                  E.push({
                    block: H,
                    wrapperTemplate: N,
                    key: T,
                    offsetKey: B,
                  }),
                    (w = N ? x.getDepth() : null),
                    (C = N);
                }
                for (var q = [], W = 0; W < E.length; ) {
                  var $ = E[W];
                  if ($.wrapperTemplate) {
                    var V = [];
                    do {
                      V.push(E[W].block), W++;
                    } while (
                      W < E.length &&
                      E[W].wrapperTemplate === $.wrapperTemplate
                    );
                    var G = a.cloneElement(
                      $.wrapperTemplate,
                      { key: $.key + "-wrap", "data-offset-key": $.offsetKey },
                      V,
                    );
                    q.push(G);
                  } else q.push($.block), W++;
                }
                return a.createElement("div", { "data-contents": "true" }, q);
              }),
              e
            );
          })(a.Component);
        t.exports = f;
      },
      9777: (t, e, n) => {
        "use strict";
        var r = n(3659);
        t.exports = r;
      },
      2474: (t, e, n) => {
        "use strict";
        var r = n(2395),
          o = n(9938),
          i = n(2242),
          a = n(8372),
          s = n(723),
          c = n(9450),
          u = n(3680),
          l = n(6408),
          f = {
            onDragEnd: function (t) {
              t.exitCurrentMode();
            },
            onDrop: function (t, e) {
              var n = new r(e.nativeEvent.dataTransfer),
                f = t._latestEditorState,
                d = (function (t, e) {
                  var n = null,
                    r = null;
                  if ("function" == typeof document.caretRangeFromPoint) {
                    var o = document.caretRangeFromPoint(t.x, t.y);
                    (n = o.startContainer), (r = o.startOffset);
                  } else {
                    if (!t.rangeParent) return null;
                    (n = t.rangeParent), (r = t.rangeOffset);
                  }
                  (n = l(n)), (r = l(r));
                  var i = l(a(n));
                  return c(e, i, r, i, r);
                })(e.nativeEvent, f);
              if ((e.preventDefault(), t.exitCurrentMode(), null != d)) {
                var h = n.getFiles();
                if (h.length > 0) {
                  if (
                    t.props.handleDroppedFiles &&
                    u(t.props.handleDroppedFiles(d, h))
                  )
                    return;
                  s(h, function (e) {
                    e && t.update(p(f, d, e));
                  });
                } else {
                  var g = t._internalDrag ? "internal" : "external";
                  (t.props.handleDrop && u(t.props.handleDrop(d, n, g))) ||
                    (t._internalDrag
                      ? t.update(
                          (function (t, e) {
                            var n = o.moveText(
                              t.getCurrentContent(),
                              t.getSelection(),
                              e,
                            );
                            return i.push(t, n, "insert-fragment");
                          })(f, d),
                        )
                      : t.update(p(f, d, n.getText())));
                }
              }
            },
          };
        function p(t, e, n) {
          var r = o.insertText(
            t.getCurrentContent(),
            e,
            n,
            t.getCurrentInlineStyle(),
          );
          return i.push(t, r, "insert-fragment");
        }
        t.exports = f;
      },
      7784: (t, e, n) => {
        "use strict";
        var r = {
          onBeforeInput: n(3722),
          onBlur: n(8058),
          onCompositionStart: n(7141),
          onCopy: n(3694),
          onCut: n(3919),
          onDragOver: n(6127),
          onDragStart: n(4861),
          onFocus: n(4447),
          onInput: n(5091),
          onKeyDown: n(8136),
          onPaste: n(2208),
          onSelect: n(6207),
        };
        t.exports = r;
      },
      5203: (t, e, n) => {
        "use strict";
        var r = n(5228),
          o = n(6268),
          i = n(2427),
          a = n(6931),
          s = n(646),
          c = n(4660),
          u = (function (t) {
            function e() {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(this, t.apply(this, arguments))
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype._setSelection = function () {
                var t = this.props.selection;
                if (null != t && t.getHasFocus()) {
                  var e = this.props,
                    n = e.block,
                    r = e.start,
                    o = e.text,
                    i = n.getKey(),
                    u = r + o.length;
                  if (t.hasEdgeWithin(i, r, u)) {
                    var l = a.findDOMNode(this);
                    l || s(!1);
                    var f = l.firstChild;
                    f || s(!1);
                    var p = void 0;
                    f.nodeType === Node.TEXT_NODE
                      ? (p = f)
                      : "BR" === f.tagName
                      ? (p = l)
                      : (p = f.firstChild) || s(!1),
                      c(t, p, i, r, u);
                  }
                }
              }),
              (e.prototype.shouldComponentUpdate = function (t) {
                var e = a.findDOMNode(this.leaf);
                return (
                  e || s(!1),
                  e.textContent !== t.text ||
                    t.styleSet !== this.props.styleSet ||
                    t.forceSelection
                );
              }),
              (e.prototype.componentDidUpdate = function () {
                this._setSelection();
              }),
              (e.prototype.componentDidMount = function () {
                this._setSelection();
              }),
              (e.prototype.render = function () {
                var t = this,
                  e = this.props.block,
                  n = this.props.text;
                n.endsWith("\n") && this.props.isLast && (n += "\n");
                var a = this.props,
                  s = a.customStyleMap,
                  c = a.customStyleFn,
                  u = a.offsetKey,
                  l = a.styleSet,
                  f = l.reduce(function (t, e) {
                    var n = {},
                      o = s[e];
                    return (
                      void 0 !== o &&
                        t.textDecoration !== o.textDecoration &&
                        (n.textDecoration = [t.textDecoration, o.textDecoration]
                          .join(" ")
                          .trim()),
                      r(t, o, n)
                    );
                  }, {});
                if (c) {
                  var p = c(l, e);
                  f = r(f, p);
                }
                return i.createElement(
                  "span",
                  {
                    "data-offset-key": u,
                    ref: function (e) {
                      return (t.leaf = e);
                    },
                    style: f,
                  },
                  i.createElement(o, null, n),
                );
              }),
              e
            );
          })(i.Component);
        t.exports = u;
      },
      9884: (t, e, n) => {
        "use strict";
        var r = n(2427),
          o = n(8003),
          i = (function (t) {
            function e() {
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called",
                    );
                  return !e || ("object" != typeof e && "function" != typeof e)
                    ? t
                    : e;
                })(this, t.apply(this, arguments))
              );
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.shouldComponentUpdate = function (t) {
                return (
                  this.props.text !== t.text ||
                  this.props.editorState.getSelection().getHasFocus() !==
                    t.editorState.getSelection().getHasFocus()
                );
              }),
              (e.prototype.render = function () {
                var t = this.props.editorState.getSelection().getHasFocus(),
                  e = o({
                    "public/DraftEditorPlaceholder/root": !0,
                    "public/DraftEditorPlaceholder/hasFocus": t,
                  });
                return r.createElement(
                  "div",
                  { className: e },
                  r.createElement(
                    "div",
                    {
                      className: o("public/DraftEditorPlaceholder/inner"),
                      id: this.props.accessibilityID,
                      style: { whiteSpace: "pre-wrap" },
                    },
                    this.props.text,
                  ),
                );
              }),
              e
            );
          })(r.Component);
        t.exports = i;
      },
      6268: (t, e, n) => {
        "use strict";
        var r = n(2427),
          o = n(6931),
          i = n(4134),
          a = n(646),
          s = i.isBrowser("IE <= 11"),
          c = s
            ? r.createElement("span", { key: "A", "data-text": "true" }, "\n")
            : r.createElement("br", { key: "A", "data-text": "true" }),
          u = s
            ? r.createElement("span", { key: "B", "data-text": "true" }, "\n")
            : r.createElement("br", { key: "B", "data-text": "true" }),
          l = (function (t) {
            function e(n) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e);
              var r = (function (t, e) {
                if (!t)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !e || ("object" != typeof e && "function" != typeof e)
                  ? t
                  : e;
              })(this, t.call(this, n));
              return (r._forceFlag = !1), r;
            }
            return (
              (function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof e,
                  );
                (t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  e &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(t, e)
                      : (t.__proto__ = e));
              })(e, t),
              (e.prototype.shouldComponentUpdate = function (t) {
                var e = o.findDOMNode(this),
                  n = "" === t.children;
                return (
                  e instanceof Element || a(!1),
                  n
                    ? !(function (t) {
                        return s ? "\n" === t.textContent : "BR" === t.tagName;
                      })(e)
                    : e.textContent !== t.children
                );
              }),
              (e.prototype.componentDidMount = function () {
                this._forceFlag = !this._forceFlag;
              }),
              (e.prototype.componentDidUpdate = function () {
                this._forceFlag = !this._forceFlag;
              }),
              (e.prototype.render = function () {
                return "" === this.props.children
                  ? this._forceFlag
                    ? c
                    : u
                  : r.createElement(
                      "span",
                      { key: this._forceFlag ? "A" : "B", "data-text": "true" },
                      this.props.children,
                    );
              }),
              e
            );
          })(r.Component);
        t.exports = l;
      },
      1608: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(5407),
          i = n(9404),
          a = n(646),
          s = (0, i.Map)(),
          c = 0;
        function u(t, e) {
          console.warn(
            "WARNING: " +
              t +
              ' will be deprecated soon!\nPlease use "' +
              e +
              '" instead.',
          );
        }
        var l = {
          getLastCreatedEntityKey: function () {
            return (
              u(
                "DraftEntity.getLastCreatedEntityKey",
                "contentState.getLastCreatedEntityKey",
              ),
              l.__getLastCreatedEntityKey()
            );
          },
          create: function (t, e, n) {
            return (
              u("DraftEntity.create", "contentState.createEntity"),
              l.__create(t, e, n)
            );
          },
          add: function (t) {
            return u("DraftEntity.add", "contentState.addEntity"), l.__add(t);
          },
          get: function (t) {
            return u("DraftEntity.get", "contentState.getEntity"), l.__get(t);
          },
          mergeData: function (t, e) {
            return (
              u("DraftEntity.mergeData", "contentState.mergeEntityData"),
              l.__mergeData(t, e)
            );
          },
          replaceData: function (t, e) {
            return (
              u("DraftEntity.replaceData", "contentState.replaceEntityData"),
              l.__replaceData(t, e)
            );
          },
          __getLastCreatedEntityKey: function () {
            return "" + c;
          },
          __create: function (t, e, n) {
            return l.__add(new o({ type: t, mutability: e, data: n || {} }));
          },
          __add: function (t) {
            var e = "" + ++c;
            return (s = s.set(e, t)), e;
          },
          __get: function (t) {
            var e = s.get(t);
            return e || a(!1), e;
          },
          __mergeData: function (t, e) {
            var n = l.__get(t),
              o = r({}, n.getData(), e),
              i = n.set("data", o);
            return (s = s.set(t, i)), i;
          },
          __replaceData: function (t, e) {
            var n = l.__get(t).set("data", e);
            return (s = s.set(t, n)), n;
          },
        };
        t.exports = l;
      },
      5407: (t, e, n) => {
        "use strict";
        var r = (function (t) {
          function e() {
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              (function (t, e) {
                if (!t)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !e || ("object" != typeof e && "function" != typeof e)
                  ? t
                  : e;
              })(this, t.apply(this, arguments))
            );
          }
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof e,
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e));
            })(e, t),
            (e.prototype.getType = function () {
              return this.get("type");
            }),
            (e.prototype.getMutability = function () {
              return this.get("mutability");
            }),
            (e.prototype.getData = function () {
              return this.get("data");
            }),
            e
          );
        })(
          (0, n(9404).Record)({
            type: "TOKEN",
            mutability: "IMMUTABLE",
            data: Object,
          }),
        );
        t.exports = r;
      },
      8382: (t) => {
        "use strict";
        t.exports = {
          getRemovalRange: function (t, e, n, r, o) {
            var i = n.split(" ");
            i = i.map(function (t, e) {
              if ("forward" === o) {
                if (e > 0) return " " + t;
              } else if (e < i.length - 1) return t + " ";
              return t;
            });
            for (var a, s = r, c = null, u = null, l = 0; l < i.length; l++) {
              if (t < (a = s + i[l].length) && s < e)
                null !== c || (c = s), (u = a);
              else if (null !== c) break;
              s = a;
            }
            var f = r + n.length,
              p = c === r,
              d = u === f;
            return (
              ((!p && d) || (p && !d)) &&
                ("forward" === o ? u !== f && u++ : c !== r && c--),
              { start: c, end: u }
            );
          },
        };
      },
      8360: (t) => {
        "use strict";
        t.exports = {
          draft_killswitch_allow_nontextnodes: !1,
          draft_segmented_entities_behavior: !1,
          draft_handlebeforeinput_composed_text: !1,
          draft_tree_data_support: !1,
        };
      },
      2938: (t, e, n) => {
        "use strict";
        var r = n(8360);
        t.exports = r;
      },
      7204: (t) => {
        "use strict";
        t.exports = {
          logSelectionStateFailure: function () {
            return null;
          },
        };
      },
      9938: (t, e, n) => {
        "use strict";
        var r = n(3018),
          o = n(4092),
          i = n(2938),
          a = n(9404),
          s = n(6416),
          c = n(508),
          u = n(866),
          l = n(9127),
          f = n(3136),
          p = n(646),
          d = n(5462),
          h = n(6044),
          g = n(4435),
          y = n(3222),
          m = a.OrderedSet,
          v = {
            replaceText: function (t, e, n, o, i) {
              var a = h(t, e),
                s = g(a, e),
                c = r.create({ style: o || m(), entity: i || null });
              return f(s, s.getSelectionAfter(), n, c);
            },
            insertText: function (t, e, n, r, o) {
              return e.isCollapsed() || p(!1), v.replaceText(t, e, n, r, o);
            },
            moveText: function (t, e, n) {
              var r = u(t, e),
                o = v.removeRange(t, e, "backward");
              return v.replaceWithFragment(o, n, r);
            },
            replaceWithFragment: function (t, e, n) {
              var r = h(t, e),
                o = g(r, e);
              return l(o, o.getSelectionAfter(), n);
            },
            removeRange: function (t, e, n) {
              var r,
                o,
                a = void 0,
                s = void 0;
              e.getIsBackward() &&
                (e = e.merge({
                  anchorKey: e.getFocusKey(),
                  anchorOffset: e.getFocusOffset(),
                  focusKey: e.getAnchorKey(),
                  focusOffset: e.getAnchorOffset(),
                  isBackward: !1,
                })),
                (r = e.getAnchorKey()),
                (o = e.getFocusKey()),
                (a = t.getBlockForKey(r)),
                (s = t.getBlockForKey(o));
              var u = e.getStartOffset(),
                l = e.getEndOffset(),
                f = a.getEntityAt(u),
                p = s.getEntityAt(l - 1);
              if (r === o && f && f === p) {
                var d = c(t.getEntityMap(), a, s, e, n);
                return g(t, d);
              }
              var y = e;
              i.draft_segmented_entities_behavior &&
                (y = c(t.getEntityMap(), a, s, e, n));
              var m = h(t, y);
              return g(m, y);
            },
            splitBlock: function (t, e) {
              var n = h(t, e),
                r = g(n, e);
              return y(r, r.getSelectionAfter());
            },
            applyInlineStyle: function (t, e, n) {
              return o.add(t, e, n);
            },
            removeInlineStyle: function (t, e, n) {
              return o.remove(t, e, n);
            },
            setBlockType: function (t, e, n) {
              return d(t, e, function (t) {
                return t.merge({ type: n, depth: 0 });
              });
            },
            setBlockData: function (t, e, n) {
              return d(t, e, function (t) {
                return t.merge({ data: n });
              });
            },
            mergeBlockData: function (t, e, n) {
              return d(t, e, function (t) {
                return t.merge({ data: t.getData().merge(n) });
              });
            },
            applyEntity: function (t, e, n) {
              var r = h(t, e);
              return s(r, e, n);
            },
          };
        t.exports = v;
      },
      3885: (t) => {
        "use strict";
        var e = {
          encode: function (t, e, n) {
            return t + "-" + e + "-" + n;
          },
          decode: function (t) {
            var e = t.split("-"),
              n = e[0],
              r = e[1],
              o = e[2];
            return {
              blockKey: n,
              decoratorKey: parseInt(r, 10),
              leafKey: parseInt(o, 10),
            };
          },
        };
        t.exports = e;
      },
      46: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = (n(3018), n(6840)),
          i = n(5224),
          a = n(2938),
          s = n(9404),
          c = n(4712),
          u = n(6991),
          l = n(9248),
          f = n(1721),
          p = s.List,
          d = s.Repeat,
          h = a.draft_tree_data_support,
          g = h ? i : o,
          y = {
            processHTML: function (t, e) {
              return c(t, l, e);
            },
            processText: function (t, e, n) {
              return t.reduce(function (t, o, i) {
                o = f(o);
                var a = u(),
                  s = {
                    key: a,
                    type: n,
                    text: o,
                    characterList: p(d(e, o.length)),
                  };
                if (h && 0 !== i) {
                  var c = i - 1,
                    l = (t[c] = t[c].merge({ nextSibling: a }));
                  s = r({}, s, { prevSibling: l.getKey() });
                }
                return t.push(new g(s)), t;
              }, []);
            },
          };
        t.exports = y;
      },
      1617: (t, e, n) => {
        "use strict";
        var r = "['‘’]",
          o = "\\s|(?![_])" + n(7405).getPunctuation(),
          i = new RegExp(
            "^(?:" + o + ")*(?:" + r + "|(?!" + o + ").)*(?:(?!" + o + ").)",
          ),
          a = new RegExp(
            "(?:(?!" + o + ").)(?:" + r + "|(?!" + o + ").)*(?:" + o + ")*$",
          );
        function s(t, e) {
          var n = e ? a.exec(t) : i.exec(t);
          return n ? n[0] : t;
        }
        var c = {
          getBackward: function (t) {
            return s(t, !0);
          },
          getForward: function (t) {
            return s(t, !1);
          },
        };
        t.exports = c;
      },
      1439: (t) => {
        "use strict";
        var e = {
          stringify: function (t) {
            return "_" + String(t);
          },
          unstringify: function (t) {
            return t.slice(1);
          },
        };
        t.exports = e;
      },
      2396: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(646),
          i = function (t) {
            if (!t || !t.type) return !1;
            var e = t.type;
            return "unordered-list-item" === e || "ordered-list-item" === e;
          },
          a = {
            fromRawTreeStateToRawState: function (t) {
              var e = t.blocks,
                n = [];
              return (
                Array.isArray(e) || o(!1),
                Array.isArray(e) && e.length
                  ? ((function (t, e) {
                      for (var a = [].concat(t).reverse(); a.length; ) {
                        var s = a.pop();
                        (l = void 0),
                          (l = r({}, (u = s))),
                          i(u) &&
                            ((l.depth = l.depth || 0),
                            (function (t) {
                              Array.isArray(t.children) &&
                                (t.children = t.children.map(function (e) {
                                  return e.type === t.type
                                    ? r({}, e, { depth: (t.depth || 0) + 1 })
                                    : e;
                                }));
                            })(u)),
                          delete l.children,
                          n.push(l);
                        var c = s.children;
                        Array.isArray(c) || o(!1),
                          (a = a.concat([].concat(c.reverse())));
                      }
                      var u, l;
                    })(e),
                    (t.blocks = n),
                    r({}, t, { blocks: n }))
                  : t
              );
            },
            fromRawStateToRawTreeState: function (t) {
              var e = {},
                n = [];
              return (
                t.blocks.forEach(function (t) {
                  var a = i(t),
                    s = t.depth || 0,
                    c = r({}, t, { children: [] });
                  if (!a) return (e = {}), void n.push(c);
                  if (((e[s] = c), s > 0)) {
                    var u = e[s - 1];
                    return u || o(!1), void u.children.push(c);
                  }
                  n.push(c);
                }),
                r({}, t, { blocks: n })
              );
            },
          };
        t.exports = a;
      },
      3914: (t, e, n) => {
        "use strict";
        var r,
          o = n(9404),
          i = n(1708),
          a = n(6408),
          s = o.OrderedMap,
          c = {
            getDirectionMap: function (t, e) {
              r ? r.reset() : (r = new i());
              var n = t.getBlockMap(),
                c = n.valueSeq().map(function (t) {
                  return a(r).getDirection(t.getText());
                }),
                u = s(n.keySeq().zip(c));
              return null != e && o.is(e, u) ? e : u;
            },
          };
        t.exports = c;
      },
      2242: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(9981),
          i = n(7656),
          a = n(3914),
          s = n(9404),
          c = n(1381),
          u = s.OrderedSet,
          l = s.Record,
          f = s.Stack,
          p = l({
            allowUndo: !0,
            currentContent: null,
            decorator: null,
            directionMap: null,
            forceSelection: !1,
            inCompositionMode: !1,
            inlineStyleOverride: null,
            lastChangeType: null,
            nativelyRenderedContent: null,
            redoStack: f(),
            selection: null,
            treeMap: null,
            undoStack: f(),
          }),
          d = (function () {
            function t(e) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
                (this._immutable = e);
            }
            return (
              (t.createEmpty = function (e) {
                return t.createWithContent(i.createFromText(""), e);
              }),
              (t.createWithContent = function (e, n) {
                var r = e.getBlockMap().first().getKey();
                return t.create({
                  currentContent: e,
                  undoStack: f(),
                  redoStack: f(),
                  decorator: n || null,
                  selection: c.createEmpty(r),
                });
              }),
              (t.create = function (e) {
                var n = e.currentContent,
                  o = e.decorator,
                  i = r({}, e, {
                    treeMap: g(n, o),
                    directionMap: a.getDirectionMap(n),
                  });
                return new t(new p(i));
              }),
              (t.set = function (e, n) {
                return new t(
                  e.getImmutable().withMutations(function (t) {
                    var r = t.get("decorator"),
                      i = r;
                    null === n.decorator
                      ? (i = null)
                      : n.decorator && (i = n.decorator);
                    var a = n.currentContent || e.getCurrentContent();
                    if (i !== r) {
                      var s,
                        c = t.get("treeMap");
                      return (
                        (s =
                          i && r
                            ? (function (t, e, n, r, i) {
                                return n.merge(
                                  e
                                    .toSeq()
                                    .filter(function (e) {
                                      return (
                                        r.getDecorations(e, t) !==
                                        i.getDecorations(e, t)
                                      );
                                    })
                                    .map(function (e) {
                                      return o.generate(t, e, r);
                                    }),
                                );
                              })(a, a.getBlockMap(), c, i, r)
                            : g(a, i)),
                        void t.merge({
                          decorator: i,
                          treeMap: s,
                          nativelyRenderedContent: null,
                        })
                      );
                    }
                    a !== e.getCurrentContent() &&
                      t.set(
                        "treeMap",
                        (function (t, e, n, r) {
                          var i = t.getCurrentContent().set("entityMap", n),
                            a = i.getBlockMap();
                          return t
                            .getImmutable()
                            .get("treeMap")
                            .merge(
                              e
                                .toSeq()
                                .filter(function (t, e) {
                                  return t !== a.get(e);
                                })
                                .map(function (t) {
                                  return o.generate(i, t, r);
                                }),
                            );
                        })(e, a.getBlockMap(), a.getEntityMap(), i),
                      ),
                      t.merge(n);
                  }),
                );
              }),
              (t.prototype.toJS = function () {
                return this.getImmutable().toJS();
              }),
              (t.prototype.getAllowUndo = function () {
                return this.getImmutable().get("allowUndo");
              }),
              (t.prototype.getCurrentContent = function () {
                return this.getImmutable().get("currentContent");
              }),
              (t.prototype.getUndoStack = function () {
                return this.getImmutable().get("undoStack");
              }),
              (t.prototype.getRedoStack = function () {
                return this.getImmutable().get("redoStack");
              }),
              (t.prototype.getSelection = function () {
                return this.getImmutable().get("selection");
              }),
              (t.prototype.getDecorator = function () {
                return this.getImmutable().get("decorator");
              }),
              (t.prototype.isInCompositionMode = function () {
                return this.getImmutable().get("inCompositionMode");
              }),
              (t.prototype.mustForceSelection = function () {
                return this.getImmutable().get("forceSelection");
              }),
              (t.prototype.getNativelyRenderedContent = function () {
                return this.getImmutable().get("nativelyRenderedContent");
              }),
              (t.prototype.getLastChangeType = function () {
                return this.getImmutable().get("lastChangeType");
              }),
              (t.prototype.getInlineStyleOverride = function () {
                return this.getImmutable().get("inlineStyleOverride");
              }),
              (t.setInlineStyleOverride = function (e, n) {
                return t.set(e, { inlineStyleOverride: n });
              }),
              (t.prototype.getCurrentInlineStyle = function () {
                var t = this.getInlineStyleOverride();
                if (null != t) return t;
                var e = this.getCurrentContent(),
                  n = this.getSelection();
                return n.isCollapsed()
                  ? (function (t, e) {
                      var n = e.getStartKey(),
                        r = e.getStartOffset(),
                        o = t.getBlockForKey(n);
                      return r > 0
                        ? o.getInlineStyleAt(r - 1)
                        : o.getLength()
                        ? o.getInlineStyleAt(0)
                        : y(t, n);
                    })(e, n)
                  : (function (t, e) {
                      var n = e.getStartKey(),
                        r = e.getStartOffset(),
                        o = t.getBlockForKey(n);
                      return r < o.getLength()
                        ? o.getInlineStyleAt(r)
                        : r > 0
                        ? o.getInlineStyleAt(r - 1)
                        : y(t, n);
                    })(e, n);
              }),
              (t.prototype.getBlockTree = function (t) {
                return this.getImmutable().getIn(["treeMap", t]);
              }),
              (t.prototype.isSelectionAtStartOfContent = function () {
                var t = this.getCurrentContent().getBlockMap().first().getKey();
                return this.getSelection().hasEdgeWithin(t, 0, 0);
              }),
              (t.prototype.isSelectionAtEndOfContent = function () {
                var t = this.getCurrentContent().getBlockMap().last(),
                  e = t.getLength();
                return this.getSelection().hasEdgeWithin(t.getKey(), e, e);
              }),
              (t.prototype.getDirectionMap = function () {
                return this.getImmutable().get("directionMap");
              }),
              (t.acceptSelection = function (t, e) {
                return h(t, e, !1);
              }),
              (t.forceSelection = function (t, e) {
                return (
                  e.getHasFocus() || (e = e.set("hasFocus", !0)), h(t, e, !0)
                );
              }),
              (t.moveSelectionToEnd = function (e) {
                var n = e.getCurrentContent().getLastBlock(),
                  r = n.getKey(),
                  o = n.getLength();
                return t.acceptSelection(
                  e,
                  new c({
                    anchorKey: r,
                    anchorOffset: o,
                    focusKey: r,
                    focusOffset: o,
                    isBackward: !1,
                  }),
                );
              }),
              (t.moveFocusToEnd = function (e) {
                var n = t.moveSelectionToEnd(e);
                return t.forceSelection(n, n.getSelection());
              }),
              (t.push = function (e, n, r) {
                if (e.getCurrentContent() === n) return e;
                var o = "insert-characters" !== r,
                  i = a.getDirectionMap(n, e.getDirectionMap());
                if (!e.getAllowUndo())
                  return t.set(e, {
                    currentContent: n,
                    directionMap: i,
                    lastChangeType: r,
                    selection: n.getSelectionAfter(),
                    forceSelection: o,
                    inlineStyleOverride: null,
                  });
                var s = e.getSelection(),
                  c = e.getCurrentContent(),
                  u = e.getUndoStack(),
                  l = n;
                s !== c.getSelectionAfter() ||
                (function (t, e) {
                  return (
                    e !== t.getLastChangeType() ||
                    ("insert-characters" !== e &&
                      "backspace-character" !== e &&
                      "delete-character" !== e)
                  );
                })(e, r)
                  ? ((u = u.push(c)), (l = l.set("selectionBefore", s)))
                  : ("insert-characters" !== r &&
                      "backspace-character" !== r &&
                      "delete-character" !== r) ||
                    (l = l.set("selectionBefore", c.getSelectionBefore()));
                var p = e.getInlineStyleOverride();
                -1 ===
                  ["adjust-depth", "change-block-type", "split-block"].indexOf(
                    r,
                  ) && (p = null);
                var d = {
                  currentContent: l,
                  directionMap: i,
                  undoStack: u,
                  redoStack: f(),
                  lastChangeType: r,
                  selection: n.getSelectionAfter(),
                  forceSelection: o,
                  inlineStyleOverride: p,
                };
                return t.set(e, d);
              }),
              (t.undo = function (e) {
                if (!e.getAllowUndo()) return e;
                var n = e.getUndoStack(),
                  r = n.peek();
                if (!r) return e;
                var o = e.getCurrentContent(),
                  i = a.getDirectionMap(r, e.getDirectionMap());
                return t.set(e, {
                  currentContent: r,
                  directionMap: i,
                  undoStack: n.shift(),
                  redoStack: e.getRedoStack().push(o),
                  forceSelection: !0,
                  inlineStyleOverride: null,
                  lastChangeType: "undo",
                  nativelyRenderedContent: null,
                  selection: o.getSelectionBefore(),
                });
              }),
              (t.redo = function (e) {
                if (!e.getAllowUndo()) return e;
                var n = e.getRedoStack(),
                  r = n.peek();
                if (!r) return e;
                var o = e.getCurrentContent(),
                  i = a.getDirectionMap(r, e.getDirectionMap());
                return t.set(e, {
                  currentContent: r,
                  directionMap: i,
                  undoStack: e.getUndoStack().push(o),
                  redoStack: n.shift(),
                  forceSelection: !0,
                  inlineStyleOverride: null,
                  lastChangeType: "redo",
                  nativelyRenderedContent: null,
                  selection: r.getSelectionAfter(),
                });
              }),
              (t.prototype.getImmutable = function () {
                return this._immutable;
              }),
              t
            );
          })();
        function h(t, e, n) {
          return d.set(t, {
            selection: e,
            forceSelection: n,
            nativelyRenderedContent: null,
            inlineStyleOverride: null,
          });
        }
        function g(t, e) {
          return t
            .getBlockMap()
            .map(function (n) {
              return o.generate(t, n, e);
            })
            .toOrderedMap();
        }
        function y(t, e) {
          var n = t
            .getBlockMap()
            .reverse()
            .skipUntil(function (t, n) {
              return n === e;
            })
            .skip(1)
            .skipUntil(function (t, e) {
              return t.getLength();
            })
            .first();
          return n ? n.getInlineStyleAt(n.getLength() - 1) : u();
        }
        t.exports = d;
      },
      9414: (t, e, n) => {
        "use strict";
        var r = n(4134).isPlatform("Mac OS X"),
          o = {
            isCtrlKeyCommand: function (t) {
              return !!t.ctrlKey && !t.altKey;
            },
            isOptionKeyCommand: function (t) {
              return r && t.altKey;
            },
            hasCommandModifier: function (t) {
              return r ? !!t.metaKey && !t.altKey : o.isCtrlKeyCommand(t);
            },
          };
        t.exports = o;
      },
      7018: (t, e, n) => {
        "use strict";
        var r = n(9938),
          o = n(2242),
          i = (n(1381), n(286)),
          a = n(6408),
          s = {
            currentBlockContainsLink: function (t) {
              var e = t.getSelection(),
                n = t.getCurrentContent(),
                r = n.getEntityMap();
              return n
                .getBlockForKey(e.getAnchorKey())
                .getCharacterList()
                .slice(e.getStartOffset(), e.getEndOffset())
                .some(function (t) {
                  var e = t.getEntity();
                  return !!e && "LINK" === r.__get(e).getType();
                });
            },
            getCurrentBlockType: function (t) {
              var e = t.getSelection();
              return t
                .getCurrentContent()
                .getBlockForKey(e.getStartKey())
                .getType();
            },
            getDataObjectForLinkURL: function (t) {
              return { url: t.toString() };
            },
            handleKeyCommand: function (t, e) {
              switch (e) {
                case "bold":
                  return s.toggleInlineStyle(t, "BOLD");
                case "italic":
                  return s.toggleInlineStyle(t, "ITALIC");
                case "underline":
                  return s.toggleInlineStyle(t, "UNDERLINE");
                case "code":
                  return s.toggleCode(t);
                case "backspace":
                case "backspace-word":
                case "backspace-to-start-of-line":
                  return s.onBackspace(t);
                case "delete":
                case "delete-word":
                case "delete-to-end-of-block":
                  return s.onDelete(t);
                default:
                  return null;
              }
            },
            insertSoftNewline: function (t) {
              var e = r.insertText(
                  t.getCurrentContent(),
                  t.getSelection(),
                  "\n",
                  t.getCurrentInlineStyle(),
                  null,
                ),
                n = o.push(t, e, "insert-characters");
              return o.forceSelection(n, e.getSelectionAfter());
            },
            onBackspace: function (t) {
              var e = t.getSelection();
              if (!e.isCollapsed() || e.getAnchorOffset() || e.getFocusOffset())
                return null;
              var n = t.getCurrentContent(),
                r = e.getStartKey(),
                i = n.getBlockBefore(r);
              if (i && "atomic" === i.getType()) {
                var a = n.getBlockMap().delete(i.getKey()),
                  c = n.merge({ blockMap: a, selectionAfter: e });
                if (c !== n) return o.push(t, c, "remove-range");
              }
              var u = s.tryToRemoveBlockStyle(t);
              return u ? o.push(t, u, "change-block-type") : null;
            },
            onDelete: function (t) {
              var e = t.getSelection();
              if (!e.isCollapsed()) return null;
              var n = t.getCurrentContent(),
                i = e.getStartKey(),
                a = n.getBlockForKey(i).getLength();
              if (e.getStartOffset() < a) return null;
              var s = n.getBlockAfter(i);
              if (!s || "atomic" !== s.getType()) return null;
              var c = e.merge({
                  focusKey: s.getKey(),
                  focusOffset: s.getLength(),
                }),
                u = r.removeRange(n, c, "forward");
              return u !== n ? o.push(t, u, "remove-range") : null;
            },
            onTab: function (t, e, n) {
              var r = e.getSelection(),
                a = r.getAnchorKey();
              if (a !== r.getFocusKey()) return e;
              var s = e.getCurrentContent(),
                c = s.getBlockForKey(a),
                u = c.getType();
              if ("unordered-list-item" !== u && "ordered-list-item" !== u)
                return e;
              t.preventDefault();
              var l = s.getBlockBefore(a);
              if (!l) return e;
              var f = l.getType();
              if ("unordered-list-item" !== f && "ordered-list-item" !== f)
                return e;
              var p = c.getDepth();
              if (!t.shiftKey && p === n) return e;
              n = Math.min(l.getDepth() + 1, n);
              var d = i(s, r, t.shiftKey ? -1 : 1, n);
              return o.push(e, d, "adjust-depth");
            },
            toggleBlockType: function (t, e) {
              var n = t.getSelection(),
                i = n.getStartKey(),
                s = n.getEndKey(),
                c = t.getCurrentContent(),
                u = n;
              if (i !== s && 0 === n.getEndOffset()) {
                var l = a(c.getBlockBefore(s));
                (s = l.getKey()),
                  (u = u.merge({
                    anchorKey: i,
                    anchorOffset: n.getStartOffset(),
                    focusKey: s,
                    focusOffset: l.getLength(),
                    isBackward: !1,
                  }));
              }
              if (
                c
                  .getBlockMap()
                  .skipWhile(function (t, e) {
                    return e !== i;
                  })
                  .reverse()
                  .skipWhile(function (t, e) {
                    return e !== s;
                  })
                  .some(function (t) {
                    return "atomic" === t.getType();
                  })
              )
                return t;
              var f = c.getBlockForKey(i).getType() === e ? "unstyled" : e;
              return o.push(t, r.setBlockType(c, u, f), "change-block-type");
            },
            toggleCode: function (t) {
              var e = t.getSelection(),
                n = e.getAnchorKey(),
                r = e.getFocusKey();
              return e.isCollapsed() || n !== r
                ? s.toggleBlockType(t, "code-block")
                : s.toggleInlineStyle(t, "CODE");
            },
            toggleInlineStyle: function (t, e) {
              var n = t.getSelection(),
                i = t.getCurrentInlineStyle();
              if (n.isCollapsed())
                return o.setInlineStyleOverride(
                  t,
                  i.has(e) ? i.remove(e) : i.add(e),
                );
              var a,
                s = t.getCurrentContent();
              return (
                (a = i.has(e)
                  ? r.removeInlineStyle(s, n, e)
                  : r.applyInlineStyle(s, n, e)),
                o.push(t, a, "change-inline-style")
              );
            },
            toggleLink: function (t, e, n) {
              var i = r.applyEntity(t.getCurrentContent(), e, n);
              return o.push(t, i, "apply-entity");
            },
            tryToRemoveBlockStyle: function (t) {
              var e = t.getSelection(),
                n = e.getAnchorOffset();
              if (e.isCollapsed() && 0 === n) {
                var o = e.getAnchorKey(),
                  i = t.getCurrentContent(),
                  a = i.getBlockForKey(o),
                  s = i.getFirstBlock();
                if (a.getLength() > 0 && a !== s) return null;
                var c = a.getType(),
                  u = i.getBlockBefore(o);
                if (
                  "code-block" === c &&
                  u &&
                  "code-block" === u.getType() &&
                  0 !== u.getLength()
                )
                  return null;
                if ("unstyled" !== c) return r.setBlockType(i, e, "unstyled");
              }
              return null;
            },
          };
        t.exports = s;
      },
      5170: (t, e, n) => {
        "use strict";
        var r = n(9938),
          o = n(2242),
          i = n(866),
          a = n(6408),
          s = null,
          c = {
            cut: function (t) {
              var e = t.getCurrentContent(),
                n = t.getSelection(),
                c = null;
              if (n.isCollapsed()) {
                var u = n.getAnchorKey(),
                  l = e.getBlockForKey(u).getLength();
                if (l === n.getAnchorOffset()) return t;
                c = n.set("focusOffset", l);
              } else c = n;
              (c = a(c)), (s = i(e, c));
              var f = r.removeRange(e, c, "forward");
              return f === e ? t : o.push(t, f, "remove-range");
            },
            paste: function (t) {
              if (!s) return t;
              var e = r.replaceWithFragment(
                t.getCurrentContent(),
                t.getSelection(),
                s,
              );
              return o.push(t, e, "insert-fragment");
            },
          };
        t.exports = c;
      },
      1381: (t, e, n) => {
        "use strict";
        var r = (function (t) {
          function e() {
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              (function (t, e) {
                if (!t)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !e || ("object" != typeof e && "function" != typeof e)
                  ? t
                  : e;
              })(this, t.apply(this, arguments))
            );
          }
          return (
            (function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof e,
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e));
            })(e, t),
            (e.prototype.serialize = function () {
              return (
                "Anchor: " +
                this.getAnchorKey() +
                ":" +
                this.getAnchorOffset() +
                ", Focus: " +
                this.getFocusKey() +
                ":" +
                this.getFocusOffset() +
                ", Is Backward: " +
                String(this.getIsBackward()) +
                ", Has Focus: " +
                String(this.getHasFocus())
              );
            }),
            (e.prototype.getAnchorKey = function () {
              return this.get("anchorKey");
            }),
            (e.prototype.getAnchorOffset = function () {
              return this.get("anchorOffset");
            }),
            (e.prototype.getFocusKey = function () {
              return this.get("focusKey");
            }),
            (e.prototype.getFocusOffset = function () {
              return this.get("focusOffset");
            }),
            (e.prototype.getIsBackward = function () {
              return this.get("isBackward");
            }),
            (e.prototype.getHasFocus = function () {
              return this.get("hasFocus");
            }),
            (e.prototype.hasEdgeWithin = function (t, e, n) {
              var r = this.getAnchorKey(),
                o = this.getFocusKey();
              if (r === o && r === t) {
                var i = this.getStartOffset();
                return e <= this.getEndOffset() && i <= n;
              }
              if (t !== r && t !== o) return !1;
              var a = t === r ? this.getAnchorOffset() : this.getFocusOffset();
              return e <= a && n >= a;
            }),
            (e.prototype.isCollapsed = function () {
              return (
                this.getAnchorKey() === this.getFocusKey() &&
                this.getAnchorOffset() === this.getFocusOffset()
              );
            }),
            (e.prototype.getStartKey = function () {
              return this.getIsBackward()
                ? this.getFocusKey()
                : this.getAnchorKey();
            }),
            (e.prototype.getStartOffset = function () {
              return this.getIsBackward()
                ? this.getFocusOffset()
                : this.getAnchorOffset();
            }),
            (e.prototype.getEndKey = function () {
              return this.getIsBackward()
                ? this.getAnchorKey()
                : this.getFocusKey();
            }),
            (e.prototype.getEndOffset = function () {
              return this.getIsBackward()
                ? this.getAnchorOffset()
                : this.getFocusOffset();
            }),
            (e.createEmpty = function (t) {
              return new e({
                anchorKey: t,
                anchorOffset: 0,
                focusKey: t,
                focusOffset: 0,
                isBackward: !1,
                hasFocus: !1,
              });
            }),
            e
          );
        })(
          (0, n(9404).Record)({
            anchorKey: "",
            anchorOffset: 0,
            focusKey: "",
            focusOffset: 0,
            isBackward: !1,
            hasFocus: !1,
          }),
        );
        t.exports = r;
      },
      286: (t) => {
        "use strict";
        t.exports = function (t, e, n, r) {
          var o = e.getStartKey(),
            i = e.getEndKey(),
            a = t.getBlockMap(),
            s = a
              .toSeq()
              .skipUntil(function (t, e) {
                return e === o;
              })
              .takeUntil(function (t, e) {
                return e === i;
              })
              .concat([[i, a.get(i)]])
              .map(function (t) {
                var e = t.getDepth() + n;
                return (e = Math.max(0, Math.min(e, r))), t.set("depth", e);
              });
          return (
            (a = a.merge(s)),
            t.merge({ blockMap: a, selectionBefore: e, selectionAfter: e })
          );
        };
      },
      1952: (t, e, n) => {
        "use strict";
        var r = n(3018);
        t.exports = function (t, e, n, o) {
          for (var i = t.getCharacterList(); e < n; )
            (i = i.set(e, r.applyEntity(i.get(e), o))), e++;
          return t.set("characterList", i);
        };
      },
      6416: (t, e, n) => {
        "use strict";
        var r = n(9404),
          o = n(1952);
        t.exports = function (t, e, n) {
          var i = t.getBlockMap(),
            a = e.getStartKey(),
            s = e.getStartOffset(),
            c = e.getEndKey(),
            u = e.getEndOffset(),
            l = i
              .skipUntil(function (t, e) {
                return e === a;
              })
              .takeUntil(function (t, e) {
                return e === c;
              })
              .toOrderedMap()
              .merge(r.OrderedMap([[c, i.get(c)]]))
              .map(function (t, e) {
                var r = e === a ? s : 0,
                  i = e === c ? u : t.getLength();
                return o(t, r, i, n);
              });
          return t.merge({
            blockMap: i.merge(l),
            selectionBefore: e,
            selectionAfter: e,
          });
        };
      },
      7470: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(6840),
          i = n(5224),
          a = n(1439),
          s = n(5481),
          c = n(702),
          u = n(646),
          l = function (t, e) {
            return {
              key: t.getKey(),
              text: t.getText(),
              type: t.getType(),
              depth: t.getDepth(),
              inlineStyleRanges: c(t),
              entityRanges: s(t, e),
              data: t.getData().toObject(),
            };
          };
        t.exports = function (t) {
          var e = { entityMap: {}, blocks: [] };
          return (
            (e = (function (t, e) {
              var n = e.blocks,
                r = e.entityMap,
                o = {};
              return (
                Object.keys(r).forEach(function (e, n) {
                  var r = t.getEntity(a.unstringify(e));
                  o[n] = {
                    type: r.getType(),
                    mutability: r.getMutability(),
                    data: r.getData(),
                  };
                }),
                { blocks: n, entityMap: o }
              );
            })(
              t,
              (e = (function (t, e) {
                var n = e.entityMap,
                  s = [],
                  c = {},
                  f = {},
                  p = 0;
                return (
                  t.getBlockMap().forEach(function (t) {
                    t.findEntityRanges(
                      function (t) {
                        return null !== t.getEntity();
                      },
                      function (e) {
                        var r = t.getEntityAt(e),
                          o = a.stringify(r);
                        f[o] || ((f[o] = r), (n[o] = "" + p), p++);
                      },
                    ),
                      (function (t, e, n, a) {
                        if (t instanceof o) n.push(l(t, e));
                        else {
                          t instanceof i || u(!1);
                          var s = t.getParentKey(),
                            c = (a[t.getKey()] = r({}, l(t, e), {
                              children: [],
                            }));
                          s ? a[s].children.push(c) : n.push(c);
                        }
                      })(t, n, s, c);
                  }),
                  { blocks: s, entityMap: n }
                );
              })(t, e)),
            )),
            e
          );
        };
      },
      4712: (t, e, n) => {
        "use strict";
        var r,
          o =
            i ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          i = n(5228);
        function a(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var s = n(3018),
          c = n(6840),
          u = n(5224),
          l = n(3387),
          f = n(1608),
          p = n(2938),
          d = n(9404),
          h = n(9404).Set,
          g = n(5324),
          y = n(8003),
          m = n(6991),
          v = n(9248),
          b = n(646),
          S = n(1721),
          _ = p.draft_tree_data_support,
          E = d.List,
          w = d.OrderedSet,
          C = " ",
          k = new RegExp("\r", "g"),
          x = new RegExp("\n", "g"),
          T = new RegExp("&nbsp;", "g"),
          O = new RegExp("&#13;?", "g"),
          D = new RegExp("&#8203;?", "g"),
          R = ["bold", "bolder", "500", "600", "700", "800", "900"],
          M = ["light", "lighter", "100", "200", "300", "400"],
          A = {
            b: "BOLD",
            code: "CODE",
            del: "STRIKETHROUGH",
            em: "ITALIC",
            i: "ITALIC",
            s: "STRIKETHROUGH",
            strike: "STRIKETHROUGH",
            strong: "BOLD",
            u: "UNDERLINE",
          },
          I =
            (a((r = {}), y("public/DraftStyleDefault/depth0"), 0),
            a(r, y("public/DraftStyleDefault/depth1"), 1),
            a(r, y("public/DraftStyleDefault/depth2"), 2),
            a(r, y("public/DraftStyleDefault/depth3"), 3),
            a(r, y("public/DraftStyleDefault/depth4"), 4),
            r),
          B = ["className", "href", "rel", "target", "title"],
          K = ["alt", "className", "height", "src", "width"],
          L = void 0,
          N = { text: "", inlines: [], entities: [], blocks: [] },
          P = { children: E(), depth: 0, key: "", type: "" },
          F = function (t, e) {
            return "li" === t
              ? "ol" === e
                ? "ordered-list-item"
                : "unordered-list-item"
              : null;
          },
          U = function (t, e, n) {
            var r = n
              .filter(function (e) {
                return (
                  e.element === t ||
                  e.wrapper === t ||
                  (e.aliasedElements &&
                    e.aliasedElements.some(function (e) {
                      return e === t;
                    }))
                );
              })
              .keySeq()
              .toSet()
              .toArray()
              .sort();
            switch (r.length) {
              case 0:
                return "unstyled";
              case 1:
                return r[0];
              default:
                return (
                  (function (t, e, n) {
                    for (var r = 0; r < n.length; r++) {
                      var o = n[r](t, e);
                      if (o) return o;
                    }
                    return null;
                  })(t, e, [F]) || "unstyled"
                );
            }
          },
          j = function (t, e, n) {
            var r = t.text.slice(-1),
              o = e.text.slice(0, 1);
            if (
              ("\r" !== r ||
                "\r" !== o ||
                n ||
                ((t.text = t.text.slice(0, -1)),
                t.inlines.pop(),
                t.entities.pop(),
                t.blocks.pop()),
              "\r" === r)
            ) {
              if (e.text === C || "\n" === e.text) return t;
              (o !== C && "\n" !== o) ||
                ((e.text = e.text.slice(1)),
                e.inlines.shift(),
                e.entities.shift());
            }
            return {
              text: t.text + e.text,
              inlines: t.inlines.concat(e.inlines),
              entities: t.entities.concat(e.entities),
              blocks: t.blocks.concat(e.blocks),
            };
          },
          z = function (t) {
            t instanceof HTMLAnchorElement || b(!1);
            var e = t.protocol;
            return "http:" === e || "https:" === e || "mailto:" === e;
          },
          H = function (t) {
            var e = new Array(1);
            return (
              t && (e[0] = t),
              o({}, N, { text: C, inlines: [w()], entities: e })
            );
          },
          q = function () {
            return o({}, N, {
              text: "\n",
              inlines: [w()],
              entities: new Array(1),
            });
          },
          W = function () {
            return o(
              {},
              P,
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            );
          },
          $ = function (t, e) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            return {
              text: "\r",
              inlines: [w()],
              entities: new Array(1),
              blocks: [
                W({
                  parent: n,
                  key: m(),
                  type: t,
                  depth: Math.max(0, Math.min(4, e)),
                }),
              ],
            };
          },
          V = function t(e, n, r, i, a, s, c, u, l, p) {
            var d = L,
              h = n.nodeName.toLowerCase(),
              y = e,
              m = "unstyled",
              v = !1,
              b = a && U(a, i, u),
              S = o({}, N),
              E = void 0;
            if ("#text" === h) {
              var w = n.textContent,
                k = w.trim();
              if (i && "" === k && n.parentElement) {
                var T = n.parentElement.nodeName.toLowerCase();
                if ("ol" === T || "ul" === T)
                  return { chunk: o({}, N), entityMap: e };
              }
              return "" === k && "pre" !== a
                ? { chunk: H(l), entityMap: e }
                : ("pre" !== a && (w = w.replace(x, C)),
                  (L = h),
                  {
                    chunk: {
                      text: w,
                      inlines: Array(w.length).fill(r),
                      entities: Array(w.length).fill(l),
                      blocks: [],
                    },
                    entityMap: e,
                  });
            }
            if (((L = h), "br" === h))
              return "br" !== d || (a && "unstyled" !== b)
                ? { chunk: q(), entityMap: e }
                : { chunk: $("unstyled", c, p), entityMap: e };
            if (
              "img" === h &&
              n instanceof HTMLImageElement &&
              n.attributes.getNamedItem("src") &&
              n.attributes.getNamedItem("src").value
            ) {
              var O = n,
                D = {};
              K.forEach(function (t) {
                var e = O.getAttribute(t);
                e && (D[t] = e);
              }),
                (n.textContent = "📷"),
                (l = f.__create("IMAGE", "MUTABLE", D || {}));
            }
            (r = (function (t, e, n) {
              var r = A[t];
              if (r) n = n.add(r).toOrderedSet();
              else if (e instanceof HTMLElement) {
                var o = e;
                n = n
                  .withMutations(function (t) {
                    var e = o.style.fontWeight,
                      n = o.style.fontStyle,
                      r = o.style.textDecoration;
                    R.indexOf(e) >= 0
                      ? t.add("BOLD")
                      : M.indexOf(e) >= 0 && t.remove("BOLD"),
                      "italic" === n
                        ? t.add("ITALIC")
                        : "normal" === n && t.remove("ITALIC"),
                      "underline" === r && t.add("UNDERLINE"),
                      "line-through" === r && t.add("STRIKETHROUGH"),
                      "none" === r &&
                        (t.remove("UNDERLINE"), t.remove("STRIKETHROUGH"));
                  })
                  .toOrderedSet();
              }
              return n;
            })(h, n, r)),
              ("ul" !== h && "ol" !== h) || (i && (c += 1), (i = h)),
              !_ &&
                "li" === h &&
                n instanceof HTMLElement &&
                (c = (function (t) {
                  var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 0;
                  return (
                    Object.keys(I).some(function (n) {
                      t.classList.contains(n) && (e = I[n]);
                    }),
                    e
                  );
                })(n, c));
            var P = U(h, i, u),
              F = i && "li" === a && "li" === h,
              W = (!a || _) && -1 !== s.indexOf(h);
            (F || W) &&
              ((E = (S = $(P, c, p)).blocks[0].key), (a = h), (v = !_)),
              F &&
                (m = "ul" === i ? "unordered-list-item" : "ordered-list-item");
            var V = n.firstChild;
            null != V && (h = V.nodeName.toLowerCase());
            for (var G = null; V; ) {
              V instanceof HTMLAnchorElement && V.href && z(V)
                ? (function () {
                    var t = V,
                      e = {};
                    B.forEach(function (n) {
                      var r = t.getAttribute(n);
                      r && (e[n] = r);
                    }),
                      (e.url = new g(t.href).toString()),
                      (G = f.__create("LINK", "MUTABLE", e || {}));
                  })()
                : (G = void 0);
              var Z = t(y, V, r, i, a, s, c, u, G || l, _ ? E : null),
                J = Z.chunk;
              (y = Z.entityMap), (S = j(S, J, _));
              var Y = V.nextSibling;
              !p && Y && s.indexOf(h) >= 0 && a && (S = j(S, q())),
                Y && (h = Y.nodeName.toLowerCase()),
                (V = Y);
            }
            return v && (S = j(S, $(m, c, p))), { chunk: S, entityMap: y };
          },
          G = function (t, e, n, r) {
            t = t
              .trim()
              .replace(k, "")
              .replace(T, C)
              .replace(O, "")
              .replace(D, "");
            var i = (function (t) {
                var e = t.get("unstyled").element,
                  n = h([]);
                return (
                  t.forEach(function (t) {
                    t.aliasedElements &&
                      t.aliasedElements.forEach(function (t) {
                        n = n.add(t);
                      }),
                      (n = n.add(t.element));
                  }),
                  n
                    .filter(function (t) {
                      return t && t !== e;
                    })
                    .toArray()
                    .sort()
                );
              })(n),
              a = e(t);
            if (!a) return null;
            L = null;
            var s = (function (t, e) {
                return e.some(function (e) {
                  return -1 !== t.indexOf("<" + e);
                });
              })(t, i)
                ? i
                : ["div"],
              c = V(r, a, w(), "ul", null, s, -1, n),
              u = c.chunk,
              l = c.entityMap;
            return (
              0 === u.text.indexOf("\r") &&
                (u = {
                  text: u.text.slice(1),
                  inlines: u.inlines.slice(1),
                  entities: u.entities.slice(1),
                  blocks: u.blocks,
                }),
              "\r" === u.text.slice(-1) &&
                ((u.text = u.text.slice(0, -1)),
                (u.inlines = u.inlines.slice(0, -1)),
                (u.entities = u.entities.slice(0, -1)),
                u.blocks.pop()),
              0 === u.blocks.length &&
                u.blocks.push(o({}, N, { type: "unstyled", depth: 0 })),
              u.text.split("\r").length === u.blocks.length + 1 &&
                u.blocks.unshift({ type: "unstyled", depth: 0 }),
              { chunk: u, entityMap: l }
            );
          };
        t.exports = function (t) {
          var e = G(
            t,
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : v,
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l,
            f,
          );
          if (null == e) return null;
          var n = e.chunk,
            r = e.entityMap,
            o = (function (t) {
              if (!t || !t.text || !Array.isArray(t.blocks)) return null;
              var e = 0,
                n = t.blocks,
                r = t.inlines,
                o = t.entities,
                i = _ ? u : c;
              return t.text.split("\r").reduce(
                function (t, a, c) {
                  a = S(a);
                  var l = n[c],
                    f = e + a.length,
                    p = r.slice(e, f),
                    d = o.slice(e, f),
                    h = E(
                      p.map(function (t, e) {
                        var n = { style: t, entity: null };
                        return d[e] && (n.entity = d[e]), s.create(n);
                      }),
                    );
                  e = f + 1;
                  var g = l.depth,
                    y = l.type,
                    v = l.parent,
                    b = l.key || m(),
                    _ = null;
                  if (v) {
                    var w = t.cacheRef[v],
                      C = t.contentBlocks[w];
                    if (C.getChildKeys().isEmpty() && C.getText()) {
                      var k = C.getCharacterList(),
                        x = C.getText();
                      _ = m();
                      var T = new u({
                        key: _,
                        text: x,
                        characterList: k,
                        parent: v,
                        nextSibling: b,
                      });
                      t.contentBlocks.push(T),
                        (C = C.withMutations(function (t) {
                          t.set("characterList", E())
                            .set("text", "")
                            .set("children", C.children.push(T.getKey()));
                        }));
                    }
                    t.contentBlocks[w] = C.set("children", C.children.push(b));
                  }
                  var O = new i({
                    key: b,
                    parent: v,
                    type: y,
                    depth: g,
                    text: a,
                    characterList: h,
                    prevSibling:
                      _ ||
                      (0 === c || n[c - 1].parent !== v ? null : n[c - 1].key),
                    nextSibling:
                      c === n.length - 1 || n[c + 1].parent !== v
                        ? null
                        : n[c + 1].key,
                  });
                  return t.contentBlocks.push(O), (t.cacheRef[O.key] = c), t;
                },
                { cacheRef: {}, contentBlocks: [] },
              ).contentBlocks;
            })(n);
          return { contentBlocks: o, entityMap: r };
        };
      },
      428: (t, e, n) => {
        "use strict";
        var r =
            n(5228) ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            },
          o = n(6840),
          i = n(5224),
          a = n(7656),
          s = n(1608),
          c = n(2938),
          u = n(2396),
          l = n(9404),
          f = n(1381),
          p = n(803),
          d = n(2401),
          h = n(3830),
          g = n(6991),
          y = n(646),
          m = c.draft_tree_data_support,
          v = l.List,
          b = l.Map,
          S = l.OrderedMap,
          _ = function (t, e) {
            var n = t.key,
              r = t.type,
              o = t.data;
            return {
              text: t.text,
              depth: t.depth || 0,
              type: r || "unstyled",
              key: n || g(),
              data: b(o),
              characterList: E(t, e),
            };
          },
          E = function (t, e) {
            var n = t.text,
              o = t.entityRanges,
              i = t.inlineStyleRanges,
              a = o || [];
            return p(
              h(n, i || []),
              d(
                n,
                a
                  .filter(function (t) {
                    return e.hasOwnProperty(t.key);
                  })
                  .map(function (t) {
                    return r({}, t, { key: e[t.key] });
                  }),
              ),
            );
          },
          w = function (t) {
            return r({}, t, { key: t.key || g() });
          },
          C = function (t, e, n) {
            var o = e.map(function (t) {
              return r({}, t, { parentRef: n });
            });
            return t.concat(o.reverse());
          };
        t.exports = function (t) {
          Array.isArray(t.blocks) || y(!1);
          var e = (function (t) {
              var e = t.entityMap,
                n = {};
              return (
                Object.keys(e).forEach(function (t) {
                  var r = e[t],
                    o = r.type,
                    i = r.mutability,
                    a = r.data;
                  n[t] = s.__create(o, i, a || {});
                }),
                n
              );
            })(t),
            n = (function (t, e) {
              var n = Array.isArray(t.blocks[0].children),
                a = m && !n ? u.fromRawStateToRawTreeState(t).blocks : t.blocks;
              return m
                ? (function (t, e) {
                    return t.map(w).reduce(function (n, o, a) {
                      Array.isArray(o.children) || y(!1);
                      var s = o.children.map(w),
                        c = new i(
                          r({}, _(o, e), {
                            prevSibling: 0 === a ? null : t[a - 1].key,
                            nextSibling:
                              a === t.length - 1 ? null : t[a + 1].key,
                            children: v(
                              s.map(function (t) {
                                return t.key;
                              }),
                            ),
                          }),
                        );
                      n = n.set(c.getKey(), c);
                      for (var u = C([], s, c); u.length > 0; ) {
                        var l = u.pop(),
                          f = l.parentRef,
                          p = f.getChildKeys(),
                          d = p.indexOf(l.key),
                          h = Array.isArray(l.children);
                        if (!h) {
                          h || y(!1);
                          break;
                        }
                        var g = l.children.map(w),
                          m = new i(
                            r({}, _(l, e), {
                              parent: f.getKey(),
                              children: v(
                                g.map(function (t) {
                                  return t.key;
                                }),
                              ),
                              prevSibling: 0 === d ? null : p.get(d - 1),
                              nextSibling:
                                d === p.size - 1 ? null : p.get(d + 1),
                            }),
                          );
                        (n = n.set(m.getKey(), m)), (u = C(u, g, m));
                      }
                      return n;
                    }, S());
                  })(a, e)
                : (function (t, e) {
                    return S(
                      t.map(function (t) {
                        var n = new o(_(t, e));
                        return [n.getKey(), n];
                      }),
                    );
                  })(n ? u.fromRawTreeStateToRawState(t).blocks : a, e);
            })(t, e),
            c = n.isEmpty() ? new f() : f.createEmpty(n.first().getKey());
          return new a({
            blockMap: n,
            entityMap: e,
            selectionBefore: c,
            selectionAfter: c,
          });
        };
      },
      803: (t, e, n) => {
        "use strict";
        var r = n(3018),
          o = n(9404).List;
        t.exports = function (t, e) {
          var n = t.map(function (t, n) {
            var o = e[n];
            return r.create({ style: t, entity: o });
          });
          return o(n);
        };
      },
      2401: (t, e, n) => {
        "use strict";
        var r = n(580).substr;
        t.exports = function (t, e) {
          var n = Array(t.length).fill(null);
          return (
            e &&
              e.forEach(function (e) {
                for (
                  var o = r(t, 0, e.offset).length,
                    i = o + r(t, e.offset, e.length).length,
                    a = o;
                  a < i;
                  a++
                )
                  n[a] = e.key;
              }),
            n
          );
        };
      },
      3830: (t, e, n) => {
        "use strict";
        var r = n(9404).OrderedSet,
          o = n(580).substr,
          i = r();
        t.exports = function (t, e) {
          var n = Array(t.length).fill(i);
          return (
            e &&
              e.forEach(function (e) {
                for (
                  var r = o(t, 0, e.offset).length,
                    i = r + o(t, e.offset, e.length).length;
                  r < i;

                )
                  (n[r] = n[r].add(e.style)), r++;
              }),
            n
          );
        };
      },
      3722: (t, e, n) => {
        "use strict";
        var r = n(9981),
          o = n(9938),
          i = n(2242),
          a = n(4134),
          s = n(9927),
          c = n(3680),
          u = n(7759),
          l = n(6408),
          f = n(9765),
          p = a.isBrowser("Firefox");
        function d(t, e, n, r) {
          var a = o.replaceText(
            t.getCurrentContent(),
            t.getSelection(),
            e,
            n,
            r,
          );
          return i.push(t, a, "insert-characters");
        }
        t.exports = function (t, e) {
          void 0 !== t._pendingStateFromBeforeInput &&
            (t.update(t._pendingStateFromBeforeInput),
            (t._pendingStateFromBeforeInput = void 0));
          var o = t._latestEditorState,
            a = e.data;
          if (a)
            if (t.props.handleBeforeInput && c(t.props.handleBeforeInput(a, o)))
              e.preventDefault();
            else {
              var h = o.getSelection(),
                g = h.getStartOffset(),
                y = h.getEndOffset(),
                m = h.getAnchorKey();
              if (!h.isCollapsed())
                return (
                  e.preventDefault(),
                  void (a === o.getCurrentContent().getPlainText().slice(g, y)
                    ? t.update(i.forceSelection(o, h.merge({ focusOffset: y })))
                    : t.update(
                        d(
                          o,
                          a,
                          o.getCurrentInlineStyle(),
                          s(o.getCurrentContent(), o.getSelection()),
                        ),
                      ))
                );
              var v,
                b = d(
                  o,
                  a,
                  o.getCurrentInlineStyle(),
                  s(o.getCurrentContent(), o.getSelection()),
                ),
                S = !1;
              if ((S || (S = u(t._latestCommittedEditorState)), !S)) {
                var _ = n.g.getSelection();
                if (_.anchorNode && _.anchorNode.nodeType === Node.TEXT_NODE) {
                  var E = _.anchorNode.parentNode;
                  S =
                    "SPAN" === E.nodeName &&
                    E.firstChild.nodeType === Node.TEXT_NODE &&
                    -1 !== E.firstChild.nodeValue.indexOf("\t");
                }
              }
              if (
                (S ||
                  (S =
                    r.getFingerprint(o.getBlockTree(m)) !==
                    r.getFingerprint(b.getBlockTree(m))),
                S || ((v = a), (S = p && ("'" == v || "/" == v))),
                S ||
                  (S =
                    l(b.getDirectionMap()).get(m) !==
                    l(o.getDirectionMap()).get(m)),
                S)
              )
                return e.preventDefault(), void t.update(b);
              (b = i.set(b, {
                nativelyRenderedContent: b.getCurrentContent(),
              })),
                (t._pendingStateFromBeforeInput = b),
                f(function () {
                  void 0 !== t._pendingStateFromBeforeInput &&
                    (t.update(t._pendingStateFromBeforeInput),
                    (t._pendingStateFromBeforeInput = void 0));
                });
            }
        };
      },
      8058: (t, e, n) => {
        "use strict";
        var r = n(2242),
          o = n(4909),
          i = n(9758);
        t.exports = function (t, e) {
          if (i() === document.body) {
            var a = n.g.getSelection(),
              s = t.editor;
            1 === a.rangeCount &&
              o(s, a.anchorNode) &&
              o(s, a.focusNode) &&
              a.removeAllRanges();
          }
          var c = t._latestEditorState,
            u = c.getSelection();
          if (u.getHasFocus()) {
            var l = u.set("hasFocus", !1);
            t.props.onBlur && t.props.onBlur(e),
              t.update(r.acceptSelection(c, l));
          }
        };
      },
      7141: (t, e, n) => {
        "use strict";
        var r = n(2242);
        t.exports = function (t, e) {
          t.setMode("composite"),
            t.update(r.set(t._latestEditorState, { inCompositionMode: !0 })),
            t._onCompositionStart(e);
        };
      },
      3694: (t, e, n) => {
        "use strict";
        var r = n(1296);
        t.exports = function (t, e) {
          t._latestEditorState.getSelection().isCollapsed()
            ? e.preventDefault()
            : t.setClipboard(r(t._latestEditorState));
        };
      },
      3919: (t, e, n) => {
        "use strict";
        var r = n(9938),
          o = n(2242),
          i = n(2935),
          a = n(1296),
          s = n(7392);
        t.exports = function (t, e) {
          var n = t._latestEditorState,
            c = n.getSelection(),
            u = e.target,
            l = void 0;
          if (c.isCollapsed()) e.preventDefault();
          else {
            u instanceof Node && (l = s(i.getScrollParent(u)));
            var f = a(n);
            t.setClipboard(f),
              t.setMode("cut"),
              setTimeout(function () {
                t.restoreEditorDOM(l),
                  t.exitCurrentMode(),
                  t.update(
                    (function (t) {
                      var e = r.removeRange(
                        t.getCurrentContent(),
                        t.getSelection(),
                        "forward",
                      );
                      return o.push(t, e, "remove-range");
                    })(n),
                  );
              }, 0);
          }
        };
      },
      6127: (t) => {
        "use strict";
        t.exports = function (t, e) {
          (t._internalDrag = !1), t.setMode("drag"), e.preventDefault();
        };
      },
      4861: (t) => {
        "use strict";
        t.exports = function (t) {
          (t._internalDrag = !0), t.setMode("drag");
        };
      },
      4447: (t, e, n) => {
        "use strict";
        var r = n(2242),
          o = n(4134);
        t.exports = function (t, e) {
          var n = t._latestEditorState,
            i = n.getSelection();
          if (!i.getHasFocus()) {
            var a = i.set("hasFocus", !0);
            t.props.onFocus && t.props.onFocus(e),
              o.isBrowser("Chrome < 60.0.3081.0")
                ? t.update(r.forceSelection(n, a))
                : t.update(r.acceptSelection(n, a));
          }
        };
      },
      5091: (t, e, n) => {
        "use strict";
        var r = n(2938),
          o = n(9938),
          i = n(3885),
          a = n(2242),
          s = n(4134),
          c = n(8372),
          u = n(6408),
          l = s.isEngine("Gecko");
        t.exports = function (t) {
          void 0 !== t._pendingStateFromBeforeInput &&
            (t.update(t._pendingStateFromBeforeInput),
            (t._pendingStateFromBeforeInput = void 0));
          var e = n.g.getSelection(),
            s = e.anchorNode,
            f = e.isCollapsed,
            p = s.nodeType !== Node.TEXT_NODE,
            d =
              s.nodeType !== Node.TEXT_NODE && s.nodeType !== Node.ELEMENT_NODE;
          if (r.draft_killswitch_allow_nontextnodes) {
            if (p) return;
          } else if (d) return;
          if (
            s.nodeType === Node.TEXT_NODE &&
            (null !== s.previousSibling || null !== s.nextSibling)
          ) {
            var h = s.parentNode;
            s.nodeValue = h.textContent;
            for (var g = h.firstChild; null !== g; g = g.nextSibling)
              g !== s && h.removeChild(g);
          }
          var y = s.textContent,
            m = t._latestEditorState,
            v = u(c(s)),
            b = i.decode(v),
            S = b.blockKey,
            _ = b.decoratorKey,
            E = b.leafKey,
            w = m.getBlockTree(S).getIn([_, "leaves", E]),
            C = w.start,
            k = w.end,
            x = m.getCurrentContent(),
            T = x.getBlockForKey(S),
            O = T.getText().slice(C, k);
          if ((y.endsWith("\n\n") && (y = y.slice(0, -1)), y !== O)) {
            var D,
              R,
              M,
              A,
              I = m.getSelection(),
              B = I.merge({ anchorOffset: C, focusOffset: k, isBackward: !1 }),
              K = T.getEntityAt(C),
              L = K && x.getEntity(K),
              N = "MUTABLE" === (L && L.getMutability()),
              P = N ? "spellcheck-change" : "apply-entity",
              F = o.replaceText(
                x,
                B,
                y,
                T.getInlineStyleAt(C),
                N ? T.getEntityAt(C) : null,
              );
            if (l)
              (D = e.anchorOffset),
                (R = e.focusOffset),
                (A = (M = C + Math.min(D, R)) + Math.abs(D - R)),
                (D = M),
                (R = A);
            else {
              var U = y.length - O.length;
              (M = I.getStartOffset()),
                (A = I.getEndOffset()),
                (D = f ? A + U : M),
                (R = A + U);
            }
            var j = F.merge({
              selectionBefore: x.getSelectionAfter(),
              selectionAfter: I.merge({ anchorOffset: D, focusOffset: R }),
            });
            t.update(a.push(m, j, P));
          }
        };
      },
      8136: (t, e, n) => {
        "use strict";
        var r = n(9938),
          o = n(2242),
          i = n(9414),
          a = n(5852),
          s = n(5170),
          c = n(4134),
          u = n(3680),
          l = n(8771),
          f = n(4143),
          p = n(525),
          d = n(4071),
          h = n(5169),
          g = n(70),
          y = n(9762),
          m = n(2383),
          v = n(5935),
          b = n(8976),
          S = i.isOptionKeyCommand,
          _ = c.isBrowser("Chrome");
        t.exports = function (t, e) {
          var n = e.which,
            i = t._latestEditorState;
          switch (n) {
            case a.RETURN:
              if (
                (e.preventDefault(),
                t.props.handleReturn && u(t.props.handleReturn(e, i)))
              )
                return;
              break;
            case a.ESC:
              return (
                e.preventDefault(),
                void (t.props.onEscape && t.props.onEscape(e))
              );
            case a.TAB:
              return void (t.props.onTab && t.props.onTab(e));
            case a.UP:
              return void (t.props.onUpArrow && t.props.onUpArrow(e));
            case a.RIGHT:
              return void (t.props.onRightArrow && t.props.onRightArrow(e));
            case a.DOWN:
              return void (t.props.onDownArrow && t.props.onDownArrow(e));
            case a.LEFT:
              return void (t.props.onLeftArrow && t.props.onLeftArrow(e));
            case a.SPACE:
              if (_ && S(e)) {
                e.preventDefault();
                var c = r.replaceText(
                  i.getCurrentContent(),
                  i.getSelection(),
                  " ",
                );
                return void t.update(o.push(i, c, "insert-characters"));
              }
          }
          var E = t.props.keyBindingFn(e);
          if (E)
            if ("undo" !== E) {
              if (
                (e.preventDefault(),
                !t.props.handleKeyCommand || !u(t.props.handleKeyCommand(E, i)))
              ) {
                var w = (function (t, e) {
                  switch (t) {
                    case "redo":
                      return o.redo(e);
                    case "delete":
                      return m(e);
                    case "delete-word":
                      return p(e);
                    case "backspace":
                      return y(e);
                    case "backspace-word":
                      return f(e);
                    case "backspace-to-start-of-line":
                      return l(e);
                    case "split-block":
                      return d(e);
                    case "transpose-characters":
                      return v(e);
                    case "move-selection-to-start-of-block":
                      return g(e);
                    case "move-selection-to-end-of-block":
                      return h(e);
                    case "secondary-cut":
                      return s.cut(e);
                    case "secondary-paste":
                      return s.paste(e);
                    default:
                      return e;
                  }
                })(E, i);
                w !== i && t.update(w);
              }
            } else b(e, i, t.update);
        };
      },
      2208: (t, e, n) => {
        "use strict";
        var r = n(5748),
          o = n(3018),
          i = n(2395),
          a = n(9938),
          s = n(46),
          c = n(2242),
          u = n(7018),
          l = n(9927),
          f = n(723),
          p = n(3680),
          d = n(3676);
        function h(t, e, n) {
          var r = a.replaceWithFragment(
            t.getCurrentContent(),
            t.getSelection(),
            e,
          );
          return c.push(t, r.set("entityMap", n), "insert-fragment");
        }
        t.exports = function (t, e) {
          e.preventDefault();
          var n = new i(e.clipboardData);
          if (!n.isRichText()) {
            var g = n.getFiles(),
              y = n.getText();
            if (g.length > 0) {
              if (t.props.handlePastedFiles && p(t.props.handlePastedFiles(g)))
                return;
              return void f(g, function (e) {
                if ((e = e || y)) {
                  var n = t._latestEditorState,
                    i = d(e),
                    f = o.create({
                      style: n.getCurrentInlineStyle(),
                      entity: l(n.getCurrentContent(), n.getSelection()),
                    }),
                    p = u.getCurrentBlockType(n),
                    h = s.processText(i, f, p),
                    g = r.createFromArray(h),
                    m = a.replaceWithFragment(
                      n.getCurrentContent(),
                      n.getSelection(),
                      g,
                    );
                  t.update(c.push(n, m, "insert-fragment"));
                }
              });
            }
          }
          var m = [],
            v = n.getText(),
            b = n.getHTML(),
            S = t._latestEditorState;
          if (
            !t.props.handlePastedText ||
            !p(t.props.handlePastedText(v, b, S))
          ) {
            if ((v && (m = d(v)), !t.props.stripPastedStyles)) {
              var _ = t.getClipboard();
              if (n.isRichText() && _) {
                if (
                  -1 !== b.indexOf(t.getEditorKey()) ||
                  (1 === m.length && 1 === _.size && _.first().getText() === v)
                )
                  return void t.update(h(t._latestEditorState, _));
              } else if (
                _ &&
                n.types.includes("com.apple.webarchive") &&
                !n.types.includes("text/html") &&
                (function (t, e) {
                  return (
                    t.length === e.size &&
                    e.valueSeq().every(function (e, n) {
                      return e.getText() === t[n];
                    })
                  );
                })(m, _)
              )
                return void t.update(h(t._latestEditorState, _));
              if (b) {
                var E = s.processHTML(b, t.props.blockRenderMap);
                if (E) {
                  var w = E.contentBlocks,
                    C = E.entityMap;
                  if (w) {
                    var k = r.createFromArray(w);
                    return void t.update(h(t._latestEditorState, k, C));
                  }
                }
              }
              t.setClipboard(null);
            }
            if (m.length) {
              var x = o.create({
                  style: S.getCurrentInlineStyle(),
                  entity: l(S.getCurrentContent(), S.getSelection()),
                }),
                T = u.getCurrentBlockType(S),
                O = s.processText(m, x, T),
                D = r.createFromArray(O);
              t.update(h(t._latestEditorState, D));
            }
          }
        };
      },
      6207: (t, e, n) => {
        "use strict";
        var r = n(2242),
          o = n(6931),
          i = n(120),
          a = n(646);
        t.exports = function (t) {
          if (
            !t._blockSelectEvents &&
            t._latestEditorState === t.props.editorState
          ) {
            var e = t.props.editorState,
              n = o.findDOMNode(t.editorContainer);
            n || a(!1), n.firstChild instanceof HTMLElement || a(!1);
            var s = i(e, n.firstChild),
              c = s.selectionState;
            c !== e.getSelection() &&
              ((e = s.needsRecovery
                ? r.forceSelection(e, c)
                : r.acceptSelection(e, c)),
              t.update(e));
          }
        };
      },
      5481: (t, e, n) => {
        "use strict";
        var r = n(1439),
          o = n(580).strlen;
        t.exports = function (t, e) {
          var n = [];
          return (
            t.findEntityRanges(
              function (t) {
                return !!t.getEntity();
              },
              function (i, a) {
                var s = t.getText(),
                  c = t.getEntityAt(i);
                n.push({
                  offset: o(s.slice(0, i)),
                  length: o(s.slice(i, a)),
                  key: Number(e[r.stringify(c)]),
                });
              },
            ),
            n
          );
        };
      },
      702: (t, e, n) => {
        "use strict";
        var r = n(580),
          o = n(8227),
          i = function (t, e) {
            return t === e;
          },
          a = function (t) {
            return !!t;
          },
          s = [];
        t.exports = function (t) {
          var e = t
              .getCharacterList()
              .map(function (t) {
                return t.getStyle();
              })
              .toList(),
            n = e
              .flatten()
              .toSet()
              .map(function (n) {
                return (function (t, e, n) {
                  var s = [],
                    c = e
                      .map(function (t) {
                        return t.has(n);
                      })
                      .toList();
                  return (
                    o(c, i, a, function (e, o) {
                      var i = t.getText();
                      s.push({
                        offset: r.strlen(i.slice(0, e)),
                        length: r.strlen(i.slice(e, o)),
                        style: n,
                      });
                    }),
                    s
                  );
                })(t, e, n);
              });
          return Array.prototype.concat.apply(s, n.toJS());
        };
      },
      5989: (t, e, n) => {
        "use strict";
        var r = n(580),
          o = n(5377),
          i = n(646);
        function a(t, e) {
          for (
            var n = 1 / 0, r = 1 / 0, o = -1 / 0, i = -1 / 0, a = 0;
            a < t.length;
            a++
          ) {
            var s = t[a];
            0 !== s.width &&
              1 !== s.width &&
              ((n = Math.min(n, s.top)),
              (r = Math.min(r, s.bottom)),
              (o = Math.max(o, s.top)),
              (i = Math.max(i, s.bottom)));
          }
          return o <= r && o - n < e && i - r < e;
        }
        function s(t) {
          switch (t.nodeType) {
            case Node.DOCUMENT_TYPE_NODE:
              return 0;
            case Node.TEXT_NODE:
            case Node.PROCESSING_INSTRUCTION_NODE:
            case Node.COMMENT_NODE:
              return t.length;
            default:
              return t.childNodes.length;
          }
        }
        t.exports = function (t) {
          t.collapsed || i(!1);
          var e = (t = t.cloneRange()).startContainer;
          1 !== e.nodeType && (e = e.parentNode);
          var n = (function (t) {
              var e = getComputedStyle(t),
                n = document.createElement("div");
              (n.style.fontFamily = e.fontFamily),
                (n.style.fontSize = e.fontSize),
                (n.style.fontStyle = e.fontStyle),
                (n.style.fontWeight = e.fontWeight),
                (n.style.lineHeight = e.lineHeight),
                (n.style.position = "absolute"),
                (n.textContent = "M");
              var r = document.body;
              r || i(!1), r.appendChild(n);
              var o = n.getBoundingClientRect();
              return r.removeChild(n), o.height;
            })(e),
            c = t.endContainer,
            u = t.endOffset;
          for (
            t.setStart(t.startContainer, 0);
            a(o(t), n) &&
            ((c = t.startContainer),
            (u = t.startOffset),
            c.parentNode || i(!1),
            t.setStartBefore(c),
            1 !== c.nodeType || "inline" === getComputedStyle(c).display);

          );
          for (var l = c, f = u - 1; ; ) {
            for (var p = l.nodeValue, d = f; d >= 0; d--)
              if (!(null != p && d > 0 && r.isSurrogatePair(p, d - 1))) {
                if ((t.setStart(l, d), !a(o(t), n))) break;
                (c = l), (u = d);
              }
            if (-1 === d || 0 === l.childNodes.length) break;
            f = s((l = l.childNodes[d]));
          }
          return t.setStart(c, u), t;
        };
      },
      8372: (t, e, n) => {
        "use strict";
        var r = n(4453);
        t.exports = function (t) {
          for (var e = t; e && e !== document.documentElement; ) {
            var n = r(e);
            if (null != n) return n;
            e = e.parentNode;
          }
          return null;
        };
      },
      8227: (t) => {
        "use strict";
        t.exports = function (t, e, n, r) {
          if (t.size) {
            var o = 0;
            t.reduce(function (t, i, a) {
              return e(t, i) || (n(t) && r(o, a), (o = a)), i;
            }),
              n(t.last()) && r(o, t.count());
          }
        };
      },
      6991: (t) => {
        "use strict";
        var e = {},
          n = Math.pow(2, 24);
        t.exports = function () {
          for (
            var t = void 0;
            void 0 === t || e.hasOwnProperty(t) || !isNaN(+t);

          )
            t = Math.floor(Math.random() * n).toString(32);
          return (e[t] = !0), t;
        };
      },
      508: (t, e, n) => {
        "use strict";
        var r = n(8382),
          o = n(9311),
          i = n(646);
        function a(t, e, n, a, s, c, u) {
          var l = n.getStartOffset(),
            f = n.getEndOffset(),
            p = t.__get(s).getMutability(),
            d = u ? l : f;
          if ("MUTABLE" === p) return n;
          var h = o(e, s).filter(function (t) {
            return d <= t.end && d >= t.start;
          });
          1 != h.length && i(!1);
          var g = h[0];
          if ("IMMUTABLE" === p)
            return n.merge({
              anchorOffset: g.start,
              focusOffset: g.end,
              isBackward: !1,
            });
          c || (u ? (f = g.end) : (l = g.start));
          var y = r.getRemovalRange(
            l,
            f,
            e.getText().slice(g.start, g.end),
            g.start,
            a,
          );
          return n.merge({
            anchorOffset: y.start,
            focusOffset: y.end,
            isBackward: !1,
          });
        }
        t.exports = function (t, e, n, r, o) {
          var i = r.getStartOffset(),
            s = r.getEndOffset(),
            c = e.getEntityAt(i),
            u = n.getEntityAt(s - 1);
          if (!c && !u) return r;
          var l = r;
          if (c && c === u) l = a(t, e, l, o, c, !0, !0);
          else if (c && u) {
            var f = a(t, e, l, o, c, !1, !0),
              p = a(t, n, l, o, u, !1, !1);
            l = l.merge({
              anchorOffset: f.getAnchorOffset(),
              focusOffset: p.getFocusOffset(),
              isBackward: !1,
            });
          } else if (c) {
            var d = a(t, e, l, o, c, !1, !0);
            l = l.merge({ anchorOffset: d.getStartOffset(), isBackward: !1 });
          } else if (u) {
            var h = a(t, n, l, o, u, !1, !1);
            l = l.merge({ focusOffset: h.getEndOffset(), isBackward: !1 });
          }
          return l;
        };
      },
      866: (t, e, n) => {
        "use strict";
        var r = n(3310),
          o = n(6044);
        t.exports = function (t, e) {
          var n = e.getStartKey(),
            i = e.getStartOffset(),
            a = e.getEndKey(),
            s = e.getEndOffset(),
            c = o(t, e).getBlockMap(),
            u = c.keySeq(),
            l = u.indexOf(n),
            f = u.indexOf(a) + 1;
          return r(
            c.slice(l, f).map(function (t, e) {
              var r = t.getText(),
                o = t.getCharacterList();
              return n === a
                ? t.merge({ text: r.slice(i, s), characterList: o.slice(i, s) })
                : e === n
                ? t.merge({ text: r.slice(i), characterList: o.slice(i) })
                : e === a
                ? t.merge({ text: r.slice(0, s), characterList: o.slice(0, s) })
                : t;
            }),
          );
        };
      },
      7811: (t, e, n) => {
        "use strict";
        var r = n(9414),
          o = n(5852),
          i = n(4134),
          a = i.isPlatform("Mac OS X"),
          s = i.isPlatform("Windows"),
          c = a && i.isBrowser("Firefox < 29"),
          u = r.hasCommandModifier,
          l = r.isCtrlKeyCommand;
        function f(t) {
          return (a && t.altKey) || l(t);
        }
        t.exports = function (t) {
          switch (t.keyCode) {
            case 66:
              return u(t) ? "bold" : null;
            case 68:
              return l(t) ? "delete" : null;
            case 72:
              return l(t) ? "backspace" : null;
            case 73:
              return u(t) ? "italic" : null;
            case 74:
              return u(t) ? "code" : null;
            case 75:
              return !s && l(t) ? "secondary-cut" : null;
            case 77:
            case 79:
              return l(t) ? "split-block" : null;
            case 84:
              return a && l(t) ? "transpose-characters" : null;
            case 85:
              return u(t) ? "underline" : null;
            case 87:
              return a && l(t) ? "backspace-word" : null;
            case 89:
              return l(t) ? (s ? "redo" : "secondary-paste") : null;
            case 90:
              return (
                (function (t) {
                  return u(t) ? (t.shiftKey ? "redo" : "undo") : null;
                })(t) || null
              );
            case o.RETURN:
              return "split-block";
            case o.DELETE:
              return (function (t) {
                return s && t.shiftKey ? null : f(t) ? "delete-word" : "delete";
              })(t);
            case o.BACKSPACE:
              return (function (t) {
                return u(t) && a
                  ? "backspace-to-start-of-line"
                  : f(t)
                  ? "backspace-word"
                  : "backspace";
              })(t);
            case o.LEFT:
              return c && u(t) ? "move-selection-to-start-of-block" : null;
            case o.RIGHT:
              return c && u(t) ? "move-selection-to-end-of-block" : null;
            default:
              return null;
          }
        };
      },
      120: (t, e, n) => {
        "use strict";
        var r = n(9215);
        t.exports = function (t, e) {
          var o = n.g.getSelection();
          return 0 === o.rangeCount
            ? {
                selectionState: t.getSelection().set("hasFocus", !1),
                needsRecovery: !1,
              }
            : r(t, e, o.anchorNode, o.anchorOffset, o.focusNode, o.focusOffset);
        };
      },
      9215: (t, e, n) => {
        "use strict";
        var r = n(8372),
          o = n(4453),
          i = n(9450),
          a = n(646),
          s = n(6408);
        function c(t, e, n) {
          var i = e,
            c = r(i);
          if (
            (null != c || (t && (t === i || t.firstChild === i)) || a(!1),
            t === i &&
              (((i = i.firstChild) instanceof Element &&
                "true" === i.getAttribute("data-contents")) ||
                a(!1),
              n > 0 && (n = i.childNodes.length)),
            0 === n)
          ) {
            var l = null;
            if (null != c) l = c;
            else {
              var f = (function (t) {
                for (
                  ;
                  t.firstChild &&
                  ((t.firstChild instanceof Element &&
                    "true" === t.firstChild.getAttribute("data-blocks")) ||
                    o(t.firstChild));

                )
                  t = t.firstChild;
                return t;
              })(i);
              l = s(o(f));
            }
            return { key: l, offset: 0 };
          }
          var p = i.childNodes[n - 1],
            d = null,
            h = null;
          if (o(p)) {
            var g = (function (t) {
              for (
                ;
                t.lastChild &&
                ((t.lastChild instanceof Element &&
                  "true" === t.lastChild.getAttribute("data-blocks")) ||
                  o(t.lastChild));

              )
                t = t.lastChild;
              return t;
            })(p);
            (d = s(o(g))), (h = u(g));
          } else (d = s(c)), (h = u(p));
          return { key: d, offset: h };
        }
        function u(t) {
          var e = t.textContent;
          return "\n" === e ? 0 : e.length;
        }
        t.exports = function (t, e, n, o, a, u) {
          var l = n.nodeType === Node.TEXT_NODE,
            f = a.nodeType === Node.TEXT_NODE;
          if (l && f)
            return {
              selectionState: i(t, s(r(n)), o, s(r(a)), u),
              needsRecovery: !1,
            };
          var p = null,
            d = null,
            h = !0;
          return (
            l
              ? ((p = { key: s(r(n)), offset: o }), (d = c(e, a, u)))
              : f
              ? ((d = { key: s(r(a)), offset: u }), (p = c(e, n, o)))
              : ((p = c(e, n, o)),
                (d = c(e, a, u)),
                n === a &&
                  o === u &&
                  (h = !!n.firstChild && "BR" !== n.firstChild.nodeName)),
            {
              selectionState: i(t, p.key, p.offset, d.key, d.offset),
              needsRecovery: h,
            }
          );
        };
      },
      9927: (t) => {
        "use strict";
        function e(t, e) {
          return e && "MUTABLE" === t.__get(e).getMutability() ? e : null;
        }
        t.exports = function (t, n) {
          var r;
          if (n.isCollapsed()) {
            var o = n.getAnchorKey(),
              i = n.getAnchorOffset();
            return i > 0
              ? (r = t.getBlockForKey(o).getEntityAt(i - 1)) !==
                t.getBlockForKey(o).getEntityAt(i)
                ? null
                : e(t.getEntityMap(), r)
              : null;
          }
          var a = n.getStartKey(),
            s = n.getStartOffset(),
            c = t.getBlockForKey(a);
          return (
            (r = s === c.getLength() ? null : c.getEntityAt(s)),
            e(t.getEntityMap(), r)
          );
        };
      },
      1296: (t, e, n) => {
        "use strict";
        var r = n(866);
        t.exports = function (t) {
          var e = t.getSelection();
          return e.isCollapsed() ? null : r(t.getCurrentContent(), e);
        };
      },
      7376: (t, e, n) => {
        "use strict";
        var r = n(5224);
        t.exports = function (t, e) {
          if (!(t instanceof r)) return null;
          var n = t.getNextSiblingKey();
          if (n) return n;
          var o = t.getParentKey();
          if (!o) return null;
          for (var i = e.get(o); i && !i.getNextSiblingKey(); ) {
            var a = i.getParentKey();
            i = a ? e.get(a) : null;
          }
          return i ? i.getNextSiblingKey() : null;
        };
      },
      4658: (t, e, n) => {
        "use strict";
        var r = n(5377);
        t.exports = function (t) {
          var e = r(t),
            n = 0,
            o = 0,
            i = 0,
            a = 0;
          if (e.length) {
            if (e.length > 1 && 0 === e[0].width) {
              var s = e[1];
              (n = s.top), (o = s.right), (i = s.bottom), (a = s.left);
            } else {
              var c = e[0];
              (n = c.top), (o = c.right), (i = c.bottom), (a = c.left);
            }
            for (var u = 1; u < e.length; u++) {
              var l = e[u];
              0 !== l.height &&
                0 !== l.width &&
                ((n = Math.min(n, l.top)),
                (o = Math.max(o, l.right)),
                (i = Math.max(i, l.bottom)),
                (a = Math.min(a, l.left)));
            }
          }
          return {
            top: n,
            right: o,
            bottom: i,
            left: a,
            width: o - a,
            height: i - n,
          };
        };
      },
      5377: (t, e, n) => {
        "use strict";
        var r = n(4134),
          o = n(646),
          i = r.isBrowser("Chrome")
            ? function (t) {
                for (
                  var e = t.cloneRange(), n = [], r = t.endContainer;
                  null != r;
                  r = r.parentNode
                ) {
                  var i = r === t.commonAncestorContainer;
                  i
                    ? e.setStart(t.startContainer, t.startOffset)
                    : e.setStart(e.endContainer, 0);
                  var a,
                    s = Array.from(e.getClientRects());
                  if ((n.push(s), i))
                    return n.reverse(), (a = []).concat.apply(a, n);
                  e.setEndBefore(r);
                }
                o(!1);
              }
            : function (t) {
                return Array.from(t.getClientRects());
              };
        t.exports = i;
      },
      9311: (t, e, n) => {
        "use strict";
        var r = n(646);
        t.exports = function (t, e) {
          var n = [];
          return (
            t.findEntityRanges(
              function (t) {
                return t.getEntity() === e;
              },
              function (t, e) {
                n.push({ start: t, end: e });
              },
            ),
            n.length || r(!1),
            n
          );
        };
      },
      9248: (t, e, n) => {
        "use strict";
        var r = n(4134),
          o = n(646),
          i = r.isBrowser("IE <= 9");
        t.exports = function (t) {
          var e,
            n = null;
          return (
            !i &&
              document.implementation &&
              document.implementation.createHTMLDocument &&
              ((e = document.implementation.createHTMLDocument("foo"))
                .documentElement || o(!1),
              (e.documentElement.innerHTML = t),
              (n = e.getElementsByTagName("body")[0])),
            n
          );
        };
      },
      4453: (t) => {
        "use strict";
        t.exports = function t(e) {
          if (e instanceof Element) {
            var n = e.getAttribute("data-offset-key");
            if (n) return n;
            for (var r = 0; r < e.childNodes.length; r++) {
              var o = t(e.childNodes[r]);
              if (o) return o;
            }
          }
          return null;
        };
      },
      723: (t, e, n) => {
        "use strict";
        var r = n(646),
          o = /\.textClipping$/,
          i = { "text/plain": !0, "text/html": !0, "text/rtf": !0 };
        t.exports = function (t, e) {
          var a = 0,
            s = [];
          t.forEach(function (c) {
            !(function (t, e) {
              if (!n.g.FileReader || (t.type && !(t.type in i))) e("");
              else {
                if ("" === t.type) {
                  var a = "";
                  return (
                    o.test(t.name) && (a = t.name.replace(o, "")), void e(a)
                  );
                }
                var s = new FileReader();
                (s.onload = function () {
                  var t = s.result;
                  "string" != typeof t && r(!1), e(t);
                }),
                  (s.onerror = function () {
                    e("");
                  }),
                  s.readAsText(t);
              }
            })(c, function (n) {
              a++,
                n && s.push(n.slice(0, 5e3)),
                a == t.length && e(s.join("\r"));
            });
          });
        };
      },
      9450: (t, e, n) => {
        "use strict";
        var r = n(3885),
          o = n(6408);
        t.exports = function (t, e, n, i, a) {
          var s = o(t.getSelection()),
            c = r.decode(e),
            u = c.blockKey,
            l = t.getBlockTree(u).getIn([c.decoratorKey, "leaves", c.leafKey]),
            f = r.decode(i),
            p = f.blockKey,
            d = t.getBlockTree(p).getIn([f.decoratorKey, "leaves", f.leafKey]),
            h = l.get("start"),
            g = d.get("start"),
            y = l ? h + n : null,
            m = d ? g + a : null;
          if (
            s.getAnchorKey() === u &&
            s.getAnchorOffset() === y &&
            s.getFocusKey() === p &&
            s.getFocusOffset() === m
          )
            return s;
          var v = !1;
          if (u === p) {
            var b = l.get("end"),
              S = d.get("end");
            v = g === h && S === b ? a < n : g < h;
          } else
            v =
              t
                .getCurrentContent()
                .getBlockMap()
                .keySeq()
                .skipUntil(function (t) {
                  return t === u || t === p;
                })
                .first() === p;
          return s.merge({
            anchorKey: u,
            anchorOffset: y,
            focusKey: p,
            focusOffset: m,
            isBackward: v,
          });
        };
      },
      894: (t, e, n) => {
        "use strict";
        var r = n(4658);
        t.exports = function (t) {
          var e = t.getSelection();
          if (!e.rangeCount) return null;
          var n = e.getRangeAt(0),
            o = r(n),
            i = o.top,
            a = o.right,
            s = o.bottom,
            c = o.left;
          return 0 === i && 0 === a && 0 === s && 0 === c ? null : o;
        };
      },
      9127: (t, e, n) => {
        "use strict";
        var r = n(5748),
          o = n(5224),
          i = n(9404),
          a = n(6269),
          s = n(646),
          c = n(3310),
          u = i.List;
        t.exports = function (t, e, n) {
          e.isCollapsed() || s(!1);
          var i = t.getBlockMap(),
            l = c(n),
            f = e.getStartKey(),
            p = e.getStartOffset(),
            d = i.get(f);
          return (
            d instanceof o && (d.getChildKeys().isEmpty() || s(!1)),
            1 === l.size
              ? (function (t, e, n, r, o, i) {
                  var s = n.get(o),
                    c = s.getText(),
                    u = s.getCharacterList(),
                    l = o,
                    f = i + r.getText().length,
                    p = s.merge({
                      text: c.slice(0, i) + r.getText() + c.slice(i),
                      characterList: a(u, r.getCharacterList(), i),
                      data: r.getData(),
                    });
                  return t.merge({
                    blockMap: n.set(o, p),
                    selectionBefore: e,
                    selectionAfter: e.merge({
                      anchorKey: l,
                      anchorOffset: f,
                      focusKey: l,
                      focusOffset: f,
                      isBackward: !1,
                    }),
                  });
                })(t, e, i, l.first(), f, p)
              : (function (t, e, n, i, a, s) {
                  var c = n.first() instanceof o,
                    l = [],
                    f = i.size,
                    p = n.get(a),
                    d = i.first(),
                    h = i.last(),
                    g = h.getLength(),
                    y = h.getKey(),
                    m =
                      c &&
                      (!p.getChildKeys().isEmpty() ||
                        !d.getChildKeys().isEmpty());
                  n.forEach(function (t, e) {
                    e === a
                      ? (m
                          ? l.push(t)
                          : l.push(
                              (function (t, e, n) {
                                var r = t.getText(),
                                  o = t.getCharacterList(),
                                  i = r.slice(0, e),
                                  a = o.slice(0, e),
                                  s = n.first();
                                return t.merge({
                                  text: i + s.getText(),
                                  characterList: a.concat(s.getCharacterList()),
                                  type: i ? t.getType() : s.getType(),
                                  data: s.getData(),
                                });
                              })(t, s, i),
                            ),
                        i.slice(m ? 0 : 1, f - 1).forEach(function (t) {
                          return l.push(t);
                        }),
                        l.push(
                          (function (t, e, n) {
                            var r = t.getText(),
                              o = t.getCharacterList(),
                              i = r.length,
                              a = r.slice(e, i),
                              s = o.slice(e, i),
                              c = n.last();
                            return c.merge({
                              text: c.getText() + a,
                              characterList: c.getCharacterList().concat(s),
                              data: c.getData(),
                            });
                          })(t, s, i),
                        ))
                      : l.push(t);
                  });
                  var v = r.createFromArray(l);
                  return (
                    c &&
                      (v = (function (t, e, n, r) {
                        return t.withMutations(function (e) {
                          var o = n.getKey(),
                            i = r.getKey(),
                            a = n.getNextSiblingKey(),
                            s = n.getParentKey(),
                            c = (function (t, e) {
                              var n = t.getKey(),
                                r = t,
                                o = [];
                              for (
                                e.get(n) && o.push(n);
                                r && r.getNextSiblingKey();

                              ) {
                                var i = r.getNextSiblingKey();
                                if (!i) break;
                                o.push(i), (r = e.get(i));
                              }
                              return o;
                            })(r, t),
                            l = c[c.length - 1];
                          if (
                            (e.get(i)
                              ? (e.setIn([o, "nextSibling"], i),
                                e.setIn([i, "prevSibling"], o))
                              : (e.setIn(
                                  [o, "nextSibling"],
                                  r.getNextSiblingKey(),
                                ),
                                e.setIn(
                                  [r.getNextSiblingKey(), "prevSibling"],
                                  o,
                                )),
                            e.setIn([l, "nextSibling"], a),
                            a && e.setIn([a, "prevSibling"], l),
                            c.forEach(function (t) {
                              return e.setIn([t, "parent"], s);
                            }),
                            s)
                          ) {
                            var f = t.get(s).getChildKeys(),
                              p = f.indexOf(o) + 1,
                              d = f.toArray();
                            d.splice.apply(d, [p, 0].concat(c)),
                              e.setIn([s, "children"], u(d));
                          }
                        });
                      })(v, 0, p, d)),
                    t.merge({
                      blockMap: v,
                      selectionBefore: e,
                      selectionAfter: e.merge({
                        anchorKey: y,
                        anchorOffset: g,
                        focusKey: y,
                        focusOffset: g,
                        isBackward: !1,
                      }),
                    })
                  );
                })(t, e, i, l, f, p)
          );
        };
      },
      6269: (t) => {
        "use strict";
        t.exports = function (t, e, n) {
          if (n === t.count())
            e.forEach(function (e) {
              t = t.push(e);
            });
          else if (0 === n)
            e.reverse().forEach(function (e) {
              t = t.unshift(e);
            });
          else {
            var r = t.slice(0, n),
              o = t.slice(n);
            t = r.concat(e, o).toList();
          }
          return t;
        };
      },
      3136: (t, e, n) => {
        "use strict";
        var r = n(9404),
          o = n(6269),
          i = n(646),
          a = r.Repeat;
        t.exports = function (t, e, n, r) {
          e.isCollapsed() || i(!1);
          var s = n.length;
          if (!s) return t;
          var c = t.getBlockMap(),
            u = e.getStartKey(),
            l = e.getStartOffset(),
            f = c.get(u),
            p = f.getText(),
            d = f.merge({
              text: p.slice(0, l) + n + p.slice(l, f.getLength()),
              characterList: o(f.getCharacterList(), a(r, s).toList(), l),
            }),
            h = l + s;
          return t.merge({
            blockMap: c.set(u, d),
            selectionAfter: e.merge({ anchorOffset: h, focusOffset: h }),
          });
        };
      },
      3680: (t) => {
        "use strict";
        t.exports = function (t) {
          return "handled" === t || !0 === t;
        };
      },
      7759: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = t.getSelection(),
            n = e.getAnchorKey(),
            r = t.getBlockTree(n),
            o = e.getStartOffset(),
            i = !1;
          return (
            r.some(function (t) {
              return o === t.get("start")
                ? ((i = !0), !0)
                : o < t.get("end") &&
                    t.get("leaves").some(function (t) {
                      var e = t.get("start");
                      return o === e && ((i = !0), !0);
                    });
            }),
            i
          );
        };
      },
      3174: (t, e, n) => {
        "use strict";
        var r = n(5852);
        t.exports = function (t) {
          return (
            t.which === r.RETURN &&
            (t.getModifierState("Shift") ||
              t.getModifierState("Alt") ||
              t.getModifierState("Control"))
          );
        };
      },
      8771: (t, e, n) => {
        "use strict";
        var r = n(2242),
          o = n(5989),
          i = n(9215),
          a = n(8488),
          s = n(5188);
        t.exports = function (t) {
          var e = s(
            t,
            function (t) {
              var e = t.getSelection();
              if (e.isCollapsed() && 0 === e.getAnchorOffset()) return a(t, 1);
              var r = n.g.getSelection().getRangeAt(0);
              return (
                (r = o(r)),
                i(
                  t,
                  null,
                  r.endContainer,
                  r.endOffset,
                  r.startContainer,
                  r.startOffset,
                ).selectionState
              );
            },
            "backward",
          );
          return e === t.getCurrentContent() ? t : r.push(t, e, "remove-range");
        };
      },
      4143: (t, e, n) => {
        "use strict";
        var r = n(1617),
          o = n(2242),
          i = n(8488),
          a = n(5188);
        t.exports = function (t) {
          var e = a(
            t,
            function (t) {
              var e = t.getSelection(),
                n = e.getStartOffset();
              if (0 === n) return i(t, 1);
              var o = e.getStartKey(),
                a = t
                  .getCurrentContent()
                  .getBlockForKey(o)
                  .getText()
                  .slice(0, n),
                s = r.getBackward(a);
              return i(t, s.length || 1);
            },
            "backward",
          );
          return e === t.getCurrentContent() ? t : o.push(t, e, "remove-range");
        };
      },
      525: (t, e, n) => {
        "use strict";
        var r = n(1617),
          o = n(2242),
          i = n(7800),
          a = n(5188);
        t.exports = function (t) {
          var e = a(
            t,
            function (t) {
              var e = t.getSelection(),
                n = e.getStartOffset(),
                o = e.getStartKey(),
                a = t.getCurrentContent().getBlockForKey(o).getText().slice(n),
                s = r.getForward(a);
              return i(t, s.length || 1);
            },
            "forward",
          );
          return e === t.getCurrentContent() ? t : o.push(t, e, "remove-range");
        };
      },
      4071: (t, e, n) => {
        "use strict";
        var r = n(9938),
          o = n(2242);
        t.exports = function (t) {
          var e = r.splitBlock(t.getCurrentContent(), t.getSelection());
          return o.push(t, e, "split-block");
        };
      },
      5169: (t, e, n) => {
        "use strict";
        var r = n(2242);
        t.exports = function (t) {
          var e = t.getSelection(),
            n = e.getEndKey(),
            o = t.getCurrentContent().getBlockForKey(n).getLength();
          return r.set(t, {
            selection: e.merge({
              anchorKey: n,
              anchorOffset: o,
              focusKey: n,
              focusOffset: o,
              isBackward: !1,
            }),
            forceSelection: !0,
          });
        };
      },
      70: (t, e, n) => {
        "use strict";
        var r = n(2242);
        t.exports = function (t) {
          var e = t.getSelection(),
            n = e.getStartKey();
          return r.set(t, {
            selection: e.merge({
              anchorKey: n,
              anchorOffset: 0,
              focusKey: n,
              focusOffset: 0,
              isBackward: !1,
            }),
            forceSelection: !0,
          });
        };
      },
      9762: (t, e, n) => {
        "use strict";
        var r = n(2242),
          o = n(580),
          i = n(8488),
          a = n(5188);
        t.exports = function (t) {
          var e = a(
            t,
            function (t) {
              var e = t.getSelection(),
                n = t.getCurrentContent(),
                r = e.getAnchorKey(),
                a = e.getAnchorOffset(),
                s = n.getBlockForKey(r).getText()[a - 1];
              return i(t, s ? o.getUTF16Length(s, 0) : 1);
            },
            "backward",
          );
          if (e === t.getCurrentContent()) return t;
          var n = t.getSelection();
          return r.push(
            t,
            e.set("selectionBefore", n),
            n.isCollapsed() ? "backspace-character" : "remove-range",
          );
        };
      },
      2383: (t, e, n) => {
        "use strict";
        var r = n(2242),
          o = n(580),
          i = n(7800),
          a = n(5188);
        t.exports = function (t) {
          var e = a(
            t,
            function (t) {
              var e = t.getSelection(),
                n = t.getCurrentContent(),
                r = e.getAnchorKey(),
                a = e.getAnchorOffset(),
                s = n.getBlockForKey(r).getText()[a];
              return i(t, s ? o.getUTF16Length(s, 0) : 1);
            },
            "forward",
          );
          if (e === t.getCurrentContent()) return t;
          var n = t.getSelection();
          return r.push(
            t,
            e.set("selectionBefore", n),
            n.isCollapsed() ? "delete-character" : "remove-range",
          );
        };
      },
      5935: (t, e, n) => {
        "use strict";
        var r = n(9938),
          o = n(2242),
          i = n(866);
        t.exports = function (t) {
          var e = t.getSelection();
          if (!e.isCollapsed()) return t;
          var n = e.getAnchorOffset();
          if (0 === n) return t;
          var a,
            s,
            c = e.getAnchorKey(),
            u = t.getCurrentContent(),
            l = u.getBlockForKey(c).getLength();
          if (l <= 1) return t;
          n === l
            ? ((a = e.set("anchorOffset", n - 1)), (s = e))
            : (s = (a = e.set("focusOffset", n + 1)).set(
                "anchorOffset",
                n + 1,
              ));
          var f = i(u, a),
            p = r.removeRange(u, a, "backward"),
            d = p.getSelectionAfter(),
            h = d.getAnchorOffset() - 1,
            g = d.merge({ anchorOffset: h, focusOffset: h }),
            y = r.replaceWithFragment(p, g, f),
            m = o.push(t, y, "insert-fragment");
          return o.acceptSelection(m, s);
        };
      },
      8976: (t, e, n) => {
        "use strict";
        var r = n(2242);
        t.exports = function (t, e, n) {
          var o = r.undo(e);
          if ("spellcheck-change" !== e.getLastChangeType())
            t.preventDefault(),
              e.getNativelyRenderedContent()
                ? (n(r.set(e, { nativelyRenderedContent: null })),
                  setTimeout(function () {
                    n(o);
                  }, 0))
                : n(o);
          else {
            var i = o.getCurrentContent();
            n(r.set(o, { nativelyRenderedContent: i }));
          }
        };
      },
      5462: (t, e, n) => {
        "use strict";
        var r = n(9404).Map;
        t.exports = function (t, e, n) {
          var o = e.getStartKey(),
            i = e.getEndKey(),
            a = t.getBlockMap(),
            s = a
              .toSeq()
              .skipUntil(function (t, e) {
                return e === o;
              })
              .takeUntil(function (t, e) {
                return e === i;
              })
              .concat(r([[i, a.get(i)]]))
              .map(n);
          return t.merge({
            blockMap: a.merge(s),
            selectionBefore: e,
            selectionAfter: e,
          });
        };
      },
      6059: (t, e, n) => {
        "use strict";
        var r = n(5224),
          o = n(9404),
          i = n(7376),
          a = n(646),
          s = o.OrderedMap,
          c = o.List,
          u = function (t, e, n) {
            if (t) {
              var r = e.get(t);
              r && e.set(t, n(r));
            }
          },
          l = function (t, e, n, r, o) {
            if (!o) return t;
            var i = "after" === r,
              a = e.getKey(),
              s = n.getKey(),
              l = e.getParentKey(),
              f = e.getNextSiblingKey(),
              p = e.getPrevSiblingKey(),
              d = n.getParentKey(),
              h = i ? n.getNextSiblingKey() : s,
              g = i ? s : n.getPrevSiblingKey();
            return t.withMutations(function (t) {
              u(l, t, function (t) {
                var e = t.getChildKeys();
                return t.merge({ children: e.delete(e.indexOf(a)) });
              }),
                u(p, t, function (t) {
                  return t.merge({ nextSibling: f });
                }),
                u(f, t, function (t) {
                  return t.merge({ prevSibling: p });
                }),
                u(h, t, function (t) {
                  return t.merge({ prevSibling: a });
                }),
                u(g, t, function (t) {
                  return t.merge({ nextSibling: a });
                }),
                u(d, t, function (t) {
                  var e = t.getChildKeys(),
                    n = e.indexOf(s),
                    r = i ? n + 1 : 0 !== n ? n - 1 : 0,
                    o = e.toArray();
                  return o.splice(r, 0, a), t.merge({ children: c(o) });
                }),
                u(a, t, function (t) {
                  return t.merge({ nextSibling: h, prevSibling: g, parent: d });
                });
            });
          };
        t.exports = function (t, e, n, o) {
          "replace" === o && a(!1);
          var c = n.getKey(),
            u = e.getKey();
          u === c && a(!1);
          var f = t.getBlockMap(),
            p = e instanceof r,
            d = [e],
            h = f.delete(u);
          p &&
            ((d = []),
            (h = f.withMutations(function (t) {
              var n = e.getNextSiblingKey(),
                r = i(e, t);
              t.toSeq()
                .skipUntil(function (t) {
                  return t.getKey() === u;
                })
                .takeWhile(function (t) {
                  var e = t.getKey(),
                    o = e === u,
                    i = n && e !== n,
                    a = !n && t.getParentKey() && (!r || e !== r);
                  return !!(o || i || a);
                })
                .forEach(function (e) {
                  d.push(e), t.delete(e.getKey());
                });
            })));
          var g = h.toSeq().takeUntil(function (t) {
              return t === n;
            }),
            y = h
              .toSeq()
              .skipUntil(function (t) {
                return t === n;
              })
              .skip(1),
            m = d.map(function (t) {
              return [t.getKey(), t];
            }),
            v = s();
          if ("before" === o) {
            var b = t.getBlockBefore(c);
            b && b.getKey() === e.getKey() && a(!1),
              (v = g.concat([].concat(m, [[c, n]]), y).toOrderedMap());
          } else if ("after" === o) {
            var S = t.getBlockAfter(c);
            S && S.getKey() === u && a(!1),
              (v = g.concat([[c, n]].concat(m), y).toOrderedMap());
          }
          return t.merge({
            blockMap: l(v, e, n, o, p),
            selectionBefore: t.getSelectionAfter(),
            selectionAfter: t
              .getSelectionAfter()
              .merge({ anchorKey: u, focusKey: u }),
          });
        };
      },
      8488: (t) => {
        "use strict";
        t.exports = function (t, e) {
          var n = t.getSelection(),
            r = t.getCurrentContent(),
            o = n.getStartKey(),
            i = n.getStartOffset(),
            a = o,
            s = 0;
          if (e > i) {
            var c = r.getKeyBefore(o);
            null == c
              ? (a = o)
              : ((a = c), (s = r.getBlockForKey(c).getText().length));
          } else s = i - e;
          return n.merge({ focusKey: a, focusOffset: s, isBackward: !0 });
        };
      },
      7800: (t) => {
        "use strict";
        t.exports = function (t, e) {
          var n,
            r = t.getSelection(),
            o = r.getStartKey(),
            i = r.getStartOffset(),
            a = t.getCurrentContent(),
            s = o;
          return (
            e > a.getBlockForKey(o).getText().length - i
              ? ((s = a.getKeyAfter(o)), (n = 0))
              : (n = i + e),
            r.merge({ focusKey: s, focusOffset: n })
          );
        };
      },
      3310: (t, e, n) => {
        "use strict";
        var r = n(5224),
          o = n(9404),
          i = n(6991),
          a = o.OrderedMap;
        t.exports = function (t) {
          return t.first() instanceof r
            ? (function (t) {
                var e = {},
                  n = void 0;
                return a(
                  t
                    .withMutations(function (t) {
                      t.forEach(function (r, o) {
                        var a = r.getKey(),
                          s = r.getNextSiblingKey(),
                          c = r.getPrevSiblingKey(),
                          u = r.getChildKeys(),
                          l = r.getParentKey(),
                          f = i();
                        if (
                          ((e[a] = f),
                          s &&
                            (t.get(s)
                              ? t.setIn([s, "prevSibling"], f)
                              : t.setIn([a, "nextSibling"], null)),
                          c &&
                            (t.get(c)
                              ? t.setIn([c, "nextSibling"], f)
                              : t.setIn([a, "prevSibling"], null)),
                          l && t.get(l))
                        ) {
                          var p = t.get(l).getChildKeys();
                          t.setIn(
                            [l, "children"],
                            p.set(p.indexOf(r.getKey()), f),
                          );
                        } else
                          t.setIn([a, "parent"], null),
                            n &&
                              (t.setIn([n.getKey(), "nextSibling"], f),
                              t.setIn([a, "prevSibling"], e[n.getKey()])),
                            (n = t.get(a));
                        u.forEach(function (e) {
                          t.get(e)
                            ? t.setIn([e, "parent"], f)
                            : t.setIn(
                                [a, "children"],
                                r.getChildKeys().filter(function (t) {
                                  return t !== e;
                                }),
                              );
                        });
                      });
                    })
                    .toArray()
                    .map(function (t) {
                      return [e[t.getKey()], t.set("key", e[t.getKey()])];
                    }),
                );
              })(t)
            : (function (t) {
                return a(
                  t.toArray().map(function (t) {
                    var e = i();
                    return [e, t.set("key", e)];
                  }),
                );
              })(t);
        };
      },
      6044: (t, e, n) => {
        "use strict";
        var r = n(3018),
          o = n(8227),
          i = n(646);
        function a(t, e, n) {
          var a = e.getCharacterList(),
            s = n > 0 ? a.get(n - 1) : void 0,
            c = n < a.count() ? a.get(n) : void 0,
            u = s ? s.getEntity() : void 0,
            l = c ? c.getEntity() : void 0;
          if (l && l === u && "MUTABLE" !== t.__get(l).getMutability()) {
            for (
              var f,
                p = (function (t, e, n) {
                  var r;
                  return (
                    o(
                      t,
                      function (t, e) {
                        return t.getEntity() === e.getEntity();
                      },
                      function (t) {
                        return t.getEntity() === e;
                      },
                      function (t, e) {
                        t <= n && e >= n && (r = { start: t, end: e });
                      },
                    ),
                    "object" != typeof r && i(!1),
                    r
                  );
                })(a, l, n),
                d = p.start,
                h = p.end;
              d < h;

            )
              (f = a.get(d)), (a = a.set(d, r.applyEntity(f, null))), d++;
            return e.set("characterList", a);
          }
          return e;
        }
        t.exports = function (t, e) {
          var n = t.getBlockMap(),
            r = t.getEntityMap(),
            o = {},
            i = e.getStartKey(),
            s = e.getStartOffset(),
            c = n.get(i),
            u = a(r, c, s);
          u !== c && (o[i] = u);
          var l = e.getEndKey(),
            f = e.getEndOffset(),
            p = n.get(l);
          i === l && (p = u);
          var d = a(r, p, f);
          return (
            d !== p && (o[l] = d),
            Object.keys(o).length
              ? t.merge({ blockMap: n.merge(o), selectionAfter: e })
              : t.set("selectionAfter", e)
          );
        };
      },
      4435: (t, e, n) => {
        "use strict";
        var r = n(5224),
          o = n(9404),
          i = n(7376),
          a = (o.List, o.Map),
          s = function (t, e, n) {
            if (t) {
              var r = e.get(t);
              r && e.set(t, n(r));
            }
          },
          c = function (t, e) {
            var n = [];
            if (!t) return n;
            for (var r = e.get(t); r && r.getParentKey(); ) {
              var o = r.getParentKey();
              o && n.push(o), (r = o ? e.get(o) : null);
            }
            return n;
          },
          u = function (t, e, n) {
            if (!t) return null;
            for (
              var r = n.get(t.getKey()).getNextSiblingKey();
              r && !e.get(r);

            )
              r = n.get(r).getNextSiblingKey() || null;
            return r;
          },
          l = function (t, e, n) {
            if (!t) return null;
            for (
              var r = n.get(t.getKey()).getPrevSiblingKey();
              r && !e.get(r);

            )
              r = n.get(r).getPrevSiblingKey() || null;
            return r;
          };
        t.exports = function (t, e) {
          if (e.isCollapsed()) return t;
          var n = t.getBlockMap(),
            o = e.getStartKey(),
            f = e.getStartOffset(),
            p = e.getEndKey(),
            d = e.getEndOffset(),
            h = n.get(o),
            g = n.get(p),
            y = h instanceof r,
            m = [];
          if (y) {
            var v = g.getChildKeys(),
              b = c(p, n);
            g.getNextSiblingKey() && (m = m.concat(b)),
              v.isEmpty() || (m = m.concat(b.concat([p]))),
              (m = m.concat(c(i(g, n), n)));
          }
          var S;
          S =
            h === g
              ? (function (t, e, n) {
                  if (0 === e) for (; e < n; ) (t = t.shift()), e++;
                  else if (n === t.count()) for (; n > e; ) (t = t.pop()), n--;
                  else {
                    var r = t.slice(0, e),
                      o = t.slice(n);
                    t = r.concat(o).toList();
                  }
                  return t;
                })(h.getCharacterList(), f, d)
              : h
                  .getCharacterList()
                  .slice(0, f)
                  .concat(g.getCharacterList().slice(d));
          var _ = h.merge({
              text: h.getText().slice(0, f) + g.getText().slice(d),
              characterList: S,
            }),
            E = n
              .toSeq()
              .skipUntil(function (t, e) {
                return e === o;
              })
              .takeUntil(function (t, e) {
                return e === p;
              })
              .filter(function (t, e) {
                return -1 === m.indexOf(e);
              })
              .concat(a([[p, null]]))
              .map(function (t, e) {
                return e === o ? _ : null;
              }),
            w = n.merge(E).filter(function (t) {
              return !!t;
            });
          return (
            y &&
              (w = (function (t, e, n, r) {
                return t.withMutations(function (t) {
                  s(e.getKey(), t, function (n) {
                    return n.merge({
                      nextSibling: u(e, t, r),
                      prevSibling: l(e, t, r),
                    });
                  }),
                    s(n.getKey(), t, function (e) {
                      return e.merge({
                        nextSibling: u(n, t, r),
                        prevSibling: l(n, t, r),
                      });
                    }),
                    c(e.getKey(), r).forEach(function (e) {
                      return s(e, t, function (e) {
                        return e.merge({
                          children: e.getChildKeys().filter(function (e) {
                            return t.get(e);
                          }),
                          nextSibling: u(e, t, r),
                          prevSibling: l(e, t, r),
                        });
                      });
                    }),
                    s(e.getNextSiblingKey(), t, function (t) {
                      return t.merge({ prevSibling: e.getPrevSiblingKey() });
                    }),
                    s(e.getPrevSiblingKey(), t, function (n) {
                      return n.merge({ nextSibling: u(e, t, r) });
                    }),
                    s(n.getNextSiblingKey(), t, function (e) {
                      return e.merge({ prevSibling: l(n, t, r) });
                    }),
                    s(n.getPrevSiblingKey(), t, function (t) {
                      return t.merge({ nextSibling: n.getNextSiblingKey() });
                    }),
                    c(n.getKey(), r).forEach(function (e) {
                      s(e, t, function (e) {
                        return e.merge({
                          children: e.getChildKeys().filter(function (e) {
                            return t.get(e);
                          }),
                          nextSibling: u(e, t, r),
                          prevSibling: l(e, t, r),
                        });
                      });
                    }),
                    (function (t, e) {
                      var n = [];
                      if (!t) return n;
                      for (var r = i(t, e); r && e.get(r); ) {
                        var o = e.get(r);
                        n.push(r), (r = o.getParentKey() ? i(o, e) : null);
                      }
                      return n;
                    })(n, r).forEach(function (e) {
                      return s(e, t, function (e) {
                        return e.merge({
                          nextSibling: u(e, t, r),
                          prevSibling: l(e, t, r),
                        });
                      });
                    });
                });
              })(w, h, g, n)),
            t.merge({
              blockMap: w,
              selectionBefore: e,
              selectionAfter: e.merge({
                anchorKey: o,
                anchorOffset: f,
                focusKey: o,
                focusOffset: f,
                isBackward: !1,
              }),
            })
          );
        };
      },
      5188: (t, e, n) => {
        "use strict";
        var r = n(9938);
        t.exports = function (t, e, n) {
          var o = t.getSelection(),
            i = t.getCurrentContent(),
            a = o;
          if (o.isCollapsed()) {
            if ("forward" === n) {
              if (t.isSelectionAtEndOfContent()) return i;
            } else if (t.isSelectionAtStartOfContent()) return i;
            if ((a = e(t)) === o) return i;
          }
          return r.removeRange(i, a, n);
        };
      },
      1721: (t) => {
        "use strict";
        var e = new RegExp("\r", "g");
        t.exports = function (t) {
          return t.replace(e, "");
        };
      },
      4660: (t, e, n) => {
        "use strict";
        var r = n(7204),
          o = n(4909),
          i = n(9758),
          a = n(646);
        function s(t, e) {
          if (!t) return "[empty]";
          var n = c(t, e);
          return n.nodeType === Node.TEXT_NODE
            ? n.textContent
            : (n instanceof Element || a(!1), n.outerHTML);
        }
        function c(t, e) {
          var n = void 0 !== e ? e(t) : [];
          if (t.nodeType === Node.TEXT_NODE) {
            var r = t.textContent.length;
            return document.createTextNode(
              "[text " + r + (n.length ? " | " + n.join(", ") : "") + "]",
            );
          }
          var o = t.cloneNode();
          1 === o.nodeType &&
            n.length &&
            o.setAttribute("data-labels", n.join(", "));
          for (var i = t.childNodes, a = 0; a < i.length; a++)
            o.appendChild(c(i[a], e));
          return o;
        }
        function u(t, e) {
          for (var n = t; n; ) {
            if (n instanceof Element && n.hasAttribute("contenteditable"))
              return s(n, e);
            n = n.parentNode;
          }
          return "Could not find contentEditable parent of node";
        }
        function l(t) {
          return null === t.nodeValue
            ? t.childNodes.length
            : t.nodeValue.length;
        }
        function f(t, e, n, a) {
          var s = i();
          if (t.extend && o(s, e)) {
            n > l(e) &&
              r.logSelectionStateFailure({
                anonymizedDom: u(e),
                extraParams: JSON.stringify({ offset: n }),
                selectionState: JSON.stringify(a.toJS()),
              });
            var c = e === t.focusNode;
            try {
              t.extend(e, n);
            } catch (o) {
              throw (
                (r.logSelectionStateFailure({
                  anonymizedDom: u(e, function (e) {
                    var n = [];
                    return (
                      e === s && n.push("active element"),
                      e === t.anchorNode && n.push("selection anchor node"),
                      e === t.focusNode && n.push("selection focus node"),
                      n
                    );
                  }),
                  extraParams: JSON.stringify(
                    {
                      activeElementName: s ? s.nodeName : null,
                      nodeIsFocus: e === t.focusNode,
                      nodeWasFocus: c,
                      selectionRangeCount: t.rangeCount,
                      selectionAnchorNodeName: t.anchorNode
                        ? t.anchorNode.nodeName
                        : null,
                      selectionAnchorOffset: t.anchorOffset,
                      selectionFocusNodeName: t.focusNode
                        ? t.focusNode.nodeName
                        : null,
                      selectionFocusOffset: t.focusOffset,
                      message: o ? "" + o : null,
                      offset: n,
                    },
                    null,
                    2,
                  ),
                  selectionState: JSON.stringify(a.toJS(), null, 2),
                }),
                o)
              );
            }
          } else {
            var f = t.getRangeAt(0);
            f.setEnd(e, n), t.addRange(f.cloneRange());
          }
        }
        function p(t, e, n, o) {
          var i = document.createRange();
          n > l(e) &&
            r.logSelectionStateFailure({
              anonymizedDom: u(e),
              extraParams: JSON.stringify({ offset: n }),
              selectionState: JSON.stringify(o.toJS()),
            }),
            i.setStart(e, n),
            t.addRange(i);
        }
        t.exports = function (t, e, r, i, a) {
          if (o(document.documentElement, e)) {
            var s = n.g.getSelection(),
              c = t.getAnchorKey(),
              u = t.getAnchorOffset(),
              l = t.getFocusKey(),
              d = t.getFocusOffset(),
              h = t.getIsBackward();
            if (!s.extend && h) {
              var g = c,
                y = u;
              (c = l), (u = d), (l = g), (d = y), (h = !1);
            }
            var m = c === r && i <= u && a >= u,
              v = l === r && i <= d && a >= d;
            if (m && v)
              return (
                s.removeAllRanges(), p(s, e, u - i, t), void f(s, e, d - i, t)
              );
            if (h) {
              if ((v && (s.removeAllRanges(), p(s, e, d - i, t)), m)) {
                var b = s.focusNode,
                  S = s.focusOffset;
                s.removeAllRanges(), p(s, e, u - i, t), f(s, b, S, t);
              }
            } else
              m && (s.removeAllRanges(), p(s, e, u - i, t)),
                v && f(s, e, d - i, t);
          }
        };
      },
      3222: (t, e, n) => {
        "use strict";
        var r = n(5224),
          o = n(9404),
          i = n(6991),
          a = n(646),
          s = o.List,
          c = o.Map,
          u = function (t, e, n) {
            if (t) {
              var r = e.get(t);
              r && e.set(t, n(r));
            }
          };
        t.exports = function (t, e) {
          e.isCollapsed() || a(!1);
          var n = e.getAnchorKey(),
            o = e.getAnchorOffset(),
            l = t.getBlockMap(),
            f = l.get(n),
            p = f.getText(),
            d = f.getCharacterList(),
            h = i(),
            g = f instanceof r,
            y = f.merge({ text: p.slice(0, o), characterList: d.slice(0, o) }),
            m = y.merge({
              key: h,
              text: p.slice(o),
              characterList: d.slice(o),
              data: c(),
            }),
            v = l.toSeq().takeUntil(function (t) {
              return t === f;
            }),
            b = l
              .toSeq()
              .skipUntil(function (t) {
                return t === f;
              })
              .rest(),
            S = v
              .concat(
                [
                  [n, y],
                  [h, m],
                ],
                b,
              )
              .toOrderedMap();
          return (
            g &&
              (f.getChildKeys().isEmpty() || a(!1),
              (S = (function (t, e, n) {
                return t.withMutations(function (t) {
                  var r = e.getKey(),
                    o = n.getKey();
                  u(e.getParentKey(), t, function (t) {
                    var e = t.getChildKeys(),
                      n = e.indexOf(r) + 1,
                      i = e.toArray();
                    return i.splice(n, 0, o), t.merge({ children: s(i) });
                  }),
                    u(e.getNextSiblingKey(), t, function (t) {
                      return t.merge({ prevSibling: o });
                    }),
                    u(r, t, function (t) {
                      return t.merge({ nextSibling: o });
                    }),
                    u(o, t, function (t) {
                      return t.merge({ prevSibling: r });
                    });
                });
              })(S, y, m))),
            t.merge({
              blockMap: S,
              selectionBefore: e,
              selectionAfter: e.merge({
                anchorKey: h,
                anchorOffset: 0,
                focusKey: h,
                focusOffset: 0,
                isBackward: !1,
              }),
            })
          );
        };
      },
      3676: (t) => {
        "use strict";
        var e = /\r\n?|\n/g;
        t.exports = function (t) {
          return t.split(e);
        };
      },
      8335: (t, e, n) => {
        var r = n(5143);
        (n(4160).DraftJS = r), (t.exports = r);
      },
      2395: (t, e, n) => {
        "use strict";
        var r = n(2505),
          o = n(1864),
          i = n(9395),
          a = new RegExp("\r\n", "g"),
          s = { "text/rtf": 1, "text/html": 1 };
        function c(t) {
          if ("file" == t.kind) return t.getAsFile();
        }
        var u = (function () {
          function t(e) {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.data = e),
              (this.types = e.types ? o(e.types) : []);
          }
          return (
            (t.prototype.isRichText = function () {
              return (
                !(!this.getHTML() || !this.getText()) ||
                (!this.isImage() &&
                  this.types.some(function (t) {
                    return s[t];
                  }))
              );
            }),
            (t.prototype.getText = function () {
              var t;
              return (
                this.data.getData &&
                  (this.types.length
                    ? -1 != this.types.indexOf("text/plain") &&
                      (t = this.data.getData("text/plain"))
                    : (t = this.data.getData("Text"))),
                t ? t.replace(a, "\n") : null
              );
            }),
            (t.prototype.getHTML = function () {
              if (this.data.getData) {
                if (!this.types.length) return this.data.getData("Text");
                if (-1 != this.types.indexOf("text/html"))
                  return this.data.getData("text/html");
              }
            }),
            (t.prototype.isLink = function () {
              return this.types.some(function (t) {
                return (
                  -1 != t.indexOf("Url") ||
                  -1 != t.indexOf("text/uri-list") ||
                  t.indexOf("text/x-moz-url")
                );
              });
            }),
            (t.prototype.getLink = function () {
              return this.data.getData
                ? -1 != this.types.indexOf("text/x-moz-url")
                  ? this.data.getData("text/x-moz-url").split("\n")[0]
                  : -1 != this.types.indexOf("text/uri-list")
                  ? this.data.getData("text/uri-list")
                  : this.data.getData("url")
                : null;
            }),
            (t.prototype.isImage = function () {
              var t = this.types.some(function (t) {
                return -1 != t.indexOf("application/x-moz-file");
              });
              if (t) return !0;
              for (var e = this.getFiles(), n = 0; n < e.length; n++) {
                var o = e[n].type;
                if (!r.isImage(o)) return !1;
              }
              return !0;
            }),
            (t.prototype.getCount = function () {
              return this.data.hasOwnProperty("items")
                ? this.data.items.length
                : this.data.hasOwnProperty("mozItemCount")
                ? this.data.mozItemCount
                : this.data.files
                ? this.data.files.length
                : null;
            }),
            (t.prototype.getFiles = function () {
              return this.data.items
                ? Array.prototype.slice
                    .call(this.data.items)
                    .map(c)
                    .filter(i.thatReturnsArgument)
                : this.data.files
                ? Array.prototype.slice.call(this.data.files)
                : [];
            }),
            (t.prototype.hasFiles = function () {
              return this.getFiles().length > 0;
            }),
            t
          );
        })();
        t.exports = u;
      },
      5852: (t) => {
        "use strict";
        t.exports = {
          BACKSPACE: 8,
          TAB: 9,
          RETURN: 13,
          ALT: 18,
          ESC: 27,
          SPACE: 32,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46,
          COMMA: 188,
          PERIOD: 190,
          A: 65,
          Z: 90,
          ZERO: 48,
          NUMPAD_0: 96,
          NUMPAD_9: 105,
        };
      },
      2505: (t) => {
        "use strict";
        var e = {
          isImage: function (t) {
            return "image" === n(t)[0];
          },
          isJpeg: function (t) {
            var r = n(t);
            return e.isImage(t) && ("jpeg" === r[1] || "pjpeg" === r[1]);
          },
        };
        function n(t) {
          return t.split("/");
        }
        t.exports = e;
      },
      3529: (t) => {
        "use strict";
        function e(t, e) {
          return !!e && (t === e.documentElement || t === e.body);
        }
        var n = {
          getTop: function (t) {
            var n = t.ownerDocument;
            return e(t, n)
              ? n.body.scrollTop || n.documentElement.scrollTop
              : t.scrollTop;
          },
          setTop: function (t, n) {
            var r = t.ownerDocument;
            e(t, r)
              ? (r.body.scrollTop = r.documentElement.scrollTop = n)
              : (t.scrollTop = n);
          },
          getLeft: function (t) {
            var n = t.ownerDocument;
            return e(t, n)
              ? n.body.scrollLeft || n.documentElement.scrollLeft
              : t.scrollLeft;
          },
          setLeft: function (t, n) {
            var r = t.ownerDocument;
            e(t, r)
              ? (r.body.scrollLeft = r.documentElement.scrollLeft = n)
              : (t.scrollLeft = n);
          },
        };
        t.exports = n;
      },
      2935: (t, e, n) => {
        "use strict";
        function r(t, e) {
          var n = o.get(t, e);
          return "auto" === n || "scroll" === n;
        }
        var o = {
          get: n(6892),
          getScrollParent: function (t) {
            if (!t) return null;
            for (var e = t.ownerDocument; t && t !== e.body; ) {
              if (r(t, "overflow") || r(t, "overflowY") || r(t, "overflowX"))
                return t;
              t = t.parentNode;
            }
            return e.defaultView || e.parentWindow;
          },
        };
        t.exports = o;
      },
      7405: (t) => {
        "use strict";
        t.exports = {
          getPunctuation: function () {
            return "[.,+*?$|#{}()'\\^\\-\\[\\]\\\\\\/!@%\"~=<>_:;・、。〈-】〔-〟：-？！-／［-｀｛-･⸮؟٪-٬؛،؍﴾﴿᠁।၊။‐-‧‰-⁞¡-±´-¸º»¿]";
          },
        };
      },
      5324: (t) => {
        "use strict";
        var e = (function () {
          function t(e) {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this._uri = e);
          }
          return (
            (t.prototype.toString = function () {
              return this._uri;
            }),
            t
          );
        })();
        t.exports = e;
      },
      8307: (t, e, n) => {
        "use strict";
        var r = n(5822),
          o = n(646),
          i =
            "֐־׀׃׆׈-׏א-ת׫-ׯװ-ײ׳-״׵-׿߀-߉ߊ-ߪߴ-ߵߺ߻-߿ࠀ-ࠕࠚࠤࠨ࠮-࠯࠰-࠾࠿ࡀ-ࡘ࡜-࡝࡞࡟-࢟‏יִײַ-ﬨשׁ-זּ﬷טּ-לּ﬽מּ﬿נּ-סּ﭂ףּ-פּ﭅צּ-ﭏ",
          a =
            "؈؋؍؛؜؝؞-؟ؠ-ؿـف-ي٭ٮ-ٯٱ-ۓ۔ەۥ-ۦۮ-ۯۺ-ۼ۽-۾ۿ܀-܍܎܏ܐܒ-ܯ݋-݌ݍ-ޥޱ޲-޿ࢠ-ࢲࢳ-ࣣﭐ-ﮱ﮲-﯁﯂-﯒ﯓ-ﴽ﵀-﵏ﵐ-ﶏ﶐-﶑ﶒ-ﷇ﷈-﷏ﷰ-ﷻ﷼﷾-﷿ﹰ-ﹴ﹵ﹶ-ﻼ﻽-﻾",
          s = new RegExp(
            "[A-Za-zªµºÀ-ÖØ-öø-ƺƻƼ-ƿǀ-ǃǄ-ʓʔʕ-ʯʰ-ʸʻ-ˁː-ˑˠ-ˤˮͰ-ͳͶ-ͷͺͻ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҂Ҋ-ԯԱ-Ֆՙ՚-՟ա-և։ःऄ-हऻऽा-ीॉ-ौॎ-ॏॐक़-ॡ।-॥०-९॰ॱॲ-ঀং-ঃঅ-ঌএ-ঐও-নপ-রলশ-হঽা-ীে-ৈো-ৌৎৗড়-ঢ়য়-ৡ০-৯ৰ-ৱ৴-৹৺ਃਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਾ-ੀਖ਼-ੜਫ਼੦-੯ੲ-ੴઃઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽા-ીૉો-ૌૐૠ-ૡ૦-૯૰ଂ-ଃଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽାୀେ-ୈୋ-ୌୗଡ଼-ଢ଼ୟ-ୡ୦-୯୰ୱ୲-୷ஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹா-ிு-ூெ-ைொ-ௌௐௗ௦-௯௰-௲ఁ-ఃఅ-ఌఎ-ఐఒ-నప-హఽు-ౄౘ-ౙౠ-ౡ౦-౯౿ಂ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽಾಿೀ-ೄೆೇ-ೈೊ-ೋೕ-ೖೞೠ-ೡ೦-೯ೱ-ೲം-ഃഅ-ഌഎ-ഐഒ-ഺഽാ-ീെ-ൈൊ-ൌൎൗൠ-ൡ൦-൯൰-൵൹ൺ-ൿං-ඃඅ-ඖක-නඳ-රලව-ෆා-ෑෘ-ෟ෦-෯ෲ-ෳ෴ก-ะา-ำเ-ๅๆ๏๐-๙๚-๛ກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆ໐-໙ໜ-ໟༀ༁-༃༄-༒༓༔༕-༗༚-༟༠-༩༪-༳༴༶༸༾-༿ཀ-ཇཉ-ཬཿ྅ྈ-ྌ྾-࿅࿇-࿌࿎-࿏࿐-࿔࿕-࿘࿙-࿚က-ဪါ-ာေးျ-ြဿ၀-၉၊-၏ၐ-ၕၖ-ၗၚ-ၝၡၢ-ၤၥ-ၦၧ-ၭၮ-ၰၵ-ႁႃ-ႄႇ-ႌႎႏ႐-႙ႚ-ႜ႞-႟Ⴀ-ჅჇჍა-ჺ჻ჼჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፠-፨፩-፼ᎀ-ᎏᎠ-Ᏼᐁ-ᙬ᙭-᙮ᙯ-ᙿᚁ-ᚚᚠ-ᛪ᛫-᛭ᛮ-ᛰᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱ᜵-᜶ᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳាើ-ៅះ-ៈ។-៖ៗ៘-៚ៜ០-៩᠐-᠙ᠠ-ᡂᡃᡄ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᤣ-ᤦᤩ-ᤫᤰ-ᤱᤳ-ᤸ᥆-᥏ᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧀᧁ-ᧇᧈ-ᧉ᧐-᧙᧚ᨀ-ᨖᨙ-ᨚ᨞-᨟ᨠ-ᩔᩕᩗᩡᩣ-ᩤᩭ-ᩲ᪀-᪉᪐-᪙᪠-᪦ᪧ᪨-᪭ᬄᬅ-ᬳᬵᬻᬽ-ᭁᭃ-᭄ᭅ-ᭋ᭐-᭙᭚-᭠᭡-᭪᭴-᭼ᮂᮃ-ᮠᮡᮦ-ᮧ᮪ᮮ-ᮯ᮰-᮹ᮺ-ᯥᯧᯪ-ᯬᯮ᯲-᯳᯼-᯿ᰀ-ᰣᰤ-ᰫᰴ-ᰵ᰻-᰿᱀-᱉ᱍ-ᱏ᱐-᱙ᱚ-ᱷᱸ-ᱽ᱾-᱿᳀-᳇᳓᳡ᳩ-ᳬᳮ-ᳱᳲ-ᳳᳵ-ᳶᴀ-ᴫᴬ-ᵪᵫ-ᵷᵸᵹ-ᶚᶛ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‎ⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℴℵ-ℸℹℼ-ℿⅅ-ⅉⅎ⅏Ⅰ-ↂↃ-ↄↅ-ↈ⌶-⍺⎕⒜-ⓩ⚬⠀-⣿Ⰰ-Ⱞⰰ-ⱞⱠ-ⱻⱼ-ⱽⱾ-ⳤⳫ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵰ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々〆〇〡-〩〮-〯〱-〵〸-〺〻〼ぁ-ゖゝ-ゞゟァ-ヺー-ヾヿㄅ-ㄭㄱ-ㆎ㆐-㆑㆒-㆕㆖-㆟ㆠ-ㆺㇰ-ㇿ㈀-㈜㈠-㈩㈪-㉇㉈-㉏㉠-㉻㉿㊀-㊉㊊-㊰㋀-㋋㋐-㋾㌀-㍶㍻-㏝㏠-㏾㐀-䶵一-鿌ꀀ-ꀔꀕꀖ-ꒌꓐ-ꓷꓸ-ꓽ꓾-꓿ꔀ-ꘋꘌꘐ-ꘟ꘠-꘩ꘪ-ꘫꙀ-ꙭꙮꚀ-ꚛꚜ-ꚝꚠ-ꛥꛦ-ꛯ꛲-꛷Ꜣ-ꝯꝰꝱ-ꞇ꞉-꞊Ꞌ-ꞎꞐ-ꞭꞰ-Ʇꟷꟸ-ꟹꟺꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꠣ-ꠤꠧ꠰-꠵꠶-꠷ꡀ-ꡳꢀ-ꢁꢂ-ꢳꢴ-ꣃ꣎-꣏꣐-꣙ꣲ-ꣷ꣸-꣺ꣻ꤀-꤉ꤊ-ꤥ꤮-꤯ꤰ-ꥆꥒ-꥓꥟ꥠ-ꥼꦃꦄ-ꦲꦴ-ꦵꦺ-ꦻꦽ-꧀꧁-꧍ꧏ꧐-꧙꧞-꧟ꧠ-ꧤꧦꧧ-ꧯ꧰-꧹ꧺ-ꧾꨀ-ꨨꨯ-ꨰꨳ-ꨴꩀ-ꩂꩄ-ꩋꩍ꩐-꩙꩜-꩟ꩠ-ꩯꩰꩱ-ꩶ꩷-꩹ꩺꩻꩽꩾ-ꪯꪱꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫜꫝ꫞-꫟ꫠ-ꫪꫫꫮ-ꫯ꫰-꫱ꫲꫳ-ꫴꫵꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚ꭛ꭜ-ꭟꭤ-ꭥꯀ-ꯢꯣ-ꯤꯦ-ꯧꯩ-ꯪ꯫꯬꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ-豈-舘並-龎ﬀ-ﬆﬓ-ﬗＡ-Ｚａ-ｚｦ-ｯｰｱ-ﾝﾞ-ﾟﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ" +
              i +
              a +
              "]",
          ),
          c = new RegExp("[" + i + a + "]");
        function u(t) {
          var e = s.exec(t);
          return null == e ? null : e[0];
        }
        function l(t) {
          var e = u(t);
          return null == e ? r.NEUTRAL : c.exec(e) ? r.RTL : r.LTR;
        }
        function f(t, e) {
          if (((e = e || r.NEUTRAL), !t.length)) return e;
          var n = l(t);
          return n === r.NEUTRAL ? e : n;
        }
        function p(t, e) {
          return e || (e = r.getGlobalDir()), r.isStrong(e) || o(!1), f(t, e);
        }
        var d = {
          firstStrongChar: u,
          firstStrongCharDir: l,
          resolveBlockDir: f,
          getDirection: p,
          isDirectionLTR: function (t, e) {
            return p(t, e) === r.LTR;
          },
          isDirectionRTL: function (t, e) {
            return p(t, e) === r.RTL;
          },
        };
        t.exports = d;
      },
      5822: (t, e, n) => {
        "use strict";
        var r = n(646),
          o = "LTR",
          i = "RTL",
          a = null;
        function s(t) {
          return t === o || t === i;
        }
        function c(t) {
          return s(t) || r(!1), t === o ? "ltr" : "rtl";
        }
        function u(t) {
          a = t;
        }
        var l = {
          NEUTRAL: "NEUTRAL",
          LTR: o,
          RTL: i,
          isStrong: s,
          getHTMLDir: c,
          getHTMLDirIfDifferent: function (t, e) {
            return s(t) || r(!1), s(e) || r(!1), t === e ? null : c(t);
          },
          setGlobalDir: u,
          initGlobalDir: function () {
            u(o);
          },
          getGlobalDir: function () {
            return a || this.initGlobalDir(), a || r(!1), a;
          },
        };
        t.exports = l;
      },
      1708: (t, e, n) => {
        "use strict";
        var r = n(8307),
          o = n(5822),
          i = n(646),
          a = (function () {
            function t(e) {
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
                e ? o.isStrong(e) || i(!1) : (e = o.getGlobalDir()),
                (this._defaultDir = e),
                this.reset();
            }
            return (
              (t.prototype.reset = function () {
                this._lastDir = this._defaultDir;
              }),
              (t.prototype.getDirection = function (t) {
                return (
                  (this._lastDir = r.getDirection(t, this._lastDir)),
                  this._lastDir
                );
              }),
              t
            );
          })();
        t.exports = a;
      },
      580: (t, e, n) => {
        "use strict";
        var r = n(646),
          o = 55296,
          i = 57343,
          a = /[\uD800-\uDFFF]/;
        function s(t) {
          return o <= t && t <= i;
        }
        function c(t) {
          return a.test(t);
        }
        function u(t, e) {
          return 1 + s(t.charCodeAt(e));
        }
        function l(t, e, n) {
          if (((e = e || 0), (n = void 0 === n ? 1 / 0 : n || 0), !c(t)))
            return t.substr(e, n);
          var r = t.length;
          if (r <= 0 || e > r || n <= 0) return "";
          var o = 0;
          if (e > 0) {
            for (; e > 0 && o < r; e--) o += u(t, o);
            if (o >= r) return "";
          } else if (e < 0) {
            for (o = r; e < 0 && 0 < o; e++) o -= u(t, o - 1);
            o < 0 && (o = 0);
          }
          var i = r;
          if (n < r) for (i = o; n > 0 && i < r; n--) i += u(t, i);
          return t.substring(o, i);
        }
        var f = {
          getCodePoints: function (t) {
            for (var e = [], n = 0; n < t.length; n += u(t, n))
              e.push(t.codePointAt(n));
            return e;
          },
          getUTF16Length: u,
          hasSurrogateUnit: c,
          isCodeUnitInSurrogateRange: s,
          isSurrogatePair: function (t, e) {
            if (((0 <= e && e < t.length) || r(!1), e + 1 === t.length))
              return !1;
            var n = t.charCodeAt(e),
              a = t.charCodeAt(e + 1);
            return o <= n && n <= 56319 && 56320 <= a && a <= i;
          },
          strlen: function (t) {
            if (!c(t)) return t.length;
            for (var e = 0, n = 0; n < t.length; n += u(t, n)) e++;
            return e;
          },
          substring: function (t, e, n) {
            (e = e || 0) < 0 && (e = 0),
              (n = void 0 === n ? 1 / 0 : n || 0) < 0 && (n = 0);
            var r = Math.abs(n - e);
            return l(t, (e = e < n ? e : n), r);
          },
          substr: l,
        };
        t.exports = f;
      },
      4134: (t, e, n) => {
        "use strict";
        var r = n(4534),
          o = n(953),
          i = n(3731),
          a = n(4793);
        function s(t, e, n, r) {
          if (t === n) return !0;
          if (!n.startsWith(t)) return !1;
          var i = n.slice(t.length);
          return !!e && ((i = r ? r(i) : i), o.contains(i, e));
        }
        function c(t) {
          return "Windows" === r.platformName ? t.replace(/^\s*NT/, "") : t;
        }
        var u = {
          isBrowser: function (t) {
            return s(r.browserName, r.browserFullVersion, t);
          },
          isBrowserArchitecture: function (t) {
            return s(r.browserArchitecture, null, t);
          },
          isDevice: function (t) {
            return s(r.deviceName, null, t);
          },
          isEngine: function (t) {
            return s(r.engineName, r.engineVersion, t);
          },
          isPlatform: function (t) {
            return s(r.platformName, r.platformFullVersion, t, c);
          },
          isPlatformArchitecture: function (t) {
            return s(r.platformArchitecture, null, t);
          },
        };
        t.exports = i(u, a);
      },
      4534: (t, e, n) => {
        "use strict";
        var r,
          o = "Unknown",
          i = new (n(7232))().getResult(),
          a = (function (t) {
            if (!t) return { major: "", minor: "" };
            var e = t.split(".");
            return { major: e[0], minor: e[1] };
          })(i.browser.version),
          s = {
            browserArchitecture: i.cpu.architecture || o,
            browserFullVersion: i.browser.version || o,
            browserMinorVersion: a.minor || o,
            browserName: i.browser.name || o,
            browserVersion: i.browser.major || o,
            deviceName: i.device.model || o,
            engineName: i.engine.name || o,
            engineVersion: i.engine.version || o,
            platformArchitecture: i.cpu.architecture || o,
            platformName:
              ((r = i.os.name), { "Mac OS": "Mac OS X" }[r] || r || o),
            platformVersion: i.os.version || o,
            platformFullVersion: i.os.version || o,
          };
        t.exports = s;
      },
      953: (t, e, n) => {
        "use strict";
        var r = n(646),
          o = /\./,
          i = /\|\|/,
          a = /\s+\-\s+/,
          s = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/,
          c = /^(\d*)(.*)/;
        function u(t, e) {
          if ("" === (t = t.trim())) return !0;
          var n,
            r = e.split(o),
            i = p(t),
            a = i.modifier,
            s = i.rangeComponents;
          switch (a) {
            case "<":
              return l(r, s);
            case "<=":
              return -1 === (n = v(r, s)) || 0 === n;
            case ">=":
              return f(r, s);
            case ">":
              return 1 === v(r, s);
            case "~":
            case "~>":
              return (function (t, e) {
                var n = e.slice(),
                  r = e.slice();
                r.length > 1 && r.pop();
                var o = r.length - 1,
                  i = parseInt(r[o], 10);
                return d(i) && (r[o] = i + 1 + ""), f(t, n) && l(t, r);
              })(r, s);
            default:
              return (function (t, e) {
                return 0 === v(t, e);
              })(r, s);
          }
        }
        function l(t, e) {
          return -1 === v(t, e);
        }
        function f(t, e) {
          var n = v(t, e);
          return 1 === n || 0 === n;
        }
        function p(t) {
          var e = t.split(o),
            n = e[0].match(s);
          return (
            n || r(!1),
            { modifier: n[1], rangeComponents: [n[2]].concat(e.slice(1)) }
          );
        }
        function d(t) {
          return !isNaN(t) && isFinite(t);
        }
        function h(t) {
          return !p(t).modifier;
        }
        function g(t, e) {
          for (var n = t.length; n < e; n++) t[n] = "0";
        }
        function y(t, e) {
          var n = t.match(c)[1],
            r = e.match(c)[1],
            o = parseInt(n, 10),
            i = parseInt(r, 10);
          return d(o) && d(i) && o !== i ? m(o, i) : m(t, e);
        }
        function m(t, e) {
          return typeof t != typeof e && r(!1), t > e ? 1 : t < e ? -1 : 0;
        }
        function v(t, e) {
          for (
            var n = (function (t, e) {
                g((t = t.slice()), (e = e.slice()).length);
                for (var n = 0; n < e.length; n++) {
                  var r = e[n].match(/^[x*]$/i);
                  if (
                    r &&
                    ((e[n] = t[n] = "0"), "*" === r[0] && n === e.length - 1)
                  )
                    for (var o = n; o < t.length; o++) t[o] = "0";
                }
                return g(e, t.length), [t, e];
              })(t, e),
              r = n[0],
              o = n[1],
              i = 0;
            i < o.length;
            i++
          ) {
            var a = y(r[i], o[i]);
            if (a) return a;
          }
          return 0;
        }
        var b = {
          contains: function (t, e) {
            return (function (t, e) {
              var n = t.split(i);
              return n.length > 1
                ? n.some(function (t) {
                    return b.contains(t, e);
                  })
                : (function (t, e) {
                    var n = t.split(a);
                    if (
                      ((n.length > 0 && n.length <= 2) || r(!1), 1 === n.length)
                    )
                      return u(n[0], e);
                    var o = n[0],
                      i = n[1];
                    return (
                      (h(o) && h(i)) || r(!1), u(">=" + o, e) && u("<=" + i, e)
                    );
                  })((t = n[0].trim()), e);
            })(t.trim(), e.trim());
          },
        };
        t.exports = b;
      },
      8748: (t) => {
        "use strict";
        var e = /-(.)/g;
        t.exports = function (t) {
          return t.replace(e, function (t, e) {
            return e.toUpperCase();
          });
        };
      },
      4909: (t, e, n) => {
        "use strict";
        var r = n(5423);
        t.exports = function t(e, n) {
          return (
            !(!e || !n) &&
            (e === n ||
              (!r(e) &&
                (r(n)
                  ? t(e, n.parentNode)
                  : "contains" in e
                  ? e.contains(n)
                  : !!e.compareDocumentPosition &&
                    !!(16 & e.compareDocumentPosition(n)))))
          );
        };
      },
      1864: (t, e, n) => {
        "use strict";
        var r = n(646);
        t.exports = function (t) {
          return (function (t) {
            return (
              !!t &&
              ("object" == typeof t || "function" == typeof t) &&
              "length" in t &&
              !("setInterval" in t) &&
              "number" != typeof t.nodeType &&
              (Array.isArray(t) || "callee" in t || "item" in t)
            );
          })(t)
            ? Array.isArray(t)
              ? t.slice()
              : (function (t) {
                  var e = t.length;
                  if (
                    ((Array.isArray(t) ||
                      ("object" != typeof t && "function" != typeof t)) &&
                      r(!1),
                    "number" != typeof e && r(!1),
                    0 === e || e - 1 in t || r(!1),
                    "function" == typeof t.callee && r(!1),
                    t.hasOwnProperty)
                  )
                    try {
                      return Array.prototype.slice.call(t);
                    } catch (t) {}
                  for (var n = Array(e), o = 0; o < e; o++) n[o] = t[o];
                  return n;
                })(t)
            : [t];
        };
      },
      8003: (t) => {
        "use strict";
        function e(t) {
          return t.replace(/\//g, "-");
        }
        t.exports = function (t) {
          return "object" == typeof t
            ? Object.keys(t)
                .filter(function (e) {
                  return t[e];
                })
                .map(e)
                .join(" ")
            : Array.prototype.map.call(arguments, e).join(" ");
        };
      },
      9395: (t) => {
        "use strict";
        function e(t) {
          return function () {
            return t;
          };
        }
        var n = function () {};
        (n.thatReturns = e),
          (n.thatReturnsFalse = e(!1)),
          (n.thatReturnsTrue = e(!0)),
          (n.thatReturnsNull = e(null)),
          (n.thatReturnsThis = function () {
            return this;
          }),
          (n.thatReturnsArgument = function (t) {
            return t;
          }),
          (t.exports = n);
      },
      9758: (t) => {
        "use strict";
        t.exports = function (t) {
          if (
            void 0 ===
            (t = t || ("undefined" != typeof document ? document : void 0))
          )
            return null;
          try {
            return t.activeElement || t.body;
          } catch (e) {
            return t.body;
          }
        };
      },
      9824: (t) => {
        "use strict";
        var e =
          "undefined" != typeof navigator &&
          navigator.userAgent.indexOf("AppleWebKit") > -1;
        t.exports = function (t) {
          return (t = t || document).scrollingElement
            ? t.scrollingElement
            : e || "CSS1Compat" !== t.compatMode
            ? t.body
            : t.documentElement;
        };
      },
      8527: (t, e, n) => {
        "use strict";
        var r = n(7078);
        t.exports = function (t) {
          var e = r(t);
          return {
            x: e.left,
            y: e.top,
            width: e.right - e.left,
            height: e.bottom - e.top,
          };
        };
      },
      7078: (t, e, n) => {
        "use strict";
        var r = n(4909);
        t.exports = function (t) {
          var e = t.ownerDocument.documentElement;
          if (!("getBoundingClientRect" in t) || !r(e, t))
            return { left: 0, right: 0, top: 0, bottom: 0 };
          var n = t.getBoundingClientRect();
          return {
            left: Math.round(n.left) - e.clientLeft,
            right: Math.round(n.right) - e.clientLeft,
            top: Math.round(n.top) - e.clientTop,
            bottom: Math.round(n.bottom) - e.clientTop,
          };
        };
      },
      7392: (t, e, n) => {
        "use strict";
        var r = n(9824),
          o = n(7458);
        t.exports = function (t) {
          var e = r(t.ownerDocument || t.document);
          t.Window && t instanceof t.Window && (t = e);
          var n = o(t),
            i = t === e ? t.ownerDocument.documentElement : t,
            a = t.scrollWidth - i.clientWidth,
            s = t.scrollHeight - i.clientHeight;
          return (
            (n.x = Math.max(0, Math.min(n.x, a))),
            (n.y = Math.max(0, Math.min(n.y, s))),
            n
          );
        };
      },
      6892: (t, e, n) => {
        "use strict";
        var r = n(8748),
          o = n(3998);
        function i(t) {
          return null == t ? t : String(t);
        }
        t.exports = function (t, e) {
          var n = void 0;
          if (window.getComputedStyle && (n = window.getComputedStyle(t, null)))
            return i(n.getPropertyValue(o(e)));
          if (document.defaultView && document.defaultView.getComputedStyle) {
            if ((n = document.defaultView.getComputedStyle(t, null)))
              return i(n.getPropertyValue(o(e)));
            if ("display" === e) return "none";
          }
          return t.currentStyle
            ? i(
                "float" === e
                  ? t.currentStyle.cssFloat || t.currentStyle.styleFloat
                  : t.currentStyle[r(e)],
              )
            : i(t.style && t.style[r(e)]);
        };
      },
      7458: (t) => {
        "use strict";
        t.exports = function (t) {
          return t.Window && t instanceof t.Window
            ? {
                x: t.pageXOffset || t.document.documentElement.scrollLeft,
                y: t.pageYOffset || t.document.documentElement.scrollTop,
              }
            : { x: t.scrollLeft, y: t.scrollTop };
        };
      },
      1401: (t) => {
        "use strict";
        function e() {
          var t = void 0;
          return (
            document.documentElement &&
              (t = document.documentElement.clientWidth),
            !t && document.body && (t = document.body.clientWidth),
            t || 0
          );
        }
        function n() {
          var t = void 0;
          return (
            document.documentElement &&
              (t = document.documentElement.clientHeight),
            !t && document.body && (t = document.body.clientHeight),
            t || 0
          );
        }
        function r() {
          return {
            width: window.innerWidth || e(),
            height: window.innerHeight || n(),
          };
        }
        (r.withoutScrollbars = function () {
          return { width: e(), height: n() };
        }),
          (t.exports = r);
      },
      3998: (t) => {
        "use strict";
        var e = /([A-Z])/g;
        t.exports = function (t) {
          return t.replace(e, "-$1").toLowerCase();
        };
      },
      646: (t) => {
        "use strict";
        t.exports = function (t, e, n, r, o, i, a, s) {
          if (!t) {
            var c;
            if (void 0 === e)
              c = new Error(
                "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
              );
            else {
              var u = [n, r, o, i, a, s],
                l = 0;
              (c = new Error(
                e.replace(/%s/g, function () {
                  return u[l++];
                }),
              )).name = "Invariant Violation";
            }
            throw ((c.framesToPop = 1), c);
          }
        };
      },
      5504: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = (t ? t.ownerDocument || t : document).defaultView || window;
          return !(
            !t ||
            !("function" == typeof e.Node
              ? t instanceof e.Node
              : "object" == typeof t &&
                "number" == typeof t.nodeType &&
                "string" == typeof t.nodeName)
          );
        };
      },
      5423: (t, e, n) => {
        "use strict";
        var r = n(5504);
        t.exports = function (t) {
          return r(t) && 3 == t.nodeType;
        };
      },
      798: (t) => {
        "use strict";
        t.exports = function (t) {
          t || (t = "");
          var e = void 0,
            n = arguments.length;
          if (n > 1)
            for (var r = 1; r < n; r++)
              (e = arguments[r]) && (t = (t ? t + " " : "") + e);
          return t;
        };
      },
      3731: (t) => {
        "use strict";
        var e = Object.prototype.hasOwnProperty;
        t.exports = function (t, n, r) {
          if (!t) return null;
          var o = {};
          for (var i in t) e.call(t, i) && (o[i] = n.call(r, t[i], i, t));
          return o;
        };
      },
      4793: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = {};
          return function (n) {
            return e.hasOwnProperty(n) || (e[n] = t.call(this, n)), e[n];
          };
        };
      },
      6408: (t) => {
        "use strict";
        t.exports = function (t) {
          if (null != t) return t;
          throw new Error("Got unexpected null or undefined");
        };
      },
      9765: (t, e, n) => {
        "use strict";
        n(2791), (t.exports = n.g.setImmediate);
      },
      9404: function (t) {
        t.exports = (function () {
          "use strict";
          var t = Array.prototype.slice;
          function e(t, e) {
            e && (t.prototype = Object.create(e.prototype)),
              (t.prototype.constructor = t);
          }
          function n(t) {
            return a(t) ? t : V(t);
          }
          function r(t) {
            return s(t) ? t : G(t);
          }
          function o(t) {
            return c(t) ? t : Z(t);
          }
          function i(t) {
            return a(t) && !u(t) ? t : J(t);
          }
          function a(t) {
            return !(!t || !t[f]);
          }
          function s(t) {
            return !(!t || !t[p]);
          }
          function c(t) {
            return !(!t || !t[d]);
          }
          function u(t) {
            return s(t) || c(t);
          }
          function l(t) {
            return !(!t || !t[h]);
          }
          e(r, n),
            e(o, n),
            e(i, n),
            (n.isIterable = a),
            (n.isKeyed = s),
            (n.isIndexed = c),
            (n.isAssociative = u),
            (n.isOrdered = l),
            (n.Keyed = r),
            (n.Indexed = o),
            (n.Set = i);
          var f = "@@__IMMUTABLE_ITERABLE__@@",
            p = "@@__IMMUTABLE_KEYED__@@",
            d = "@@__IMMUTABLE_INDEXED__@@",
            h = "@@__IMMUTABLE_ORDERED__@@",
            g = "delete",
            y = 5,
            m = 1 << y,
            v = m - 1,
            b = {},
            S = { value: !1 },
            _ = { value: !1 };
          function E(t) {
            return (t.value = !1), t;
          }
          function w(t) {
            t && (t.value = !0);
          }
          function C() {}
          function k(t, e) {
            e = e || 0;
            for (
              var n = Math.max(0, t.length - e), r = new Array(n), o = 0;
              o < n;
              o++
            )
              r[o] = t[o + e];
            return r;
          }
          function x(t) {
            return void 0 === t.size && (t.size = t.__iterate(O)), t.size;
          }
          function T(t, e) {
            if ("number" != typeof e) {
              var n = e >>> 0;
              if ("" + n !== e || 4294967295 === n) return NaN;
              e = n;
            }
            return e < 0 ? x(t) + e : e;
          }
          function O() {
            return !0;
          }
          function D(t, e, n) {
            return (
              (0 === t || (void 0 !== n && t <= -n)) &&
              (void 0 === e || (void 0 !== n && e >= n))
            );
          }
          function R(t, e) {
            return A(t, e, 0);
          }
          function M(t, e) {
            return A(t, e, e);
          }
          function A(t, e, n) {
            return void 0 === t
              ? n
              : t < 0
              ? Math.max(0, e + t)
              : void 0 === e
              ? t
              : Math.min(e, t);
          }
          var I = 0,
            B = 1,
            K = 2,
            L = "function" == typeof Symbol && Symbol.iterator,
            N = "@@iterator",
            P = L || N;
          function F(t) {
            this.next = t;
          }
          function U(t, e, n, r) {
            var o = 0 === t ? e : 1 === t ? n : [e, n];
            return r ? (r.value = o) : (r = { value: o, done: !1 }), r;
          }
          function j() {
            return { value: void 0, done: !0 };
          }
          function z(t) {
            return !!W(t);
          }
          function H(t) {
            return t && "function" == typeof t.next;
          }
          function q(t) {
            var e = W(t);
            return e && e.call(t);
          }
          function W(t) {
            var e = t && ((L && t[L]) || t[N]);
            if ("function" == typeof e) return e;
          }
          function $(t) {
            return t && "number" == typeof t.length;
          }
          function V(t) {
            return null == t
              ? at()
              : a(t)
              ? t.toSeq()
              : (function (t) {
                  var e = ut(t) || ("object" == typeof t && new nt(t));
                  if (!e)
                    throw new TypeError(
                      "Expected Array or iterable object of values, or keyed object: " +
                        t,
                    );
                  return e;
                })(t);
          }
          function G(t) {
            return null == t
              ? at().toKeyedSeq()
              : a(t)
              ? s(t)
                ? t.toSeq()
                : t.fromEntrySeq()
              : st(t);
          }
          function Z(t) {
            return null == t
              ? at()
              : a(t)
              ? s(t)
                ? t.entrySeq()
                : t.toIndexedSeq()
              : ct(t);
          }
          function J(t) {
            return (
              null == t ? at() : a(t) ? (s(t) ? t.entrySeq() : t) : ct(t)
            ).toSetSeq();
          }
          (F.prototype.toString = function () {
            return "[Iterator]";
          }),
            (F.KEYS = I),
            (F.VALUES = B),
            (F.ENTRIES = K),
            (F.prototype.inspect = F.prototype.toSource =
              function () {
                return this.toString();
              }),
            (F.prototype[P] = function () {
              return this;
            }),
            e(V, n),
            (V.of = function () {
              return V(arguments);
            }),
            (V.prototype.toSeq = function () {
              return this;
            }),
            (V.prototype.toString = function () {
              return this.__toString("Seq {", "}");
            }),
            (V.prototype.cacheResult = function () {
              return (
                !this._cache &&
                  this.__iterateUncached &&
                  ((this._cache = this.entrySeq().toArray()),
                  (this.size = this._cache.length)),
                this
              );
            }),
            (V.prototype.__iterate = function (t, e) {
              return lt(this, t, e, !0);
            }),
            (V.prototype.__iterator = function (t, e) {
              return ft(this, t, e, !0);
            }),
            e(G, V),
            (G.prototype.toKeyedSeq = function () {
              return this;
            }),
            e(Z, V),
            (Z.of = function () {
              return Z(arguments);
            }),
            (Z.prototype.toIndexedSeq = function () {
              return this;
            }),
            (Z.prototype.toString = function () {
              return this.__toString("Seq [", "]");
            }),
            (Z.prototype.__iterate = function (t, e) {
              return lt(this, t, e, !1);
            }),
            (Z.prototype.__iterator = function (t, e) {
              return ft(this, t, e, !1);
            }),
            e(J, V),
            (J.of = function () {
              return J(arguments);
            }),
            (J.prototype.toSetSeq = function () {
              return this;
            }),
            (V.isSeq = it),
            (V.Keyed = G),
            (V.Set = J),
            (V.Indexed = Z);
          var Y,
            X,
            Q,
            tt = "@@__IMMUTABLE_SEQ__@@";
          function et(t) {
            (this._array = t), (this.size = t.length);
          }
          function nt(t) {
            var e = Object.keys(t);
            (this._object = t), (this._keys = e), (this.size = e.length);
          }
          function rt(t) {
            (this._iterable = t), (this.size = t.length || t.size);
          }
          function ot(t) {
            (this._iterator = t), (this._iteratorCache = []);
          }
          function it(t) {
            return !(!t || !t[tt]);
          }
          function at() {
            return Y || (Y = new et([]));
          }
          function st(t) {
            var e = Array.isArray(t)
              ? new et(t).fromEntrySeq()
              : H(t)
              ? new ot(t).fromEntrySeq()
              : z(t)
              ? new rt(t).fromEntrySeq()
              : "object" == typeof t
              ? new nt(t)
              : void 0;
            if (!e)
              throw new TypeError(
                "Expected Array or iterable object of [k, v] entries, or keyed object: " +
                  t,
              );
            return e;
          }
          function ct(t) {
            var e = ut(t);
            if (!e)
              throw new TypeError(
                "Expected Array or iterable object of values: " + t,
              );
            return e;
          }
          function ut(t) {
            return $(t)
              ? new et(t)
              : H(t)
              ? new ot(t)
              : z(t)
              ? new rt(t)
              : void 0;
          }
          function lt(t, e, n, r) {
            var o = t._cache;
            if (o) {
              for (var i = o.length - 1, a = 0; a <= i; a++) {
                var s = o[n ? i - a : a];
                if (!1 === e(s[1], r ? s[0] : a, t)) return a + 1;
              }
              return a;
            }
            return t.__iterateUncached(e, n);
          }
          function ft(t, e, n, r) {
            var o = t._cache;
            if (o) {
              var i = o.length - 1,
                a = 0;
              return new F(function () {
                var t = o[n ? i - a : a];
                return a++ > i
                  ? { value: void 0, done: !0 }
                  : U(e, r ? t[0] : a - 1, t[1]);
              });
            }
            return t.__iteratorUncached(e, n);
          }
          function pt(t, e) {
            return e ? dt(e, t, "", { "": t }) : ht(t);
          }
          function dt(t, e, n, r) {
            return Array.isArray(e)
              ? t.call(
                  r,
                  n,
                  Z(e).map(function (n, r) {
                    return dt(t, n, r, e);
                  }),
                )
              : gt(e)
              ? t.call(
                  r,
                  n,
                  G(e).map(function (n, r) {
                    return dt(t, n, r, e);
                  }),
                )
              : e;
          }
          function ht(t) {
            return Array.isArray(t)
              ? Z(t).map(ht).toList()
              : gt(t)
              ? G(t).map(ht).toMap()
              : t;
          }
          function gt(t) {
            return t && (t.constructor === Object || void 0 === t.constructor);
          }
          function yt(t, e) {
            if (t === e || (t != t && e != e)) return !0;
            if (!t || !e) return !1;
            if (
              "function" == typeof t.valueOf &&
              "function" == typeof e.valueOf
            ) {
              if ((t = t.valueOf()) === (e = e.valueOf()) || (t != t && e != e))
                return !0;
              if (!t || !e) return !1;
            }
            return !(
              "function" != typeof t.equals ||
              "function" != typeof e.equals ||
              !t.equals(e)
            );
          }
          function mt(t, e) {
            if (t === e) return !0;
            if (
              !a(e) ||
              (void 0 !== t.size && void 0 !== e.size && t.size !== e.size) ||
              (void 0 !== t.__hash &&
                void 0 !== e.__hash &&
                t.__hash !== e.__hash) ||
              s(t) !== s(e) ||
              c(t) !== c(e) ||
              l(t) !== l(e)
            )
              return !1;
            if (0 === t.size && 0 === e.size) return !0;
            var n = !u(t);
            if (l(t)) {
              var r = t.entries();
              return (
                e.every(function (t, e) {
                  var o = r.next().value;
                  return o && yt(o[1], t) && (n || yt(o[0], e));
                }) && r.next().done
              );
            }
            var o = !1;
            if (void 0 === t.size)
              if (void 0 === e.size)
                "function" == typeof t.cacheResult && t.cacheResult();
              else {
                o = !0;
                var i = t;
                (t = e), (e = i);
              }
            var f = !0,
              p = e.__iterate(function (e, r) {
                if (
                  n ? !t.has(e) : o ? !yt(e, t.get(r, b)) : !yt(t.get(r, b), e)
                )
                  return (f = !1), !1;
              });
            return f && t.size === p;
          }
          function vt(t, e) {
            if (!(this instanceof vt)) return new vt(t, e);
            if (
              ((this._value = t),
              (this.size = void 0 === e ? 1 / 0 : Math.max(0, e)),
              0 === this.size)
            ) {
              if (X) return X;
              X = this;
            }
          }
          function bt(t, e) {
            if (!t) throw new Error(e);
          }
          function St(t, e, n) {
            if (!(this instanceof St)) return new St(t, e, n);
            if (
              (bt(0 !== n, "Cannot step a Range by 0"),
              (t = t || 0),
              void 0 === e && (e = 1 / 0),
              (n = void 0 === n ? 1 : Math.abs(n)),
              e < t && (n = -n),
              (this._start = t),
              (this._end = e),
              (this._step = n),
              (this.size = Math.max(0, Math.ceil((e - t) / n - 1) + 1)),
              0 === this.size)
            ) {
              if (Q) return Q;
              Q = this;
            }
          }
          function _t() {
            throw TypeError("Abstract");
          }
          function Et() {}
          function wt() {}
          function Ct() {}
          (V.prototype[tt] = !0),
            e(et, Z),
            (et.prototype.get = function (t, e) {
              return this.has(t) ? this._array[T(this, t)] : e;
            }),
            (et.prototype.__iterate = function (t, e) {
              for (var n = this._array, r = n.length - 1, o = 0; o <= r; o++)
                if (!1 === t(n[e ? r - o : o], o, this)) return o + 1;
              return o;
            }),
            (et.prototype.__iterator = function (t, e) {
              var n = this._array,
                r = n.length - 1,
                o = 0;
              return new F(function () {
                return o > r
                  ? { value: void 0, done: !0 }
                  : U(t, o, n[e ? r - o++ : o++]);
              });
            }),
            e(nt, G),
            (nt.prototype.get = function (t, e) {
              return void 0 === e || this.has(t) ? this._object[t] : e;
            }),
            (nt.prototype.has = function (t) {
              return this._object.hasOwnProperty(t);
            }),
            (nt.prototype.__iterate = function (t, e) {
              for (
                var n = this._object, r = this._keys, o = r.length - 1, i = 0;
                i <= o;
                i++
              ) {
                var a = r[e ? o - i : i];
                if (!1 === t(n[a], a, this)) return i + 1;
              }
              return i;
            }),
            (nt.prototype.__iterator = function (t, e) {
              var n = this._object,
                r = this._keys,
                o = r.length - 1,
                i = 0;
              return new F(function () {
                var a = r[e ? o - i : i];
                return i++ > o ? { value: void 0, done: !0 } : U(t, a, n[a]);
              });
            }),
            (nt.prototype[h] = !0),
            e(rt, Z),
            (rt.prototype.__iterateUncached = function (t, e) {
              if (e) return this.cacheResult().__iterate(t, e);
              var n = q(this._iterable),
                r = 0;
              if (H(n))
                for (
                  var o;
                  !(o = n.next()).done && !1 !== t(o.value, r++, this);

                );
              return r;
            }),
            (rt.prototype.__iteratorUncached = function (t, e) {
              if (e) return this.cacheResult().__iterator(t, e);
              var n = q(this._iterable);
              if (!H(n)) return new F(j);
              var r = 0;
              return new F(function () {
                var e = n.next();
                return e.done ? e : U(t, r++, e.value);
              });
            }),
            e(ot, Z),
            (ot.prototype.__iterateUncached = function (t, e) {
              if (e) return this.cacheResult().__iterate(t, e);
              for (
                var n, r = this._iterator, o = this._iteratorCache, i = 0;
                i < o.length;

              )
                if (!1 === t(o[i], i++, this)) return i;
              for (; !(n = r.next()).done; ) {
                var a = n.value;
                if (((o[i] = a), !1 === t(a, i++, this))) break;
              }
              return i;
            }),
            (ot.prototype.__iteratorUncached = function (t, e) {
              if (e) return this.cacheResult().__iterator(t, e);
              var n = this._iterator,
                r = this._iteratorCache,
                o = 0;
              return new F(function () {
                if (o >= r.length) {
                  var e = n.next();
                  if (e.done) return e;
                  r[o] = e.value;
                }
                return U(t, o, r[o++]);
              });
            }),
            e(vt, Z),
            (vt.prototype.toString = function () {
              return 0 === this.size
                ? "Repeat []"
                : "Repeat [ " + this._value + " " + this.size + " times ]";
            }),
            (vt.prototype.get = function (t, e) {
              return this.has(t) ? this._value : e;
            }),
            (vt.prototype.includes = function (t) {
              return yt(this._value, t);
            }),
            (vt.prototype.slice = function (t, e) {
              var n = this.size;
              return D(t, e, n) ? this : new vt(this._value, M(e, n) - R(t, n));
            }),
            (vt.prototype.reverse = function () {
              return this;
            }),
            (vt.prototype.indexOf = function (t) {
              return yt(this._value, t) ? 0 : -1;
            }),
            (vt.prototype.lastIndexOf = function (t) {
              return yt(this._value, t) ? this.size : -1;
            }),
            (vt.prototype.__iterate = function (t, e) {
              for (var n = 0; n < this.size; n++)
                if (!1 === t(this._value, n, this)) return n + 1;
              return n;
            }),
            (vt.prototype.__iterator = function (t, e) {
              var n = this,
                r = 0;
              return new F(function () {
                return r < n.size
                  ? U(t, r++, n._value)
                  : { value: void 0, done: !0 };
              });
            }),
            (vt.prototype.equals = function (t) {
              return t instanceof vt ? yt(this._value, t._value) : mt(t);
            }),
            e(St, Z),
            (St.prototype.toString = function () {
              return 0 === this.size
                ? "Range []"
                : "Range [ " +
                    this._start +
                    "..." +
                    this._end +
                    (this._step > 1 ? " by " + this._step : "") +
                    " ]";
            }),
            (St.prototype.get = function (t, e) {
              return this.has(t) ? this._start + T(this, t) * this._step : e;
            }),
            (St.prototype.includes = function (t) {
              var e = (t - this._start) / this._step;
              return e >= 0 && e < this.size && e === Math.floor(e);
            }),
            (St.prototype.slice = function (t, e) {
              return D(t, e, this.size)
                ? this
                : ((t = R(t, this.size)),
                  (e = M(e, this.size)) <= t
                    ? new St(0, 0)
                    : new St(
                        this.get(t, this._end),
                        this.get(e, this._end),
                        this._step,
                      ));
            }),
            (St.prototype.indexOf = function (t) {
              var e = t - this._start;
              if (e % this._step == 0) {
                var n = e / this._step;
                if (n >= 0 && n < this.size) return n;
              }
              return -1;
            }),
            (St.prototype.lastIndexOf = function (t) {
              return this.indexOf(t);
            }),
            (St.prototype.__iterate = function (t, e) {
              for (
                var n = this.size - 1,
                  r = this._step,
                  o = e ? this._start + n * r : this._start,
                  i = 0;
                i <= n;
                i++
              ) {
                if (!1 === t(o, i, this)) return i + 1;
                o += e ? -r : r;
              }
              return i;
            }),
            (St.prototype.__iterator = function (t, e) {
              var n = this.size - 1,
                r = this._step,
                o = e ? this._start + n * r : this._start,
                i = 0;
              return new F(function () {
                var a = o;
                return (
                  (o += e ? -r : r),
                  i > n ? { value: void 0, done: !0 } : U(t, i++, a)
                );
              });
            }),
            (St.prototype.equals = function (t) {
              return t instanceof St
                ? this._start === t._start &&
                    this._end === t._end &&
                    this._step === t._step
                : mt(this, t);
            }),
            e(_t, n),
            e(Et, _t),
            e(wt, _t),
            e(Ct, _t),
            (_t.Keyed = Et),
            (_t.Indexed = wt),
            (_t.Set = Ct);
          var kt =
            "function" == typeof Math.imul && -2 === Math.imul(4294967295, 2)
              ? Math.imul
              : function (t, e) {
                  var n = 65535 & (t |= 0),
                    r = 65535 & (e |= 0);
                  return (
                    (n * r +
                      ((((t >>> 16) * r + n * (e >>> 16)) << 16) >>> 0)) |
                    0
                  );
                };
          function xt(t) {
            return ((t >>> 1) & 1073741824) | (3221225471 & t);
          }
          function Tt(t) {
            if (!1 === t || null == t) return 0;
            if (
              "function" == typeof t.valueOf &&
              (!1 === (t = t.valueOf()) || null == t)
            )
              return 0;
            if (!0 === t) return 1;
            var e = typeof t;
            if ("number" === e) {
              var n = 0 | t;
              for (n !== t && (n ^= 4294967295 * t); t > 4294967295; )
                n ^= t /= 4294967295;
              return xt(n);
            }
            if ("string" === e)
              return t.length > Kt
                ? (function (t) {
                    var e = Pt[t];
                    return (
                      void 0 === e &&
                        ((e = Ot(t)),
                        Nt === Lt && ((Nt = 0), (Pt = {})),
                        Nt++,
                        (Pt[t] = e)),
                      e
                    );
                  })(t)
                : Ot(t);
            if ("function" == typeof t.hashCode) return t.hashCode();
            if ("object" === e)
              return (function (t) {
                var e;
                if (At && void 0 !== (e = Mt.get(t))) return e;
                if (void 0 !== (e = t[Bt])) return e;
                if (!Rt) {
                  if (
                    void 0 !==
                    (e = t.propertyIsEnumerable && t.propertyIsEnumerable[Bt])
                  )
                    return e;
                  if (
                    void 0 !==
                    (e = (function (t) {
                      if (t && t.nodeType > 0)
                        switch (t.nodeType) {
                          case 1:
                            return t.uniqueID;
                          case 9:
                            return (
                              t.documentElement && t.documentElement.uniqueID
                            );
                        }
                    })(t))
                  )
                    return e;
                }
                if (((e = ++It), 1073741824 & It && (It = 0), At)) Mt.set(t, e);
                else {
                  if (void 0 !== Dt && !1 === Dt(t))
                    throw new Error(
                      "Non-extensible objects are not allowed as keys.",
                    );
                  if (Rt)
                    Object.defineProperty(t, Bt, {
                      enumerable: !1,
                      configurable: !1,
                      writable: !1,
                      value: e,
                    });
                  else if (
                    void 0 !== t.propertyIsEnumerable &&
                    t.propertyIsEnumerable ===
                      t.constructor.prototype.propertyIsEnumerable
                  )
                    (t.propertyIsEnumerable = function () {
                      return this.constructor.prototype.propertyIsEnumerable.apply(
                        this,
                        arguments,
                      );
                    }),
                      (t.propertyIsEnumerable[Bt] = e);
                  else {
                    if (void 0 === t.nodeType)
                      throw new Error(
                        "Unable to set a non-enumerable property on object.",
                      );
                    t[Bt] = e;
                  }
                }
                return e;
              })(t);
            if ("function" == typeof t.toString) return Ot(t.toString());
            throw new Error("Value type " + e + " cannot be hashed.");
          }
          function Ot(t) {
            for (var e = 0, n = 0; n < t.length; n++)
              e = (31 * e + t.charCodeAt(n)) | 0;
            return xt(e);
          }
          var Dt = Object.isExtensible,
            Rt = (function () {
              try {
                return Object.defineProperty({}, "@", {}), !0;
              } catch (t) {
                return !1;
              }
            })();
          var Mt,
            At = "function" == typeof WeakMap;
          At && (Mt = new WeakMap());
          var It = 0,
            Bt = "__immutablehash__";
          "function" == typeof Symbol && (Bt = Symbol(Bt));
          var Kt = 16,
            Lt = 255,
            Nt = 0,
            Pt = {};
          function Ft(t) {
            bt(
              t !== 1 / 0,
              "Cannot perform this action with an infinite size.",
            );
          }
          function Ut(t) {
            return null == t
              ? te()
              : jt(t) && !l(t)
              ? t
              : te().withMutations(function (e) {
                  var n = r(t);
                  Ft(n.size),
                    n.forEach(function (t, n) {
                      return e.set(n, t);
                    });
                });
          }
          function jt(t) {
            return !(!t || !t[Ht]);
          }
          e(Ut, Et),
            (Ut.prototype.toString = function () {
              return this.__toString("Map {", "}");
            }),
            (Ut.prototype.get = function (t, e) {
              return this._root ? this._root.get(0, void 0, t, e) : e;
            }),
            (Ut.prototype.set = function (t, e) {
              return ee(this, t, e);
            }),
            (Ut.prototype.setIn = function (t, e) {
              return this.updateIn(t, b, function () {
                return e;
              });
            }),
            (Ut.prototype.remove = function (t) {
              return ee(this, t, b);
            }),
            (Ut.prototype.deleteIn = function (t) {
              return this.updateIn(t, function () {
                return b;
              });
            }),
            (Ut.prototype.update = function (t, e, n) {
              return 1 === arguments.length
                ? t(this)
                : this.updateIn([t], e, n);
            }),
            (Ut.prototype.updateIn = function (t, e, n) {
              n || ((n = e), (e = void 0));
              var r = ue(this, an(t), e, n);
              return r === b ? void 0 : r;
            }),
            (Ut.prototype.clear = function () {
              return 0 === this.size
                ? this
                : this.__ownerID
                ? ((this.size = 0),
                  (this._root = null),
                  (this.__hash = void 0),
                  (this.__altered = !0),
                  this)
                : te();
            }),
            (Ut.prototype.merge = function () {
              return ie(this, void 0, arguments);
            }),
            (Ut.prototype.mergeWith = function (e) {
              return ie(this, e, t.call(arguments, 1));
            }),
            (Ut.prototype.mergeIn = function (e) {
              var n = t.call(arguments, 1);
              return this.updateIn(e, te(), function (t) {
                return "function" == typeof t.merge
                  ? t.merge.apply(t, n)
                  : n[n.length - 1];
              });
            }),
            (Ut.prototype.mergeDeep = function () {
              return ie(this, ae, arguments);
            }),
            (Ut.prototype.mergeDeepWith = function (e) {
              var n = t.call(arguments, 1);
              return ie(this, se(e), n);
            }),
            (Ut.prototype.mergeDeepIn = function (e) {
              var n = t.call(arguments, 1);
              return this.updateIn(e, te(), function (t) {
                return "function" == typeof t.mergeDeep
                  ? t.mergeDeep.apply(t, n)
                  : n[n.length - 1];
              });
            }),
            (Ut.prototype.sort = function (t) {
              return Ae(Ge(this, t));
            }),
            (Ut.prototype.sortBy = function (t, e) {
              return Ae(Ge(this, e, t));
            }),
            (Ut.prototype.withMutations = function (t) {
              var e = this.asMutable();
              return (
                t(e), e.wasAltered() ? e.__ensureOwner(this.__ownerID) : this
              );
            }),
            (Ut.prototype.asMutable = function () {
              return this.__ownerID ? this : this.__ensureOwner(new C());
            }),
            (Ut.prototype.asImmutable = function () {
              return this.__ensureOwner();
            }),
            (Ut.prototype.wasAltered = function () {
              return this.__altered;
            }),
            (Ut.prototype.__iterator = function (t, e) {
              return new Jt(this, t, e);
            }),
            (Ut.prototype.__iterate = function (t, e) {
              var n = this,
                r = 0;
              return (
                this._root &&
                  this._root.iterate(function (e) {
                    return r++, t(e[1], e[0], n);
                  }, e),
                r
              );
            }),
            (Ut.prototype.__ensureOwner = function (t) {
              return t === this.__ownerID
                ? this
                : t
                ? Qt(this.size, this._root, t, this.__hash)
                : ((this.__ownerID = t), (this.__altered = !1), this);
            }),
            (Ut.isMap = jt);
          var zt,
            Ht = "@@__IMMUTABLE_MAP__@@",
            qt = Ut.prototype;
          function Wt(t, e) {
            (this.ownerID = t), (this.entries = e);
          }
          function $t(t, e, n) {
            (this.ownerID = t), (this.bitmap = e), (this.nodes = n);
          }
          function Vt(t, e, n) {
            (this.ownerID = t), (this.count = e), (this.nodes = n);
          }
          function Gt(t, e, n) {
            (this.ownerID = t), (this.keyHash = e), (this.entries = n);
          }
          function Zt(t, e, n) {
            (this.ownerID = t), (this.keyHash = e), (this.entry = n);
          }
          function Jt(t, e, n) {
            (this._type = e),
              (this._reverse = n),
              (this._stack = t._root && Xt(t._root));
          }
          function Yt(t, e) {
            return U(t, e[0], e[1]);
          }
          function Xt(t, e) {
            return { node: t, index: 0, __prev: e };
          }
          function Qt(t, e, n, r) {
            var o = Object.create(qt);
            return (
              (o.size = t),
              (o._root = e),
              (o.__ownerID = n),
              (o.__hash = r),
              (o.__altered = !1),
              o
            );
          }
          function te() {
            return zt || (zt = Qt(0));
          }
          function ee(t, e, n) {
            var r, o;
            if (t._root) {
              var i = E(S),
                a = E(_);
              if (
                ((r = ne(t._root, t.__ownerID, 0, void 0, e, n, i, a)),
                !a.value)
              )
                return t;
              o = t.size + (i.value ? (n === b ? -1 : 1) : 0);
            } else {
              if (n === b) return t;
              (o = 1), (r = new Wt(t.__ownerID, [[e, n]]));
            }
            return t.__ownerID
              ? ((t.size = o),
                (t._root = r),
                (t.__hash = void 0),
                (t.__altered = !0),
                t)
              : r
              ? Qt(o, r)
              : te();
          }
          function ne(t, e, n, r, o, i, a, s) {
            return t
              ? t.update(e, n, r, o, i, a, s)
              : i === b
              ? t
              : (w(s), w(a), new Zt(e, r, [o, i]));
          }
          function re(t) {
            return t.constructor === Zt || t.constructor === Gt;
          }
          function oe(t, e, n, r, o) {
            if (t.keyHash === r) return new Gt(e, r, [t.entry, o]);
            var i,
              a = (0 === n ? t.keyHash : t.keyHash >>> n) & v,
              s = (0 === n ? r : r >>> n) & v;
            return new $t(
              e,
              (1 << a) | (1 << s),
              a === s
                ? [oe(t, e, n + y, r, o)]
                : ((i = new Zt(e, r, o)), a < s ? [t, i] : [i, t]),
            );
          }
          function ie(t, e, n) {
            for (var o = [], i = 0; i < n.length; i++) {
              var s = n[i],
                c = r(s);
              a(s) ||
                (c = c.map(function (t) {
                  return pt(t);
                })),
                o.push(c);
            }
            return ce(t, e, o);
          }
          function ae(t, e, n) {
            return t && t.mergeDeep && a(e) ? t.mergeDeep(e) : yt(t, e) ? t : e;
          }
          function se(t) {
            return function (e, n, r) {
              if (e && e.mergeDeepWith && a(n)) return e.mergeDeepWith(t, n);
              var o = t(e, n, r);
              return yt(e, o) ? e : o;
            };
          }
          function ce(t, e, n) {
            return 0 ===
              (n = n.filter(function (t) {
                return 0 !== t.size;
              })).length
              ? t
              : 0 !== t.size || t.__ownerID || 1 !== n.length
              ? t.withMutations(function (t) {
                  for (
                    var r = e
                        ? function (n, r) {
                            t.update(r, b, function (t) {
                              return t === b ? n : e(t, n, r);
                            });
                          }
                        : function (e, n) {
                            t.set(n, e);
                          },
                      o = 0;
                    o < n.length;
                    o++
                  )
                    n[o].forEach(r);
                })
              : t.constructor(n[0]);
          }
          function ue(t, e, n, r) {
            var o = t === b,
              i = e.next();
            if (i.done) {
              var a = o ? n : t,
                s = r(a);
              return s === a ? t : s;
            }
            bt(o || (t && t.set), "invalid keyPath");
            var c = i.value,
              u = o ? b : t.get(c, b),
              l = ue(u, e, n, r);
            return l === u
              ? t
              : l === b
              ? t.remove(c)
              : (o ? te() : t).set(c, l);
          }
          function le(t) {
            return (
              (t =
                ((t =
                  (858993459 & (t -= (t >> 1) & 1431655765)) +
                  ((t >> 2) & 858993459)) +
                  (t >> 4)) &
                252645135),
              127 & ((t += t >> 8) + (t >> 16))
            );
          }
          function fe(t, e, n, r) {
            var o = r ? t : k(t);
            return (o[e] = n), o;
          }
          (qt[Ht] = !0),
            (qt[g] = qt.remove),
            (qt.removeIn = qt.deleteIn),
            (Wt.prototype.get = function (t, e, n, r) {
              for (var o = this.entries, i = 0, a = o.length; i < a; i++)
                if (yt(n, o[i][0])) return o[i][1];
              return r;
            }),
            (Wt.prototype.update = function (t, e, n, r, o, i, a) {
              for (
                var s = o === b, c = this.entries, u = 0, l = c.length;
                u < l && !yt(r, c[u][0]);
                u++
              );
              var f = u < l;
              if (f ? c[u][1] === o : s) return this;
              if ((w(a), (s || !f) && w(i), !s || 1 !== c.length)) {
                if (!f && !s && c.length >= pe)
                  return (function (t, e, n, r) {
                    t || (t = new C());
                    for (
                      var o = new Zt(t, Tt(n), [n, r]), i = 0;
                      i < e.length;
                      i++
                    ) {
                      var a = e[i];
                      o = o.update(t, 0, void 0, a[0], a[1]);
                    }
                    return o;
                  })(t, c, r, o);
                var p = t && t === this.ownerID,
                  d = p ? c : k(c);
                return (
                  f
                    ? s
                      ? u === l - 1
                        ? d.pop()
                        : (d[u] = d.pop())
                      : (d[u] = [r, o])
                    : d.push([r, o]),
                  p ? ((this.entries = d), this) : new Wt(t, d)
                );
              }
            }),
            ($t.prototype.get = function (t, e, n, r) {
              void 0 === e && (e = Tt(n));
              var o = 1 << ((0 === t ? e : e >>> t) & v),
                i = this.bitmap;
              return 0 == (i & o)
                ? r
                : this.nodes[le(i & (o - 1))].get(t + y, e, n, r);
            }),
            ($t.prototype.update = function (t, e, n, r, o, i, a) {
              void 0 === n && (n = Tt(r));
              var s = (0 === e ? n : n >>> e) & v,
                c = 1 << s,
                u = this.bitmap,
                l = 0 != (u & c);
              if (!l && o === b) return this;
              var f = le(u & (c - 1)),
                p = this.nodes,
                d = l ? p[f] : void 0,
                h = ne(d, t, e + y, n, r, o, i, a);
              if (h === d) return this;
              if (!l && h && p.length >= de)
                return (function (t, e, n, r, o) {
                  for (
                    var i = 0, a = new Array(m), s = 0;
                    0 !== n;
                    s++, n >>>= 1
                  )
                    a[s] = 1 & n ? e[i++] : void 0;
                  return (a[r] = o), new Vt(t, i + 1, a);
                })(t, p, u, s, h);
              if (l && !h && 2 === p.length && re(p[1 ^ f])) return p[1 ^ f];
              if (l && h && 1 === p.length && re(h)) return h;
              var g = t && t === this.ownerID,
                S = l ? (h ? u : u ^ c) : u | c,
                _ = l
                  ? h
                    ? fe(p, f, h, g)
                    : (function (t, e, n) {
                        var r = t.length - 1;
                        if (n && e === r) return t.pop(), t;
                        for (var o = new Array(r), i = 0, a = 0; a < r; a++)
                          a === e && (i = 1), (o[a] = t[a + i]);
                        return o;
                      })(p, f, g)
                  : (function (t, e, n, r) {
                      var o = t.length + 1;
                      if (r && e + 1 === o) return (t[e] = n), t;
                      for (var i = new Array(o), a = 0, s = 0; s < o; s++)
                        s === e ? ((i[s] = n), (a = -1)) : (i[s] = t[s + a]);
                      return i;
                    })(p, f, h, g);
              return g
                ? ((this.bitmap = S), (this.nodes = _), this)
                : new $t(t, S, _);
            }),
            (Vt.prototype.get = function (t, e, n, r) {
              void 0 === e && (e = Tt(n));
              var o = (0 === t ? e : e >>> t) & v,
                i = this.nodes[o];
              return i ? i.get(t + y, e, n, r) : r;
            }),
            (Vt.prototype.update = function (t, e, n, r, o, i, a) {
              void 0 === n && (n = Tt(r));
              var s = (0 === e ? n : n >>> e) & v,
                c = o === b,
                u = this.nodes,
                l = u[s];
              if (c && !l) return this;
              var f = ne(l, t, e + y, n, r, o, i, a);
              if (f === l) return this;
              var p = this.count;
              if (l) {
                if (!f && --p < he)
                  return (function (t, e, n, r) {
                    for (
                      var o = 0,
                        i = 0,
                        a = new Array(n),
                        s = 0,
                        c = 1,
                        u = e.length;
                      s < u;
                      s++, c <<= 1
                    ) {
                      var l = e[s];
                      void 0 !== l && s !== r && ((o |= c), (a[i++] = l));
                    }
                    return new $t(t, o, a);
                  })(t, u, p, s);
              } else p++;
              var d = t && t === this.ownerID,
                h = fe(u, s, f, d);
              return d
                ? ((this.count = p), (this.nodes = h), this)
                : new Vt(t, p, h);
            }),
            (Gt.prototype.get = function (t, e, n, r) {
              for (var o = this.entries, i = 0, a = o.length; i < a; i++)
                if (yt(n, o[i][0])) return o[i][1];
              return r;
            }),
            (Gt.prototype.update = function (t, e, n, r, o, i, a) {
              void 0 === n && (n = Tt(r));
              var s = o === b;
              if (n !== this.keyHash)
                return s ? this : (w(a), w(i), oe(this, t, e, n, [r, o]));
              for (
                var c = this.entries, u = 0, l = c.length;
                u < l && !yt(r, c[u][0]);
                u++
              );
              var f = u < l;
              if (f ? c[u][1] === o : s) return this;
              if ((w(a), (s || !f) && w(i), s && 2 === l))
                return new Zt(t, this.keyHash, c[1 ^ u]);
              var p = t && t === this.ownerID,
                d = p ? c : k(c);
              return (
                f
                  ? s
                    ? u === l - 1
                      ? d.pop()
                      : (d[u] = d.pop())
                    : (d[u] = [r, o])
                  : d.push([r, o]),
                p ? ((this.entries = d), this) : new Gt(t, this.keyHash, d)
              );
            }),
            (Zt.prototype.get = function (t, e, n, r) {
              return yt(n, this.entry[0]) ? this.entry[1] : r;
            }),
            (Zt.prototype.update = function (t, e, n, r, o, i, a) {
              var s = o === b,
                c = yt(r, this.entry[0]);
              return (c ? o === this.entry[1] : s)
                ? this
                : (w(a),
                  s
                    ? void w(i)
                    : c
                    ? t && t === this.ownerID
                      ? ((this.entry[1] = o), this)
                      : new Zt(t, this.keyHash, [r, o])
                    : (w(i), oe(this, t, e, Tt(r), [r, o])));
            }),
            (Wt.prototype.iterate = Gt.prototype.iterate =
              function (t, e) {
                for (var n = this.entries, r = 0, o = n.length - 1; r <= o; r++)
                  if (!1 === t(n[e ? o - r : r])) return !1;
              }),
            ($t.prototype.iterate = Vt.prototype.iterate =
              function (t, e) {
                for (var n = this.nodes, r = 0, o = n.length - 1; r <= o; r++) {
                  var i = n[e ? o - r : r];
                  if (i && !1 === i.iterate(t, e)) return !1;
                }
              }),
            (Zt.prototype.iterate = function (t, e) {
              return t(this.entry);
            }),
            e(Jt, F),
            (Jt.prototype.next = function () {
              for (var t = this._type, e = this._stack; e; ) {
                var n,
                  r = e.node,
                  o = e.index++;
                if (r.entry) {
                  if (0 === o) return Yt(t, r.entry);
                } else if (r.entries) {
                  if (o <= (n = r.entries.length - 1))
                    return Yt(t, r.entries[this._reverse ? n - o : o]);
                } else if (o <= (n = r.nodes.length - 1)) {
                  var i = r.nodes[this._reverse ? n - o : o];
                  if (i) {
                    if (i.entry) return Yt(t, i.entry);
                    e = this._stack = Xt(i, e);
                  }
                  continue;
                }
                e = this._stack = this._stack.__prev;
              }
              return { value: void 0, done: !0 };
            });
          var pe = m / 4,
            de = m / 2,
            he = m / 4;
          function ge(t) {
            var e = ke();
            if (null == t) return e;
            if (ye(t)) return t;
            var n = o(t),
              r = n.size;
            return 0 === r
              ? e
              : (Ft(r),
                r > 0 && r < m
                  ? Ce(0, r, y, null, new be(n.toArray()))
                  : e.withMutations(function (t) {
                      t.setSize(r),
                        n.forEach(function (e, n) {
                          return t.set(n, e);
                        });
                    }));
          }
          function ye(t) {
            return !(!t || !t[me]);
          }
          e(ge, wt),
            (ge.of = function () {
              return this(arguments);
            }),
            (ge.prototype.toString = function () {
              return this.__toString("List [", "]");
            }),
            (ge.prototype.get = function (t, e) {
              if ((t = T(this, t)) >= 0 && t < this.size) {
                var n = Oe(this, (t += this._origin));
                return n && n.array[t & v];
              }
              return e;
            }),
            (ge.prototype.set = function (t, e) {
              return (function (t, e, n) {
                if ((e = T(t, e)) != e) return t;
                if (e >= t.size || e < 0)
                  return t.withMutations(function (t) {
                    e < 0 ? De(t, e).set(0, n) : De(t, 0, e + 1).set(e, n);
                  });
                e += t._origin;
                var r = t._tail,
                  o = t._root,
                  i = E(_);
                return (
                  e >= Me(t._capacity)
                    ? (r = xe(r, t.__ownerID, 0, e, n, i))
                    : (o = xe(o, t.__ownerID, t._level, e, n, i)),
                  i.value
                    ? t.__ownerID
                      ? ((t._root = o),
                        (t._tail = r),
                        (t.__hash = void 0),
                        (t.__altered = !0),
                        t)
                      : Ce(t._origin, t._capacity, t._level, o, r)
                    : t
                );
              })(this, t, e);
            }),
            (ge.prototype.remove = function (t) {
              return this.has(t)
                ? 0 === t
                  ? this.shift()
                  : t === this.size - 1
                  ? this.pop()
                  : this.splice(t, 1)
                : this;
            }),
            (ge.prototype.insert = function (t, e) {
              return this.splice(t, 0, e);
            }),
            (ge.prototype.clear = function () {
              return 0 === this.size
                ? this
                : this.__ownerID
                ? ((this.size = this._origin = this._capacity = 0),
                  (this._level = y),
                  (this._root = this._tail = null),
                  (this.__hash = void 0),
                  (this.__altered = !0),
                  this)
                : ke();
            }),
            (ge.prototype.push = function () {
              var t = arguments,
                e = this.size;
              return this.withMutations(function (n) {
                De(n, 0, e + t.length);
                for (var r = 0; r < t.length; r++) n.set(e + r, t[r]);
              });
            }),
            (ge.prototype.pop = function () {
              return De(this, 0, -1);
            }),
            (ge.prototype.unshift = function () {
              var t = arguments;
              return this.withMutations(function (e) {
                De(e, -t.length);
                for (var n = 0; n < t.length; n++) e.set(n, t[n]);
              });
            }),
            (ge.prototype.shift = function () {
              return De(this, 1);
            }),
            (ge.prototype.merge = function () {
              return Re(this, void 0, arguments);
            }),
            (ge.prototype.mergeWith = function (e) {
              return Re(this, e, t.call(arguments, 1));
            }),
            (ge.prototype.mergeDeep = function () {
              return Re(this, ae, arguments);
            }),
            (ge.prototype.mergeDeepWith = function (e) {
              var n = t.call(arguments, 1);
              return Re(this, se(e), n);
            }),
            (ge.prototype.setSize = function (t) {
              return De(this, 0, t);
            }),
            (ge.prototype.slice = function (t, e) {
              var n = this.size;
              return D(t, e, n) ? this : De(this, R(t, n), M(e, n));
            }),
            (ge.prototype.__iterator = function (t, e) {
              var n = 0,
                r = we(this, e);
              return new F(function () {
                var e = r();
                return e === Ee ? { value: void 0, done: !0 } : U(t, n++, e);
              });
            }),
            (ge.prototype.__iterate = function (t, e) {
              for (
                var n, r = 0, o = we(this, e);
                (n = o()) !== Ee && !1 !== t(n, r++, this);

              );
              return r;
            }),
            (ge.prototype.__ensureOwner = function (t) {
              return t === this.__ownerID
                ? this
                : t
                ? Ce(
                    this._origin,
                    this._capacity,
                    this._level,
                    this._root,
                    this._tail,
                    t,
                    this.__hash,
                  )
                : ((this.__ownerID = t), this);
            }),
            (ge.isList = ye);
          var me = "@@__IMMUTABLE_LIST__@@",
            ve = ge.prototype;
          function be(t, e) {
            (this.array = t), (this.ownerID = e);
          }
          (ve[me] = !0),
            (ve[g] = ve.remove),
            (ve.setIn = qt.setIn),
            (ve.deleteIn = ve.removeIn = qt.removeIn),
            (ve.update = qt.update),
            (ve.updateIn = qt.updateIn),
            (ve.mergeIn = qt.mergeIn),
            (ve.mergeDeepIn = qt.mergeDeepIn),
            (ve.withMutations = qt.withMutations),
            (ve.asMutable = qt.asMutable),
            (ve.asImmutable = qt.asImmutable),
            (ve.wasAltered = qt.wasAltered),
            (be.prototype.removeBefore = function (t, e, n) {
              if (n === e ? 1 << e : 0 === this.array.length) return this;
              var r = (n >>> e) & v;
              if (r >= this.array.length) return new be([], t);
              var o,
                i = 0 === r;
              if (e > 0) {
                var a = this.array[r];
                if ((o = a && a.removeBefore(t, e - y, n)) === a && i)
                  return this;
              }
              if (i && !o) return this;
              var s = Te(this, t);
              if (!i) for (var c = 0; c < r; c++) s.array[c] = void 0;
              return o && (s.array[r] = o), s;
            }),
            (be.prototype.removeAfter = function (t, e, n) {
              if (n === (e ? 1 << e : 0) || 0 === this.array.length)
                return this;
              var r,
                o = ((n - 1) >>> e) & v;
              if (o >= this.array.length) return this;
              if (e > 0) {
                var i = this.array[o];
                if (
                  (r = i && i.removeAfter(t, e - y, n)) === i &&
                  o === this.array.length - 1
                )
                  return this;
              }
              var a = Te(this, t);
              return a.array.splice(o + 1), r && (a.array[o] = r), a;
            });
          var Se,
            _e,
            Ee = {};
          function we(t, e) {
            var n = t._origin,
              r = t._capacity,
              o = Me(r),
              i = t._tail;
            return a(t._root, t._level, 0);
            function a(t, s, c) {
              return 0 === s
                ? (function (t, a) {
                    var s = a === o ? i && i.array : t && t.array,
                      c = a > n ? 0 : n - a,
                      u = r - a;
                    return (
                      u > m && (u = m),
                      function () {
                        if (c === u) return Ee;
                        var t = e ? --u : c++;
                        return s && s[t];
                      }
                    );
                  })(t, c)
                : (function (t, o, i) {
                    var s,
                      c = t && t.array,
                      u = i > n ? 0 : (n - i) >> o,
                      l = 1 + ((r - i) >> o);
                    return (
                      l > m && (l = m),
                      function () {
                        for (;;) {
                          if (s) {
                            var t = s();
                            if (t !== Ee) return t;
                            s = null;
                          }
                          if (u === l) return Ee;
                          var n = e ? --l : u++;
                          s = a(c && c[n], o - y, i + (n << o));
                        }
                      }
                    );
                  })(t, s, c);
            }
          }
          function Ce(t, e, n, r, o, i, a) {
            var s = Object.create(ve);
            return (
              (s.size = e - t),
              (s._origin = t),
              (s._capacity = e),
              (s._level = n),
              (s._root = r),
              (s._tail = o),
              (s.__ownerID = i),
              (s.__hash = a),
              (s.__altered = !1),
              s
            );
          }
          function ke() {
            return Se || (Se = Ce(0, 0, y));
          }
          function xe(t, e, n, r, o, i) {
            var a,
              s = (r >>> n) & v,
              c = t && s < t.array.length;
            if (!c && void 0 === o) return t;
            if (n > 0) {
              var u = t && t.array[s],
                l = xe(u, e, n - y, r, o, i);
              return l === u ? t : (((a = Te(t, e)).array[s] = l), a);
            }
            return c && t.array[s] === o
              ? t
              : (w(i),
                (a = Te(t, e)),
                void 0 === o && s === a.array.length - 1
                  ? a.array.pop()
                  : (a.array[s] = o),
                a);
          }
          function Te(t, e) {
            return e && t && e === t.ownerID
              ? t
              : new be(t ? t.array.slice() : [], e);
          }
          function Oe(t, e) {
            if (e >= Me(t._capacity)) return t._tail;
            if (e < 1 << (t._level + y)) {
              for (var n = t._root, r = t._level; n && r > 0; )
                (n = n.array[(e >>> r) & v]), (r -= y);
              return n;
            }
          }
          function De(t, e, n) {
            void 0 !== e && (e |= 0), void 0 !== n && (n |= 0);
            var r = t.__ownerID || new C(),
              o = t._origin,
              i = t._capacity,
              a = o + e,
              s = void 0 === n ? i : n < 0 ? i + n : o + n;
            if (a === o && s === i) return t;
            if (a >= s) return t.clear();
            for (var c = t._level, u = t._root, l = 0; a + l < 0; )
              (u = new be(u && u.array.length ? [void 0, u] : [], r)),
                (l += 1 << (c += y));
            l && ((a += l), (o += l), (s += l), (i += l));
            for (var f = Me(i), p = Me(s); p >= 1 << (c + y); )
              (u = new be(u && u.array.length ? [u] : [], r)), (c += y);
            var d = t._tail,
              h = p < f ? Oe(t, s - 1) : p > f ? new be([], r) : d;
            if (d && p > f && a < i && d.array.length) {
              for (var g = (u = Te(u, r)), m = c; m > y; m -= y) {
                var b = (f >>> m) & v;
                g = g.array[b] = Te(g.array[b], r);
              }
              g.array[(f >>> y) & v] = d;
            }
            if ((s < i && (h = h && h.removeAfter(r, 0, s)), a >= p))
              (a -= p),
                (s -= p),
                (c = y),
                (u = null),
                (h = h && h.removeBefore(r, 0, a));
            else if (a > o || p < f) {
              for (l = 0; u; ) {
                var S = (a >>> c) & v;
                if ((S !== p >>> c) & v) break;
                S && (l += (1 << c) * S), (c -= y), (u = u.array[S]);
              }
              u && a > o && (u = u.removeBefore(r, c, a - l)),
                u && p < f && (u = u.removeAfter(r, c, p - l)),
                l && ((a -= l), (s -= l));
            }
            return t.__ownerID
              ? ((t.size = s - a),
                (t._origin = a),
                (t._capacity = s),
                (t._level = c),
                (t._root = u),
                (t._tail = h),
                (t.__hash = void 0),
                (t.__altered = !0),
                t)
              : Ce(a, s, c, u, h);
          }
          function Re(t, e, n) {
            for (var r = [], i = 0, s = 0; s < n.length; s++) {
              var c = n[s],
                u = o(c);
              u.size > i && (i = u.size),
                a(c) ||
                  (u = u.map(function (t) {
                    return pt(t);
                  })),
                r.push(u);
            }
            return i > t.size && (t = t.setSize(i)), ce(t, e, r);
          }
          function Me(t) {
            return t < m ? 0 : ((t - 1) >>> y) << y;
          }
          function Ae(t) {
            return null == t
              ? Ke()
              : Ie(t)
              ? t
              : Ke().withMutations(function (e) {
                  var n = r(t);
                  Ft(n.size),
                    n.forEach(function (t, n) {
                      return e.set(n, t);
                    });
                });
          }
          function Ie(t) {
            return jt(t) && l(t);
          }
          function Be(t, e, n, r) {
            var o = Object.create(Ae.prototype);
            return (
              (o.size = t ? t.size : 0),
              (o._map = t),
              (o._list = e),
              (o.__ownerID = n),
              (o.__hash = r),
              o
            );
          }
          function Ke() {
            return _e || (_e = Be(te(), ke()));
          }
          function Le(t, e, n) {
            var r,
              o,
              i = t._map,
              a = t._list,
              s = i.get(e),
              c = void 0 !== s;
            if (n === b) {
              if (!c) return t;
              a.size >= m && a.size >= 2 * i.size
                ? ((r = (o = a.filter(function (t, e) {
                    return void 0 !== t && s !== e;
                  }))
                    .toKeyedSeq()
                    .map(function (t) {
                      return t[0];
                    })
                    .flip()
                    .toMap()),
                  t.__ownerID && (r.__ownerID = o.__ownerID = t.__ownerID))
                : ((r = i.remove(e)),
                  (o = s === a.size - 1 ? a.pop() : a.set(s, void 0)));
            } else if (c) {
              if (n === a.get(s)[1]) return t;
              (r = i), (o = a.set(s, [e, n]));
            } else (r = i.set(e, a.size)), (o = a.set(a.size, [e, n]));
            return t.__ownerID
              ? ((t.size = r.size),
                (t._map = r),
                (t._list = o),
                (t.__hash = void 0),
                t)
              : Be(r, o);
          }
          function Ne(t, e) {
            (this._iter = t), (this._useKeys = e), (this.size = t.size);
          }
          function Pe(t) {
            (this._iter = t), (this.size = t.size);
          }
          function Fe(t) {
            (this._iter = t), (this.size = t.size);
          }
          function Ue(t) {
            (this._iter = t), (this.size = t.size);
          }
          function je(t) {
            var e = nn(t);
            return (
              (e._iter = t),
              (e.size = t.size),
              (e.flip = function () {
                return t;
              }),
              (e.reverse = function () {
                var e = t.reverse.apply(this);
                return (
                  (e.flip = function () {
                    return t.reverse();
                  }),
                  e
                );
              }),
              (e.has = function (e) {
                return t.includes(e);
              }),
              (e.includes = function (e) {
                return t.has(e);
              }),
              (e.cacheResult = rn),
              (e.__iterateUncached = function (e, n) {
                var r = this;
                return t.__iterate(function (t, n) {
                  return !1 !== e(n, t, r);
                }, n);
              }),
              (e.__iteratorUncached = function (e, n) {
                if (e === K) {
                  var r = t.__iterator(e, n);
                  return new F(function () {
                    var t = r.next();
                    if (!t.done) {
                      var e = t.value[0];
                      (t.value[0] = t.value[1]), (t.value[1] = e);
                    }
                    return t;
                  });
                }
                return t.__iterator(e === B ? I : B, n);
              }),
              e
            );
          }
          function ze(t, e, n) {
            var r = nn(t);
            return (
              (r.size = t.size),
              (r.has = function (e) {
                return t.has(e);
              }),
              (r.get = function (r, o) {
                var i = t.get(r, b);
                return i === b ? o : e.call(n, i, r, t);
              }),
              (r.__iterateUncached = function (r, o) {
                var i = this;
                return t.__iterate(function (t, o, a) {
                  return !1 !== r(e.call(n, t, o, a), o, i);
                }, o);
              }),
              (r.__iteratorUncached = function (r, o) {
                var i = t.__iterator(K, o);
                return new F(function () {
                  var o = i.next();
                  if (o.done) return o;
                  var a = o.value,
                    s = a[0];
                  return U(r, s, e.call(n, a[1], s, t), o);
                });
              }),
              r
            );
          }
          function He(t, e) {
            var n = nn(t);
            return (
              (n._iter = t),
              (n.size = t.size),
              (n.reverse = function () {
                return t;
              }),
              t.flip &&
                (n.flip = function () {
                  var e = je(t);
                  return (
                    (e.reverse = function () {
                      return t.flip();
                    }),
                    e
                  );
                }),
              (n.get = function (n, r) {
                return t.get(e ? n : -1 - n, r);
              }),
              (n.has = function (n) {
                return t.has(e ? n : -1 - n);
              }),
              (n.includes = function (e) {
                return t.includes(e);
              }),
              (n.cacheResult = rn),
              (n.__iterate = function (e, n) {
                var r = this;
                return t.__iterate(function (t, n) {
                  return e(t, n, r);
                }, !n);
              }),
              (n.__iterator = function (e, n) {
                return t.__iterator(e, !n);
              }),
              n
            );
          }
          function qe(t, e, n, r) {
            var o = nn(t);
            return (
              r &&
                ((o.has = function (r) {
                  var o = t.get(r, b);
                  return o !== b && !!e.call(n, o, r, t);
                }),
                (o.get = function (r, o) {
                  var i = t.get(r, b);
                  return i !== b && e.call(n, i, r, t) ? i : o;
                })),
              (o.__iterateUncached = function (o, i) {
                var a = this,
                  s = 0;
                return (
                  t.__iterate(function (t, i, c) {
                    if (e.call(n, t, i, c)) return s++, o(t, r ? i : s - 1, a);
                  }, i),
                  s
                );
              }),
              (o.__iteratorUncached = function (o, i) {
                var a = t.__iterator(K, i),
                  s = 0;
                return new F(function () {
                  for (;;) {
                    var i = a.next();
                    if (i.done) return i;
                    var c = i.value,
                      u = c[0],
                      l = c[1];
                    if (e.call(n, l, u, t)) return U(o, r ? u : s++, l, i);
                  }
                });
              }),
              o
            );
          }
          function We(t, e, n, r) {
            var o = t.size;
            if (
              (void 0 !== e && (e |= 0), void 0 !== n && (n |= 0), D(e, n, o))
            )
              return t;
            var i = R(e, o),
              a = M(n, o);
            if (i != i || a != a) return We(t.toSeq().cacheResult(), e, n, r);
            var s,
              c = a - i;
            c == c && (s = c < 0 ? 0 : c);
            var u = nn(t);
            return (
              (u.size = 0 === s ? s : (t.size && s) || void 0),
              !r &&
                it(t) &&
                s >= 0 &&
                (u.get = function (e, n) {
                  return (e = T(this, e)) >= 0 && e < s ? t.get(e + i, n) : n;
                }),
              (u.__iterateUncached = function (e, n) {
                var o = this;
                if (0 === s) return 0;
                if (n) return this.cacheResult().__iterate(e, n);
                var a = 0,
                  c = !0,
                  u = 0;
                return (
                  t.__iterate(function (t, n) {
                    if (!c || !(c = a++ < i))
                      return u++, !1 !== e(t, r ? n : u - 1, o) && u !== s;
                  }),
                  u
                );
              }),
              (u.__iteratorUncached = function (e, n) {
                if (0 !== s && n) return this.cacheResult().__iterator(e, n);
                var o = 0 !== s && t.__iterator(e, n),
                  a = 0,
                  c = 0;
                return new F(function () {
                  for (; a++ < i; ) o.next();
                  if (++c > s) return { value: void 0, done: !0 };
                  var t = o.next();
                  return r || e === B
                    ? t
                    : U(e, c - 1, e === I ? void 0 : t.value[1], t);
                });
              }),
              u
            );
          }
          function $e(t, e, n, r) {
            var o = nn(t);
            return (
              (o.__iterateUncached = function (o, i) {
                var a = this;
                if (i) return this.cacheResult().__iterate(o, i);
                var s = !0,
                  c = 0;
                return (
                  t.__iterate(function (t, i, u) {
                    if (!s || !(s = e.call(n, t, i, u)))
                      return c++, o(t, r ? i : c - 1, a);
                  }),
                  c
                );
              }),
              (o.__iteratorUncached = function (o, i) {
                var a = this;
                if (i) return this.cacheResult().__iterator(o, i);
                var s = t.__iterator(K, i),
                  c = !0,
                  u = 0;
                return new F(function () {
                  var t, i, l;
                  do {
                    if ((t = s.next()).done)
                      return r || o === B
                        ? t
                        : U(o, u++, o === I ? void 0 : t.value[1], t);
                    var f = t.value;
                    (i = f[0]), (l = f[1]), c && (c = e.call(n, l, i, a));
                  } while (c);
                  return o === K ? t : U(o, i, l, t);
                });
              }),
              o
            );
          }
          function Ve(t, e, n) {
            var r = nn(t);
            return (
              (r.__iterateUncached = function (r, o) {
                var i = 0,
                  s = !1;
                return (
                  (function t(c, u) {
                    var l = this;
                    c.__iterate(function (o, c) {
                      return (
                        (!e || u < e) && a(o)
                          ? t(o, u + 1)
                          : !1 === r(o, n ? c : i++, l) && (s = !0),
                        !s
                      );
                    }, o);
                  })(t, 0),
                  i
                );
              }),
              (r.__iteratorUncached = function (r, o) {
                var i = t.__iterator(r, o),
                  s = [],
                  c = 0;
                return new F(function () {
                  for (; i; ) {
                    var t = i.next();
                    if (!1 === t.done) {
                      var u = t.value;
                      if (
                        (r === K && (u = u[1]), (e && !(s.length < e)) || !a(u))
                      )
                        return n ? t : U(r, c++, u, t);
                      s.push(i), (i = u.__iterator(r, o));
                    } else i = s.pop();
                  }
                  return { value: void 0, done: !0 };
                });
              }),
              r
            );
          }
          function Ge(t, e, n) {
            e || (e = on);
            var r = s(t),
              o = 0,
              i = t
                .toSeq()
                .map(function (e, r) {
                  return [r, e, o++, n ? n(e, r, t) : e];
                })
                .toArray();
            return (
              i
                .sort(function (t, n) {
                  return e(t[3], n[3]) || t[2] - n[2];
                })
                .forEach(
                  r
                    ? function (t, e) {
                        i[e].length = 2;
                      }
                    : function (t, e) {
                        i[e] = t[1];
                      },
                ),
              r ? G(i) : c(t) ? Z(i) : J(i)
            );
          }
          function Ze(t, e, n) {
            if ((e || (e = on), n)) {
              var r = t
                .toSeq()
                .map(function (e, r) {
                  return [e, n(e, r, t)];
                })
                .reduce(function (t, n) {
                  return Je(e, t[1], n[1]) ? n : t;
                });
              return r && r[0];
            }
            return t.reduce(function (t, n) {
              return Je(e, t, n) ? n : t;
            });
          }
          function Je(t, e, n) {
            var r = t(n, e);
            return (0 === r && n !== e && (null == n || n != n)) || r > 0;
          }
          function Ye(t, e, r) {
            var o = nn(t);
            return (
              (o.size = new et(r)
                .map(function (t) {
                  return t.size;
                })
                .min()),
              (o.__iterate = function (t, e) {
                for (
                  var n, r = this.__iterator(B, e), o = 0;
                  !(n = r.next()).done && !1 !== t(n.value, o++, this);

                );
                return o;
              }),
              (o.__iteratorUncached = function (t, o) {
                var i = r.map(function (t) {
                    return (t = n(t)), q(o ? t.reverse() : t);
                  }),
                  a = 0,
                  s = !1;
                return new F(function () {
                  var n;
                  return (
                    s ||
                      ((n = i.map(function (t) {
                        return t.next();
                      })),
                      (s = n.some(function (t) {
                        return t.done;
                      }))),
                    s
                      ? { value: void 0, done: !0 }
                      : U(
                          t,
                          a++,
                          e.apply(
                            null,
                            n.map(function (t) {
                              return t.value;
                            }),
                          ),
                        )
                  );
                });
              }),
              o
            );
          }
          function Xe(t, e) {
            return it(t) ? e : t.constructor(e);
          }
          function Qe(t) {
            if (t !== Object(t))
              throw new TypeError("Expected [K, V] tuple: " + t);
          }
          function tn(t) {
            return Ft(t.size), x(t);
          }
          function en(t) {
            return s(t) ? r : c(t) ? o : i;
          }
          function nn(t) {
            return Object.create((s(t) ? G : c(t) ? Z : J).prototype);
          }
          function rn() {
            return this._iter.cacheResult
              ? (this._iter.cacheResult(), (this.size = this._iter.size), this)
              : V.prototype.cacheResult.call(this);
          }
          function on(t, e) {
            return t > e ? 1 : t < e ? -1 : 0;
          }
          function an(t) {
            var e = q(t);
            if (!e) {
              if (!$(t))
                throw new TypeError("Expected iterable or array-like: " + t);
              e = q(n(t));
            }
            return e;
          }
          function sn(t, e) {
            var n,
              r = function (i) {
                if (i instanceof r) return i;
                if (!(this instanceof r)) return new r(i);
                if (!n) {
                  n = !0;
                  var a = Object.keys(t);
                  (function (t, e) {
                    try {
                      e.forEach(fn.bind(void 0, t));
                    } catch (t) {}
                  })(o, a),
                    (o.size = a.length),
                    (o._name = e),
                    (o._keys = a),
                    (o._defaultValues = t);
                }
                this._map = Ut(i);
              },
              o = (r.prototype = Object.create(cn));
            return (o.constructor = r), r;
          }
          e(Ae, Ut),
            (Ae.of = function () {
              return this(arguments);
            }),
            (Ae.prototype.toString = function () {
              return this.__toString("OrderedMap {", "}");
            }),
            (Ae.prototype.get = function (t, e) {
              var n = this._map.get(t);
              return void 0 !== n ? this._list.get(n)[1] : e;
            }),
            (Ae.prototype.clear = function () {
              return 0 === this.size
                ? this
                : this.__ownerID
                ? ((this.size = 0), this._map.clear(), this._list.clear(), this)
                : Ke();
            }),
            (Ae.prototype.set = function (t, e) {
              return Le(this, t, e);
            }),
            (Ae.prototype.remove = function (t) {
              return Le(this, t, b);
            }),
            (Ae.prototype.wasAltered = function () {
              return this._map.wasAltered() || this._list.wasAltered();
            }),
            (Ae.prototype.__iterate = function (t, e) {
              var n = this;
              return this._list.__iterate(function (e) {
                return e && t(e[1], e[0], n);
              }, e);
            }),
            (Ae.prototype.__iterator = function (t, e) {
              return this._list.fromEntrySeq().__iterator(t, e);
            }),
            (Ae.prototype.__ensureOwner = function (t) {
              if (t === this.__ownerID) return this;
              var e = this._map.__ensureOwner(t),
                n = this._list.__ensureOwner(t);
              return t
                ? Be(e, n, t, this.__hash)
                : ((this.__ownerID = t),
                  (this._map = e),
                  (this._list = n),
                  this);
            }),
            (Ae.isOrderedMap = Ie),
            (Ae.prototype[h] = !0),
            (Ae.prototype[g] = Ae.prototype.remove),
            e(Ne, G),
            (Ne.prototype.get = function (t, e) {
              return this._iter.get(t, e);
            }),
            (Ne.prototype.has = function (t) {
              return this._iter.has(t);
            }),
            (Ne.prototype.valueSeq = function () {
              return this._iter.valueSeq();
            }),
            (Ne.prototype.reverse = function () {
              var t = this,
                e = He(this, !0);
              return (
                this._useKeys ||
                  (e.valueSeq = function () {
                    return t._iter.toSeq().reverse();
                  }),
                e
              );
            }),
            (Ne.prototype.map = function (t, e) {
              var n = this,
                r = ze(this, t, e);
              return (
                this._useKeys ||
                  (r.valueSeq = function () {
                    return n._iter.toSeq().map(t, e);
                  }),
                r
              );
            }),
            (Ne.prototype.__iterate = function (t, e) {
              var n,
                r = this;
              return this._iter.__iterate(
                this._useKeys
                  ? function (e, n) {
                      return t(e, n, r);
                    }
                  : ((n = e ? tn(this) : 0),
                    function (o) {
                      return t(o, e ? --n : n++, r);
                    }),
                e,
              );
            }),
            (Ne.prototype.__iterator = function (t, e) {
              if (this._useKeys) return this._iter.__iterator(t, e);
              var n = this._iter.__iterator(B, e),
                r = e ? tn(this) : 0;
              return new F(function () {
                var o = n.next();
                return o.done ? o : U(t, e ? --r : r++, o.value, o);
              });
            }),
            (Ne.prototype[h] = !0),
            e(Pe, Z),
            (Pe.prototype.includes = function (t) {
              return this._iter.includes(t);
            }),
            (Pe.prototype.__iterate = function (t, e) {
              var n = this,
                r = 0;
              return this._iter.__iterate(function (e) {
                return t(e, r++, n);
              }, e);
            }),
            (Pe.prototype.__iterator = function (t, e) {
              var n = this._iter.__iterator(B, e),
                r = 0;
              return new F(function () {
                var e = n.next();
                return e.done ? e : U(t, r++, e.value, e);
              });
            }),
            e(Fe, J),
            (Fe.prototype.has = function (t) {
              return this._iter.includes(t);
            }),
            (Fe.prototype.__iterate = function (t, e) {
              var n = this;
              return this._iter.__iterate(function (e) {
                return t(e, e, n);
              }, e);
            }),
            (Fe.prototype.__iterator = function (t, e) {
              var n = this._iter.__iterator(B, e);
              return new F(function () {
                var e = n.next();
                return e.done ? e : U(t, e.value, e.value, e);
              });
            }),
            e(Ue, G),
            (Ue.prototype.entrySeq = function () {
              return this._iter.toSeq();
            }),
            (Ue.prototype.__iterate = function (t, e) {
              var n = this;
              return this._iter.__iterate(function (e) {
                if (e) {
                  Qe(e);
                  var r = a(e);
                  return t(r ? e.get(1) : e[1], r ? e.get(0) : e[0], n);
                }
              }, e);
            }),
            (Ue.prototype.__iterator = function (t, e) {
              var n = this._iter.__iterator(B, e);
              return new F(function () {
                for (;;) {
                  var e = n.next();
                  if (e.done) return e;
                  var r = e.value;
                  if (r) {
                    Qe(r);
                    var o = a(r);
                    return U(t, o ? r.get(0) : r[0], o ? r.get(1) : r[1], e);
                  }
                }
              });
            }),
            (Pe.prototype.cacheResult =
              Ne.prototype.cacheResult =
              Fe.prototype.cacheResult =
              Ue.prototype.cacheResult =
                rn),
            e(sn, Et),
            (sn.prototype.toString = function () {
              return this.__toString(ln(this) + " {", "}");
            }),
            (sn.prototype.has = function (t) {
              return this._defaultValues.hasOwnProperty(t);
            }),
            (sn.prototype.get = function (t, e) {
              if (!this.has(t)) return e;
              var n = this._defaultValues[t];
              return this._map ? this._map.get(t, n) : n;
            }),
            (sn.prototype.clear = function () {
              if (this.__ownerID) return this._map && this._map.clear(), this;
              var t = this.constructor;
              return t._empty || (t._empty = un(this, te()));
            }),
            (sn.prototype.set = function (t, e) {
              if (!this.has(t))
                throw new Error(
                  'Cannot set unknown key "' + t + '" on ' + ln(this),
                );
              var n = this._map && this._map.set(t, e);
              return this.__ownerID || n === this._map ? this : un(this, n);
            }),
            (sn.prototype.remove = function (t) {
              if (!this.has(t)) return this;
              var e = this._map && this._map.remove(t);
              return this.__ownerID || e === this._map ? this : un(this, e);
            }),
            (sn.prototype.wasAltered = function () {
              return this._map.wasAltered();
            }),
            (sn.prototype.__iterator = function (t, e) {
              var n = this;
              return r(this._defaultValues)
                .map(function (t, e) {
                  return n.get(e);
                })
                .__iterator(t, e);
            }),
            (sn.prototype.__iterate = function (t, e) {
              var n = this;
              return r(this._defaultValues)
                .map(function (t, e) {
                  return n.get(e);
                })
                .__iterate(t, e);
            }),
            (sn.prototype.__ensureOwner = function (t) {
              if (t === this.__ownerID) return this;
              var e = this._map && this._map.__ensureOwner(t);
              return t
                ? un(this, e, t)
                : ((this.__ownerID = t), (this._map = e), this);
            });
          var cn = sn.prototype;
          function un(t, e, n) {
            var r = Object.create(Object.getPrototypeOf(t));
            return (r._map = e), (r.__ownerID = n), r;
          }
          function ln(t) {
            return t._name || t.constructor.name || "Record";
          }
          function fn(t, e) {
            Object.defineProperty(t, e, {
              get: function () {
                return this.get(e);
              },
              set: function (t) {
                bt(this.__ownerID, "Cannot set on an immutable record."),
                  this.set(e, t);
              },
            });
          }
          function pn(t) {
            return null == t
              ? bn()
              : dn(t) && !l(t)
              ? t
              : bn().withMutations(function (e) {
                  var n = i(t);
                  Ft(n.size),
                    n.forEach(function (t) {
                      return e.add(t);
                    });
                });
          }
          function dn(t) {
            return !(!t || !t[gn]);
          }
          (cn[g] = cn.remove),
            (cn.deleteIn = cn.removeIn = qt.removeIn),
            (cn.merge = qt.merge),
            (cn.mergeWith = qt.mergeWith),
            (cn.mergeIn = qt.mergeIn),
            (cn.mergeDeep = qt.mergeDeep),
            (cn.mergeDeepWith = qt.mergeDeepWith),
            (cn.mergeDeepIn = qt.mergeDeepIn),
            (cn.setIn = qt.setIn),
            (cn.update = qt.update),
            (cn.updateIn = qt.updateIn),
            (cn.withMutations = qt.withMutations),
            (cn.asMutable = qt.asMutable),
            (cn.asImmutable = qt.asImmutable),
            e(pn, Ct),
            (pn.of = function () {
              return this(arguments);
            }),
            (pn.fromKeys = function (t) {
              return this(r(t).keySeq());
            }),
            (pn.prototype.toString = function () {
              return this.__toString("Set {", "}");
            }),
            (pn.prototype.has = function (t) {
              return this._map.has(t);
            }),
            (pn.prototype.add = function (t) {
              return mn(this, this._map.set(t, !0));
            }),
            (pn.prototype.remove = function (t) {
              return mn(this, this._map.remove(t));
            }),
            (pn.prototype.clear = function () {
              return mn(this, this._map.clear());
            }),
            (pn.prototype.union = function () {
              var e = t.call(arguments, 0);
              return 0 ===
                (e = e.filter(function (t) {
                  return 0 !== t.size;
                })).length
                ? this
                : 0 !== this.size || this.__ownerID || 1 !== e.length
                ? this.withMutations(function (t) {
                    for (var n = 0; n < e.length; n++)
                      i(e[n]).forEach(function (e) {
                        return t.add(e);
                      });
                  })
                : this.constructor(e[0]);
            }),
            (pn.prototype.intersect = function () {
              var e = t.call(arguments, 0);
              if (0 === e.length) return this;
              e = e.map(function (t) {
                return i(t);
              });
              var n = this;
              return this.withMutations(function (t) {
                n.forEach(function (n) {
                  e.every(function (t) {
                    return t.includes(n);
                  }) || t.remove(n);
                });
              });
            }),
            (pn.prototype.subtract = function () {
              var e = t.call(arguments, 0);
              if (0 === e.length) return this;
              e = e.map(function (t) {
                return i(t);
              });
              var n = this;
              return this.withMutations(function (t) {
                n.forEach(function (n) {
                  e.some(function (t) {
                    return t.includes(n);
                  }) && t.remove(n);
                });
              });
            }),
            (pn.prototype.merge = function () {
              return this.union.apply(this, arguments);
            }),
            (pn.prototype.mergeWith = function (e) {
              var n = t.call(arguments, 1);
              return this.union.apply(this, n);
            }),
            (pn.prototype.sort = function (t) {
              return Sn(Ge(this, t));
            }),
            (pn.prototype.sortBy = function (t, e) {
              return Sn(Ge(this, e, t));
            }),
            (pn.prototype.wasAltered = function () {
              return this._map.wasAltered();
            }),
            (pn.prototype.__iterate = function (t, e) {
              var n = this;
              return this._map.__iterate(function (e, r) {
                return t(r, r, n);
              }, e);
            }),
            (pn.prototype.__iterator = function (t, e) {
              return this._map
                .map(function (t, e) {
                  return e;
                })
                .__iterator(t, e);
            }),
            (pn.prototype.__ensureOwner = function (t) {
              if (t === this.__ownerID) return this;
              var e = this._map.__ensureOwner(t);
              return t
                ? this.__make(e, t)
                : ((this.__ownerID = t), (this._map = e), this);
            }),
            (pn.isSet = dn);
          var hn,
            gn = "@@__IMMUTABLE_SET__@@",
            yn = pn.prototype;
          function mn(t, e) {
            return t.__ownerID
              ? ((t.size = e.size), (t._map = e), t)
              : e === t._map
              ? t
              : 0 === e.size
              ? t.__empty()
              : t.__make(e);
          }
          function vn(t, e) {
            var n = Object.create(yn);
            return (
              (n.size = t ? t.size : 0), (n._map = t), (n.__ownerID = e), n
            );
          }
          function bn() {
            return hn || (hn = vn(te()));
          }
          function Sn(t) {
            return null == t
              ? kn()
              : _n(t)
              ? t
              : kn().withMutations(function (e) {
                  var n = i(t);
                  Ft(n.size),
                    n.forEach(function (t) {
                      return e.add(t);
                    });
                });
          }
          function _n(t) {
            return dn(t) && l(t);
          }
          (yn[gn] = !0),
            (yn[g] = yn.remove),
            (yn.mergeDeep = yn.merge),
            (yn.mergeDeepWith = yn.mergeWith),
            (yn.withMutations = qt.withMutations),
            (yn.asMutable = qt.asMutable),
            (yn.asImmutable = qt.asImmutable),
            (yn.__empty = bn),
            (yn.__make = vn),
            e(Sn, pn),
            (Sn.of = function () {
              return this(arguments);
            }),
            (Sn.fromKeys = function (t) {
              return this(r(t).keySeq());
            }),
            (Sn.prototype.toString = function () {
              return this.__toString("OrderedSet {", "}");
            }),
            (Sn.isOrderedSet = _n);
          var En,
            wn = Sn.prototype;
          function Cn(t, e) {
            var n = Object.create(wn);
            return (
              (n.size = t ? t.size : 0), (n._map = t), (n.__ownerID = e), n
            );
          }
          function kn() {
            return En || (En = Cn(Ke()));
          }
          function xn(t) {
            return null == t ? An() : Tn(t) ? t : An().unshiftAll(t);
          }
          function Tn(t) {
            return !(!t || !t[Dn]);
          }
          (wn[h] = !0),
            (wn.__empty = kn),
            (wn.__make = Cn),
            e(xn, wt),
            (xn.of = function () {
              return this(arguments);
            }),
            (xn.prototype.toString = function () {
              return this.__toString("Stack [", "]");
            }),
            (xn.prototype.get = function (t, e) {
              var n = this._head;
              for (t = T(this, t); n && t--; ) n = n.next;
              return n ? n.value : e;
            }),
            (xn.prototype.peek = function () {
              return this._head && this._head.value;
            }),
            (xn.prototype.push = function () {
              if (0 === arguments.length) return this;
              for (
                var t = this.size + arguments.length,
                  e = this._head,
                  n = arguments.length - 1;
                n >= 0;
                n--
              )
                e = { value: arguments[n], next: e };
              return this.__ownerID
                ? ((this.size = t),
                  (this._head = e),
                  (this.__hash = void 0),
                  (this.__altered = !0),
                  this)
                : Mn(t, e);
            }),
            (xn.prototype.pushAll = function (t) {
              if (0 === (t = o(t)).size) return this;
              Ft(t.size);
              var e = this.size,
                n = this._head;
              return (
                t.reverse().forEach(function (t) {
                  e++, (n = { value: t, next: n });
                }),
                this.__ownerID
                  ? ((this.size = e),
                    (this._head = n),
                    (this.__hash = void 0),
                    (this.__altered = !0),
                    this)
                  : Mn(e, n)
              );
            }),
            (xn.prototype.pop = function () {
              return this.slice(1);
            }),
            (xn.prototype.unshift = function () {
              return this.push.apply(this, arguments);
            }),
            (xn.prototype.unshiftAll = function (t) {
              return this.pushAll(t);
            }),
            (xn.prototype.shift = function () {
              return this.pop.apply(this, arguments);
            }),
            (xn.prototype.clear = function () {
              return 0 === this.size
                ? this
                : this.__ownerID
                ? ((this.size = 0),
                  (this._head = void 0),
                  (this.__hash = void 0),
                  (this.__altered = !0),
                  this)
                : An();
            }),
            (xn.prototype.slice = function (t, e) {
              if (D(t, e, this.size)) return this;
              var n = R(t, this.size);
              if (M(e, this.size) !== this.size)
                return wt.prototype.slice.call(this, t, e);
              for (var r = this.size - n, o = this._head; n--; ) o = o.next;
              return this.__ownerID
                ? ((this.size = r),
                  (this._head = o),
                  (this.__hash = void 0),
                  (this.__altered = !0),
                  this)
                : Mn(r, o);
            }),
            (xn.prototype.__ensureOwner = function (t) {
              return t === this.__ownerID
                ? this
                : t
                ? Mn(this.size, this._head, t, this.__hash)
                : ((this.__ownerID = t), (this.__altered = !1), this);
            }),
            (xn.prototype.__iterate = function (t, e) {
              if (e) return this.reverse().__iterate(t);
              for (
                var n = 0, r = this._head;
                r && !1 !== t(r.value, n++, this);

              )
                r = r.next;
              return n;
            }),
            (xn.prototype.__iterator = function (t, e) {
              if (e) return this.reverse().__iterator(t);
              var n = 0,
                r = this._head;
              return new F(function () {
                if (r) {
                  var e = r.value;
                  return (r = r.next), U(t, n++, e);
                }
                return { value: void 0, done: !0 };
              });
            }),
            (xn.isStack = Tn);
          var On,
            Dn = "@@__IMMUTABLE_STACK__@@",
            Rn = xn.prototype;
          function Mn(t, e, n, r) {
            var o = Object.create(Rn);
            return (
              (o.size = t),
              (o._head = e),
              (o.__ownerID = n),
              (o.__hash = r),
              (o.__altered = !1),
              o
            );
          }
          function An() {
            return On || (On = Mn(0));
          }
          function In(t, e) {
            var n = function (n) {
              t.prototype[n] = e[n];
            };
            return (
              Object.keys(e).forEach(n),
              Object.getOwnPropertySymbols &&
                Object.getOwnPropertySymbols(e).forEach(n),
              t
            );
          }
          (Rn[Dn] = !0),
            (Rn.withMutations = qt.withMutations),
            (Rn.asMutable = qt.asMutable),
            (Rn.asImmutable = qt.asImmutable),
            (Rn.wasAltered = qt.wasAltered),
            (n.Iterator = F),
            In(n, {
              toArray: function () {
                Ft(this.size);
                var t = new Array(this.size || 0);
                return (
                  this.valueSeq().__iterate(function (e, n) {
                    t[n] = e;
                  }),
                  t
                );
              },
              toIndexedSeq: function () {
                return new Pe(this);
              },
              toJS: function () {
                return this.toSeq()
                  .map(function (t) {
                    return t && "function" == typeof t.toJS ? t.toJS() : t;
                  })
                  .__toJS();
              },
              toJSON: function () {
                return this.toSeq()
                  .map(function (t) {
                    return t && "function" == typeof t.toJSON ? t.toJSON() : t;
                  })
                  .__toJS();
              },
              toKeyedSeq: function () {
                return new Ne(this, !0);
              },
              toMap: function () {
                return Ut(this.toKeyedSeq());
              },
              toObject: function () {
                Ft(this.size);
                var t = {};
                return (
                  this.__iterate(function (e, n) {
                    t[n] = e;
                  }),
                  t
                );
              },
              toOrderedMap: function () {
                return Ae(this.toKeyedSeq());
              },
              toOrderedSet: function () {
                return Sn(s(this) ? this.valueSeq() : this);
              },
              toSet: function () {
                return pn(s(this) ? this.valueSeq() : this);
              },
              toSetSeq: function () {
                return new Fe(this);
              },
              toSeq: function () {
                return c(this)
                  ? this.toIndexedSeq()
                  : s(this)
                  ? this.toKeyedSeq()
                  : this.toSetSeq();
              },
              toStack: function () {
                return xn(s(this) ? this.valueSeq() : this);
              },
              toList: function () {
                return ge(s(this) ? this.valueSeq() : this);
              },
              toString: function () {
                return "[Iterable]";
              },
              __toString: function (t, e) {
                return 0 === this.size
                  ? t + e
                  : t +
                      " " +
                      this.toSeq().map(this.__toStringMapper).join(", ") +
                      " " +
                      e;
              },
              concat: function () {
                return Xe(
                  this,
                  (function (t, e) {
                    var n = s(t),
                      o = [t]
                        .concat(e)
                        .map(function (t) {
                          return (
                            a(t)
                              ? n && (t = r(t))
                              : (t = n
                                  ? st(t)
                                  : ct(Array.isArray(t) ? t : [t])),
                            t
                          );
                        })
                        .filter(function (t) {
                          return 0 !== t.size;
                        });
                    if (0 === o.length) return t;
                    if (1 === o.length) {
                      var i = o[0];
                      if (i === t || (n && s(i)) || (c(t) && c(i))) return i;
                    }
                    var u = new et(o);
                    return (
                      n ? (u = u.toKeyedSeq()) : c(t) || (u = u.toSetSeq()),
                      ((u = u.flatten(!0)).size = o.reduce(function (t, e) {
                        if (void 0 !== t) {
                          var n = e.size;
                          if (void 0 !== n) return t + n;
                        }
                      }, 0)),
                      u
                    );
                  })(this, t.call(arguments, 0)),
                );
              },
              includes: function (t) {
                return this.some(function (e) {
                  return yt(e, t);
                });
              },
              entries: function () {
                return this.__iterator(K);
              },
              every: function (t, e) {
                Ft(this.size);
                var n = !0;
                return (
                  this.__iterate(function (r, o, i) {
                    if (!t.call(e, r, o, i)) return (n = !1), !1;
                  }),
                  n
                );
              },
              filter: function (t, e) {
                return Xe(this, qe(this, t, e, !0));
              },
              find: function (t, e, n) {
                var r = this.findEntry(t, e);
                return r ? r[1] : n;
              },
              findEntry: function (t, e) {
                var n;
                return (
                  this.__iterate(function (r, o, i) {
                    if (t.call(e, r, o, i)) return (n = [o, r]), !1;
                  }),
                  n
                );
              },
              findLastEntry: function (t, e) {
                return this.toSeq().reverse().findEntry(t, e);
              },
              forEach: function (t, e) {
                return Ft(this.size), this.__iterate(e ? t.bind(e) : t);
              },
              join: function (t) {
                Ft(this.size), (t = void 0 !== t ? "" + t : ",");
                var e = "",
                  n = !0;
                return (
                  this.__iterate(function (r) {
                    n ? (n = !1) : (e += t),
                      (e += null != r ? r.toString() : "");
                  }),
                  e
                );
              },
              keys: function () {
                return this.__iterator(I);
              },
              map: function (t, e) {
                return Xe(this, ze(this, t, e));
              },
              reduce: function (t, e, n) {
                var r, o;
                return (
                  Ft(this.size),
                  arguments.length < 2 ? (o = !0) : (r = e),
                  this.__iterate(function (e, i, a) {
                    o ? ((o = !1), (r = e)) : (r = t.call(n, r, e, i, a));
                  }),
                  r
                );
              },
              reduceRight: function (t, e, n) {
                var r = this.toKeyedSeq().reverse();
                return r.reduce.apply(r, arguments);
              },
              reverse: function () {
                return Xe(this, He(this, !0));
              },
              slice: function (t, e) {
                return Xe(this, We(this, t, e, !0));
              },
              some: function (t, e) {
                return !this.every(Pn(t), e);
              },
              sort: function (t) {
                return Xe(this, Ge(this, t));
              },
              values: function () {
                return this.__iterator(B);
              },
              butLast: function () {
                return this.slice(0, -1);
              },
              isEmpty: function () {
                return void 0 !== this.size
                  ? 0 === this.size
                  : !this.some(function () {
                      return !0;
                    });
              },
              count: function (t, e) {
                return x(t ? this.toSeq().filter(t, e) : this);
              },
              countBy: function (t, e) {
                return (function (t, e, n) {
                  var r = Ut().asMutable();
                  return (
                    t.__iterate(function (o, i) {
                      r.update(e.call(n, o, i, t), 0, function (t) {
                        return t + 1;
                      });
                    }),
                    r.asImmutable()
                  );
                })(this, t, e);
              },
              equals: function (t) {
                return mt(this, t);
              },
              entrySeq: function () {
                var t = this;
                if (t._cache) return new et(t._cache);
                var e = t.toSeq().map(Nn).toIndexedSeq();
                return (
                  (e.fromEntrySeq = function () {
                    return t.toSeq();
                  }),
                  e
                );
              },
              filterNot: function (t, e) {
                return this.filter(Pn(t), e);
              },
              findLast: function (t, e, n) {
                return this.toKeyedSeq().reverse().find(t, e, n);
              },
              first: function () {
                return this.find(O);
              },
              flatMap: function (t, e) {
                return Xe(
                  this,
                  (function (t, e, n) {
                    var r = en(t);
                    return t
                      .toSeq()
                      .map(function (o, i) {
                        return r(e.call(n, o, i, t));
                      })
                      .flatten(!0);
                  })(this, t, e),
                );
              },
              flatten: function (t) {
                return Xe(this, Ve(this, t, !0));
              },
              fromEntrySeq: function () {
                return new Ue(this);
              },
              get: function (t, e) {
                return this.find(
                  function (e, n) {
                    return yt(n, t);
                  },
                  void 0,
                  e,
                );
              },
              getIn: function (t, e) {
                for (var n, r = this, o = an(t); !(n = o.next()).done; ) {
                  var i = n.value;
                  if ((r = r && r.get ? r.get(i, b) : b) === b) return e;
                }
                return r;
              },
              groupBy: function (t, e) {
                return (function (t, e, n) {
                  var r = s(t),
                    o = (l(t) ? Ae() : Ut()).asMutable();
                  t.__iterate(function (i, a) {
                    o.update(e.call(n, i, a, t), function (t) {
                      return (t = t || []).push(r ? [a, i] : i), t;
                    });
                  });
                  var i = en(t);
                  return o.map(function (e) {
                    return Xe(t, i(e));
                  });
                })(this, t, e);
              },
              has: function (t) {
                return this.get(t, b) !== b;
              },
              hasIn: function (t) {
                return this.getIn(t, b) !== b;
              },
              isSubset: function (t) {
                return (
                  (t = "function" == typeof t.includes ? t : n(t)),
                  this.every(function (e) {
                    return t.includes(e);
                  })
                );
              },
              isSuperset: function (t) {
                return (t =
                  "function" == typeof t.isSubset ? t : n(t)).isSubset(this);
              },
              keySeq: function () {
                return this.toSeq().map(Ln).toIndexedSeq();
              },
              last: function () {
                return this.toSeq().reverse().first();
              },
              max: function (t) {
                return Ze(this, t);
              },
              maxBy: function (t, e) {
                return Ze(this, e, t);
              },
              min: function (t) {
                return Ze(this, t ? Fn(t) : zn);
              },
              minBy: function (t, e) {
                return Ze(this, e ? Fn(e) : zn, t);
              },
              rest: function () {
                return this.slice(1);
              },
              skip: function (t) {
                return this.slice(Math.max(0, t));
              },
              skipLast: function (t) {
                return Xe(this, this.toSeq().reverse().skip(t).reverse());
              },
              skipWhile: function (t, e) {
                return Xe(this, $e(this, t, e, !0));
              },
              skipUntil: function (t, e) {
                return this.skipWhile(Pn(t), e);
              },
              sortBy: function (t, e) {
                return Xe(this, Ge(this, e, t));
              },
              take: function (t) {
                return this.slice(0, Math.max(0, t));
              },
              takeLast: function (t) {
                return Xe(this, this.toSeq().reverse().take(t).reverse());
              },
              takeWhile: function (t, e) {
                return Xe(
                  this,
                  (function (t, e, n) {
                    var r = nn(t);
                    return (
                      (r.__iterateUncached = function (r, o) {
                        var i = this;
                        if (o) return this.cacheResult().__iterate(r, o);
                        var a = 0;
                        return (
                          t.__iterate(function (t, o, s) {
                            return e.call(n, t, o, s) && ++a && r(t, o, i);
                          }),
                          a
                        );
                      }),
                      (r.__iteratorUncached = function (r, o) {
                        var i = this;
                        if (o) return this.cacheResult().__iterator(r, o);
                        var a = t.__iterator(K, o),
                          s = !0;
                        return new F(function () {
                          if (!s) return { value: void 0, done: !0 };
                          var t = a.next();
                          if (t.done) return t;
                          var o = t.value,
                            c = o[0],
                            u = o[1];
                          return e.call(n, u, c, i)
                            ? r === K
                              ? t
                              : U(r, c, u, t)
                            : ((s = !1), { value: void 0, done: !0 });
                        });
                      }),
                      r
                    );
                  })(this, t, e),
                );
              },
              takeUntil: function (t, e) {
                return this.takeWhile(Pn(t), e);
              },
              valueSeq: function () {
                return this.toIndexedSeq();
              },
              hashCode: function () {
                return (
                  this.__hash ||
                  (this.__hash = (function (t) {
                    if (t.size === 1 / 0) return 0;
                    var e = l(t),
                      n = s(t),
                      r = e ? 1 : 0;
                    return (function (t, e) {
                      return (
                        (e = kt(e, 3432918353)),
                        (e = kt((e << 15) | (e >>> -15), 461845907)),
                        (e = kt((e << 13) | (e >>> -13), 5)),
                        (e = kt(
                          (e = ((e + 3864292196) | 0) ^ t) ^ (e >>> 16),
                          2246822507,
                        )),
                        xt((e = kt(e ^ (e >>> 13), 3266489909)) ^ (e >>> 16))
                      );
                    })(
                      t.__iterate(
                        n
                          ? e
                            ? function (t, e) {
                                r = (31 * r + Hn(Tt(t), Tt(e))) | 0;
                              }
                            : function (t, e) {
                                r = (r + Hn(Tt(t), Tt(e))) | 0;
                              }
                          : e
                          ? function (t) {
                              r = (31 * r + Tt(t)) | 0;
                            }
                          : function (t) {
                              r = (r + Tt(t)) | 0;
                            },
                      ),
                      r,
                    );
                  })(this))
                );
              },
            });
          var Bn = n.prototype;
          (Bn[f] = !0),
            (Bn[P] = Bn.values),
            (Bn.__toJS = Bn.toArray),
            (Bn.__toStringMapper = Un),
            (Bn.inspect = Bn.toSource =
              function () {
                return this.toString();
              }),
            (Bn.chain = Bn.flatMap),
            (Bn.contains = Bn.includes),
            (function () {
              try {
                Object.defineProperty(Bn, "length", {
                  get: function () {
                    if (!n.noLengthWarning) {
                      var t;
                      try {
                        throw new Error();
                      } catch (e) {
                        t = e.stack;
                      }
                      if (-1 === t.indexOf("_wrapObject"))
                        return (
                          console &&
                            console.warn &&
                            console.warn(
                              "iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. " +
                                t,
                            ),
                          this.size
                        );
                    }
                  },
                });
              } catch (t) {}
            })(),
            In(r, {
              flip: function () {
                return Xe(this, je(this));
              },
              findKey: function (t, e) {
                var n = this.findEntry(t, e);
                return n && n[0];
              },
              findLastKey: function (t, e) {
                return this.toSeq().reverse().findKey(t, e);
              },
              keyOf: function (t) {
                return this.findKey(function (e) {
                  return yt(e, t);
                });
              },
              lastKeyOf: function (t) {
                return this.findLastKey(function (e) {
                  return yt(e, t);
                });
              },
              mapEntries: function (t, e) {
                var n = this,
                  r = 0;
                return Xe(
                  this,
                  this.toSeq()
                    .map(function (o, i) {
                      return t.call(e, [i, o], r++, n);
                    })
                    .fromEntrySeq(),
                );
              },
              mapKeys: function (t, e) {
                var n = this;
                return Xe(
                  this,
                  this.toSeq()
                    .flip()
                    .map(function (r, o) {
                      return t.call(e, r, o, n);
                    })
                    .flip(),
                );
              },
            });
          var Kn = r.prototype;
          function Ln(t, e) {
            return e;
          }
          function Nn(t, e) {
            return [e, t];
          }
          function Pn(t) {
            return function () {
              return !t.apply(this, arguments);
            };
          }
          function Fn(t) {
            return function () {
              return -t.apply(this, arguments);
            };
          }
          function Un(t) {
            return "string" == typeof t ? JSON.stringify(t) : t;
          }
          function jn() {
            return k(arguments);
          }
          function zn(t, e) {
            return t < e ? 1 : t > e ? -1 : 0;
          }
          function Hn(t, e) {
            return (t ^ (e + 2654435769 + (t << 6) + (t >> 2))) | 0;
          }
          return (
            (Kn[p] = !0),
            (Kn[P] = Bn.entries),
            (Kn.__toJS = Bn.toObject),
            (Kn.__toStringMapper = function (t, e) {
              return JSON.stringify(e) + ": " + Un(t);
            }),
            In(o, {
              toKeyedSeq: function () {
                return new Ne(this, !1);
              },
              filter: function (t, e) {
                return Xe(this, qe(this, t, e, !1));
              },
              findIndex: function (t, e) {
                var n = this.findEntry(t, e);
                return n ? n[0] : -1;
              },
              indexOf: function (t) {
                var e = this.toKeyedSeq().keyOf(t);
                return void 0 === e ? -1 : e;
              },
              lastIndexOf: function (t) {
                var e = this.toKeyedSeq().reverse().keyOf(t);
                return void 0 === e ? -1 : e;
              },
              reverse: function () {
                return Xe(this, He(this, !1));
              },
              slice: function (t, e) {
                return Xe(this, We(this, t, e, !1));
              },
              splice: function (t, e) {
                var n = arguments.length;
                if (((e = Math.max(0 | e, 0)), 0 === n || (2 === n && !e)))
                  return this;
                t = R(t, t < 0 ? this.count() : this.size);
                var r = this.slice(0, t);
                return Xe(
                  this,
                  1 === n ? r : r.concat(k(arguments, 2), this.slice(t + e)),
                );
              },
              findLastIndex: function (t, e) {
                var n = this.toKeyedSeq().findLastKey(t, e);
                return void 0 === n ? -1 : n;
              },
              first: function () {
                return this.get(0);
              },
              flatten: function (t) {
                return Xe(this, Ve(this, t, !1));
              },
              get: function (t, e) {
                return (t = T(this, t)) < 0 ||
                  this.size === 1 / 0 ||
                  (void 0 !== this.size && t > this.size)
                  ? e
                  : this.find(
                      function (e, n) {
                        return n === t;
                      },
                      void 0,
                      e,
                    );
              },
              has: function (t) {
                return (
                  (t = T(this, t)) >= 0 &&
                  (void 0 !== this.size
                    ? this.size === 1 / 0 || t < this.size
                    : -1 !== this.indexOf(t))
                );
              },
              interpose: function (t) {
                return Xe(
                  this,
                  (function (t, e) {
                    var n = nn(t);
                    return (
                      (n.size = t.size && 2 * t.size - 1),
                      (n.__iterateUncached = function (n, r) {
                        var o = this,
                          i = 0;
                        return (
                          t.__iterate(function (t, r) {
                            return (
                              (!i || !1 !== n(e, i++, o)) && !1 !== n(t, i++, o)
                            );
                          }, r),
                          i
                        );
                      }),
                      (n.__iteratorUncached = function (n, r) {
                        var o,
                          i = t.__iterator(B, r),
                          a = 0;
                        return new F(function () {
                          return (!o || a % 2) && (o = i.next()).done
                            ? o
                            : a % 2
                            ? U(n, a++, e)
                            : U(n, a++, o.value, o);
                        });
                      }),
                      n
                    );
                  })(this, t),
                );
              },
              interleave: function () {
                var t = [this].concat(k(arguments)),
                  e = Ye(this.toSeq(), Z.of, t),
                  n = e.flatten(!0);
                return e.size && (n.size = e.size * t.length), Xe(this, n);
              },
              last: function () {
                return this.get(-1);
              },
              skipWhile: function (t, e) {
                return Xe(this, $e(this, t, e, !1));
              },
              zip: function () {
                return Xe(this, Ye(this, jn, [this].concat(k(arguments))));
              },
              zipWith: function (t) {
                var e = k(arguments);
                return (e[0] = this), Xe(this, Ye(this, t, e));
              },
            }),
            (o.prototype[d] = !0),
            (o.prototype[h] = !0),
            In(i, {
              get: function (t, e) {
                return this.has(t) ? t : e;
              },
              includes: function (t) {
                return this.has(t);
              },
              keySeq: function () {
                return this.valueSeq();
              },
            }),
            (i.prototype.has = Bn.includes),
            In(G, r.prototype),
            In(Z, o.prototype),
            In(J, i.prototype),
            In(Et, r.prototype),
            In(wt, o.prototype),
            In(Ct, i.prototype),
            {
              Iterable: n,
              Seq: V,
              Collection: _t,
              Map: Ut,
              OrderedMap: Ae,
              List: ge,
              Stack: xn,
              Set: pn,
              OrderedSet: Sn,
              Record: sn,
              Range: St,
              Repeat: vt,
              is: yt,
              fromJS: pt,
            }
          );
        })();
      },
      3769: (t, e, n) => {
        "use strict";
        n.d(e, { n: () => i });
        var r = n(2427),
          o = n(1458);
        function i() {
          return (0, r.useContext)(o.t);
        }
      },
      1020: (t, e, n) => {
        "use strict";
        var r = n(2427),
          o = 60103;
        if (((e.Fragment = 60107), "function" == typeof Symbol && Symbol.for)) {
          var i = Symbol.for;
          (o = i("react.element")), (e.Fragment = i("react.fragment"));
        }
        var a =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          s = Object.prototype.hasOwnProperty,
          c = { key: !0, ref: !0, __self: !0, __source: !0 };
        function u(t, e, n) {
          var r,
            i = {},
            u = null,
            l = null;
          for (r in (void 0 !== n && (u = "" + n),
          void 0 !== e.key && (u = "" + e.key),
          void 0 !== e.ref && (l = e.ref),
          e))
            s.call(e, r) && !c.hasOwnProperty(r) && (i[r] = e[r]);
          if (t && t.defaultProps)
            for (r in (e = t.defaultProps)) void 0 === i[r] && (i[r] = e[r]);
          return {
            $$typeof: o,
            type: t,
            key: u,
            ref: l,
            props: i,
            _owner: a.current,
          };
        }
        (e.jsx = u), (e.jsxs = u);
      },
      4848: (t, e, n) => {
        "use strict";
        t.exports = n(1020);
      },
      2791: function (t, e, n) {
        !(function (t, e) {
          "use strict";
          if (!t.setImmediate) {
            var n,
              r,
              o,
              i,
              a,
              s = 1,
              c = {},
              u = !1,
              l = t.document,
              f = Object.getPrototypeOf && Object.getPrototypeOf(t);
            (f = f && f.setTimeout ? f : t),
              "[object process]" === {}.toString.call(t.process)
                ? (n = function (t) {
                    process.nextTick(function () {
                      d(t);
                    });
                  })
                : (function () {
                    if (t.postMessage && !t.importScripts) {
                      var e = !0,
                        n = t.onmessage;
                      return (
                        (t.onmessage = function () {
                          e = !1;
                        }),
                        t.postMessage("", "*"),
                        (t.onmessage = n),
                        e
                      );
                    }
                  })()
                ? ((i = "setImmediate$" + Math.random() + "$"),
                  (a = function (e) {
                    e.source === t &&
                      "string" == typeof e.data &&
                      0 === e.data.indexOf(i) &&
                      d(+e.data.slice(i.length));
                  }),
                  t.addEventListener
                    ? t.addEventListener("message", a, !1)
                    : t.attachEvent("onmessage", a),
                  (n = function (e) {
                    t.postMessage(i + e, "*");
                  }))
                : t.MessageChannel
                ? (((o = new MessageChannel()).port1.onmessage = function (t) {
                    d(t.data);
                  }),
                  (n = function (t) {
                    o.port2.postMessage(t);
                  }))
                : l && "onreadystatechange" in l.createElement("script")
                ? ((r = l.documentElement),
                  (n = function (t) {
                    var e = l.createElement("script");
                    (e.onreadystatechange = function () {
                      d(t),
                        (e.onreadystatechange = null),
                        r.removeChild(e),
                        (e = null);
                    }),
                      r.appendChild(e);
                  }))
                : (n = function (t) {
                    setTimeout(d, 0, t);
                  }),
              (f.setImmediate = function (t) {
                "function" != typeof t && (t = new Function("" + t));
                for (
                  var e = new Array(arguments.length - 1), r = 0;
                  r < e.length;
                  r++
                )
                  e[r] = arguments[r + 1];
                var o = { callback: t, args: e };
                return (c[s] = o), n(s), s++;
              }),
              (f.clearImmediate = p);
          }
          function p(t) {
            delete c[t];
          }
          function d(t) {
            if (u) setTimeout(d, 0, t);
            else {
              var e = c[t];
              if (e) {
                u = !0;
                try {
                  !(function (t) {
                    var e = t.callback,
                      n = t.args;
                    switch (n.length) {
                      case 0:
                        e();
                        break;
                      case 1:
                        e(n[0]);
                        break;
                      case 2:
                        e(n[0], n[1]);
                        break;
                      case 3:
                        e(n[0], n[1], n[2]);
                        break;
                      default:
                        e.apply(undefined, n);
                    }
                  })(e);
                } finally {
                  p(t), (u = !1);
                }
              }
            }
          }
        })("undefined" == typeof self ? (void 0 === n.g ? this : n.g) : self);
      },
      7792: (t, e, n) => {
        "use strict";
        var r = {};
        n.r(r),
          n.d(r, {
            BLOCK_TYPE: () => H,
            BlockToolbar: () => qt,
            CommandPalette: () => It,
            DraftUtils: () => at,
            DraftailEditor: () => Lt,
            ENTITY_TYPE: () => q,
            FloatingToolbar: () => Pt,
            INLINE_STYLE: () => W,
            Icon: () => mt,
            InlineToolbar: () => zt,
            MetaToolbar: () => Wt,
            Toolbar: () => Et,
            ToolbarButton: () => vt,
            Tooltip: () => Rt,
            createEditorStateFromRaw: () => L,
            serialiseEditorStateToRaw: () => N,
          });
        var o = n(4848),
          i = n(2427),
          a = n.n(i),
          s = n(8335);
        const c = "atomic",
          u = "unstyled",
          l = "unordered-list-item",
          f = "ordered-list-item",
          p = (t) => {
            const e = t.getBlockMap(),
              n = e
                .filter((t) => {
                  const e = t.getText(),
                    n = t.getEntityAt(0);
                  return Boolean(n) && ["📷", " ", "📷 "].includes(e);
                })
                .map((t) => t.set("type", c));
            return 0 !== n.size ? t.merge({ blockMap: e.merge(n) }) : t;
          },
          d = (t) => {
            let e = t.getBlockMap();
            const n = e
              .filter(
                (t) =>
                  t.getType() === c &&
                  (" " !== t.getText() || 0 !== t.getInlineStyleAt(0).size),
              )
              .map((t) => {
                const e = t
                  .getCharacterList()
                  .slice(0, 1)
                  .map((t) => {
                    let e = t;
                    return (
                      t.getStyle().forEach((t) => {
                        e = s.CharacterMetadata.removeStyle(e, t);
                      }),
                      e
                    );
                  });
                return t.merge({ text: " ", characterList: e });
              });
            return 0 !== n.size && (e = e.merge(n)), t.merge({ blockMap: e });
          },
          h = (t, e) => {
            const n = e.getBlockMap(),
              r = n.filter((n) => {
                if (n.getType() !== c) return !0;
                const r = n.getEntityAt(0);
                let o;
                if (r) {
                  const n = e.getEntity(r).getType();
                  o = t.some((t) => t.type === n);
                } else o = !1;
                return o;
              });
            return r.size !== n.size ? e.merge({ blockMap: r }) : e;
          },
          g = (t) => {
            const e = t.getBlockMap(),
              n = e.filter(
                (t) => [l, f].includes(t.getType()) || 0 === t.getDepth(),
              );
            return n.size !== e.size ? t.merge({ blockMap: n }) : t;
          },
          y = (t, e) => {
            const n = e.getBlockMap(),
              r = n
                .filter((t) => "unstyled" === t.getType())
                .map((e) => {
                  const n = e.getText();
                  let r,
                    o = e;
                  const i = t.find(
                    (t) => ((r = new RegExp(t.test).exec(n)), null !== r),
                  );
                  if (i && r && r[0]) {
                    const t = o.getText();
                    if (o.getEntityAt(0) && r[0] === t) return o;
                    const e = r[0].length;
                    let n = o.getCharacterList(),
                      a = 0;
                    for (; a < e; ) (n = n.shift()), a++;
                    o = o.merge({
                      type: i.type,
                      depth: i.depth,
                      text: t.slice(e),
                      characterList: n,
                    });
                  }
                  return o;
                });
            return 0 === r.size ? e : e.merge({ blockMap: n.merge(r) });
          },
          m = (t, e) => {
            const n = e.getBlockMap(),
              r = n
                .filter((e) => e.getDepth() > t)
                .map((e) => e.set("depth", t));
            return 0 === r.size ? e : e.merge({ blockMap: n.merge(r) });
          },
          v = (t, e) => {
            const n = e.getBlockMap(),
              r = n
                .filter((e) => !t.includes(e.getType()))
                .map((t) => t.merge({ type: u, depth: 0 }));
            return 0 === r.size ? e : e.merge({ blockMap: n.merge(r) });
          },
          b = (t, e) => {
            const n = e.getBlockMap(),
              r = n.map((e) => {
                let n = !1;
                const r = e.getCharacterList().map((e) => {
                  let r = e;
                  return (
                    e
                      .getStyle()
                      .filter((e) => !t.includes(e))
                      .forEach((t) => {
                        (n = !0), (r = s.CharacterMetadata.removeStyle(r, t));
                      }),
                    r
                  );
                });
                return n ? e.set("characterList", r) : e;
              });
            return e.merge({ blockMap: n.merge(r) });
          },
          S = (t) => {
            let e = t;
            const n = e.getBlockMap(),
              r = [],
              o = (t) => {
                const e = t.getEntity();
                if (e) {
                  if (r.includes(e)) return !0;
                  r.push(e);
                }
                return !1;
              },
              i = n.map((t) => {
                let n = t.getCharacterList(),
                  r = !1;
                return (
                  t.findEntityRanges(o, (t, o) => {
                    const i = n.get(t).getEntity(),
                      a = e.getEntity(i);
                    e = e.createEntity(
                      a.getType(),
                      a.getMutability(),
                      a.getData(),
                    );
                    const c = e.getLastCreatedEntityKey();
                    (n = n.map((e, n) =>
                      t <= n && n <= o
                        ? s.CharacterMetadata.applyEntity(e, c)
                        : e,
                    )),
                      (r = !0);
                  }),
                  r ? t.set("characterList", n) : t
                );
              });
            return e.merge({ blockMap: n.merge(i) });
          },
          _ = (t, e) => {
            const n = e.getBlockMap(),
              r = n.map((n) => {
                let r = !1;
                const o = n.getCharacterList().map((o) => {
                  const i = o.getEntity();
                  return i && !t(e, i, n)
                    ? ((r = !0), s.CharacterMetadata.applyEntity(o, null))
                    : o;
                });
                return r ? n.set("characterList", o) : n;
              });
            return e.merge({ blockMap: n.merge(r) });
          },
          E = (t, e) => {
            let n = e;
            const r = {};
            return (
              n.getBlockMap().forEach((t) => {
                t.findEntityRanges((t) => {
                  const e = t.getEntity();
                  if (e) {
                    const t = n.getEntity(e);
                    r[e] = t;
                  }
                  return !1;
                });
              }),
              Object.keys(r).forEach((e) => {
                const o = r[e],
                  i = o.getData(),
                  a = t.find((t) => t.type === o.getType()),
                  s = a ? a.attributes : null;
                if (!s) return i;
                const c = s.reduce(
                  (t, e) => (i.hasOwnProperty(e) && (t[e] = i[e]), t),
                  {},
                );
                n = n.replaceEntityData(e, c);
              }),
              n
            );
          },
          w = (t, e) => {
            const n = e.getBlockMap(),
              r = n.map((e) => {
                const n = e.getText(),
                  r = t.reduce(
                    (t, e) =>
                      t.replace(new RegExp(e, "g"), " ".repeat(e.length)),
                    n,
                  );
                return n !== r ? e.set("text", r) : e;
              });
            return e.merge({ blockMap: n.merge(r) });
          },
          C = [
            {
              test: "^(· |•\t|•|📷 |\t| \t)",
              type: "unordered-list-item",
              depth: 0,
            },
            { test: "^(◦|o |o\t)", type: "unordered-list-item", depth: 1 },
            { test: "^(§ |\t|◾)", type: "unordered-list-item", depth: 2 },
            { test: "^1{0,1}\\d\\.[ \t]", type: "ordered-list-item", depth: 0 },
            {
              test: "^x{0,1}(i|ii|iii|iv|v|vi|vii|viii|ix|x)\\.[ \t]",
              type: "ordered-list-item",
              depth: 2,
            },
            { test: "^[a-z]\\.[ \t]", type: "ordered-list-item", depth: 1 },
          ];
        var k = n(8865),
          x = n(866),
          T = n.n(x),
          O = n(120),
          D = n.n(O);
        n(3694), n(3919);
        const R = "public-DraftStyleDefault-depth",
          M = ["decimal", "lower-alpha", "lower-roman"],
          A = (t, e = 5, n = R, r = M) =>
            ((t, e, n, r) => {
              let o = `\n.${t}1.public-DraftStyleDefault-orderedListItem::before { content: counter(ol1, ${
                r[1 % r.length]
              }) ". "}\n.${t}2.public-DraftStyleDefault-orderedListItem::before { content: counter(ol2, ${
                r[2 % r.length]
              }) ". "}\n.${t}4.public-DraftStyleDefault-orderedListItem::before { content: counter(ol4, ${
                r[4 % r.length]
              }) ". "}\n`;
              for (let i = e; i <= n; i++) {
                const e = String(i),
                  n = `${t}${e}`,
                  a = `ol${e}`,
                  s = r[i % r.length],
                  c = String(1.5 * (i + 1));
                o += `\n.${n}.public-DraftStyleDefault-listLTR { margin-left: ${c}em; }\n.${n}.public-DraftStyleDefault-listRTL { margin-right: ${c}em; }\n.${n}.public-DraftStyleDefault-orderedListItem::before { content: counter(${a}, ${s}) '. '; counter-increment: ${a}; }\n.${n}.public-DraftStyleDefault-reset { counter-reset: ${a}; }`;
              }
              return o;
            })(n, e, t, r),
          I = "data-draftjs-conductor-fragment",
          B = '[data-contents="true"] [contenteditable="false"]',
          K = (t, e) => {
            const n = window.getSelection();
            if (
              !e.clipboardData ||
              0 === n.rangeCount ||
              ((t) => {
                const { anchorNode: e, focusNode: n } = t;
                if (!e || !n) return !1;
                const r = e instanceof Element ? e : e.parentElement,
                  o = n instanceof Element ? n : n.parentElement,
                  i = r && r.closest(B),
                  a = o && o.closest(B);
                return i && a && (i.contains(a) || a.contains(i));
              })(n)
            )
              return;
            const r = ((t, e) => {
              const { selectionState: n } = D()(t, e),
                r = T()(t.getCurrentContent(), n);
              return r.every((t) => 0 === t.getText().length) ? null : r;
            })(t._latestEditorState, t.editor);
            if (r) {
              const t = s.ContentState.createFromBlockArray(r.toArray()),
                o = JSON.stringify((0, s.convertToRaw)(t)),
                i = document.createElement("div");
              i.appendChild(n.getRangeAt(0).cloneContents()),
                i.setAttribute(I, o),
                i.setAttribute("style", "white-space: pre-wrap;"),
                e.clipboardData.setData("text/plain", n.toString()),
                e.clipboardData.setData("text/html", i.outerHTML),
                e.preventDefault();
            }
          },
          L = (t, e) => {
            let n;
            if (t) {
              const r = (0, s.convertFromRaw)(t);
              n = s.EditorState.createWithContent(r, e);
            } else n = s.EditorState.createEmpty(e);
            return n;
          },
          N = (t) => {
            const e = t.getCurrentContent(),
              n = (0, s.convertToRaw)(e);
            return n.blocks.every(
              (t) =>
                !(
                  0 !== t.text.trim().length ||
                  (t.entityRanges && 0 !== t.entityRanges.length) ||
                  (t.inlineStyleRanges && 0 !== t.inlineStyleRanges.length)
                ),
            )
              ? null
              : n;
          };
        var P = n(4028),
          F = n(3174),
          U = n.n(F),
          j = n(4954),
          z = n(1504);
        const H = {
            UNSTYLED: "unstyled",
            HEADER_ONE: "header-one",
            HEADER_TWO: "header-two",
            HEADER_THREE: "header-three",
            HEADER_FOUR: "header-four",
            HEADER_FIVE: "header-five",
            HEADER_SIX: "header-six",
            UNORDERED_LIST_ITEM: "unordered-list-item",
            ORDERED_LIST_ITEM: "ordered-list-item",
            BLOCKQUOTE: "blockquote",
            CODE: "code-block",
            ATOMIC: "atomic",
          },
          q = {
            LINK: "LINK",
            IMAGE: "IMAGE",
            HORIZONTAL_RULE: "HORIZONTAL_RULE",
          },
          W = {
            BOLD: "BOLD",
            ITALIC: "ITALIC",
            CODE: "CODE",
            UNDERLINE: "UNDERLINE",
            STRIKETHROUGH: "STRIKETHROUGH",
            MARK: "MARK",
            QUOTATION: "QUOTATION",
            SMALL: "SMALL",
            SAMPLE: "SAMPLE",
            INSERT: "INSERT",
            DELETE: "DELETE",
            KEYBOARD: "KEYBOARD",
            SUPERSCRIPT: "SUPERSCRIPT",
            SUBSCRIPT: "SUBSCRIPT",
          },
          $ = [
            ...Object.values(H),
            ...Object.values(q),
            ...Object.values(W),
            "bold",
            "italic",
            "underline",
            "code",
          ],
          V =
            "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, sans-serif",
          G = {
            [W.BOLD]: { fontWeight: "bold" },
            [W.ITALIC]: { fontStyle: "italic" },
            [W.STRIKETHROUGH]: { textDecoration: "line-through" },
            [W.UNDERLINE]: { textDecoration: "underline" },
            [W.CODE]: {
              padding: "0.2em 0.3125em",
              margin: "0",
              fontSize: "85%",
              backgroundColor: "rgba(27, 31, 35, 0.05)",
              fontFamily: V,
              borderRadius: "3px",
            },
            [W.MARK]: { backgroundColor: "Mark", color: "MarkText" },
            [W.QUOTATION]: { fontStyle: "italic" },
            [W.SMALL]: { fontSize: "smaller" },
            [W.SAMPLE]: { fontFamily: V },
            [W.INSERT]: { textDecoration: "underline" },
            [W.DELETE]: { textDecoration: "line-through" },
            [W.KEYBOARD]: {
              fontFamily: V,
              padding: "3px 5px",
              fontSize: "11px",
              lineHeight: "10px",
              color: "#444d56",
              verticalAlign: "middle",
              backgroundColor: "#fafbfc",
              border: "solid 1px #c6cbd1",
              borderBottomColor: "#959da5",
              borderRadius: "3px",
              boxShadow: "inset 0 -1px 0 #959da5",
            },
            [W.SUPERSCRIPT]: {
              fontSize: "80%",
              verticalAlign: "super",
              lineHeight: "1",
            },
            [W.SUBSCRIPT]: {
              fontSize: "80%",
              verticalAlign: "sub",
              lineHeight: "1",
            },
          },
          Z = "BR",
          J = "undo",
          Y = "redo",
          X = {
            "* ": H.UNORDERED_LIST_ITEM,
            "- ": H.UNORDERED_LIST_ITEM,
            "1. ": H.ORDERED_LIST_ITEM,
            "# ": H.HEADER_ONE,
            "## ": H.HEADER_TWO,
            "### ": H.HEADER_THREE,
            "#### ": H.HEADER_FOUR,
            "##### ": H.HEADER_FIVE,
            "###### ": H.HEADER_SIX,
            "> ": H.BLOCKQUOTE,
            "```": H.CODE,
          },
          Q = [
            { pattern: "**", type: W.BOLD },
            { pattern: "__", type: W.BOLD },
            { pattern: "*", type: W.ITALIC },
            { pattern: "_", type: W.ITALIC },
            { pattern: "~~", type: W.STRIKETHROUGH },
            { pattern: "~", type: W.STRIKETHROUGH },
            { pattern: "`", type: W.CODE },
          ].map(({ pattern: t, type: e }) => {
            const n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              r = t[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            return {
              pattern: t,
              type: e,
              regex: `(\\s|^)${n}([^\\s${r}]{1,2}|[^\\s${r}].+[^\\s${r}])${n}$`,
            };
          }),
          tt = { [q.HORIZONTAL_RULE]: "---" },
          et = {
            [H.UNSTYLED]: "P",
            [H.HEADER_ONE]: "H1",
            [H.HEADER_TWO]: "H2",
            [H.HEADER_THREE]: "H3",
            [H.HEADER_FOUR]: "H4",
            [H.HEADER_FIVE]: "H5",
            [H.HEADER_SIX]: "H6",
            [H.UNORDERED_LIST_ITEM]: "UL",
            [H.ORDERED_LIST_ITEM]: "OL",
            [H.CODE]: "{ }",
            [H.BLOCKQUOTE]: "❝",
            [W.BOLD]: "𝐁",
            [W.ITALIC]: "𝘐",
            [W.CODE]: "{ }",
            [W.UNDERLINE]: "U",
            [W.STRIKETHROUGH]: "S",
            [W.MARK]: "☆",
            [W.QUOTATION]: "❛",
            [W.SMALL]: "Small",
            [W.SAMPLE]: "Data",
            [W.INSERT]: "Ins",
            [W.DELETE]: "Del",
            [W.SUPERSCRIPT]: "Sup",
            [W.SUBSCRIPT]: "Sub",
            [W.KEYBOARD]: "⌘",
            [q.LINK]: "🔗",
            [q.IMAGE]: "🖼",
            [q.HORIZONTAL_RULE]: "―",
            [Z]: "↵",
            [J]: "↺",
            [Y]: "↻",
          },
          nt = {
            [H.UNSTYLED]: "Paragraph",
            [H.HEADER_ONE]: "Heading 1",
            [H.HEADER_TWO]: "Heading 2",
            [H.HEADER_THREE]: "Heading 3",
            [H.HEADER_FOUR]: "Heading 4",
            [H.HEADER_FIVE]: "Heading 5",
            [H.HEADER_SIX]: "Heading 6",
            [H.UNORDERED_LIST_ITEM]: "Bulleted list",
            [H.ORDERED_LIST_ITEM]: "Numbered list",
            [H.BLOCKQUOTE]: "Blockquote",
            [H.CODE]: "Code block",
            [W.BOLD]: "Bold",
            [W.ITALIC]: "Italic",
            [W.CODE]: "Code",
            [W.UNDERLINE]: "Underline",
            [W.STRIKETHROUGH]: "Strikethrough",
            [W.MARK]: "Highlight",
            [W.QUOTATION]: "Inline quotation",
            [W.SMALL]: "Small",
            [W.SAMPLE]: "Program output",
            [W.INSERT]: "Inserted",
            [W.DELETE]: "Deleted",
            [W.KEYBOARD]: "Shortcut key",
            [W.SUPERSCRIPT]: "Superscript",
            [W.SUBSCRIPT]: "Subscript",
            [q.LINK]: "Link",
            [q.IMAGE]: "Image",
            [q.HORIZONTAL_RULE]: "Horizontal line",
            [Z]: "Line break",
            [J]: "Undo",
            [Y]: "Redo",
          },
          rt = {
            [H.UNSTYLED]: "⌫",
            [H.HEADER_ONE]: "#",
            [H.HEADER_TWO]: "##",
            [H.HEADER_THREE]: "###",
            [H.HEADER_FOUR]: "####",
            [H.HEADER_FIVE]: "#####",
            [H.HEADER_SIX]: "######",
            [H.UNORDERED_LIST_ITEM]: "-",
            [H.ORDERED_LIST_ITEM]: "1.",
            [H.BLOCKQUOTE]: ">",
            [H.CODE]: "```",
            [W.BOLD]: { other: "Ctrl + B", macOS: "⌘ + B" },
            [W.ITALIC]: { other: "Ctrl + I", macOS: "⌘ + I" },
            [W.UNDERLINE]: { other: "Ctrl + U", macOS: "⌘ + U" },
            [W.STRIKETHROUGH]: { other: "Ctrl + ⇧ + X", macOS: "⌘ + ⇧ + X" },
            [W.SUPERSCRIPT]: { other: "Ctrl + .", macOS: "⌘ + ." },
            [W.SUBSCRIPT]: { other: "Ctrl + ,", macOS: "⌘ + ," },
            [q.LINK]: { other: "Ctrl + K", macOS: "⌘ + K" },
            [Z]: "⇧ + ↵",
            [q.HORIZONTAL_RULE]: "- - -",
            [J]: { other: "Ctrl + Z", macOS: "⌘ + Z" },
            [Y]: { other: "Ctrl + ⇧ + Z", macOS: "⌘ + ⇧ + Z" },
          },
          ot = "handled",
          it = "not-handled";
        var at = {
          getSelectedBlock(t) {
            const e = t.getSelection();
            return t.getCurrentContent().getBlockMap().get(e.getStartKey());
          },
          getSelectionEntity(t) {
            let e;
            const n = t.getSelection();
            let r = n.getStartOffset(),
              o = n.getEndOffset();
            r === o && 0 === r ? (o = 1) : r === o && (r -= 1);
            const i = this.getSelectedBlock(t);
            for (let t = r; t < o; t += 1) {
              const n = i.getEntityAt(t);
              if (!n) {
                e = void 0;
                break;
              }
              if (t === r) e = n;
              else if (e !== n) {
                e = void 0;
                break;
              }
            }
            return e;
          },
          getEntitySelection(t, e) {
            const n = t.getSelection();
            if (!e) return n;
            let r;
            return (
              this.getSelectedBlock(t).findEntityRanges(
                (t) => t.get("entity") === e,
                (t, e) => {
                  r = { start: t, end: e };
                },
              ),
              r
                ? n.merge({
                    anchorOffset: n.isBackward ? r.end : r.start,
                    focusOffset: n.isBackward ? r.start : r.end,
                  })
                : n
            );
          },
          updateBlockEntity(t, e, n) {
            let r = t.getCurrentContent().mergeEntityData(e.getEntityAt(0), n);
            return (
              (r = s.Modifier.mergeBlockData(
                r,
                new s.SelectionState({
                  anchorKey: e.getKey(),
                  anchorOffset: 0,
                  focusKey: e.getKey(),
                  focusOffset: e.getLength(),
                }),
                {},
              )),
              s.EditorState.push(t, r, "apply-entity")
            );
          },
          addHorizontalRuleRemovingSelection(t) {
            const e = t
              .getCurrentContent()
              .createEntity(q.HORIZONTAL_RULE, "IMMUTABLE", {})
              .getLastCreatedEntityKey();
            return s.AtomicBlockUtils.insertAtomicBlock(t, e, " ");
          },
          resetBlockWithType(t, e, n = "", r = {}) {
            const o = t.getCurrentContent(),
              i = t.getSelection(),
              a = i.getStartKey(),
              c = o.getBlockMap(),
              u = c.get(a);
            let l = u.getCharacterList(),
              f = 0;
            const p = u.getText().length - n.length;
            for (; f < p; ) (l = l.shift()), (f += 1);
            const d = u.merge({
                type: e || u.getType(),
                text: n,
                characterList: l,
                data: r,
              }),
              h = o.merge({ blockMap: c.set(a, d) }),
              g = i.merge({ anchorOffset: 0, focusOffset: 0 });
            return s.EditorState.acceptSelection(
              s.EditorState.push(t, h, "change-block-type"),
              g,
            );
          },
          applyMarkdownStyle(t, e, n) {
            const r = t.getSelection();
            let o = t.getCurrentContent();
            const i = r.merge({ anchorOffset: e.start, focusOffset: e.end }),
              a = r.merge({
                anchorOffset: e.end - e.pattern.length,
                focusOffset: e.end,
              }),
              c = r.merge({
                anchorOffset: e.start,
                focusOffset: e.start + e.pattern.length,
              });
            (o = s.Modifier.applyInlineStyle(o, i, e.type)),
              (o = s.Modifier.removeRange(o, a, "forward")),
              (o = s.Modifier.removeRange(o, c, "forward"));
            const u = r.getFocusOffset() - 2 * e.pattern.length,
              l = r.merge({ anchorOffset: u, focusOffset: u });
            return (
              (o = o.merge({ selectionAfter: l })),
              (o = s.Modifier.insertText(o, l, n)),
              s.EditorState.push(t, o, "change-inline-style")
            );
          },
          removeBlock(t, e) {
            const n = t.getCurrentContent(),
              r = n.getBlockMap().remove(e);
            return s.EditorState.set(t, {
              currentContent: n.merge({ blockMap: r }),
            });
          },
          removeBlockEntity(t, e, n) {
            let r = t;
            const o = t.getCurrentContent(),
              i = o.getBlockMap(),
              a = i.get(n),
              c = a.merge({
                type: H.UNSTYLED,
                text: "",
                characterList: a.getCharacterList().slice(0, 0),
                data: {},
              }),
              u = new s.SelectionState({
                anchorKey: n,
                focusKey: n,
                anchorOffset: 0,
                focusOffset: 0,
              }),
              l = o.merge({ blockMap: i.set(n, c) });
            return (
              (r = s.EditorState.push(r, l, "change-block-type")),
              (r = s.EditorState.forceSelection(r, u)),
              r
            );
          },
          handleDeleteAtomic(t) {
            const e = t.getSelection(),
              n = t.getCurrentContent(),
              r = e.getAnchorKey(),
              o = e.getAnchorOffset(),
              i = n.getBlockForKey(r);
            return (
              !(!e.isCollapsed() || i.getType() !== H.ATOMIC || 0 !== o) &&
              this.removeBlockEntity(t, i.getEntityAt(0), r)
            );
          },
          getEntityTypeStrategy: (t) => (e, n, r) => {
            e.findEntityRanges((e) => {
              const n = e.getEntity();
              return null !== n && r.getEntity(n).getType() === t;
            }, n);
          },
          insertNewUnstyledBlock(t) {
            const e = t.getSelection();
            let n = s.Modifier.splitBlock(t.getCurrentContent(), e);
            const r = n.getBlockMap(),
              o = e.getStartKey(),
              i = n.getKeyAfter(o),
              a = r.get(i).set("type", H.UNSTYLED);
            return (
              (n = n.merge({ blockMap: r.set(i, a) })),
              s.EditorState.push(t, n, "split-block")
            );
          },
          addLineBreak(t) {
            const e = t.getCurrentContent(),
              n = t.getSelection();
            if (n.isCollapsed()) return s.RichUtils.insertSoftNewline(t);
            let r = s.Modifier.removeRange(e, n, "forward");
            const o = r.getSelectionAfter(),
              i = r.getBlockForKey(o.getStartKey());
            return (
              (r = s.Modifier.insertText(
                r,
                o,
                "\n",
                i.getInlineStyleAt(o.getStartOffset()),
                void 0,
              )),
              s.EditorState.push(t, r, "insert-fragment")
            );
          },
          handleHardNewline(t) {
            const e = t.getSelection();
            if (!e.isCollapsed()) return !1;
            const n = t.getCurrentContent(),
              r = e.getStartKey(),
              o = n.getBlockForKey(r),
              i = o.getType().endsWith("-list-item");
            if (
              !i &&
              o.getType() !== H.UNSTYLED &&
              o.getLength() === e.getStartOffset()
            )
              return this.insertNewUnstyledBlock(t);
            if (i && 0 === o.getLength()) {
              const e = o.getDepth();
              if (0 === e) {
                const e = s.RichUtils.tryToRemoveBlockStyle(t);
                return !!e && s.EditorState.push(t, e, "change-block-type");
              }
              const i = n.getBlockMap(),
                a = o.set("depth", e - 1);
              return s.EditorState.push(
                t,
                n.merge({ blockMap: i.set(r, a) }),
                "adjust-depth",
              );
            }
            return !1;
          },
          handleNewLine(t, e) {
            if (U()(e)) return this.addLineBreak(t);
            const n = t.getCurrentContent(),
              r = t.getSelection(),
              o = r.getStartKey(),
              i = r.getStartOffset(),
              a = n.getBlockForKey(o);
            return a.getType() === H.CODE
              ? !(!r.isCollapsed() || 0 !== i || 0 !== a.getLength()) &&
                  s.EditorState.push(
                    t,
                    s.Modifier.setBlockType(n, r, H.UNSTYLED),
                    "change-block-type",
                  )
              : this.handleHardNewline(t);
          },
          getCommandPalettePrompt(t) {
            const e = t.getSelection();
            if (!e.isCollapsed() || !e.getHasFocus()) return null;
            const n = this.getSelectedBlock(t),
              r = e.getFocusOffset(),
              o = n.getText().slice(0, r),
              i = o.lastIndexOf("/"),
              a = o.length > i + 1 && " " === o[i + 1];
            if (-1 === i || a) return null;
            if (0 === i && (o.match(/\s/g) || []).length < 2)
              return { text: o, block: n, position: i };
            const s = o.slice(i);
            return (s.match(/\s/g) || []).length < 1
              ? { text: s, block: n, position: i }
              : null;
          },
          removeCommandPalettePrompt(t) {
            const e = this.getCommandPalettePrompt(t);
            if (!e) return t;
            const n = t.getSelection().merge({ anchorOffset: e?.position }),
              r = s.Modifier.replaceText(t.getCurrentContent(), n, "");
            return s.EditorState.push(t, r, "remove-range");
          },
        };
        const st = (t, e) => {
            const n = t;
            return "boolean" == typeof e
              ? et[n]
              : "string" == typeof e.label || null === e.label
              ? e.label
              : void 0 !== e.icon
              ? null
              : et[n];
          },
          ct = (t) => {
            const e = t.type,
              n = void 0 === t.description ? nt[e] : t.description,
              r = void 0 === t.label ? et[e] : t.label;
            return n || r;
          },
          ut = (t) => [
            t.label || "",
            t.description || "",
            t.type ? et[t.type] : "",
            t.type ? nt[t.type] : "",
            t.type || "",
          ],
          lt = (t) => Boolean(t.icon) || Boolean(st(t.type, t)),
          ft = (t) => lt(t) || Boolean(ct(t)),
          { hasCommandModifier: pt, isOptionKeyCommand: dt } = s.KeyBindingUtil,
          ht = pt,
          gt = "test" === dt({ altKey: "test" });
        var yt = {
          getBlockRenderMap(t) {
            let e = s.DefaultDraftBlockRenderMap;
            return (
              t.some((t) => t.type === H.CODE) &&
                (e = e.set(H.CODE, {
                  element: "code",
                  wrapper: s.DefaultDraftBlockRenderMap.get(H.CODE).wrapper,
                })),
              t
                .filter((t) => t.element)
                .forEach((t) => {
                  e = e.set(t.type, { element: t.element });
                }),
              e
            );
          },
          blockStyleFn: (t) =>
            `Draftail-block--${t.getType()}${
              0 === t.getText().length ? " Draftail-block--empty" : ""
            } ${((t) => {
              const e = t.getDepth();
              return e > 4 ? `${R}${String(e)}` : "";
            })(t)}`,
          getKeyBindingFn(t, e, n) {
            const r = (t) => t.reduce((t, e) => ((t[e.type] = e.type), t), {}),
              o = r(t),
              i = r(e),
              a = r(n);
            return (t) => {
              if (t.shiftKey)
                switch (t.keyCode) {
                  case 66:
                  case 73:
                  case 74:
                  case 85:
                    return;
                  case 88:
                    return ht(t) && i[W.STRIKETHROUGH];
                  case 55:
                    return ht(t) && o[H.ORDERED_LIST_ITEM];
                  case 56:
                    return ht(t) && o[H.UNORDERED_LIST_ITEM];
                  default:
                    return (0, s.getDefaultKeyBinding)(t);
                }
              const e = (t.ctrlKey || t.metaKey) && t.altKey;
              switch (t.keyCode) {
                case 75:
                  return ht(t) && a.LINK;
                case 66:
                  return ht(t) && i[W.BOLD];
                case 73:
                  return ht(t) && i[W.ITALIC];
                case 74:
                  return ht(t) && i[W.CODE];
                case 85:
                  return ht(t) && i[W.UNDERLINE];
                case 190:
                  return ht(t) && i[W.SUPERSCRIPT];
                case 188:
                  return ht(t) && i[W.SUBSCRIPT];
                case 48:
                  return e && H.UNSTYLED;
                case 49:
                  return e && o[H.HEADER_ONE];
                case 50:
                  return e && o[H.HEADER_TWO];
                case 51:
                  return e && o[H.HEADER_THREE];
                case 52:
                  return e && o[H.HEADER_FOUR];
                case 53:
                  return e && o[H.HEADER_FIVE];
                case 54:
                  return e && o[H.HEADER_SIX];
                default:
                  return (0, s.getDefaultKeyBinding)(t);
              }
            };
          },
          hasKeyboardShortcut: (t) => !!rt[t],
          getKeyboardShortcut(t, e = gt) {
            const n = rt[t];
            return (n && n[e ? "macOS" : "other"]) || n;
          },
          handleBeforeInputBlockType(t, e) {
            const n = t;
            return !!e.find((t) => t.type === X[n]) && X[n];
          },
          handleBeforeInputHR: (t, e) =>
            t === tt[q.HORIZONTAL_RULE] && e.getType() !== H.CODE,
          handleBeforeInputInlineStyle(t, e) {
            let n;
            const r = Q.filter(({ type: t }) =>
              e.some((e) => e.type === t),
            ).find(({ regex: e }) => ((n = new RegExp(e, "g").exec(t)), n));
            return (
              !(!n || !r) && {
                pattern: r.pattern,
                start: 0 === n.index ? 0 : n.index + 1,
                end: n.index + n[0].length,
                type: r.type,
              }
            );
          },
          getCustomStyleMap(t) {
            const e = {};
            return (
              t.forEach((t) => {
                t.style
                  ? (e[t.type] = t.style)
                  : G[t.type]
                  ? (e[t.type] = G[t.type])
                  : (e[t.type] = {});
              }),
              e
            );
          },
          filterPaste(
            {
              maxListNesting: t,
              enableHorizontalRule: e,
              enableLineBreak: n,
              blockTypes: r,
              inlineStyles: o,
              entityTypes: i,
            },
            a,
          ) {
            const l = i.slice(),
              f = ["\t", "📷"];
            return (
              e && l.push({ type: q.HORIZONTAL_RULE }),
              n || f.push("\n"),
              ((t, e) => {
                const {
                    blocks: n,
                    styles: r,
                    entities: o,
                    maxNesting: i,
                    whitespacedCharacters: a,
                    blockTextRules: l = C,
                  } = t,
                  f = [
                    g,
                    y.bind(null, l),
                    m.bind(null, i),
                    b.bind(null, r),
                    v.bind(null, n.concat([u, c])),
                    p,
                    d,
                    _.bind(null, (t, e, n) => {
                      const r = t.getEntity(e),
                        i = r.getData(),
                        a = r.getType(),
                        s = n.getType();
                      return (
                        (u = a),
                        o.some((t) => t.type === u) &&
                          ((t, e, n) => {
                            const r = t.find((t) => t.type === e),
                              o =
                                r && r.allowlist
                                  ? r.allowlist
                                  : r && r.whitelist
                                  ? r.whitelist
                                  : {};
                            return Object.keys(o).every((t) => {
                              const e = o[t];
                              if ("boolean" == typeof e) {
                                const r = n.hasOwnProperty(t);
                                return e ? r : !r;
                              }
                              return new RegExp(e).test(n[t]);
                            });
                          })(o, a, i) &&
                          !((t, e) => "IMAGE" === t && e !== c)(a, s)
                      );
                      var u;
                    }),
                    h.bind(null, o),
                    E.bind(null, o),
                    S,
                    w.bind(null, a),
                  ],
                  k = e.getCurrentContent();
                return ((t, e, n) => {
                  if (n === e) return t;
                  if (0 === n.getBlockMap().size)
                    return s.EditorState.moveFocusToEnd(
                      s.EditorState.set(t, {
                        currentContent: s.ContentState.createFromText(""),
                      }),
                    );
                  const r = s.EditorState.set(t, { currentContent: n }),
                    o = t.getSelection(),
                    i = o.getAnchorKey(),
                    a = n.getBlockForKey(i);
                  if (!o.isCollapsed() || a) return r;
                  const c = n
                    .getBlockMap()
                    .keySeq()
                    .reverse()
                    .find((t) => e.getKeyAfter(t) !== n.getKeyAfter(t));
                  if (c) {
                    const t = n.getBlockForKey(c).getText().length,
                      e = o.merge({
                        anchorKey: c,
                        focusKey: c,
                        anchorOffset: t,
                        focusOffset: t,
                      });
                    return s.EditorState.acceptSelection(r, e);
                  }
                  return r;
                })(
                  e,
                  k,
                  f.reduce((t, e) => e(t), k),
                );
              })(
                {
                  blocks: r.map((t) => t.type),
                  styles: o.map((t) => t.type),
                  entities: l,
                  maxNesting: t,
                  whitespacedCharacters: f,
                },
                a,
              )
            );
          },
          getCommandPalette({
            commands: t,
            blockTypes: e,
            entityTypes: n,
            enableHorizontalRule: r,
          }) {
            if (!t) return [];
            if ("boolean" == typeof t && t) {
              const t = [
                ...e.filter(ft).map((t) => ({ ...t, category: "blockTypes" })),
                ...n
                  .filter((t) => ft(t))
                  .map((t) => ({ ...t, category: "entityTypes" })),
              ];
              return (
                r &&
                  t.push({
                    type: q.HORIZONTAL_RULE,
                    ...("object" == typeof r ? r : {}),
                    category: "entityTypes",
                  }),
                [{ label: null, type: "built-ins", items: t }]
              );
            }
            return t.map((t) => {
              let r = t.items || [];
              return (
                "blockTypes" === t.type
                  ? (r = (t.items || e)
                      .filter(ft)
                      .map((t) => ({ ...t, category: "blockTypes" })))
                  : "entityTypes" === t.type &&
                    (r = (t.items || n)
                      .filter((t) => ft(t))
                      .map((t) => ({ ...t, category: "entityTypes" }))),
                { ...t, items: r }
              );
            });
          },
        };
        const mt = ({ icon: t, title: e, className: n }) => {
          let r;
          if ("string" == typeof t)
            r = t.includes("#")
              ? (0, o.jsx)("use", { xlinkHref: t })
              : (0, o.jsx)("path", { d: t });
          else {
            if (!Array.isArray(t)) return t;
            r = t.map((t, e) => (0, o.jsx)("path", { d: t }, e));
          }
          return (0, o.jsx)("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 1024 1024",
            className: `Draftail-Icon ${n || ""}`,
            "aria-hidden": e ? void 0 : "true",
            role: e ? "img" : void 0,
            "aria-label": e || void 0,
            children: r,
          });
        };
        class vt extends i.PureComponent {
          constructor(t) {
            super(t),
              (this.state = { showTooltipOnHover: !0 }),
              (this.onMouseDown = this.onMouseDown.bind(this)),
              (this.onMouseLeave = this.onMouseLeave.bind(this));
          }
          onMouseDown(t) {
            const { name: e, onClick: n } = this.props;
            t.preventDefault(),
              this.setState({ showTooltipOnHover: !1 }),
              n && n(e || "");
          }
          onMouseLeave() {
            this.setState({ showTooltipOnHover: !0 });
          }
          render() {
            const {
                name: t,
                active: e,
                label: n,
                title: r,
                icon: i,
                className: a,
                tooltipDirection: s,
              } = this.props,
              { showTooltipOnHover: c } = this.state,
              u = r && c;
            return (0, o.jsxs)("button", {
              name: t,
              className: `Draftail-ToolbarButton ${a || ""}${
                e ? " Draftail-ToolbarButton--active" : ""
              }`,
              type: "button",
              "aria-label": r || void 0,
              "data-draftail-balloon": u ? s || "up" : null,
              tabIndex: -1,
              onMouseDown: this.onMouseDown,
              onMouseLeave: this.onMouseLeave,
              children: [
                i ? (0, o.jsx)(mt, { icon: i }) : null,
                n
                  ? (0, o.jsx)("span", {
                      className: "Draftail-ToolbarButton__label",
                      children: n,
                    })
                  : null,
              ],
            });
          }
        }
        const bt = ({ name: t, children: e }) =>
            a()
              .Children.toArray(e)
              .some((t) => null !== t)
              ? (0, o.jsx)("div", {
                  className: `Draftail-ToolbarGroup Draftail-ToolbarGroup--${t}`,
                  children: e,
                })
              : null,
          St = (t, e) => {
            const n =
              "boolean" == typeof e || void 0 === e.description
                ? nt[t]
                : e.description;
            let r = n;
            return (
              yt.hasKeyboardShortcut(t) &&
                (r = `${n ? `${n}\n` : ""}${yt.getKeyboardShortcut(t)}`),
              r
            );
          };
        class _t extends i.PureComponent {
          render() {
            const {
              currentStyles: t,
              currentBlock: e,
              blockTypes: n,
              inlineStyles: r,
              enableHorizontalRule: i,
              enableLineBreak: a,
              showUndoControl: s,
              showRedoControl: c,
              entityTypes: u,
              toggleBlockType: l,
              toggleInlineStyle: f,
              addHR: p,
              addBR: d,
              onUndoRedo: h,
              onRequestSource: g,
            } = this.props;
            return [
              (0, o.jsx)(
                bt,
                {
                  name: "styles",
                  children: r.filter(lt).map((e) =>
                    (0, o.jsx)(
                      vt,
                      {
                        name: e.type,
                        active: t.has(e.type),
                        label: st(e.type, e),
                        title: St(e.type, e),
                        icon: e.icon,
                        onClick: f,
                      },
                      e.type,
                    ),
                  ),
                },
                "styles",
              ),
              (0, o.jsx)(
                bt,
                {
                  name: "blocks",
                  children: n.filter(lt).map((t) =>
                    (0, o.jsx)(
                      vt,
                      {
                        name: t.type,
                        active: e === t.type,
                        label: st(t.type, t),
                        title: St(t.type, t),
                        icon: t.icon,
                        onClick: l,
                      },
                      t.type,
                    ),
                  ),
                },
                "blocks",
              ),
              (0, o.jsxs)(
                bt,
                {
                  name: "hr-br",
                  children: [
                    i
                      ? (0, o.jsx)(vt, {
                          name: q.HORIZONTAL_RULE,
                          onClick: p,
                          label: st(q.HORIZONTAL_RULE, i),
                          title: St(q.HORIZONTAL_RULE, i),
                          icon: "boolean" != typeof i ? i.icon : null,
                        })
                      : null,
                    a
                      ? (0, o.jsx)(vt, {
                          name: Z,
                          onClick: d,
                          label: st(Z, a),
                          title: St(Z, a),
                          icon: "boolean" != typeof a ? a.icon : null,
                        })
                      : null,
                  ],
                },
                "hr-br",
              ),
              (0, o.jsx)(
                bt,
                {
                  name: "entities",
                  children: u.filter(lt).map((t) =>
                    (0, o.jsx)(
                      vt,
                      {
                        name: t.type,
                        onClick: g,
                        label: st(t.type, t),
                        title: St(t.type, t),
                        icon: t.icon,
                      },
                      t.type,
                    ),
                  ),
                },
                "entities",
              ),
              (0, o.jsxs)(
                bt,
                {
                  name: "undo-redo",
                  children: [
                    s
                      ? (0, o.jsx)(vt, {
                          name: J,
                          onClick: h,
                          label: st(J, s),
                          title: St(J, s),
                          icon: "boolean" != typeof s ? s.icon : null,
                        })
                      : null,
                    c
                      ? (0, o.jsx)(vt, {
                          name: Y,
                          onClick: h,
                          label: st(Y, c),
                          title: St(Y, c),
                          icon: "boolean" != typeof c ? c.icon : null,
                        })
                      : null,
                  ],
                },
                "undo-redo",
              ),
            ];
          }
        }
        const Et = ({
            controls: t,
            getEditorState: e,
            onChange: n,
            className: r,
            ...i
          }) =>
            (0, o.jsxs)("div", {
              className: `Draftail-Toolbar ${r || ""}`,
              role: "toolbar",
              children: [
                (0, o.jsx)(_t, { ...i }),
                (0, o.jsx)(bt, {
                  name: "controls",
                  children: t.map((t, r) => {
                    if (t.meta) return null;
                    const i = t.block || t.inline || t;
                    return (0, o.jsx)(i, { getEditorState: e, onChange: n }, r);
                  }),
                }),
              ],
            }),
          wt = a().memo(function ({ max: t }) {
            return t ? (0, o.jsx)("style", { children: A(t) }) : null;
          }),
          Ct = () => (0, o.jsx)("hr", { className: "Draftail-DividerBlock" }),
          kt = new Intl.Collator(void 0, {
            usage: "search",
            sensitivity: "base",
            ignorePunctuation: !0,
          }),
          xt = (t, e, n) =>
            t.filter((t) =>
              e(t).some(
                (t) =>
                  t &&
                  ((t, e) => {
                    if (0 === e.length) return !0;
                    const n = t.normalize("NFC"),
                      r = e.normalize("NFC");
                    for (let t = 0; t + r.length <= n.length; t += 1) {
                      const e = n.slice(t, t + r.length);
                      if (0 === kt.compare(r, e)) return !0;
                    }
                    return !1;
                  })(t, n),
              ),
            );
        function Tt({
          label: t,
          placeholder: e,
          inputValue: n,
          items: r,
          getItemLabel: a,
          getItemDescription: s,
          getSearchFields: c,
          onSelect: u,
          noResultsText: l,
        }) {
          const f = !t,
            p = r.flatMap((t) => t.items || []),
            [d, h] = (0, i.useState)(p),
            g = 0 === d.length,
            {
              getLabelProps: y,
              getMenuProps: m,
              getInputProps: v,
              getItemProps: b,
              setHighlightedIndex: S,
              setInputValue: _,
              openMenu: E,
            } = (0, j.Bp)({
              ...(void 0 !== n && { inputValue: n }),
              initialInputValue: n || "",
              items: d,
              itemToString: (t) => (t && (s(t) || a(t.type, t))) || "",
              selectedItem: null,
              onSelectedItemChange: u,
              onInputValueChange: (t) => {
                const { inputValue: e } = t;
                if (!e) return void h(p);
                const n = xt(p, c, e);
                h(n), S(0);
              },
            });
          return (
            (0, i.useEffect)(() => {
              if (n) {
                E(), _(n);
                const t = xt(p, c, n);
                h(t), S(0);
              } else _(""), h(p), S(-1);
            }, [n]),
            (0, o.jsxs)("div", {
              className:
                "Draftail-ComboBox Draftail-ComboBox--" +
                (f ? "inline" : "field"),
              children: [
                (0, o.jsx)("label", {
                  className: "Draftail-ComboBox__label",
                  ...y(),
                  children: t,
                }),
                (0, o.jsx)("div", {
                  className: "Draftail-ComboBox__field",
                  children: (0, o.jsx)("input", {
                    type: "text",
                    ...v(),
                    disabled: f,
                    placeholder: e,
                  }),
                }),
                g
                  ? (0, o.jsx)("div", {
                      className: "Draftail-ComboBox__status",
                      children: l,
                    })
                  : null,
                (0, o.jsx)("div", {
                  ...m(),
                  className: "Draftail-ComboBox__menu",
                  children: r.map((t) => {
                    const e = (t.items || []).filter((t) =>
                      d.find((e) => e.type === t.type),
                    );
                    return 0 === e.length
                      ? null
                      : (0, o.jsxs)(
                          "div",
                          {
                            className: "Draftail-ComboBox__optgroup",
                            children: [
                              t.label
                                ? (0, o.jsx)("div", {
                                    className:
                                      "Draftail-ComboBox__optgroup-label",
                                    children: t.label,
                                  })
                                : null,
                              e.map((t, e) => {
                                const n = a(t.type, t),
                                  r = s(t),
                                  i = void 0 !== t.icon && null !== t.icon;
                                return (0, o.jsxs)(
                                  "div",
                                  {
                                    ...b({
                                      item: t,
                                      index: d.findIndex(
                                        (e) => e.type === t.type,
                                      ),
                                    }),
                                    onMouseDown: (e) => {
                                      u({ selectedItem: t }),
                                        e.stopPropagation();
                                    },
                                    className: "Draftail-ComboBox__option",
                                    children: [
                                      (0, o.jsxs)("div", {
                                        className:
                                          "Draftail-ComboBox__option-icon",
                                        children: [
                                          i
                                            ? (0, o.jsx)(mt, { icon: t.icon })
                                            : null,
                                          n && !i
                                            ? (0, o.jsx)("span", {
                                                children: n,
                                              })
                                            : null,
                                        ],
                                      }),
                                      t.render
                                        ? t.render({ option: t })
                                        : (0, o.jsx)("div", {
                                            className:
                                              "Draftail-ComboBox__option-text",
                                            children: r,
                                          }),
                                    ],
                                  },
                                  `${n}${t.type}${e}`,
                                );
                              }),
                            ],
                          },
                          t.type,
                        );
                  }),
                }),
              ],
            })
          );
        }
        const Ot = [
            {
              name: "hideOnEsc",
              defaultValue: !0,
              fn(t) {
                function e(e) {
                  "Escape" === e.key && t.hide();
                }
                return {
                  onShow() {
                    document.addEventListener("keydown", e);
                  },
                  onHide() {
                    document.removeEventListener("keydown", e);
                  },
                };
              },
            },
            {
              name: "hideOnPopperBlur",
              defaultValue: !0,
              fn: (t) => ({
                onCreate() {
                  t.popper.addEventListener("focusout", (e) => {
                    t.props.hideOnPopperBlur &&
                      e.relatedTarget &&
                      !t.popper.contains(e.relatedTarget) &&
                      t.hide();
                  });
                },
              }),
            },
          ],
          Dt = [300, 0],
          Rt = ({
            content: t,
            children: e,
            shouldOpen: n,
            getTargetPosition: r,
            showBackdrop: a = !1,
            zIndex: s = 100,
            placement: c = "top",
            onHide: u,
            onClickOutside: l,
            onMount: f,
          }) => {
            const p = (0, i.useRef)(null),
              [d, h] = (0, i.useState)();
            (0, i.useEffect)(() => {
              if (!e && r && p.current)
                if (n) {
                  const t = p.current
                    .closest("[data-draftail-editor]")
                    .getBoundingClientRect();
                  h(r(t));
                } else h(null);
            }, [n, r, e]);
            const g = n && Boolean(d || e);
            return (0, o.jsxs)(o.Fragment, {
              children: [
                a
                  ? (0, o.jsx)("div", {
                      className:
                        "Draftail-Tooltip__backdrop" +
                        (g ? " Draftail-Tooltip__backdrop--visible" : ""),
                    })
                  : null,
                (0, o.jsx)("div", {
                  hidden: !0,
                  contentEditable: "false",
                  suppressContentEditableWarning: !0,
                  ref: p,
                }),
                (0, o.jsx)(z.Ay, {
                  className: "Draftail-Tooltip",
                  visible: g,
                  interactive: !0,
                  onHide: u,
                  onClickOutside: l || u,
                  onMount: f,
                  placement: c,
                  maxWidth: "100%",
                  zIndex: s,
                  duration: Dt,
                  arrow: !1,
                  appendTo: () =>
                    p.current
                      .closest("[data-draftail-editor]")
                      .querySelector("[data-draftail-tooltip-parent]"),
                  plugins: Ot,
                  content: t,
                  children:
                    e ||
                    (0, o.jsx)("div", {
                      className: "Draftail-Tooltip__target",
                      style: d || void 0,
                      children: "​",
                    }),
                }),
              ],
            });
          },
          Mt = (t, e) => {
            const n = e.target.closest("[data-draftail-editor]");
            if (!n) return !1;
            const r = n.querySelector('[role="combobox"]');
            return (
              !!r &&
              !(
                "Enter" === t &&
                !n.querySelector(
                  `#${r.getAttribute("aria-controls")} [aria-selected="true"]`,
                )
              ) &&
              (r.dispatchEvent(
                new KeyboardEvent("keydown", { key: t, bubbles: !0 }),
              ),
              e.preventDefault(),
              !0)
            );
          },
          At = (t) => {
            const e = (0, s.getVisibleSelectionRect)(window);
            return e ? { top: e.top - t.top, left: e.left - t.left } : null;
          },
          It = ({
            blockTypes: t,
            entityTypes: e,
            enableHorizontalRule: n,
            comboPlacement: r,
            noResultsText: a,
            tooltipZIndex: c,
            showBackdrop: u,
            commands: l,
            getEditorState: f,
            onCompleteSource: p,
            onRequestSource: d,
            ComboBoxComponent: h = Tt,
          }) => {
            const g = f(),
              y = at.getCommandPalettePrompt(g),
              m = y?.text || "",
              v = y?.position,
              b = y?.block.getKey(),
              [S, _] = (0, i.useState)(!1),
              [E, w] = (0, i.useState)(null);
            if (
              ((0, i.useEffect)(() => {
                if (m)
                  if (E) {
                    const t =
                      E.position !== v ||
                      E.block.getKey() !== b ||
                      !m.startsWith(E.text);
                    _(t), t && w(null);
                  } else _(!0);
                else _(!1);
              }, [E, m, v, b]),
              !S)
            )
              return null;
            const C = yt.getCommandPalette({
              commands: l,
              blockTypes: t,
              entityTypes: e,
              enableHorizontalRule: n,
            });
            return (0, o.jsx)(Rt, {
              shouldOpen: S,
              onHide: () => {
                y && w(y), _(!1);
              },
              getTargetPosition: At,
              showBackdrop: u,
              placement: r,
              zIndex: c,
              content: S
                ? (0, o.jsx)(h, {
                    items: C,
                    getItemLabel: st,
                    getItemDescription: ct,
                    getSearchFields: ut,
                    inputValue: m.substring(1) || "",
                    noResultsText: a,
                    onSelect: (t) => {
                      const e = t.selectedItem;
                      if (!e) return;
                      const n = e.type;
                      if (e.onSelect)
                        p(e.onSelect({ editorState: g, prompt: y?.text }));
                      else if ("blockTypes" === e.category) {
                        const t = at.removeCommandPalettePrompt(g);
                        p(s.RichUtils.toggleBlockType(t, n));
                      } else if (e.type === q.HORIZONTAL_RULE) {
                        const t = at.removeCommandPalettePrompt(g);
                        p(at.addHorizontalRuleRemovingSelection(t));
                      } else if ("entityTypes" === e.category) {
                        const t = at.removeCommandPalettePrompt(g);
                        p(t),
                          setTimeout(() => {
                            d(n);
                          }, 50);
                      }
                    },
                  })
                : null,
            });
          };
        It.defaultProps = {
          comboPlacement: "bottom-end",
          noResultsText: "No results found",
          tooltipZIndex: 100,
          showBackdrop: !1,
        };
        const Bt = a().memo(function ({
            blockKey: t,
            blockTypes: e,
            placeholder: n,
          }) {
            let r = "";
            t &&
              n &&
              (r = `.Draftail-block--unstyled.Draftail-block--empty[data-offset-key="${t}-0-0"]::before { content: "${n}"; }`);
            const i = e
              .map((t) => {
                if (t.type === H.UNSTYLED || t.type.endsWith("-list-item"))
                  return "";
                const e = ct(t);
                return e
                  ? `.Draftail-block--${t.type}.Draftail-block--empty::before { content: "${e}"; }`
                  : "";
              })
              .join("");
            return (0, o.jsx)("style", { children: `${i}${r}` });
          }),
          Kt = {
            rawContentState: null,
            onSave: null,
            editorState: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
            placeholder: null,
            enableHorizontalRule: !1,
            enableLineBreak: !1,
            showUndoControl: !1,
            showRedoControl: !1,
            stripPastedStyles: !0,
            multiline: !0,
            spellCheck: !1,
            readOnly: !1,
            textAlignment: null,
            textDirectionality: null,
            autoCapitalize: null,
            autoComplete: null,
            autoCorrect: null,
            ariaDescribedBy: null,
            ariaExpanded: null,
            ariaLabel: null,
            ariaLabelledBy: null,
            ariaOwneeID: null,
            ariaRequired: null,
            blockTypes: [],
            inlineStyles: [],
            entityTypes: [],
            decorators: [],
            controls: [],
            plugins: [],
            commands: !1,
            topToolbar: Et,
            bottomToolbar: null,
            commandToolbar: It,
            maxListNesting: 1,
            stateSaveInterval: 250,
          };
        class Lt extends i.Component {
          constructor(t) {
            super(t),
              (this.onChange = this.onChange.bind(this)),
              (this.saveState = this.saveState.bind(this)),
              (this.toggleSource = this.toggleSource.bind(this)),
              (this.toggleEditor = this.toggleEditor.bind(this)),
              (this.lockEditor = this.toggleEditor.bind(this, !0)),
              (this.unlockEditor = this.toggleEditor.bind(this, !1)),
              (this.handleReturn = this.handleReturn.bind(this)),
              (this.onFocus = this.onFocus.bind(this)),
              (this.onBlur = this.onBlur.bind(this)),
              (this.onTab = this.onTab.bind(this)),
              (this.onUpArrow = this.onUpArrow.bind(this)),
              (this.onDownArrow = this.onDownArrow.bind(this)),
              (this.handleKeyCommand = this.handleKeyCommand.bind(this)),
              (this.handleBeforeInput = this.handleBeforeInput.bind(this)),
              (this.handlePastedText = this.handlePastedText.bind(this)),
              (this.toggleBlockType = this.toggleBlockType.bind(this)),
              (this.toggleInlineStyle = this.toggleInlineStyle.bind(this)),
              (this.onEditEntity = this.onEditEntity.bind(this)),
              (this.onRemoveEntity = this.onRemoveEntity.bind(this)),
              (this.addHR = this.addHR.bind(this)),
              (this.addBR = this.addBR.bind(this)),
              (this.onUndoRedo = this.onUndoRedo.bind(this)),
              (this.blockRenderer = this.blockRenderer.bind(this)),
              (this.onRequestSource = this.onRequestSource.bind(this)),
              (this.onCompleteSource = this.onCompleteSource.bind(this)),
              (this.onCloseSource = this.onCloseSource.bind(this)),
              (this.focus = this.focus.bind(this)),
              (this.renderSource = this.renderSource.bind(this)),
              (this.tooltipParentRef = a().createRef());
            const { editorState: e, rawContentState: n } = t;
            (this.state = {
              readOnlyState: !1,
              hasFocus: !1,
              sourceOptions: null,
              lastShortcutKey: null,
            }),
              null !== e
                ? (this.getEditorState = this.getEditorStateProp.bind(this))
                : ((this.state.editorState = L(n)),
                  (this.getEditorState = this.getEditorStateState.bind(this)));
          }
          componentDidMount() {
            this.copySource = ((t) => {
              const e = t.editor,
                n = K.bind(null, t);
              return (
                e.addEventListener("copy", n),
                e.addEventListener("cut", n),
                {
                  unregister() {
                    e.removeEventListener("copy", n),
                      e.removeEventListener("cut", n);
                  },
                }
              );
            })(this.editorRef.editor);
          }
          componentWillUnmount() {
            this.copySource.unregister(),
              window.clearTimeout(this.updateTimeout);
          }
          onFocus() {
            this.setState({ hasFocus: !0 });
            const { onFocus: t } = this.props;
            t && t();
          }
          onBlur() {
            this.setState({ hasFocus: !1 });
            const { onBlur: t } = this.props;
            t && t();
          }
          onTab(t) {
            const { maxListNesting: e } = this.props,
              n = this.getEditorState(),
              r = s.RichUtils.onTab(t, n, e);
            return this.onChange(r), !0;
          }
          onUpArrow(t) {
            const { commands: e } = this.props,
              n = this.getEditorState();
            e && at.getCommandPalettePrompt(n) && Mt("ArrowUp", t);
          }
          onDownArrow(t) {
            const { commands: e } = this.props,
              n = this.getEditorState();
            e && at.getCommandPalettePrompt(n) && Mt("ArrowDown", t);
          }
          onChange(t) {
            const {
                multiline: e,
                stateSaveInterval: n,
                maxListNesting: r,
                enableHorizontalRule: o,
                enableLineBreak: i,
                blockTypes: a,
                inlineStyles: c,
                entityTypes: u,
                onChange: l,
              } = this.props,
              f = this.getEditorState(),
              p =
                t.getCurrentContent() !== f.getCurrentContent() &&
                "insert-fragment" === t.getLastChangeType();
            let d = t;
            p &&
              ((d = yt.filterPaste(
                {
                  maxListNesting: r,
                  enableHorizontalRule: o,
                  enableLineBreak: i,
                  blockTypes: a,
                  inlineStyles: c,
                  entityTypes: u,
                },
                d,
              )),
              e ||
                (d = ((t, e) => {
                  const n = t.getCurrentContent(),
                    r = n.getBlockMap();
                  if (r.size < 2) return t;
                  let o,
                    i = "";
                  r.forEach((t) => {
                    if ("atomic" !== t.getType()) {
                      i = `${i}${i ? " " : ""}${t.getText()}`;
                      const e = t.getCharacterList();
                      o = o ? o.concat(e.slice(0, 1), e) : e;
                    }
                  });
                  const a = r
                      .slice(-1)
                      .map((t) => t.merge({ text: i, characterList: o })),
                    c = n.merge({ blockMap: a }),
                    u = e.getSelection(),
                    l = Math.max(u.getFocusOffset(), u.getAnchorOffset()),
                    f = e.getCurrentContent().getFirstBlock().getLength(),
                    p = i.length - f,
                    d = t
                      .getSelection()
                      .merge({ anchorOffset: l + p, focusOffset: l + p }),
                    h = s.EditorState.set(t, { currentContent: c });
                  return s.EditorState.acceptSelection(h, d);
                })(d, f))),
              l
                ? l(d)
                : this.setState({ editorState: d }, () => {
                    window.clearTimeout(this.updateTimeout),
                      (this.updateTimeout = window.setTimeout(
                        this.saveState,
                        n,
                      ));
                  });
          }
          onEditEntity(t) {
            const { entityTypes: e } = this.props,
              n = this.getEditorState(),
              r = n.getCurrentContent().getEntity(t);
            if (!e.find((t) => t.type === r.getType()).block) {
              const e = at.getEntitySelection(n, t),
                r = s.EditorState.acceptSelection(n, e);
              this.onChange(r);
            }
            this.toggleSource(r.getType(), t, r);
          }
          onRemoveEntity(t, e) {
            const { entityTypes: n } = this.props,
              r = this.getEditorState(),
              o = r.getCurrentContent().getEntity(t),
              i = n.find((t) => t.type === o.getType());
            let a = r;
            if (e && i.block) a = at.removeBlockEntity(a, t, e);
            else {
              const e = at.getEntitySelection(r, t);
              a = s.RichUtils.toggleLink(a, e, null);
            }
            this.onChange(a);
          }
          onUndoRedo(t) {
            const e = this.getEditorState();
            let n = e;
            t === J
              ? (n = s.EditorState.undo(e))
              : t === Y && (n = s.EditorState.redo(e)),
              this.onChange(n);
          }
          onRequestSource(t) {
            const e = this.getEditorState(),
              n = e.getCurrentContent(),
              r = at.getSelectionEntity(e);
            this.toggleSource(t, r, r ? n.getEntity(r) : null);
          }
          onCompleteSource(t) {
            this.setState({ sourceOptions: null }, () => {
              t && this.onChange(t),
                window.setTimeout(() => {
                  this.setState({ readOnlyState: !1 }, () => {
                    window.setTimeout(() => {
                      this.focus();
                    }, 0);
                  });
                }, 0);
            });
          }
          onCloseSource() {
            this.setState({ sourceOptions: null, readOnlyState: !1 });
          }
          getEditorStateProp() {
            const { editorState: t } = this.props;
            return t;
          }
          getEditorStateState() {
            const { editorState: t } = this.state;
            return t;
          }
          saveState() {
            const { onSave: t } = this.props,
              e = this.getEditorState();
            t && t(N(e));
          }
          toggleEditor(t) {
            this.setState({ readOnlyState: t });
          }
          toggleSource(t, e, n) {
            const { entityTypes: r } = this.props,
              o = r.find((e) => e.type === t);
            this.setState({
              readOnlyState: !0,
              sourceOptions: { entity: n, entityKey: e, entityType: o },
            });
          }
          handleReturn(t) {
            const {
                multiline: e,
                enableLineBreak: n,
                inlineStyles: r,
                commands: o,
              } = this.props,
              i = this.getEditorState();
            if (o && at.getCommandPalettePrompt(i) && Mt("Enter", t)) return ot;
            if (t.altKey) {
              const t = at.getSelectionEntity(i);
              if (t) {
                const e = i.getCurrentContent().getEntity(t).getData();
                e.url && window.open(e.url);
              }
              return ot;
            }
            n || (t.which = 0);
            let a = i,
              c = !1;
            const u = a.getSelection();
            if (u.isCollapsed()) {
              const t = at.getSelectedBlock(i);
              (c = yt.handleBeforeInputInlineStyle(t.getText(), r)),
                c && (a = at.applyMarkdownStyle(a, c, ""));
            }
            if (!e) return ot;
            const l = at.handleNewLine(a, t);
            if (!l && c) {
              const t = a.getCurrentContent(),
                e = s.Modifier.splitBlock(t, u);
              (a = s.EditorState.push(a, e, "split-block")),
                (a = s.RichUtils.toggleInlineStyle(a, c.type));
            } else a = l;
            return a && a !== i ? (this.onChange(a), ot) : it;
          }
          handleKeyCommand(t) {
            const {
                entityTypes: e,
                blockTypes: n,
                inlineStyles: r,
              } = this.props,
              o = this.getEditorState();
            if (e.some((e) => e.type === t)) return this.onRequestSource(t), ot;
            if (n.some((e) => e.type === t)) return this.toggleBlockType(t), ot;
            if (r.some((e) => e.type === t))
              return this.toggleInlineStyle(t), ot;
            if ("delete" === t) {
              const t = at.handleDeleteAtomic(o);
              if (t) return this.onChange(t), ot;
            }
            if ($.includes(t)) return ot;
            const i = s.RichUtils.handleKeyCommand(o, t);
            return i ? (this.onChange(i), ot) : it;
          }
          handleBeforeInput(t) {
            const {
                blockTypes: e,
                inlineStyles: n,
                enableHorizontalRule: r,
              } = this.props,
              { lastShortcutKey: o } = this.state,
              i = this.getEditorState(),
              a = i.getSelection();
            if (a.isCollapsed()) {
              const s = at.getSelectedBlock(i),
                c = a.getStartOffset(),
                u = s.getText(),
                l = u.slice(0, c),
                f = `${l}${t}`,
                p = `${s.getKey()}:${l}`;
              let d = i;
              const h = yt.handleBeforeInputBlockType(f, e);
              h &&
                h !== s.getType() &&
                (p !== o
                  ? ((d = at.resetBlockWithType(d, h, u.replace(l, ""))),
                    this.setState({ lastShortcutKey: p }))
                  : this.setState({ lastShortcutKey: null })),
                r &&
                  yt.handleBeforeInputHR(f, s) &&
                  (d = at.removeBlock(
                    at.addHorizontalRuleRemovingSelection(d),
                    s.getKey(),
                  ));
              const g = yt.handleBeforeInputInlineStyle(l, n);
              if ((g && (d = at.applyMarkdownStyle(d, g, t)), d !== i))
                return this.onChange(d), ot;
            }
            return it;
          }
          handlePastedText(t, e, n) {
            const { stripPastedStyles: r, entityTypes: o } = this.props;
            if (
              o.some(
                (r) =>
                  (r.onPaste &&
                    r.onPaste(
                      t,
                      e,
                      n,
                      {
                        setEditorState: this.onChange,
                        getEditorState: this.getEditorState,
                      },
                      r,
                    )) === ot,
              )
            )
              return ot;
            if (r) return it;
            const i = ((t, e) => {
              const n = ((t) => {
                if ("" === t || null == t) return null;
                const e = new DOMParser()
                  .parseFromString(t, "text/html")
                  .querySelector(`[${I}]`);
                if (e) {
                  const t = e.getAttribute(I);
                  let n;
                  try {
                    n = JSON.parse(t);
                  } catch (t) {
                    return null;
                  }
                  return (0, s.convertFromRaw)(n);
                }
                return null;
              })(t);
              if (n) {
                const t = n.getBlockMap(),
                  r = s.Modifier.replaceWithFragment(
                    e.getCurrentContent(),
                    e.getSelection(),
                    t,
                  );
                return s.EditorState.push(e, r, "insert-fragment");
              }
              return !1;
            })(e, n);
            return i ? (this.onChange(i), ot) : it;
          }
          toggleBlockType(t) {
            const e = this.getEditorState();
            this.onChange(s.RichUtils.toggleBlockType(e, t));
          }
          toggleInlineStyle(t) {
            const e = this.getEditorState();
            this.onChange(s.RichUtils.toggleInlineStyle(e, t));
          }
          addHR() {
            const t = this.getEditorState();
            this.onChange(at.addHorizontalRuleRemovingSelection(t));
          }
          addBR() {
            const t = this.getEditorState();
            this.onChange(at.addLineBreak(t));
          }
          blockRenderer(t) {
            const { entityTypes: e, textDirectionality: n } = this.props,
              r = this.getEditorState(),
              o = r.getCurrentContent();
            if (t.getType() !== H.ATOMIC) return null;
            const i = t.getEntityAt(0);
            if (!i) return { editable: !1 };
            const a = o.getEntity(i);
            if (a.getType() === q.HORIZONTAL_RULE)
              return { component: Ct, editable: !1 };
            const s = e.find((t) => t.type === a.getType());
            return {
              component: s.block,
              editable: !1,
              props: {
                editorState: r,
                entity: a,
                entityKey: i,
                entityType: s,
                textDirectionality: n,
                lockEditor: this.lockEditor,
                unlockEditor: this.unlockEditor,
                onEditEntity: this.onEditEntity.bind(null, i),
                onRemoveEntity: this.onRemoveEntity.bind(null, i, t.getKey()),
                onChange: this.onChange,
              },
            };
          }
          focus() {
            this.editorRef.focus();
          }
          renderSource() {
            const { textDirectionality: t } = this.props,
              { sourceOptions: e } = this.state,
              n = this.getEditorState();
            if (e && e.entityType) {
              const r = e.entityType.source;
              return (0, o.jsx)(r, {
                editorState: n,
                onComplete: this.onCompleteSource,
                onClose: this.onCloseSource,
                entity: e.entity,
                entityKey: e.entityKey,
                entityType: e.entityType,
                textDirectionality: t,
              });
            }
            return null;
          }
          render() {
            const {
                placeholder: t,
                enableHorizontalRule: e,
                enableLineBreak: n,
                showUndoControl: r,
                showRedoControl: i,
                stripPastedStyles: a,
                multiline: s,
                spellCheck: c,
                textAlignment: u,
                textDirectionality: l,
                autoCapitalize: f,
                autoComplete: p,
                autoCorrect: d,
                ariaDescribedBy: h,
                ariaExpanded: g,
                ariaLabel: y,
                ariaLabelledBy: m,
                ariaOwneeID: v,
                ariaRequired: b,
                blockTypes: S,
                inlineStyles: _,
                entityTypes: E,
                decorators: w,
                controls: C,
                readOnly: x,
                maxListNesting: T,
                plugins: O,
                commands: D,
                topToolbar: R,
                bottomToolbar: M,
                commandToolbar: A,
              } = this.props,
              { hasFocus: I, readOnlyState: B } = this.state,
              K = this.getEditorState(),
              L = B || x,
              N = E.filter((t) => !!t.decorator).map((t) => ({
                strategy: at.getEntityTypeStrategy(t.type),
                component: (0, P.default)(t.decorator, {
                  onEdit: this.onEditEntity,
                  onRemove: this.onRemoveEntity,
                  textDirectionality: l,
                }),
              })),
              F = R,
              U = M,
              j = A,
              z = at.getSelectedBlock(K),
              H = {
                currentStyles: K.getCurrentInlineStyle(),
                currentBlock: z.getType(),
                currentBlockKey: z.getKey(),
                enableHorizontalRule: e,
                enableLineBreak: n,
                showUndoControl: r,
                showRedoControl: i,
                blockTypes: S,
                inlineStyles: _,
                entityTypes: E,
                controls: C,
                commands: D,
                readOnly: L,
                toggleBlockType: this.toggleBlockType,
                toggleInlineStyle: this.toggleInlineStyle,
                addHR: this.addHR,
                addBR: this.addBR,
                onUndoRedo: this.onUndoRedo,
                onRequestSource: this.onRequestSource,
                onCompleteSource: this.onCompleteSource,
                getEditorState: this.getEditorState,
                focus: this.focus,
                onChange: this.onChange,
              };
            return (0, o.jsxs)("div", {
              className: `Draftail-Editor${
                L ? " Draftail-Editor--readonly" : ""
              }${I ? " Draftail-Editor--focus" : ""}`,
              dir: "RTL" === l ? "rtl" : void 0,
              "data-draftail-editor": !0,
              children: [
                F ? (0, o.jsx)(F, { ...H }) : null,
                (0, o.jsx)(k.Ay, {
                  customStyleMap: yt.getCustomStyleMap(_),
                  ref: (t) => {
                    this.editorRef = t;
                  },
                  editorState: K,
                  onChange: this.onChange,
                  readOnly: L,
                  stripPastedStyles: a,
                  spellCheck: c,
                  textAlignment: u,
                  textDirectionality: l,
                  autoCapitalize: f,
                  autoComplete: p,
                  autoCorrect: d,
                  ariaDescribedBy: h,
                  ariaExpanded: g,
                  ariaLabel: y,
                  ariaLabelledBy: m,
                  ariaMultiline: s,
                  ariaOwneeID: v,
                  ariaRequired: b,
                  handleReturn: this.handleReturn,
                  defaultKeyBindings: !1,
                  handleKeyCommand: this.handleKeyCommand,
                  handleBeforeInput: this.handleBeforeInput,
                  handlePastedText: this.handlePastedText,
                  onFocus: this.onFocus,
                  onBlur: this.onBlur,
                  onTab: this.onTab,
                  onUpArrow: this.onUpArrow,
                  onDownArrow: this.onDownArrow,
                  blockRendererFn: this.blockRenderer,
                  blockRenderMap: yt.getBlockRenderMap(S),
                  blockStyleFn: yt.blockStyleFn,
                  plugins: O.concat([
                    { keyBindingFn: yt.getKeyBindingFn(S, _, E) },
                  ]),
                  decorators: w.concat(N),
                }),
                U ? (0, o.jsx)(U, { ...H }) : null,
                D && j ? (0, o.jsx)(j, { ...H }) : null,
                this.renderSource(),
                (0, o.jsx)("div", {
                  "data-draftail-tooltip-parent": !0,
                  ref: this.tooltipParentRef,
                }),
                (0, o.jsx)(Bt, {
                  blockKey: z.getKey(),
                  blockTypes: S,
                  placeholder: t,
                }),
                (0, o.jsx)(wt, { max: T }),
              ],
            });
          }
        }
        Lt.defaultProps = Kt;
        const Nt = (t) => {
            const e = (0, s.getVisibleSelectionRect)(window);
            return e
              ? {
                  top: e.top - t.top,
                  left: `calc(${
                    e.left - t.left
                  }px + var(--draftail-offset-inline-start, 0))`,
                }
              : null;
          },
          Pt = ({
            controls: t,
            getEditorState: e,
            onChange: n,
            tooltipZIndex: r = 100,
            tooltipPlacement: i = "top",
            className: a,
            ...s
          }) => {
            const c = e().getSelection();
            return (0, o.jsx)(Rt, {
              shouldOpen: c.getHasFocus() && !c.isCollapsed(),
              getTargetPosition: Nt,
              placement: i,
              zIndex: r,
              content: (0, o.jsxs)("div", {
                className: `Draftail-FloatingToolbar ${a || ""}`,
                role: "toolbar",
                children: [
                  (0, o.jsx)(_t, { ...s }),
                  (0, o.jsx)(bt, {
                    name: "controls",
                    children: t.map((t, r) => {
                      const i = t.inline;
                      return i
                        ? (0, o.jsx)(i, { getEditorState: e, onChange: n }, r)
                        : null;
                    }),
                  }),
                ],
              }),
            });
          },
          Ft = a().createContext({
            pinButton: {},
            toolbar: "sticky",
            setToolbar: () => {},
          }),
          Ut = () => {
            const {
                pinButton: t,
                toolbar: e,
                setToolbar: n,
              } = (0, i.useContext)(Ft),
              r =
                "floating" === e
                  ? t.floatingLabel || "↗"
                  : t.stickyLabel || "↙",
              a =
                "floating" === e ? t.floatingDescription : t.stickyDescription,
              s = "floating" === e ? t.floatingIcon : t.stickyIcon;
            return (0, o.jsx)(vt, {
              name: t.type || "PIN_TOOLBAR",
              className: "Draftail-ToolbarButton--pin",
              tooltipDirection: "down",
              title: a || t.description,
              icon: s || t.icon,
              label: s || t.icon ? null : r,
              onClick: n.bind(null, "floating" === e ? "sticky" : "floating"),
              active: !1,
            });
          },
          jt = [{ inline: () => (0, o.jsx)(Ut, {}) }],
          zt = ({
            pinButton: t = {},
            defaultToolbar: e = "floating",
            onSetToolbar: n,
            controls: r,
            ...a
          }) => {
            const [s, c] = (0, i.useState)(e),
              u = (0, i.useCallback)((t) => {
                t.detail && c(t.detail.toolbar);
              }, []),
              l = (0, i.useMemo)(
                () => ({
                  pinButton: t,
                  toolbar: s,
                  setToolbar: (t) => {
                    const e = () => {
                      c(t);
                      const e = new CustomEvent("draftail:toolbar", {
                        detail: { toolbar: t },
                      });
                      document.dispatchEvent(e);
                    };
                    n ? n(t, e) : e();
                  },
                }),
                [t, s, c, n],
              ),
              f = "floating" === s ? Pt : Et;
            return (
              (0, i.useEffect)(
                () => (
                  document.addEventListener("draftail:toolbar", u),
                  () => {
                    document.removeEventListener("draftail:toolbar", u);
                  }
                ),
                [u],
              ),
              (0, o.jsx)(Ft.Provider, {
                value: l,
                children: (0, o.jsx)(f, {
                  controls: r.concat(jt),
                  className: "Draftail-Toolbar--pin",
                  ...a,
                }),
              })
            );
          },
          Ht = (0, o.jsx)("span", { "aria-hidden": "true", children: "+" }),
          qt = ({
            commands: t,
            getEditorState: e,
            blockTypes: n,
            currentBlock: r,
            currentBlockKey: a,
            onRequestSource: c,
            onCompleteSource: u,
            entityTypes: l,
            addHR: f,
            enableHorizontalRule: p,
            triggerLabel: d = "Insert block",
            triggerIcon: h = Ht,
            comboLabel: g = "Choose an item",
            comboPlaceholder: y = "Search blocks",
            comboPlacement: m = "right-start",
            noResultsText: v = "No results found",
            tooltipZIndex: b = 100,
            showBackdrop: S = !1,
            ComboBoxComponent: _ = Tt,
          }) => {
            const E = (0, i.useRef)(null),
              [w, C] = (0, i.useState)("50%"),
              [k, x] = (0, i.useState)(!1),
              T = e(),
              O = T.getSelection().getAnchorKey(),
              D = at.getSelectedBlock(T).getType(),
              R = (0, i.useCallback)(() => {
                E.current &&
                  requestAnimationFrame(() => {
                    C(
                      ((t, e) => {
                        if (!t) return "50%";
                        const n = t.closest("[data-draftail-editor]"),
                          r = n.querySelector(
                            `[data-block="true"][data-offset-key="${e}-0-0"]`,
                          );
                        if (r) {
                          const t =
                            r.getBoundingClientRect().top +
                            r.getBoundingClientRect().height / 2 -
                            n.getBoundingClientRect().top;
                          return 0 === t ? "50%" : t;
                        }
                        return "50%";
                      })(E.current, O),
                    );
                  });
              }, [O, D]);
            (0, i.useEffect)(
              () => (
                R(),
                document.addEventListener("draftail:toolbar", R),
                () => {
                  document.removeEventListener("draftail:toolbar", R);
                }
              ),
              [R],
            );
            const M = yt.getCommandPalette({
              commands: t || !0,
              blockTypes: n,
              entityTypes: l,
              enableHorizontalRule: p,
            });
            return (0, o.jsx)("div", {
              className: "Draftail-BlockToolbar",
              ref: E,
              children: (0, o.jsx)(Rt, {
                shouldOpen: k,
                onClickOutside: () => x(!1),
                placement: m,
                zIndex: b,
                showBackdrop: S,
                onMount: (t) => {
                  const e = t.popper.querySelector('[role="combobox"]');
                  e && e.focus();
                },
                content: k
                  ? (0, o.jsx)(
                      _,
                      {
                        label: g,
                        placeholder: y,
                        items: M,
                        getItemLabel: st,
                        getItemDescription: ct,
                        getSearchFields: ut,
                        noResultsText: v,
                        onSelect: (t) => {
                          const n = t.selectedItem;
                          if (!n) return;
                          const r = n.type;
                          x(!1),
                            n.onSelect
                              ? u(n.onSelect({ editorState: e() }))
                              : "blockTypes" === n.category
                              ? u(s.RichUtils.toggleBlockType(e(), r))
                              : r === q.HORIZONTAL_RULE
                              ? f()
                              : "entityTypes" === n.category && c(r);
                        },
                      },
                      `${a}-${r}`,
                    )
                  : null,
                children: (0, o.jsx)("button", {
                  type: "button",
                  "aria-expanded": k ? "true" : "false",
                  className: "Draftail-BlockToolbar__trigger",
                  style: { top: w },
                  "aria-label": d,
                  onClick: () => x(!k),
                  children: h,
                }),
              }),
            });
          },
          Wt = ({
            showBlockEntities: t,
            entityTypes: e,
            controls: n,
            getEditorState: r,
            onChange: i,
            onRequestSource: a,
          }) =>
            (0, o.jsxs)("div", {
              className: "Draftail-MetaToolbar",
              children: [
                t
                  ? (0, o.jsx)(
                      bt,
                      {
                        name: "entities",
                        children: e
                          .filter((t) => lt(t) && t.block)
                          .map((t) =>
                            (0, o.jsx)(
                              vt,
                              {
                                name: t.type,
                                onClick: a,
                                label: st(t.type, t),
                                title: St(t.type, t),
                                icon: t.icon,
                              },
                              t.type,
                            ),
                          ),
                      },
                      "entities",
                    )
                  : null,
                (0, o.jsx)(bt, {
                  name: "controls",
                  children: n.map((t, e) => {
                    if (t.inline || t.block) return null;
                    const n = t.meta || t;
                    return (0, o.jsx)(n, { getEditorState: r, onChange: i }, e);
                  }),
                }),
              ],
            });
        var $t = n(6931),
          Vt = n.n($t),
          Gt = n(9904),
          Zt = (n(4146), n(4363), n(8661)),
          Jt = n(4595),
          Yt = n(1458);
        n(7684), n(6778), n(8168), n(6338);
        var Xt = n(3769),
          Qt = function (t, e) {
            return t === e;
          };
        function te(t) {
          void 0 === t && (t = Yt.t);
          var e =
            t === Yt.t
              ? Xt.n
              : function () {
                  return (0, i.useContext)(t);
                };
          return function (t, n) {
            void 0 === n && (n = Qt);
            var r = e(),
              o = (function (t, e, n, r) {
                var o,
                  a = (0, i.useReducer)(function (t) {
                    return t + 1;
                  }, 0)[1],
                  s = (0, i.useMemo)(
                    function () {
                      return (0, Zt.K)(n, r);
                    },
                    [n, r],
                  ),
                  c = (0, i.useRef)(),
                  u = (0, i.useRef)(),
                  l = (0, i.useRef)(),
                  f = (0, i.useRef)(),
                  p = n.getState();
                try {
                  if (t !== u.current || p !== l.current || c.current) {
                    var d = t(p);
                    o = void 0 !== f.current && e(d, f.current) ? f.current : d;
                  } else o = f.current;
                } catch (t) {
                  throw (
                    (c.current &&
                      (t.message +=
                        "\nThe error may be correlated with this previous error:\n" +
                        c.current.stack +
                        "\n\n"),
                    t)
                  );
                }
                return (
                  (0, Jt.E)(function () {
                    (u.current = t),
                      (l.current = p),
                      (f.current = o),
                      (c.current = void 0);
                  }),
                  (0, Jt.E)(
                    function () {
                      function t() {
                        try {
                          var t = n.getState();
                          if (t === l.current) return;
                          var r = u.current(t);
                          if (e(r, f.current)) return;
                          (f.current = r), (l.current = t);
                        } catch (t) {
                          c.current = t;
                        }
                        a();
                      }
                      return (
                        (s.onStateChange = t),
                        s.trySubscribe(),
                        t(),
                        function () {
                          return s.tryUnsubscribe();
                        }
                      );
                    },
                    [n, s],
                  ),
                  o
                );
              })(t, n, r.store, r.subscription);
            return (0, i.useDebugValue)(o), o;
          };
        }
        var ee = te(),
          ne = (n(387), n(9124)),
          re = n(2724);
        (0, n(8298).d)(re.r);
        var oe = n(2833),
          ie = n(1238),
          ae = n(5556),
          se = n.n(ae);
        const ce = n.g.jQuery,
          ue = {};
        (ue[q.LINK] = "MUTABLE"),
          (ue.DOCUMENT = "MUTABLE"),
          (ue[q.IMAGE] = "IMMUTABLE"),
          (ue.EMBED = "IMMUTABLE");
        class le extends i.Component {
          constructor(t) {
            super(t),
              (this.onChosen = this.onChosen.bind(this)),
              (this.onClose = this.onClose.bind(this));
          }
          getChooserConfig(t, e) {
            throw new TypeError(
              "Subclasses of ModalWorkflowSource must implement getChooserConfig",
            );
          }
          filterEntityData(t) {
            throw new TypeError(
              "Subclasses of ModalWorkflowSource must implement filterEntityData",
            );
          }
          componentDidMount() {
            const { onClose: t, entity: e, editorState: r } = this.props,
              o = ((t) => {
                const e = t.getSelection();
                let n = e.getAnchorOffset(),
                  r = e.getFocusOffset();
                const o = ((t) => {
                  const e = t.getSelection(),
                    n = t.getCurrentContent(),
                    r = e.getStartKey(),
                    o = e.getEndKey(),
                    i = n.getBlockMap();
                  return i
                    .toSeq()
                    .skipUntil((t, e) => e === r)
                    .takeUntil((t, e) => e === o)
                    .concat([[o, i.get(o)]])
                    .toList();
                })(t);
                if (e.getIsBackward()) {
                  const t = n;
                  (n = r), (r = t);
                }
                let i = "";
                for (let t = 0; t < o.size; t += 1) {
                  const e = 0 === t ? n : 0,
                    a = t === o.size - 1 ? r : o.get(t).getText().length;
                  i += o.get(t).getText().slice(e, a);
                }
                return i;
              })(r),
              {
                url: i,
                urlParams: a,
                onload: s,
                responses: c,
              } = this.getChooserConfig(e, o);
            ce(document.body).on("hidden.bs.modal", this.onClose),
              (this.workflow = n.g.ModalWorkflow({
                url: i,
                urlParams: a,
                onload: s,
                responses: c,
                onError: () => {
                  window.alert((0, oe.AP)("Server Error")), t();
                },
              }));
          }
          componentWillUnmount() {
            (this.workflow = null),
              ce(document.body).off("hidden.bs.modal", this.onClose);
          }
          onChosen(t) {
            const {
                editorState: e,
                entity: n,
                entityKey: r,
                entityType: o,
                onComplete: i,
              } = this.props,
              a = e.getCurrentContent(),
              c = e.getSelection(),
              u = this.filterEntityData(t),
              l = ue[o.type];
            let f;
            if (o.block)
              if (n && r) {
                const t = c.getAnchorKey(),
                  n = a.getBlockForKey(t);
                f = at.updateBlockEntity(e, n, u);
              } else {
                const t = a
                  .createEntity(o.type, l, u)
                  .getLastCreatedEntityKey();
                f = s.AtomicBlockUtils.insertAtomicBlock(e, t, " ");
              }
            else {
              const n = a.createEntity(o.type, l, u).getLastCreatedEntityKey();
              if (t.prefer_this_title_as_link_text || c.isCollapsed()) {
                const r = t.title || t.url,
                  o = s.Modifier.replaceText(a, c, r, null, n);
                f = s.EditorState.push(e, o, "insert-characters");
              } else f = s.RichUtils.toggleLink(e, c, n);
            }
            this.workflow.close(), i(f);
          }
          onClose(t) {
            const { onClose: e } = this.props;
            t.preventDefault(), e();
          }
          render() {
            return null;
          }
        }
        (le.propTypes = {
          editorState: se().object.isRequired,
          entityType: se().object.isRequired,
          entity: se().object,
          entityKey: se().string,
          onComplete: se().func.isRequired,
          onClose: se().func.isRequired,
        }),
          (le.defaultProps = { entity: null });
        const fe = "left",
          pe = (t, e) => {
            const n = window.pageYOffset + t.top,
              r = window.pageXOffset + t.left;
            switch (e) {
              case "top":
                return { top: n + t.height, insetInlineStart: r + t.width / 2 };
              case fe:
                return { top: n + t.height / 2, insetInlineStart: r + t.width };
              default:
                return { top: n + t.height, insetInlineStart: r };
            }
          },
          de = ({ target: t, children: e, direction: n }) =>
            a().createElement(
              "div",
              {
                style: pe(t, n),
                className: `Tooltip Tooltip--${n}`,
                role: "tooltip",
              },
              e,
            );
        de.propTypes = {
          target: se().shape({
            top: se().number.isRequired,
            left: se().number.isRequired,
            width: se().number.isRequired,
            height: se().number.isRequired,
          }).isRequired,
          direction: se().oneOf(["top", fe, "top-left"]).isRequired,
          children: se().node.isRequired,
        };
        const he = de;
        var ge = n(5996);
        const ye = (t) => {
          let e = t;
          return e.length > 25 && (e = `${e.slice(0, 20)}…`), e;
        };
        class me extends i.Component {
          constructor(t) {
            super(t),
              (this.state = { showTooltipAt: null }),
              (this.onEdit = this.onEdit.bind(this)),
              (this.onRemove = this.onRemove.bind(this)),
              (this.openTooltip = this.openTooltip.bind(this)),
              (this.closeTooltip = this.closeTooltip.bind(this));
          }
          onEdit(t) {
            const { onEdit: e, entityKey: n } = this.props;
            t.preventDefault(), t.stopPropagation(), e(n);
          }
          onRemove(t) {
            const { onRemove: e, entityKey: n } = this.props;
            t.preventDefault(), t.stopPropagation(), e(n);
          }
          openTooltip(t) {
            const e = t.target.closest("[data-draftail-trigger]");
            if (!e) return;
            const n = e.closest("[data-draftail-editor-wrapper]"),
              r = n.getBoundingClientRect(),
              o = e.getBoundingClientRect();
            this.setState({
              showTooltipAt: {
                container: n,
                top:
                  o.top -
                  r.top -
                  (document.documentElement.scrollTop ||
                    document.body.scrollTop),
                left:
                  o.left -
                  r.left -
                  (document.documentElement.scrollLeft ||
                    document.body.scrollLeft),
                width: o.width,
                height: o.height,
              },
            });
          }
          closeTooltip() {
            this.setState({ showTooltipAt: null });
          }
          render() {
            const { children: t, icon: e, label: n, url: r } = this.props,
              { showTooltipAt: o } = this.state;
            return a().createElement(
              "a",
              {
                href: r,
                role: "button",
                onMouseUp: this.openTooltip,
                className: "TooltipEntity",
                "data-draftail-trigger": !0,
              },
              a().createElement(mt, {
                icon: e,
                className: "TooltipEntity__icon",
              }),
              t,
              o &&
                a().createElement(
                  ge.A,
                  {
                    node: o.container,
                    onClose: this.closeTooltip,
                    closeOnClick: !0,
                    closeOnType: !0,
                    closeOnResize: !0,
                  },
                  a().createElement(
                    he,
                    { target: o, direction: "top" },
                    n
                      ? a().createElement(
                          "a",
                          {
                            href: r,
                            title: r,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "Tooltip__link",
                          },
                          ye(n),
                        )
                      : null,
                    a().createElement(
                      "button",
                      {
                        className: "button button-small Tooltip__button",
                        onClick: this.onEdit,
                      },
                      "Edit",
                    ),
                    a().createElement(
                      "button",
                      {
                        className:
                          "button button-small button-secondary no Tooltip__button",
                        onClick: this.onRemove,
                      },
                      "Remove",
                    ),
                  ),
                ),
            );
          }
        }
        (me.propTypes = {
          entityKey: se().string.isRequired,
          children: se().node.isRequired,
          onEdit: se().func.isRequired,
          onRemove: se().func.isRequired,
          icon: se().oneOfType([se().string.isRequired, se().object.isRequired])
            .isRequired,
          label: se().string.isRequired,
          url: se().string,
        }),
          (me.defaultProps = { url: null });
        const ve = me,
          be = ({ getEditorState: t, maxLength: e, id: n }) => {
            const r = t()
              .getCurrentContent()
              .getBlockMap()
              .reduce((t, e) => {
                const n = e;
                return `${t}${n.getType() === H.ATOMIC ? "" : n.getText()}`;
              }, "")
              .replace(/\n/g, "");
            return a().createElement(
              "div",
              { className: "w-inline-block w-tabular-nums w-help-text", id: n },
              a().createElement(
                "span",
                { className: "w-sr-only" },
                (0, oe.AP)("Character count:"),
              ),
              a().createElement(
                "span",
                null,
                `${((t) => {
                  if (t) {
                    const e = t.match(/./gsu);
                    return e ? e.length : 0;
                  }
                  return 0;
                })(r)}/${e}`,
              ),
            );
          };
        class Se extends i.PureComponent {
          constructor(t) {
            super(t);
            const { field: e } = t;
            (this.state = {
              error: null,
              info: null,
              reloads: 0,
              showContent: !1,
              showError: !1,
              initialContent: e.value,
            }),
              (this.renderError = this.renderError.bind(this)),
              (this.toggleContent = this.toggleContent.bind(this)),
              (this.toggleError = this.toggleError.bind(this)),
              (this.onReloadEditor = this.onReloadEditor.bind(this));
          }
          componentDidCatch(t, e) {
            const { field: n } = this.props,
              { initialContent: r } = this.state;
            this.setState({ error: t, info: e }), (n.value = r);
          }
          onReloadEditor() {
            const { reloads: t } = this.state;
            this.setState({
              error: null,
              info: null,
              reloads: t + 1,
              showContent: !1,
              showError: !1,
            });
          }
          toggleContent() {
            const { showContent: t } = this.state;
            this.setState({ showContent: !t });
          }
          toggleError() {
            const { showError: t } = this.state;
            this.setState({ showError: !t });
          }
          renderError() {
            const { field: t } = this.props,
              {
                error: e,
                info: n,
                reloads: r,
                showContent: o,
                showError: i,
              } = this.state,
              c =
                t.rawContentState &&
                (0, s.convertFromRaw)(t.rawContentState).getPlainText();
            return a().createElement(
              "div",
              { className: "Draftail-Editor" },
              a().createElement(
                "div",
                { className: "Draftail-Toolbar" },
                c &&
                  a().createElement(
                    "button",
                    {
                      type: "button",
                      className: "Draftail-ToolbarButton",
                      onClick: this.toggleContent,
                    },
                    (0, oe.AP)("Show latest content"),
                  ),
                a().createElement(
                  "button",
                  {
                    type: "button",
                    className: "Draftail-ToolbarButton",
                    onClick: this.toggleError,
                  },
                  (0, oe.AP)("Show error"),
                ),
                r < 3
                  ? a().createElement(
                      "button",
                      {
                        type: "button",
                        className: "Draftail-ToolbarButton",
                        onClick: this.onReloadEditor,
                      },
                      (0, oe.AP)("Reload saved content"),
                    )
                  : a().createElement(
                      "button",
                      {
                        type: "button",
                        className: "Draftail-ToolbarButton",
                        onClick: () => window.location.reload(!1),
                      },
                      (0, oe.AP)("Reload the page"),
                    ),
              ),
              a().createElement(
                "div",
                { className: "DraftEditor-root" },
                a().createElement(
                  "div",
                  { className: "public-DraftEditor-content" },
                  a().createElement(
                    "div",
                    { className: "public-DraftEditorPlaceholder-inner" },
                    (0, oe.AP)(
                      "The editor just crashed. Content has been reset to the last saved version.",
                    ),
                    o &&
                      a().createElement("textarea", {
                        className: "EditorFallback__textarea",
                        value: c,
                        readOnly: !0,
                      }),
                    i &&
                      a().createElement(
                        "pre",
                        { className: "help-block help-critical" },
                        a().createElement(
                          "code",
                          { className: "EditorFallback__error" },
                          `${e.name}: ${e.message}\n\n${e.stack}\n${n.componentStack}`,
                        ),
                      ),
                  ),
                ),
              ),
            );
          }
          render() {
            const { children: t } = this.props,
              { error: e } = this.state;
            return e ? this.renderError() : t;
          }
        }
        Se.propTypes = {
          children: se().node.isRequired,
          field: se().object.isRequired,
        };
        const _e = Se;
        var Ee = n(1596);
        n(5203);
        const { isOptionKeyCommand: we } = s.KeyBindingUtil,
          Ce = "COMMENT-",
          ke = !0 === we({ altKey: !0 });
        function xe(t) {
          const e = (0, i.useRef)(t);
          return (
            (0, i.useEffect)(() => {
              e.current = t;
            }, [t]),
            e.current
          );
        }
        class Te {
          field;
          decoratorRefs;
          focusedBlockKey;
          cachedMedianRef;
          constructor(t) {
            (this.field = t),
              (this.decoratorRefs = new Map()),
              (this.focusedBlockKey = ""),
              (this.cachedMedianRef = null);
          }
          addDecoratorRef(t, e) {
            this.decoratorRefs.set(t, e), (this.cachedMedianRef = null);
          }
          removeDecoratorRef(t) {
            this.decoratorRefs.delete(t), (this.cachedMedianRef = null);
          }
          setFocusedBlockKey(t) {
            this.focusedBlockKey = t;
          }
          static getHeightForRef(t) {
            return t.current ? t.current.getBoundingClientRect().top : 0;
          }
          static getMedianRef(t) {
            const e = t.sort(
                (t, e) => this.getHeightForRef(t) - this.getHeightForRef(e),
              ),
              n = e.length;
            return n > 0 ? e[Math.ceil(n / 2 - 1)] : null;
          }
          getTab() {
            return this.field.closest('[role="tabpanel"]')?.getAttribute("id");
          }
          getAnchorNode(t = !1) {
            let e = null;
            return (
              t
                ? (e = Te.getMedianRef(
                    Array.from(this.decoratorRefs.keys()).filter(
                      (t) => this.decoratorRefs.get(t) === this.focusedBlockKey,
                    ),
                  ))
                : this.cachedMedianRef
                ? (e = this.cachedMedianRef)
                : ((e = Te.getMedianRef(Array.from(this.decoratorRefs.keys()))),
                  (this.cachedMedianRef = e)),
              e?.current || this.field
            );
          }
        }
        function Oe(t) {
          const e = t.getLastBlock();
          return new s.SelectionState({
            anchorKey: t.getFirstBlock().getKey(),
            anchorOffset: 0,
            focusKey: e.getKey(),
            focusOffset: e.getLength(),
          });
        }
        function De(t, e, n, r) {
          let o = t;
          const i = new Te(e),
            a = n.makeComment(i, r, "[]"),
            c = t.getSelection();
          return (
            (o = s.EditorState.acceptSelection(
              t,
              c.isCollapsed() ? Oe(t.getCurrentContent()) : c,
            )),
            s.EditorState.acceptSelection(
              s.RichUtils.toggleInlineStyle(o, `${Ce}${a}`),
              c,
            )
          );
        }
        function Re(t) {
          return void 0 !== t && t.startsWith(Ce);
        }
        function Me(t) {
          return parseInt(t.slice(Ce.length), 10);
        }
        function Ae(t) {
          const e = new Map();
          return (
            t
              .getCurrentContent()
              .getBlocksAsArray()
              .forEach((t) => {
                const n = t.getKey();
                t.findStyleRanges(
                  (t) => t.getStyle().some(Re),
                  (r, o) => {
                    t.getInlineStyleAt(r)
                      .filter(Re)
                      .forEach((t) => {
                        const i = Me(t);
                        let a = e.get(i);
                        a || (a = []),
                          a.push({ key: n, start: r, end: o }),
                          e.set(i, a);
                      });
                  },
                );
              }),
            e
          );
        }
        function Ie(t) {
          return t.length > 0
            ? s.ContentState.createFromBlockArray(t)
            : s.ContentState.createFromText(" ");
        }
        function Be(t, e, n) {
          const r = n || ((t) => t.getStyle().some(Re)),
            o = [];
          t.findEntityRanges(
            (t) => null !== t.getEntity(),
            (t, e) => o.push([t, e]),
          ),
            t.findStyleRanges(r, (t, n) => {
              const r = o.filter((e) => e[1] > t).filter((t) => t[0] < n);
              let i = t;
              r.forEach((t) => {
                const [n, r] = t;
                n > i && e(i, n), (i = r);
              }),
                i < n && e(t, n);
            });
        }
        function Ke(t, e) {
          const n = t.getInlineStyleAt(e).filter(Re);
          let r;
          const o = n.count();
          if (0 === o) return null;
          if (o > 1) {
            let e = n.map((e) => {
              let n = 0;
              return (
                Be(
                  t,
                  () => {
                    n += 1;
                  },
                  (t) => t.getStyle().some((t) => t === e),
                ),
                [e, n]
              );
            });
            (e = e.sort((t, e) => t[1] - e[1])), (r = e.first()[0]);
          } else r = n.first();
          return Me(r);
        }
        function Le(t, e) {
          const n = e || t.getCurrentContent(),
            r = s.EditorState.set(
              s.EditorState.createWithContent(n, t.getDecorator()),
              {
                selection: t.getSelection(),
                undoStack: t.getUndoStack(),
                redoStack: t.getRedoStack(),
                inlineStyleOverride: t.getInlineStyleOverride(),
              },
            );
          return s.EditorState.acceptSelection(r, r.getSelection());
        }
        function Ne(t, e, n) {
          const r = t,
            o = r.getSelection(),
            i = r.getCurrentContent().getLastBlock();
          r.getDirectionMap().get(i.getKey()) === n &&
            o.isCollapsed() &&
            o.getAnchorKey() === i.getKey() &&
            o.getAnchorOffset() === i.getLength() &&
            e(
              s.EditorState.setInlineStyleOverride(
                r,
                r.getCurrentInlineStyle().filter((t) => !Re(t)),
              ),
            );
        }
        const Pe = function ({
            commentApp: t,
            fieldNode: e,
            contentPath: n,
            rawContentState: r,
            onSave: o,
            inlineStyles: c,
            editorRef: u,
            isCommentShortcut: l,
            plugins: f = [],
            controls: p = [],
            ...d
          }) {
            const [h, g] = (0, i.useState)(() => L(r)),
              y = (0, i.useMemo)(
                () =>
                  (function (t, e, n) {
                    return ({ getEditorState: r, onChange: o }) =>
                      a().createElement(
                        "span",
                        {
                          className: "Draftail-CommentControl",
                          "data-comment-add": !0,
                        },
                        a().createElement(vt, {
                          name: "comment",
                          active: !1,
                          title: `${(0, oe.AP)("Add a comment")}\n${
                            ke ? "⌘ + Alt + M" : "Ctrl + Alt + M"
                          }`,
                          icon: a().createElement(
                            a().Fragment,
                            null,
                            a().createElement(ie.A, { name: "comment-add" }),
                            a().createElement(ie.A, {
                              name: "comment-add-reversed",
                            }),
                          ),
                          onClick: () => {
                            t.activate(), o(De(r(), n, t, e));
                          },
                        }),
                      );
                  })(t, n, e),
                [t, n, e],
              ),
              m = (0, i.useMemo)(
                () => t.utils.selectCommentsForContentPathFactory(n),
                [n, t],
              ),
              v = (0, i.useMemo)(
                () =>
                  (function (t) {
                    return ({ contentState: e, children: n }) => {
                      if (!n) return null;
                      const r = n[0].props.block.getKey(),
                        o = n[0].props.start,
                        s = (0, i.useMemo)(
                          () => Ke(e.getBlockForKey(r), o),
                          [r, o],
                        ),
                        c = (0, i.useRef)(null);
                      return (
                        (0, i.useEffect)(() => {
                          if (!s) return;
                          const e = t.layout.commentAnnotations.get(s);
                          return e && e instanceof Te
                            ? (e.addDecoratorRef(c, r),
                              () => e.removeDecoratorRef(c))
                            : void 0;
                        }, [s, c, r]),
                        a().createElement(
                          "span",
                          {
                            role: "button",
                            ref: c,
                            onClick: () => {
                              if (!s) return;
                              const e = t.layout.commentAnnotations.get(s);
                              e &&
                                e instanceof Te &&
                                c &&
                                e.setFocusedBlockKey(r),
                                t.store.dispatch(
                                  t.actions.setFocusedComment(s, {
                                    updatePinnedComment: !0,
                                    forceFocus: !1,
                                  }),
                                );
                            },
                            "aria-label": (0, oe.AP)("Focus comment"),
                            "data-annotation": !0,
                          },
                          n,
                        )
                      );
                    };
                  })(t),
                [t],
              ),
              S = ee(m, ne.A),
              _ = ee(t.selectors.selectFocused),
              E = (0, i.useMemo)(() => S.map((t) => t.localId), [S]),
              w = (0, i.useMemo)(
                () => E.map((t) => ({ type: `${Ce}${t}` })),
                [E],
              ),
              [C, k] = (0, i.useState)(0),
              x = xe(_),
              T = xe(E);
            (0, i.useEffect)(() => {
              if (
                (x === _ ||
                  !((x && T && T.includes(x)) || (_ && E.includes(_)))) &&
                (T === E ||
                  (T.length === E.length && T.every((t, e) => t === E[e])))
              )
                return;
              const t = b(
                c.map((t) => t.type).concat(E.map((t) => `${Ce}${t}`)),
                h.getCurrentContent(),
              );
              g((e) =>
                Le(
                  e,
                  s.Modifier.applyInlineStyle(t, Oe(t), `STYLE_RERENDER_${C}`),
                ),
              ),
                k((t) => (t + 1) % 200);
            }, [_, c, E, h]),
              (0, i.useEffect)(() => {
                const n = h.getCurrentContent(),
                  r = (function (t, e, n, r) {
                    let o = t;
                    return (
                      e
                        .filter((t) => !t.annotation)
                        .forEach((t) => {
                          n.updateAnnotation(r(), t.localId);
                          const e = `${Ce}${t.localId}`;
                          try {
                            JSON.parse(t.position).forEach((t) => {
                              o = (function ({
                                contentState: t,
                                style: e,
                                blockKey: n,
                                start: r,
                                end: o,
                              }) {
                                return s.Modifier.applyInlineStyle(
                                  t,
                                  new s.SelectionState({
                                    anchorKey: n,
                                    anchorOffset: r,
                                    focusKey: n,
                                    focusOffset: o,
                                  }),
                                  e,
                                );
                              })({
                                contentState: o,
                                blockKey: t.key,
                                start: t.start,
                                end: t.end,
                                style: e,
                              });
                            });
                          } catch (e) {
                            console.error(
                              `Error loading comment position for comment ${t.localId}`,
                            ),
                              console.error(e);
                          }
                        }),
                      o
                    );
                  })(n, S, t, () => new Te(e));
                n !== r && g(Le(h, r));
              }, [S]);
            const O = (0, i.useRef)();
            return (
              (0, i.useEffect)(() => {
                window.clearTimeout(O.current);
                const e = s.EditorState.push(
                  h,
                  b(
                    c.map((t) => t.type),
                    h.getCurrentContent(),
                  ),
                  "change-inline-style",
                );
                return (
                  (O.current = window.setTimeout(() => {
                    o(N(e)),
                      (function ({
                        editorState: t,
                        comments: e,
                        commentApp: n,
                      }) {
                        const r = Ae(t);
                        e.filter((t) => t.annotation).forEach((t) => {
                          const e = r.get(t.localId),
                            o = e ? JSON.stringify(e) : "[]";
                          t.position !== o &&
                            n.store.dispatch(
                              n.actions.updateComment(t.localId, {
                                position: o,
                              }),
                            );
                        });
                      })({ editorState: h, comments: S, commentApp: t });
                  }, 250)),
                  () => {
                    window.clearTimeout(O.current);
                  }
                );
              }, [h, c]),
              a().createElement(Lt, {
                ref: u,
                onChange: (t) => {
                  let e = t;
                  if (["undo", "redo"].includes(t.getLastChangeType())) {
                    const n = b(
                      c.map((t) => t.type).concat(E.map((t) => `${Ce}${t}`)),
                      t.getCurrentContent(),
                    );
                    e = Le(t, n);
                  } else if ("split-block" === t.getLastChangeType()) {
                    const t = e.getCurrentContent(),
                      n = e.getSelection();
                    t
                      .getBlockForKey(n.getAnchorKey())
                      .getInlineStyleAt(n.getAnchorOffset())
                      .some((t) => Re(t)) ||
                      (e = s.EditorState.setInlineStyleOverride(
                        e,
                        e.getCurrentInlineStyle().filter((t) => !Re(t)),
                      ));
                  }
                  g(e);
                },
                editorState: h,
                controls: p.concat([{ inline: y }]),
                inlineStyles: c.concat(w),
                plugins: f.concat([
                  {
                    decorators: [
                      { strategy: (t, e) => Be(t, e), component: v },
                    ],
                    keyBindingFn: (t) => {
                      if (l(t)) return "comment";
                    },
                    onRightArrow: (t, { getEditorState: e }) => {
                      Ne(e(), g, "LTR");
                    },
                    onLeftArrow: (t, { getEditorState: e }) => {
                      Ne(e(), g, "RTL");
                    },
                    handleKeyCommand: (r, o) => {
                      if ("comment" === r) {
                        t.activate();
                        const r = o.getSelection(),
                          i = o.getCurrentContent();
                        if (r.isCollapsed()) {
                          const e = Ke(
                            i.getBlockForKey(r.getAnchorKey()),
                            r.getAnchorOffset(),
                          );
                          if (e)
                            return (
                              t.store.dispatch(
                                t.actions.setFocusedComment(e, {
                                  updatePinnedComment: !0,
                                  forceFocus: !0,
                                }),
                              ),
                              "handled"
                            );
                        }
                        return g(De(o, e, t, n)), "handled";
                      }
                      return "not-handled";
                    },
                    customStyleFn: (t) => {
                      const e = t.filter(Re);
                      if (e.count() > 0) {
                        const t = e.map((t) => Me(t));
                        return {
                          backgroundColor: "var(--w-color-text-highlight)",
                          outline:
                            _ && t.has(_)
                              ? "4px solid var(--w-color-text-highlight)"
                              : null,
                        };
                      }
                    },
                  },
                ]),
                ...d,
              })
            );
          },
          Fe = a().createElement(ie.A, { name: "link" }),
          Ue = a().createElement(ie.A, { name: "warning" }),
          je = a().createElement(ie.A, { name: "mail" }),
          ze = (t) => {
            const e = t.url || null;
            let n, r;
            return (
              e
                ? t.id
                  ? ((n = Fe), (r = e))
                  : e.startsWith("mailto:")
                  ? ((n = je), (r = e.replace("mailto:", "").split("?")[0]))
                  : e.startsWith("tel:")
                  ? ((n = Fe), (r = e.replace("tel:", "").split("?")[0]))
                  : e.startsWith("#")
                  ? ((n = Fe), (r = e))
                  : ((n = Fe),
                    (r = ((t) => t.replace(/(^\w+:|^)\/\//, "").split("/")[0])(
                      e,
                    )))
                : ((n = Ue), (r = (0, oe.AP)("Broken link"))),
              { url: e, icon: n, label: r }
            );
          },
          He =
            /(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*$|^"([\001-\010\013\014\016-\037!#-[\]-\177]|\\[\001-\011\013\014\016-\177])*"$)/i,
          qe =
            /((?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+)(?:[A-Z0-9]{2,63})$/i,
          We = ["http:", "https:", "ftp:", "ftps:"],
          $e = (t) => {
            const { entityKey: e, contentState: n } = t,
              r = n.getEntity(e).getData();
            return a().createElement(ve, { ...t, ...ze(r) });
          };
        $e.propTypes = {
          entityKey: se().string.isRequired,
          contentState: se().object.isRequired,
        };
        const Ve = $e,
          Ge = a().createElement(ie.A, { name: "doc-full" }),
          Ze = a().createElement(ie.A, { name: "warning" }),
          Je = (t) => {
            const { entityKey: e, contentState: n } = t,
              r = n.getEntity(e).getData(),
              o = r.url || null;
            let i, s;
            return (
              o
                ? ((i = Ge), (s = r.filename || ""))
                : ((i = Ze), (s = (0, oe.AP)("Missing document"))),
              a().createElement(ve, { ...t, icon: i, label: s, url: o })
            );
          };
        Je.propTypes = {
          entityKey: se().string.isRequired,
          contentState: se().object.isRequired,
        };
        const Ye = Je;
        class Xe extends i.Component {
          constructor(t) {
            super(t),
              (this.state = { showTooltipAt: null }),
              (this.onClick = this.onClick.bind(this)),
              (this.selectCurrentBlock = this.selectCurrentBlock.bind(this)),
              (this.openTooltip = this.openTooltip.bind(this)),
              (this.closeTooltip = this.closeTooltip.bind(this)),
              (this.renderTooltip = this.renderTooltip.bind(this));
          }
          onClick(t) {
            const e = t.target.closest("[data-draftail-trigger]");
            e && (this.selectCurrentBlock(), this.openTooltip(e));
          }
          selectCurrentBlock() {
            const { block: t, blockProps: e } = this.props,
              { editorState: n, onChange: r } = e,
              o = new s.SelectionState({
                anchorKey: t.getKey(),
                anchorOffset: 0,
                focusKey: t.getKey(),
                focusOffset: t.getLength(),
                hasFocus: !0,
              });
            r(s.EditorState.forceSelection(n, o));
          }
          openTooltip(t) {
            const e = t.closest("[data-draftail-editor-wrapper]"),
              n = e.getBoundingClientRect(),
              r = t.getBoundingClientRect(),
              o = t.parentNode.offsetWidth - r.width;
            this.setState({
              showTooltipAt: {
                container: e,
                top:
                  r.top -
                  n.top -
                  (document.documentElement.scrollTop ||
                    document.body.scrollTop),
                left:
                  r.left -
                  n.left -
                  (document.documentElement.scrollLeft ||
                    document.body.scrollLeft),
                width: r.width,
                height: r.height,
                direction: o >= 370 ? "left" : "top-left",
              },
            });
          }
          closeTooltip() {
            this.setState({ showTooltipAt: null });
          }
          renderTooltip() {
            const { children: t } = this.props,
              { showTooltipAt: e } = this.state;
            return a().createElement(
              ge.A,
              {
                node: e.container,
                onClose: this.closeTooltip,
                closeOnClick: !0,
                closeOnType: !0,
                closeOnResize: !0,
              },
              a().createElement(
                he,
                { target: e, direction: e.direction },
                a().createElement("div", { style: { maxWidth: 300 } }, t),
              ),
            );
          }
          render() {
            const {
                blockProps: t,
                src: e,
                alt: n,
                fallbackText: r,
              } = this.props,
              { showTooltipAt: o } = this.state,
              { entityType: i } = t;
            return a().createElement(
              "button",
              {
                type: "button",
                tabIndex: -1,
                className: "MediaBlock",
                onClick: this.onClick,
                "data-draftail-trigger": !0,
              },
              a().createElement(
                "span",
                { className: "MediaBlock__icon-wrapper", "aria-hidden": !0 },
                a().createElement(mt, {
                  icon: i.icon,
                  className: "MediaBlock__icon",
                }),
              ),
              a().createElement("img", {
                className: "MediaBlock__img",
                src: e,
                alt: n,
                width: "256",
                decoding: "async",
                loading: "lazy",
              }),
              e
                ? null
                : a().createElement(
                    "span",
                    { className: "MediaBlock__fallback" },
                    r,
                  ),
              o && this.renderTooltip(),
            );
          }
        }
        (Xe.propTypes = {
          blockProps: se().shape({
            entityType: se().object.isRequired,
            editorState: se().object.isRequired,
            onChange: se().func.isRequired,
          }).isRequired,
          block: se().object.isRequired,
          src: se().string,
          alt: se().string,
          fallbackText: se().string,
          children: se().node.isRequired,
        }),
          (Xe.defaultProps = { src: null, alt: "", fallbackText: null });
        const Qe = Xe,
          tn = (t) => {
            const { blockProps: e } = t,
              { entity: n, onEditEntity: r, onRemoveEntity: o } = e,
              { src: i, alt: s } = n.getData();
            let c = (0, oe.AP)("Decorative image");
            return (
              s && (c = `${(0, oe.AP)("Alt text")}: “${s}”`),
              a().createElement(
                Qe,
                { ...t, src: i, alt: "" },
                a().createElement("p", { className: "ImageBlock__alt" }, c),
                a().createElement(
                  "button",
                  {
                    className: "button Tooltip__button",
                    type: "button",
                    onClick: r,
                  },
                  (0, oe.AP)("Edit"),
                ),
                a().createElement(
                  "button",
                  {
                    className: "button button-secondary no Tooltip__button",
                    onClick: o,
                  },
                  (0, oe.AP)("Delete"),
                ),
              )
            );
          };
        tn.propTypes = {
          block: se().object.isRequired,
          blockProps: se().shape({
            editorState: se().object.isRequired,
            entity: se().object,
            onChange: se().func.isRequired,
          }).isRequired,
        };
        const en = tn,
          nn = (t) => {
            const {
                entity: e,
                onEditEntity: n,
                onRemoveEntity: r,
              } = t.blockProps,
              {
                url: o,
                title: i,
                thumbnail: s,
                providerName: c,
                authorName: u,
              } = e.getData(),
              l = [u, c]
                .filter((t) => !!t)
                .map(ye)
                .join("\n");
            return a().createElement(
              Qe,
              { ...t, src: s, alt: "", fallbackText: l },
              o
                ? a().createElement(
                    "a",
                    {
                      className: "Tooltip__link EmbedBlock__link",
                      href: o,
                      title: o,
                      target: "_blank",
                      rel: "noreferrer",
                    },
                    i,
                  )
                : null,
              a().createElement(
                "button",
                {
                  className: "button Tooltip__button",
                  type: "button",
                  onClick: n,
                },
                (0, oe.AP)("Edit"),
              ),
              a().createElement(
                "button",
                {
                  className: "button button-secondary no Tooltip__button",
                  onClick: r,
                },
                (0, oe.AP)("Delete"),
              ),
            );
          };
        nn.propTypes = {
          blockProps: se().shape({ entity: se().object }).isRequired,
        };
        const rn = nn,
          on = a().createElement(ie.A, { name: "minus" }),
          an = a().createElement(ie.A, { name: "plus" }),
          sn = {
            floatingIcon: a().createElement(ie.A, { name: "thumbtack" }),
            stickyIcon: a().createElement(ie.A, { name: "thumbtack-crossed" }),
            floatingDescription: (0, oe.AP)("Pin toolbar"),
            stickyDescription: (0, oe.AP)("Unpin toolbar"),
          },
          cn = () => {
            let t = "floating";
            try {
              t = localStorage.getItem("wagtail:draftail-toolbar") || t;
            } catch {}
            return t;
          },
          un = (t, e) => {
            const n = document.activeElement,
              r = n.getBoundingClientRect().top;
            e(t),
              requestAnimationFrame(() => {
                const t = n.getBoundingClientRect().top;
                document
                  .querySelector("#main")
                  .scrollBy({ top: t - r, behavior: "instant" });
              });
            try {
              localStorage.setItem("wagtail:draftail-toolbar", t);
            } catch {}
          },
          ln = { entityTypes: {}, plugins: {}, controls: {}, decorators: {} },
          fn = (t) =>
            t.icon && "string" == typeof t.icon
              ? Object.assign(t, {
                  icon: a().createElement(ie.A, { name: t.icon }),
                })
              : t,
          pn = {
            initEditor: (t, e, n) => {
              const r =
                  (n ? n.parentNode : document.body).querySelector(t) ||
                  document.body.querySelector(t),
                o = document.createElement("div");
              (o.className = "Draftail-Editor__wrapper"),
                o.setAttribute("data-draftail-editor-wrapper", !0),
                r.parentNode.appendChild(o);
              const i = (t) => {
                  (r.rawContentState = t), (r.value = JSON.stringify(t));
                },
                s = JSON.parse(r.value);
              r.rawContentState = s;
              const c = (t) => {
                r.draftailEditor = t;
              };
              let u,
                l = (t) => {
                  Object.assign(e, t);
                };
              return (
                Vt().render(
                  a().createElement(
                    _e,
                    { field: r },
                    a().createElement(
                      ({
                        initialOptions: t,
                        contentPath: e,
                        commentApp: n,
                      }) => {
                        [u, l] = a().useState({ ...t });
                        const o = ((t) => {
                          let e = null;
                          const n = !!t.enableHorizontalRule && {
                              description: (0, oe.AP)("Horizontal line"),
                              icon: on,
                            },
                            o = t.blockTypes || [],
                            c = t.inlineStyles || [];
                          let u = t.controls || [],
                            l = t.decorators || [],
                            f = t.plugins || [];
                          const p = t.commands || !0;
                          let d = t.entityTypes || [];
                          if (
                            ((d = d.map(fn).map((t) => ({
                              ...ln.entityTypes[t.type],
                              ...t,
                            }))),
                            (u = u.map((t) => ({
                              ...ln.controls[t.type],
                              ...t,
                            }))),
                            (l = l.map((t) => ({
                              ...ln.decorators[t.type],
                              ...t,
                            }))),
                            (f = f.map((t) => ({
                              ...ln.plugins[t.type],
                              ...t,
                            }))),
                            r.hasAttribute("maxlength"))
                          ) {
                            const t = `${r.id}-length`;
                            (e = t),
                              (u = u.concat([
                                {
                                  meta: (e) =>
                                    a().createElement(be, {
                                      ...e,
                                      maxLength: r.maxLength,
                                      id: t,
                                    }),
                                },
                              ]));
                          }
                          return {
                            rawContentState: s,
                            onSave: i,
                            placeholder: (0, oe.AP)(
                              "Write something or type ‘/’ to insert a block",
                            ),
                            spellCheck: !0,
                            enableLineBreak: {
                              description: (0, oe.AP)("Line break"),
                              icon: "M.436 633.471l296.897-296.898v241.823h616.586V94.117h109.517v593.796H297.333v242.456z",
                            },
                            topToolbar: (t) =>
                              a().createElement(
                                a().Fragment,
                                null,
                                a().createElement(qt, {
                                  ...t,
                                  triggerIcon: an,
                                  triggerLabel: Ee.Mn,
                                  comboLabel: Ee.qc,
                                  comboPlaceholder: Ee.qc,
                                  noResultsText: Ee.b5,
                                  ComboBoxComponent: Ee.Ay,
                                }),
                                a().createElement(zt, {
                                  ...t,
                                  pinButton: sn,
                                  defaultToolbar: cn(),
                                  onSetToolbar: un,
                                }),
                              ),
                            bottomToolbar: Wt,
                            commandToolbar: (t) =>
                              a().createElement(It, {
                                ...t,
                                noResultsText: (0, oe.AP)("No results"),
                                ComboBoxComponent: Ee.Ay,
                              }),
                            maxListNesting: 4,
                            stripPastedStyles: !1,
                            ariaDescribedBy: e,
                            ...t,
                            blockTypes: o.map(fn),
                            inlineStyles: c.map(fn),
                            entityTypes: d,
                            controls: u,
                            decorators: l,
                            plugins: f,
                            commands: p,
                            enableHorizontalRule: n,
                          };
                        })(u);
                        return n && "" !== e
                          ? a().createElement(
                              Gt.A,
                              { store: n.store },
                              a().createElement(Pe, {
                                editorRef: c,
                                commentApp: window.comments.commentApp,
                                fieldNode: r.parentNode,
                                contentPath: e,
                                isCommentShortcut:
                                  window.comments.isCommentShortcut,
                                ...o,
                              }),
                            )
                          : a().createElement(Lt, { ref: c, ...o });
                      },
                      {
                        initialOptions: e,
                        contentPath: window.comments?.getContentPath(r) || "",
                        commentApp: window.comments?.commentApp,
                      },
                    ),
                  ),
                  o,
                ),
                [u, l]
              );
            },
            splitState: function (t) {
              const e = t.getSelection(),
                n = e.getAnchorKey(),
                r = t.getCurrentContent(),
                o = e.isCollapsed()
                  ? e
                  : new s.SelectionState({
                      anchorKey: e.getStartKey(),
                      anchorOffset: e.getStartOffset(),
                      focusKey: e.getStartKey(),
                      focusOffset: e.getStartOffset(),
                    }),
                i = s.Modifier.splitBlock(r, o).getBlocksAsArray(),
                a = i.findIndex((t) => t.getKey() === n),
                c = i.slice(0, a + 1),
                u = i.slice(a + 1),
                l = s.EditorState.push(t, Ie(c), "remove-range"),
                f = s.EditorState.push(t, Ie(u), "remove-range"),
                p = new Set(Ae(f).keys());
              return {
                stateBefore: l,
                stateAfter: f,
                shouldMoveCommentFn: (t) => p.has(t.localId),
              };
            },
            registerPlugin: (t, e = "entityTypes") => (
              (ln[e][t.type] = t), ln[e]
            ),
            DraftUtils: at,
            ModalWorkflowSource: le,
            ImageModalWorkflowSource: class extends le {
              getChooserConfig(t) {
                let e, r;
                const { imageChooser: o } = {
                  ...this.props.entityType?.chooserUrls,
                  ...n.g.chooserUrls,
                };
                if (t) {
                  const n = t.getData();
                  (e = `${o}${n.id}/select_format/`),
                    (r = { format: n.format, alt_text: n.alt });
                } else (e = `${o}?select_format=true`), (r = {});
                return {
                  url: e,
                  urlParams: r,
                  onload: n.g.IMAGE_CHOOSER_MODAL_ONLOAD_HANDLERS,
                  responses: { chosen: this.onChosen },
                };
              }
              filterEntityData(t) {
                return {
                  id: t.id,
                  src: t.preview.url,
                  alt: t.alt,
                  format: t.format,
                };
              }
            },
            EmbedModalWorkflowSource: class extends le {
              getChooserConfig(t) {
                const { embedsChooser: e } = {
                    ...this.props.entityType?.chooserUrls,
                    ...n.g.chooserUrls,
                  },
                  r = {};
                return (
                  t && (r.url = t.getData().url),
                  {
                    url: e,
                    urlParams: r,
                    onload: n.g.EMBED_CHOOSER_MODAL_ONLOAD_HANDLERS,
                    responses: { embedChosen: (t, e) => this.onChosen(e) },
                  }
                );
              }
              filterEntityData(t) {
                return {
                  embedType: t.embedType,
                  url: t.url,
                  providerName: t.providerName,
                  authorName: t.authorName,
                  thumbnail: t.thumbnail,
                  title: t.title,
                };
              }
            },
            LinkModalWorkflowSource: class extends le {
              getChooserConfig(t, e) {
                const r = {
                  ...this.props.entityType?.chooserUrls,
                  ...n.g.chooserUrls,
                };
                let o = r.pageChooser;
                const i = {
                  page_type: "wagtailcore.page",
                  allow_external_link: !0,
                  allow_email_link: !0,
                  allow_phone_link: !0,
                  allow_anchor_link: !0,
                  link_text: e,
                };
                if (t) {
                  const e = t.getData();
                  e.id
                    ? (o =
                        null !== e.parentId
                          ? `${r.pageChooser}${e.parentId}/`
                          : r.pageChooser)
                    : e.url.startsWith("mailto:")
                    ? ((o = r.emailLinkChooser),
                      (i.link_url = e.url.replace("mailto:", "")))
                    : e.url.startsWith("tel:")
                    ? ((o = r.phoneLinkChooser),
                      (i.link_url = e.url.replace("tel:", "")))
                    : e.url.startsWith("#")
                    ? ((o = r.anchorLinkChooser),
                      (i.link_url = e.url.replace("#", "")))
                    : ((o = r.externalLinkChooser), (i.link_url = e.url));
                }
                return {
                  url: o,
                  urlParams: i,
                  onload: n.g.PAGE_CHOOSER_MODAL_ONLOAD_HANDLERS,
                  responses: { pageChosen: this.onChosen },
                };
              }
              filterEntityData(t) {
                return t.id
                  ? { url: t.url, id: t.id, parentId: t.parentId }
                  : { url: t.url };
              }
            },
            DocumentModalWorkflowSource: class extends le {
              getChooserConfig() {
                const { documentChooser: t } = {
                  ...this.props.entityType?.chooserUrls,
                  ...n.g.chooserUrls,
                };
                return {
                  url: t,
                  urlParams: {},
                  onload: n.g.DOCUMENT_CHOOSER_MODAL_ONLOAD_HANDLERS,
                  responses: { chosen: this.onChosen },
                };
              }
              filterEntityData(t) {
                return { url: t.url, filename: t.filename, id: t.id };
              }
            },
            Tooltip: he,
            TooltipEntity: ve,
          };
        (window.Draftail = r),
          (window.draftail = pn),
          (window.chooserUrls = n.g.chooserUrls || {}),
          [
            {
              type: "DOCUMENT",
              source: pn.DocumentModalWorkflowSource,
              decorator: Ye,
            },
            {
              type: "LINK",
              source: pn.LinkModalWorkflowSource,
              decorator: Ve,
              onPaste: (t, e, n, { setEditorState: r }) => {
                const o = ((t, e) => {
                  if (t.includes("@")) {
                    const [e, n] = t.split("@");
                    if (He.test(e) && qe.test(n)) return `mailto:${t}`;
                  }
                  try {
                    const n = new URL(t);
                    if (e.includes(n.protocol)) return t;
                  } catch (t) {
                    return !1;
                  }
                  return !1;
                })(t, We);
                if (!o) return "not-handled";
                const i = n.getSelection();
                let a = n.getCurrentContent();
                a = a.createEntity("LINK", "MUTABLE", { url: o });
                const c = a.getLastCreatedEntityKey();
                let u;
                return (
                  i.isCollapsed()
                    ? ((a = s.Modifier.insertText(a, i, t, void 0, c)),
                      (u = s.EditorState.push(n, a, "insert-characters")))
                    : (u = s.RichUtils.toggleLink(n, i, c)),
                  r(u),
                  "handled"
                );
              },
            },
            { type: "IMAGE", source: pn.ImageModalWorkflowSource, block: en },
            { type: "EMBED", source: pn.EmbedModalWorkflowSource, block: rn },
          ].forEach((t) => pn.registerPlugin(t, "entityTypes")),
          document.addEventListener(
            "w-draftail:init",
            ({ detail: t = {}, target: e }) => {
              const n = e.id;
              n
                ? window.draftail.initEditor(`#${n}`, t, document.currentScript)
                : console.error(
                    "`w-draftail:init` event must have a target with an id.",
                  );
            },
          );
      },
      7232: function (t, e, n) {
        var r;
        !(function (o, i) {
          "use strict";
          var a = "function",
            s = "undefined",
            c = "object",
            u = "string",
            l = "model",
            f = "name",
            p = "type",
            d = "vendor",
            h = "version",
            g = "architecture",
            y = "console",
            m = "mobile",
            v = "tablet",
            b = "smarttv",
            S = "wearable",
            _ = "embedded",
            E = "Amazon",
            w = "Apple",
            C = "ASUS",
            k = "BlackBerry",
            x = "Browser",
            T = "Chrome",
            O = "Firefox",
            D = "Google",
            R = "Huawei",
            M = "LG",
            A = "Microsoft",
            I = "Motorola",
            B = "Opera",
            K = "Samsung",
            L = "Sharp",
            N = "Sony",
            P = "Xiaomi",
            F = "Zebra",
            U = "Facebook",
            j = function (t) {
              for (var e = {}, n = 0; n < t.length; n++)
                e[t[n].toUpperCase()] = t[n];
              return e;
            },
            z = function (t, e) {
              return typeof t === u && -1 !== H(e).indexOf(H(t));
            },
            H = function (t) {
              return t.toLowerCase();
            },
            q = function (t, e) {
              if (typeof t === u)
                return (
                  (t = t.replace(/^\s\s*/, "")),
                  typeof e === s ? t : t.substring(0, 350)
                );
            },
            W = function (t, e) {
              for (var n, r, o, s, u, l, f = 0; f < e.length && !u; ) {
                var p = e[f],
                  d = e[f + 1];
                for (n = r = 0; n < p.length && !u; )
                  if ((u = p[n++].exec(t)))
                    for (o = 0; o < d.length; o++)
                      (l = u[++r]),
                        typeof (s = d[o]) === c && s.length > 0
                          ? 2 === s.length
                            ? typeof s[1] == a
                              ? (this[s[0]] = s[1].call(this, l))
                              : (this[s[0]] = s[1])
                            : 3 === s.length
                            ? typeof s[1] !== a || (s[1].exec && s[1].test)
                              ? (this[s[0]] = l ? l.replace(s[1], s[2]) : i)
                              : (this[s[0]] = l ? s[1].call(this, l, s[2]) : i)
                            : 4 === s.length &&
                              (this[s[0]] = l
                                ? s[3].call(this, l.replace(s[1], s[2]))
                                : i)
                          : (this[s] = l || i);
                f += 2;
              }
            },
            $ = function (t, e) {
              for (var n in e)
                if (typeof e[n] === c && e[n].length > 0) {
                  for (var r = 0; r < e[n].length; r++)
                    if (z(e[n][r], t)) return "?" === n ? i : n;
                } else if (z(e[n], t)) return "?" === n ? i : n;
              return t;
            },
            V = {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              2e3: "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              7: "NT 6.1",
              8: "NT 6.2",
              8.1: "NT 6.3",
              10: ["NT 6.4", "NT 10.0"],
              RT: "ARM",
            },
            G = {
              browser: [
                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                [h, [f, "Chrome"]],
                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                [h, [f, "Edge"]],
                [
                  /(opera mini)\/([-\w\.]+)/i,
                  /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                  /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                ],
                [f, h],
                [/opios[\/ ]+([\w\.]+)/i],
                [h, [f, B + " Mini"]],
                [/\bopr\/([\w\.]+)/i],
                [h, [f, B]],
                [
                  /(kindle)\/([\w\.]+)/i,
                  /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                  /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                  /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                  /(?:ms|\()(ie) ([\w\.]+)/i,
                  /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                  /(weibo)__([\d\.]+)/i,
                ],
                [f, h],
                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                [h, [f, "UC" + x]],
                [
                  /microm.+\bqbcore\/([\w\.]+)/i,
                  /\bqbcore\/([\w\.]+).+microm/i,
                ],
                [h, [f, "WeChat(Win) Desktop"]],
                [/micromessenger\/([\w\.]+)/i],
                [h, [f, "WeChat"]],
                [/konqueror\/([\w\.]+)/i],
                [h, [f, "Konqueror"]],
                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                [h, [f, "IE"]],
                [/yabrowser\/([\w\.]+)/i],
                [h, [f, "Yandex"]],
                [/(avast|avg)\/([\w\.]+)/i],
                [[f, /(.+)/, "$1 Secure " + x], h],
                [/\bfocus\/([\w\.]+)/i],
                [h, [f, O + " Focus"]],
                [/\bopt\/([\w\.]+)/i],
                [h, [f, B + " Touch"]],
                [/coc_coc\w+\/([\w\.]+)/i],
                [h, [f, "Coc Coc"]],
                [/dolfin\/([\w\.]+)/i],
                [h, [f, "Dolphin"]],
                [/coast\/([\w\.]+)/i],
                [h, [f, B + " Coast"]],
                [/miuibrowser\/([\w\.]+)/i],
                [h, [f, "MIUI " + x]],
                [/fxios\/([-\w\.]+)/i],
                [h, [f, O]],
                [/\bqihu|(qi?ho?o?|360)browser/i],
                [[f, "360 " + x]],
                [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                [[f, /(.+)/, "$1 " + x], h],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [[f, /_/g, " "], h],
                [
                  /(electron)\/([\w\.]+) safari/i,
                  /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                  /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                ],
                [f, h],
                [
                  /(metasr)[\/ ]?([\w\.]+)/i,
                  /(lbbrowser)/i,
                  /\[(linkedin)app\]/i,
                ],
                [f],
                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                [[f, U], h],
                [
                  /safari (line)\/([\w\.]+)/i,
                  /\b(line)\/([\w\.]+)\/iab/i,
                  /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                ],
                [f, h],
                [/\bgsa\/([\w\.]+) .*safari\//i],
                [h, [f, "GSA"]],
                [/headlesschrome(?:\/([\w\.]+)| )/i],
                [h, [f, T + " Headless"]],
                [/ wv\).+(chrome)\/([\w\.]+)/i],
                [[f, T + " WebView"], h],
                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                [h, [f, "Android " + x]],
                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                [f, h],
                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                [h, [f, "Mobile Safari"]],
                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                [h, f],
                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                [
                  f,
                  [
                    h,
                    $,
                    {
                      "1.0": "/8",
                      1.2: "/1",
                      1.3: "/3",
                      "2.0": "/412",
                      "2.0.2": "/416",
                      "2.0.3": "/417",
                      "2.0.4": "/419",
                      "?": "/",
                    },
                  ],
                ],
                [/(webkit|khtml)\/([\w\.]+)/i],
                [f, h],
                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                [[f, "Netscape"], h],
                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                [h, [f, O + " Reality"]],
                [
                  /ekiohf.+(flow)\/([\w\.]+)/i,
                  /(swiftfox)/i,
                  /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                  /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                  /(firefox)\/([\w\.]+)/i,
                  /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                  /(links) \(([\w\.]+)/i,
                ],
                [f, h],
                [/(cobalt)\/([\w\.]+)/i],
                [f, [h, /master.|lts./, ""]],
              ],
              cpu: [
                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                [[g, "amd64"]],
                [/(ia32(?=;))/i],
                [[g, H]],
                [/((?:i[346]|x)86)[;\)]/i],
                [[g, "ia32"]],
                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                [[g, "arm64"]],
                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                [[g, "armhf"]],
                [/windows (ce|mobile); ppc;/i],
                [[g, "arm"]],
                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                [[g, /ower/, "", H]],
                [/(sun4\w)[;\)]/i],
                [[g, "sparc"]],
                [
                  /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                ],
                [[g, H]],
              ],
              device: [
                [
                  /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                ],
                [l, [d, K], [p, v]],
                [
                  /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
                  /samsung[- ]([-\w]+)/i,
                  /sec-(sgh\w+)/i,
                ],
                [l, [d, K], [p, m]],
                [/\((ip(?:hone|od)[\w ]*);/i],
                [l, [d, w], [p, m]],
                [
                  /\((ipad);[-\w\),; ]+apple/i,
                  /applecoremedia\/[\w\.]+ \((ipad)/i,
                  /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                ],
                [l, [d, w], [p, v]],
                [/(macintosh);/i],
                [l, [d, w]],
                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                [l, [d, R], [p, v]],
                [
                  /(?:huawei|honor)([-\w ]+)[;\)]/i,
                  /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                ],
                [l, [d, R], [p, m]],
                [
                  /\b(poco[\w ]+)(?: bui|\))/i,
                  /\b; (\w+) build\/hm\1/i,
                  /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                  /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                  /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                ],
                [
                  [l, /_/g, " "],
                  [d, P],
                  [p, m],
                ],
                [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                [
                  [l, /_/g, " "],
                  [d, P],
                  [p, v],
                ],
                [
                  /; (\w+) bui.+ oppo/i,
                  /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                ],
                [l, [d, "OPPO"], [p, m]],
                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                [l, [d, "Vivo"], [p, m]],
                [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                [l, [d, "Realme"], [p, m]],
                [
                  /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                  /\bmot(?:orola)?[- ](\w*)/i,
                  /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                ],
                [l, [d, I], [p, m]],
                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                [l, [d, I], [p, v]],
                [
                  /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                ],
                [l, [d, M], [p, v]],
                [
                  /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                  /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                  /\blg-?([\d\w]+) bui/i,
                ],
                [l, [d, M], [p, m]],
                [
                  /(ideatab[-\w ]+)/i,
                  /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                ],
                [l, [d, "Lenovo"], [p, v]],
                [
                  /(?:maemo|nokia).*(n900|lumia \d+)/i,
                  /nokia[-_ ]?([-\w\.]*)/i,
                ],
                [
                  [l, /_/g, " "],
                  [d, "Nokia"],
                  [p, m],
                ],
                [/(pixel c)\b/i],
                [l, [d, D], [p, v]],
                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                [l, [d, D], [p, m]],
                [
                  /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                ],
                [l, [d, N], [p, m]],
                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                [
                  [l, "Xperia Tablet"],
                  [d, N],
                  [p, v],
                ],
                [
                  / (kb2005|in20[12]5|be20[12][59])\b/i,
                  /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                ],
                [l, [d, "OnePlus"], [p, m]],
                [
                  /(alexa)webm/i,
                  /(kf[a-z]{2}wi)( bui|\))/i,
                  /(kf[a-z]+)( bui|\)).+silk\//i,
                ],
                [l, [d, E], [p, v]],
                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                [
                  [l, /(.+)/g, "Fire Phone $1"],
                  [d, E],
                  [p, m],
                ],
                [/(playbook);[-\w\),; ]+(rim)/i],
                [l, d, [p, v]],
                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                [l, [d, k], [p, m]],
                [
                  /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                ],
                [l, [d, C], [p, v]],
                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                [l, [d, C], [p, m]],
                [/(nexus 9)/i],
                [l, [d, "HTC"], [p, v]],
                [
                  /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                  /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                  /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i,
                ],
                [d, [l, /_/g, " "], [p, m]],
                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                [l, [d, "Acer"], [p, v]],
                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                [l, [d, "Meizu"], [p, m]],
                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                [l, [d, L], [p, m]],
                [
                  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                  /(hp) ([\w ]+\w)/i,
                  /(asus)-?(\w+)/i,
                  /(microsoft); (lumia[\w ]+)/i,
                  /(lenovo)[-_ ]?([-\w]+)/i,
                  /(jolla)/i,
                  /(oppo) ?([\w ]+) bui/i,
                ],
                [d, l, [p, m]],
                [
                  /(archos) (gamepad2?)/i,
                  /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                  /(kindle)\/([\w\.]+)/i,
                  /(nook)[\w ]+build\/(\w+)/i,
                  /(dell) (strea[kpr\d ]*[\dko])/i,
                  /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                  /(trinity)[- ]*(t\d{3}) bui/i,
                  /(gigaset)[- ]+(q\w{1,9}) bui/i,
                  /(vodafone) ([\w ]+)(?:\)| bui)/i,
                ],
                [d, l, [p, v]],
                [/(surface duo)/i],
                [l, [d, A], [p, v]],
                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                [l, [d, "Fairphone"], [p, m]],
                [/(u304aa)/i],
                [l, [d, "AT&T"], [p, m]],
                [/\bsie-(\w*)/i],
                [l, [d, "Siemens"], [p, m]],
                [/\b(rct\w+) b/i],
                [l, [d, "RCA"], [p, v]],
                [/\b(venue[\d ]{2,7}) b/i],
                [l, [d, "Dell"], [p, v]],
                [/\b(q(?:mv|ta)\w+) b/i],
                [l, [d, "Verizon"], [p, v]],
                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                [l, [d, "Barnes & Noble"], [p, v]],
                [/\b(tm\d{3}\w+) b/i],
                [l, [d, "NuVision"], [p, v]],
                [/\b(k88) b/i],
                [l, [d, "ZTE"], [p, v]],
                [/\b(nx\d{3}j) b/i],
                [l, [d, "ZTE"], [p, m]],
                [/\b(gen\d{3}) b.+49h/i],
                [l, [d, "Swiss"], [p, m]],
                [/\b(zur\d{3}) b/i],
                [l, [d, "Swiss"], [p, v]],
                [/\b((zeki)?tb.*\b) b/i],
                [l, [d, "Zeki"], [p, v]],
                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                [[d, "Dragon Touch"], l, [p, v]],
                [/\b(ns-?\w{0,9}) b/i],
                [l, [d, "Insignia"], [p, v]],
                [/\b((nxa|next)-?\w{0,9}) b/i],
                [l, [d, "NextBook"], [p, v]],
                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                [[d, "Voice"], l, [p, m]],
                [/\b(lvtel\-)?(v1[12]) b/i],
                [[d, "LvTel"], l, [p, m]],
                [/\b(ph-1) /i],
                [l, [d, "Essential"], [p, m]],
                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                [l, [d, "Envizen"], [p, v]],
                [/\b(trio[-\w\. ]+) b/i],
                [l, [d, "MachSpeed"], [p, v]],
                [/\btu_(1491) b/i],
                [l, [d, "Rotor"], [p, v]],
                [/(shield[\w ]+) b/i],
                [l, [d, "Nvidia"], [p, v]],
                [/(sprint) (\w+)/i],
                [d, l, [p, m]],
                [/(kin\.[onetw]{3})/i],
                [
                  [l, /\./g, " "],
                  [d, A],
                  [p, m],
                ],
                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                [l, [d, F], [p, v]],
                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                [l, [d, F], [p, m]],
                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                [d, l, [p, y]],
                [/droid.+; (shield) bui/i],
                [l, [d, "Nvidia"], [p, y]],
                [/(playstation [345portablevi]+)/i],
                [l, [d, N], [p, y]],
                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                [l, [d, A], [p, y]],
                [/smart-tv.+(samsung)/i],
                [d, [p, b]],
                [/hbbtv.+maple;(\d+)/i],
                [
                  [l, /^/, "SmartTV"],
                  [d, K],
                  [p, b],
                ],
                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                [
                  [d, M],
                  [p, b],
                ],
                [/(apple) ?tv/i],
                [d, [l, w + " TV"], [p, b]],
                [/crkey/i],
                [
                  [l, T + "cast"],
                  [d, D],
                  [p, b],
                ],
                [/droid.+aft(\w)( bui|\))/i],
                [l, [d, E], [p, b]],
                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                [l, [d, L], [p, b]],
                [/(bravia[\w ]+)( bui|\))/i],
                [l, [d, N], [p, b]],
                [/(mitv-\w{5}) bui/i],
                [l, [d, P], [p, b]],
                [
                  /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                  /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i,
                ],
                [
                  [d, q],
                  [l, q],
                  [p, b],
                ],
                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                [[p, b]],
                [/((pebble))app/i],
                [d, l, [p, S]],
                [/droid.+; (glass) \d/i],
                [l, [d, D], [p, S]],
                [/droid.+; (wt63?0{2,3})\)/i],
                [l, [d, F], [p, S]],
                [/(quest( 2)?)/i],
                [l, [d, U], [p, S]],
                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                [d, [p, _]],
                [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                [l, [p, m]],
                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                [l, [p, v]],
                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                [[p, v]],
                [
                  /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                ],
                [[p, m]],
                [/(android[-\w\. ]{0,9});.+buil/i],
                [l, [d, "Generic"]],
              ],
              engine: [
                [/windows.+ edge\/([\w\.]+)/i],
                [h, [f, "EdgeHTML"]],
                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                [h, [f, "Blink"]],
                [
                  /(presto)\/([\w\.]+)/i,
                  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                  /ekioh(flow)\/([\w\.]+)/i,
                  /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                  /(icab)[\/ ]([23]\.[\d\.]+)/i,
                ],
                [f, h],
                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                [h, f],
              ],
              os: [
                [/microsoft (windows) (vista|xp)/i],
                [f, h],
                [
                  /(windows) nt 6\.2; (arm)/i,
                  /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                  /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                ],
                [f, [h, $, V]],
                [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                [
                  [f, "Windows"],
                  [h, $, V],
                ],
                [
                  /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                  /cfnetwork\/.+darwin/i,
                ],
                [
                  [h, /_/g, "."],
                  [f, "iOS"],
                ],
                [
                  /(mac os x) ?([\w\. ]*)/i,
                  /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                ],
                [
                  [f, "Mac OS"],
                  [h, /_/g, "."],
                ],
                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                [h, f],
                [
                  /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                  /(blackberry)\w*\/([\w\.]*)/i,
                  /(tizen|kaios)[\/ ]([\w\.]+)/i,
                  /\((series40);/i,
                ],
                [f, h],
                [/\(bb(10);/i],
                [h, [f, k]],
                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                [h, [f, "Symbian"]],
                [
                  /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                ],
                [h, [f, O + " OS"]],
                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                [h, [f, "webOS"]],
                [/crkey\/([\d\.]+)/i],
                [h, [f, T + "cast"]],
                [/(cros) [\w]+ ([\w\.]+\w)/i],
                [[f, "Chromium OS"], h],
                [
                  /(nintendo|playstation) ([wids345portablevuch]+)/i,
                  /(xbox); +xbox ([^\);]+)/i,
                  /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                  /(mint)[\/\(\) ]?(\w*)/i,
                  /(mageia|vectorlinux)[; ]/i,
                  /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                  /(hurd|linux) ?([\w\.]*)/i,
                  /(gnu) ?([\w\.]*)/i,
                  /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                  /(haiku) (\w+)/i,
                ],
                [f, h],
                [/(sunos) ?([\w\.\d]*)/i],
                [[f, "Solaris"], h],
                [
                  /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                  /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                  /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
                  /(unix) ?([\w\.]*)/i,
                ],
                [f, h],
              ],
            },
            Z = function (t, e) {
              if ((typeof t === c && ((e = t), (t = i)), !(this instanceof Z)))
                return new Z(t, e).getResult();
              var n =
                  t ||
                  (typeof o !== s && o.navigator && o.navigator.userAgent
                    ? o.navigator.userAgent
                    : ""),
                r = e
                  ? (function (t, e) {
                      var n = {};
                      for (var r in t)
                        e[r] && e[r].length % 2 == 0
                          ? (n[r] = e[r].concat(t[r]))
                          : (n[r] = t[r]);
                      return n;
                    })(G, e)
                  : G;
              return (
                (this.getBrowser = function () {
                  var t,
                    e = {};
                  return (
                    (e[f] = i),
                    (e[h] = i),
                    W.call(e, n, r.browser),
                    (e.major =
                      typeof (t = e.version) === u
                        ? t.replace(/[^\d\.]/g, "").split(".")[0]
                        : i),
                    e
                  );
                }),
                (this.getCPU = function () {
                  var t = {};
                  return (t[g] = i), W.call(t, n, r.cpu), t;
                }),
                (this.getDevice = function () {
                  var t = {};
                  return (
                    (t[d] = i),
                    (t[l] = i),
                    (t[p] = i),
                    W.call(t, n, r.device),
                    t
                  );
                }),
                (this.getEngine = function () {
                  var t = {};
                  return (t[f] = i), (t[h] = i), W.call(t, n, r.engine), t;
                }),
                (this.getOS = function () {
                  var t = {};
                  return (t[f] = i), (t[h] = i), W.call(t, n, r.os), t;
                }),
                (this.getResult = function () {
                  return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU(),
                  };
                }),
                (this.getUA = function () {
                  return n;
                }),
                (this.setUA = function (t) {
                  return (
                    (n = typeof t === u && t.length > 350 ? q(t, 350) : t), this
                  );
                }),
                this.setUA(n),
                this
              );
            };
          (Z.VERSION = "0.7.33"),
            (Z.BROWSER = j([f, h, "major"])),
            (Z.CPU = j([g])),
            (Z.DEVICE = j([l, d, p, y, m, b, v, S, _])),
            (Z.ENGINE = Z.OS = j([f, h])),
            typeof e !== s
              ? (t.exports && (e = t.exports = Z), (e.UAParser = Z))
              : n.amdO
              ? (r = function () {
                  return Z;
                }.call(e, n, e, t)) === i || (t.exports = r)
              : typeof o !== s && (o.UAParser = Z);
          var J = typeof o !== s && (o.jQuery || o.Zepto);
          if (J && !J.ua) {
            var Y = new Z();
            (J.ua = Y.getResult()),
              (J.ua.get = function () {
                return Y.getUA();
              }),
              (J.ua.set = function (t) {
                Y.setUA(t);
                var e = Y.getResult();
                for (var n in e) J.ua[n] = e[n];
              });
          }
        })("object" == typeof window ? window : this);
      },
    },
    n = {};
  function r(t) {
    var o = n[t];
    if (void 0 !== o) return o.exports;
    var i = (n[t] = { id: t, loaded: !1, exports: {} });
    return e[t].call(i.exports, i, i.exports, r), (i.loaded = !0), i.exports;
  }
  (r.m = e),
    (r.amdO = {}),
    (t = []),
    (r.O = (e, n, o, i) => {
      if (!n) {
        var a = 1 / 0;
        for (l = 0; l < t.length; l++) {
          for (var [n, o, i] = t[l], s = !0, c = 0; c < n.length; c++)
            (!1 & i || a >= i) && Object.keys(r.O).every((t) => r.O[t](n[c]))
              ? n.splice(c--, 1)
              : ((s = !1), i < a && (a = i));
          if (s) {
            t.splice(l--, 1);
            var u = o();
            void 0 !== u && (e = u);
          }
        }
        return e;
      }
      i = i || 0;
      for (var l = t.length; l > 0 && t[l - 1][2] > i; l--) t[l] = t[l - 1];
      t[l] = [n, o, i];
    }),
    (r.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, { a: e }), e;
    }),
    (r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
    (r.j = 262),
    (() => {
      var t = { 262: 0 };
      r.O.j = (e) => 0 === t[e];
      var e = (e, n) => {
          var o,
            i,
            [a, s, c] = n,
            u = 0;
          if (a.some((e) => 0 !== t[e])) {
            for (o in s) r.o(s, o) && (r.m[o] = s[o]);
            if (c) var l = c(r);
          }
          for (e && e(n); u < a.length; u++)
            (i = a[u]), r.o(t, i) && t[i] && t[i][0](), (t[i] = 0);
          return r.O(l);
        },
        n = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      n.forEach(e.bind(null, 0)), (n.push = e.bind(null, n.push.bind(n)));
    })();
  var o = r.O(void 0, [321], () => r(7792));
  o = r.O(o);
})();
