import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { usePortals } from "@/hooks/usePortals";
import { Link } from "@tanstack/react-router";
import { Building2, Globe, Search, Users, Zap } from "lucide-react";
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
        className="relative py-24 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "oklch(0.72 0.18 75)" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15"
            style={{ background: "oklch(0.65 0.18 145)" }}
          />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              className="mb-4 text-xs font-semibold tracking-widest uppercase border"
              style={{
                borderColor: "oklch(0.72 0.18 75 / 0.5)",
                color: "oklch(0.72 0.18 75)",
                background: "oklch(0.72 0.18 75 / 0.1)",
              }}
            >
              Phase 4 — Thematic Action Portals
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4 gold-gradient-text"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Take Action Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/70 max-w-2xl mx-auto mb-8"
          >
            Nine thematic action portals — where global policy becomes local
            reality. Join initiatives, access open resources, and replicate
            proven solutions through FinFracFran™.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                icon: Users,
                label: "Volunteers",
                value: formatNum(stats.totalVolunteers),
              },
              { icon: Globe, label: "Nations", value: stats.totalNations },
              {
                icon: Zap,
                label: "Initiatives",
                value: stats.totalInitiatives,
              },
              {
                icon: Building2,
                label: "Partners",
                value: stats.totalPartners,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/5 py-4 px-3 backdrop-blur-sm"
              >
                <Icon
                  className="w-5 h-5 mx-auto mb-1"
                  style={{ color: "oklch(0.72 0.18 75)" }}
                />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-white/50 uppercase tracking-wide">
                  {label}
                </div>
              </div>
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
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              data-ocid="portals.search.input"
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="Search portals…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
