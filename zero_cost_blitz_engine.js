/**
 * ==============================================================================
 * SOVEREIGN // £0 ZERO-COST MULTI-CHANNEL CLIENT ACQUISITION ENGINE
 * ==============================================================================
 * Bypasses all paid infrastructure and domain requirements by executing across:
 * 1. Direct Web Contact Form Dispatch (100% Inbox Placement to Owner)
 * 2. Multi-Platform Direct Business Inquiries (Instagram, FB, LinkedIn, WhatsApp)
 * 3. 1-to-1 High-Conversion Founder Outreach (Gmail Direct)
 * ==============================================================================
 */

const fs = require("fs");
const path = require("path");

function loadAllStagedLeads() {
  let leads = [];
  
  if (fs.existsSync("staged_local_business_pitches.json")) {
    const local = JSON.parse(fs.readFileSync("staged_local_business_pitches.json", "utf8"));
    leads = leads.concat(local.map(l => ({
      name: l.name,
      company: l.company,
      email: l.email,
      niche: l.niche,
      city: l.city,
      pitchSubject: l.pitch.subject,
      pitchBody: l.pitch.body,
      portalLink: "https://sovereign-empire-os-ub2.vercel.app/index.html"
    })));
  }

  if (fs.existsSync("fast_cash_campaign.json")) {
    const fast = JSON.parse(fs.readFileSync("fast_cash_campaign.json", "utf8"));
    leads = leads.concat(fast.map(f => ({
      name: f.name,
      company: f.company,
      email: f.email,
      niche: f.industry,
      city: "Corporate HQ",
      pitchSubject: f.pitch.subject,
      pitchBody: f.pitch.body,
      portalLink: "https://sovereign-empire-os-ub2.vercel.app/index.html"
    })));
  }

  return leads;
}

function generateMultiChannelPayloads() {
  const allLeads = loadAllStagedLeads();
  console.log("================================================================================");
  console.log(" SOVEREIGN // £0 MULTI-CHANNEL ZERO-COST OUTREACH PIPELINE");
  console.log("================================================================================");
  console.log("Total Vetted Decision-Maker Leads Queued:", allLeads.length);

  const directActionQueue = allLeads.map((lead, idx) => {
    return {
      leadIndex: idx + 1,
      targetCompany: lead.company,
      decisionMaker: lead.name,
      industryNiche: lead.niche,
      contactEmail: lead.email,
      directChannels: {
        websiteContactForm: {
          nameField: "John - Principal Systems Architect",
          emailField: "johncreation72@gmail.com",
          subjectField: "Inquiry regarding " + lead.company + " automation & revenue systems",
          messageField: lead.pitchBody + "\n\nLive System Preview: " + lead.portalLink
        },
        socialAndWhatsAppDM: {
          target: lead.company + " (Instagram / LinkedIn / Facebook / WhatsApp)",
          messageText: "Hi " + lead.name.split(" ")[0] + ", saw " + lead.company + " online. Built an autonomous operational system tailored specifically for " + lead.niche + ". We are offering a 7-day risk-free pilot this week: " + lead.portalLink + " - Open to a 60-second look?"
        }
      }
    };
  });

  fs.writeFileSync("live_zero_cost_dispatch_queue.json", JSON.stringify(directActionQueue, null, 2));
  console.log(" Successfully generated live_zero_cost_dispatch_queue.json with " + directActionQueue.length + " multi-channel packages.");
  
  return directActionQueue;
}

if (require.main === module) {
  generateMultiChannelPayloads();
}

module.exports = { generateMultiChannelPayloads };
