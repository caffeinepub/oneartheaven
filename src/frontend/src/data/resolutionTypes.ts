// ─── Resolution Tracker Types ─────────────────────────────────────────────────

export type ResolutionStage =
  | "draft"
  | "review"
  | "voting"
  | "passed"
  | "implementation"
  | "completed";

export type ResolutionCategory =
  | "climate"
  | "health"
  | "education"
  | "peace"
  | "economy"
  | "technology"
  | "oceans"
  | "food"
  | "governance";

export interface ResolutionMilestone {
  id: string;
  label: string;
  completedAt?: string; // ISO date string or undefined if pending
  status: "completed" | "in-progress" | "pending";
}

export interface ResolutionImpact {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "neutral";
}

export interface FinFracFranResolutionData {
  franchiseTier: "Seed" | "Growth" | "Scale" | "Global";
  adoptingNations: number;
  estimatedROI: string;
  licenseType: string;
  spotlight: string;
}

export interface Resolution {
  id: string;
  title: string;
  summary: string;
  category: ResolutionCategory;
  stage: ResolutionStage;
  sponsoringCouncil: string;
  submittedBy: string;
  submittedAt: string;
  lastUpdated: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  aiAlignmentScore: number; // 0-100
  charterAlignment: string[];
  sdgTags: number[];
  milestones: ResolutionMilestone[];
  impactMetrics: ResolutionImpact[];
  finFracFran?: FinFracFranResolutionData;
  nationsImpacted: number;
  fullText?: string;
}

export const STAGE_LABELS: Record<ResolutionStage, string> = {
  draft: "Draft",
  review: "Under Review",
  voting: "Voting Open",
  passed: "Passed",
  implementation: "In Implementation",
  completed: "Completed",
};

export const STAGE_COLORS: Record<ResolutionStage, string> = {
  draft: "oklch(0.55 0.04 260)",
  review: "oklch(0.72 0.16 75)",
  voting: "oklch(0.55 0.22 195)",
  passed: "oklch(0.65 0.2 140)",
  implementation: "oklch(0.65 0.18 270)",
  completed: "oklch(0.72 0.16 75)",
};

export const CATEGORY_LABELS: Record<ResolutionCategory, string> = {
  climate: "Climate & Environment",
  health: "Global Health",
  education: "Education",
  peace: "Peace & Security",
  economy: "Economy & Finance",
  technology: "Technology & AI",
  oceans: "Oceans & Water",
  food: "Food & Agriculture",
  governance: "Governance Reform",
};
