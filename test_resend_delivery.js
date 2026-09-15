const https = require('https');

const postData = JSON.stringify({
  from: 'Sovereign AI Systems <onboarding@resend.dev>',
  to: ['johncreation72@gmail.com'],
  subject: ' Sovereign AI Command: B2B Strike Dispatched & Live',
  text: `Your Sovereign AI Autonomous Strike is active!\n\nTarget Pipeline: 24/7 AI Receptionist & Missed-Call Recapture Offer\nValue: $497 per client\nPayout Wallet: 0x2582056084f361d8E8A3b8864b9566071878FfD2 (USDC)\n\nLive Demo: https://sovereign-empire-os-ub2.vercel.app\nTelegram Bot: https://t.me/sovereign_ai_hub_bot`
});

const req = https.request({
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer process.env.RESEND_API_KEY || ""',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Resend Response:', res.statusCode, body));
});

req.on('error', console.error);
req.write(postData);
req.end();
