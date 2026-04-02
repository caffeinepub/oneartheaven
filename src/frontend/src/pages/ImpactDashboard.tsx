// ---------------------------------------------------------------------------
// Impact Dashboard — /impact
// Phase 13 · Area 4 — Impact Measurement & SDG Alignment
// ---------------------------------------------------------------------------

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllSDGs } from "@/data/impactData";
import {
  IMPACT_DIMENSION_CONFIG,
  IMPACT_LEVEL_CONFIG,
  IMPACT_TREND_CONFIG,
  type ImpactDimension,
  type SDGoalNumber,
} from "@/data/impactTypes";
import { useAuth } from "@/hooks/useAuth";
import {
  useImpactMetrics,
  useImpactReportSubmission,
  usePlatformImpact,
} from "@/hooks/useImpact";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// SDG Chip helper
// ---------------------------------------------------------------------------

function SdgChip({
  number,
  size = "sm",
}: { number: SDGoalNumber; size?: "sm" | "md" }) {
  const sdg = getAllSDGs().find((g) => g.number === number);
  if (!sdg) return null;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${padding}`}
      style={{
        background: `${sdg.color.replace(")", " / 0.15)")}`,
        color: sdg.color,
        border: `1px solid ${sdg.color.replace(")", " / 0.35)")}`,
      }}
      title={sdg.title}
    >
      {sdg.emoji} SDG {number}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Section Header helper
// ---------------------------------------------------------------------------

function SectionHeader({
  accent,
  eyebrow,
  title,
}: { accent: string; eyebrow: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1 h-8 rounded-full" style={{ background: accent }} />
      <div>
        <div
          className="text-xs tracking-widest uppercase font-semibold"
          style={{ color: accent }}
        >
          {eyebrow}
        </div>
        <h2
          className="text-xl font-bold"
          style={{ color: "oklch(var(--starlight))" }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export function ImpactDashboardPage() {
  const { aggregate, top3Orgs, allSDGs, last5Reports } = usePlatformImpact();
  const { metrics: allMetrics, progressPct } = useImpactMetrics();
  const { isAuthenticated, role } = useAuth();
  const [activeDimension, setActiveDimension] = useState<
    ImpactDimension | "all"
  >("all");
  const [activeSDG, setActiveSDG] = useState<SDGoalNumber | null>(null);

  const { metrics: filteredMetrics } = useImpactMetrics({
    dimension: activeDimension,
    sdgNumber: activeSDG ?? undefined,
  });

  const { form, updateForm, submit, isSubmitting, isSuccess, reset } =
    useImpactReportSubmission();

  const canSubmit =
    isAuthenticated && (role === "OrgAdmin" || role === "SuperAdmin");

  const STATS = [
    {
      label: "Nations Reached",
      value: aggregate.nationsReached,
      suffix: "",
      icon: "🌍",
      color: "oklch(0.65 0.20 160)",
    },
    {
      label: "SDGs Touched",
      value: aggregate.sdgsTouched,
      suffix: " / 17",
      icon: "🎯",
      color: "oklch(0.72 0.16 75)",
    },
    {
      label: "Impact Metrics",
      value: aggregate.totalMetrics,
      suffix: "",
      icon: "📊",
      color: "oklch(0.68 0.18 252)",
    },
    {
      label: "Avg Impact Score",
      value: aggregate.avgImpactScore,
      suffix: " / 100",
      icon: "⭐",
      color: "oklch(0.82 0.14 75)",
    },
  ];

  const LEADERBOARD_DECORATIONS = [
    { badge: "🥇", color: "oklch(0.82 0.14 75)" },
    { badge: "🥈", color: "oklch(0.70 0.04 260)" },
    { badge: "🥉", color: "oklch(0.60 0.14 50)" },
  ];

  return (
    <main
      className="min-h-screen py-12 px-4"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="impact.page"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero */}
        <section data-ocid="impact.section">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              className="mb-4 text-xs tracking-widest uppercase px-3 py-1 font-semibold rounded-full"
              style={{
                background: "oklch(0.65 0.20 160 / 0.15)",
                color: "oklch(0.75 0.18 160)",
                border: "1px solid oklch(0.65 0.20 160 / 0.35)",
              }}
            >
              Phase 13 · Impact & SDGs
            </Badge>
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
              style={{ color: "oklch(var(--starlight))" }}
            >
              Our Collective Impact
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl"
              style={{ color: "oklch(0.65 0.04 260)" }}
            >
              Tracking shared outcomes across 17 UN Sustainable Development
              Goals — metrics, verified reports, and contributions from every
              organisation on the platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="rounded-2xl p-5 flex flex-col gap-2"
                style={{
                  background: "oklch(var(--cosmos-mid))",
                  border: `1px solid ${stat.color.replace(")", " / 0.25)")}`,
                }}
              >
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <div
                    className="text-3xl font-bold tabular-nums"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                    <span
                      className="text-base font-normal"
                      style={{ color: "oklch(0.55 0.04 260)" }}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SDG Grid */}
        <section data-ocid="impact.section">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-1 h-8 rounded-full"
              style={{ background: "oklch(0.72 0.16 75)" }}
            />
            <div>
              <div
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                SDG Alignment
              </div>
              <h2
                className="text-xl font-bold"
                style={{ color: "oklch(var(--starlight))" }}
              >
                17 Sustainable Development Goals
              </h2>
            </div>
            {activeSDG && (
              <button
                type="button"
                className="ml-auto text-xs px-3 py-1 rounded-full"
                style={{
                  color: "oklch(0.55 0.04 260)",
                  background: "oklch(var(--cosmos-mid))",
                }}
                onClick={() => setActiveSDG(null)}
                data-ocid="impact.sdg.button"
              >
                Clear filter ×
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {allSDGs.map((sdg) => {
              const isActive = activeSDG === sdg.number;
              const hasMetrics = allMetrics.some((m) =>
                m.linkedSDGs.includes(sdg.number),
              );
              return (
                <motion.button
                  type="button"
                  key={sdg.number}
                  onClick={() => setActiveSDG(isActive ? null : sdg.number)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl p-2 flex flex-col items-center gap-1 text-center transition-all"
                  style={{
                    background: isActive
                      ? `${sdg.color.replace(")", " / 0.22)")}`
                      : hasMetrics
                        ? `${sdg.color.replace(")", " / 0.08)")}`
                        : "oklch(var(--cosmos-mid))",
                    border: isActive
                      ? `2px solid ${sdg.color}`
                      : `1px solid ${sdg.color.replace(")", " / 0.25)")}`,
                    opacity: hasMetrics ? 1 : 0.45,
                  }}
                  data-ocid="impact.sdg.button"
                  title={sdg.title}
                >
                  <span className="text-lg leading-none">{sdg.emoji}</span>
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: isActive ? sdg.color : "oklch(0.7 0.04 260)",
                    }}
                  >
                    {sdg.number}
                  </span>
                  <span
                    className="leading-tight line-clamp-2 hidden sm:block"
                    style={{
                      color: "oklch(0.55 0.03 260)",
                      fontSize: "0.6rem",
                    }}
                  >
                    {sdg.shortTitle}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {activeSDG && (
            <p
              className="mt-3 text-sm"
              style={{ color: "oklch(0.55 0.04 260)" }}
            >
              Showing metrics linked to SDG {activeSDG} —{" "}
              {allSDGs.find((g) => g.number === activeSDG)?.title}
            </p>
          )}
        </section>

        {/* Impact Metrics */}
        <section data-ocid="impact.section">
          <SectionHeader
            accent="oklch(0.68 0.18 252)"
            eyebrow="Measurement Layer"
            title="Impact Metrics"
          />

          <div className="flex flex-wrap gap-2 mb-6">
            {(
              [
                "all",
                "social",
                "economic",
                "environmental",
                "governance",
                "cultural",
              ] as const
            ).map((d) => {
              const cfg = d !== "all" ? IMPACT_DIMENSION_CONFIG[d] : null;
              const isActive = activeDimension === d;
              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => setActiveDimension(d)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: isActive
                      ? (cfg?.color ?? "oklch(var(--gold))")
                      : "oklch(var(--cosmos-mid))",
                    color: isActive
                      ? "oklch(0.12 0.02 260)"
                      : "oklch(0.60 0.04 260)",
                    border: isActive
                      ? `1px solid ${cfg?.color ?? "oklch(var(--gold))"}`
                      : "1px solid oklch(1 0 0 / 0.08)",
                  }}
                  data-ocid="impact.dimension.tab"
                >
                  {cfg ? `${cfg.icon} ${cfg.label}` : "All Dimensions"}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMetrics.map((metric, i) => {
                const pct = progressPct(metric);
                const trendCfg = IMPACT_TREND_CONFIG[metric.trend];
                const dimCfg = IMPACT_DIMENSION_CONFIG[metric.dimension];
                const levelCfg = IMPACT_LEVEL_CONFIG[metric.level];
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    className="rounded-xl p-4"
                    style={{
                      background: "oklch(var(--cosmos-mid))",
                      border: `1px solid ${dimCfg.color.replace(")", " / 0.2)")}`,
                    }}
                    data-ocid={`impact.metric.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: dimCfg.color }}
                        >
                          {dimCfg.icon} {dimCfg.label}
                        </span>
                        <h3
                          className="text-sm font-semibold mt-0.5 leading-tight"
                          style={{ color: "oklch(var(--starlight))" }}
                        >
                          {metric.name}
                        </h3>
                      </div>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                        style={{
                          background: `${trendCfg.color.replace(")", " / 0.15)")}`,
                          color: trendCfg.color,
                        }}
                      >
                        {trendCfg.arrow} {trendCfg.label}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 mb-2">
                      <span
                        className="text-2xl font-bold tabular-nums"
                        style={{ color: dimCfg.color }}
                      >
                        {metric.current.toLocaleString()}
                      </span>
                      <span
                        className="text-xs pb-0.5"
                        style={{ color: "oklch(0.50 0.03 260)" }}
                      >
                        {metric.unit} / {metric.target.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full overflow-hidden mb-3"
                      style={{ height: 4, background: "oklch(1 0 0 / 0.06)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: i * 0.03 }}
                        style={{
                          height: "100%",
                          background: dimCfg.color,
                          borderRadius: 9999,
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {metric.linkedSDGs.slice(0, 3).map((n) => (
                        <SdgChip key={n} number={n} />
                      ))}
                      {metric.linkedSDGs.length > 3 && (
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.50 0.03 260)" }}
                        >
                          +{metric.linkedSDGs.length - 3}
                        </span>
                      )}
                      <span
                        className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "oklch(1 0 0 / 0.05)",
                          color: levelCfg.color,
                        }}
                      >
                        {levelCfg.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {filteredMetrics.length === 0 && (
            <div
              className="text-center py-12 rounded-xl"
              style={{ background: "oklch(var(--cosmos-mid))" }}
              data-ocid="impact.metrics.empty_state"
            >
              <p style={{ color: "oklch(0.55 0.03 260)" }}>
                No metrics match the current filters.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setActiveDimension("all");
                  setActiveSDG(null);
                }}
                data-ocid="impact.metrics.button"
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>

        {/* Org Leaderboard */}
        <section data-ocid="impact.leaderboard.section">
          <SectionHeader
            accent="oklch(0.65 0.20 160)"
            eyebrow="Top Contributors"
            title="Organisations by Impact"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3Orgs.map((org, i) => {
              const decoration = LEADERBOARD_DECORATIONS[i];
              if (!decoration) return null;
              const { badge, color } = decoration;
              return (
                <motion.div
                  key={org.orgId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="rounded-xl p-5"
                  style={{
                    background: "oklch(var(--cosmos-mid))",
                    border: `1px solid ${color.replace(")", " / 0.3)")}`,
                  }}
                  data-ocid={`impact.leaderboard.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{badge}</span>
                    <div>
                      <div
                        className="font-semibold text-sm"
                        style={{ color: "oklch(var(--starlight))" }}
                      >
                        {org.orgName}
                      </div>
                      <div
                        className="text-xs capitalize"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                      >
                        {org.badge}
                      </div>
                    </div>
                    <div
                      className="ml-auto text-2xl font-bold tabular-nums"
                      style={{ color }}
                    >
                      {org.overallScore}
                    </div>
                  </div>
                  <div
                    className="w-full rounded-full"
                    style={{ height: 4, background: "oklch(1 0 0 / 0.06)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${org.contributionScore}%` }}
                      transition={{ duration: 1, delay: 0.1 * i }}
                      style={{
                        height: "100%",
                        borderRadius: 9999,
                        background: color,
                      }}
                    />
                  </div>
                  <div
                    className="flex justify-between text-xs mt-2"
                    style={{ color: "oklch(0.50 0.03 260)" }}
                  >
                    <span>🌍 {org.nationsReached} nations</span>
                    <span>📊 {org.totalMetrics} metrics</span>
                    <span>🎯 {org.topSDGs.length} SDGs</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {org.topSDGs.slice(0, 4).map((n) => (
                      <SdgChip key={n} number={n as SDGoalNumber} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Published Reports */}
        <section data-ocid="impact.reports.section">
          <SectionHeader
            accent="oklch(0.68 0.22 290)"
            eyebrow="Verified Evidence"
            title="Published Impact Reports"
          />
          <div className="space-y-3">
            {last5Reports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-xl p-4 flex items-start gap-4"
                style={{
                  background: "oklch(var(--cosmos-mid))",
                  border: "1px solid oklch(1 0 0 / 0.07)",
                }}
                data-ocid={`impact.reports.item.${i + 1}`}
              >
                <div
                  className="rounded-xl w-14 h-14 flex items-center justify-center text-2xl font-bold shrink-0"
                  style={{
                    background: "oklch(0.65 0.20 160 / 0.12)",
                    color: "oklch(0.65 0.20 160)",
                  }}
                >
                  {report.overallScore}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="font-semibold text-sm truncate"
                      style={{ color: "oklch(var(--starlight))" }}
                    >
                      {report.title}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        background: "oklch(0.65 0.20 160 / 0.12)",
                        color: "oklch(0.65 0.20 160)",
                      }}
                    >
                      Published
                    </span>
                  </div>
                  <p
                    className="text-xs mb-2 line-clamp-2"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    {report.summary}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {report.linkedSDGs.slice(0, 4).map((n) => (
                      <SdgChip key={n} number={n} />
                    ))}
                    {report.linkedSDGs.length > 4 && (
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.50 0.03 260)" }}
                      >
                        +{report.linkedSDGs.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Submit Impact Report */}
        <section data-ocid="impact.submit.section">
          <SectionHeader
            accent="oklch(0.82 0.14 75)"
            eyebrow="Contribute Evidence"
            title="Submit an Impact Report"
          />

          {canSubmit ? (
            <div
              className="rounded-2xl p-6 max-w-2xl"
              style={{
                background: "oklch(var(--cosmos-mid))",
                border: "1px solid oklch(0.82 0.14 75 / 0.25)",
              }}
              data-ocid="impact.submit.panel"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                  data-ocid="impact.submit.success_state"
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h3
                    className="font-semibold text-lg mb-1"
                    style={{ color: "oklch(var(--starlight))" }}
                  >
                    Report Submitted
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    Your impact report has been submitted for review and
                    verification.
                  </p>
                  <Button
                    onClick={reset}
                    style={{
                      background: "oklch(0.82 0.14 75)",
                      color: "oklch(0.12 0.02 260)",
                    }}
                    data-ocid="impact.submit.button"
                  >
                    Submit Another
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4" data-ocid="impact.submit.modal">
                  <div>
                    <label
                      htmlFor="impact-title"
                      className="text-xs font-semibold block mb-1"
                      style={{ color: "oklch(0.65 0.04 260)" }}
                    >
                      Report Title *
                    </label>
                    <input
                      id="impact-title"
                      type="text"
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                        border: "1px solid oklch(1 0 0 / 0.12)",
                        color: "oklch(var(--starlight))",
                        outline: "none",
                      }}
                      placeholder="e.g. Climate Initiative — Year 2 Outcomes"
                      value={form.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                      data-ocid="impact.submit.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="impact-summary"
                      className="text-xs font-semibold block mb-1"
                      style={{ color: "oklch(0.65 0.04 260)" }}
                    >
                      Summary *
                    </label>
                    <Textarea
                      id="impact-summary"
                      className="text-sm"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                        border: "1px solid oklch(1 0 0 / 0.12)",
                        color: "oklch(var(--starlight))",
                        minHeight: 80,
                      }}
                      placeholder="Brief summary of outcomes and evidence…"
                      value={form.summary}
                      onChange={(e) => updateForm("summary", e.target.value)}
                      data-ocid="impact.submit.textarea"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="impact-dimension"
                        className="text-xs font-semibold block mb-1"
                        style={{ color: "oklch(0.65 0.04 260)" }}
                      >
                        Dimension
                      </label>
                      <Select
                        value={form.dimension}
                        onValueChange={(v) => updateForm("dimension", v)}
                      >
                        <SelectTrigger
                          id="impact-dimension"
                          className="text-sm"
                          style={{
                            background: "oklch(0.18 0.03 260)",
                            border: "1px solid oklch(1 0 0 / 0.12)",
                            color: "oklch(var(--starlight))",
                          }}
                          data-ocid="impact.submit.select"
                        >
                          <SelectValue placeholder="Select dimension" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            background: "oklch(0.18 0.03 260)",
                            border: "1px solid oklch(1 0 0 / 0.12)",
                          }}
                        >
                          {(
                            [
                              "social",
                              "economic",
                              "environmental",
                              "governance",
                              "cultural",
                            ] as ImpactDimension[]
                          ).map((d) => (
                            <SelectItem
                              key={d}
                              value={d}
                              className="text-sm capitalize"
                              style={{ color: "oklch(0.80 0.03 260)" }}
                            >
                              {IMPACT_DIMENSION_CONFIG[d].icon}{" "}
                              {IMPACT_DIMENSION_CONFIG[d].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="impact-level"
                        className="text-xs font-semibold block mb-1"
                        style={{ color: "oklch(0.65 0.04 260)" }}
                      >
                        Impact Level
                      </label>
                      <Select
                        value={form.level}
                        onValueChange={(v) => updateForm("level", v)}
                      >
                        <SelectTrigger
                          id="impact-level"
                          className="text-sm"
                          style={{
                            background: "oklch(0.18 0.03 260)",
                            border: "1px solid oklch(1 0 0 / 0.12)",
                            color: "oklch(var(--starlight))",
                          }}
                          data-ocid="impact.submit.select"
                        >
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            background: "oklch(0.18 0.03 260)",
                            border: "1px solid oklch(1 0 0 / 0.12)",
                          }}
                        >
                          {["local", "national", "regional", "global"].map(
                            (l) => (
                              <SelectItem
                                key={l}
                                value={l}
                                className="text-sm capitalize"
                                style={{ color: "oklch(0.80 0.03 260)" }}
                              >
                                {l.charAt(0).toUpperCase() + l.slice(1)}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="impact-narrative"
                      className="text-xs font-semibold block mb-1"
                      style={{ color: "oklch(0.65 0.04 260)" }}
                    >
                      Impact Narrative
                    </label>
                    <Textarea
                      id="impact-narrative"
                      className="text-sm"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                        border: "1px solid oklch(1 0 0 / 0.12)",
                        color: "oklch(var(--starlight))",
                        minHeight: 100,
                      }}
                      placeholder="Describe the outcomes, evidence, and communities reached…"
                      value={form.narrative}
                      onChange={(e) => updateForm("narrative", e.target.value)}
                      data-ocid="impact.submit.textarea"
                    />
                  </div>
                  <Button
                    onClick={submit}
                    disabled={isSubmitting || !form.title || !form.summary}
                    className="w-full font-semibold"
                    style={{
                      background: "oklch(0.82 0.14 75)",
                      color: "oklch(0.12 0.02 260)",
                    }}
                    data-ocid="impact.submit.submit_button"
                  >
                    {isSubmitting ? "Submitting…" : "Submit Impact Report"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="rounded-2xl p-8 text-center max-w-md"
              style={{
                background: "oklch(var(--cosmos-mid))",
                border: "1px solid oklch(1 0 0 / 0.07)",
              }}
              data-ocid="impact.submit.panel"
            >
              <span className="text-3xl">🌍</span>
              <h3
                className="font-semibold mt-2 mb-1"
                style={{ color: "oklch(var(--starlight))" }}
              >
                Share Your Organisation&apos;s Impact
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                Register your organisation to begin submitting verified impact
                reports and contributing to collective SDG tracking.
              </p>
              <Link to="/register">
                <Button
                  style={{
                    background: "oklch(0.82 0.14 75)",
                    color: "oklch(0.12 0.02 260)",
                  }}
                  data-ocid="impact.submit.button"
                >
                  Register Your Organisation
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
