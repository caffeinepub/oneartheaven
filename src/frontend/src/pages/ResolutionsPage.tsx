import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useResolutions } from "@/hooks/useResolutions";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChevronRight,
  Globe2,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  CATEGORY_LABELS,
  type Resolution,
  type ResolutionCategory,
  type ResolutionStage,
  STAGE_COLORS,
  STAGE_LABELS,
} from "../data/resolutionTypes";

// ─── Stage Tab ───────────────────────────────────────────────────────────────────────────────

const STAGES: Array<{
  value: ResolutionStage | "all";
  label: string;
  short: string;
}> = [
  { value: "all", label: "All Resolutions", short: "All" },
  { value: "draft", label: "Draft", short: "Draft" },
  { value: "review", label: "Under Review", short: "Review" },
  { value: "voting", label: "Voting Open", short: "Voting" },
  { value: "passed", label: "Passed", short: "Passed" },
  { value: "implementation", label: "In Implementation", short: "Impl." },
  { value: "completed", label: "Completed", short: "Done" },
];

const CATEGORIES: Array<{ value: ResolutionCategory | "all"; label: string }> =
  [
    { value: "all", label: "All Categories" },
    { value: "climate", label: "Climate & Environment" },
    { value: "health", label: "Global Health" },
    { value: "education", label: "Education" },
    { value: "peace", label: "Peace & Security" },
    { value: "economy", label: "Economy & Finance" },
    { value: "technology", label: "Technology & AI" },
    { value: "oceans", label: "Oceans & Water" },
    { value: "food", label: "Food & Agriculture" },
    { value: "governance", label: "Governance Reform" },
  ];

// ─── Resolution Card ────────────────────────────────────────────────────────────────────────

function ResolutionCard({
  resolution,
  index,
  onOpen,
}: {
  resolution: Resolution;
  index: number;
  onOpen: (r: Resolution) => void;
}) {
  const stageColor = STAGE_COLORS[resolution.stage];
  const totalVotes =
    resolution.votesFor + resolution.votesAgainst + resolution.votesAbstain;
  const votePercent =
    totalVotes > 0
      ? Math.round((resolution.votesFor / totalVotes) * 100)
      : null;

  return (
    <motion.div
      data-ocid={`resolutions.card.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.07 }}
      className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "oklch(var(--cosmos-surface) / 0.85)",
        border: "1px solid oklch(var(--teal) / 0.12)",
      }}
      onClick={() => onOpen(resolution)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${stageColor}08 0%, transparent 70%)`,
          border: `1px solid ${stageColor}25`,
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-mono font-bold tracking-wider"
            style={{ color: "oklch(0.52 0.06 260)" }}
          >
            {resolution.id}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: `${stageColor}15`,
              border: `1px solid ${stageColor}35`,
              color: stageColor,
            }}
          >
            {STAGE_LABELS[resolution.stage]}
          </span>
          {resolution.finFracFran && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(var(--gold) / 0.1)",
                border: "1px solid oklch(var(--gold) / 0.3)",
                color: "oklch(var(--gold))",
              }}
            >
              <Zap className="h-2.5 w-2.5" />
              FinFracFran™
            </span>
          )}
        </div>
        <div
          className="flex items-center gap-1 shrink-0 text-xs font-bold"
          style={{ color: "oklch(0.65 0.18 140)" }}
        >
          <Sparkles className="h-3 w-3" />
          {resolution.aiAlignmentScore}%
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-base leading-snug mb-2 group-hover:text-white transition-colors duration-200"
        style={{ color: "oklch(var(--pearl))" }}
      >
        {resolution.title}
      </h3>

      {/* Council */}
      <p className="text-xs mb-3" style={{ color: "oklch(0.52 0.06 260)" }}>
        {resolution.sponsoringCouncil}
      </p>

      {/* Summary */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-2"
        style={{ color: "oklch(0.62 0.04 260)" }}
      >
        {resolution.summary}
      </p>

      {/* Vote bar (if voting has happened) */}
      {votePercent !== null && (
        <div className="mb-4">
          <div
            className="flex justify-between text-xs mb-1"
            style={{ color: "oklch(0.52 0.06 260)" }}
          >
            <span>{resolution.votesFor} For</span>
            <span>{votePercent}% support</span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "oklch(0.18 0.03 260)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${votePercent}%`,
                background:
                  "linear-gradient(90deg, oklch(0.65 0.2 140), oklch(0.72 0.16 75))",
              }}
            />
          </div>
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {resolution.nationsImpacted > 0 && (
            <div
              className="flex items-center gap-1"
              style={{ color: "oklch(0.55 0.14 195)" }}
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">
                {resolution.nationsImpacted} nations
              </span>
            </div>
          )}
          <div className="flex gap-1">
            {resolution.sdgTags.slice(0, 3).map((sdg) => (
              <span
                key={sdg}
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: "oklch(var(--teal) / 0.1)",
                  color: "oklch(var(--teal-bright))",
                }}
              >
                SDG {sdg}
              </span>
            ))}
          </div>
        </div>
        <div
          className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: "oklch(var(--gold))" }}
        >
          View <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Sheet ────────────────────────────────────────────────────────────────────────────

