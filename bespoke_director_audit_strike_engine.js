const fs = require("fs");
const path = require("path");

const WORKDIR = "/Users/mediacreation/Desktop/online enterprise";
const REPORTS_DIR = path.join(WORKDIR, "executive_audit_reports");
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

const TARGET_BUSINESSES = [
  {
    companyName: "Kensington Loft & Construction Ltd",
    director: "David Vance",
    location: "Kensington, London",
    regNumber: "10984210",
    sector: "builders",
    jurisdiction: "UK",
    currency: "£",
    projects: "3 active luxury loft conversions in W8 & SW7",
    hoursWasted: "14 hours/week typing quotes post-site",
    recoverable: "+£2,850 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html?biz=Kensington+Loft"
  },
  {
    companyName: "Harley Street Dental & Implant Practice Ltd",
    director: "Dr. Julian Sterling",
    location: "Harley Street, London",
    regNumber: "08745120",
    sector: "dental",
    jurisdiction: "UK",
    currency: "£",
    projects: "Private cosmetic Invisalign & full-arch implants",
    hoursWasted: "35% of high-intent patient inquiries missed after 5 PM",
    recoverable: "+£3,600 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html?biz=Harley+Street+Dental"
  },
  {
    companyName: "Mayfair Prime Hospitality & Dining Ltd",
    director: "Marcus Thorne",
    location: "Mayfair, London",
    regNumber: "09653120",
    sector: "restaurants",
    jurisdiction: "UK",
    currency: "£",
    projects: "Private mezzanine buyout dining & seasonal private events",
    hoursWasted: "48-hour lag responding to corporate buyout inquiries",
    recoverable: "+£3,200 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/culinary_command_os.html?biz=Mayfair+Prime"
  },
  {
    companyName: "West End Auto Performance & MOT Ltd",
    director: "Alan Richardson",
    location: "Birmingham, UK",
    regNumber: "12458930",
    sector: "garages",
    jurisdiction: "UK",
    currency: "£",
    projects: "6-bay workshop servicing fleet & German performance",
    hoursWasted: "Mechanics under ramps unable to answer estimate authorization calls",
    recoverable: "+£2,100 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/autocommand_os.html?biz=West+End+Auto"
  },
  {
    companyName: "Belgravia Prime Real Estate Ltd",
    director: "Victoria Montagu",
    location: "Belgravia, London",
    regNumber: "11234890",
    sector: "estate",
    jurisdiction: "UK",
    currency: "£",
    projects: "Off-market residential sales (£3M - £12M)",
    hoursWasted: "16 hours/week conducting unvetted viewings without POF",
    recoverable: "+£4,500 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/estate_command_os.html?biz=Belgravia+Prime"
  },
  {
    companyName: "Vanguard Commercial Contracting LLC",
    director: "Robert Hayes",
    location: "Austin, TX, US",
    regNumber: "EIN-84-921048",
    sector: "builders",
    jurisdiction: "US",
    currency: "$",
    projects: "Commercial tenant buildouts & structural renovations",
    hoursWasted: "15 hours/week manual bid calculations & subcontractor 1099 tracking",
    recoverable: "+$3,800 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html?biz=Vanguard+Contracting"
  },
  {
    companyName: "Manhattan Aesthetic & Implant Dentistry PC",
    director: "Dr. Elena Rostova",
    location: "Midtown Manhattan, NY, US",
    regNumber: "EIN-13-894210",
    sector: "dental",
    jurisdiction: "US",
    currency: "$",
    projects: "Cosmetic veneers & full-mouth rehabilitation",
    hoursWasted: "Unconfirmed consultation deposits and weekend voicemail drop-offs",
    recoverable: "+$4,800 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html?biz=Manhattan+Aesthetic"
  },
  {
    companyName: "Pacific Precision Auto Specialists LLC",
    director: "James Walker",
    location: "Los Angeles, CA, US",
    regNumber: "EIN-95-481902",
    sector: "garages",
    jurisdiction: "US",
    currency: "$",
    projects: "European auto service & factory scheduled maintenance",
    hoursWasted: "25% lapsed annual service cycle without automated SMS outreach",
    recoverable: "+$2,900 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/autocommand_os.html?biz=Pacific+Precision"
  },
  {
    companyName: "Tribeca Prime Hospitality Group Inc",
    director: "Anthony Deluca",
    location: "Tribeca, NY, US",
    regNumber: "EIN-27-391820",
    sector: "restaurants",
    jurisdiction: "US",
    currency: "$",
    projects: "Private wine cellar events & exclusive corporate buyouts",
    hoursWasted: "Unrecovered short-notice weekend dinner cancellations",
    recoverable: "+$4,200 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/culinary_command_os.html?biz=Tribeca+Prime"
  },
  {
    companyName: "Beverly Hills Premier Realty Corp",
    director: "Charles Sterling",
    location: "Beverly Hills, CA, US",
    regNumber: "EIN-95-718290",
    sector: "estate",
    jurisdiction: "US",
    currency: "$",
    projects: "Luxury estates in Trousdale & Bel Air ($5M+)",
    hoursWasted: "Manual NDA verification and delayed buyer portfolio delivery",
    recoverable: "+$6,500 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/estate_command_os.html?biz=Beverly+Hills+Realty"
  },
  {
    companyName: "Kronen Bau & Projektentwicklung GmbH",
    director: "Stefan Krause",
    location: "Frankfurt am Main, Germany",
    regNumber: "HRB-914280",
    sector: "builders",
    jurisdiction: "EU",
    currency: "€",
    projects: "Gewerblicher Hochbau & schlüsselfertige Sanierung",
    hoursWasted: "Bauabzugsteuer 15% manual calculation and weekend proposal typing",
    recoverable: "+€3,400 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html?biz=Kronen+Bau"
  },
  {
    companyName: "Harbour City Commercial Builders Pty Ltd",
    director: "Brett Morrison",
    location: "Sydney, NSW, Australia",
    regNumber: "ABN-48-129-481-901",
    sector: "builders",
    jurisdiction: "AU",
    currency: "A$",
    projects: "Commercial fitouts & residential extensions in Eastern Suburbs",
    hoursWasted: "TPARS annual reporting overhead and slow quote response times",
    recoverable: "+A$4,200 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html?biz=Harbour+City+Builders"
  },
  {
    companyName: "Maple Ridge Contracting Corp",
    director: "Graham Fraser",
    location: "Vancouver, BC, Canada",
    regNumber: "BC-1094821",
    sector: "builders",
    jurisdiction: "CA",
    currency: "C$",
    projects: "Residential timber frame & custom home additions",
    hoursWasted: "12 hours/week evening estimating and CRA T5018 reconciliation",
    recoverable: "+C$3,600 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html?biz=Maple+Ridge"
  },
  {
    companyName: "Collins Street Dental & Cosmetic Clinic Pty Ltd",
    director: "Dr. Sarah Thornton",
    location: "Melbourne, VIC, Australia",
    regNumber: "ABN-72-891-042-381",
    sector: "dental",
    jurisdiction: "AU",
    currency: "A$",
    projects: "Cosmetic veneers & emergency dental care",
    hoursWasted: "Unattended after-hours phone calls and unbooked hygiene recalls",
    recoverable: "+A$4,800 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html?biz=Collins+Street+Dental"
  },
  {
    companyName: "Emirates Sovereign Contracting FZ-LLC",
    director: "Tariq Al-Mansoor",
    location: "Business Bay, Dubai, UAE",
    regNumber: "DED-784190",
    sector: "builders",
    jurisdiction: "GCC",
    currency: "AED",
    projects: "High-end villa renovations & luxury retail fitouts",
    hoursWasted: "Manual subcontractor wage verification and quotation turnaround lag",
    recoverable: "+AED 14,500 / mo",
    portalLink: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html?biz=Emirates+Sovereign"
  }
];

