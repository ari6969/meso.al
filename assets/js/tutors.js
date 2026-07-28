/* meso.al — baza e të dhënave demo e mësuesve */
window.MESO_TUTORS = [
  {
    id: "elira-hoxha", emri: "Elira Hoxha", nofka: "EH", av: "av-1",
    lenda: "anglisht", lendaEmer: "Anglisht", flamur: "🇬🇧",
    qyteti: "Tiranë", cmim: 9, rating: 5.0, komente: 214, mesime: 1830,
    super: true, provë: true, online: true,
    tags: ["Anglisht bisedor", "IELTS", "Biznes"],
    gjuhe: ["Shqip (amtare)", "Anglisht (C2)", "Italisht (B2)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    bio: "Mësuese e certifikuar CELTA me 8 vjet përvojë. Përgatis studentë për IELTS dhe intervista pune në anglisht. Mësimet janë 100% bisedore që nga dita e parë.",
    orare: ["mengjes", "pasdite", "mbremje"]
  },
  {
    id: "arben-krasniqi", emri: "Arben Krasniqi", nofka: "AK", av: "av-2",
    lenda: "matematike", lendaEmer: "Matematikë", flamur: "🇦🇱",
    qyteti: "Prishtinë", cmim: 8, rating: 4.9, komente: 168, mesime: 1420,
    super: true, provë: true, online: true,
    tags: ["Matura Shtetërore", "Analizë", "Algjebër"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B2)"],
    nivele: ["mesatar", "avancuar"],
    bio: "Profesor matematike në gjimnaz prej 12 vitesh. Specializuar në përgatitjen për Maturën Shtetërore — 94% e nxënësve të mi kalojnë me mbi 8.",
    orare: ["pasdite", "mbremje"]
  },
  {
    id: "sara-berisha", emri: "Sara Berisha", nofka: "SB", av: "av-3",
    lenda: "gjermanisht", lendaEmer: "Gjermanisht", flamur: "🇩🇪",
    qyteti: "Shkodër", cmim: 11, rating: 5.0, komente: 302, mesime: 2610,
    super: true, provë: true, online: true,
    tags: ["Goethe A1–B2", "Gjermanisht për infermierë", "Vizë pune"],
    gjuhe: ["Shqip (amtare)", "Gjermanisht (C1)", "Anglisht (B2)"],
    nivele: ["fillestar", "mesatar"],
    bio: "Jetova 6 vjet në Mynih. Ndihmoj shqiptarë që përgatiten për punë e studime në Gjermani: provimet Goethe, letra motivimi dhe gjuha e përditshme.",
    orare: ["mengjes", "mbremje"]
  },
  {
    id: "kreshnik-dema", emri: "Kreshnik Dema", nofka: "KD", av: "av-4",
    lenda: "informatike", lendaEmer: "Informatikë", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 14, rating: 4.8, komente: 96, mesime: 640,
    super: false, provë: true, online: true,
    tags: ["Python", "Web Development", "Bazat e programimit"],
    gjuhe: ["Shqip (amtare)", "Anglisht (C1)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    bio: "Inxhinier softuerësh me 9 vjet përvojë në kompani ndërkombëtare. Mësoj Python, JavaScript dhe bazat e algoritmikës me projekte reale, jo teori të thatë.",
    orare: ["mbremje"]
  },
  {
    id: "anila-shehu", emri: "Anila Shehu", nofka: "AS", av: "av-5",
    lenda: "italisht", lendaEmer: "Italisht", flamur: "🇮🇹",
    qyteti: "Durrës", cmim: 7, rating: 4.9, komente: 187, mesime: 1290,
    super: true, provë: true, online: false,
    tags: ["Italisht bisedor", "CILS", "Për fëmijë"],
    gjuhe: ["Shqip (amtare)", "Italisht (C2)"],
    nivele: ["fillestar", "mesatar"],
    bio: "Diplomuar në Universitetin e Bolonjës. Mësimet i ndërtoj rreth situatave reale — udhëtim, punë, familje. Punoj shumë mirë edhe me fëmijë 8–14 vjeç.",
    orare: ["mengjes", "pasdite"]
  },
  {
    id: "ilir-metani", emri: "Ilir Metani", nofka: "IM", av: "av-6",
    lenda: "fizike", lendaEmer: "Fizikë", flamur: "🇦🇱",
    qyteti: "Vlorë", cmim: 8, rating: 4.7, komente: 74, mesime: 510,
    super: false, provë: false, online: true,
    tags: ["Mekanikë", "Elektricitet", "Olimpiada"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B1)"],
    nivele: ["mesatar", "avancuar"],
    bio: "Doktorant në fizikë. Shpjegoj me eksperimente dhe simulime — fizika kuptohet, nuk mësohet përmendësh. Përgatis edhe për olimpiada kombëtare.",
    orare: ["pasdite", "mbremje"]
  },
  {
    id: "diana-lleshi", emri: "Diana Lleshi", nofka: "DL", av: "av-7",
    lenda: "anglisht", lendaEmer: "Anglisht", flamur: "🇺🇸",
    qyteti: "Prishtinë", cmim: 12, rating: 5.0, komente: 143, mesime: 980,
    super: true, provë: true, online: true,
    tags: ["TOEFL", "Anglisht akademik", "Aplikime universitare"],
    gjuhe: ["Shqip (amtare)", "Anglisht (amtare)"],
    nivele: ["mesatar", "avancuar"],
    bio: "U rrita në Çikago, tani jetoj në Prishtinë. Ndihmoj studentë të aplikojnë në universitete amerikane: TOEFL, ese personale dhe intervista.",
    orare: ["mengjes", "pasdite", "mbremje"]
  },
  {
    id: "genci-rama", emri: "Genci Rama", nofka: "GR", av: "av-8",
    lenda: "kimi", lendaEmer: "Kimi", flamur: "🇦🇱",
    qyteti: "Elbasan", cmim: 7, rating: 4.8, komente: 62, mesime: 430,
    super: false, provë: true, online: true,
    tags: ["Kimi organike", "Matura", "Farmaci"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B2)"],
    nivele: ["mesatar", "avancuar"],
    bio: "Mësues kimie dhe ish-laborant. Kimia organike bëhet e thjeshtë kur e sheh si logjikë, jo si formula. Përgatis për maturë dhe pranime në Farmaci.",
    orare: ["pasdite"]
  },
  {
    id: "vjosa-gashi", emri: "Vjosa Gashi", nofka: "VG", av: "av-3",
    lenda: "frengjisht", lendaEmer: "Frëngjisht", flamur: "🇫🇷",
    qyteti: "Pejë", cmim: 10, rating: 4.9, komente: 121, mesime: 870,
    super: true, provë: true, online: true,
    tags: ["DELF", "Frëngjisht bisedor", "Kulturë franceze"],
    gjuhe: ["Shqip (amtare)", "Frëngjisht (C1)", "Anglisht (B2)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    bio: "Diplomuar në Sorbonne. Mësimet i bëj dinamike me muzikë, filma dhe biseda — jo vetëm gramatikë. Përgatis për provimet DELF/DALF.",
    orare: ["mengjes", "mbremje"]
  },
  {
    id: "flori-zeka", emri: "Flori Zeka", nofka: "FZ", av: "av-1",
    lenda: "biologji", lendaEmer: "Biologji", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 8, rating: 4.7, komente: 58, mesime: 390,
    super: false, provë: true, online: true,
    tags: ["Anatomi", "Gjenetikë", "Pranime Mjekësi"],
    gjuhe: ["Shqip (amtare)", "Anglisht (B2)", "Italisht (B1)"],
    nivele: ["mesatar", "avancuar"],
    bio: "Student i Mjekësisë në vitin e gjashtë. E di saktësisht çfarë kërkohet në pranimet e Mjekësisë sepse e kalova vetë tre vjet më parë.",
    orare: ["mbremje"]
  },
  {
    id: "besa-kola", emri: "Besa Kola", nofka: "BK", av: "av-5",
    lenda: "shqip", lendaEmer: "Gjuhë Shqipe", flamur: "🇦🇱",
    qyteti: "Tiranë", cmim: 6, rating: 5.0, komente: 96, mesime: 720,
    super: true, provë: true, online: true,
    tags: ["Shqip për të huaj", "Drejtshkrim", "Letërsi"],
    gjuhe: ["Shqip (amtare)", "Anglisht (C1)"],
    nivele: ["fillestar", "mesatar", "avancuar"],
    bio: "Filologe dhe redaktore. Mësoj shqipen për të huaj dhe për diasporën, si dhe drejtshkrim e letërsi për maturantët.",
    orare: ["mengjes", "pasdite"]
  },
  {
    id: "endrit-bala", emri: "Endrit Bala", nofka: "EB", av: "av-2",
    lenda: "turqisht", lendaEmer: "Turqisht", flamur: "🇹🇷",
    qyteti: "Shkup", cmim: 7, rating: 4.8, komente: 84, mesime: 560,
    super: false, provë: true, online: true,
    tags: ["Turqisht bisedor", "TÖMER", "Për studime"],
    gjuhe: ["Shqip (amtare)", "Turqisht (C1)", "Anglisht (B1)"],
    nivele: ["fillestar", "mesatar"],
    bio: "Studiova në Stamboll me bursë. Ndihmoj studentë që aplikojnë për bursat turke (Türkiye Bursları) dhe përgatiten për TÖMER.",
    orare: ["pasdite", "mbremje"]
  }
];

window.MESO_LENDET = [
  { key: "anglisht",    emer: "Anglisht",      ikona: "🇬🇧", numer: 412 },
  { key: "gjermanisht", emer: "Gjermanisht",   ikona: "🇩🇪", numer: 187 },
  { key: "italisht",    emer: "Italisht",      ikona: "🇮🇹", numer: 164 },
  { key: "frengjisht",  emer: "Frëngjisht",    ikona: "🇫🇷", numer: 98  },
  { key: "turqisht",    emer: "Turqisht",      ikona: "🇹🇷", numer: 76  },
  { key: "shqip",       emer: "Gjuhë Shqipe",  ikona: "🇦🇱", numer: 121 },
  { key: "matematike",  emer: "Matematikë",    ikona: "📐", numer: 233 },
  { key: "fizike",      emer: "Fizikë",        ikona: "⚛️", numer: 89  },
  { key: "kimi",        emer: "Kimi",          ikona: "🧪", numer: 71  },
  { key: "biologji",    emer: "Biologji",      ikona: "🧬", numer: 64  },
  { key: "informatike", emer: "Informatikë",   ikona: "💻", numer: 142 },
  { key: "muzike",      emer: "Muzikë",        ikona: "🎹", numer: 47  }
];
