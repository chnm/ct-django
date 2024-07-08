/*! For license information please see sidebar.js.LICENSE.txt */
(() => {
  "use strict";
  var e,
    t = {
      3769: (e, t, n) => {
        n(2427), n(1458);
      },
      998: (e, t, n) => {
        var a = n(2427),
          r = n.n(a),
          i = n(6931),
          s = n.n(i);
        function o(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n) e[a] = n[a];
          }
          return e;
        }
        var l = (function e(t, n) {
            function a(e, a, r) {
              if ("undefined" != typeof document) {
                "number" == typeof (r = o({}, n, r)).expires &&
                  (r.expires = new Date(Date.now() + 864e5 * r.expires)),
                  r.expires && (r.expires = r.expires.toUTCString()),
                  (e = encodeURIComponent(e)
                    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                    .replace(/[()]/g, escape));
                var i = "";
                for (var s in r)
                  r[s] &&
                    ((i += "; " + s),
                    !0 !== r[s] && (i += "=" + r[s].split(";")[0]));
                return (document.cookie = e + "=" + t.write(a, e) + i);
              }
            }
            return Object.create(
              {
                set: a,
                get: function (e) {
                  if (
                    "undefined" != typeof document &&
                    (!arguments.length || e)
                  ) {
                    for (
                      var n = document.cookie
                          ? document.cookie.split("; ")
                          : [],
                        a = {},
                        r = 0;
                      r < n.length;
                      r++
                    ) {
                      var i = n[r].split("="),
                        s = i.slice(1).join("=");
                      try {
                        var o = decodeURIComponent(i[0]);
                        if (((a[o] = t.read(s, o)), e === o)) break;
                      } catch (e) {}
                    }
                    return e ? a[e] : a;
                  }
                },
                remove: function (e, t) {
                  a(e, "", o({}, t, { expires: -1 }));
                },
                withAttributes: function (t) {
                  return e(this.converter, o({}, this.attributes, t));
                },
                withConverter: function (t) {
                  return e(o({}, this.converter, t), this.attributes);
                },
              },
              {
                attributes: { value: Object.freeze(n) },
                converter: { value: Object.freeze(t) },
              },
            );
          })(
            {
              read: function (e) {
                return (
                  '"' === e[0] && (e = e.slice(1, -1)),
                  e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                );
              },
              write: function (e) {
                return encodeURIComponent(e).replace(
                  /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                  decodeURIComponent,
                );
              },
            },
            { path: "/" },
          ),
          c = n(2833),
          u = n(1238);
        const m = 150,
          d = ({
            modules: e,
            currentPath: t,
            collapsedOnLoad: n = !1,
            navigate: r,
            onExpandCollapse: i,
          }) => {
            const [s, o] = a.useState(n),
              l = a.useRef(null);
            a.useEffect(() => {
              s && i && i(!0);
            }, []);
            const [d, p] = a.useState(!1),
              [h, f] = a.useState(!0),
              g = () => window.innerWidth < 800,
              [v, b] = a.useState(g());
            a.useEffect(() => {
              function e() {
                return g()
                  ? (b(!0), null)
                  : (b(!1),
                    p(!1),
                    setTimeout(() => {
                      f(!0);
                    }, m));
              }
              window.addEventListener("resize", e);
              const t = e();
              return () => {
                window.removeEventListener("resize", e), t && clearTimeout(t);
              };
            }, []);
            const E = s && !v,
              [w, y] = a.useState(!1);
            a.useEffect(() => {
              y(!0);
              const e = setTimeout(() => {
                y(!1);
              }, m);
              return () => {
                clearTimeout(e);
              };
            }, [E]);
            const N = () => {
                o(!s), i && i(!s);
              },
              [_, P] = a.useState(!1),
              C = () => {
                E && N();
              };
            a.useEffect(() => {
              const e = setTimeout(() => {
                d || f(!0);
              }, m);
              return () => {
                clearTimeout(e);
              };
            }, [d]);
            const S = () => {
                p(!1), l && l.current?.focus();
              },
              x = e.map((e, n) =>
                e.render({
                  key: n,
                  slim: E,
                  expandingOrCollapsing: w,
                  onHideMobile: S,
                  onSearchClick: C,
                  currentPath: t,
                  navigate: r,
                }),
              );
            return a.createElement(
              a.Fragment,
              null,
              a.createElement(
                "button",
                {
                  onClick: () => {
                    p(!d), y(!0);
                    const e = setTimeout(() => {
                      y(!1), f(!h);
                    }, m);
                    return () => {
                      clearTimeout(e);
                    };
                  },
                  "aria-label": (0, c.AP)("Toggle sidebar"),
                  "aria-expanded": d ? "true" : "false",
                  className:
                    "button sidebar-nav-toggle" +
                    (v ? " sidebar-nav-toggle--mobile" : "") +
                    (d ? " sidebar-nav-toggle--open" : ""),
                  type: "button",
                  ref: l,
                },
                d
                  ? a.createElement(u.A, { name: "cross" })
                  : a.createElement(u.A, { name: "bars" }),
              ),
              a.createElement(
                "div",
                {
                  className:
                    "sidebar" +
                    (E ? " sidebar--slim" : "") +
                    (v ? " sidebar--mobile" : "") +
                    (v && !d ? " sidebar--hidden" : "") +
                    (v && !d && h ? " sidebar--closed" : ""),
                },
                a.createElement(
                  "div",
                  {
                    className: "sidebar__inner",
                    onFocus: () => {
                      _ && (o(!1), P(!0));
                    },
                    onBlur: () => {
                      _ && (P(!1), o(!0));
                    },
                  },
                  a.createElement(
                    "div",
                    {
                      className: `sm:w-mt-2 ${
                        E ? "w-justify-center" : "w-justify-end"
                      } w-flex  w-items-center`,
                    },
                    a.createElement(
                      "button",
                      {
                        onClick: N,
                        "aria-label": (0, c.AP)("Toggle sidebar"),
                        "aria-expanded": E ? "false" : "true",
                        type: "button",
                        className:
                          (E ? "" : "w-mr-4") +
                          "\n                button\n                sidebar__collapse-toggle\n                w-flex\n                w-justify-center\n                w-items-center\n                hover:w-bg-surface-menu-item-active\n                hover:text-white\n                hover:opacity-100",
                      },
                      a.createElement(u.A, {
                        name: "expand-right",
                        className: s ? "" : "-w-rotate-180",
                      }),
                    ),
                  ),
                  x,
                ),
              ),
            );
          };
        var p = n(3476);
        const h = "wagtail_sidebar_collapsed";
        var f = n(1504);
        const g = ({
          item: e,
          slim: t,
          path: n,
          state: r,
          dispatch: i,
          navigate: s,
        }) => {
          const o = r.activePath === n,
            l = r.activePath.startsWith(n),
            m = n.split(".").length > 2,
            d =
              "sidebar-menu-item" +
              (l ? " sidebar-menu-item--active" : "") +
              (m ? " sidebar-menu-item--in-sub-menu" : "");
          return a.createElement(
            "li",
            { className: d },
            a.createElement(
              f.Ay,
              { disabled: !t || m, content: e.label, placement: "right" },
              a.createElement(
                "a",
                {
                  ...e.attrs,
                  href: e.url,
                  "aria-current": o ? "page" : void 0,
                  onClick: (t) => {
                    t.ctrlKey ||
                      t.shiftKey ||
                      t.metaKey ||
                      (t.button && 0 !== t.button) ||
                      (P(e, r) || i({ type: "set-dismissible-state", item: e }),
                      e.attrs.target ||
                        (t.preventDefault(),
                        s(e.url).then(() => {
                          i({ type: "set-active-path", path: n }),
                            i({ type: "set-navigation-path", path: "" });
                        })));
                  },
                  className: `sidebar-menu-item__link ${e.classNames}`,
                },
                e.iconName &&
                  a.createElement(u.A, {
                    name: e.iconName,
                    className: "icon--menuitem",
                  }),
                a.createElement(
                  "div",
                  { className: "menuitem" },
                  a.createElement(
                    "span",
                    { className: "menuitem-label" },
                    e.label,
                  ),
                  !P(e, r) &&
                    a.createElement(
                      "span",
                      { className: "w-dismissible-badge" },
                      a.createElement(
                        "span",
                        { className: "w-sr-only" },
                        (0, c.AP)("(New)"),
                      ),
                    ),
                ),
              ),
            ),
          );
        };
        class v {
          name;
          label;
          url;
          attrs;
          iconName;
          classNames;
          constructor({
            name: e,
            label: t,
            url: n,
            attrs: a = {},
            icon_name: r = null,
            classname: i,
          }) {
            (this.name = e),
              (this.label = t),
              (this.url = n),
              (this.attrs = a),
              (this.iconName = r),
              (this.classNames = i);
          }
          render({ path: e, slim: t, state: n, dispatch: r, navigate: i }) {
            return a.createElement(g, {
              key: this.name,
              item: this,
              path: e,
              slim: t,
              state: n,
              dispatch: r,
              navigate: i,
            });
          }
        }
        const b = ({
            isVisible: e,
            isOpen: t,
            depth: n,
            widthPx: r,
            children: i,
          }) => {
            const s =
              "sidebar-panel" +
              (e ? " sidebar-panel--visible" : "") +
              (t ? " sidebar-panel--open" : "");
            let o = 2 * -n;
            e && !t && (o -= 1);
            const l = { "--z-index": o };
            return (
              r && (l["--width"] = r + "px"),
              a.createElement("div", { className: s, style: l }, i)
            );
          },
          E = ({
            path: e,
            item: t,
            slim: n,
            state: r,
            dispatch: i,
            navigate: s,
          }) => {
            const o = r.navigationPath.startsWith(e),
              l = o || r.activePath.startsWith(e),
              d = e.split(".").length,
              [p, h] = a.useState(!1),
              [g, v] = a.useState(!1),
              E = t.menuItems.filter((e) => !P(e, r)).length;
            a.useEffect(() => {
              o
                ? h(!0)
                : !o &&
                  p &&
                  setTimeout(() => {
                    h(!1);
                  }, m);
            }, [o]);
            const w =
                "sidebar-menu-item sidebar-sub-menu-item" +
                (l ? " sidebar-menu-item--active" : "") +
                (o ? " sidebar-sub-menu-item--open" : ""),
              y =
                "sidebar-sub-menu-trigger-icon" +
                (o ? " sidebar-sub-menu-trigger-icon--open" : "");
            return a.createElement(
              "li",
              { className: w },
              a.createElement(
                f.Ay,
                { disabled: o || !n, content: t.label, placement: "right" },
                a.createElement(
                  "button",
                  {
                    ...t.attrs,
                    onClick: () => {
                      if (
                        (!g &&
                          E > 0 &&
                          i({ type: "set-dismissible-state", item: t }),
                        o)
                      ) {
                        const t = e.split(".");
                        t.pop();
                        const n = t.join(".");
                        i({ type: "set-navigation-path", path: n });
                      } else i({ type: "set-navigation-path", path: e }), v(!0);
                    },
                    className: `sidebar-menu-item__link ${t.classNames}`,
                    "aria-haspopup": "menu",
                    "aria-expanded": o ? "true" : "false",
                    type: "button",
                  },
                  t.iconName &&
                    a.createElement(u.A, {
                      name: t.iconName,
                      className: "icon--menuitem",
                    }),
                  a.createElement(
                    "span",
                    { className: "menuitem-label" },
                    t.label,
                  ),
                  E > 0 &&
                    !g &&
                    a.createElement(
                      "span",
                      {
                        className:
                          "w-dismissible-badge w-dismissible-badge--count",
                      },
                      a.createElement("span", { "aria-hidden": "true" }, E),
                      a.createElement(
                        "span",
                        { className: "w-sr-only" },
                        1 === E
                          ? (0, c.AP)("(1 new item in this menu)")
                          : (0, c.AP)(
                              "(%(number)s new items in this menu)",
                            ).replace("%(number)s", `${E}`),
                      ),
                    ),
                  a.createElement(u.A, { className: y, name: "arrow-right" }),
                ),
              ),
              a.createElement(
                b,
                { isVisible: p, isOpen: o, depth: d },
                a.createElement(
                  "div",
                  { className: "sidebar-sub-menu-panel" },
                  a.createElement(
                    "h2",
                    {
                      id: `wagtail-sidebar-submenu${e
                        .split(".")
                        .join("-")}-title`,
                      className: `${t.classNames} w-h4`,
                    },
                    t.iconName &&
                      a.createElement(u.A, {
                        name: t.iconName,
                        className: "icon--submenu-header",
                      }),
                    t.label,
                  ),
                  a.createElement(
                    "ul",
                    {
                      "aria-labelledby": `wagtail-sidebar-submenu${e
                        .split(".")
                        .join("-")}-title`,
                    },
                    _(e, t.menuItems, n, r, i, s),
                  ),
                  t.footerText &&
                    a.createElement(
                      "p",
                      { className: "sidebar-sub-menu-panel__footer" },
                      t.footerText,
                    ),
                ),
              ),
            );
          };
        class w {
          name;
          label;
          menuItems;
          attrs;
          iconName;
          classNames;
          footerText;
          constructor(
            {
              name: e,
              label: t,
              attrs: n = {},
              icon_name: a = null,
              classname: r,
              footer_text: i = "",
            },
            s,
          ) {
            (this.name = e),
              (this.label = t),
              (this.menuItems = s),
              (this.attrs = n),
              (this.iconName = a),
              (this.classNames = r),
              (this.footerText = i);
          }
          render({ path: e, slim: t, state: n, dispatch: r, navigate: i }) {
            return a.createElement(E, {
              key: this.name,
              item: this,
              path: e,
              slim: t,
              state: n,
              dispatch: r,
              navigate: i,
            });
          }
        }
        var y = n(2891),
          N = n(6508);
        function _(e, t, n, r, i, s) {
          return a.createElement(
            a.Fragment,
            null,
            t.map((t) =>
              t.render({
                path: `${e}.${t.name}`,
                slim: n,
                state: r,
                dispatch: i,
                navigate: s,
              }),
            ),
          );
        }
        function P(e, t) {
          return (
            !e.attrs["data-w-dismissible-id-value"] ||
            "data-w-dismissible-dismissed-value" in e.attrs ||
            t.dismissibles[e.name]
          );
        }
        function C(e, t) {
          e.forEach((e) => {
            e.attrs["data-w-dismissible-id-value"] && t(e),
              e instanceof w && C(e.menuItems, t);
          });
        }
        function S(e, t) {
          const n = { ...e };
          switch (t.type) {
            case "set-active-path":
              n.activePath = t.path;
              break;
            case "set-navigation-path":
              n.navigationPath = t.path;
              break;
            case "set-dismissible-state":
              n.dismissibles = (function (e, { item: t, value: n = !0 }) {
                const a = {};
                return (
                  C([t], (e) => {
                    a[e.attrs["data-w-dismissible-id-value"]] = n;
                  }),
                  Object.keys(a).length > 0 &&
                    ((r = a),
                    fetch(N.HE.ADMIN_URLS?.DISMISSIBLES, {
                      method: "PATCH",
                      headers: {
                        [N.HE.CSRF_HEADER_NAME]: N.HE.CSRF_TOKEN,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(r),
                      mode: "same-origin",
                    })),
                  { ...e.dismissibles, [t.name]: n }
                );
                var r;
              })(e, t);
          }
          return n;
        }
        function x(e) {
          const t = {};
          return (
            C(e, (e) => {
              t[e.attrs["data-w-dismissible-id-value"]] =
                "data-w-dismissible-dismissed-value" in e.attrs;
            }),
            t
          );
        }
        y.Controller, Boolean;
        const A = ({
            menuItems: e,
            accountMenuItems: t,
            user: n,
            expandingOrCollapsing: r,
            onHideMobile: i,
            slim: s,
            currentPath: o,
            navigate: l,
          }) => {
            const [m, d] = a.useReducer(S, {
                navigationPath: "",
                activePath: "",
                dismissibles: x(e),
              }),
              p = !s || r,
              h = m.navigationPath.startsWith(".account");
            a.useEffect(() => {
              s && h && d({ type: "set-navigation-path", path: "" });
            }, [s]),
              a.useEffect(() => {
                const n = [],
                  a = (e, t) => {
                    t.forEach((t) => {
                      const r = `${e}.${t.name}`;
                      t instanceof v
                        ? n.push([t.url, r])
                        : t instanceof w && a(r, t.menuItems);
                    });
                  };
                a("", e), a("", t);
                let r = null;
                n.forEach(([e, t]) => {
                  o.startsWith(e) &&
                    (null == r || e.length > r[0].length) &&
                    (r = [e, t]);
                });
                const i = r ? r[1] : "";
                i !== m.activePath && d({ type: "set-active-path", path: i });
              }, [o, e]),
              a.useEffect(() => {
                const e = (e) => {
                    "Escape" === e.key &&
                      (d({ type: "set-navigation-path", path: "" }),
                      "" === m.navigationPath && i());
                  },
                  t = (e) => {
                    const t = document.querySelector("[data-wagtail-sidebar]");
                    (t && t.contains(e.target)) ||
                      d({ type: "set-navigation-path", path: "" });
                  };
                return (
                  document.addEventListener("keydown", e),
                  document.addEventListener("mousedown", t),
                  document.addEventListener("touchend", t),
                  () => {
                    document.removeEventListener("keydown", e),
                      document.removeEventListener("mousedown", t),
                      document.removeEventListener("touchend", t);
                  }
                );
              }, []);
            const g =
              "sidebar-main-menu w-scrollbar-thin" +
              (h ? " sidebar-main-menu--open-footer" : "");
            return a.createElement(
              a.Fragment,
              null,
              a.createElement(
                "nav",
                { className: g, "aria-label": (0, c.AP)("Main menu") },
                a.createElement(
                  "ul",
                  { className: "sidebar-main-menu__list" },
                  _("", e, s, m, d, l),
                ),
              ),
              a.createElement(
                "div",
                {
                  className:
                    "sidebar-footer" +
                    (h ? " sidebar-footer--open" : "") +
                    (p ? " sidebar-footer--visible" : ""),
                },
                a.createElement(
                  f.Ay,
                  { disabled: !s, content: n.name, placement: "right" },
                  a.createElement(
                    "button",
                    {
                      className: `\n            ${
                        s ? "w-px-4" : "w-px-5"
                      }\n            sidebar-footer__account\n            w-bg-surface-menus\n            w-text-text-label-menus-default\n            w-flex\n            w-items-center\n            w-relative\n            w-w-full\n            w-appearance-none\n            w-border-0\n            w-overflow-hidden\n            w-py-3\n            hover:w-bg-surface-menu-item-active\n            focus:w-bg-surface-menu-item-active\n            w-transition`,
                      onClick: () => {
                        d(
                          h
                            ? { type: "set-navigation-path", path: "" }
                            : { type: "set-navigation-path", path: ".account" },
                        );
                      },
                      "aria-haspopup": "menu",
                      "aria-expanded": h ? "true" : "false",
                      type: "button",
                    },
                    a.createElement(
                      "div",
                      {
                        className:
                          "avatar avatar-on-dark w-flex-shrink-0 !w-w-[28px] !w-h-[28px]",
                      },
                      a.createElement("img", {
                        src: n.avatarUrl,
                        alt: "",
                        decoding: "async",
                        loading: "lazy",
                      }),
                    ),
                    a.createElement(
                      "div",
                      { className: "sidebar-footer__account-toggle" },
                      a.createElement(
                        "div",
                        {
                          className: "sidebar-footer__account-label w-label-3",
                        },
                        n.name,
                      ),
                      a.createElement(u.A, {
                        className:
                          "w-w-4 w-h-4 w-text-text-label-menus-default",
                        name: h ? "arrow-down" : "arrow-up",
                      }),
                    ),
                  ),
                ),
                a.createElement("ul", null, _("", t, s, m, d, l)),
              ),
            );
          },
          T = ({ item: e, slim: t, path: n, state: r, dispatch: i }) => {
            const s = r.activePath.startsWith(n),
              o = n.split(".").length > 2,
              l =
                "sidebar-menu-item" +
                (s ? " sidebar-menu-item--active" : "") +
                (o ? " sidebar-menu-item--in-sub-menu" : "");
            return a.createElement(
              "li",
              { className: l },
              a.createElement(
                f.Ay,
                { disabled: !t || o, content: e.label, placement: "right" },
                a.createElement(
                  "form",
                  { ...e.attrs, method: e.method, action: e.action },
                  a.createElement("input", {
                    type: "hidden",
                    name: "csrfmiddlewaretoken",
                    value: N.HE.CSRF_TOKEN,
                  }),
                  a.createElement(
                    "button",
                    {
                      type: "submit",
                      className: `sidebar-menu-item__link ${e.classNames}`,
                      onClick: (t) => {
                        t.ctrlKey ||
                          t.shiftKey ||
                          t.metaKey ||
                          (t.button && 0 !== t.button) ||
                          P(e, r) ||
                          i({ type: "set-dismissible-state", item: e });
                      },
                    },
                    e.iconName &&
                      a.createElement(u.A, {
                        name: e.iconName,
                        className: "icon--menuitem",
                      }),
                    a.createElement(
                      "span",
                      { className: "menuitem" },
                      a.createElement(
                        "span",
                        { className: "menuitem-label" },
                        e.label,
                      ),
                      !P(e, r) &&
                        a.createElement(
                          "span",
                          { className: "w-dismissible-badge" },
                          a.createElement(
                            "span",
                            { className: "w-sr-only" },
                            (0, c.AP)("(New)"),
                          ),
                        ),
                    ),
                  ),
                ),
              ),
            );
          };
        var O = n(9904),
          R = n(8168),
          k = n(8587),
          I = n(4146),
          L = n.n(I),
          M = n(4363),
          j = n(8661),
          D = n(4595),
          F = n(1458),
          $ = [
            "getDisplayName",
            "methodName",
            "renderCountProp",
            "shouldHandleStateChanges",
            "storeKey",
            "withRef",
            "forwardRef",
            "context",
          ],
          U = ["reactReduxForwardedRef"],
          H = [],
          G = [null, null];
        function q(e, t) {
          var n = e[1];
          return [t.payload, n + 1];
        }
        function K(e, t, n) {
          (0, D.E)(function () {
            return e.apply(void 0, t);
          }, n);
        }
        function B(e, t, n, a, r, i, s) {
          (e.current = a),
            (t.current = r),
            (n.current = !1),
            i.current && ((i.current = null), s());
        }
        function W(e, t, n, a, r, i, s, o, l, c) {
          if (e) {
            var u = !1,
              m = null,
              d = function () {
                if (!u) {
                  var e,
                    n,
                    d = t.getState();
                  try {
                    e = a(d, r.current);
                  } catch (e) {
                    (n = e), (m = e);
                  }
                  n || (m = null),
                    e === i.current
                      ? s.current || l()
                      : ((i.current = e),
                        (o.current = e),
                        (s.current = !0),
                        c({ type: "STORE_UPDATED", payload: { error: n } }));
                }
              };
            return (
              (n.onStateChange = d),
              n.trySubscribe(),
              d(),
              function () {
                if (((u = !0), n.tryUnsubscribe(), (n.onStateChange = null), m))
                  throw m;
              }
            );
          }
        }
        var V = function () {
          return [null, 0];
        };
        function X(e, t) {
          void 0 === t && (t = {});
          var n = t,
            i = n.getDisplayName,
            s =
              void 0 === i
                ? function (e) {
                    return "ConnectAdvanced(" + e + ")";
                  }
                : i,
            o = n.methodName,
            l = void 0 === o ? "connectAdvanced" : o,
            c = n.renderCountProp,
            u = void 0 === c ? void 0 : c,
            m = n.shouldHandleStateChanges,
            d = void 0 === m || m,
            p = n.storeKey,
            h = void 0 === p ? "store" : p,
            f = (n.withRef, n.forwardRef),
            g = void 0 !== f && f,
            v = n.context,
            b = void 0 === v ? F.t : v,
            E = (0, k.A)(n, $),
            w = b;
          return function (t) {
            var n = t.displayName || t.name || "Component",
              i = s(n),
              o = (0, R.A)({}, E, {
                getDisplayName: s,
                methodName: l,
                renderCountProp: u,
                shouldHandleStateChanges: d,
                storeKey: h,
                displayName: i,
                wrappedComponentName: n,
                WrappedComponent: t,
              }),
              c = E.pure,
              m = c
                ? a.useMemo
                : function (e) {
                    return e();
                  };
            function p(n) {
              var i = (0, a.useMemo)(
                  function () {
                    var e = n.reactReduxForwardedRef,
                      t = (0, k.A)(n, U);
                    return [n.context, e, t];
                  },
                  [n],
                ),
                s = i[0],
                l = i[1],
                c = i[2],
                u = (0, a.useMemo)(
                  function () {
                    return s &&
                      s.Consumer &&
                      (0, M.isContextConsumer)(
                        r().createElement(s.Consumer, null),
                      )
                      ? s
                      : w;
                  },
                  [s, w],
                ),
                p = (0, a.useContext)(u),
                h =
                  Boolean(n.store) &&
                  Boolean(n.store.getState) &&
                  Boolean(n.store.dispatch);
              Boolean(p) && Boolean(p.store);
              var f = h ? n.store : p.store,
                g = (0, a.useMemo)(
                  function () {
                    return (function (t) {
                      return e(t.dispatch, o);
                    })(f);
                  },
                  [f],
                ),
                v = (0, a.useMemo)(
                  function () {
                    if (!d) return G;
                    var e = (0, j.K)(f, h ? null : p.subscription),
                      t = e.notifyNestedSubs.bind(e);
                    return [e, t];
                  },
                  [f, h, p],
                ),
                b = v[0],
                E = v[1],
                y = (0, a.useMemo)(
                  function () {
                    return h ? p : (0, R.A)({}, p, { subscription: b });
                  },
                  [h, p, b],
                ),
                N = (0, a.useReducer)(q, H, V),
                _ = N[0][0],
                P = N[1];
              if (_ && _.error) throw _.error;
              var C = (0, a.useRef)(),
                S = (0, a.useRef)(c),
                x = (0, a.useRef)(),
                A = (0, a.useRef)(!1),
                T = m(
                  function () {
                    return x.current && c === S.current
                      ? x.current
                      : g(f.getState(), c);
                  },
                  [f, _, c],
                );
              K(B, [S, C, A, c, T, x, E]),
                K(W, [d, f, b, g, S, C, A, x, E, P], [f, b, g]);
              var O = (0, a.useMemo)(
                function () {
                  return r().createElement(t, (0, R.A)({}, T, { ref: l }));
                },
                [l, t, T],
              );
              return (0, a.useMemo)(
                function () {
                  return d ? r().createElement(u.Provider, { value: y }, O) : O;
                },
                [u, O, y],
              );
            }
            var f = c ? r().memo(p) : p;
            if (
              ((f.WrappedComponent = t), (f.displayName = p.displayName = i), g)
            ) {
              var v = r().forwardRef(function (e, t) {
                return r().createElement(
                  f,
                  (0, R.A)({}, e, { reactReduxForwardedRef: t }),
                );
              });
              return (v.displayName = i), (v.WrappedComponent = t), L()(v, t);
            }
            return L()(f, t);
          };
        }
        var z = n(9124),
          Z = n(7684),
          J = n(6778);
        const Q = [
            function (e) {
              return "function" == typeof e
                ? (0, J.Qb)(e, "mapDispatchToProps")
                : void 0;
            },
            function (e) {
              return e
                ? void 0
                : (0, J.o6)(function (e) {
                    return { dispatch: e };
                  });
            },
            function (e) {
              return e && "object" == typeof e
                ? (0, J.o6)(function (t) {
                    return (0, Z.A)(e, t);
                  })
                : void 0;
            },
          ],
          Y = [
            function (e) {
              return "function" == typeof e
                ? (0, J.Qb)(e, "mapStateToProps")
                : void 0;
            },
            function (e) {
              return e
                ? void 0
                : (0, J.o6)(function () {
                    return {};
                  });
            },
          ];
        function ee(e, t, n) {
          return (0, R.A)({}, n, e, t);
        }
        const te = [
          function (e) {
            return "function" == typeof e
              ? (function (e) {
                  return function (t, n) {
                    n.displayName;
                    var a,
                      r = n.pure,
                      i = n.areMergedPropsEqual,
                      s = !1;
                    return function (t, n, o) {
                      var l = e(t, n, o);
                      return (
                        s ? (r && i(l, a)) || (a = l) : ((s = !0), (a = l)), a
                      );
                    };
                  };
                })(e)
              : void 0;
          },
          function (e) {
            return e
              ? void 0
              : function () {
                  return ee;
                };
          },
        ];
        var ne = [
          "initMapStateToProps",
          "initMapDispatchToProps",
          "initMergeProps",
        ];
        function ae(e, t, n, a) {
          return function (r, i) {
            return n(e(r, i), t(a, i), i);
          };
        }
        function re(e, t, n, a, r) {
          var i,
            s,
            o,
            l,
            c,
            u = r.areStatesEqual,
            m = r.areOwnPropsEqual,
            d = r.areStatePropsEqual,
            p = !1;
          return function (r, h) {
            return p
              ? (function (r, p) {
                  var h,
                    f,
                    g = !m(p, s),
                    v = !u(r, i);
                  return (
                    (i = r),
                    (s = p),
                    g && v
                      ? ((o = e(i, s)),
                        t.dependsOnOwnProps && (l = t(a, s)),
                        (c = n(o, l, s)))
                      : g
                      ? (e.dependsOnOwnProps && (o = e(i, s)),
                        t.dependsOnOwnProps && (l = t(a, s)),
                        (c = n(o, l, s)))
                      : v
                      ? ((h = e(i, s)),
                        (f = !d(h, o)),
                        (o = h),
                        f && (c = n(o, l, s)),
                        c)
                      : c
                  );
                })(r, h)
              : ((o = e((i = r), (s = h))),
                (l = t(a, s)),
                (c = n(o, l, s)),
                (p = !0),
                c);
          };
        }
        function ie(e, t) {
          var n = t.initMapStateToProps,
            a = t.initMapDispatchToProps,
            r = t.initMergeProps,
            i = (0, k.A)(t, ne),
            s = n(e, i),
            o = a(e, i),
            l = r(e, i);
          return (i.pure ? re : ae)(s, o, l, e, i);
        }
        var se = [
          "pure",
          "areStatesEqual",
          "areOwnPropsEqual",
          "areStatePropsEqual",
          "areMergedPropsEqual",
        ];
        function oe(e, t, n) {
          for (var a = t.length - 1; a >= 0; a--) {
            var r = t[a](e);
            if (r) return r;
          }
          return function (t, a) {
            throw new Error(
              "Invalid value of type " +
                typeof e +
                " for " +
                n +
                " argument when connecting component " +
                a.wrappedComponentName +
                ".",
            );
          };
        }
        function le(e, t) {
          return e === t;
        }
        function ce(e) {
          var t = void 0 === e ? {} : e,
            n = t.connectHOC,
            a = void 0 === n ? X : n,
            r = t.mapStateToPropsFactories,
            i = void 0 === r ? Y : r,
            s = t.mapDispatchToPropsFactories,
            o = void 0 === s ? Q : s,
            l = t.mergePropsFactories,
            c = void 0 === l ? te : l,
            u = t.selectorFactory,
            m = void 0 === u ? ie : u;
          return function (e, t, n, r) {
            void 0 === r && (r = {});
            var s = r,
              l = s.pure,
              u = void 0 === l || l,
              d = s.areStatesEqual,
              p = void 0 === d ? le : d,
              h = s.areOwnPropsEqual,
              f = void 0 === h ? z.A : h,
              g = s.areStatePropsEqual,
              v = void 0 === g ? z.A : g,
              b = s.areMergedPropsEqual,
              E = void 0 === b ? z.A : b,
              w = (0, k.A)(s, se),
              y = oe(e, i, "mapStateToProps"),
              N = oe(t, o, "mapDispatchToProps"),
              _ = oe(n, c, "mergeProps");
            return a(
              m,
              (0, R.A)(
                {
                  methodName: "connect",
                  getDisplayName: function (e) {
                    return "Connect(" + e + ")";
                  },
                  shouldHandleStateChanges: Boolean(e),
                  initMapStateToProps: y,
                  initMapDispatchToProps: N,
                  initMergeProps: _,
                  pure: u,
                  areStatesEqual: p,
                  areOwnPropsEqual: f,
                  areStatePropsEqual: v,
                  areMergedPropsEqual: E,
                },
                w,
              ),
            );
          };
        }
        const ue = ce();
        n(6338), n(3769), n(387);
        var me = n(2724);
        function de(e) {
          return (
            (de =
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
            de(e)
          );
        }
        function pe(e) {
          var t = (function (e, t) {
            if ("object" !== de(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var a = n.call(e, "string");
              if ("object" !== de(a)) return a;
              throw new TypeError(
                "@@toPrimitive must return a primitive value.",
              );
            }
            return String(e);
          })(e);
          return "symbol" === de(t) ? t : String(t);
        }
        function he(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            t &&
              (a = a.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, a);
          }
          return n;
        }
        function fe(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? he(Object(n), !0).forEach(function (t) {
                  var a, r, i;
                  (a = e),
                    (r = t),
                    (i = n[t]),
                    (r = pe(r)) in a
                      ? Object.defineProperty(a, r, {
                          value: i,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (a[r] = i);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : he(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t),
                  );
                });
          }
          return e;
        }
        function ge(e) {
          return (
            "Minified Redux error #" +
            e +
            "; visit https://redux.js.org/Errors?code=" +
            e +
            " for the full message or use the non-minified dev environment for full errors. "
          );
        }
        (0, n(8298).d)(me.r);
        var ve =
            ("function" == typeof Symbol && Symbol.observable) ||
            "@@observable",
          be = function () {
            return Math.random().toString(36).substring(7).split("").join(".");
          },
          Ee = {
            INIT: "@@redux/INIT" + be(),
            REPLACE: "@@redux/REPLACE" + be(),
            PROBE_UNKNOWN_ACTION: function () {
              return "@@redux/PROBE_UNKNOWN_ACTION" + be();
            },
          };
        function we(e, t, n) {
          var a;
          if (
            ("function" == typeof t && "function" == typeof n) ||
            ("function" == typeof n && "function" == typeof arguments[3])
          )
            throw new Error(ge(0));
          if (
            ("function" == typeof t && void 0 === n && ((n = t), (t = void 0)),
            void 0 !== n)
          ) {
            if ("function" != typeof n) throw new Error(ge(1));
            return n(we)(e, t);
          }
          if ("function" != typeof e) throw new Error(ge(2));
          var r = e,
            i = t,
            s = [],
            o = s,
            l = !1;
          function c() {
            o === s && (o = s.slice());
          }
          function u() {
            if (l) throw new Error(ge(3));
            return i;
          }
          function m(e) {
            if ("function" != typeof e) throw new Error(ge(4));
            if (l) throw new Error(ge(5));
            var t = !0;
            return (
              c(),
              o.push(e),
              function () {
                if (t) {
                  if (l) throw new Error(ge(6));
                  (t = !1), c();
                  var n = o.indexOf(e);
                  o.splice(n, 1), (s = null);
                }
              }
            );
          }
          function d(e) {
            if (
              !(function (e) {
                if ("object" != typeof e || null === e) return !1;
                for (var t = e; null !== Object.getPrototypeOf(t); )
                  t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t;
              })(e)
            )
              throw new Error(ge(7));
            if (void 0 === e.type) throw new Error(ge(8));
            if (l) throw new Error(ge(9));
            try {
              (l = !0), (i = r(i, e));
            } finally {
              l = !1;
            }
            for (var t = (s = o), n = 0; n < t.length; n++) (0, t[n])();
            return e;
          }
          return (
            d({ type: Ee.INIT }),
            ((a = {
              dispatch: d,
              subscribe: m,
              getState: u,
              replaceReducer: function (e) {
                if ("function" != typeof e) throw new Error(ge(10));
                (r = e), d({ type: Ee.REPLACE });
              },
            })[ve] = function () {
              var e,
                t = m;
              return (
                ((e = {
                  subscribe: function (e) {
                    if ("object" != typeof e || null === e)
                      throw new Error(ge(11));
                    function n() {
                      e.next && e.next(u());
                    }
                    return n(), { unsubscribe: t(n) };
                  },
                })[ve] = function () {
                  return this;
                }),
                e
              );
            }),
            a
          );
        }
        function ye() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return 0 === t.length
            ? function (e) {
                return e;
              }
            : 1 === t.length
            ? t[0]
            : t.reduce(function (e, t) {
                return function () {
                  return e(t.apply(void 0, arguments));
                };
              });
        }
        function Ne(e) {
          return function (t) {
            var n = t.dispatch,
              a = t.getState;
            return function (t) {
              return function (r) {
                return "function" == typeof r ? r(n, a, e) : t(r);
              };
            };
          };
        }
        var _e = Ne();
        _e.withExtraArgument = Ne;
        const Pe = _e,
          { fetch: Ce, Headers: Se } = n.g,
          xe = (e) => {
            if (e.status >= 200 && e.status < 300) return e;
            throw new Error(e.statusText);
          },
          Ae = (e) => e.json(),
          Te = (e) =>
            ((e, t) => {
              const n = {
                credentials: "same-origin",
                headers: new Se({
                  Accept: "application/json",
                  "Content-Type": "application/json",
                }),
                method: e,
              };
              return ((a = Ce(t, n)),
              new Promise((e, t) => {
                const n = setTimeout(() => {
                  t(new Error("Response timeout"));
                }, 15e3);
                a.then(
                  (t) => {
                    clearTimeout(n), e(t);
                  },
                  (e) => {
                    clearTimeout(n), t(e);
                  },
                );
              }))
                .then(xe)
                .then(Ae);
              var a;
            })("GET", e),
          Oe = (e, t = {}) => {
            let n = `${N.lb.PAGES}?child_of=${e}&for_explorer=1`;
            return (
              t.fields
                ? (n += `&fields=parent,${window.encodeURIComponent(
                    t.fields.join(","),
                  )}`)
                : (n += "&fields=parent"),
              t.onlyWithChildren && (n += "&has_children=1"),
              t.offset && (n += `&offset=${t.offset}`),
              (n += N.lb.EXTRA_CHILDREN_PARAMETERS),
              Te(n)
            );
          },
          Re = (e, t = {}) => {
            let a = `${N.lb.PAGES}?translation_of=${e}&limit=20`;
            return (
              t.fields
                ? (a += `&fields=parent,${n.g.encodeURIComponent(
                    t.fields.join(","),
                  )}`)
                : (a += "&fields=parent"),
              t.onlyWithChildren && (a += "&has_children=1"),
              t.offset && (a += `&offset=${t.offset}`),
              Te(a)
            );
          },
          ke = async (e, t) => {
            const n = [];
            let a = 100;
            for (;;) {
              const r = await Re(e, { offset: n.length, ...t });
              if (
                (r.items.forEach((e) => n.push(e)),
                n.length >= r.meta.total_count || a-- <= 0)
              )
                return n;
            }
          },
          Ie = (...e) => e[0];
        function Le(e, t, n) {
          return (...a) => {
            const r = { type: e, payload: (t || Ie)(...a) };
            return (
              r.payload instanceof Error && (r.error = !0),
              "function" == typeof n && (r.meta = n(...a)),
              r
            );
          };
        }
        const Me = Le("GET_PAGE_SUCCESS", (e, t) => ({ id: e, data: t })),
          je = Le("GET_PAGE_FAILURE", (e, t) => ({ id: e, error: t })),
          De = Le("GET_CHILDREN_START", (e) => ({ id: e })),
          Fe = Le("GET_CHILDREN_SUCCESS", (e, t, n) => ({
            id: e,
            items: t,
            meta: n,
          })),
          $e = Le("GET_CHILDREN_FAILURE", (e, t) => ({ id: e, error: t }));
        function Ue(e, t = 0) {
          return (n) => (
            n(De(e)),
            Oe(e, { offset: t }).then(
              ({ items: a, meta: r }) => {
                const i = t + a.length;
                n(Fe(e, a, r)), i < r.total_count && i < N.KV && n(Ue(e, i));
              },
              (t) => {
                n($e(e, t));
              },
            )
          );
        }
        const He = Le("GET_TRANSLATIONS_START", (e) => ({ id: e })),
          Ge = Le("GET_TRANSLATIONS_SUCCESS", (e, t) => ({ id: e, items: t })),
          qe = Le("GET_TRANSLATIONS_FAILURE", (e, t) => ({ id: e, error: t }));
        function Ke(e) {
          return (t) => (
            t(He(e)),
            ke(e, { onlyWithChildren: !0 }).then(
              (n) => {
                t(Ge(e, n));
              },
              (n) => {
                t(qe(e, n));
              },
            )
          );
        }
        const Be = Le("OPEN_EXPLORER", (e) => ({ id: e })),
          We = Le("CLOSE_EXPLORER");
        function Ve(e) {
          return (t, n) => {
            const { nodes: a } = n(),
              r = a[e];
            t(Be(e)),
              r || (t(Ue(e)), 1 !== e && t(Ke(e))),
              1 !== e &&
                t(
                  (function (e) {
                    return (t) =>
                      ((e) => {
                        const t = `${N.lb.PAGES}${e}/`;
                        return Te(t);
                      })(e).then(
                        (n) => {
                          t(Me(e, n));
                        },
                        (n) => {
                          t(je(e, n));
                        },
                      );
                  })(e),
                );
          };
        }
        const Xe = Le("GOTO_PAGE", (e, t) => ({ id: e, transition: t }));
        var ze = n(1688),
          Ze = n.n(ze);
        const Je = () =>
          r().createElement(
            "span",
            null,
            r().createElement(u.A, { name: "spinner", className: "w-spinner" }),
            ` ${(0, c.AP)("Loading…")}`,
          );
        var Qe = n(5556),
          Ye = n.n(Qe),
          et = n(862),
          tt = n.n(et);
        const nt = "push",
          at = ({
            name: e,
            component: t,
            className: n,
            duration: a,
            children: i,
          }) =>
            r().createElement(
              tt(),
              {
                component: t,
                transitionEnterTimeout: a,
                transitionLeaveTimeout: a,
                transitionName: `w-transition-${e}`,
                className: n,
              },
              i,
            );
        (at.propTypes = {
          name: Ye().oneOf([nt, "pop"]).isRequired,
          component: Ye().string,
          className: Ye().string,
          duration: Ye().number,
          children: Ye().node,
        }),
          (at.defaultProps = {
            component: "div",
            children: null,
            className: null,
            duration: 210,
          });
        const rt = at,
          it = (e, t, n, a, r) => {
            n && "#" === e && (r.preventDefault(), r.stopPropagation()),
              t && t(r),
              r.ctrlKey ||
                r.shiftKey ||
                r.metaKey ||
                (r.button && 0 !== r.button) ||
                (a && !r.defaultPrevented && (r.preventDefault(), a(e)));
          },
          st = ({
            className: e = "",
            children: t,
            accessibleLabel: n,
            href: r = "#",
            target: i,
            preventDefault: s = !0,
            onClick: o,
            navigate: l,
          }) => {
            const c = a.Children.count(t) > 0,
              u = n
                ? a.createElement("span", { className: "w-sr-only" }, n)
                : null;
            return a.createElement(
              "a",
              {
                className: e,
                onClick: it.bind(null, r, o, s, l),
                rel: "_blank" === i ? "noreferrer" : void 0,
                href: r,
                target: i,
              },
              c ? t : u,
            );
          },
          ot = ({ locale: e, translations: t, gotoPage: n }) => {
            const a = wagtailConfig.LOCALES.filter(
              ({ code: n }) => n === e || t.get(n),
            ).map(({ code: e, display_name: t }) =>
              r().createElement("option", { key: e, value: e }, t),
            );
            return r().createElement(
              "div",
              { className: "c-page-explorer__header__select" },
              r().createElement(
                "select",
                {
                  value: e,
                  onChange: (e) => {
                    e.preventDefault();
                    const a = t.get(e.target.value);
                    a && n(a, 0);
                  },
                  disabled: a.length < 2,
                },
                a,
              ),
            );
          },
          lt = ({
            page: e,
            depth: t,
            onClick: n,
            gotoPage: a,
            navigate: i,
          }) => {
            const s = 0 === t,
              o = 0 === e.id;
            return r().createElement(
              "div",
              { className: "c-page-explorer__header" },
              r().createElement(
                st,
                {
                  href: o ? N.HS.PAGES : `${N.HS.PAGES}${e.id}/`,
                  className: "c-page-explorer__header__title",
                  onClick: n,
                  navigate: i,
                },
                r().createElement(
                  "div",
                  { className: "c-page-explorer__header__title__inner" },
                  r().createElement(u.A, {
                    name: s ? "home" : "arrow-left",
                    className: "icon--explorer-header",
                  }),
                  r().createElement(
                    "span",
                    null,
                    e.admin_display_title || (0, c.AP)("Pages"),
                  ),
                ),
              ),
              !o &&
                e.meta.locale &&
                e.translations &&
                e.translations.size > 0 &&
                r().createElement(ot, {
                  locale: e.meta.locale,
                  translations: e.translations,
                  gotoPage: a,
                }),
            );
          },
          ct = ({ status: e }) =>
            r().createElement(
              "span",
              { className: "c-status" + (e.live ? " c-status--live" : "") },
              e.status,
            );
        ct.propTypes = {
          status: Ye().shape({
            live: Ye().bool.isRequired,
            status: Ye().string.isRequired,
          }).isRequired,
        };
        const ut = ct,
          mt = r().createElement(u.A, {
            name: "folder-inverse",
            className: "icon--menuitem",
          }),
          dt = ({ item: e, onClick: t, navigate: n }) => {
            const { id: a, admin_display_title: i, meta: s } = e,
              o = s.children.count > 0,
              l = s.status.live && !s.status.has_unpublished_changes,
              m =
                1 === s.parent?.id &&
                s.locale &&
                (N.kf.get(s.locale) || s.locale);
            return r().createElement(
              "div",
              { className: "c-page-explorer__item" },
              r().createElement(
                st,
                {
                  href: `${N.HS.PAGES}${a}/`,
                  navigate: n,
                  className: "c-page-explorer__item__link",
                },
                o ? mt : null,
                r().createElement(
                  "h3",
                  { className: "c-page-explorer__item__title" },
                  i,
                ),
                (!l || m) &&
                  r().createElement(
                    "span",
                    { className: "c-page-explorer__meta" },
                    m &&
                      r().createElement("span", { className: "c-status" }, m),
                    !l && r().createElement(ut, { status: s.status }),
                  ),
              ),
              r().createElement(
                st,
                {
                  href: `${N.HS.PAGES}${a}/edit/`,
                  className:
                    "c-page-explorer__item__action c-page-explorer__item__action--small",
                  navigate: n,
                },
                r().createElement(u.A, {
                  name: "edit",
                  title: (0, c.AP)("Edit '%(title)s'").replace(
                    "%(title)s",
                    i || "",
                  ),
                  className: "icon--item-action",
                }),
              ),
              o
                ? r().createElement(
                    st,
                    {
                      className: "c-page-explorer__item__action",
                      onClick: t,
                      href: `${N.HS.PAGES}${a}/`,
                      navigate: n,
                    },
                    r().createElement(u.A, {
                      name: "arrow-right",
                      title: (0, c.AP)(
                        "View child pages of '%(title)s'",
                      ).replace("%(title)s", i || ""),
                      className: "icon--item-action",
                    }),
                  )
                : null,
            );
          },
          pt = ({ page: e }) => {
            const t = e.children.count;
            return r().createElement(
              "a",
              {
                href: `${N.HS.PAGES}${e.id}/`,
                className: "c-page-explorer__see-more",
              },
              (0, c.AP)("See all"),
              r().createElement(
                "span",
                null,
                ` ${t} ${
                  1 === t
                    ? (0, c.AP)("Page").toLowerCase()
                    : (0, c.AP)("Pages").toLowerCase()
                }`,
              ),
              r().createElement(u.A, { name: "arrow-right" }),
            );
          };
        class ht extends r().Component {
          constructor(e) {
            super(e),
              (this.state = { transition: nt }),
              (this.onItemClick = this.onItemClick.bind(this)),
              (this.onHeaderClick = this.onHeaderClick.bind(this));
          }
          componentWillReceiveProps(e) {
            const { depth: t } = this.props,
              n = e.depth > t;
            this.setState({ transition: n ? nt : "pop" });
          }
          onItemClick(e, t) {
            const { gotoPage: n } = this.props;
            t.preventDefault(), t.stopPropagation(), n(e, 1);
          }
          onHeaderClick(e) {
            const { page: t, depth: n, gotoPage: a } = this.props,
              r = t.meta.parent?.id;
            n > 0 && r && (e.preventDefault(), e.stopPropagation(), a(r, -1));
          }
          renderChildren() {
            const { page: e, nodes: t } = this.props;
            let n;
            return (
              (n =
                e.isFetchingChildren || e.children.items
                  ? r().createElement(
                      "div",
                      { key: "children" },
                      e.children.items.map((e) =>
                        r().createElement(dt, {
                          key: e,
                          item: t[e],
                          onClick: this.onItemClick.bind(null, e),
                          navigate: this.props.navigate,
                        }),
                      ),
                    )
                  : r().createElement(
                      "div",
                      {
                        key: "empty",
                        className: "c-page-explorer__placeholder",
                      },
                      (0, c.AP)("No results"),
                    )),
              r().createElement(
                "div",
                { className: "c-page-explorer__drawer" },
                n,
                e.isFetchingChildren || e.isFetchingTranslations
                  ? r().createElement(
                      "div",
                      {
                        key: "fetching",
                        className: "c-page-explorer__placeholder",
                      },
                      r().createElement(Je, null),
                    )
                  : null,
                e.isError
                  ? r().createElement(
                      "div",
                      {
                        key: "error",
                        className: "c-page-explorer__placeholder",
                      },
                      (0, c.AP)("Server Error"),
                    )
                  : null,
              )
            );
          }
          render() {
            const { page: e, depth: t, gotoPage: n, onClose: a } = this.props,
              { transition: i } = this.state;
            return r().createElement(
              Ze(),
              {
                paused: !e || e.isFetchingChildren || e.isFetchingTranslations,
                focusTrapOptions: {
                  onDeactivate: a,
                  clickOutsideDeactivates: !1,
                  allowOutsideClick: !0,
                },
              },
              r().createElement(
                "div",
                { role: "dialog", "aria-label": (0, c.AP)("Page explorer") },
                r().createElement(
                  rt,
                  { name: i, className: "c-page-explorer" },
                  r().createElement(
                    "div",
                    { key: t, className: "w-transition-group" },
                    r().createElement(lt, {
                      depth: t,
                      page: e,
                      onClick: this.onHeaderClick,
                      gotoPage: n,
                      navigate: this.props.navigate,
                    }),
                    this.renderChildren(),
                    e.isError || (e.children.items && e.children.count > N.KV)
                      ? r().createElement(pt, { page: e })
                      : null,
                  ),
                ),
              ),
            );
          }
        }
        const ft = ht,
          gt = ue(
            (e) => ({
              depth: e.explorer.depth,
              currentPageId: e.explorer.currentPageId,
              nodes: e.nodes,
            }),
            (e) => ({
              gotoPage: (t, n) =>
                e(
                  (function (e, t) {
                    return (n, a) => {
                      const { nodes: r } = a(),
                        i = r[e];
                      n(Xe(e, t)),
                        !i ||
                          i.isFetchingChildren ||
                          i.children.count > 0 ||
                          n(Ue(e)),
                        i &&
                          !i.isFetchingTranslations &&
                          null == i.translations &&
                          n(Ke(e));
                    };
                  })(t, n),
                ),
            }),
          )(
            ({
              isVisible: e,
              depth: t,
              currentPageId: n,
              nodes: a,
              gotoPage: i,
              onClose: s,
              navigate: o,
            }) =>
              e && n
                ? r().createElement(ft, {
                    depth: t,
                    page: a[n],
                    nodes: a,
                    gotoPage: i,
                    onClose: s,
                    navigate: o,
                  })
                : null,
          ),
          vt = { depth: 0, currentPageId: null },
          bt = "OPEN_EXPLORER",
          Et = "CLOSE_EXPLORER";
        function wt(e = vt, t) {
          switch (t.type) {
            case bt:
              return { depth: 0, currentPageId: t.payload.id };
            case Et:
              return vt;
            case "GOTO_PAGE":
              return {
                depth: e.depth + t.payload.transition,
                currentPageId: t.payload.id,
              };
            default:
              return e;
          }
        }
        const yt = {
            id: 0,
            isFetchingChildren: !1,
            isFetchingTranslations: !1,
            isError: !1,
            children: { items: [], count: 0 },
            meta: {
              status: { status: "", live: !1, has_unpublished_changes: !0 },
              parent: null,
              children: {},
            },
          },
          Nt = "GET_PAGE_SUCCESS",
          _t = "GET_CHILDREN_START",
          Pt = "GET_CHILDREN_SUCCESS",
          Ct = "GET_TRANSLATIONS_START",
          St = "GET_TRANSLATIONS_SUCCESS",
          xt = "GET_PAGE_FAILURE",
          At = "GET_CHILDREN_FAILURE",
          Tt = "GET_TRANSLATIONS_FAILURE",
          Ot = (e = yt, t) => {
            switch (t.type) {
              case Nt:
                return { ...e, ...t.payload.data, isError: !1 };
              case _t:
                return { ...e, isFetchingChildren: !0 };
              case Ct:
                return { ...e, isFetchingTranslations: !0 };
              case Pt:
                return {
                  ...e,
                  isFetchingChildren: !1,
                  isError: !1,
                  children: {
                    items: e.children.items
                      .slice()
                      .concat(t.payload.items.map((e) => e.id)),
                    count: t.payload.meta.total_count,
                  },
                };
              case St:
                const n = new Map();
                return (
                  t.payload.items.forEach((e) => {
                    n.set(e.meta.locale, e.id);
                  }),
                  {
                    ...e,
                    isFetchingTranslations: !1,
                    isError: !1,
                    translations: n,
                  }
                );
              case xt:
              case At:
              case Tt:
                return {
                  ...e,
                  isFetchingChildren: !1,
                  isFetchingTranslations: !0,
                  isError: !0,
                };
              default:
                return e;
            }
          },
          Rt = {};
        function kt(e = Rt, t) {
          switch (t.type) {
            case bt:
              return { ...e, [t.payload.id]: { ...yt } };
            case Nt:
            case _t:
            case Ct:
            case xt:
            case At:
            case Tt:
              return { ...e, [t.payload.id]: Ot(e[t.payload.id], t) };
            case Pt:
            case St:
              const n = { ...e, [t.payload.id]: Ot(e[t.payload.id], t) };
              return (
                t.payload.items.forEach((e) => {
                  n[e.id] = { ...yt, ...e };
                }),
                n
              );
            case Et:
              return Rt;
            default:
              return e;
          }
        }
        const It = () =>
            we(
              (function (e) {
                for (var t = Object.keys(e), n = {}, a = 0; a < t.length; a++) {
                  var r = t[a];
                  "function" == typeof e[r] && (n[r] = e[r]);
                }
                var i,
                  s = Object.keys(n);
                try {
                  !(function (e) {
                    Object.keys(e).forEach(function (t) {
                      var n = e[t];
                      if (void 0 === n(void 0, { type: Ee.INIT }))
                        throw new Error(ge(12));
                      if (
                        void 0 ===
                        n(void 0, { type: Ee.PROBE_UNKNOWN_ACTION() })
                      )
                        throw new Error(ge(13));
                    });
                  })(n);
                } catch (e) {
                  i = e;
                }
                return function (e, t) {
                  if ((void 0 === e && (e = {}), i)) throw i;
                  for (var a = !1, r = {}, o = 0; o < s.length; o++) {
                    var l = s[o],
                      c = n[l],
                      u = e[l],
                      m = c(u, t);
                    if (void 0 === m) throw (t && t.type, new Error(ge(14)));
                    (r[l] = m), (a = a || m !== u);
                  }
                  return (a = a || s.length !== Object.keys(e).length) ? r : e;
                };
              })({ explorer: wt, nodes: kt }),
              {},
              ye(
                (function () {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  return function (e) {
                    return function () {
                      var n = e.apply(void 0, arguments),
                        a = function () {
                          throw new Error(ge(15));
                        },
                        r = {
                          getState: n.getState,
                          dispatch: function () {
                            return a.apply(void 0, arguments);
                          },
                        },
                        i = t.map(function (e) {
                          return e(r);
                        });
                      return (
                        (a = ye.apply(void 0, i)(n.dispatch)),
                        fe(fe({}, n), {}, { dispatch: a })
                      );
                    };
                  };
                })(Pe),
                window.__REDUX_DEVTOOLS_EXTENSION__
                  ? window.__REDUX_DEVTOOLS_EXTENSION__()
                  : (e) => e,
              ),
            ),
          Lt = gt,
          Mt = ({
            path: e,
            slim: t,
            item: n,
            state: r,
            dispatch: i,
            navigate: s,
          }) => {
            const o = r.navigationPath.startsWith(e),
              l = o || r.activePath.startsWith(e),
              c = e.split(".").length,
              d = e.split(".").length > 2,
              [p, h] = a.useState(!1),
              g = a.useRef(null);
            g.current || (g.current = It());
            const v = () => {
              setTimeout(() => {
                h(!1), g.current && g.current.dispatch(We());
              }, m);
            };
            a.useEffect(() => {
              o
                ? (h(!0), g.current && g.current.dispatch(Ve(n.startPageId)))
                : !o && p && v();
            }, [o]);
            const E =
                "sidebar-menu-item sidebar-page-explorer-item" +
                (l ? " sidebar-menu-item--active" : "") +
                (d ? " sidebar-menu-item--in-sub-menu" : ""),
              w =
                "sidebar-sub-menu-trigger-icon" +
                (o ? " sidebar-sub-menu-trigger-icon--open" : "");
            return a.createElement(
              "li",
              { className: E },
              a.createElement(
                f.Ay,
                { disabled: o || !t, content: n.label, placement: "right" },
                a.createElement(
                  "button",
                  {
                    onClick: () => {
                      i(
                        o
                          ? { type: "set-navigation-path", path: "" }
                          : { type: "set-navigation-path", path: e },
                      );
                    },
                    className: "sidebar-menu-item__link",
                    "aria-haspopup": "dialog",
                    "aria-expanded": o ? "true" : "false",
                    type: "button",
                  },
                  a.createElement(u.A, {
                    name: "folder-open-inverse",
                    className: "icon--menuitem",
                  }),
                  a.createElement(
                    "span",
                    { className: "menuitem-label" },
                    n.label,
                  ),
                  a.createElement(u.A, { className: w, name: "arrow-right" }),
                ),
              ),
              a.createElement(
                "div",
                null,
                a.createElement(
                  b,
                  { isVisible: p, isOpen: o, depth: c, widthPx: 485 },
                  g.current &&
                    a.createElement(
                      O.A,
                      { store: g.current },
                      a.createElement(Lt, {
                        isVisible: p,
                        navigate: s,
                        onClose: v,
                      }),
                    ),
                ),
              ),
            );
          },
          jt = ({ className: e, slim: t }) => {
            const n =
              "group-hover:w-text-black w-transition-all w-duration-150";
            return r().createElement(
              "svg",
              {
                style: { left: t ? "-1.125rem" : "-1.75rem" },
                className: `\n         sidebar-wagtail-branding__icon\n         !w-overflow-visible\n         w-group\n         w-text-surface-menus\n         w-z-10\n         w-absolute\n         w-transition-all\n         w-duration-150\n         hover:w-scale-[0.85]\n         hover:w-rotate-[5deg]\n         ${
                  e || ""
                }\n         ${
                  t
                    ? "w-w-[58px] w-h-[57px] w-top-2 hover:w-translate-x-1 hover:-w-translate-y-1"
                    : "w-w-[120px] w-h-[200px] -w-top-1  hover:w-translate-x-2 hover:-w-translate-y-3"
                }\n      `,
                width: "225",
                height: "274",
                viewBox: "0 0 225 274",
                enableBackground: "new 0 0 225 274",
                xmlSpace: "preserve",
                "aria-hidden": "true",
              },
              r().createElement(
                "g",
                null,
                r().createElement("path", {
                  className: "wagtail-logo-face",
                  fill: "#FFF",
                  d: "M194.897 79.492c-8.392-12.793-22.602-21.27-38.773-21.27-5.322 0-10.496.915-15.32 2.62a30.755 30.755 0 0 1-4.039-15.3c0-17.078\n          13.325-30.792 29.918-30.792 4.274 0 8.046.776 11.565 2.328 1.746-2.566 3.491-5.64 5.236-9.476 7.108 4.095 19.786 14.99 21.26\n          33.397L190.72 61.88l4.177 17.612Z",
                }),
                r().createElement("path", {
                  className: `w-hidden ${n}`,
                  "data-part": "eye--closed",
                  d: "M183.083 36.4189C181.131 37.0166 179.364 38.6306 178.317 40.5186C178.048 41.0035 177.464 41.2495 176.954 41.0359L173.968\n          39.7874C173.46 39.5751 173.217 38.9905 173.464 38.498C175.023 35.3889 177.903 32.5075 181.558 31.388C185.602 30.1494 190.075\n          31.2163 194.019 35.3681C194.398 35.7669 194.352 36.3991 193.936 36.7609L191.492 38.8897C191.073 39.2538 190.441 39.2043 190.053\n          38.8094C187.354 36.0624 184.921 35.8559 183.083 36.4189Z",
                  fill: "currentColor",
                }),
                r().createElement("path", {
                  className: n,
                  "data-part": "eye--open",
                  fill: "currentColor",
                  d: "M185.54 42.697c3.332 0 6.034-2.781 6.034-6.211s-2.702-6.21-6.034-6.21c-3.333 0-6.034 2.78-6.034 6.21s2.701 6.21 6.034 6.21Z",
                }),
                r().createElement("path", {
                  className: n,
                  "data-part": "body",
                  fill: "currentColor",
                  d: "m21.867 193.558 92.839-164.565C122.124 11.853 138.827 0 158.135 0c9.302 0 18.102 2.588 25.393 7.504-1.76 3.882-3.52 6.987-5.28\n          9.575-3.52-1.553-7.291-2.33-11.565-2.33-16.594 0-29.919 13.716-29.919 30.794 0 5.646 1.496 10.83 4.04 15.3a45.95 45.95 0 0 1\n          15.319-2.62c25.896 0 46.764 21.736 46.764 48.131 0 1.104-.183 2.209-.394 3.475l-.109.665h.252c-.126.906-.315 1.811-.503\n          2.717-.189.906-.377 1.811-.503 2.717v.259c-17.487 91.789-126.812 89.821-143.747 89.031l.112-.386-1.743-30.679-6.872 12.197-27.513 7.208Z",
                }),
                r().createElement("path", {
                  className: n,
                  "data-part": "body-tail-connector",
                  fill: "currentColor",
                  d: "m49.277 186.425 8.718 18.407-1.743-30.679-6.975 12.272Z",
                }),
                r().createElement("path", {
                  className: n,
                  "data-part": "beak",
                  fill: "currentColor",
                  d: "m204.648 41.144-11.817 18.114h31.93l-20.113-18.114Z",
                }),
                r().createElement("path", {
                  "data-part": "feather-accent",
                  fill: "#FFF",
                  d: "m99.304 170.528-2.012 1.552s66.877-11.127 77.437-67.797l-10.56 3.623s-2.765 43.99-64.865 62.622Z",
                }),
              ),
              r().createElement("path", {
                className: n,
                "data-part": "tail",
                fill: "currentColor",
                d: "M56.252 174.153.456 273.202l41.847-14.025 15.692-54.345-1.743-30.679Z",
              }),
            );
          },
          Dt = ({ homeUrl: e, slim: t, currentPath: n, navigate: r }) => {
            const i = a.useMemo(
              () =>
                document.querySelector("[data-wagtail-sidebar-branding-logo]"),
              [],
            );
            if (i && "" !== i.innerHTML)
              return a.createElement("a", {
                className: "sidebar-custom-branding",
                href: e,
                "aria-label": (0, c.AP)("Dashboard"),
                "aria-current": n === e ? "page" : void 0,
                dangerouslySetInnerHTML: { __html: i ? i.innerHTML : "" },
              });
            const s = a.useRef(0),
              o = a.useRef("r"),
              l = a.useRef(0),
              [u, m] = a.useState(!1),
              d =
                "sidebar-wagtail-branding w-transition-all w-duration-150" +
                (u ? " sidebar-wagtail-branding--wagging" : "");
            return a.createElement(
              "a",
              {
                className: d,
                href: e,
                "aria-label": (0, c.AP)("Dashboard"),
                "aria-current": n === e ? "page" : void 0,
                onClick: (t) => {
                  t.ctrlKey ||
                    t.shiftKey ||
                    t.metaKey ||
                    (t.button && 0 !== t.button) ||
                    (t.preventDefault(), r(e));
                },
                onMouseMove: (e) => {
                  const t = e.pageX,
                    n = t > s.current ? "r" : "l";
                  t !== s.current && n !== o.current && (l.current += 1),
                    l.current > 8 && m(!0),
                    (s.current = t),
                    (o.current = n);
                },
                onMouseLeave: () => {
                  m(!1), (l.current = 0);
                },
              },
              a.createElement(
                "div",
                {
                  className:
                    "sidebar-wagtail-branding__icon-wrapper w-transition-all w-duration-150",
                },
                a.createElement(jt, { slim: t }),
              ),
            );
          },
          Ft = ({
            slim: e,
            expandingOrCollapsing: t,
            onSearchClick: n,
            searchUrl: r,
            navigate: i,
          }) => {
            const s = !e || t,
              o = a.useRef(null);
            return a.createElement(
              "form",
              {
                role: "search",
                className:
                  "w-h-[42px] w-relative w-box-border w-flex w-items-center w-justify-start w-flex-row w-flex-shrink-0",
                action: r,
                method: "get",
                onSubmit: (e) => {
                  if (e.target instanceof HTMLFormElement)
                    if ((e.preventDefault(), s)) {
                      const t = e.target.querySelector('input[name="q"]');
                      i(r + "?q=" + encodeURIComponent(t.value));
                    } else i(r);
                },
              },
              a.createElement(
                "div",
                { className: "w-flex w-flex-row w-items-center w-h-full" },
                a.createElement(
                  f.Ay,
                  {
                    disabled: s || !e,
                    content: (0, c.AP)("Search"),
                    placement: "right",
                  },
                  a.createElement(
                    "button",
                    {
                      className: `\n          ${
                        e ? "w-pr-[18px]" : "w-pr-0"
                      }\n          w-w-full\n          w-pl-[23px]\n          w-h-[35px]\n          w-bg-transparent\n          w-outline-offset-inside\n          w-border-0\n          w-rounded-none\n          w-text-text-label-menus-default\n          w-z-10\n          hover:w-text-text-label-menus-active\n          focus:w-text-text-label-menus-active\n          hover:w-bg-transparent`,
                      type: "submit",
                      "aria-label": (0, c.AP)("Search"),
                      onClick: (t) => {
                        e &&
                          (t.preventDefault(),
                          n(),
                          setTimeout(() => {
                            o.current && o.current.focus();
                          }, m));
                      },
                    },
                    a.createElement(u.A, {
                      className: "icon--menuitem",
                      name: "search",
                    }),
                  ),
                ),
                a.createElement(
                  "label",
                  { className: "w-sr-only", htmlFor: "menu-search-q" },
                  (0, c.AP)("Search"),
                ),
                a.createElement("input", {
                  className: `\n            ${
                    e || !s ? "w-hidden" : ""
                  }\n            !w-pl-[55px]\n            !w-py-[13px]\n            !w-subpixel-antialiased\n            !w-absolute\n            !w-left-0\n            !w-font-normal\n            !w-top-0\n            !w-text-14\n            !w-bg-transparent\n            !w-border-0\n            !w-rounded-none\n            !w-text-text-label-menus-default\n            !w-outline-offset-inside\n            !w-leading-none\n            placeholder:!w-text-text-label-menus-default`,
                  type: "text",
                  id: "menu-search-q",
                  name: "q",
                  placeholder: (0, c.AP)("Search"),
                  ref: o,
                }),
              ),
            );
          };
        window.telepath.register(
          "wagtail.sidebar.ActionMenuItem",
          class {
            name;
            label;
            action;
            attrs;
            iconName;
            classNames;
            method;
            constructor({
              name: e,
              label: t,
              action: n,
              attrs: a = {},
              icon_name: r = null,
              classname: i,
              method: s = "POST",
            }) {
              (this.name = e),
                (this.label = t),
                (this.action = n),
                (this.attrs = a),
                (this.iconName = r),
                (this.classNames = i),
                (this.method = s);
            }
            render({ path: e, slim: t, state: n, dispatch: r, navigate: i }) {
              return a.createElement(T, {
                key: this.name,
                item: this,
                path: e,
                slim: t,
                state: n,
                dispatch: r,
                navigate: i,
              });
            }
          },
        ),
          window.telepath.register("wagtail.sidebar.LinkMenuItem", v),
          window.telepath.register("wagtail.sidebar.SubMenuItem", w),
          window.telepath.register(
            "wagtail.sidebar.PageExplorerMenuItem",
            class extends v {
              startPageId;
              constructor(
                {
                  name: e,
                  label: t,
                  url: n,
                  attrs: a = {},
                  icon_name: r = null,
                  classname: i,
                },
                s,
              ) {
                super({
                  name: e,
                  label: t,
                  url: n,
                  attrs: a,
                  icon_name: r,
                  classname: i,
                }),
                  (this.startPageId = s);
              }
              render({ path: e, slim: t, state: n, dispatch: r, navigate: i }) {
                return a.createElement(Mt, {
                  key: this.name,
                  item: this,
                  path: e,
                  slim: t,
                  state: n,
                  dispatch: r,
                  navigate: i,
                });
              }
            },
          ),
          window.telepath.register(
            "wagtail.sidebar.WagtailBrandingModule",
            class {
              homeUrl;
              constructor(e) {
                this.homeUrl = e;
              }
              render({ slim: e, key: t, navigate: n, currentPath: r }) {
                return a.createElement(Dt, {
                  key: t,
                  homeUrl: this.homeUrl,
                  slim: e,
                  navigate: n,
                  currentPath: r,
                });
              }
            },
          ),
          window.telepath.register(
            "wagtail.sidebar.SearchModule",
            class {
              searchUrl;
              constructor(e) {
                this.searchUrl = e;
              }
              render({
                slim: e,
                key: t,
                expandingOrCollapsing: n,
                onSearchClick: r,
                navigate: i,
              }) {
                return a.createElement(Ft, {
                  searchUrl: this.searchUrl,
                  slim: e,
                  key: t,
                  expandingOrCollapsing: n,
                  onSearchClick: r,
                  navigate: i,
                });
              }
            },
          ),
          window.telepath.register(
            "wagtail.sidebar.MainMenuModule",
            class {
              menuItems;
              accountMenuItems;
              user;
              constructor(e, t, n) {
                (this.menuItems = e),
                  (this.accountMenuItems = t),
                  (this.user = n);
              }
              render({
                slim: e,
                expandingOrCollapsing: t,
                onHideMobile: n,
                key: r,
                currentPath: i,
                navigate: s,
              }) {
                return a.createElement(A, {
                  menuItems: this.menuItems,
                  accountMenuItems: this.accountMenuItems,
                  user: this.user,
                  slim: e,
                  expandingOrCollapsing: t,
                  onHideMobile: n,
                  key: r,
                  currentPath: i,
                  navigate: s,
                });
              }
            },
          ),
          document.addEventListener("DOMContentLoaded", () => {
            !(function () {
              const e = { sameSite: "lax" },
                t = document.getElementById("wagtail-sidebar"),
                n = document.getElementById("wagtail-sidebar-props"),
                r = (e) => ((window.location.href = e), new Promise(p.l));
              if (t && n?.textContent) {
                const i = window.telepath.unpack(JSON.parse(n.textContent)),
                  o = l.get(h),
                  c = !(void 0 === o || "0" === o),
                  u = (t) => {
                    t
                      ? (document.body.classList.add("sidebar-collapsed"),
                        l.set(h, 1, e))
                      : (document.body.classList.remove("sidebar-collapsed"),
                        l.set(h, 0, e));
                  };
                s().render(
                  a.createElement(d, {
                    modules: i.modules,
                    collapsedOnLoad: c,
                    currentPath: window.location.pathname,
                    navigate: r,
                    onExpandCollapse: u,
                  }),
                  t,
                  () => {
                    document
                      .querySelector("[data-wagtail-sidebar]")
                      ?.classList.remove("sidebar-loading");
                  },
                );
              }
            })();
          });
      },
    },
    n = {};
  function a(e) {
    var r = n[e];
    if (void 0 !== r) return r.exports;
    var i = (n[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(i.exports, i, i.exports, a), (i.loaded = !0), i.exports;
  }
  (a.m = t),
    (e = []),
    (a.O = (t, n, r, i) => {
      if (!n) {
        var s = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [n, r, i] = e[u], o = !0, l = 0; l < n.length; l++)
            (!1 & i || s >= i) && Object.keys(a.O).every((e) => a.O[e](n[l]))
              ? n.splice(l--, 1)
              : ((o = !1), i < s && (s = i));
          if (o) {
            e.splice(u--, 1);
            var c = r();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      i = i || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > i; u--) e[u] = e[u - 1];
      e[u] = [n, r, i];
    }),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (a.d = (e, t) => {
      for (var n in t)
        a.o(t, n) &&
          !a.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (a.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (a.j = 61),
    (() => {
      var e = { 61: 0 };
      a.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var r,
            i,
            [s, o, l] = n,
            c = 0;
          if (s.some((t) => 0 !== e[t])) {
            for (r in o) a.o(o, r) && (a.m[r] = o[r]);
            if (l) var u = l(a);
          }
          for (t && t(n); c < s.length; c++)
            (i = s[c]), a.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return a.O(u);
        },
        n = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })();
  var r = a.O(void 0, [321], () => a(998));
  r = a.O(r);
})();
