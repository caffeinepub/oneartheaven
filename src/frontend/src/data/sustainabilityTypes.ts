// Phase 8: Sustainability & Global Impact Dashboard — Type Definitions

export type SDGGoal =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;
export type TrendDirection = "improving" | "stable" | "declining" | "critical";
export type ImpactCategory =
  | "climate"
  | "health"
  | "food_water"
  | "education"
  | "peace"
  | "economy"
  | "technology";
export type ReportCategory =
  | "climate"
  | "biodiversity"
  | "water"
  | "energy"
  | "food_security"
  | "urban";
export type WorldRegion =
  | "africa"
  | "americas"
  | "asia"
  | "europe"
  | "oceania"
  | "mena"
  | "global";
export type SDGStatus = "on_track" | "at_risk" | "off_track";
export type FFTier = "Seed" | "Growth" | "Scale" | "Global";

export interface SDGIndicator {
  id: string;
  goal: SDGGoal;
  name: string;
  description: string;
  icon: string;
  color: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: TrendDirection;
  status: SDGStatus;
  councilOwner: string;
  linkedResolutions: string[];
  linkedSolutions: string[];
  ffAdoptionCount: number;
  baselineYear: number;
  targetYear: number;
}

export interface ImpactMetric {
  id: string;
  name: string;
  category: ImpactCategory;
  unit: string;
  baselineValue: number;
  currentValue: number;
  targetValue: number;
  region: WorldRegion;
  trend: TrendDirection;
  dataSource: string;
  lastUpdated: string;
  councilLead: string;
  linkedInitiatives: string[];
}

export interface EnvironmentalDataPoint {
  label: string;
  value: number;
  unit: string;
  year: number;
}

export interface EnvironmentalReport {
  id: string;
  category: ReportCategory;
  title: string;
  source: string;
  period: string;
  headlineFinding: string;
  keyDataPoints: EnvironmentalDataPoint[];
  downloadUrl?: string;
  publishedDate: string;
  region: WorldRegion;
}

export interface NationSDGRecord {
  goal: SDGGoal;
  status: SDGStatus;
  score: number;
}

export interface NationProgressRecord {
  id: string;
  nation: string;
  region: WorldRegion;
  complianceScore: number;
  sdgsTracked: number;
  ffAdoptionCount: number;
  topPerformingSDG: SDGGoal;
  mostAtRiskSDG: SDGGoal;
  sdgRecords: NationSDGRecord[];
  solutionsAdopted: number;
  lastReportDate: string;
}

export interface SustainabilityStats {
  totalSDGs: number;
  nationsReporting: number;
  impactMetrics: number;
  solutionsAdopted: number;
  avgGlobalSDGProgress: number;
}

export const SDG_CONFIG: Record<
  SDGGoal,
  { name: string; color: string; icon: string }
> = {
  1: { name: "No Poverty", color: "#E5243B", icon: "🏠" },
  2: { name: "Zero Hunger", color: "#DDA63A", icon: "🌾" },
  3: { name: "Good Health & Well-being", color: "#4C9F38", icon: "❤️" },
  4: { name: "Quality Education", color: "#C5192D", icon: "📚" },
  5: { name: "Gender Equality", color: "#FF3A21", icon: "⚖️" },
  6: { name: "Clean Water & Sanitation", color: "#26BDE2", icon: "💧" },
  7: { name: "Affordable & Clean Energy", color: "#FCC30B", icon: "☀️" },
  8: { name: "Decent Work & Economic Growth", color: "#A21942", icon: "💼" },
  9: {
    name: "Industry, Innovation & Infrastructure",
    color: "#FD6925",
    icon: "🏗️",
  },
  10: { name: "Reduced Inequalities", color: "#DD1367", icon: "🤝" },
  11: { name: "Sustainable Cities & Communities", color: "#FD9D24", icon: "🏙️" },
  12: {
    name: "Responsible Consumption & Production",
    color: "#BF8B2E",
    icon: "♻️",
  },
  13: { name: "Climate Action", color: "#3F7E44", icon: "🌍" },
  14: { name: "Life Below Water", color: "#0A97D9", icon: "🌊" },
  15: { name: "Life on Land", color: "#56C02B", icon: "🌿" },
  16: {
    name: "Peace, Justice & Strong Institutions",
    color: "#00689D",
    icon: "🕊️",
  },
  17: { name: "Partnerships for the Goals", color: "#19486A", icon: "🌐" },
};

export const TREND_CONFIG: Record<
  TrendDirection,
  { label: string; color: string; arrow: string }
> = {
  improving: { label: "Improving", color: "#4C9F38", arrow: "↑" },
  stable: { label: "Stable", color: "#FCC30B", arrow: "→" },
  declining: { label: "Declining", color: "#FD6925", arrow: "↓" },
  critical: { label: "Critical", color: "#E5243B", arrow: "↘" },
};

export const SDG_STATUS_CONFIG: Record<
  SDGStatus,
  { label: string; color: string }
> = {
  on_track: { label: "On Track", color: "#4C9F38" },
  at_risk: { label: "At Risk", color: "#FCC30B" },
  off_track: { label: "Off Track", color: "#E5243B" },
};

export const WORLD_REGION_CONFIG: Record<WorldRegion, { label: string }> = {
  africa: { label: "Africa" },
  americas: { label: "Americas" },
  asia: { label: "Asia" },
  europe: { label: "Europe" },
  oceania: { label: "Oceania" },
  mena: { label: "Middle East & North Africa" },
  global: { label: "Global" },
};

export const IMPACT_CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  climate: { label: "Climate", color: "#3F7E44" },
  health: { label: "Health", color: "#4C9F38" },
  food_water: { label: "Food & Water", color: "#26BDE2" },
  education: { label: "Education", color: "#C5192D" },
  peace: { label: "Peace", color: "#00689D" },
  economy: { label: "Economy", color: "#A21942" },
  technology: { label: "Technology", color: "#FD6925" },
};
