import { AssemblyDetailSheet } from "@/components/assembly/AssemblyDetailSheet";
import { SubmitProposalDialog } from "@/components/assembly/SubmitProposalDialog";
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
  COUNCILS,
  type CouncilId,
  type Proposal,
  type ProposalStatus,
  REGION_LABELS,
  type RegionTag,
  STATUS_CONFIG,
} from "@/data/assemblyData";
import { useAssembly } from "@/hooks/useAssembly";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  FileText,
  Filter,
  Globe2,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

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
        className="text-xs sm:text-sm font-medium mt-1 tracking-wide"
        style={{ color: "oklch(0.62 0.04 260)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProposalStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  );
}

// ─── AI Score Badge ───────────────────────────────────────────────────────────

function AIScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85
      ? "oklch(0.68 0.2 145)"
      : score >= 70
        ? "oklch(0.72 0.18 85)"
        : "oklch(0.62 0.22 25)";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
      style={{
        color,
        background: `${color.replace("oklch(", "oklch(").replace(")", " / 0.12)")}`,
        border: `1px solid ${color.replace("oklch(", "oklch(").replace(")", " / 0.3)")}`,
      }}
    >
      <Bot className="h-3 w-3" />
      {score}
    </span>
  );
}

// ─── Proposal Card ────────────────────────────────────────────────────────────

