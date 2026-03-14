import { CountUpNumber } from "@/components/CountUpNumber";
import {
  FFInlineBadge,
  FFSpotlightHeader,
  FFTierBadge,
} from "@/components/FFBrand";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AI_DECISION_LOGS,
  FF_DISCLOSURES,
  OPEN_CONTRACTS,
} from "@/data/transparencyData";
import type {
  AIDecisionType,
  AuditSeverity,
  AuditStatus,
  ContractStatus,
  OpenContract,
  VoteOutcome,
} from "@/data/transparencyTypes";
import {
  useAIDecisionLogs,
  useAuditFindings,
  useBudgetLines,
  useFilterState,
  useOpenContracts,
  useTransparencyStats,
  useVotingRecords,
} from "@/hooks/useTransparency";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  ClipboardList,
  Coins,
  Download,
  Eye,
  FileText,
  Flag,
  Loader2,
  Shield,
  Vote,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Council colour map ───────────────────────────────────────────────────────
const COUNCIL_COLORS: Record<string, string> = {
  "Climate & Environment": "oklch(0.65 0.2 140)",
  "Technology & AI": "oklch(0.65 0.18 270)",
  "Global Health": "oklch(0.62 0.18 15)",
  Education: "oklch(0.72 0.16 75)",
  "Peace & Security": "oklch(0.55 0.22 195)",
  "Economy & Finance": "oklch(0.72 0.16 55)",
  "Food & Agriculture": "oklch(0.68 0.18 100)",
  "Governance Reform": "oklch(0.62 0.16 310)",
  "Oceans & Water": "oklch(0.58 0.2 210)",
};

function councilColor(council: string): string {
  return COUNCIL_COLORS[council] ?? "oklch(0.65 0.1 260)";
}

// ─── Severity / status badge helpers ─────────────────────────────────────────
const SEVERITY_COLORS: Record<AuditSeverity, string> = {
  critical: "oklch(0.6 0.22 27)",
  high: "oklch(0.68 0.18 40)",
  medium: "oklch(0.72 0.16 75)",
  low: "oklch(0.65 0.2 140)",
};
const AUDIT_STATUS_LABELS: Record<AuditStatus, string> = {
  open: "Open",
  "in-progress": "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};
const AUDIT_STATUS_COLORS: Record<AuditStatus, string> = {
  open: "oklch(0.6 0.22 27)",
  "in-progress": "oklch(0.72 0.16 75)",
  resolved: "oklch(0.65 0.2 140)",
  closed: "oklch(0.55 0.04 260)",
};

// ─── Vote pill helper ─────────────────────────────────────────────────────────
function VotePill({ vote }: { vote: VoteOutcome }) {
  const map: Record<VoteOutcome, { label: string; color: string; bg: string }> =
    {
      for: {
        label: "For",
        color: "oklch(0.65 0.2 140)",
        bg: "oklch(0.65 0.2 140 / 0.12)",
      },
      against: {
        label: "Against",
        color: "oklch(0.62 0.22 27)",
        bg: "oklch(0.62 0.22 27 / 0.12)",
      },
      abstain: {
        label: "Abstain",
        color: "oklch(0.6 0.04 260)",
        bg: "oklch(0.6 0.04 260 / 0.12)",
      },
    };
  const { label, color, bg } = map[vote];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
      style={{ color, background: bg, border: `1px solid ${color}55` }}
    >
      {label}
    </span>
  );
}

