(() => {
  "use strict";
  const t = document.currentScript.dataset.iconUrl;
  ((t, e, o = "wagtail:spriteRevision", a = "wagtail:spriteData") => {
    const r = "localStorage" in window && void 0 !== window.localStorage,
      n = (e) => {
        t &&
          e &&
          new Promise((t) => {
            "loading" === document.readyState
              ? document.addEventListener("DOMContentLoaded", () => t(), {
                  once: !0,
                  passive: !0,
                })
              : t();
          }).then(() => {
            t.innerHTML = e;
          });
      };
    if (r && localStorage.getItem(o) === e) {
      const t = localStorage.getItem(a);
      n(t);
    }
    fetch(e)
      .then((t) => t.text())
      .then((t) => {
        n(t), r && (localStorage.setItem(a, t), localStorage.setItem(o, e));
      })
      .catch((t) => {
        console.error(`Error fetching ${e}. Error: ${t}`);
      });
  })(document.querySelector("[data-sprite]"), t);
})();
