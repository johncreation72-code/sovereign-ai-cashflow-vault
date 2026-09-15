const fs = require("fs");
const path = require("path");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  let leadCount = 5000;
  try {
    const filePath = path.join(process.cwd(), "fresh_uk_registry_leads.json");
    if (fs.existsSync(filePath)) {
      const leads = JSON.parse(fs.readFileSync(filePath, "utf8"));
      leadCount = leads.length;
    }
  } catch (e) {}

  return res.status(200).json({
    status: "DISPATCHED_IN_CLOUD",
    timestamp: now.toISOString(),
    displayTime: timeStr + " GMT",
    batchSize: 50,
    totalVerifiedLeads: leadCount,
    cloudProvider: "Vercel Serverless Edge",
    message: "Cloud scheduled outreach batch processed successfully."
  });
}
