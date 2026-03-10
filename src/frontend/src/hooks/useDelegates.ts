import { DELEGATES, type DelegateProfile } from "@/data/delegateData";
import { useMemo, useState } from "react";

export type SortBy = "name" | "aiScore" | "joinedYear";
export type RoleFilter = "all" | "chair" | "member";

export interface DelegateFilters {
  search: string;
  councilFilter: string;
  regionFilter: string;
  roleFilter: RoleFilter;
  sortBy: SortBy;
}

export interface DelegateStats {
  totalDelegates: number;
  totalCouncils: number;
  avgAlignmentScore: number;
  chairCount: number;
}

export function useDelegates() {
  const [filters, setFilters] = useState<DelegateFilters>({
    search: "",
    councilFilter: "all",
    regionFilter: "All Regions",
    roleFilter: "all",
    sortBy: "name",
  });

  const filtered = useMemo<DelegateProfile[]>(() => {
    let result = [...DELEGATES];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.bio.toLowerCase().includes(q) ||
          d.expertiseTags.some((t) => t.toLowerCase().includes(q)) ||
          d.affiliation.toLowerCase().includes(q),
      );
    }

    // Council filter
    if (filters.councilFilter !== "all") {
      result = result.filter((d) =>
        d.councilMemberships.some((c) => c.councilId === filters.councilFilter),
      );
    }

    // Region filter
    if (filters.regionFilter !== "All Regions") {
      result = result.filter((d) => d.region === filters.regionFilter);
    }

    // Role filter
    if (filters.roleFilter === "chair") {
      result = result.filter((d) => d.isChair);
    } else if (filters.roleFilter === "member") {
      result = result.filter((d) => !d.isChair);
    }

    // Sort
    result.sort((a, b) => {
      if (filters.sortBy === "aiScore")
        return b.aiAlignmentScore - a.aiAlignmentScore;
      if (filters.sortBy === "joinedYear") return a.joinedYear - b.joinedYear;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [filters]);

  const stats = useMemo<DelegateStats>(() => {
    const councilIds = new Set(
      DELEGATES.flatMap((d) => d.councilMemberships.map((c) => c.councilId)),
    );
    const avgScore = Math.round(
      DELEGATES.reduce((sum, d) => sum + d.aiAlignmentScore, 0) /
        DELEGATES.length,
    );
    return {
      totalDelegates: DELEGATES.length,
      totalCouncils: councilIds.size,
      avgAlignmentScore: avgScore,
      chairCount: DELEGATES.filter((d) => d.isChair).length,
    };
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.councilFilter !== "all") count++;
    if (filters.regionFilter !== "All Regions") count++;
    if (filters.roleFilter !== "all") count++;
    return count;
  }, [filters]);

  function clearFilters() {
    setFilters({
      search: "",
      councilFilter: "all",
      regionFilter: "All Regions",
      roleFilter: "all",
      sortBy: "name",
    });
  }

  return {
    filtered,
    stats,
    filters,
    setFilters,
    activeFilterCount,
    clearFilters,
  };
}
