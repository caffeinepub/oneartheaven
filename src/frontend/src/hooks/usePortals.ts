import { useMemo, useState } from "react";
import { ALL_PORTALS, getPortalStats } from "../data/portalData";
import type { ActionPortal } from "../data/portalTypes";

export type PortalSort = "volunteers" | "nations" | "initiatives" | "name";

interface UsePortalsState {
  portals: ActionPortal[];
  filteredPortals: ActionPortal[];
  selectedPortal: ActionPortal | null;
  search: string;
  setSearch: (v: string) => void;
  filterFinFracFran: boolean;
  setFilterFinFracFran: (v: boolean) => void;
  sort: PortalSort;
  setSort: (v: PortalSort) => void;
  openPortal: (councilId: string) => void;
  closePortal: () => void;
  stats: {
    totalVolunteers: number;
    totalNations: number;
    totalInitiatives: number;
    totalPartners: number;
  };
}

export function usePortals(): UsePortalsState {
  const [search, setSearch] = useState("");
  const [filterFinFracFran, setFilterFinFracFran] = useState(false);
  const [sort, setSort] = useState<PortalSort>("volunteers");
  const [selectedPortal, setSelectedPortal] = useState<ActionPortal | null>(
    null,
  );

  const filteredPortals = useMemo(() => {
    let list = [...ALL_PORTALS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.mandate.toLowerCase().includes(q),
      );
    }

    if (filterFinFracFran) {
      list = list.filter((p) => !!p.finFracFranSpotlight);
    }

    list.sort((a, b) => {
      if (sort === "volunteers") return b.volunteerCount - a.volunteerCount;
      if (sort === "nations") return b.nationCount - a.nationCount;
      if (sort === "initiatives")
        return b.initiatives.length - a.initiatives.length;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [search, filterFinFracFran, sort]);

  const openPortal = (councilId: string) => {
    const portal = ALL_PORTALS.find((p) => p.councilId === councilId);
    setSelectedPortal(portal ?? null);
  };

  const closePortal = () => setSelectedPortal(null);

  const stats = useMemo(() => getPortalStats(), []);

  return {
    portals: ALL_PORTALS,
    filteredPortals,
    selectedPortal,
    search,
    setSearch,
    filterFinFracFran,
    setFilterFinFracFran,
    sort,
    setSort,
    openPortal,
    closePortal,
    stats,
  };
}
