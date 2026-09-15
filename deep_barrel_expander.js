const https = require('https');
const fs = require('fs');
const path = require('path');
const { supabaseRequest } = require('./supabase_client');

const HUNTER_API_KEY = '3eadd69ea8eae5bc1e84faf52de5624bc1e1560a';

const TARGET_DOMAINS = [
  { domain: 'cbre.com', industry: 'Commercial Real Estate' },
  { domain: 'cushwake.com', industry: 'Commercial Real Estate' },
  { domain: 'clearchoice.com', industry: 'Dental & Implant Centers' },
  { domain: 'sonobello.com', industry: 'Cosmetic & MedSpa' }
];

function hunterSearch(domain) {
  return new Promise((resolve) => {
    const queryParams = new URLSearchParams({ domain, limit: 5, api_key: HUNTER_API_KEY });
    const req = https.request({
      hostname: 'api.hunter.io',
      path: `/v2/domain-search?${queryParams.toString()}`,
      method: 'GET',
      headers: { 'User-Agent': 'Sovereign-DeepMiner/1.0', 'Accept': 'application/json' }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.data?.emails || []);
        } catch(e) { resolve([]); }
      });
    });
    req.on('error', () => resolve([]));
    req.end();
  });
}

async function runDeepExpansion() {
  console.log("================================================================================");
  console.log(" SOVEREIGN DEEP BARREL REVENUE EXPANSION ENGINE");
  console.log("================================================================================\n");

  const cmpRes = await supabaseRequest('campaigns?select=id&limit=1');
  const campaignId = cmpRes.data?.[0]?.id || 'cmp_sovereign_master';

  const allMinedLeads = [];

  for (const target of TARGET_DOMAINS) {
    console.log(`[*] Mining decision-makers for: ${target.domain} (${target.industry})...`);
    const emails = await hunterSearch(target.domain);
    console.log(`  [+] Found ${emails.length} verified contacts.`);
    
    for (const em of emails) {
      const first = em.first_name || 'Executive';
      const last = em.last_name || target.domain;
      const payload = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        campaign_id: campaignId,
        first_name: first,
        last_name: last,
        email: em.value,
        status: 'staged_for_pitch'
      };

      allMinedLeads.push(payload);

      const syncRes = await supabaseRequest('leads', 'POST', payload);
      console.log(`    [ Cloud Synced] ${first} ${last} (${em.value}) -> Supabase: ${syncRes.status}`);
    }
  }

  const outPath = path.join(__dirname, 'deep_mined_leads.json');
  fs.writeFileSync(outPath, JSON.stringify(allMinedLeads, null, 2));

  console.log("\n================================================================================");
  console.log(` DEEP BARREL MINING COMPLETE: ${allMinedLeads.length} NEW HIGH-TICKET LEADS STORED`);
  console.log("================================================================================\n");

  return allMinedLeads;
}

runDeepExpansion().catch(console.error);
