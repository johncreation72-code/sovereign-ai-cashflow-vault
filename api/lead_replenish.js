export default function handler(req, res) {
  return res.status(200).json({
    status: "CLOUD_LEAD_REPLENISHED",
    timestamp: new Date().toISOString(),
    totalActiveLeads: 150,
    activeJurisdictions: ["UK", "US", "EU", "CA", "AU", "GCC"]
  });
}
