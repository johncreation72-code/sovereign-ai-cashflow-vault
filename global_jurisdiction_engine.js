/**
 * ==============================================================================
 * SOVEREIGN // GLOBAL MULTI-JURISDICTION & MULTI-CURRENCY ENGINE
 * Institutional Standards: Zero Emojis, Real-Time DOM Binding, Localized Compliance
 * ==============================================================================
 */

const SOVEREIGN_JURISDICTIONS = {
  UK: {
    id: "UK",
    name: "United Kingdom",
    code: "GB",
    currency: "GBP",
    symbol: "£",
    rateFromGBP: 1.0,
    regulator: "Companies House & HMRC",
    taxScheme: "HMRC CIS & VAT",
    cisTaxRate: "20% Subcontractor Deduction",
    taxForm: "CIS Statement / VAT Return",
    inspectionAgency: "DVSA MOT Inspection",
    healthcareRegulator: "CQC / GDC Compliance",
    legalBody: "SRA / Law Society",
    accountingStandard: "MTD & UK GAAP",
    avgHourlyAdminRate: 25,
    sampleCompany: "Kensington Loft & Construction Ltd",
    sampleNumber: "10984210"
  },
  US: {
    id: "US",
    name: "United States",
    code: "US",
    currency: "USD",
    symbol: "$",
    rateFromGBP: 1.30,
    regulator: "State Division of Corporations & SEC",
    taxScheme: "IRS 1099-NEC & W-9",
    cisTaxRate: "1099-NEC Independent Contractor Backup Withholding",
    taxForm: "IRS Form W-9 / 1099-NEC",
    inspectionAgency: "State Motor Vehicle Inspection (DOT)",
    healthcareRegulator: "HIPAA / ADA Compliance",
    legalBody: "State Bar Association / ABA",
    accountingStandard: "US GAAP & IRS e-File",
    avgHourlyAdminRate: 35,
    sampleCompany: "Vanguard Commercial Contracting LLC",
    sampleNumber: "EIN-84-921048"
  },
  EU: {
    id: "EU",
    name: "European Union / Germany",
    code: "EU",
    currency: "EUR",
    symbol: "€",
    rateFromGBP: 1.18,
    regulator: "European Business Register & Handelsregister",
    taxScheme: "EU VAT / USt-IdNr & Reverse Charge",
    cisTaxRate: "Bauabzugsteuer 15% Construction Withholding",
    taxForm: "EU VAT Return / Freistellungsbescheinigung",
    inspectionAgency: "TÜV / DEKRA Inspection",
    healthcareRegulator: "EU MDR & National Dental Board",
    legalBody: "Rechtsanwaltskammer / Bar Council",
    accountingStandard: "EU IFRS & GoBD",
    avgHourlyAdminRate: 30,
    sampleCompany: "Kronen Bau & Projektentwicklung GmbH",
    sampleNumber: "HRB-914280"
  },
  CA: {
    id: "CA",
    name: "Canada",
    code: "CA",
    currency: "CAD",
    symbol: "C$",
    rateFromGBP: 1.76,
    regulator: "Corporations Canada & CRA",
    taxScheme: "CRA GST/HST & T5018 Construction Reporting",
    cisTaxRate: "T5018 Subcontractor Contract Reporting",
    taxForm: "CRA Form T5018 / GST34",
    inspectionAgency: "Provincial Safety Inspection (MTO/CVSE)",
    healthcareRegulator: "Health Canada / Provincial Dental Colleges",
    legalBody: "Federation of Law Societies of Canada",
    accountingStandard: "ASPE & Canadian IFRS",
    avgHourlyAdminRate: 32,
    sampleCompany: "Maple Ridge Contracting Corp",
    sampleNumber: "BC-1094821"
  },
  AU: {
    id: "AU",
    name: "Australia",
    code: "AU",
    currency: "AUD",
    symbol: "A$",
    rateFromGBP: 1.95,
    regulator: "ASIC & Australian Business Register",
    taxScheme: "ATO GST & TPARS Taxable Payments Reporting",
    cisTaxRate: "TPARS Building & Construction Annual Reporting",
    taxForm: "ATO BAS / TPAR Report",
    inspectionAgency: "State Pink Slip / Roadworthy Certificate",
    healthcareRegulator: "AHPRA / Dental Board of Australia",
    legalBody: "Law Council of Australia",
    accountingStandard: "AASB & Single Touch Payroll (STP)",
    avgHourlyAdminRate: 38,
    sampleCompany: "Harbour City Commercial Builders Pty Ltd",
    sampleNumber: "ABN-48-129-481-901"
  },
  GCC: {
    id: "GCC",
    name: "UAE & GCC",
    code: "AE",
    currency: "AED",
    symbol: "AED ",
    rateFromGBP: 4.77,
    regulator: "DED & Freezone Commercial Registry",
    taxScheme: "UAE Corporate Tax (9%) & 5% VAT",
    cisTaxRate: "WPS Wage Protection System & Subcontractor Agreement",
    taxForm: "FTA VAT Return & Corporate Tax Filing",
    inspectionAgency: "RTA / Tasjeel Vehicle Testing",
    healthcareRegulator: "DHA / MOHAP Health Authority",
    legalBody: "Ministry of Justice / DIFC Courts",
    accountingStandard: "IFRS Standard",
    avgHourlyAdminRate: 75,
    sampleCompany: "Emirates Sovereign Contracting FZ-LLC",
    sampleNumber: "DED-784190"
  }
};

