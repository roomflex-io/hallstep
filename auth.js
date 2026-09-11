async function twcClient() {
  const res = await fetch("/api/config");
  const cfg = await res.json();
  if (!cfg.ready) throw new Error("Supabase env vars are missing on Vercel");
  return window.supabase.createClient(cfg.url, cfg.key);
}
async function twcRequireAdmin(sb) {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { location.replace("login.html"); return null; }
  const { data, error } = await sb.from("profiles").select("role,email,full_name").eq("id", session.user.id).single();
  if (error || !data || data.role !== "superadmin") { location.replace("login.html"); return null; }
  return { session, profile: data };
}
