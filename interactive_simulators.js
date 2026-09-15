/**
 * ==============================================================================
 * SOVEREIGN // MASTER INTERACTIVE WORKING SOFTWARE SIMULATORS
 * ==============================================================================
 */

// 1. BUILDERS: 60-SECOND QUOTE GENERATOR
function generateBuilderQuote() {
  const type = document.getElementById("quoteProjectType") ? document.getElementById("quoteProjectType").value : "loft";
  const size = document.getElementById("quoteSize") ? parseInt(document.getElementById("quoteSize").value) || 35 : 35;
  
  let baseRate = 1250; // per m2
  let title = "Standard Loft Conversion";
  if (type === "extension") { baseRate = 1850; title = "Rear Kitchen Extension"; }
  if (type === "renovation") { baseRate = 950; title = "Full House Renovation"; }
  if (type === "newbuild") { baseRate = 2200; title = "New Residential Build"; }

  const materials = Math.round(size * baseRate * 0.45);
  const labor = Math.round(size * baseRate * 0.40);
  const cisTax = Math.round(labor * 0.20);
  const total = materials + labor;

  const resultBox = document.getElementById("builderQuoteResult");
  if (resultBox) {
    resultBox.innerHTML = `
      <div style="background:#FFFFFF; border:2px solid #2563EB; border-radius:10px; padding:20px; color:#0F172A; text-align:left; font-family:sans-serif; margin-top:16px; box-shadow:0 4px 12px rgba(37,99,235,0.1);">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #E2E8F0; padding-bottom:10px; margin-bottom:12px;">
          <div><strong style="color:#1E3A8A; font-size:16px;">${title} (${size}m²)</strong><br><span style="font-size:12px; color:#64748B;">Generated in 1.4s • HMRC CIS Compliant</span></div>
          <span style="background:#DCFCE7; color:#166534; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:700; height:fit-content;">READY TO SEND</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:13px; margin-bottom:12px;">
          <div> Materials & Plant: <strong>£${materials.toLocaleString()}</strong></div>
          <div> Subcontractor Labor: <strong>£${labor.toLocaleString()}</strong></div>
          <div> CIS Deduction (20%): <strong>£${cisTax.toLocaleString()}</strong></div>
          <div> Est. Timeline: <strong>${Math.round(size * 0.25)} Weeks</strong></div>
        </div>
        <div style="background:#F8FAFC; border-radius:8px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:14px; font-weight:600;">Total Client Estimate:</span>
          <span style="font-size:20px; font-weight:800; color:#1E3A8A;">£${total.toLocaleString()}</span>
        </div>
        <button style="width:100%; margin-top:12px; background:#2563EB; color:white; border:none; padding:10px; border-radius:6px; font-weight:700; cursor:pointer;" onclick="alert(' PDF Quote #' + Math.floor(Math.random()*90000+10000) + ' generated and dispatched to client via WhatsApp!')"> Download Client-Ready PDF Estimate</button>
      </div>
    `;
  }
}

// 2. DENTAL: LIVE AI RECEPTIONIST SIMULATOR
function testDentalAI(question) {
  const chatLog = document.getElementById("dentalChatLog");
  if (!chatLog) return;
  
  let reply = "";
  if (question.includes("Implant")) {
    reply = "Hi! Our single dental implants start from £1,800 (including titanium post, abutment, and custom crown), with 0% interest-free monthly financing from £75/mo. Would you like to reserve an initial 3D CT scan and consultation with Dr. Alvarez this Thursday at 2:00 PM?";
  } else if (question.includes("Invisalign")) {
    reply = "Invisalign clear aligners range from £1,950 to £3,400 depending on complexity, with free digital smile simulation included! We have 2 consultation slots open tomorrow afternoon. Shall I book you in?";
  } else {
    reply = "Hello! We offer same-day emergency triage for toothache, broken teeth, and urgent care. Our clinic has an emergency slot reserved today at 4:30 PM. Would you like us to hold this for you?";
  }

  chatLog.innerHTML += `
    <div style="margin-bottom:10px; text-align:right;"><span style="background:#2563EB; color:white; padding:8px 14px; border-radius:16px 16px 2px 16px; font-size:13px; display:inline-block;">${question}</span></div>
    <div style="margin-bottom:12px; text-align:left;"><span style="background:#F1F5F9; color:#0F172A; padding:10px 14px; border-radius:16px 16px 16px 2px; font-size:13px; display:inline-block; border:1px solid #E2E8F0; line-height:1.4;"> <strong>Clinic AI:</strong> ${reply}</span></div>
  `;
  chatLog.scrollTop = chatLog.scrollHeight;
}

// 3. RESTAURANT: PRIVATE DINING BUYOUT CALCULATOR
function calculateDiningBuyout() {
  const guests = parseInt(document.getElementById("diningGuests") ? document.getElementById("diningGuests").value : 25) || 25;
  const tier = document.getElementById("diningTier") ? document.getElementById("diningTier").value : "tasting";
  
  let perHead = 85;
  let wine = 45;
  if (tier === "canapes") { perHead = 55; wine = 30; }
  if (tier === "sommelier") { perHead = 125; wine = 75; }

  const foodTotal = guests * perHead;
  const wineTotal = guests * wine;
  const service = Math.round((foodTotal + wineTotal) * 0.125);
  const total = foodTotal + wineTotal + service;
  const deposit = Math.round(total * 0.50);

  const res = document.getElementById("diningResult");
  if (res) {
    res.innerHTML = `
      <div style="background:#FFFFFF; border:2px solid #1E3A8A; border-radius:10px; padding:20px; color:#0F172A; text-align:left; font-family:sans-serif; margin-top:16px; box-shadow:0 4px 12px rgba(30,58,138,0.1);">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #E2E8F0; padding-bottom:10px; margin-bottom:12px;">
          <div><strong style="color:#0F172A; font-size:16px;">Private Room Buyout (${guests} Guests)</strong><br><span style="font-size:12px; color:#64748B;">45-Second Proposal Generated</span></div>
          <span style="background:#EEF2F6; color:#1E3A8A; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:700;">VIP CONTRACT</span>
        </div>
        <div style="font-size:13px; line-height:1.6; margin-bottom:12px;">
          • Menu Package: <strong>£${foodTotal.toLocaleString()}</strong> (£${perHead}/head)<br>
          • Wine & Pairing: <strong>£${wineTotal.toLocaleString()}</strong> (£${wine}/head)<br>
          • 12.5% Discretionary Service: <strong>£${service.toLocaleString()}</strong><br>
          • 50% Securing Deposit: <strong>£${deposit.toLocaleString()} (Instant Card Payment)</strong>
        </div>
        <div style="background:#F8FAFC; border-radius:8px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600;">Total Package Value:</span>
          <span style="font-size:20px; font-weight:800; color:#1E3A8A;">£${total.toLocaleString()}</span>
        </div>
      </div>
    `;
  }
}
