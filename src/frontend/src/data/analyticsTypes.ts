export type TrendDirection = "up" | "down" | "flat";
export type MetricPeriod = "day" | "week" | "month" | "quarter" | "year";

export interface PlatformStat {
  id: string;
  label: string;
  value: number;
  unit?: string;
  trend: TrendDirection;
  trendPct: number;
  trendLabel: string;
  icon: string;
  color: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}
export interface TimeSeriesData {
  id: string;
  label: string;
  color: string;
  points: TimeSeriesPoint[];
}

export type OrgActivityAction =
  | "org_created"
  | "org_suspended"
  | "member_joined"
  | "member_removed"
  | "vendor_registered"
  | "vendor_approved"
  | "listing_published"
  | "payout_requested"
  | "subscription_upgraded"
  | "subscription_cancelled"
  | "whitelabel_published"
  | "doc_viewed"
  | "tour_completed";

export interface OrgActivityRecord {
  id: string;
  orgId: string;
  orgName: string;
  orgType: string;
  action: OrgActivityAction;
  actorRole: string;
  actorName: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
}

export interface OrgMetrics {
  orgId: string;
  orgName: string;
  orgType: string;
  tier: string;
  region: string;
  memberCount: number;
  activeListings: number;
  totalRevenue: number;
  finfracfranEarnings: number;
  nationsReached: number;
  subscriptionPlan: string;
  lastActiveAt: string;
  growthPct: number;
}

export interface VendorMetrics {
  vendorId: string;
  vendorName: string;
  orgId: string;
  tier: string;
  region: string;
  activeListings: number;
  totalRevenue: number;
  finfracfranEarnings: number;
  nationsReached: number;
  rank: number;
}

export interface PlatformHealth {
  uptimePct: number;
  avgResponseMs: number;
  activeOrgs: number;
  activeSessions: number;
  errorsLastHour: number;
  apiCallsToday: number;
  storageUsedGB: number;
  storageTotalGB: number;
  lastCheckedAt: string;
}

export interface AnalyticsDashboard {
  generatedAt: string;
  period: MetricPeriod;
  stats: PlatformStat[];
  timeSeries: TimeSeriesData[];
  activityFeed: OrgActivityRecord[];
  orgMetrics: OrgMetrics[];
  vendorLeaderboard: VendorMetrics[];
  health: PlatformHealth;
}

export const ACTIVITY_ACTION_CONFIG: Record<
  OrgActivityAction,
  { label: string; color: string; icon: string }
> = {
  org_created: { label: "Org Created", color: "emerald", icon: "Building2" },
  org_suspended: { label: "Org Suspended", color: "red", icon: "Ban" },
  member_joined: { label: "Member Joined", color: "blue", icon: "UserPlus" },
  member_removed: {
    label: "Member Removed",
    color: "orange",
    icon: "UserMinus",
  },
  vendor_registered: {
    label: "Vendor Registered",
    color: "violet",
    icon: "Store",
  },
  vendor_approved: {
    label: "Vendor Approved",
    color: "emerald",
    icon: "BadgeCheck",
  },
  listing_published: {
    label: "Listing Published",
    color: "teal",
    icon: "FileText",
  },
  payout_requested: {
    label: "Payout Requested",
    color: "amber",
    icon: "Banknote",
  },
  subscription_upgraded: {
    label: "Subscription Upgraded",
    color: "violet",
    icon: "TrendingUp",
  },
  subscription_cancelled: {
    label: "Subscription Cancelled",
    color: "red",
    icon: "XCircle",
  },
  whitelabel_published: {
    label: "White Label Published",
    color: "purple",
    icon: "Paintbrush",
  },
  doc_viewed: { label: "Docs Viewed", color: "sky", icon: "BookOpen" },
  tour_completed: {
    label: "Tour Completed",
    color: "lime",
    icon: "GraduationCap",
  },
};

export const TREND_CONFIG: Record<
  TrendDirection,
  { label: string; colorClass: string; arrow: string }
> = {
  up: { label: "Up", colorClass: "text-emerald-400", arrow: "\u2191" },
  down: { label: "Down", colorClass: "text-red-400", arrow: "\u2193" },
  flat: { label: "Flat", colorClass: "text-zinc-400", arrow: "\u2192" },
};
