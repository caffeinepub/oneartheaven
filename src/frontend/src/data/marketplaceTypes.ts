export type ListingType =
  | "franchise"
  | "fractional"
  | "campaign"
  | "license"
  | "partnership";
export type ListingTier = "starter" | "growth" | "scale" | "enterprise";
export type ListingStatus =
  | "active"
  | "pending"
  | "closed"
  | "draft"
  | "featured";
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under-review"
  | "approved"
  | "rejected"
  | "withdrawn";
export type Geography =
  | "global"
  | "africa"
  | "asia-pacific"
  | "europe"
  | "latin-america"
  | "middle-east"
  | "north-america"
  | "south-asia"
  | "southeast-asia"
  | "oceania";
export type ImpactCategory =
  | "climate"
  | "education"
  | "health"
  | "governance"
  | "finance"
  | "community"
  | "technology"
  | "agriculture"
  | "energy"
  | "water";

export interface MarketplaceListingFinancials {
  askPrice: number;
  minInvestment: number;
  revenueSharePct: number;
  projectedROI: number;
  paybackMonths: number;
  ffEarningsPct: number;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
}

export interface MarketplaceListing {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorTier: string;
  title: string;
  tagline: string;
  description: string;
  type: ListingType;
  tier: ListingTier;
  status: ListingStatus;
  geography: Geography;
  impactCategory: ImpactCategory;
  sdgIds: number[];
  highlights: string[];
  tags: string[];
  financials: MarketplaceListingFinancials;
  applicationsCount: number;
  viewsCount: number;
  createdAt: string;
  closingDate: string;
  dueDiligenceUrl?: string;
}

export interface FranchiseApplication {
  id: string;
  listingId: string;
  orgId: string;
  orgName: string;
  contactName: string;
  contactEmail: string;
  proposedTerritory: string;
  motivation: string;
  teamSize: number;
  fundingAmount: number;
  timelineMonths: number;
  sdgFocus: number[];
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export interface MarketplaceFilter {
  type?: ListingType | "all";
  tier?: ListingTier | "all";
  geography?: Geography | "all";
  impactCategory?: ImpactCategory | "all";
  minPrice?: number;
  maxPrice?: number;
  minROI?: number;
  search?: string;
  sortBy?:
    | "newest"
    | "price-asc"
    | "price-desc"
    | "roi-desc"
    | "units-remaining"
    | "applications";
}

export interface MarketplaceStats {
  totalListings: number;
  activeListings: number;
  totalVolumeUSD: number;
  avgDealSize: number;
  avgROI: number;
  topCategory: ImpactCategory;
  topGeography: Geography;
  totalApplications: number;
}

export const LISTING_TYPE_CONFIG: Record<
  ListingType,
  {
    label: string;
    icon: string;
    color: string;
    bgColor: string;
    description: string;
  }
> = {
  franchise: {
    label: "Franchise",
    icon: "🏢",
    color: "oklch(0.72 0.16 75)",
    bgColor: "oklch(0.72 0.16 75 / 0.12)",
    description: "License a proven model to operate locally",
  },
  fractional: {
    label: "Fractional",
    icon: "🔀",
    color: "oklch(0.68 0.22 290)",
    bgColor: "oklch(0.68 0.22 290 / 0.12)",
    description: "Invest in fractional ownership of an initiative",
  },
  campaign: {
    label: "Campaign",
    icon: "📣",
    color: "oklch(0.70 0.20 200)",
    bgColor: "oklch(0.70 0.20 200 / 0.12)",
    description: "Fund a targeted impact campaign",
  },
  license: {
    label: "License",
    icon: "📜",
    color: "oklch(0.70 0.18 140)",
    bgColor: "oklch(0.70 0.18 140 / 0.12)",
    description: "License technology or IP for your region",
  },
  partnership: {
    label: "Partnership",
    icon: "🤝",
    color: "oklch(0.68 0.18 40)",
    bgColor: "oklch(0.68 0.18 40 / 0.12)",
    description: "Joint venture and co-development agreements",
  },
};

export const LISTING_TIER_CONFIG: Record<
  ListingTier,
  { label: string; color: string; minInvestment: string }
> = {
  starter: {
    label: "Starter",
    color: "oklch(0.65 0.03 260)",
    minInvestment: "From $5K",
  },
  growth: {
    label: "Growth",
    color: "oklch(0.70 0.18 140)",
    minInvestment: "From $25K",
  },
  scale: {
    label: "Scale",
    color: "oklch(0.72 0.16 75)",
    minInvestment: "From $100K",
  },
  enterprise: {
    label: "Enterprise",
    color: "oklch(0.68 0.22 290)",
    minInvestment: "From $500K",
  },
};

export const LISTING_STATUS_CONFIG: Record<
  ListingStatus,
  { label: string; color: string; dot: string }
> = {
  active: {
    label: "Active",
    color: "oklch(0.70 0.18 140)",
    dot: "bg-green-500",
  },
  pending: {
    label: "Pending Review",
    color: "oklch(0.72 0.16 75)",
    dot: "bg-amber-500",
  },
  closed: {
    label: "Closed",
    color: "oklch(0.55 0.03 260)",
    dot: "bg-slate-500",
  },
  draft: { label: "Draft", color: "oklch(0.60 0.03 260)", dot: "bg-slate-600" },
  featured: {
    label: "Featured",
    color: "oklch(0.68 0.22 290)",
    dot: "bg-purple-500",
  },
};

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "oklch(0.60 0.03 260)" },
  submitted: { label: "Submitted", color: "oklch(0.72 0.16 75)" },
  "under-review": { label: "Under Review", color: "oklch(0.68 0.22 290)" },
  approved: { label: "Approved", color: "oklch(0.70 0.18 140)" },
  rejected: { label: "Rejected", color: "oklch(0.65 0.15 27)" },
  withdrawn: { label: "Withdrawn", color: "oklch(0.55 0.03 260)" },
};

export const GEOGRAPHY_CONFIG: Record<
  Geography,
  { label: string; flag: string }
> = {
  global: { label: "Global", flag: "🌍" },
  africa: { label: "Africa", flag: "🌍" },
  "asia-pacific": { label: "Asia-Pacific", flag: "🌏" },
  europe: { label: "Europe", flag: "🇪🇺" },
  "latin-america": { label: "Latin America", flag: "🌎" },
  "middle-east": { label: "Middle East", flag: "🌍" },
  "north-america": { label: "North America", flag: "🌎" },
  "south-asia": { label: "South Asia", flag: "🌏" },
  "southeast-asia": { label: "Southeast Asia", flag: "🌏" },
  oceania: { label: "Oceania", flag: "🌏" },
};

export const IMPACT_CATEGORY_CONFIG: Record<
  ImpactCategory,
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
};

export const APPLICATION_STEPS = [
  "Org Details",
  "Territory & Commitment",
  "Mission Alignment",
];
