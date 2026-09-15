/**
 * ==============================================================================
 * SOVEREIGN // 24/7 AUTONOMOUS VIRAL SCHEDULER DAEMON (FULL-AUDIO)
 * ==============================================================================
 * Automatically executes 3 unique viral posts per day at peak algorithm hours:
 * 1. 12:30 PM (Midday Mobile Browse)
 * 2. 05:30 PM (Commute Peak)
 * 3. 08:45 PM (Prime Evening Peak)
 * ==============================================================================
 */

const { composeAndBroadcastExtremeClip, DYNAMIC_CATEGORIES } = require('./viral_auto_pilot_engine');

let currentVectorIndex = Math.floor(Math.random() * DYNAMIC_CATEGORIES.length);
let lastPostedSlot = "";

function getActiveTimeSlot() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const todayStr = now.toISOString().split('T')[0];

  if (currentTime >= 750 && currentTime < 765) {
    return `${todayStr}_slot_1230`;
  } else if (currentTime >= 1050 && currentTime < 1065) {
    return `${todayStr}_slot_1730`;
  } else if (currentTime >= 1245 && currentTime < 1260) {
    return `${todayStr}_slot_2045`;
  }
  return null;
}

async function checkAndExecuteSchedule() {
  const currentSlot = getActiveTimeSlot();
  if (currentSlot && currentSlot !== lastPostedSlot) {
    console.log(`\n [ALGORITHM TRIGGER] Peak hour detected (${currentSlot}). Dispatching scheduled video...`);
    lastPostedSlot = currentSlot;
    try {
      await composeAndBroadcastExtremeClip(currentVectorIndex);
      currentVectorIndex = (currentVectorIndex + 1) % DYNAMIC_CATEGORIES.length;
    } catch (err) {
      console.error(`[-] Scheduled post failed:`, err.message);
    }
  }
}

console.log("================================================================================");
console.log(" SOVEREIGN 24/7 DUAL-AUDIO VIRAL BROADCAST DAEMON ACTIVE");
console.log("================================================================================");
console.log("Posting Schedule:");
console.log("  • Slot 1: 12:30 PM (Midday Peak)");
console.log("  • Slot 2: 05:30 PM (Commute Peak)");
console.log("  • Slot 3: 08:45 PM (Prime Evening Peak)");
console.log(`Dynamic Categories: ${DYNAMIC_CATEGORIES.length} Active Vectors`);
console.log("Audio Layering: Dynamic ElevenLabs Voices + Layered Phonk/Trap Beats");
console.log("================================================================================\n");

setInterval(checkAndExecuteSchedule, 60 * 1000);

