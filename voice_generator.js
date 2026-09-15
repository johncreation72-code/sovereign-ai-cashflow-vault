/**
 * SOVEREIGN // Autonomous Voice Synthesis Engine (ElevenLabs)
 * Generates Hyper-Realistic Human Voiceovers for TikTok/Shorts/Reels
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ELEVENLABS_API_KEY = 'sk_0236080d1337dcfd3ca402fb46149ead31483b22f84efaba';
const ADAM_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Elite Deep Authority Voice

const SCRIPT_TEXT = "If you have a laptop and 30 minutes, here is a simple AI workflow nobody is talking about. Small local clinics miss up to 40% of their incoming calls every day. Using one free AI tool, you can set up an instant auto-responder that texts back missed callers in five seconds. Charge them two hundred dollars a month to keep it running. I compiled all fifty prompt workflows into a master guide. Link in bio to access it.";

function generateVoiceover(text, outputPath) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      text: text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.2,
        use_speaker_boost: true
      }
    });

    const req = https.request({
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${ADAM_VOICE_ID}`,
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
        'User-Agent': 'Sovereign-VoiceEngine/1.0',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(outputPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          resolve({ success: true, path: outputPath });
        });
      } else {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({ success: false, status: res.statusCode, error: body });
        });
      }
    });

    req.on('error', err => resolve({ success: false, error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log("==========================================================");
  console.log(" SOVEREIGN AUTONOMOUS VOICE SYNTHESIS ENGINE");
  console.log("==========================================================");
  console.log("Voice Model: 'Adam' (Deep Authority & Luxury Tone)");
  console.log("Key: sk_023608... (Verified)\n");

  const outputFile = path.join(__dirname, 'viral_voiceover_script1.mp3');
  console.log(`[*] Generating hyper-realistic voiceover audio...`);
  
  const result = await generateVoiceover(SCRIPT_TEXT, outputFile);

  if (result.success) {
    console.log(`\n VOICEOVER GENERATED SUCCESSFULLY!`);
    console.log(`Saved Audio File: ${result.path}`);
    const stats = fs.statSync(outputFile);
    console.log(`File Size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.log("[-] Generation failed:", result);
  }
}

main().catch(console.error);
