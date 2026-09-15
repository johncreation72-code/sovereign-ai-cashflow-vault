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
        const text = update.message.text.trim().toLowerCase();
        const firstName = update.message.from.first_name || "there";

        if (text.startsWith("/start") || text.includes("hello") || text.includes("hi")) {
          await tgRequest("sendMessage", {
            chat_id: chatId,
            text: `Welcome, ${firstName}. Sovereign OS is active in 100% cloud production mode.\n\nSelect your industry or request an instant bespoke proposal below:`,
            reply_markup: {
              inline_keyboard: [
                [{ text: "SiteCommand OS (Builders)", url: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html" }],
                [{ text: "Clinic Sovereign (Medical)", url: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html" }],
                [{ text: "Instant Plan Checkout", url: STORE_LINK }]
              ]
            }
          });
        } else if (text.includes("price") || text.includes("cost") || text.includes("trial") || text.includes("blueprint") || text.includes("buy")) {
          await tgRequest("sendMessage", {
            chat_id: chatId,
            text: `Commercial Pricing & Deployment:\n\n• 7-Day Free Risk-Free Trial\n• Monthly Retainer: £97/month\n• Zero setup fees, cancel anytime in 1 click.\n\nActivate your access below:`,
            reply_markup: {
              inline_keyboard: [
                [{ text: "Activate 7-Day Free Trial", url: STORE_LINK }]
              ]
            }
          });
        } else {
          await tgRequest("sendMessage", {
            chat_id: chatId,
            text: `Thank you for your message. An operations specialist has been notified. You can explore your specialized sector portal or launch your 7-day free trial here:\n\nhttps://sovereign-empire-os-ub2.vercel.app/`,
            reply_markup: {
              inline_keyboard: [
                [{ text: "Open Sovereign Operating Hub", url: "https://sovereign-empire-os-ub2.vercel.app/" }],
                [{ text: "Instant Checkout ($97/mo)", url: STORE_LINK }]
              ]
            }
          });
        }
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
