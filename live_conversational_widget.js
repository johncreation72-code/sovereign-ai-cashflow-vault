/**
 * Sovereign Live In-Browser Executive AI Concierge Widget
 * Direct multi-turn advisory chat powered by Sovereign Intelligence Core.
 */
(function() {
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
      width: 380px;
      height: 500px;
      max-width: calc(100vw - 48px);
      max-height: calc(100vh - 120px);
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
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #2563EB;
    }
    .sov-chat-header h4 {
      font-size: 14px;
      font-weight: 700;
      margin: 0;
    }
    .sov-chat-header p {
      font-size: 11px;
      color: #38BDF8;
      margin: 2px 0 0 0;
    }
    .sov-chat-close {
      background: none;
      border: none;
      color: #94A3B8;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }
    .sov-chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #F8FAFC;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 13px;
    }
    .sov-msg-ai {
      background: #FFFFFF;
      color: #1E293B;
      padding: 12px 14px;
      border-radius: 12px 12px 12px 2px;
      border: 1px solid #E2E8F0;
      max-width: 85%;
      line-height: 1.5;
      align-self: flex-start;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .sov-msg-user {
      background: #2563EB;
      color: #FFFFFF;
      padding: 12px 14px;
      border-radius: 12px 12px 2px 12px;
      max-width: 85%;
      line-height: 1.5;
      align-self: flex-end;
    }
    .sov-chat-input-area {
      padding: 12px 14px;
      background: #FFFFFF;
      border-top: 1px solid #E2E8F0;
      display: flex;
      gap: 8px;
    }
    .sov-chat-input-field {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      font-family: inherit;
    }
    .sov-chat-input-field:focus {
      border-color: #2563EB;
    }
    .sov-chat-send-btn {
      background: #2563EB;
      color: #FFFFFF;
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
    .sov-chat-send-btn:hover {
      background: #1D4ED8;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.innerHTML = `
    <div class="sov-chat-trigger" onclick="toggleSovereignChat()">
      <div class="sov-trigger-dot"></div>
      <span>Executive Concierge</span>
    </div>

    <div class="sov-chat-box" id="sovereignChatBox">
      <div class="sov-chat-header">
        <div>
          <h4>Sovereign Systems Concierge</h4>
          <p>UK Commercial Operations Advisory</p>
        </div>
        <button class="sov-chat-close" onclick="toggleSovereignChat()">&times;</button>
      </div>
      <div class="sov-chat-messages" id="sovChatMessages">
        <div class="sov-msg-ai">
          Hello. I am the Sovereign Operations Concierge. How can I assist your business today with our trade operating portals, CIS automation, or complimentary 7-day trials?
        </div>
      </div>
      <form class="sov-chat-input-area" onsubmit="sendSovereignChatMessage(event)">
        <input type="text" id="sovChatInput" class="sov-chat-input-field" placeholder="Ask a question..." autocomplete="off" required>
        <button type="submit" class="sov-chat-send-btn">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(container);

  window.toggleSovereignChat = function() {
    const box = document.getElementById('sovereignChatBox');
    if (box) {
      box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
      if (box.style.display === 'flex') {
        const inp = document.getElementById('sovChatInput');
        if (inp) inp.focus();
      }
    }
  };

  window.sendSovereignChatMessage = async function(e) {
    e.preventDefault();
    const input = document.getElementById('sovChatInput');
    const msg = input.value.trim();
    if (!msg) return;

    const chatContainer = document.getElementById('sovChatMessages');

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'sov-msg-user';
    userDiv.innerText = msg;
    chatContainer.appendChild(userDiv);
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Loading indicator
    const aiDiv = document.createElement('div');
    aiDiv.className = 'sov-msg-ai';
    aiDiv.innerText = 'Analyzing operational query...';
    chatContainer.appendChild(aiDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const urlParams = new URLSearchParams(window.location.search);
    const biz = urlParams.get('biz') || '';
    const ref = urlParams.get('ref') || '';
    const pageName = window.location.pathname.split('/').pop() || 'index.html';

    try {
      const res = await fetch('/api/ai_concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          context: { biz, ref, page: pageName }
        })
      });

      if (res.ok) {
        const data = await res.json();
        aiDiv.innerText = data.reply || 'Thank you for reaching out. An operations specialist will follow up directly.';
      } else {
        aiDiv.innerText = 'Thank you for your message. You can activate your complimentary 7-day trial at https://whop.com/checkout/plan_UL1yNCSJUr2Ka or ask any operational questions here.';
      }
    } catch (err) {
      aiDiv.innerText = 'Thank you for your inquiry. Sovereign OS includes a 7-day zero-risk trial. You can reach our engineering team or activate your access at https://whop.com/checkout/plan_UL1yNCSJUr2Ka.';
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
})();
