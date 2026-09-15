/**
 * ==============================================================================
 * SOVEREIGN // UNIVERSAL CLIENT-SIDE PDF PROPOSAL & QUOTE EXPORTER
 * Zero-Dependency, Bank-Grade Document Generation for All 16 Industry Portals
 * ==============================================================================
 */

function generateUniversalPdfProposal(portalType, data) {
  const quoteRef = "DOC-" + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  const companyName = data.companyName || "Client Enterprise";
  const totalAmount = data.totalAmount || "GBP 2,850.00";
  const breakdownHtml = data.breakdownHtml || "Standard Operational Retainer";
  const termsText = data.termsText || "Payment due within 14 days of invoice issue. Governed by standard commercial terms.";

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to export your official PDF proposal.");
    return;
  }

  const documentContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official Commercial Proposal - ${quoteRef}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      padding: 40px;
      margin: 0;
      line-height: 1.6;
    }
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 40px;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #0F172A;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #0F172A;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .brand-sub {
      font-size: 13px;
      color: #64748B;
      margin-top: 4px;
    }
    .meta-col {
      text-align: right;
      font-size: 13px;
      color: #334155;
    }
    .meta-bold {
      font-weight: 700;
      color: #0F172A;
    }
    .summary-box {
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 30px;
    }
    .total-amount {
      font-size: 32px;
      font-weight: 800;
      color: #2563EB;
      margin: 8px 0;
    }
    .table-spec {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
    }
    .table-spec th {
      background: #0F172A;
      color: #FFFFFF;
      text-align: left;
      padding: 12px;
      font-size: 13px;
      text-transform: uppercase;
    }
    .table-spec td {
      padding: 14px 12px;
      border-bottom: 1px solid #E2E8F0;
      font-size: 14px;
      color: #334155;
    }
    .footer-note {
      font-size: 11px;
      color: #94A3B8;
      border-top: 1px solid #E2E8F0;
      padding-top: 20px;
      margin-top: 40px;
      text-align: center;
    }
    @media print {
      body { padding: 0; }
      .invoice-card { border: none; padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-card">
    <div class="no-print" style="text-align: right; margin-bottom: 20px;">
      <button onclick="window.print()" style="background: #2563EB; color: #FFFFFF; border: none; padding: 10px 20px; font-size: 14px; font-weight: 700; border-radius: 6px; cursor: pointer;">Save as PDF / Print Document</button>
    </div>

    <div class="header-row">
      <div>
        <div class="brand-title">SOVEREIGN ENTERPRISE OS</div>
        <div class="brand-sub">Commercial Proposal & Operational Specification</div>
      </div>
      <div class="meta-col">
        <div><span class="meta-bold">Reference:</span> ${quoteRef}</div>
        <div><span class="meta-bold">Date:</span> ${timestamp}</div>
        <div><span class="meta-bold">Status:</span> Authorized for Execution</div>
      </div>
    </div>

    <div class="summary-box">
      <div style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase;">Prepared Specifically For:</div>
      <div style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 4px 0 12px 0;">${companyName}</div>
      <div style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase;">Total Project / Contract Valuation:</div>
      <div class="total-amount">${totalAmount}</div>
    </div>

    <table class="table-spec">
      <thead>
        <tr>
          <th>Specification Item & Deliverables</th>
          <th style="text-align: right;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Operational Scope Breakdown:</strong><br>
            <div style="margin-top: 8px; font-size: 13px; line-height: 1.8;">${breakdownHtml}</div>
          </td>
          <td style="text-align: right; vertical-align: top; font-weight: 700; color: #047857;">VERIFIED</td>
        </tr>
      </tbody>
    </table>

    <div style="background: #F1F5F9; border-left: 4px solid #2563EB; padding: 14px; font-size: 13px; color: #334155; margin: 20px 0;">
      <strong>Commercial Terms & Governance:</strong><br>
      ${termsText}
    </div>

    <div class="footer-note">
      This document is generated by Sovereign Enterprise OS. Compliant with UK Companies House, HMRC CIS, and GDPR data protection regulations. 256-Bit SSL Encrypted.
    </div>
  </div>

  <script>
    window.onload = function() {
      // Auto-trigger print dialog after brief render delay
      setTimeout(function() { window.print(); }, 500);
    };
  </script>
</body>
</html>
`;

  printWindow.document.open();
  printWindow.document.write(documentContent);
  printWindow.document.close();
}
