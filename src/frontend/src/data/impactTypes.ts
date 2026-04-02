// ---------------------------------------------------------------------------
// Impact Measurement & SDG Alignment — Types
// Phase 13 · Area 4
// ---------------------------------------------------------------------------

export type SDGoalNumber =
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

export type ImpactDimension =
  | "social"
  | "economic"
  | "environmental"
  | "governance"
  | "cultural";
export type ImpactLevel = "local" | "national" | "regional" | "global";
export type ImpactTrend = "improving" | "stable" | "declining" | "unknown";
export type ImpactReportStatus =
  | "draft"
  | "submitted"
  | "verified"
  | "published";
export type SDGContributionStrength = "primary" | "secondary" | "supporting";
export type OrgImpactBadge = "pioneer" | "leader" | "contributor";

// ---------------------------------------------------------------------------
// SDG Goal Descriptor
// ---------------------------------------------------------------------------

export interface SDGoal {
  number: SDGoalNumber;
  title: string;
  shortTitle: string;
  description: string;
  emoji: string;
  color: string; // OKLCH string
  dimensions: ImpactDimension[];
  targetCount: number;
}

// ---------------------------------------------------------------------------
// Impact Metric
// ---------------------------------------------------------------------------

export interface ImpactMetric {
  id: string;
  name: string;
  description: string;
  unit: string;
  baseline: number;
  current: number;
  target: number;
  trend: ImpactTrend;
  dimension: ImpactDimension;
  level: ImpactLevel;
  linkedSDGs: SDGoalNumber[];
  orgId: string;
  evidenceUrl?: string;
  lastUpdated: string;
}

// ---------------------------------------------------------------------------
// Impact Report
// ---------------------------------------------------------------------------

export interface ImpactReportSection {
  heading: string;
  body: string;
  metrics?: string[]; // metric ids
}

export interface ImpactReport {
  id: string;
  title: string;
  summary: string;
  orgId: string;
  linkedResolutionId?: string;
  linkedSolutionId?: string;
  linkedSDGs: SDGoalNumber[];
  dimensions: ImpactDimension[];
  level: ImpactLevel;
  sections: ImpactReportSection[];
  overallScore: number; // 0–100
  status: ImpactReportStatus;
  submittedAt?: string;
  verifiedAt?: string;
  publishedAt?: string;
  evidenceUrls: string[];
}

// ---------------------------------------------------------------------------
// Org Impact Profile
// ---------------------------------------------------------------------------

export interface SDGContribution {
  sdgNumber: SDGoalNumber;
  strength: SDGContributionStrength;
  reportsCount: number;
  metricsCount: number;
  avgScore: number;
}

export interface OrgImpactProfile {
  orgId: string;
  orgName: string;
  rank: number;
  badge: OrgImpactBadge;
  overallScore: number;
  contributionScore: number;
  nationsReached: number;
  sdgContributions: SDGContribution[];
  totalReports: number;
  totalMetrics: number;
  topSDGs: SDGoalNumber[];
}

// ---------------------------------------------------------------------------
// Platform Impact Aggregate
// ---------------------------------------------------------------------------

export interface PlatformImpactAggregate {
  nationsReached: number;
  sdgsTouched: number;
  totalMetrics: number;
  totalReports: number;
  avgImpactScore: number;
  totalSolutionsTracked: number;
  totalResolutionsLinked: number;
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// Config Constants
// ---------------------------------------------------------------------------

export const IMPACT_DIMENSION_CONFIG: Record<
  ImpactDimension,
  { label: string; color: string; icon: string }
> = {
  social: { label: "Social", color: "oklch(0.68 0.18 252)", icon: "👥" },
  economic: { label: "Economic", color: "oklch(0.72 0.16 75)", icon: "💰" },
  environmental: {
    label: "Environmental",
    color: "oklch(0.65 0.20 160)",
    icon: "🌿",
  },
  governance: { label: "Governance", color: "oklch(0.68 0.22 290)", icon: "⚖️" },
  cultural: { label: "Cultural", color: "oklch(0.70 0.18 340)", icon: "🎭" },
};

export const IMPACT_LEVEL_CONFIG: Record<
  ImpactLevel,
  { label: string; color: string }
> = {
  local: { label: "Local", color: "oklch(0.65 0.14 195)" },
  national: { label: "National", color: "oklch(0.68 0.18 252)" },
  regional: { label: "Regional", color: "oklch(0.72 0.16 75)" },
  global: { label: "Global", color: "oklch(0.72 0.16 140)" },
};

export const IMPACT_TREND_CONFIG: Record<
  ImpactTrend,
  { label: string; color: string; arrow: string }
> = {
  improving: { label: "Improving", color: "oklch(0.65 0.20 160)", arrow: "↑" },
  stable: { label: "Stable", color: "oklch(0.68 0.12 200)", arrow: "→" },
  declining: { label: "Declining", color: "oklch(0.55 0.20 25)", arrow: "↓" },
  unknown: { label: "Unknown", color: "oklch(0.50 0.04 260)", arrow: "?" },
};

export const IMPACT_REPORT_STATUS_CONFIG: Record<
  ImpactReportStatus,
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "oklch(0.60 0.06 260)" },
  submitted: { label: "Submitted", color: "oklch(0.70 0.18 252)" },
  verified: { label: "Verified", color: "oklch(0.72 0.16 75)" },
  published: { label: "Published", color: "oklch(0.65 0.20 160)" },
};

export const SDG_CONTRIBUTION_CONFIG: Record<
  SDGContributionStrength,
  { label: string; opacity: number }
> = {
  primary: { label: "Primary", opacity: 1 },
  secondary: { label: "Secondary", opacity: 0.7 },
  supporting: { label: "Supporting", opacity: 0.45 },
};

export const IMPACT_STORAGE_KEY = "oeh_impact_";
export const SDG_WHEEL_SEGMENTS = 17;
