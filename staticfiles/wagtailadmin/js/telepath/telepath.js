(() => {
  "use strict";
  var t,
    r,
    n = {
      1003: (t) => {
        function r(t, e, o) {
          return (
            (r = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {}),
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()
              ? Reflect.construct
              : function (t, r, e) {
                  var o = [null];
                  o.push.apply(o, r);
                  var i = new (Function.bind.apply(t, o))();
                  return e && n(i, e.prototype), i;
                }),
            r.apply(null, arguments)
          );
        }
        function n(t, r) {
          return (
            (n =
              Object.setPrototypeOf ||
              function (t, r) {
                return (t.__proto__ = r), t;
              }),
            n(t, r)
          );
        }
        function e(t, r) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, r) {
              if (
                "undefined" != typeof Symbol &&
                Symbol.iterator in Object(t)
              ) {
                var n = [],
                  e = !0,
                  o = !1,
                  i = void 0;
                try {
                  for (
                    var a, u = t[Symbol.iterator]();
                    !(e = (a = u.next()).done) &&
                    (n.push(a.value), !r || n.length !== r);
                    e = !0
                  );
                } catch (t) {
                  (o = !0), (i = t);
                } finally {
                  try {
                    e || null == u.return || u.return();
                  } finally {
                    if (o) throw i;
                  }
                }
                return n;
              }
            })(t, r) ||
            o(t, r) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            })()
          );
        }
        function o(t, r) {
          if (t) {
            if ("string" == typeof t) return i(t, r);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === n && t.constructor && (n = t.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(t)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? i(t, r)
                : void 0
            );
          }
        }
        function i(t, r) {
          (null == r || r > t.length) && (r = t.length);
          for (var n = 0, e = new Array(r); n < r; n++) e[n] = t[n];
          return e;
        }
        function a(t) {
          return (
            (a =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            a(t)
          );
        }
        function u(t, r) {
          for (var n = 0; n < r.length; n++) {
            var e = r[n];
            (e.enumerable = e.enumerable || !1),
              (e.configurable = !0),
              "value" in e && (e.writable = !0),
              Object.defineProperty(t, e.key, e);
          }
        }
        var c = (function () {
          function t() {
            !(function (t, r) {
              if (!(t instanceof r))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.constructors = {});
          }
          var n, c;
          return (
            (n = t),
            (c = [
              {
                key: "register",
                value: function (t, r) {
                  this.constructors[t] = r;
                },
              },
              {
                key: "unpack",
                value: function (t) {
                  var r = {};
                  return this.scanForIds(t, r), this.unpackWithRefs(t, r, {});
                },
              },
              {
                key: "scanForIds",
                value: function (t, r) {
                  var n = this;
                  if (null !== t && "object" === a(t))
                    if (Array.isArray(t))
                      t.forEach(function (t) {
                        return n.scanForIds(t, r);
                      });
                    else {
                      var o = !1;
                      if (
                        ("_id" in t && ((o = !0), (r[t._id] = t)),
                        ("_type" in t || "_val" in t || "_ref" in t) &&
                          (o = !0),
                        "_list" in t &&
                          ((o = !0),
                          t._list.forEach(function (t) {
                            return n.scanForIds(t, r);
                          })),
                        "_args" in t &&
                          ((o = !0),
                          t._args.forEach(function (t) {
                            return n.scanForIds(t, r);
                          })),
                        "_dict" in t)
                      ) {
                        o = !0;
                        for (
                          var i = 0, u = Object.entries(t._dict);
                          i < u.length;
                          i++
                        ) {
                          var c = e(u[i], 2),
                            f = (c[0], c[1]);
                          this.scanForIds(f, r);
                        }
                      }
                      if (!o)
                        for (
                          var s = 0, l = Object.entries(t);
                          s < l.length;
                          s++
                        ) {
                          var y = e(l[s], 2),
                            p = (y[0], y[1]);
                          this.scanForIds(p, r);
                        }
                    }
                },
              },
              {
                key: "unpackWithRefs",
                value: function (t, n, u) {
                  var c,
                    f,
                    s = this;
                  if (null === t || "object" !== a(t)) return t;
                  if (Array.isArray(t))
                    return t.map(function (t) {
                      return s.unpackWithRefs(t, n, u);
                    });
                  if ("_ref" in t)
                    c =
                      t._ref in u
                        ? u[t._ref]
                        : this.unpackWithRefs(n[t._ref], n, u);
                  else if ("_val" in t) c = t._val;
                  else if ("_list" in t)
                    c = t._list.map(function (t) {
                      return s.unpackWithRefs(t, n, u);
                    });
                  else if ("_dict" in t) {
                    c = {};
                    for (
                      var l = 0, y = Object.entries(t._dict);
                      l < y.length;
                      l++
                    ) {
                      var p = e(y[l], 2),
                        h = p[0],
                        d = p[1];
                      c[h] = this.unpackWithRefs(d, n, u);
                    }
                  } else {
                    if (!("_type" in t)) {
                      if ("_id" in t)
                        throw new Error(
                          "telepath encountered object with _id but no type specified",
                        );
                      c = {};
                      for (
                        var b = 0, v = Object.entries(t);
                        b < v.length;
                        b++
                      ) {
                        var _ = e(v[b], 2),
                          m = _[0],
                          w = _[1];
                        c[m] = this.unpackWithRefs(w, n, u);
                      }
                      return c;
                    }
                    var g = t._type;
                    c = r(
                      this.constructors[g],
                      (function (t) {
                        if (Array.isArray(t)) return i(t);
                      })(
                        (f = t._args.map(function (t) {
                          return s.unpackWithRefs(t, n, u);
                        })),
                      ) ||
                        (function (t) {
                          if (
                            "undefined" != typeof Symbol &&
                            Symbol.iterator in Object(t)
                          )
                            return Array.from(t);
                        })(f) ||
                        o(f) ||
                        (function () {
                          throw new TypeError(
                            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                          );
                        })(),
                    );
                  }
                  return "_id" in t && (u[t._id] = c), c;
                },
              },
            ]) && u(n.prototype, c),
            t
          );
        })();
        t.exports = c;
      },
    },
    e = {};
  function o(t) {
    var r = e[t];
    if (void 0 !== r) return r.exports;
    var i = (e[t] = { exports: {} });
    return n[t](i, i.exports, o), i.exports;
  }
  (o.n = (t) => {
    var r = t && t.__esModule ? () => t.default : () => t;
    return o.d(r, { a: r }), r;
  }),
    (o.d = (t, r) => {
      for (var n in r)
        o.o(r, n) &&
          !o.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: r[n] });
    }),
    (o.o = (t, r) => Object.prototype.hasOwnProperty.call(t, r)),
    (t = o(1003)),
    (r = o.n(t)),
    window.telepath || (window.telepath = new (r())());
})();
