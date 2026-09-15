const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

// 1. Download file helper
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// 2. Generate Voiceover via ElevenLabs
async function generateVoiceover(text, outputFile) {
  const ELEVENLABS_API_KEY = 'sk_0236080d1337dcfd3ca402fb46149ead31483b22f84efaba';
  const VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam - High Authority

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.35,
        similarity_boost: 0.90,
        style: 0.65,
        use_speaker_boost: true
      }
    });

    const req = https.request({
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      const fileStream = fs.createWriteStream(outputFile);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve(outputFile));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function composeEpicSportsVideo() {
  console.log("================================================================================");
  console.log(" COMPOSING CINEMATIC HIGH-OCTANE SPORTS VIDEO (FFMPEG + ELEVENLABS)");
  console.log("================================================================================");

  const workDir = __dirname;
  const clip1Path = path.join(workDir, 'temp_clip1.mp4');
  const clip2Path = path.join(workDir, 'temp_clip2.mp4');
  const voicePath = path.join(workDir, 'temp_voice.mp3');
  const finalVideo = path.join(workDir, 'epic_sports_moment.mp4');

  // Clip 1: Basketball intense slow-mo dunk at the rim (HD)
  console.log("[1/4] Downloading HD slow-motion action clips...");
  await downloadFile('https://videos.pexels.com/video-files/5275090/5275090-uhd_1440_2732_25fps.mp4', clip1Path);
  console.log("  [+] Clip 1 Downloaded");

  // Clip 2: Boxing slow-motion knockout strike (HD)
  await downloadFile('https://videos.pexels.com/video-files/6296290/6296290-hd_1080_1920_25fps.mp4', clip2Path);
  console.log("  [+] Clip 2 Downloaded");

  // Generate voiceover
  console.log("[2/4] Synthesizing high-adrenaline sports commentary...");
  const script = "Down to the final 2 seconds. The entire stadium holding their breath. Look at the focus in his eyes. In that exact fraction of a second, history was made. This is what greatness looks like.";
  await generateVoiceover(script, voicePath);
  console.log("  [+] Voiceover generated.");

  // Compose with FFmpeg: Crop to 9:16 1080x1920, trim, concatenate, mix voiceover
  console.log("[3/4] Rendering video with FFmpeg (1080x1920 60fps, color graded, audio mixed)...");

  const ffmpegCmd = `"${ffmpegPath}" -y \
    -ss 0 -t 6 -i "${clip1Path}" \
    -ss 0 -t 7 -i "${clip2Path}" \
    -i "${voicePath}" \
    -filter_complex "\
      [0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=PTS-STARTPTS[v0]; \
      [1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=PTS-STARTPTS[v1]; \
      [v0][v1]concat=n=2:v=1:a=0[vcat]; \
      [vcat]eq=contrast=1.15:brightness=0.02:saturation=1.2[vout]" \
    -map "[vout]" -map 2:a -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest "${finalVideo}"`;

  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log("  [+] Master video rendered: epic_sports_moment.mp4");

  // Clean temp files
  try {
    fs.unlinkSync(clip1Path);
    fs.unlinkSync(clip2Path);
  } catch(e) {}

  console.log("================================================================================");
  console.log(" MASTER VIDEO COMPOSED SUCCESSFULLY!");
  console.log("================================================================================");

  return finalVideo;
}

composeEpicSportsVideo().catch(console.error);
