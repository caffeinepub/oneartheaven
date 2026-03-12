// Phase 8: Sustainability & Global Impact Dashboard — Hooks

import { useMemo, useState } from "react";
import {
  getAllImpactMetrics,
  getAllNationProgress,
  getAllReports,
  getAllSDGs,
  getSustainabilityStats,
} from "../data/sustainabilityData";
import type {
  EnvironmentalReport,
  ImpactCategory,
  ImpactMetric,
  NationProgressRecord,
  ReportCategory,
  SDGIndicator,
  SDGStatus,
  SustainabilityStats,
  TrendDirection,
  WorldRegion,
} from "../data/sustainabilityTypes";

export function useSDGIndicators(
  statusFilter?: SDGStatus | "all",
  trendFilter?: TrendDirection | "all",
) {
  const [selectedSDG, setSelectedSDG] = useState<SDGIndicator | null>(null);
  const allSDGs = useMemo(() => getAllSDGs(), []);

  const filteredSDGs = useMemo(
    () =>
      allSDGs.filter((sdg) => {
        const statusMatch =
          !statusFilter ||
          statusFilter === "all" ||
          sdg.status === statusFilter;
        const trendMatch =
          !trendFilter || trendFilter === "all" || sdg.trend === trendFilter;
        return statusMatch && trendMatch;
      }),
    [allSDGs, statusFilter, trendFilter],
  );

  const stats = useMemo(
    () => ({
      on_track: allSDGs.filter((s) => s.status === "on_track").length,
      at_risk: allSDGs.filter((s) => s.status === "at_risk").length,
      off_track: allSDGs.filter((s) => s.status === "off_track").length,
    }),
    [allSDGs],
  );

  return {
    filteredSDGs,
    selectedSDG,
    openSDG: (sdg: SDGIndicator) => setSelectedSDG(sdg),
    closeSDG: () => setSelectedSDG(null),
    stats,
  };
}

export function useImpactMetrics(
  categoryFilter?: ImpactCategory | "all",
  regionFilter?: WorldRegion | "all",
) {
  const [selectedMetric, setSelectedMetric] = useState<ImpactMetric | null>(
    null,
  );
  const allMetrics = useMemo(() => getAllImpactMetrics(), []);
  const filteredMetrics = useMemo(
    () =>
      allMetrics.filter((m) => {
        const catMatch =
          !categoryFilter ||
          categoryFilter === "all" ||
          m.category === categoryFilter;
        const regMatch =
          !regionFilter || regionFilter === "all" || m.region === regionFilter;
        return catMatch && regMatch;
      }),
    [allMetrics, categoryFilter, regionFilter],
  );
  return {
    filteredMetrics,
    selectedMetric,
    openMetric: setSelectedMetric,
    closeMetric: () => setSelectedMetric(null),
  };
}

export function useEnvironmentalReports(
  categoryFilter?: ReportCategory | "all",
) {
  const [selectedReport, setSelectedReport] =
    useState<EnvironmentalReport | null>(null);
  const allReports = useMemo(() => getAllReports(), []);
  const filteredReports = useMemo(() => {
    if (!categoryFilter || categoryFilter === "all") return allReports;
    return allReports.filter((r) => r.category === categoryFilter);
  }, [allReports, categoryFilter]);
  return {
    filteredReports,
    selectedReport,
    openReport: setSelectedReport,
    closeReport: () => setSelectedReport(null),
  };
}

export function useNationProgress(
  regionFilter?: WorldRegion | "all",
  searchQuery?: string,
) {
  const [selectedNation, setSelectedNation] =
    useState<NationProgressRecord | null>(null);
  const allNations = useMemo(() => getAllNationProgress(), []);
  const filteredNations = useMemo(
    () =>
      allNations.filter((n) => {
        const regMatch =
          !regionFilter || regionFilter === "all" || n.region === regionFilter;
        const searchMatch =
          !searchQuery ||
          n.nation.toLowerCase().includes(searchQuery.toLowerCase());
        return regMatch && searchMatch;
      }),
    [allNations, regionFilter, searchQuery],
  );
  const sortedByScore = useMemo(
    () =>
      [...filteredNations].sort(
        (a, b) => b.complianceScore - a.complianceScore,
      ),
    [filteredNations],
  );
  return {
    filteredNations,
    sortedByScore,
    selectedNation,
    openNation: setSelectedNation,
    closeNation: () => setSelectedNation(null),
  };
}

export function useSustainabilityStats(): SustainabilityStats {
  return useMemo(() => getSustainabilityStats(), []);
}
