// ---------------------------------------------------------------------------
// Partnership & Ecosystem Hub — Types
// Phase 13 · Area 8
// ---------------------------------------------------------------------------

export type PartnerType =
  | "founding"
  | "regional-champion"
  | "academic"
  | "ngo"
  | "corporate"
  | "government"
  | "open-source";

export type PartnerStatus = "prospect" | "invited" | "active" | "suspended";
export type AgreementType =
  | "mou"
  | "revenue-share"
  | "integration"
  | "data-sharing"
  | "co-development";
export type AgreementStatus =
  | "draft"
  | "pending-signature"
  | "active"
  | "expired"
  | "terminated";
export type PartnerRegion =
  | "africa"
  | "asia-pacific"
  | "europe"
  | "latin-america"
  | "middle-east"
  | "north-america"
  | "oceania"
  | "global";
export type PartnerTier = "platinum" | "gold" | "silver" | "bronze";
export type SDGFocusArea =
  | "climate"
  | "education"
  | "health"
  | "governance"
  | "finance"
  | "community"
  | "technology"
  | "agriculture"
  | "energy"
  | "water"
  | "peace"
  | "equality";

// ---------------------------------------------------------------------------
// Partner Profile
// ---------------------------------------------------------------------------

export interface PartnerProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: PartnerType;
  tier: PartnerTier;
  status: PartnerStatus;
  country: string;
  region: PartnerRegion;
  coordinates: { lat: number; lng: number };
  sdgFocus: SDGFocusArea[];
  contributionScore: number; // 0–100
  ffTier: string;
  featuredQuote?: string;
  contactName: string;
  contactEmail: string;
  website?: string;
  logoEmoji: string; // placeholder for org logo
  memberSince: string;
  agreementIds: string[];
}

// ---------------------------------------------------------------------------
// Partnership Agreement
// ---------------------------------------------------------------------------

