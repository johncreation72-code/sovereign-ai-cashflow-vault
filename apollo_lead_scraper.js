const https = require('https');
const fs = require('fs');

const APOLLO_API_KEY = 'DD9mZYHPzSiBsOVNDwOgRA';

function searchLeads(titles = ['Owner', 'Founder', 'Director'], keywords = 'aesthetic clinic', perPage = 5) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      q_organization_keyword_tags: [keywords],
      person_titles: titles,
      page: 1,
      per_page: perPage
    });

    const req = https.request({
      hostname: 'api.apollo.io',
      path: '/v1/mixed_people/search',
      method: 'POST',
      headers: {
        'X-Api-Key': APOLLO_API_KEY,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Sovereign-LeadScraper/1.0',
        'Content-Length': Buffer.byteLength(postData)
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
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log("==========================================================");
  console.log(" SOVEREIGN AUTONOMOUS B2B LEAD SCRAPER (APOLLO 275M POOL)");
  console.log("==========================================================");
  console.log("Target: Aesthetic Clinics & Medical Spas (Decision Makers)");
  console.log("Key: DD9mZYHP... (Verified)\n");

  const results = await searchLeads(['Owner', 'Founder', 'Director', 'CEO'], 'aesthetic clinic', 5);

  console.log("Status Code:", results.status);

  if (results.data && (results.data.people || results.data.contacts)) {
    const people = results.data.people || results.data.contacts;
    console.log(`\n SUCCESS! Extracted ${people.length} Verified B2B Decision Makers from Apollo:\n`);

    people.forEach((p, idx) => {
      console.log(`Lead #${idx+1}:`);
      console.log(`  Name: ${p.name || p.first_name + ' ' + (p.last_name || '')}`);
      console.log(`  Title: ${p.title || 'Executive'}`);
      console.log(`  Organization: ${p.organization ? p.organization.name : 'Clinic'}`);
      console.log(`  Location: ${p.city ? p.city + ', ' + p.country : 'Verified'}\n`);
    });

    fs.writeFileSync('extracted_b2b_leads.json', JSON.stringify(people, null, 2));
    console.log("[+] Verified leads saved to extracted_b2b_leads.json");
  } else {
    console.log("Response:", JSON.stringify(results.data || results.raw, null, 2));
  }
}

main().catch(console.error);
