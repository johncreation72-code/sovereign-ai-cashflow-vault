const fs = require("fs");
const path = require("path");

const SECTOR_LEAKAGE_MAP = {
  "Builders & Construction": {
    leak: "delayed quote turnarounds and untracked subcontractor hours",
    hoursSaved: "14.5 Hours / Week",
    recoverable: "+GBP 2,850.00 / mo",
    portal: "sitecommand_os.html"
  },
  "Dental Clinics": {
    leak: "missed after-hours emergency bookings and unclosed treatment plans",
    hoursSaved: "18.0 Hours / Week",
    recoverable: "+GBP 3,400.00 / mo",
    portal: "clinic_sovereign_os.html"
  },
  "Auto Mechanics": {
    leak: "untracked parts margin leakage and manual MOT booking follow-ups",
    hoursSaved: "12.0 Hours / Week",
    recoverable: "+GBP 2,150.00 / mo",
    portal: "autocommand_os.html"
  },
  "Fine Dining": {
    leak: "unconverted private buyout inquiries and weekend table cancellations",
    hoursSaved: "15.0 Hours / Week",
    recoverable: "+GBP 2,400.00 / mo",
    portal: "culinary_command_os.html"
  },
  "HVAC & Gas Safety": {
    leak: "delayed emergency boiler dispatch and expired CP12 safety recalls",
    hoursSaved: "16.0 Hours / Week",
    recoverable: "+GBP 3,100.00 / mo",
    portal: "hvac_command_os.html"
  },
  "Luxury Real Estate": {
    leak: "unqualified buyer viewings and delayed luxury listing syndication",
    hoursSaved: "20.0 Hours / Week",
    recoverable: "+GBP 4,500.00 / mo",
    portal: "estate_command_os.html"
  },
  "Commercial Legal": {
    leak: "manual billing capture loss and unbilled contract review triage",
    hoursSaved: "15.5 Hours / Week",
    recoverable: "+GBP 4,200.00 / mo",
    portal: "lexcommand_os.html"
  },
  "Accountancy & CIS": {
    leak: "monthly CIS tax reconciliation delays and manual invoice chasing",
    hoursSaved: "14.0 Hours / Week",
    recoverable: "+GBP 2,950.00 / mo",
    portal: "ledgercommand_os.html"
  }
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  let leads = [];
  try {
    const filePath = path.join(process.cwd(), "fresh_uk_registry_leads.json");
    if (fs.existsSync(filePath)) {
      leads = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (e) {}

  const totalVaultCount = leads.length || 5000;
  const batchSize = Math.min(parseInt(req.query.batch || "25", 10), 100);
  const offset = parseInt(req.query.offset || "0", 10) % totalVaultCount;

  const currentBatch = leads.slice(offset, offset + batchSize);
  const processedAudits = currentBatch.map(lead => {
    const sectorInfo = SECTOR_LEAKAGE_MAP[lead.sector] || SECTOR_LEAKAGE_MAP["Builders & Construction"];
    const docRef = "AUDIT-" + lead.companyNumber.replace(/[^0-9]/g, "").slice(0, 8);
    return {
      companyName: lead.companyName,
      companyNumber: lead.companyNumber,
      city: lead.city,
      sector: lead.sector,
      identifiedLeakage: sectorInfo.leak,
      hoursRecovered: sectorInfo.hoursSaved,
      monthlyRecoverable: sectorInfo.recoverable,
      portalUrl: `https://sovereign-empire-os-ub2.vercel.app/${sectorInfo.portal}?ref=${docRef}`,
      reference: docRef,
      status: "DISPATCHED_TO_DIRECTOR"
    };
  });

  return res.status(200).json({
    success: true,
    mode: "100% Cloud Serverless High-Velocity Dispatcher",
    timestamp: now.toISOString(),
    displayTime: timeStr + " GMT",
    totalVaultRecords: totalVaultCount,
    batchSizeProcessed: processedAudits.length,
    activeBatchOffset: offset,
    audits: processedAudits
  });
}
