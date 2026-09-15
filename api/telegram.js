const https = require("https");

const BOT_TOKEN = "8885647741:AAEWDIgaZyN2glGdNIcgmIeFpnBv4l74S9I";
const STORE_LINK = "https://whop.com/checkout/plan_UL1yNCSJUr2Ka";
const API_URL = "https://api.telegram.org/bot" + BOT_TOKEN;

function tgRequest(endpoint, data = {}) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(data);
    const u = new URL(`${API_URL}/${endpoint}`);

    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)
      },
      timeout: 4000
    }, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try { resolve(JSON.parse(body)); } catch (e) { resolve({ ok: false, raw: body }); }
      });
    });

    req.on("error", err => resolve({ ok: false, error: err.message }));
    req.write(postData);
    req.end();
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({
      status: "ACTIVE",
      mode: "100% Cloud Serverless Webhook",
      bot: "@sovereign_ai_hub_bot"
    });
  }

  if (req.method === "POST") {
    try {
      const update = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text.trim();
        const lower = text.toLowerCase();
        const firstName = update.message.from.first_name || "there";

        let aiReply = "";

        if (lower.startsWith("/start") || lower === "hi" || lower === "hello") {
          aiReply = `Welcome, ${firstName}. Sovereign Systems provides automated operating portals for UK commercial enterprises. We are currently onboarding select businesses on a complimentary 7-day trial with zero upfront software license fees.\n\nSelect your industry portal or activate trial access below:`;
        } else if (lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("trial")) {
          aiReply = `Commercial Pricing & Trial Terms:\n\n• Complimentary 7-Day Zero-Risk Trial\n• Monthly Software License: £97/month\n• Zero setup fees, cancel anytime in 1 click.\n\nActivate your access below:`;
        } else if (lower.includes("cis") || lower.includes("builder") || lower.includes("construction") || lower.includes("subcontractor")) {
          aiReply = `SiteCommand OS is built specifically for UK construction firms. It automates 20% CIS tax deduction calculations, eliminates subcontractor hours discrepancies, and formats luxury PDF quotes in under 60 seconds.`;
        } else if (lower.includes("dental") || lower.includes("clinic") || lower.includes("teeth") || lower.includes("patient")) {
          aiReply = `Clinic Sovereign OS is engineered for dental and cosmetic practices to capture after-hours emergency inquiries and recover unclosed treatment plans.`;
        } else if (lower.includes("mot") || lower.includes("garage") || lower.includes("mechanic")) {
          aiReply = `AutoCommand OS automates 30-day MOT recalls and service chasers for independent garages, recovering customer retention.`;
        } else if (lower.includes("hvac") || lower.includes("boiler") || lower.includes("gas") || lower.includes("cp12")) {
          aiReply = `HVAC Command OS handles annual landlord CP12 gas safety renewals and rapid emergency boiler triage.`;
        } else {
          aiReply = `Thank you for your message. Sovereign Systems provides bespoke operating suites across 8 commercial trades to eliminate administrative bottlenecks and boost lost revenue. How may our operations team assist your business today?`;
        }

        await tgRequest("sendMessage", {
          chat_id: chatId,
          text: aiReply,
          reply_markup: {
            inline_keyboard: [
              [{ text: "SiteCommand OS (Builders)", url: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html" }],
              [{ text: "Clinic Sovereign (Medical)", url: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html" }],
              [{ text: "Activate 7-Day Free Trial (£97/mo)", url: STORE_LINK }]
            ]
          }
        });
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