function ProposalCard({
  proposal,
  index,
  onSelect,
}: {
  proposal: Proposal;
  index: number;
  onSelect: (id: string) => void;
}) {
  const council = COUNCILS.find((c) => c.id === proposal.councilId);
  const totalVotes =
    proposal.voteTally.for +
    proposal.voteTally.against +
    proposal.voteTally.abstain;

  return (
    <motion.article
      data-ocid={`assembly.proposal.card.${index + 1}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onClick={() => onSelect(proposal.id)}
      className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-250"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.18 0.03 260)",
        boxShadow: "0 2px 12px oklch(0.05 0.02 260 / 0.5)",
      }}
      whileHover={{ y: -2 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.16 75 / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top row: council + status + AI */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {council && (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              color: council.color,
              background: `${council.color.replace("oklch(", "oklch(").replace(")", " / 0.12)")}`,
              border: `1px solid ${council.color.replace("oklch(", "oklch(").replace(")", " / 0.28)")}`,
            }}
          >
            <span>{council.icon}</span>
            {council.name}
          </span>
        )}
        <StatusBadge status={proposal.status} />
        <div className="ml-auto">
          <AIScoreBadge score={proposal.aiAlignmentScore} />
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-base sm:text-lg leading-snug mb-2 group-hover:text-[oklch(var(--gold))] transition-colors duration-200"
        style={{ color: "oklch(0.92 0.02 260)" }}
      >
        {proposal.title}
      </h3>

      {/* Summary */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-2"
        style={{ color: "oklch(0.60 0.04 260)" }}
      >
        {proposal.summary}
      </p>

      {/* Vote bar (only when votes exist) */}
      {totalVotes > 0 && (
        <div className="mb-4">
          <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
            <div
              className="rounded-l-full transition-all duration-500"
              style={{
                width: `${Math.round((proposal.voteTally.for / totalVotes) * 100)}%`,
                background: "oklch(0.68 0.2 145)",
              }}
            />
            <div
              style={{
                width: `${Math.round((proposal.voteTally.against / totalVotes) * 100)}%`,
                background: "oklch(0.62 0.22 25)",
              }}
            />
            <div
              className="rounded-r-full"
              style={{
                width: `${Math.round((proposal.voteTally.abstain / totalVotes) * 100)}%`,
                background: "oklch(0.42 0.04 260)",
              }}
            />
          </div>
          <div className="flex gap-4 mt-1.5">
            <span className="text-xs" style={{ color: "oklch(0.68 0.2 145)" }}>
              {proposal.voteTally.for.toLocaleString()} for
            </span>
            <span className="text-xs" style={{ color: "oklch(0.62 0.22 25)" }}>
              {proposal.voteTally.against.toLocaleString()} against
            </span>
            <span
              className="text-xs ml-auto"
              style={{ color: "oklch(0.42 0.04 260)" }}
            >
              {totalVotes.toLocaleString()} total
            </span>
          </div>
        </div>
      )}

      {/* Footer: submitter + region + deliberations + CTA */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="text-xs flex items-center gap-1"
          style={{ color: "oklch(0.50 0.04 260)" }}
        >
          <FileText className="h-3 w-3" />
          {proposal.submittedBy}
        </span>
        <span
          className="text-xs flex items-center gap-1"
          style={{ color: "oklch(0.50 0.04 260)" }}
        >
          <MapPin className="h-3 w-3" />
          {REGION_LABELS[proposal.submitterRegion]}
        </span>
        <span
          className="text-xs flex items-center gap-1"
          style={{ color: "oklch(0.50 0.04 260)" }}
        >
          <ThumbsUp className="h-3 w-3" />
          {proposal.deliberations.length} deliberations
        </span>
        {proposal.finfracfranApplicable && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              color: "oklch(0.72 0.18 85)",
              background: "oklch(0.72 0.18 85 / 0.1)",
              border: "1px solid oklch(0.72 0.18 85 / 0.25)",
            }}
          >
            FinFracFran™
          </span>
        )}
        <div
          className="ml-auto flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-200"
          style={{ color: "oklch(var(--gold))" }}
        >
          View
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({
  filters,
  onUpdate,
  onReset,
  totalCount,
  filteredCount,
}: {
  filters: ReturnType<typeof useAssembly>["filters"];
  onUpdate: ReturnType<typeof useAssembly>["updateFilter"];
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.council !== "all" ||
    filters.region !== "all";

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 mb-6"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.18 0.03 260)",
      }}
    >
      {/* Search row */}
      <div className="flex gap-3 mb-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "oklch(0.45 0.04 260)" }}
          />
          <Input
            data-ocid="assembly.search.input"
            placeholder="Search proposals, submitters…"
            value={filters.search}
            onChange={(e) => onUpdate("search", e.target.value)}
            className="pl-9 bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.85_0.02_260)] placeholder:text-[oklch(0.42_0.04_260)] focus-visible:ring-[oklch(var(--gold)/0.4)]"
          />
        </div>
        <Button
          data-ocid="assembly.filter.toggle"
          variant="outline"
          size="icon"
          onClick={() => setShowAdvanced((v) => !v)}
          className="shrink-0 border-[oklch(0.22_0.04_260)]"
          style={{
            color: showAdvanced ? "oklch(var(--gold))" : "oklch(0.55 0.04 260)",
            background: showAdvanced
              ? "oklch(var(--gold) / 0.08)"
              : "transparent",
          }}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Advanced filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-1">
              {/* Status */}
              <Select
                value={filters.status}
                onValueChange={(v) =>
                  onUpdate("status", v as ProposalStatus | "all")
                }
              >
                <SelectTrigger
                  data-ocid="assembly.status.select"
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)] text-sm"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {(Object.keys(STATUS_CONFIG) as ProposalStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_CONFIG[s].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Council */}
              <Select
                value={filters.council}
                onValueChange={(v) =>
                  onUpdate("council", v as CouncilId | "all")
                }
              >
                <SelectTrigger
                  data-ocid="assembly.council.select"
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

              {/* Region */}
              <Select
                value={filters.region}
                onValueChange={(v) =>
                  onUpdate("region", v as RegionTag | "all")
                }
              >
                <SelectTrigger
                  data-ocid="assembly.region.select"
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)] text-sm"
                >
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {(Object.entries(REGION_LABELS) as [RegionTag, string][]).map(
                    ([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                value={filters.sort}
                onValueChange={(v) =>
                  onUpdate(
                    "sort",
                    v as "newest" | "oldest" | "most_votes" | "ai_score",
                  )
                }
              >
                <SelectTrigger
                  data-ocid="assembly.sort.select"
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)] text-sm"
                >
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most_votes">Most Votes</SelectItem>
                  <SelectItem value="ai_score">AI Alignment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results row */}
      <div className="flex items-center gap-3 mt-2">
        <span
          className="text-xs flex items-center gap-1"
          style={{ color: "oklch(0.50 0.04 260)" }}
        >
          <Filter className="h-3 w-3" />
          {filteredCount === totalCount
            ? `${totalCount} proposals`
            : `${filteredCount} of ${totalCount}`}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            data-ocid="assembly.filter.reset"
            onClick={onReset}
            className="text-xs flex items-center gap-1 transition-colors duration-150"
            style={{ color: "oklch(0.62 0.22 25)" }}
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Assembly Page ────────────────────────────────────────────────────────────

export function AssemblyPage() {
  const assembly = useAssembly();

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="assembly.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        {/* Background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 35%, oklch(0.55 0.18 200 / 0.09) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 80% 65%, oklch(0.72 0.16 75 / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Standardized grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Phase badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.55 0.18 200 / 0.35)",
              background: "oklch(0.55 0.18 200 / 0.08)",
            }}
          >
            <Globe2
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.55 0.18 200)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.55 0.18 200)" }}
            >
              Phase 2.1 — Global Assembly
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-hero-xl font-display mb-5"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.04 260) 0%, oklch(0.55 0.18 200) 50%, oklch(0.72 0.16 75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Global Assembly
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.68 0.04 260)" }}
          >
            Every registered member has a voice. Proposals are deliberated
            openly, analysed by AI, and decided by{" "}
            <span style={{ color: "oklch(0.72 0.16 75)" }}>
              weighted consensus
            </span>{" "}
            — not veto power.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-10"
          >
            <StatCard
              value={assembly.stats.totalProposals}
              label="Active Proposals"
              color="oklch(0.55 0.18 200)"
              delay={0.5}
            />
            <StatCard
              value={assembly.stats.activeVotes}
              label="Open Votes"
              color="oklch(0.68 0.2 145)"
              delay={0.55}
            />
            <StatCard
              value={assembly.stats.deliberating}
              label="In Deliberation"
              color="oklch(0.72 0.18 85)"
              delay={0.6}
            />
            <StatCard
              value={assembly.stats.members.toLocaleString()}
              label="Assembly Members"
              color="oklch(0.72 0.16 75)"
              delay={0.65}
            />
            <StatCard
              value={assembly.stats.countries}
              label="Nations"
              color="oklch(0.62 0.04 260)"
              delay={0.7}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button
              data-ocid="assembly.submit.open_modal_button"
              onClick={() => assembly.setSubmitDialogOpen(true)}
              size="lg"
              className="gap-2 font-semibold hover:scale-105 transition-transform"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 200) 0%, oklch(0.48 0.16 220) 100%)",
                color: "oklch(0.96 0.01 260)",
                border: "none",
              }}
            >
              <Plus className="h-4 w-4" />
              Submit a Proposal
            </Button>
            <Link to="/governance" data-ocid="assembly.governance.link">
              <Button
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: "oklch(0.55 0.18 200 / 0.35)",
                  color: "oklch(0.55 0.18 200)",
                }}
              >
                <Users className="h-4 w-4" />
                Governance Hub
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gradient separator */}
      <div
        className="h-px mx-auto mb-12"
        style={{
          maxWidth: "240px",
          background:
            "linear-gradient(90deg, transparent, oklch(0.55 0.18 200 / 0.4), oklch(0.72 0.16 75 / 0.3), transparent)",
        }}
      />

      {/* ── Proposal Feed ── */}
      <section data-ocid="assembly.proposals.section" className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Filter bar */}
          <FilterBar
            filters={assembly.filters}
            onUpdate={assembly.updateFilter}
            onReset={assembly.resetFilters}
            totalCount={assembly.allProposals.length}
            filteredCount={assembly.proposals.length}
          />

          {/* Proposal list */}
          <AnimatePresence mode="wait">
            {assembly.proposals.length === 0 ? (
              <motion.div
                key="empty"
                data-ocid="assembly.proposals.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Globe2
                  className="h-12 w-12 mx-auto mb-4 opacity-20"
                  style={{ color: "oklch(0.55 0.18 200)" }}
                />
                <p
                  className="text-lg font-medium mb-2"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  No proposals match your filters
                </p>
                <button
                  type="button"
                  onClick={assembly.resetFilters}
                  className="text-sm underline underline-offset-4"
                  style={{ color: "oklch(0.55 0.18 200)" }}
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {assembly.proposals.map((proposal, idx) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    index={idx}
                    onSelect={assembly.setSelectedProposalId}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Back to home */}
      <div className="pb-12 max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/" data-ocid="assembly.back.link">
          <Button
            variant="outline"
            className="gap-2"
            style={{
              borderColor: "oklch(0.55 0.18 200 / 0.3)",
              color: "oklch(0.55 0.18 200)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* ── Detail Sheet (B2b) ── */}
      <AssemblyDetailSheet
        proposal={assembly.selectedProposal}
        onClose={() => assembly.setSelectedProposalId(null)}
        userVote={
          assembly.selectedProposalId
            ? assembly.userVotes[assembly.selectedProposalId]
            : undefined
        }
        onVote={(vote) => {
          if (assembly.selectedProposalId) {
            assembly.castVote(assembly.selectedProposalId, vote);
          }
        }}
      />

      {/* ── Submit Dialog (B2c) ── */}
      <SubmitProposalDialog
        open={assembly.submitDialogOpen}
        onOpenChange={assembly.setSubmitDialogOpen}
      />
    </main>
  );
}
