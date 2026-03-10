import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORY_CONFIG,
  REGION_LABELS,
  STAGE_CONFIG,
} from "@/data/solutionsTypes";
import type { Solution, SolutionCategory } from "@/data/solutionsTypes";
import type { SolutionFilters } from "@/hooks/useSolutions";
import { useSolutions } from "@/hooks/useSolutions";
import {
  ArrowRight,
  BarChart2,
  ChevronRight,
  Globe2,
  Lightbulb,
  Loader2,
  Search,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Utility ─────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 90) return "oklch(0.72 0.18 140)";
  if (score >= 80) return "oklch(0.72 0.16 195)";
  if (score >= 70) return "oklch(0.78 0.18 75)";
  return "oklch(0.65 0.18 30)";
}

// ─── Score Gauge ─────────────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const color = scoreColor(score);
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative flex-shrink-0" style={{ width: 48, height: 48 }}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        role="img"
        aria-label="AI score gauge"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="oklch(0.22 0.04 260)"
          strokeWidth="4"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedStat({
  value,
  label,
  suffix = "",
}: { value: number | string; label: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const numericVal =
    typeof value === "string"
      ? Number.parseFloat(value.replace(/[^0-9.]/g, ""))
      : value;

  useEffect(() => {
    let start = 0;
    const end = numericVal;
    if (end === 0) return;
    const duration = 1400;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(timer);
      } else setDisplayed(start);
    }, 16);
    return () => clearInterval(timer);
  }, [numericVal]);

  const displayVal =
    typeof value === "string" && Number.isNaN(numericVal) ? value : displayed;

  return (
    <div className="text-center">
      <div className="font-display text-3xl sm:text-4xl font-bold gold-gradient-text">
        {displayVal}
        {suffix}
      </div>
      <div
        className="text-xs mt-1 tracking-wide"
        style={{ color: "oklch(0.6 0.04 260)" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Solution Card ────────────────────────────────────────────────────────────

function SolutionCard({
  solution,
  index,
  onViewDetail,
}: {
  solution: Solution;
  index: number;
  onViewDetail: (id: string) => void;
}) {
  const catCfg =
    CATEGORY_CONFIG[solution.category as Exclude<SolutionCategory, "all">];
  const stageCfg = STAGE_CONFIG[solution.stage];

  return (
    <motion.div
      data-ocid={`solutions.card.item.${index}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className="relative rounded-2xl p-5 flex flex-col gap-4 group transition-all duration-300"
      style={{
        background: "oklch(var(--cosmos-surface) / 0.9)",
        border: solution.featured
          ? "1.5px solid oklch(var(--gold) / 0.55)"
          : "1px solid oklch(0.24 0.04 260)",
        boxShadow: solution.featured
          ? "0 0 28px oklch(var(--gold) / 0.1), 0 8px 32px oklch(0.05 0.03 260 / 0.4)"
          : "none",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${catCfg?.bgColor ?? "oklch(0.72 0.16 75 / 0.06)"} 0%, transparent 70%)`,
        }}
      />

      {/* Top row: badges + score */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="flex flex-wrap gap-1.5">
          {catCfg && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: catCfg.bgColor, color: catCfg.color }}
            >
              {catCfg.icon} {catCfg.label}
            </span>
          )}
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: stageCfg.bgColor, color: stageCfg.color }}
          >
            {stageCfg.label}
          </span>
        </div>
        <ScoreGauge score={solution.aiScore.overall} />
      </div>

      {/* Title + tagline */}
      <div className="relative z-10">
        {solution.featured && (
          <div className="flex items-center gap-1 mb-1.5">
            <Star className="h-3 w-3" style={{ color: "oklch(var(--gold))" }} />
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: "oklch(var(--gold))" }}
            >
              Featured Solution
            </span>
          </div>
        )}
        <h3
          className="font-display font-bold text-base leading-snug mb-1 line-clamp-2"
          style={{ color: "oklch(var(--pearl))" }}
        >
          {solution.title}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: "oklch(0.6 0.04 260)" }}
        >
          {solution.tagline}
        </p>
      </div>

      {/* Impact metrics pills */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {solution.impactMetrics.slice(0, 2).map((m) => (
          <span
            key={m.label}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.2 0.04 260)",
              color: "oklch(0.75 0.06 260)",
              border: "1px solid oklch(0.26 0.04 260)",
            }}
          >
            <span
              className="font-semibold"
              style={{ color: "oklch(var(--pearl))" }}
            >
              {m.value}
            </span>{" "}
            {m.label}
          </span>
        ))}
      </div>

      {/* Footer: nations + FinFracFran + CTA */}
      <div className="flex items-center justify-between mt-auto relative z-10 pt-1">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "oklch(0.6 0.04 260)" }}
          >
            <Globe2 className="h-3.5 w-3.5" />
            <span>{solution.adoptingNations.length} nations</span>
          </div>
          {solution.finFracFran.available && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(var(--gold) / 0.12)",
                color: "oklch(var(--gold))",
                border: "1px solid oklch(var(--gold) / 0.3)",
              }}
            >
              FinFracFran™
            </span>
          )}
        </div>
        <Button
          data-ocid={`solutions.view_detail.button.${index}`}
          size="sm"
          onClick={() => onViewDetail(solution.id)}
          className="text-xs gap-1 h-7 px-3"
          style={{
            background: "oklch(var(--gold) / 0.12)",
            color: "oklch(var(--gold))",
            border: "1px solid oklch(var(--gold) / 0.3)",
          }}
        >
          View Details
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Detail Sheet ─────────────────────────────────────────────────────────────

