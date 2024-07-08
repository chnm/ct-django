EMBED_CHOOSER_MODAL_ONLOAD_HANDLERS = {
  chooser: function (e, t) {
    $("form.embed-form", e.body).on("submit", function () {
      var t = new FormData(this);
      return (
        $.ajax({
          url: this.action,
          data: t,
          processData: !1,
          contentType: !1,
          type: "POST",
          dataType: "text",
          success: e.loadResponseText,
        }),
        !1
      );
    });
  },
  embed_chosen: function (e, t) {
    e.respond("embedChosen", t.embed_html, t.embed_data), e.close();
  },
};
