/**
 * ==============================================================================
 * SOVEREIGN // 24/7/365 GLOBAL MASTER SUPERVISOR & CLOUD WATCHDOG
 * Industrial Resilience: Auto-Restart, Crash Guard, Zero Interruption
 * Built-in HTTP Health Check Server on PORT for Render / Railway / Fly.io / VPS
 * ==============================================================================
 */

const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");

const WORKDIR = process.env.WORKDIR || __dirname;
const PORT = process.env.PORT || 3000;

const MANAGED_SERVICES = [
  { name: "Telegram Bot Concierge", script: "telegram_bot.js" },
  { name: "High-Intent Signal Scourer", script: "high_intent_signal_scourer.js" },
  { name: "Dynamic Lead Harvester", script: "global_lead_harvester.js" },
  { name: "Sun-Following Global Dispatcher", script: "global_smart_schedule_daemon.js" },
  { name: "Wallet Settlement Sentinel", script: "wallet_payment_sentinel.js" },
  { name: "Neural Optimization Sentinel", script: "autonomous_neural_learning_sentinel.js" },
  { name: "Content Broadcast Scheduler", script: "autonomous_scheduler_daemon.js" },
  { name: "WhatsApp AI Bridge", script: "whatsapp_bridge_daemon.js" },
  { name: "Omni-Channel Outreach Accelerator", script: "cloud_omni_outreach_accelerator.js" }
];

const activeProcesses = {};
const processStats = {};

function startService(service) {
  const scriptPath = path.join(WORKDIR, service.script);
  if (!fs.existsSync(scriptPath)) {
    console.warn(`[SUPERVISOR WARNING]: Script not found: ${scriptPath}`);
    return;
  }

  console.log(`[SUPERVISOR]: Spawning service -> ${service.name} (${service.script})`);
  const child = spawn("node", [scriptPath], {
    cwd: WORKDIR,
    env: Object.assign({}, process.env, { PORT: undefined }),
    stdio: ["pipe", "pipe", "pipe"]
  });

  processStats[service.script] = {
    name: service.name,
    pid: child.pid,
    startedAt: new Date().toISOString(),
    status: "RUNNING",
    restarts: (processStats[service.script] ? processStats[service.script].restarts : 0)
  };

  child.stdout.on("data", (data) => {
    const msg = data.toString().trim();
    if (msg) console.log(`[${service.name}]: ${msg}`);
  });

  child.stderr.on("data", (data) => {
    const err = data.toString().trim();
    if (err && !err.includes("ExperimentalWarning") && !err.includes("DeprecationWarning")) {
      console.error(`[${service.name} ERROR]: ${err}`);
    }
  });

  child.on("exit", (code, signal) => {
    console.warn(`[SUPERVISOR ALERT]: ${service.name} exited with code ${code} (signal: ${signal}). Self-healing restart in 5.0s...`);
    delete activeProcesses[service.script];
    if (processStats[service.script]) {
      processStats[service.script].status = "RESTARTING";
      processStats[service.script].restarts += 1;
    }
    setTimeout(() => startService(service), 5000);
  });

  activeProcesses[service.script] = child;
}

console.log("==================================================================");
console.log(" SOVEREIGN 24/7/365 CLOUD MASTER SUPERVISOR INITIALIZING");
console.log(` WORKDIR: ${WORKDIR}`);
console.log(` HTTP HEALTH SERVER PORT: ${PORT}`);
console.log("==================================================================");

// Start all managed micro-services
MANAGED_SERVICES.forEach(svc => startService(svc));

// Built-in lightweight HTTP Health Server for Cloud Platforms (Render, Railway, Fly.io)
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://localhost:" + PORT);
  let pathname = parsedUrl.pathname;

  if (pathname === "/health" || pathname === "/status") {
    const runningCount = Object.keys(activeProcesses).length;
    const responsePayload = {
      status: "HEALTHY",
      system: "Sovereign Enterprise OS Cloud Core",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      activeServicesCount: runningCount,
      totalConfiguredServices: MANAGED_SERVICES.length,
      services: processStats,
      edgePortals: "https://sovereign-empire-os-ub2.vercel.app/index.html",
      settlementAddress: "0x2582056084f361d8E8A3b8864b9566071878FfD2"
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(responsePayload, null, 2));
  }

  if (pathname === "/" || pathname === "/dashboard") {
    pathname = "/realtime_executive_command.html";
  }

  const safePath = path.normalize(path.join(WORKDIR, pathname));
  if (safePath.startsWith(WORKDIR) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    let contentType = "text/plain";
    if (safePath.endsWith(".html")) contentType = "text/html; charset=utf-8";
    else if (safePath.endsWith(".css")) contentType = "text/css";
    else if (safePath.endsWith(".js")) contentType = "application/javascript";
    else if (safePath.endsWith(".json")) contentType = "application/json";
    else if (safePath.endsWith(".jpg")) contentType = "image/jpeg";
    else if (safePath.endsWith(".png")) contentType = "image/png";

    res.writeHead(200, { "Content-Type": contentType });
    return fs.createReadStream(safePath).pipe(res);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(PORT, () => {
  console.log(`[SUPERVISOR HTTP]: Health check listening on port ${PORT} (/health)`);
});

// Periodic heartbeat log
setInterval(() => {
  const running = Object.keys(activeProcesses).length;
  console.log(`[SUPERVISOR HEARTBEAT - ${new Date().toISOString()}]: ${running}/${MANAGED_SERVICES.length} Services Healthy & Operational.`);
}, 60000);

process.on("SIGINT", () => {
  console.log("[SUPERVISOR]: Graceful shutdown initiated...");
  Object.values(activeProcesses).forEach(p => {
    try { p.kill(); } catch (e) {}
  });
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("[SUPERVISOR]: SIGTERM received, shutting down gracefully...");
  Object.values(activeProcesses).forEach(p => {
    try { p.kill(); } catch (e) {}
  });
  server.close(() => process.exit(0));
});
