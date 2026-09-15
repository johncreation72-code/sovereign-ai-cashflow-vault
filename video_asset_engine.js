/**
 * SOVEREIGN // Autonomous Video & Media Asset Engine
 * Auto-Fetches 9:16 Vertical Video Footage via Pexels API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PEXELS_API_KEY = 'kUmLn04uk8oYohA9sFPzRxTY4PDGAkqkAHeu7Uu3COfwVFFBFgnxU3Zn';

function searchVideos(query = 'dark luxury technology', perPage = 5) {
  return new Promise((resolve) => {
    const encodedQuery = encodeURIComponent(query);
    const req = https.request({
      hostname: 'api.pexels.com',
      path: `/videos/search?query=${encodedQuery}&per_page=${perPage}&orientation=portrait`,
      method: 'GET',
      headers: {
        'Authorization': PEXELS_API_KEY,
        'User-Agent': 'Sovereign-MediaEngine/1.0'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ error: true, raw: body });
        }
      });
    });

    req.on('error', err => resolve({ error: true, message: err.message }));
    req.end();
  });
}

async function main() {
  console.log("==========================================================");
  console.log(" SOVEREIGN AUTONOMOUS VIDEO & STOCK MEDIA ENGINE");
  console.log("==========================================================");
  console.log("Query: 'dark luxury technology' (Portrait 9:16 for TikTok/Shorts)");
  console.log("Key: kUmLn04... (Verified)\n");

  const results = await searchVideos('dark luxury tech code', 4);

  if (results.videos && results.videos.length > 0) {
    console.log(`[+] SUCCESS! Found ${results.videos.length} HD Vertical Video Clips:\n`);
    const clips = results.videos.map((v, i) => {
      const bestFile = v.video_files.find(f => f.quality === 'hd' && f.width <= 1080) || v.video_files[0];
      return {
        id: v.id,
        duration: `${v.duration}s`,
        previewImg: v.image,
        videoUrl: bestFile.link
      };
    });

    clips.forEach((c, idx) => {
      console.log(`Clip #${idx+1} (${c.duration}):`);
      console.log(`  Preview: ${c.previewImg}`);
      console.log(`  Download URL: ${c.videoUrl}\n`);
    });

    fs.writeFileSync('ready_video_clips.json', JSON.stringify(clips, null, 2));
    console.log("[+] Ready-to-post video assets saved to ready_video_clips.json");
  } else {
    console.log("Response:", results);
  }
}

main().catch(console.error);
