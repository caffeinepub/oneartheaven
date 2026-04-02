// ---------------------------------------------------------------------------
// useImpact — Impact Measurement & SDG Alignment Hooks
// Phase 13 · Area 4
// ---------------------------------------------------------------------------

import {
  IMPACT_METRICS,
  IMPACT_REPORTS,
  ORG_IMPACT_PROFILES,
  getAllSDGs,
  getMetricsByOrg,
  getMetricsBySDG,
  getOrgImpactProfile,
  getPlatformAggregate,
  getPublishedReports,
  getReportsByOrg,
} from "@/data/impactData";
import type {
  ImpactDimension,
  ImpactMetric,
  ImpactTrend,
  SDGoalNumber,
} from "@/data/impactTypes";
import { useState } from "react";

// ---------------------------------------------------------------------------
// useSDGMap
// ---------------------------------------------------------------------------

export function useSDGMap(orgId?: string) {
  const allSDGs = getAllSDGs();

  const metrics = orgId ? getMetricsByOrg(orgId) : IMPACT_METRICS;
  const touchedSDGNumbers = new Set<SDGoalNumber>(
    metrics.flatMap((m) => m.linkedSDGs),
  );
  const orgSDGs = allSDGs.filter((g) => touchedSDGNumbers.has(g.number));

  const getContributionStrength = (sdgNumber: SDGoalNumber) => {
    if (!orgId) return undefined;
    const profile = getOrgImpactProfile(orgId);
    return profile?.sdgContributions.find((c) => c.sdgNumber === sdgNumber)
      ?.strength;
  };

  const top5 = orgId
    ? (getOrgImpactProfile(orgId)?.topSDGs.slice(0, 5) ?? [])
    : Array.from(touchedSDGNumbers).slice(0, 5);

  return { allSDGs, orgSDGs, touchedSDGNumbers, getContributionStrength, top5 };
}

// ---------------------------------------------------------------------------
// useImpactMetrics
// ---------------------------------------------------------------------------

interface MetricFilters {
  orgId?: string;
  sdgNumber?: SDGoalNumber;
  dimension?: ImpactDimension | "all";
  trend?: ImpactTrend | "all";
}

export function useImpactMetrics(filters: MetricFilters = {}) {
  const [sortBy, setSortBy] = useState<"name" | "current" | "trend">("current");

  let metrics = [...IMPACT_METRICS];

  if (filters.orgId) metrics = metrics.filter((m) => m.orgId === filters.orgId);
  if (filters.sdgNumber) metrics = getMetricsBySDG(filters.sdgNumber);
  if (filters.dimension && filters.dimension !== "all") {
    metrics = metrics.filter((m) => m.dimension === filters.dimension);
  }
  if (filters.trend && filters.trend !== "all") {
    metrics = metrics.filter((m) => m.trend === filters.trend);
  }

  const sorted = [...metrics].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "current") return b.current - a.current;
    return 0;
  });

  const grouped = sorted.reduce<Record<ImpactDimension, ImpactMetric[]>>(
    (acc, m) => {
      if (!acc[m.dimension]) acc[m.dimension] = [];
      acc[m.dimension].push(m);
      return acc;
    },
    {} as Record<ImpactDimension, ImpactMetric[]>,
  );

  const progressPct = (m: ImpactMetric) =>
    m.target > 0 ? Math.min(100, Math.round((m.current / m.target) * 100)) : 0;

  return {
    metrics: sorted,
    grouped,
    sortBy,
    setSortBy,
    totalCount: metrics.length,
    progressPct,
  };
}

// ---------------------------------------------------------------------------
// useImpactReport
// ---------------------------------------------------------------------------

export function useImpactReport(reportId: string) {
  const report = IMPACT_REPORTS.find((r) => r.id === reportId);
  const { allSDGs } = useSDGMap();
  const linkedSDGGoals = report
    ? allSDGs.filter((g) => report.linkedSDGs.includes(g.number))
    : [];
  const orgProfile = report ? getOrgImpactProfile(report.orgId) : undefined;
  const orgMetrics = report ? getMetricsByOrg(report.orgId) : [];

  return { report, linkedSDGGoals, orgProfile, orgMetrics };
}

// ---------------------------------------------------------------------------
// usePlatformImpact
// ---------------------------------------------------------------------------

export function usePlatformImpact() {
  const aggregate = getPlatformAggregate();
  const publishedReports = getPublishedReports();
  const allSDGs = getAllSDGs();

  const top3Orgs = ORG_IMPACT_PROFILES.slice(0, 3);
  const sdgCoverage = new Set(IMPACT_METRICS.flatMap((m) => m.linkedSDGs)).size;
  const last5Reports = publishedReports.slice(0, 5);

  return {
    aggregate,
    top3Orgs,
    sdgCoverage,
    allSDGs,
    last5Reports,
    publishedReports,
  };
}

// ---------------------------------------------------------------------------
// useImpactReportSubmission
// ---------------------------------------------------------------------------

export function useImpactReportSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    dimension: "" as ImpactDimension | "",
    level: "",
    linkedSDGs: [] as SDGoalNumber[],
    narrative: "",
  });

  const updateForm = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const reset = () => {
    setIsSuccess(false);
    setForm({
      title: "",
      summary: "",
      dimension: "",
      level: "",
      linkedSDGs: [],
      narrative: "",
    });
  };

  return { form, updateForm, submit, isSubmitting, isSuccess, reset };
}

// ---------------------------------------------------------------------------
// useOrgImpact — convenience composite
// ---------------------------------------------------------------------------

export function useOrgImpact(orgId: string) {
  const { orgSDGs, getContributionStrength } = useSDGMap(orgId);
  const { metrics } = useImpactMetrics({ orgId });
  const reports = getReportsByOrg(orgId);
  const profile = getOrgImpactProfile(orgId);

  return { orgSDGs, metrics, reports, profile, getContributionStrength };
}
