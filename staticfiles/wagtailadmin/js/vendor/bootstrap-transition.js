!(function () {
  "use strict";
  var n;
  (n = function (n) {
    (n.fn.emulateTransitionEnd = function (t) {
      var i = !1,
        e = this;
      return (
        n(this).one("bsTransitionEnd", function () {
          i = !0;
        }),
        setTimeout(function () {
          i || n(e).trigger(n.support.transition.end);
        }, t),
        this
      );
    }),
      n(function () {
        (n.support.transition = (function () {
          var n = document.createElement("bootstrap"),
            t = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            };
          for (var i in t) if (void 0 !== n.style[i]) return { end: t[i] };
          return !1;
        })()),
          n.support.transition &&
            (n.event.special.bsTransitionEnd = {
              bindType: n.support.transition.end,
              delegateType: n.support.transition.end,
              handle: function (t) {
                if (n(t.target).is(this))
                  return t.handleObj.handler.apply(this, arguments);
              },
            });
      });
  }),
    "function" == typeof define && define.amd
      ? define(["jquery"], n)
      : "object" == typeof exports
      ? n(require("jquery"))
      : n(jQuery);
})();