const generatedManifest = [];

TARGET_BUSINESSES.forEach((b, idx) => {
  const cleanId = b.companyName.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const reportFileName = `audit_${cleanId}.html`;
  const reportPath = path.join(REPORTS_DIR, reportFileName);

  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Executive Operational Diagnostic // ${b.companyName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #F8FAFC; color: #0F172A; padding: 40px 20px; line-height: 1.6; }
    .doc-card { max-width: 780px; margin: 0 auto; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
    .header-bar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0F172A; padding-bottom: 20px; margin-bottom: 28px; }
    .title { font-size: 24px; font-weight: 800; color: #0F172A; margin: 0; }
    .meta { font-size: 13px; color: #64748B; margin-top: 6px; }
    .badge { background: #EEF2F6; color: #1E3A8A; font-weight: 700; font-size: 11px; padding: 6px 12px; border-radius: 4px; text-transform: uppercase; }
    .section-head { font-size: 13px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 10px; }
    .bottleneck-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.8; color: #334155; }
    .highlight-card { background: #F1F5F9; border-radius: 8px; padding: 18px; display: flex; justify-content: space-between; align-items: center; margin: 24px 0; }
    .cta-btn { display: block; text-align: center; background: #1E3A8A; color: #FFFFFF; padding: 16px; border-radius: 8px; font-weight: 800; font-size: 15px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="doc-card">
    <div class="header-bar">
      <div>
        <h1 class="title">${b.companyName}</h1>
        <div class="meta">Corporate Ref: <strong>${b.regNumber}</strong> | Location: ${b.location} | Attention: <strong>${b.director}</strong></div>
      </div>
      <span class="badge">CONFIDENTIAL AUDIT</span>
    </div>

    <div class="section-head">Current Operational Context</div>
    <div class="bottleneck-box">
      • Active Operational Focus: ${b.projects}<br>
      • Primary Identified Bottleneck: <strong>${b.hoursWasted}</strong><br>
      • Proposal &amp; Intake Turnaround: Currently estimated at 48 to 72 hours vs. industry optimal 60 seconds.
    </div>

    <div class="section-head">Recoverable Value Projection</div>
    <div class="highlight-card">
      <div>
        <strong style="font-size:15px; color:#0F172A; display:block;">Estimated Monthly Operational Capital Recoverable:</strong>
        <span style="font-size:12px; color:#64748B;">Based on recovering ${b.hoursWasted} and securing 1 additional captured project per cycle.</span>
      </div>
      <span style="font-size:24px; font-weight:800; color:#1E3A8A;">${b.recoverable}</span>
    </div>

    <div class="section-head">Bespoke Sovereign OS Deployment</div>
    <p style="font-size: 14px; color: #475569; margin-bottom: 20px;">
      We have provisioned a dedicated, customized operational suite pre-configured with ${b.companyName}'s compliance standards and automated intake workflows.
    </p>

    <a href="${b.portalLink}" target="_blank" class="cta-btn">Access Pre-Configured Suite for ${b.companyName} &rarr;</a>
  </div>
</body>
</html>`;

  fs.writeFileSync(reportPath, reportHtml);

  const firstName = b.director.split(" ")[0];
  const inMailCopy = `Hi ${firstName}, noticed your ${b.projects} in ${b.location.split(",")[0]}. We ran your operational intake and saw you are likely dealing with ${b.hoursWasted}. We staged a dedicated, automated workflow portal specifically for ${b.companyName} here: ${b.portalLink} . Happy to let your team test it on your next 3 tenders with zero setup fee.`;

  generatedManifest.push({
    index: idx + 1,
    companyName: b.companyName,
    director: b.director,
    location: b.location,
    regNumber: b.regNumber,
    sector: b.sector,
    recoverable: b.recoverable,
    portalLink: b.portalLink,
    reportPath: reportPath,
    reportUrl: `https://sovereign-empire-os-ub2.vercel.app/executive_audit_reports/${reportFileName}`,
    personalizedInMailCopy: inMailCopy
  });
});

fs.writeFileSync(path.join(WORKDIR, "master_director_strike_manifest.json"), JSON.stringify(generatedManifest, null, 2));

console.log("==================================================================");
console.log(" VECTOR 1: BESPOKE DIRECTOR AUDIT STRIKE ENGINE COMPLETE");
console.log(` Generated ${generatedManifest.length} bespoke 1-page reports and tailored 1-to-1 pitches.`);
console.log("==================================================================");
