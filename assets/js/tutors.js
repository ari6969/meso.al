/* ==========================================================================
   meso.al — të dhënat demo
   SHËNIM: çdo mësues cakton VETË çmimin (`cmim`) dhe uljet e veta për paketa
   (`ulje`). Platforma nuk vendos asnjë tarifë dhe nuk ka plane fikse.
   ========================================================================== */

window.MESO_TUTORS = [
  {
    id: "mirjeta-hoxhaj", emri: "Mirjeta Hoxhaj", nofka: "MH", av: "av-3",
    lenda: "shqip-femije", lendaEmer: "Shqip për fëmijë", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 10, rating: 5.0, komente: 178, mesime: 1240,
    super: true, provë: true, online: true,
    ulje: { p5: 5, p10: 12, p20: 20 },
    tags: ["Fëmijë 5–12 vjeç", "Alfabeti dhe leximi", "Përralla shqiptare"],
    gjuhe: ["Shqip (amtare)", "Gjermanisht (B2)", "Anglisht (B1)"],
    nivele: ["fillestar", "mesatar"],
    nxenesitNga: ["🇩🇪 Gjermani", "🇨🇭 Zvicër", "🇬🇧 Angli"],
    bio: "Mësuese e ciklit fillor me 11 vjet përvojë. Punoj vetëm me fëmijë të diasporës që e flasin shqipen në shtëpi por nuk e lexojnë e shkruajnë dot. Mësimet i bëj me lojëra, këngë dhe përralla — fëmija nuk e ndien si detyrë shtëpie.",
    orare: ["pasdite", "mbremje"]
  },
  {
    id: "fatos-berisha", emri: "Fatos Berisha", nofka: "FB", av: "av-1",
    lenda: "shkolla", lendaEmer: "Ndihmë me shkollën", flamur: "🇦🇱",
    qyteti: "Prishtinë", cmim: 12, rating: 4.9, komente: 134, mesime: 910,
    super: true, provë: true, online: true,
    ulje: { p5: 0, p10: 10, p20: 15 },
    tags: ["Matematikë në shqip", "Shkolla gjermane", "Klasat 5–10"],
    gjuhe: ["Shqip (amtare)", "Gjermanisht (C1)", "Anglisht (B2)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    nxenesitNga: ["🇩🇪 Gjermani", "🇦🇹 Austri", "🇨🇭 Zvicër"],
    bio: "Punoj me fëmijë shqiptarë që ndjekin shkollën në Gjermani, Austri dhe Zvicër. Problemi rrallë është lënda — është gjuha. Ua shpjegoj matematikën dhe shkencat në shqip, pastaj i ndihmoj t'i shkruajnë përgjigjet në gjermanisht.",
    orare: ["pasdite", "mbremje"]
  },
  {
    id: "elira-hoxha", emri: "Elira Hoxha", nofka: "EH", av: "av-1",
    lenda: "anglisht", lendaEmer: "Anglisht", flamur: "🇬🇧",
    qyteti: "Tiranë", cmim: 9, rating: 5.0, komente: 214, mesime: 1830,
    super: true, provë: true, online: true,
    ulje: { p5: 0, p10: 10, p20: 15 },
    tags: ["Anglisht bisedor", "IELTS", "Biznes"],
    gjuhe: ["Shqip (amtare)", "Anglisht (C2)", "Italisht (B2)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    nxenesitNga: ["🇦🇱 Shqipëri", "🇽🇰 Kosovë", "🇮🇹 Itali"],
    bio: "Mësuese e certifikuar CELTA me 8 vjet përvojë. Përgatis studentë për IELTS dhe intervista pune në anglisht. Mësimet janë 100% bisedore që nga dita e parë.",
    orare: ["mengjes", "pasdite", "mbremje"]
  },
  {
    id: "sara-berisha", emri: "Sara Berisha", nofka: "SB", av: "av-3",
    lenda: "gjermanisht", lendaEmer: "Gjermanisht", flamur: "🇩🇪",
    qyteti: "Shkodër", cmim: 11, rating: 5.0, komente: 302, mesime: 2610,
    super: true, provë: true, online: true,
    ulje: { p5: 8, p10: 15, p20: 22 },
    tags: ["Goethe A1–B2", "Gjermanisht për infermierë", "Vizë pune"],
    gjuhe: ["Shqip (amtare)", "Gjermanisht (C1)", "Anglisht (B2)"],
    nivele: ["fillestar", "mesatar"],
    nxenesitNga: ["🇦🇱 Shqipëri", "🇽🇰 Kosovë", "🇩🇪 Gjermani"],
    bio: "Jetova 6 vjet në Mynih. Ndihmoj shqiptarë që përgatiten për punë e studime në Gjermani: provimet Goethe, letra motivimi dhe gjuha e përditshme.",
    orare: ["mengjes", "mbremje"]
  },
  {
    id: "arben-krasniqi", emri: "Arben Krasniqi", nofka: "AK", av: "av-2",
    lenda: "matematike", lendaEmer: "Matematikë", flamur: "🇦🇱",
    qyteti: "Prishtinë", cmim: 8, rating: 4.9, komente: 168, mesime: 1420,
    super: true, provë: true, online: true,
    ulje: { p5: 5, p10: 10, p20: 15 },
    tags: ["Matura Shtetërore", "Analizë", "Algjebër"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B2)"],
    nivele: ["mesatar", "avancuar"],
    nxenesitNga: ["🇽🇰 Kosovë", "🇦🇱 Shqipëri", "🇲🇰 Maqedoni e V."],
    bio: "Profesor matematike në gjimnaz prej 12 vitesh. Specializuar në përgatitjen për Maturën Shtetërore — 94% e nxënësve të mi kalojnë me mbi 8.",
    orare: ["pasdite", "mbremje"]
  },
  {
    id: "diana-lleshi", emri: "Diana Lleshi", nofka: "DL", av: "av-7",
    lenda: "anglisht", lendaEmer: "Anglisht", flamur: "🇺🇸",
    qyteti: "Prishtinë", cmim: 12, rating: 5.0, komente: 143, mesime: 980,
    super: true, provë: true, online: true,
    ulje: { p5: 0, p10: 8, p20: 12 },
    tags: ["TOEFL", "Anglisht akademik", "Aplikime universitare"],
    gjuhe: ["Shqip (amtare)", "Anglisht (amtare)"],
    nivele: ["mesatar", "avancuar"],
    nxenesitNga: ["🇽🇰 Kosovë", "🇺🇸 SHBA", "🇨🇦 Kanada"],
    bio: "U rrita në Çikago, tani jetoj në Prishtinë. Ndihmoj studentë të aplikojnë në universitete amerikane: TOEFL, ese personale dhe intervista.",
    orare: ["mengjes", "pasdite", "mbremje"]
  },
  {
    id: "besa-kola", emri: "Besa Kola", nofka: "BK", av: "av-5",
    lenda: "shqip", lendaEmer: "Gjuhë Shqipe", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 6, rating: 5.0, komente: 96, mesime: 720,
    super: true, provë: true, online: true,
    ulje: { p5: 0, p10: 10, p20: 10 },
    tags: ["Shqip për të rritur", "Drejtshkrim", "Letërsi"],
    gjuhe: ["Shqip (amtare)", "Anglisht (C1)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    nxenesitNga: ["🇺🇸 SHBA", "🇬🇧 Angli", "🇦🇱 Shqipëri"],
    bio: "Filologe dhe redaktore. Mësoj shqipen për të rriturit e brezit të dytë në diasporë që duan ta rifitojnë gjuhën, si dhe drejtshkrim e letërsi për maturantët.",
    orare: ["mengjes", "pasdite"]
  },
  {
    id: "anila-shehu", emri: "Anila Shehu", nofka: "AS", av: "av-5",
    lenda: "italisht", lendaEmer: "Italisht", flamur: "🇮🇹",
    qyteti: "Durrës", cmim: 7, rating: 4.9, komente: 187, mesime: 1290,
    super: true, provë: true, online: false,
    ulje: { p5: 6, p10: 12, p20: 18 },
    tags: ["Italisht bisedor", "CILS", "Për fëmijë"],
    gjuhe: ["Shqip (amtare)", "Italisht (C2)"],
    nivele: ["fillestar", "mesatar"],
    nxenesitNga: ["🇮🇹 Itali", "🇦🇱 Shqipëri"],
    bio: "Diplomuar në Universitetin e Bolonjës. Mësimet i ndërtoj rreth situatave reale — udhëtim, punë, familje. Punoj shumë mirë edhe me fëmijë 8–14 vjeç.",
    orare: ["mengjes", "pasdite"]
  },
  {
    id: "kreshnik-dema", emri: "Kreshnik Dema", nofka: "KD", av: "av-4",
    lenda: "informatike", lendaEmer: "Informatikë", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 14, rating: 4.8, komente: 96, mesime: 640,
    super: false, provë: true, online: true,
    ulje: { p5: 0, p10: 5, p20: 10 },
    tags: ["Python", "Web Development", "Bazat e programimit"],
    gjuhe: ["Shqip (amtare)", "Anglisht (C1)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    nxenesitNga: ["🇦🇱 Shqipëri", "🇩🇪 Gjermani", "🇽🇰 Kosovë"],
    bio: "Inxhinier softuerësh me 9 vjet përvojë në kompani ndërkombëtare. Mësoj Python, JavaScript dhe bazat e algoritmikës me projekte reale, jo teori të thatë.",
    orare: ["mbremje"]
  },
  {
    id: "vjosa-gashi", emri: "Vjosa Gashi", nofka: "VG", av: "av-3",
    lenda: "frengjisht", lendaEmer: "Frëngjisht", flamur: "🇫🇷",
    qyteti: "Pejë", cmim: 10, rating: 4.9, komente: 121, mesime: 870,
    super: true, provë: true, online: true,
    ulje: { p5: 5, p10: 10, p20: 15 },
    tags: ["DELF", "Frëngjisht bisedor", "Kulturë franceze"],
    gjuhe: ["Shqip (amtare)", "Frëngjisht (C1)", "Anglisht (B2)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    nxenesitNga: ["🇽🇰 Kosovë", "🇨🇭 Zvicër", "🇧🇪 Belgjikë"],
    bio: "Diplomuar në Sorbonne. Mësimet i bëj dinamike me muzikë, filma dhe biseda — jo vetëm gramatikë. Përgatis për provimet DELF/DALF.",
    orare: ["mengjes", "mbremje"]
  },
  {
    id: "ilir-metani", emri: "Ilir Metani", nofka: "IM", av: "av-6",
    lenda: "fizike", lendaEmer: "Fizikë", flamur: "🇦🇱",
    qyteti: "Vlorë", cmim: 8, rating: 4.7, komente: 74, mesime: 510,
    super: false, provë: false, online: true,
    ulje: { p5: 0, p10: 0, p20: 10 },
    tags: ["Mekanikë", "Elektricitet", "Olimpiada"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B1)"],
    nivele: ["mesatar", "avancuar"],
    nxenesitNga: ["🇦🇱 Shqipëri", "🇽🇰 Kosovë"],
    bio: "Doktorant në fizikë. Shpjegoj me eksperimente dhe simulime — fizika kuptohet, nuk mësohet përmendësh. Përgatis edhe për olimpiada kombëtare.",
    orare: ["pasdite", "mbremje"]
  },
  {
    id: "genci-rama", emri: "Genci Rama", nofka: "GR", av: "av-8",
    lenda: "kimi", lendaEmer: "Kimi", flamur: "🇦🇱",
    qyteti: "Elbasan", cmim: 7, rating: 4.8, komente: 62, mesime: 430,
    super: false, provë: true, online: true,
    ulje: { p5: 5, p10: 10, p20: 12 },
    tags: ["Kimi organike", "Matura", "Farmaci"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B2)"],
    nivele: ["mesatar", "avancuar"],
    nxenesitNga: ["🇦🇱 Shqipëri", "🇮🇹 Itali"],
    bio: "Mësues kimie dhe ish-laborant. Kimia organike bëhet e thjeshtë kur e sheh si logjikë, jo si formula. Përgatis për maturë dhe pranime në Farmaci.",
    orare: ["pasdite"]
  },
  {
    id: "flori-zeka", emri: "Flori Zeka", nofka: "FZ", av: "av-1",
    lenda: "biologji", lendaEmer: "Biologji", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 8, rating: 4.7, komente: 58, mesime: 390,
    super: false, provë: true, online: true,
    ulje: { p5: 0, p10: 8, p20: 12 },
    tags: ["Anatomi", "Gjenetikë", "Pranime Mjekësi"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B2)", "Italisht (B1)"],
    nivele: ["mesatar", "avancuar"],
    nxenesitNga: ["🇦🇱 Shqipëri", "🇽🇰 Kosovë"],
    bio: "Student i Mjekësisë në vitin e gjashtë. E di saktësisht çfarë kërkohet në pranimet e Mjekësisë sepse e kalova vetë tre vjet më parë.",
    orare: ["mbremje"]
  },
  {
    id: "endrit-bala", emri: "Endrit Bala", nofka: "EB", av: "av-2",
    lenda: "turqisht", lendaEmer: "Turqisht", flamur: "🇹🇷",
    qyteti: "Shkup", cmim: 7, rating: 4.8, komente: 84, mesime: 560,
    super: false, provë: true, online: true,
    ulje: { p5: 0, p10: 10, p20: 15 },
    tags: ["Turqisht bisedor", "TÖMER", "Për studime"],
    gjuhe: ["Shqip (amtare)", "Turqisht (C1)", "Anglisht (B1)"],
    nivele: ["fillestar", "mesatar"],
    nxenesitNga: ["🇲🇰 Maqedoni e V.", "🇽🇰 Kosovë", "🇹🇷 Turqi"],
    bio: "Studiova në Stamboll me bursë. Ndihmoj studentë që aplikojnë për bursat turke (Türkiye Bursları) dhe përgatiten për TÖMER.",
    orare: ["pasdite", "mbremje"]
  }
];

window.MESO_LENDET = [
  { key: "shqip-femije", emer: "Shqip për fëmijë",   ikona: "🧒", numer: 96,  titull: "Mësues Shqipeje për Fëmijë" },
  { key: "shkolla",      emer: "Ndihmë me shkollën", ikona: "🎒", numer: 118, titull: "Mësues Ndihmës për Shkollën" },
  { key: "anglisht",     emer: "Anglisht",           ikona: "🇬🇧", numer: 412, titull: "Mësues Anglishteje" },
  { key: "gjermanisht",  emer: "Gjermanisht",        ikona: "🇩🇪", numer: 187, titull: "Mësues Gjermanishteje" },
  { key: "italisht",     emer: "Italisht",           ikona: "🇮🇹", numer: 164, titull: "Mësues Italishteje" },
  { key: "frengjisht",   emer: "Frëngjisht",         ikona: "🇫🇷", numer: 98,  titull: "Mësues Frëngjishteje" },
  { key: "turqisht",     emer: "Turqisht",           ikona: "🇹🇷", numer: 76,  titull: "Mësues Turqishteje" },
  { key: "shqip",        emer: "Gjuhë Shqipe",       ikona: "🇦🇱", numer: 121, titull: "Mësues të Gjuhës Shqipe" },
  { key: "matematike",   emer: "Matematikë",         ikona: "📐", numer: 233, titull: "Mësues Matematike" },
  { key: "fizike",       emer: "Fizikë",             ikona: "⚛️", numer: 89,  titull: "Mësues Fizike" },
  { key: "kimi",         emer: "Kimi",               ikona: "🧪", numer: 71,  titull: "Mësues Kimie" },
  { key: "biologji",     emer: "Biologji",           ikona: "🧬", numer: 64,  titull: "Mësues Biologjie" },
  { key: "informatike",  emer: "Informatikë",        ikona: "💻", numer: 142, titull: "Mësues Informatike" },
  { key: "muzike",       emer: "Muzikë",             ikona: "🎹", numer: 47,  titull: "Mësues Muzike" }
];

/* Monedhat — kurse orientuese, vetëm për shfaqje në këtë prototip */
window.MESO_MONEDHAT = [
  { kod: "EUR", shenje: "€",    kurs: 1,    emer: "Euro" },
  { kod: "CHF", shenje: "CHF ", kurs: 0.95, emer: "Franga zvicerane" },
  { kod: "USD", shenje: "$",    kurs: 1.08, emer: "Dollarë amerikanë" },
  { kod: "GBP", shenje: "£",    kurs: 0.84, emer: "Paund britanikë" },
  { kod: "ALL", shenje: "L ",   kurs: 101,  emer: "Lekë" }
];

/* Zonat kohore — ndryshimi në orë ndaj Tiranës (CET) */
window.MESO_ZONAT = [
  { emer: "Tiranë / Prishtinë",    ofset: 0 },
  { emer: "Berlin / Zyrih / Romë", ofset: 0 },
  { emer: "Londër",                ofset: -1 },
  { emer: "Athinë",                ofset: 1 },
  { emer: "New York / Toronto",    ofset: -6 },
  { emer: "Çikago",                ofset: -7 },
  { emer: "Los Angeles",           ofset: -9 },
  { emer: "Sidnej",                ofset: 10 }
];
