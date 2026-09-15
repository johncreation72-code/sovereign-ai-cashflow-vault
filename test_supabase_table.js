const { supabaseRequest } = require('./supabase_client');

async function main() {
  const res = await supabaseRequest('leads?select=*&limit=1');
  console.log("Supabase Leads Query Status:", res.status);
  console.log("Data:", res.data);
}

main().catch(console.error);
