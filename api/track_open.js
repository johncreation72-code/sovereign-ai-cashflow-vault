const https = require("https");

const SUPABASE_URL = "https://aftwwynuchzwysijhhbb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmdHd3eW51Y2h6d3lzaWpoaGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDU2MTQsImV4cCI6MjA1NzYyMTYxNH0.MxgHHZQGii2SWPVlCxvJIA_0A_JHv-w";
const TELEGRAM_BOT_TOKEN = "8885647741:AAEn_O775X67U5gNn83d9Hh_x7P7w6d8u_8";
const TELEGRAM_CHAT_ID = "8885647741";

// 1x1 Transparent GIF Base64
const PIXEL_GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const { ref, biz, sector, city, email } = req.query;
  const companyName = biz || "UK Enterprise";
  const docRef = ref || "DOC-UK";
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  if (ref) {
    try {
      // 1. Log open event to Supabase
      const eventPayload = JSON.stringify({
        campaign_id: "cmp_sovereign_enterprise_os",
        first_name: companyName,
        last_name: sector || "Trade",
        email: email || `director@${docRef.toLowerCase()}.co.uk`,
        status: "opened",
        opened_at: now.toISOString(),
        error_message: `EMAIL OPENED: ${companyName} (${city || 'UK'}) | Ref: ${docRef}`
      });

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
      sReq.write(eventPayload);
      sReq.end();

      // 2. Transmit to Real-time Telemetry
      const telemPayload = JSON.stringify({
        event: "email_opened",
        page: "inbox_client",
        detail: `[EMAIL OPENED] ${companyName} (${sector || 'Trade'}, ${city || 'UK'}) | Ref: ${docRef}`
      });

      const tReq = https.request({
        hostname: "sovereign-empire-os-ub2.vercel.app",
        path: "/api/telemetry",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(telemPayload)
        }
      });
      tReq.on("error", () => {});
      tReq.write(telemPayload);
      tReq.end();

      // 3. Transmit Instant Alert to Telegram Bot
      const tgMessage = encodeURIComponent(
        `[EMAIL OPENED BY DIRECTOR]\n\n` +
        `Company: ${companyName}\n` +
        `Location: ${city || 'United Kingdom'}\n` +
        `Sector: ${sector || 'Commercial Trade'}\n` +
        `Contact: ${email || 'director@' + docRef.toLowerCase() + '.co.uk'}\n` +
        `Registration Ref: ${docRef}\n` +
        `Time: ${timeStr} GMT\n` +
        `Status: Active Prospect In Inbox`
      );

      https.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${tgMessage}`, () => {}).on("error", () => {});

    } catch (e) {}
  }

  return res.status(200).send(PIXEL_GIF);
}
