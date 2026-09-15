/**
 * ==============================================================================
 * SOVEREIGN // CLIENT-SIDE INTERACTIVE TOOLS & CONVERSION FLYWHEEL
 * Enterprise Standard: Zero Emojis, Crisp Typography, Direct Fulfillment
 * ==============================================================================
 */

// 1. Viral Retention Hook Generator
const HOOK_DATABASE = {
  sports: [
    "Physics completely failed on this maneuver.",
    "This was the single most unbelievable final 10 seconds in professional sports history.",
    "Only 3 athletes have ever successfully landed this drop.",
    "Observe the angle of the feet right before the impact."
  ],
  memes: [
    "There was zero calculation behind this decision.",
    "Watching this in slow motion makes it even more incomprehensible.",
    "The confidence before attempting this was a 10 out of 10.",
    "When the solution creates an entirely new problem."
  ],
  cinema: [
    "This unscripted line forced the director to keep the cameras rolling.",
    "The subtle background detail in this scene that everyone missed.",
    "The precise moment this entire storyline changed."
  ],
  fitness: [
    "If you consume these 3 foods before sleeping, you reduce nighttime metabolic fat oxidation.",
    "The single biggest mechanical mistake preventing visible core definition.",
    "How to reset cortisol levels in 48 hours to shed stubborn water retention."
  ],
  business: [
    "The exact AI architecture used to run an automated $300/day holding operations company.",
    "Why traditional agency retainers are being replaced by autonomous micro-software.",
    "The 3-pillar workflow behind autonomous contractor operations."
  ]
};

function generateViralHook() {
  const niche = document.getElementById('hook-niche').value;
  const list = HOOK_DATABASE[niche] || HOOK_DATABASE.sports;
  const hook = list[Math.floor(Math.random() * list.length)];
  
  const resultDiv = document.getElementById('hook-result');
  resultDiv.innerHTML = `
    <div class="generated-hook-box">
      <div class="hook-text">"${hook}"</div>
      <button onclick="navigator.clipboard.writeText('${hook}'); alert('Copied hook to clipboard.');" class="copy-btn">Copy Hook to Clipboard</button>
      <div class="hook-upsell">Access 500+ verified algorithmic hooks: <a href="https://whop.com/checkout/plan_RWVib9wHWNtT5" target="_blank">Unlock 100-in-1 Mega Vault ($49)</a></div>
    </div>
  `;
}

// 2. Targeted B2B Proposal Generator
const COLD_PITCHES = {
  dental: {
    subject: "Inquiry regarding after-hours patient call handling",
    body: "Hi team, I noticed your clinic does not currently utilize an automated response system for after-hours patient inquiries. We deployed an AI receptionist that answers 100% of missed calls and schedules cleanings directly into your calendar. We provide a 7-day trial with zero setup fee. Open to a 2-minute overview?"
  },
  realestate: {
    subject: "Automated buyer qualification for active property listings",
    body: "Hi, regarding your current luxury listings: We deployed an automated lead filter that pre-qualifies local buyers and notifies your agents only when a verified buyer is ready to tour. We are happy to set this up for your team free of charge to test on your next 5 inquiries. Let me know if you would like to see a brief demo."
  },
  ecommerce: {
    subject: "Addressing checkout dropoff and abandoned cart recovery",
    body: "Hi team, noticed your checkout process is missing an automated SMS re-engagement sequence that typically recovers 12% to 18% of abandoned carts. We built a direct webhook integration that automates this workflow. Happy to share the documentation if relevant to your team."
  }
};

function generateColdEmail() {
  const ind = document.getElementById('email-industry').value;
  const pitch = COLD_PITCHES[ind] || COLD_PITCHES.dental;
  
  const resultDiv = document.getElementById('email-result');
  resultDiv.innerHTML = `
    <div class="generated-email-box">
      <div class="email-subject"><strong>Subject:</strong> ${pitch.subject}</div>
      <div class="email-body">${pitch.body}</div>
      <button onclick="navigator.clipboard.writeText('${pitch.body}'); alert('Copied proposal copy.');" class="copy-btn">Copy Proposal Copy</button>
      <div class="email-upsell">Need the full Twilio and GPT-4o voice software? <a href="https://whop.com/checkout/plan_7Yyq1q3piMsk6" target="_blank">Get B2B AI Receptionist Suite ($97)</a></div>
    </div>
  `;
}

