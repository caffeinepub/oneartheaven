// ---------------------------------------------------------------------------
// PaaS Types — ONEartHeaven™ Platform-as-a-Service
// ---------------------------------------------------------------------------

export type PAASTier = "Starter" | "Professional" | "Enterprise" | "Global";

export type SubscriptionStatus =
  | "active"
  | "trial"
  | "past_due"
  | "cancelled"
  | "pending";

export type BillingPeriod = "monthly" | "annual";

export type BillingStatus = "paid" | "failed" | "pending" | "refunded";

export interface PaaSFeatureLimits {
  membersLimit: number | null; // null = unlimited
  listingsLimit: number | null;
  storageGB: number | null;
  apiCallsPerMonth: number | null;
  whiteLabel: boolean;
  customDomain: boolean;
  slaPercent: number;
  prioritySupport: boolean;
  analytics: boolean;
  vendorPortal: boolean;
  multiTenant: boolean;
  finfracfranIntegration: boolean;
}

export interface PaaSPlan {
  id: string;
  tier: PAASTier;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number; // per month when billed annually
  limits: PaaSFeatureLimits;
  highlighted: boolean;
  badge?: string;
  ctaLabel: string;
}

export interface PaaSUsageStats {
  membersUsed: number;
  membersLimit: number | null;
  listingsUsed: number;
  listingsLimit: number | null;
  storageUsedGB: number;
  storageGBLimit: number | null;
  apiCallsThisMonth: number;
  apiCallsLimit: number | null;
}

export interface BillingRecord {
  id: string;
  period: string;
  amount: number;
  currency: string;
  status: BillingStatus;
  paidAt?: string;
  invoiceUrl?: string;
}

export interface TenantSubscription {
  orgId: string;
  planId: string;
  tier: PAASTier;
  status: SubscriptionStatus;
  billingPeriod: BillingPeriod;
  startDate: string;
  renewalDate: string;
  trialEndDate?: string;
  usageStats: PaaSUsageStats;
  billingHistory: BillingRecord[];
}

// ---------------------------------------------------------------------------
// Config constants
// ---------------------------------------------------------------------------

export const PAAS_TIER_CONFIG: Record<
  PAASTier,
  { color: string; bg: string; finfracfran: string; icon: string }
> = {
  Starter: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    finfracfran: "Seed",
    icon: "🌱",
  },
  Professional: {
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    finfracfran: "Growth",
    icon: "🚀",
  },
  Enterprise: {
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    finfracfran: "Scale",
    icon: "🏢",
  },
  Global: {
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    finfracfran: "Global",
    icon: "🌐",
  },
};

export const SUBSCRIPTION_STATUS_CONFIG: Record<
  SubscriptionStatus,
  { label: string; color: string; bg: string }
> = {
  active: {
    label: "Active",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  trial: { label: "Trial", color: "text-blue-400", bg: "bg-blue-400/10" },
  past_due: {
    label: "Past Due",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-zinc-400",
    bg: "bg-zinc-400/10",
  },
  pending: {
    label: "Pending",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
};

export const BILLING_STATUS_CONFIG: Record<
  BillingStatus,
  { label: string; color: string; bg: string }
> = {
  paid: { label: "Paid", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  failed: { label: "Failed", color: "text-red-400", bg: "bg-red-400/10" },
  pending: {
    label: "Pending",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  refunded: {
    label: "Refunded",
    color: "text-zinc-400",
    bg: "bg-zinc-400/10",
  },
};

export interface FeatureRow {
  key: keyof PaaSFeatureLimits;
  label: string;
  type: "number" | "boolean" | "percent" | "storage" | "api";
}

export const PAAS_FEATURE_ROWS: FeatureRow[] = [
  { key: "membersLimit", label: "Team Members", type: "number" },
  { key: "listingsLimit", label: "Active Listings", type: "number" },
  { key: "storageGB", label: "Storage", type: "storage" },
  { key: "apiCallsPerMonth", label: "API Calls / Month", type: "api" },
  { key: "whiteLabel", label: "White Label Branding", type: "boolean" },
  { key: "customDomain", label: "Custom Domain", type: "boolean" },
  { key: "slaPercent", label: "SLA Uptime", type: "percent" },
  { key: "prioritySupport", label: "Priority Support", type: "boolean" },
  { key: "analytics", label: "Advanced Analytics", type: "boolean" },
  { key: "vendorPortal", label: "Vendor Self-Service Portal", type: "boolean" },
  { key: "multiTenant", label: "Multi-Tenant Architecture", type: "boolean" },
  {
    key: "finfracfranIntegration",
    label: "FinFracFran™ Integration",
    type: "boolean",
  },
];