function ResolutionDetailSheet({
  resolution,
  onClose,
}: {
  resolution: Resolution | null;
  onClose: () => void;
}) {
  const r = resolution;
  if (!r) return null;

  const stageColor = STAGE_COLORS[r.stage];
  const totalVotes = r.votesFor + r.votesAgainst + r.votesAbstain;
  const votePercent =
    totalVotes > 0 ? Math.round((r.votesFor / totalVotes) * 100) : null;

  return (
    <Sheet open={!!resolution} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        data-ocid="resolutions.detail.sheet"
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
        style={{
          background: "oklch(0.10 0.03 260)",
          borderLeft: "1px solid oklch(var(--teal) / 0.15)",
        }}
      >
        <SheetHeader className="mb-6">
          {/* Stage + ID */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-mono font-bold tracking-wider"
              style={{ color: "oklch(0.52 0.06 260)" }}
            >
              {r.id}
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: `${stageColor}15`,
                border: `1px solid ${stageColor}35`,
                color: stageColor,
              }}
            >
              {STAGE_LABELS[r.stage]}
            </span>
            {r.finFracFran && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: "oklch(var(--gold) / 0.1)",
                  border: "1px solid oklch(var(--gold) / 0.3)",
                  color: "oklch(var(--gold))",
                }}
              >
                FinFracFran™
              </span>
            )}
          </div>

          <SheetTitle
            className="font-display text-2xl font-bold leading-snug text-left"
            style={{ color: "oklch(var(--pearl))" }}
          >
            {r.title}
          </SheetTitle>

          <p
            className="text-sm text-left mt-1"
            style={{ color: "oklch(0.55 0.06 260)" }}
          >
            {r.sponsoringCouncil} · Submitted by {r.submittedBy}
          </p>
        </SheetHeader>

        {/* Summary */}
        <div className="mb-6">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.68 0.04 260)" }}
          >
            {r.summary}
          </p>
        </div>

        {/* AI Score + Charter */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{
            background: "oklch(0.13 0.04 260)",
            border: "1px solid oklch(var(--teal) / 0.12)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.55 0.06 260)" }}
            >
              AI Policy Analysis
            </span>
            <div
              className="flex items-center gap-1"
              style={{ color: "oklch(0.65 0.18 140)" }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-sm font-bold">
                {r.aiAlignmentScore}% aligned
              </span>
            </div>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "oklch(0.18 0.03 260)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${r.aiAlignmentScore}%`,
                background:
                  "linear-gradient(90deg, oklch(0.55 0.22 195), oklch(0.65 0.18 140))",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {r.charterAlignment.map((a) => (
              <span
                key={a}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(var(--teal) / 0.1)",
                  border: "1px solid oklch(var(--teal) / 0.25)",
                  color: "oklch(var(--teal-bright))",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Voting (if applicable) */}
        {totalVotes > 0 && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{
              background: "oklch(0.13 0.04 260)",
              border: "1px solid oklch(var(--teal) / 0.12)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.55 0.06 260)" }}
            >
              Voting Record
            </p>
            <div className="flex gap-4 text-sm mb-3">
              <span style={{ color: "oklch(0.65 0.2 140)" }}>
                ✔️ {r.votesFor} For
              </span>
              <span style={{ color: "oklch(0.62 0.22 25)" }}>
                ❌ {r.votesAgainst} Against
              </span>
              <span style={{ color: "oklch(0.52 0.06 260)" }}>
                — {r.votesAbstain} Abstain
              </span>
            </div>
            {votePercent !== null && (
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "oklch(0.18 0.03 260)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${votePercent}%`,
                    background:
                      "linear-gradient(90deg, oklch(0.65 0.2 140), oklch(0.72 0.16 75))",
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Impact Metrics */}
        {r.impactMetrics.length > 0 && (
          <div className="mb-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.55 0.06 260)" }}
            >
              Impact Metrics
            </p>
            <div className="grid grid-cols-2 gap-3">
              {r.impactMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-3"
                  style={{
                    background: "oklch(0.13 0.04 260)",
                    border: "1px solid oklch(var(--teal) / 0.1)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp
                      className="h-3 w-3"
                      style={{
                        color:
                          m.trend === "up"
                            ? "oklch(0.65 0.2 140)"
                            : m.trend === "down"
                              ? "oklch(0.62 0.22 25)"
                              : "oklch(0.52 0.06 260)",
                      }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.52 0.06 260)" }}
                    >
                      {m.label}
                    </span>
                  </div>
                  <div
                    className="font-display font-bold text-lg"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.45 0.05 260)" }}
                  >
                    {m.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        <div className="mb-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.55 0.06 260)" }}
          >
            Milestones
          </p>
          <div className="space-y-2">
            {r.milestones.map((m, i) => (
              <div key={m.id} className="flex items-start gap-3">
                <div
                  className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{
                    background:
                      m.status === "completed"
                        ? "oklch(0.65 0.2 140 / 0.2)"
                        : m.status === "in-progress"
                          ? "oklch(var(--teal) / 0.15)"
                          : "oklch(0.18 0.03 260)",
                    border:
                      m.status === "completed"
                        ? "1px solid oklch(0.65 0.2 140 / 0.4)"
                        : m.status === "in-progress"
                          ? "1px solid oklch(var(--teal) / 0.4)"
                          : "1px solid oklch(0.28 0.04 260)",
                    color:
                      m.status === "completed"
                        ? "oklch(0.65 0.2 140)"
                        : m.status === "in-progress"
                          ? "oklch(var(--teal-bright))"
                          : "oklch(0.42 0.04 260)",
                  }}
                >
                  {m.status === "completed" ? "✔" : i + 1}
                </div>
                <div className="flex-1">
                  <p
                    className="text-sm font-medium"
                    style={{
                      color:
                        m.status === "pending"
                          ? "oklch(0.45 0.05 260)"
                          : "oklch(var(--pearl))",
                    }}
                  >
                    {m.label}
                  </p>
                  {m.completedAt && (
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.42 0.04 260)" }}
                    >
                      {m.completedAt}
                    </p>
                  )}
                  {m.status === "in-progress" && (
                    <p
                      className="text-xs"
                      style={{ color: "oklch(var(--teal-bright))" }}
                    >
                      In progress
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FinFracFran Spotlight */}
        {r.finFracFran && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--gold) / 0.08) 0%, oklch(var(--cosmos-surface) / 0.6) 100%)",
              border: "1px solid oklch(var(--gold) / 0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap
                className="h-4 w-4"
                style={{ color: "oklch(var(--gold))" }}
              />
              <span
                className="text-sm font-bold"
                style={{ color: "oklch(var(--gold))" }}
              >
                FinFracFran™ Spotlight
              </span>
              <Badge
                className="text-xs"
                style={{
                  background: "oklch(var(--gold) / 0.12)",
                  border: "1px solid oklch(var(--gold) / 0.3)",
                  color: "oklch(var(--gold))",
                }}
              >
                {r.finFracFran.franchiseTier} Tier
              </Badge>
            </div>
            <p
              className="text-sm mb-3"
              style={{ color: "oklch(0.68 0.06 75)" }}
            >
              {r.finFracFran.spotlight}
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.52 0.06 260)" }}
                >
                  Nations
                </div>
                <div
                  className="font-bold text-base"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  {r.finFracFran.adoptingNations}
                </div>
              </div>
              <div>
                <div
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.52 0.06 260)" }}
                >
                  Est. ROI
                </div>
                <div
                  className="font-bold text-base"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  {r.finFracFran.estimatedROI}
                </div>
              </div>
              <div>
                <div
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.52 0.06 260)" }}
                >
                  License
                </div>
                <div
                  className="font-bold text-xs"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  {r.finFracFran.licenseType}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SDG Tags */}
        <div className="mb-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.55 0.06 260)" }}
          >
            SDG Alignment
          </p>
          <div className="flex flex-wrap gap-1.5">
            {r.sdgTags.map((sdg) => (
              <span
                key={sdg}
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "oklch(var(--teal) / 0.1)",
                  border: "1px solid oklch(var(--teal) / 0.25)",
                  color: "oklch(var(--teal-bright))",
                }}
              >
                SDG {sdg}
              </span>
            ))}
          </div>
        </div>

        {/* Close */}
        <Button
          data-ocid="resolutions.detail.close_button"
          onClick={onClose}
          variant="outline"
          className="w-full"
          style={{
            borderColor: "oklch(var(--teal) / 0.3)",
            color: "oklch(var(--teal-bright))",
          }}
        >
          Close
        </Button>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────────────────

