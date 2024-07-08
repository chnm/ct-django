$(function () {
  $(document).on("drop dragover", function (e) {
    e.preventDefault();
  }),
    $("#fileupload").fileupload({
      dataType: "html",
      sequentialUploads: !0,
      dropZone: $(".drop-zone"),
      acceptFileTypes: window.fileupload_opts.accepted_file_types,
      maxFileSize: window.fileupload_opts.max_file_size,
      previewMinWidth: 150,
      previewMaxWidth: 150,
      previewMinHeight: 150,
      previewMaxHeight: 150,
      messages: {
        acceptFileTypes:
          window.fileupload_opts.errormessages.accepted_file_types,
        maxFileSize: window.fileupload_opts.errormessages.max_file_size,
      },
      add: function (e, t) {
        var a = $(this),
          o = a.data("blueimp-fileupload") || a.data("fileupload"),
          s = $($("#upload-list-item").html()).addClass("upload-uploading"),
          i = o.options;
        $("#upload-list").append(s),
          (t.context = s),
          t
            .process(function () {
              return a.fileupload("process", t);
            })
            .always(function () {
              t.context.removeClass("processing"),
                t.context.find(".left").each(function (e, a) {
                  $(a).append(escapeHtml(t.files[e].name));
                }),
                t.context.find(".preview .thumb").each(function (e, a) {
                  $(a).find(".icon").remove(), $(a).append(t.files[e].preview);
                });
            })
            .done(function () {
              t.context.find(".start").prop("disabled", !1),
                !1 !== o._trigger("added", e, t) &&
                  (i.autoUpload || t.autoUpload) &&
                  !1 !== t.autoUpload &&
                  t.submit();
            })
            .fail(function () {
              t.files.error &&
                t.context.each(function (e) {
                  var a = t.files[e].error;
                  a && $(this).find(".error_messages").html(a);
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
          o = window.fileupload_opts.max_title_length;
        return e.get(0).dispatchEvent(
          new CustomEvent("wagtail:images-upload", {
            bubbles: !0,
            cancelable: !0,
            detail: { data: a, filename: t, maxTitleLength: o },
          }),
        )
          ? e.serializeArray().concat({ name: "title", value: a.title })
          : e.serializeArray();
      },
      done: function (e, t) {
        var a = $(t.context),
          o = JSON.parse(t.result);
        o.success
          ? o.duplicate
            ? (a.addClass("upload-duplicate"),
              $(".right", a).append(o.confirm_duplicate_upload),
              $(".confirm-duplicate-upload", a).on(
                "click",
                ".confirm-upload",
                function (e) {
                  e.preventDefault(),
                    $(this).closest(".confirm-duplicate-upload").remove(),
                    $(".right", a).append(o.form);
                },
              ))
            : (a.addClass("upload-success"), $(".right", a).append(o.form))
          : (a.addClass("upload-failure"),
            $(".right .error_messages", a).append(o.error_message));
      },
      fail: function (e, t) {
        var a = $(t.context),
          o = $(".server-error", a);
        $(".error-text", o).text(t.errorThrown),
          $(".error-code", o).text(t.jqXHR.status),
          a.addClass("upload-server-error");
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
        o = t.closest("#upload-list > li");
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
              o.slideUp(function () {
                $(this).remove();
              });
          } else t.replaceWith(e.form);
        });
    }),
    $("#upload-list").on("click", ".delete", function (e) {
      var t = $(this).closest("form"),
        a = t.closest("#upload-list > li");
      e.preventDefault();
      var o = $('input[name="csrfmiddlewaretoken"]', t).val();
      $.post(this.href, { csrfmiddlewaretoken: o }, function (e) {
        e.success &&
          a.slideUp(function () {
            $(this).remove();
          });
      });
    });
});
