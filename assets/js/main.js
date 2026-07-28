/* meso.al — skriptet e përbashkëta */
(function () {
  "use strict";

  /* ---------- Menuja mobile ---------- */
  var burger = document.querySelector("[data-burger]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- FAQ akordion ---------- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var open = item.classList.contains("is-open");
      item.classList.toggle("is-open", !open);
      q.setAttribute("aria-expanded", !open ? "true" : "false");
    });
  });

  /* ---------- Animacion në scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Kërkimi nga ballina ---------- */
  document.querySelectorAll("[data-search-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lenda = form.querySelector("[name=lenda]");
      var nivel = form.querySelector("[name=nivel]");
      var params = new URLSearchParams();
      if (lenda && lenda.value) params.set("lenda", lenda.value);
      if (nivel && nivel.value) params.set("nivel", nivel.value);
      window.location.href = "mesues.html" + (params.toString() ? "?" + params : "");
    });
  });

  /* ---------- Formularët demo ---------- */
  document.querySelectorAll("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = form.querySelector("[data-form-msg]");
      if (box) {
        box.textContent = form.dataset.demoForm ||
          "Faleminderit! Ky është një demo — të dhënat nuk ruhen askund.";
        box.classList.remove("hide");
      }
      form.reset();
    });
  });

  /* ---------- Viti aktual në footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

/* ==========================================================================
   Renderimi i mësuesve (përdoret në index.html dhe mesues.html)
   ========================================================================== */
window.MesoUI = (function () {
  "use strict";

  function yll(n) {
    return '<span class="star">★</span> <b>' + n.toFixed(1) + "</b>";
  }

  /** Kartë kompakte (rrjet 3-kolonësh) */
  function kartëMini(t) {
    return (
      '<article class="card card-hover tutor-mini">' +
        '<div class="top">' +
          '<div class="avatar-wrap">' +
            '<div class="avatar ' + t.av + '">' + t.nofka + "</div>" +
            (t.online ? '<span class="avatar-online" title="Online tani"></span>' : "") +
          "</div>" +
          "<div>" +
            '<div class="tutor-name">' +
              "<h3>" + t.emri + "</h3><span>" + t.flamur + "</span>" +
            "</div>" +
            '<div class="small" style="margin-top:2px">' + t.lendaEmer + " · " + t.qyteti + "</div>" +
            '<div class="tutor-meta" style="margin-top:6px">' +
              '<span class="rate">' + yll(t.rating) + ' <span class="small">(' + t.komente + ")</span></span>" +
            "</div>" +
          "</div>" +
        "</div>" +
        (t.super ? '<div style="margin-top:12px"><span class="badge badge-amber">⚡ Mësues super</span></div>' : "") +
        '<p class="tutor-bio">' + shkurto(t.bio, 120) + "</p>" +
        '<div class="tags">' + t.tags.slice(0, 3).map(function (x) {
          return '<span class="badge badge-outline">' + x + "</span>";
        }).join("") + "</div>" +
        '<div class="foot">' +
          '<div><div class="price">€' + t.cmim + '<small>/orë</small></div>' +
            '<div class="tiny">' + t.mesime.toLocaleString("de-DE") + " mësime</div></div>" +
          '<a class="btn btn-primary btn-sm" href="profili.html?id=' + t.id + '">Shiko profilin</a>' +
        "</div>" +
      "</article>"
    );
  }

  /** Kartë e plotë horizontale (faqja e listimit) */
  function kartëPlotë(t) {
    return (
      '<article class="tutor">' +
        '<div class="tutor-media">' +
          '<div class="avatar-wrap">' +
            '<div class="avatar avatar-lg ' + t.av + '">' + t.nofka + "</div>" +
            (t.online ? '<span class="avatar-online" style="width:18px;height:18px"></span>' : "") +
          "</div>" +
          (t.provë ? '<span class="badge badge-green">Mësim provë</span>' : "") +
        "</div>" +
        "<div>" +
          '<div class="tutor-name">' +
            "<h3>" + t.emri + "</h3><span>" + t.flamur + "</span>" +
            (t.super ? '<span class="badge badge-amber">⚡ Mësues super</span>' : "") +
          "</div>" +
          '<div class="tutor-meta">' +
            "<span><i>" + t.lendaEmer + "</i></span>" +
            "<span>📍 " + t.qyteti + "</span>" +
            "<span>🗣️ " + t.gjuhe.length + " gjuhë</span>" +
            "<span>🎓 " + t.mesime.toLocaleString("de-DE") + " mësime</span>" +
          "</div>" +
          '<p class="tutor-bio">' + t.bio + "</p>" +
          '<div class="chip-row" style="margin-top:14px">' +
            t.tags.map(function (x) { return '<span class="badge badge-blue">' + x + "</span>"; }).join("") +
          "</div>" +
        "</div>" +
        '<div class="tutor-side">' +
          '<div class="rate" style="font-size:16px">' + yll(t.rating) +
            ' <span class="small" style="font-weight:400">(' + t.komente + " komente)</span></div>" +
          '<div class="price">€' + t.cmim + '<small> / 50 min</small></div>' +
          '<a class="btn btn-primary btn-block" href="profili.html?id=' + t.id + '">Rezervo mësim</a>' +
          '<a class="btn btn-ghost btn-block btn-sm" href="profili.html?id=' + t.id + '">Dërgo mesazh</a>' +
        "</div>" +
      "</article>"
    );
  }

  function shkurto(s, n) {
    return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s;
  }

  return { kartëMini: kartëMini, kartëPlotë: kartëPlotë, yll: yll, shkurto: shkurto };
})();
