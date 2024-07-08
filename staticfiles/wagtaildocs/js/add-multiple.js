$(function () {
  $(document).on("drop dragover", function (e) {
    e.preventDefault();
  }),
    $("#fileupload").fileupload({
      dataType: "html",
      sequentialUploads: !0,
      dropZone: $(".drop-zone"),
      add: function (e, t) {
        var a = $(this),
          s = a.data("blueimp-fileupload") || a.data("fileupload"),
          o = $($("#upload-list-item").html()).addClass("upload-uploading"),
          l = s.options;
        $("#upload-list").append(o),
          (t.context = o),
          t
            .process(function () {
              return a.fileupload("process", t);
            })
            .always(function () {
              t.context.removeClass("processing"),
                t.context.find(".left").each(function (e, a) {
                  $(a).append(escapeHtml(t.files[e].name));
                });
            })
            .done(function () {
              t.context.find(".start").prop("disabled", !1),
                !1 !== s._trigger("added", e, t) &&
                  (l.autoUpload || t.autoUpload) &&
                  !1 !== t.autoUpload &&
                  t.submit();
            })
            .fail(function () {
              t.files.error &&
                t.context.each(function (e) {
                  var a = t.files[e].error;
                  a && $(this).find(".error_messages").text(a);
                });
            });
      },
      processfail: function (e, t) {
        $(t.context).removeClass("upload-uploading").addClass("upload-failure");
      },
      progress: function (e, t) {
        if (e.isDefaultPrevented()) return !1;
        var a = Math.floor((t.loaded / t.total) * 100);
        t.context.each(function () {
          $(this)
            .find(".progress")
            .addClass("active")
            .attr("aria-valuenow", a)
            .find(".bar")
            .css("width", a + "%")
            .html(a + "%");
        });
      },
      progressall: function (e, t) {
        var a = parseInt((t.loaded / t.total) * 100, 10);
        $("#overall-progress")
          .addClass("active")
          .attr("aria-valuenow", a)
          .find(".bar")
          .css("width", a + "%")
          .html(a + "%"),
          a >= 100 &&
            $("#overall-progress")
              .removeClass("active")
              .find(".bar")
              .css("width", "0%");
      },
      formData: function (e) {
        var t = this.files[0].name,
          a = { title: t.replace(/\.[^.]+$/, "") },
          s = window.fileupload_opts.max_title_length;
        return e.get(0).dispatchEvent(
          new CustomEvent("wagtail:documents-upload", {
            bubbles: !0,
            cancelable: !0,
            detail: { data: a, filename: t, maxTitleLength: s },
          }),
        )
          ? e.serializeArray().concat({ name: "title", value: a.title })
          : e.serializeArray();
      },
      done: function (e, t) {
        var a = $(t.context),
          s = JSON.parse(t.result);
        s.success
          ? (a.addClass("upload-success"), $(".right", a).append(s.form))
          : (a.addClass("upload-failure"),
            $(".right .error_messages", a).append(s.error_message));
      },
      fail: function (e, t) {
        $(t.context).addClass("upload-failure");
      },
      always: function (e, t) {
        $(t.context)
          .removeClass("upload-uploading")
          .addClass("upload-complete");
      },
    }),
    $("#upload-list").on("submit", "form", function (e) {
      var t = $(this),
        a = new FormData(this),
        s = t.closest("#upload-list > li");
      e.preventDefault(),
        $.ajax({
          contentType: !1,
          data: a,
          processData: !1,
          type: "POST",
          url: this.action,
        }).done(function (e) {
          if (e.success) {
            var a = $(".status-msg.update-success").first().text();
            document.dispatchEvent(
              new CustomEvent("w-messages:add", {
                detail: { clear: !0, text: a, type: "success" },
              }),
            ),
              s.slideUp(function () {
                $(this).remove();
              });
          } else t.replaceWith(e.form);
        });
    }),
    $("#upload-list").on("click", ".delete", function (e) {
      var t = $(this).closest("form"),
        a = t.closest("#upload-list > li");
      e.preventDefault();
      var s = $('input[name="csrfmiddlewaretoken"]', t).val();
      $.post(this.href, { csrfmiddlewaretoken: s }, function (e) {
        e.success &&
          a.slideUp(function () {
            $(this).remove();
          });
      });
    });
});
