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
