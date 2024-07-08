!(function (e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : e(window.jQuery);
})(function (e) {
  "use strict";
  var t = 0;
  e.ajaxTransport("iframe", function (r) {
    if (r.async) {
      var a,
        n,
        o,
        p = r.initialIframeSrc || "javascript:false;";
      return {
        send: function (i, f) {
          (a = e('<form style="display:none;"></form>')).attr(
            "accept-charset",
            r.formAcceptCharset,
          ),
            (o = /\?/.test(r.url) ? "&" : "?"),
            "DELETE" === r.type
              ? ((r.url = r.url + o + "_method=DELETE"), (r.type = "POST"))
              : "PUT" === r.type
              ? ((r.url = r.url + o + "_method=PUT"), (r.type = "POST"))
              : "PATCH" === r.type &&
                ((r.url = r.url + o + "_method=PATCH"), (r.type = "POST")),
            (n = e(
              '<iframe src="' +
                p +
                '" name="iframe-transport-' +
                (t += 1) +
                '"></iframe>',
            ).on("load", function () {
              var t,
                o = e.isArray(r.paramName) ? r.paramName : [r.paramName];
              n.off("load").on("load", function () {
                var t;
                try {
                  if (!(t = n.contents()).length || !t[0].firstChild)
                    throw new Error();
                } catch (e) {
                  t = void 0;
                }
                f(200, "success", { iframe: t }),
                  e('<iframe src="' + p + '"></iframe>').appendTo(a),
                  window.setTimeout(function () {
                    a.remove();
                  }, 0);
              }),
                a
                  .prop("target", n.prop("name"))
                  .prop("action", r.url)
                  .prop("method", r.type),
                r.formData &&
                  e.each(r.formData, function (t, r) {
                    e('<input type="hidden"/>')
                      .prop("name", r.name)
                      .val(r.value)
                      .appendTo(a);
                  }),
                r.fileInput &&
                  r.fileInput.length &&
                  "POST" === r.type &&
                  ((t = r.fileInput.clone()),
                  r.fileInput.after(function (e) {
                    return t[e];
                  }),
                  r.paramName &&
                    r.fileInput.each(function (t) {
                      e(this).prop("name", o[t] || r.paramName);
                    }),
                  a
                    .append(r.fileInput)
                    .prop("enctype", "multipart/form-data")
                    .prop("encoding", "multipart/form-data"),
                  r.fileInput.removeAttr("form")),
                a.trigger("submit"),
                t &&
                  t.length &&
                  r.fileInput.each(function (r, a) {
                    var n = e(t[r]);
                    e(a)
                      .prop("name", n.prop("name"))
                      .attr("form", n.attr("form")),
                      n.replaceWith(a);
                  });
            })),
            a.append(n).appendTo(document.body);
        },
        abort: function () {
          n && n.off("load").prop("src", p), a && a.remove();
        },
      };
    }
  }),
    e.ajaxSetup({
      converters: {
        "iframe text": function (t) {
          return t && e(t[0].body).text();
        },
        "iframe json": function (t) {
          return t && e.parseJSON(e(t[0].body).text());
        },
        "iframe html": function (t) {
          return t && e(t[0].body).html();
        },
        "iframe xml": function (t) {
          var r = t && t[0];
          return r && e.isXMLDoc(r)
            ? r
            : e.parseXML(
                (r.XMLDocument && r.XMLDocument.xml) || e(r.body).html(),
              );
        },
        "iframe script": function (t) {
          return t && e.globalEval(e(t[0].body).text());
        },
      },
    });
});
