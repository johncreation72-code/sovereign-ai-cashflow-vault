/**
 * ==============================================================================
 * SOVEREIGN // 24/7 GLOBAL SUN-FOLLOWING SMART SCHEDULE DAEMON
 * Fully Autonomous Dispatch Matrix Running Across 6 Global Timezones
 * ==============================================================================
 */

const MARKETS = [
  { zone: "AEST", city: "Sydney / Melbourne (Australia)", offsetUTC: 10, openLocalHour: 9, closeLocalHour: 17, currency: "AUD", leadBatch: "au_leads" },
  { zone: "GST", city: "Dubai / Abu Dhabi (GCC)", offsetUTC: 4, openLocalHour: 9, closeLocalHour: 18, currency: "AED", leadBatch: "gcc_leads" },
  { zone: "GMT", city: "London / Manchester (UK)", offsetUTC: 0, openLocalHour: 8.5, closeLocalHour: 17.5, currency: "GBP", leadBatch: "uk_leads" },
  { zone: "CET", city: "Frankfurt / Paris (Europe)", offsetUTC: 1, openLocalHour: 9, closeLocalHour: 17.5, currency: "EUR", leadBatch: "eu_leads" },
  { zone: "EST", city: "New York / Miami (US East)", offsetUTC: -5, openLocalHour: 9, closeLocalHour: 17, currency: "USD", leadBatch: "us_east_leads" },
  { zone: "PST", city: "Los Angeles / SF (US West)", offsetUTC: -8, openLocalHour: 9, closeLocalHour: 17, currency: "USD", leadBatch: "us_west_leads" }
];

function getActiveGlobalMarkets() {
  const now = new Date();
  const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;
  
  return MARKETS.filter(m => {
    let localHour = (utcHour + m.offsetUTC + 24) % 24;
    return localHour >= m.openLocalHour && localHour <= m.closeLocalHour;
  });
}

function runGlobalDispatchCycle() {
  const now = new Date();
  const activeMarkets = getActiveGlobalMarkets();
  
  console.log(`[GLOBAL DISPATCH MATRIX - ${now.toISOString()}]: ${activeMarkets.length} World Economic Zones Currently Active.`);
  
  activeMarkets.forEach(market => {
    const localHour = ((now.getUTCHours() + market.offsetUTC + 24) % 24).toFixed(1);
    console.log(` -> Active Commercial Zone: ${market.city} [${market.zone}] | Local Time: ${localHour}:00 | Currency: ${market.currency}`);
    // Automated intake queueing & localized proposal alignment
  });
}

console.log("[SOVEREIGN 24/7 SUN-FOLLOWING DISPATCH DAEMON INITIALIZED]");
runGlobalDispatchCycle();

// Cycle every 15 minutes continuously 24/7/365
setInterval(runGlobalDispatchCycle, 15 * 60 * 1000);
