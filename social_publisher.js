/**
 * ==============================================================================
 * SOVEREIGN // AUTONOMOUS MULTI-PLATFORM SOCIAL PUBLISHER
 * ==============================================================================
 * Automates multi-channel distribution across:
 * - YouTube Shorts (YouTube Data API v3 / Webhook)
 * - TikTok (TikTok Content Posting API / Make Webhook)
 * - Instagram Reels (Meta Graph API / Webhook)
 * - Facebook Video (Graph API / Webhook)
 * ==============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Webhook & Social Configuration (Free Tier Webhook Bridge via Make/Ayrshare/Buffer)
const SOCIAL_CONFIG = {
  // Free Webhook bridge that broadcasts to YouTube + TikTok + IG + FB in 1 shot
  WEBHOOK_URL: process.env.SOCIAL_WEBHOOK_URL || '',
  AYRSHARE_API_KEY: process.env.AYRSHARE_KEY || '',
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || ''
};

function postToWebhook(webhookUrl, payload) {
  return new Promise((resolve) => {
    if (!webhookUrl) {
      console.log(`[SOCIAL // NOTICE] Social Webhook URL not set yet. Staging payload locally in ready_social_queue.json.`);
      return resolve({ success: false, staged: true });
    }

    try {
      const url = new URL(webhookUrl);
      const postData = JSON.stringify(payload);

      const req = https.request({
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'Sovereign-SocialEngine/1.0'
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log(`[SOCIAL // WEBHOOK] Broadcast response status: ${res.statusCode}`);
          resolve({ success: res.statusCode >= 200 && res.statusCode < 300, data: body });
        });
      });

      req.on('error', err => resolve({ success: false, error: err.message }));
      req.write(postData);
      req.end();
    } catch (e) {
      resolve({ success: false, error: e.message });
    }
  });
}

async function publishSocialBroadcast({ title, caption, videoUrl, voiceoverPath, hashtags, productCheckoutUrl }) {
  console.log("\n================================================================================");
  console.log(" SOVEREIGN 4-PLATFORM SOCIAL BROADCAST ENGINE");
  console.log("================================================================================");
  console.log(`Targeting: [YouTube Shorts] + [TikTok] + [Instagram Reels] + [Facebook]`);
  console.log(`Title: "${title}"`);

  const payload = {
    title,
    caption: `${caption}\n\n Access the full master system:\n${productCheckoutUrl}\n\n${hashtags.join(' ')}`,
    videoUrl,
    voiceover: voiceoverPath,
    platforms: ['youtube', 'tiktok', 'instagram', 'facebook'],
    scheduledTime: 'immediate',
    generatedAt: new Date().toISOString()
  };

  // 1. Stage in local queue
  const queuePath = path.join(__dirname, 'ready_social_queue.json');
  let currentQueue = [];
  if (fs.existsSync(queuePath)) {
    try { currentQueue = JSON.parse(fs.readFileSync(queuePath, 'utf8')); } catch (e) {}
  }
  currentQueue.unshift(payload);
  fs.writeFileSync(queuePath, JSON.stringify(currentQueue, null, 2));
  console.log(`[+] Broadcast staged in ready_social_queue.json`);

  // 2. Dispatch to live webhook if configured
  if (SOCIAL_CONFIG.WEBHOOK_URL) {
    const res = await postToWebhook(SOCIAL_CONFIG.WEBHOOK_URL, payload);
    return res;
  } else {
    console.log(`[+] Auto-Broadcast package prepared & formatted for YouTube, TikTok, Instagram & Facebook.`);
    return { success: true, staged: true, queueLength: currentQueue.length };
  }
}

module.exports = { publishSocialBroadcast, SOCIAL_CONFIG };
