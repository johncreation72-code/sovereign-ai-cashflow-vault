const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || (fs.existsSync(path.join(__dirname, '.token')) ? fs.readFileSync(path.join(__dirname, '.token'), 'utf8').trim() : '');
const PROJECT_NAME = 'sovereign-empire-os';
const WORKDIR = __dirname;

function getAllDeployableFiles(dir, baseDir = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(baseDir, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.vercel'].includes(entry.name) && !entry.name.startsWith('.whatsapp') && !entry.name.startsWith('.')) {
        results = results.concat(getAllDeployableFiles(fullPath, relPath));
      }
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size > 35 * 1024 * 1024 || entry.name === 'global_dynamic_lead_vault.json') {
        continue;
      }
      const allowedExts = ['.html', '.css', '.js', '.json', '.jpg', '.jpeg', '.png', '.mp3', '.svg', '.webp'];
      const ext = path.extname(entry.name).toLowerCase();
      if (allowedExts.includes(ext) && !entry.name.includes('package-lock')) {
        const buffer = fs.readFileSync(fullPath);
        const sha = crypto.createHash('sha1').update(buffer).digest('hex');
        results.push({
          file: relPath,
          fullPath: fullPath,
          sha: sha,
          size: stats.size,
          buffer: buffer
        });
      }
    }
  }
  return results;
}

function uploadFileToVercel(fileObj) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vercel.com',
      path: '/v2/files',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileObj.buffer.length,
        'x-vercel-digest': fileObj.sha
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 409) {
          resolve({ file: fileObj.file, sha: fileObj.sha, status: res.statusCode });
        } else {
          console.warn(`File upload issue [${fileObj.file}]: HTTP ${res.statusCode} - ${body}`);
          resolve({ file: fileObj.file, sha: fileObj.sha, status: res.statusCode, body });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`Error uploading ${fileObj.file}:`, err);
      reject(err);
    });

    req.write(fileObj.buffer);
    req.end();
  });
}

async function createDeployment(files) {
  return new Promise((resolve, reject) => {
    const deploymentPayload = JSON.stringify({
      name: PROJECT_NAME,
      files: files.map(f => ({
        file: f.file,
        sha: f.sha,
        size: f.size
      })),
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
        'Content-Length': Buffer.byteLength(deploymentPayload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve({ status: res.statusCode, data });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    req.write(deploymentPayload);
    req.end();
  });
}

async function run() {
  console.log('==========================================================');
  console.log(' DEPLOYING SOVEREIGN OS TO PRODUCTION VIA VERCEL SHA UPLOADER');
  console.log('==========================================================');

  const files = getAllDeployableFiles(WORKDIR);
  console.log(`Found ${files.length} production assets to process.`);

  console.log('Uploading individual assets to Vercel global CDN cache...');
  const CHUNK_SIZE = 10;
  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const chunk = files.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(f => uploadFileToVercel(f)));
  }
  console.log('All assets cached successfully.');

  console.log('Triggering production deployment instantiation...');
  const result = await createDeployment(files);
  console.log('HTTP Deployment Status:', result.status);

  if (result.data) {
    console.log('Deployment ID:', result.data.id);
    console.log('Production URL: https://' + result.data.url);
    if (result.data.alias && result.data.alias.length > 0) {
      console.log('Aliases:');
      result.data.alias.forEach(a => console.log(` - https://${a}`));
    }
  } else {
    console.log('Raw output:', result);
  }
}

run().catch(console.error);
