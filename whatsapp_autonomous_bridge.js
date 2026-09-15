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
  lawyers: "https://sovereign-empire-os-ub2.vercel.app/lexcommand_os.html",
  accountants: "https://sovereign-empire-os-ub2.vercel.app/ledgercommand_os.html",
  gyms: "https://sovereign-empire-os-ub2.vercel.app/fitnesscommand_os.html",
  default: "https://sovereign-empire-os-ub2.vercel.app/index.html"
};

const CHECKOUT_LINK = "https://whop.com/checkout/plan_UL1yNCSJUr2Ka";

console.log("================================================================================");
console.log(" INITIALIZING SOVEREIGN 24/7 AUTONOMOUS WHATSAPP BRIDGE");
console.log("================================================================================");

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, ".wwebjs_auth") }),
  puppeteer: {
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

let isReady = false;

client.on("qr", (qr) => {
  console.log("\n SCAN THIS QR CODE IN WHATSAPP (Settings > Linked Devices > Link a Device):\n");
  qrcode.generate(qr, { small: true });
  const html = `<!DOCTYPE html><html><head><title>WhatsApp QR Link</title><style>body{font-family:sans-serif;background:#0F172A;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;}.card{background:#1E293B;padding:40px;border-radius:16px;text-align:center;max-width:400px;}#qr{background:white;padding:20px;border-radius:12px;margin:20px auto;display:inline-block;}</style><script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script></head><body><div class="card"><h2>Link WhatsApp to Sovereign OS</h2><p>Open WhatsApp &gt; Settings &gt; Linked Devices &gt; Link a Device and scan:</p><div id="qr"></div></div><script>new QRCode(document.getElementById("qr"), {text: "` + qr + `", width: 240, height: 240}); setTimeout(() => location.reload(), 20000);</script></body></html>`;
  fs.writeFileSync(path.join(__dirname, "whatsapp_qr_viewer.html"), html);
});

client.on("ready", () => {
  isReady = true;
  console.log("\n================================================================================");
  console.log(" WHATSAPP AUTONOMOUS BRIDGE CONNECTED & LIVE 24/7!");
  console.log("================================================================================");
  console.log("• Session: Authenticated & Persisted");
  console.log("• Inbound AI Auto-Responder: ACTIVE");
  console.log("• Ready to receive send commands from Agent");
  console.log("================================================================================\n");
});

client.on("message", async (msg) => {
  if (msg.fromMe) return;
  const text = msg.body.toLowerCase();
  console.log(`[+] Incoming message from ${msg.from}: ${msg.body}`);
  if (text.includes("price") || text.includes("cost") || text.includes("how much")) {
    await msg.reply("We normally charge £197/month, but we are running a 7-day zero-risk trial right now so you can test the system in your business. After that, it is just £97/month with no contracts or setup fees.");
  } else if (text.includes("demo") || text.includes("how does it work") || text.includes("look") || text.includes("see")) {
    await msg.reply(`Here is the live interactive system demo: ${PORTALS.default} - It runs 100% in the cloud with zero technical setup required.`);
  } else if (text.includes("start") || text.includes("yes") || text.includes("sign up") || text.includes("trial") || text.includes("interested")) {
    await msg.reply(`Awesome! You can activate your 7-day risk-free trial directly through our secure portal checkout: ${CHECKOUT_LINK} - As soon as that is confirmed, your custom portal is deployed immediately.`);
  }
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
          return res.end(JSON.stringify({ error: "WhatsApp not ready. Please scan QR." }));
        }
        const chatId = phone.replace(/[^0-9]/g, "") + "@c.us";
        await client.sendMessage(chatId, message);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, phone, message }));
      } catch (e) {
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
  console.log(" WhatsApp Command API listening on port 3002");
});