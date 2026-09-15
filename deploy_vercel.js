const https = require('https');
const fs = require('fs');
const path = require('path');

const VERCEL_TOKEN = 'process.env.VERCEL_TOKEN || ""';
const PROJECT_NAME = 'sovereign-empire-os';
const WORKDIR = __dirname;

function getAllDeployableFiles(dir, baseDir = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(baseDir, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && !entry.name.startsWith('.whatsapp')) {
        results = results.concat(getAllDeployableFiles(fullPath, relPath));
      }
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size > 5 * 1024 * 1024 || entry.name.includes('global_dynamic_lead_vault')) {
        continue;
      }
      if (entry.name.endsWith('.html') || entry.name.endsWith('.css') || entry.name.endsWith('.js') || entry.name.endsWith('.json') || entry.name.endsWith('.jpg') || entry.name.endsWith('.png') || entry.name.endsWith('.mp3')) {
        if (!entry.name.includes('daemon') && !entry.name.includes('bot') && !entry.name.includes('package-lock')) {
          results.push({
            file: relPath,
            data: fs.readFileSync(fullPath).toString('base64'),
            encoding: 'base64'
          });
        }
      }
    }
  }
  return results;
}

async function deployToVercel() {
  console.log("==========================================================");
  console.log(" DEPLOYING SOVEREIGN OS TO PRODUCTION ON VERCEL (FULL ASSET TREE)");
  console.log("==========================================================");

  const files = getAllDeployableFiles(WORKDIR);
  console.log(`Prepared ${files.length} production files & executive audit reports for Vercel deployment.`);

  const postData = JSON.stringify({
    name: PROJECT_NAME,
    files: files,
    target: 'production',
    projectSettings: { framework: null }
  });

  const req = https.request({
    hostname: 'api.vercel.com',
    path: '/v13/deployments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Sovereign-VercelDeployer/3.0',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log("Deployment Status:", res.statusCode);
        console.log("Public Production URL:", `https://${data.url}`);
        if (data.alias) {
          data.alias.forEach(a => console.log(`Primary Alias: https://${a}`));
        }
      } catch (e) {
        console.log("Raw Response:", body);
      }
    });
  });

  req.on('error', console.error);
  req.write(postData);
  req.end();
}

deployToVercel().catch(console.error);
