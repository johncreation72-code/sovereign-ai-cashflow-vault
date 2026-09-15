/**
 * ==============================================================================
 * SOVEREIGN // ZERNIO AUTONOMOUS SOCIAL PUBLISHER (TIKTOK + INSTAGRAM)
 * ==============================================================================
 * 100% Free 2-Channel Autonomous Broadcast Engine:
 * - TikTok: @clipsonclips106 (ID: 6aa85c01726ebfe037ed4746)
 * - Instagram: @john1631315 (ID: 6aa85cbe726ebfe037ed4b5d)
 * ==============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ZERNIO_CONFIG = {
  API_KEY: process.env.ZERNIO_API_KEY || 'sk_0ecdb52eb6332f8fb0f50db55daa7217c24665dacbb826bd300abfb851482593',
  TIKTOK_ACCOUNT_ID: '6aa85c01726ebfe037ed4746',
  INSTAGRAM_ACCOUNT_ID: '6aa85cbe726ebfe037ed4b5d',
  TIKTOK_USER: 'clipsonclips106',
  INSTAGRAM_USER: 'john1631315'
};

function getConnectedAccounts(apiKey = ZERNIO_CONFIG.API_KEY) {
  return new Promise((resolve) => {
    if (!apiKey) return resolve({ success: false, error: 'NO_API_KEY' });

    const req = https.request({
      hostname: 'zernio.com',
      path: '/api/v1/accounts',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ success: res.statusCode >= 200 && res.statusCode < 300, accounts: json.accounts || json });
        } catch (e) {
          resolve({ success: false, error: body });
        }
      });
    });

    req.on('error', err => resolve({ success: false, error: err.message }));
    req.end();
  });
}

function publishDualBroadcast({ content, videoUrl, publishNow = true, scheduledDate = null }) {
  return new Promise((resolve) => {
    const payload = {
      content,
      mediaItems: [{ type: "video", url: videoUrl }],
      platforms: [
        {
          platform: "tiktok",
          accountId: ZERNIO_CONFIG.TIKTOK_ACCOUNT_ID,
          platformSpecificData: {
            tiktokSettings: {
              privacy_level: "PUBLIC_TO_EVERYONE",
              allow_comments: true,
              allow_duet: true,
              allow_stitch: true
            }
          }
        },
        {
          platform: "instagram",
          accountId: ZERNIO_CONFIG.INSTAGRAM_ACCOUNT_ID,
          platformSpecificData: {
            instagramSettings: {
              mediaType: "REELS"
            }
          }
        }
      ],
      publishNow,
      ...(scheduledDate && { scheduledDate })
    };

    const postData = JSON.stringify(payload);

    const req = https.request({
      hostname: 'zernio.com',
      path: '/api/v1/posts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ZERNIO_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          console.log(`[ZERNIO // DUAL BROADCAST] Status: ${res.statusCode} | Result: ${json.message || 'Dispatched'}`);
          resolve({ success: res.statusCode >= 200 && res.statusCode < 300, data: json });
        } catch (e) {
          resolve({ success: false, error: body });
        }
      });
    });

    req.on('error', err => resolve({ success: false, error: err.message }));
    req.write(postData);
    req.end();
  });
}

module.exports = { ZERNIO_CONFIG, getConnectedAccounts, publishDualBroadcast };
