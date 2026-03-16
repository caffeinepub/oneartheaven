import { useMemo, useState } from "react";
import {
  getActivityFeed,
  getDashboard,
  getOrgMetrics,
  getPlatformHealth,
  getTimeSeries,
  getVendorLeaderboard,
} from "../data/analyticsData";
import type {
  OrgActivityAction,
  OrgMetrics,
  TimeSeriesData,
} from "../data/analyticsTypes";

export function useDashboard() {
  return useMemo(() => getDashboard(), []);
}
export function usePlatformStats() {
  return useDashboard().stats;
}

export function useTimeSeries(seriesIds?: string[]): TimeSeriesData[] {
  return useMemo(() => {
    const all = getTimeSeries();
    if (!seriesIds || seriesIds.length === 0) return all;
    return all.filter((s) => seriesIds.includes(s.id));
  }, [seriesIds]);
}

export function useActivityFeed(filterAction?: OrgActivityAction) {
  const [limit, setLimit] = useState(12);
  const all = useMemo(() => getActivityFeed(50), []);
  const filtered = useMemo(() => {
    let feed = all;
    if (filterAction) feed = feed.filter((a) => a.action === filterAction);
    return feed.slice(0, limit);
  }, [all, filterAction, limit]);
  return {
    feed: filtered,
    total: all.length,
    hasMore: limit < all.length,
    loadMore: () => setLimit((p) => p + 10),
  };
}

export function useOrgMetrics() {
  const [sortKey, setSortKey] = useState<keyof OrgMetrics>("totalRevenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const all = useMemo(() => getOrgMetrics(), []);
  const rows = useMemo(() => {
    let r = [...all];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (o) =>
          o.orgName.toLowerCase().includes(q) ||
          o.orgType.toLowerCase().includes(q) ||
          o.region.toLowerCase().includes(q),
      );
    }
    r.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "desc" ? bv - av : av - bv;
      return sortDir === "desc"
        ? String(bv).localeCompare(String(av))
        : String(av).localeCompare(String(bv));
    });
    return r;
  }, [all, sortKey, sortDir, search]);
  const toggleSort = (key: keyof OrgMetrics) => {
    if (key === sortKey) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };
  return { rows, sortKey, sortDir, toggleSort, search, setSearch };
}

export function useVendorLeaderboard(topN = 5) {
  return useMemo(() => getVendorLeaderboard(topN), [topN]);
}

export function usePlatformHealth() {
  const health = useMemo(() => getPlatformHealth(), []);
  const storagePct = Math.round(
    (health.storageUsedGB / health.storageTotalGB) * 100,
  );
  const uptimeStatus =
    health.uptimePct >= 99.9
      ? "healthy"
      : health.uptimePct >= 99
        ? "warning"
        : "critical";
  const responseStatus =
    health.avgResponseMs < 300
      ? "healthy"
      : health.avgResponseMs < 800
        ? "warning"
        : "critical";
  const errorStatus =
    health.errorsLastHour === 0
      ? "healthy"
      : health.errorsLastHour < 10
        ? "warning"
        : "critical";
  return { health, storagePct, uptimeStatus, responseStatus, errorStatus } as {
    health: typeof health;
    storagePct: number;
    uptimeStatus: "healthy" | "warning" | "critical";
    responseStatus: "healthy" | "warning" | "critical";
    errorStatus: "healthy" | "warning" | "critical";
  };
}
