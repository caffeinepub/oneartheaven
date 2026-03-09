import {
  getAllAnalyses,
  getPolicyAdvisorStats,
  searchAnalyses,
} from "@/data/policyAdvisorData";
import type {
  CouncilId,
  PolicyAnalysis,
  RecommendationType,
} from "@/data/policyAdvisorTypes";
import { useMemo, useState } from "react";

export interface PolicyAdvisorFilters {
  search: string;
  recommendation: RecommendationType | "all";
  council: CouncilId | "all";
  finFracFranOnly: boolean;
  sort: "highest_score" | "lowest_score" | "newest" | "oldest" | "highest_risk";
}

const DEFAULT_FILTERS: PolicyAdvisorFilters = {
  search: "",
  recommendation: "all",
  council: "all",
  finFracFranOnly: false,
  sort: "highest_score",
};

export function usePolicyAdvisor() {
  const [filters, setFilters] = useState<PolicyAdvisorFilters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const allAnalyses = useMemo(() => getAllAnalyses(), []);
  const stats = useMemo(() => getPolicyAdvisorStats(), []);

  const filteredAnalyses = useMemo<PolicyAnalysis[]>(() => {
    let result = filters.search
      ? searchAnalyses(filters.search)
      : [...allAnalyses];

    if (filters.recommendation !== "all") {
      result = result.filter(
        (a) => a.recommendation === filters.recommendation,
      );
    }
    if (filters.council !== "all") {
      result = result.filter((a) => a.councilId === filters.council);
    }
    if (filters.finFracFranOnly) {
      result = result.filter((a) => a.finFracFran.applicable);
    }

    result = [...result].sort((a, b) => {
      switch (filters.sort) {
        case "highest_score":
          return b.alignmentScore - a.alignmentScore;
        case "lowest_score":
          return a.alignmentScore - b.alignmentScore;
        case "newest":
          return (
            new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.analyzedAt).getTime() - new Date(b.analyzedAt).getTime()
          );
        case "highest_risk": {
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          const maxSeverityA = Math.max(
            ...a.riskFlags.map((f) => severityOrder[f.severity] ?? 0),
            0,
          );
          const maxSeverityB = Math.max(
            ...b.riskFlags.map((f) => severityOrder[f.severity] ?? 0),
            0,
          );
          return maxSeverityB - maxSeverityA;
        }
        default:
          return 0;
      }
    });

    return result;
  }, [allAnalyses, filters]);

  const selectedAnalysis = useMemo(
    () => (selectedId ? allAnalyses.find((a) => a.id === selectedId) : null),
    [selectedId, allAnalyses],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.recommendation !== "all") count++;
    if (filters.council !== "all") count++;
    if (filters.finFracFranOnly) count++;
    return count;
  }, [filters]);

  function updateFilter<K extends keyof PolicyAdvisorFilters>(
    key: K,
    value: PolicyAdvisorFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function openDetail(id: string) {
    setSelectedId(id);
    setDetailOpen(true);
  }

  function closeDetail() {
    setDetailOpen(false);
    setTimeout(() => setSelectedId(null), 300);
  }

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredAnalyses,
    selectedAnalysis,
    detailOpen,
    openDetail,
    closeDetail,
    stats,
    activeFilterCount,
    totalCount: allAnalyses.length,
  };
}
