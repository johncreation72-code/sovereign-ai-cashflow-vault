const fs = require('fs');
const path = require('path');

const blitzFile = path.join(__dirname, 'blitz_active_leads.json');
const blitzLeads = JSON.parse(fs.readFileSync(blitzFile, 'utf8'));

console.log(`[+] Loaded ${blitzLeads.length} leads to format for UI...`);

// Format for app.js
const uiLeads = blitzLeads.map((l, i) => ({
  id: `blitz_lead_${i + 1}`,
  name: l.name,
  position: l.position,
  company: l.company,
  industry: l.industry,
  email: l.email,
  confidence: l.confidence,
  tier: l.position.toLowerCase().includes('ceo') || l.position.toLowerCase().includes('cmo') || l.position.toLowerCase().includes('founder') || l.position.toLowerCase().includes('owner') ? 1 : 2,
  tierLabel: (l.position.toLowerCase().includes('ceo') || l.position.toLowerCase().includes('cmo') || l.position.toLowerCase().includes('founder') || l.position.toLowerCase().includes('owner') ? ' Tier 1: C-Suite / Owner' : ' Tier 2: VP / Director'),
  priorityScore: l.confidence > 95 ? 98 : 92,
  personalizedPitch: l.pitch
}));

// Update app.js
let appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const leadsRegex = /this\.leads\s*=\s*\[[\s\S]*?\];/;
appJs = appJs.replace(leadsRegex, `this.leads = ${JSON.stringify(uiLeads, null, 2)};`);

fs.writeFileSync(path.join(__dirname, 'app.js'), appJs);
console.log('[+] app.js successfully synchronized with all 13 active leads!');
