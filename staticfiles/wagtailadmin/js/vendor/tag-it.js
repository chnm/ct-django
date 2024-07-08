!(function (t) {
  t.widget("ui.tagit", {
    options: {
      allowDuplicates: !1,
      caseSensitive: !0,
      fieldName: "tags",
      placeholderText: null,
      readOnly: !1,
      removeConfirmation: !1,
      tagLimit: null,
      availableTags: [],
      autocomplete: {},
      showAutocompleteOnFocus: !1,
      autocompleteOnly: !1,
      allowSpaces: !1,
      singleField: !1,
      singleFieldDelimiter: ",",
      singleFieldNode: null,
      animate: !0,
      tabIndex: null,
      beforeTagAdded: null,
      afterTagAdded: null,
      beforeTagRemoved: null,
      afterTagRemoved: null,
      onTagClicked: null,
      onTagLimitExceeded: null,
      onTagAdded: null,
      onTagRemoved: null,
      tagSource: null,
    },
    _create: function () {
      var e = this;
      this.element.is("input")
        ? ((this.tagList = t("<ul></ul>").insertAfter(this.element)),
          (this.options.singleField = !0),
          (this.options.singleFieldNode = this.element),
          this.element.css("display", "none"))
        : (this.tagList = this.element.find("ul, ol").addBack().last()),
        (this.tagInput = t('<input type="text" />').addClass(
          "ui-widget-content",
        )),
        this.options.readOnly && this.tagInput.attr("disabled", "disabled"),
        this.options.tabIndex &&
          this.tagInput.attr("tabindex", this.options.tabIndex),
        this.options.placeholderText &&
          this.tagInput.attr("placeholder", this.options.placeholderText),
        this.options.autocomplete.source ||
          (this.options.autocomplete.source = function (e, i) {
            var a = e.term.toLowerCase(),
              s = t.grep(this.options.availableTags, function (t) {
                return 0 === t.toLowerCase().indexOf(a);
              });
            this.options.allowDuplicates ||
              (s = this._subtractArray(s, this.assignedTags())),
              i(s);
          }),
        this.options.showAutocompleteOnFocus &&
          (this.tagInput.focus(function (t, i) {
            e._showAutocomplete();
          }),
          void 0 === this.options.autocomplete.minLength &&
            (this.options.autocomplete.minLength = 0)),
        t.isFunction(this.options.autocomplete.source) &&
          (this.options.autocomplete.source = t.proxy(
            this.options.autocomplete.source,
            this,
          )),
        t.isFunction(this.options.tagSource) &&
          (this.options.tagSource = t.proxy(this.options.tagSource, this)),
        this.tagList
          .addClass("tagit")
          .addClass("ui-widget ui-widget-content ui-corner-all")
          .append(t('<li class="tagit-new"></li>').append(this.tagInput))
          .on("click", function (i) {
            var a = t(i.target);
            if (a.hasClass("tagit-label")) {
              var s = a.closest(".tagit-choice");
              s.hasClass("removed") ||
                e._trigger("onTagClicked", i, {
                  tag: s,
                  tagLabel: e.tagLabel(s),
                });
            } else e.tagInput.trigger("focus");
          });
      var i = !1;
      if (this.options.singleField)
        if (this.options.singleFieldNode) {
          var a = t(this.options.singleFieldNode),
            s = a.val().split(this.options.singleFieldDelimiter);
          a.val(""),
            t.each(s, function (t, a) {
              e.createTag(a, null, !0), (i = !0);
            });
        } else
          (this.options.singleFieldNode = t(
            '<input type="hidden" style="display:none;" value="" name="' +
              this.options.fieldName +
              '" />',
          )),
            this.tagList.after(this.options.singleFieldNode);
      if (
        (i ||
          this.tagList.children("li").each(function () {
            t(this).hasClass("tagit-new") ||
              (e.createTag(t(this).text(), t(this).attr("class"), !0),
              t(this).remove());
          }),
        this.tagInput
          .on("keydown", function (i) {
            if (i.which == t.ui.keyCode.BACKSPACE && "" === e.tagInput.val()) {
              var a = e._lastTag();
              !e.options.removeConfirmation || a.hasClass("remove")
                ? e.removeTag(a)
                : e.options.removeConfirmation &&
                  a.addClass("remove ui-state-highlight");
            } else
              e.options.removeConfirmation &&
                e._lastTag().removeClass("remove ui-state-highlight");
            ("," === i.key ||
              i.which === t.ui.keyCode.ENTER ||
              (i.which == t.ui.keyCode.TAB && "" !== e.tagInput.val()) ||
              (i.which == t.ui.keyCode.SPACE &&
                !0 !== e.options.allowSpaces &&
                ('"' != t.trim(e.tagInput.val()).replace(/^s*/, "").charAt(0) ||
                  ('"' == t.trim(e.tagInput.val()).charAt(0) &&
                    '"' ==
                      t
                        .trim(e.tagInput.val())
                        .charAt(t.trim(e.tagInput.val()).length - 1) &&
                    t.trim(e.tagInput.val()).length - 1 != 0)))) &&
              ((i.which === t.ui.keyCode.ENTER && "" === e.tagInput.val()) ||
                i.preventDefault(),
              e.tagInput.data("autocomplete-open") ||
                e.options.autocompleteOnly ||
                e.createTag(e._cleanedInput()));
          })
          .on("blur", function (t) {
            e.tagInput.data("autocomplete-open") ||
              e.options.autocompleteOnly ||
              e.createTag(e._cleanedInput());
          }),
        this.options.availableTags ||
          this.options.tagSource ||
          this.options.autocomplete.source)
      ) {
        var o = {
          select: function (t, i) {
            return e.createTag(i.item.value), !1;
          },
        };
        t.extend(o, this.options.autocomplete),
          (o.source = this.options.tagSource || o.source),
          this.tagInput
            .autocomplete(o)
            .on("autocompleteopen", function (t, i) {
              e.tagInput.data("autocomplete-open", !0);
            })
            .on("autocompleteclose", function (t, i) {
              e.tagInput.data("autocomplete-open", !1);
            });
      }
    },
    _cleanedInput: function () {
      return t.trim(this.tagInput.val().replace(/^"(.*)"$/, "$1"));
    },
    _lastTag: function () {
      return this.tagList.find(".tagit-choice:last:not(.removed)");
    },
    _tags: function () {
      return this.tagList.find(".tagit-choice:not(.removed)");
    },
    assignedTags: function () {
      var e = this,
        i = [];
      return (
        this.options.singleField
          ? "" ===
              (i = t(this.options.singleFieldNode)
                .val()
                .split(this.options.singleFieldDelimiter))[0] && (i = [])
          : this._tags().each(function () {
              i.push(e.tagLabel(this));
            }),
        i
      );
    },
    _updateSingleTagsField: function (e) {
      t(this.options.singleFieldNode)
        .val(e.join(this.options.singleFieldDelimiter))
        .trigger("change");
    },
    _subtractArray: function (e, i) {
      for (var a = [], s = 0; s < e.length; s++)
        -1 == t.inArray(e[s], i) && a.push(e[s]);
      return a;
    },
    tagLabel: function (e) {
      return this.options.singleField
        ? t(e).find(".tagit-label:first").text()
        : t(e).find("input:first").val();
    },
    _showAutocomplete: function () {
      this.tagInput.autocomplete("search", "");
    },
    _findTagByLabel: function (e) {
      var i = this,
        a = null;
      return (
        this._tags().each(function (s) {
          if (i._formatStr(e) == i._formatStr(i.tagLabel(this)))
            return (a = t(this)), !1;
        }),
        a
      );
    },
    _isNew: function (t) {
      return !this._findTagByLabel(t);
    },
    _formatStr: function (e) {
      return this.options.caseSensitive ? e : t.trim(e.toLowerCase());
    },
    _effectExists: function (e) {
      return Boolean(
        t.effects &&
          (t.effects[e] || (t.effects.effect && t.effects.effect[e])),
      );
    },
    createTag: function (e, i, a) {
      var s = this;
      if (
        ((e = t.trim(e)),
        this.options.preprocessTag && (e = this.options.preprocessTag(e)),
        "" === e)
      )
        return !1;
      if (!this.options.allowDuplicates && !this._isNew(e)) {
        var o = this._findTagByLabel(e);
        return (
          !1 !==
            this._trigger("onTagExists", null, {
              existingTag: o,
              duringInitialization: a,
            }) &&
            this._effectExists("highlight") &&
            o.effect("highlight"),
          !1
        );
      }
      if (this.options.tagLimit && this._tags().length >= this.options.tagLimit)
        return (
          this._trigger("onTagLimitExceeded", null, {
            duringInitialization: a,
          }),
          !1
        );
      var n = t(
          this.options.onTagClicked
            ? '<a class="tagit-label tag"></a>'
            : '<span class="tagit-label tag"></span>',
        ).text(e),
        l = t("<li></li>")
          .addClass(
            "tagit-choice ui-widget-content ui-state-default ui-corner-all",
          )
          .addClass(i)
          .append(n);
      if (this.options.readOnly) l.addClass("tagit-choice-read-only");
      else {
        l.addClass("tagit-choice-editable");
        var g = t("<span></span>").addClass("ui-icon ui-icon-close"),
          r = t('<a><span class="text-icon">×</span></a>')
            .addClass("tagit-close")
            .append(g)
            .on("click", function (t) {
              s.removeTag(l);
            });
        l.append(r);
      }
      if (!this.options.singleField) {
        var u = n.html();
        l.append(
          '<input type="hidden" style="display:none;" value="' +
            u +
            '" name="' +
            this.options.fieldName +
            '" />',
        );
      }
      if (
        !1 !==
        this._trigger("beforeTagAdded", null, {
          tag: l,
          tagLabel: this.tagLabel(l),
          duringInitialization: a,
        })
      ) {
        if (this.options.singleField) {
          var h = this.assignedTags();
          h.push(e), this._updateSingleTagsField(h);
        }
        this._trigger("onTagAdded", null, l),
          this.tagInput.val(""),
          this.tagInput.parent().before(l),
          this._trigger("afterTagAdded", null, {
            tag: l,
            tagLabel: this.tagLabel(l),
            duringInitialization: a,
          }),
          this.options.showAutocompleteOnFocus &&
            !a &&
            setTimeout(function () {
              s._showAutocomplete();
            }, 0);
      }
    },
    removeTag: function (e, i) {
      if (
        ((i = void 0 === i ? this.options.animate : i),
        (e = t(e)),
        this._trigger("onTagRemoved", null, e),
        !1 !==
          this._trigger("beforeTagRemoved", null, {
            tag: e,
            tagLabel: this.tagLabel(e),
          }))
      ) {
        if (this.options.singleField) {
          var a = this.assignedTags(),
            s = this.tagLabel(e);
          (a = t.grep(a, function (t) {
            return t != s;
          })),
            this._updateSingleTagsField(a);
        }
        if (i) {
          e.addClass("removed");
          var o = this._effectExists("blind")
              ? ["blind", { direction: "horizontal" }, "fast"]
              : ["fast"],
            n = this;
          o.push(function () {
            e.remove(),
              n._trigger("afterTagRemoved", null, {
                tag: e,
                tagLabel: n.tagLabel(e),
              });
          }),
            e.fadeOut("fast").hide.apply(e, o).dequeue();
        } else
          e.remove(),
            this._trigger("afterTagRemoved", null, {
              tag: e,
              tagLabel: this.tagLabel(e),
            });
      }
    },
    removeTagByLabel: function (t, e) {
      var i = this._findTagByLabel(t);
      if (!i) throw "No such tag exists with the name '" + t + "'";
      this.removeTag(i, e);
    },
    removeAll: function () {
      var t = this;
      this._tags().each(function (e, i) {
        t.removeTag(i, !1);
      });
    },
  });
})(jQuery);
