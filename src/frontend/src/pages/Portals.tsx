import { SearchInput } from "@/components/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { usePortals } from "@/hooks/usePortals";
import { Link } from "@tanstack/react-router";
import { Building2, Globe, Users, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function PortalsPage() {
  const {
    filteredPortals,
    search,
    setSearch,
    filterFinFracFran,
    setFilterFinFracFran,
    stats,
  } = usePortals();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <section
        data-ocid="portals.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        {/* Background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 35%, oklch(0.72 0.16 75 / 0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 80% 70%, oklch(0.65 0.18 145 / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Standardized grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Phase badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.72 0.16 75 / 0.35)",
              background: "oklch(0.72 0.16 75 / 0.08)",
            }}
          >
            <Zap
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.72 0.16 75)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              Phase 4 — Thematic Action Portals
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-hero-xl font-display mb-5 gold-gradient-text"
          >
            Take Action Now
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            Nine thematic action portals — where global policy becomes local
            reality. Join initiatives, access open resources, and replicate
            proven solutions through FinFracFran™.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            <Button
              size="lg"
              className="btn-gold gap-2 hover:scale-105 transition-transform"
              data-ocid="portals.explore.primary_button"
              onClick={() =>
                document
                  .getElementById("portals-grid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Globe className="h-4 w-4" />
              Explore Portals
            </Button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                icon: Users,
                label: "Volunteers",
                value: formatNum(stats.totalVolunteers),
                delay: 0.5,
              },
              {
                icon: Globe,
                label: "Nations",
                value: stats.totalNations,
                delay: 0.6,
              },
              {
                icon: Zap,
                label: "Initiatives",
                value: stats.totalInitiatives,
                delay: 0.7,
              },
              {
                icon: Building2,
                label: "Partners",
                value: stats.totalPartners,
                delay: 0.8,
              },
            ].map(({ icon: Icon, label, value }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1 + 0.5 }}
                className="rounded-2xl px-4 py-4 flex flex-col gap-1"
                style={{
                  background: "oklch(0.12 0.04 260 / 0.8)",
                  border: "1px solid oklch(0.72 0.16 75 / 0.15)",
                }}
              >
                <Icon
                  className="h-4 w-4 mx-auto mb-1"
                  style={{ color: "oklch(0.72 0.16 75)" }}
                />
                <div
                  className="font-display text-2xl font-bold text-center"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  {value}
                </div>
                <div
                  className="text-xs text-center uppercase tracking-wide"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* No Veto Strip */}
      <div className="border-y border-white/10 bg-white/3 py-3 px-4">
        <p className="text-center text-sm text-white/60">
          <span
            className="font-semibold"
            style={{ color: "oklch(0.72 0.18 75)" }}
          >
            No Veto. No Gatekeepers.
          </span>{" "}
          Every portal is open to all registered members — no nation-state
          permission required.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput
            data-ocid="portals.search.input"
            value={search}
            onChange={setSearch}
            placeholder="Search portals..."
            className="flex-1"
          />
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5">
            <Switch
              checked={filterFinFracFran}
              onCheckedChange={setFilterFinFracFran}
              className="data-[state=checked]:bg-amber-400"
            />
            <span className="text-sm text-white/70">FinFracFran™ only</span>
          </div>
        </div>

        {/* Portal Cards Grid */}
        <section data-ocid="portals.grid.section">
          <AnimatePresence mode="popLayout">
            {filteredPortals.length === 0 ? (
              <div
                data-ocid="portals.empty_state"
                className="text-center py-20 text-white/40"
              >
                No portals match your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortals.map((portal, i) => {
                  const topInitiative = portal.initiatives[0];
                  const cardOcid = `portals.card.${i + 1}`;
                  return (
                    <motion.div
                      key={portal.councilId}
                      data-ocid={cardOcid}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm overflow-hidden flex flex-col transition-shadow"
                      style={{ boxShadow: `0 0 0 0 ${portal.accentColor}` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          `0 0 40px -8px ${portal.accentColor}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          `0 0 0 0 ${portal.accentColor}`;
                      }}
                    >
                      {/* Card Top Gradient */}
                      <div
                        className="h-1.5 w-full"
                        style={{
                          background: `linear-gradient(90deg, ${portal.accentColor}, transparent)`,
                        }}
                      />

                      <div className="p-6 flex flex-col flex-1 gap-4">
                        {/* Header */}
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{portal.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-lg leading-tight">
                              {portal.name}
                            </h3>
                            <p className="text-sm text-white/60 mt-0.5 line-clamp-2">
                              {portal.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-1 text-white/60">
                            <Users className="w-3.5 h-3.5" />
                            <span>{formatNum(portal.volunteerCount)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/60">
                            <Globe className="w-3.5 h-3.5" />
                            <span>{portal.nationCount} nations</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/60">
                            <Zap className="w-3.5 h-3.5" />
                            <span>{portal.initiatives.length} initiatives</span>
                          </div>
                        </div>

                        {/* Top Initiative Preview */}
                        {topInitiative && (
                          <div className="space-y-1.5">
                            <p className="text-xs text-white/40 uppercase tracking-wide">
                              Top Initiative
                            </p>
                            <p className="text-sm text-white/80 font-medium line-clamp-1">
                              {topInitiative.title}
                            </p>
                            <Progress
                              value={topInitiative.progress}
                              className="h-1.5"
                            />
                            <p
                              className="text-xs text-right"
                              style={{ color: portal.accentColor }}
                            >
                              {topInitiative.progress}% complete
                            </p>
                          </div>
                        )}

                        {/* SDG + FinFracFran Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {portal.sdgAlignment.slice(0, 3).map((sdg) => (
                            <Badge
                              key={sdg}
                              variant="outline"
                              className="text-xs border-white/10 text-white/50"
                            >
                              {sdg}
                            </Badge>
                          ))}
                          {portal.finFracFranSpotlight && (
                            <Badge
                              className="text-xs"
                              style={{
                                background: "oklch(0.72 0.18 75 / 0.2)",
                                color: "oklch(0.72 0.18 75)",
                                border: "1px solid oklch(0.72 0.18 75 / 0.3)",
                              }}
                            >
                              FinFracFran™
                            </Badge>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto">
                          <Link
                            to="/portals/$councilId"
                            params={{ councilId: portal.councilId }}
                          >
                            <Button
                              data-ocid={`portals.card.link.${i + 1}`}
                              className="w-full font-semibold text-sm"
                              style={{
                                background: portal.accentColor,
                                color: "oklch(0.12 0.02 0)",
                              }}
                            >
                              Enter Portal →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
