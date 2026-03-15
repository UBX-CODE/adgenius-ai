export interface Campaign {
  id: string;
  name: string;
  goal: string;
  budget: number;
  duration: number;
  audience: {
    ageRange: string;
    location: string;
    interests: string;
  };
  adContent: {
    headlines: string[];
    descriptions: string[];
    cta: string;
    audience_segments: string[];
    image_suggestions: string[];
    hashtags: string[];
    relatable_tags: string[];
    image_url?: string;
    demand_analysis: {
      market_trend: string;
      customer_pain_points: string[];
      success_probability: number;
      summary: string;
    };
  };
  platforms: {
    metaId?: string;
    googleId?: string;
    metaStatus?: string;
    googleStatus?: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
  };
  createdAt: string;
  optimizations: string[];
}

export const CAMPAIGN_GOALS = [
  "Leads",
  "Website Traffic",
  "Sales",
  "Brand Awareness"
];

export const DUMMY_PRODUCTS = [
  {
    name: "Solar Panel Installation",
    description: "High-efficiency monocrystalline solar panels for residential homes. Reduce your carbon footprint and save on electricity bills.",
    benefits: "25-year warranty, 70% bill reduction, professional installation included."
  },
  {
    name: "Electric Scooter X1",
    description: "The ultimate urban commuting tool. Foldable, lightweight, and reaches speeds up to 25mph.",
    benefits: "40-mile range, fast charging, puncture-resistant tires."
  },
  {
    name: "Induction Cooktop Pro",
    description: "Professional-grade induction cooking for your home kitchen. Faster, safer, and more energy-efficient than gas.",
    benefits: "Precision temperature control, easy-clean surface, child safety lock."
  }
];
