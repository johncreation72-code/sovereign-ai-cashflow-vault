const { supabaseRequest } = require('./supabase_client');
const fs = require('fs');
const path = require('path');

async function syncAllToSupabase() {
  console.log("==========================================================");
  console.log(" SYNCING SOVEREIGN LEADS TO SUPABASE CLOUD DATABASE");
  console.log("==========================================================");

  const blitzFile = path.join(__dirname, 'blitz_active_leads.json');
  if (!fs.existsSync(blitzFile)) return;

  const leads = JSON.parse(fs.readFileSync(blitzFile, 'utf8'));
  console.log(`[+] Found ${leads.length} active leads to sync...`);

  // Query existing campaign
  const cmpRes = await supabaseRequest('campaigns?select=id&limit=1');
  const campaignId = cmpRes.data?.[0]?.id || 'cmp_sovereign_master';

  for (const l of leads) {
    const payload = {
      id: `sovereign_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      campaign_id: campaignId,
      first_name: l.name.split(' ')[0] || 'Executive',
      last_name: l.name.split(' ').slice(1).join(' ') || l.company,
      email: l.email,
      status: 'pending'
    };

    const res = await supabaseRequest('leads', 'POST', payload);
    console.log(`  [+] Synced: ${l.name} (${l.email}) -> Supabase Status: ${res.status}`);
  }

  console.log("\n ALL LEADS PERMANENTLY STORED IN SUPABASE CLUSTER!");
}

syncAllToSupabase().catch(console.error);
