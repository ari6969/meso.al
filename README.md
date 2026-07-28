# meso.al

Platformë demonstruese e mësimit privat online në gjuhën shqipe — e frymëzuar nga Preply,
por me identitet **blu & të bardhë** dhe përmbajtje krejtësisht në shqip.

> ⚠️ Ky është një **prototip front-end**. Nuk ka bazë të dhënash, llogari reale apo pagesa.
> Të gjithë mësuesit, komentet dhe statistikat janë shembuj ilustrues.

## Faqet

| Faqja | Skedari | Përshkrimi |
|---|---|---|
| Ballina | `index.html` | Hero me kërkim, lëndët, mësuesit e zgjedhur, si funksionon, dëshmi, FAQ |
| Gjej mësues | `mesues.html` | Listim me filtra funksionalë (lëndë, çmim, nivel, orar) dhe renditje |
| Profili i mësuesit | `profili.html?id=…` | Profil dinamik: bio, orari, komentet, paketat, rezervimi |
| Si funksionon | `si-funksionon.html` | Procesi në 4 hapa, klasa virtuale, garancitë |
| Çmimet | `cmimet.html` | Tre paketa, tabelë çmimesh sipas lëndës, FAQ pagesash |
| Bëhu mësues | `behu-mesues.html` | Përfitimet, kërkesat, formular aplikimi |
| Rreth nesh | `rreth-nesh.html` | Historia, vlerat, ekipi |
| Kontakt | `kontakt.html` | Formular kontakti, zyrat, ndihmë e shpejtë |
| Hyr / Regjistrohu | `hyr.html`, `regjistrohu.html` | Formularë autentifikimi (demo) |
| Kushtet | `kushtet.html` | Kushtet e përdorimit dhe privatësia |
| 404 | `404.html` | Faqja e gabimit |

## Struktura

```
meso.al/
├── index.html … 404.html      # faqet statike
└── assets/
    ├── css/style.css          # design system i plotë (tokens, komponentë, responsive)
    ├── js/tutors.js           # të dhënat demo: 12 mësues + 12 lëndë
    ├── js/main.js             # navigim, FAQ, filtra, renderim kartash
    └── img/                   # logo dhe favicon (SVG)
```

## Paleta

| Token | Vlera | Përdorimi |
|---|---|---|
| `--blue-600` | `#1250EA` | Ngjyra kryesore, butonat |
| `--blue-700` | `#0D3CB4` | Hover, tituj theksues |
| `--blue-50` | `#F2F6FF` | Sfonde të buta |
| `--blue-900` | `#071C54` | Footer |
| `--ink` | `#0E1729` | Teksti kryesor |

## Si ta hapësh lokalisht

Mjafton ta hapësh `index.html` në shfletues. Për të shmangur kufizimet e `file://`
(p.sh. parametrat në URL), përdor një server të thjeshtë:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Teknologjia

HTML, CSS dhe JavaScript i pastër — pa framework, pa build, pa varësi.
E vetmja burim i jashtëm është fonti Inter nga Google Fonts (ka fallback te fonti i sistemit).

## Zhvillime të mundshme

- Backend real (Node/Django) me bazë të dhënash mësuesish
- Autentifikim dhe panel përdoruesi
- Integrim pagesash (Stripe / bankat lokale)
- Klasë virtuale me WebRTC
- Version në anglisht dhe gjermanisht për diasporën

---

© meso.al — projekt demonstrues.

---

## Backend (Supabase)

Faqja punon në dy mënyra:

- **Pa konfigurim** — të dhënat vijnë nga `assets/js/tutors.js` (prototip statik)
- **Me Supabase** — të dhënat, llogaritë dhe rezervimet vijnë nga baza reale

### Ngritja

1. Krijo një projekt **të veçantë** në Supabase (mos e ndaj me projekte të tjera —
   `auth.users` është i përbashkët për projekt).
2. SQL Editor → ekzekuto `supabase/01_schema.sql`, pastaj `supabase/02_seed.sql`.
3. Plotëso `assets/js/config.js` me `Project URL` dhe çelësin **anon**.
   Kurrë me `service_role` — ai anashkalon Row Level Security.
4. Authentication → Providers: aktivizo Email (dhe Google/Facebook nëse i do).
5. Authentication → URL Configuration: shto `https://<user>.github.io/meso.al/`
   te *Site URL* dhe *Redirect URLs*.

### Skema

| Tabela | Përmbajtja |
|---|---|
| `lendet` | Lëndët dhe gjuhët |
| `profilet` | Të dhënat e përdoruesit; `user_id` NULL = profil demo |
| `mesuesit` | Çmimi dhe uljet e caktuara **nga vetë mësuesi**, statusi, bio |
| `disponueshmeria` | Orare të lira, gjithmonë në UTC |
| `rezervimet` | Mësimet, me çmimin e komisionin si fotografi e momentit |
| `komentet` | Vlerësimet; rifreskojnë automatikisht mesataren e mësuesit |
| `mesazhet` | Biseda nxënës–mësues |

Vendime që nuk duhen ndryshuar më vonë: oraret ruhen **në UTC**, çmimet si
**numra të plotë në cent**, dhe komisioni ruhet te çdo rezervim si vlerë e ngrirë.

Row Level Security është aktive në çdo tabelë: mësuesi përditëson vetëm rreshtin
e vet, nxënësi sheh vetëm rezervimet e veta, dhe komenti mund të shkruhet vetëm
pas një mësimi me status `perfunduar`.
