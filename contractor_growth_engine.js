/**
 * ==============================================================================
 * SOVEREIGN // CONTRACTOR & LOCAL TRADE GROWTH ACCELERATOR
 * ==============================================================================
 * Target: Local Builders, Roofers, Landscapers, Electricians & Home Renovation
 *
 * The Irresistible "Grand Slam" Offer ($0 Upfront Risk):
 * 1.  Instant AI Quote & Professional Proposal Generator (Save 10 hrs/week)
 * 2.  Automated Quote Follow-Up Bot (Recovers 30% of Ghosted Estimates)
 * 3.  Free Professional Company Social Branding & High-Status Ad Creatives
 * 4.  Old Lead Reactivation Blitz (Turning Dead Quotes into $10,000+ Jobs)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

// Curated Local Trade Targets
const TRADE_CATEGORIES = [
  {
    trade: "General Building & Home Extensions",
    painPoint: "spending 3 hours every night handwriting quotes and chasing unpaid estimates",
    solution: "1-Click AI Estimation Engine + Automated 48-Hour Deposit Follow-Up",
    sampleCompany: "Prestige Construction & Renovations",
    sampleContact: "Dave Miller",
    sampleEmail: "info@prestigeconstruct.co.uk"
  },
  {
    trade: "Roofing & Cladding Contractors",
    painPoint: "homeowners ghosting after receiving a roof repair quote",
    solution: "Automated Multi-Touch Quote Closer & Weather-Triggered Lead Sequences",
    sampleCompany: "Apex Roofing Specialists",
    sampleContact: "Mark Evans",
    sampleEmail: "quotes@apexroofingspecialists.com"
  },
  {
    trade: "Electrical & Smart Home Installation",
    painPoint: "unanswered daytime inquiry calls while up on ladders/job sites",
    solution: "Instant Missed-Call AI Text Responder + Free Professional Quote Template",
    sampleCompany: "VoltTech Electrical Solutions",
    sampleContact: "James Wilson",
    sampleEmail: "enquiries@volttech.com"
  },
  {
    trade: "Luxury Landscaping & Driveways",
    painPoint: "sitting on a list of 200+ old spring inquiries that never booked",
    solution: "Free Dead-Lead Reactivation Blitz to Book 3-5 New Driveway/Garden Jobs This Week",
    sampleCompany: "Evergreen Landscape Architecture",
    sampleContact: "Paul Harrison",
    sampleEmail: "contact@evergreenlandscapes.co.uk"
  }
];

// The Irresistible 3-Sentence Trade Outreach Pitch
function generateTradePitch(target) {
  return {
    subject: `Quick question regarding ${target.sampleCompany} quote follow-ups, ${target.sampleContact.split(' ')[0]}`,
    body: `Hi ${target.sampleContact.split(' ')[0]}, I know you're busy on site so I'll keep this short.

Most builders lose £10,000+ every month simply because homeowners take a quote and ghost, and you don't have time to chase them.

We built an automated system that:
1. Formats your rough job notes into a luxury professional PDF quote in 60 seconds.
2. Automatically follows up with your clients via SMS/email at 24h and 48h to lock in their start date and deposit.
3. Automatically emails your old quotes from the last 12 months to bring in 2-3 immediate jobs this week for FREE.

We will set this up for ${target.sampleCompany} 100% free of charge to prove it works on your next 3 quotes. 

Open to a 2-minute look?`
  };
}

// Complete Trade Package Generator
function generateTradeAssetPackage() {
  console.log("================================================================================");
  console.log(" SOVEREIGN CONTRACTOR & TRADE EXPANSION ENGINE");
  console.log("================================================================================");
  console.log("Deploying The 'No-Brainer' Builder & Tradesmen Acquisition Suite...\n");

  const results = [];

  TRADE_CATEGORIES.forEach(t => {
    const pitch = generateTradePitch(t);
    console.log(`[+] Staged Offer for: ${t.trade}`);
    console.log(`    Company: ${t.sampleCompany} (${t.sampleContact})`);
    console.log(`    Subject: "${pitch.subject}"`);
    console.log(`    Offer: Free Quote Closer + Old Lead Reactivation\n`);

    results.push({
      trade: t.trade,
      company: t.sampleCompany,
      contact: t.sampleContact,
      email: t.sampleEmail,
      pitch
    });
  });

  const outPath = path.join(__dirname, 'staged_contractor_pitches.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log("================================================================================");
  console.log(" CONTRACTOR REVENUE ENGINE STAGED & READY!");
  console.log("================================================================================\n");

  return results;
}

generateTradeAssetPackage();
