/**
 * ==============================================================================
 * SOVEREIGN // DYNAMIC CLIENT CO-BRANDING & REAL REGISTRY INTELLIGENCE ENGINE
 * Flawless Client-Specific Personalization (Zero-Fail Architecture)
 * ==============================================================================
 */

(function() {
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      biz: params.get("biz") || "",
      reg: params.get("reg") || "",
      dir: params.get("dir") || "",
      city: params.get("city") || "",
      sector: params.get("sector") || ""
    };
  }

  function applyBespokeClientExperience() {
    const params = getUrlParams();
    if (!params.biz) return;

    const bizName = decodeURIComponent(params.biz).replace(/\+/g, " ");
    const director = params.dir ? decodeURIComponent(params.dir).replace(/\+/g, " ") : "Director";
    const regNum = params.reg || "10984210";
    const city = params.city || "London";

    // 1. Inject Co-Branded Header Badge
    const header = document.querySelector(".header");
    if (header && !document.getElementById("bespoke-client-banner")) {
      const banner = document.createElement("div");
      banner.id = "bespoke-client-banner";
      banner.style.cssText = "background:#0F172A; color:#FFFFFF; padding:10px 24px; font-size:13px; font-weight:700; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #2563EB; font-family:'Plus Jakarta Sans', sans-serif;";
      banner.innerHTML = `
        <div>
          <span style="color:#93C5FD; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">CUSTOM ENTERPRISE STAGING // </span>
          <strong style="color:#FFFFFF; font-size:14px;">${bizName}</strong>
          <span style="color:#94A3B8; font-size:12px; margin-left:8px;">(Ref: #${regNum} · Attention: ${director})</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="background:#16A34A; color:white; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:800;">7-DAY TRIAL STAGED</span>
          <a href="https://wa.me/447361593916?text=Hi%2C%20this%20is%20${encodeURIComponent(director)}%20from%20${encodeURIComponent(bizName)}.%20I%20am%20reviewing%20the%20custom%20Sovereign%20portal%20you%20staged%20for%20our%20operations." target="_blank" style="background:#2563EB; color:white; text-decoration:none; padding:5px 12px; border-radius:4px; font-size:12px; font-weight:700;">Direct WhatsApp Handshake &rarr;</a>
        </div>
      `;
      document.body.insertBefore(banner, document.body.firstChild);
    }

    // 2. Pre-fill any proposal calculators
    const nameInput = document.getElementById("contractor-job-type") || document.getElementById("calc-client-name");
    if (nameInput && nameInput.tagName === "INPUT") {
      nameInput.value = `${bizName} Executive Proposal`;
    }
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", applyBespokeClientExperience);
  } else {
    applyBespokeClientExperience();
  }
})();
