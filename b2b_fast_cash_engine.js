/**
 * ==============================================================================
 * SOVEREIGN // $1,000 FAST-CASH STRIKE ENGINE (B2B CLINIC & BROKERAGE CAMPAIGN)
 * ==============================================================================
 * Targets high-ticket local business owners who lose thousands to missed calls.
 * Offer: "24/7 AI Receptionist & Missed-Call Auto-Booker" ($497 setup or $199/mo).
 * Closing just 2 clients = $1,000 in Trust Wallet.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HUNTER_API_KEY = '3eadd69ea8eae5bc1e84faf52de5624bc1e1560a';
const RESEND_API_KEY = 'process.env.RESEND_API_KEY || ""';

// Target High-Ticket Local Domains (Clinics, MedSpas, Luxury Real Estate)
const HIGH_TICKET_DOMAINS = [
  { domain: 'realtor.com', industry: 'Real Estate & Brokerage', pain: 'missed buyer inquiries on property listings' },
  { domain: 'modernaesthetics.com', industry: 'Medical Aesthetic Clinic', pain: 'missed weekend consultation calls' },
  { domain: 'hubspot.com', industry: 'B2B Sales & Growth', pain: 'lead drop-off before calendar booking' }
];

function hunterRequest(endpoint, params = {}) {
  return new Promise((resolve) => {
    const queryParams = new URLSearchParams({ ...params, api_key: HUNTER_API_KEY });
    const req = https.request({
      hostname: 'api.hunter.io',
      path: `/v2/${endpoint}?${queryParams.toString()}`,
      method: 'GET',
      headers: { 'User-Agent': 'Sovereign-FastCash/1.0', 'Accept': 'application/json' }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch (e) { resolve({ status: res.statusCode, raw: body }); }
      });
    });
    req.on('error', err => resolve({ error: true, message: err.message }));
    req.end();
  });
}

function generateHighConvertingNoBrainerPitch(lead, target) {
  const firstName = lead.first_name || 'there';
  const role = lead.position || 'Owner / Director';

  const subject = `Quick question regarding ${target.domain} missed-call revenue, ${firstName}`;
  
  const body = `Hi ${firstName},

I noticed your leadership as ${role} at ${target.domain}.

Most high-performing businesses in ${target.industry} lose between $3,000 and $5,000 every month simply because warm leads call after hours or when staff are busy, and hang up.

We built a lightweight, 24/7 AI Auto-Responder that:
1. Instantly texts back any missed caller within 5 seconds with a custom booking link.
2. Qualifies the prospect via automated AI conversation.
3. Syncs booked appointments directly to your calendar with zero human staff required.

We are offering to set this up completely for free for the next 7 days for ${target.domain} so you can test it risk-free. If it doesn't recover at least 3 booked clients, you pay nothing.

Would you be open to a 2-minute live demo showing how it works?

Best regards,

John S.
Lead Systems Architect // Sovereign AI Hub
Direct Demo: https://sovereign-empire-os-ub2.vercel.app
Direct Telegram: https://t.me/sovereign_ai_hub_bot`;

  return { subject, body };
}

async function runFastCashCampaign() {
  console.log("================================================================================");
  console.log(" SOVEREIGN $1,000 FAST-CASH STRIKE ENGINE");
  console.log("================================================================================");
  console.log("Target: 2 Client Closes @ $497 = $1,000 in Trust Wallet (USDC)\n");

  const stagedPitches = [];

  for (const target of HIGH_TICKET_DOMAINS) {
    console.log(`[*] Mining verified decision-makers at: ${target.domain}...`);
    const res = await hunterRequest('domain-search', { domain: target.domain, limit: 3 });

    if (res.status === 200 && res.data && res.data.data && res.data.data.emails) {
      const emails = res.data.data.emails;
      console.log(`  [+] Found ${emails.length} verified contacts. Formatting pitches...`);

      for (const em of emails) {
        if (em.confidence < 70) continue;
        const pitch = generateHighConvertingNoBrainerPitch(em, target);
        stagedPitches.push({
          name: `${em.first_name || ''} ${em.last_name || ''}`.trim() || 'Verified Executive',
          email: em.value,
          position: em.position || 'Key Executive',
          company: target.domain,
          industry: target.industry,
          confidence: em.confidence,
          pitch
        });
      }
    }
  }

  const outPath = path.join(__dirname, 'fast_cash_campaign.json');
  fs.writeFileSync(outPath, JSON.stringify(stagedPitches, null, 2));

  console.log("\n================================================================================");
  console.log(` ${stagedPitches.length} HIGH-TICKET OUTBOUND PITCHES STAGED & READY FOR DISPATCH!`);
  console.log("================================================================================");
  stagedPitches.forEach((p, idx) => {
    console.log(`\n[Target #${idx + 1}] ${p.name} (${p.position}) @ ${p.company}`);
    console.log(`  Email: ${p.email} | Confidence: ${p.confidence}%`);
    console.log(`  Subject: "${p.pitch.subject}"`);
  });

  return stagedPitches;
}

if (require.main === module) {
  runFastCashCampaign().catch(console.error);
}

module.exports = { runFastCashCampaign };
