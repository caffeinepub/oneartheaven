// ─── Solutions Types ─────────────────────────────────────────────────────────

export type SolutionCategory =
  | "all"
  | "energy"
  | "health"
  | "food_water"
  | "education"
  | "peace"
  | "economy"
  | "technology"
  | "culture"
  | "governance"
  | "environment";

export type AdoptionStage =
  | "proposed"
  | "piloting"
  | "proven"
  | "scaling"
  | "global";

export type ImpactScale =
  | "local"
  | "municipal"
  | "national"
  | "regional"
  | "global";

export type RegionTag =
  | "africa"
  | "asia_pacific"
  | "europe"
  | "latin_america"
  | "middle_east"
  | "north_america"
  | "oceania"
  | "global";

export type LicenseType =
  | "open_source"
  | "finfracfran_standard"
  | "finfracfran_premium"
  | "cooperative"
  | "hybrid";

export type SDGTag =
  | "sdg1"
  | "sdg2"
  | "sdg3"
  | "sdg4"
  | "sdg5"
  | "sdg6"
  | "sdg7"
  | "sdg8"
  | "sdg9"
  | "sdg10"
  | "sdg11"
  | "sdg12"
  | "sdg13"
  | "sdg14"
  | "sdg15"
  | "sdg16"
  | "sdg17";

export interface ImpactMetric {
  label: string;
  value: string;
  unit?: string;
  icon?: string;
}

export interface AdoptionRecord {
  nationCode: string;
  nationName: string;
  region: RegionTag;
  adoptedYear: number;
  stage: AdoptionStage;
  adaptationNotes?: string;
}

export interface FinFracFranLicense {
  available: boolean;
  licenseType: LicenseType;
  franchiseFee?: string;
  revenueShare?: string;
  minCapital?: string;
  adoptingNations: number;
  notes: string;
}

export interface AIInnovationScore {
  overall: number;
  novelty: number;
  scalability: number;
  replicability: number;
  equityImpact: number;
  analysis: string;
}

export interface Solution {
  id: string;
  code: string;
  title: string;
  tagline: string;
  category: SolutionCategory;
  stage: AdoptionStage;
  region: RegionTag;
  impactScale: ImpactScale;
  problemStatement: string;
  approach: string;
  provenResults: string;
  impactMetrics: ImpactMetric[];
  sdgs: SDGTag[];
  adoptingNations: AdoptionRecord[];
  finFracFran: FinFracFranLicense;
  aiScore: AIInnovationScore;
  councilId: string;
  featured: boolean;
  submittedBy: string;
  submittedDate: string;
  lastUpdated: string;
  imageColor: string;
}

// ─── Config Constants ─────────────────────────────────────────────────────────

export const CATEGORY_CONFIG: Record<
  Exclude<SolutionCategory, "all">,
  { label: string; color: string; bgColor: string; icon: string }
> = {
  energy: {
    label: "Energy",
    color: "oklch(0.78 0.18 75)",
    bgColor: "oklch(0.78 0.18 75 / 0.12)",
    icon: "⚡",
  },
  health: {
    label: "Health",
    color: "oklch(0.7 0.18 150)",
    bgColor: "oklch(0.7 0.18 150 / 0.12)",
    icon: "🏥",
  },
  food_water: {
    label: "Food & Water",
    color: "oklch(0.72 0.16 195)",
    bgColor: "oklch(0.72 0.16 195 / 0.12)",
    icon: "🌾",
  },
  education: {
    label: "Education",
    color: "oklch(0.68 0.18 270)",
    bgColor: "oklch(0.68 0.18 270 / 0.12)",
    icon: "📚",
  },
  peace: {
    label: "Peace",
    color: "oklch(0.72 0.14 220)",
    bgColor: "oklch(0.72 0.14 220 / 0.12)",
    icon: "🕊️",
  },
  economy: {
    label: "Economy",
    color: "oklch(0.75 0.18 85)",
    bgColor: "oklch(0.75 0.18 85 / 0.12)",
    icon: "💼",
  },
  technology: {
    label: "Technology",
    color: "oklch(0.65 0.18 300)",
    bgColor: "oklch(0.65 0.18 300 / 0.12)",
    icon: "💻",
  },
  culture: {
    label: "Culture",
    color: "oklch(0.7 0.2 30)",
    bgColor: "oklch(0.7 0.2 30 / 0.12)",
    icon: "🎨",
  },
  governance: {
    label: "Governance",
    color: "oklch(0.72 0.16 75)",
    bgColor: "oklch(0.72 0.16 75 / 0.12)",
    icon: "⚖️",
  },
  environment: {
    label: "Environment",
    color: "oklch(0.72 0.18 140)",
    bgColor: "oklch(0.72 0.18 140 / 0.12)",
    icon: "🌍",
  },
};

export const STAGE_CONFIG: Record<
  AdoptionStage,
  { label: string; color: string; bgColor: string; order: number }
> = {
  proposed: {
    label: "Proposed",
    color: "oklch(0.6 0.04 260)",
    bgColor: "oklch(0.6 0.04 260 / 0.15)",
    order: 1,
  },
  piloting: {
    label: "Piloting",
    color: "oklch(0.7 0.18 85)",
    bgColor: "oklch(0.7 0.18 85 / 0.15)",
    order: 2,
  },
  proven: {
    label: "Proven",
    color: "oklch(0.72 0.16 195)",
    bgColor: "oklch(0.72 0.16 195 / 0.15)",
    order: 3,
  },
  scaling: {
    label: "Scaling",
    color: "oklch(0.75 0.18 140)",
    bgColor: "oklch(0.75 0.18 140 / 0.15)",
    order: 4,
  },
  global: {
    label: "Global",
    color: "oklch(0.82 0.18 75)",
    bgColor: "oklch(0.82 0.18 75 / 0.15)",
    order: 5,
  },
};

export const REGION_LABELS: Record<RegionTag, string> = {
  africa: "Africa",
  asia_pacific: "Asia-Pacific",
  europe: "Europe",
  latin_america: "Latin America",
  middle_east: "Middle East",
  north_america: "North America",
  oceania: "Oceania",
  global: "Global",
};

export const SDG_LABELS: Record<SDGTag, string> = {
  sdg1: "No Poverty",
  sdg2: "Zero Hunger",
  sdg3: "Good Health",
  sdg4: "Quality Education",
  sdg5: "Gender Equality",
  sdg6: "Clean Water",
  sdg7: "Clean Energy",
  sdg8: "Decent Work",
  sdg9: "Industry & Innovation",
  sdg10: "Reduced Inequalities",
  sdg11: "Sustainable Cities",
  sdg12: "Responsible Consumption",
  sdg13: "Climate Action",
  sdg14: "Life Below Water",
  sdg15: "Life on Land",
  sdg16: "Peace & Justice",
  sdg17: "Partnerships",
};
