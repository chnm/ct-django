$(function () {
  $("[data-generator-url]").each(function () {
    var i = $(this),
      d = i.find("form"),
      e = d.find("select#id_filter_method"),
      a = d.find("input#id_width"),
      l = d.find("input#id_height"),
      r = d.find("input#id_closeness"),
      n = i.find("#result-url"),
      o = i.find(".loading-mask"),
      p = i.find("img.preview"),
      s = i.data("generatorUrl");
    function t() {
      var i = e.val();
      o.addClass("loading"),
        "original" === i
          ? (a.prop("disabled", !0),
            l.prop("disabled", !0),
            r.prop("disabled", !0))
          : "width" === i
          ? (a.prop("disabled", !1),
            l.prop("disabled", !0),
            r.prop("disabled", !0),
            (i += "-" + a.val()))
          : "height" === i
          ? (a.prop("disabled", !0),
            l.prop("disabled", !1),
            r.prop("disabled", !0),
            (i += "-" + l.val()))
          : ("min" !== i && "max" !== i && "fill" !== i) ||
            (a.prop("disabled", !1),
            l.prop("disabled", !1),
            "fill" === i
              ? (r.prop("disabled", !1),
                (i += "-" + a.val() + "x" + l.val() + "-c" + r.val()))
              : (r.prop("disabled", !0), (i += "-" + a.val() + "x" + l.val()))),
        $.getJSON(s.replace("__filterspec__", i))
          .done(function (i) {
            n.val(i.url),
              p.attr("src", i.preview_url),
              o.removeClass("loading");
          })
          .fail(function (i) {
            n.val(i.responseJSON.error),
              p.attr("src", ""),
              o.removeClass("loading");
          });
    }
    d.on("change", $.debounce(500, t)), d.on("keyup", $.debounce(500, t)), t();
  });
});
