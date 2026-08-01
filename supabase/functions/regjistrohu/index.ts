/* ==========================================================================
   meso.al — Edge Function: regjistrimi i përdoruesve

   PSE EKZISTON: regjistrimet janë të çaktivizuara globalisht në këtë projekt
   Supabase, sepse projekti tjetër që e ndan të njëjtin instancë nuk i do
   regjistrimet publike. Ky funksion lejon regjistrim VETËM përmes meso.al.

   SIGURIA: çelësi service_role nuk shkruhet askund — Supabase ia jep këtij
   funksioni si variabël mjedisi dhe ai nuk del kurrë te shfletuesi.
   ========================================================================== */

import { createClient } from "jsr:@supabase/supabase-js@2";

const ORIGJINAT_E_LEJUARA = [
  "https://ari6969.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
];

function kokat(origin: string | null) {
  const i_lejuar =
    origin && ORIGJINAT_E_LEJUARA.includes(origin) ? origin : ORIGJINAT_E_LEJUARA[0];
  return {
    "Access-Control-Allow-Origin": i_lejuar,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

function gabim(mesazh: string, status: number, h: HeadersInit) {
  return new Response(JSON.stringify({ error: mesazh }), { status, headers: h });
}

Deno.serve(async (req) => {
  const h = kokat(req.headers.get("origin"));

  if (req.method === "OPTIONS") return new Response("ok", { headers: h });
  if (req.method !== "POST") return gabim("Metodë e palejuar", 405, h);

  let trupi: Record<string, unknown>;
  try {
    trupi = await req.json();
  } catch {
    return gabim("Trup i pavlefshëm kërkese", 400, h);
  }

  const email = String(trupi.email ?? "").trim().toLowerCase();
  const password = String(trupi.password ?? "");
  const emri = String(trupi.emri ?? "").trim();
  const mbiemri = String(trupi.mbiemri ?? "").trim();

  // ---------- Validime ----------
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email))
    return gabim("Adresa e emailit nuk është e vlefshme.", 400, h);
  if (password.length < 8)
    return gabim("Fjalëkalimi duhet të ketë të paktën 8 karaktere.", 400, h);
  if (emri.length < 2 || emri.length > 60)
    return gabim("Emri duhet të jetë 2–60 karaktere.", 400, h);
  if (mbiemri.length > 60)
    return gabim("Mbiemri është shumë i gjatë.", 400, h);

  // Roli nuk mund të jetë kurrë 'admin' — vetëm nxënës ose mësues.
  const roli = trupi.roli === "mesues" ? "mesues" : "nxenes";

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    // Site URL i këtij projekti i përket projektit tjetër (localhost:3000),
    // ndaj linku i konfirmimit do të ishte i pavlefshëm. Konfirmohet direkt.
    // ⚠️ Kjo do të thotë se emaili NUK verifikohet — shih README-në.
    email_confirm: true,
    user_metadata: { emri, mbiemri, roli, burimi: "meso.al" },
  });

  if (error) {
    const tashme = /already|exists|registered/i.test(error.message);
    return gabim(
      tashme ? "Ky email është i regjistruar tashmë." : error.message,
      tashme ? 409 : 400,
      h,
    );
  }

  return new Response(
    JSON.stringify({ ok: true, id: data.user?.id }),
    { status: 200, headers: h },
  );
});
