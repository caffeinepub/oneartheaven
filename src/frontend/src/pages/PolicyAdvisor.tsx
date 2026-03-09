import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { COUNCILS } from "@/data/assemblyData";
import type {
  CouncilId,
  PolicyAnalysis,
  RecommendationType,
} from "@/data/policyAdvisorTypes";
import {
  RECOMMENDATION_CONFIG,
  RISK_LEVEL_CONFIG,
} from "@/data/policyAdvisorTypes";
import { usePolicyAdvisor } from "@/hooks/usePolicyAdvisor";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Globe2,
  History,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Tag,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 90) return "oklch(0.68 0.2 145)";
  if (score >= 75) return "oklch(0.55 0.18 200)";
  if (score >= 60) return "oklch(0.78 0.18 85)";
  return "oklch(0.62 0.22 25)";
}

function ScoreGauge({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md" | "lg";
}) {
  const color = scoreColor(score);
  const sizes = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" };
  return (
    <div className="flex flex-col items-center">
      <span
        className={`font-display font-bold ${sizes[size]}`}
        style={{ color }}
      >
        {score}
      </span>
      <span className="text-xs" style={{ color: "oklch(0.48 0.04 260)" }}>
        / 100
      </span>
    </div>
  );
}

function RecommendationBadge({ rec }: { rec: RecommendationType }) {
  const cfg = RECOMMENDATION_CONFIG[rec];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  color,
  delay,
}: {
  value: string | number;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <span
        className="font-display text-3xl sm:text-4xl font-bold"
        style={{ color }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
      <span
        className="text-xs sm:text-sm font-medium mt-1 tracking-wide text-center"
        style={{ color: "oklch(0.62 0.04 260)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Analysis Card ────────────────────────────────────────────────────────────

function AnalysisCard({
  analysis,
  index,
  onOpen,
}: {
  analysis: PolicyAnalysis;
  index: number;
  onOpen: (id: string) => void;
}) {
  // recommendation config used via RecommendationBadge component
  const topRisks = analysis.riskFlags.slice(0, 2);

  return (
    <motion.article
      data-ocid={`policy-advisor.analysis.item.${index + 1}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-250 flex flex-col"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.18 0.03 260)",
        boxShadow: "0 2px 12px oklch(0.05 0.02 260 / 0.5)",
      }}
      onClick={() => onOpen(analysis.id)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${analysis.councilColor.replace("oklch(", "oklch(").replace(")", " / 0.05)")} 0%, transparent 70%)`,
        }}
      />

      {/* Top row: council + recommendation */}
      <div className="flex items-start gap-2 mb-3 flex-wrap">
        <span
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            color: analysis.councilColor,
            background: analysis.councilColor.replace(")", " / 0.12)"),
            border: `1px solid ${analysis.councilColor.replace(")", " / 0.28)")}`,
          }}
        >
          {analysis.councilName}
        </span>
        <div className="ml-auto">
          <RecommendationBadge rec={analysis.recommendation} />
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-base leading-snug mb-3 group-hover:text-[oklch(var(--gold))] transition-colors duration-200"
        style={{ color: "oklch(0.92 0.02 260)" }}
      >
        {analysis.proposalTitle}
      </h3>

      {/* Score + key strength */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center"
          style={{
            background: `${scoreColor(analysis.alignmentScore).replace(")", " / 0.08)")}`,
            border: `1px solid ${scoreColor(analysis.alignmentScore).replace(")", " / 0.2)")}`,
          }}
        >
          <ScoreGauge score={analysis.alignmentScore} size="sm" />
          <span
            className="text-[10px] mt-0.5"
            style={{ color: "oklch(0.45 0.04 260)" }}
          >
            Charter
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-xs leading-relaxed line-clamp-3"
            style={{ color: "oklch(0.60 0.04 260)" }}
          >
            {analysis.keyStrengths[0]}
          </p>
        </div>
      </div>

      {/* Risk flags */}
      {topRisks.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-4">
          {topRisks.map((risk) => {
            const rCfg = RISK_LEVEL_CONFIG[risk.severity];
            return (
              <div key={risk.id} className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold shrink-0"
                  style={{
                    color: rCfg.color,
                    background: rCfg.bg,
                    border: `1px solid ${rCfg.border}`,
                  }}
                >
                  <AlertTriangle className="h-2.5 w-2.5" />
                  {rCfg.label}
                </span>
                <span
                  className="text-xs truncate"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {risk.title}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-2 mt-auto pt-2 flex-wrap">
        {analysis.finFracFran.applicable && (
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded"
            style={{
              color: "oklch(0.72 0.18 85)",
              background: "oklch(0.72 0.18 85 / 0.1)",
              border: "1px solid oklch(0.72 0.18 85 / 0.25)",
            }}
          >
            FinFracFran™
          </span>
        )}
        <span className="text-[10px]" style={{ color: "oklch(0.42 0.04 260)" }}>
          {new Date(analysis.analyzedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <Button
          data-ocid={`policy-advisor.view_analysis.button.${index + 1}`}
          size="sm"
          className="ml-auto gap-1.5 text-xs h-7 px-3"
          style={{
            background: "oklch(var(--gold) / 0.1)",
            color: "oklch(var(--gold))",
            border: "1px solid oklch(var(--gold) / 0.25)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(analysis.id);
          }}
        >
          View Full Analysis
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </motion.article>
  );
}

// ─── Analysis Detail Sheet ────────────────────────────────────────────────────

function AnalysisDetailSheet({
  analysis,
  open,
  onClose,
}: {
  analysis: PolicyAnalysis | null | undefined;
  open: boolean;
  onClose: () => void;
}) {
  if (!analysis) return null;
  const recCfg = RECOMMENDATION_CONFIG[analysis.recommendation];

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        data-ocid="policy-advisor.detail.sheet"
        side="right"
        className="w-full sm:max-w-2xl p-0 flex flex-col"
        style={{
          background: "oklch(0.09 0.025 260)",
          border: "1px solid oklch(0.18 0.03 260)",
        }}
      >
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 sm:p-8">
            {/* Sheet Header */}
            <SheetHeader className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        color: analysis.councilColor,
                        background: analysis.councilColor.replace(
                          ")",
                          " / 0.12)",
                        ),
                        border: `1px solid ${analysis.councilColor.replace(")", " / 0.28)")}`,
                      }}
                    >
                      {analysis.councilName}
                    </span>
                    <RecommendationBadge rec={analysis.recommendation} />
                  </div>
                  <SheetTitle
                    className="font-display text-xl font-bold leading-snug text-left"
                    style={{ color: "oklch(0.95 0.02 260)" }}
                  >
                    {analysis.proposalTitle}
                  </SheetTitle>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span
                      className="text-xs flex items-center gap-1"
                      style={{ color: "oklch(0.48 0.04 260)" }}
                    >
                      <Bot className="h-3 w-3" />
                      {analysis.analyzerVersion}
                    </span>
                    <span
                      className="text-xs flex items-center gap-1"
                      style={{ color: "oklch(0.48 0.04 260)" }}
                    >
                      <Clock className="h-3 w-3" />
                      {new Date(analysis.analyzedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-center">
                  <ScoreGauge score={analysis.alignmentScore} size="lg" />
                  <span
                    className="text-[10px] mt-1"
                    style={{ color: "oklch(0.42 0.04 260)" }}
                  >
                    Charter Alignment
                  </span>
                </div>
              </div>
              <Button
                data-ocid="policy-advisor.detail.close_button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 h-8 w-8"
                style={{ color: "oklch(0.5 0.04 260)" }}
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetHeader>

            <Separator
              className="mb-6"
              style={{ background: "oklch(0.18 0.03 260)" }}
            />

            {/* Recommendation Rationale */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2"
                style={{ color: recCfg.color }}
              >
                <Sparkles className="h-4 w-4" />
                Recommendation Rationale
              </h4>
              <blockquote
                className="rounded-xl p-4 text-sm leading-relaxed"
                style={{
                  background: `${recCfg.color.replace(")", " / 0.06)")}`,
                  borderLeft: `3px solid ${recCfg.color}`,
                  color: "oklch(0.78 0.03 260)",
                }}
              >
                {analysis.recommendationRationale}
              </blockquote>
            </section>

            {/* Charter Alignment Breakdown */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "oklch(var(--gold))" }}
              >
                <Shield className="h-4 w-4" />
                Charter Alignment Breakdown
              </h4>
              <div className="flex flex-col gap-3">
                {analysis.charterAlignment.articles.map((art) => (
                  <div key={art.articleId}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "oklch(0.72 0.03 260)" }}
                      >
                        {art.articleTitle}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: scoreColor(art.score) }}
                      >
                        {art.score}/100
                      </span>
                    </div>
                    <Progress
                      value={art.score}
                      className="h-1.5"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                      }}
                    />
                    <p
                      className="text-[11px] mt-1"
                      style={{ color: "oklch(0.48 0.04 260)" }}
                    >
                      {art.notes}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Risk Flags */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.72 0.22 45)" }}
              >
                <AlertTriangle className="h-4 w-4" />
                Risk Flags ({analysis.riskFlags.length})
              </h4>
              <div className="flex flex-col gap-3">
                {analysis.riskFlags.map((risk) => {
                  const rCfg = RISK_LEVEL_CONFIG[risk.severity];
                  return (
                    <div
                      key={risk.id}
                      className="rounded-xl p-4"
                      style={{
                        background: rCfg.bg,
                        border: `1px solid ${rCfg.border}`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{
                            color: rCfg.color,
                            background: rCfg.bg,
                            border: `1px solid ${rCfg.border}`,
                          }}
                        >
                          {rCfg.label}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] py-0"
                          style={{
                            borderColor: "oklch(0.25 0.04 260)",
                            color: "oklch(0.55 0.04 260)",
                          }}
                        >
                          {risk.category}
                        </Badge>
                      </div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{ color: rCfg.color }}
                      >
                        {risk.title}
                      </p>
                      <p
                        className="text-xs mb-2"
                        style={{ color: "oklch(0.65 0.03 260)" }}
                      >
                        {risk.description}
                      </p>
                      <p
                        className="text-xs italic"
                        style={{ color: "oklch(0.55 0.06 145)" }}
                      >
                        Mitigation: {risk.mitigation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Unintended Consequences */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.65 0.1 270)" }}
              >
                <Zap className="h-4 w-4" />
                Unintended Consequences
              </h4>
              <div className="flex flex-col gap-3">
                {analysis.unintendedConsequences.map((uc) => (
                  <div
                    key={uc.id}
                    className="rounded-xl p-4"
                    style={{
                      background: "oklch(0.12 0.03 270 / 0.5)",
                      border: "1px solid oklch(0.65 0.1 270 / 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: "oklch(0.65 0.1 270)" }}
                      >
                        Likelihood: {uc.likelihood}
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        ·
                      </span>
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: "oklch(0.65 0.1 270)" }}
                      >
                        Impact: {uc.impact}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: "oklch(0.82 0.03 260)" }}
                    >
                      {uc.title}
                    </p>
                    <div className="flex items-center gap-1 mb-2 flex-wrap">
                      <MapPin
                        className="h-3 w-3"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      />
                      {uc.affectedRegions.map((r) => (
                        <span
                          key={r}
                          className="text-[10px]"
                          style={{ color: "oklch(0.52 0.04 260)" }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                    <p
                      className="text-xs italic"
                      style={{ color: "oklch(0.55 0.06 145)" }}
                    >
                      Prevention: {uc.preventionNote}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Historical Precedents */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.55 0.18 200)" }}
              >
                <History className="h-4 w-4" />
                Historical Precedents
              </h4>
              <div className="flex flex-col gap-3">
                {analysis.precedents.map((prec) => {
                  const outcomeColor =
                    prec.outcome === "success"
                      ? "oklch(0.68 0.2 145)"
                      : prec.outcome === "failure"
                        ? "oklch(0.62 0.22 25)"
                        : "oklch(0.78 0.18 85)";
                  return (
                    <div
                      key={prec.id}
                      className="rounded-xl p-4"
                      style={{
                        background: "oklch(0.11 0.03 200 / 0.4)",
                        border: "1px solid oklch(0.55 0.18 200 / 0.2)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "oklch(0.88 0.02 260)" }}
                          >
                            {prec.title}
                          </p>
                          <p
                            className="text-[11px]"
                            style={{ color: "oklch(0.52 0.04 260)" }}
                          >
                            {prec.organization} · {prec.year} · {prec.region}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded capitalize"
                            style={{
                              color: outcomeColor,
                              background: outcomeColor.replace(")", " / 0.1)"),
                              border: `1px solid ${outcomeColor.replace(")", " / 0.25)")}`,
                            }}
                          >
                            {prec.outcome}
                          </span>
                          <span
                            className="text-[10px]"
                            style={{ color: "oklch(0.55 0.18 200)" }}
                          >
                            {prec.relevanceScore}% relevant
                          </span>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-1">
                        {prec.keyLessons.map((lesson) => (
                          <li
                            key={lesson}
                            className="text-xs flex items-start gap-1.5"
                            style={{ color: "oklch(0.62 0.04 260)" }}
                          >
                            <span style={{ color: "oklch(0.55 0.18 200)" }}>
                              ›
                            </span>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FinFracFran Assessment */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.72 0.18 85)" }}
              >
                <Globe2 className="h-4 w-4" />
                FinFracFran™ Assessment
              </h4>
              {analysis.finFracFran.applicable ? (
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "oklch(0.72 0.18 85 / 0.06)",
                    border: "1px solid oklch(0.72 0.18 85 / 0.2)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.52 0.04 260)" }}
                      >
                        Franchisability Score
                      </span>
                      <p
                        className="font-display text-2xl font-bold"
                        style={{ color: "oklch(0.72 0.18 85)" }}
                      >
                        {analysis.finFracFran.franchisabilityScore}
                        <span
                          className="text-sm font-normal"
                          style={{ color: "oklch(0.45 0.04 260)" }}
                        >
                          /100
                        </span>
                      </p>
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-xs font-semibold mb-1"
                        style={{ color: "oklch(0.72 0.03 260)" }}
                      >
                        Recommended Model
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.58 0.04 260)" }}
                      >
                        {analysis.finFracFran.recommendedModel}
                      </p>
                    </div>
                  </div>
                  {analysis.finFracFran.fractionalizationOpportunities && (
                    <div className="mb-3">
                      <p
                        className="text-xs font-semibold mb-1.5"
                        style={{ color: "oklch(0.68 0.03 260)" }}
                      >
                        Fractionalization Opportunities
                      </p>
                      <ul className="flex flex-col gap-1">
                        {analysis.finFracFran.fractionalizationOpportunities.map(
                          (opp) => (
                            <li
                              key={opp}
                              className="text-xs flex items-start gap-1.5"
                              style={{ color: "oklch(0.60 0.04 260)" }}
                            >
                              <span style={{ color: "oklch(0.72 0.18 85)" }}>
                                ◈
                              </span>
                              {opp}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {analysis.finFracFran.pilotRecommendation && (
                    <p
                      className="text-xs italic"
                      style={{ color: "oklch(0.55 0.06 145)" }}
                    >
                      Pilot: {analysis.finFracFran.pilotRecommendation}
                    </p>
                  )}
                  {analysis.finFracFran.adoptionBarriers &&
                    analysis.finFracFran.adoptionBarriers.length > 0 && (
                      <div className="mt-2">
                        <p
                          className="text-[10px] font-semibold mb-1"
                          style={{ color: "oklch(0.62 0.22 25)" }}
                        >
                          Adoption Barriers
                        </p>
                        <ul className="flex flex-col gap-1">
                          {analysis.finFracFran.adoptionBarriers.map((b) => (
                            <li
                              key={b}
                              className="text-xs flex items-start gap-1.5"
                              style={{ color: "oklch(0.55 0.04 260)" }}
                            >
                              <span style={{ color: "oklch(0.62 0.22 25)" }}>
                                ·
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.48 0.04 260)" }}
                >
                  Not applicable for this proposal type.
                </p>
              )}
            </section>

            {/* Strengths & Weaknesses */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4"
                style={{ color: "oklch(0.72 0.03 260)" }}
              >
                Key Findings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "oklch(0.68 0.2 145 / 0.06)",
                    border: "1px solid oklch(0.68 0.2 145 / 0.2)",
                  }}
                >
                  <p
                    className="text-xs font-bold mb-2 flex items-center gap-1"
                    style={{ color: "oklch(0.68 0.2 145)" }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Strengths
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {analysis.keyStrengths.map((s) => (
                      <li
                        key={s}
                        className="text-xs flex items-start gap-1.5"
                        style={{ color: "oklch(0.65 0.04 260)" }}
                      >
                        <span style={{ color: "oklch(0.68 0.2 145)" }}>✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "oklch(0.78 0.18 85 / 0.06)",
                    border: "1px solid oklch(0.78 0.18 85 / 0.2)",
                  }}
                >
                  <p
                    className="text-xs font-bold mb-2 flex items-center gap-1"
                    style={{ color: "oklch(0.78 0.18 85)" }}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Weaknesses
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {analysis.keyWeaknesses.map((w) => (
                      <li
                        key={w}
                        className="text-xs flex items-start gap-1.5"
                        style={{ color: "oklch(0.65 0.04 260)" }}
                      >
                        <span style={{ color: "oklch(0.78 0.18 85)" }}>⚠</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Suggested Amendments */}
            <section className="mb-8">
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.55 0.18 200)" }}
              >
                <Tag className="h-4 w-4" />
                Suggested Amendments
              </h4>
              <ol className="flex flex-col gap-2">
                {analysis.suggestedAmendments.map((amendment, i) => (
                  <li
                    key={String(i) + amendment.slice(0, 20)}
                    className="flex items-start gap-3 rounded-xl p-3"
                    style={{
                      background: "oklch(0.55 0.18 200 / 0.05)",
                      border: "1px solid oklch(0.55 0.18 200 / 0.15)",
                    }}
                  >
                    <span
                      className="shrink-0 font-display font-bold text-sm w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                      style={{
                        background: "oklch(0.55 0.18 200 / 0.15)",
                        color: "oklch(0.55 0.18 200)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.68 0.03 260)" }}
                    >
                      {amendment}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Bottom metadata */}
            <div
              className="rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
              style={{
                background: "oklch(0.12 0.025 260)",
                border: "1px solid oklch(0.2 0.03 260)",
              }}
            >
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Globe2
                    className="h-3 w-3"
                    style={{ color: "oklch(0.55 0.18 200)" }}
                  />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0.04 260)" }}
                  >
                    Scope
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.72 0.03 260)" }}
                >
                  {analysis.impactScope}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign
                    className="h-3 w-3"
                    style={{ color: "oklch(0.68 0.2 145)" }}
                  />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0.04 260)" }}
                  >
                    Cost Est.
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.72 0.03 260)" }}
                >
                  {analysis.estimatedCost}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Clock
                    className="h-3 w-3"
                    style={{ color: "oklch(0.78 0.18 85)" }}
                  />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0.04 260)" }}
                  >
                    Timeline
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.72 0.03 260)" }}
                >
                  {analysis.timeToImplement}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Tag
                    className="h-3 w-3"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                  />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0.04 260)" }}
                  >
                    SDGs
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {analysis.sdgTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{
                        color: "oklch(0.72 0.16 75)",
                        background: "oklch(0.72 0.16 75 / 0.1)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// ─── Policy Advisor Page ──────────────────────────────────────────────────────

export function PolicyAdvisorPage() {
  const advisor = usePolicyAdvisor();

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="policy-advisor.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        {/* Background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 35%, oklch(0.72 0.16 75 / 0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 20% 70%, oklch(0.55 0.18 200 / 0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Phase badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8 flex-wrap"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
              style={{
                borderColor: "oklch(var(--gold) / 0.3)",
                background: "oklch(var(--gold) / 0.07)",
              }}
            >
              <Bot
                className="h-3.5 w-3.5"
                style={{ color: "oklch(var(--gold))" }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "oklch(var(--gold))" }}
              >
                Phase 2.4 — AI Policy Advisor
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                borderColor: "oklch(0.55 0.18 200 / 0.3)",
                background: "oklch(0.55 0.18 200 / 0.07)",
              }}
            >
              <Sparkles
                className="h-3 w-3"
                style={{ color: "oklch(0.55 0.18 200)" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "oklch(0.55 0.18 200)" }}
              >
                Powered by ONEartHeaven AI v2.1
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.94 0.06 85) 0%, oklch(0.82 0.18 75) 40%, oklch(0.72 0.16 75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Policy Advisor
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ color: "oklch(0.68 0.04 260)" }}
          >
            Every proposal analyzed for{" "}
            <span style={{ color: "oklch(var(--gold))" }}>
              Charter alignment
            </span>
            , <span style={{ color: "oklch(0.62 0.22 25)" }}>risk</span>,{" "}
            <span style={{ color: "oklch(0.55 0.18 200)" }}>precedent</span>,
            and{" "}
            <span style={{ color: "oklch(0.72 0.18 85)" }}>
              FinFracFran™ applicability
            </span>{" "}
            before it reaches a vote.
          </motion.p>

          {/* UN comparison note */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="inline-flex items-start gap-3 px-5 py-3 rounded-xl mb-10 text-left max-w-2xl mx-auto"
            style={{
              background: "oklch(0.12 0.03 260)",
              border: "1px solid oklch(0.22 0.04 260)",
            }}
          >
            <Bot
              className="h-4 w-4 shrink-0 mt-0.5"
              style={{ color: "oklch(var(--gold))" }}
            />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.58 0.04 260)" }}
            >
              Unlike the UN where proposals are voted on with minimal
              independent analysis, every ONEartHeaven proposal receives a
              comprehensive AI audit — risk-flagged, precedent-matched, and
              Charter-scored — before deliberation begins.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-14"
          >
            <StatCard
              value={advisor.stats.total}
              label="Analyses Completed"
              color="oklch(0.72 0.16 75)"
              delay={0.5}
            />
            <StatCard
              value={advisor.stats.avgScore}
              label="Avg Alignment Score"
              color="oklch(0.68 0.2 145)"
              delay={0.55}
            />
            <StatCard
              value={advisor.stats.approved}
              label="Approved / Conditional"
              color="oklch(0.55 0.18 200)"
              delay={0.6}
            />
            <StatCard
              value={advisor.stats.criticalFlags}
              label="Critical Risk Flags"
              color="oklch(0.62 0.22 25)"
              delay={0.65}
            />
          </motion.div>
        </div>
      </section>

      {/* Gradient separator */}
      <div
        className="h-px mx-auto mb-12"
        style={{
          maxWidth: "240px",
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.35), oklch(0.55 0.18 200 / 0.3), transparent)",
        }}
      />

      {/* ── Filter Bar + Cards ── */}
      <section data-ocid="policy-advisor.analyses.section" className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Filter bar */}
          <div
            className="rounded-2xl p-4 sm:p-5 mb-8"
            style={{
              background: "oklch(0.11 0.025 260)",
              border: "1px solid oklch(0.18 0.03 260)",
            }}
          >
            {/* Search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.45 0.04 260)" }}
              />
              <Input
                data-ocid="policy-advisor.search_input"
                placeholder="Search analyses by proposal title, council, or keywords…"
                value={advisor.filters.search}
                onChange={(e) => advisor.updateFilter("search", e.target.value)}
                className="pl-9 bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.85_0.02_260)] placeholder:text-[oklch(0.42_0.04_260)] focus-visible:ring-[oklch(var(--gold)/0.4)]"
              />
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {/* Recommendation filter */}
              <Select
                value={advisor.filters.recommendation}
                onValueChange={(v) =>
                  advisor.updateFilter(
                    "recommendation",
                    v as RecommendationType | "all",
                  )
                }
              >
                <SelectTrigger
                  data-ocid="policy-advisor.recommendation_filter.select"
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)] text-sm"
                >
                  <SelectValue placeholder="Recommendation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recommendations</SelectItem>
                  <SelectItem value="approve">✓ Approve</SelectItem>
                  <SelectItem value="approve_with_conditions">
                    ◎ Approve with Conditions
                  </SelectItem>
                  <SelectItem value="revise">↺ Revise & Resubmit</SelectItem>
                  <SelectItem value="reject">✗ Reject</SelectItem>
                  <SelectItem value="defer">⏸ Defer</SelectItem>
                </SelectContent>
              </Select>

              {/* Council filter */}
              <Select
                value={advisor.filters.council}
                onValueChange={(v) =>
                  advisor.updateFilter("council", v as CouncilId | "all")
                }
              >
                <SelectTrigger
                  data-ocid="policy-advisor.council_filter.select"
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)] text-sm"
                >
                  <SelectValue placeholder="Council" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Councils</SelectItem>
                  {COUNCILS.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                value={advisor.filters.sort}
                onValueChange={(v) =>
                  advisor.updateFilter(
                    "sort",
                    v as
                      | "highest_score"
                      | "lowest_score"
                      | "newest"
                      | "oldest"
                      | "highest_risk",
                  )
                }
              >
                <SelectTrigger
                  data-ocid="policy-advisor.sort.select"
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)] text-sm"
                >
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest_score">Highest Score</SelectItem>
                  <SelectItem value="lowest_score">Lowest Score</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest_risk">Highest Risk</SelectItem>
                </SelectContent>
              </Select>

              {/* FinFracFran toggle */}
              <div
                className="flex items-center gap-2 px-3 rounded-lg border"
                style={{ borderColor: "oklch(0.22 0.04 260)" }}
              >
                <Switch
                  data-ocid="policy-advisor.finfracfran.toggle"
                  id="fff-toggle"
                  checked={advisor.filters.finFracFranOnly}
                  onCheckedChange={(v) =>
                    advisor.updateFilter("finFracFranOnly", v)
                  }
                />
                <Label
                  htmlFor="fff-toggle"
                  className="text-xs cursor-pointer"
                  style={{ color: "oklch(0.62 0.04 260)" }}
                >
                  FinFracFran™ only
                </Label>
              </div>
            </div>

            {/* Results + clear */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.04 260)" }}
              >
                {advisor.filteredAnalyses.length === advisor.totalCount
                  ? `${advisor.totalCount} analyses`
                  : `${advisor.filteredAnalyses.length} of ${advisor.totalCount}`}
              </span>
              {advisor.activeFilterCount > 0 && (
                <button
                  type="button"
                  data-ocid="policy-advisor.clear_filters.button"
                  onClick={advisor.clearFilters}
                  className="text-xs flex items-center gap-1 transition-colors duration-150"
                  style={{ color: "oklch(0.62 0.22 25)" }}
                >
                  <X className="h-3 w-3" />
                  Clear {advisor.activeFilterCount} filter
                  {advisor.activeFilterCount > 1 ? "s" : ""}
                </button>
              )}
            </div>
          </div>

          {/* Analysis grid */}
          <AnimatePresence mode="wait">
            {advisor.filteredAnalyses.length === 0 ? (
              <motion.div
                key="empty"
                data-ocid="policy-advisor.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Bot
                  className="h-12 w-12 mx-auto mb-4 opacity-20"
                  style={{ color: "oklch(var(--gold))" }}
                />
                <p
                  className="text-lg font-medium mb-2"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  No analyses match your filters
                </p>
                <button
                  type="button"
                  onClick={advisor.clearFilters}
                  className="text-sm underline underline-offset-4"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {advisor.filteredAnalyses.map((analysis, idx) => (
                  <AnalysisCard
                    key={analysis.id}
                    analysis={analysis}
                    index={idx}
                    onOpen={advisor.openDetail}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Back to governance */}
      <div className="pb-12 max-w-6xl mx-auto px-4 sm:px-6">
        <Link to="/governance" data-ocid="policy-advisor.governance.link">
          <Button
            variant="outline"
            className="gap-2"
            style={{
              borderColor: "oklch(var(--gold) / 0.3)",
              color: "oklch(var(--gold))",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Governance Hub
          </Button>
        </Link>
      </div>

      {/* Detail Sheet */}
      <AnalysisDetailSheet
        analysis={advisor.selectedAnalysis}
        open={advisor.detailOpen}
        onClose={advisor.closeDetail}
      />
    </main>
  );
}
