import { getAllSolutions, getSolutionStats } from "@/data/solutionsData";
import type {
  AdoptionStage,
  RegionTag,
  SolutionCategory,
} from "@/data/solutionsTypes";
import type { Solution } from "@/data/solutionsTypes";
import { useMemo, useState } from "react";

export type SortOption = "ai_score" | "newest" | "adoptions" | "equity_impact";

export interface SolutionFilters {
  search: string;
  category: SolutionCategory | "all";
  stage: AdoptionStage | "all";
  region: RegionTag | "all";
  finFracFranOnly: boolean;
  sort: SortOption;
}

const DEFAULT_FILTERS: SolutionFilters = {
  search: "",
  category: "all",
  stage: "all",
  region: "all",
  finFracFranOnly: false,
  sort: "ai_score",
};

export function useSolutions() {
  const [filters, setFilters] = useState<SolutionFilters>(DEFAULT_FILTERS);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  const allSolutions = useMemo(() => getAllSolutions(), []);
  const stats = useMemo(() => getSolutionStats(), []);

  const filteredSolutions = useMemo(() => {
    let results: Solution[] = allSolutions;

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q),
      );
    }

    if (filters.category !== "all") {
      results = results.filter((s) => s.category === filters.category);
    }

    if (filters.stage !== "all") {
      results = results.filter((s) => s.stage === filters.stage);
    }

    if (filters.region !== "all") {
      results = results.filter((s) => s.region === filters.region);
    }

    if (filters.finFracFranOnly) {
      results = results.filter((s) => s.finFracFran.available);
    }

    results = [...results].sort((a, b) => {
      switch (filters.sort) {
        case "ai_score":
          return b.aiScore.overall - a.aiScore.overall;
        case "newest":
          return (
            new Date(b.submittedDate).getTime() -
            new Date(a.submittedDate).getTime()
          );
        case "adoptions":
          return b.adoptingNations.length - a.adoptingNations.length;
        case "equity_impact":
          return b.aiScore.equityImpact - a.aiScore.equityImpact;
        default:
          return 0;
      }
    });

    return results;
  }, [allSolutions, filters]);

  const selectedSolution = useMemo(
    () =>
      selectedSolutionId
        ? (allSolutions.find((s) => s.id === selectedSolutionId) ?? null)
        : null,
    [allSolutions, selectedSolutionId],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== "all") count++;
    if (filters.stage !== "all") count++;
    if (filters.region !== "all") count++;
    if (filters.finFracFranOnly) count++;
    return count;
  }, [filters]);

  function updateFilter<K extends keyof SolutionFilters>(
    key: K,
    value: SolutionFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function openDetail(id: string) {
    setSelectedSolutionId(id);
    setDetailOpen(true);
  }

  function closeDetail() {
    setDetailOpen(false);
    setTimeout(() => setSelectedSolutionId(null), 300);
  }

  return {
    filters,
    filteredSolutions,
    selectedSolution,
    detailOpen,
    submitOpen,
    stats,
    activeFilterCount,
    updateFilter,
    clearFilters,
    openDetail,
    closeDetail,
    setSubmitOpen,
  };
}
