const https = require('https');
const fs = require('fs');

const WHOP_API_KEY = 'apik_4HmbI3T11AjDy_C6542743_C_ff65ce88fa72158180b77c39f86d7eccb1b3879b298fce3c5d2cc33383baa0';
const COMPANY_ID = 'biz_obArz3Gh8reOFR';

function whopPost(path, data) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(data);
    const req = https.request({
      hostname: 'api.whop.com',
      path: path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Sovereign-MegaDeployer/1.0',
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

async function main() {
  console.log("==========================================================");
  console.log(" DEPLOYING 100-ASSET MEGA-VAULT TO WHOP STOREFRONT");
  console.log("==========================================================");

  // 1. Create Product
  const pRes = await whopPost('/api/v1/products', {
    account_id: COMPANY_ID,
    title: "THE 100-ASSET SOVEREIGN MEGA-VAULT (2026 COMPLETE EDITION)"
  });

  if (pRes.status !== 200 && pRes.status !== 201) {
    console.error("[-] Product creation failed:", pRes);
    return;
  }

  const prodId = pRes.data.id;
  console.log(`[+] Whop Mega-Product Created: ${prodId}`);

  // 2. Create Pricing Plan ($49)
  const planRes = await whopPost('/api/v1/plans', {
    product_id: prodId,
    plan_type: 'one_time',
    initial_price: 49,
    currency: 'usd'
  });

  const checkoutUrl = planRes.data?.id ? `https://whop.com/checkout/${planRes.data.id}` : `https://whop.com/${COMPANY_ID}/${prodId}`;
  console.log(`[+] LIVE 100-IN-1 CHECKOUT URL: ${checkoutUrl}`);
}

main().catch(console.error);
