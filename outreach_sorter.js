/**
 * SOVEREIGN // Autonomous B2B Lead Sorter & Outreach Intelligence Engine
 * Extracts, filters, scores, and personalizes cold outreach for high-ticket decision-makers.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HUNTER_API_KEY = '3eadd69ea8eae5bc1e84faf52de5624bc1e1560a';

// Target high-ticket industry domains
const TARGET_DOMAINS = [
  { domain: 'realtor.com', industry: 'Real Estate & Brokerage', painPoint: 'manual lead qualification and high bounce rates on property inquiries' },
  { domain: 'compass.com', industry: 'Luxury Real Estate', painPoint: 'delayed response times to affluent buyers seeking immediate private showings' },
  { domain: 'modernaesthetics.com', industry: 'Aesthetic Clinics & MedSpas', painPoint: 'missed weekend booking calls resulting in thousands in lost injectable consultations' },
  { domain: 'hubspot.com', industry: 'B2B SaaS & Marketing', painPoint: 'optimizing automated pipeline velocity and outbound response conversion' }
];

function hunterRequest(endpoint, params = {}) {
  return new Promise((resolve) => {
    const queryParams = new URLSearchParams({ ...params, api_key: HUNTER_API_KEY });
    const req = https.request({
      hostname: 'api.hunter.io',
      path: `/v2/${endpoint}?${queryParams.toString()}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Sovereign-LeadIntelligence/2.0',
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

// Scorer and Classifier: Tier 1 (C-Suite / Founder), Tier 2 (VP / Director), Tier 3 (Manager)
function scoreLead(lead) {
  const pos = (lead.position || '').toLowerCase();
  let tier = 3;
  let priorityScore = 60;

  if (pos.includes('ceo') || pos.includes('chief executive') || pos.includes('founder') || pos.includes('owner') || pos.includes('cmo') || pos.includes('president') || pos.includes('partner')) {
    tier = 1;
    priorityScore = 95 + (lead.confidence > 90 ? 4 : 0);
  } else if (pos.includes('vp') || pos.includes('vice president') || pos.includes('director') || pos.includes('head')) {
    tier = 2;
    priorityScore = 80 + (lead.confidence > 90 ? 5 : 0);
  } else {
    tier = 3;
    priorityScore = 65;
  }

  priorityScore = Math.min(100, Math.round(priorityScore * (lead.confidence / 100)));

  return {
    ...lead,
    tier,
    priorityScore,
    tierLabel: tier === 1 ? 'Tier 1: C-Suite / Owner' : tier === 2 ? 'Tier 2: VP / Director' : 'Tier 3: Management'
  };
}

// Generates Hyper-Personalized, High-Converting B2B Cold Outreach Copy
function generatePersonalizedPitch(lead, domainInfo) {
  const firstName = lead.first_name || 'there';
  const role = lead.position || 'Leader';
  const industry = domainInfo.industry;
  const painPoint = domainInfo.painPoint;

  const subjectLines = [
    `Quick question regarding ${domainInfo.domain} automation efficiency, ${firstName}`,
    `Eliminating ${painPoint.split(' ')[0]} at ${domainInfo.domain} (24/7 AI workflow)`,
    `${firstName} - 3 automated workflows to recapture lost ${industry} revenue`
  ];

  const emailBody = `Hi ${firstName},

I noticed your leadership as ${role} at ${domainInfo.domain}.

Most high-performing teams in ${industry} are currently leaking 20-30% of warm inbound inquiries due to ${painPoint}.

We engineered a lightweight, zero-overhead Sovereign AI Infrastructure that:
1. Instantly engages, qualifies, and books inbound leads in under 15 seconds (24/7/365).
2. Syncs qualified appointments directly to your CRM without human intervention.
3. Automatically reactivates dormant lead databases using tailored AI follow-up sequences.

We built a complete 2-minute live demo showing exactly how this plugs into ${domainInfo.domain}'s current tech stack.

Would you be open to a 3-minute video breakdown, or should I send over the technical blueprint directly?

Best regards,

John S.
Lead Architect // Sovereign AI Systems
https://sovereign-empire-os-ub2.vercel.app
Direct Bot: https://t.me/sovereign_ai_hub_bot`;

  return {
    subject: subjectLines[0],
    alternativeSubjects: subjectLines,
    body: emailBody
  };
}

async function runOutreachSorter() {
  console.log("================================================================================");
  console.log(" SOVEREIGN B2B LEAD INTELLIGENCE & OUTREACH SORTER");
  console.log("================================================================================");
  console.log("Scanning target domains, filtering decision-makers, and scoring prospects...\n");

  const allLeads = [];
  const categorizedPipeline = {
    tier1_decision_makers: [],
    tier2_directors: [],
    tier3_managers: []
  };

  for (const target of TARGET_DOMAINS) {
    console.log(`[*] Searching Hunter.io for verified contacts at: ${target.domain} (${target.industry})...`);
    const res = await hunterRequest('domain-search', { domain: target.domain, limit: 5 });

    if (res.status === 200 && res.data && res.data.data && res.data.data.emails) {
      const rawEmails = res.data.data.emails;
      console.log(`  [+] Found ${rawEmails.length} raw email records. Scoring & filtering...`);

      for (const raw of rawEmails) {
        if (raw.confidence < 70) continue;

        const scored = scoreLead(raw);
        const pitch = generatePersonalizedPitch(scored, target);

        const leadProfile = {
          id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          name: `${scored.first_name || ''} ${scored.last_name || ''}`.trim() || 'Verified Executive',
          email: scored.value,
          position: scored.position || 'Key Executive',
          company: target.domain,
          industry: target.industry,
          confidence: scored.confidence,
          tier: scored.tier,
          tierLabel: scored.tierLabel,
          priorityScore: scored.priorityScore,
          personalizedPitch: pitch,
          status: 'Ready for Dispatch',
          discoveredAt: new Date().toISOString()
        };

        allLeads.push(leadProfile);

        if (scored.tier === 1) categorizedPipeline.tier1_decision_makers.push(leadProfile);
        else if (scored.tier === 2) categorizedPipeline.tier2_directors.push(leadProfile);
        else categorizedPipeline.tier3_managers.push(leadProfile);
      }
    } else {
      console.log(`  [-] Domain query returned status ${res.status}`);
    }
  }

  allLeads.sort((a, b) => b.priorityScore - a.priorityScore);

  const outputPath = path.join(__dirname, 'sorted_b2b_leads.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    totalLeads: allLeads.length,
    tier1Count: categorizedPipeline.tier1_decision_makers.length,
    tier2Count: categorizedPipeline.tier2_directors.length,
    tier3Count: categorizedPipeline.tier3_managers.length,
    leads: allLeads
  }, null, 2));

  console.log("\n================================================================================");
  console.log(` B2B OUTREACH INTELLIGENCE SUMMARY:`);
  console.log(`  Total High-Confidence Leads Sorted: ${allLeads.length}`);
  console.log(`   Tier 1 (C-Suite / Owners / Founders): ${categorizedPipeline.tier1_decision_makers.length}`);
  console.log(`   Tier 2 (VPs / Directors / Heads): ${categorizedPipeline.tier2_directors.length}`);
  console.log(`   Tier 3 (Managers): ${categorizedPipeline.tier3_managers.length}`);
  console.log(`   Output saved to: sorted_b2b_leads.json`);
  console.log("================================================================================\n");

  console.log("Top Decision-Maker Targets Ready for 1-Click Outreach:\n");
  categorizedPipeline.tier1_decision_makers.slice(0, 3).forEach((lead, idx) => {
    console.log(`[Target #${idx + 1}] ${lead.name} (${lead.position}) @ ${lead.company}`);
    console.log(`  Email: ${lead.email} | Confidence: ${lead.confidence}% | Priority Score: ${lead.priorityScore}/100`);
    console.log(`  Subject: "${lead.personalizedPitch.subject}"\n`);
  });

  return allLeads;
}

if (require.main === module) {
  runOutreachSorter().catch(console.error);
}

module.exports = { runOutreachSorter, generatePersonalizedPitch, scoreLead };
