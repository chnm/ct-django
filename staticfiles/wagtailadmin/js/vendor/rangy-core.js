!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(e)
    : "undefined" != typeof module && "object" == typeof exports
    ? (module.exports = e())
    : (t.rangy = e());
})(function () {
  function e(e, t) {
    var n = typeof e[t];
    return n == C || !(n != v || !e[t]) || "unknown" == n;
  }
  function t(e, t) {
    return !(typeof e[t] != v || !e[t]);
  }
  function n(e, t) {
    return typeof e[t] != N;
  }
  function r(e) {
    return function (t, n) {
      for (var r = n.length; r--; ) if (!e(t, n[r])) return !1;
      return !0;
    };
  }
  function o(e) {
    return e && T(e, w) && _(e, y);
  }
  function i(e) {
    return t(e, "body") ? e.body : e.getElementsByTagName("body")[0];
  }
  function a(t) {
    typeof console != N && e(console, "log") && console.log(t);
  }
  function s(e, t) {
    x && t ? alert(e) : a(e);
  }
  function c(e) {
    (P.initialized = !0),
      (P.supported = !1),
      s(
        "Rangy is not supported in this environment. Reason: " + e,
        P.config.alertOnFail,
      );
  }
  function d(e) {
    return e.message || e.description || String(e);
  }
  function f() {
    if (x && !P.initialized) {
      var t,
        n = !1,
        r = !1;
      e(document, "createRange") &&
        ((t = document.createRange()), T(t, S) && _(t, E) && (n = !0));
      var s,
        f = i(document);
      if (!f || "body" != f.nodeName.toLowerCase())
        return void c("No body element found");
      if (
        (f &&
          e(f, "createTextRange") &&
          o((t = f.createTextRange())) &&
          (r = !0),
        !n && !r)
      )
        return void c("Neither Range nor TextRange are available");
      for (var u in ((P.initialized = !0),
      (P.features = { implementsDomRange: n, implementsTextRange: r }),
      A))
        (s = A[u]) instanceof h && s.init(s, P);
      for (var l = 0, g = I.length; g > l; ++l)
        try {
          I[l](P);
        } catch (e) {
          a(
            "Rangy init listener threw an exception. Continuing. Detail: " +
              d(e),
          );
        }
    }
  }
  function u(e, t, n) {
    n && (e += " in module " + n.name),
      P.warn(
        "DEPRECATED: " + e + " is deprecated. Please use " + t + " instead.",
      );
  }
  function l(e, t, n, r) {
    e[t] = function () {
      return u(t, n, r), e[n].apply(e, b.toArray(arguments));
    };
  }
  function h(e, t, n) {
    (this.name = e),
      (this.dependencies = t),
      (this.initialized = !1),
      (this.supported = !1),
      (this.initializer = n);
  }
  function g(e, t, n) {
    var r = new h(e, t, function (t) {
      if (!t.initialized) {
        t.initialized = !0;
        try {
          n(P, t), (t.supported = !0);
        } catch (t) {
          a("Module '" + e + "' failed to load: " + d(t)),
            t.stack && a(t.stack);
        }
      }
    });
    return (A[e] = r), r;
  }
  function p() {}
  var m,
    R,
    v = "object",
    C = "function",
    N = "undefined",
    E = [
      "startContainer",
      "startOffset",
      "endContainer",
      "endOffset",
      "collapsed",
      "commonAncestorContainer",
    ],
    S = [
      "setStart",
      "setStartBefore",
      "setStartAfter",
      "setEnd",
      "setEndBefore",
      "setEndAfter",
      "collapse",
      "selectNode",
      "selectNodeContents",
      "compareBoundaryPoints",
      "deleteContents",
      "extractContents",
      "cloneContents",
      "insertNode",
      "surroundContents",
      "cloneRange",
      "toString",
      "detach",
    ],
    y = [
      "boundingHeight",
      "boundingLeft",
      "boundingTop",
      "boundingWidth",
      "htmlText",
      "text",
    ],
    w = [
      "collapse",
      "compareEndPoints",
      "duplicate",
      "moveToElementText",
      "parentElement",
      "select",
      "setEndPoint",
      "getBoundingClientRect",
    ],
    T = r(e),
    O = r(t),
    _ = r(n),
    D = [].forEach
      ? function (e, t) {
          e.forEach(t);
        }
      : function (e, t) {
          for (var n = 0, r = e.length; r > n; ++n) t(e[n], n);
        },
    A = {},
    x = typeof window != N && typeof document != N,
    b = {
      isHostMethod: e,
      isHostObject: t,
      isHostProperty: n,
      areHostMethods: T,
      areHostObjects: O,
      areHostProperties: _,
      isTextRange: o,
      getBody: i,
      forEach: D,
    },
    P = {
      version: "1.3.0",
      initialized: !1,
      isBrowser: x,
      supported: !0,
      util: b,
      features: {},
      modules: A,
      config: {
        alertOnFail: !1,
        alertOnWarn: !1,
        preferTextRange: !1,
        autoInitialize: typeof rangyAutoInitialize == N || rangyAutoInitialize,
      },
    };
  (P.fail = c),
    (P.warn = function (e) {
      s("Rangy warning: " + e, P.config.alertOnWarn);
    }),
    {}.hasOwnProperty
      ? ((b.extend = m =
          function (e, t, n) {
            var r, o;
            for (var i in t)
              t.hasOwnProperty(i) &&
                ((r = e[i]),
                (o = t[i]),
                n &&
                  null !== r &&
                  "object" == typeof r &&
                  null !== o &&
                  "object" == typeof o &&
                  m(r, o, !0),
                (e[i] = o));
            return t.hasOwnProperty("toString") && (e.toString = t.toString), e;
          }),
        (b.createOptions = function (e, t) {
          var n = {};
          return m(n, t), e && m(n, e), n;
        }))
      : c("hasOwnProperty not supported"),
    x || c("Rangy can only run in a browser"),
    (function () {
      var e;
      if (x) {
        var t = document.createElement("div");
        t.appendChild(document.createElement("span"));
        var n = [].slice;
        try {
          1 == n.call(t.childNodes, 0)[0].nodeType &&
            (e = function (e) {
              return n.call(e, 0);
            });
        } catch (e) {}
      }
      e ||
        (e = function (e) {
          for (var t = [], n = 0, r = e.length; r > n; ++n) t[n] = e[n];
          return t;
        }),
        (b.toArray = e);
    })(),
    x &&
      (e(document, "addEventListener")
        ? (R = function (e, t, n) {
            e.addEventListener(t, n, !1);
          })
        : e(document, "attachEvent")
        ? (R = function (e, t, n) {
            e.attachEvent("on" + t, n);
          })
        : c(
            "Document does not have required addEventListener or attachEvent method",
          ),
      (b.addListener = R));
  var I = [];
  (b.deprecationNotice = u),
    (b.createAliasForDeprecatedMethod = l),
    (P.init = f),
    (P.addInitListener = function (e) {
      P.initialized ? e(P) : I.push(e);
    });
  var B = [];
  (P.addShimListener = function (e) {
    B.push(e);
  }),
    x &&
      ((P.shim = P.createMissingNativeApi =
        function (e) {
          (e = e || window), f();
          for (var t = 0, n = B.length; n > t; ++t) B[t](e);
        }),
      l(P, "createMissingNativeApi", "shim")),
    (h.prototype = {
      init: function () {
        for (
          var e, t, n = this.dependencies || [], r = 0, o = n.length;
          o > r;
          ++r
        ) {
          if (((t = n[r]), !((e = A[t]) && e instanceof h)))
            throw new Error("required module '" + t + "' not found");
          if ((e.init(), !e.supported))
            throw new Error("required module '" + t + "' not supported");
        }
        this.initializer(this);
      },
      fail: function (e) {
        throw ((this.initialized = !0), (this.supported = !1), new Error(e));
      },
      warn: function (e) {
        P.warn("Module " + this.name + ": " + e);
      },
      deprecationNotice: function (e, t) {
        P.warn(
          "DEPRECATED: " +
            e +
            " in module " +
            this.name +
            " is deprecated. Please use " +
            t +
            " instead",
        );
      },
      createError: function (e) {
        return new Error("Error in Rangy " + this.name + " module: " + e);
      },
    }),
    (P.createModule = function (e) {
      var t, n;
      2 == arguments.length
        ? ((t = arguments[1]), (n = []))
        : ((t = arguments[2]), (n = arguments[1]));
      var r = g(e, n, t);
      P.initialized && P.supported && r.init();
    }),
    (P.createCoreModule = function (e, t, n) {
      g(e, t, n);
    }),
    (P.RangePrototype = p),
    (P.rangePrototype = new p()),
    (P.selectionPrototype = new (function () {})()),
    P.createCoreModule("DomUtil", [], function (e, t) {
      function n(e) {
        for (var t = 0; (e = e.previousSibling); ) ++t;
        return t;
      }
      function r(e, t) {
        var n,
          r = [];
        for (n = e; n; n = n.parentNode) r.push(n);
        for (n = t; n; n = n.parentNode) if (y(r, n)) return n;
        return null;
      }
      function o(e, t, n) {
        for (var r = n ? t : t.parentNode; r; ) {
          if (r === e) return !0;
          r = r.parentNode;
        }
        return !1;
      }
      function i(e, t, n) {
        for (var r, o = n ? e : e.parentNode; o; ) {
          if ((r = o.parentNode) === t) return o;
          o = r;
        }
        return null;
      }
      function a(e) {
        var t = e.nodeType;
        return 3 == t || 4 == t || 8 == t;
      }
      function s(e, t) {
        var n = t.nextSibling,
          r = t.parentNode;
        return n ? r.insertBefore(e, n) : r.appendChild(e), e;
      }
      function c(e) {
        if (9 == e.nodeType) return e;
        if (typeof e.ownerDocument != R) return e.ownerDocument;
        if (typeof e.document != R) return e.document;
        if (e.parentNode) return c(e.parentNode);
        throw t.createError("getDocument: no document found for node");
      }
      function d(e) {
        var n = c(e);
        if (typeof n.defaultView != R) return n.defaultView;
        if (typeof n.parentWindow != R) return n.parentWindow;
        throw t.createError("Cannot get a window object for node");
      }
      function f(e) {
        if (typeof e.contentDocument != R) return e.contentDocument;
        if (typeof e.contentWindow != R) return e.contentWindow.document;
        throw t.createError(
          "getIframeDocument: No Document object found for iframe element",
        );
      }
      function u(e) {
        return (
          e && v.isHostMethod(e, "setTimeout") && v.isHostObject(e, "document")
        );
      }
      function l(e) {
        try {
          return e.parentNode, !1;
        } catch (e) {
          return !0;
        }
      }
      function h(e) {
        if (!e) return "[No node]";
        if (w && l(e)) return "[Broken node]";
        if (a(e)) return '"' + e.data + '"';
        if (1 == e.nodeType) {
          var t = e.id ? ' id="' + e.id + '"' : "";
          return (
            "<" +
            e.nodeName +
            t +
            ">[index:" +
            n(e) +
            ",length:" +
            e.childNodes.length +
            "][" +
            (e.innerHTML || "[innerHTML not supported]").slice(0, 25) +
            "]"
          );
        }
        return e.nodeName;
      }
      function g(e) {
        (this.root = e), (this._next = e);
      }
      function p(e, t) {
        (this.node = e), (this.offset = t);
      }
      function m(e) {
        (this.code = this[e]),
          (this.codeName = e),
          (this.message = "DOMException: " + this.codeName);
      }
      var R = "undefined",
        v = e.util,
        C = v.getBody;
      v.areHostMethods(document, [
        "createDocumentFragment",
        "createElement",
        "createTextNode",
      ]) || t.fail("document missing a Node creation method"),
        v.isHostMethod(document, "getElementsByTagName") ||
          t.fail("document missing getElementsByTagName method");
      var N = document.createElement("div");
      v.areHostMethods(
        N,
        ["insertBefore", "appendChild", "cloneNode"] ||
          !v.areHostObjects(N, [
            "previousSibling",
            "nextSibling",
            "childNodes",
            "parentNode",
          ]),
      ) || t.fail("Incomplete Element implementation"),
        v.isHostProperty(N, "innerHTML") ||
          t.fail("Element is missing innerHTML property");
      var E = document.createTextNode("test");
      v.areHostMethods(
        E,
        ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] ||
          !v.areHostObjects(N, [
            "previousSibling",
            "nextSibling",
            "childNodes",
            "parentNode",
          ]) ||
          !v.areHostProperties(E, ["data"]),
      ) || t.fail("Incomplete Text Node implementation");
      var S,
        y = function (e, t) {
          for (var n = e.length; n--; ) if (e[n] === t) return !0;
          return !1;
        },
        w = !1;
      !(function () {
        var t = document.createElement("b");
        t.innerHTML = "1";
        var n = t.firstChild;
        (t.innerHTML = "<br />"), (w = l(n)), (e.features.crashyTextNodes = w);
      })(),
        typeof window.getComputedStyle != R
          ? (S = function (e, t) {
              return d(e).getComputedStyle(e, null)[t];
            })
          : typeof document.documentElement.currentStyle != R
          ? (S = function (e, t) {
              return e.currentStyle ? e.currentStyle[t] : "";
            })
          : t.fail("No means of obtaining computed style properties found"),
        (g.prototype = {
          _current: null,
          hasNext: function () {
            return !!this._next;
          },
          next: function () {
            var e,
              t,
              n = (this._current = this._next);
            if (this._current)
              if ((e = n.firstChild)) this._next = e;
              else {
                for (t = null; n !== this.root && !(t = n.nextSibling); )
                  n = n.parentNode;
                this._next = t;
              }
            return this._current;
          },
          detach: function () {
            this._current = this._next = this.root = null;
          },
        }),
        (p.prototype = {
          equals: function (e) {
            return !!e && this.node === e.node && this.offset == e.offset;
          },
          inspect: function () {
            return "[DomPosition(" + h(this.node) + ":" + this.offset + ")]";
          },
          toString: function () {
            return this.inspect();
          },
        }),
        (m.prototype = {
          INDEX_SIZE_ERR: 1,
          HIERARCHY_REQUEST_ERR: 3,
          WRONG_DOCUMENT_ERR: 4,
          NO_MODIFICATION_ALLOWED_ERR: 7,
          NOT_FOUND_ERR: 8,
          NOT_SUPPORTED_ERR: 9,
          INVALID_STATE_ERR: 11,
          INVALID_NODE_TYPE_ERR: 24,
        }),
        (m.prototype.toString = function () {
          return this.message;
        }),
        (e.dom = {
          arrayContains: y,
          isHtmlNamespace: function (e) {
            var t;
            return (
              typeof e.namespaceURI == R ||
              null === (t = e.namespaceURI) ||
              "http://www.w3.org/1999/xhtml" == t
            );
          },
          parentElement: function (e) {
            var t = e.parentNode;
            return 1 == t.nodeType ? t : null;
          },
          getNodeIndex: n,
          getNodeLength: function (e) {
            switch (e.nodeType) {
              case 7:
              case 10:
                return 0;
              case 3:
              case 8:
                return e.length;
              default:
                return e.childNodes.length;
            }
          },
          getCommonAncestor: r,
          isAncestorOf: o,
          isOrIsAncestorOf: function (e, t) {
            return o(e, t, !0);
          },
          getClosestAncestorIn: i,
          isCharacterDataNode: a,
          isTextOrCommentNode: function (e) {
            if (!e) return !1;
            var t = e.nodeType;
            return 3 == t || 8 == t;
          },
          insertAfter: s,
          splitDataNode: function (e, t, r) {
            var o = e.cloneNode(!1);
            if ((o.deleteData(0, t), e.deleteData(t, e.length - t), s(o, e), r))
              for (var i, a = 0; (i = r[a++]); )
                i.node == e && i.offset > t
                  ? ((i.node = o), (i.offset -= t))
                  : i.node == e.parentNode && i.offset > n(e) && ++i.offset;
            return o;
          },
          getDocument: c,
          getWindow: d,
          getIframeWindow: function (e) {
            if (typeof e.contentWindow != R) return e.contentWindow;
            if (typeof e.contentDocument != R)
              return e.contentDocument.defaultView;
            throw t.createError(
              "getIframeWindow: No Window object found for iframe element",
            );
          },
          getIframeDocument: f,
          getBody: C,
          isWindow: u,
          getContentDocument: function (e, t, n) {
            var r;
            if (
              (e
                ? v.isHostProperty(e, "nodeType")
                  ? (r =
                      1 == e.nodeType && "iframe" == e.tagName.toLowerCase()
                        ? f(e)
                        : c(e))
                  : u(e) && (r = e.document)
                : (r = document),
              !r)
            )
              throw t.createError(
                n + "(): Parameter must be a Window object or DOM node",
              );
            return r;
          },
          getRootContainer: function (e) {
            for (var t; (t = e.parentNode); ) e = t;
            return e;
          },
          comparePoints: function (e, o, a, s) {
            var c, d, f, u, l;
            if (e == a) return o === s ? 0 : s > o ? -1 : 1;
            if ((c = i(a, e, !0))) return o <= n(c) ? -1 : 1;
            if ((c = i(e, a, !0))) return n(c) < s ? -1 : 1;
            if (!(d = r(e, a)))
              throw new Error(
                "comparePoints error: nodes have no common ancestor",
              );
            if (
              (f = e === d ? d : i(e, d, !0)) ===
              (u = a === d ? d : i(a, d, !0))
            )
              throw t.createError(
                "comparePoints got to case 4 and childA and childB are the same!",
              );
            for (l = d.firstChild; l; ) {
              if (l === f) return -1;
              if (l === u) return 1;
              l = l.nextSibling;
            }
          },
          isBrokenNode: l,
          inspectNode: h,
          getComputedStyleProperty: S,
          createTestElement: function (e, t, n) {
            var r = C(e),
              o = e.createElement("div");
            (o.contentEditable = "" + !!n), t && (o.innerHTML = t);
            var i = r.firstChild;
            return i ? r.insertBefore(o, i) : r.appendChild(o), o;
          },
          removeNode: function (e) {
            return e.parentNode.removeChild(e);
          },
          fragmentFromNodeChildren: function (e) {
            for (var t, n = c(e).createDocumentFragment(); (t = e.firstChild); )
              n.appendChild(t);
            return n;
          },
          createIterator: function (e) {
            return new g(e);
          },
          DomPosition: p,
        }),
        (e.DOMException = m);
    }),
    P.createCoreModule("DomRange", ["DomUtil"], function (e) {
      function t(e, t) {
        return (
          3 != e.nodeType && (L(e, t.startContainer) || L(e, t.endContainer))
        );
      }
      function n(e) {
        return e.document || W(e.startContainer);
      }
      function r(e) {
        return new B(e.parentNode, k(e));
      }
      function o(e) {
        return new B(e.parentNode, k(e) + 1);
      }
      function i(e, t, n) {
        var r = 11 == e.nodeType ? e.firstChild : e;
        return (
          M(t)
            ? n == t.length
              ? P.insertAfter(e, t)
              : t.parentNode.insertBefore(e, 0 == n ? t : j(t, n))
            : n >= t.childNodes.length
            ? t.appendChild(e)
            : t.insertBefore(e, t.childNodes[n]),
          r
        );
      }
      function a(e, t, r) {
        if ((S(e), S(t), n(t) != n(e))) throw new H("WRONG_DOCUMENT_ERR");
        var o = F(e.startContainer, e.startOffset, t.endContainer, t.endOffset),
          i = F(e.endContainer, e.endOffset, t.startContainer, t.startOffset);
        return r ? 0 >= o && i >= 0 : 0 > o && i > 0;
      }
      function s(e) {
        for (
          var t, r, o, i = n(e.range).createDocumentFragment();
          (r = e.next());

        ) {
          if (
            ((t = e.isPartiallySelectedSubtree()),
            (r = r.cloneNode(!t)),
            t &&
              ((o = e.getSubtreeIterator()), r.appendChild(s(o)), o.detach()),
            10 == r.nodeType)
          )
            throw new H("HIERARCHY_REQUEST_ERR");
          i.appendChild(r);
        }
        return i;
      }
      function c(e, t, n) {
        var r, o, i, a;
        for (n = n || { stop: !1 }; (i = e.next()); )
          if (e.isPartiallySelectedSubtree()) {
            if (!1 === t(i)) return void (n.stop = !0);
            if ((c((a = e.getSubtreeIterator()), t, n), a.detach(), n.stop))
              return;
          } else
            for (r = P.createIterator(i); (o = r.next()); )
              if (!1 === t(o)) return void (n.stop = !0);
      }
      function d(e) {
        for (var t; e.next(); )
          e.isPartiallySelectedSubtree()
            ? (d((t = e.getSubtreeIterator())), t.detach())
            : e.remove();
      }
      function f(e) {
        for (
          var t, r, o = n(e.range).createDocumentFragment();
          (t = e.next());

        ) {
          if (
            (e.isPartiallySelectedSubtree()
              ? ((t = t.cloneNode(!1)),
                (r = e.getSubtreeIterator()),
                t.appendChild(f(r)),
                r.detach())
              : e.remove(),
            10 == t.nodeType)
          )
            throw new H("HIERARCHY_REQUEST_ERR");
          o.appendChild(t);
        }
        return o;
      }
      function u(e) {
        return (
          "[" +
          (void 0 === e.getName ? "Range" : e.getName()) +
          "(" +
          P.inspectNode(e.startContainer) +
          ":" +
          e.startOffset +
          ", " +
          P.inspectNode(e.endContainer) +
          ":" +
          e.endOffset +
          ")]"
        );
      }
      function l(e, t) {
        if (
          ((this.range = e),
          (this.clonePartiallySelectedTextNodes = t),
          !e.collapsed)
        ) {
          (this.sc = e.startContainer),
            (this.so = e.startOffset),
            (this.ec = e.endContainer),
            (this.eo = e.endOffset);
          var n = e.commonAncestorContainer;
          this.sc === this.ec && M(this.sc)
            ? ((this.isSingleCharacterDataNode = !0),
              (this._first = this._last = this._next = this.sc))
            : ((this._first = this._next =
                this.sc !== n || M(this.sc)
                  ? z(this.sc, n, !0)
                  : this.sc.childNodes[this.so]),
              (this._last =
                this.ec !== n || M(this.ec)
                  ? z(this.ec, n, !0)
                  : this.ec.childNodes[this.eo - 1]));
        }
      }
      function h(e) {
        return function (t, n) {
          for (var r, o = n ? t : t.parentNode; o; ) {
            if (((r = o.nodeType), V(e, r))) return o;
            o = o.parentNode;
          }
          return null;
        };
      }
      function g(e, t) {
        if (ee(e, t)) throw new H("INVALID_NODE_TYPE_ERR");
      }
      function p(e, t) {
        if (!V(t, e.nodeType)) throw new H("INVALID_NODE_TYPE_ERR");
      }
      function m(e, t) {
        if (0 > t || t > (M(e) ? e.length : e.childNodes.length))
          throw new H("INDEX_SIZE_ERR");
      }
      function R(e, t) {
        if (J(e, !0) !== J(t, !0)) throw new H("WRONG_DOCUMENT_ERR");
      }
      function v(e) {
        if (K(e, !0)) throw new H("NO_MODIFICATION_ALLOWED_ERR");
      }
      function C(e, t) {
        if (!e) throw new H(t);
      }
      function N(e, t) {
        return t <= (M(e) ? e.length : e.childNodes.length);
      }
      function E(e) {
        return (
          !!e.startContainer &&
          !!e.endContainer &&
          !(
            Y &&
            (P.isBrokenNode(e.startContainer) || P.isBrokenNode(e.endContainer))
          ) &&
          q(e.startContainer) == q(e.endContainer) &&
          N(e.startContainer, e.startOffset) &&
          N(e.endContainer, e.endOffset)
        );
      }
      function S(e) {
        if (!E(e))
          throw new Error(
            "Range error: Range is not valid. This usually happens after DOM mutation. Range: (" +
              e.inspect() +
              ")",
          );
      }
      function y(e, t) {
        S(e);
        var n = e.startContainer,
          r = e.startOffset,
          o = e.endContainer,
          i = e.endOffset,
          a = n === o;
        M(o) && i > 0 && i < o.length && j(o, i, t),
          M(n) &&
            r > 0 &&
            r < n.length &&
            ((n = j(n, r, t)),
            a ? ((i -= r), (o = n)) : o == n.parentNode && i >= k(n) && i++,
            (r = 0)),
          e.setStartAndEnd(n, r, o, i);
      }
      function w(e) {
        S(e);
        var t = e.commonAncestorContainer.parentNode.cloneNode(!1);
        return t.appendChild(e.cloneContents()), t.innerHTML;
      }
      function T(e) {
        (e.START_TO_START = ie),
          (e.START_TO_END = ae),
          (e.END_TO_END = se),
          (e.END_TO_START = ce),
          (e.NODE_BEFORE = de),
          (e.NODE_AFTER = fe),
          (e.NODE_BEFORE_AND_AFTER = ue),
          (e.NODE_INSIDE = le);
      }
      function O(e) {
        T(e), T(e.prototype);
      }
      function _(e, t) {
        return function () {
          S(this);
          var n,
            r = this.startContainer,
            i = this.startOffset,
            a = this.commonAncestorContainer,
            s = new l(this, !0);
          r !== a && ((r = (n = o(z(r, a, !0))).node), (i = n.offset)),
            c(s, v),
            s.reset();
          var d = e(s);
          return s.detach(), t(this, r, i, r, i), d;
        };
      }
      function D(n, i) {
        function a(e, t) {
          return function (n) {
            p(n, G), p(q(n), X);
            var i = (e ? r : o)(n);
            (t ? s : c)(this, i.node, i.offset);
          };
        }
        function s(e, t, n) {
          var r = e.endContainer,
            o = e.endOffset;
          (t !== e.startContainer || n !== e.startOffset) &&
            ((q(t) != q(r) || 1 == F(t, n, r, o)) && ((r = t), (o = n)),
            i(e, t, n, r, o));
        }
        function c(e, t, n) {
          var r = e.startContainer,
            o = e.startOffset;
          (t !== e.endContainer || n !== e.endOffset) &&
            ((q(t) != q(r) || -1 == F(t, n, r, o)) && ((r = t), (o = n)),
            i(e, r, o, t, n));
        }
        var u = function () {};
        (u.prototype = e.rangePrototype),
          (n.prototype = new u()),
          I.extend(n.prototype, {
            setStart: function (e, t) {
              g(e, !0), m(e, t), s(this, e, t);
            },
            setEnd: function (e, t) {
              g(e, !0), m(e, t), c(this, e, t);
            },
            setStartAndEnd: function () {
              var e = arguments,
                t = e[0],
                n = e[1],
                r = t,
                o = n;
              switch (e.length) {
                case 3:
                  o = e[2];
                  break;
                case 4:
                  (r = e[2]), (o = e[3]);
              }
              i(this, t, n, r, o);
            },
            setBoundary: function (e, t, n) {
              this["set" + (n ? "Start" : "End")](e, t);
            },
            setStartBefore: a(!0, !0),
            setStartAfter: a(!1, !0),
            setEndBefore: a(!0, !1),
            setEndAfter: a(!1, !1),
            collapse: function (e) {
              S(this),
                e
                  ? i(
                      this,
                      this.startContainer,
                      this.startOffset,
                      this.startContainer,
                      this.startOffset,
                    )
                  : i(
                      this,
                      this.endContainer,
                      this.endOffset,
                      this.endContainer,
                      this.endOffset,
                    );
            },
            selectNodeContents: function (e) {
              g(e, !0), i(this, e, 0, e, U(e));
            },
            selectNode: function (e) {
              g(e, !1), p(e, G);
              var t = r(e),
                n = o(e);
              i(this, t.node, t.offset, n.node, n.offset);
            },
            extractContents: _(f, i),
            deleteContents: _(d, i),
            canSurroundContents: function () {
              S(this), v(this.startContainer), v(this.endContainer);
              var e = new l(this, !0),
                n =
                  (e._first && t(e._first, this)) ||
                  (e._last && t(e._last, this));
              return e.detach(), !n;
            },
            splitBoundaries: function () {
              y(this);
            },
            splitBoundariesPreservingPositions: function (e) {
              y(this, e);
            },
            normalizeBoundaries: function () {
              S(this);
              var e,
                t = this.startContainer,
                n = this.startOffset,
                r = this.endContainer,
                o = this.endOffset,
                a = function (e) {
                  var t = e.nextSibling;
                  t &&
                    t.nodeType == e.nodeType &&
                    ((r = e), (o = e.length), e.appendData(t.data), Q(t));
                },
                s = function (e) {
                  var i = e.previousSibling;
                  if (i && i.nodeType == e.nodeType) {
                    t = e;
                    var a = e.length;
                    if (((n = i.length), e.insertData(0, i.data), Q(i), t == r))
                      (o += n), (r = t);
                    else if (r == e.parentNode) {
                      var s = k(e);
                      o == s ? ((r = e), (o = a)) : o > s && o--;
                    }
                  }
                },
                c = !0;
              if (M(r))
                o == r.length
                  ? a(r)
                  : 0 == o &&
                    (e = r.previousSibling) &&
                    e.nodeType == r.nodeType &&
                    ((o = e.length),
                    t == r && (c = !1),
                    e.appendData(r.data),
                    Q(r),
                    (r = e));
              else {
                if (o > 0) {
                  var d = r.childNodes[o - 1];
                  d && M(d) && a(d);
                }
                c = !this.collapsed;
              }
              if (c) {
                if (M(t))
                  0 == n
                    ? s(t)
                    : n == t.length &&
                      (e = t.nextSibling) &&
                      e.nodeType == t.nodeType &&
                      (r == e && ((r = t), (o += t.length)),
                      t.appendData(e.data),
                      Q(e));
                else if (n < t.childNodes.length) {
                  var f = t.childNodes[n];
                  f && M(f) && s(f);
                }
              } else (t = r), (n = o);
              i(this, t, n, r, o);
            },
            collapseToPoint: function (e, t) {
              g(e, !0), m(e, t), this.setStartAndEnd(e, t);
            },
          }),
          O(n);
      }
      function A(e) {
        (e.collapsed =
          e.startContainer === e.endContainer && e.startOffset === e.endOffset),
          (e.commonAncestorContainer = e.collapsed
            ? e.startContainer
            : P.getCommonAncestor(e.startContainer, e.endContainer));
      }
      function x(e, t, n, r, o) {
        (e.startContainer = t),
          (e.startOffset = n),
          (e.endContainer = r),
          (e.endOffset = o),
          (e.document = P.getDocument(t)),
          A(e);
      }
      function b(e) {
        (this.startContainer = e),
          (this.startOffset = 0),
          (this.endContainer = e),
          (this.endOffset = 0),
          (this.document = e),
          A(this);
      }
      var P = e.dom,
        I = e.util,
        B = P.DomPosition,
        H = e.DOMException,
        M = P.isCharacterDataNode,
        k = P.getNodeIndex,
        L = P.isOrIsAncestorOf,
        W = P.getDocument,
        F = P.comparePoints,
        j = P.splitDataNode,
        z = P.getClosestAncestorIn,
        U = P.getNodeLength,
        V = P.arrayContains,
        q = P.getRootContainer,
        Y = e.features.crashyTextNodes,
        Q = P.removeNode;
      l.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: !1,
        reset: function () {
          (this._current = null), (this._next = this._first);
        },
        hasNext: function () {
          return !!this._next;
        },
        next: function () {
          var e = (this._current = this._next);
          return (
            e &&
              ((this._next = e !== this._last ? e.nextSibling : null),
              M(e) &&
                this.clonePartiallySelectedTextNodes &&
                (e === this.ec &&
                  (e = e.cloneNode(!0)).deleteData(this.eo, e.length - this.eo),
                this._current === this.sc &&
                  (e = e.cloneNode(!0)).deleteData(0, this.so))),
            e
          );
        },
        remove: function () {
          var e,
            t,
            n = this._current;
          !M(n) || (n !== this.sc && n !== this.ec)
            ? n.parentNode && Q(n)
            : (e = n === this.sc ? this.so : 0) !=
                (t = n === this.ec ? this.eo : n.length) &&
              n.deleteData(e, t - e);
        },
        isPartiallySelectedSubtree: function () {
          return t(this._current, this.range);
        },
        getSubtreeIterator: function () {
          var e;
          if (this.isSingleCharacterDataNode)
            (e = this.range.cloneRange()).collapse(!1);
          else {
            e = new b(n(this.range));
            var t = this._current,
              r = t,
              o = 0,
              i = t,
              a = U(t);
            L(t, this.sc) && ((r = this.sc), (o = this.so)),
              L(t, this.ec) && ((i = this.ec), (a = this.eo)),
              x(e, r, o, i, a);
          }
          return new l(e, this.clonePartiallySelectedTextNodes);
        },
        detach: function () {
          this.range =
            this._current =
            this._next =
            this._first =
            this._last =
            this.sc =
            this.so =
            this.ec =
            this.eo =
              null;
        },
      };
      var G = [1, 3, 4, 5, 7, 8, 10],
        X = [2, 9, 11],
        Z = [1, 3, 4, 5, 7, 8, 10, 11],
        $ = [1, 3, 4, 5, 7, 8],
        J = h([9, 11]),
        K = h([5, 6, 10, 12]),
        ee = h([6, 10, 12]),
        te = document.createElement("style"),
        ne = !1;
      try {
        (te.innerHTML = "<b>x</b>"), (ne = 3 == te.firstChild.nodeType);
      } catch (e) {}
      e.features.htmlParsingConforms = ne;
      var re = ne
          ? function (e) {
              var t = this.startContainer,
                n = W(t);
              if (!t) throw new H("INVALID_STATE_ERR");
              var r = null;
              return (
                1 == t.nodeType ? (r = t) : M(t) && (r = P.parentElement(t)),
                ((r =
                  null === r ||
                  ("HTML" == r.nodeName &&
                    P.isHtmlNamespace(W(r).documentElement) &&
                    P.isHtmlNamespace(r))
                    ? n.createElement("body")
                    : r.cloneNode(!1)).innerHTML = e),
                P.fragmentFromNodeChildren(r)
              );
            }
          : function (e) {
              var t = n(this).createElement("body");
              return (t.innerHTML = e), P.fragmentFromNodeChildren(t);
            },
        oe = [
          "startContainer",
          "startOffset",
          "endContainer",
          "endOffset",
          "collapsed",
          "commonAncestorContainer",
        ],
        ie = 0,
        ae = 1,
        se = 2,
        ce = 3,
        de = 0,
        fe = 1,
        ue = 2,
        le = 3;
      I.extend(e.rangePrototype, {
        compareBoundaryPoints: function (e, t) {
          S(this), R(this.startContainer, t.startContainer);
          var n,
            r,
            o,
            i,
            a = e == ce || e == ie ? "start" : "end",
            s = e == ae || e == ie ? "start" : "end";
          return (
            (n = this[a + "Container"]),
            (r = this[a + "Offset"]),
            (o = t[s + "Container"]),
            (i = t[s + "Offset"]),
            F(n, r, o, i)
          );
        },
        insertNode: function (e) {
          if (
            (S(this),
            p(e, Z),
            v(this.startContainer),
            L(e, this.startContainer))
          )
            throw new H("HIERARCHY_REQUEST_ERR");
          var t = i(e, this.startContainer, this.startOffset);
          this.setStartBefore(t);
        },
        cloneContents: function () {
          var e, t;
          if ((S(this), this.collapsed))
            return n(this).createDocumentFragment();
          if (
            this.startContainer === this.endContainer &&
            M(this.startContainer)
          )
            return (
              ((e = this.startContainer.cloneNode(!0)).data = e.data.slice(
                this.startOffset,
                this.endOffset,
              )),
              (t = n(this).createDocumentFragment()).appendChild(e),
              t
            );
          var r = new l(this, !0);
          return (e = s(r)), r.detach(), e;
        },
        canSurroundContents: function () {
          S(this), v(this.startContainer), v(this.endContainer);
          var e = new l(this, !0),
            n =
              (e._first && t(e._first, this)) || (e._last && t(e._last, this));
          return e.detach(), !n;
        },
        surroundContents: function (e) {
          if ((p(e, $), !this.canSurroundContents()))
            throw new H("INVALID_STATE_ERR");
          var t = this.extractContents();
          if (e.hasChildNodes())
            for (; e.lastChild; ) e.removeChild(e.lastChild);
          i(e, this.startContainer, this.startOffset),
            e.appendChild(t),
            this.selectNode(e);
        },
        cloneRange: function () {
          S(this);
          for (var e, t = new b(n(this)), r = oe.length; r--; )
            t[(e = oe[r])] = this[e];
          return t;
        },
        toString: function () {
          S(this);
          var e = this.startContainer;
          if (e === this.endContainer && M(e))
            return 3 == e.nodeType || 4 == e.nodeType
              ? e.data.slice(this.startOffset, this.endOffset)
              : "";
          var t = [],
            n = new l(this, !0);
          return (
            c(n, function (e) {
              (3 == e.nodeType || 4 == e.nodeType) && t.push(e.data);
            }),
            n.detach(),
            t.join("")
          );
        },
        compareNode: function (e) {
          S(this);
          var t = e.parentNode,
            n = k(e);
          if (!t) throw new H("NOT_FOUND_ERR");
          var r = this.comparePoint(t, n),
            o = this.comparePoint(t, n + 1);
          return 0 > r ? (o > 0 ? ue : de) : o > 0 ? fe : le;
        },
        comparePoint: function (e, t) {
          return (
            S(this),
            C(e, "HIERARCHY_REQUEST_ERR"),
            R(e, this.startContainer),
            F(e, t, this.startContainer, this.startOffset) < 0
              ? -1
              : F(e, t, this.endContainer, this.endOffset) > 0
              ? 1
              : 0
          );
        },
        createContextualFragment: re,
        toHtml: function () {
          return w(this);
        },
        intersectsNode: function (e, t) {
          if (
            (S(this),
            q(e) !=
              (function (e) {
                return q(e.startContainer);
              })(this))
          )
            return !1;
          var n = e.parentNode,
            r = k(e);
          if (!n) return !0;
          var o = F(n, r, this.endContainer, this.endOffset),
            i = F(n, r + 1, this.startContainer, this.startOffset);
          return t ? 0 >= o && i >= 0 : 0 > o && i > 0;
        },
        isPointInRange: function (e, t) {
          return (
            S(this),
            C(e, "HIERARCHY_REQUEST_ERR"),
            R(e, this.startContainer),
            F(e, t, this.startContainer, this.startOffset) >= 0 &&
              F(e, t, this.endContainer, this.endOffset) <= 0
          );
        },
        intersectsRange: function (e) {
          return a(this, e, !1);
        },
        intersectsOrTouchesRange: function (e) {
          return a(this, e, !0);
        },
        intersection: function (e) {
          if (this.intersectsRange(e)) {
            var t = F(
                this.startContainer,
                this.startOffset,
                e.startContainer,
                e.startOffset,
              ),
              n = F(
                this.endContainer,
                this.endOffset,
                e.endContainer,
                e.endOffset,
              ),
              r = this.cloneRange();
            return (
              -1 == t && r.setStart(e.startContainer, e.startOffset),
              1 == n && r.setEnd(e.endContainer, e.endOffset),
              r
            );
          }
          return null;
        },
        union: function (e) {
          if (this.intersectsOrTouchesRange(e)) {
            var t = this.cloneRange();
            return (
              -1 ==
                F(
                  e.startContainer,
                  e.startOffset,
                  this.startContainer,
                  this.startOffset,
                ) && t.setStart(e.startContainer, e.startOffset),
              1 ==
                F(
                  e.endContainer,
                  e.endOffset,
                  this.endContainer,
                  this.endOffset,
                ) && t.setEnd(e.endContainer, e.endOffset),
              t
            );
          }
          throw new H("Ranges do not intersect");
        },
        containsNode: function (e, t) {
          return t ? this.intersectsNode(e, !1) : this.compareNode(e) == le;
        },
        containsNodeContents: function (e) {
          return (
            this.comparePoint(e, 0) >= 0 && this.comparePoint(e, U(e)) <= 0
          );
        },
        containsRange: function (e) {
          var t = this.intersection(e);
          return null !== t && e.equals(t);
        },
        containsNodeText: function (e) {
          var t = this.cloneRange();
          t.selectNode(e);
          var n = t.getNodes([3]);
          if (n.length > 0) {
            t.setStart(n[0], 0);
            var r = n.pop();
            return t.setEnd(r, r.length), this.containsRange(t);
          }
          return this.containsNodeContents(e);
        },
        getNodes: function (e, t) {
          return (
            S(this),
            (function (e, t, n) {
              var r,
                o = !(!t || !t.length),
                i = !!n;
              o && (r = new RegExp("^(" + t.join("|") + ")$"));
              var a = [];
              return (
                c(new l(e, !1), function (t) {
                  if (!((o && !r.test(t.nodeType)) || (i && !n(t)))) {
                    var s = e.startContainer;
                    if (t != s || !M(s) || e.startOffset != s.length) {
                      var c = e.endContainer;
                      (t == c && M(c) && 0 == e.endOffset) || a.push(t);
                    }
                  }
                }),
                a
              );
            })(this, e, t)
          );
        },
        getDocument: function () {
          return n(this);
        },
        collapseBefore: function (e) {
          this.setEndBefore(e), this.collapse(!1);
        },
        collapseAfter: function (e) {
          this.setStartAfter(e), this.collapse(!0);
        },
        getBookmark: function (t) {
          var r = n(this),
            o = e.createRange(r);
          (t = t || P.getBody(r)), o.selectNodeContents(t);
          var i = this.intersection(o),
            a = 0,
            s = 0;
          return (
            i &&
              (o.setEnd(i.startContainer, i.startOffset),
              (s = (a = o.toString().length) + i.toString().length)),
            { start: a, end: s, containerNode: t }
          );
        },
        moveToBookmark: function (e) {
          var t = e.containerNode,
            n = 0;
          this.setStart(t, 0), this.collapse(!0);
          for (var r, o, i, a, s = [t], c = !1, d = !1; !d && (r = s.pop()); )
            if (3 == r.nodeType)
              (o = n + r.length),
                !c &&
                  e.start >= n &&
                  e.start <= o &&
                  (this.setStart(r, e.start - n), (c = !0)),
                c &&
                  e.end >= n &&
                  e.end <= o &&
                  (this.setEnd(r, e.end - n), (d = !0)),
                (n = o);
            else for (i = (a = r.childNodes).length; i--; ) s.push(a[i]);
        },
        getName: function () {
          return "DomRange";
        },
        equals: function (e) {
          return b.rangesEqual(this, e);
        },
        isValid: function () {
          return E(this);
        },
        inspect: function () {
          return u(this);
        },
        detach: function () {},
      }),
        D(b, x),
        I.extend(b, {
          rangeProperties: oe,
          RangeIterator: l,
          copyComparisonConstants: O,
          createPrototypeRange: D,
          inspect: u,
          toHtml: w,
          getRangeDocument: n,
          rangesEqual: function (e, t) {
            return (
              e.startContainer === t.startContainer &&
              e.startOffset === t.startOffset &&
              e.endContainer === t.endContainer &&
              e.endOffset === t.endOffset
            );
          },
        }),
        (e.DomRange = b);
    }),
    P.createCoreModule("WrappedRange", ["DomRange"], function (e, t) {
      var n,
        r,
        o = e.dom,
        i = e.util,
        a = o.DomPosition,
        s = e.DomRange,
        c = o.getBody,
        d = o.getContentDocument,
        f = o.isCharacterDataNode;
      if (
        (e.features.implementsDomRange &&
          (function () {
            function r(e) {
              for (var t, n = u.length; n--; ) e[(t = u[n])] = e.nativeRange[t];
              e.collapsed =
                e.startContainer === e.endContainer &&
                e.startOffset === e.endOffset;
            }
            var a,
              f,
              u = s.rangeProperties;
            (n = function (e) {
              if (!e)
                throw t.createError("WrappedRange: Range must be specified");
              (this.nativeRange = e), r(this);
            }),
              s.createPrototypeRange(n, function (e, t, n, r, o) {
                var i = e.startContainer !== t || e.startOffset != n,
                  a = e.endContainer !== r || e.endOffset != o,
                  s = !e.equals(e.nativeRange);
                (i || a || s) && (e.setEnd(r, o), e.setStart(t, n));
              }),
              ((a = n.prototype).selectNode = function (e) {
                this.nativeRange.selectNode(e), r(this);
              }),
              (a.cloneContents = function () {
                return this.nativeRange.cloneContents();
              }),
              (a.surroundContents = function (e) {
                this.nativeRange.surroundContents(e), r(this);
              }),
              (a.collapse = function (e) {
                this.nativeRange.collapse(e), r(this);
              }),
              (a.cloneRange = function () {
                return new n(this.nativeRange.cloneRange());
              }),
              (a.refresh = function () {
                r(this);
              }),
              (a.toString = function () {
                return this.nativeRange.toString();
              });
            var l = document.createTextNode("test");
            c(document).appendChild(l);
            var h = document.createRange();
            h.setStart(l, 0), h.setEnd(l, 0);
            try {
              h.setStart(l, 1),
                (a.setStart = function (e, t) {
                  this.nativeRange.setStart(e, t), r(this);
                }),
                (a.setEnd = function (e, t) {
                  this.nativeRange.setEnd(e, t), r(this);
                }),
                (f = function (e) {
                  return function (t) {
                    this.nativeRange[e](t), r(this);
                  };
                });
            } catch (e) {
              (a.setStart = function (e, t) {
                try {
                  this.nativeRange.setStart(e, t);
                } catch (n) {
                  this.nativeRange.setEnd(e, t),
                    this.nativeRange.setStart(e, t);
                }
                r(this);
              }),
                (a.setEnd = function (e, t) {
                  try {
                    this.nativeRange.setEnd(e, t);
                  } catch (n) {
                    this.nativeRange.setStart(e, t),
                      this.nativeRange.setEnd(e, t);
                  }
                  r(this);
                }),
                (f = function (e, t) {
                  return function (n) {
                    try {
                      this.nativeRange[e](n);
                    } catch (r) {
                      this.nativeRange[t](n), this.nativeRange[e](n);
                    }
                    r(this);
                  };
                });
            }
            (a.setStartBefore = f("setStartBefore", "setEndBefore")),
              (a.setStartAfter = f("setStartAfter", "setEndAfter")),
              (a.setEndBefore = f("setEndBefore", "setStartBefore")),
              (a.setEndAfter = f("setEndAfter", "setStartAfter")),
              (a.selectNodeContents = function (e) {
                this.setStartAndEnd(e, 0, o.getNodeLength(e));
              }),
              h.selectNodeContents(l),
              h.setEnd(l, 3);
            var g = document.createRange();
            g.selectNodeContents(l),
              g.setEnd(l, 4),
              g.setStart(l, 2),
              (a.compareBoundaryPoints =
                -1 == h.compareBoundaryPoints(h.START_TO_END, g) &&
                1 == h.compareBoundaryPoints(h.END_TO_START, g)
                  ? function (e, t) {
                      return (
                        e == (t = t.nativeRange || t).START_TO_END
                          ? (e = t.END_TO_START)
                          : e == t.END_TO_START && (e = t.START_TO_END),
                        this.nativeRange.compareBoundaryPoints(e, t)
                      );
                    }
                  : function (e, t) {
                      return this.nativeRange.compareBoundaryPoints(
                        e,
                        t.nativeRange || t,
                      );
                    });
            var p = document.createElement("div");
            p.innerHTML = "123";
            var m = p.firstChild,
              R = c(document);
            R.appendChild(p),
              h.setStart(m, 1),
              h.setEnd(m, 2),
              h.deleteContents(),
              "13" == m.data &&
                ((a.deleteContents = function () {
                  this.nativeRange.deleteContents(), r(this);
                }),
                (a.extractContents = function () {
                  var e = this.nativeRange.extractContents();
                  return r(this), e;
                })),
              R.removeChild(p),
              (R = null),
              i.isHostMethod(h, "createContextualFragment") &&
                (a.createContextualFragment = function (e) {
                  return this.nativeRange.createContextualFragment(e);
                }),
              c(document).removeChild(l),
              (a.getName = function () {
                return "WrappedRange";
              }),
              (e.WrappedRange = n),
              (e.createNativeRange = function (e) {
                return (e = d(e, t, "createNativeRange")).createRange();
              });
          })(),
        e.features.implementsTextRange)
      ) {
        var u = function (e, t, n, r, i) {
            var s = e.duplicate();
            s.collapse(n);
            var c = s.parentElement();
            if ((o.isOrIsAncestorOf(t, c) || (c = t), !c.canHaveHTML)) {
              var d = new a(c.parentNode, o.getNodeIndex(c));
              return {
                boundaryPosition: d,
                nodeInfo: { nodeIndex: d.offset, containerElement: d.node },
              };
            }
            var u = o.getDocument(c).createElement("span");
            u.parentNode && o.removeNode(u);
            for (
              var l,
                h,
                g,
                p,
                m,
                R = n ? "StartToStart" : "StartToEnd",
                v = i && i.containerElement == c ? i.nodeIndex : 0,
                C = c.childNodes.length,
                N = C,
                E = N;
              E == C ? c.appendChild(u) : c.insertBefore(u, c.childNodes[E]),
                s.moveToElementText(u),
                0 != (l = s.compareEndPoints(R, e)) && v != N;

            ) {
              if (-1 == l) {
                if (N == v + 1) break;
                v = E;
              } else N = N == v + 1 ? v : E;
              (E = Math.floor((v + N) / 2)), c.removeChild(u);
            }
            if (((m = u.nextSibling), -1 == l && m && f(m))) {
              var S;
              if (
                (s.setEndPoint(n ? "EndToStart" : "EndToEnd", e),
                /[\r\n]/.test(m.data))
              ) {
                var y = s.duplicate(),
                  w = y.text.replace(/\r\n/g, "\r").length;
                for (
                  S = y.moveStart("character", w);
                  -1 == (l = y.compareEndPoints("StartToEnd", y));

                )
                  S++, y.moveStart("character", 1);
              } else S = s.text.length;
              p = new a(m, S);
            } else
              (h = (r || !n) && u.previousSibling),
                (p =
                  (g = (r || n) && u.nextSibling) && f(g)
                    ? new a(g, 0)
                    : h && f(h)
                    ? new a(h, h.data.length)
                    : new a(c, o.getNodeIndex(u)));
            return (
              o.removeNode(u),
              {
                boundaryPosition: p,
                nodeInfo: { nodeIndex: E, containerElement: c },
              }
            );
          },
          l = function (e, t) {
            var n,
              r,
              i,
              a,
              s = e.offset,
              d = o.getDocument(e.node),
              u = c(d).createTextRange(),
              l = f(e.node);
            return (
              l
                ? (r = (n = e.node).parentNode)
                : ((n = s < (a = e.node.childNodes).length ? a[s] : null),
                  (r = e.node)),
              ((i = d.createElement("span")).innerHTML = "&#feff;"),
              n ? r.insertBefore(i, n) : r.appendChild(i),
              u.moveToElementText(i),
              u.collapse(!t),
              r.removeChild(i),
              l && u[t ? "moveStart" : "moveEnd"]("character", s),
              u
            );
          };
        (r = function (e) {
          (this.textRange = e), this.refresh();
        }),
          ((r.prototype = new s(document)).refresh = function () {
            var e,
              t,
              n,
              r = (function (e) {
                var t = e.parentElement(),
                  n = e.duplicate();
                n.collapse(!0);
                var r = n.parentElement();
                (n = e.duplicate()).collapse(!1);
                var i = n.parentElement(),
                  a = r == i ? r : o.getCommonAncestor(r, i);
                return a == t ? a : o.getCommonAncestor(t, a);
              })(this.textRange);
            !(function (e) {
              return 0 == e.compareEndPoints("StartToEnd", e);
            })(this.textRange)
              ? ((e = (n = u(this.textRange, r, !0, !1)).boundaryPosition),
                (t = u(this.textRange, r, !1, !1, n.nodeInfo).boundaryPosition))
              : (t = e = u(this.textRange, r, !0, !0).boundaryPosition),
              this.setStart(e.node, e.offset),
              this.setEnd(t.node, t.offset);
          }),
          (r.prototype.getName = function () {
            return "WrappedTextRange";
          }),
          s.copyComparisonConstants(r);
        var h = function (e) {
          if (e.collapsed) return l(new a(e.startContainer, e.startOffset), !0);
          var t = l(new a(e.startContainer, e.startOffset), !0),
            n = l(new a(e.endContainer, e.endOffset), !1),
            r = c(s.getRangeDocument(e)).createTextRange();
          return (
            r.setEndPoint("StartToStart", t), r.setEndPoint("EndToEnd", n), r
          );
        };
        if (
          ((r.rangeToTextRange = h),
          (r.prototype.toTextRange = function () {
            return h(this);
          }),
          (e.WrappedTextRange = r),
          !e.features.implementsDomRange || e.config.preferTextRange)
        ) {
          var g = Function("return this;")();
          void 0 === g.Range && (g.Range = r),
            (e.createNativeRange = function (e) {
              return (e = d(e, t, "createNativeRange")), c(e).createTextRange();
            }),
            (e.WrappedRange = r);
        }
      }
      (e.createRange = function (n) {
        return (
          (n = d(n, t, "createRange")),
          new e.WrappedRange(e.createNativeRange(n))
        );
      }),
        (e.createRangyRange = function (e) {
          return (e = d(e, t, "createRangyRange")), new s(e);
        }),
        i.createAliasForDeprecatedMethod(e, "createIframeRange", "createRange"),
        i.createAliasForDeprecatedMethod(
          e,
          "createIframeRangyRange",
          "createRangyRange",
        ),
        e.addShimListener(function (t) {
          var n = t.document;
          void 0 === n.createRange &&
            (n.createRange = function () {
              return e.createRange(n);
            }),
            (n = t = null);
        });
    }),
    P.createCoreModule(
      "WrappedSelection",
      ["DomRange", "WrappedRange"],
      function (e, t) {
        function n(e) {
          return "string" == typeof e ? /^backward(s)?$/i.test(e) : !!e;
        }
        function r(e, n) {
          if (e) {
            if (T.isWindow(e)) return e;
            if (e instanceof g) return e.win;
            var r = T.getContentDocument(e, t, n);
            return T.getWindow(r);
          }
          return window;
        }
        function o(e) {
          return r(e, "getDocSelection").document.selection;
        }
        function i(e) {
          var t = !1;
          return (
            e.anchorNode &&
              (t =
                1 ==
                T.comparePoints(
                  e.anchorNode,
                  e.anchorOffset,
                  e.focusNode,
                  e.focusOffset,
                )),
            t
          );
        }
        function a(e, t, n) {
          var r = n ? "end" : "start",
            o = n ? "start" : "end";
          (e.anchorNode = t[r + "Container"]),
            (e.anchorOffset = t[r + "Offset"]),
            (e.focusNode = t[o + "Container"]),
            (e.focusOffset = t[o + "Offset"]);
        }
        function s(e) {
          (e.anchorNode = e.focusNode = null),
            (e.anchorOffset = e.focusOffset = 0),
            (e.rangeCount = 0),
            (e.isCollapsed = !0),
            (e._ranges.length = 0);
        }
        function c(t) {
          var n;
          return (
            t instanceof D
              ? ((n = e.createNativeRange(t.getDocument())).setEnd(
                  t.endContainer,
                  t.endOffset,
                ),
                n.setStart(t.startContainer, t.startOffset))
              : t instanceof A
              ? (n = t.nativeRange)
              : P.implementsDomRange &&
                t instanceof T.getWindow(t.startContainer).Range &&
                (n = t),
            n
          );
        }
        function d(e) {
          var n = e.getNodes();
          if (
            !(function (e) {
              if (!e.length || 1 != e[0].nodeType) return !1;
              for (var t = 1, n = e.length; n > t; ++t)
                if (!T.isAncestorOf(e[0], e[t])) return !1;
              return !0;
            })(n)
          )
            throw t.createError(
              "getSingleElementFromRange: range " +
                e.inspect() +
                " did not consist of a single element",
            );
          return n[0];
        }
        function f(e) {
          return !!e && void 0 !== e.text;
        }
        function u(e, t) {
          var n = new A(t);
          (e._ranges = [n]),
            a(e, n, !1),
            (e.rangeCount = 1),
            (e.isCollapsed = n.collapsed);
        }
        function l(t) {
          if (((t._ranges.length = 0), "None" == t.docSelection.type)) s(t);
          else {
            var n = t.docSelection.createRange();
            if (f(n)) u(t, n);
            else {
              t.rangeCount = n.length;
              for (var r, o = B(n.item(0)), i = 0; i < t.rangeCount; ++i)
                (r = e.createRange(o)).selectNode(n.item(i)), t._ranges.push(r);
              (t.isCollapsed = 1 == t.rangeCount && t._ranges[0].collapsed),
                a(t, t._ranges[t.rangeCount - 1], !1);
            }
          }
        }
        function h(e, n) {
          for (
            var r = e.docSelection.createRange(),
              o = d(n),
              i = B(r.item(0)),
              a = H(i).createControlRange(),
              s = 0,
              c = r.length;
            c > s;
            ++s
          )
            a.add(r.item(s));
          try {
            a.add(o);
          } catch (e) {
            throw t.createError(
              "addRange(): Element within the specified Range could not be added to control selection (does it have layout?)",
            );
          }
          a.select(), l(e);
        }
        function g(e, t, n) {
          (this.nativeSelection = e),
            (this.docSelection = t),
            (this._ranges = []),
            (this.win = n),
            this.refresh();
        }
        function p(e) {
          (e.win = e.anchorNode = e.focusNode = e._ranges = null),
            (e.rangeCount = e.anchorOffset = e.focusOffset = 0),
            (e.detached = !0);
        }
        function m(e, t) {
          for (var n, r, o = J.length; o--; )
            if (((r = (n = J[o]).selection), "deleteAll" == t)) p(r);
            else if (n.win == e)
              return "delete" == t ? (J.splice(o, 1), !0) : r;
          return "deleteAll" == t && (J.length = 0), null;
        }
        function R(e, n) {
          for (
            var r,
              o = B(n[0].startContainer),
              i = H(o).createControlRange(),
              a = 0,
              s = n.length;
            s > a;
            ++a
          ) {
            r = d(n[a]);
            try {
              i.add(r);
            } catch (e) {
              throw t.createError(
                "setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)",
              );
            }
          }
          i.select(), l(e);
        }
        function v(e, t) {
          if (e.win.document != B(t)) throw new x("WRONG_DOCUMENT_ERR");
        }
        function C(t) {
          return function (n, r) {
            var o;
            this.rangeCount
              ? (o = this.getRangeAt(0))["set" + (t ? "Start" : "End")](n, r)
              : (o = e.createRange(this.win.document)).setStartAndEnd(n, r),
              this.setSingleRange(o, this.isBackward());
          };
        }
        function N(e) {
          var t = [],
            n = new b(e.anchorNode, e.anchorOffset),
            r = new b(e.focusNode, e.focusOffset),
            o = "function" == typeof e.getName ? e.getName() : "Selection";
          if (void 0 !== e.rangeCount)
            for (var i = 0, a = e.rangeCount; a > i; ++i)
              t[i] = D.inspect(e.getRangeAt(i));
          return (
            "[" +
            o +
            "(Ranges: " +
            t.join(", ") +
            ")(anchor: " +
            n.inspect() +
            ", focus: " +
            r.inspect() +
            "]"
          );
        }
        e.config.checkSelectionRanges = !0;
        var E,
          S,
          y = "boolean",
          w = "number",
          T = e.dom,
          O = e.util,
          _ = O.isHostMethod,
          D = e.DomRange,
          A = e.WrappedRange,
          x = e.DOMException,
          b = T.DomPosition,
          P = e.features,
          I = "Control",
          B = T.getDocument,
          H = T.getBody,
          M = D.rangesEqual,
          k = _(window, "getSelection"),
          L = O.isHostObject(document, "selection");
        (P.implementsWinGetSelection = k), (P.implementsDocSelection = L);
        var W = L && (!k || e.config.preferTextRange);
        if (W)
          (E = o),
            (e.isSelectionValid = function (e) {
              var t = r(e, "isSelectionValid").document,
                n = t.selection;
              return (
                "None" != n.type || B(n.createRange().parentElement()) == t
              );
            });
        else {
          if (!k)
            return (
              t.fail(
                "Neither document.selection or window.getSelection() detected.",
              ),
              !1
            );
          (E = function (e) {
            return r(e, "getWinSelection").getSelection();
          }),
            (e.isSelectionValid = function () {
              return !0;
            });
        }
        e.getNativeSelection = E;
        var F = E();
        if (!F)
          return t.fail("Native selection was null (possibly issue 138?)"), !1;
        var j = e.createNativeRange(document),
          z = H(document),
          U = O.areHostProperties(F, [
            "anchorNode",
            "focusNode",
            "anchorOffset",
            "focusOffset",
          ]);
        P.selectionHasAnchorAndFocus = U;
        var V = _(F, "extend");
        P.selectionHasExtend = V;
        var q = typeof F.rangeCount == w;
        P.selectionHasRangeCount = q;
        var Y = !1,
          Q = !0,
          G = V
            ? function (t, n) {
                var r = D.getRangeDocument(n),
                  o = e.createRange(r);
                o.collapseToPoint(n.endContainer, n.endOffset),
                  t.addRange(c(o)),
                  t.extend(n.startContainer, n.startOffset);
              }
            : null;
        O.areHostMethods(F, ["addRange", "getRangeAt", "removeAllRanges"]) &&
          typeof F.rangeCount == w &&
          P.implementsDomRange &&
          (function () {
            var t = window.getSelection();
            if (t) {
              for (
                var n = t.rangeCount, r = n > 1, o = [], a = i(t), s = 0;
                n > s;
                ++s
              )
                o[s] = t.getRangeAt(s);
              var c = T.createTestElement(document, "", !1),
                d = c.appendChild(document.createTextNode("   ")),
                f = document.createRange();
              if (
                (f.setStart(d, 1),
                f.collapse(!0),
                t.removeAllRanges(),
                t.addRange(f),
                (Q = 1 == t.rangeCount),
                t.removeAllRanges(),
                !r)
              ) {
                var u = window.navigator.appVersion.match(/Chrome\/(.*?) /);
                if (u && parseInt(u[1]) >= 36) Y = !1;
                else {
                  var l = f.cloneRange();
                  f.setStart(d, 0),
                    l.setEnd(d, 3),
                    l.setStart(d, 2),
                    t.addRange(f),
                    t.addRange(l),
                    (Y = 2 == t.rangeCount);
                }
              }
              for (T.removeNode(c), t.removeAllRanges(), s = 0; n > s; ++s)
                0 == s && a
                  ? G
                    ? G(t, o[s])
                    : (e.warn(
                        "Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend",
                      ),
                      t.addRange(o[s]))
                  : t.addRange(o[s]);
            }
          })(),
          (P.selectionSupportsMultipleRanges = Y),
          (P.collapsedNonEditableSelectionsSupported = Q);
        var X,
          Z,
          $ = !1;
        z &&
          _(z, "createControlRange") &&
          ((X = z.createControlRange()),
          O.areHostProperties(X, ["item", "add"]) && ($ = !0)),
          (P.implementsControlRange = $),
          (S = U
            ? function (e) {
                return (
                  e.anchorNode === e.focusNode &&
                  e.anchorOffset === e.focusOffset
                );
              }
            : function (e) {
                return (
                  !!e.rangeCount && e.getRangeAt(e.rangeCount - 1).collapsed
                );
              }),
          _(F, "getRangeAt")
            ? (Z = function (e, t) {
                try {
                  return e.getRangeAt(t);
                } catch (e) {
                  return null;
                }
              })
            : U &&
              (Z = function (t) {
                var n = B(t.anchorNode),
                  r = e.createRange(n);
                return (
                  r.setStartAndEnd(
                    t.anchorNode,
                    t.anchorOffset,
                    t.focusNode,
                    t.focusOffset,
                  ),
                  r.collapsed !== this.isCollapsed &&
                    r.setStartAndEnd(
                      t.focusNode,
                      t.focusOffset,
                      t.anchorNode,
                      t.anchorOffset,
                    ),
                  r
                );
              }),
          (g.prototype = e.selectionPrototype);
        var J = [],
          K = function (e) {
            if (e && e instanceof g) return e.refresh(), e;
            var t = m((e = r(e, "getNativeSelection"))),
              n = E(e),
              i = L ? o(e) : null;
            return (
              t
                ? ((t.nativeSelection = n), (t.docSelection = i), t.refresh())
                : ((t = new g(n, i, e)), J.push({ win: e, selection: t })),
              t
            );
          };
        (e.getSelection = K),
          O.createAliasForDeprecatedMethod(
            e,
            "getIframeSelection",
            "getSelection",
          );
        var ee,
          te = g.prototype;
        if (!W && U && O.areHostMethods(F, ["removeAllRanges", "addRange"])) {
          te.removeAllRanges = function () {
            this.nativeSelection.removeAllRanges(), s(this);
          };
          var ne = function (e, t) {
            G(e.nativeSelection, t), e.refresh();
          };
          (te.addRange = q
            ? function (t, r) {
                if ($ && L && this.docSelection.type == I) h(this, t);
                else if (n(r) && V) ne(this, t);
                else {
                  var o;
                  Y ? (o = this.rangeCount) : (this.removeAllRanges(), (o = 0));
                  var i = c(t).cloneRange();
                  try {
                    this.nativeSelection.addRange(i);
                  } catch (e) {}
                  if (
                    ((this.rangeCount = this.nativeSelection.rangeCount),
                    this.rangeCount == o + 1)
                  ) {
                    if (e.config.checkSelectionRanges) {
                      var s = Z(this.nativeSelection, this.rangeCount - 1);
                      s && !M(s, t) && (t = new A(s));
                    }
                    (this._ranges[this.rangeCount - 1] = t),
                      a(this, t, re(this.nativeSelection)),
                      (this.isCollapsed = S(this));
                  } else this.refresh();
                }
              }
            : function (e, t) {
                n(t) && V
                  ? ne(this, e)
                  : (this.nativeSelection.addRange(c(e)), this.refresh());
              }),
            (te.setRanges = function (e) {
              if ($ && L && e.length > 1) R(this, e);
              else {
                this.removeAllRanges();
                for (var t = 0, n = e.length; n > t; ++t) this.addRange(e[t]);
              }
            });
        } else {
          if (!(_(F, "empty") && _(j, "select") && $ && W))
            return (
              t.fail("No means of selecting a Range or TextRange was found"), !1
            );
          (te.removeAllRanges = function () {
            try {
              if (
                (this.docSelection.empty(), "None" != this.docSelection.type)
              ) {
                var e;
                if (this.anchorNode) e = B(this.anchorNode);
                else if (this.docSelection.type == I) {
                  var t = this.docSelection.createRange();
                  t.length && (e = B(t.item(0)));
                }
                e &&
                  (H(e).createTextRange().select(), this.docSelection.empty());
              }
            } catch (e) {}
            s(this);
          }),
            (te.addRange = function (t) {
              this.docSelection.type == I
                ? h(this, t)
                : (e.WrappedTextRange.rangeToTextRange(t).select(),
                  (this._ranges[0] = t),
                  (this.rangeCount = 1),
                  (this.isCollapsed = this._ranges[0].collapsed),
                  a(this, t, !1));
            }),
            (te.setRanges = function (e) {
              this.removeAllRanges();
              var t = e.length;
              t > 1 ? R(this, e) : t && this.addRange(e[0]);
            });
        }
        if (
          ((te.getRangeAt = function (e) {
            if (0 > e || e >= this.rangeCount) throw new x("INDEX_SIZE_ERR");
            return this._ranges[e].cloneRange();
          }),
          W)
        )
          ee = function (t) {
            var n;
            e.isSelectionValid(t.win)
              ? (n = t.docSelection.createRange())
              : (n = H(t.win.document).createTextRange()).collapse(!0),
              t.docSelection.type == I ? l(t) : f(n) ? u(t, n) : s(t);
          };
        else if (_(F, "getRangeAt") && typeof F.rangeCount == w)
          ee = function (t) {
            if ($ && L && t.docSelection.type == I) l(t);
            else if (
              ((t._ranges.length = t.rangeCount = t.nativeSelection.rangeCount),
              t.rangeCount)
            ) {
              for (var n = 0, r = t.rangeCount; r > n; ++n)
                t._ranges[n] = new e.WrappedRange(
                  t.nativeSelection.getRangeAt(n),
                );
              a(t, t._ranges[t.rangeCount - 1], re(t.nativeSelection)),
                (t.isCollapsed = S(t));
            } else s(t);
          };
        else {
          if (
            !U ||
            typeof F.isCollapsed != y ||
            typeof j.collapsed != y ||
            !P.implementsDomRange
          )
            return (
              t.fail(
                "No means of obtaining a Range or TextRange from the user's selection was found",
              ),
              !1
            );
          ee = function (e) {
            var t,
              n = e.nativeSelection;
            n.anchorNode
              ? ((t = Z(n, 0)),
                (e._ranges = [t]),
                (e.rangeCount = 1),
                (function (e) {
                  var t = e.nativeSelection;
                  (e.anchorNode = t.anchorNode),
                    (e.anchorOffset = t.anchorOffset),
                    (e.focusNode = t.focusNode),
                    (e.focusOffset = t.focusOffset);
                })(e),
                (e.isCollapsed = S(e)))
              : s(e);
          };
        }
        te.refresh = function (e) {
          var t = e ? this._ranges.slice(0) : null,
            n = this.anchorNode,
            r = this.anchorOffset;
          if ((ee(this), e)) {
            var o = t.length;
            if (o != this._ranges.length) return !0;
            if (this.anchorNode != n || this.anchorOffset != r) return !0;
            for (; o--; ) if (!M(t[o], this._ranges[o])) return !0;
            return !1;
          }
        };
        var re,
          oe = function (e, t) {
            var n = e.getAllRanges();
            e.removeAllRanges();
            for (var r = 0, o = n.length; o > r; ++r)
              M(t, n[r]) || e.addRange(n[r]);
            e.rangeCount || s(e);
          };
        (te.removeRange =
          $ && L
            ? function (e) {
                if (this.docSelection.type == I) {
                  for (
                    var t = this.docSelection.createRange(),
                      n = d(e),
                      r = B(t.item(0)),
                      o = H(r).createControlRange(),
                      i = !1,
                      a = 0,
                      s = t.length;
                    s > a;
                    ++a
                  )
                    t.item(a) !== n || i ? o.add(t.item(a)) : (i = !0);
                  o.select(), l(this);
                } else oe(this, e);
              }
            : function (e) {
                oe(this, e);
              }),
          !W && U && P.implementsDomRange
            ? ((re = i),
              (te.isBackward = function () {
                return re(this);
              }))
            : (re = te.isBackward =
                function () {
                  return !1;
                }),
          (te.isBackwards = te.isBackward),
          (te.toString = function () {
            for (var e = [], t = 0, n = this.rangeCount; n > t; ++t)
              e[t] = "" + this._ranges[t];
            return e.join("");
          }),
          (te.collapse = function (t, n) {
            v(this, t);
            var r = e.createRange(t);
            r.collapseToPoint(t, n),
              this.setSingleRange(r),
              (this.isCollapsed = !0);
          }),
          (te.collapseToStart = function () {
            if (!this.rangeCount) throw new x("INVALID_STATE_ERR");
            var e = this._ranges[0];
            this.collapse(e.startContainer, e.startOffset);
          }),
          (te.collapseToEnd = function () {
            if (!this.rangeCount) throw new x("INVALID_STATE_ERR");
            var e = this._ranges[this.rangeCount - 1];
            this.collapse(e.endContainer, e.endOffset);
          }),
          (te.selectAllChildren = function (t) {
            v(this, t);
            var n = e.createRange(t);
            n.selectNodeContents(t), this.setSingleRange(n);
          }),
          (te.deleteFromDocument = function () {
            if ($ && L && this.docSelection.type == I) {
              for (var e, t = this.docSelection.createRange(); t.length; )
                (e = t.item(0)), t.remove(e), T.removeNode(e);
              this.refresh();
            } else if (this.rangeCount) {
              var n = this.getAllRanges();
              if (n.length) {
                this.removeAllRanges();
                for (var r = 0, o = n.length; o > r; ++r) n[r].deleteContents();
                this.addRange(n[o - 1]);
              }
            }
          }),
          (te.eachRange = function (e, t) {
            for (var n = 0, r = this._ranges.length; r > n; ++n)
              if (e(this.getRangeAt(n))) return t;
          }),
          (te.getAllRanges = function () {
            var e = [];
            return (
              this.eachRange(function (t) {
                e.push(t);
              }),
              e
            );
          }),
          (te.setSingleRange = function (e, t) {
            this.removeAllRanges(), this.addRange(e, t);
          }),
          (te.callMethodOnEachRange = function (e, t) {
            var n = [];
            return (
              this.eachRange(function (r) {
                n.push(r[e].apply(r, t || []));
              }),
              n
            );
          }),
          (te.setStart = C(!0)),
          (te.setEnd = C(!1)),
          (e.rangePrototype.select = function (e) {
            K(this.getDocument()).setSingleRange(this, e);
          }),
          (te.changeEachRange = function (e) {
            var t = [],
              n = this.isBackward();
            this.eachRange(function (n) {
              e(n), t.push(n);
            }),
              this.removeAllRanges(),
              n && 1 == t.length
                ? this.addRange(t[0], "backward")
                : this.setRanges(t);
          }),
          (te.containsNode = function (e, t) {
            return (
              this.eachRange(function (n) {
                return n.containsNode(e, t);
              }, !0) || !1
            );
          }),
          (te.getBookmark = function (e) {
            return {
              backward: this.isBackward(),
              rangeBookmarks: this.callMethodOnEachRange("getBookmark", [e]),
            };
          }),
          (te.moveToBookmark = function (t) {
            for (var n, r, o = [], i = 0; (n = t.rangeBookmarks[i++]); )
              (r = e.createRange(this.win)).moveToBookmark(n), o.push(r);
            t.backward
              ? this.setSingleRange(o[0], "backward")
              : this.setRanges(o);
          }),
          (te.saveRanges = function () {
            return {
              backward: this.isBackward(),
              ranges: this.callMethodOnEachRange("cloneRange"),
            };
          }),
          (te.restoreRanges = function (e) {
            this.removeAllRanges();
            for (var t, n = 0; (t = e.ranges[n]); ++n)
              this.addRange(t, e.backward && 0 == n);
          }),
          (te.toHtml = function () {
            var e = [];
            return (
              this.eachRange(function (t) {
                e.push(D.toHtml(t));
              }),
              e.join("")
            );
          }),
          P.implementsTextRange &&
            (te.getNativeTextRange = function () {
              var n;
              if ((n = this.docSelection)) {
                var r = n.createRange();
                if (f(r)) return r;
                throw t.createError(
                  "getNativeTextRange: selection is a control selection",
                );
              }
              if (this.rangeCount > 0)
                return e.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));
              throw t.createError(
                "getNativeTextRange: selection contains no range",
              );
            }),
          (te.getName = function () {
            return "WrappedSelection";
          }),
          (te.inspect = function () {
            return N(this);
          }),
          (te.detach = function () {
            m(this.win, "delete"), p(this);
          }),
          (g.detachAll = function () {
            m(null, "deleteAll");
          }),
          (g.inspect = N),
          (g.isDirectionBackward = n),
          (e.Selection = g),
          (e.selectionPrototype = te),
          e.addShimListener(function (e) {
            void 0 === e.getSelection &&
              (e.getSelection = function () {
                return K(e);
              }),
              (e = null);
          });
      },
    );
  var H = !1,
    M = function () {
      H || ((H = !0), !P.initialized && P.config.autoInitialize && f());
    };
  return (
    x &&
      ("complete" == document.readyState
        ? M()
        : (e(document, "addEventListener") &&
            document.addEventListener("DOMContentLoaded", M, !1),
          R(window, "load", M))),
    P
  );
}, this);
