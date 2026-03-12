// Union types
export type FranchiseTier = "Seed" | "Growth" | "Scale" | "Global";
export type FranchiseCategory =
  | "Governance"
  | "Health"
  | "Education"
  | "Climate"
  | "Technology"
  | "Peace"
  | "Economy"
  | "Food"
  | "Culture"
  | "Assembly";
export type CampaignStatus = "Open" | "Active" | "Goal Met" | "Closed";
export type EnterpriseModel =
  | "Cooperative"
  | "Hybrid"
  | "DAO"
  | "Foundation"
  | "Social Enterprise"
  | "Corporation";
export type InvestmentType =
  | "Grant"
  | "Equity"
  | "Revenue Share"
  | "Impact Bond"
  | "Community Bond"
  | "Convertible";
export type WalletType =
  | "DAO Treasury"
  | "Multi-Sig"
  | "Custodial"
  | "Non-Custodial";
export type InvestmentStatus = "Open" | "Closed" | "Coming Soon";

// Interfaces
export interface FranchiseOpportunity {
  id: string;
  name: string;
  tier: FranchiseTier;
  category: FranchiseCategory;
  description: string;
  nations: number;
  revenueShare: number;
  minInvestment: number;
  currency: string;
  licenseType: string;
  status: "Active" | "Pending" | "Closed";
  adoptionCount: number;
  finfracfranBadge: boolean;
}

export interface FundraisingCampaign {
  id: string;
  title: string;
  category: FranchiseCategory;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  currency: string;
  status: CampaignStatus;
  backers: number;
  endDate: string;
  council: string;
  finfracfranTier?: FranchiseTier;
}

export interface EnterpriseProfile {
  id: string;
  name: string;
  model: EnterpriseModel;
  category: FranchiseCategory;
  description: string;
  nations: number;
  revenue: number;
  currency: string;
  members: number;
  finfracfranTier: FranchiseTier;
  certifications: string[];
}

export interface InvestmentRound {
  id: string;
  title: string;
  type: InvestmentType;
  category: FranchiseCategory;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  status: InvestmentStatus;
  minTicket: number;
  returns: string;
  council: string;
  finfracfranRequired: boolean;
}

export interface WalletRecord {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  currency: string;
  address: string;
  status: "Active" | "Inactive";
  lastTransaction: string;
}

export interface FinanceStats {
  totalFranchises: number;
  activeCampaigns: number;
  totalRaised: number;
  nationsReached: number;
  enterpriseProfiles: number;
  openInvestmentRounds: number;
}

// Config constants
export const FRANCHISE_TIER_CONFIG: Record<
  FranchiseTier,
  { color: string; label: string; bgOpacity: string }
> = {
  Seed: { color: "oklch(0.55 0.14 195)", label: "Seed", bgOpacity: "0.12" },
  Growth: { color: "oklch(0.65 0.18 270)", label: "Growth", bgOpacity: "0.12" },
  Scale: { color: "oklch(0.72 0.16 75)", label: "Scale", bgOpacity: "0.12" },
  Global: { color: "oklch(0.80 0.18 75)", label: "Global", bgOpacity: "0.15" },
};

export const CAMPAIGN_STATUS_CONFIG: Record<
  CampaignStatus,
  { color: string; label: string }
> = {
  Open: { color: "oklch(0.65 0.18 142)", label: "Open" },
  Active: { color: "oklch(0.55 0.14 195)", label: "Active" },
  "Goal Met": { color: "oklch(0.72 0.16 75)", label: "Goal Met" },
  Closed: { color: "oklch(0.52 0.04 260)", label: "Closed" },
};

export const INVESTMENT_TYPE_CONFIG: Record<
  InvestmentType,
  { color: string; label: string }
> = {
  Grant: { color: "oklch(0.65 0.18 142)", label: "Grant" },
  Equity: { color: "oklch(0.65 0.18 270)", label: "Equity" },
  "Revenue Share": { color: "oklch(0.72 0.16 75)", label: "Revenue Share" },
  "Impact Bond": { color: "oklch(0.55 0.14 195)", label: "Impact Bond" },
  "Community Bond": { color: "oklch(0.6 0.16 30)", label: "Community Bond" },
  Convertible: { color: "oklch(0.65 0.14 310)", label: "Convertible" },
};

export const ENTERPRISE_MODEL_CONFIG: Record<
  EnterpriseModel,
  { color: string; label: string }
> = {
  Cooperative: { color: "oklch(0.65 0.18 142)", label: "Cooperative" },
  Hybrid: { color: "oklch(0.55 0.14 195)", label: "Hybrid" },
  DAO: { color: "oklch(0.65 0.18 270)", label: "DAO" },
  Foundation: { color: "oklch(0.72 0.16 75)", label: "Foundation" },
  "Social Enterprise": {
    color: "oklch(0.6 0.16 30)",
    label: "Social Enterprise",
  },
  Corporation: { color: "oklch(0.52 0.04 260)", label: "Corporation" },
};
