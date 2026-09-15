/**
 * Sovereign Live In-Browser Conversational Diagnostic Widget
 * Real-time inbound lead capture and instant proposal dispatch.
 */
(function() {
  // Inject widget styling
  const style = document.createElement('style');
  style.innerHTML = `
    .sov-chat-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #2563EB;
      color: #FFFFFF;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 30px;
      padding: 12px 20px;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s ease;
    }
    .sov-chat-trigger:hover {
      background: #1D4ED8;
      transform: translateY(-2px);
    }
    .sov-trigger-dot {
      width: 8px;
      height: 8px;
      background: #22C55E;
      border-radius: 50%;
      box-shadow: 0 0 8px #22C55E;
    }
    .sov-chat-box {
      position: fixed;
      bottom: 80px;
      right: 24px;
      width: 360px;
      max-width: calc(100vw - 48px);
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
      z-index: 99999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }
    .sov-chat-header {
      background: #0F172A;
      color: #FFFFFF;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sov-chat-header h4 {
      font-size: 14px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .sov-chat-header p {
      font-size: 11px;
      color: #94A3B8;
      margin: 2px 0 0 0;
    }
    .sov-chat-close {
      background: none;
      border: none;
      color: #94A3B8;
      font-size: 18px;
      cursor: pointer;
    }
    .sov-chat-body {
      padding: 20px;
      background: #F8FAFC;
      max-height: 420px;
      overflow-y: auto;
    }
    .sov-chat-msg {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 13px;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 14px;
    }
    .sov-chat-input-group {
      margin-bottom: 12px;
    }
    .sov-chat-input-group label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .sov-chat-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      font-size: 13px;
      outline: none;
      box-sizing: border-box;
      background: #FFFFFF;
    }
    .sov-chat-input:focus {
      border-color: #2563EB;
    }
    .sov-chat-submit {
      width: 100%;
      padding: 12px;
      background: #2563EB;
      color: #FFFFFF;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      transition: background 0.2s;
    }
    .sov-chat-submit:hover {
      background: #1D4ED8;
    }
    .sov-success-msg {
      display: none;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #065F46;
      padding: 14px;
      border-radius: 8px;
      font-size: 12px;
      text-align: center;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);

  // Inject widget HTML
  const container = document.createElement('div');
  container.innerHTML = `
    <button class="sov-chat-trigger" onclick="toggleSovereignChat()">
      <span class="sov-trigger-dot"></span>
      <span>Direct Concierge &amp; Live Quote</span>
    </button>

    <div class="sov-chat-box" id="sovereignChatBox">
      <div class="sov-chat-header">
        <div>
          <h4>Sovereign Live Concierge</h4>
          <p>Instant Commercial Proposal &amp; Triage</p>
        </div>
        <button class="sov-chat-close" onclick="toggleSovereignChat()">&times;</button>
      </div>
      <div class="sov-chat-body">
        <div class="sov-chat-msg">
          <strong>Operational Intake:</strong> Enter your details below to receive an instant, bank-grade proposal tailored to your business operations.
        </div>

        <form id="sovInboundForm" onsubmit="submitSovereignInbound(event)">
          <div class="sov-chat-input-group">
            <label>Business / Director Name</label>
            <input type="text" id="sovInboundName" class="sov-chat-input" placeholder="e.g. Kensington Roofing Ltd" required>
          </div>
          <div class="sov-chat-input-group">
            <label>Phone / WhatsApp Number</label>
            <input type="tel" id="sovInboundPhone" class="sov-chat-input" placeholder="e.g. +44 7700 900123" required>
          </div>
          <div class="sov-chat-input-group">
            <label>Email Address</label>
            <input type="email" id="sovInboundEmail" class="sov-chat-input" placeholder="e.g. director@company.com" required>
          </div>
          <div class="sov-chat-input-group">
            <label>Trade / Industry Sector</label>
            <select id="sovInboundSector" class="sov-chat-input">
              <option value="Builders & Construction">Builders &amp; Construction (CIS 20%)</option>
              <option value="Dental & Medical">Dental &amp; Cosmetic Practices</option>
              <option value="HVAC & Plumbing">HVAC &amp; Gas Safety</option>
              <option value="Auto Garages & MOT">Auto Garages &amp; MOT Centers</option>
              <option value="Logistics & Haulage">Logistics &amp; Freight Fleets</option>
              <option value="Other Commercial">Other Commercial Business</option>
            </select>
          </div>
          <button type="submit" class="sov-chat-submit">Generate Live Commercial Proposal</button>
        </form>

        <div class="sov-success-msg" id="sovSuccessMsg">
          Proposal generated and logged. An operations specialist has been notified and will dispatch the formal PDF contract directly to your WhatsApp / Email within 60 seconds.
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  window.toggleSovereignChat = function() {
    const box = document.getElementById('sovereignChatBox');
    if (box) {
      box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
      if (box.style.display === 'flex' && window.reportTelemetryEvent) {
        window.reportTelemetryEvent('modal_opened', 'Opened Live Concierge Widget');
      }
    }
  };

  window.submitSovereignInbound = function(e) {
    e.preventDefault();
    const name = document.getElementById('sovInboundName').value;
    const phone = document.getElementById('sovInboundPhone').value;
    const email = document.getElementById('sovInboundEmail').value;
    const sector = document.getElementById('sovInboundSector').value;

    const payload = {
      event: 'inbound_lead',
      page: window.location.pathname.split('/').pop() || 'index.html',
      detail: `${name} | ${phone} | ${sector} | ${email}`
    };

    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});

    document.getElementById('sovInboundForm').style.display = 'none';
    document.getElementById('sovSuccessMsg').style.display = 'block';
  };
})();
