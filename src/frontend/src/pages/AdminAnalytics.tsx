import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ACTIVITY_ACTION_CONFIG,
  type OrgMetrics,
  type PlatformStat,
  TREND_CONFIG,
  type TimeSeriesData,
  type VendorMetrics,
} from "@/data/analyticsTypes";
import {
  useActivityFeed,
  useOrgMetrics,
  usePlatformHealth,
  usePlatformStats,
  useTimeSeries,
  useVendorLeaderboard,
} from "@/hooks/useAnalytics";
import { useCountUp } from "@/hooks/useCountUp";
import {
  Activity,
  BarChart3,
  Building2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Globe,
  RefreshCw,
  Search,
  ShieldCheck,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Icon map ──────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Users,
  Store,
  DollarSign,
  Globe,
  TrendingUp,
  Activity,
  ShieldCheck,
  BarChart3,
};

// ─── Section Header ────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  accentColor,
}: {
  eyebrow: string;
  title: string;
  accentColor: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div
        className="flex-shrink-0 rounded-full mt-1"
        style={{
          width: 4,
          height: 28,
          background: accentColor,
        }}
      />
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.50 0.04 260)" }}
        >
          {eyebrow}
        </div>
        <div
          className="text-xl font-bold font-display"
          style={{ color: "oklch(var(--pearl))" }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ stat, delay }: { stat: PlatformStat; delay: number }) {
  const displayValue = stat.unit === "%" ? stat.value : Math.round(stat.value);
  const count = useCountUp({ end: displayValue, duration: 1200 });
  const Icon = ICON_MAP[stat.icon] ?? BarChart3;
  const trend = TREND_CONFIG[stat.trend];

  const colorMap: Record<string, string> = {
    emerald: "oklch(0.68 0.18 155)",
    blue: "oklch(0.62 0.19 220)",
    violet: "oklch(0.65 0.18 275)",
    amber: "oklch(0.72 0.16 75)",
    teal: "oklch(0.65 0.17 195)",
    gold: "oklch(0.72 0.16 75)",
    sky: "oklch(0.68 0.17 230)",
    purple: "oklch(0.60 0.18 295)",
  };
  const accent = colorMap[stat.color] ?? "oklch(0.72 0.16 75)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "oklch(0.14 0.04 260)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        borderTop: `2px solid ${accent}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}1a`, border: `1px solid ${accent}30` }}
        >
          <Icon className="h-4 w-4" style={{ color: accent }} />
        </div>
        <span
          className={`text-xs font-semibold flex items-center gap-0.5 ${trend.colorClass}`}
        >
          {trend.arrow} {stat.trendPct}%
        </span>
      </div>
      <div>
        <div
          className="font-display text-2xl font-extrabold leading-none mb-0.5"
          style={{ color: "oklch(var(--pearl))" }}
        >
          {stat.unit === "%"
            ? `${stat.value}%`
            : stat.unit === "USD"
              ? `$${(count / 1000).toFixed(0)}K`
              : count.toLocaleString()}
        </div>
        <div className="text-xs" style={{ color: "oklch(0.55 0.04 260)" }}>
          {stat.label}
        </div>
        <div className="text-xs mt-1" style={{ color: "oklch(0.42 0.04 260)" }}>
          {stat.trendLabel}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sparkline Chart ───────────────────────────────────────────────────────
function formatChartDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function MiniLineChart({ series }: { series: TimeSeriesData }) {
  const pts = series.points;
  if (!pts.length) return null;
  const values = pts.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 200;
  const H = 90;
  const pad = 4;

  const coords = pts.map((p, i) => {
    const x = pad + (i / (pts.length - 1)) * (W - pad * 2);
    const y = H - pad - ((p.value - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  });

  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const trend = last.value >= (prev?.value ?? last.value) ? "up" : "down";
  const trendColor =
    trend === "up" ? "oklch(0.68 0.18 155)" : "oklch(0.60 0.18 27)";
  const gradId = `grad-${series.id}`;

  const areaCoords = [
    coords[0].replace(/,.*/, `,${H - pad}`),
    ...coords,
    coords[coords.length - 1].replace(/,.*/, `,${H - pad}`),
  ].join(" ");

  const firstDate = pts[0]?.date ? formatChartDate(pts[0].date) : "";
  const lastDate = last?.date ? formatChartDate(last.date) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl p-5"
      style={{
        background: "oklch(0.14 0.04 260)",
        border: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-semibold"
          style={{ color: "oklch(0.78 0.04 260)" }}
        >
          {series.label}
        </span>
        <span
          className="text-sm font-bold px-2 py-0.5 rounded-full"
          style={{
            color: trendColor,
            background: `${series.color}1a`,
          }}
        >
          {trend === "up" ? "↑" : "↓"} {last.value.toLocaleString()}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 90 }}
        role="img"
        aria-label={series.label}
      >
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={series.color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={series.color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon points={areaCoords} fill={`url(#${gradId})`} />
        <polyline
          points={coords.join(" ")}
          fill="none"
          stroke={series.color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {(firstDate || lastDate) && (
        <div className="flex justify-between mt-1">
          <span style={{ fontSize: 10, color: "oklch(0.40 0.04 260)" }}>
            {firstDate}
          </span>
          <span style={{ fontSize: 10, color: "oklch(0.40 0.04 260)" }}>
            {lastDate}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Activity Feed ─────────────────────────────────────────────────────────
function relativeTime(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const DOT_COLORS: Record<string, string> = {
  emerald: "oklch(0.68 0.18 155)",
  blue: "oklch(0.62 0.19 220)",
  teal: "oklch(0.65 0.17 195)",
  violet: "oklch(0.65 0.18 275)",
  amber: "oklch(0.72 0.16 75)",
  red: "oklch(0.60 0.18 27)",
  orange: "oklch(0.68 0.18 50)",
  gold: "oklch(0.72 0.16 75)",
  sky: "oklch(0.68 0.17 230)",
  purple: "oklch(0.60 0.18 295)",
  lime: "oklch(0.75 0.18 130)",
};

// ─── Vendor Leaderboard ────────────────────────────────────────────────────
const RANK_STYLES: Record<number, { color: string; label: string }> = {
  1: { color: "oklch(0.72 0.16 75)", label: "#1" },
  2: { color: "oklch(0.72 0.06 260)", label: "#2" },
  3: { color: "oklch(0.60 0.12 50)", label: "#3" },
};

function VendorLeaderboardRow({
  vendor,
  maxRevenue,
  index,
}: {
  vendor: VendorMetrics;
  maxRevenue: number;
  index: number;
}) {
  const rankStyle = RANK_STYLES[vendor.rank] ?? {
    color: "oklch(0.45 0.03 260)",
    label: `#${vendor.rank}`,
  };
  const pct = Math.round((vendor.totalRevenue / maxRevenue) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex items-center gap-4 py-3"
      style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
      data-ocid={`admin.analytics.vendors.item.${index}`}
    >
      <span
        className="font-display text-sm font-bold w-8 text-center flex-shrink-0"
        style={{ color: rankStyle.color }}
      >
        {rankStyle.label}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-semibold truncate"
          style={{ color: "oklch(var(--pearl))" }}
        >
          {vendor.vendorName}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{
              background: "oklch(0.65 0.18 275 / 0.12)",
              color: "oklch(0.65 0.18 275)",
              border: "1px solid oklch(0.65 0.18 275 / 0.25)",
            }}
          >
            {vendor.tier}
          </span>
          <span className="text-xs" style={{ color: "oklch(0.50 0.04 260)" }}>
            {vendor.region}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(0.20 0.04 260)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="h-full rounded-full"
            style={{ background: rankStyle.color }}
          />
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div
          className="text-sm font-bold"
          style={{ color: "oklch(var(--pearl))" }}
        >
          ${(vendor.totalRevenue / 1000).toFixed(0)}K
        </div>
        <div className="text-xs" style={{ color: "oklch(0.72 0.16 75)" }}>
          FF™ ${(vendor.finfracfranEarnings / 1000).toFixed(0)}K
        </div>
        <div className="text-xs" style={{ color: "oklch(0.50 0.04 260)" }}>
          {vendor.nationsReached} nations
        </div>
      </div>
    </motion.div>
  );
}

// ─── Org Metrics Table ─────────────────────────────────────────────────────
type SortableKey = "totalRevenue" | "memberCount" | "growthPct";

function SortHeader({
  label,
  sortKey,
  active,
  dir,
  onClick,
}: {
  label: string;
  sortKey: SortableKey;
  active: boolean;
  dir: "asc" | "desc";
  onClick: (k: keyof OrgMetrics) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(sortKey)}
      className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-colors"
      style={{ color: active ? "oklch(0.72 0.16 75)" : "oklch(0.50 0.04 260)" }}
    >
      {label}
      {active ? (
        dir === "desc" ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronUp className="h-3 w-3" />
        )
      ) : null}
    </button>
  );
}

// ─── Health Status ─────────────────────────────────────────────────────────
function StatusDot({ status }: { status: "healthy" | "warning" | "critical" }) {
  const colors = {
    healthy: "oklch(0.68 0.18 155)",
    warning: "oklch(0.72 0.16 75)",
    critical: "oklch(0.60 0.18 27)",
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: colors[status] }}
    />
  );
}

function statusToColor(status: "healthy" | "warning" | "critical"): string {
  const map = {
    healthy: "oklch(0.68 0.18 155)",
    warning: "oklch(0.72 0.16 75)",
    critical: "oklch(0.60 0.18 27)",
  };
  return map[status];
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export function AdminAnalyticsPage() {
  const stats = usePlatformStats();
  const series = useTimeSeries();
  const { feed, hasMore, loadMore } = useActivityFeed();
  const { rows, sortKey, sortDir, toggleSort, search, setSearch } =
    useOrgMetrics();
  const vendors = useVendorLeaderboard(5);
  const { health, storagePct, uptimeStatus, responseStatus, errorStatus } =
    usePlatformHealth();
  const maxRevenue = vendors[0]?.totalRevenue ?? 1;

  const [refreshed, setRefreshed] = useState(false);
  function handleRefresh() {
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 1500);
    toast.success("Dashboard refreshed");
  }

  const storageStatus: "healthy" | "warning" | "critical" =
    storagePct > 80 ? "warning" : "healthy";

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="admin.analytics.page"
    >
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
        data-ocid="admin.analytics.hero.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.58 0.18 295 / 0.15) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "oklch(0.58 0.18 295 / 0.4)",
              background: "oklch(0.58 0.18 295 / 0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.70 0.18 295)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.70 0.18 295)" }}
            >
              Phase 12 · Analytics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "oklch(var(--pearl))",
            }}
          >
            <span style={{ color: "oklch(0.70 0.18 295)" }}>Platform</span>{" "}
            Analytics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            Real-time platform insights — org activity, vendor performance,
            time-series trends, and infrastructure health.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="text-xs" style={{ color: "oklch(0.45 0.04 260)" }}>
              Last updated: {new Date("2026-03-15T09:14:00Z").toLocaleString()}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-7"
              style={{
                borderColor: "oklch(0.58 0.18 295 / 0.4)",
                color: "oklch(0.70 0.18 295)",
              }}
              onClick={handleRefresh}
              data-ocid="admin.analytics.hero.button"
            >
              <RefreshCw
                className={`h-3 w-3 transition-transform ${refreshed ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-10"
        data-ocid="admin.analytics.stats.section"
      >
        <SectionHeader
          eyebrow="Overview"
          title="Platform Metrics"
          accentColor="oklch(0.65 0.18 275)"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.id} stat={s} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* ── Time Series Charts ───────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-10"
        data-ocid="admin.analytics.charts.section"
      >
        <SectionHeader
          eyebrow="Trends"
          title="Activity Over Time"
          accentColor="oklch(0.68 0.18 155)"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {series.map((s) => (
            <MiniLineChart key={s.id} series={s} />
          ))}
        </div>
      </section>

      {/* ── Activity Feed + Vendor Leaderboard ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "oklch(0.14 0.04 260)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }}
            data-ocid="admin.analytics.activity.section"
          >
            <SectionHeader
              eyebrow="Live"
              title="Recent Activity"
              accentColor="oklch(0.65 0.17 195)"
            />

            <div className="space-y-0">
              {feed.map((item, idx) => {
                const cfg = ACTIVITY_ACTION_CONFIG[item.action] ?? {
                  label: item.action,
                  color: "zinc",
                };
                const dotColor =
                  DOT_COLORS[cfg.color] ?? "oklch(0.55 0.04 260)";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="flex items-start gap-3 py-3"
                    style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)" }}
                    data-ocid={`admin.analytics.activity.item.${idx + 1}`}
                  >
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: dotColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="text-xs font-semibold truncate"
                          style={{ color: "oklch(0.78 0.04 260)" }}
                        >
                          {item.orgName}
                        </span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: "oklch(0.55 0.04 260 / 0.12)",
                            color: "oklch(0.55 0.04 260)",
                          }}
                        >
                          {item.orgType}
                        </span>
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: dotColor }}
                      >
                        {cfg.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        {item.actorName} · {item.actorRole}
                      </div>
                    </div>
                    <span
                      className="text-xs flex-shrink-0"
                      style={{ color: "oklch(0.42 0.04 260)" }}
                    >
                      {relativeTime(item.timestamp)}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {hasMore && (
              <button
                type="button"
                onClick={loadMore}
                className="w-full mt-4 text-xs py-2 rounded-lg border transition-colors"
                style={{
                  borderColor: "oklch(1 0 0 / 0.08)",
                  color: "oklch(0.55 0.04 260)",
                }}
                data-ocid="admin.analytics.activity.load_more.button"
              >
                Load more
              </button>
            )}
          </div>

          {/* Vendor Leaderboard */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "oklch(0.14 0.04 260)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }}
            data-ocid="admin.analytics.vendors.section"
          >
            <SectionHeader
              eyebrow="Rankings"
              title="Top Vendors"
              accentColor="oklch(0.72 0.16 75)"
            />

            <div>
              {vendors.map((v, i) => (
                <VendorLeaderboardRow
                  key={v.vendorId}
                  vendor={v}
                  maxRevenue={maxRevenue}
                  index={i + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Org Metrics Table ────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-10"
        data-ocid="admin.analytics.orgs.section"
      >
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.14 0.04 260)",
            border: "1px solid oklch(1 0 0 / 0.08)",
          }}
        >
          <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
            <SectionHeader
              eyebrow="Data"
              title="Org Performance"
              accentColor="oklch(0.68 0.17 230)"
            />
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: "oklch(0.5 0.04 260)" }}
              />
              <Input
                placeholder="Search orgs…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 py-1.5 h-8 w-52 text-xs"
                style={{
                  background: "oklch(0.10 0.03 260)",
                  borderColor: "oklch(1 0 0 / 0.1)",
                  color: "oklch(var(--pearl))",
                }}
                data-ocid="admin.analytics.orgs.search_input"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              data-ocid="admin.analytics.orgs.table"
            >
              <thead>
                <tr style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}>
                  {[
                    { label: "Organization", key: null },
                    { label: "Region", key: null },
                    { label: "Members", key: "memberCount" as SortableKey },
                    { label: "Revenue", key: "totalRevenue" as SortableKey },
                    { label: "FF™ Earnings", key: null },
                    { label: "Nations", key: null },
                    { label: "Plan", key: null },
                    { label: "Growth", key: "growthPct" as SortableKey },
                  ].map(({ label, key }) => (
                    <th
                      key={label}
                      className="text-left pb-3 pr-4 whitespace-nowrap"
                    >
                      {key ? (
                        <SortHeader
                          label={label}
                          sortKey={key}
                          active={sortKey === key}
                          dir={sortDir}
                          onClick={toggleSort}
                        />
                      ) : (
                        <span
                          className="text-xs font-semibold uppercase tracking-wide"
                          style={{ color: "oklch(0.50 0.04 260)" }}
                        >
                          {label}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row.orgId}
                    style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)" }}
                    data-ocid={`admin.analytics.orgs.row.${idx + 1}`}
                  >
                    <td className="py-3 pr-4">
                      <div
                        className="font-semibold text-sm"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {row.orgName}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs mt-0.5"
                        style={{
                          borderColor: "oklch(0.55 0.04 260 / 0.3)",
                          color: "oklch(0.55 0.04 260)",
                        }}
                      >
                        {row.orgType}
                      </Badge>
                    </td>
                    <td
                      className="py-3 pr-4 text-xs whitespace-nowrap"
                      style={{ color: "oklch(0.60 0.04 260)" }}
                    >
                      {row.region}
                    </td>
                    <td
                      className="py-3 pr-4 text-xs font-mono whitespace-nowrap"
                      style={{ color: "oklch(0.70 0.04 260)" }}
                    >
                      {row.memberCount.toLocaleString()}
                    </td>
                    <td
                      className="py-3 pr-4 text-xs font-mono whitespace-nowrap"
                      style={{ color: "oklch(0.70 0.04 260)" }}
                    >
                      ${(row.totalRevenue / 1000).toFixed(0)}K
                    </td>
                    <td
                      className="py-3 pr-4 text-xs font-mono whitespace-nowrap"
                      style={{ color: "oklch(0.72 0.16 75)" }}
                    >
                      ${(row.finfracfranEarnings / 1000).toFixed(0)}K
                    </td>
                    <td
                      className="py-3 pr-4 text-xs font-mono whitespace-nowrap"
                      style={{ color: "oklch(0.60 0.04 260)" }}
                    >
                      {row.nationsReached}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                        style={{
                          background: "oklch(0.65 0.18 275 / 0.12)",
                          color: "oklch(0.65 0.18 275)",
                          border: "1px solid oklch(0.65 0.18 275 / 0.25)",
                        }}
                      >
                        {row.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs font-semibold whitespace-nowrap">
                      <span
                        style={{
                          color:
                            row.growthPct >= 0
                              ? "oklch(0.68 0.18 155)"
                              : "oklch(0.60 0.18 27)",
                        }}
                      >
                        {row.growthPct >= 0 ? "+" : ""}
                        {row.growthPct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Platform Health ──────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-24"
        data-ocid="admin.analytics.health.section"
      >
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.14 0.04 260)",
            border: "1px solid oklch(1 0 0 / 0.08)",
          }}
        >
          <SectionHeader
            eyebrow="Status"
            title="Infrastructure Health"
            accentColor="oklch(0.68 0.18 155)"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Uptime */}
            <div
              className="space-y-2 rounded-xl p-4"
              style={{
                background: "oklch(0.10 0.03 260)",
                border: "1px solid oklch(1 0 0 / 0.07)",
                borderTop: `2px solid ${statusToColor(uptimeStatus)}`,
              }}
            >
              <div className="flex items-center gap-2">
                <StatusDot status={uptimeStatus} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  Uptime
                </span>
              </div>
              <div
                className="font-display text-3xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {health.uptimePct}%
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.48 0.04 260)" }}
              >
                Last 30 days
              </div>
            </div>

            {/* Response Time */}
            <div
              className="space-y-2 rounded-xl p-4"
              style={{
                background: "oklch(0.10 0.03 260)",
                border: "1px solid oklch(1 0 0 / 0.07)",
                borderTop: `2px solid ${statusToColor(responseStatus)}`,
              }}
            >
              <div className="flex items-center gap-2">
                <StatusDot status={responseStatus} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  Response Time
                </span>
              </div>
              <div
                className="font-display text-3xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {health.avgResponseMs}ms
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.48 0.04 260)" }}
              >
                Avg. this week
              </div>
            </div>

            {/* Error Rate */}
            <div
              className="space-y-2 rounded-xl p-4"
              style={{
                background: "oklch(0.10 0.03 260)",
                border: "1px solid oklch(1 0 0 / 0.07)",
                borderTop: `2px solid ${statusToColor(errorStatus)}`,
              }}
            >
              <div className="flex items-center gap-2">
                <StatusDot status={errorStatus} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  Error Rate
                </span>
              </div>
              <div
                className="font-display text-3xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {health.errorsLastHour}
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.48 0.04 260)" }}
              >
                Errors last hour
              </div>
            </div>

            {/* Storage */}
            <div
              className="space-y-2 rounded-xl p-4"
              style={{
                background: "oklch(0.10 0.03 260)",
                border: "1px solid oklch(1 0 0 / 0.07)",
                borderTop: `2px solid ${statusToColor(storageStatus)}`,
              }}
            >
              <div className="flex items-center gap-2">
                <StatusDot status={storageStatus} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  Storage
                </span>
              </div>
              <div
                className="font-display text-3xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {storagePct}%
              </div>
              <Progress value={storagePct} className="h-1.5" />
              <div
                className="text-xs"
                style={{ color: "oklch(0.48 0.04 260)" }}
              >
                {health.storageUsedGB.toLocaleString()} /{" "}
                {health.storageTotalGB.toLocaleString()} GB
              </div>
            </div>
          </div>

          <div
            className="mt-6 pt-4 text-xs"
            style={{
              borderTop: "1px solid oklch(1 0 0 / 0.07)",
              color: "oklch(0.42 0.04 260)",
            }}
          >
            Last checked: {new Date(health.lastCheckedAt).toLocaleString()}
          </div>
        </div>
      </section>
    </main>
  );
}
