// ─── Policy Advisor Types ─────────────────────────────────────────────────────

export type RecommendationType =
  | "approve"
  | "approve_with_conditions"
  | "revise"
  | "reject"
  | "defer";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type CouncilId =
  | "climate"
  | "health"
  | "peace"
  | "econ"
  | "edu"
  | "tech"
  | "food"
  | "culture"
  | "general";

export interface CharterArticleScore {
  articleId: string;
  articleTitle: string;
  score: number; // 0-100
  notes: string;
}

export interface CharterAlignmentBreakdown {
  overall: number;
  articles: CharterArticleScore[];
}

export interface RiskFlag {
  id: string;
  title: string;
  category: string;
  severity: RiskLevel;
  description: string;
  mitigation: string;
}

export interface UnintendedConsequence {
  id: string;
  title: string;
  likelihood: "low" | "medium" | "high";
  impact: "minor" | "moderate" | "significant" | "severe";
  affectedRegions: string[];
  preventionNote: string;
}

export interface PolicyPrecedent {
  id: string;
  title: string;
  year: number;
  organization: string;
  outcome: "success" | "partial" | "failure" | "mixed";
  relevanceScore: number; // 0-100
  keyLessons: string[];
  region: string;
}

export interface FinFracFranAssessment {
  applicable: boolean;
  franchisabilityScore?: number; // 0-100
  recommendedModel?: string;
  fractionalizationOpportunities?: string[];
  pilotRecommendation?: string;
  adoptionBarriers?: string[];
}

export interface PolicyAnalysis {
  id: string;
  proposalId: string;
  proposalTitle: string;
  councilId: CouncilId;
  councilName: string;
  councilColor: string;
  analyzedAt: string;
  analyzerVersion: string;
  recommendation: RecommendationType;
  alignmentScore: number; // 0-100
  charterAlignment: CharterAlignmentBreakdown;
  recommendationRationale: string;
  riskFlags: RiskFlag[];
  unintendedConsequences: UnintendedConsequence[];
  precedents: PolicyPrecedent[];
  finFracFran: FinFracFranAssessment;
  keyStrengths: string[];
  keyWeaknesses: string[];
  suggestedAmendments: string[];
  impactScope: string;
  estimatedCost: string;
  timeToImplement: string;
  sdgTags: string[];
}

// ─── Config Constants ─────────────────────────────────────────────────────────

export const RECOMMENDATION_CONFIG: Record<
  RecommendationType,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  approve: {
    label: "Approve",
    color: "oklch(0.68 0.2 145)",
    bg: "oklch(0.68 0.2 145 / 0.12)",
    border: "oklch(0.68 0.2 145 / 0.3)",
    icon: "✓",
  },
  approve_with_conditions: {
    label: "Approve with Conditions",
    color: "oklch(0.78 0.18 85)",
    bg: "oklch(0.78 0.18 85 / 0.1)",
    border: "oklch(0.78 0.18 85 / 0.28)",
    icon: "◎",
  },
  revise: {
    label: "Revise & Resubmit",
    color: "oklch(0.72 0.18 60)",
    bg: "oklch(0.72 0.18 60 / 0.1)",
    border: "oklch(0.72 0.18 60 / 0.28)",
    icon: "↺",
  },
  reject: {
    label: "Reject",
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.62 0.22 25 / 0.1)",
    border: "oklch(0.62 0.22 25 / 0.28)",
    icon: "✗",
  },
  defer: {
    label: "Defer",
    color: "oklch(0.65 0.1 270)",
    bg: "oklch(0.65 0.1 270 / 0.1)",
    border: "oklch(0.65 0.1 270 / 0.28)",
    icon: "⏸",
  },
};

export const RISK_LEVEL_CONFIG: Record<
  RiskLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  low: {
    label: "Low Risk",
    color: "oklch(0.68 0.2 145)",
    bg: "oklch(0.68 0.2 145 / 0.1)",
    border: "oklch(0.68 0.2 145 / 0.25)",
  },
  medium: {
    label: "Medium Risk",
    color: "oklch(0.78 0.18 85)",
    bg: "oklch(0.78 0.18 85 / 0.1)",
    border: "oklch(0.78 0.18 85 / 0.25)",
  },
  high: {
    label: "High Risk",
    color: "oklch(0.72 0.22 45)",
    bg: "oklch(0.72 0.22 45 / 0.1)",
    border: "oklch(0.72 0.22 45 / 0.25)",
  },
  critical: {
    label: "Critical Risk",
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.62 0.22 25 / 0.12)",
    border: "oklch(0.62 0.22 25 / 0.3)",
  },
};