// ─── Budget section ───────────────────────────────────────────────────────────
function BudgetSection() {
  const [category, setCategory] = useFilterState<string>("all");
  const lines = useBudgetLines(category);

  const categories = [
    "all",
    "Programs",
    "Technology",
    "Operations",
    "Outreach",
    "Research",
    "Emergency Reserve",
  ];

  return (
    <section id="budget" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* header */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: "oklch(0.72 0.16 75 / 0.12)",
              border: "1px solid oklch(0.72 0.16 75 / 0.3)",
            }}
          >
            <BarChart3
              className="h-5 w-5"
              style={{ color: "oklch(0.72 0.16 75)" }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Budget Tracker
              </h2>
              <Badge
                className="text-xs font-bold"
                style={{
                  background: "oklch(0.72 0.16 75 / 0.15)",
                  border: "1px solid oklch(0.72 0.16 75 / 0.4)",
                  color: "oklch(0.72 0.16 75)",
                }}
              >
                Phase 6 · C
              </Badge>
            </div>
            <p
              className="text-sm mt-0.5"
              style={{ color: "oklch(0.58 0.04 260)" }}
            >
              FY2025 public budget allocations and spend
            </p>
          </div>
        </div>

        {/* category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background:
                  category === cat
                    ? "oklch(0.72 0.16 75 / 0.18)"
                    : "oklch(0.14 0.04 260)",
                border:
                  category === cat
                    ? "1px solid oklch(0.72 0.16 75 / 0.5)"
                    : "1px solid oklch(0.25 0.04 260)",
                color:
                  category === cat
                    ? "oklch(0.72 0.16 75)"
                    : "oklch(0.58 0.04 260)",
              }}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lines.map((line, idx) => {
            const pct = Math.round((line.spent / line.allocated) * 100);
            const over = pct > 90;
            return (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="rounded-2xl p-5"
                style={{
                  background: "oklch(var(--cosmos-surface) / 0.9)",
                  border: `1px solid ${
                    over
                      ? "oklch(0.6 0.22 27 / 0.4)"
                      : "oklch(var(--gold-dim) / 0.2)"
                  }`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{
                        color: over
                          ? "oklch(0.6 0.22 27)"
                          : "oklch(0.72 0.16 75)",
                      }}
                    >
                      {line.category}
                    </span>
                    <p
                      className="text-sm font-semibold mt-0.5"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {line.council}
                    </p>
                  </div>
                  {line.finFracFranTag && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: "oklch(0.72 0.16 75 / 0.1)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.25)",
                        color: "oklch(0.72 0.16 75)",
                      }}
                    >
                      FF™ {line.finFracFranTag}
                    </span>
                  )}
                </div>
                <p
                  className="text-xs mb-4 leading-relaxed"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {line.description}
                </p>
                <div
                  className="h-1.5 rounded-full mb-2 overflow-hidden"
                  style={{ background: "oklch(0.12 0.03 260)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: over
                        ? "linear-gradient(90deg, oklch(0.68 0.18 40), oklch(0.6 0.22 27))"
                        : "linear-gradient(90deg, oklch(0.55 0.22 195), oklch(0.72 0.16 75))",
                    }}
                  />
                </div>
                <div
                  className="flex justify-between text-xs"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  <span>
                    Spent:{" "}
                    <strong style={{ color: "oklch(var(--pearl))" }}>
                      ${(line.spent / 1e6).toFixed(1)}M
                    </strong>
                  </span>
                  <span>
                    of ${(line.allocated / 1e6).toFixed(1)}M —{" "}
                    <strong
                      style={{
                        color: over
                          ? "oklch(0.6 0.22 27)"
                          : "oklch(0.65 0.2 140)",
                      }}
                    >
                      {pct}%
                    </strong>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Audit section ────────────────────────────────────────────────────────────
function AuditSection() {
  const [status, setStatus] = useFilterState<AuditStatus | "all">("all");
  const [severity, setSeverity] = useFilterState<AuditSeverity | "all">("all");
  const findings = useAuditFindings(status, severity);

  return (
    <section
      id="audit"
      className="py-16"
      style={{ background: "oklch(var(--cosmos-mid) / 0.5)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: "oklch(0.55 0.22 195 / 0.12)",
                border: "1px solid oklch(0.55 0.22 195 / 0.3)",
              }}
            >
              <Shield
                className="h-5 w-5"
                style={{ color: "oklch(0.55 0.22 195)" }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="font-display text-2xl font-bold"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Audit Findings
                </h2>
                <Badge
                  className="text-xs font-bold"
                  style={{
                    background: "oklch(0.55 0.22 195 / 0.15)",
                    border: "1px solid oklch(0.55 0.22 195 / 0.4)",
                    color: "oklch(0.55 0.22 195)",
                  }}
                >
                  {findings.length} finding{findings.length !== 1 ? "s" : ""}
                </Badge>
              </div>
              <p className="text-sm" style={{ color: "oklch(0.58 0.04 260)" }}>
                Published audit results and resolution status
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as AuditStatus | "all")}
            >
              <SelectTrigger
                className="w-36 h-8 text-xs"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.25 0.04 260)",
                  color: "oklch(0.7 0.03 260)",
                }}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.25 0.04 260)",
                }}
              >
                {(
                  ["all", "open", "in-progress", "resolved", "closed"] as const
                ).map((s) => (
                  <SelectItem key={s} value={s} className="text-xs">
                    {s === "all"
                      ? "All Statuses"
                      : AUDIT_STATUS_LABELS[s as AuditStatus]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={severity}
              onValueChange={(v) => setSeverity(v as AuditSeverity | "all")}
            >
              <SelectTrigger
                className="w-36 h-8 text-xs"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.25 0.04 260)",
                  color: "oklch(0.7 0.03 260)",
                }}
              >
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.25 0.04 260)",
                }}
              >
                {(["all", "critical", "high", "medium", "low"] as const).map(
                  (s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="text-xs capitalize"
                    >
                      {s === "all" ? "All Severities" : s}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {findings.map((f, idx) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="rounded-2xl p-5"
              style={{
                background: "oklch(var(--cosmos-surface) / 0.9)",
                border: "1px solid oklch(var(--gold-dim) / 0.2)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-xs font-mono"
                      style={{ color: "oklch(0.45 0.04 260)" }}
                    >
                      {f.id}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
                      style={{
                        background: `${SEVERITY_COLORS[f.severity]}22`,
                        border: `1px solid ${SEVERITY_COLORS[f.severity]}55`,
                        color: SEVERITY_COLORS[f.severity],
                      }}
                    >
                      {f.severity}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${AUDIT_STATUS_COLORS[f.status]}15`,
                        border: `1px solid ${AUDIT_STATUS_COLORS[f.status]}40`,
                        color: AUDIT_STATUS_COLORS[f.status],
                      }}
                    >
                      {AUDIT_STATUS_LABELS[f.status]}
                    </span>
                  </div>
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {f.title}
                  </h3>
                </div>
              </div>
              <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                {f.summary}
              </p>
              <div className="flex items-center justify-between text-xs mb-2">
                <span style={{ color: "oklch(0.48 0.04 260)" }}>
                  Auditor:{" "}
                  <span style={{ color: "oklch(0.65 0.05 260)" }}>
                    {f.auditor}
                  </span>
                </span>
                <span style={{ color: "oklch(0.48 0.04 260)" }}>
                  Opened {f.dateOpened}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-1 w-24 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.12 0.03 260)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${
                          f.totalRecommendations > 0
                            ? (f.resolvedCount / f.totalRecommendations) * 100
                            : 0
                        }%`,
                        background: "oklch(0.65 0.2 140)",
                      }}
                    />
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    {f.resolvedCount}/{f.totalRecommendations} resolved
                  </span>
                </div>
                {f.finFracFranDisclosure && (
                  <span
                    className="text-xs italic"
                    style={{ color: "oklch(0.72 0.16 75 / 0.7)" }}
                  >
                    {f.finFracFranDisclosure}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="gap-2"
            style={{
              borderColor: "oklch(0.55 0.22 195 / 0.4)",
              color: "oklch(0.6 0.14 195)",
            }}
            onClick={() => toast.info("Audit request form coming soon.")}
          >
            <ClipboardList className="h-4 w-4" />
            Request an Audit
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Voting Record Ledger ─────────────────────────────────────────────────────
const ALL_COUNCILS = [
  "all",
  "Climate & Environment",
  "Technology & AI",
  "Global Health",
  "Education",
  "Peace & Security",
  "Economy & Finance",
  "Food & Agriculture",
  "Governance Reform",
];

function VotingLedgerSection() {
  const [search, setSearch] = useFilterState("");
  const [council, setCouncil] = useFilterState("all");
  const [outcome, setOutcome] = useFilterState<VoteOutcome | "all">("all");

  const records = useVotingRecords(search, council).filter((r) =>
    outcome === "all" ? true : r.vote === outcome,
  );

  function handleExport() {
    toast.success("Export initiated — CSV will download shortly.", {
      description: `Exporting ${records.length} voting record${
        records.length !== 1 ? "s" : ""
      }.`,
    });
  }

  return (
    <section id="voting" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: "oklch(0.55 0.22 195 / 0.12)",
              border: "1px solid oklch(0.55 0.22 195 / 0.3)",
            }}
          >
            <Vote
              className="h-5 w-5"
              style={{ color: "oklch(0.55 0.22 195)" }}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Voting Record Ledger
              </h2>
              <Badge
                className="text-xs font-bold"
                style={{
                  background: "oklch(0.55 0.22 195 / 0.15)",
                  border: "1px solid oklch(0.55 0.22 195 / 0.4)",
                  color: "oklch(0.72 0.16 190)",
                }}
              >
                Phase 6 · D
              </Badge>
              <Badge
                className="text-xs"
                style={{
                  background: "oklch(0.12 0.03 260)",
                  border: "1px solid oklch(0.22 0.04 260)",
                  color: "oklch(0.55 0.04 260)",
                }}
              >
                {records.length} record{records.length !== 1 ? "s" : ""}
              </Badge>
            </div>
            <p
              className="text-sm mt-0.5"
              style={{ color: "oklch(0.58 0.04 260)" }}
            >
              Immutable on-chain log of every delegate vote across all
              resolutions.
            </p>
          </div>
          <Button
            data-ocid="transparency.voting.export.button"
            size="sm"
            variant="outline"
            className="gap-2 shrink-0"
            style={{
              borderColor: "oklch(0.55 0.22 195 / 0.4)",
              color: "oklch(0.72 0.16 190)",
            }}
            onClick={handleExport}
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[180px]">
            <Input
              data-ocid="transparency.voting.search_input"
              placeholder="Search delegate or resolution…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 text-sm"
              style={{
                background: "oklch(0.12 0.03 260)",
                border: "1px solid oklch(0.22 0.04 260)",
                color: "oklch(0.82 0.02 260)",
              }}
            />
          </div>

          <Select value={council} onValueChange={(v) => setCouncil(v)}>
            <SelectTrigger
              data-ocid="transparency.voting.council.select"
              className="w-52 h-9 text-sm"
              style={{
                background: "oklch(0.12 0.03 260)",
                border: "1px solid oklch(0.22 0.04 260)",
                color: "oklch(0.72 0.03 260)",
              }}
            >
              <SelectValue placeholder="All Councils" />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "oklch(0.14 0.04 260)",
                border: "1px solid oklch(0.24 0.04 260)",
              }}
            >
              {ALL_COUNCILS.map((c) => (
                <SelectItem key={c} value={c} className="text-sm">
                  {c === "all" ? "All Councils" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={outcome}
            onValueChange={(v) => setOutcome(v as VoteOutcome | "all")}
          >
            <SelectTrigger
              data-ocid="transparency.voting.outcome.select"
              className="w-36 h-9 text-sm"
              style={{
                background: "oklch(0.12 0.03 260)",
                border: "1px solid oklch(0.22 0.04 260)",
                color: "oklch(0.72 0.03 260)",
              }}
            >
              <SelectValue placeholder="All Outcomes" />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "oklch(0.14 0.04 260)",
                border: "1px solid oklch(0.24 0.04 260)",
              }}
            >
              {(["all", "for", "against", "abstain"] as const).map((o) => (
                <SelectItem key={o} value={o} className="text-sm capitalize">
                  {o === "all"
                    ? "All Outcomes"
                    : o.charAt(0).toUpperCase() + o.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table or empty state */}
        {records.length === 0 ? (
          <div
            data-ocid="transparency.voting.empty_state"
            className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.4)",
              border: "1px dashed oklch(var(--gold-dim) / 0.2)",
            }}
          >
            <FileText
              className="h-10 w-10 mb-3"
              style={{ color: "oklch(0.35 0.04 260)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.5 0.04 260)" }}
            >
              No voting records match your filters.
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.38 0.04 260)" }}
            >
              Try adjusting the search or filter criteria.
            </p>
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid oklch(var(--gold-dim) / 0.2)" }}
          >
            <TooltipProvider delayDuration={200}>
              <Table data-ocid="transparency.voting.table">
                <TableHeader>
                  <TableRow
                    style={{
                      background: "oklch(0.12 0.04 260)",
                      borderBottom: "1px solid oklch(0.22 0.04 260)",
                    }}
                  >
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Resolution
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Delegate
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider hidden md:table-cell"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Council
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Vote
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider text-right"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Weight
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider hidden lg:table-cell"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Date
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wider hidden xl:table-cell"
                      style={{ color: "oklch(0.52 0.05 260)" }}
                    >
                      Rationale
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record, idx) => (
                    <TableRow
                      key={record.id}
                      data-ocid={`transparency.voting.row.${idx + 1}`}
                      className="transition-colors duration-150"
                      style={{
                        background:
                          idx % 2 === 0
                            ? "oklch(0.14 0.035 260)"
                            : "oklch(0.13 0.03 260)",
                        borderBottom: "1px solid oklch(0.2 0.03 260)",
                      }}
                    >
                      {/* Resolution */}
                      <TableCell className="py-3">
                        <div>
                          <span
                            className="text-xs font-mono"
                            style={{ color: "oklch(0.45 0.05 260)" }}
                          >
                            {record.resolutionId}
                          </span>
                          <p
                            className="text-sm font-medium leading-snug mt-0.5 max-w-[180px] truncate"
                            style={{ color: "oklch(0.82 0.02 260)" }}
                            title={record.resolutionTitle}
                          >
                            {record.resolutionTitle}
                          </p>
                        </div>
                      </TableCell>

                      {/* Delegate */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base leading-none">
                            {record.delegateNation}
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: "oklch(0.78 0.03 260)" }}
                          >
                            {record.delegateName}
                          </span>
                        </div>
                      </TableCell>

                      {/* Council */}
                      <TableCell className="py-3 hidden md:table-cell">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `${councilColor(record.council)}18`,
                            border: `1px solid ${councilColor(record.council)}44`,
                            color: councilColor(record.council),
                          }}
                        >
                          {record.council}
                        </span>
                      </TableCell>

                      {/* Vote */}
                      <TableCell className="py-3">
                        <VotePill vote={record.vote} />
                      </TableCell>

                      {/* Weight */}
                      <TableCell className="py-3 text-right">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "oklch(var(--teal-bright))" }}
                        >
                          {record.voteWeight.toFixed(1)}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="py-3 hidden lg:table-cell">
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.5 0.04 260)" }}
                        >
                          {record.date}
                        </span>
                      </TableCell>

                      {/* Rationale — tooltip */}
                      <TableCell className="py-3 hidden xl:table-cell">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex items-center gap-1 cursor-help"
                              style={{ color: "oklch(0.52 0.05 260)" }}
                            >
                              <span className="text-xs max-w-[200px] truncate">
                                {record.rationale}
                              </span>
                              <Eye className="h-3 w-3 shrink-0" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            className="max-w-xs text-xs leading-relaxed p-3"
                            style={{
                              background: "oklch(0.14 0.04 260)",
                              border: "1px solid oklch(0.28 0.05 260)",
                              color: "oklch(0.78 0.02 260)",
                            }}
                          >
                            <p
                              className="font-semibold mb-1"
                              style={{ color: "oklch(var(--pearl))" }}
                            >
                              {record.delegateName} · {record.delegateNation}
                            </p>
                            {record.rationale}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TooltipProvider>
          </div>
        )}

        {/* Footer: link to Resolution Tracker */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs" style={{ color: "oklch(0.42 0.04 260)" }}>
            All votes are recorded on-chain and cannot be altered retroactively.
          </p>
          <Link
            to="/resolutions"
            data-ocid="transparency.voting.resolutions.link"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              style={{
                borderColor: "oklch(0.55 0.22 195 / 0.4)",
                color: "oklch(0.72 0.16 190)",
              }}
            >
              <ArrowRight className="h-3.5 w-3.5" />
              View Resolution Tracker
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── AI Decision Log helpers ──────────────────────────────────────────────────
const AI_TYPE_CONFIG: Record<AIDecisionType, { label: string; color: string }> =
  {
    "policy-analysis": {
      label: "Policy Analysis",
      color: "oklch(0.62 0.18 270)",
    },
    "risk-assessment": {
      label: "Risk Assessment",
      color: "oklch(0.6 0.22 27)",
    },
    "charter-review": {
      label: "Charter Review",
      color: "oklch(0.55 0.22 195)",
    },
    recommendation: { label: "Recommendation", color: "oklch(0.65 0.2 140)" },
  };

function confidenceColor(score: number): string {
  if (score >= 80) return "oklch(0.65 0.2 140)";
  if (score >= 60) return "oklch(0.72 0.16 75)";
  return "oklch(0.6 0.22 27)";
}

function ConfidenceBar({
  score,
  label,
}: {
  score: number;
  label: string;
}) {
  const color = confidenceColor(score);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs" style={{ color: "oklch(0.52 0.04 260)" }}>
          {label}
        </span>
        <span className="text-sm font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "oklch(0.12 0.03 260)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// ─── Challenge Dialog ─────────────────────────────────────────────────────────
function ChallengeDialog() {
  const [open, setOpen] = useState(false);
  const [decisionId, setDecisionId] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (!decisionId || !challengeType || description.trim().length < 20) {
      toast.error("Please complete all fields before submitting.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      toast.success("Challenge submitted successfully.", {
        description:
          "Your challenge has been logged and will be reviewed by the AI Ethics Committee.",
      });
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setDecisionId("");
        setChallengeType("");
        setDescription("");
      }, 1800);
    }, 1200);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-ocid="ai_log.challenge_open_modal_button"
          variant="outline"
          className="gap-2"
          style={{
            borderColor: "oklch(0.62 0.18 270 / 0.4)",
            color: "oklch(0.72 0.14 270)",
          }}
        >
          <AlertTriangle className="h-4 w-4" />
          Challenge a Decision
        </Button>
      </DialogTrigger>
      <DialogContent
        data-ocid="ai_log.challenge_dialog"
        style={{
          background: "oklch(0.12 0.04 260)",
          border: "1px solid oklch(0.25 0.06 270)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "oklch(var(--pearl))" }}>
            Challenge an AI Decision
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.55 0.04 260)" }}>
            Flag a decision for review by the AI Ethics Committee. All
            challenges are logged on-chain.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div
            data-ocid="ai_log.challenge_dialog.success_state"
            className="flex flex-col items-center gap-3 py-8"
          >
            <CheckCircle2
              className="h-12 w-12"
              style={{ color: "oklch(0.65 0.2 140)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Challenge Submitted
            </p>
            <p className="text-xs" style={{ color: "oklch(0.52 0.04 260)" }}>
              Reference: CHG-{Date.now().toString().slice(-6)}
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="challenge-decision"
                className="text-xs font-semibold"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                Select Decision *
              </Label>
              <Select value={decisionId} onValueChange={setDecisionId}>
                <SelectTrigger
                  id="challenge-decision"
                  data-ocid="ai_log.challenge_decision_select"
                  className="text-sm"
                  style={{
                    background: "oklch(0.14 0.04 260)",
                    border: "1px solid oklch(0.26 0.05 260)",
                    color: "oklch(0.75 0.03 260)",
                  }}
                >
                  <SelectValue placeholder="Choose a decision to challenge…" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.14 0.04 260)",
                    border: "1px solid oklch(0.26 0.05 260)",
                  }}
                >
                  {AI_DECISION_LOGS.map((log) => (
                    <SelectItem key={log.id} value={log.id} className="text-sm">
                      {log.id} — {log.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="challenge-type"
                className="text-xs font-semibold"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                Challenge Type *
              </Label>
              <Select value={challengeType} onValueChange={setChallengeType}>
                <SelectTrigger
                  id="challenge-type"
                  data-ocid="ai_log.challenge_type_select"
                  className="text-sm"
                  style={{
                    background: "oklch(0.14 0.04 260)",
                    border: "1px solid oklch(0.26 0.05 260)",
                    color: "oklch(0.75 0.03 260)",
                  }}
                >
                  <SelectValue placeholder="Select challenge type…" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.14 0.04 260)",
                    border: "1px solid oklch(0.26 0.05 260)",
                  }}
                >
                  <SelectItem value="factual-error">Factual Error</SelectItem>
                  <SelectItem value="bias-concern">Bias Concern</SelectItem>
                  <SelectItem value="charter-misalignment">
                    Charter Misalignment
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="challenge-desc"
                className="text-xs font-semibold"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                Description * (min. 20 characters)
              </Label>
              <Textarea
                id="challenge-desc"
                data-ocid="ai_log.challenge_textarea"
                placeholder="Describe the specific issue with this AI decision, including evidence or alternative analysis…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="text-sm resize-none"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.26 0.05 260)",
                  color: "oklch(0.78 0.02 260)",
                }}
              />
              <p
                className="text-xs"
                style={{
                  color:
                    description.trim().length >= 20
                      ? "oklch(0.65 0.2 140)"
                      : "oklch(0.45 0.04 260)",
                }}
              >
                {description.trim().length} / 20 min. chars
              </p>
            </div>
          </div>
        )}

        {!success && (
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              data-ocid="ai_log.challenge_dialog.cancel_button"
              onClick={() => setOpen(false)}
              style={{ color: "oklch(0.52 0.04 260)" }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="ai_log.challenge_submit_button"
              disabled={
                submitting ||
                !decisionId ||
                !challengeType ||
                description.trim().length < 20
              }
              onClick={handleSubmit}
              style={{
                background: "oklch(0.62 0.18 270)",
                color: "white",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Challenge"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── AI Decision Log Section ──────────────────────────────────────────────────
function AIDecisionLogSection() {
  const [typeFilter, setTypeFilter] = useFilterState<AIDecisionType | "all">(
    "all",
  );
  const [overrideOnly, setOverrideOnly] = useFilterState(false);

  const logs = useAIDecisionLogs(
    typeFilter === "all" ? undefined : typeFilter,
    overrideOnly,
  );

  return (
    <section
      id="ai-decisions"
      className="py-16"
      style={{ background: "oklch(var(--cosmos-mid) / 0.5)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: "oklch(0.62 0.18 270 / 0.12)",
                border: "1px solid oklch(0.62 0.18 270 / 0.3)",
              }}
            >
              <Bot
                className="h-5 w-5"
                style={{ color: "oklch(0.72 0.14 270)" }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="font-display text-2xl font-bold"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  AI Decision Log
                </h2>
                <Badge
                  className="text-xs font-bold"
                  style={{
                    background: "oklch(0.62 0.18 270 / 0.15)",
                    border: "1px solid oklch(0.62 0.18 270 / 0.4)",
                    color: "oklch(0.72 0.14 270)",
                  }}
                >
                  Phase 6 · E
                </Badge>
                <Badge
                  className="text-xs"
                  style={{
                    background: "oklch(0.12 0.03 260)",
                    border: "1px solid oklch(0.22 0.04 260)",
                    color: "oklch(0.55 0.04 260)",
                  }}
                >
                  {logs.length} decision{logs.length !== 1 ? "s" : ""}
                </Badge>
                {logs.some((l) => l.overrideFlag) && (
                  <Badge
                    className="text-xs font-bold"
                    style={{
                      background: "oklch(0.68 0.18 40 / 0.15)",
                      border: "1px solid oklch(0.68 0.18 40 / 0.4)",
                      color: "oklch(0.72 0.18 40)",
                    }}
                  >
                    ⚠ {logs.filter((l) => l.overrideFlag).length} Override
                    {logs.filter((l) => l.overrideFlag).length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
              <p
                className="text-sm mt-0.5"
                style={{ color: "oklch(0.58 0.04 260)" }}
              >
                Auditable trail of every AI Policy Advisor decision — including
                human overrides.
              </p>
            </div>
          </div>
          <ChallengeDialog />
        </div>

        {/* ── Filter bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as AIDecisionType | "all")}
          >
            <SelectTrigger
              data-ocid="ai_log.type_select"
              className="w-44 h-9 text-sm"
              style={{
                background: "oklch(0.12 0.03 260)",
                border: "1px solid oklch(0.22 0.04 260)",
                color: "oklch(0.72 0.03 260)",
              }}
            >
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "oklch(0.14 0.04 260)",
                border: "1px solid oklch(0.24 0.04 260)",
              }}
            >
              <SelectItem value="all" className="text-sm">
                All Types
              </SelectItem>
              {(
                [
                  "policy-analysis",
                  "risk-assessment",
                  "charter-review",
                  "recommendation",
                ] as AIDecisionType[]
              ).map((t) => (
                <SelectItem key={t} value={t} className="text-sm">
                  {AI_TYPE_CONFIG[t].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Switch
              data-ocid="ai_log.override_toggle"
              id="override-only"
              checked={overrideOnly}
              onCheckedChange={setOverrideOnly}
              style={{
                backgroundColor: overrideOnly
                  ? "oklch(0.68 0.18 40)"
                  : undefined,
              }}
            />
            <Label
              htmlFor="override-only"
              className="text-sm cursor-pointer select-none"
              style={{ color: "oklch(0.65 0.04 260)" }}
            >
              Human Overrides Only
            </Label>
          </div>
        </div>

        {/* ── Cards or empty state ── */}
        {logs.length === 0 ? (
          <div
            data-ocid="ai_log.empty_state"
            className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.4)",
              border: "1px dashed oklch(var(--gold-dim) / 0.2)",
            }}
          >
            <Bot
              className="h-10 w-10 mb-3"
              style={{ color: "oklch(0.32 0.04 260)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.5 0.04 260)" }}
            >
              No AI decisions match your filters.
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.38 0.04 260)" }}
            >
              Try adjusting the type filter or disabling the override toggle.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {logs.map((log, idx) => {
              const typeConf = AI_TYPE_CONFIG[log.type];
              return (
                <motion.div
                  key={log.id}
                  data-ocid={`ai_log.item.${idx + 1}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="rounded-2xl p-5"
                  style={{
                    background: "oklch(var(--cosmos-surface) / 0.9)",
                    border: log.overrideFlag
                      ? "1px solid oklch(0.68 0.18 40 / 0.45)"
                      : "1px solid oklch(var(--gold-dim) / 0.2)",
                  }}
                >
                  {/* ── Card header ── */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className="text-xs font-mono"
                          style={{ color: "oklch(0.45 0.04 260)" }}
                        >
                          {log.id}
                        </span>
                        {/* Decision type badge */}
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${typeConf.color}18`,
                            border: `1px solid ${typeConf.color}44`,
                            color: typeConf.color,
                          }}
                        >
                          {typeConf.label}
                        </span>
                        {/* Human override badge — prominent */}
                        {log.overrideFlag && (
                          <span
                            className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.68 0.18 40 / 0.18)",
                              border: "1px solid oklch(0.68 0.18 40 / 0.5)",
                              color: "oklch(0.75 0.18 40)",
                            }}
                          >
                            <AlertTriangle className="h-3 w-3" />
                            Human Override
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-sm font-semibold leading-snug"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {log.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Summary ── */}
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    {log.summary}
                  </p>

                  {/* ── Override rationale ── */}
                  {log.overrideFlag && log.overrideRationale && (
                    <div
                      className="rounded-xl px-4 py-3 mb-4 text-xs leading-relaxed"
                      style={{
                        background: "oklch(0.68 0.18 40 / 0.07)",
                        border: "1px solid oklch(0.68 0.18 40 / 0.25)",
                        color: "oklch(0.72 0.12 40)",
                      }}
                    >
                      <span className="font-bold block mb-0.5">
                        Override Rationale:
                      </span>
                      {log.overrideRationale}
                    </div>
                  )}

                  {/* ── Scores ── */}
                  <div className="space-y-2.5 mb-4">
                    <ConfidenceBar
                      score={log.confidenceScore}
                      label="Confidence Score"
                    />
                    <ConfidenceBar
                      score={log.charterAlignment}
                      label="Charter Alignment"
                    />
                  </div>

                  {/* ── Footer row ── */}
                  <div
                    className="flex items-center justify-between flex-wrap gap-2 pt-3"
                    style={{ borderTop: "1px solid oklch(0.2 0.03 260)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.48 0.04 260)" }}
                      >
                        {log.council}
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{ color: "oklch(0.4 0.04 260)" }}
                      >
                        {log.modelVersion}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.4 0.04 260)" }}
                      >
                        {log.date}
                      </span>
                    </div>
                    <Link to="/policy-advisor">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2.5 text-xs gap-1"
                        style={{ color: "oklch(0.65 0.14 270)" }}
                      >
                        View Full Analysis
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FinFracFran™ Disclosure Hub (Part G) ────────────────────────────────────
function FinFracFranDisclosureSection() {
  const total = FF_DISCLOSURES.length;
  const compliant = FF_DISCLOSURES.filter(
    (d) => d.status === "compliant",
  ).length;
  const nationsCovered = FF_DISCLOSURES.reduce(
    (sum, d) => sum + d.adoptingNations,
    0,
  );
  const underReview = FF_DISCLOSURES.filter(
    (d) => d.status === "under-review",
  ).length;

  const stats = [
    { label: "Total Disclosures", value: total, color: "oklch(0.78 0.18 85)" },
    {
      label: "Compliant Entities",
      value: compliant,
      color: "oklch(0.65 0.2 140)",
    },
    {
      label: "Nations Covered",
      value: nationsCovered,
      color: "oklch(0.55 0.22 195)",
    },
    { label: "Under Review", value: underReview, color: "oklch(0.72 0.18 45)" },
  ];

  return (
    <section
      data-ocid="finfracfran.section"
      className="py-16"
      style={{ background: "oklch(0.10 0.02 260)" }}
    >
      <div id="finfracfran" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FFSpotlightHeader
          badge="FinFracFran™ Disclosure Hub"
          headline="Open Franchise Compliance"
          subline="All franchise licensing agreements, compliance scores, and revenue-share disclosures — open, auditable, and on-chain."
          align="left"
          className="mb-10"
        />

        {/* Stats row */}
        <motion.div
          data-ocid="finfracfran.stats.panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-5 text-center"
              style={{
                background: "oklch(0.13 0.02 260)",
                border: "1px solid oklch(0.78 0.18 85 / 0.15)",
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "oklch(0.55 0.05 260)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Open Contracts Section (Part F2) ────────────────────────────────────────
const STATUS_STYLES: Record<
  ContractStatus,
  { label: string; color: string; bg: string }
> = {
  active: {
    label: "Active",
    color: "oklch(0.72 0.18 145)",
    bg: "oklch(0.18 0.06 145 / 0.4)",
  },
  pending: {
    label: "Pending",
    color: "oklch(0.78 0.16 72)",
    bg: "oklch(0.18 0.06 72 / 0.4)",
  },
  completed: {
    label: "Completed",
    color: "oklch(0.72 0.14 195)",
    bg: "oklch(0.18 0.06 195 / 0.4)",
  },
  terminated: {
    label: "Terminated",
    color: "oklch(0.68 0.2 22)",
    bg: "oklch(0.18 0.06 22 / 0.4)",
  },
};

const STATUS_FILTER_TABS: { key: string; label: string; ocid: string }[] = [
  { key: "all", label: "All", ocid: "contracts.filter.all.tab" },
  { key: "active", label: "Active", ocid: "contracts.filter.active.tab" },
  { key: "pending", label: "Pending", ocid: "contracts.filter.pending.tab" },
  {
    key: "completed",
    label: "Completed",
    ocid: "contracts.filter.completed.tab",
  },
  {
    key: "suspended",
    label: "Suspended",
    ocid: "contracts.filter.suspended.tab",
  },
];

function OpenContractsSection() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContract, setSelectedContract] = useState<OpenContract | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useOpenContracts(
    search,
    statusFilter === "all" ? undefined : statusFilter,
  );

  const formatValue = (val: number, currency: string) =>
    `$${val.toLocaleString()} ${currency}`;

  const isFFLicense = (lt: string) => lt.includes("FinFracFran");

  const openDetail = (contract: (typeof OPEN_CONTRACTS)[0]) => {
    setSelectedContract(contract);
    setSheetOpen(true);
  };

  const handleFlagForReview = () => {
    setSheetOpen(false);
    setTimeout(() => {
      const el = document.getElementById("whistleblower");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const contractOcidIndexMap: Record<string, number> = {};
  OPEN_CONTRACTS.forEach((c, i) => {
    contractOcidIndexMap[c.id] = i + 1;
  });

  return (
    <section
      id="contracts"
      className="py-16 sm:py-20"
      style={{
        background: "oklch(0.11 0.03 195 / 0.3)",
        borderTop: "1px solid oklch(0.55 0.22 195 / 0.18)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-3"
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                background: "oklch(0.55 0.22 195 / 0.12)",
                border: "1px solid oklch(0.55 0.22 195 / 0.25)",
              }}
            >
              <FileText
                className="h-5 w-5"
                style={{ color: "oklch(0.72 0.16 190)" }}
              />
            </div>
            <div>
              <h2
                className="font-display font-bold text-2xl sm:text-3xl"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Open{" "}
                <span style={{ color: "oklch(0.72 0.16 190)" }}>Contracts</span>
              </h2>
            </div>
          </div>
          <Badge
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
            style={{
              background: "oklch(0.55 0.22 195 / 0.12)",
              color: "oklch(0.72 0.16 190)",
              border: "1px solid oklch(0.55 0.22 195 / 0.3)",
            }}
          >
            Public Register
          </Badge>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm mb-8 max-w-2xl"
          style={{ color: "oklch(0.55 0.05 260)" }}
        >
          All vendor contracts above $100K are publicly disclosed under
          ONEartHeaven™ transparency mandates.
        </motion.p>

        {/* ── Filter bar ── */}
        <div className="flex flex-wrap gap-3 mb-8">
          <SearchInput
            data-ocid="contracts.search.input"
            value={search}
            onChange={setSearch}
            placeholder="Search vendor or council..."
            className="flex-1 min-w-[220px]"
          />
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTER_TABS.map((tab) => {
              const isActive = statusFilter === tab.key;
              return (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  data-ocid={tab.ocid}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: isActive
                      ? "oklch(0.55 0.22 195 / 0.2)"
                      : "oklch(0.13 0.03 195 / 0.5)",
                    border: isActive
                      ? "1px solid oklch(0.55 0.22 195 / 0.5)"
                      : "1px solid oklch(0.55 0.22 195 / 0.12)",
                    color: isActive
                      ? "oklch(0.72 0.16 190)"
                      : "oklch(0.5 0.04 260)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Cards grid ── */}
        {filtered.length === 0 ? (
          <div
            data-ocid="contracts.empty_state"
            className="text-center py-16 rounded-xl"
            style={{
              background: "oklch(0.13 0.03 195 / 0.4)",
              border: "1px solid oklch(0.55 0.22 195 / 0.12)",
            }}
          >
            <Building2
              className="h-10 w-10 mx-auto mb-3"
              style={{ color: "oklch(0.38 0.04 260)" }}
            />
            <p
              className="text-sm mb-4"
              style={{ color: "oklch(0.45 0.04 260)" }}
            >
              No contracts match your search
            </p>
            <Button
              size="sm"
              variant="outline"
              data-ocid="contracts.reset.button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              style={{
                borderColor: "oklch(0.55 0.22 195 / 0.3)",
                color: "oklch(0.72 0.16 190)",
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((contract, idx) => {
              const ocidIdx = contractOcidIndexMap[contract.id] ?? idx + 1;
              const statusStyle =
                STATUS_STYLES[contract.status] ?? STATUS_STYLES.active;
              const isFFF = isFFLicense(contract.licenseType);
              return (
                <motion.div
                  key={contract.id}
                  data-ocid={`contracts.item.${ocidIdx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="rounded-xl p-5 group transition-all"
                  style={{
                    background: "oklch(0.13 0.03 195 / 0.5)",
                    border: "1px solid oklch(0.55 0.22 195 / 0.14)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.55 0.22 195 / 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.55 0.22 195 / 0.14)";
                  }}
                >
                  {/* ── Top row ── */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        background: "oklch(0.1 0.02 195 / 0.8)",
                        color: "oklch(0.55 0.12 195)",
                        border: "1px solid oklch(0.55 0.22 195 / 0.2)",
                      }}
                    >
                      {contract.id}
                    </span>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>

                  {/* ── Vendor name ── */}
                  <h3
                    className="font-semibold text-base mb-2 leading-snug"
                    style={{ color: "oklch(0.88 0.04 260)" }}
                  >
                    {contract.vendor}
                  </h3>

                  {/* ── Council tag ── */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `${councilColor(contract.council)}22`,
                        color: councilColor(contract.council),
                        border: `1px solid ${councilColor(contract.council)}44`,
                      }}
                    >
                      {contract.council}
                    </span>
                    {isFFF ? (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: "oklch(0.72 0.16 75 / 0.15)",
                          color: "oklch(var(--gold))",
                          border: "1px solid oklch(0.72 0.16 75 / 0.3)",
                        }}
                      >
                        FinFracFran™
                      </span>
                    ) : (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.18 0.02 260 / 0.5)",
                          color: "oklch(0.5 0.04 260)",
                          border: "1px solid oklch(0.3 0.03 260 / 0.3)",
                        }}
                      >
                        {contract.licenseType}
                      </span>
                    )}
                  </div>

                  {/* ── Value + dates ── */}
                  <div
                    className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs"
                    style={{ color: "oklch(0.58 0.05 260)" }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.75 0.12 145)" }}
                    >
                      {formatValue(contract.value, contract.currency)}
                    </span>
                    <span>
                      {contract.startDate} → {contract.endDate}
                    </span>
                  </div>

                  {/* ── Description ── */}
                  <p
                    className="text-xs leading-relaxed mb-4 line-clamp-2"
                    style={{ color: "oklch(0.5 0.04 260)" }}
                  >
                    {contract.description}
                  </p>

                  {/* ── CTA ── */}
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`contracts.view.button.${ocidIdx}`}
                    onClick={() => openDetail(contract)}
                    className="w-full gap-2 text-xs"
                    style={{
                      borderColor: "oklch(0.55 0.22 195 / 0.3)",
                      color: "oklch(0.72 0.16 190)",
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Contract
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Contract Detail Sheet ── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          data-ocid="contracts.sheet"
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
          style={{
            background: "oklch(0.09 0.03 260)",
            borderLeft: "1px solid oklch(0.55 0.22 195 / 0.2)",
          }}
        >
          {selectedContract && (
            <>
              <SheetHeader
                className="pb-4"
                style={{
                  borderBottom: "1px solid oklch(0.55 0.22 195 / 0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "oklch(0.12 0.03 195 / 0.8)",
                      color: "oklch(0.55 0.12 195)",
                      border: "1px solid oklch(0.55 0.22 195 / 0.2)",
                    }}
                  >
                    {selectedContract.id}
                  </span>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        STATUS_STYLES[selectedContract.status]?.bg ??
                        "oklch(0.18 0.06 195 / 0.4)",
                      color:
                        STATUS_STYLES[selectedContract.status]?.color ??
                        "oklch(0.72 0.14 195)",
                    }}
                  >
                    {STATUS_STYLES[selectedContract.status]?.label ??
                      selectedContract.status}
                  </span>
                </div>
                <SheetTitle
                  className="font-display text-xl"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  {selectedContract.vendor}
                </SheetTitle>
                <SheetDescription style={{ color: "oklch(0.5 0.05 260)" }}>
                  Full contract disclosure — ONEartHeaven™ public register
                </SheetDescription>
              </SheetHeader>

              <div className="py-5 space-y-5">
                {/* ── Key metadata ── */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Council", value: selectedContract.council },
                    {
                      label: "Contract Value",
                      value: `$${selectedContract.value.toLocaleString()} ${selectedContract.currency}`,
                    },
                    { label: "Start Date", value: selectedContract.startDate },
                    { label: "End Date", value: selectedContract.endDate },
                    {
                      label: "License Type",
                      value: selectedContract.licenseType,
                    },
                    {
                      label: "Oversight Lead",
                      value: selectedContract.oversightLead
                        ? `${selectedContract.oversightLead.name} — ${selectedContract.oversightLead.role}`
                        : "Council Secretariat",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg p-3"
                      style={{
                        background: "oklch(0.12 0.03 195 / 0.4)",
                        border: "1px solid oklch(0.55 0.22 195 / 0.12)",
                      }}
                    >
                      <div
                        className="text-[10px] uppercase tracking-wider mb-1"
                        style={{ color: "oklch(0.45 0.05 260)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="font-medium text-xs"
                        style={{ color: "oklch(0.78 0.05 260)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Description ── */}
                <div>
                  <h4
                    className="text-sm font-semibold mb-2"
                    style={{ color: "oklch(0.72 0.16 190)" }}
                  >
                    Contract Description
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.6 0.04 260)" }}
                  >
                    {selectedContract.description}
                  </p>
                </div>

                {/* ── Scope of Work ── */}
                {selectedContract.scope && (
                  <div
                    className="rounded-lg p-4"
                    style={{
                      background: "oklch(0.12 0.03 195 / 0.35)",
                      border: "1px solid oklch(0.55 0.22 195 / 0.1)",
                    }}
                  >
                    <h4
                      className="text-xs font-semibold uppercase tracking-wide mb-2"
                      style={{ color: "oklch(0.55 0.12 195)" }}
                    >
                      Scope of Work
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.6 0.04 260)" }}
                    >
                      {selectedContract.scope}
                    </p>
                  </div>
                )}

                {/* ── Deliverables ── */}
                {selectedContract.deliverables &&
                  selectedContract.deliverables.length > 0 && (
                    <div
                      className="rounded-lg p-4"
                      style={{
                        background: "oklch(0.12 0.03 195 / 0.35)",
                        border: "1px solid oklch(0.55 0.22 195 / 0.1)",
                      }}
                    >
                      <h4
                        className="text-xs font-semibold uppercase tracking-wide mb-3"
                        style={{ color: "oklch(0.55 0.12 195)" }}
                      >
                        Deliverables
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedContract.deliverables.map((d) => (
                          <li
                            key={d.slice(0, 30)}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "oklch(0.65 0.04 260)" }}
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 mt-0.5 shrink-0"
                              style={{ color: "oklch(0.65 0.18 155)" }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* ── Payment Schedule ── */}
                {selectedContract.paymentSchedule &&
                  selectedContract.paymentSchedule.length > 0 && (
                    <div
                      className="rounded-lg p-4"
                      style={{
                        background: "oklch(0.12 0.03 195 / 0.35)",
                        border: "1px solid oklch(0.55 0.22 195 / 0.1)",
                      }}
                    >
                      <h4
                        className="text-xs font-semibold uppercase tracking-wide mb-3"
                        style={{ color: "oklch(0.55 0.12 195)" }}
                      >
                        Payment Schedule
                      </h4>
                      <div className="space-y-2">
                        {selectedContract.paymentSchedule.map((m) => (
                          <div
                            key={m.milestone}
                            className="flex items-center justify-between gap-3 rounded p-2.5 text-xs"
                            style={{
                              background: m.paid
                                ? "oklch(0.14 0.04 155 / 0.3)"
                                : "oklch(0.11 0.02 260 / 0.4)",
                              border: `1px solid ${m.paid ? "oklch(0.5 0.15 155 / 0.2)" : "oklch(0.4 0.03 260 / 0.2)"}`,
                            }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle2
                                className="h-3.5 w-3.5 shrink-0"
                                style={{
                                  color: m.paid
                                    ? "oklch(0.65 0.18 155)"
                                    : "oklch(0.4 0.03 260)",
                                }}
                              />
                              <span
                                className="truncate"
                                style={{ color: "oklch(0.7 0.04 260)" }}
                              >
                                {m.milestone}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span
                                className="font-mono font-semibold"
                                style={{ color: "oklch(0.82 0.14 195)" }}
                              >
                                ${m.amount.toLocaleString()}
                              </span>
                              <span
                                style={{
                                  color: m.paid
                                    ? "oklch(0.65 0.18 155)"
                                    : "oklch(0.5 0.05 260)",
                                }}
                              >
                                {m.paid ? (m.paidDate ?? "Paid") : m.dueDate}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* ── Audit Trail ── */}
                {selectedContract.auditTrail &&
                  selectedContract.auditTrail.length > 0 && (
                    <div
                      className="rounded-lg p-4"
                      style={{
                        background: "oklch(0.12 0.03 195 / 0.35)",
                        border: "1px solid oklch(0.55 0.22 195 / 0.1)",
                      }}
                    >
                      <h4
                        className="text-xs font-semibold uppercase tracking-wide mb-3"
                        style={{ color: "oklch(0.55 0.12 195)" }}
                      >
                        Audit Trail
                      </h4>
                      <div className="relative space-y-0">
                        {selectedContract.auditTrail.map((ev, i) => {
                          const typeColors: Record<
                            string,
                            { bg: string; color: string; label: string }
                          > = {
                            award: {
                              bg: "oklch(0.82 0.18 85 / 0.15)",
                              color: "oklch(0.82 0.18 85)",
                              label: "Award",
                            },
                            review: {
                              bg: "oklch(0.72 0.14 195 / 0.15)",
                              color: "oklch(0.72 0.14 195)",
                              label: "Review",
                            },
                            amendment: {
                              bg: "oklch(0.78 0.16 55 / 0.15)",
                              color: "oklch(0.78 0.16 55)",
                              label: "Amendment",
                            },
                            payment: {
                              bg: "oklch(0.65 0.18 155 / 0.15)",
                              color: "oklch(0.65 0.18 155)",
                              label: "Payment",
                            },
                            completion: {
                              bg: "oklch(0.68 0.16 250 / 0.15)",
                              color: "oklch(0.68 0.16 250)",
                              label: "Completion",
                            },
                            flag: {
                              bg: "oklch(0.68 0.2 22 / 0.15)",
                              color: "oklch(0.68 0.2 22)",
                              label: "Flag",
                            },
                          };
                          const tc = typeColors[ev.type] ?? typeColors.review;
                          return (
                            <div
                              key={`${ev.date}-${ev.type}`}
                              className="flex gap-3 pb-4 last:pb-0"
                            >
                              <div className="flex flex-col items-center">
                                <div
                                  className="h-2.5 w-2.5 rounded-full mt-1 shrink-0"
                                  style={{ background: tc.color }}
                                />
                                {i <
                                  (selectedContract.auditTrail?.length ?? 0) -
                                    1 && (
                                  <div
                                    className="w-px flex-1 mt-1"
                                    style={{
                                      background: "oklch(0.3 0.03 260)",
                                    }}
                                  />
                                )}
                              </div>
                              <div className="pb-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                  <span
                                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                    style={{
                                      background: tc.bg,
                                      color: tc.color,
                                    }}
                                  >
                                    {tc.label}
                                  </span>
                                  <span
                                    className="text-[10px]"
                                    style={{ color: "oklch(0.42 0.04 260)" }}
                                  >
                                    {ev.date}
                                  </span>
                                </div>
                                <p
                                  className="text-xs font-medium mb-0.5"
                                  style={{ color: "oklch(0.75 0.05 260)" }}
                                >
                                  {ev.title}
                                </p>
                                <p
                                  className="text-[11px] leading-relaxed"
                                  style={{ color: "oklch(0.52 0.04 260)" }}
                                >
                                  {ev.outcome}
                                </p>
                                <p
                                  className="text-[10px] mt-0.5"
                                  style={{ color: "oklch(0.4 0.03 260)" }}
                                >
                                  — {ev.party}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                {/* ── Amendments ── */}
                {selectedContract.amendments &&
                  selectedContract.amendments.length > 0 && (
                    <div
                      className="rounded-lg p-4"
                      style={{
                        background: "oklch(0.13 0.04 55 / 0.25)",
                        border: "1px solid oklch(0.78 0.16 55 / 0.15)",
                      }}
                    >
                      <h4
                        className="text-xs font-semibold uppercase tracking-wide mb-3"
                        style={{ color: "oklch(0.78 0.16 55)" }}
                      >
                        Amendments
                      </h4>
                      <div className="space-y-3">
                        {selectedContract.amendments.map((a) => (
                          <div key={a.id} className="text-xs space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                                style={{
                                  background: "oklch(0.78 0.16 55 / 0.15)",
                                  color: "oklch(0.78 0.16 55)",
                                }}
                              >
                                {a.id}
                              </span>
                              <span style={{ color: "oklch(0.45 0.04 260)" }}>
                                {a.date}
                              </span>
                            </div>
                            <p style={{ color: "oklch(0.65 0.04 260)" }}>
                              {a.description}
                            </p>
                            <p
                              className="text-[10px]"
                              style={{ color: "oklch(0.42 0.03 260)" }}
                            >
                              Approved by: {a.approvedBy}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <SheetFooter
                style={{
                  borderTop: "1px solid oklch(0.55 0.22 195 / 0.15)",
                  paddingTop: "1rem",
                }}
              >
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  data-ocid="contracts.flag.button"
                  onClick={handleFlagForReview}
                  style={{
                    borderColor: "oklch(0.68 0.2 22 / 0.4)",
                    color: "oklch(0.75 0.18 22)",
                  }}
                >
                  <Flag className="h-4 w-4" />
                  Flag for Review
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

// ─── Hero + Stats ─────────────────────────────────────────────────────────────
function HeroStats({
  stats,
}: {
  stats: { label: string; value: string | number; icon: React.ElementType }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
            className="rounded-xl px-4 py-3 text-center"
            style={{
              background: "oklch(0.12 0.04 260 / 0.8)",
              border: "1px solid oklch(var(--gold-dim) / 0.2)",
            }}
          >
            <Icon
              className="h-4 w-4 mx-auto mb-1"
              style={{ color: "oklch(var(--gold))" }}
            />
            <div
              className="text-xl font-bold font-display"
              style={{ color: "oklch(var(--gold))" }}
            >
              <CountUpNumber value={s.value} />
            </div>
            <div className="text-xs" style={{ color: "oklch(0.5 0.04 260)" }}>
              {s.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function TransparencyPage() {
  const stats = useTransparencyStats();

  const heroStats = [
    {
      label: "Audits Published",
      value: stats.auditsPublished,
      icon: CheckCircle2,
    },
    {
      label: "Budget Lines Open",
      value: stats.budgetLinesOpen,
      icon: BarChart3,
    },
    { label: "Votes Logged", value: stats.votesLogged, icon: Vote },
    {
      label: "AI Decisions Reviewed",
      value: stats.aiDecisionsReviewed,
      icon: Bot,
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="transparency.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.55 0.22 195 / 0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 70%, oklch(0.72 0.16 75 / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Standardized grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase"
              style={{
                borderColor: "oklch(0.55 0.22 195 / 0.3)",
                background: "oklch(0.55 0.22 195 / 0.07)",
                color: "oklch(0.72 0.16 190)",
              }}
            >
              <Shield className="h-3.5 w-3.5" />
              Phase 6 — Transparency & Accountability
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-hero-xl font-display mb-5"
          >
            <span style={{ color: "oklch(var(--pearl))" }}>
              Radical Transparency.
            </span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.16 190) 0%, oklch(0.55 0.22 195) 60%, oklch(0.72 0.16 75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Accountable Governance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="text-base sm:text-lg max-w-2xl mb-6 leading-relaxed"
            style={{ color: "oklch(0.65 0.04 260)" }}
          >
            Every budget line, audit finding, delegate vote, AI decision, and
            contract — open to all. No hidden ledgers. No closed doors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#budget">
              <Button
                size="sm"
                className="gap-2 btn-gold"
                data-ocid="transparency.hero.budget.button"
              >
                <BarChart3 className="h-4 w-4" />
                View Budget
              </Button>
            </a>
            <a href="#voting">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.55 0.22 195 / 0.4)",
                  color: "oklch(0.72 0.16 190)",
                }}
                data-ocid="transparency.hero.voting.button"
              >
                <Vote className="h-4 w-4" />
                Voting Records
              </Button>
            </a>
            <a href="#ai-decisions">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.62 0.18 270 / 0.4)",
                  color: "oklch(0.72 0.14 270)",
                }}
                data-ocid="transparency.hero.ai_log.button"
              >
                <Bot className="h-4 w-4" />
                AI Decision Log
              </Button>
            </a>
            <a href="#finfracfran">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.78 0.18 85 / 0.4)",
                  color: "oklch(0.78 0.18 85)",
                }}
                data-ocid="finfracfran.hero.link"
              >
                <Coins className="h-4 w-4" />
                FinFracFran™ Disclosures
              </Button>
            </a>
          </motion.div>

          <HeroStats stats={heroStats} />
        </div>
      </section>

      {/* ── Callout strip ── */}
      <div
        className="py-4 text-center text-sm font-semibold tracking-wide"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.55 0.22 195 / 0.08), oklch(0.72 0.16 75 / 0.08))",
          borderTop: "1px solid oklch(0.55 0.22 195 / 0.2)",
          borderBottom: "1px solid oklch(0.55 0.22 195 / 0.2)",
          color: "oklch(0.72 0.16 190)",
        }}
      >
        🔍 Every record is immutable, on-chain, and open to every citizen of
        Earth.
      </div>

      {/* ── Budget & Audit sections (Part C) ── */}
      <BudgetSection />
      <AuditSection />

      {/* ── Voting Record Ledger (Part D) ── */}
      <VotingLedgerSection />

      {/* ── AI Decision Log (Part E) ── */}
      <AIDecisionLogSection />

      {/* ── Open Contracts (Part F2) ── */}
      <OpenContractsSection />

      {/* ── FinFracFran™ Disclosure Hub (Part G) ── */}
      <FinFracFranDisclosureSection />

      {/* ── Footer nav ── */}
      <section
        className="py-12 border-t"
        style={{ borderColor: "oklch(var(--gold-dim) / 0.15)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <Link to="/governance">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                style={{
                  borderColor: "oklch(var(--gold) / 0.3)",
                  color: "oklch(var(--gold))",
                }}
                data-ocid="transparency.nav.governance.button"
              >
                Governance Hub
              </Button>
            </Link>
            <Link to="/resolutions">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.55 0.22 195 / 0.3)",
                  color: "oklch(0.6 0.14 195)",
                }}
                data-ocid="transparency.nav.resolutions.button"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                Resolution Tracker
              </Button>
            </Link>
            <Link to="/policy-advisor">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.62 0.18 270 / 0.3)",
                  color: "oklch(0.65 0.14 270)",
                }}
                data-ocid="transparency.nav.policy_advisor.button"
              >
                <Bot className="h-3.5 w-3.5" />
                AI Policy Advisor
              </Button>
            </Link>
          </div>
          <p className="text-xs" style={{ color: "oklch(0.38 0.04 260)" }}>
            Phase 6 — Transparency & Accountability Portal
          </p>
        </div>
      </section>
    </main>
  );
}
