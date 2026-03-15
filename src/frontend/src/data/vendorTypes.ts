/**
 * vendorTypes.ts
 * Type definitions for the Vendor Self-Service Portal (Phase 11 — Area 6).
 */

import type { FranchiseCategory, FranchiseTier } from "@/data/financeTypes";

export type VendorStatus = "pending" | "active" | "suspended" | "rejected";
export type VendorTier = FranchiseTier;
export type VendorCategory = FranchiseCategory;
export type VendorListingType = "franchise" | "campaign" | "enterprise";
export type VendorListingStatus =
  | "active"
  | "draft"
  | "pending"
  | "closed"
  | "rejected";
export type VendorRevenueStatus = "pending" | "paid" | "processing";
export type VendorRevenuePeriod =
  | "Q1 2025"
  | "Q2 2025"
  | "Q3 2025"
  | "Q4 2025"
  | "Q1 2026"
  | "Q2 2026"
  | "Q3 2026"
  | "Q4 2026";

export interface VendorProfile {
  id: string;
  orgId: string;
  name: string;
  type: string;
  tier: VendorTier;
  status: VendorStatus;
  country: string;
  region: string;
  description: string;
  contactEmail: string;
  website: string;
  categories: VendorCategory[];
  finfracfranTier: VendorTier;
  createdAt: string;
  updatedAt: string;
}

export interface VendorListing {
  id: string;
  vendorId: string;
  orgId: string;
  type: VendorListingType;
  title: string;
  category: VendorCategory;
  description: string;
  status: VendorListingStatus;
  targetAmount: number;
  nationsCount: number;
  finfracfranTier: VendorTier;
  createdAt: string;
  updatedAt: string;
}

export interface VendorRevenueRecord {
  id: string;
  vendorId: string;
  period: VendorRevenuePeriod;
  grossRevenue: number;
  finfracfranSharePct: number;
  finfracfranShare: number;
  netRevenue: number;
  currency: string;
  status: VendorRevenueStatus;
  paidAt: string | null;
}

export interface VendorStats {
  vendorId: string;
  activeListings: number;
  totalListings: number;
  totalGrossRevenue: number;
  totalFinfracfranEarnings: number;
  totalNetRevenue: number;
  nationsReached: number;
  pendingPayouts: number;
  currency: string;
  currentTier: VendorTier;
  nextTierTarget: number;
}

export const VENDOR_STATUS_CONFIG: Record<
  VendorStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-400/10" },
  active: {
    label: "Active",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  suspended: { label: "Suspended", color: "text-red-400", bg: "bg-red-400/10" },
  rejected: {
    label: "Rejected",
    color: "text-slate-400",
    bg: "bg-slate-400/10",
  },
};

export const VENDOR_TIER_CONFIG: Record<
  VendorTier,
  { label: string; color: string; bg: string; milestone: number }
> = {
  Seed: {
    label: "Seed",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    milestone: 25000,
  },
  Growth: {
    label: "Growth",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    milestone: 100000,
  },
  Scale: {
    label: "Scale",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    milestone: 500000,
  },
  Global: {
    label: "Global",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    milestone: Number.POSITIVE_INFINITY,
  },
};

export const VENDOR_LISTING_TYPE_CONFIG: Record<
  VendorListingType,
  { label: string; color: string; bg: string }
> = {
  franchise: {
    label: "Franchise",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  campaign: {
    label: "Campaign",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  enterprise: {
    label: "Enterprise",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
};

export const VENDOR_LISTING_STATUS_CONFIG: Record<
  VendorListingStatus,
  { label: string; color: string; bg: string }
> = {
  active: {
    label: "Active",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  draft: { label: "Draft", color: "text-slate-400", bg: "bg-slate-400/10" },
  pending: {
    label: "Pending Review",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  closed: { label: "Closed", color: "text-slate-500", bg: "bg-slate-500/10" },
  rejected: { label: "Rejected", color: "text-red-400", bg: "bg-red-400/10" },
};

export const VENDOR_REVENUE_STATUS_CONFIG: Record<
  VendorRevenueStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-400/10" },
  processing: {
    label: "Processing",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  paid: { label: "Paid", color: "text-emerald-400", bg: "bg-emerald-400/10" },
};
