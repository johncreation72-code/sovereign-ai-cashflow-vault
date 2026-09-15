const https = require('https');

const VERCEL_TOKEN = 'process.env.VERCEL_TOKEN || ""';
const PROJECT_NAME = 'sovereign-empire-os';

function api(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Sovereign-Fix/1.0',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, (res) => {
      let b = '';
      res.on('data', chunk => b += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(b) }); }
        catch (e) { resolve({ status: res.statusCode, raw: b }); }
      });
    });
    req.on('error', err => resolve({ error: err.message }));
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  console.log("Checking Vercel project settings for sovereign-empire-os...");
  const proj = await api(`/v9/projects/${PROJECT_NAME}`);
  console.log("Project info:", proj.status, proj.data?.id, proj.data?.name);
  console.log("Password Protection:", proj.data?.passwordProtection);
  console.log("SSO Protection:", proj.data?.ssoProtection);
  console.log("Target:", proj.data?.targets);

  // Disable Deployment Protection so anyone can see the dashboard publicly with 0 login
  console.log("\nDisabling Vercel deployment protection / SSO restrictions...");
  const updateRes = await api(`/v9/projects/${PROJECT_NAME}`, 'PATCH', {
    passwordProtection: null,
    ssoProtection: null
  });
  console.log("Update status:", updateRes.status);
}

main().catch(console.error);
