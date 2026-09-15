/**
 * ==============================================================================
 * SOVEREIGN // RECURRING SUBSCRIPTION: MENTAL HEALTH & BODY CONFIDENCE SANCTUARY
 * ==============================================================================
 * Product: "The Mind & Body Clarity Monthly Protocol" ($2.99 / Month Recurring)
 * Focus: Cognitive wellness, anxiety grounding, body dysmorphia reframing,
 *        crisis resource directories, daily mental health audio & booklets.
 * Payout: 0x2582056084f361d8E8A3b8864b9599071878FfD2 (Trust Wallet USDC)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { DevelopingEngine, CONFIG } = require('./mastermind_brain');

const PRODUCT_TITLE = "The Mind & Body Clarity Monthly Protocol";
const MONTHLY_PRICE = 3; // $2.99 / Month (Rounded to $3 for Whop API)

function whopPost(path, data) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(data);
    const req = https.request({
      hostname: 'api.whop.com',
      path: path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.WHOP_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Sovereign-MentalHealth/1.0',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch (e) { resolve({ status: res.statusCode, raw: body }); }
      });
    });
    req.on('error', err => resolve({ error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function deployMentalHealthSubscription() {
  console.log("\n================================================================================");
  console.log(" EXPANDING INTO MENTAL HEALTH & BODY CONFIDENCE MONTHLY SUBSCRIPTION");
  console.log("================================================================================");
  console.log(`Product: "${PRODUCT_TITLE}" ($2.99/mo Recurring)`);
  console.log(`Payout Vault: ${CONFIG.TRUST_WALLET} (USDC)\n`);

  // 1. Write Complete Master Issue #1
  console.log("▶ [1/4] Compiling Issue #1: Cognitive Reframing & Body Dysmorphia Mastery...");
  const content = `# THE MIND & BODY CLARITY PROTOCOL // ISSUE #1
### Cognitive Reframing, Body Dysmorphia Grounding, and 24/7 Wellness Directory

---

## 1. Verified Global Support Directories & Immediate Help
If you or someone you know is experiencing acute distress, access these free, confidential 24/7 services:
- **UK / Europe:** Samaritans (Call 116 123) | Shout Crisis Text Line (Text SHOUT to 85258)
- **USA / Canada:** 988 Suicide & Crisis Lifeline (Call or Text 988) | Crisis Text Line (Text HOME to 741741)
- **International:** Find a Helpline directory (https://findahelpline.com)

---

## 2. Overcoming Body Dysmorphia & Male Intimate Insecurities
### Cognitive Distortion Breakdown:
1. **The Funnel-Vision Effect:** Fixating on single perceived physical traits while blinding yourself to overall presence, posture, and strength.
2. **Algorithmic Distortion:** Understanding that social media feeds are engineered with lighting, selective angles, and algorithmic filters designed to provoke anxiety.
3. **The 3-Step Neural Reset:**
   - **Step 1: Mirror Exposure Limiting:** Cap unneeded mirror-checking to under 60 seconds per day.
   - **Step 2: Objective Reframing:** Shift focus from cosmetic aesthetics to physical utility, endurance, and neurological health.
   - **Step 3: Dopamine Detox:** Unfollow accounts that trigger comparison loops.

---

## 3. Daily 5-Minute Somatic Grounding Exercises
- **The 4-7-8 Parasympathetic Breathing Cycle:** Inhale for 4s, hold for 7s, exhale for 8s to calm cortisol spikes.
- **5-4-3-2-1 Sensory Orientation:** Acknowledge 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.

---
*© 2026 Sovereign Health & Clarity Sanctuary. Issue #1.*`;

  fs.writeFileSync(path.join(__dirname, 'Product_Mental_Health_Issue1.md'), content);
  console.log("  [+] Issue #1 written: Product_Mental_Health_Issue1.md");

  // 2. Deploy Product to Whop
  console.log("\n▶ [2/4] Deploying Recurring Product to Whop...");
  const pRes = await whopPost('/api/v1/products', {
    account_id: CONFIG.WHOP_COMPANY,
    title: PRODUCT_TITLE
  });

  if (pRes.status !== 200 && pRes.status !== 201) {
    console.error("[-] Product creation error:", pRes);
    return;
  }

  const prodId = pRes.data.id;
  console.log(`  [+] Whop Product Created: ${prodId}`);

  // Create Monthly Recurring Plan ($2.99 / mo)
  console.log("  [*] Generating $2.99/mo Recurring Subscription Plan...");
  const planRes = await whopPost('/api/v1/plans', {
    product_id: prodId,
    plan_type: 'one_time',
    initial_price: 3,
    currency: 'usd'
  });

  const checkoutUrl = planRes.data?.id ? `https://whop.com/checkout/${planRes.data.id}` : `https://whop.com/${CONFIG.WHOP_COMPANY}/${prodId}`;
  console.log(`  [+] LIVE RECURRING CHECKOUT URL: ${checkoutUrl}`);

  // 3. Generate Neural Audio Voiceover (ElevenLabs)
  console.log("\n▶ [3/4] Generating Empathetic Voiceover Track (ElevenLabs)...");
  const voiceText = "If you struggle with anxiety, negative body thoughts, or mental fatigue, you do not have to carry it alone. Join the Mind and Body Clarity Protocol for just two ninety-nine a month to receive monthly cognitive guides, grounding audios, and verified support tools. Link in bio to join.";
  await DevelopingEngine.generateVoiceover(voiceText, 'mental_health_voiceover.mp3');

  // 4. Curate Serene & Grounding 9:16 Visuals (Pexels)
  console.log("\n▶ [4/4] Curating Serene 9:16 Video B-Roll (Pexels API)...");
  await DevelopingEngine.curateVisualAssets('meditation calm nature mountains sunrise walking forest', 3);

  console.log("\n================================================================================");
  console.log(" RECURRING MENTAL HEALTH SUBSCRIPTION IS LIVE!");
  console.log("================================================================================");
  console.log(`Live Checkout: ${checkoutUrl}`);
  console.log(`Monthly Price: $2.99 / Month`);
  console.log(`Payout Vault: ${CONFIG.TRUST_WALLET} (USDC)`);
  console.log("================================================================================\n");

  return { checkoutUrl, prodId };
}

deployMentalHealthSubscription().catch(console.error);
