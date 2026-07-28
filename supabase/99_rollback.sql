-- ===========================================================================
-- meso.al — zhbërje e plotë
-- Ekzekuto këtë NËSE dëshiron ta heqësh meso.al nga projekti Supabase.
-- Prek VETËM objektet e krijuara nga 01_schema.sql — asgjë tjetër.
-- ⚠️  Fshin edhe të dhënat e meso.al (mësuesit, rezervimet, komentet).
-- ===========================================================================

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_koment_ndryshuar on komentet;

drop view if exists mesuesit_publik;

drop table if exists mesazhet cascade;
drop table if exists komentet cascade;
drop table if exists rezervimet cascade;
drop table if exists disponueshmeria cascade;
drop table if exists mesuesit cascade;
drop table if exists profilet cascade;
drop table if exists lendet cascade;

drop function if exists public.krijo_profilin() cascade;
drop function if exists public.rifresko_vleresimin() cascade;
drop function if exists public.profili_im() cascade;

drop type if exists roli_t;
drop type if exists statusi_mesuesi_t;
drop type if exists statusi_rezervimi_t;

-- Kontroll: nuk duhet të kthejë asnjë rresht
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('lendet','profilet','mesuesit','disponueshmeria',
                     'rezervimet','komentet','mesazhet');
