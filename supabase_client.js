/**
 * ==============================================================================
 * SOVEREIGN // SUPABASE CLOUD DATABASE & EVENT TELEMETRY ENGINE
 * ==============================================================================
 * Connects Sovereign Hub to Supabase for persistent tracking of:
 * - Verified Leads & C-Suite Inboxes
 * - Outbound Pitch Dispatch Logs
 * - Real-Time Sales & Crypto Payout Events
 * ==============================================================================
 */

const https = require('https');

const SUPABASE_URL = 'https://aftwwynuchzwysijhhbb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MxgHHZQGii2SWPVlCxvJIA_0A_JHv-w';

function supabaseRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${endpoint}`);
    const postData = data ? JSON.stringify(data) : null;

    const headers = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };

    if (postData) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch (e) { resolve({ status: res.statusCode, raw: body }); }
      });
    });

    req.on('error', err => resolve({ error: true, message: err.message }));
    if (postData) req.write(postData);
    req.end();
  });
}

async function testSupabaseConnection() {
  console.log("==========================================================");
  console.log(" TESTING SOVEREIGN  SUPABASE CLOUD DATABASE LINK");
  console.log("==========================================================");
  console.log(`Supabase URL: ${SUPABASE_URL}`);

  const res = await supabaseRequest('');
  console.log(`[+] Supabase API Ping Status: ${res.status}`);
  if (res.status >= 200 && res.status < 300) {
    console.log(" SUPABASE CLOUD DATABASE SUCCESSFULLY LINKED TO SOVEREIGN HUB!");
  } else {
    console.log("[*] Supabase response:", res);
  }
  return res;
}

if (require.main === module) {
  testSupabaseConnection().catch(console.error);
}

module.exports = { supabaseRequest, SUPABASE_URL, SUPABASE_ANON_KEY };
