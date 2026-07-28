-- ===========================================================================
-- meso.al — të dhëna fillestare (mësues demo)
-- Ekzekuto PAS 01_schema.sql
-- Gjeneruar automatikisht nga assets/js/tutors.js — mos e redakto me dorë.
-- ===========================================================================

-- ---------- Lëndët ----------
insert into lendet (id, emer, ikona, titull, renditja) values
  ('shqip-femije', 'Shqip për fëmijë', '🧒', 'Mësues Shqipeje për Fëmijë', 0),
  ('shkolla', 'Ndihmë me shkollën', '🎒', 'Mësues Ndihmës për Shkollën', 10),
  ('anglisht', 'Anglisht', '🇬🇧', 'Mësues Anglishteje', 20),
  ('gjermanisht', 'Gjermanisht', '🇩🇪', 'Mësues Gjermanishteje', 30),
  ('italisht', 'Italisht', '🇮🇹', 'Mësues Italishteje', 40),
  ('frengjisht', 'Frëngjisht', '🇫🇷', 'Mësues Frëngjishteje', 50),
  ('turqisht', 'Turqisht', '🇹🇷', 'Mësues Turqishteje', 60),
  ('shqip', 'Gjuhë Shqipe', '🇦🇱', 'Mësues të Gjuhës Shqipe', 70),
  ('matematike', 'Matematikë', '📐', 'Mësues Matematike', 80),
  ('fizike', 'Fizikë', '⚛️', 'Mësues Fizike', 90),
  ('kimi', 'Kimi', '🧪', 'Mësues Kimie', 100),
  ('biologji', 'Biologji', '🧬', 'Mësues Biologjie', 110),
  ('informatike', 'Informatikë', '💻', 'Mësues Informatike', 120),
  ('muzike', 'Muzikë', '🎹', 'Mësues Muzike', 130)
on conflict (id) do update set
  emer = excluded.emer, ikona = excluded.ikona,
  titull = excluded.titull, renditja = excluded.renditja;

