/**
 * SOVEREIGN TELEGRAM AUTONOMOUS BROADCASTER & SALES BOT
 * 24/7/365 Lead Capture, Prompt Deliveries & Whop Checkout Funnel
 */

const https = require('https');

const BOT_TOKEN = '8885647741:AAEWDIgaZyN2glGdNIcgmIeFpnBv4l74S9I';
const STORE_LINK = 'https://whop.com/checkout/plan_UL1yNCSJUr2Ka';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

function tgRequest(endpoint, data = {}) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(data);
    const u = new URL(`${API_URL}/${endpoint}`);
    
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ ok: false, raw: body });
        }
      });
    });

    req.on('error', err => resolve({ ok: false, error: err.message }));
    req.write(postData);
    req.end();
  });
}

// Bot Command Dispatcher
async function handleUpdate(update) {
  if (!update.message || !update.message.text) return;

  const chatId = update.message.chat.id;
  const text = update.message.text.trim();
  const firstName = update.message.from.first_name || 'Member';

  console.log(`[+] Incoming message from ${firstName} (${chatId}): ${text}`);

  if (text.startsWith('/start')) {
    const welcomeMsg = ` <b>WELCOME TO SOVEREIGN AI LABS</b>\n\n` +
      `Hello ${firstName},\n\n` +
      `You have entered the private intelligence network for high-leverage AI automation, cashflow systems, and enterprise prompt engineering.\n\n` +
      ` <b>YOUR FREE STARTER PACK:</b>\n` +
      `• <i>Workflow #1:</i> Local Clinic Missed-Call Auto-Responder\n` +
      `• <i>Workflow #2:</i> Real Estate Multi-Asset Listing Engine\n` +
      `• <i>Workflow #3:</i> Negative Review Competitor Extraction\n\n` +
      ` <b>THE MASTER SYSTEM:</b>\n` +
      `To unlock the complete <b>50 Copy-Paste AI Cashflow Workflows & Systems ($100–$300/Day)</b>, access the official blueprint below.\n\n` +
      `Instant delivery with Apple Pay, Google Pay, Cards, or Crypto:`;

    await tgRequest('sendMessage', {
      chat_id: chatId,
      text: welcomeMsg,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ' Get The 2026 AI Cashflow Blueprint ($29)',
              url: STORE_LINK
            }
          ],
          [
            {
              text: ' View Sovereign Command Hub',
              url: 'https://whop.com'
            }
          ]
        ]
      }
    });
  } else if (text.startsWith('/blueprint') || text.toLowerCase().includes('blueprint')) {
    await tgRequest('sendMessage', {
      chat_id: chatId,
      text: ` <b>The 2026 AI Cashflow Blueprint ($29.00)</b>\n\n50 copy-paste prompt workflows, local B2B retainers, and faceless media arbitrage systems.\n\n Click below for instant access:`,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: ' Instant Checkout ($29)', url: STORE_LINK }]
        ]
      }
    });
  }
}

// Long-polling loop for 24/7 background execution
let lastUpdateId = 0;

async function poll() {
  try {
    const res = await tgRequest('getUpdates', {
      offset: lastUpdateId + 1,
      timeout: 30
    });

    if (res.ok && Array.isArray(res.result)) {
      for (const update of res.result) {
        lastUpdateId = update.update_id;
        await handleUpdate(update);
      }
    }
  } catch (err) {
    console.error('Polling error:', err);
  }
  setTimeout(poll, 1000);
}

async function main() {
  console.log(" Checking Telegram Bot identity...");
  const me = await tgRequest('getMe');
  
  if (!me.ok) {
    console.error("[-] Failed to connect to Telegram Bot. Error:", me);
    return;
  }

  console.log(`\n TELEGRAM BOT CONNECTED SUCCESSFULLY!`);
  console.log(`Bot Name: ${me.result.first_name}`);
  console.log(`Bot Username: @${me.result.username}`);
  console.log(`Direct Telegram Link: https://t.me/${me.result.username}`);
  console.log(`Store Destination: ${STORE_LINK}`);
  console.log(`\n 24/7 Polling loop active. Listening for leads and buyers...`);

  poll();
}

main();
