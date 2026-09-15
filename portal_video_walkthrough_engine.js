/**
 * ==============================================================================
 * SOVEREIGN // HIGH-CONVERSION PORTAL VIDEO WALKTHROUGH ENGINE
 * Automated 45-Second Video Demonstrations with Voiceover & Dynamic Screen Previews
 * Zero-Dependency, Institutional Grade, High-Converting B2B Player
 * ==============================================================================
 */

(function() {
  // Sector Video Walkthrough Scripts & Narration Timelines
  const SECTOR_VIDEO_SCRIPTS = {
    builders: {
      title: "SiteCommand OS // 45-Second Operational Walkthrough",
      voiceScript: "In the next 45 seconds, see how SiteCommand OS eliminates 14 hours of weekly estimating overhead and protects 20% CIS tax deductions automatically. Watch as a multi-room residential quote is calculated on-site in 14 seconds, verified against subcontractor timecards, and exported directly into an official bank-grade PDF contract ready for client signature.",
      steps: [
        { time: 0, label: "0:00 Ingestion", caption: "Loading client specifications and subcontractor rates..." },
        { time: 8, label: "0:08 Calculation", caption: "Auto-applying HMRC 20% CIS deductions and material margins..." },
        { time: 22, label: "0:22 Verification", caption: "Verifying GPS timecard attendance and supplier retentions..." },
        { time: 34, label: "0:34 PDF Generation", caption: "Exporting authorized commercial proposal in under 60 seconds." }
      ]
    },
    dental: {
      title: "ClinicSovereign OS // 45-Second Patient Triage Walkthrough",
      voiceScript: "Discover how ClinicSovereign OS captures 68% of high-ticket cosmetic dental and implant inquiries that occur after clinic hours. The autonomous voice and SMS triage agent engages emergency patients in under 15 seconds, pre-screens clinical eligibility, and collects instant reservation deposits directly into your practice ledger.",
      steps: [
        { time: 0, label: "0:00 After-Hours Call", caption: "Inbound cosmetic implant inquiry received at 8:45 PM..." },
        { time: 10, label: "0:10 AI Voice Triage", caption: "Autonomous triage screening clinical eligibility & urgency..." },
        { time: 24, label: "0:24 Deposit Capture", caption: "Securing consultation deposit via instant card gateway..." },
        { time: 36, label: "0:36 Ledger Sync", caption: "Syncing verified appointment to practice management ledger." }
      ]
    },
    default: {
      title: "Sovereign Enterprise OS // 45-Second Executive Walkthrough",
      voiceScript: "This 45-second operational demonstration reveals how Sovereign Enterprise OS identifies recoverable revenue leakage, automates compliance protocols, and accelerates commercial proposal delivery with zero manual overhead.",
      steps: [
        { time: 0, label: "0:00 Data Ingestion", caption: "Analyzing real-time operational workflows and lead pipelines..." },
        { time: 12, label: "0:12 Leakage Audit", caption: "Identifying recoverable financial bleed across active operations..." },
        { time: 26, label: "0:26 Workflow Execution", caption: "Automating customer engagement and compliance checks..." },
        { time: 38, label: "0:38 Final Settlement", caption: "Generating instant commercial proposals and tracking settlements." }
      ]
    }
  };

  // Inject Video Modal Styles
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    .sov-video-trigger-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #1E3A8A;
      color: #FFFFFF;
      border: 1px solid #1E40AF;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }
    .sov-video-trigger-btn:hover {
      background: #2563EB;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }
    .sov-video-play-icon {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 10px solid #FFFFFF;
    }
    .sov-video-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .sov-video-player-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 16px;
      max-width: 840px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    }
    .sov-video-player-header {
      background: #0F172A;
      color: #FFFFFF;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sov-video-player-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #93C5FD;
    }
    .sov-video-close-btn {
      background: transparent;
      border: none;
      color: #94A3B8;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
    }
    .sov-video-close-btn:hover { color: #FFFFFF; }
    
    .sov-video-stage {
      background: #090D16;
      height: 380px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      padding: 30px;
      overflow: hidden;
    }
    .sov-simulated-screen {
      width: 90%;
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      position: relative;
    }
    .sov-screen-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 16px;
    }
    .sov-screen-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #475569;
    }
    .sov-screen-dot.active { background: #22C55E; }
    
    .sov-screen-content-title {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .sov-screen-content-sub {
      font-size: 13px;
      color: #94A3B8;
      line-height: 1.5;
    }
    .sov-screen-counter {
      font-family: 'JetBrains Mono', monospace;
      font-size: 28px;
      font-weight: 800;
      color: #38BDF8;
      margin: 16px 0;
    }
    .sov-screen-progress-bar {
      height: 6px;
      background: #334155;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 16px;
    }
    .sov-screen-progress-fill {
      height: 100%;
      width: 0%;
      background: #2563EB;
      transition: width 0.3s ease;
    }

    .sov-caption-ticker {
      position: absolute;
      bottom: 16px;
      left: 20px;
      right: 20px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 13px;
      color: #E2E8F0;
      text-align: center;
      font-weight: 600;
    }

    .sov-video-controls {
      background: #F8FAFC;
      padding: 16px 24px;
      border-top: 1px solid #E2E8F0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sov-ctrl-btn {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #0F172A;
      cursor: pointer;
    }
    .sov-ctrl-btn:hover { background: #F1F5F9; }
    .sov-timeline-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #1E3A8A;
    }
    .sov-action-btn-primary {
      background: #2563EB;
      color: #FFFFFF;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }
    .sov-action-btn-primary:hover { background: #1D4ED8; }
  `;
  document.head.appendChild(styleEl);

  // Determine current portal sector
  function getSectorConfig() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("sitecommand")) return SECTOR_VIDEO_SCRIPTS.builders;
    if (path.includes("clinic")) return SECTOR_VIDEO_SCRIPTS.dental;
    return SECTOR_VIDEO_SCRIPTS.default;
  }

  // Create Modal Elements
  const config = getSectorConfig();
  const overlay = document.createElement("div");
  overlay.className = "sov-video-modal-overlay";
  overlay.id = "sovVideoOverlay";

  overlay.innerHTML = `
    <div class="sov-video-player-card">
      <div class="sov-video-player-header">
        <div class="sov-video-player-title">${config.title}</div>
        <button class="sov-video-close-btn" onclick="closeSovereignVideo()">&times;</button>
      </div>

      <div class="sov-video-stage">
        <div class="sov-simulated-screen">
          <div class="sov-screen-bar">
            <div class="sov-screen-dot active"></div>
            <div class="sov-screen-dot"></div>
            <div class="sov-screen-dot"></div>
            <span style="font-size: 10px; color: #64748B; font-family: 'JetBrains Mono', monospace; margin-left: 8px;">SIMULATED LIVE WORKFLOW DEMONSTRATION</span>
          </div>
          <div class="sov-screen-content-title" id="sovVideoStageTitle">Autonomous Ingestion &amp; Regulatory Analysis</div>
          <div class="sov-screen-content-sub" id="sovVideoStageSub">Scanning trade registry entries, compliance requirements, and calculating margins...</div>
          <div class="sov-screen-counter" id="sovVideoCounter">14.5 Hours / Wk Recoverable</div>
          <div class="sov-screen-progress-bar">
            <div class="sov-screen-progress-fill" id="sovVideoProgressFill"></div>
          </div>
        </div>

        <div class="sov-caption-ticker" id="sovVideoCaption">
          ${config.steps[0].caption}
        </div>
      </div>

      <div class="sov-video-controls">
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="sov-ctrl-btn" id="sovVideoPlayToggleBtn" onclick="toggleSovereignVideoPlayback()">Pause</button>
          <button class="sov-ctrl-btn" onclick="restartSovereignVideo()">Restart</button>
          <span class="sov-timeline-text" id="sovVideoTimeline">0:00 / 0:45</span>
        </div>
        <div>
          <button class="sov-action-btn-primary" onclick="openClaimAccess()">Claim Free 7-Day Access</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Playback Logic
  let isPlaying = false;
  let currentSecond = 0;
  let videoInterval = null;
  const TOTAL_DURATION = 45;

  window.openSovereignVideo = function() {
    overlay.style.display = "flex";
    isPlaying = true;
    currentSecond = 0;
    document.getElementById("sovVideoPlayToggleBtn").innerText = "Pause";
    speakNarration(config.voiceScript);
    startPlaybackLoop();
  };

  window.closeSovereignVideo = function() {
    overlay.style.display = "none";
    isPlaying = false;
    if (videoInterval) clearInterval(videoInterval);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  window.toggleSovereignVideoPlayback = function() {
    isPlaying = !isPlaying;
    const btn = document.getElementById("sovVideoPlayToggleBtn");
    if (isPlaying) {
      btn.innerText = "Pause";
      startPlaybackLoop();
      if (window.speechSynthesis) window.speechSynthesis.resume();
    } else {
      btn.innerText = "Play";
      if (videoInterval) clearInterval(videoInterval);
      if (window.speechSynthesis) window.speechSynthesis.pause();
    }
  };

  window.restartSovereignVideo = function() {
    currentSecond = 0;
    isPlaying = true;
    document.getElementById("sovVideoPlayToggleBtn").innerText = "Pause";
    if (videoInterval) clearInterval(videoInterval);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    speakNarration(config.voiceScript);
    startPlaybackLoop();
  };

  window.openClaimAccess = function() {
    window.closeSovereignVideo();
    if (typeof openSandboxActivationModal === "function") {
      openSandboxActivationModal("Full Enterprise Suite");
    } else {
      window.location.href = "https://whop.com/checkout/plan_UL1yNCSJUr2Ka";
    }
  };

  function speakNarration(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
      if (ukVoice) utterance.voice = ukVoice;
      window.speechSynthesis.speak(utterance);
    }
  }

  function startPlaybackLoop() {
    if (videoInterval) clearInterval(videoInterval);
    videoInterval = setInterval(function() {
      if (!isPlaying) return;
      currentSecond++;
      if (currentSecond > TOTAL_DURATION) {
        currentSecond = TOTAL_DURATION;
        isPlaying = false;
        document.getElementById("sovVideoPlayToggleBtn").innerText = "Replay";
        clearInterval(videoInterval);
        return;
      }

      // Update UI Progress
      const pct = (currentSecond / TOTAL_DURATION) * 100;
      document.getElementById("sovVideoProgressFill").style.width = pct + "%";
      document.getElementById("sovVideoTimeline").innerText = `0:${String(currentSecond).padStart(2, '0')} / 0:45`;

      // Update Captions and Stage
      for (let i = config.steps.length - 1; i >= 0; i--) {
        if (currentSecond >= config.steps[i].time) {
          document.getElementById("sovVideoCaption").innerText = config.steps[i].caption;
          document.getElementById("sovVideoStageTitle").innerText = config.steps[i].label;
          break;
        }
      }

      if (currentSecond < 15) {
        document.getElementById("sovVideoCounter").innerText = "£" + (currentSecond * 210).toLocaleString() + " Recovered / Mo";
      } else if (currentSecond < 30) {
        document.getElementById("sovVideoCounter").innerText = "14.5 Hours Weekly Saved";
      } else {
        document.getElementById("sovVideoCounter").innerText = "Official PDF Ready (1-Click)";
      }
    }, 1000);
  }

  let isHeroPlaying = false;
  let heroCurrentSec = 0;
  let heroTimer = null;

  window.toggleHeroVideoPlay = function() {
    isHeroPlaying = !isHeroPlaying;
    const btn = document.getElementById("heroVidPlayBtn");
    if (isHeroPlaying) {
      if (btn) btn.innerText = "Pause Demo";
      speakNarration(config.voiceScript);
      startHeroLoop();
    } else {
      if (btn) btn.innerText = "Resume Demo";
      if (heroTimer) clearInterval(heroTimer);
      if (window.speechSynthesis) window.speechSynthesis.pause();
    }
  };

  window.restartHeroVideo = function() {
    heroCurrentSec = 0;
    isHeroPlaying = true;
    const btn = document.getElementById("heroVidPlayBtn");
    if (btn) btn.innerText = "Pause Demo";
    if (heroTimer) clearInterval(heroTimer);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    speakNarration(config.voiceScript);
    startHeroLoop();
  };

  function startHeroLoop() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(function() {
      if (!isHeroPlaying) return;
      heroCurrentSec++;
      if (heroCurrentSec > TOTAL_DURATION) {
        heroCurrentSec = TOTAL_DURATION;
        isHeroPlaying = false;
        const btn = document.getElementById("heroVidPlayBtn");
        if (btn) btn.innerText = "Replay Demo";
        clearInterval(heroTimer);
        return;
      }

      const timelineEl = document.getElementById("heroVidTimeline");
      if (timelineEl) timelineEl.innerText = `0:${String(heroCurrentSec).padStart(2, '0')} / 0:45`;

      for (let i = config.steps.length - 1; i >= 0; i--) {
        if (heroCurrentSec >= config.steps[i].time) {
          const capEl = document.getElementById("heroVidCaption");
          if (capEl) capEl.innerText = config.steps[i].caption;
          const stepEl = document.getElementById("heroVidStep");
          if (stepEl) stepEl.innerText = config.steps[i].label.toUpperCase();
          break;
        }
      }

      if (heroCurrentSec < 15) {
        const hoursEl = document.getElementById("heroVidHours");
        if (hoursEl) hoursEl.innerText = "14.5 Hrs/Wk";
        const bleedEl = document.getElementById("heroVidBleed");
        if (bleedEl) bleedEl.innerText = "+GBP " + (heroCurrentSec * 210).toLocaleString();
      } else if (heroCurrentSec < 30) {
        const hoursEl = document.getElementById("heroVidHours");
        if (hoursEl) hoursEl.innerText = "18.0 Hrs/Wk";
        const bleedEl = document.getElementById("heroVidBleed");
        if (bleedEl) bleedEl.innerText = "+GBP 4,800.00";
        const speedEl = document.getElementById("heroVidSpeed");
        if (speedEl) speedEl.innerText = "6 Seconds";
      } else {
        const hoursEl = document.getElementById("heroVidHours");
        if (hoursEl) hoursEl.innerText = "Day 1 ROI";
        const bleedEl = document.getElementById("heroVidBleed");
        if (bleedEl) bleedEl.innerText = "+GBP 6,500.00";
        const speedEl = document.getElementById("heroVidSpeed");
        if (speedEl) speedEl.innerText = "PDF Ready";
      }
    }, 1000);
  }

  // Auto-inject Trigger Button into Hero Section if present
  window.addEventListener("DOMContentLoaded", function() {
    const heroActions = document.querySelector(".hero-actions, .cta-group, .showcase-header");
    if (heroActions) {
      const btn = document.createElement("button");
      btn.className = "sov-video-trigger-btn";
      btn.innerHTML = `<span class="sov-video-play-icon"></span> Watch 45-Second Operational Demo`;
      btn.onclick = window.openSovereignVideo;
      heroActions.appendChild(btn);
    }
  });
})();
