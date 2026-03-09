// ─── Councils of Action Hub Page ─────────────────────────────────────────────
// Phase 2.2 — /councils

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type CouncilDetail,
  getAllCouncils,
  getCouncilStats,
} from "@/data/councilsData";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bot, ChevronRight, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

// ─── Status color map ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  draft: "oklch(0.55 0.04 260)",
  deliberating: "oklch(0.62 0.16 215)",
  voting: "oklch(0.72 0.18 75)",
  passed: "oklch(0.65 0.18 145)",
  rejected: "oklch(0.62 0.18 25)",
};

// ─── Animated stat item ───────────────────────────────────────────────────────

function StatItem({
  value,
  label,
  delay,
  color,
}: {
  value: string | number;
  label: string;
  delay: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-1"
    >
      <span
        className="font-display text-3xl sm:text-4xl font-bold"
        style={{ color: color ?? "oklch(var(--gold))" }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
      <span
        className="text-xs sm:text-sm font-medium tracking-wide uppercase"
        style={{ color: "oklch(0.6 0.04 260)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Council Card ─────────────────────────────────────────────────────────────

function CouncilCard({
  council,
  index,
}: {
  council: CouncilDetail;
  index: number;
}) {
  const activeResolution = council.resolutions.find(
    (r) => r.status === "deliberating" || r.status === "voting",
  );
  const activeCount = council.resolutions.filter(
    (r) => r.status === "deliberating" || r.status === "voting",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
      data-ocid={`councils.card.${index + 1}`}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "oklch(var(--cosmos-surface) / 0.9)",
        border: `1px solid ${council.accentColor}30`,
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      whileHover={{
        boxShadow: `0 0 32px ${council.accentColor}40`,
        borderColor: `${council.accentColor}70`,
      }}
    >
      <Link
        to="/councils/$councilId"
        params={{ councilId: council.id }}
        data-ocid={`councils.card.link.${index + 1}`}
        className="block p-6 h-full"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl text-2xl shrink-0"
            style={{ background: `${council.accentColor}20` }}
          >
            {council.icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {council.finFracFranApplicable && (
              <Badge
                className="text-xs font-semibold tracking-wide"
                style={{
                  background: "oklch(0.72 0.18 75 / 0.15)",
                  color: "oklch(0.82 0.18 85)",
                  border: "1px solid oklch(0.72 0.18 75 / 0.3)",
                }}
              >
                FinFracFran™
              </Badge>
            )}
          </div>
        </div>

        {/* Name + description */}
        <h3
          className="font-display text-lg font-bold mb-2 leading-snug group-hover:underline decoration-dotted underline-offset-4"
          style={{ color: council.accentColor }}
        >
          {council.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-3"
          style={{ color: "oklch(0.7 0.03 260)" }}
        >
          {council.description}
        </p>

        {/* SDG tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {council.sdgAlignment.map((sdg) => (
            <span
              key={sdg}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: `${council.accentColor}18`,
                color: council.accentColor,
                border: `1px solid ${council.accentColor}30`,
              }}
            >
              {sdg}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-4 pt-3 mb-4"
          style={{ borderTop: "1px solid oklch(0.28 0.04 260)" }}
        >
          <div className="flex items-center gap-1.5">
            <Users
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.55 0.04 260)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.65 0.04 260)" }}
            >
              {council.memberCount.toLocaleString()} members
            </span>
          </div>
          {activeCount > 0 && (
            <div className="flex items-center gap-1.5">
              <Bot
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.55 0.04 260)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                {activeCount} active
              </span>
            </div>
          )}
        </div>

        {/* Top active resolution */}
        {activeResolution && (
          <div
            className="rounded-lg p-3"
            style={{ background: "oklch(0.12 0.03 260)" }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: STATUS_COLORS[activeResolution.status] }}
              >
                {activeResolution.status}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded font-mono font-bold"
                style={{
                  background: "oklch(0.62 0.16 215 / 0.15)",
                  color: "oklch(0.72 0.16 190)",
                }}
              >
                AI {activeResolution.aiScore}
              </span>
            </div>
            <p
              className="text-xs leading-snug line-clamp-2"
              style={{ color: "oklch(0.75 0.03 260)" }}
            >
              {activeResolution.title}
            </p>
          </div>
        )}

        {/* Chevron */}
        <div className="mt-4 flex items-center justify-end">
          <ChevronRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            style={{ color: council.accentColor }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CouncilsPage() {
  const councils = getAllCouncils();
  const stats = getCouncilStats();

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="councils.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        {/* Background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 35%, oklch(0.65 0.18 145 / 0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 20% 80%, oklch(0.62 0.16 215 / 0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-medium mb-8"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            <Link
              to="/"
              data-ocid="councils.back.link"
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
            <span style={{ color: "oklch(0.75 0.04 260)" }}>
              Councils of Action
            </span>
          </motion.nav>

          {/* Phase badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: "oklch(0.65 0.18 145 / 0.12)",
              color: "oklch(0.65 0.18 145)",
              border: "1px solid oklch(0.65 0.18 145 / 0.25)",
            }}
          >
            <Shield className="h-3 w-3" />
            Phase 2.2 — Governance
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
          >
            <span className="gold-gradient-text">Councils of Action</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
            style={{ color: "oklch(0.7 0.04 260)" }}
          >
            Nine thematic councils replacing the UN Security Council's permanent
            5-member veto with weighted consensus — where the most affected
            communities have the loudest voice.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            data-ocid="councils.stats.section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 px-8 rounded-2xl max-w-2xl"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.6)",
              border: "1px solid oklch(0.25 0.04 260)",
            }}
          >
            <StatItem
              value={stats.totalCouncils}
              label="Councils"
              delay={0.35}
            />
            <StatItem
              value={stats.totalSeats}
              label="Total Seats"
              delay={0.4}
              color="oklch(var(--teal-bright))"
            />
            <StatItem
              value={`${(stats.totalMembers / 1000).toFixed(0)}k+`}
              label="Members"
              delay={0.45}
              color="oklch(0.65 0.18 145)"
            />
            <StatItem
              value={stats.activeResolutions}
              label="Active Votes"
              delay={0.5}
              color="oklch(0.72 0.18 75)"
            />
          </motion.div>
        </div>
      </section>

      {/* ── No-Veto Explainer ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.14 195 / 0.1) 0%, oklch(0.65 0.18 145 / 0.08) 100%)",
            border: "1px solid oklch(0.55 0.14 195 / 0.25)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 text-xl"
              style={{ background: "oklch(0.55 0.14 195 / 0.15)" }}
            >
              🚫
            </div>
            <div>
              <h2
                className="font-display text-xl font-bold mb-2"
                style={{ color: "oklch(var(--teal-bright))" }}
              >
                No Permanent Veto — Ever
              </h2>
              <p
                className="text-sm leading-relaxed max-w-3xl"
                style={{ color: "oklch(0.72 0.03 260)" }}
              >
                The UN Security Council grants 5 permanent members absolute veto
                power, paralyzing action on the world's most urgent crises.
                ONEartHeaven replaces this with{" "}
                <strong style={{ color: "oklch(0.82 0.18 85)" }}>
                  9 thematic councils
                </strong>{" "}
                operating on weighted consensus — voting power is proportional
                to who is most affected, not who has the most military. No
                single nation, bloc, or interest group can unilaterally block
                global action.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Council Cards Grid ── */}
      <section
        data-ocid="councils.grid.section"
        className="max-w-5xl mx-auto px-4 sm:px-6 pb-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <h2
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(0.92 0.02 95)" }}
          >
            All 9 Councils
          </h2>
          <Link to="/governance">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              style={{ color: "oklch(var(--teal))" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Governance Hub
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {councils.map((council, i) => (
            <CouncilCard key={council.id} council={council} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
