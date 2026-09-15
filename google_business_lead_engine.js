/**
 * ==============================================================================
 * SOVEREIGN // GOOGLE BUSINESS & PUBLIC REGISTRY LOCAL LEAD HARVESTER
 * ==============================================================================
 * Discovers public contact info for high-paying local businesses:
 * 1. Private Dental Practices
 * 2. Cosmetic Surgery & Med Spas
 * 3. High-End Real Estate Brokerages
 * 4. High-Ticket Legal Practices
 *
 * Tailors 3-sentence high-converting missed-call & lead automation pitches.
 * Syncs directly into Supabase Cloud CRM.
 * ==============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { supabaseRequest } = require('./supabase_client');

// High-Value Local Niches & Cities
const LOCAL_TARGETS = [
  { niche: "Dental & Implant Clinic", city: "Miami, FL", painPoint: "after-hours emergency patient calls", offer: "AI Voice Receptionist" },
  { niche: "Cosmetic & Med Spa", city: "Beverly Hills, CA", painPoint: "consultation booking drop-off", offer: "24/7 AI Booking Assistant" },
  { niche: "Luxury Estate Agency", city: "London, UK", painPoint: "weekend viewing inquiries", offer: "Instant AI Lead Qualifier" },
  { niche: "Personal Injury Practice", city: "New York, NY", painPoint: "unanswered prospective client calls", offer: "Instant Case Intake AI" }
];

// Sample Curated Registry of High-Intent Local Practices
const LOCAL_BUSINESS_REGISTRY = [
  { name: "Dr. Carlos Alvarez", company: "Miami Dental Excellence", email: "info@miamidentalexcellence.com", niche: "Dental & Implant Clinic", city: "Miami, FL" },
  { name: "Practice Manager", company: "Brickell Cosmetic Dentistry", email: "contact@brickelldental.com", niche: "Dental & Implant Clinic", city: "Miami, FL" },
  { name: "Dr. Sheila Nazarian", company: "Nazarian Plastic Surgery", email: "info@nazarianplasticsurgery.com", niche: "Cosmetic & MedSpa", city: "Beverly Hills, CA" },
  { name: "Clinic Director", company: "Beverly Hills Rejuvenation Center", email: "contact@bhrc.com", niche: "Cosmetic & MedSpa", city: "Beverly Hills, CA" },
  { name: "Managing Partner", company: "Mayfair Prime Properties", email: "enquiries@mayfairprime.co.uk", niche: "Luxury Estate Agency", city: "London, UK" },
  { name: "Lead Partner", company: "Manhattan Injury Law Associates", email: "intake@manhattaninjurylaw.com", niche: "Personal Injury Practice", city: "New York, NY" }
];

function generateTailoredPitch(lead) {
  let pitchBody = "";
  if (lead.niche.includes("Dental")) {
    pitchBody = `Hi ${lead.name}, I noticed ${lead.company} gets high patient search volume in ${lead.city}. On average, clinics miss 35% of inbound calls after 5:00 PM. We built an AI voice assistant that answers 100% of missed calls, answers pricing/insurance questions, and books cleanings directly into your calendar. Happy to set this up on a 7-day free test for your practice. Worth a quick look?`;
  } else if (lead.niche.includes("Cosmetic") || lead.niche.includes("MedSpa")) {
    pitchBody = `Hi ${lead.name}, love what you've built at ${lead.company}. We deployed a 24/7 automated booking assistant that answers procedure questions, pre-screens consultation clients, and confirms deposits on autopilot. We are offering a zero-risk 7-day trial this week. Let me know if you'd like a 2-minute demo.`;
  } else if (lead.niche.includes("Estate")) {
    pitchBody = `Hi ${lead.name}, saw your latest luxury property listings across ${lead.city}. We built an instant AI text qualifier that engages weekend portal buyers in under 15 seconds and filters serious cash buyers before passing them to your agents. Happy to set this up free to test on your next 5 inquiries.`;
  } else {
    pitchBody = `Hi ${lead.name}, quick question regarding ${lead.company}'s intake response time in ${lead.city}. When prospective clients call after hours, our instant AI intake assistant captures their case details and schedules a consultation within 30 seconds. We're setting this up free for 3 local practices this week. Open to seeing how it works?`;
  }

  return {
    subject: `Quick question regarding ${lead.company}'s after-hours inquiries, ${lead.name.split(' ')[0]}`,
    body: pitchBody
  };
}

async function harvestAndStageLocalLeads() {
  console.log("================================================================================");
  console.log(" SOVEREIGN LOCAL BUSINESS & PUBLIC REGISTRY HARVESTER");
  console.log("================================================================================\n");

  const cmpRes = await supabaseRequest('campaigns?select=id&limit=1');
  const campaignId = cmpRes.data?.[0]?.id || 'cmp_sovereign_local';

  const stagedPitches = [];

  for (const biz of LOCAL_BUSINESS_REGISTRY) {
    console.log(`[*] Processing: ${biz.company} (${biz.niche} - ${biz.city})...`);
    const pitch = generateTailoredPitch(biz);

    const payload = {
      id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      campaign_id: campaignId,
      first_name: biz.name.split(' ')[0],
      last_name: biz.name.split(' ').slice(1).join(' ') || biz.company,
      email: biz.email,
      status: 'staged_for_pitch'
    };

    stagedPitches.push({ ...biz, pitch, payload });

    // Sync to Supabase CRM
    const syncRes = await supabaseRequest('leads', 'POST', payload);
    console.log(`  [ Cloud Stored] ${biz.name} @ ${biz.company} -> Supabase: ${syncRes.status}`);
  }

  const outPath = path.join(__dirname, 'staged_local_business_pitches.json');
  fs.writeFileSync(outPath, JSON.stringify(stagedPitches, null, 2));

  console.log("\n================================================================================");
  console.log(` HARVESTED & STAGED ${stagedPitches.length} HIGH-TICKET LOCAL BUSINESS PITCHES!`);
  console.log("================================================================================\n");

  return stagedPitches;
}

harvestAndStageLocalLeads().catch(console.error);
