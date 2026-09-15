/**
 * ==============================================================================
 * SOVEREIGN // AUTONOMOUS WHATSAPP OUTBOUND DISPATCH ENGINE
 * ==============================================================================
 * Auto-dispatches tailored pitches directly through your linked WhatsApp number
 * ==============================================================================
 */

const http = require("http");

async function sendWhatsAppMessage(phone, message) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ phone, message });
    const req = http.request({
      hostname: "localhost",
      port: 3002,
      path: "/send",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)
      }
    }, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ raw: body }); }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function batchDispatchWhatsApp(targets) {
  console.log("================================================================================");
  console.log(" SOVEREIGN // AUTONOMOUS WHATSAPP BATCH DISPATCH EXECUTION");
  console.log("================================================================================");
  console.log("Total Target Contacts:", targets.length);

  const results = [];

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    console.log(`\n[${i + 1}/${targets.length}] Sending to ${t.company || t.name} (${t.phone})...`);
    try {
      const res = await sendWhatsAppMessage(t.phone, t.pitch);
      console.log(`  [ Sent via WhatsApp Business] Status:`, res.success ? "DELIVERED" : res);
      results.push({ ...t, status: "DELIVERED", timestamp: new Date().toISOString() });
    } catch (e) {
      console.error(`  [!] Error sending to ${t.phone}:`, e.message);
      results.push({ ...t, status: "ERROR", error: e.message });
    }

    // Safety delay between automated messages (5-10s)
    if (i < targets.length - 1) {
      console.log("   Waiting 6 seconds before next dispatch...");
      await new Promise(r => setTimeout(r, 6000));
    }
  }

  console.log("\n================================================================================");
  console.log(" BATCH DISPATCH COMPLETE!");
  console.log("================================================================================\n");

  return results;
}

module.exports = { sendWhatsAppMessage, batchDispatchWhatsApp };
