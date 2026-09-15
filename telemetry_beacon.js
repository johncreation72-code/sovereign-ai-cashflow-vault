/**
 * Real-Time Telemetry Beacon
 * Transmits authentic visitor pageviews and user engagements to the telemetry backend.
 */
(function() {
  const pageName = window.location.pathname.split('/').pop() || 'index.html';

  function sendBeaconEvent(eventType, detail) {
    try {
      const payload = JSON.stringify({
        event: eventType,
        page: pageName,
        detail: detail || ''
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/telemetry', payload);
      } else {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {}
  }

  // 1. Send real pageview on load
  sendBeaconEvent('pageview', 'Visitor Loaded ' + pageName);

  // 2. Intercept checkout clicks
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    if (href.includes('whop.com') || href.includes('checkout')) {
      sendBeaconEvent('checkout_clicked', 'Clicked ' + (target.innerText || 'Checkout Link').substring(0, 30));
    }
  });

  // Global helper for interactive elements
  window.reportTelemetryEvent = sendBeaconEvent;
})();
