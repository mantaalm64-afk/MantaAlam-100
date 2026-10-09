/* MantaAlam site script
   >>> After you create your Google Business Profile, paste your review link here: */
var GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/S1Ef3LDHTmreBn1dA";
// Show a "See on Google" link next to "See on Facebook" (set to false to hide it)
var SHOW_GOOGLE_LINK = true;

(function () {
  // Google review button: shown only when the link above is filled in
  var g = document.getElementById("gReview");
  if (g && GOOGLE_REVIEW_URL) { g.href = GOOGLE_REVIEW_URL; g.hidden = false; }

  // "See on Google" link, in the page's language, next to the Facebook link
  var fb = document.querySelector("#reviews .fb-link");
  if (fb && GOOGLE_REVIEW_URL && SHOW_GOOGLE_LINK) {
    var GTXT = { en: "See on Google", de: "Auf Google ansehen", it: "Vedi su Google",
                 pl: "Zobacz w Google", cs: "Zobrazit na Google" };
    var gl = document.createElement("a");
    gl.className = "fb-link";
    gl.href = GOOGLE_REVIEW_URL;
    gl.target = "_blank"; gl.rel = "noopener";
    gl.textContent = GTXT[document.documentElement.lang] || GTXT.en;
    fb.style.marginRight = "18px";
    fb.parentNode.insertBefore(gl, fb.nextSibling);
  }

  // Language dropdown navigates to the page in that language
  var sel = document.getElementById("lang");
  if (sel) sel.addEventListener("change", function () {
    try { localStorage.setItem("ma_lang_ok", "1"); } catch (e) {}
    location.href = sel.value;
  });

  // Suggest the visitor's own language (never forces a redirect)
  var MSG = {
    en: "View this page in English", de: "Diese Seite auf Deutsch ansehen",
    it: "Vedi questa pagina in italiano", pl: "Zobacz tę stronę po polsku", cs: "Zobrazit stránku v češtině"
  };
  var page = document.documentElement.lang;
  var dismissed = false;
  try { dismissed = !!localStorage.getItem("ma_lang_ok"); } catch (e) {}
  var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").slice(0, 2).toLowerCase();
  if (nav === "sk") nav = "cs";
  var alt = document.querySelector('link[rel="alternate"][hreflang="' + nav + '"]');
  if (!dismissed && nav !== page && MSG[nav] && alt) {
    var bar = document.createElement("div");
    bar.className = "lbar";
    bar.innerHTML = '<div class="wrap"><a href="' + alt.href + '">' + MSG[nav] + ' →</a><button type="button" aria-label="Close">×</button></div>';
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector("button").onclick = function () {
      bar.remove();
      try { localStorage.setItem("ma_lang_ok", "1"); } catch (e) {}
    };
  }

  // Sticky booking bar on mobile
  var sticky = document.getElementById("sticky");
  var hero = document.querySelector(".hero");
  var end = document.getElementById("book");
  if (sticky && hero && end) {
    var onScroll = function () {
      var past = hero.getBoundingClientRect().bottom < 0;
      var atEnd = end.getBoundingClientRect().top < window.innerHeight;
      sticky.classList.toggle("on", past && !atEnd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
