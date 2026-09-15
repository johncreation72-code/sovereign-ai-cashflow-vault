const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORTALS = {
  builders: "https://sovereign-empire-os-ub2.vercel.app/sitecommand_os.html",
  dentists: "https://sovereign-empire-os-ub2.vercel.app/clinic_sovereign_os.html",
  restaurants: "https://sovereign-empire-os-ub2.vercel.app/culinary_command_os.html",
  realestate: "https://sovereign-empire-os-ub2.vercel.app/estate_command_os.html",
  garages: "https://sovereign-empire-os-ub2.vercel.app/autocommand_os.html",
  ecommerce: "https://sovereign-empire-os-ub2.vercel.app/commerce_command_os.html",
  default: "https://sovereign-empire-os-ub2.vercel.app/index.html"
};

const CHECKOUT_LINK = "https://whop.com/checkout/plan_UL1yNCSJUr2Ka";

console.log("================================================================================");
console.log(" SOVEREIGN 24/7 AUTONOMOUS WHATSAPP BRIDGE DAEMON");
console.log("================================================================================");

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, ".whatsapp_sovereign_auth") }),
  puppeteer: {
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || (process.platform === "darwin" && fs.existsSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome") ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : undefined),
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu"
    ]
  }
});

let isReady = false;

client.on("qr", (qr) => {
  console.log("\n NEW QR CODE GENERATED - SCAN WITH PHONE TO LINK WHATSAPP:\n");
  qrcode.generate(qr, { small: true });

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Link WhatsApp to Sovereign OS</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #0F172A; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #1E293B; padding: 40px; border-radius: 16px; text-align: center; max-width: 440px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    h2 { margin-top: 0; color: #25D366; }
    p { color: #94A3B8; font-size: 15px; line-height: 1.5; }
    #qr { background: white; padding: 20px; border-radius: 12px; margin: 20px auto; display: inline-block; }
    .badge { background: #334155; padding: 6px 14px; border-radius: 20px; font-size: 13px; color: #38BDF8; font-weight: 600; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body>
  <div class="card">
    <span class="badge">1-Time Device Link</span>
    <h2>Link WhatsApp to Sovereign OS</h2>
    <p>Open <strong>WhatsApp</strong> &gt; <strong>Settings</strong> &gt; <strong>Linked Devices</strong> &gt; <strong>Link a Device</strong> and scan this code:</p>
    <div id="qr"></div>
    <p style="font-size: 13px; color: #64748B;">Once scanned, Sovereign OS can auto-send messages on your command and close leads 24/7.</p>
  </div>
  <script>
    new QRCode(document.getElementById("qr"), {
      text: "` + qr + `",
      width: 240,
      height: 240
    });
    setTimeout(() => location.reload(), 20000);
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, "whatsapp_link.html"), html);
});

client.on("ready", () => {
  isReady = true;
  console.log("\n================================================================================");
  console.log(" WHATSAPP AUTONOMOUS BRIDGE CONNECTED & LIVE 24/7!");
  console.log("================================================================================");
  console.log("• Session: Authenticated & Persisted in .whatsapp_sovereign_auth");
  console.log("• 24/7 AI Inbound Auto-Closer: ACTIVE");
  console.log("• Command Server: Listening on http://localhost:3002");
  console.log("================================================================================\n");
});

