import { SearchInput } from "@/components/SearchInput";
import {
  SheetDetailHeader,
  SheetMetaRow,
  SheetSectionLabel,
} from "@/components/SheetDetailHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  IMPACT_CATEGORY_CONFIG,
  SDG_CONFIG,
  SDG_STATUS_CONFIG,
  TREND_CONFIG,
  WORLD_REGION_CONFIG,
} from "@/data/sustainabilityTypes";
import type {
  EnvironmentalReport,
  ImpactCategory,
  ImpactMetric,
  NationProgressRecord,
  ReportCategory,
  SDGIndicator,
  SDGStatus,
  TrendDirection,
  WorldRegion,
} from "@/data/sustainabilityTypes";
import { useCountUp } from "@/hooks/useCountUp";
import {
  useEnvironmentalReports,
  useImpactMetrics,
  useNationProgress,
  useSDGIndicators,
  useSustainabilityStats,
} from "@/hooks/useSustainability";
import {
  BarChart3,
  Download,
  Globe2,
  Leaf,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────────────────

function calcProgress(current: number, target: number): number {
  if (target === 0) {
    return current <= 0
      ? 100
      : Math.max(0, Math.min(100, Math.round((1 - current / 20) * 100)));
  }
  return Math.max(0, Math.min(100, Math.round((current / target) * 100)));
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ─── Stat Card ──────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  accentColor: string;
  delay: number;
}

function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  accentColor,
  delay,
}: StatCardProps) {
  const rawNum =
    typeof value === "number"
      ? value
      : Number.parseFloat(String(value).replace(/,/g, ""));
  const isNumeric = !Number.isNaN(rawNum) && rawNum > 0;
  const animated = useCountUp({ end: isNumeric ? rawNum : 0 });
  const displayValue = isNumeric
    ? rawNum >= 1000
      ? animated.toLocaleString()
      : animated
    : value;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-2 px-5 py-4 rounded-2xl"
      style={{
        background: "oklch(0.14 0.03 160 / 0.6)",
        border: `1px solid ${accentColor}33`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}44`,
          }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: accentColor }} />
        </div>
        <span
          className="text-xs font-medium tracking-wide"
          style={{ color: "oklch(0.58 0.04 180)" }}
        >
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-display text-2xl font-bold"
          style={{ color: accentColor }}
        >
          {displayValue}
        </span>
        {unit && (
          <span className="text-xs" style={{ color: "oklch(0.5 0.04 180)" }}>
            {unit}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── SDG Card ───────────────────────────────────────────────────────────────────

interface SDGCardProps {
  sdg: SDGIndicator;
  index: number;
  onOpen: (sdg: SDGIndicator) => void;
}

function SDGCard({ sdg, index, onOpen }: SDGCardProps) {
  const cfg = SDG_CONFIG[sdg.goal];
  const statusCfg = SDG_STATUS_CONFIG[sdg.status];
  const trendCfg = TREND_CONFIG[sdg.trend];
  const progress = calcProgress(sdg.currentValue, sdg.targetValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
      className="group rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300"
      style={{
        background: "oklch(0.13 0.025 160 / 0.8)",
        border: `1px solid ${cfg.color}28`,
      }}
      whileHover={{ scale: 1.015, borderColor: `${cfg.color}60` }}
      data-ocid={`sustainability.sdg.card.${index + 1}`}
      onClick={() => onOpen(sdg)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
            style={{ background: cfg.color, color: "#fff" }}
          >
            {sdg.goal}
          </div>
          <span className="text-lg leading-none">{cfg.icon}</span>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: `${statusCfg.color}20`,
            border: `1px solid ${statusCfg.color}50`,
            color: statusCfg.color,
          }}
        >
          {statusCfg.label}
        </span>
      </div>
      <p
        className="text-sm font-semibold leading-snug text-white line-clamp-2"
        style={{ minHeight: "2.5rem" }}
      >
        {sdg.name}
      </p>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.5 0.04 180)" }}
          >
            {sdg.currentValue} / {sdg.targetValue} {sdg.unit.split(" ")[0]}
          </span>
          <span className="text-[10px] font-bold" style={{ color: cfg.color }}>
            {progress}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full"
          style={{ background: "oklch(0.2 0.02 180)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: cfg.color }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: `${trendCfg.color}18`,
            border: `1px solid ${trendCfg.color}40`,
            color: trendCfg.color,
          }}
        >
          {trendCfg.arrow} {trendCfg.label}
        </span>
        <span
          className="text-[10px] truncate"
          style={{ color: "oklch(0.48 0.04 180)" }}
        >
          {sdg.councilOwner}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <span
          className="text-[10px] px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.72 0.16 75 / 0.12)",
            color: "oklch(0.72 0.16 75)",
            border: "1px solid oklch(0.72 0.16 75 / 0.25)",
          }}
        >
          FinFracFran™ ×{sdg.ffAdoptionCount}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-[10px] font-semibold"
          style={{ color: cfg.color }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(sdg);
          }}
          data-ocid={`sustainability.sdg.open_modal_button.${index + 1}`}
        >
          Details →
        </Button>
      </div>
    </motion.div>
  );
}

// ─── SDG Detail Sheet ────────────────────────────────────────────────────────────

function SDGDetailSheet({
  sdg,
  onClose,
}: { sdg: SDGIndicator | null; onClose: () => void }) {
  if (!sdg) return null;
  const cfg = SDG_CONFIG[sdg.goal];
  const statusCfg = SDG_STATUS_CONFIG[sdg.status];
  const trendCfg = TREND_CONFIG[sdg.trend];
  const progress = calcProgress(sdg.currentValue, sdg.targetValue);

  return (
    <Sheet open={!!sdg} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        style={{
          background: "oklch(0.11 0.025 160)",
          borderLeft: `1px solid ${cfg.color}30`,
        }}
        data-ocid="sustainability.sdg.sheet"
      >
        <SheetDetailHeader
          badges={[
            {
              label: `SDG ${sdg.goal}`,
              color: cfg.color,
              bg: `${cfg.color}18`,
              border: `${cfg.color}40`,
            },
            {
              label: statusCfg.label,
              color: statusCfg.color,
              bg: `${statusCfg.color}18`,
              border: `${statusCfg.color}40`,
            },
          ]}
          title={`${cfg.icon} ${sdg.name}`}
          subtitle={sdg.description?.slice(0, 90)}
          onClose={onClose}
          closeOcid="sustainability.sdg.close_button"
          accentColor={cfg.color}
        />
        <div className="space-y-6 text-sm">
          <p style={{ color: "oklch(0.62 0.04 180)" }}>{sdg.description}</p>
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: "oklch(0.16 0.03 160 / 0.6)",
              border: `1px solid ${cfg.color}20`,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">Progress</span>
              <span className="text-lg font-bold" style={{ color: cfg.color }}>
                {progress}%
              </span>
            </div>
            <div
              className="h-3 rounded-full"
              style={{ background: "oklch(0.2 0.02 180)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}aa)`,
                }}
              />
            </div>
            <div
              className="flex justify-between text-xs"
              style={{ color: "oklch(0.5 0.04 180)" }}
            >
              <span>Baseline {sdg.baselineYear}: —</span>
              <span>
                Current: {sdg.currentValue} {sdg.unit}
              </span>
              <span>
                Target {sdg.targetYear}: {sdg.targetValue}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: "oklch(0.6 0.04 180)" }}>Trend:</span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: `${trendCfg.color}18`,
                border: `1px solid ${trendCfg.color}40`,
                color: trendCfg.color,
              }}
            >
              {trendCfg.arrow} {trendCfg.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3"
              style={{
                background: "oklch(0.16 0.03 160 / 0.5)",
                border: "1px solid oklch(0.25 0.03 180)",
              }}
            >
              <div
                className="text-xs mb-1"
                style={{ color: "oklch(0.5 0.04 180)" }}
              >
                Council Owner
              </div>
              <div className="font-semibold text-white text-sm">
                {sdg.councilOwner}
              </div>
            </div>
            <div
              className="rounded-xl p-3"
              style={{
                background: "oklch(0.72 0.16 75 / 0.08)",
                border: "1px solid oklch(0.72 0.16 75 / 0.2)",
              }}
            >
              <div
                className="text-xs mb-1"
                style={{ color: "oklch(0.65 0.1 75)" }}
              >
                FinFracFran™ Adoptions
              </div>
              <div
                className="font-bold text-lg"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {sdg.ffAdoptionCount}
              </div>
            </div>
          </div>
          <div>
            <div
              className="text-xs font-semibold mb-2"
              style={{ color: "oklch(0.55 0.04 180)" }}
            >
              Linked Resolutions
            </div>
            <div className="flex flex-wrap gap-2">
              {sdg.linkedResolutions.map((id) => (
                <span
                  key={id}
                  className="text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{
                    background: "oklch(0.55 0.14 195 / 0.15)",
                    border: "1px solid oklch(0.55 0.14 195 / 0.35)",
                    color: "oklch(0.7 0.12 195)",
                  }}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div
              className="text-xs font-semibold mb-2"
              style={{ color: "oklch(0.55 0.04 180)" }}
            >
              Linked Solutions
            </div>
            <div className="flex flex-wrap gap-2">
              {sdg.linkedSolutions.map((id) => (
                <span
                  key={id}
                  className="text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{
                    background: "oklch(0.55 0.14 240 / 0.15)",
                    border: "1px solid oklch(0.55 0.14 240 / 0.35)",
                    color: "oklch(0.7 0.12 240)",
                  }}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
          <Button
            className="w-full mt-2 font-semibold"
            style={{ background: cfg.color, color: "#fff", border: "none" }}
            data-ocid="sustainability.sdg.explore_council.button"
          >
            Explore {sdg.councilOwner} Council →
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── SDG Tracker Section ─────────────────────────────────────────────────────────

const STATUS_TABS: {
  value: SDGStatus | "all";
  label: string;
  color: string;
}[] = [
  { value: "all", label: "All", color: "#26BDE2" },
  { value: "on_track", label: "On Track", color: "#4C9F38" },
  { value: "at_risk", label: "At Risk", color: "#FCC30B" },
  { value: "off_track", label: "Off Track", color: "#E5243B" },
];

const TREND_PILLS: {
  value: TrendDirection | "all";
  label: string;
  arrow: string;
}[] = [
  { value: "all", label: "All Trends", arrow: "" },
  { value: "improving", label: "Improving", arrow: "↑" },
  { value: "stable", label: "Stable", arrow: "→" },
  { value: "declining", label: "Declining", arrow: "↓" },
  { value: "critical", label: "Critical", arrow: "↘" },
];

function SDGTrackerSection() {
  const [statusFilter, setStatusFilter] = useState<SDGStatus | "all">("all");
  const [trendFilter, setTrendFilter] = useState<TrendDirection | "all">("all");
  const { filteredSDGs, selectedSDG, openSDG, closeSDG, stats } =
    useSDGIndicators(statusFilter, trendFilter);

  const statusCounts: Record<SDGStatus | "all", number> = {
    all: 17,
    on_track: stats.on_track,
    at_risk: stats.at_risk,
    off_track: stats.off_track,
  };

  return (
    <section
      id="sdgs"
      className="py-16 sm:py-20"
      data-ocid="sustainability.sdgs.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#4C9F3820", border: "1px solid #4C9F3840" }}
            >
              <Target className="h-4 w-4" style={{ color: "#4C9F38" }} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              SDG Progress Tracker
            </h2>
          </div>
          <p
            className="text-sm ml-11"
            style={{ color: "oklch(0.55 0.04 180)" }}
          >
            Live monitoring of all 17 UN Sustainable Development Goals — updated
            quarterly.
          </p>
        </motion.div>

        <div
          className="flex flex-wrap gap-2 mb-4"
          data-ocid="sustainability.sdg.filter.tab"
        >
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                data-ocid="sustainability.sdg.status.tab"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: active
                    ? `${tab.color}22`
                    : "oklch(0.14 0.025 160)",
                  border: `1px solid ${active ? `${tab.color}60` : "oklch(0.22 0.025 180)"}`,
                  color: active ? tab.color : "oklch(0.52 0.04 180)",
                }}
              >
                {tab.label}
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    background: active
                      ? `${tab.color}30`
                      : "oklch(0.18 0.02 180)",
                    color: active ? tab.color : "oklch(0.42 0.04 180)",
                  }}
                >
                  {statusCounts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {TREND_PILLS.map((pill) => {
            const active = trendFilter === pill.value;
            const trendColor =
              pill.value === "all"
                ? "#26BDE2"
                : TREND_CONFIG[pill.value as TrendDirection].color;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => setTrendFilter(pill.value)}
                data-ocid="sustainability.sdg.trend.tab"
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: active
                    ? `${trendColor}18`
                    : "oklch(0.12 0.02 160)",
                  border: `1px solid ${active ? `${trendColor}50` : "oklch(0.2 0.02 180)"}`,
                  color: active ? trendColor : "oklch(0.48 0.04 180)",
                }}
              >
                {pill.arrow && <span>{pill.arrow}</span>} {pill.label}
              </button>
            );
          })}
          {(statusFilter !== "all" || trendFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setTrendFilter("all");
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "oklch(0.18 0.02 180)",
                border: "1px solid oklch(0.25 0.03 180)",
                color: "oklch(0.52 0.04 180)",
              }}
              data-ocid="sustainability.sdg.reset.button"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {filteredSDGs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
              style={{
                background: "oklch(0.13 0.02 160 / 0.7)",
                border: "1px solid oklch(0.22 0.03 180)",
              }}
              data-ocid="sustainability.sdgs.empty_state"
            >
              <Target
                className="h-10 w-10"
                style={{ color: "oklch(0.35 0.04 180)" }}
              />
              <p className="font-semibold text-white">
                No SDGs match these filters
              </p>
              <p className="text-sm" style={{ color: "oklch(0.5 0.04 180)" }}>
                Try adjusting the status or trend filters above.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStatusFilter("all");
                  setTrendFilter("all");
                }}
                style={{
                  borderColor: "oklch(0.3 0.04 180)",
                  color: "oklch(0.6 0.04 180)",
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredSDGs.map((sdg, i) => (
                <SDGCard key={sdg.id} sdg={sdg} index={i} onOpen={openSDG} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <SDGDetailSheet sdg={selectedSDG} onClose={closeSDG} />
      </div>
    </section>
  );
}

// ─── Impact Metrics Section (Part D) ────────────────────────────────────────────

const CATEGORY_TABS: {
  value: ImpactCategory | "all";
  label: string;
  color: string;
}[] = [
  { value: "all", label: "All", color: "#26BDE2" },
  { value: "climate", label: "Climate", color: "#3F7E44" },
  { value: "health", label: "Health", color: "#4C9F38" },
  { value: "food_water", label: "Food & Water", color: "#26BDE2" },
  { value: "education", label: "Education", color: "#C5192D" },
  { value: "peace", label: "Peace", color: "#00689D" },
  { value: "economy", label: "Economy", color: "#A21942" },
  { value: "technology", label: "Technology", color: "#FD6925" },
];

const REGION_PILLS: { value: WorldRegion | "all"; label: string }[] = [
  { value: "all", label: "All Regions" },
  { value: "global", label: "Global" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "mena", label: "MENA" },
  { value: "oceania", label: "Oceania" },
];

function MetricCard({
  metric,
  index,
  onOpen,
}: { metric: ImpactMetric; index: number; onOpen: (m: ImpactMetric) => void }) {
  const catCfg = IMPACT_CATEGORY_CONFIG[metric.category];
  const trendCfg = TREND_CONFIG[metric.trend];
  const progress = calcProgress(metric.currentValue, metric.targetValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300"
      style={{
        background: "oklch(0.13 0.025 160 / 0.8)",
        border: `1px solid ${catCfg.color}28`,
      }}
      whileHover={{ scale: 1.01, borderColor: `${catCfg.color}55` }}
      onClick={() => onOpen(metric)}
      data-ocid={`sustainability.metric.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: `${catCfg.color}18`,
            border: `1px solid ${catCfg.color}40`,
            color: catCfg.color,
          }}
        >
          {catCfg.label}
        </span>
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: `${trendCfg.color}14`, color: trendCfg.color }}
        >
          {trendCfg.arrow} {trendCfg.label}
        </span>
      </div>
      <p className="text-sm font-semibold text-white leading-snug">
        {metric.name}
      </p>
      <div className="space-y-1.5">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-bold" style={{ color: catCfg.color }}>
              {formatNumber(metric.currentValue)}
            </span>
            <span
              className="text-[10px] ml-1"
              style={{ color: "oklch(0.5 0.04 180)" }}
            >
              {metric.unit}
            </span>
          </div>
          <span
            className="text-[10px] font-bold"
            style={{ color: catCfg.color }}
          >
            {progress}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full"
          style={{ background: "oklch(0.2 0.02 180)" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: catCfg.color }}
          />
        </div>
        <div
          className="flex justify-between text-[10px]"
          style={{ color: "oklch(0.45 0.04 180)" }}
        >
          <span>Baseline: {formatNumber(metric.baselineValue)}</span>
          <span>Target: {formatNumber(metric.targetValue)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px]" style={{ color: "oklch(0.45 0.04 180)" }}>
          {metric.dataSource.split(" ").slice(0, 3).join(" ")}…
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-[10px] font-semibold"
          style={{ color: catCfg.color }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(metric);
          }}
          data-ocid={`sustainability.metric.open_modal_button.${index + 1}`}
        >
          Details →
        </Button>
      </div>
    </motion.div>
  );
}

function MetricDetailSheet({
  metric,
  onClose,
}: { metric: ImpactMetric | null; onClose: () => void }) {
  if (!metric) return null;
  const catCfg = IMPACT_CATEGORY_CONFIG[metric.category];
  const trendCfg = TREND_CONFIG[metric.trend];
  const progress = calcProgress(metric.currentValue, metric.targetValue);

  return (
    <Sheet open={!!metric} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        style={{
          background: "oklch(0.11 0.025 160)",
          borderLeft: `1px solid ${catCfg.color}30`,
        }}
        data-ocid="sustainability.metric.sheet"
      >
        <SheetDetailHeader
          badges={[
            {
              label: catCfg.label,
              color: catCfg.color,
              bg: `${catCfg.color}18`,
              border: `${catCfg.color}40`,
            },
            {
              label: metric.unit,
              color: "oklch(0.65 0.04 260)",
              bg: "oklch(0.18 0.02 260)",
              border: "oklch(0.28 0.03 260)",
            },
          ]}
          title={metric.name}
          subtitle={`Baseline: ${metric.baselineValue} ${metric.unit} · Target: ${metric.targetValue} ${metric.unit}`}
          onClose={onClose}
          closeOcid="sustainability.metric.close_button"
          accentColor={catCfg.color}
        />
        <div className="space-y-5 text-sm">
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: "oklch(0.16 0.03 160 / 0.6)",
              border: `1px solid ${catCfg.color}20`,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">
                Progress to Target
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: catCfg.color }}
              >
                {progress}%
              </span>
            </div>
            <div
              className="h-3 rounded-full"
              style={{ background: "oklch(0.2 0.02 180)" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, background: catCfg.color }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {[
                {
                  label: "Baseline",
                  value: `${formatNumber(metric.baselineValue)} ${metric.unit}`,
                },
                {
                  label: "Current",
                  value: `${formatNumber(metric.currentValue)} ${metric.unit}`,
                },
                {
                  label: "Target",
                  value: `${formatNumber(metric.targetValue)} ${metric.unit}`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg p-2"
                  style={{ background: "oklch(0.18 0.03 160)" }}
                >
                  <div style={{ color: "oklch(0.5 0.04 180)" }}>
                    {item.label}
                  </div>
                  <div className="font-semibold text-white mt-0.5">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: "oklch(0.6 0.04 180)" }}>Trend:</span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: `${trendCfg.color}18`,
                border: `1px solid ${trendCfg.color}40`,
                color: trendCfg.color,
              }}
            >
              {trendCfg.arrow} {trendCfg.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3"
              style={{
                background: "oklch(0.15 0.03 160 / 0.5)",
                border: "1px solid oklch(0.24 0.03 180)",
              }}
            >
              <div
                className="text-xs mb-1"
                style={{ color: "oklch(0.5 0.04 180)" }}
              >
                Region
              </div>
              <div className="font-semibold text-white text-sm">
                {WORLD_REGION_CONFIG[metric.region]?.label ?? metric.region}
              </div>
            </div>
            <div
              className="rounded-xl p-3"
              style={{
                background: "oklch(0.15 0.03 160 / 0.5)",
                border: "1px solid oklch(0.24 0.03 180)",
              }}
            >
              <div
                className="text-xs mb-1"
                style={{ color: "oklch(0.5 0.04 180)" }}
              >
                Council Lead
              </div>
              <div className="font-semibold text-white text-sm">
                {metric.councilLead}
              </div>
            </div>
          </div>
          <div>
            <div
              className="text-xs font-semibold mb-2"
              style={{ color: "oklch(0.55 0.04 180)" }}
            >
              Data Source
            </div>
            <p style={{ color: "oklch(0.62 0.04 180)" }}>{metric.dataSource}</p>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.45 0.04 180)" }}
            >
              Last updated: {metric.lastUpdated}
            </p>
          </div>
          <div>
            <div
              className="text-xs font-semibold mb-2"
              style={{ color: "oklch(0.55 0.04 180)" }}
            >
              Linked Initiatives
            </div>
            <div className="flex flex-wrap gap-2">
              {metric.linkedInitiatives.map((id) => (
                <span
                  key={id}
                  className="text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{
                    background: `${catCfg.color}15`,
                    border: `1px solid ${catCfg.color}35`,
                    color: catCfg.color,
                  }}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ImpactMetricsSection() {
  const [catFilter, setCatFilter] = useState<ImpactCategory | "all">("all");
  const [regionFilter, setRegionFilter] = useState<WorldRegion | "all">("all");
  const { filteredMetrics, selectedMetric, openMetric, closeMetric } =
    useImpactMetrics(catFilter, regionFilter);

  return (
    <section
      id="metrics"
      className="py-16 sm:py-20"
      data-ocid="sustainability.metrics.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#26BDE220", border: "1px solid #26BDE240" }}
            >
              <BarChart3 className="h-4 w-4" style={{ color: "#26BDE2" }} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Global Impact Metrics
            </h2>
          </div>
          <p
            className="text-sm ml-11"
            style={{ color: "oklch(0.55 0.04 180)" }}
          >
            {filteredMetrics.length} metrics tracked across 7 categories —
            updated monthly from authoritative sources.
          </p>
        </motion.div>

        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2 mb-4"
          data-ocid="sustainability.metrics.filter.tab"
        >
          {CATEGORY_TABS.map((tab) => {
            const active = catFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCatFilter(tab.value)}
                data-ocid="sustainability.metrics.category.tab"
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: active
                    ? `${tab.color}22`
                    : "oklch(0.14 0.025 160)",
                  border: `1px solid ${active ? `${tab.color}55` : "oklch(0.22 0.025 180)"}`,
                  color: active ? tab.color : "oklch(0.52 0.04 180)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {REGION_PILLS.map((pill) => {
            const active = regionFilter === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => setRegionFilter(pill.value)}
                data-ocid="sustainability.metrics.region.tab"
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: active
                    ? "oklch(0.55 0.14 195 / 0.2)"
                    : "oklch(0.12 0.02 160)",
                  border: `1px solid ${active ? "oklch(0.55 0.14 195 / 0.5)" : "oklch(0.2 0.02 180)"}`,
                  color: active
                    ? "oklch(0.72 0.12 195)"
                    : "oklch(0.48 0.04 180)",
                }}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {filteredMetrics.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
              style={{
                background: "oklch(0.13 0.02 160 / 0.7)",
                border: "1px solid oklch(0.22 0.03 180)",
              }}
              data-ocid="sustainability.metrics.empty_state"
            >
              <BarChart3
                className="h-10 w-10"
                style={{ color: "oklch(0.35 0.04 180)" }}
              />
              <p className="font-semibold text-white">
                No metrics match these filters
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCatFilter("all");
                  setRegionFilter("all");
                }}
                style={{
                  borderColor: "oklch(0.3 0.04 180)",
                  color: "oklch(0.6 0.04 180)",
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredMetrics.map((metric, i) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  index={i}
                  onOpen={openMetric}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <MetricDetailSheet metric={selectedMetric} onClose={closeMetric} />
      </div>
    </section>
  );
}

// ─── Environmental Reports Section (Part E) ──────────────────────────────────────

const REPORT_CATEGORY_TABS: {
  value: ReportCategory | "all";
  label: string;
  color: string;
  icon: string;
}[] = [
  { value: "all", label: "All Reports", color: "#56C02B", icon: "🌍" },
  { value: "climate", label: "Climate", color: "#3F7E44", icon: "🌡️" },
  {
    value: "biodiversity",
    label: "Biodiversity",
    color: "#56C02B",
    icon: "🌿",
  },
  { value: "water", label: "Water", color: "#26BDE2", icon: "💧" },
  { value: "energy", label: "Energy", color: "#FCC30B", icon: "⚡" },
  {
    value: "food_security",
    label: "Food Security",
    color: "#DDA63A",
    icon: "🌾",
  },
  { value: "urban", label: "Urban", color: "#FD9D24", icon: "🏙️" },
];

function ReportCard({
  report,
  index,
  onOpen,
}: {
  report: EnvironmentalReport;
  index: number;
  onOpen: (r: EnvironmentalReport) => void;
}) {
  const catTab =
    REPORT_CATEGORY_TABS.find((t) => t.value === report.category) ??
    REPORT_CATEGORY_TABS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group transition-all duration-300"
      style={{
        background: "oklch(0.13 0.025 160 / 0.85)",
        border: `1px solid ${catTab.color}28`,
      }}
      whileHover={{ scale: 1.01, borderColor: `${catTab.color}55` }}
      onClick={() => onOpen(report)}
      data-ocid={`sustainability.report.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{catTab.icon}</span>
          <div>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1"
              style={{
                background: `${catTab.color}18`,
                color: catTab.color,
                border: `1px solid ${catTab.color}38`,
              }}
            >
              {catTab.label}
            </span>
            <p className="text-xs" style={{ color: "oklch(0.48 0.04 180)" }}>
              {report.source} · {report.period}
            </p>
          </div>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.18 0.02 180)",
            color: "oklch(0.5 0.04 180)",
          }}
        >
          {report.publishedDate}
        </span>
      </div>
      <h3 className="text-sm font-bold text-white leading-snug">
        {report.title}
      </h3>
      <p
        className="text-xs leading-relaxed line-clamp-3"
        style={{ color: "oklch(0.6 0.04 180)" }}
      >
        {report.headlineFinding}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {report.keyDataPoints.slice(0, 4).map((dp) => (
          <div
            key={dp.label}
            className="rounded-lg p-2.5"
            style={{
              background: "oklch(0.17 0.03 160 / 0.6)",
              border: `1px solid ${catTab.color}18`,
            }}
          >
            <div
              className="text-[10px] mb-0.5"
              style={{ color: "oklch(0.5 0.04 180)" }}
            >
              {dp.label}
            </div>
            <div className="font-bold text-xs" style={{ color: catTab.color }}>
              {typeof dp.value === "number" && dp.value >= 1000
                ? dp.value.toLocaleString()
                : dp.value}{" "}
              {dp.unit}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs"
          style={{ borderColor: `${catTab.color}40`, color: catTab.color }}
          onClick={(e) => {
            e.stopPropagation();
            toast.success(
              `"${report.title}" download queued — available shortly.`,
            );
          }}
          data-ocid={`sustainability.report.download.button.${index + 1}`}
        >
          <Download className="h-3 w-3" /> Download
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-xs font-semibold"
          style={{ color: catTab.color }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(report);
          }}
          data-ocid={`sustainability.report.open_modal_button.${index + 1}`}
        >
          Full Report →
        </Button>
      </div>
    </motion.div>
  );
}

function ReportDetailDialog({
  report,
  onClose,
}: { report: EnvironmentalReport | null; onClose: () => void }) {
  if (!report) return null;
  const catTab =
    REPORT_CATEGORY_TABS.find((t) => t.value === report.category) ??
    REPORT_CATEGORY_TABS[0];

  return (
    <Dialog open={!!report} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[80vh] overflow-y-auto"
        style={{
          background: "oklch(0.11 0.025 160)",
          border: `1px solid ${catTab.color}30`,
        }}
        data-ocid="sustainability.report.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{catTab.icon}</span>
            <div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1"
                style={{
                  background: `${catTab.color}18`,
                  color: catTab.color,
                  border: `1px solid ${catTab.color}38`,
                }}
              >
                {catTab.label}
              </span>
              <DialogTitle className="text-white font-display text-base leading-snug">
                {report.title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-5 text-sm">
          <div
            className="flex gap-3 text-xs"
            style={{ color: "oklch(0.5 0.04 180)" }}
          >
            <span>
              Source: <span className="text-white">{report.source}</span>
            </span>
            <span>·</span>
            <span>
              Period: <span className="text-white">{report.period}</span>
            </span>
            <span>·</span>
            <span>
              Published:{" "}
              <span className="text-white">{report.publishedDate}</span>
            </span>
          </div>
          <div
            className="rounded-xl p-4"
            style={{
              background: `${catTab.color}10`,
              border: `1px solid ${catTab.color}25`,
            }}
          >
            <div
              className="text-xs font-semibold mb-2"
              style={{ color: catTab.color }}
            >
              Headline Finding
            </div>
            <p
              className="leading-relaxed"
              style={{ color: "oklch(0.72 0.04 180)" }}
            >
              {report.headlineFinding}
            </p>
          </div>
          <div>
            <div
              className="text-xs font-semibold mb-3"
              style={{ color: "oklch(0.55 0.04 180)" }}
            >
              Key Data Points ({report.keyDataPoints.length})
            </div>
            <div className="grid grid-cols-2 gap-2">
              {report.keyDataPoints.map((dp) => (
                <div
                  key={dp.label}
                  className="rounded-xl p-3"
                  style={{
                    background: "oklch(0.17 0.03 160 / 0.7)",
                    border: `1px solid ${catTab.color}20`,
                  }}
                >
                  <div
                    className="text-[10px] mb-1"
                    style={{ color: "oklch(0.5 0.04 180)" }}
                  >
                    {dp.label} ({dp.year})
                  </div>
                  <div className="font-bold" style={{ color: catTab.color }}>
                    {typeof dp.value === "number" && dp.value >= 1000
                      ? dp.value.toLocaleString()
                      : dp.value}
                  </div>
                  <div
                    className="text-[10px] mt-0.5"
                    style={{ color: "oklch(0.45 0.04 180)" }}
                  >
                    {dp.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="w-full gap-2"
            style={{ background: catTab.color, color: "#fff", border: "none" }}
            onClick={() => {
              toast.success(
                `"${report.title}" download queued — available shortly.`,
              );
              onClose();
            }}
            data-ocid="sustainability.report.dialog.download.button"
          >
            <Download className="h-4 w-4" /> Download Full Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EnvironmentalReportsSection() {
  const [catFilter, setCatFilter] = useState<ReportCategory | "all">("all");
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    category: "",
    region: "",
    dataPoint: "",
    source: "",
  });
  const { filteredReports, selectedReport, openReport, closeReport } =
    useEnvironmentalReports(catFilter);

  return (
    <section
      id="environment"
      className="py-16 sm:py-20"
      data-ocid="sustainability.environment.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "#56C02B20",
                  border: "1px solid #56C02B40",
                }}
              >
                <Leaf className="h-4 w-4" style={{ color: "#56C02B" }} />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Environmental Reports
              </h2>
            </div>
            <p
              className="text-sm ml-11"
              style={{ color: "oklch(0.55 0.04 180)" }}
            >
              Curated intelligence from IPCC, IPBES, UN-Water, IEA, FAO, and
              UN-Habitat.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 shrink-0"
            style={{
              borderColor: "oklch(0.5 0.14 155 / 0.4)",
              color: "oklch(0.72 0.14 155)",
            }}
            onClick={() => setShowSubmit(true)}
            data-ocid="sustainability.environment.submit.button"
          >
            + Submit Data
          </Button>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {REPORT_CATEGORY_TABS.map((tab) => {
            const active = catFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCatFilter(tab.value)}
                data-ocid="sustainability.environment.category.tab"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: active
                    ? `${tab.color}22`
                    : "oklch(0.14 0.025 160)",
                  border: `1px solid ${active ? `${tab.color}55` : "oklch(0.22 0.025 180)"}`,
                  color: active ? tab.color : "oklch(0.52 0.04 180)",
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((report, i) => (
            <ReportCard
              key={report.id}
              report={report}
              index={i}
              onOpen={openReport}
            />
          ))}
        </div>

        <ReportDetailDialog report={selectedReport} onClose={closeReport} />

        {/* Submit Environmental Data Dialog */}
        <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
          <DialogContent
            className="max-w-md"
            style={{
              background: "oklch(0.11 0.025 160)",
              border: "1px solid oklch(0.5 0.14 155 / 0.3)",
            }}
            data-ocid="sustainability.environment.submit.dialog"
          >
            <DialogHeader>
              <DialogTitle className="text-white">
                Submit Environmental Data
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <label
                  htmlFor="submit-category"
                  className="text-xs font-semibold mb-1.5 block"
                  style={{ color: "oklch(0.6 0.04 180)" }}
                >
                  Category
                </label>
                <select
                  className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none"
                  style={{
                    background: "oklch(0.16 0.03 160)",
                    border: "1px solid oklch(0.25 0.03 180)",
                  }}
                  value={submitForm.category}
                  onChange={(e) =>
                    setSubmitForm((f) => ({ ...f, category: e.target.value }))
                  }
                  id="submit-category"
                  data-ocid="sustainability.environment.submit.select"
                >
                  <option value="">Select category…</option>
                  {REPORT_CATEGORY_TABS.filter((t) => t.value !== "all").map(
                    (t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="submit-region"
                  className="text-xs font-semibold mb-1.5 block"
                  style={{ color: "oklch(0.6 0.04 180)" }}
                >
                  Region
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sub-Saharan Africa"
                  className="w-full rounded-lg px-3 py-2 text-sm text-white placeholder-[oklch(0.4_0.04_180)] outline-none"
                  style={{
                    background: "oklch(0.16 0.03 160)",
                    border: "1px solid oklch(0.25 0.03 180)",
                  }}
                  value={submitForm.region}
                  onChange={(e) =>
                    setSubmitForm((f) => ({ ...f, region: e.target.value }))
                  }
                  id="submit-region"
                  data-ocid="sustainability.environment.submit.region.input"
                />
              </div>
              <div>
                <label
                  htmlFor="submit-datapoint"
                  className="text-xs font-semibold mb-1.5 block"
                  style={{ color: "oklch(0.6 0.04 180)" }}
                >
                  Data Point Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the environmental data point…"
                  className="w-full rounded-lg px-3 py-2 text-sm text-white placeholder-[oklch(0.4_0.04_180)] outline-none resize-none"
                  style={{
                    background: "oklch(0.16 0.03 160)",
                    border: "1px solid oklch(0.25 0.03 180)",
                  }}
                  value={submitForm.dataPoint}
                  onChange={(e) =>
                    setSubmitForm((f) => ({ ...f, dataPoint: e.target.value }))
                  }
                  id="submit-datapoint"
                  data-ocid="sustainability.environment.submit.textarea"
                />
              </div>
              <div>
                <label
                  htmlFor="submit-source"
                  className="text-xs font-semibold mb-1.5 block"
                  style={{ color: "oklch(0.6 0.04 180)" }}
                >
                  Source
                </label>
                <input
                  type="text"
                  placeholder="e.g. National meteorological service"
                  className="w-full rounded-lg px-3 py-2 text-sm text-white placeholder-[oklch(0.4_0.04_180)] outline-none"
                  style={{
                    background: "oklch(0.16 0.03 160)",
                    border: "1px solid oklch(0.25 0.03 180)",
                  }}
                  value={submitForm.source}
                  onChange={(e) =>
                    setSubmitForm((f) => ({ ...f, source: e.target.value }))
                  }
                  id="submit-source"
                  data-ocid="sustainability.environment.submit.source.input"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  variant="outline"
                  className="flex-1"
                  style={{
                    borderColor: "oklch(0.28 0.03 180)",
                    color: "oklch(0.55 0.04 180)",
                  }}
                  onClick={() => setShowSubmit(false)}
                  data-ocid="sustainability.environment.submit.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 font-semibold"
                  style={{
                    background: "oklch(0.5 0.18 155)",
                    color: "#fff",
                    border: "none",
                  }}
                  disabled={!submitForm.category || !submitForm.dataPoint}
                  onClick={() => {
                    toast.success(
                      "Environmental data submitted — thank you for contributing!",
                    );
                    setShowSubmit(false);
                    setSubmitForm({
                      category: "",
                      region: "",
                      dataPoint: "",
                      source: "",
                    });
                  }}
                  data-ocid="sustainability.environment.submit.submit_button"
                >
                  Submit Data
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// ─── Nation Progress Section (Part F) ────────────────────────────────────────────

const NATIONS_REGION_TABS: { value: WorldRegion | "all"; label: string }[] = [
  { value: "all", label: "All Regions" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
  { value: "mena", label: "MENA" },
];

function scoreColor(score: number): string {
  if (score >= 85) return "#4C9F38";
  if (score >= 70) return "#FCC30B";
  return "#E5243B";
}

function NationCard({
  nation,
  index,
  onOpen,
}: {
  nation: NationProgressRecord;
  index: number;
  onOpen: (n: NationProgressRecord) => void;
}) {
  const color = scoreColor(nation.complianceScore);
  const topSDGName = SDG_CONFIG[nation.topPerformingSDG]?.name ?? "";
  const riskSDGName = SDG_CONFIG[nation.mostAtRiskSDG]?.name ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.07 }}
      className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300"
      style={{
        background: "oklch(0.13 0.025 160 / 0.85)",
        border: `1px solid ${color}28`,
      }}
      whileHover={{ scale: 1.01, borderColor: `${color}50` }}
      onClick={() => onOpen(nation)}
      data-ocid={`sustainability.nation.card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-white text-base">{nation.nation}</p>
          <p
            className="text-[10px] mt-0.5"
            style={{ color: "oklch(0.5 0.04 180)" }}
          >
            {WORLD_REGION_CONFIG[nation.region]?.label ?? nation.region}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-bold" style={{ color }}>
            {nation.complianceScore}
          </span>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.45 0.04 180)" }}
          >
            SDG Score
          </span>
        </div>
      </div>
      {/* Score bar */}
      <div
        className="h-1.5 rounded-full"
        style={{ background: "oklch(0.2 0.02 180)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${nation.complianceScore}%`, background: color }}
        />
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "SDGs Tracked", value: nation.sdgsTracked },
          { label: "FF™ Adoptions", value: nation.ffAdoptionCount },
          { label: "Solutions", value: nation.solutionsAdopted },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-2 text-center"
            style={{ background: "oklch(0.17 0.025 160)" }}
          >
            <div className="font-bold text-sm text-white">{stat.value}</div>
            <div
              className="text-[9px] mt-0.5"
              style={{ color: "oklch(0.48 0.04 180)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      {/* Top / at-risk */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <TrendingUp
            className="h-3 w-3 shrink-0"
            style={{ color: "#4C9F38" }}
          />
          <span className="text-[10px] text-white truncate">
            Top: SDG {nation.topPerformingSDG} — {topSDGName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown
            className="h-3 w-3 shrink-0"
            style={{ color: "#E5243B" }}
          />
          <span
            className="text-[10px] truncate"
            style={{ color: "oklch(0.6 0.04 180)" }}
          >
            At-Risk: SDG {nation.mostAtRiskSDG} — {riskSDGName}
          </span>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-[10px] font-semibold self-start h-6 px-2"
        style={{ color }}
        onClick={(e) => {
          e.stopPropagation();
          onOpen(nation);
        }}
        data-ocid={`sustainability.nation.open_modal_button.${index + 1}`}
      >
        View Report →
      </Button>
    </motion.div>
  );
}

function NationDetailSheet({
  nation,
  onClose,
}: { nation: NationProgressRecord | null; onClose: () => void }) {
  const [showNominate, setShowNominate] = useState(false);
  const [nominateMsg, setNominateMsg] = useState("");

  if (!nation) return null;
  const color = scoreColor(nation.complianceScore);

  return (
    <>
      <Sheet open={!!nation} onOpenChange={(open) => !open && onClose()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
          style={{
            background: "oklch(0.11 0.025 160)",
            borderLeft: `1px solid ${color}30`,
          }}
          data-ocid="sustainability.nation.sheet"
        >
          <SheetDetailHeader
            badges={[
              {
                label:
                  WORLD_REGION_CONFIG[nation.region]?.label ?? nation.region,
                color: "oklch(0.65 0.14 195)",
                bg: "oklch(0.65 0.14 195 / 0.12)",
                border: "oklch(0.65 0.14 195 / 0.30)",
              },
              {
                label: `Score: ${nation.complianceScore}%`,
                color: color,
                bg: `${color}18`,
                border: `${color}40`,
              },
            ]}
            title={nation.nation}
            subtitle={`Last reported: ${nation.lastReportDate} · ${nation.sdgsTracked} SDGs tracked`}
            onClose={onClose}
            closeOcid="sustainability.nation.close_button"
            accentColor={color}
          />
          <div className="space-y-5 text-sm">
            {/* Score */}
            <div
              className="rounded-xl p-4"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}25`,
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-white">
                  Overall SDG Compliance Score
                </span>
                <span className="text-3xl font-bold" style={{ color }}>
                  {nation.complianceScore}
                </span>
              </div>
              <div
                className="h-3 rounded-full"
                style={{ background: "oklch(0.2 0.02 180)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${nation.complianceScore}%`,
                    background: color,
                  }}
                />
              </div>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "SDGs Tracked", value: nation.sdgsTracked },
                {
                  label: "FinFracFran™ Adoptions",
                  value: nation.ffAdoptionCount,
                },
                { label: "Solutions Adopted", value: nation.solutionsAdopted },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "oklch(0.16 0.03 160 / 0.6)",
                    border: "1px solid oklch(0.25 0.03 180)",
                  }}
                >
                  <div className="font-bold text-lg text-white">{s.value}</div>
                  <div
                    className="text-[10px] mt-0.5"
                    style={{ color: "oklch(0.5 0.04 180)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            {/* SDG breakdown */}
            <div>
              <div
                className="text-xs font-semibold mb-3"
                style={{ color: "oklch(0.55 0.04 180)" }}
              >
                SDG Breakdown ({nation.sdgRecords.length} goals tracked)
              </div>
              <div className="space-y-2">
                {nation.sdgRecords.map((rec) => {
                  const sdgCfg = SDG_CONFIG[rec.goal];
                  const statusCfg = SDG_STATUS_CONFIG[rec.status];
                  return (
                    <div key={rec.goal} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: sdgCfg.color, color: "#fff" }}
                      >
                        {rec.goal}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs text-white truncate">
                            {sdgCfg.name}
                          </span>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-2 shrink-0"
                            style={{
                              background: `${statusCfg.color}20`,
                              color: statusCfg.color,
                            }}
                          >
                            {statusCfg.label}
                          </span>
                        </div>
                        <div
                          className="h-1 rounded-full"
                          style={{ background: "oklch(0.2 0.02 180)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${rec.score}%`,
                              background: sdgCfg.color,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-bold shrink-0"
                        style={{ color: sdgCfg.color }}
                      >
                        {rec.score}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              className="w-full gap-2 font-semibold"
              style={{
                background: "oklch(0.72 0.16 75 / 0.15)",
                color: "oklch(0.72 0.16 75)",
                border: "1px solid oklch(0.72 0.16 75 / 0.3)",
              }}
              onClick={() => setShowNominate(true)}
              data-ocid="sustainability.nation.nominate.button"
            >
              🏆 Nominate for Recognition
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Nominate dialog */}
      <Dialog open={showNominate} onOpenChange={setShowNominate}>
        <DialogContent
          className="max-w-md"
          style={{
            background: "oklch(0.11 0.025 160)",
            border: "1px solid oklch(0.72 0.16 75 / 0.3)",
          }}
          data-ocid="sustainability.nation.nominate.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white">
              Nominate {nation.nation} for Recognition
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2 text-sm">
            <p style={{ color: "oklch(0.6 0.04 180)" }}>
              Recognise {nation.nation}'s outstanding SDG compliance score of{" "}
              {nation.complianceScore}% and {nation.solutionsAdopted} solutions
              adopted.
            </p>
            <div>
              <label
                htmlFor="nominate-msg"
                className="text-xs font-semibold mb-1.5 block"
                style={{ color: "oklch(0.6 0.04 180)" }}
              >
                Why does this nation deserve recognition?
              </label>
              <textarea
                rows={4}
                placeholder="Describe their contributions to the SDGs…"
                className="w-full rounded-lg px-3 py-2 text-sm text-white placeholder-[oklch(0.4_0.04_180)] outline-none resize-none"
                style={{
                  background: "oklch(0.16 0.03 160)",
                  border: "1px solid oklch(0.25 0.03 180)",
                }}
                value={nominateMsg}
                onChange={(e) => setNominateMsg(e.target.value)}
                id="nominate-msg"
                data-ocid="sustainability.nation.nominate.textarea"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                style={{
                  borderColor: "oklch(0.28 0.03 180)",
                  color: "oklch(0.55 0.04 180)",
                }}
                onClick={() => setShowNominate(false)}
                data-ocid="sustainability.nation.nominate.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 font-semibold"
                style={{
                  background: "oklch(0.72 0.16 75)",
                  color: "#fff",
                  border: "none",
                }}
                disabled={nominateMsg.length < 20}
                onClick={() => {
                  toast.success(`${nation.nation} nominated for recognition!`);
                  setShowNominate(false);
                  setNominateMsg("");
                }}
                data-ocid="sustainability.nation.nominate.confirm_button"
              >
                Submit Nomination
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function NationProgressSection() {
  const [regionFilter, setRegionFilter] = useState<WorldRegion | "all">("all");
  const [search, setSearch] = useState("");
  const { sortedByScore, selectedNation, openNation, closeNation } =
    useNationProgress(regionFilter, search);

  return (
    <section
      id="nations"
      className="py-16 sm:py-20"
      data-ocid="sustainability.nations.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#0A97D920", border: "1px solid #0A97D940" }}
            >
              <Globe2 className="h-4 w-4" style={{ color: "#0A97D9" }} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Nation Progress Leaderboard
            </h2>
          </div>
          <p
            className="text-sm ml-11"
            style={{ color: "oklch(0.55 0.04 180)" }}
          >
            SDG compliance scores, FinFracFran™ adoptions, and solutions adopted
            across {sortedByScore.length} nations.
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-4">
          <SearchInput
            data-ocid="sustainability.nations.search_input"
            value={search}
            onChange={setSearch}
            placeholder="Search nations..."
            className="w-full sm:w-72"
          />
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {NATIONS_REGION_TABS.map((tab) => {
            const active = regionFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setRegionFilter(tab.value)}
                data-ocid="sustainability.nations.region.tab"
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: active
                    ? "oklch(0.55 0.14 195 / 0.2)"
                    : "oklch(0.14 0.025 160)",
                  border: `1px solid ${active ? "oklch(0.55 0.14 195 / 0.5)" : "oklch(0.22 0.025 180)"}`,
                  color: active
                    ? "oklch(0.72 0.12 195)"
                    : "oklch(0.52 0.04 180)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {sortedByScore.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
              style={{
                background: "oklch(0.13 0.02 160 / 0.7)",
                border: "1px solid oklch(0.22 0.03 180)",
              }}
              data-ocid="sustainability.nations.empty_state"
            >
              <Globe2
                className="h-10 w-10"
                style={{ color: "oklch(0.35 0.04 180)" }}
              />
              <p className="font-semibold text-white">
                No nations match these filters
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setRegionFilter("all");
                  setSearch("");
                }}
                style={{
                  borderColor: "oklch(0.3 0.04 180)",
                  color: "oklch(0.6 0.04 180)",
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {sortedByScore.map((nation, i) => (
                <NationCard
                  key={nation.id}
                  nation={nation}
                  index={i}
                  onOpen={openNation}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <NationDetailSheet nation={selectedNation} onClose={closeNation} />
      </div>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────

export function SustainabilityPage() {
  const stats = useSustainabilityStats();

  const statCards = [
    {
      label: "SDGs Tracked",
      value: stats.totalSDGs,
      icon: Target,
      accentColor: "#4C9F38",
      delay: 0.1,
    },
    {
      label: "Nations Reporting",
      value: stats.nationsReporting,
      icon: Globe2,
      accentColor: "#26BDE2",
      delay: 0.18,
    },
    {
      label: "Impact Metrics",
      value: stats.impactMetrics,
      icon: BarChart3,
      accentColor: "#0A97D9",
      delay: 0.26,
    },
    {
      label: "Solutions Adopted",
      value: stats.solutionsAdopted,
      icon: TrendingUp,
      accentColor: "#FCC30B",
      delay: 0.34,
    },
    {
      label: "Avg SDG Progress",
      value: stats.avgGlobalSDGProgress,
      unit: "%",
      icon: Zap,
      accentColor: "#DDA63A",
      delay: 0.42,
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="sustainability.page"
    >
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-16 pb-0"
        data-ocid="sustainability.hero.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 0%, oklch(0.35 0.12 155 / 0.22) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 15% 60%, oklch(0.45 0.14 195 / 0.12) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.7 0.08 155) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.08 155) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.55 0.18 155 / 0.4)",
              background: "oklch(0.55 0.18 155 / 0.1)",
            }}
          >
            <Leaf
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.7 0.2 155)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.7 0.2 155)" }}
            >
              Phase 8 — Sustainability
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-hero-xl font-display mb-5"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.2 145) 0%, oklch(0.65 0.18 175) 50%, oklch(0.7 0.15 195) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Measure. Track. Act.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.68 0.05 175)" }}
          >
            Real-time SDG tracking, global impact metrics, environmental
            intelligence, and nation leaderboards.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              onClick={() =>
                document
                  .getElementById("sdgs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="gap-2 font-semibold hover:scale-105 transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.5 0.18 155), oklch(0.45 0.16 175))",
                color: "#fff",
                border: "none",
              }}
              data-ocid="sustainability.track_sdgs.button"
            >
              <Target className="h-4 w-4" /> Track SDGs
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("nations")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2 font-semibold px-6"
              style={{
                borderColor: "oklch(0.55 0.14 175 / 0.5)",
                color: "oklch(0.72 0.14 175)",
                background: "transparent",
              }}
              data-ocid="sustainability.view_nations.button"
            >
              <Globe2 className="h-4 w-4" /> View Nations
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("environment")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2 font-semibold px-6"
              style={{
                borderColor: "oklch(0.5 0.16 155 / 0.5)",
                color: "oklch(0.7 0.16 155)",
                background: "transparent",
              }}
              data-ocid="sustainability.view_reports.button"
            >
              <Leaf className="h-4 w-4" /> Reports
            </Button>
          </motion.div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(var(--cosmos-deep)))",
          }}
        />
      </section>

      {/* ── Stats Bar ── */}
      <section
        className="py-10 sm:py-12"
        data-ocid="sustainability.stats.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.5 0.14 155 / 0.4), transparent)",
              }}
            />
            <Badge
              className="text-xs tracking-widest uppercase font-semibold"
              style={{
                background: "oklch(0.5 0.16 155 / 0.15)",
                border: "1px solid oklch(0.5 0.16 155 / 0.35)",
                color: "oklch(0.7 0.16 155)",
              }}
            >
              Global Dashboard
            </Badge>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.5 0.14 155 / 0.4), transparent)",
              }}
            />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {statCards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>
        </div>
      </section>

      <div
        className="h-px mx-auto max-w-64"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.5 0.14 155 / 0.3), oklch(0.5 0.14 175 / 0.25), transparent)",
        }}
      />

      {/* ── SDG Tracker ── */}
      <SDGTrackerSection />

      <div
        className="h-px mx-auto max-w-64"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.5 0.14 155 / 0.2), transparent)",
        }}
      />

      {/* ── Impact Metrics ── */}
      <ImpactMetricsSection />

      <div
        className="h-px mx-auto max-w-64"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.5 0.14 155 / 0.2), transparent)",
        }}
      />

      {/* ── Environmental Reports ── */}
      <EnvironmentalReportsSection />

      <div
        className="h-px mx-auto max-w-64"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.5 0.14 155 / 0.2), transparent)",
        }}
      />

      {/* ── Nation Progress ── */}
      <NationProgressSection />
    </main>
  );
}