function DetailSheet({
  solution,
  open,
  onClose,
}: { solution: Solution | null; open: boolean; onClose: () => void }) {
  if (!solution) return null;

  const catCfg =
    CATEGORY_CONFIG[solution.category as Exclude<SolutionCategory, "all">];
  const stageCfg = STAGE_CONFIG[solution.stage];

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl p-0"
        style={{
          background: "oklch(var(--cosmos-deep))",
          border: "1px solid oklch(0.22 0.04 260)",
        }}
      >
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <SheetHeader>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {catCfg && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: catCfg.bgColor, color: catCfg.color }}
                  >
                    {catCfg.icon} {catCfg.label}
                  </span>
                )}
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: stageCfg.bgColor,
                    color: stageCfg.color,
                  }}
                >
                  {stageCfg.label}
                </span>
                {solution.finFracFran.available && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(var(--gold) / 0.12)",
                      color: "oklch(var(--gold))",
                      border: "1px solid oklch(var(--gold) / 0.3)",
                    }}
                  >
                    FinFracFran™ Licensed
                  </span>
                )}
              </div>
              <SheetTitle
                className="font-display text-xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {solution.title}
              </SheetTitle>
              <p className="text-sm" style={{ color: "oklch(0.6 0.04 260)" }}>
                {solution.tagline}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.45 0.04 260)" }}>
                {solution.code} · Submitted by {solution.submittedBy}
              </p>
            </SheetHeader>

            <hr style={{ borderColor: "oklch(0.22 0.04 260)" }} />

            {/* AI Score */}
            <section>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(var(--gold))" }}
              >
                AI Innovation Score
              </h4>
              <div className="flex items-center gap-4 mb-3">
                <ScoreGauge score={solution.aiScore.overall} />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  {solution.aiScore.analysis}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Novelty", val: solution.aiScore.novelty },
                  { label: "Scalability", val: solution.aiScore.scalability },
                  {
                    label: "Replicability",
                    val: solution.aiScore.replicability,
                  },
                  {
                    label: "Equity Impact",
                    val: solution.aiScore.equityImpact,
                  },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    className="rounded-lg p-2"
                    style={{
                      background: "oklch(0.16 0.04 260)",
                      border: "1px solid oklch(0.22 0.04 260)",
                    }}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "oklch(0.6 0.04 260)" }}>
                        {label}
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: scoreColor(val) }}
                      >
                        {val}
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ background: "oklch(0.22 0.04 260)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${val}%`,
                          background: scoreColor(val),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Problem + Approach */}
            <section className="space-y-3">
              <div>
                <h4
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "oklch(0.6 0.14 195)" }}
                >
                  Problem Statement
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 260)" }}
                >
                  {solution.problemStatement}
                </p>
              </div>
              <div>
                <h4
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "oklch(0.6 0.14 195)" }}
                >
                  Approach
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 260)" }}
                >
                  {solution.approach}
                </p>
              </div>
              <div>
                <h4
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "oklch(0.6 0.14 195)" }}
                >
                  Proven Results
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 260)" }}
                >
                  {solution.provenResults}
                </p>
              </div>
            </section>

            {/* Impact Metrics */}
            <section>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(var(--gold))" }}
              >
                Impact Metrics
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {solution.impactMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl p-3"
                    style={{
                      background: "oklch(0.14 0.04 260)",
                      border: "1px solid oklch(0.22 0.04 260)",
                    }}
                  >
                    <div
                      className="font-display font-bold text-lg"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      {m.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.04 260)" }}
                    >
                      {m.label}
                    </div>
                    {m.unit && (
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.42 0.04 260)" }}
                      >
                        {m.unit}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* FinFracFran */}
            {solution.finFracFran.available && (
              <section>
                <h4
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  FinFracFran™ Licensing
                </h4>
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(var(--gold) / 0.06)",
                    border: "1px solid oklch(var(--gold) / 0.2)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span style={{ color: "oklch(0.6 0.04 260)" }}>
                        License Type:{" "}
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {solution.finFracFran.licenseType.replace(/_/g, " ")}
                      </span>
                    </div>
                    {solution.finFracFran.franchiseFee && (
                      <div>
                        <span style={{ color: "oklch(0.6 0.04 260)" }}>
                          Franchise Fee:{" "}
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: "oklch(var(--gold))" }}
                        >
                          {solution.finFracFran.franchiseFee}
                        </span>
                      </div>
                    )}
                    {solution.finFracFran.revenueShare && (
                      <div>
                        <span style={{ color: "oklch(0.6 0.04 260)" }}>
                          Revenue Share:{" "}
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          {solution.finFracFran.revenueShare}
                        </span>
                      </div>
                    )}
                    {solution.finFracFran.minCapital && (
                      <div>
                        <span style={{ color: "oklch(0.6 0.04 260)" }}>
                          Min. Capital:{" "}
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          {solution.finFracFran.minCapital}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe2
                      className="h-3.5 w-3.5"
                      style={{ color: "oklch(var(--gold))" }}
                    />
                    <span style={{ color: "oklch(0.6 0.04 260)" }}>
                      Adopted in{" "}
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      {solution.finFracFran.adoptingNations} nations
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.58 0.04 260)" }}
                  >
                    {solution.finFracFran.notes}
                  </p>
                </div>
              </section>
            )}

            <hr style={{ borderColor: "oklch(0.22 0.04 260)" }} />

            {/* FinFracFran Adoption Pathway */}
            <section>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "oklch(var(--gold))" }}
              >
                FinFracFran™ Adoption Pathway
              </h4>
              <div className="relative">
                {[
                  {
                    step: 1,
                    title: "Inquire",
                    desc: "Submit your interest and receive a tailored solution brief from the council.",
                  },
                  {
                    step: 2,
                    title: "Review Terms",
                    desc: "Negotiate FinFracFran™ licensing terms with council representatives.",
                  },
                  {
                    step: 3,
                    title: "Pilot",
                    desc: "Run a 90-day local pilot with AI monitoring, mentorship, and full support.",
                  },
                  {
                    step: 4,
                    title: "Scale",
                    desc: "Expand the proven model to additional communities and regions.",
                  },
                  {
                    step: 5,
                    title: "Full Franchise",
                    desc: "Join the global adopter network and contribute back to the commons.",
                  },
                ].map(({ step, title, desc }, idx, arr) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          border: "2px solid oklch(var(--gold))",
                          color: "oklch(var(--gold))",
                          background: "oklch(var(--gold) / 0.08)",
                        }}
                      >
                        {step}
                      </div>
                      {idx < arr.length - 1 && (
                        <div
                          className="flex-1 w-px mt-1 mb-1"
                          style={{
                            borderLeft: "2px dashed oklch(var(--gold) / 0.25)",
                            minHeight: 28,
                          }}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {title}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "oklch(0.58 0.04 260)" }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Adopting Nations */}
            <section>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.72 0.16 195)" }}
              >
                Adopting Nations
              </h4>
              <div className="flex flex-wrap gap-2">
                {solution.adoptingNations.map((n) => {
                  const stageCfgN = STAGE_CONFIG[n.stage];
                  return (
                    <div
                      key={n.nationCode}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                      style={{
                        background: "oklch(0.16 0.04 260)",
                        border: "1px solid oklch(0.24 0.04 260)",
                      }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {n.nationName}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded-full text-xs"
                        style={{
                          background: stageCfgN.bgColor,
                          color: stageCfgN.color,
                        }}
                      >
                        {stageCfgN.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <hr style={{ borderColor: "oklch(0.22 0.04 260)" }} />

            {/* Global Footprint */}
            <section>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.72 0.16 195)" }}
              >
                Global Footprint
              </h4>
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: "oklch(var(--cosmos-deep))",
                  border: "1px solid oklch(0.22 0.04 260)",
                }}
              >
                <div
                  className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold z-10"
                  style={{
                    background: "oklch(0.72 0.16 195 / 0.18)",
                    color: "oklch(0.72 0.16 195)",
                    border: "1px solid oklch(0.72 0.16 195 / 0.35)",
                  }}
                >
                  {solution.adoptingNations.length} nations
                </div>
                <svg
                  viewBox="0 0 360 180"
                  className="w-full"
                  style={{ height: 160, display: "block" }}
                  aria-hidden="true"
                  role="presentation"
                >
                  <rect width="360" height="180" fill="oklch(0.14 0.04 260)" />
                  {/* Ocean grid lines */}
                  {[30, 60, 90, 120, 150].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="360"
                      y2={y}
                      stroke="oklch(0.20 0.04 260)"
                      strokeWidth="0.5"
                    />
                  ))}
                  {[60, 120, 180, 240, 300].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="180"
                      stroke="oklch(0.20 0.04 260)"
                      strokeWidth="0.5"
                    />
                  ))}
                  {/* North America */}
                  <path
                    d="M40 30 L80 25 L90 45 L75 70 L55 75 L40 60 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* South America */}
                  <path
                    d="M70 90 L90 85 L100 110 L90 140 L70 145 L60 120 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* Europe */}
                  <path
                    d="M155 25 L185 20 L190 45 L175 50 L155 45 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* Africa */}
                  <path
                    d="M160 55 L195 50 L205 80 L195 120 L175 125 L155 105 L155 75 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* Asia */}
                  <path
                    d="M195 20 L290 15 L300 40 L285 65 L250 70 L215 60 L195 45 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* Southeast Asia */}
                  <path
                    d="M265 70 L295 65 L300 90 L280 95 L265 85 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* Australia */}
                  <path
                    d="M270 115 L310 110 L320 135 L305 150 L270 148 L260 135 Z"
                    fill="oklch(0.24 0.06 260)"
                    stroke="oklch(0.30 0.06 260)"
                    strokeWidth="0.8"
                  />
                  {/* Region dots */}
                  {[
                    { cx: 60, cy: 52, region: "North America" },
                    { cx: 78, cy: 115, region: "Latin America" },
                    { cx: 170, cy: 35, region: "Europe" },
                    { cx: 178, cy: 90, region: "Africa" },
                    { cx: 245, cy: 45, region: "Asia Pacific" },
                    { cx: 210, cy: 115, region: "South Asia" },
                    { cx: 290, cy: 130, region: "Oceania" },
                    { cx: 195, cy: 55, region: "Middle East" },
                  ].map(({ cx, cy, region }) => (
                    <circle
                      key={region}
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill="oklch(var(--gold))"
                      opacity="0.85"
                      style={{
                        filter: "drop-shadow(0 0 4px oklch(var(--gold)))",
                      }}
                    />
                  ))}
                </svg>
                <p
                  className="text-center text-xs py-2"
                  style={{ color: "oklch(0.48 0.04 260)" }}
                >
                  🌍 Interactive global adoption map — coming soon
                </p>
              </div>
            </section>

            {/* SDGs */}
            <section>
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "oklch(0.72 0.16 195)" }}
              >
                SDG Alignment
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {solution.sdgs.map((sdg) => (
                  <span
                    key={sdg}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.6 0.14 195 / 0.12)",
                      color: "oklch(0.72 0.16 195)",
                      border: "1px solid oklch(0.6 0.14 195 / 0.3)",
                    }}
                  >
                    {sdg.replace("sdg", "SDG ")}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
        <div
          className="flex flex-col sm:flex-row gap-2 p-4"
          style={{
            borderTop: "1px solid oklch(0.22 0.04 260)",
            background: "oklch(var(--cosmos-deep))",
          }}
        >
          <button
            type="button"
            data-ocid="solutions.detail.submit_adaptation_button"
            className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all"
            style={{
              border: "1px solid oklch(var(--gold) / 0.5)",
              color: "oklch(var(--gold))",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(var(--gold) / 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
            onClick={() =>
              toast.success("Adaptation request submitted!", {
                description:
                  "Your adaptation request has been submitted. The council will follow up within 5 business days.",
              })
            }
          >
            Submit Adaptation
          </button>
          <button
            type="button"
            data-ocid="solutions.detail.request_license_button"
            className="flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(0.12 0.04 260)",
              border: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
            onClick={() =>
              toast.success("License request received!", {
                description:
                  "Your FinFracFran™ license request is under review. A council representative will contact you within 5 business days.",
              })
            }
          >
            Request License
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Submit Dialog ────────────────────────────────────────────────────────────

function SubmitDialog({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tagline, setTagline] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const valid =
    title.length >= 5 &&
    category &&
    tagline.length >= 10 &&
    problem.length >= 20;

  async function handleSubmit() {
    if (!valid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    toast.success(
      "Solution submitted for review! Our AI Policy Advisor will analyse it within 24 hours.",
    );
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  }

  function handleClose() {
    if (!loading) {
      setTitle("");
      setCategory("");
      setTagline("");
      setProblem("");
      setSuccess(false);
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="solutions.submit.dialog"
        className="max-w-lg"
        style={{
          background: "oklch(var(--cosmos-mid))",
          border: "1px solid oklch(0.26 0.04 260)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-lg font-bold"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Submit a Solution
          </DialogTitle>
          <p className="text-sm" style={{ color: "oklch(0.6 0.04 260)" }}>
            Share a proven local solution for global impact. Our AI Policy
            Advisor will analyse alignment, scalability, and FinFracFran™
            potential.
          </p>
        </DialogHeader>

        {success ? (
          <motion.div
            data-ocid="solutions.submit.success_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.72 0.18 140 / 0.15)" }}
            >
              <Sparkles
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 140)" }}
              />
            </div>
            <p
              className="font-semibold"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Solution Submitted!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label
                className="text-xs font-semibold mb-1.5 block"
                style={{ color: "oklch(0.72 0.06 260)" }}
              >
                Solution Title *
              </Label>
              <Input
                data-ocid="solutions.submit.title.input"
                placeholder="e.g. Community Solar Microgrids"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.26 0.04 260)",
                  color: "oklch(var(--pearl))",
                }}
              />
            </div>

            <div>
              <Label
                className="text-xs font-semibold mb-1.5 block"
                style={{ color: "oklch(0.72 0.06 260)" }}
              >
                Category *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  data-ocid="solutions.submit.category.select"
                  style={{
                    background: "oklch(0.14 0.04 260)",
                    border: "1px solid oklch(0.26 0.04 260)",
                    color: "oklch(var(--pearl))",
                  }}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(var(--cosmos-mid))",
                    border: "1px solid oklch(0.26 0.04 260)",
                  }}
                >
                  {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {cfg.icon} {cfg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                className="text-xs font-semibold mb-1.5 block"
                style={{ color: "oklch(0.72 0.06 260)" }}
              >
                Tagline *
              </Label>
              <Textarea
                data-ocid="solutions.submit.tagline.textarea"
                placeholder="One sentence describing your solution's impact"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                rows={2}
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.26 0.04 260)",
                  color: "oklch(var(--pearl))",
                }}
              />
            </div>

            <div>
              <Label
                className="text-xs font-semibold mb-1.5 block"
                style={{ color: "oklch(0.72 0.06 260)" }}
              >
                Problem Statement *
              </Label>
              <Textarea
                data-ocid="solutions.submit.problem.textarea"
                placeholder="Describe the problem this solution addresses, who it affects, and why existing approaches fall short"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={4}
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.26 0.04 260)",
                  color: "oklch(var(--pearl))",
                }}
              />
            </div>
          </div>
        )}

        {!success && (
          <DialogFooter className="gap-2">
            <Button
              data-ocid="solutions.submit.cancel_button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              style={{
                borderColor: "oklch(0.28 0.04 260)",
                color: "oklch(0.6 0.04 260)",
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="solutions.submit.submit_button"
              onClick={handleSubmit}
              disabled={!valid || loading}
              className="btn-gold"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Solution"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function SolutionsPage() {
  const {
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
  } = useSolutions();

  // Debounced search
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearchInput(val);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(
        () => updateFilter("search", val),
        300,
      );
    },
    [updateFilter],
  );

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 35%, oklch(0.72 0.16 75 / 0.09) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 20% 75%, oklch(0.6 0.14 195 / 0.07) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 35% 30% at 80% 20%, oklch(0.68 0.18 140 / 0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 flex-wrap mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
              style={{
                borderColor: "oklch(var(--gold) / 0.3)",
                background: "oklch(var(--gold) / 0.07)",
              }}
            >
              <Zap
                className="h-3.5 w-3.5"
                style={{ color: "oklch(var(--gold))" }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "oklch(var(--gold))" }}
              >
                Phase 3
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
              style={{
                borderColor: "oklch(0.6 0.14 195 / 0.3)",
                background: "oklch(0.6 0.14 195 / 0.07)",
              }}
            >
              <Lightbulb
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.72 0.16 195)" }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "oklch(0.72 0.16 195)" }}
              >
                Solutions Exchange
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            <span className="gold-gradient-text">
              NewWaysNow Solutions Exchange
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.65 0.04 260)" }}
          >
            Local solutions.{" "}
            <span style={{ color: "oklch(var(--gold))" }}>Global impact.</span>{" "}
            Proven results — scaled through{" "}
            <span style={{ color: "oklch(0.72 0.16 195)" }}>FinFracFran™</span>{" "}
            to every corner of the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-14"
          >
            <Button
              data-ocid="solutions.submit_solution.button"
              className="btn-gold gap-2"
              onClick={() => setSubmitOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              Submit a Solution
            </Button>
            <a href="#solutions-grid">
              <Button
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.28 0.04 260)",
                  color: "oklch(0.72 0.06 260)",
                }}
              >
                Browse All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <AnimatedStat value={stats.total} label="Solutions" />
            <AnimatedStat
              value={stats.totalNationsAdopting}
              label="Nations Adopting"
            />
            <AnimatedStat
              value={stats.avgAiScore}
              label="Avg AI Score"
              suffix="/100"
            />
            <AnimatedStat
              value={stats.finFracFranAvailable}
              label="FinFracFran™ Ready"
            />
          </motion.div>
        </div>
      </section>

      {/* Gradient divider */}
      <div
        className="h-px mx-auto"
        style={{
          maxWidth: "240px",
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.35), oklch(var(--teal) / 0.3), transparent)",
        }}
      />

      {/* ── Category Tabs ── */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {/* All tab */}
            <button
              type="button"
              data-ocid="solutions.category.tab"
              onClick={() => updateFilter("category", "all")}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                filters.category === "all"
                  ? {
                      background: "oklch(var(--gold) / 0.18)",
                      color: "oklch(var(--gold))",
                      border: "1px solid oklch(var(--gold) / 0.4)",
                    }
                  : {
                      background: "oklch(0.16 0.04 260)",
                      color: "oklch(0.55 0.04 260)",
                      border: "1px solid oklch(0.22 0.04 260)",
                    }
              }
            >
              All ({stats.total})
            </button>

            {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
              const count = stats.byCategory[key] ?? 0;
              const isActive = filters.category === key;
              return (
                <button
                  type="button"
                  key={key}
                  data-ocid="solutions.category.tab"
                  onClick={() =>
                    updateFilter("category", key as SolutionCategory)
                  }
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: `${cfg.bgColor}`,
                          color: cfg.color,
                          border: `1px solid ${cfg.color}66`,
                        }
                      : {
                          background: "oklch(0.16 0.04 260)",
                          color: "oklch(0.55 0.04 260)",
                          border: "1px solid oklch(0.22 0.04 260)",
                        }
                  }
                >
                  {cfg.icon} {cfg.label} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="pb-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.5 0.04 260)" }}
              />
              <Input
                data-ocid="solutions.search_input"
                placeholder="Search solutions…"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 text-sm"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.24 0.04 260)",
                  color: "oklch(var(--pearl))",
                }}
              />
            </div>

            {/* Stage */}
            <Select
              value={filters.stage}
              onValueChange={(v) =>
                updateFilter("stage", v as SolutionFilters["stage"])
              }
            >
              <SelectTrigger
                data-ocid="solutions.stage.select"
                className="w-36 text-sm"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.24 0.04 260)",
                  color: "oklch(0.72 0.06 260)",
                }}
              >
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(var(--cosmos-mid))",
                  border: "1px solid oklch(0.26 0.04 260)",
                }}
              >
                <SelectItem
                  value="all"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  All Stages
                </SelectItem>
                {Object.entries(STAGE_CONFIG).map(([key, cfg]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    style={{ color: cfg.color }}
                  >
                    {cfg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region */}
            <Select
              value={filters.region}
              onValueChange={(v) =>
                updateFilter("region", v as SolutionFilters["region"])
              }
            >
              <SelectTrigger
                data-ocid="solutions.region.select"
                className="w-40 text-sm"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.24 0.04 260)",
                  color: "oklch(0.72 0.06 260)",
                }}
              >
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(var(--cosmos-mid))",
                  border: "1px solid oklch(0.26 0.04 260)",
                }}
              >
                <SelectItem
                  value="all"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  All Regions
                </SelectItem>
                {Object.entries(REGION_LABELS).map(([key, label]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={filters.sort}
              onValueChange={(v) =>
                updateFilter("sort", v as SolutionFilters["sort"])
              }
            >
              <SelectTrigger
                data-ocid="solutions.sort.select"
                className="w-44 text-sm"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.24 0.04 260)",
                  color: "oklch(0.72 0.06 260)",
                }}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(var(--cosmos-mid))",
                  border: "1px solid oklch(0.26 0.04 260)",
                }}
              >
                <SelectItem
                  value="ai_score"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Highest AI Score
                </SelectItem>
                <SelectItem
                  value="newest"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Newest
                </SelectItem>
                <SelectItem
                  value="adoptions"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Most Adoptions
                </SelectItem>
                <SelectItem
                  value="equity_impact"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Equity Impact
                </SelectItem>
              </SelectContent>
            </Select>

            {/* FinFracFran toggle */}
            <div className="flex items-center gap-2">
              <Switch
                data-ocid="solutions.finfracfran.toggle"
                checked={filters.finFracFranOnly}
                onCheckedChange={(v) => updateFilter("finFracFranOnly", v)}
                style={
                  filters.finFracFranOnly
                    ? { background: "oklch(var(--gold))" }
                    : undefined
                }
              />
              <span
                className="text-xs font-semibold"
                style={{
                  color: filters.finFracFranOnly
                    ? "oklch(var(--gold))"
                    : "oklch(0.5 0.04 260)",
                }}
              >
                FinFracFran™ only
              </span>
            </div>

            {/* Active filter count + clear */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.button
                  data-ocid="solutions.clear_filters.button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{
                    background: "oklch(0.65 0.12 27 / 0.12)",
                    color: "oklch(0.75 0.14 30)",
                    border: "1px solid oklch(0.65 0.12 27 / 0.3)",
                  }}
                >
                  <X className="h-3 w-3" />
                  Clear {activeFilterCount} filter
                  {activeFilterCount > 1 ? "s" : ""}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Solutions Grid ── */}
      <section id="solutions-grid" className="pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Result count */}
          <div className="flex items-center gap-2 mb-6">
            <BarChart2
              className="h-4 w-4"
              style={{ color: "oklch(0.5 0.04 260)" }}
            />
            <span className="text-sm" style={{ color: "oklch(0.55 0.04 260)" }}>
              <span
                className="font-semibold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {filteredSolutions.length}
              </span>{" "}
              solution{filteredSolutions.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {filteredSolutions.length === 0 ? (
            <motion.div
              data-ocid="solutions.empty_state"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-5 py-24 text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.16 0.04 260)",
                  border: "1px solid oklch(0.24 0.04 260)",
                }}
              >
                <Search
                  className="h-9 w-9"
                  style={{ color: "oklch(0.35 0.04 260)" }}
                />
              </div>
              <div>
                <p
                  className="font-display font-bold text-lg mb-1"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  No solutions match your filters
                </p>
                <p className="text-sm" style={{ color: "oklch(0.5 0.04 260)" }}>
                  Try broadening your search or clearing filters
                </p>
              </div>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="gap-2"
                style={{
                  borderColor: "oklch(var(--gold) / 0.3)",
                  color: "oklch(var(--gold))",
                }}
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSolutions.map((solution, idx) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  index={idx + 1}
                  onViewDetail={openDetail}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Detail Sheet ── */}
      <DetailSheet
        solution={selectedSolution}
        open={detailOpen}
        onClose={closeDetail}
      />

      {/* ── Submit Dialog ── */}
      <SubmitDialog open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </main>
  );
}
