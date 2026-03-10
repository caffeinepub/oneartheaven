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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DELEGATE_COUNCIL_OPTIONS,
  DELEGATE_REGIONS,
} from "@/data/delegateData";
import type { RoleFilter, SortBy } from "@/hooks/useDelegates";
import { useDelegates } from "@/hooks/useDelegates";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Brain,
  ChevronRight,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function aiScoreColor(score: number): string {
  if (score >= 95) return "oklch(0.68 0.2 145)";
  if (score >= 88) return "oklch(0.72 0.16 75)";
  if (score >= 78) return "oklch(0.55 0.18 200)";
  return "oklch(0.62 0.22 25)";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  accent,
  delay,
}: {
  value: string | number;
  label: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      className="rounded-2xl p-5 flex flex-col gap-1"
      style={{
        background: "oklch(0.12 0.04 260 / 0.8)",
        border: `1px solid ${accent}33`,
        boxShadow: `0 4px 24px ${accent}15`,
      }}
    >
      <span
        className="font-display text-3xl font-bold"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span
        className="text-xs tracking-wide"
        style={{ color: "oklch(0.55 0.04 260)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Delegate Card ────────────────────────────────────────────────────────────

function DelegateCard({
  delegate,
  index,
}: {
  delegate: ReturnType<typeof useDelegates>["filtered"][number];
  index: number;
}) {
  const scoreColor = aiScoreColor(delegate.aiAlignmentScore);
  const visibleCouncils = delegate.councilMemberships.slice(0, 3);
  const extraCouncils = delegate.councilMemberships.length - 3;

  return (
    <Link
      to="/delegates/$delegateId"
      params={{ delegateId: delegate.id }}
      data-ocid={`delegates.item.${index + 1}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative rounded-2xl p-6 h-full cursor-pointer transition-all duration-300"
        style={{
          background: "oklch(0.11 0.04 260 / 0.95)",
          border: delegate.isChair
            ? "1px solid oklch(var(--gold) / 0.4)"
            : "1px solid oklch(0.22 0.04 260)",
          boxShadow: delegate.isChair
            ? "0 0 24px oklch(var(--gold) / 0.07)"
            : "none",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.16 75 / 0.04) 0%, transparent 70%)",
          }}
        />

        {/* Chair badge */}
        {delegate.isChair && (
          <div className="absolute top-3 right-3">
            <Badge
              className="text-xs font-bold"
              style={{
                background: "oklch(0.72 0.16 75 / 0.12)",
                border: "1px solid oklch(0.72 0.16 75 / 0.4)",
                color: "oklch(0.72 0.16 75)",
              }}
            >
              ★ Chair
            </Badge>
          </div>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.16 75 / 0.15), oklch(0.55 0.14 195 / 0.1))",
              border: "2px solid oklch(0.72 0.16 75 / 0.25)",
              color: "oklch(var(--pearl))",
            }}
          >
            {getInitials(delegate.name)}
            <span className="absolute -bottom-1 -right-1 text-base leading-none">
              {delegate.regionFlag}
            </span>
          </div>
          <div className="min-w-0">
            <h3
              className="font-display font-bold text-base leading-tight truncate"
              style={{ color: "oklch(var(--pearl))" }}
            >
              {delegate.name}
            </h3>
            <p
              className="text-xs mt-0.5 leading-snug line-clamp-2"
              style={{ color: "oklch(0.55 0.04 260)" }}
            >
              {delegate.affiliation}
            </p>
          </div>
        </div>

        {/* Council memberships */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {visibleCouncils.map((c) => (
            <span
              key={c.councilId}
              className="inline-block px-2 py-0.5 rounded-md text-xs font-medium"
              style={{
                background: "oklch(0.55 0.14 195 / 0.12)",
                border: "1px solid oklch(0.55 0.14 195 / 0.25)",
                color: "oklch(0.65 0.14 195)",
              }}
            >
              {c.councilName.split(" ")[0]}
            </span>
          ))}
          {extraCouncils > 0 && (
            <span
              className="inline-block px-2 py-0.5 rounded-md text-xs"
              style={{
                color: "oklch(0.45 0.04 260)",
                background: "oklch(0.18 0.03 260)",
              }}
            >
              +{extraCouncils} more
            </span>
          )}
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {delegate.expertiseTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 rounded-full text-xs"
              style={{
                background: "oklch(0.72 0.16 75 / 0.08)",
                border: "1px solid oklch(0.72 0.16 75 / 0.18)",
                color: "oklch(0.72 0.16 75 / 0.85)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid oklch(0.2 0.03 260)" }}
        >
          <div className="flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5" style={{ color: scoreColor }} />
            <span
              className="text-xs font-semibold"
              style={{ color: scoreColor }}
            >
              {delegate.aiAlignmentScore}
            </span>
            <span className="text-xs" style={{ color: "oklch(0.4 0.03 260)" }}>
              AI score
            </span>
          </div>
          {delegate.finFracFranRole && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.68 0.2 145 / 0.1)",
                border: "1px solid oklch(0.68 0.2 145 / 0.25)",
                color: "oklch(0.68 0.2 145)",
              }}
            >
              FinFracFran™
            </span>
          )}
          <ChevronRight
            className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
            style={{ color: "oklch(0.4 0.03 260)" }}
          />
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function DelegatesPage() {
  const {
    filtered,
    stats,
    filters,
    setFilters,
    activeFilterCount,
    clearFilters,
  } = useDelegates();

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Hero ── */}
      <section
        data-ocid="delegates.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, oklch(0.72 0.16 75 / 0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 80% 60%, oklch(0.55 0.14 195 / 0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Phase badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.72 0.16 75 / 0.3)",
              background: "oklch(0.72 0.16 75 / 0.07)",
            }}
          >
            <Users
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.72 0.16 75)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              Phase 2.5 — Delegate Registry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold leading-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              color: "oklch(var(--pearl))",
            }}
          >
            Meet the{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.82 0.18 85))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Delegates
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-3 leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            {stats.totalDelegates} delegates from every region of the world,
            serving{" "}
            <span style={{ color: "oklch(0.72 0.16 75)" }}>
              {stats.totalCouncils} councils
            </span>{" "}
            with an average AI alignment score of{" "}
            <span style={{ color: "oklch(0.68 0.2 145)" }}>
              {stats.avgAlignmentScore}
            </span>
            .
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-px mx-auto mb-8"
        style={{
          maxWidth: "240px",
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.16 75 / 0.35), oklch(0.55 0.14 195 / 0.3), transparent)",
        }}
      />

      {/* ── Stats Bar ── */}
      <section
        data-ocid="delegates.stats.section"
        className="max-w-6xl mx-auto px-4 sm:px-6 mb-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value={stats.totalDelegates}
            label="Total Delegates"
            accent="oklch(0.72 0.16 75)"
            delay={0.1}
          />
          <StatCard
            value={stats.totalCouncils}
            label="Councils Represented"
            accent="oklch(0.55 0.14 195)"
            delay={0.2}
          />
          <StatCard
            value={`${stats.avgAlignmentScore}%`}
            label="Avg AI Alignment"
            accent="oklch(0.68 0.2 145)"
            delay={0.3}
          />
          <StatCard
            value={stats.chairCount}
            label="Chairs & Co-Chairs"
            accent="oklch(0.82 0.18 85)"
            delay={0.4}
          />
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section
        data-ocid="delegates.filters.section"
        className="max-w-6xl mx-auto px-4 sm:px-6 mb-10"
      >
        <div
          className="rounded-2xl p-5"
          style={{
            background: "oklch(0.11 0.04 260 / 0.9)",
            border: "1px solid oklch(0.22 0.04 260)",
          }}
        >
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.45 0.04 260)" }}
              />
              <Input
                data-ocid="delegates.search_input"
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                placeholder="Search delegates, expertise…"
                className="pl-9 h-9 bg-transparent text-sm"
                style={{
                  borderColor: "oklch(0.25 0.04 260)",
                  color: "oklch(var(--pearl))",
                }}
              />
            </div>

            {/* Council filter */}
            <Select
              value={filters.councilFilter}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, councilFilter: v }))
              }
            >
              <SelectTrigger
                data-ocid="delegates.council.select"
                className="w-48 h-9 text-sm"
                style={{
                  borderColor: "oklch(0.25 0.04 260)",
                  background: "transparent",
                  color: "oklch(0.65 0.04 260)",
                }}
              >
                <SelectValue placeholder="All Councils" />
              </SelectTrigger>
              <SelectContent>
                {DELEGATE_COUNCIL_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region filter */}
            <Select
              value={filters.regionFilter}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, regionFilter: v }))
              }
            >
              <SelectTrigger
                data-ocid="delegates.region.select"
                className="w-44 h-9 text-sm"
                style={{
                  borderColor: "oklch(0.25 0.04 260)",
                  background: "transparent",
                  color: "oklch(0.65 0.04 260)",
                }}
              >
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                {DELEGATE_REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Role filter tabs */}
            <Tabs
              value={filters.roleFilter}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, roleFilter: v as RoleFilter }))
              }
            >
              <TabsList
                data-ocid="delegates.role.tab"
                className="h-9"
                style={{ background: "oklch(0.14 0.04 260)" }}
              >
                <TabsTrigger value="all" className="text-xs px-3 h-7">
                  All
                </TabsTrigger>
                <TabsTrigger value="chair" className="text-xs px-3 h-7">
                  Chairs
                </TabsTrigger>
                <TabsTrigger value="member" className="text-xs px-3 h-7">
                  Members
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Sort */}
            <Select
              value={filters.sortBy}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, sortBy: v as SortBy }))
              }
            >
              <SelectTrigger
                data-ocid="delegates.sort.select"
                className="w-36 h-9 text-sm"
                style={{
                  borderColor: "oklch(0.25 0.04 260)",
                  background: "transparent",
                  color: "oklch(0.65 0.04 260)",
                }}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="aiScore">AI Score</SelectItem>
                <SelectItem value="joinedYear">Joined Year</SelectItem>
              </SelectContent>
            </Select>

            {/* Active filters + clear */}
            {activeFilterCount > 0 && (
              <Button
                data-ocid="delegates.clear_filters.button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 gap-1.5 text-xs"
                style={{ color: "oklch(0.62 0.22 25)" }}
              >
                <X className="h-3.5 w-3.5" />
                Clear ({activeFilterCount})
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── Delegate Grid ── */}
      <section
        data-ocid="delegates.list"
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-20"
      >
        {filtered.length === 0 ? (
          <motion.div
            data-ocid="delegates.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Sparkles
              className="h-12 w-12 mx-auto mb-4"
              style={{ color: "oklch(0.72 0.16 75 / 0.3)" }}
            />
            <p
              className="font-display text-xl font-semibold mb-2"
              style={{ color: "oklch(0.55 0.04 260)" }}
            >
              No delegates found
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.4 0.03 260)" }}
            >
              Try adjusting your filters or search terms.
            </p>
            <Button
              data-ocid="delegates.empty_state.button"
              variant="outline"
              size="sm"
              onClick={clearFilters}
              style={{
                borderColor: "oklch(0.72 0.16 75 / 0.3)",
                color: "oklch(0.72 0.16 75)",
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((delegate, idx) => (
              <DelegateCard key={delegate.id} delegate={delegate} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* ── Back ── */}
      <section className="pb-16 max-w-6xl mx-auto px-4 sm:px-6">
        <Link to="/governance" data-ocid="delegates.back.link">
          <Button
            variant="outline"
            className="gap-2"
            style={{
              borderColor: "oklch(0.72 0.16 75 / 0.3)",
              color: "oklch(0.72 0.16 75)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Governance Hub
          </Button>
        </Link>
      </section>
    </main>
  );
}
