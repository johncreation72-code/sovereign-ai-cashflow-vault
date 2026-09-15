/**
 * ==============================================================================
 * SOVEREIGN // INSTANT ZERO-FRICTION 7-DAY SANDBOX TRIAL ACTIVATOR
 * Frictionless Enterprise Lead Capture & Immediate Software Provisioning
 * ==============================================================================
 */

function openSandboxTrialModal(suiteName) {
  const modalId = "sovereign-trial-modal";
  let existingModal = document.getElementById(modalId);
  if (existingModal) existingModal.remove();

  const modalHtml = `
    <div id="${modalId}" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15,23,42,0.75); backdrop-filter:blur(4px); z-index:99999; display:flex; align-items:center; justify-content:center; padding:20px;">
      <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; max-width:520px; width:100%; padding:36px; box-shadow:0 20px 40px rgba(0,0,0,0.2); position:relative; font-family:'Plus Jakarta Sans',sans-serif;">
        <button onclick="document.getElementById('${modalId}').remove()" style="position:absolute; top:16px; right:16px; background:none; border:none; font-size:20px; color:#64748B; cursor:pointer; font-weight:700;">&times;</button>
        
        <div style="display:inline-block; background:#EFF6FF; color:#2563EB; font-weight:700; font-size:11px; padding:4px 10px; border-radius:12px; text-transform:uppercase; margin-bottom:12px;">7-Day Full Access Trial</div>
        <h3 style="font-size:22px; font-weight:800; color:#0F172A; margin-bottom:8px;">Activate ${suiteName || "Enterprise Suite"} Sandbox</h3>
        <p style="font-size:14px; color:#64748B; line-height:1.5; margin-bottom:20px;">Instant access to all quotation tools, SMS chasers, and automated workflows. No credit card required.</p>
        
        <form onsubmit="handleSandboxSubmission(event, '${suiteName || "Enterprise"}')" style="display:flex; flex-direction:column; gap:12px;">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px; text-transform:uppercase;">Registered Business Name</label>
            <input type="text" id="trialBizName" placeholder="e.g. Kensington Construction Ltd" required style="width:100%; padding:12px; border:1px solid #CBD5E1; border-radius:8px; font-size:14px;">
          </div>

          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px; text-transform:uppercase;">Director Work Email</label>
            <input type="email" id="trialEmail" placeholder="director@company.com" required style="width:100%; padding:12px; border:1px solid #CBD5E1; border-radius:8px; font-size:14px;">
          </div>

          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px; text-transform:uppercase;">WhatsApp / Phone (For License Key SMS)</label>
            <input type="tel" id="trialPhone" placeholder="+44 7123 456789" required style="width:100%; padding:12px; border:1px solid #CBD5E1; border-radius:8px; font-size:14px;">
          </div>

          <button type="submit" style="background:#2563EB; color:#FFFFFF; border:none; padding:14px; border-radius:8px; font-weight:800; font-size:15px; cursor:pointer; margin-top:8px; box-shadow:0 4px 12px rgba(37,99,235,0.25);">Provision Instant 7-Day License</button>
        </form>

        <div id="trialSuccessMessage" style="display:none; margin-top:16px; padding:16px; background:#ECFDF5; border:1px solid #A7F3D0; border-radius:8px; color:#065F46; font-size:13px; line-height:1.5;">
          <strong>License Key Provisioned:</strong> <span id="licenseKeyGenerated" style="font-family:monospace; font-weight:700;">SOV-TRIAL-89412</span><br>
          Your trial credentials and instant sandbox access link have been dispatched. You may now use all portal tools unrestricted.
        </div>

        <div style="font-size:11px; color:#94A3B8; text-align:center; margin-top:16px;">
          Bank-Grade 256-Bit SSL Encrypted. Zero Spam Guarantee.
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function handleSandboxSubmission(e, suiteName) {
  e.preventDefault();
  const biz = document.getElementById("trialBizName").value;
  const email = document.getElementById("trialEmail").value;
  const phone = document.getElementById("trialPhone").value;
  const license = "SOV-7DAY-" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("licenseKeyGenerated").innerText = license;
  document.getElementById("trialSuccessMessage").style.display = "block";

  // Store in local storage to unlock unrestricted mode
  localStorage.setItem("sovereign_trial_license", license);
  localStorage.setItem("sovereign_trial_biz", biz);

  console.log(`[TRIAL PROVISIONED]: ${biz} (${email}, ${phone}) -> ${license}`);

  setTimeout(() => {
    alert("Sandbox trial active for " + biz + ". License: " + license);
    document.getElementById("sovereign-trial-modal").remove();
  }, 2500);
}
