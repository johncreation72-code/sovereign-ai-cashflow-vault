const https = require("https");

const SUPABASE_URL = "https://aftwwynuchzwysijhhbb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmdHd3eW51Y2h6d3lzaWpoaGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDU2MTQsImV4cCI6MjA1NzYyMTYxNH0.MxgHHZQGii2SWPVlCxvJIA_0A_JHv-w";
const TELEGRAM_BOT_TOKEN = "8885647741:AAEn_O775X67U5gNn83d9Hh_x7P7w6d8u_8";
const TELEGRAM_CHAT_ID = "8885647741";
const STORE_LINK = "https://whop.com/checkout/plan_UL1yNCSJUr2Ka";

const KNOWLEDGE_BASE = {
  sectors: {
    "builders": { name: "Builders & Construction", os: "SiteCommand OS", url: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html", keyFeatures: "60-second CIS 20% tax deduction calculation shield, live subcontractor hours tracking, emergency quote generator, and 9-word dead quote reactivation." },
    "dental": { name: "Dental Clinics & Private Medical", os: "Clinic Sovereign OS", url: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html", keyFeatures: "24/7 after-hours patient triage, cosmetic treatment plan recovery tracking, and instant chairside value calculation." },
    "garages": { name: "Auto Mechanics & MOT Garages", os: "AutoCommand OS", url: "https://sovereign-empire-os-ub2.vercel.app/autocommand_os.html", keyFeatures: "30-day automated MOT recall chasers, parts margin leakage monitor, and workshop bay scheduler." },
    "hvac": { name: "HVAC & Gas Safety", os: "HVAC Command OS", url: "https://sovereign-empire-os-ub2.vercel.app/hvac_command_os.html", keyFeatures: "Annual CP12 gas safety auto-renewal tracker, emergency boiler breakdown triage, and field engineer dispatch." },
    "dining": { name: "Fine Dining & Hospitality", os: "Culinary Command OS", url: "https://sovereign-empire-os-ub2.vercel.app/culinary_command_os.html", keyFeatures: "45-second private dining buyout proposal generator and weekend cancellation refill engine." },
    "realestate": { name: "Luxury Real Estate", os: "Estate Command OS", url: "https://sovereign-empire-os-ub2.vercel.app/estate_command_os.html", keyFeatures: "High-net-worth buyer pre-qualification engine and VIP viewing appointment scheduler." },
    "legal": { name: "Commercial Legal", os: "LexCommand OS", url: "https://sovereign-empire-os-ub2.vercel.app/lexcommand_os.html", keyFeatures: "Commercial contract review triage and unbilled partner hour recovery ledger." },
    "accountancy": { name: "Accountancy & CIS", os: "LedgerCommand OS", url: "https://sovereign-empire-os-ub2.vercel.app/ledgercommand_os.html", keyFeatures: "Monthly CIS tax reconciliation automation and invoice recovery chaser." }
  },
  pricing: "Complimentary 7-day trial with zero upfront software license fees. After the trial, it is £97/month with no lock-in contracts and 1-click cancellation."
};

function generateExecutiveResponse(userMessage, context = {}) {
  const msg = (userMessage || "").toLowerCase().trim();
  const biz = context.biz || "your business";
  const sector = context.sector || "commercial";

  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("fee") || msg.includes("charge")) {
    return `We are currently onboarding UK enterprises on a complimentary 7-day trial with zero upfront software license fees. This allows your team to test the operational suite in your daily workflow. Following the trial, subscription access is £97/month with zero contracts, cancelable anytime. You can activate your trial at ${STORE_LINK}.`;
  }

  if (msg.includes("cis") || msg.includes("tax") || msg.includes("builder") || msg.includes("subcontractor") || msg.includes("construction")) {
    return `SiteCommand OS is engineered specifically for UK construction and trade contractors. It automates standard 20% CIS tax deduction calculations, logs subcontractor attendance to prevent overbilling, and formats luxury PDF quotes in 60 seconds. You can explore the live builder portal at ${KNOWLEDGE_BASE.sectors.builders.url}.`;
  }

  if (msg.includes("dental") || msg.includes("clinic") || msg.includes("patient") || msg.includes("teeth") || msg.includes("implant")) {
    return `Clinic Sovereign OS is built for dental and private medical clinics. It captures after-hours cosmetic inquiries and emergency triage patients when your front desk is closed, adding an estimated £3,400/month in recovered treatment plans. Explore the clinical suite at ${KNOWLEDGE_BASE.sectors.dental.url}.`;
  }

  if (msg.includes("mot") || msg.includes("garage") || msg.includes("mechanic") || msg.includes("car") || msg.includes("vehicle")) {
    return `AutoCommand OS automates 30-day MOT recalls and service chasers for independent garages, recovering lost customer retention and tracking parts margin leakage. You can test the garage portal at ${KNOWLEDGE_BASE.sectors.garages.url}.`;
  }

  if (msg.includes("hvac") || msg.includes("boiler") || msg.includes("gas") || msg.includes("cp12") || msg.includes("plumb")) {
    return `HVAC Command OS automates annual landlord CP12 gas safety renewals and handles rapid emergency boiler dispatch. You can access the HVAC operations suite at ${KNOWLEDGE_BASE.sectors.hvac.url}.`;
  }

  if (msg.includes("restaurant") || msg.includes("dining") || msg.includes("food") || msg.includes("buyout")) {
    return `Culinary Command OS generates bespoke private dining and corporate buyout proposals in 45 seconds, capturing high-margin weekend revenue. View the portal at ${KNOWLEDGE_BASE.sectors.dining.url}.`;
  }

  if (msg.includes("how it works") || msg.includes("what is this") || msg.includes("who are you") || msg.includes("explain")) {
    return `Sovereign Systems is an enterprise operating infrastructure firm serving over 5,000 UK companies. We deploy bespoke portals for established trades and professional services that eliminate administrative bottlenecks, capture after-hours inquiries, and boost lost revenue streams by an average of 35% this year. All systems include a 7-day zero-risk trial.`;
  }

  if (msg.includes("trial") || msg.includes("start") || msg.includes("sign up") || msg.includes("access") || msg.includes("join")) {
    return `You can activate your company's 7-day complimentary trial immediately at ${STORE_LINK}. Your dedicated workspace will be provisioned automatically within seconds.`;
  }

  // Default articulate advisory response
  return `Thank you for your message regarding ${biz}. Sovereign OS provides automated operating portals for UK commercial enterprises that streamline job intake, calculate quotes in 60s, and eliminate revenue leakage. We offer a complimentary 7-day trial with full access to your trade suite. How may our operations team assist ${biz} today?`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
      const userMessage = body.message || "";
      const clientName = body.clientName || "Enterprise Director";
      const clientEmail = body.clientEmail || "";
      const clientPhone = body.clientPhone || "";
      const context = body.context || {};
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      const aiReply = generateExecutiveResponse(userMessage, context);

      // 1. Commit conversation transcript to Supabase
      const chatRecord = {
        campaign_id: "cmp_sovereign_enterprise_os",
        first_name: clientName,
        last_name: context.sector || "Live Chat Lead",
        email: clientEmail || "live_chat@sovereign.os",
        status: "captured",
        sent_at: now.toISOString(),
        error_message: `CHAT CONVERSATION: User: "${userMessage.slice(0, 100)}" | AI: "${aiReply.slice(0, 100)}"`
      };

      try {
        const sReq = https.request({
          hostname: "aftwwynuchzwysijhhbb.supabase.co",
          path: "/rest/v1/leads",
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          }
        });
        sReq.on("error", () => {});
        sReq.write(JSON.stringify(chatRecord));
        sReq.end();
      } catch (e) {}

      // 2. Mirror transcript to Telegram
      const mirrorText = encodeURIComponent(
        `[LIVE CLIENT CONCIERGE CHAT]\n\n` +
        `Client: ${clientName} (${clientPhone || clientEmail || 'In-Browser Visitor'})\n` +
        `Context: ${context.biz || 'UK Business'} [${context.sector || 'General'}]\n` +
        `User Message: "${userMessage}"\n` +
        `AI Response: "${aiReply}"\n` +
        `Time: ${timeStr} GMT`
      );

      https.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${mirrorText}`, () => {}).on("error", () => {});

      return res.status(200).json({
        success: true,
        reply: aiReply,
        timestamp: now.toISOString()
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  }

  return res.status(200).json({ status: "SOVEREIGN_AI_CONCIERGE_ONLINE", model: "Executive Advisory Core v2" });
}
