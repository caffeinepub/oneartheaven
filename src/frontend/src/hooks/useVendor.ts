/**
 * useVendor.ts
 * Hooks for the Vendor Self-Service Portal (Phase 11 — Area 6).
 */

import {
  SEED_LISTINGS,
  getAllVendors,
  getVendor,
  getVendorListings,
  getVendorRevenue,
  getVendorStats,
} from "@/data/vendorData";
import type {
  VendorListing,
  VendorListingStatus,
  VendorListingType,
  VendorProfile,
  VendorRevenuePeriod,
  VendorRevenueRecord,
  VendorStats,
  VendorTier,
} from "@/data/vendorTypes";
import { useMemo, useState } from "react";

export function useVendorProfile(vendorId?: string) {
  const profile = useMemo(
    () => (vendorId ? (getVendor(vendorId) ?? null) : null),
    [vendorId],
  );
  const allVendors = useMemo(() => getAllVendors(), []);
  return { profile, allVendors };
}

export function useVendorListings(vendorId?: string) {
  const [typeFilter, setTypeFilter] = useState<VendorListingType | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<VendorListingStatus | "all">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [selectedListing, setSelectedListing] = useState<VendorListing | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<VendorListing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VendorListing | null>(null);

  const [listings, setListings] = useState<VendorListing[]>(() =>
    vendorId ? getVendorListings(vendorId) : SEED_LISTINGS,
  );

  const filteredListings = useMemo(
    () =>
      listings.filter((l) => {
        const matchType = typeFilter === "all" || l.type === typeFilter;
        const matchStatus = statusFilter === "all" || l.status === statusFilter;
        const matchSearch =
          !search ||
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.category.toLowerCase().includes(search.toLowerCase());
        return matchType && matchStatus && matchSearch;
      }),
    [listings, typeFilter, statusFilter, search],
  );

  const typeCounts = useMemo(
    () => ({
      all: listings.length,
      franchise: listings.filter((l) => l.type === "franchise").length,
      campaign: listings.filter((l) => l.type === "campaign").length,
      enterprise: listings.filter((l) => l.type === "enterprise").length,
    }),
    [listings],
  );

  function addListing(listing: VendorListing) {
    setListings((prev) => [listing, ...prev]);
    setAddOpen(false);
  }
  function saveListing(updated: VendorListing) {
    setListings((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setEditTarget(null);
  }
  function deleteListing() {
    if (!deleteTarget) return;
    setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return {
    listings,
    filteredListings,
    typeCounts,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    selectedListing,
    openListing: setSelectedListing,
    closeListing: () => setSelectedListing(null),
    addOpen,
    openAdd: () => setAddOpen(true),
    closeAdd: () => setAddOpen(false),
    addListing,
    editTarget,
    openEdit: setEditTarget,
    closeEdit: () => setEditTarget(null),
    saveListing,
    deleteTarget,
    openDelete: setDeleteTarget,
    closeDelete: () => setDeleteTarget(null),
    deleteListing,
  };
}

export function useVendorRevenue(vendorId?: string) {
  const [periodFilter, setPeriodFilter] = useState<VendorRevenuePeriod | "all">(
    "all",
  );
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutTarget, setPayoutTarget] = useState<VendorRevenueRecord | null>(
    null,
  );

  const allRecords = useMemo(
    () => (vendorId ? getVendorRevenue(vendorId) : []),
    [vendorId],
  );
  const filteredRecords = useMemo(
    () =>
      periodFilter === "all"
        ? allRecords
        : allRecords.filter((r) => r.period === periodFilter),
    [allRecords, periodFilter],
  );
  const totals = useMemo(
    () => ({
      gross: filteredRecords.reduce((s, r) => s + r.grossRevenue, 0),
      ff: filteredRecords.reduce((s, r) => s + r.finfracfranShare, 0),
      net: filteredRecords.reduce((s, r) => s + r.netRevenue, 0),
      pending: filteredRecords
        .filter((r) => r.status === "pending")
        .reduce((s, r) => s + r.netRevenue, 0),
    }),
    [filteredRecords],
  );

  return {
    allRecords,
    filteredRecords,
    totals,
    periodFilter,
    setPeriodFilter,
    payoutOpen,
    payoutTarget,
    openPayout: (r: VendorRevenueRecord) => {
      setPayoutTarget(r);
      setPayoutOpen(true);
    },
    closePayout: () => {
      setPayoutOpen(false);
      setPayoutTarget(null);
    },
  };
}

export function useVendorStats(vendorId?: string): VendorStats | null {
  return useMemo(
    () => (vendorId ? (getVendorStats(vendorId) ?? null) : null),
    [vendorId],
  );
}

const TIER_ORDER: VendorTier[] = ["Seed", "Growth", "Scale", "Global"];
const TIER_MILESTONES: Record<VendorTier, number> = {
  Seed: 0,
  Growth: 25000,
  Scale: 100000,
  Global: 500000,
};

export function useVendorTierProgress(stats: VendorStats | null) {
  return useMemo(() => {
    if (!stats) return null;
    const currentIdx = TIER_ORDER.indexOf(stats.currentTier);
    const nextTier = TIER_ORDER[currentIdx + 1] ?? null;
    const currentMilestone = TIER_MILESTONES[stats.currentTier];
    const nextMilestone = nextTier ? TIER_MILESTONES[nextTier] : null;
    const progressPct = nextMilestone
      ? Math.min(
          100,
          Math.max(
            0,
            ((stats.totalGrossRevenue - currentMilestone) /
              (nextMilestone - currentMilestone)) *
              100,
          ),
        )
      : 100;
    return {
      currentTier: stats.currentTier,
      nextTier,
      currentMilestone,
      nextMilestone,
      progressPct,
      totalRevenue: stats.totalGrossRevenue,
    };
  }, [stats]);
}