// 3. Metabolic Calculator
function calculateMacros() {
  const w = parseFloat(document.getElementById('calc-weight').value) || 75;
  const h = parseFloat(document.getElementById('calc-height').value) || 178;
  
  const bmr = Math.round(10 * w + 6.25 * h - 5 * 25 + 5);
  const maintenance = Math.round(bmr * 1.4);
  const deficitCal = maintenance - 500;
  const protein = Math.round(w * 2.0);

  const resultDiv = document.getElementById('macro-result');
  resultDiv.innerHTML = `
    <div class="generated-macro-box">
      <div class="macro-grid">
        <div class="macro-item"><strong>${deficitCal} kcal</strong><span>Fat-Loss Target</span></div>
        <div class="macro-item"><strong>${protein}g</strong><span>Daily Protein</span></div>
        <div class="macro-item"><strong>${maintenance} kcal</strong><span>Maintenance</span></div>
      </div>
      <div class="macro-upsell" style="margin-top: 10px;">Access the complete 30-day metabolic reset protocol: <a href="https://whop.com/checkout/plan_pOXJXOy4WncPn" target="_blank">Unlock 30-Day Protocol ($27)</a></div>
    </div>
  `;
}

// 4. SiteCommand Contractor Simulator
function simulateContractorCommand() {
  const jobType = document.getElementById('contractor-job-type').value || 'loft';
  const rawValue = parseFloat(document.getElementById('contractor-job-value').value) || 45000;
  
  const jurMgr = window.sovereignJurisdiction || {
    formatMoney: (g) => "£" + Math.round(g).toLocaleString("en-GB"),
    formatLocalExact: (a) => "£" + Math.round(a).toLocaleString("en-GB"),
    get: () => ({ symbol: "£", rateFromGBP: 1.0, taxScheme: "HMRC CIS" })
  };
  const jur = jurMgr.get();

  const deposit = Math.round(rawValue * 0.25);
  const materials = Math.round(rawValue * 0.32);
  const labor = Math.round(rawValue * 0.35);
  const projectedNet = rawValue - materials - labor;
  const netMargin = Math.round((projectedNet / rawValue) * 100);

  const resultDiv = document.getElementById('contractor-result');
  resultDiv.innerHTML = `
    <div class="generated-macro-box" style="text-align: left;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #1E40AF; font-weight: 700; margin-bottom: 8px;">60-SECOND PROPOSAL SUMMARY:</div>
      <div style="background: #F1F5F9; padding: 12px; border-radius: 6px; border: 1px solid #CBD5E1; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; color: #1E293B; margin-bottom: 12px; line-height: 1.6;">
        Total Contract Value: ${jurMgr.formatLocalExact(rawValue)}<br>
        Required Deposit (25%): ${jurMgr.formatLocalExact(deposit)}<br>
        Budgeted Materials: ${jurMgr.formatLocalExact(materials)}<br>
        Budgeted Subcontractor Labor: ${jurMgr.formatLocalExact(labor)}<br>
        Projected Net Profit: <strong>${jurMgr.formatLocalExact(projectedNet)} (${netMargin}% Net Margin)</strong><br>
        Tax Compliance Engine: ${jur.taxScheme}<br>
        Subcontractor Attendance: Verified Geofenced Check-In<br>
        Daily Client Update: Scheduled for 16:30 PM
      </div>
      <button onclick="navigator.clipboard.writeText('Hi Dave, are you still looking to proceed with the project?'); alert('Copied 9-Word Reactivation Copy.');" class="copy-btn">Copy 9-Word Reactivation Copy</button>
      <div class="macro-upsell" style="margin-top: 10px;">Deploy SiteCommand OS for your contracting business: <a href="https://whop.com/checkout/plan_JLfIPcacfHZZJ" target="_blank">Activate Contractor Plan ($97/Month)</a></div>
    </div>
  `;
}

function updateMasterROI(val) {
  const turnover = parseFloat(val) || 50000;
  const jurMgr = window.sovereignJurisdiction || {
    get: () => ({ symbol: "£" })
  };
  const sym = jurMgr.get().symbol;
  
  // Realistic trade math: 5.5% operational recovery from recovered quotes and prevented leakages
  const recovered = Math.round(turnover * 0.055);
  const annual = recovered * 12;

  const tElem = document.getElementById('display-master-turnover');
  const rElem = document.getElementById('display-master-recovered');
  const aElem = document.getElementById('display-master-annual');

  if (tElem) tElem.innerText = sym + turnover.toLocaleString('en-GB');
  if (rElem) rElem.innerText = '+' + sym + recovered.toLocaleString('en-GB') + ' / mo';
  if (aElem) aElem.innerText = '+' + sym + annual.toLocaleString('en-GB') + ' / yr';
}

console.log("Sovereign Enterprise System & Master Multi-Currency ROI Loaded.");


