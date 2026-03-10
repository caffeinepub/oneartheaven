import {
  COMMUNITY_STATS,
  LOCAL_CHAPTERS,
  VOLUNTEER_ROLES,
} from "@/data/communityData";
import type {
  LocalChapter,
  RegionTag,
  VolunteerRole,
  VolunteerSkill,
} from "@/data/communityTypes";
import { useMemo, useState } from "react";

export type CommunityTab =
  | "overview"
  | "chapters"
  | "compassion"
  | "volunteers"
  | "youth";

export function useCommunity() {
  const [activeTab, setActiveTab] = useState<CommunityTab>("overview");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<RegionTag | "all">("all");
  const [skillFilter, setSkillFilter] = useState<VolunteerSkill | "all">("all");
  const [selectedChapter, setSelectedChapter] = useState<LocalChapter | null>(
    null,
  );
  const [selectedVolunteerRole, setSelectedVolunteerRole] =
    useState<VolunteerRole | null>(null);
  const [applySheetOpen, setApplySheetOpen] = useState(false);

  const filteredChapters = useMemo(() => {
    return LOCAL_CHAPTERS.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === "all" || c.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [search, regionFilter]);

  const filteredRoles = useMemo(() => {
    return VOLUNTEER_ROLES.filter((r) => {
      const matchesSearch =
        search === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.organization.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === "all" || r.region === regionFilter;
      const matchesSkill =
        skillFilter === "all" || r.skills.includes(skillFilter);
      return matchesSearch && matchesRegion && matchesSkill;
    });
  }, [search, regionFilter, skillFilter]);

  const stats = COMMUNITY_STATS;

  function openChapter(chapter: LocalChapter) {
    setSelectedChapter(chapter);
  }

  function closeChapter() {
    setSelectedChapter(null);
  }

  function openRole(role: VolunteerRole) {
    setSelectedVolunteerRole(role);
    setApplySheetOpen(true);
  }

  function closeRole() {
    setSelectedVolunteerRole(null);
    setApplySheetOpen(false);
  }

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    regionFilter,
    setRegionFilter,
    skillFilter,
    setSkillFilter,
    selectedChapter,
    openChapter,
    closeChapter,
    selectedVolunteerRole,
    applySheetOpen,
    openRole,
    closeRole,
    filteredChapters,
    filteredRoles,
    stats,
  };
}
