(() => {
  "use strict";
  var e,
    t = {
      406: (e, t, n) => {
        var o = n(2833),
          r = n(2427),
          i = n.n(r),
          s = n(6931),
          a = n.n(s);
        function c(e) {
          return (
            "Minified Redux error #" +
            e +
            "; visit https://redux.js.org/Errors?code=" +
            e +
            " for the full message or use the non-minified dev environment for full errors. "
          );
        }
        var l =
            ("function" == typeof Symbol && Symbol.observable) ||
            "@@observable",
          m = function () {
            return Math.random().toString(36).substring(7).split("").join(".");
          },
          u = {
            INIT: "@@redux/INIT" + m(),
            REPLACE: "@@redux/REPLACE" + m(),
            PROBE_UNKNOWN_ACTION: function () {
              return "@@redux/PROBE_UNKNOWN_ACTION" + m();
            },
          };
        function d(e, t, n) {
          var o;
          if (
            ("function" == typeof t && "function" == typeof n) ||
            ("function" == typeof n && "function" == typeof arguments[3])
          )
            throw new Error(c(0));
          if (
            ("function" == typeof t && void 0 === n && ((n = t), (t = void 0)),
            void 0 !== n)
          ) {
            if ("function" != typeof n) throw new Error(c(1));
            return n(d)(e, t);
          }
          if ("function" != typeof e) throw new Error(c(2));
          var r = e,
            i = t,
            s = [],
            a = s,
            m = !1;
          function p() {
            a === s && (a = s.slice());
          }
          function f() {
            if (m) throw new Error(c(3));
            return i;
          }
          function h(e) {
            if ("function" != typeof e) throw new Error(c(4));
            if (m) throw new Error(c(5));
            var t = !0;
            return (
              p(),
              a.push(e),
              function () {
                if (t) {
                  if (m) throw new Error(c(6));
                  (t = !1), p();
                  var n = a.indexOf(e);
                  a.splice(n, 1), (s = null);
                }
              }
            );
          }
          function y(e) {
            if (
              !(function (e) {
                if ("object" != typeof e || null === e) return !1;
                for (var t = e; null !== Object.getPrototypeOf(t); )
                  t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t;
              })(e)
            )
              throw new Error(c(7));
            if (void 0 === e.type) throw new Error(c(8));
            if (m) throw new Error(c(9));
            try {
              (m = !0), (i = r(i, e));
            } finally {
              m = !1;
            }
            for (var t = (s = a), n = 0; n < t.length; n++) (0, t[n])();
            return e;
          }
          return (
            y({ type: u.INIT }),
            ((o = {
              dispatch: y,
              subscribe: h,
              getState: f,
              replaceReducer: function (e) {
                if ("function" != typeof e) throw new Error(c(10));
                (r = e), y({ type: u.REPLACE });
              },
            })[l] = function () {
              var e,
                t = h;
              return (
                ((e = {
                  subscribe: function (e) {
                    if ("object" != typeof e || null === e)
                      throw new Error(c(11));
                    function n() {
                      e.next && e.next(f());
                    }
                    return n(), { unsubscribe: t(n) };
                  },
                })[l] = function () {
                  return this;
                }),
                e
              );
            }),
            o
          );
        }
        function p(e, t, n) {
          const o = e.get(t);
          return void 0 === o ? n : o;
        }
        class f {
          commentElements = new Map();
          commentAnnotations = new Map();
          commentTabs = new Map();
          commentDesiredPositions = new Map();
          commentHeights = new Map();
          pinnedComment = null;
          commentCalculatedPositions = new Map();
          isDirty = !1;
          setCommentElement(e, t) {
            null !== t
              ? this.commentElements.set(e, t)
              : this.commentElements.delete(e),
              (this.isDirty = !0);
          }
          setCommentAnnotation(e, t) {
            this.commentAnnotations.set(e, t),
              this.commentTabs.set(e, t.getTab() || null),
              this.updateDesiredPosition(e),
              (this.isDirty = !0);
          }
          setCommentHeight(e, t) {
            this.commentHeights.get(e) !== t &&
              (this.commentHeights.set(e, t), (this.isDirty = !0));
          }
          setPinnedComment(e) {
            (this.pinnedComment = e), (this.isDirty = !0);
          }
          updateDesiredPosition(e) {
            const t = this.commentAnnotations.get(e);
            if (!t) return;
            const n = t.getAnchorNode(e === this.pinnedComment);
            let o = n.getBoundingClientRect().top,
              r = n.parentElement;
            for (; r; ) (o += r.scrollTop), (r = r.parentElement);
            this.commentDesiredPositions.set(e, 0 !== o ? o + -50 : 0);
          }
          refreshDesiredPositions(e = null) {
            const t = new Map(this.commentDesiredPositions);
            this.commentAnnotations.forEach((t, n) => {
              this.getCommentTabVisible(e, n) && this.updateDesiredPosition(n);
            }),
              this.commentDesiredPositions !== t && (this.isDirty = !0);
          }
          refreshLayout() {
            if (!this.isDirty) return !1;
            const e = Array.from(this.commentElements.keys()).map((e) => ({
                tab: p(this.commentTabs, e, null),
                position: p(this.commentDesiredPositions, e, 0),
                height: p(this.commentHeights, e, 0),
                comments: [e],
                containsPinnedComment:
                  null !== this.pinnedComment && e === this.pinnedComment,
                pinnedCommentPosition: 0,
              })),
              t = new Map();
            e.forEach((e) => {
              const n = t.get(e.tab) || [];
              n.push(e), t.set(e.tab, n);
            });
            const n = this.pinnedComment
                ? this.commentDesiredPositions.get(this.pinnedComment)
                : void 0,
              o = this.pinnedComment
                ? this.commentTabs.get(this.pinnedComment)
                : void 0;
            return (
              Array.from(t.entries()).forEach(([e, t]) => {
                const r = this.pinnedComment && o === e;
                t.sort((e, t) => e.position - t.position);
                let i = t,
                  s = !0;
                for (; s; ) {
                  s = !1;
                  const e = [];
                  let t = null;
                  for (const o of i)
                    t && t.position + t.height + 20 > o.position
                      ? ((s = !0),
                        t.comments.push(...o.comments),
                        o.containsPinnedComment &&
                          ((t.containsPinnedComment = !0),
                          (t.pinnedCommentPosition =
                            o.pinnedCommentPosition + t.height)),
                        (t.height += o.height),
                        !r &&
                          t.position < 50 &&
                          (t.position = 100 + t.height - -50),
                        n &&
                          t.containsPinnedComment &&
                          (t.position = n - t.pinnedCommentPosition))
                      : (e.push(o), (t = o));
                  i = e;
                }
                i.forEach((e) => {
                  let t = e.position;
                  e.comments.forEach((e) => {
                    this.commentCalculatedPositions.set(e, t);
                    const n = this.commentHeights.get(e);
                    n && (t += n + 20);
                  });
                });
              }),
              (this.isDirty = !1),
              !0
            );
          }
          getCommentTabVisible(e, t) {
            return p(this.commentTabs, t, null) === e;
          }
          getCommentVisible(e, t) {
            return (
              this.getCommentTabVisible(e, t) &&
              p(this.commentDesiredPositions, t, 1) > 0
            );
          }
          getCommentPosition(e) {
            return this.commentCalculatedPositions.has(e)
              ? this.commentCalculatedPositions.get(e)
              : this.commentDesiredPositions.get(e);
          }
        }
        let h = 1,
          y = 1;
        function v() {
          return (h += 1), h;
        }
        function b() {
          return (y += 1), y;
        }
        function g(e) {
          for (
            var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          throw Error(
            "[Immer] minified error nr: " +
              e +
              (n.length
                ? " " +
                  n
                    .map(function (e) {
                      return "'" + e + "'";
                    })
                    .join(",")
                : "") +
              ". Find the full error at: https://bit.ly/3cXEKWf",
          );
        }
        function E(e) {
          return !!e && !!e[ae];
        }
        function _(e) {
          var t;
          return (
            !!e &&
            ((function (e) {
              if (!e || "object" != typeof e) return !1;
              var t = Object.getPrototypeOf(e);
              if (null === t) return !0;
              var n =
                Object.hasOwnProperty.call(t, "constructor") && t.constructor;
              return (
                n === Object ||
                ("function" == typeof n && Function.toString.call(n) === le)
              );
            })(e) ||
              Array.isArray(e) ||
              !!e[se] ||
              !!(null === (t = e.constructor) || void 0 === t
                ? void 0
                : t[se]) ||
              A(e) ||
              x(e))
          );
        }
        function C(e, t, n) {
          void 0 === n && (n = !1),
            0 === w(e)
              ? (n ? Object.keys : me)(e).forEach(function (o) {
                  (n && "symbol" == typeof o) || t(o, e[o], e);
                })
              : e.forEach(function (n, o) {
                  return t(o, n, e);
                });
        }
        function w(e) {
          var t = e[ae];
          return t
            ? t.i > 3
              ? t.i - 4
              : t.i
            : Array.isArray(e)
            ? 1
            : A(e)
            ? 2
            : x(e)
            ? 3
            : 0;
        }
        function P(e, t) {
          return 2 === w(e)
            ? e.has(t)
            : Object.prototype.hasOwnProperty.call(e, t);
        }
        function I(e, t, n) {
          var o = w(e);
          2 === o ? e.set(t, n) : 3 === o ? e.add(n) : (e[t] = n);
        }
        function N(e, t) {
          return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
        }
        function A(e) {
          return ne && e instanceof Map;
        }
        function x(e) {
          return oe && e instanceof Set;
        }
        function O(e) {
          return e.o || e.t;
        }
        function k(e) {
          if (Array.isArray(e)) return Array.prototype.slice.call(e);
          var t = ue(e);
          delete t[ae];
          for (var n = me(t), o = 0; o < n.length; o++) {
            var r = n[o],
              i = t[r];
            !1 === i.writable && ((i.writable = !0), (i.configurable = !0)),
              (i.get || i.set) &&
                (t[r] = {
                  configurable: !0,
                  writable: !0,
                  enumerable: i.enumerable,
                  value: e[r],
                });
          }
          return Object.create(Object.getPrototypeOf(e), t);
        }
        function R(e, t) {
          return (
            void 0 === t && (t = !1),
            F(e) ||
              E(e) ||
              !_(e) ||
              (w(e) > 1 && (e.set = e.add = e.clear = e.delete = D),
              Object.freeze(e),
              t &&
                C(
                  e,
                  function (e, t) {
                    return R(t, !0);
                  },
                  !0,
                )),
            e
          );
        }
        function D() {
          g(2);
        }
        function F(e) {
          return null == e || "object" != typeof e || Object.isFrozen(e);
        }
        function S(e) {
          var t = de[e];
          return t || g(18, e), t;
        }
        function T(e, t) {
          de[e] || (de[e] = t);
        }
        function j() {
          return ee;
        }
        function M(e, t) {
          t && (S("Patches"), (e.u = []), (e.s = []), (e.v = t));
        }
        function L(e) {
          U(e), e.p.forEach(H), (e.p = null);
        }
        function U(e) {
          e === ee && (ee = e.l);
        }
        function z(e) {
          return (ee = { p: [], l: ee, h: e, m: !0, _: 0 });
        }
        function H(e) {
          var t = e[ae];
          0 === t.i || 1 === t.i ? t.j() : (t.g = !0);
        }
        function $(e, t) {
          t._ = t.p.length;
          var n = t.p[0],
            o = void 0 !== e && e !== n;
          return (
            t.h.O || S("ES5").S(t, e, o),
            o
              ? (n[ae].P && (L(t), g(4)),
                _(e) && ((e = q(t, e)), t.l || V(t, e)),
                t.u && S("Patches").M(n[ae].t, e, t.u, t.s))
              : (e = q(t, n, [])),
            L(t),
            t.u && t.v(t.u, t.s),
            e !== ie ? e : void 0
          );
        }
        function q(e, t, n) {
          if (F(t)) return t;
          var o = t[ae];
          if (!o)
            return (
              C(
                t,
                function (r, i) {
                  return K(e, o, t, r, i, n);
                },
                !0,
              ),
              t
            );
          if (o.A !== e) return t;
          if (!o.P) return V(e, o.t, !0), o.t;
          if (!o.I) {
            (o.I = !0), o.A._--;
            var r = 4 === o.i || 5 === o.i ? (o.o = k(o.k)) : o.o,
              i = r,
              s = !1;
            3 === o.i && ((i = new Set(r)), r.clear(), (s = !0)),
              C(i, function (t, i) {
                return K(e, o, r, t, i, n, s);
              }),
              V(e, r, !1),
              n && e.u && S("Patches").N(o, n, e.u, e.s);
          }
          return o.o;
        }
        function K(e, t, n, o, r, i, s) {
          if (E(r)) {
            var a = q(
              e,
              r,
              i && t && 3 !== t.i && !P(t.R, o) ? i.concat(o) : void 0,
            );
            if ((I(n, o, a), !E(a))) return;
            e.m = !1;
          } else s && n.add(r);
          if (_(r) && !F(r)) {
            if (!e.h.D && e._ < 1) return;
            q(e, r), (t && t.A.l) || V(e, r);
          }
        }
        function V(e, t, n) {
          void 0 === n && (n = !1), !e.l && e.h.D && e.m && R(t, n);
        }
        function B(e, t) {
          var n = e[ae];
          return (n ? O(n) : e)[t];
        }
        function W(e, t) {
          if (t in e)
            for (var n = Object.getPrototypeOf(e); n; ) {
              var o = Object.getOwnPropertyDescriptor(n, t);
              if (o) return o;
              n = Object.getPrototypeOf(n);
            }
        }
        function J(e) {
          e.P || ((e.P = !0), e.l && J(e.l));
        }
        function X(e) {
          e.o || (e.o = k(e.t));
        }
        function Y(e, t, n) {
          var o = A(t)
            ? S("MapSet").F(t, n)
            : x(t)
            ? S("MapSet").T(t, n)
            : e.O
            ? (function (e, t) {
                var n = Array.isArray(e),
                  o = {
                    i: n ? 1 : 0,
                    A: t ? t.A : j(),
                    P: !1,
                    I: !1,
                    R: {},
                    l: t,
                    t: e,
                    k: null,
                    o: null,
                    j: null,
                    C: !1,
                  },
                  r = o,
                  i = pe;
                n && ((r = [o]), (i = fe));
                var s = Proxy.revocable(r, i),
                  a = s.revoke,
                  c = s.proxy;
                return (o.k = c), (o.j = a), c;
              })(t, n)
            : S("ES5").J(t, n);
          return (n ? n.A : j()).p.push(o), o;
        }
        function G(e) {
          return (
            E(e) || g(22, e),
            (function e(t) {
              if (!_(t)) return t;
              var n,
                o = t[ae],
                r = w(t);
              if (o) {
                if (!o.P && (o.i < 4 || !S("ES5").K(o))) return o.t;
                (o.I = !0), (n = Q(t, r)), (o.I = !1);
              } else n = Q(t, r);
              return (
                C(n, function (t, r) {
                  (o &&
                    (function (e, t) {
                      return 2 === w(e) ? e.get(t) : e[t];
                    })(o.t, t) === r) ||
                    I(n, t, e(r));
                }),
                3 === r ? new Set(n) : n
              );
            })(e)
          );
        }
        function Q(e, t) {
          switch (t) {
            case 2:
              return new Map(e);
            case 3:
              return Array.from(e);
          }
          return k(e);
        }
        var Z,
          ee,
          te = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
          ne = "undefined" != typeof Map,
          oe = "undefined" != typeof Set,
          re =
            "undefined" != typeof Proxy &&
            void 0 !== Proxy.revocable &&
            "undefined" != typeof Reflect,
          ie = te
            ? Symbol.for("immer-nothing")
            : (((Z = {})["immer-nothing"] = !0), Z),
          se = te ? Symbol.for("immer-draftable") : "__$immer_draftable",
          ae = te ? Symbol.for("immer-state") : "__$immer_state",
          ce =
            ("undefined" != typeof Symbol && Symbol.iterator) || "@@iterator",
          le = "" + Object.prototype.constructor,
          me =
            "undefined" != typeof Reflect && Reflect.ownKeys
              ? Reflect.ownKeys
              : void 0 !== Object.getOwnPropertySymbols
              ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(
                    Object.getOwnPropertySymbols(e),
                  );
                }
              : Object.getOwnPropertyNames,
          ue =
            Object.getOwnPropertyDescriptors ||
            function (e) {
              var t = {};
              return (
                me(e).forEach(function (n) {
                  t[n] = Object.getOwnPropertyDescriptor(e, n);
                }),
                t
              );
            },
          de = {},
          pe = {
            get: function (e, t) {
              if (t === ae) return e;
              var n = O(e);
              if (!P(n, t))
                return (function (e, t, n) {
                  var o,
                    r = W(t, n);
                  return r
                    ? "value" in r
                      ? r.value
                      : null === (o = r.get) || void 0 === o
                      ? void 0
                      : o.call(e.k)
                    : void 0;
                })(e, n, t);
              var o = n[t];
              return e.I || !_(o)
                ? o
                : o === B(e.t, t)
                ? (X(e), (e.o[t] = Y(e.A.h, o, e)))
                : o;
            },
            has: function (e, t) {
              return t in O(e);
            },
            ownKeys: function (e) {
              return Reflect.ownKeys(O(e));
            },
            set: function (e, t, n) {
              var o = W(O(e), t);
              if (null == o ? void 0 : o.set) return o.set.call(e.k, n), !0;
              if (!e.P) {
                var r = B(O(e), t),
                  i = null == r ? void 0 : r[ae];
                if (i && i.t === n) return (e.o[t] = n), (e.R[t] = !1), !0;
                if (N(n, r) && (void 0 !== n || P(e.t, t))) return !0;
                X(e), J(e);
              }
              return (
                (e.o[t] === n && (void 0 !== n || t in e.o)) ||
                  (Number.isNaN(n) && Number.isNaN(e.o[t])) ||
                  ((e.o[t] = n), (e.R[t] = !0)),
                !0
              );
            },
            deleteProperty: function (e, t) {
              return (
                void 0 !== B(e.t, t) || t in e.t
                  ? ((e.R[t] = !1), X(e), J(e))
                  : delete e.R[t],
                e.o && delete e.o[t],
                !0
              );
            },
            getOwnPropertyDescriptor: function (e, t) {
              var n = O(e),
                o = Reflect.getOwnPropertyDescriptor(n, t);
              return o
                ? {
                    writable: !0,
                    configurable: 1 !== e.i || "length" !== t,
                    enumerable: o.enumerable,
                    value: n[t],
                  }
                : o;
            },
            defineProperty: function () {
              g(11);
            },
            getPrototypeOf: function (e) {
              return Object.getPrototypeOf(e.t);
            },
            setPrototypeOf: function () {
              g(12);
            },
          },
          fe = {};
        C(pe, function (e, t) {
          fe[e] = function () {
            return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
          };
        }),
          (fe.deleteProperty = function (e, t) {
            return fe.set.call(this, e, t, void 0);
          }),
          (fe.set = function (e, t, n) {
            return pe.set.call(this, e[0], t, n, e[0]);
          });
        var he = (function () {
            function e(e) {
              var t = this;
              (this.O = re),
                (this.D = !0),
                (this.produce = function (e, n, o) {
                  if ("function" == typeof e && "function" != typeof n) {
                    var r = n;
                    n = e;
                    var i = t;
                    return function (e) {
                      var t = this;
                      void 0 === e && (e = r);
                      for (
                        var o = arguments.length,
                          s = Array(o > 1 ? o - 1 : 0),
                          a = 1;
                        a < o;
                        a++
                      )
                        s[a - 1] = arguments[a];
                      return i.produce(e, function (e) {
                        var o;
                        return (o = n).call.apply(o, [t, e].concat(s));
                      });
                    };
                  }
                  var s;
                  if (
                    ("function" != typeof n && g(6),
                    void 0 !== o && "function" != typeof o && g(7),
                    _(e))
                  ) {
                    var a = z(t),
                      c = Y(t, e, void 0),
                      l = !0;
                    try {
                      (s = n(c)), (l = !1);
                    } finally {
                      l ? L(a) : U(a);
                    }
                    return "undefined" != typeof Promise && s instanceof Promise
                      ? s.then(
                          function (e) {
                            return M(a, o), $(e, a);
                          },
                          function (e) {
                            throw (L(a), e);
                          },
                        )
                      : (M(a, o), $(s, a));
                  }
                  if (!e || "object" != typeof e) {
                    if (
                      (void 0 === (s = n(e)) && (s = e),
                      s === ie && (s = void 0),
                      t.D && R(s, !0),
                      o)
                    ) {
                      var m = [],
                        u = [];
                      S("Patches").M(e, s, m, u), o(m, u);
                    }
                    return s;
                  }
                  g(21, e);
                }),
                (this.produceWithPatches = function (e, n) {
                  if ("function" == typeof e)
                    return function (n) {
                      for (
                        var o = arguments.length,
                          r = Array(o > 1 ? o - 1 : 0),
                          i = 1;
                        i < o;
                        i++
                      )
                        r[i - 1] = arguments[i];
                      return t.produceWithPatches(n, function (t) {
                        return e.apply(void 0, [t].concat(r));
                      });
                    };
                  var o,
                    r,
                    i = t.produce(e, n, function (e, t) {
                      (o = e), (r = t);
                    });
                  return "undefined" != typeof Promise && i instanceof Promise
                    ? i.then(function (e) {
                        return [e, o, r];
                      })
                    : [i, o, r];
                }),
                "boolean" == typeof (null == e ? void 0 : e.useProxies) &&
                  this.setUseProxies(e.useProxies),
                "boolean" == typeof (null == e ? void 0 : e.autoFreeze) &&
                  this.setAutoFreeze(e.autoFreeze);
            }
            var t = e.prototype;
            return (
              (t.createDraft = function (e) {
                _(e) || g(8), E(e) && (e = G(e));
                var t = z(this),
                  n = Y(this, e, void 0);
                return (n[ae].C = !0), U(t), n;
              }),
              (t.finishDraft = function (e, t) {
                var n = (e && e[ae]).A;
                return M(n, t), $(void 0, n);
              }),
              (t.setAutoFreeze = function (e) {
                this.D = e;
              }),
              (t.setUseProxies = function (e) {
                e && !re && g(20), (this.O = e);
              }),
              (t.applyPatches = function (e, t) {
                var n;
                for (n = t.length - 1; n >= 0; n--) {
                  var o = t[n];
                  if (0 === o.path.length && "replace" === o.op) {
                    e = o.value;
                    break;
                  }
                }
                n > -1 && (t = t.slice(n + 1));
                var r = S("Patches").$;
                return E(e)
                  ? r(e, t)
                  : this.produce(e, function (e) {
                      return r(e, t);
                    });
              }),
              e
            );
          })(),
          ye = new he(),
          ve = ye.produce;
        ye.produceWithPatches.bind(ye),
          ye.setAutoFreeze.bind(ye),
          ye.setUseProxies.bind(ye),
          ye.applyPatches.bind(ye),
          ye.createDraft.bind(ye),
          ye.finishDraft.bind(ye);
        const be = ve,
          ge = "add-comment",
          Ee = "update-comment",
          _e = "delete-comment",
          Ce = "resolve-comment",
          we = "set-focused-comment",
          Pe = "add-reply",
          Ie = "update-reply",
          Ne = "delete-reply",
          Ae = "invalidate-content-path";
        function xe(e) {
          return { type: ge, comment: e };
        }
        function Oe(e, t) {
          return { type: Ee, commentId: e, update: t };
        }
        function ke(e) {
          return { type: _e, commentId: e };
        }
        function Re(e) {
          return { type: Ce, commentId: e };
        }
        function De(
          e,
          { updatePinnedComment: t, forceFocus: n } = {
            updatePinnedComment: !1,
            forceFocus: !1,
          },
        ) {
          return {
            type: we,
            commentId: e,
            updatePinnedComment: t,
            forceFocus: n,
          };
        }
        function Fe(e, t) {
          return { type: Pe, commentId: e, reply: t };
        }
        function Se(e, t, n) {
          return { type: Ie, commentId: e, replyId: t, update: n };
        }
        function Te(e, t) {
          return { type: Ne, commentId: e, replyId: t };
        }
        function je(e) {
          return { type: Ae, contentPath: e };
        }
        const Me = {
          addComment: xe,
          updateComment: Oe,
          deleteComment: ke,
          resolveComment: Re,
          setFocusedComment: De,
          addReply: Fe,
          updateReply: Se,
          deleteReply: Te,
          invalidateContentPath: je,
        };
        function Le(
          e,
          t,
          n,
          {
            remoteId: o = null,
            mode: r = "default",
            text: i = "",
            deleted: s = !1,
          },
        ) {
          return {
            localId: e,
            remoteId: o,
            mode: r,
            author: t,
            date: n,
            text: i,
            originalText: i,
            newText: "",
            deleted: s,
          };
        }
        function Ue(
          e,
          t,
          n,
          o,
          r,
          i,
          {
            remoteId: s = null,
            mode: a = "default",
            text: c = "",
            resolved: l = !1,
            deleted: m = !1,
            replies: u = new Map(),
          },
        ) {
          return {
            contentpath: e,
            position: t,
            localId: n,
            annotation: o,
            remoteId: s,
            mode: a,
            author: r,
            date: i,
            text: c,
            originalText: c,
            replies: u,
            newReply: "",
            newText: "",
            deleted: m,
            resolved: l,
            remoteReplyCount: Array.from(u.values()).reduce(
              (e, t) => (null !== t.remoteId ? e + 1 : e),
              0,
            ),
          };
        }
        (function () {
          function e(e, t) {
            var n = r[e];
            return (
              n
                ? (n.enumerable = t)
                : (r[e] = n =
                    {
                      configurable: !0,
                      enumerable: t,
                      get: function () {
                        var t = this[ae];
                        return pe.get(t, e);
                      },
                      set: function (t) {
                        var n = this[ae];
                        pe.set(n, e, t);
                      },
                    }),
              n
            );
          }
          function t(e) {
            for (var t = e.length - 1; t >= 0; t--) {
              var r = e[t][ae];
              if (!r.P)
                switch (r.i) {
                  case 5:
                    o(r) && J(r);
                    break;
                  case 4:
                    n(r) && J(r);
                }
            }
          }
          function n(e) {
            for (
              var t = e.t, n = e.k, o = me(n), r = o.length - 1;
              r >= 0;
              r--
            ) {
              var i = o[r];
              if (i !== ae) {
                var s = t[i];
                if (void 0 === s && !P(t, i)) return !0;
                var a = n[i],
                  c = a && a[ae];
                if (c ? c.t !== s : !N(a, s)) return !0;
              }
            }
            var l = !!t[ae];
            return o.length !== me(t).length + (l ? 0 : 1);
          }
          function o(e) {
            var t = e.k;
            if (t.length !== e.t.length) return !0;
            var n = Object.getOwnPropertyDescriptor(t, t.length - 1);
            if (n && !n.get) return !0;
            for (var o = 0; o < t.length; o++)
              if (!t.hasOwnProperty(o)) return !0;
            return !1;
          }
          var r = {};
          T("ES5", {
            J: function (t, n) {
              var o = Array.isArray(t),
                r = (function (t, n) {
                  if (t) {
                    for (var o = Array(n.length), r = 0; r < n.length; r++)
                      Object.defineProperty(o, "" + r, e(r, !0));
                    return o;
                  }
                  var i = ue(n);
                  delete i[ae];
                  for (var s = me(i), a = 0; a < s.length; a++) {
                    var c = s[a];
                    i[c] = e(c, t || !!i[c].enumerable);
                  }
                  return Object.create(Object.getPrototypeOf(n), i);
                })(o, t),
                i = {
                  i: o ? 5 : 4,
                  A: n ? n.A : j(),
                  P: !1,
                  I: !1,
                  R: {},
                  l: n,
                  t,
                  k: r,
                  o: null,
                  g: !1,
                  C: !1,
                };
              return (
                Object.defineProperty(r, ae, { value: i, writable: !0 }), r
              );
            },
            S: function (e, n, r) {
              r
                ? E(n) && n[ae].A === e && t(e.p)
                : (e.u &&
                    (function e(t) {
                      if (t && "object" == typeof t) {
                        var n = t[ae];
                        if (n) {
                          var r = n.t,
                            i = n.k,
                            s = n.R,
                            a = n.i;
                          if (4 === a)
                            C(i, function (t) {
                              t !== ae &&
                                (void 0 !== r[t] || P(r, t)
                                  ? s[t] || e(i[t])
                                  : ((s[t] = !0), J(n)));
                            }),
                              C(r, function (e) {
                                void 0 !== i[e] ||
                                  P(i, e) ||
                                  ((s[e] = !1), J(n));
                              });
                          else if (5 === a) {
                            if (
                              (o(n) && (J(n), (s.length = !0)),
                              i.length < r.length)
                            )
                              for (var c = i.length; c < r.length; c++)
                                s[c] = !1;
                            else
                              for (var l = r.length; l < i.length; l++)
                                s[l] = !0;
                            for (
                              var m = Math.min(i.length, r.length), u = 0;
                              u < m;
                              u++
                            )
                              i.hasOwnProperty(u) || (s[u] = !0),
                                void 0 === s[u] && e(i[u]);
                          }
                        }
                      }
                    })(e.p[0]),
                  t(e.p));
            },
            K: function (e) {
              return 4 === e.i ? n(e) : o(e);
            },
          });
        })(),
          (function () {
            function e(e, t) {
              function n() {
                this.constructor = e;
              }
              r(e, t), (e.prototype = ((n.prototype = t.prototype), new n()));
            }
            function t(e) {
              e.o || ((e.R = new Map()), (e.o = new Map(e.t)));
            }
            function n(e) {
              e.o ||
                ((e.o = new Set()),
                e.t.forEach(function (t) {
                  if (_(t)) {
                    var n = Y(e.A.h, t, e);
                    e.p.set(t, n), e.o.add(n);
                  } else e.o.add(t);
                }));
            }
            function o(e) {
              e.g && g(3, JSON.stringify(O(e)));
            }
            var r = function (e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                  })(e, t);
              },
              i = (function () {
                function n(e, t) {
                  return (
                    (this[ae] = {
                      i: 2,
                      l: t,
                      A: t ? t.A : j(),
                      P: !1,
                      I: !1,
                      o: void 0,
                      R: void 0,
                      t: e,
                      k: this,
                      C: !1,
                      g: !1,
                    }),
                    this
                  );
                }
                e(n, Map);
                var r = n.prototype;
                return (
                  Object.defineProperty(r, "size", {
                    get: function () {
                      return O(this[ae]).size;
                    },
                  }),
                  (r.has = function (e) {
                    return O(this[ae]).has(e);
                  }),
                  (r.set = function (e, n) {
                    var r = this[ae];
                    return (
                      o(r),
                      (O(r).has(e) && O(r).get(e) === n) ||
                        (t(r),
                        J(r),
                        r.R.set(e, !0),
                        r.o.set(e, n),
                        r.R.set(e, !0)),
                      this
                    );
                  }),
                  (r.delete = function (e) {
                    if (!this.has(e)) return !1;
                    var n = this[ae];
                    return (
                      o(n),
                      t(n),
                      J(n),
                      n.t.has(e) ? n.R.set(e, !1) : n.R.delete(e),
                      n.o.delete(e),
                      !0
                    );
                  }),
                  (r.clear = function () {
                    var e = this[ae];
                    o(e),
                      O(e).size &&
                        (t(e),
                        J(e),
                        (e.R = new Map()),
                        C(e.t, function (t) {
                          e.R.set(t, !1);
                        }),
                        e.o.clear());
                  }),
                  (r.forEach = function (e, t) {
                    var n = this;
                    O(this[ae]).forEach(function (o, r) {
                      e.call(t, n.get(r), r, n);
                    });
                  }),
                  (r.get = function (e) {
                    var n = this[ae];
                    o(n);
                    var r = O(n).get(e);
                    if (n.I || !_(r)) return r;
                    if (r !== n.t.get(e)) return r;
                    var i = Y(n.A.h, r, n);
                    return t(n), n.o.set(e, i), i;
                  }),
                  (r.keys = function () {
                    return O(this[ae]).keys();
                  }),
                  (r.values = function () {
                    var e,
                      t = this,
                      n = this.keys();
                    return (
                      ((e = {})[ce] = function () {
                        return t.values();
                      }),
                      (e.next = function () {
                        var e = n.next();
                        return e.done ? e : { done: !1, value: t.get(e.value) };
                      }),
                      e
                    );
                  }),
                  (r.entries = function () {
                    var e,
                      t = this,
                      n = this.keys();
                    return (
                      ((e = {})[ce] = function () {
                        return t.entries();
                      }),
                      (e.next = function () {
                        var e = n.next();
                        if (e.done) return e;
                        var o = t.get(e.value);
                        return { done: !1, value: [e.value, o] };
                      }),
                      e
                    );
                  }),
                  (r[ce] = function () {
                    return this.entries();
                  }),
                  n
                );
              })(),
              s = (function () {
                function t(e, t) {
                  return (
                    (this[ae] = {
                      i: 3,
                      l: t,
                      A: t ? t.A : j(),
                      P: !1,
                      I: !1,
                      o: void 0,
                      t: e,
                      k: this,
                      p: new Map(),
                      g: !1,
                      C: !1,
                    }),
                    this
                  );
                }
                e(t, Set);
                var r = t.prototype;
                return (
                  Object.defineProperty(r, "size", {
                    get: function () {
                      return O(this[ae]).size;
                    },
                  }),
                  (r.has = function (e) {
                    var t = this[ae];
                    return (
                      o(t),
                      t.o
                        ? !!t.o.has(e) || !(!t.p.has(e) || !t.o.has(t.p.get(e)))
                        : t.t.has(e)
                    );
                  }),
                  (r.add = function (e) {
                    var t = this[ae];
                    return o(t), this.has(e) || (n(t), J(t), t.o.add(e)), this;
                  }),
                  (r.delete = function (e) {
                    if (!this.has(e)) return !1;
                    var t = this[ae];
                    return (
                      o(t),
                      n(t),
                      J(t),
                      t.o.delete(e) || (!!t.p.has(e) && t.o.delete(t.p.get(e)))
                    );
                  }),
                  (r.clear = function () {
                    var e = this[ae];
                    o(e), O(e).size && (n(e), J(e), e.o.clear());
                  }),
                  (r.values = function () {
                    var e = this[ae];
                    return o(e), n(e), e.o.values();
                  }),
                  (r.entries = function () {
                    var e = this[ae];
                    return o(e), n(e), e.o.entries();
                  }),
                  (r.keys = function () {
                    return this.values();
                  }),
                  (r[ce] = function () {
                    return this.values();
                  }),
                  (r.forEach = function (e, t) {
                    for (var n = this.values(), o = n.next(); !o.done; )
                      e.call(t, o.value, o.value, this), (o = n.next());
                  }),
                  t
                );
              })();
            T("MapSet", {
              F: function (e, t) {
                return new i(e, t);
              },
              T: function (e, t) {
                return new s(e, t);
              },
            });
          })();
        const ze = be(
            (e, t) => {
              const n = (t) => {
                t.remoteId ? (t.resolved = !0) : e.comments.delete(t.localId),
                  e.focusedComment === t.localId && (e.focusedComment = null),
                  e.pinnedComment === t.localId && (e.pinnedComment = null);
              };
              switch (t.type) {
                case ge:
                  e.comments.set(t.comment.localId, t.comment),
                    t.comment.remoteId && (e.remoteCommentCount += 1);
                  break;
                case Ee: {
                  const n = e.comments.get(t.commentId);
                  if (n) {
                    if (t.update.newText && 0 === t.update.newText.length)
                      break;
                    Object.assign(n, t.update);
                  }
                  break;
                }
                case _e: {
                  const n = e.comments.get(t.commentId);
                  if (!n) break;
                  ((t) => {
                    t.remoteId
                      ? (t.deleted = !0)
                      : e.comments.delete(t.localId),
                      e.focusedComment === t.localId &&
                        ((e.focusedComment = null), (e.forceFocus = !1)),
                      e.pinnedComment === t.localId && (e.pinnedComment = null);
                  })(n);
                  break;
                }
                case Ce: {
                  const o = e.comments.get(t.commentId);
                  if (!o) break;
                  n(o);
                  break;
                }
                case we:
                  (null === t.commentId || e.comments.has(t.commentId)) &&
                    ((e.focusedComment = t.commentId),
                    t.updatePinnedComment && (e.pinnedComment = t.commentId),
                    (e.forceFocus = t.forceFocus));
                  break;
                case Pe: {
                  const n = e.comments.get(t.commentId);
                  if (!n || 0 === t.reply.text.length) break;
                  t.reply.remoteId && (n.remoteReplyCount += 1),
                    n.replies.set(t.reply.localId, t.reply);
                  break;
                }
                case Ie: {
                  const n = e.comments.get(t.commentId);
                  if (!n) break;
                  const o = n.replies.get(t.replyId);
                  if (!o) break;
                  if (t.update.newText && 0 === t.update.newText.length) break;
                  Object.assign(o, t.update);
                  break;
                }
                case Ne: {
                  const n = e.comments.get(t.commentId);
                  if (!n) break;
                  const o = n.replies.get(t.replyId);
                  if (!o) break;
                  o.remoteId ? (o.deleted = !0) : n.replies.delete(o.localId);
                  break;
                }
                case Ae: {
                  const o = e.comments;
                  for (const e of o.values())
                    e.contentpath.startsWith(t.contentPath) && n(e);
                  break;
                }
              }
            },
            {
              comments: new Map(),
              forceFocus: !1,
              focusedComment: null,
              pinnedComment: null,
              remoteCommentCount: 0,
            },
          ),
          He = "update-global-settings";
        function $e(e) {
          return { type: He, update: e };
        }
        const qe = { user: null, currentTab: null },
          Ke = (function (e) {
            for (var t = Object.keys(e), n = {}, o = 0; o < t.length; o++) {
              var r = t[o];
              "function" == typeof e[r] && (n[r] = e[r]);
            }
            var i,
              s = Object.keys(n);
            try {
              !(function (e) {
                Object.keys(e).forEach(function (t) {
                  var n = e[t];
                  if (void 0 === n(void 0, { type: u.INIT }))
                    throw new Error(c(12));
                  if (void 0 === n(void 0, { type: u.PROBE_UNKNOWN_ACTION() }))
                    throw new Error(c(13));
                });
              })(n);
            } catch (e) {
              i = e;
            }
            return function (e, t) {
              if ((void 0 === e && (e = {}), i)) throw i;
              for (var o = !1, r = {}, a = 0; a < s.length; a++) {
                var l = s[a],
                  m = n[l],
                  u = e[l],
                  d = m(u, t);
                if (void 0 === d) throw (t && t.type, new Error(c(14)));
                (r[l] = d), (o = o || d !== u);
              }
              return (o = o || s.length !== Object.keys(e).length) ? r : e;
            };
          })({
            comments: ze,
            settings: be((e, t) => {
              t.type === He && Object.assign(e, t.update);
            }, qe),
          });
        var Ve = "NOT_FOUND",
          Be = function (e, t) {
            return e === t;
          };
        function We(e, t) {
          var n,
            o,
            r = "object" == typeof t ? t : { equalityCheck: t },
            i = r.equalityCheck,
            s = void 0 === i ? Be : i,
            a = r.maxSize,
            c = void 0 === a ? 1 : a,
            l = r.resultEqualityCheck,
            m = (function (e) {
              return function (t, n) {
                if (null === t || null === n || t.length !== n.length)
                  return !1;
                for (var o = t.length, r = 0; r < o; r++)
                  if (!e(t[r], n[r])) return !1;
                return !0;
              };
            })(s),
            u =
              1 === c
                ? ((n = m),
                  {
                    get: function (e) {
                      return o && n(o.key, e) ? o.value : Ve;
                    },
                    put: function (e, t) {
                      o = { key: e, value: t };
                    },
                    getEntries: function () {
                      return o ? [o] : [];
                    },
                    clear: function () {
                      o = void 0;
                    },
                  })
                : (function (e, t) {
                    var n = [];
                    function o(e) {
                      var o = n.findIndex(function (n) {
                        return t(e, n.key);
                      });
                      if (o > -1) {
                        var r = n[o];
                        return o > 0 && (n.splice(o, 1), n.unshift(r)), r.value;
                      }
                      return Ve;
                    }
                    return {
                      get: o,
                      put: function (t, r) {
                        o(t) === Ve &&
                          (n.unshift({ key: t, value: r }),
                          n.length > e && n.pop());
                      },
                      getEntries: function () {
                        return n;
                      },
                      clear: function () {
                        n = [];
                      },
                    };
                  })(c, m);
          function d() {
            var t = u.get(arguments);
            if (t === Ve) {
              if (((t = e.apply(null, arguments)), l)) {
                var n = u.getEntries().find(function (e) {
                  return l(e.value, t);
                });
                n && (t = n.value);
              }
              u.put(arguments, t);
            }
            return t;
          }
          return (
            (d.clearCache = function () {
              return u.clear();
            }),
            d
          );
        }
        function Je(e) {
          for (
            var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
            o < t;
            o++
          )
            n[o - 1] = arguments[o];
          return function () {
            for (var t = arguments.length, o = new Array(t), r = 0; r < t; r++)
              o[r] = arguments[r];
            var i,
              s = 0,
              a = { memoizeOptions: void 0 },
              c = o.pop();
            if (
              ("object" == typeof c && ((a = c), (c = o.pop())),
              "function" != typeof c)
            )
              throw new Error(
                "createSelector expects an output function after the inputs, but received: [" +
                  typeof c +
                  "]",
              );
            var l = a.memoizeOptions,
              m = void 0 === l ? n : l,
              u = Array.isArray(m) ? m : [m],
              d = (function (e) {
                var t = Array.isArray(e[0]) ? e[0] : e;
                if (
                  !t.every(function (e) {
                    return "function" == typeof e;
                  })
                ) {
                  var n = t
                    .map(function (e) {
                      return "function" == typeof e
                        ? "function " + (e.name || "unnamed") + "()"
                        : typeof e;
                    })
                    .join(", ");
                  throw new Error(
                    "createSelector expects all input-selectors to be functions, but received the following types: [" +
                      n +
                      "]",
                  );
                }
                return t;
              })(o),
              p = e.apply(
                void 0,
                [
                  function () {
                    return s++, c.apply(null, arguments);
                  },
                ].concat(u),
              ),
              f = e(function () {
                for (var e = [], t = d.length, n = 0; n < t; n++)
                  e.push(d[n].apply(null, arguments));
                return (i = p.apply(null, e));
              });
            return (
              Object.assign(f, {
                resultFunc: c,
                memoizedResultFunc: p,
                dependencies: d,
                lastResult: function () {
                  return i;
                },
                recomputations: function () {
                  return s;
                },
                resetRecomputations: function () {
                  return (s = 0);
                },
              }),
              f
            );
          };
        }
        var Xe = Je(We);
        const Ye = (e) => e.comments.comments,
          Ge = (e) => e.comments.focusedComment;
        function Qe(e) {
          return Xe(Ye, (t) =>
            [...t.values()].filter(
              (t) => t.contentpath === e && !(t.deleted || t.resolved),
            ),
          );
        }
        function Ze(e) {
          return Xe(Ye, (t) => {
            const n = t.get(e);
            if (void 0 === n || (!n.deleted && !n.resolved)) return n;
          });
        }
        const et = Xe(
            Ye,
            (e) => e.comments.remoteCommentCount,
            (e, t) =>
              t !== e.size ||
              Array.from(e.values()).some(
                (e) =>
                  !(
                    !e.deleted &&
                    !e.resolved &&
                    e.replies.size === e.remoteReplyCount &&
                    e.originalText === e.text
                  ) ||
                  Array.from(e.replies.values()).some(
                    (e) => e.deleted || e.originalText !== e.text,
                  ),
              ),
          ),
          tt = (e) =>
            [...e.comments.comments.values()].filter(
              (e) => !e.deleted && !e.resolved,
            ).length;
        var nt = n(1688),
          ot = n.n(nt),
          rt = n(1238);
        const it = new Intl.DateTimeFormat([], {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          st = ({
            commentReply: e,
            store: t,
            onResolve: n,
            onEdit: s,
            onDelete: a,
            descriptionId: c,
            focused: l,
          }) => {
            const { author: m, date: u } = e,
              [d, p] = (0, r.useState)(!1);
            (0, r.useEffect)(() => {
              d && !l && p(!1);
            }, [l]);
            const f = (0, r.useRef)(null),
              h = (0, r.useRef)(null),
              y = (e) => {
                e.preventDefault(), e.stopPropagation(), p(!d);
              };
            (0, r.useEffect)(() => {
              d && setTimeout(() => f.current?.focus(), 1);
            }, [d]);
            const v = (e) => {
              h.current &&
                e.target instanceof Node &&
                !h.current.contains(e.target) &&
                p(!1);
            };
            (0, r.useEffect)(
              () => (
                document.addEventListener("click", v, !0),
                () => {
                  document.removeEventListener("click", v, !0);
                }
              ),
              [],
            );
            const b = new Date(u).toISOString();
            return i().createElement(
              "div",
              { className: "comment-header" },
              i().createElement(
                "div",
                { className: "comment-header__actions" },
                (s || a || n) &&
                  i().createElement(
                    "div",
                    {
                      className:
                        "comment-header__action comment-header__action--more",
                      ref: h,
                    },
                    i().createElement(
                      "details",
                      { open: d, onClick: y },
                      i().createElement(
                        "summary",
                        {
                          "aria-label": (0, o.AP)("More actions"),
                          "aria-haspopup": "menu",
                          role: "button",
                          onClick: y,
                          "aria-expanded": d,
                        },
                        i().createElement(rt.A, { name: "dots-horizontal" }),
                      ),
                      i().createElement(
                        "div",
                        {
                          className: "comment-header__more-actions",
                          role: "menu",
                          ref: f,
                        },
                        s &&
                          i().createElement(
                            "button",
                            {
                              type: "button",
                              role: "menuitem",
                              onClick: async (n) => {
                                n.preventDefault(), s && s(e, t);
                              },
                            },
                            (0, o.AP)("Edit"),
                          ),
                        a &&
                          i().createElement(
                            "button",
                            {
                              type: "button",
                              role: "menuitem",
                              onClick: async (n) => {
                                n.preventDefault(), a && a(e, t);
                              },
                            },
                            (0, o.AP)("Delete"),
                          ),
                        n &&
                          i().createElement(
                            "button",
                            {
                              type: "button",
                              role: "menuitem",
                              onClick: (o) => {
                                o.preventDefault(), n && n(e, t);
                              },
                            },
                            (0, o.AP)("Resolve"),
                          ),
                      ),
                    ),
                  ),
              ),
              m &&
                m.avatarUrl &&
                i().createElement("img", {
                  className: "comment-header__avatar",
                  src: m.avatarUrl,
                  alt: "",
                  decoding: "async",
                  loading: "lazy",
                }),
              i().createElement(
                "span",
                { id: c },
                i().createElement(
                  "p",
                  { className: "comment-header__author" },
                  m ? m.name : "",
                ),
                i().createElement(
                  "p",
                  { className: "comment-header__date" },
                  i().createElement("time", { dateTime: b }, it.format(u)),
                ),
              ),
            );
          },
          at = i().forwardRef(
            (
              {
                value: e,
                className: t,
                placeholder: n,
                onChange: o,
                focusOnMount: r,
                focusTarget: s = !1,
                additionalAttributes: a = {},
              },
              c,
            ) => {
              const l = i().useRef(null);
              return (
                i().useImperativeHandle(c, () => l.current),
                i().useEffect(() => {
                  l.current &&
                    ((l.current.style.height = ""),
                    (l.current.style.height = l.current.scrollHeight + "px"));
                }, [e, l]),
                i().useEffect(() => {
                  r && l.current && l.current.focus();
                }, [l]),
                i().createElement("textarea", {
                  "data-focus-target": s,
                  rows: 1,
                  style: { resize: "none", overflowY: "hidden" },
                  className: t,
                  placeholder: n,
                  ref: l,
                  onChange: (e) => {
                    o && o(e.target.value);
                  },
                  value: e,
                  ...a,
                })
              );
            },
          );
        async function ct(e, t, n) {
          n.dispatch(Se(e.localId, t.localId, { mode: "saving" }));
          try {
            n.dispatch(
              Se(e.localId, t.localId, {
                mode: "default",
                text: t.newText,
                author: t.author,
              }),
            );
          } catch (o) {
            console.error(o),
              n.dispatch(Se(e.localId, t.localId, { mode: "save_error" }));
          }
        }
        async function lt(e, t, n) {
          n.dispatch(Se(e.localId, t.localId, { mode: "deleting" }));
          try {
            n.dispatch(Te(e.localId, t.localId));
          } catch (o) {
            n.dispatch(Se(e.localId, t.localId, { mode: "delete_error" }));
          }
        }
        class mt extends i().Component {
          renderEditing() {
            const { comment: e, reply: t, store: n, isFocused: r } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: t, store: n, focused: r }),
              i().createElement(
                "form",
                {
                  onSubmit: async (o) => {
                    o.preventDefault(), await ct(e, t, n);
                  },
                },
                i().createElement(at, {
                  className: "comment-reply__input",
                  value: t.newText,
                  onChange: (o) => {
                    n.dispatch(Se(e.localId, t.localId, { newText: o }));
                  },
                }),
                i().createElement(
                  "div",
                  { className: "comment-reply__actions" },
                  i().createElement(
                    "button",
                    {
                      type: "submit",
                      disabled: 0 === t.newText.length,
                      className:
                        "comment-reply__button comment-reply__button--primary",
                    },
                    (0, o.AP)("Save"),
                  ),
                  i().createElement(
                    "button",
                    {
                      type: "button",
                      className: "comment-reply__button",
                      onClick: (o) => {
                        o.preventDefault(),
                          n.dispatch(
                            Se(e.localId, t.localId, {
                              mode: "default",
                              newText: t.text,
                            }),
                          );
                      },
                    },
                    (0, o.AP)("Cancel"),
                  ),
                ),
              ),
            );
          }
          renderSaving() {
            const { reply: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement(
                "p",
                { className: "comment-reply__text" },
                e.text,
              ),
              i().createElement(
                "div",
                { className: "comment-reply__progress" },
                (0, o.AP)("Saving..."),
              ),
            );
          }
          renderSaveError() {
            const { comment: e, reply: t, store: n, isFocused: r } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: t, store: n, focused: r }),
              i().createElement(
                "p",
                { className: "comment-reply__text" },
                t.text,
              ),
              i().createElement(
                "div",
                { className: "comment-reply__error" },
                (0, o.AP)("Save error"),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment-reply__button",
                    onClick: async (o) => {
                      o.preventDefault(), await ct(e, t, n);
                    },
                  },
                  (0, o.AP)("Retry"),
                ),
              ),
            );
          }
          renderDeleteConfirm() {
            const { comment: e, reply: t, store: n, isFocused: r } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: t, store: n, focused: r }),
              i().createElement(
                "p",
                { className: "comment-reply__text" },
                t.text,
              ),
              i().createElement(
                "div",
                { className: "comment-reply__confirm-delete" },
                (0, o.AP)("Are you sure?"),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment-reply__button",
                    onClick: (o) => {
                      o.preventDefault(),
                        n.dispatch(
                          Se(e.localId, t.localId, { mode: "default" }),
                        );
                    },
                  },
                  (0, o.AP)("Cancel"),
                ),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className:
                      "comment-reply__button comment-reply__button--primary",
                    onClick: async (o) => {
                      o.preventDefault(), await lt(e, t, n);
                    },
                  },
                  (0, o.AP)("Delete"),
                ),
              ),
            );
          }
          renderDeleting() {
            const { reply: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement(
                "p",
                { className: "comment-reply__text" },
                e.text,
              ),
              i().createElement(
                "div",
                { className: "comment-reply__progress" },
                (0, o.AP)("Deleting"),
              ),
            );
          }
          renderDeleteError() {
            const { comment: e, reply: t, store: n, isFocused: r } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: t, store: n, focused: r }),
              i().createElement(
                "p",
                { className: "comment-reply__text" },
                t.text,
              ),
              i().createElement(
                "div",
                { className: "comment-reply__error" },
                (0, o.AP)("Delete error"),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment-reply__button",
                    onClick: async (o) => {
                      o.preventDefault(),
                        n.dispatch(
                          Se(e.localId, t.localId, { mode: "default" }),
                        );
                    },
                  },
                  (0, o.AP)("Cancel"),
                ),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment-reply__button",
                    onClick: async (o) => {
                      o.preventDefault(), await lt(e, t, n);
                    },
                  },
                  (0, o.AP)("Retry"),
                ),
              ),
            );
          }
          renderDefault() {
            const { comment: e, reply: t, store: n, isFocused: r } = this.props;
            let s, a;
            (null === t.author ||
              (this.props.user && this.props.user.id === t.author.id)) &&
              ((s = () => {
                n.dispatch(
                  Se(e.localId, t.localId, {
                    mode: "editing",
                    newText: t.text,
                  }),
                );
              }),
              (a = () => {
                n.dispatch(
                  Se(e.localId, t.localId, { mode: "delete_confirm" }),
                );
              }));
            let c = "";
            return (
              (t.remoteId && t.text === t.originalText) ||
                (c = (0, o.AP)("Save the page to save this reply")),
              i().createElement(
                i().Fragment,
                null,
                i().createElement(st, {
                  commentReply: t,
                  store: n,
                  onEdit: s,
                  onDelete: a,
                  focused: r,
                }),
                i().createElement(
                  "p",
                  { className: "comment-reply__text" },
                  t.text,
                ),
                c &&
                  i().createElement(
                    "div",
                    { className: "comment__notice-placeholder" },
                    i().createElement(
                      "div",
                      { className: "comment__notice", role: "status" },
                      i().createElement(rt.A, { name: "info-circle" }),
                      c,
                    ),
                  ),
              )
            );
          }
          render() {
            let e;
            switch (this.props.reply.mode) {
              case "editing":
                e = this.renderEditing();
                break;
              case "saving":
                e = this.renderSaving();
                break;
              case "save_error":
                e = this.renderSaveError();
                break;
              case "delete_confirm":
                e = this.renderDeleteConfirm();
                break;
              case "deleting":
                e = this.renderDeleting();
                break;
              case "delete_error":
                e = this.renderDeleteError();
                break;
              default:
                e = this.renderDefault();
            }
            return i().createElement(
              "li",
              {
                key: this.props.reply.localId,
                className: `comment-reply comment-reply--mode-${this.props.reply.mode}`,
                "data-reply-id": this.props.reply.localId,
              },
              e,
            );
          }
        }
        async function ut(e, t) {
          t.dispatch(Oe(e.localId, { mode: "saving" }));
          try {
            t.dispatch(
              Oe(e.localId, {
                mode: "default",
                text: e.newText,
                remoteId: e.remoteId,
                author: e.author,
                date: e.date,
              }),
            );
          } catch (n) {
            console.error(n), t.dispatch(Oe(e.localId, { mode: "save_error" }));
          }
        }
        async function dt(e, t) {
          t.dispatch(Oe(e.localId, { mode: "deleting" }));
          try {
            t.dispatch(ke(e.localId));
          } catch (n) {
            console.error(n),
              t.dispatch(Oe(e.localId, { mode: "delete_error" }));
          }
        }
        function pt(e, t) {
          t.dispatch(Re(e.localId));
        }
        class ft extends i().Component {
          renderReplies({ hideNewReply: e = !1 } = {}) {
            const { comment: t, isFocused: n, store: r, user: s } = this.props;
            if (!t.remoteId) return null;
            const a = [];
            let c,
              l = !1;
            for (const e of t.replies.values())
              ("saving" !== e.mode && "editing" !== e.mode) || (l = !0),
                e.deleted ||
                  a.push(
                    i().createElement(mt, {
                      key: e.localId,
                      store: r,
                      user: s,
                      comment: t,
                      reply: e,
                      isFocused: n,
                    }),
                  );
            if (e || l || (!n && !t.newReply)) {
              if (0 === a.length) return null;
            } else
              c = i().createElement(
                "form",
                {
                  onSubmit: async (e) => {
                    e.preventDefault();
                    const n = Le(b(), s, Date.now(), {
                      text: t.newReply,
                      mode: "default",
                    });
                    r.dispatch(Fe(t.localId, n)),
                      r.dispatch(Oe(t.localId, { newReply: "" }));
                  },
                },
                i().createElement(at, {
                  className: "comment__reply-input",
                  placeholder: (0, o.AP)("Enter your reply..."),
                  value: t.newReply,
                  onChange: (e) => {
                    r.dispatch(Oe(t.localId, { newReply: e }));
                  },
                }),
                i().createElement(
                  "div",
                  { className: "comment__reply-actions" },
                  i().createElement(
                    "button",
                    {
                      disabled: 0 === t.newReply.length,
                      type: "submit",
                      className: "comment__button comment__button--primary",
                    },
                    (0, o.AP)("Reply"),
                  ),
                  i().createElement(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault(),
                          r.dispatch(Oe(t.localId, { newReply: "" })),
                          r.dispatch(De(null)),
                          e.stopPropagation();
                      },
                      className: "comment__button",
                    },
                    (0, o.AP)("Cancel"),
                  ),
                ),
              );
            return i().createElement(
              i().Fragment,
              null,
              i().createElement("ul", { className: "comment__replies" }, a),
              c,
            );
          }
          renderCreating() {
            const { comment: e, store: t, isFocused: n } = this.props,
              r = `comment-description-${e.localId}`;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, {
                descriptionId: r,
                commentReply: e,
                store: t,
                focused: n,
              }),
              i().createElement(
                "form",
                {
                  onSubmit: async (n) => {
                    n.preventDefault(), await ut(e, t);
                  },
                },
                i().createElement(at, {
                  focusTarget: n,
                  className: "comment__input",
                  value: e.newText,
                  onChange: (n) => {
                    t.dispatch(Oe(e.localId, { newText: n }));
                  },
                  placeholder: (0, o.AP)("Enter your comments..."),
                  additionalAttributes: { "aria-describedby": r },
                }),
                i().createElement(
                  "div",
                  { className: "comment__actions" },
                  i().createElement(
                    "button",
                    {
                      disabled: 0 === e.newText.length,
                      type: "submit",
                      className: "comment__button comment__button--primary",
                    },
                    (0, o.AP)("Comment"),
                  ),
                  i().createElement(
                    "button",
                    {
                      type: "button",
                      onClick: (n) => {
                        n.preventDefault(), t.dispatch(ke(e.localId));
                      },
                      className: "comment__button",
                    },
                    (0, o.AP)("Cancel"),
                  ),
                ),
              ),
            );
          }
          renderEditing() {
            const { comment: e, store: t, isFocused: n } = this.props,
              r = `comment-description-${e.localId}`;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, {
                descriptionId: r,
                commentReply: e,
                store: t,
                focused: n,
              }),
              i().createElement(
                "form",
                {
                  onSubmit: async (n) => {
                    n.preventDefault(), await ut(e, t);
                  },
                },
                i().createElement(at, {
                  focusTarget: n,
                  className: "comment__input",
                  value: e.newText,
                  additionalAttributes: { "aria-describedby": r },
                  onChange: (n) => {
                    t.dispatch(Oe(e.localId, { newText: n }));
                  },
                }),
                i().createElement(
                  "div",
                  { className: "comment__actions" },
                  i().createElement(
                    "button",
                    {
                      disabled: 0 === e.newText.length,
                      type: "submit",
                      className: "comment__button comment__button--primary",
                    },
                    (0, o.AP)("Save"),
                  ),
                  i().createElement(
                    "button",
                    {
                      type: "button",
                      onClick: (n) => {
                        n.preventDefault(),
                          t.dispatch(
                            Oe(e.localId, { mode: "default", newText: e.text }),
                          );
                      },
                      className: "comment__button",
                    },
                    (0, o.AP)("Cancel"),
                  ),
                ),
              ),
              this.renderReplies({ hideNewReply: !0 }),
            );
          }
          renderSaving() {
            const { comment: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement("p", { className: "comment__text" }, e.text),
              i().createElement(
                "div",
                { className: "comment__progress" },
                (0, o.AP)("Saving..."),
              ),
              this.renderReplies({ hideNewReply: !0 }),
            );
          }
          renderSaveError() {
            const { comment: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement("p", { className: "comment__text" }, e.text),
              this.renderReplies({ hideNewReply: !0 }),
              i().createElement(
                "div",
                { className: "comment__error" },
                (0, o.AP)("Save error"),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment__button",
                    onClick: async (n) => {
                      n.preventDefault(), await ut(e, t);
                    },
                  },
                  (0, o.AP)("Retry"),
                ),
              ),
            );
          }
          renderDeleteConfirm() {
            const { comment: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement("p", { className: "comment__text" }, e.text),
              i().createElement(
                "div",
                { className: "comment__confirm-delete" },
                (0, o.AP)("Are you sure?"),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment__button button button-small",
                    onClick: (n) => {
                      n.preventDefault(),
                        t.dispatch(Oe(e.localId, { mode: "default" }));
                    },
                  },
                  (0, o.AP)("Cancel"),
                ),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment__button button button-small no",
                    onClick: async (n) => {
                      n.preventDefault(), await dt(e, t);
                    },
                  },
                  (0, o.AP)("Delete"),
                ),
              ),
              this.renderReplies({ hideNewReply: !0 }),
            );
          }
          renderDeleting() {
            const { comment: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement("p", { className: "comment__text" }, e.text),
              i().createElement(
                "div",
                { className: "comment__progress" },
                (0, o.AP)("Deleting"),
              ),
              this.renderReplies({ hideNewReply: !0 }),
            );
          }
          renderDeleteError() {
            const { comment: e, store: t, isFocused: n } = this.props;
            return i().createElement(
              i().Fragment,
              null,
              i().createElement(st, { commentReply: e, store: t, focused: n }),
              i().createElement("p", { className: "comment__text" }, e.text),
              this.renderReplies({ hideNewReply: !0 }),
              i().createElement(
                "div",
                { className: "comment__error" },
                (0, o.AP)("Delete error"),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment__button",
                    onClick: async (n) => {
                      n.preventDefault(),
                        t.dispatch(Oe(e.localId, { mode: "default" }));
                    },
                  },
                  (0, o.AP)("Cancel"),
                ),
                i().createElement(
                  "button",
                  {
                    type: "button",
                    className: "comment__button",
                    onClick: async (n) => {
                      n.preventDefault(), await dt(e, t);
                    },
                  },
                  (0, o.AP)("Retry"),
                ),
              ),
            );
          }
          renderDefault() {
            const { comment: e, store: t, isFocused: n } = this.props;
            let r, s;
            (null === e.author ||
              (this.props.user && this.props.user.id === e.author.id)) &&
              ((r = () => {
                t.dispatch(Oe(e.localId, { mode: "editing", newText: e.text }));
              }),
              (s = () => {
                t.dispatch(Oe(e.localId, { mode: "delete_confirm" }));
              }));
            let a = "";
            return (
              e.remoteId
                ? e.text !== e.originalText &&
                  (a = (0, o.AP)("Save the page to save this comment"))
                : (a = (0, o.AP)("Save the page to add this comment")),
              i().createElement(
                i().Fragment,
                null,
                i().createElement(st, {
                  commentReply: e,
                  store: t,
                  onResolve: pt,
                  onEdit: r,
                  onDelete: s,
                  focused: n,
                }),
                i().createElement("p", { className: "comment__text" }, e.text),
                a &&
                  i().createElement(
                    "div",
                    { className: "comment__notice-placeholder" },
                    i().createElement(
                      "div",
                      { className: "comment__notice", role: "status" },
                      i().createElement(rt.A, { name: "info-circle" }),
                      a,
                    ),
                  ),
                this.renderReplies(),
              )
            );
          }
          render() {
            let e;
            switch (this.props.comment.mode) {
              case "creating":
                e = this.renderCreating();
                break;
              case "editing":
                e = this.renderEditing();
                break;
              case "saving":
                e = this.renderSaving();
                break;
              case "save_error":
                e = this.renderSaveError();
                break;
              case "delete_confirm":
                e = this.renderDeleteConfirm();
                break;
              case "deleting":
                e = this.renderDeleting();
                break;
              case "delete_error":
                e = this.renderDeleteError();
                break;
              default:
                e = this.renderDefault();
            }
            const t = this.props.layout.getCommentPosition(
              this.props.comment.localId,
            );
            return i().createElement(
              ot(),
              {
                focusTrapOptions: {
                  preventScroll: !0,
                  clickOutsideDeactivates: !0,
                  onDeactivate: () => {
                    this.props.store.dispatch(
                      De(null, { updatePinnedComment: !0, forceFocus: !1 }),
                    );
                  },
                  initialFocus: '[data-focus-target="true"]',
                  delayFocus: !1,
                },
                active: this.props.isFocused && this.props.forceFocus,
              },
              i().createElement(
                "li",
                {
                  tabIndex: -1,
                  "data-focus-target":
                    this.props.isFocused &&
                    !["creating", "editing"].includes(this.props.comment.mode),
                  key: this.props.comment.localId,
                  className: `comment comment--mode-${
                    this.props.comment.mode
                  } ${this.props.isFocused ? "comment--focused" : ""}`,
                  style: {
                    position: "absolute",
                    top: `${t}px`,
                    display: this.props.isVisible ? "block" : "none",
                  },
                  "data-comment-id": this.props.comment.localId,
                  onClick: () => {
                    this.props.store.dispatch(
                      De(this.props.comment.localId, {
                        updatePinnedComment: !1,
                        forceFocus:
                          this.props.isFocused && this.props.forceFocus,
                      }),
                    );
                  },
                  onDoubleClick: () => {
                    this.props.store.dispatch(
                      De(this.props.comment.localId, {
                        updatePinnedComment: !0,
                        forceFocus: !0,
                      }),
                    );
                  },
                },
                e,
              ),
            );
          }
          componentDidMount() {
            const e = a().findDOMNode(this);
            e instanceof HTMLElement &&
              (this.props.layout.setCommentElement(
                this.props.comment.localId,
                e,
              ),
              this.props.isVisible &&
                this.props.layout.setCommentHeight(
                  this.props.comment.localId,
                  e.offsetHeight,
                ));
          }
          componentWillUnmount() {
            this.props.layout.setCommentElement(
              this.props.comment.localId,
              null,
            );
          }
          componentDidUpdate() {
            const e = a().findDOMNode(this);
            this.props.isVisible &&
              e instanceof HTMLElement &&
              this.props.layout.setCommentHeight(
                this.props.comment.localId,
                e.offsetHeight,
              );
          }
        }
        function ht({ prefix: e, value: t, fieldName: n }) {
          return i().createElement("input", {
            type: "hidden",
            name: `${e}-${n}`,
            value: null === t ? "" : t,
            id: `id_${e}-${n}`,
          });
        }
        function yt({ reply: e, formNumber: t, prefix: n }) {
          const o = `${n}-${t}`;
          return i().createElement(
            "fieldset",
            null,
            i().createElement(ht, {
              fieldName: "DELETE",
              value: e.deleted ? 1 : "",
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "id",
              value: e.remoteId,
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "text",
              value: e.text,
              prefix: o,
            }),
          );
        }
        function vt({ replies: e, prefix: t, remoteReplyCount: n }) {
          const o = `${t}-replies`,
            r = e.map((e, t) =>
              i().createElement(yt, {
                key: e.localId,
                formNumber: t,
                reply: e,
                prefix: o,
              }),
            );
          return i().createElement(
            i().Fragment,
            null,
            i().createElement(ht, {
              fieldName: "TOTAL_FORMS",
              value: e.length,
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "INITIAL_FORMS",
              value: n,
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "MIN_NUM_FORMS",
              value: "0",
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "MAX_NUM_FORMS",
              value: "",
              prefix: o,
            }),
            r,
          );
        }
        function bt({ comment: e, formNumber: t, prefix: n }) {
          const o = `${n}-${t}`;
          return i().createElement(
            "fieldset",
            null,
            i().createElement(ht, {
              fieldName: "DELETE",
              value: e.deleted ? 1 : "",
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "resolved",
              value: e.resolved ? 1 : "",
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "id",
              value: e.remoteId,
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "contentpath",
              value: e.contentpath,
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "text",
              value: e.text,
              prefix: o,
            }),
            i().createElement(ht, {
              fieldName: "position",
              value: e.position,
              prefix: o,
            }),
            i().createElement(vt, {
              replies: Array.from(e.replies.values()),
              prefix: o,
              remoteReplyCount: e.remoteReplyCount,
            }),
          );
        }
        function gt({ comments: e, remoteCommentCount: t }) {
          const n = "comments",
            o = e.map((e, t) =>
              i().createElement(bt, {
                key: e.localId,
                comment: e,
                formNumber: t,
                prefix: n,
              }),
            );
          return i().createElement(
            i().Fragment,
            null,
            i().createElement(ht, {
              fieldName: "TOTAL_FORMS",
              value: e.length,
              prefix: n,
            }),
            i().createElement(ht, {
              fieldName: "INITIAL_FORMS",
              value: t,
              prefix: n,
            }),
            i().createElement(ht, {
              fieldName: "MIN_NUM_FORMS",
              value: "0",
              prefix: n,
            }),
            i().createElement(ht, {
              fieldName: "MAX_NUM_FORMS",
              value: "",
              prefix: n,
            }),
            o,
          );
        }
        const Et = (e, t) => {
          const n = p(e, String(t), { name: "", avatar_url: "" });
          return { id: t, name: n.name, avatarUrl: n.avatar_url };
        };
        function _t({ store: e, layout: t, comments: n }) {
          const o = e.getState(),
            { user: s, currentTab: a } = o.settings,
            { focusedComment: c, forceFocus: l } = o.comments,
            m = i().useRef(null),
            u = (0, r.useCallback)(
              (e) => {
                if (!m.current) return;
                if (
                  "scroll" === e.type &&
                  !document.querySelector(".form-side--comments")
                )
                  return;
                const t = document.querySelector(".content"),
                  n = t?.getBoundingClientRect().top;
                m.current.style.top = `${n}px`;
              },
              [m],
            );
          let d = n;
          i().useEffect(() => {
            const e = document.querySelector("#main"),
              t = document.querySelector('[data-side-panel="comments"]');
            return (
              e?.addEventListener("scroll", u),
              t?.addEventListener("show", u),
              () => {
                e?.removeEventListener("scroll", u),
                  t?.removeEventListener("show", u);
              }
            );
          }, []),
            s || (d = []),
            (d = d.filter(({ deleted: e, resolved: t }) => !(e || t)));
          const p = d.map((n) =>
            i().createElement(ft, {
              key: n.localId,
              store: e,
              layout: t,
              user: s,
              comment: n,
              isFocused: n.localId === c,
              forceFocus: l,
              isVisible: t.getCommentVisible(a, n.localId),
            }),
          );
          return i().createElement(
            "ol",
            { ref: m, className: "comments-list" },
            p,
          );
        }
        class Ct {
          store;
          layout;
          utils = {
            selectCommentsForContentPathFactory: Qe,
            selectCommentFactory: Ze,
          };
          selectors = {
            selectComments: Ye,
            selectFocused: Ge,
            selectIsDirty: et,
            selectCommentCount: tt,
          };
          actions = Me;
          activationHandlers = [];
          constructor() {
            (this.store = d(Ke, { settings: qe })), (this.layout = new f());
          }
          setUser(e, t) {
            this.store.dispatch($e({ user: Et(t, e) }));
          }
          updateAnnotation(e, t) {
            this.attachAnnotationLayout(e, t),
              this.store.dispatch(Oe(t, { annotation: e }));
          }
          attachAnnotationLayout(e, t) {
            this.layout.setCommentAnnotation(t, e);
          }
          setCurrentTab(e) {
            this.store.dispatch($e({ currentTab: e }));
          }
          makeComment(e, t, n = "") {
            const o = v();
            return (
              this.attachAnnotationLayout(e, o),
              this.store.dispatch(
                xe(
                  Ue(
                    t,
                    n,
                    o,
                    e,
                    this.store.getState().settings.user,
                    Date.now(),
                    { mode: "creating" },
                  ),
                ),
              ),
              this.store.dispatch(
                De(o, { updatePinnedComment: !0, forceFocus: !0 }),
              ),
              o
            );
          }
          activate() {
            this.activationHandlers.forEach((e) => e());
          }
          onActivate(e) {
            this.activationHandlers.push(e);
          }
          invalidateContentPath(e) {
            this.store.dispatch(je(e));
          }
          updateContentPath(e, t) {
            this.store.dispatch(Oe(e, { contentpath: t }));
          }
          renderApp(e, t, n, o, r) {
            let s = null;
            this.setUser(n, r);
            let c = null;
            const l = new URLSearchParams(window.location.search).get(
              "comment",
            );
            l && (c = parseInt(l, 10));
            const m = () => {
              const n = this.store.getState(),
                o = Array.from(n.comments.comments.values());
              a().render(
                i().createElement(gt, {
                  comments: o.filter((e) => "creating" !== e.mode),
                  remoteCommentCount: n.comments.remoteCommentCount,
                }),
                t,
              ),
                n.comments.pinnedComment !== s &&
                  (this.layout.setPinnedComment(n.comments.pinnedComment),
                  (s = n.comments.pinnedComment)),
                a().render(
                  i().createElement(_t, {
                    store: this.store,
                    layout: this.layout,
                    comments: o,
                  }),
                  e,
                  () => {
                    this.layout.refreshDesiredPositions(n.settings.currentTab),
                      this.layout.refreshLayout() &&
                        a().render(
                          i().createElement(_t, {
                            store: this.store,
                            layout: this.layout,
                            comments: o,
                          }),
                          e,
                        );
                  },
                );
            };
            for (const e of o) {
              const t = v();
              this.store.dispatch(
                xe(
                  Ue(
                    e.contentpath,
                    e.position,
                    t,
                    null,
                    Et(r, e.user),
                    Date.parse(e.created_at),
                    {
                      remoteId: e.pk,
                      text: e.text,
                      deleted: e.deleted,
                      resolved: e.resolved,
                    },
                  ),
                ),
              );
              for (const n of e.replies)
                this.store.dispatch(
                  Fe(
                    t,
                    Le(b(), Et(r, n.user), Date.parse(n.created_at), {
                      remoteId: n.pk,
                      text: n.text,
                      deleted: n.deleted,
                    }),
                  ),
                );
              c &&
                e.pk === c &&
                this.store.dispatch(
                  De(t, { updatePinnedComment: !0, forceFocus: !0 }),
                );
            }
            m(),
              this.store.subscribe(m),
              document.body.addEventListener("mousedown", (e) => {
                e.target instanceof HTMLElement &&
                  (e.target.closest(
                    "#comments, [data-annotation], [data-comment-add]",
                  ) ||
                    setTimeout(() => {
                      this.store.dispatch(
                        De(null, { updatePinnedComment: !0, forceFocus: !1 }),
                      );
                    }, 200));
              }),
              document.body.addEventListener(
                "commentAnchorVisibilityChange",
                () => {
                  this.layout.refreshDesiredPositions(
                    this.store.getState().settings.currentTab,
                  ),
                    this.layout.refreshLayout() && m();
                },
              );
          }
        }
        window.comments = (() => {
          const e = new Ct();
          function t(e) {
            return (e.ctrlKey || e.metaKey) && e.altKey && 77 === e.keyCode;
          }
          function n(e) {
            if (e.closest("[data-contentpath-disabled]")) return "";
            let t = e.closest("[data-contentpath]");
            const n = [];
            for (; null !== t; )
              n.push(t.dataset.contentpath),
                (t = t.parentElement.closest("[data-contentpath]"));
            return n.reverse(), n.join(".");
          }
          class r {
            constructor(e, t) {
              (this.node = t), (this.fieldNode = e), (this.unsubscribe = null);
            }
            subscribeToUpdates(t) {
              const { selectFocused: n } = e.selectors,
                o = e.utils.selectCommentFactory(t),
                r = e.store,
                i = r.getState();
              let s = n(i) === t;
              s && this.onFocus(),
                this.show(),
                (this.unsubscribe = r.subscribe(() => {
                  const e = r.getState();
                  o(e) || this.onDelete();
                  const i = n(e) === t;
                  i !== s && (s ? this.onUnfocus() : this.onFocus(), (s = i));
                })),
                this.setOnClickHandler(t);
            }
            onDelete() {
              this.node.remove(), this.unsubscribe && this.unsubscribe();
            }
            onFocus() {
              this.node.classList.add("w-field__comment-button--focused"),
                (this.node.ariaLabel = (0, o.AP)("Unfocus comment"));
            }
            onUnfocus() {
              this.node.classList.remove("w-field__comment-button--focused"),
                (this.node.ariaLabel = (0, o.AP)("Focus comment"));
            }
            show() {
              this.node.classList.remove("!w-hidden");
            }
            hide() {
              this.node.classList.add("!w-hidden");
            }
            setOnClickHandler(t) {
              this.node.addEventListener("click", () => {
                e.activate(),
                  e.store.dispatch(
                    e.actions.setFocusedComment(t, {
                      updatePinnedComment: !0,
                      forceFocus: !0,
                    }),
                  );
              });
            }
            getTab() {
              return this.fieldNode
                .closest('[role="tabpanel"]')
                ?.getAttribute("id");
            }
            getAnchorNode() {
              return this.fieldNode;
            }
          }
          class i extends Error {
            constructor(e, ...t) {
              super(...t),
                (this.name = "MissingElementError"),
                (this.element = e);
            }
          }
          class s {
            constructor({ fieldNode: e, commentAdditionNode: t }) {
              if (((this.fieldNode = e), (this.contentpath = n(e)), !t))
                throw new i(t);
              this.commentAdditionNode = t;
            }
            register() {
              if (!this.contentpath)
                return void this.commentAdditionNode.remove();
              const n = e.store.getState(),
                o = e.utils.selectCommentsForContentPathFactory(
                  this.contentpath,
                );
              let r = o(n);
              const i = e.store.subscribe(() => {
                const t = e.store.getState(),
                  n = o(t);
                r !== n &&
                  ((r = n),
                  r
                    .filter((e) => null === e.annotation)
                    .forEach((t) => {
                      const n = this.getAnnotationForComment(t);
                      e.updateAnnotation(n, t.localId),
                        n.subscribeToUpdates(t.localId);
                    }));
              });
              n.comments.comments.forEach((t) => {
                if (t.contentpath === this.contentpath) {
                  const n = this.getAnnotationForComment(t);
                  e.updateAnnotation(n, t.localId),
                    n.subscribeToUpdates(t.localId);
                }
              });
              const s = () => {
                const t = this.getAnnotationForComment(),
                  n = e.makeComment(t, this.contentpath);
                t.subscribeToUpdates(n);
              };
              return (
                this.commentAdditionNode.addEventListener("click", () => {
                  e.activate(), s();
                }),
                this.fieldNode.addEventListener("keyup", (n) => {
                  t(n) &&
                    (0 === r.length
                      ? s()
                      : e.store.dispatch(
                          e.actions.setFocusedComment(r[0].localId, {
                            updatePinnedComment: !0,
                            forceFocus: !0,
                          }),
                        ));
                }),
                i
              );
            }
            getAnnotationForComment() {
              const t = document.querySelector("#comment-icon").cloneNode(!0);
              return (
                (t.id = ""),
                t.setAttribute(
                  "aria-label",
                  this.commentAdditionNode.getAttribute("aria-label"),
                ),
                t.setAttribute(
                  "aria-describedby",
                  this.commentAdditionNode.getAttribute("aria-describedby"),
                ),
                t.classList.remove("!w-hidden"),
                this.commentAdditionNode.insertAdjacentElement(
                  "beforebegin",
                  t,
                ),
                new r(this.fieldNode, t, e)
              );
            }
          }
          function a(e) {
            new s({
              fieldNode: e.closest("[data-contentpath]"),
              commentAdditionNode: e,
            }).register();
          }
          function c(t) {
            const n = document.getElementById("comments"),
              o = document.getElementById("comments-output"),
              r = document.getElementById("comments-data");
            if (!n || !o || !r)
              throw new Error(
                "Comments app failed to initialise. Missing HTML element",
              );
            const i = JSON.parse(r.textContent);
            e.renderApp(
              n,
              o,
              i.user,
              i.comments,
              new Map(Object.entries(i.authors)),
            ),
              t
                .querySelectorAll('[data-component="add-comment-button"]')
                .forEach(a);
            const s = t.querySelector('[data-tabs] [role="tablist"]');
            s &&
              (e.setCurrentTab(
                s
                  .querySelector('[role="tab"][aria-selected="true"]')
                  .getAttribute("href")
                  .replace("#", ""),
              ),
              s.addEventListener("switch", (t) => {
                e.setCurrentTab(t.detail.tab);
              }));
            const c = document.querySelector("[data-comment-notifications]");
            (c.hidden = !1),
              c.querySelector("input").setAttribute("form", t.id),
              t
                .querySelector(".tab-content")
                .classList.add("tab-content--comments-enabled");
            const l = document.querySelector('[data-side-panel="comments"]');
            e.onActivate(() => {
              l.dispatchEvent(new Event("open"));
            });
            const m = document.querySelector(
                '[data-side-panel-toggle="comments"] [data-side-panel-toggle-counter]',
              ),
              u = () => {
                const t = e.selectors.selectCommentCount(e.store.getState());
                m &&
                  (t > 0
                    ? ((m.innerText = t.toString()), (m.hidden = !1))
                    : (m.hidden = !0));
              };
            e.store.subscribe(u), u();
          }
          return (
            document.addEventListener(
              "w-comments:init",
              ({ target: e }) => {
                setTimeout(() => {
                  c(e);
                });
              },
              { once: !0 },
            ),
            {
              commentApp: e,
              getContentPath: n,
              isCommentShortcut: t,
              initAddCommentButton: a,
              initCommentsInterface: c,
            }
          );
        })();
      },
    },
    n = {};
  function o(e) {
    var r = n[e];
    if (void 0 !== r) return r.exports;
    var i = (n[e] = { id: e, loaded: !1, exports: {} });
    return t[e].call(i.exports, i, i.exports, o), (i.loaded = !0), i.exports;
  }
  (o.m = t),
    (e = []),
    (o.O = (t, n, r, i) => {
      if (!n) {
        var s = 1 / 0;
        for (m = 0; m < e.length; m++) {
          for (var [n, r, i] = e[m], a = !0, c = 0; c < n.length; c++)
            (!1 & i || s >= i) && Object.keys(o.O).every((e) => o.O[e](n[c]))
              ? n.splice(c--, 1)
              : ((a = !1), i < s && (s = i));
          if (a) {
            e.splice(m--, 1);
            var l = r();
            void 0 !== l && (t = l);
          }
        }
        return t;
      }
      i = i || 0;
      for (var m = e.length; m > 0 && e[m - 1][2] > i; m--) e[m] = e[m - 1];
      e[m] = [n, r, i];
    }),
    (o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return o.d(t, { a: t }), t;
    }),
    (o.d = (e, t) => {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (o.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (o.j = 125),
    (() => {
      var e = { 125: 0 };
      o.O.j = (t) => 0 === e[t];
      var t = (t, n) => {
          var r,
            i,
            [s, a, c] = n,
            l = 0;
          if (s.some((t) => 0 !== e[t])) {
            for (r in a) o.o(a, r) && (o.m[r] = a[r]);
            if (c) var m = c(o);
          }
          for (t && t(n); l < s.length; l++)
            (i = s[l]), o.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
          return o.O(m);
        },
        n = (globalThis.webpackChunkwagtail =
          globalThis.webpackChunkwagtail || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })();
  var r = o.O(void 0, [321], () => o(406));
  r = o.O(r);
})();
