/**
 * ==============================================================================
 * SOVEREIGN // HYPER-TAILORED INDUSTRY PROPOSAL & PORTAL DISPATCHER
 * ==============================================================================
 * Automatically generates bespoke, pristine commercial documents and links
 * for any business based on their exact industry:
 * 
 * 1. Builders & Construction -> SiteCommand OS + 60s Quote Demo
 * 2. Fine Dining & Restaurants -> CulinaryCommand OS + Private Dining Engine
 * 3. Dental & Medical Clinics -> ClinicSovereign OS + 24/7 Triage & Cosmetic Plan Closer
 * 4. Luxury Real Estate -> EstateCommand OS + HNW Buyer Pre-Qualification
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const INDUSTRY_MATRIX = {
  construction: {
    name: "SiteCommand OS",
    portalUrl: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html",
    corePain: "delayed quote turnarounds and untracked subcontractor hours",
    solutionSummary: "formats rough notes into luxury PDF proposals in 60s, manages WhatsApp subcontractor attendance with Friday CIS payroll, and revives dormant quotes",
    targetBuyer: "General Contractors, Luxury Residential Builders, Roofers"
  },
  hospitality: {
    name: "CulinaryCommand OS",
    portalUrl: "https://sovereign-empire-os-ub2.vercel.app/culinary_command_os.html",
    corePain: "unconverted private dining buyout inquiries and weekend table cancellations",
    solutionSummary: "automates private event packages with 50% deposits in 45s, backfills cancelled prime tables from VIP waitlists, and audits supplier invoices for price spikes",
    targetBuyer: "Fine Dining Restaurants, Hospitality Groups, Executive Chefs"
  },
  medical: {
    name: "ClinicSovereign OS",
    portalUrl: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html",
    corePain: "missed after-hours patient inquiries and unclosed high-ticket cosmetic treatment plans",
    solutionSummary: "provides 24/7 voice/SMS clinical triage, closes high-value implant/cosmetic treatment plans, and automates 6-month hygiene recalls to fill chair capacity",
    targetBuyer: "Private Dental Practices, Aesthetic Clinics, Specialized Surgeons"
  },
  realestate: {
    name: "EstateCommand OS",
    portalUrl: "https://sovereign-empire-os-ub2.vercel.app/estate_command_os.html",
    corePain: "hours wasted on unqualified inquiries and manual private showing coordination",
    solutionSummary: "pre-qualifies high-net-worth buyers in 90s, coordinates private viewings with automated NDAs, and matches off-market listings with active capital buyers",
    targetBuyer: "Luxury Real Estate Brokerages, Development Firms, Prime Agents"
  }
};

function generateBespokePitch(companyName, contactName, industryKey) {
  const config = INDUSTRY_MATRIX[industryKey] || INDUSTRY_MATRIX.construction;
  
  return {
    subject: `Streamlining operations and revenue capture for ${companyName}`,
    body: `Hi ${contactName},

I know you are focused on daily operations, so I will be direct.

Most businesses in your sector experience revenue leakage from ${config.corePain}.

We engineered ${config.name} specifically for ${config.targetBuyer}. The platform ${config.solutionSummary}.

As part of our setup, we also provide your company with:
1. A Complete Custom Brand Graphic Design Kit (Business cards, vehicle livery wraps, signage, staff apparel).
2. The Local Postcode Dominance & Organic Lead Gen Playbook (Google Map Pack #1 rankings & high-velocity 5-star review collection).

We are currently onboarding a select cohort of companies with a complimentary trial setup.

You can inspect the platform overview and live interactive workflow demonstrations here:
${config.portalUrl}

Let me know if you would like us to configure a direct demonstration for ${companyName}.`
  };
}

// Test Run
function runDispatcherTest() {
  console.log("================================================================================");
  console.log("SOVEREIGN // HYPER-TAILORED MULTI-INDUSTRY PROPOSAL ENGINE");
  console.log("================================================================================");

  const testCases = [
    { company: "Prestige Construction Ltd", name: "Steve", ind: "construction" },
    { company: "L'Etoile Dining Group", name: "Chef Marcus", ind: "hospitality" },
    { company: "Harley Street Aesthetic Dental", name: "Dr. Jenkins", ind: "medical" },
    { company: "Mayfair Prime Properties", name: "Alistair", ind: "realestate" }
  ];

  testCases.forEach(tc => {
    const pitch = generateBespokePitch(tc.company, tc.name, tc.ind);
    console.log(`\n[INDUSTRY: ${tc.ind.toUpperCase()} // ${tc.company}]`);
    console.log(`Subject: ${pitch.subject}`);
    console.log(`Body:\n${pitch.body}`);
    console.log("--------------------------------------------------------------------------------");
  });
}

if (require.main === module) {
  runDispatcherTest();
}

module.exports = { INDUSTRY_MATRIX, generateBespokePitch };
