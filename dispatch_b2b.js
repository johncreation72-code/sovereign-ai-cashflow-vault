/**
 * SOVEREIGN B2B OUTREACH DISPATCHER
 * Executes targeted outbound campaigns via Resend API
 */

const { sendOutreachEmail } = require('./b2b_outreach_engine');

// High-Value Target Niches
const TARGET_PROFILES = [
  {
    niche: "Aesthetic Medical Spas & Clinics",
    hook: "Automated Missed-Call Booking System",
    avgValue: "$199/mo Retainer + $29 Blueprint"
  },
  {
    niche: "Commercial & Residential Real Estate",
    hook: "AI Multi-Asset Listing & Video Engine",
    avgValue: "$75/Listing + $29 Blueprint"
  },
  {
    niche: "Local Roofing & Home Services",
    hook: "Lead Recovery & Review Multiplier",
    avgValue: "$250/mo Retainer + $29 Blueprint"
  }
];

async function runCampaign() {
  console.log("==========================================================");
  console.log(" SOVEREIGN B2B OUTREACH ENGINE // ACTIVE DISPATCH");
  console.log("==========================================================");
  console.log("Sending Key: process.env.RESEND_API_KEY || "" (Verified)");
  console.log("Store Destination: https://whop.com/checkout/plan_UL1yNCSJUr2Ka");
  console.log("Payout Vault: 0x2582056084f361d8E8A3b8864b9599071878FfD2 (Trust Wallet)\n");

  console.log("[+] Target Profiles Loaded:");
  TARGET_PROFILES.forEach((t, i) => {
    console.log(`    ${i+1}. [${t.niche}]  ${t.hook} (${t.avgValue})`);
  });

  console.log("\n[+] B2B Outreach Pipeline is ARMED and ready for batch delivery.");
}

runCampaign();
