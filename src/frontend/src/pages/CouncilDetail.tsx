// ─── Council Detail Page ──────────────────────────────────────────────────────
// Phase 2.2 — /councils/:councilId

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type CouncilDetail,
  type ResolutionStatus,
  getCouncilById,
} from "@/data/councilsData";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Calendar,
  ChevronRight,
  Crown,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ResolutionStatus,
  { color: string; bg: string; label: string }
> = {
  draft: {
    color: "oklch(0.72 0.04 260)",
    bg: "oklch(0.55 0.04 260 / 0.2)",
    label: "Draft",
  },
  deliberating: {
    color: "oklch(0.62 0.16 215)",
    bg: "oklch(0.62 0.16 215 / 0.15)",
    label: "Deliberating",
  },
  voting: {
    color: "oklch(0.72 0.18 75)",
    bg: "oklch(0.72 0.18 75 / 0.15)",
    label: "Voting",
  },
  passed: {
    color: "oklch(0.65 0.18 145)",
    bg: "oklch(0.65 0.18 145 / 0.15)",
    label: "Passed",
  },
  rejected: {
    color: "oklch(0.62 0.18 25)",
    bg: "oklch(0.62 0.18 25 / 0.15)",
    label: "Rejected",
  },
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ResolutionStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5"
        style={{ background: "oklch(0.22 0.04 260)" }}
      >
        {icon}
      </div>
      <div>
        <h2
          className="font-display text-xl font-bold"
          style={{ color: "oklch(0.92 0.02 95)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-sm mt-0.5"
            style={{ color: "oklch(0.58 0.04 260)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function CouncilNotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-6">🔍</div>
        <h1
          className="font-display text-3xl font-bold mb-3"
          style={{ color: "oklch(0.92 0.02 95)" }}
        >
          Council Not Found
        </h1>
        <p className="mb-8" style={{ color: "oklch(0.6 0.04 260)" }}>
          This council doesn't exist or the URL may be incorrect.
        </p>
        <Link to="/councils">
          <Button
            className="gap-2"
            style={{
              background: "oklch(0.65 0.18 145)",
              color: "oklch(0.08 0.03 260)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Councils
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CouncilDetailPage() {
  const { councilId } = useParams({ strict: false });
  const council = councilId ? getCouncilById(councilId) : undefined;

  if (!council) {
    return <CouncilNotFound />;
  }

  const activeResolutions = council.resolutions.filter(
    (r) =>
      r.status !== "draft" && r.status !== "passed" && r.status !== "rejected",
  );
  const draftResolutions = council.resolutions.filter(
    (r) => r.status === "draft",
  );
  const concludedResolutions = council.resolutions.filter(
    (r) => r.status === "passed" || r.status === "rejected",
  );

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="council.detail.hero.section"
        className="relative overflow-hidden py-20 sm:py-24"
      >
        {/* Background glow using council accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 55% at 50% 40%, ${council.accentColor}12 0%, transparent 65%)`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-medium mb-8 flex-wrap"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            <Link
              to="/"
              className="hover:underline"
              style={{ color: "oklch(var(--teal))" }}
            >
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/governance"
              className="hover:underline"
              style={{ color: "oklch(var(--teal))" }}
            >
              Governance
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/councils"
              className="hover:underline"
              data-ocid="council.back.link"
              style={{ color: "oklch(var(--teal))" }}
            >
              Councils
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color: "oklch(0.75 0.04 260)" }}>
              {council.shortName}
            </span>
          </motion.nav>

          {/* Icon + title */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center justify-center w-20 h-20 rounded-2xl text-4xl shrink-0"
              style={{ background: `${council.accentColor}20` }}
            >
              {council.icon}
            </motion.div>

            <div className="flex-1">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-wrap gap-2 mb-3"
              >
                <span
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: `${council.accentColor}18`,
                    color: council.accentColor,
                    border: `1px solid ${council.accentColor}35`,
                  }}
                >
                  Phase 2.2 Council
                </span>
                {council.finFracFranApplicable && (
                  <span
                    className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.72 0.18 75 / 0.15)",
                      color: "oklch(0.82 0.18 85)",
                      border: "1px solid oklch(0.72 0.18 75 / 0.3)",
                    }}
                  >
                    FinFracFran™ Applicable
                  </span>
                )}
                {council.sdgAlignment.map((sdg) => (
                  <span
                    key={sdg}
                    className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.55 0.14 195 / 0.12)",
                      color: "oklch(0.72 0.16 190)",
                      border: "1px solid oklch(0.55 0.14 195 / 0.25)",
                    }}
                  >
                    {sdg}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-3"
                style={{ color: council.accentColor }}
              >
                {council.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base leading-relaxed max-w-2xl"
                style={{ color: "oklch(0.7 0.03 260)" }}
              >
                {council.mandate}
              </motion.p>
            </div>
          </div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            {[
              {
                icon: <Users className="h-4 w-4" />,
                label: `${council.memberCount.toLocaleString()} Members`,
              },
              {
                icon: <Crown className="h-4 w-4" />,
                label: `${council.seatCount} Seats`,
              },
              {
                icon: <Calendar className="h-4 w-4" />,
                label: council.meetingCadence,
              },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{
                  background: "oklch(var(--cosmos-surface) / 0.7)",
                  color: "oklch(0.72 0.04 260)",
                  border: "1px solid oklch(0.25 0.04 260)",
                }}
              >
                <span style={{ color: council.accentColor }}>{icon}</span>
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 space-y-12">
        {/* Voting Model */}
        <motion.section
          data-ocid="council.voting.panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "oklch(var(--cosmos-surface) / 0.8)",
            border: "1px solid oklch(0.25 0.04 260)",
          }}
        >
          <SectionHeading
            icon={<span className="text-lg">🗳️</span>}
            title="Voting Model"
            subtitle="How decisions are made in this council"
          />

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: "Quorum Required",
                value: council.votingModel.quorum,
                color: "oklch(0.62 0.16 215)",
              },
              {
                label: "Pass Threshold",
                value: council.votingModel.passThreshold,
                color: "oklch(0.65 0.18 145)",
              },
              {
                label: "Weighting Basis",
                value: council.votingModel.weightingBasis,
                color: "oklch(0.72 0.18 75)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{ background: "oklch(0.12 0.03 260)" }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  {label}
                </p>
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "oklch(0.14 0.04 260)",
              border: "1px solid oklch(0.22 0.04 260)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.52 0.04 260)" }}
            >
              Consensus Process
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.72 0.03 260)" }}
            >
              {council.votingModel.consensusDescription}
            </p>
          </div>

          {council.votingModel.finFracFranNote && (
            <div
              className="rounded-xl p-4 flex gap-3"
              style={{
                background: "oklch(0.72 0.18 75 / 0.08)",
                border: "1px solid oklch(0.72 0.18 75 / 0.25)",
              }}
            >
              <span className="text-lg shrink-0">💡</span>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "oklch(0.82 0.18 85)" }}
                >
                  FinFracFran™ Application
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.72 0.03 260)" }}
                >
                  {council.votingModel.finFracFranNote}
                </p>
              </div>
            </div>
          )}
        </motion.section>

        {/* Seat Holders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            icon={<span className="text-lg">👥</span>}
            title="Seat Holders"
            subtitle={`${council.seatCount} active seats`}
          />

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.8)",
              border: "1px solid oklch(0.25 0.04 260)",
            }}
          >
            <Table data-ocid="council.seats.table">
              <TableHeader>
                <TableRow
                  style={{ borderBottom: "1px solid oklch(0.22 0.04 260)" }}
                >
                  <TableHead
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    Region
                  </TableHead>
                  <TableHead
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    Name
                  </TableHead>
                  <TableHead
                    className="text-xs font-bold uppercase tracking-widest hidden sm:table-cell"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    Role
                  </TableHead>
                  <TableHead
                    className="text-xs font-bold uppercase tracking-widest hidden md:table-cell"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    Affiliation
                  </TableHead>
                  <TableHead
                    className="text-xs font-bold uppercase tracking-widest hidden lg:table-cell"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    Joined
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {council.seatHolders.map((seat, i) => (
                  <TableRow
                    key={seat.id}
                    data-ocid={`council.seats.row.${i + 1}`}
                    style={{
                      borderBottom: "1px solid oklch(0.20 0.03 260)",
                      background: seat.isChair
                        ? `${council.accentColor}06`
                        : undefined,
                    }}
                  >
                    <TableCell>
                      <span className="text-xl" title={seat.region}>
                        {seat.regionFlag}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {seat.isChair && (
                          <Crown
                            className="h-3.5 w-3.5 shrink-0"
                            style={{ color: "oklch(0.82 0.18 85)" }}
                          />
                        )}
                        <span
                          className="font-semibold text-sm"
                          style={{
                            color: seat.isChair
                              ? "oklch(0.82 0.18 85)"
                              : "oklch(0.88 0.02 95)",
                          }}
                        >
                          {seat.name}
                        </span>
                      </div>
                      <p
                        className="text-xs mt-0.5 sm:hidden"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                      >
                        {seat.role}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                        style={{
                          background: `${council.accentColor}15`,
                          color: council.accentColor,
                          border: `1px solid ${council.accentColor}30`,
                        }}
                      >
                        {seat.role}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="hidden md:table-cell text-sm"
                      style={{ color: "oklch(0.65 0.03 260)" }}
                    >
                      {seat.affiliation}
                    </TableCell>
                    <TableCell
                      className="hidden lg:table-cell text-sm font-mono"
                      style={{ color: "oklch(0.55 0.04 260)" }}
                    >
                      {seat.joinedYear}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.section>

        {/* Resolutions */}
        <motion.section
          data-ocid="council.resolutions.section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            icon={<span className="text-lg">📋</span>}
            title="Resolutions"
            subtitle="Active, draft, and concluded resolutions"
          />

          <div className="space-y-3">
            {/* Active */}
            {activeResolutions.length > 0 && (
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Active
                </p>
                <div className="space-y-2">
                  {activeResolutions.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-start justify-between gap-4 rounded-xl p-4"
                      style={{
                        background: "oklch(var(--cosmos-surface) / 0.8)",
                        border: "1px solid oklch(0.25 0.04 260)",
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <StatusBadge status={res.status} />
                          <span
                            className="text-xs px-2 py-0.5 rounded font-mono font-bold"
                            style={{
                              background: "oklch(0.62 0.16 215 / 0.15)",
                              color: "oklch(0.72 0.16 190)",
                            }}
                          >
                            <Bot className="h-3 w-3 inline mr-1" />
                            AI {res.aiScore}
                          </span>
                        </div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "oklch(0.88 0.02 95)" }}
                        >
                          {res.title}
                        </p>
                      </div>
                      {res.proposalLink && (
                        <Link to={res.proposalLink as "/"}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 gap-1.5 text-xs"
                            style={{ color: "oklch(var(--teal))" }}
                          >
                            View
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Draft */}
            {draftResolutions.length > 0 && (
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3 mt-4"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Draft
                </p>
                <div className="space-y-2">
                  {draftResolutions.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-start justify-between gap-4 rounded-xl p-4"
                      style={{
                        background: "oklch(0.12 0.03 260)",
                        border: "1px solid oklch(0.20 0.03 260)",
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <StatusBadge status={res.status} />
                          <span
                            className="text-xs px-2 py-0.5 rounded font-mono font-bold"
                            style={{
                              background: "oklch(0.55 0.04 260 / 0.2)",
                              color: "oklch(0.6 0.04 260)",
                            }}
                          >
                            <Bot className="h-3 w-3 inline mr-1" />
                            AI {res.aiScore}
                          </span>
                        </div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "oklch(0.72 0.03 260)" }}
                        >
                          {res.title}
                        </p>
                      </div>
                      {res.proposalLink && (
                        <Link to={res.proposalLink as "/"}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 gap-1.5 text-xs"
                            style={{ color: "oklch(0.6 0.04 260)" }}
                          >
                            View
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Concluded */}
            {concludedResolutions.length > 0 && (
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3 mt-4"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Concluded
                </p>
                <div className="space-y-2">
                  {concludedResolutions.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-start justify-between gap-4 rounded-xl p-4"
                      style={{
                        background: "oklch(0.12 0.03 260)",
                        border: "1px solid oklch(0.20 0.03 260)",
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <StatusBadge status={res.status} />
                          <span
                            className="text-xs px-2 py-0.5 rounded font-mono font-bold"
                            style={{
                              background: "oklch(0.65 0.18 145 / 0.12)",
                              color: "oklch(0.72 0.16 190)",
                            }}
                          >
                            <Bot className="h-3 w-3 inline mr-1" />
                            AI {res.aiScore}
                          </span>
                        </div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "oklch(0.72 0.03 260)" }}
                        >
                          {res.title}
                        </p>
                      </div>
                      {res.proposalLink && (
                        <Link to={res.proposalLink as "/"}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 gap-1.5 text-xs"
                            style={{ color: "oklch(0.6 0.04 260)" }}
                          >
                            View
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Subcommittees */}
        <motion.section
          data-ocid="council.subcommittees.section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            icon={<span className="text-lg">🔬</span>}
            title="Subcommittees"
            subtitle={`${council.subcommittees.length} working groups`}
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {council.subcommittees.map((sub) => (
              <div
                key={sub.id}
                className="rounded-2xl p-5"
                style={{
                  background: "oklch(var(--cosmos-surface) / 0.8)",
                  border: `1px solid ${council.accentColor}25`,
                }}
              >
                <h3
                  className="font-display text-base font-bold mb-2 leading-snug"
                  style={{ color: council.accentColor }}
                >
                  {sub.name}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: "oklch(0.65 0.03 260)" }}
                >
                  {sub.focus}
                </p>
                <div
                  className="pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid oklch(0.22 0.04 260)" }}
                >
                  <div>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.52 0.04 260)" }}
                    >
                      Lead
                    </p>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.78 0.03 260)" }}
                    >
                      {sub.lead}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.52 0.04 260)" }}
                    >
                      Members
                    </p>
                    <p
                      className="text-xs font-bold font-mono"
                      style={{ color: council.accentColor }}
                    >
                      {sub.memberCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${council.accentColor}12 0%, oklch(0.55 0.14 195 / 0.08) 100%)`,
            border: `1px solid ${council.accentColor}30`,
          }}
        >
          <div className="text-4xl mb-4">{council.icon}</div>
          <h2
            className="font-display text-2xl font-bold mb-2"
            style={{ color: council.accentColor }}
          >
            Join {council.shortName}
          </h2>
          <p
            className="text-sm leading-relaxed mb-6 max-w-md mx-auto"
            style={{ color: "oklch(0.68 0.03 260)" }}
          >
            Apply for an open seat, join a subcommittee, or register as a
            council member to participate in deliberation and voting.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              data-ocid="council.apply.button"
              className="gap-2 font-semibold"
              style={{
                background: council.accentColor,
                color: "oklch(0.08 0.03 260)",
              }}
              onClick={() =>
                toast.info("Coming soon — seat applications open in Phase 2.5")
              }
            >
              Apply for a Seat
            </Button>
            <Link to="/councils" data-ocid="council.back.link">
              <Button
                variant="ghost"
                className="gap-2 w-full sm:w-auto"
                style={{ color: "oklch(var(--teal))" }}
              >
                <ArrowLeft className="h-4 w-4" />
                All Councils
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