export function ResolutionsPage() {
  const {
    resolutions,
    stats,
    searchQuery,
    setSearchQuery,
    activeStage,
    setActiveStage,
    activeCategory,
    setActiveCategory,
    selectedResolution,
    openResolution,
    closeResolution,
  } = useResolutions();

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="resolutions.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.55 0.22 195 / 0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 75% 70%, oklch(0.72 0.16 75 / 0.05) 0%, transparent 60%)",
          }}
        />
        {/* Standardized grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.55 0.22 195 / 0.3)",
              background: "oklch(0.55 0.22 195 / 0.07)",
            }}
          >
            <BarChart3
              className="h-3.5 w-3.5"
              style={{ color: "oklch(var(--teal-bright))" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(var(--teal-bright))" }}
            >
              Phase 2.3 — Resolution Tracker
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-hero-xl font-display mb-5"
          >
            <span className="gold-gradient-text">Resolution Tracker</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            Live pipeline of every resolution: from{" "}
            <span style={{ color: "oklch(0.55 0.22 195)" }}>draft</span> to{" "}
            <span style={{ color: "oklch(0.65 0.18 270)" }}>
              implementation
            </span>{" "}
            to{" "}
            <span style={{ color: "oklch(0.72 0.16 75)" }}>global impact</span>.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              {
                icon: BarChart3,
                value: stats.total,
                label: "Total",
                color: "oklch(var(--teal-bright))",
              },
              {
                icon: TrendingUp,
                value: stats.passed,
                label: "Passed",
                color: "oklch(0.65 0.2 140)",
              },
              {
                icon: Zap,
                value: stats.inProgress,
                label: "Active",
                color: "oklch(var(--gold))",
              },
              {
                icon: Globe2,
                value: stats.nationsImpacted,
                label: "Nations Reached",
                color: "oklch(0.65 0.18 270)",
              },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Icon className="h-4 w-4" style={{ color }} />
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {value}
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.52 0.06 260)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div
        className="h-px mx-auto"
        style={{
          maxWidth: "240px",
          background:
            "linear-gradient(90deg, transparent, oklch(var(--teal) / 0.35), oklch(var(--gold) / 0.3), transparent)",
        }}
      />

      {/* ── Filters + Cards ── */}
      <section data-ocid="resolutions.list.section" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Stage tabs */}
          <div
            data-ocid="resolutions.stage.tab"
            className="flex flex-wrap gap-2 mb-6"
          >
            {STAGES.map((s) => {
              const count =
                s.value === "all"
                  ? stats.total
                  : (stats.stageCounts[s.value] ?? 0);
              const isActive = activeStage === s.value;
              const stageCol =
                s.value === "all"
                  ? "oklch(var(--teal-bright))"
                  : STAGE_COLORS[s.value as ResolutionStage];
              return (
                <button
                  type="button"
                  key={s.value}
                  onClick={() => setActiveStage(s.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: isActive
                      ? `${stageCol}18`
                      : "oklch(var(--cosmos-surface) / 0.5)",
                    border: isActive
                      ? `1.5px solid ${stageCol}50`
                      : "1px solid oklch(0.22 0.04 260)",
                    color: isActive ? stageCol : "oklch(0.52 0.06 260)",
                  }}
                >
                  {s.short} {count > 0 && <span>({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Search + Category row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.42 0.04 260)" }}
              />
              <Input
                data-ocid="resolutions.search_input"
                placeholder="Search resolutions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-transparent border-[oklch(var(--teal)/0.2)] text-white placeholder:text-[oklch(0.38_0.04_260)] focus-visible:ring-[oklch(var(--teal)/0.35)]"
              />
            </div>
            <Select
              value={activeCategory}
              onValueChange={(v) =>
                setActiveCategory(v as ResolutionCategory | "all")
              }
            >
              <SelectTrigger
                data-ocid="resolutions.category.select"
                className="w-full sm:w-52 bg-transparent border-[oklch(var(--teal)/0.2)] text-white"
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.12 0.04 260)",
                  border: "1px solid oklch(var(--teal)/0.2)",
                }}
              >
                {CATEGORIES.map((c) => (
                  <SelectItem
                    key={c.value}
                    value={c.value}
                    className="text-white"
                  >
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cards Grid */}
          {resolutions.length === 0 ? (
            <div
              data-ocid="resolutions.empty_state"
              className="text-center py-20"
            >
              <BarChart3
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: "oklch(0.35 0.05 260)" }}
              />
              <p
                className="text-base font-semibold mb-2"
                style={{ color: "oklch(0.55 0.06 260)" }}
              >
                No resolutions found
              </p>
              <p className="text-sm" style={{ color: "oklch(0.42 0.04 260)" }}>
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resolutions.map((r, i) => (
                <ResolutionCard
                  key={r.id}
                  resolution={r}
                  index={i}
                  onOpen={openResolution}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category Legend ── */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.5)",
              border: "1px solid oklch(var(--teal) / 0.1)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Users
                className="h-4 w-4"
                style={{ color: "oklch(var(--gold))" }}
              />
              <h3
                className="text-sm font-bold"
                style={{ color: "oklch(var(--gold))" }}
              >
                Active Categories
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === key
                        ? "all"
                        : (key as ResolutionCategory),
                    )
                  }
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background:
                      activeCategory === key
                        ? "oklch(var(--teal) / 0.15)"
                        : "oklch(0.16 0.04 260)",
                    border:
                      activeCategory === key
                        ? "1px solid oklch(var(--teal) / 0.4)"
                        : "1px solid oklch(0.22 0.04 260)",
                    color:
                      activeCategory === key
                        ? "oklch(var(--teal-bright))"
                        : "oklch(0.52 0.06 260)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <Link to="/governance" data-ocid="resolutions.back_governance.link">
            <Button
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(var(--teal) / 0.3)",
                color: "oklch(var(--teal-bright))",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Governance Hub
            </Button>
          </Link>
          <Link to="/assembly" data-ocid="resolutions.goto_assembly.link">
            <Button
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(var(--gold) / 0.3)",
                color: "oklch(var(--gold))",
              }}
            >
              Global Assembly
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Detail Sheet */}
      <ResolutionDetailSheet
        resolution={selectedResolution}
        onClose={closeResolution}
      />
    </main>
  );
}
