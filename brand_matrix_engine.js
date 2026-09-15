/**
 * ==============================================================================
 * SOVEREIGN // AUTONOMOUS MULTI-BRAND IDENTITY & POSITIONING MATRIX
 * ==============================================================================
 * Dynamically calibrates Visuals, Tone of Voice, Aesthetic, and Copywriting
 * per niche so every product operates under its own distinct, high-status brand.
 * ==============================================================================
 */

const BRAND_IDENTITIES = {
  mental_health: {
    brandName: "Clarity Sanctuary",
    aesthetic: "Warm Minimalist, Botanical Greens, Soft Off-White, Serene Nature",
    toneOfVoice: "Empathetic, Grounding, Clinically Informed, Non-Judgmental",
    voiceParameters: { stability: 0.70, similarity_boost: 0.90, style: 0.05 },
    targetAudience: "Individuals dealing with anxiety, burnout, body dysmorphia, or mental fatigue"
  },

  fitness: {
    brandName: "Metabolic Forge",
    aesthetic: "High-Contrast Charcoal & Electric Orange, Raw Industrial Gym, High-Intensity",
    toneOfVoice: "Direct, Motivational, No-BS Science, High-Energy Accountability",
    voiceParameters: { stability: 0.50, similarity_boost: 0.85, style: 0.25 },
    targetAudience: "Men and women seeking accelerated fat loss and muscle retention without crash diets"
  },

  streetwear: {
    brandName: "Kinetics / Vault",
    aesthetic: "Dark Cyberpunk, Matte Black, Neon Cyan Accents, Underground Luxury",
    toneOfVoice: "Insider, Exclusive, Fast-Paced, Street-Smart Arbitrage",
    voiceParameters: { stability: 0.55, similarity_boost: 0.80, style: 0.20 },
    targetAudience: "Sneakerheads, e-com resellers, fashion enthusiasts, drop flippers"
  },

  creator_media: {
    brandName: "Viral Pulse Studio",
    aesthetic: "Sleek Midnight Purple, Neon Magenta, Glassmorphism, Modern Creator Hub",
    toneOfVoice: "Aspirational, Secret Algorithm Insider, High-Status Growth",
    voiceParameters: { stability: 0.55, similarity_boost: 0.85, style: 0.15 },
    targetAudience: "Short-form creators, models, media agencies, influencer managers"
  },

  b2b_enterprise: {
    brandName: "Sovereign AI Infrastructure",
    aesthetic: "Swiss Minimalist, Deep Navy & Emerald, Bloomberg/Stripe-Level Polish",
    toneOfVoice: "Institutional, Authoritative, Zero-Fluff, Pure Commercial ROI",
    voiceParameters: { stability: 0.65, similarity_boost: 0.90, style: 0.10 },
    targetAudience: "CEOs, CMOs, Clinic Owners, Real Estate Brokerages, Tech Founders"
  }
};

function getBrandProfile(nicheKey) {
  return BRAND_IDENTITIES[nicheKey] || BRAND_IDENTITIES.b2b_enterprise;
}

console.log("================================================================================");
console.log(" SOVEREIGN MULTI-BRAND IDENTITY ENGINE INITIALIZED");
console.log("================================================================================");
Object.entries(BRAND_IDENTITIES).forEach(([key, brand]) => {
  console.log(`[BRAND: ${brand.brandName.toUpperCase()}] (${key})`);
  console.log(`  Aesthetic: ${brand.aesthetic}`);
  console.log(`  Tone: ${brand.toneOfVoice}`);
  console.log(`  Audience: ${brand.targetAudience}\n`);
});

module.exports = { BRAND_IDENTITIES, getBrandProfile };