-- ---------- Mësuesit demo ----------
-- user_id mbetet NULL: këto janë profile demonstruese pa llogari hyrjeje.
do $$
declare v_id uuid;
begin

  -- Mirjeta Hoxhaj
  select id into v_id from profilet where nofka = 'MH' and emri = 'Mirjeta' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Mirjeta', 'Hoxhaj', 'MH', 'av-3', 'Tiranë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'shqip-femije', 'aktiv', 1000,
    5, 12, 20, true,
    'Mësuese e ciklit fillor me 11 vjet përvojë. Punoj vetëm me fëmijë të diasporës që e flasin shqipen në shtëpi por nuk e lexojnë e shkruajnë dot. Mësimet i bëj me lojëra, këngë dhe përralla — fëmija nuk e ndien si detyrë shtëpie.', array['Fëmijë 5–12 vjeç', 'Alfabeti dhe leximi', 'Përralla shqiptare'], array['Shqip (amtare)', 'Gjermanisht (B2)', 'Anglisht (B1)'], array['fillestar', 'mesatar'], array['🇩🇪 Gjermani', '🇨🇭 Zvicër', '🇬🇧 Angli'],
    5, 178, 1240
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Fatos Berisha
  select id into v_id from profilet where nofka = 'FB' and emri = 'Fatos' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Fatos', 'Berisha', 'FB', 'av-1', 'Prishtinë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'shkolla', 'aktiv', 1200,
    0, 10, 15, true,
    'Punoj me fëmijë shqiptarë që ndjekin shkollën në Gjermani, Austri dhe Zvicër. Problemi rrallë është lënda — është gjuha. Ua shpjegoj matematikën dhe shkencat në shqip, pastaj i ndihmoj t''i shkruajnë përgjigjet në gjermanisht.', array['Matematikë në shqip', 'Shkolla gjermane', 'Klasat 5–10'], array['Shqip (amtare)', 'Gjermanisht (C1)', 'Anglisht (B2)'], array['fillestar', 'mesatar', 'avancuar'], array['🇩🇪 Gjermani', '🇦🇹 Austri', '🇨🇭 Zvicër'],
    4.9, 134, 910
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Elira Hoxha
  select id into v_id from profilet where nofka = 'EH' and emri = 'Elira' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Elira', 'Hoxha', 'EH', 'av-1', 'Tiranë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'anglisht', 'aktiv', 900,
    0, 10, 15, true,
    'Mësuese e certifikuar CELTA me 8 vjet përvojë. Përgatis studentë për IELTS dhe intervista pune në anglisht. Mësimet janë 100% bisedore që nga dita e parë.', array['Anglisht bisedor', 'IELTS', 'Biznes'], array['Shqip (amtare)', 'Anglisht (C2)', 'Italisht (B2)'], array['fillestar', 'mesatar', 'avancuar'], array['🇦🇱 Shqipëri', '🇽🇰 Kosovë', '🇮🇹 Itali'],
    5, 214, 1830
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Sara Berisha
  select id into v_id from profilet where nofka = 'SB' and emri = 'Sara' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Sara', 'Berisha', 'SB', 'av-3', 'Shkodër', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'gjermanisht', 'aktiv', 1100,
    8, 15, 22, true,
    'Jetova 6 vjet në Mynih. Ndihmoj shqiptarë që përgatiten për punë e studime në Gjermani: provimet Goethe, letra motivimi dhe gjuha e përditshme.', array['Goethe A1–B2', 'Gjermanisht për infermierë', 'Vizë pune'], array['Shqip (amtare)', 'Gjermanisht (C1)', 'Anglisht (B2)'], array['fillestar', 'mesatar'], array['🇦🇱 Shqipëri', '🇽🇰 Kosovë', '🇩🇪 Gjermani'],
    5, 302, 2610
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Arben Krasniqi
  select id into v_id from profilet where nofka = 'AK' and emri = 'Arben' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Arben', 'Krasniqi', 'AK', 'av-2', 'Prishtinë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'matematike', 'aktiv', 800,
    5, 10, 15, true,
    'Profesor matematike në gjimnaz prej 12 vitesh. Specializuar në përgatitjen për Maturën Shtetërore — 94% e nxënësve të mi kalojnë me mbi 8.', array['Matura Shtetërore', 'Analizë', 'Algjebër'], array['Shqip (amtare)', 'Anglisht (B2)'], array['mesatar', 'avancuar'], array['🇽🇰 Kosovë', '🇦🇱 Shqipëri', '🇲🇰 Maqedoni e V.'],
    4.9, 168, 1420
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Diana Lleshi
  select id into v_id from profilet where nofka = 'DL' and emri = 'Diana' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Diana', 'Lleshi', 'DL', 'av-7', 'Prishtinë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'anglisht', 'aktiv', 1200,
    0, 8, 12, true,
    'U rrita në Çikago, tani jetoj në Prishtinë. Ndihmoj studentë të aplikojnë në universitete amerikane: TOEFL, ese personale dhe intervista.', array['TOEFL', 'Anglisht akademik', 'Aplikime universitare'], array['Shqip (amtare)', 'Anglisht (amtare)'], array['mesatar', 'avancuar'], array['🇽🇰 Kosovë', '🇺🇸 SHBA', '🇨🇦 Kanada'],
    5, 143, 980
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Besa Kola
  select id into v_id from profilet where nofka = 'BK' and emri = 'Besa' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Besa', 'Kola', 'BK', 'av-5', 'Tiranë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'shqip', 'aktiv', 600,
    0, 10, 10, true,
    'Filologe dhe redaktore. Mësoj shqipen për të rriturit e brezit të dytë në diasporë që duan ta rifitojnë gjuhën, si dhe drejtshkrim e letërsi për maturantët.', array['Shqip për të rritur', 'Drejtshkrim', 'Letërsi'], array['Shqip (amtare)', 'Anglisht (C1)'], array['fillestar', 'mesatar', 'avancuar'], array['🇺🇸 SHBA', '🇬🇧 Angli', '🇦🇱 Shqipëri'],
    5, 96, 720
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Anila Shehu
  select id into v_id from profilet where nofka = 'AS' and emri = 'Anila' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Anila', 'Shehu', 'AS', 'av-5', 'Durrës', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'italisht', 'aktiv', 700,
    6, 12, 18, true,
    'Diplomuar në Universitetin e Bolonjës. Mësimet i ndërtoj rreth situatave reale — udhëtim, punë, familje. Punoj shumë mirë edhe me fëmijë 8–14 vjeç.', array['Italisht bisedor', 'CILS', 'Për fëmijë'], array['Shqip (amtare)', 'Italisht (C2)'], array['fillestar', 'mesatar'], array['🇮🇹 Itali', '🇦🇱 Shqipëri'],
    4.9, 187, 1290
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Kreshnik Dema
  select id into v_id from profilet where nofka = 'KD' and emri = 'Kreshnik' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Kreshnik', 'Dema', 'KD', 'av-4', 'Tiranë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'informatike', 'aktiv', 1400,
    0, 5, 10, true,
    'Inxhinier softuerësh me 9 vjet përvojë në kompani ndërkombëtare. Mësoj Python, JavaScript dhe bazat e algoritmikës me projekte reale, jo teori të thatë.', array['Python', 'Web Development', 'Bazat e programimit'], array['Shqip (amtare)', 'Anglisht (C1)'], array['fillestar', 'mesatar', 'avancuar'], array['🇦🇱 Shqipëri', '🇩🇪 Gjermani', '🇽🇰 Kosovë'],
    4.8, 96, 640
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Vjosa Gashi
  select id into v_id from profilet where nofka = 'VG' and emri = 'Vjosa' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Vjosa', 'Gashi', 'VG', 'av-3', 'Pejë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'frengjisht', 'aktiv', 1000,
    5, 10, 15, true,
    'Diplomuar në Sorbonne. Mësimet i bëj dinamike me muzikë, filma dhe biseda — jo vetëm gramatikë. Përgatis për provimet DELF/DALF.', array['DELF', 'Frëngjisht bisedor', 'Kulturë franceze'], array['Shqip (amtare)', 'Frëngjisht (C1)', 'Anglisht (B2)'], array['fillestar', 'mesatar', 'avancuar'], array['🇽🇰 Kosovë', '🇨🇭 Zvicër', '🇧🇪 Belgjikë'],
    4.9, 121, 870
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Ilir Metani
  select id into v_id from profilet where nofka = 'IM' and emri = 'Ilir' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Ilir', 'Metani', 'IM', 'av-6', 'Vlorë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'fizike', 'aktiv', 800,
    0, 0, 10, false,
    'Doktorant në fizikë. Shpjegoj me eksperimente dhe simulime — fizika kuptohet, nuk mësohet përmendësh. Përgatis edhe për olimpiada kombëtare.', array['Mekanikë', 'Elektricitet', 'Olimpiada'], array['Shqip (amtare)', 'Anglisht (B1)'], array['mesatar', 'avancuar'], array['🇦🇱 Shqipëri', '🇽🇰 Kosovë'],
    4.7, 74, 510
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Genci Rama
  select id into v_id from profilet where nofka = 'GR' and emri = 'Genci' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Genci', 'Rama', 'GR', 'av-8', 'Elbasan', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'kimi', 'aktiv', 700,
    5, 10, 12, true,
    'Mësues kimie dhe ish-laborant. Kimia organike bëhet e thjeshtë kur e sheh si logjikë, jo si formula. Përgatis për maturë dhe pranime në Farmaci.', array['Kimi organike', 'Matura', 'Farmaci'], array['Shqip (amtare)', 'Anglisht (B2)'], array['mesatar', 'avancuar'], array['🇦🇱 Shqipëri', '🇮🇹 Itali'],
    4.8, 62, 430
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Flori Zeka
  select id into v_id from profilet where nofka = 'FZ' and emri = 'Flori' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Flori', 'Zeka', 'FZ', 'av-1', 'Tiranë', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'biologji', 'aktiv', 800,
    0, 8, 12, true,
    'Student i Mjekësisë në vitin e gjashtë. E di saktësisht çfarë kërkohet në pranimet e Mjekësisë sepse e kalova vetë tre vjet më parë.', array['Anatomi', 'Gjenetikë', 'Pranime Mjekësi'], array['Shqip (amtare)', 'Anglisht (B2)', 'Italisht (B1)'], array['mesatar', 'avancuar'], array['🇦🇱 Shqipëri', '🇽🇰 Kosovë'],
    4.7, 58, 390
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

  -- Endrit Bala
  select id into v_id from profilet where nofka = 'EB' and emri = 'Endrit' and user_id is null;
  if v_id is null then
    insert into profilet (roli, emri, mbiemri, nofka, ngjyra, qyteti, shteti)
    values ('mesues', 'Endrit', 'Bala', 'EB', 'av-2', 'Shkup', 'AL')
    returning id into v_id;
  end if;

  insert into mesuesit (
    id, lenda_id, statusi, cmimi_cent, ulje_5, ulje_10, ulje_20, ofron_prove,
    bio, etiketat, gjuhet, nivelet, nxenesit_nga, vleresimi, nr_komente, nr_mesime
  ) values (
    v_id, 'turqisht', 'aktiv', 700,
    0, 10, 15, true,
    'Studiova në Stamboll me bursë. Ndihmoj studentë që aplikojnë për bursat turke (Türkiye Bursları) dhe përgatiten për TÖMER.', array['Turqisht bisedor', 'TÖMER', 'Për studime'], array['Shqip (amtare)', 'Turqisht (C1)', 'Anglisht (B1)'], array['fillestar', 'mesatar'], array['🇲🇰 Maqedoni e V.', '🇽🇰 Kosovë', '🇹🇷 Turqi'],
    4.8, 84, 560
  )
  on conflict (id) do update set
    cmimi_cent = excluded.cmimi_cent,
    ulje_5 = excluded.ulje_5, ulje_10 = excluded.ulje_10, ulje_20 = excluded.ulje_20,
    bio = excluded.bio, etiketat = excluded.etiketat, perditesuar = now();

  -- disponueshmëri shembull (orare UTC)
  insert into disponueshmeria (mesues_id, dita, ora_utc)
  select v_id, d, o from
    (values (1), (2), (3), (4)) as dd(d),
    (values ('08:00'::time), ('14:00'::time), ('16:00'::time), ('17:00'::time)) as oo(o)
  on conflict do nothing;

end $$;

-- Kontroll
select l.emer as lenda, count(*) as mesues, min(m.cmimi_cent)/100.0 as me_i_liri,
       max(m.cmimi_cent)/100.0 as me_i_shtrenjti
from mesuesit m join lendet l on l.id = m.lenda_id
where m.statusi = 'aktiv' group by l.emer order by 2 desc;