export interface PartnerAgreement {
  id: string;
  partnerId: string;
  partnerName: string;
  type: AgreementType;
  status: AgreementStatus;
  title: string;
  summary: string;
  terms: string[];
  valueUSD?: number;
  revenueSharePct?: number;
  signedAt?: string;
  expiresAt?: string;
  autoRenew: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Filter & Stats
// ---------------------------------------------------------------------------

export interface PartnerFilter {
  type?: PartnerType | "all";
  tier?: PartnerTier | "all";
  region?: PartnerRegion | "all";
  status?: PartnerStatus | "all";
  sdgFocus?: SDGFocusArea | "all";
  search?: string;
  sortBy?: "name" | "score-desc" | "newest" | "tier";
}

export interface PartnerStats {
  total: number;
  active: number;
  byType: Record<PartnerType, number>;
  byRegion: Record<PartnerRegion, number>;
  byTier: Record<PartnerTier, number>;
  nations: number;
  sdgsCovered: number;
  avgScore: number;
  totalAgreementValue: number;
}

// ---------------------------------------------------------------------------
// Application Form
// ---------------------------------------------------------------------------

export interface PartnerApplicationForm {
  // Step 1 — Org Details
  orgName: string;
  orgType: PartnerType | "";
  country: string;
  website: string;
  contactName: string;
  contactEmail: string;
  // Step 2 — Mission & SDG Focus
  mission: string;
  sdgFocus: SDGFocusArea[];
  impactDescription: string;
  // Step 3 — Partnership Preferences
  preferredType: AgreementType | "";
  expectedContribution: string;
  timelineMonths: number;
  referralSource: string;
}

// ---------------------------------------------------------------------------
// Config Constants
// ---------------------------------------------------------------------------

export const PARTNER_TYPE_CONFIG: Record<
  PartnerType,
  {
    label: string;
    icon: string;
    color: string;
    bgColor: string;
    description: string;
  }
> = {
  founding: {
    label: "Founding Partner",
    icon: "⭐",
    color: "oklch(0.82 0.16 75)",
    bgColor: "oklch(0.82 0.16 75 / 0.12)",
    description: "Core founding partners of the platform",
  },
  "regional-champion": {
    label: "Regional Champion",
    icon: "🌍",
    color: "oklch(0.70 0.18 195)",
    bgColor: "oklch(0.70 0.18 195 / 0.12)",
    description: "Lead adoption in a geographic region",
  },
  academic: {
    label: "Academic",
    icon: "🎓",
    color: "oklch(0.68 0.22 250)",
    bgColor: "oklch(0.68 0.22 250 / 0.12)",
    description: "Universities and research institutions",
  },
  ngo: {
    label: "NGO",
    icon: "💚",
    color: "oklch(0.68 0.18 140)",
    bgColor: "oklch(0.68 0.18 140 / 0.12)",
    description: "Non-governmental organizations",
  },
  corporate: {
    label: "Corporate",
    icon: "🏢",
    color: "oklch(0.65 0.18 230)",
    bgColor: "oklch(0.65 0.18 230 / 0.12)",
    description: "Private sector companies",
  },
  government: {
    label: "Government",
    icon: "🏛️",
    color: "oklch(0.68 0.22 290)",
    bgColor: "oklch(0.68 0.22 290 / 0.12)",
    description: "National and local government bodies",
  },
  "open-source": {
    label: "Open Source",
    icon: "🔓",
    color: "oklch(0.68 0.18 40)",
    bgColor: "oklch(0.68 0.18 40 / 0.12)",
    description: "Open-source communities and foundations",
  },
};

export const PARTNER_STATUS_CONFIG: Record<
  PartnerStatus,
  { label: string; color: string; dot: string }
> = {
  prospect: {
    label: "Prospect",
    color: "oklch(0.65 0.03 260)",
    dot: "bg-slate-500",
  },
  invited: {
    label: "Invited",
    color: "oklch(0.72 0.16 75)",
    dot: "bg-amber-500",
  },
  active: {
    label: "Active",
    color: "oklch(0.70 0.18 140)",
    dot: "bg-green-500",
  },
  suspended: {
    label: "Suspended",
    color: "oklch(0.65 0.15 27)",
    dot: "bg-red-500",
  },
};

export const PARTNER_TIER_CONFIG: Record<
  PartnerTier,
  { label: string; color: string; icon: string }
> = {
  platinum: { label: "Platinum", color: "oklch(0.82 0.06 260)", icon: "💎" },
  gold: { label: "Gold", color: "oklch(0.82 0.16 75)", icon: "🥇" },
  silver: { label: "Silver", color: "oklch(0.72 0.04 260)", icon: "🥈" },
  bronze: { label: "Bronze", color: "oklch(0.65 0.10 55)", icon: "🥉" },
};

export const PARTNER_REGION_CONFIG: Record<
  PartnerRegion,
  { label: string; flag: string }
> = {
  africa: { label: "Africa", flag: "🌍" },
  "asia-pacific": { label: "Asia-Pacific", flag: "🌏" },
  europe: { label: "Europe", flag: "🇪🇺" },
  "latin-america": { label: "Latin America", flag: "🌎" },
  "middle-east": { label: "Middle East", flag: "🌍" },
  "north-america": { label: "North America", flag: "🌎" },
  oceania: { label: "Oceania", flag: "🌏" },
  global: { label: "Global", flag: "🌐" },
};

export const AGREEMENT_TYPE_CONFIG: Record<
  AgreementType,
  { label: string; color: string }
> = {
  mou: { label: "Memorandum of Understanding", color: "oklch(0.68 0.22 250)" },
  "revenue-share": { label: "Revenue Share", color: "oklch(0.72 0.16 75)" },
  integration: {
    label: "Integration Agreement",
    color: "oklch(0.70 0.18 195)",
  },
  "data-sharing": { label: "Data Sharing", color: "oklch(0.68 0.22 290)" },
  "co-development": { label: "Co-Development", color: "oklch(0.68 0.18 140)" },
};

export const AGREEMENT_STATUS_CONFIG: Record<
  AgreementStatus,
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "oklch(0.60 0.03 260)" },
  "pending-signature": {
    label: "Pending Signature",
    color: "oklch(0.72 0.16 75)",
  },
  active: { label: "Active", color: "oklch(0.70 0.18 140)" },
  expired: { label: "Expired", color: "oklch(0.55 0.03 260)" },
  terminated: { label: "Terminated", color: "oklch(0.65 0.15 27)" },
};

export const SDG_FOCUS_CONFIG: Record<
  SDGFocusArea,
  { label: string; icon: string; color: string }
> = {
  climate: { label: "Climate", icon: "🌱", color: "oklch(0.68 0.18 140)" },
  education: { label: "Education", icon: "📚", color: "oklch(0.68 0.22 250)" },
  health: { label: "Health", icon: "❤️", color: "oklch(0.65 0.20 27)" },
  governance: { label: "Governance", icon: "⚖️", color: "oklch(0.68 0.22 290)" },
  finance: { label: "Finance", icon: "💰", color: "oklch(0.72 0.16 75)" },
  community: { label: "Community", icon: "🤝", color: "oklch(0.68 0.18 195)" },
  technology: {
    label: "Technology",
    icon: "💻",
    color: "oklch(0.65 0.18 230)",
  },
  agriculture: {
    label: "Agriculture",
    icon: "🌾",
    color: "oklch(0.68 0.18 100)",
  },
  energy: { label: "Energy", icon: "⚡", color: "oklch(0.72 0.18 65)" },
  water: { label: "Water", icon: "💧", color: "oklch(0.65 0.18 215)" },
  peace: { label: "Peace", icon: "🕊️", color: "oklch(0.68 0.12 195)" },
  equality: { label: "Equality", icon: "⚡", color: "oklch(0.68 0.18 310)" },
};

export const APPLICATION_STEPS = [
  "Organisation Details",
  "Mission & SDG Focus",
  "Partnership Preferences",
];
