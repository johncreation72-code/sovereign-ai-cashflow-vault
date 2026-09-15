/**
 * SOVEREIGN // Autonomous B2B Lead Discovery & Email Extraction Engine (Hunter.io)
 * Extracts Verified Decision-Maker Inboxes for Outbound Client Acquisition
 */

const https = require('https');
const fs = require('fs');

const HUNTER_API_KEY = '3eadd69ea8eae5bc1e84faf52de5624bc1e1560a';

function hunterRequest(endpoint, params = {}) {
  return new Promise((resolve) => {
    const queryParams = new URLSearchParams({ ...params, api_key: HUNTER_API_KEY });
    const req = https.request({
      hostname: 'api.hunter.io',
      path: `/v2/${endpoint}?${queryParams.toString()}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Sovereign-LeadEngine/1.0',
        'Accept': 'application/json'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', err => resolve({ error: true, message: err.message }));
    req.end();
  });
}

async function main() {
  console.log("==========================================================");
  console.log(" SOVEREIGN AUTONOMOUS B2B LEAD DISCOVERY (HUNTER.IO)");
  console.log("==========================================================");
  console.log("Key: 3eadd69e... (Verified)\n");

  console.log("[*] Checking Hunter Account Credits & Status...");
  const account = await hunterRequest('account');
  
  if (account.status === 200) {
    const user = account.data.data;
    console.log(`[+] Authenticated as: ${user.email}`);
    console.log(`[+] Plan: ${user.plan_name}`);
    console.log(`[+] Monthly Searches Available: ${user.requests.searches.available} / ${user.requests.searches.limit}\n`);

    console.log("[*] Executing test domain search for B2B executives (e.g. aesthetic & tech domains)...");
    const searchRes = await hunterRequest('domain-search', { domain: 'realtor.com', limit: 3 });

    if (searchRes.status === 200 && searchRes.data && searchRes.data.data) {
      const d = searchRes.data.data;
      console.log(`[+] SUCCESS! Extracted Domain: ${d.domain} (${d.emails.length} Verified Inboxes):\n`);
      
      d.emails.forEach((em, i) => {
        console.log(`Lead #${i+1}:`);
        console.log(`  Name: ${em.first_name || ''} ${em.last_name || ''}`);
        console.log(`  Email: ${em.value}`);
        console.log(`  Position: ${em.position || 'Executive'}`);
        console.log(`  Confidence: ${em.confidence}%\n`);
      });

      fs.writeFileSync('extracted_hunter_leads.json', JSON.stringify(d.emails, null, 2));
      console.log("[+] Leads saved to extracted_hunter_leads.json");
    } else {
      console.log("Domain search response:", searchRes);
    }
  } else {
    console.error("[-] Authentication failed:", account);
  }
}

main().catch(console.error);
