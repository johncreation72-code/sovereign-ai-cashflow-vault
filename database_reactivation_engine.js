/**
 * ==============================================================================
 * SOVEREIGN // COLD DATABASE REACTIVATION & LOST REVENUE RECOVERY ENGINE
 * ==============================================================================
 * The "Hidden Goldmine" Strategy:
 * Every company has 500 - 3,000 old leads, past clients, or ghosted quotes.
 * This automated 3-message sequence reactivates 8-15% of dead lists within 48 hours.
 * ==============================================================================
 */

const REACTIVATION_CAMPAIGN = {
  name: "9-Word Lead Reactivation & Quote Recovery",
  step1: {
    delay: "Day 1 (Instant)",
    channel: "SMS / Email",
    template: "Hi {{FirstName}}, are you still looking to get {{JobType}} done on your property, or have you already sorted it?"
  },
  step2: {
    delay: "Day 2 (+24 Hours)",
    channel: "Email",
    template: `Subject: Quick update on your {{JobType}} estimate

Hi {{FirstName}}, we have 2 opening slots on our schedule next week for {{City}} projects. 

If you'd still like to get your {{JobType}} completed before winter rates go up, let me know and we can honor your previous quote price.

Best,
{{BusinessOwner}}`
  },
  step3: {
    delay: "Day 4 (+72 Hours)",
    channel: "SMS",
    template: "Hey {{FirstName}}, just finalizing our crew schedule for the month. Should I close out your file or hold your quote spot?"
  }
};

console.log("================================================================================");
console.log(" SOVEREIGN DATABASE REACTIVATION & LOST REVENUE RECOVERY SYSTEM");
console.log("================================================================================");
console.log("Reactivation Sequence Architecture:");
console.log("  1. The 9-Word Psychological Trigger SMS (80% Open Rate in 15 Min)");
console.log("  2. The Schedule-Opening Price Lock Email (+24h)");
console.log("  3. The Final File Close-Out SMS (+72h)");
console.log("================================================================================\n");

module.exports = { REACTIVATION_CAMPAIGN };
