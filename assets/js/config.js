/* ==========================================================================
   meso.al — konfigurimi i Supabase

   Plotëso këto dy vlera nga: Supabase → Project Settings → API
     - Project URL
     - anon / public key

   ⚠️  Këtu vendoset VETËM çelësi `anon`. Ai është i sigurt për front-end
       sepse mbrohet nga Row Level Security. Mos vendos KURRË çelësin
       `service_role` — ai anashkalon çdo politikë sigurie.

   Nëse i lë bosh, faqja punon si prototip me të dhënat nga tutors.js.
   ========================================================================== */
window.MESO_CONFIG = {
  SUPABASE_URL: "https://gyvjzesgowzhrzuqmlpc.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_I36ONSBY-sv8_GyrZwE5Sw_NKRv-lbt"
};