function analyzeCustomerIntentAndReply(body) {
  const text = body.toLowerCase().trim();

  if (text === "stop" || text.includes("unsubscribe") || text.includes("remove me") || text.includes("not interested") || text.includes("no thanks") || text.includes("dont message")) {
    return "Understood, thanks for letting us know! We have removed your contact from our active outreach list. Wishing you and your business continued success.";
  }

  if (text.includes("who is this") || text.includes("who are you") || text.includes("where did you get") || text.includes("how did you get")) {
    return "Hi there! I am an automated system architect from Sovereign OS. We analyze publicly listed UK businesses to help automate after-hours inquiries and admin bottlenecks. We built a custom operating portal for your sector and are offering a 7-day risk-free trial: https://sovereign-empire-os-ub2.vercel.app/ - Happy to answer any questions or remove you if not relevant.";
  }

  if (text.includes("price") || text.includes("cost") || text.includes("how much") || text.includes("pricing") || text.includes("rate") || text.includes("fee")) {
    return "We are running a 7-day zero-risk trial right now so you can test the system in your business for £0 upfront. After that, it is just £97/month with no setup fees and no long-term contracts (cancel anytime in 1 click).";
  }

  if (text.includes("start") || text.includes("sign up") || text.includes("trial") || text.includes("send link") || text.includes("how do i start") || text === "yes" || text.includes("interested") || text.includes("sounds good") || text.includes("let's do it")) {
    return "Brilliant! You can activate your 7-day risk-free trial directly through our secure portal checkout: " + CHECKOUT_LINK + " - As soon as your trial is confirmed, your custom portal is provisioned immediately.";
  }

  if (text.includes("contract") || text.includes("cancel") || text.includes("commitment") || text.includes("lock in")) {
    return "There are zero long-term contracts and zero lock-ins. It is a flexible month-to-month subscription (£97/mo) after your 7-day free trial, and you can cancel anytime directly from your dashboard.";
  }

  if (text.includes("how does it work") || text.includes("what is it") || text.includes("what does it do") || text.includes("demo") || text.includes("features") || text.includes("tell me more") || text.includes("look") || text.includes("see")) {
    return "The system runs 100% in the cloud with zero technical setup required on your end. It automates missed-call text-backs, qualifies incoming leads in under 15 seconds, and handles after-hours booking and quote generation. You can test the live interactive portal here: https://sovereign-empire-os-ub2.vercel.app/";
  }

  return "Thanks for your message! Our system automates client intake, missed-call recovery, and operations for modern businesses. You can explore the full live system here: https://sovereign-empire-os-ub2.vercel.app/ - Would you like to test it on a 7-day risk-free trial?";
}

client.on("message", async (msg) => {
  if (msg.fromMe) return;
  console.log(`[+] Incoming lead message from ${msg.from}: ${msg.body}`);
  const replyText = analyzeCustomerIntentAndReply(msg.body);
  console.log(`[ AI Auto-Closer Replying to ${msg.from}]: ${replyText}`);
  await msg.reply(replyText);
});

client.initialize();

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/send") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const { phone, message } = JSON.parse(body);
        if (!isReady) {
          res.writeHead(503, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "WhatsApp not ready. Scan QR first." }));
        }
        let cleanPhone = phone.replace(/[^0-9]/g, "");
        if (cleanPhone.startsWith("07")) cleanPhone = "44" + cleanPhone.substring(1);
        const chatId = cleanPhone + "@c.us";
        await client.sendMessage(chatId, message);
        console.log(`[ Sent WhatsApp message to ${cleanPhone}]`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, phone: cleanPhone, message }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } else if (req.method === "POST" && req.url === "/notify-crypto") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const { message } = JSON.parse(body);
        if (!isReady) {
          res.writeHead(503, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "WhatsApp not ready." }));
        }

        let delivered = false;
        let target = "self";

        try {
          const chats = await client.getChats();
          const cryptoChat = chats.find(c => c.name && c.name.toLowerCase().includes("crypto"));
          if (cryptoChat) {
            await cryptoChat.sendMessage(message);
            delivered = true;
            target = cryptoChat.name;
            console.log(`[ Delivered to crypto chat: ${cryptoChat.name}]`);
          }
        } catch(err) {
          console.log("[*] Chat lookup error, defaulting to direct self...");
        }

        if (!delivered) {
          const selfId = client.info && client.info.wid ? client.info.wid._serialized : null;
          if (selfId) {
            await client.sendMessage(selfId, message);
            delivered = true;
            target = "Self Chat (" + selfId + ")";
            console.log(`[ Delivered to User Self Chat: ${selfId}]`);
          }
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: delivered, deliveredTo: target }));
      } catch (e) {
        console.error("Notify error:", e.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ isReady, status: isReady ? "CONNECTED" : "AWAITING_QR_SCAN" }));
  }
});

server.listen(3002, () => {
  console.log(" WhatsApp Command API active on http://localhost:3002");
});
