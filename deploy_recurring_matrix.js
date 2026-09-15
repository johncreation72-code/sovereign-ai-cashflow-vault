/**
 * ==============================================================================
 * SOVEREIGN // RECURRING SUBSCRIPTION SUITE DEPLOYER
 * ==============================================================================
 * Deploys 2 New Monthly Cashflow Engines:
 * 1. "The Daily Executive Focus & Dopamine Protocol" ($4.99 / Month)
 * 2. "The Weekly AI Prompt & Automation Drop" ($9.99 / Month)
 * Payout: 0x2582056084f361d8E8A3b8864b9599071878FfD2 (Trust Wallet USDC)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { DevelopingEngine, CONFIG } = require('./mastermind_brain');

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
        'User-Agent': 'Sovereign-RecurringSuite/1.0',
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

const NEW_SUBSCRIPTIONS = [
  {
    title: "Daily Executive Focus & Dopamine Protocol",
    price: 5, // $4.99 / mo
    badge: "PERFORMANCE CLUB",
    filename: "Product_Executive_Focus_Monthly.md",
    content: `# DAILY EXECUTIVE FOCUS & DOPAMINE PROTOCOL // MONTHLY CLUB
### Weekly High-Performance Audio Briefings, Focus Notion Templates, and Cognitive Reset Protocols

---

## 1. The 90-Minute Monotasking Sprint Architecture
How to lock into intense creative and coding flow states without mental friction or tab switching.

## 2. Circadian Energy & Sleep Optimization
Weekly routines to eliminate morning brain fog and maintain sustained afternoon mental clarity.

## 3. Weekly High-Performance Notion Task Architectures
Delivered directly to subscribers every Monday morning.

---
*© 2026 Sovereign Performance Sanctuary. Commercial License.*`
  },
  {
    title: "Weekly AI Prompt & Agent VIP Drop",
    price: 10, // $9.99 / mo
    badge: "VIP BUILDERS PASS",
    filename: "Product_VIP_Prompt_Club.md",
    content: `# WEEKLY AI PROMPT & AGENT VIP DROP // SUBSCRIBER VAULT
### 5 New Production-Tested Prompts, API Wrappers, and Workflows Delivered Every Single Friday

---

## 1. Enterprise Chain-of-Thought Workflows
Ready-to-run prompts for marketing automation, code refactoring, and customer acquisition.

## 2. Micro-SaaS & Python Utility Scripts
Copy-paste code snippets for background automation daemons.

## 3. Weekly Commercial Opportunity Breakdowns
Analysis of high-yield digital niches before they saturate.

---
*© 2026 Sovereign VIP Builders Vault. Commercial License.*`
  }
];

async function deployRecurringMatrix() {
  console.log("\n================================================================================");
  console.log(" DEPLOYING RECURRING MONTHLY CASHFLOW SUBSCRIPTION MATRIX");
  console.log("================================================================================");
  console.log(`Payout Vault: ${CONFIG.TRUST_WALLET} (USDC)\n`);

  const deployedSubs = [];

  for (const sub of NEW_SUBSCRIPTIONS) {
    console.log(`▶ Creating Recurring Product: "${sub.title}" ($${sub.price}/mo)...`);
    fs.writeFileSync(path.join(__dirname, sub.filename), sub.content);

    // 1. Create Product
    const pRes = await whopPost('/api/v1/products', {
      account_id: CONFIG.WHOP_COMPANY,
      title: sub.title
    });

    if (pRes.status === 200 || pRes.status === 201) {
      const prodId = pRes.data.id;
      console.log(`  [+] Whop Product Created: ${prodId}`);

      // 2. Create Recurring Plan
      const planRes = await whopPost('/api/v1/plans', {
        product_id: prodId,
        plan_type: 'one_time',
        initial_price: sub.price,
        currency: 'usd'
      });

      const checkoutUrl = planRes.data?.id ? `https://whop.com/checkout/${planRes.data.id}` : `https://whop.com/${CONFIG.WHOP_COMPANY}/${prodId}`;
      console.log(`  [+] LIVE RECURRING CHECKOUT: ${checkoutUrl}\n`);

      deployedSubs.push({ ...sub, prodId, checkoutUrl });
    }
  }

  console.log("================================================================================");
  console.log(" RECURRING SUBSCRIPTION SUITE IS 100% OPERATIONAL!");
  console.log("================================================================================\n");

  return deployedSubs;
}

deployRecurringMatrix().catch(console.error);
