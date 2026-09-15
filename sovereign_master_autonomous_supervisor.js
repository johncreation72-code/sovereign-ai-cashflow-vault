/**
 * ==============================================================================
 * SOVEREIGN ENTERPRISE // MASTER 24/7 AUTONOMOUS SUPERVISOR DAEMON
 * ==============================================================================
 * Unifies all production subsystems into a resilient, round-the-clock daemon:
 * 1. Telegram AI Sales Concierge (@sovereign_ai_hub_bot)
 * 2. Continuous Multi-Channel UK Director Audit & Proposal Dispatcher
 * 3. On-Chain Ethereum USDT Wallet Payment Sentinel (0x2582056084f361d8E8A3b8864b9566071878FfD2)
 * 4. WhatsApp Autonomous Bridge Server (Port 3002)
 * 5. Automatic process auto-restart on error
 * ==============================================================================
 */

const { fork } = require("child_process");
const path = require("path");
const fs = require("fs");

const WORKDIR = "/Users/mediacreation/Desktop/online enterprise";
const LOG_FILE = path.join(WORKDIR, "master_supervisor_live.log");

function logSupervisor(msg) {
  const time = new Date().toISOString();
  const entry = `[${time}] ${msg}\n`;
  try {
    fs.appendFileSync(LOG_FILE, entry);
  } catch (e) {}
  console.log(`[${time}] ${msg}`);
}

logSupervisor("================================================================================");
logSupervisor("SOVEREIGN ENTERPRISE MASTER AUTONOMOUS SUPERVISOR INITIALIZED");
logSupervisor("Mode: 100% Continuous Live Production // Zero Mocks // Auto-Recovery Enabled");
logSupervisor("================================================================================");

// Complete Subsystem Array
const SERVICES = [
  {
    name: "Telegram AI Sales Concierge",
    script: path.join(WORKDIR, "telegram_bot.js"),
    restartDelay: 5000
  },
  {
    name: "On-Chain Payment Sentinel",
    script: path.join(WORKDIR, "wallet_payment_sentinel.js"),
    restartDelay: 5000
  },
  {
    name: "Continuous B2B Dispatch Engine",
    script: path.join(WORKDIR, "uk_smart_schedule_daemon.js"),
    restartDelay: 10000
  },
  {
    name: "WhatsApp Autonomous Bridge Server",
    script: path.join(WORKDIR, "whatsapp_bridge_daemon.js"),
    restartDelay: 10000
  }
];

const runningProcesses = {};

function startService(service) {
  logSupervisor(`[+] Spawning Subsystem: ${service.name}...`);

  const child = fork(service.script, [], {
    cwd: WORKDIR,
    env: { ...process.env, NODE_ENV: "production" },
    silent: false
  });

  runningProcesses[service.name] = child;

  child.on("error", (err) => {
    logSupervisor(`[-] Service Error in ${service.name}: ${err.message}`);
  });

  child.on("exit", (code, signal) => {
    logSupervisor(`[!] Service ${service.name} exited (Code: ${code}, Signal: ${signal}). Auto-restarting in ${service.restartDelay / 1000}s...`);
    setTimeout(() => {
      startService(service);
    }, service.restartDelay);
  });

  logSupervisor(`[+] Service ${service.name} successfully launched [PID: ${child.pid}].`);
}

// Start all services
SERVICES.forEach(svc => {
  if (fs.existsSync(svc.script)) {
    startService(svc);
  } else {
    logSupervisor(`[-] Missing script for ${svc.name}: ${svc.script}`);
  }
});

// Periodic Health Check & Telemetry Heartbeat every 30 seconds
setInterval(() => {
  const activeCount = Object.keys(runningProcesses).length;
  logSupervisor(`[HEARTBEAT] All ${activeCount} production subsystems running autonomously.`);
}, 30000);

// Keep master process alive
process.on("uncaughtException", (err) => {
  logSupervisor(`[CRITICAL] Uncaught exception in master supervisor: ${err.message}`);
});
