-- ===========================================================================
-- meso.al — skema e bazës së të dhënave
-- Ekzekuto në: Supabase → SQL Editor → New query → Run
-- ===========================================================================

-- ---------- Tipat ----------
do $$ begin
  create type roli_t as enum ('nxenes', 'mesues', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type statusi_mesuesi_t as enum ('draft', 'ne_shqyrtim', 'aktiv', 'pezulluar');
exception when duplicate_object then null; end $$;

do $$ begin
  create type statusi_rezervimi_t as enum ('pritje', 'konfirmuar', 'perfunduar', 'anuluar', 'mungese');
exception when duplicate_object then null; end $$;

-- ---------- Lëndët ----------
create table if not exists lendet (
  id        text primary key,              -- 'anglisht', 'shqip-femije'
  emer      text not null,
  ikona     text,
  titull    text,                          -- "Mësues Anglishteje"
  renditja  int  not null default 100
);

-- ---------- Profilet ----------
-- user_id është NULL për profilet demo të mbjella nga seed-i.
-- Profilet e përdoruesve realë krijohen automatikisht nga trigger-i më poshtë.
create table if not exists profilet (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid unique references auth.users(id) on delete cascade,
  roli         roli_t not null default 'nxenes',
  emri         text not null,
  mbiemri      text,
  nofka        text,                       -- inicialet për avatarin
  ngjyra       text default 'av-1',
  qyteti       text,
  shteti       text,
  zona_kohore  text default 'Europe/Tirane',
  monedha      text default 'EUR',
  krijuar      timestamptz not null default now()
);

-- ---------- Mësuesit ----------
-- SHËNIM: çmimin dhe uljet i cakton VETË mësuesi. Platforma nuk vendos tarifa.
-- Çmimet ruhen si numra të plotë në cent euro — kurrë me presje dhjetore.
create table if not exists mesuesit (
  id                    uuid primary key references profilet(id) on delete cascade,
  lenda_id              text references lendet(id),
  statusi               statusi_mesuesi_t not null default 'draft',
  cmimi_cent            int  not null check (cmimi_cent between 100 and 20000),
  ulje_5                smallint not null default 0 check (ulje_5  between 0 and 50),
  ulje_10               smallint not null default 0 check (ulje_10 between 0 and 50),
  ulje_20               smallint not null default 0 check (ulje_20 between 0 and 50),
  ofron_prove           boolean  not null default true,
  bio                   text,
  video_url             text,
  etiketat              text[] default '{}',
  gjuhet                text[] default '{}',
  nivelet               text[] default '{}',
  nxenesit_nga          text[] default '{}',
  -- komisioni aktual i mësuesit; te rezervimi ruhet si fotografi
  komisioni_perqindje   numeric(4,2) not null default 18.00,
  vleresimi             numeric(2,1) not null default 0,
  nr_komente            int not null default 0,
  nr_mesime             int not null default 0,
  perditesuar           timestamptz not null default now()
);

create index if not exists idx_mesuesit_lenda   on mesuesit(lenda_id) where statusi = 'aktiv';
create index if not exists idx_mesuesit_cmimi   on mesuesit(cmimi_cent) where statusi = 'aktiv';

-- ---------- Disponueshmëria ----------
-- Ora ruhet gjithmonë në UTC. Konvertimi bëhet vetëm në shfaqje.
create table if not exists disponueshmeria (
  id         bigserial primary key,
  mesues_id  uuid not null references mesuesit(id) on delete cascade,
  dita       smallint not null check (dita between 0 and 6),   -- 0 = e hënë
  ora_utc    time not null,
  unique (mesues_id, dita, ora_utc)
);

-- ---------- Rezervimet ----------
create table if not exists rezervimet (
  id                bigserial primary key,
  mesues_id         uuid not null references mesuesit(id),
  nxenes_id         uuid not null references profilet(id),
  fillon_utc        timestamptz not null,
  kohezgjatja_min   smallint not null default 50,
  statusi           statusi_rezervimi_t not null default 'pritje',
  eshte_prove       boolean not null default false,
  -- Fotografi e çmimit dhe komisionit në momentin e rezervimit.
  -- Nuk llogariten kurrë më vonë: tarifat ndryshojnë, historiku jo.
  cmimi_cent        int not null,
  monedha           text not null default 'EUR',
  komisioni_cent    int not null,
  krijuar           timestamptz not null default now(),
  unique (mesues_id, fillon_utc)
);

create index if not exists idx_rezervimet_nxenes on rezervimet(nxenes_id, fillon_utc desc);
create index if not exists idx_rezervimet_mesues on rezervimet(mesues_id, fillon_utc desc);

-- ---------- Komentet ----------
create table if not exists komentet (
  id           bigserial primary key,
  rezervim_id  bigint unique references rezervimet(id) on delete cascade,
  mesues_id    uuid not null references mesuesit(id) on delete cascade,
  nxenes_id    uuid not null references profilet(id) on delete cascade,
  yje          smallint not null check (yje between 1 and 5),
  tekst        text,
  krijuar      timestamptz not null default now()
);

create index if not exists idx_komentet_mesues on komentet(mesues_id, krijuar desc);

-- ---------- Mesazhet ----------
create table if not exists mesazhet (
  id          bigserial primary key,
  nga_id      uuid not null references profilet(id) on delete cascade,
  per_id      uuid not null references profilet(id) on delete cascade,
  teksti      text not null,
  lexuar      boolean not null default false,
  krijuar     timestamptz not null default now()
);

create index if not exists idx_mesazhet_bisede on mesazhet(nga_id, per_id, krijuar desc);

-- ===========================================================================
-- Trigger: krijo profilin automatikisht kur regjistrohet një përdorues i ri
-- ===========================================================================
create or replace function public.krijo_profilin()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profilet (user_id, roli, emri, mbiemri, nofka)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'roli')::roli_t, 'nxenes'),
    coalesce(new.raw_user_meta_data ->> 'emri', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'mbiemri',
    upper(left(coalesce(new.raw_user_meta_data ->> 'emri', new.email), 1) ||
          left(coalesce(new.raw_user_meta_data ->> 'mbiemri', ''), 1))
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.krijo_profilin();

-- ===========================================================================
-- Trigger: rifresko vlerësimin e mësuesit kur shtohet/hiqet një koment
-- ===========================================================================
create or replace function public.rifresko_vleresimin()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  v_id := coalesce(new.mesues_id, old.mesues_id);
  update mesuesit m set
    vleresimi  = coalesce((select round(avg(yje)::numeric, 1) from komentet where mesues_id = v_id), 0),
    nr_komente = (select count(*) from komentet where mesues_id = v_id)
  where m.id = v_id;
  return null;
end $$;

drop trigger if exists on_koment_ndryshuar on komentet;
create trigger on_koment_ndryshuar
  after insert or update or delete on komentet
  for each row execute function public.rifresko_vleresimin();

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table profilet        enable row level security;
alter table mesuesit        enable row level security;
alter table lendet          enable row level security;
alter table disponueshmeria enable row level security;
alter table rezervimet      enable row level security;
alter table komentet        enable row level security;
alter table mesazhet        enable row level security;

-- Ndihmës: profili i përdoruesit aktual
create or replace function public.profili_im()
returns uuid language sql stable security definer set search_path = public as $$
  select id from profilet where user_id = auth.uid();
$$;

-- --- Lëndët: publike për lexim ---
drop policy if exists lendet_lexim on lendet;
create policy lendet_lexim on lendet for select using (true);

-- --- Profilet ---
-- Publik sheh vetëm profilet e mësuesve aktivë; përdoruesi sheh të vetin.
drop policy if exists profilet_lexim on profilet;
create policy profilet_lexim on profilet for select using (
  user_id = auth.uid()
  or id in (select id from mesuesit where statusi = 'aktiv')
);

drop policy if exists profilet_perditeso on profilet;
create policy profilet_perditeso on profilet for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- --- Mësuesit ---
drop policy if exists mesuesit_lexim on mesuesit;
create policy mesuesit_lexim on mesuesit for select using (
  statusi = 'aktiv' or id = public.profili_im()
);

-- Mësuesi krijon dhe përditëson VETËM rreshtin e vet — përfshirë çmimin.
drop policy if exists mesuesit_krijo on mesuesit;
create policy mesuesit_krijo on mesuesit for insert
  with check (id = public.profili_im());

drop policy if exists mesuesit_perditeso on mesuesit;
create policy mesuesit_perditeso on mesuesit for update
  using (id = public.profili_im()) with check (id = public.profili_im());

-- --- Disponueshmëria ---
drop policy if exists dispo_lexim on disponueshmeria;
create policy dispo_lexim on disponueshmeria for select using (true);

drop policy if exists dispo_menaxho on disponueshmeria;
create policy dispo_menaxho on disponueshmeria for all
  using (mesues_id = public.profili_im()) with check (mesues_id = public.profili_im());

-- --- Rezervimet: i sheh vetëm nxënësi dhe mësuesi përkatës ---
drop policy if exists rezervimet_lexim on rezervimet;
create policy rezervimet_lexim on rezervimet for select using (
  nxenes_id = public.profili_im() or mesues_id = public.profili_im()
);

drop policy if exists rezervimet_krijo on rezervimet;
create policy rezervimet_krijo on rezervimet for insert
  with check (nxenes_id = public.profili_im());

drop policy if exists rezervimet_perditeso on rezervimet;
create policy rezervimet_perditeso on rezervimet for update using (
  nxenes_id = public.profili_im() or mesues_id = public.profili_im()
);

-- --- Komentet: publike për lexim, shkruhen vetëm pas një mësimi të përfunduar ---
drop policy if exists komentet_lexim on komentet;
create policy komentet_lexim on komentet for select using (true);

drop policy if exists komentet_krijo on komentet;
create policy komentet_krijo on komentet for insert with check (
  nxenes_id = public.profili_im()
  and exists (
    select 1 from rezervimet r
    where r.id = rezervim_id
      and r.nxenes_id = public.profili_im()
      and r.statusi = 'perfunduar'
  )
);

-- --- Mesazhet: vetëm dërguesi dhe marrësi ---
drop policy if exists mesazhet_lexim on mesazhet;
create policy mesazhet_lexim on mesazhet for select using (
  nga_id = public.profili_im() or per_id = public.profili_im()
);

drop policy if exists mesazhet_krijo on mesazhet;
create policy mesazhet_krijo on mesazhet for insert
  with check (nga_id = public.profili_im());

-- ===========================================================================
-- Pamje publike: mësuesit aktivë me të dhënat e profilit, gati për front-end
-- ===========================================================================
create or replace view mesuesit_publik
with (security_invoker = true) as
select
  m.id,
  p.emri, p.mbiemri, p.nofka, p.ngjyra, p.qyteti, p.shteti,
  m.lenda_id, l.emer as lenda_emer, l.ikona as lenda_ikona,
  m.cmimi_cent, m.ulje_5, m.ulje_10, m.ulje_20, m.ofron_prove,
  m.bio, m.video_url, m.etiketat, m.gjuhet, m.nivelet, m.nxenesit_nga,
  m.vleresimi, m.nr_komente, m.nr_mesime
from mesuesit m
join profilet p on p.id = m.id
left join lendet l on l.id = m.lenda_id
where m.statusi = 'aktiv';