class SovereignJurisdictionManager {
  constructor() {
    this.currentJurisdiction = this.detectJurisdiction();
    this.init();
  }

  detectJurisdiction() {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("sovereign_jurisdiction");
      if (saved && SOVEREIGN_JURISDICTIONS[saved]) {
        return SOVEREIGN_JURISDICTIONS[saved];
      }
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("America/New_York") || tz.includes("America/Chicago") || tz.includes("America/Los_Angeles") || tz.includes("US")) {
        return SOVEREIGN_JURISDICTIONS.US;
      }
      if (tz.includes("America/Toronto") || tz.includes("America/Vancouver") || tz.includes("Canada")) {
        return SOVEREIGN_JURISDICTIONS.CA;
      }
      if (tz.includes("Australia/") || tz.includes("Sydney") || tz.includes("Melbourne")) {
        return SOVEREIGN_JURISDICTIONS.AU;
      }
      if (tz.includes("Dubai") || tz.includes("Riyadh") || tz.includes("Asia/Dubai")) {
        return SOVEREIGN_JURISDICTIONS.GCC;
      }
      if (tz.includes("Europe/Berlin") || tz.includes("Europe/Paris") || tz.includes("Europe/Amsterdam") || tz.includes("Europe/Rome")) {
        return SOVEREIGN_JURISDICTIONS.EU;
      }
    } catch (e) {}
    return SOVEREIGN_JURISDICTIONS.UK;
  }

  setJurisdiction(jurId) {
    if (SOVEREIGN_JURISDICTIONS[jurId]) {
      this.currentJurisdiction = SOVEREIGN_JURISDICTIONS[jurId];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("sovereign_jurisdiction", jurId);
      }
      this.updateDOM();
      if (typeof window !== "undefined" && typeof window.onJurisdictionChanged === "function") {
        window.onJurisdictionChanged(this.currentJurisdiction);
      }
    }
  }

  get() {
    return this.currentJurisdiction;
  }

  formatMoney(gbpAmount) {
    const rate = this.currentJurisdiction.rateFromGBP;
    const local = Math.round(gbpAmount * rate);
    const sym = this.currentJurisdiction.symbol;
    return sym + local.toLocaleString("en-GB");
  }

  formatLocalExact(amount) {
    const sym = this.currentJurisdiction.symbol;
    return sym + Math.round(amount).toLocaleString("en-GB");
  }

  renderSelector() {
    const jur = this.currentJurisdiction;
    return `
      <div class="sovereign-jurisdiction-bar" style="display:flex; align-items:center; gap:8px; background:#F8FAFC; border:1px solid #CBD5E1; padding:6px 12px; border-radius:8px; font-size:13px; font-family:\x27Plus Jakarta Sans\x27, sans-serif;">
        <span style="font-weight:700; color:#475569; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">JURISDICTION:</span>
        <select id="sovereign-jurisdiction-select" onchange="window.sovereignJurisdiction.setJurisdiction(this.value)" style="border:none; background:transparent; font-weight:700; color:#0F172A; cursor:pointer; font-size:13px; outline:none;">
          <option value="UK" ${jur.id === "UK" ? "selected" : ""}>United Kingdom (GBP £ · HMRC)</option>
          <option value="US" ${jur.id === "US" ? "selected" : ""}>United States (USD $ · SEC/IRS)</option>
          <option value="EU" ${jur.id === "EU" ? "selected" : ""}>European Union (EUR € · Handelsregister)</option>
          <option value="CA" ${jur.id === "CA" ? "selected" : ""}>Canada (CAD $ · CRA T5018)</option>
          <option value="AU" ${jur.id === "AU" ? "selected" : ""}>Australia (AUD A$ · ASIC/TPARS)</option>
          <option value="GCC" ${jur.id === "GCC" ? "selected" : ""}>UAE &amp; GCC (AED · DED/Freezone)</option>
        </select>
      </div>
    `;
  }

  updateDOM() {
    if (typeof document === "undefined") return;
    const jur = this.currentJurisdiction;

    // Update all elements marked with data-gbp-val
    document.querySelectorAll("[data-gbp-val]").forEach(el => {
      const gbp = parseFloat(el.getAttribute("data-gbp-val")) || 0;
      const period = el.getAttribute("data-period") || "";
      el.innerText = this.formatMoney(gbp) + (period ? " " + period : "");
    });

    // Update tax scheme elements
    document.querySelectorAll(".jurisdiction-tax-scheme").forEach(el => {
      el.innerText = jur.taxScheme;
    });

    // Update regulator elements
    document.querySelectorAll(".jurisdiction-regulator").forEach(el => {
      el.innerText = jur.regulator;
    });

    // Update inspection agency elements
    document.querySelectorAll(".jurisdiction-inspection").forEach(el => {
      el.innerText = jur.inspectionAgency;
    });

    // Re-trigger ROI slider or active audit if exists
    const slider = document.getElementById("master-turnover-slider");
    if (slider && typeof updateMasterROI === "function") {
      updateMasterROI(slider.value);
    }
  }

  init() {
    if (typeof window !== "undefined") {
      const setup = () => {
        const headerPillContainer = document.getElementById("jurisdiction-picker-container");
        if (headerPillContainer) {
          headerPillContainer.innerHTML = this.renderSelector();
        }
        this.updateDOM();
      };
      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", setup);
      } else {
        setup();
      }
    }
  }
}

// Instantiate global manager
if (typeof window !== "undefined") {
  window.sovereignJurisdiction = new SovereignJurisdictionManager();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SOVEREIGN_JURISDICTIONS, SovereignJurisdictionManager };
}
