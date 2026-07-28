/* ==========================================================================
   meso.al — shtresa e të dhënave

   Nëse config.js është plotësuar → lexon nga Supabase.
   Nëse jo → kthehet te tutors.js, që faqja të mbetet e përdorshme si prototip.

   Faqet nuk e dinë kurrë se nga vijnë të dhënat: ato thërrasin vetëm
   MesoDB.mesuesit(), MesoDB.mesuesi(id), MesoDB.lendet(), etj.
   ========================================================================== */
window.MesoDB = (function () {
  "use strict";

  var cfg = window.MESO_CONFIG || {};
  var aktiv = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  var sb = null;

  /* ---------- Klienti ---------- */
  function klienti() {
    if (!aktiv) return null;
    if (sb) return sb;
    if (!window.supabase || !window.supabase.createClient) {
      console.warn("[meso.al] Biblioteka supabase-js nuk u ngarkua — po përdoren të dhënat lokale.");
      aktiv = false;
      return null;
    }
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    return sb;
  }

  function online() { return aktiv && !!klienti(); }

  /* ---------- Përkthimi rresht DB → objekt që njohin faqet ---------- */
  function ngaRreshti(r) {
    return {
      id: r.id,
      emri: (r.emri + " " + (r.mbiemri || "")).trim(),
      nofka: r.nofka || (r.emri || "?").slice(0, 2).toUpperCase(),
      av: r.ngjyra || "av-1",
      lenda: r.lenda_id,
      lendaEmer: r.lenda_emer || "",
      flamur: r.lenda_ikona || "🇦🇱",
      qyteti: r.qyteti || "",
      cmim: r.cmimi_cent / 100,
      ulje: { p5: r.ulje_5, p10: r.ulje_10, p20: r.ulje_20 },
      rating: Number(r.vleresimi) || 0,
      komente: r.nr_komente || 0,
      mesime: r.nr_mesime || 0,
      super: (Number(r.vleresimi) >= 4.9 && r.nr_komente >= 100),
      provë: r.ofron_prove,
      online: true,
      tags: r.etiketat || [],
      gjuhe: r.gjuhet || [],
      nivele: r.nivelet || [],
      nxenesitNga: r.nxenesit_nga || [],
      bio: r.bio || "",
      orare: ["mengjes", "pasdite", "mbremje"]
    };
  }

  /* ---------- Leximi ---------- */
  function mesuesit(filtra) {
    filtra = filtra || {};
    if (!online()) {
      var lokal = (window.MESO_TUTORS || []).slice();
      if (filtra.lenda) lokal = lokal.filter(function (t) { return t.lenda === filtra.lenda; });
      return Promise.resolve(lokal);
    }
    var q = klienti().from("mesuesit_publik").select("*");
    if (filtra.lenda) q = q.eq("lenda_id", filtra.lenda);
    if (filtra.cmimMax) q = q.lte("cmimi_cent", filtra.cmimMax * 100);
    return q.then(function (res) {
      if (res.error) { console.error("[meso.al]", res.error.message); return window.MESO_TUTORS || []; }
      return res.data.map(ngaRreshti);
    });
  }

  function mesuesi(id) {
    if (!online()) {
      return Promise.resolve((window.MESO_TUTORS || []).filter(function (t) { return t.id === id; })[0] || null);
    }
    return klienti().from("mesuesit_publik").select("*").eq("id", id).maybeSingle()
      .then(function (res) { return res.data ? ngaRreshti(res.data) : null; });
  }

  function lendet() {
    if (!online()) return Promise.resolve(window.MESO_LENDET || []);
    return klienti().from("lendet").select("*").order("renditja")
      .then(function (res) {
        if (res.error || !res.data) return window.MESO_LENDET || [];
        return res.data.map(function (l) {
          return { key: l.id, emer: l.emer, ikona: l.ikona, titull: l.titull, numer: 0 };
        });
      });
  }

  /* ---------- Autentifikimi ---------- */
  function regjistrohu(email, fjalekalim, tedhena) {
    if (!online()) return Promise.reject(new Error("demo"));
    return klienti().auth.signUp({
      email: email, password: fjalekalim, options: { data: tedhena || {} }
    });
  }

  function hyr(email, fjalekalim) {
    if (!online()) return Promise.reject(new Error("demo"));
    return klienti().auth.signInWithPassword({ email: email, password: fjalekalim });
  }

  function hyrMe(ofrues) {
    if (!online()) return Promise.reject(new Error("demo"));
    return klienti().auth.signInWithOAuth({
      provider: ofrues,
      options: { redirectTo: location.origin + location.pathname.replace(/[^/]*$/, "llogaria.html") }
    });
  }

  function dil() {
    if (!online()) return Promise.resolve();
    return klienti().auth.signOut().then(function () { location.href = "index.html"; });
  }

  function sesioni() {
    if (!online()) return Promise.resolve(null);
    return klienti().auth.getSession().then(function (r) { return r.data.session; });
  }

  function profiliIm() {
    if (!online()) return Promise.resolve(null);
    return klienti().from("profilet").select("*").limit(1).maybeSingle()
      .then(function (r) { return r.data; });
  }

  /* ---------- Rezervimet ---------- */
  function rezervimetEMia() {
    if (!online()) return Promise.resolve([]);
    return klienti()
      .from("rezervimet")
      .select("*, mesuesit(id, cmimi_cent, profilet(emri, mbiemri, nofka, ngjyra))")
      .order("fillon_utc", { ascending: false })
      .then(function (r) { return r.data || []; });
  }

  function rezervo(mesuesId, kohaUtc, cmimiCent, komisionPerqindje, eshteProve) {
    if (!online()) return Promise.reject(new Error("demo"));
    return profiliIm().then(function (p) {
      if (!p) throw new Error("Duhet të jesh i kyçur për të rezervuar.");
      return klienti().from("rezervimet").insert({
        mesues_id: mesuesId,
        nxenes_id: p.id,
        fillon_utc: kohaUtc,
        cmimi_cent: cmimiCent,
        komisioni_cent: Math.round(cmimiCent * (komisionPerqindje || 18) / 100),
        eshte_prove: !!eshteProve
      });
    });
  }

  /* ---------- Çmimi: e cakton vetë mësuesi ---------- */
  function ruajCmimin(cmimiCent, ulje) {
    if (!online()) return Promise.reject(new Error("demo"));
    return profiliIm().then(function (p) {
      return klienti().from("mesuesit").update({
        cmimi_cent: cmimiCent,
        ulje_5: ulje.p5, ulje_10: ulje.p10, ulje_20: ulje.p20,
        perditesuar: new Date().toISOString()
      }).eq("id", p.id);
    });
  }

  return {
    online: online, klienti: klienti,
    mesuesit: mesuesit, mesuesi: mesuesi, lendet: lendet,
    regjistrohu: regjistrohu, hyr: hyr, hyrMe: hyrMe, dil: dil,
    sesioni: sesioni, profiliIm: profiliIm,
    rezervimetEMia: rezervimetEMia, rezervo: rezervo, ruajCmimin: ruajCmimin
  };
})();
