import {
  getAllListings,
  getApplicationsForListing,
  getListing,
  getListingsByType,
  getMarketplaceStats,
} from "@/data/marketplaceData";
import type {
  FranchiseApplication,
  MarketplaceFilter,
  MarketplaceListing,
  MarketplaceStats,
} from "@/data/marketplaceTypes";
import { useState } from "react";

const DEFAULT_FILTERS: MarketplaceFilter = {
  type: "all",
  tier: "all",
  geography: "all",
  impactCategory: "all",
  search: "",
  sortBy: "newest",
};

function applyFilters(
  listings: MarketplaceListing[],
  filters: MarketplaceFilter,
): MarketplaceListing[] {
  let result = [...listings];

  if (filters.type && filters.type !== "all") {
    result = result.filter((l) => l.type === filters.type);
  }
  if (filters.tier && filters.tier !== "all") {
    result = result.filter((l) => l.tier === filters.tier);
  }
  if (filters.geography && filters.geography !== "all") {
    result = result.filter((l) => l.geography === filters.geography);
  }
  if (filters.impactCategory && filters.impactCategory !== "all") {
    result = result.filter((l) => l.impactCategory === filters.impactCategory);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter(
      (l) => l.financials.minInvestment >= (filters.minPrice ?? 0),
    );
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter(
      (l) =>
        l.financials.minInvestment <=
        (filters.maxPrice ?? Number.POSITIVE_INFINITY),
    );
  }
  if (filters.minROI !== undefined) {
    result = result.filter(
      (l) => l.financials.projectedROI >= (filters.minROI ?? 0),
    );
  }
  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.tagline.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort(
        (a, b) => a.financials.minInvestment - b.financials.minInvestment,
      );
      break;
    case "price-desc":
      result.sort(
        (a, b) => b.financials.minInvestment - a.financials.minInvestment,
      );
      break;
    case "roi-desc":
      result.sort(
        (a, b) => b.financials.projectedROI - a.financials.projectedROI,
      );
      break;
    case "units-remaining":
      result.sort(
        (a, b) => b.financials.availableUnits - a.financials.availableUnits,
      );
      break;
    case "applications":
      result.sort((a, b) => b.applicationsCount - a.applicationsCount);
      break;
    default:
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  return result;
}

export function useMarketplace(initialFilters: MarketplaceFilter = {}) {
  const [filters, setFilters] = useState<MarketplaceFilter>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const allListings = getAllListings();
  const featured = allListings.filter((l) => l.status === "featured");
  const stats: MarketplaceStats = getMarketplaceStats();
  const listings = applyFilters(allListings, filters);

  function updateFilter<K extends keyof MarketplaceFilter>(
    key: K,
    value: MarketplaceFilter[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const activeFilterCount = [
    filters.type !== "all" && filters.type,
    filters.tier !== "all" && filters.tier,
    filters.geography !== "all" && filters.geography,
    filters.impactCategory !== "all" && filters.impactCategory,
    filters.search?.trim(),
  ].filter(Boolean).length;

  return {
    listings,
    allListings,
    featured,
    stats,
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    totalCount: listings.length,
    isEmpty: listings.length === 0,
  };
}

export function useMarketplaceListing(listingId: string) {
  const listing = getListing(listingId) ?? null;
  const applications = getApplicationsForListing(listingId);
  const similar = listing
    ? getListingsByType(listing.type)
        .filter((l) => l.id !== listingId)
        .slice(0, 3)
    : [];

  const unitsProgress = listing
    ? Math.round(
        (listing.financials.soldUnits / listing.financials.totalUnits) * 100,
      )
    : 0;

  return {
    listing,
    applications,
    similarListings: similar,
    unitsProgress,
    isAlmostFull: unitsProgress >= 80,
    isSoldOut: listing ? listing.financials.availableUnits === 0 : false,
    notFound: !listing,
  };
}

interface ApplicationForm {
  orgName: string;
  contactName: string;
  contactEmail: string;
  teamSize: string;
  proposedTerritory: string;
  fundingAmount: string;
  timelineMonths: string;
  motivation: string;
  sdgFocus: number[];
}

const DEFAULT_FORM: ApplicationForm = {
  orgName: "",
  contactName: "",
  contactEmail: "",
  teamSize: "5",
  proposedTerritory: "",
  fundingAmount: "",
  timelineMonths: "12",
  motivation: "",
  sdgFocus: [],
};

function validateStep(
  step: number,
  form: ApplicationForm,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 1) {
    if (!form.orgName.trim()) errors.orgName = "Organisation name is required";
    if (!form.contactName.trim())
      errors.contactName = "Contact name is required";
    if (!form.contactEmail.trim()) errors.contactEmail = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.contactEmail))
      errors.contactEmail = "Invalid email";
  }
  if (step === 2) {
    if (!form.proposedTerritory.trim())
      errors.proposedTerritory = "Proposed territory is required";
    if (!form.fundingAmount || Number(form.fundingAmount) <= 0)
      errors.fundingAmount = "Funding amount must be greater than 0";
  }
  if (step === 3) {
    if (form.motivation.trim().length < 20)
      errors.motivation = "Please provide at least 20 characters";
    if (form.sdgFocus.length === 0) errors.sdgFocus = "Select at least one SDG";
  }
  return errors;
}

export function useFranchiseApplication(listingId: string) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<FranchiseApplication | null>(
    null,
  );

  const stepErrors = validateStep(step, form);
  const canAdvance = Object.keys(stepErrors).length === 0;

  function updateField<K extends keyof ApplicationForm>(
    field: K,
    value: ApplicationForm[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleSDG(sdgId: number) {
    setForm((prev) => ({
      ...prev,
      sdgFocus: prev.sdgFocus.includes(sdgId)
        ? prev.sdgFocus.filter((id) => id !== sdgId)
        : [...prev.sdgFocus, sdgId],
    }));
  }

  function nextStep() {
    if (canAdvance && step < 3) setStep((s) => s + 1);
  }

  function prevStep() {
    if (step > 1) setStep((s) => s - 1);
  }

  async function submit() {
    const errors = validateStep(3, form);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    const app: FranchiseApplication = {
      id: `app-${Date.now()}`,
      listingId,
      orgId: "org-current",
      orgName: form.orgName,
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      proposedTerritory: form.proposedTerritory,
      motivation: form.motivation,
      teamSize: Number(form.teamSize) || 1,
      fundingAmount: Number(form.fundingAmount),
      timelineMonths: Number(form.timelineMonths),
      sdgFocus: form.sdgFocus,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    };
    setSubmittedApp(app);
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  function reset() {
    setStep(1);
    setForm(DEFAULT_FORM);
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmittedApp(null);
  }

  return {
    step,
    form,
    updateField,
    toggleSDG,
    stepErrors,
    canAdvance,
    nextStep,
    prevStep,
    submit,
    isSubmitting,
    isSuccess,
    submittedApp,
    reset,
  };
}
