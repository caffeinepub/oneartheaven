import { useMemo, useState } from "react";
import { RESOLUTIONS } from "../data/resolutionData";
import type {
  Resolution,
  ResolutionCategory,
  ResolutionStage,
} from "../data/resolutionTypes";

export function useResolutions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStage, setActiveStage] = useState<ResolutionStage | "all">(
    "all",
  );
  const [activeCategory, setActiveCategory] = useState<
    ResolutionCategory | "all"
  >("all");
  const [selectedResolution, setSelectedResolution] =
    useState<Resolution | null>(null);

  const filteredResolutions = useMemo(() => {
    return RESOLUTIONS.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.sponsoringCouncil.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage = activeStage === "all" || r.stage === activeStage;
      const matchesCategory =
        activeCategory === "all" || r.category === activeCategory;

      return matchesSearch && matchesStage && matchesCategory;
    });
  }, [searchQuery, activeStage, activeCategory]);

  const stats = useMemo(() => {
    const total = RESOLUTIONS.length;
    const passed = RESOLUTIONS.filter(
      (r) =>
        r.stage === "passed" ||
        r.stage === "implementation" ||
        r.stage === "completed",
    ).length;
    const inProgress = RESOLUTIONS.filter(
      (r) =>
        r.stage === "review" ||
        r.stage === "voting" ||
        r.stage === "implementation",
    ).length;
    const nationsImpacted = Math.max(
      ...RESOLUTIONS.map((r) => r.nationsImpacted),
    );
    const stageCounts: Record<string, number> = {};
    for (const r of RESOLUTIONS) {
      stageCounts[r.stage] = (stageCounts[r.stage] || 0) + 1;
    }
    return { total, passed, inProgress, nationsImpacted, stageCounts };
  }, []);

  return {
    resolutions: filteredResolutions,
    allResolutions: RESOLUTIONS,
    stats,
    searchQuery,
    setSearchQuery,
    activeStage,
    setActiveStage,
    activeCategory,
    setActiveCategory,
    selectedResolution,
    setSelectedResolution,
    openResolution: (r: Resolution) => setSelectedResolution(r),
    closeResolution: () => setSelectedResolution(null),
  };
}
