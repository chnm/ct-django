!(function (t) {
  "use strict";
  var e = function (e, o) {
    (this.options = o),
      (this.$element = t(e)),
      (this.$backdrop = this.isShown = null),
      this.options.remote && this.$element.load(this.options.remote);
  };
  (e.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
    (e.prototype.toggle = function (t) {
      return this[this.isShown ? "hide" : "show"](t);
    }),
    (e.prototype.show = function (e) {
      var o = this,
        i = t.Event("show.bs.modal", { relatedTarget: e });
      this.$element.trigger(i),
        this.isShown ||
          i.isDefaultPrevented() ||
          ((this.isShown = !0),
          this.escape(),
          this.$element.on(
            "click.dismiss.modal",
            '[data-dismiss="modal"]',
            t.proxy(this.hide, this),
          ),
          this.backdrop(function () {
            var i = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(document.body),
              o.$element.show(),
              i && o.$element[0].offsetWidth,
              o.$element.addClass("in").attr("aria-hidden", !1),
              o.enforceFocus();
            var s = t.Event("shown.bs.modal", { relatedTarget: e });
            i
              ? o.$element
                  .find(".modal-dialog")
                  .one(t.support.transition.end, function () {
                    o.$element.trigger("focus").trigger(s);
                  })
                  .emulateTransitionEnd(300)
              : o.$element.trigger("focus").trigger(s);
          }));
    }),
    (e.prototype.hide = function (e) {
      e && e.preventDefault(),
        (e = t.Event("hide.bs.modal")),
        this.$element.trigger(e),
        this.isShown &&
          !e.isDefaultPrevented() &&
          ((this.isShown = !1),
          this.escape(),
          t(document).off("focusin.bs.modal"),
          this.$element
            .removeClass("in")
            .attr("aria-hidden", !0)
            .off("click.dismiss.modal"),
          t.support.transition && this.$element.hasClass("fade")
            ? this.$element
                .one(t.support.transition.end, t.proxy(this.hideModal, this))
                .emulateTransitionEnd(300)
            : this.hideModal());
    }),
    (e.prototype.enforceFocus = function () {
      t(document)
        .off("focusin.bs.modal")
        .on(
          "focusin.bs.modal",
          t.proxy(function (t) {
            this.$element[0] === t.target ||
              this.$element.has(t.target).length ||
              this.$element.trigger("focus");
          }, this),
        );
    }),
    (e.prototype.escape = function () {
      this.isShown && this.options.keyboard
        ? this.$element.on(
            "keyup.dismiss.bs.modal",
            t.proxy(function (t) {
              27 == t.which && this.hide();
            }, this),
          )
        : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
    }),
    (e.prototype.hideModal = function () {
      var t = this;
      this.$element.hide(),
        this.backdrop(function () {
          t.removeBackdrop(), t.$element.trigger("hidden.bs.modal");
        });
    }),
    (e.prototype.removeBackdrop = function () {
      this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
    }),
    (e.prototype.backdrop = function (e) {
      var o = this.$element.hasClass("fade") ? "fade" : "";
      if (this.isShown && this.options.backdrop) {
        var i = t.support.transition && o;
        if (
          ((this.$backdrop = t(
            '<div class="modal-backdrop ' + o + '" />',
          ).appendTo(document.body)),
          this.$element.on(
            "click.dismiss.modal",
            t.proxy(function (t) {
              t.target === t.currentTarget &&
                ("static" == this.options.backdrop
                  ? this.$element[0].focus.call(this.$element[0])
                  : this.hide.call(this));
            }, this),
          ),
          i && this.$backdrop[0].offsetWidth,
          this.$backdrop.addClass("in"),
          !e)
        )
          return;
        i
          ? this.$backdrop
              .one(t.support.transition.end, e)
              .emulateTransitionEnd(150)
          : e();
      } else
        !this.isShown && this.$backdrop
          ? (this.$backdrop.removeClass("in"),
            t.support.transition && this.$element.hasClass("fade")
              ? this.$backdrop
                  .one(t.support.transition.end, e)
                  .emulateTransitionEnd(150)
              : e())
          : e && e();
    });
  var o = t.fn.modal;
  (t.fn.modal = function (o, i) {
    return this.each(function () {
      var s = t(this),
        n = s.data("bs.modal"),
        a = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof o && o);
      n || s.data("bs.modal", (n = new e(this, a))),
        "string" == typeof o ? n[o](i) : a.show && n.show(i);
    });
  }),
    (t.fn.modal.Constructor = e),
    (t.fn.modal.noConflict = function () {
      return (t.fn.modal = o), this;
    }),
    t(document).on(
      "click.bs.modal.data-api",
      '[data-toggle="modal"]',
      function (e) {
        var o = t(this),
          i = o.attr("href"),
          s = t(
            o.attr("data-target") || (i && i.replace(/.*(?=#[^\s]+$)/, "")),
          ),
          n = s.data("modal")
            ? "toggle"
            : t.extend({ remote: !/#/.test(i) && i }, s.data(), o.data());
        e.preventDefault(),
          s.modal(n, this).one("hide", function () {
            o.is(":visible") && o.trigger("focus");
          });
      },
    ),
    t(document)
      .on("show.bs.modal", ".modal", function () {
        t(document.body).addClass("modal-open");
      })
      .on("hidden.bs.modal", ".modal", function () {
        t(document.body).removeClass("modal-open");
      });
})(window.jQuery);
