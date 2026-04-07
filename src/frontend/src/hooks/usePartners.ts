// ---------------------------------------------------------------------------
// Partnership & Ecosystem Hub — Hooks
// Phase 13 · Area 8
// ---------------------------------------------------------------------------

import {
  PARTNER_AGREEMENTS,
  PARTNER_PROFILES,
  PARTNER_STATS,
  searchPartners,
} from "@/data/partnerData";
import type {
  PartnerApplicationForm,
  PartnerFilter,
  PartnerProfile,
  PartnerRegion,
  PartnerTier,
  PartnerType,
  SDGFocusArea,
} from "@/data/partnerTypes";
import { APPLICATION_STEPS } from "@/data/partnerTypes";
import { useCallback, useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// usePartners — filtered partner list
// ---------------------------------------------------------------------------

const DEFAULT_FILTER: PartnerFilter = {
  type: "all",
  tier: "all",
  region: "all",
  status: "all",
  sdgFocus: "all",
  search: "",
  sortBy: "score-desc",
};

export function usePartners(initialFilters?: Partial<PartnerFilter>) {
  const [filters, setFilters] = useState<PartnerFilter>({
    ...DEFAULT_FILTER,
    ...initialFilters,
  });

  const updateFilter = useCallback((patch: Partial<PartnerFilter>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER);
  }, []);

  const filteredPartners = useMemo(() => {
    let list = [...PARTNER_PROFILES];

    if (filters.type && filters.type !== "all") {
      list = list.filter((p) => p.type === filters.type);
    }
    if (filters.tier && filters.tier !== "all") {
      list = list.filter((p) => p.tier === filters.tier);
    }
    if (filters.region && filters.region !== "all") {
      list = list.filter((p) => p.region === filters.region);
    }
    if (filters.status && filters.status !== "all") {
      list = list.filter((p) => p.status === filters.status);
    }
    if (filters.sdgFocus && filters.sdgFocus !== "all") {
      list = list.filter((p) =>
        p.sdgFocus.includes(filters.sdgFocus as SDGFocusArea),
      );
    }
    if (filters.search) {
      const results = searchPartners(filters.search);
      const ids = new Set(results.map((p) => p.id));
      list = list.filter((p) => ids.has(p.id));
    }

    // Sort
    switch (filters.sortBy) {
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "score-desc":
        list.sort((a, b) => b.contributionScore - a.contributionScore);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.memberSince).getTime() -
            new Date(a.memberSince).getTime(),
        );
        break;
      case "tier": {
        const tierOrder: Record<PartnerTier, number> = {
          platinum: 0,
          gold: 1,
          silver: 2,
          bronze: 3,
        };
        list.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
        break;
      }
    }

    return list;
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type && filters.type !== "all") count++;
    if (filters.tier && filters.tier !== "all") count++;
    if (filters.region && filters.region !== "all") count++;
    if (filters.sdgFocus && filters.sdgFocus !== "all") count++;
    if (filters.search) count++;
    return count;
  }, [filters]);

  return {
    partners: filteredPartners,
    allPartners: PARTNER_PROFILES,
    stats: PARTNER_STATS,
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    totalCount: filteredPartners.length,
    isEmpty: filteredPartners.length === 0,
    // Convenience groupings
    byRegion: useMemo(() => {
      const map: Record<string, PartnerProfile[]> = {};
      for (const p of PARTNER_PROFILES) {
        if (!map[p.region]) map[p.region] = [];
        map[p.region].push(p);
      }
      return map;
    }, []),
    byType: useMemo(() => {
      const map: Record<string, PartnerProfile[]> = {};
      for (const p of PARTNER_PROFILES) {
        if (!map[p.type]) map[p.type] = [];
        map[p.type].push(p);
      }
      return map;
    }, []),
    topByScore: useMemo(
      () =>
        [...PARTNER_PROFILES]
          .sort((a, b) => b.contributionScore - a.contributionScore)
          .slice(0, 3),
      [],
    ),
  };
}

// ---------------------------------------------------------------------------
// usePartner — single partner detail
// ---------------------------------------------------------------------------

