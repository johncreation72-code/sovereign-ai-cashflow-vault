export default function handler(req, res) {
  const now = new Date();
  const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;
  
  const markets = [
    { zone: "AEST", city: "Sydney / Melbourne", offsetUTC: 10, openLocalHour: 9, closeLocalHour: 17, currency: "AUD" },
    { zone: "GST", city: "Dubai / Abu Dhabi", offsetUTC: 4, openLocalHour: 9, closeLocalHour: 18, currency: "AED" },
    { zone: "GMT", city: "London / Manchester", offsetUTC: 0, openLocalHour: 8.5, closeLocalHour: 17.5, currency: "GBP" },
    { zone: "CET", city: "Frankfurt / Paris", offsetUTC: 1, openLocalHour: 9, closeLocalHour: 17.5, currency: "EUR" },
    { zone: "EST", city: "New York / Miami", offsetUTC: -5, openLocalHour: 9, closeLocalHour: 17, currency: "USD" },
    { zone: "PST", city: "Los Angeles / SF", offsetUTC: -8, openLocalHour: 9, closeLocalHour: 17, currency: "USD" }
  ];

  const active = markets.filter(m => {
    let local = (utcHour + m.offsetUTC + 24) % 24;
    return local >= m.openLocalHour && local <= m.closeLocalHour;
  });

  return res.status(200).json({
    status: "CLOUD_DISPATCH_ACTIVE",
    timestamp: now.toISOString(),
    activeZones: active
  });
}