export function usePartner(partnerId: string | null) {
  const partner = useMemo(
    () =>
      partnerId ? PARTNER_PROFILES.find((p) => p.id === partnerId) : undefined,
    [partnerId],
  );

  const agreements = useMemo(
    () =>
      partnerId
        ? PARTNER_AGREEMENTS.filter((a) => a.partnerId === partnerId)
        : [],
    [partnerId],
  );

  const similarPartners = useMemo(() => {
    if (!partner) return [];
    return PARTNER_PROFILES.filter(
      (p) => p.id !== partner.id && p.region === partner.region,
    ).slice(0, 3);
  }, [partner]);

  return {
    partner,
    agreements,
    similarPartners,
    notFound: !!partnerId && !partner,
  };
}

// ---------------------------------------------------------------------------
// usePartnerApplication — 3-step form
// ---------------------------------------------------------------------------

const INITIAL_FORM: PartnerApplicationForm = {
  orgName: "",
  orgType: "",
  country: "",
  website: "",
  contactName: "",
  contactEmail: "",
  mission: "",
  sdgFocus: [],
  impactDescription: "",
  preferredType: "",
  expectedContribution: "",
  timelineMonths: 12,
  referralSource: "",
};

export function usePartnerApplication() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PartnerApplicationForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = useCallback(
    <K extends keyof PartnerApplicationForm>(
      key: K,
      value: PartnerApplicationForm[K],
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleSDG = useCallback((sdg: SDGFocusArea) => {
    setForm((prev) => ({
      ...prev,
      sdgFocus: prev.sdgFocus.includes(sdg)
        ? prev.sdgFocus.filter((s) => s !== sdg)
        : [...prev.sdgFocus, sdg],
    }));
  }, []);

  const stepErrors = useMemo(() => {
    if (step === 0) {
      const errs: string[] = [];
      if (!form.orgName) errs.push("Organisation name required");
      if (!form.orgType) errs.push("Organisation type required");
      if (!form.country) errs.push("Country required");
      if (!form.contactName) errs.push("Contact name required");
      if (!form.contactEmail || !form.contactEmail.includes("@"))
        errs.push("Valid contact email required");
      return errs;
    }
    if (step === 1) {
      const errs: string[] = [];
      if (!form.mission || form.mission.length < 30)
        errs.push("Mission statement (min 30 chars)");
      if (form.sdgFocus.length === 0)
        errs.push("At least one SDG focus required");
      return errs;
    }
    if (step === 2) {
      const errs: string[] = [];
      if (!form.preferredType) errs.push("Preferred partnership type required");
      if (!form.expectedContribution || form.expectedContribution.length < 20)
        errs.push("Expected contribution description (min 20 chars)");
      return errs;
    }
    return [];
  }, [step, form]);

  const canAdvance = stepErrors.length === 0;

  const nextStep = useCallback(() => {
    if (canAdvance && step < APPLICATION_STEPS.length - 1)
      setStep((s) => s + 1);
  }, [canAdvance, step]);

  const prevStep = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const submit = useCallback(async () => {
    if (!canAdvance) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1400));
    setIsSubmitting(false);
    setIsSuccess(true);
  }, [canAdvance]);

  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setStep(0);
    setIsSuccess(false);
    setIsSubmitting(false);
  }, []);

  return {
    step,
    totalSteps: APPLICATION_STEPS.length,
    stepLabel: APPLICATION_STEPS[step],
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
    reset,
  };
}

// ---------------------------------------------------------------------------
// useAllPartnerStats — platform-wide stats for Governance Hub
// ---------------------------------------------------------------------------

export function useAllPartnerStats() {
  const platinumPartners = useMemo(
    () => PARTNER_PROFILES.filter((p) => p.tier === "platinum"),
    [],
  );
  const regionsRepresented = useMemo(
    () => new Set(PARTNER_PROFILES.map((p) => p.region as PartnerRegion)).size,
    [],
  );
  const typeBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PARTNER_PROFILES) {
      counts[p.type] = (counts[p.type] ?? 0) + 1;
    }
    return counts as Record<PartnerType, number>;
  }, []);

  return {
    stats: PARTNER_STATS,
    platinumPartners,
    regionsRepresented,
    typeBreakdown,
    totalAgreements: PARTNER_AGREEMENTS.length,
  };
}
