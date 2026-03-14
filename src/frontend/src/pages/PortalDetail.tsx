import {
  FFInlineBadge,
  FFSpotlightHeader,
  FFTierBadge,
} from "@/components/FFBrand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getPortal } from "@/data/portalData";
import type {
  ActiveInitiative,
  PartnerOrg,
  ResourceItem,
  VolunteerRole,
} from "@/data/portalTypes";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Database,
  Download,
  FileText,
  Globe,
  Heart,
  Star,
  Users,
  Video,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "oklch(0.65 0.18 175)" },
  launching: { label: "Launching", color: "oklch(0.72 0.18 75)" },
  complete: { label: "Complete", color: "oklch(0.65 0.18 145)" },
  paused: { label: "Paused", color: "oklch(0.6 0.04 0)" },
};

const RESOURCE_ICON: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  guide: BookOpen,
  toolkit: Wrench,
  dataset: Database,
  video: Video,
  template: FileText,
  report: FileText,
};

const SKILL_COLORS: Record<string, string> = {
  technical: "oklch(0.62 0.16 215)",
  field: "oklch(0.65 0.18 145)",
  research: "oklch(0.65 0.18 295)",
  community: "oklch(0.68 0.2 55)",
  advocacy: "oklch(0.68 0.14 255)",
  creative: "oklch(0.62 0.2 355)",
};

function formatNum(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function TrendArrow({
  trend,
  pct,
}: { trend: "up" | "down" | "stable"; pct?: number }) {
  if (trend === "up")
    return <span className="text-green-400 text-sm">↑ {pct}%</span>;
  if (trend === "down")
    return <span className="text-red-400 text-sm">↓ {pct}%</span>;
  return <span className="text-white/40 text-sm">→ stable</span>;
}

function InitiativeCard({
  initiative,
  index,
}: { initiative: ActiveInitiative; index: number }) {
  const cfg = STATUS_CONFIG[initiative.status] ?? STATUS_CONFIG.active;
  return (
    <motion.div
      data-ocid={`portals.initiative.item.${index}`}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              className="text-xs font-semibold"
              style={{
                background: `${cfg.color}22`,
                color: cfg.color,
                border: `1px solid ${cfg.color}44`,
              }}
            >
              {cfg.label}
            </Badge>
            {initiative.finFracFranEnabled && (
              <Badge
                className="text-xs"
                style={{
                  background: "oklch(0.72 0.18 75 / 0.15)",
                  color: "oklch(0.72 0.18 75)",
                  border: "1px solid oklch(0.72 0.18 75 / 0.3)",
                }}
              >
                FinFracFran™
              </Badge>
            )}
          </div>
          <h4 className="font-semibold text-white text-base leading-snug">
            {initiative.title}
          </h4>
        </div>
      </div>
      <p className="text-sm text-white/60 leading-relaxed">
        {initiative.description}
      </p>
      <div className="flex flex-wrap gap-3 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <Building2 className="w-3 h-3" />
          {initiative.leadOrg}
        </span>
        <span className="flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {initiative.region}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {initiative.participantCount.toLocaleString()} participants
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-white/50">
          <span>Progress</span>
          <span style={{ color: cfg.color }}>{initiative.progress}%</span>
        </div>
        <Progress value={initiative.progress} className="h-2" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {initiative.sdgTags.map((sdg) => (
          <Badge
            key={sdg}
            variant="outline"
            className="text-xs border-white/10 text-white/40"
          >
            {sdg}
          </Badge>
        ))}
      </div>
      <Button
        data-ocid={`portals.initiative.join.button.${index}`}
        size="sm"
        variant="outline"
        className="self-start border-white/20 text-white/80 hover:bg-white/10"
        onClick={() =>
          toast.success(
            `Interest registered for "${initiative.title}". The initiative team will be in touch.`,
          )
        }
      >
        Join Initiative
      </Button>
    </motion.div>
  );
}

function ResourceCard({
  resource,
  index,
}: { resource: ResourceItem; index: number }) {
  const Icon = RESOURCE_ICON[resource.type] ?? FileText;
  return (
    <motion.div
      data-ocid={`portals.resource.item.${index}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg p-2 bg-white/8 shrink-0">
          <Icon className="w-4 h-4 text-white/60" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-semibold text-white text-sm leading-snug">
              {resource.title}
            </h4>
            {resource.featured && (
              <Star
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: "oklch(0.72 0.18 75)" }}
                fill="oklch(0.72 0.18 75)"
              />
            )}
          </div>
          <Badge
            variant="outline"
            className="text-xs border-white/10 text-white/40 capitalize mb-2"
          >
            {resource.type}
          </Badge>
          <p className="text-xs text-white/55 leading-relaxed">
            {resource.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>{resource.downloadCount.toLocaleString()} downloads</span>
        <span>{resource.language}</span>
      </div>
      <Button
        data-ocid={`portals.resource.download.button.${index}`}
        size="sm"
        variant="outline"
        aria-label={`Download ${resource.title}`}
        className="self-start border-white/20 text-white/80 hover:bg-white/10 gap-1.5"
        onClick={() => toast.success(`Downloading "${resource.title}"…`)}
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </Button>
    </motion.div>
  );
}

function PartnerCard({
  partner,
  index,
}: { partner: PartnerOrg; index: number }) {
  return (
    <motion.div
      data-ocid={`portals.partner.item.${index}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="rounded-xl border border-white/10 bg-white/5 p-5"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-white text-sm">{partner.name}</h4>
        <Badge
          variant="outline"
          className="text-xs border-white/10 text-white/40 capitalize shrink-0"
        >
          {partner.type}
        </Badge>
      </div>
      <p className="text-xs text-white/55 leading-relaxed mb-3">
        {partner.description}
      </p>
      <div className="flex items-center gap-3 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {partner.region}
        </span>
        <span>Member since {partner.memberSince}</span>
      </div>
    </motion.div>
  );
}

function VolunteerCard({
  role,
  index,
}: { role: VolunteerRole; index: number }) {
  return (
    <motion.div
      data-ocid={`portals.volunteer.item.${index}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3"
    >
      <div>
        <h4 className="font-semibold text-white text-base">{role.title}</h4>
        <p className="text-sm text-white/60 mt-1 leading-relaxed">
          {role.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {role.skills.map((skill) => (
          <Badge
            key={skill}
            className="text-xs capitalize"
            style={{
              background: `${SKILL_COLORS[skill] ?? "oklch(0.5 0.1 0)"}22`,
              color: SKILL_COLORS[skill] ?? "oklch(0.7 0.05 0)",
              border: `1px solid ${SKILL_COLORS[skill] ?? "oklch(0.5 0.1 0)"}44`,
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-white/50">
        <span>⏱ {role.commitment}</span>
        <span>📍 {role.region}</span>
        <span
          className="font-semibold"
          style={{ color: "oklch(0.65 0.18 145)" }}
        >
          {role.openSlots} open slots
        </span>
      </div>
      <Button
        data-ocid={`portals.volunteer.express.button.${index}`}
        size="sm"
        className="self-start font-semibold text-sm"
        style={{
          background: "oklch(0.65 0.18 145)",
          color: "oklch(0.12 0.02 0)",
        }}
        onClick={() =>
          toast.success(
            `Interest registered for "${role.title}". We'll send you the application details.`,
          )
        }
      >
        Express Interest
      </Button>
    </motion.div>
  );
}

export function PortalDetailPage() {
  const { councilId } = useParams({ from: "/portals/$councilId" });
  const portal = getPortal(councilId);

  if (!portal) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(var(--cosmos-deep))" }}
      >
        <div className="text-center">
          <p className="text-white/60 mb-4">Portal not found.</p>
          <Link to="/portals">
            <Button variant="outline">Back to Portals</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, oklch(0.12 0.04 0) 0%, ${portal.accentColor}22 100%)`,
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: portal.accentColor }}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-white/40 mb-6"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/portals"
              className="hover:text-white/70 transition-colors"
            >
              Portals
            </Link>
            <span>/</span>
            <span className="text-white/70">{portal.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{portal.icon}</span>
              <div>
                <Badge
                  className="mb-2 text-xs"
                  style={{
                    background: `${portal.accentColor}22`,
                    color: portal.accentColor,
                    border: `1px solid ${portal.accentColor}44`,
                  }}
                >
                  Phase 4 — Action Portal
                </Badge>
                <h1 className="text-hero-lg font-display text-white">
                  {portal.name}
                </h1>
              </div>
            </div>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-6">
              {portal.mandate}
            </p>

            {/* Quick Stats Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                {
                  icon: Users,
                  label: `${(portal.volunteerCount / 1000).toFixed(1)}K volunteers`,
                },
                { icon: Globe, label: `${portal.nationCount} nations` },
                {
                  icon: Zap,
                  label: `${portal.initiatives.length} initiatives`,
                },
                {
                  icon: Building2,
                  label: `${portal.partners.length} partners`,
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/8 text-sm text-white/70"
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: portal.accentColor }}
                  />
                  {label}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link to="/portals">
                <Button
                  variant="outline"
                  className="border-white/20 text-white/80 hover:bg-white/10 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to All Portals
                </Button>
              </Link>
              <Button
                className="font-semibold gap-2"
                style={{
                  background: portal.accentColor,
                  color: "oklch(0.12 0.02 0)",
                }}
                onClick={() =>
                  toast.success(
                    `Welcome to ${portal.name}! Your membership application has been submitted.`,
                  )
                }
              >
                <Heart className="w-4 h-4" /> Join This Council
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Impact Dashboard */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Impact Dashboard
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {portal.impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {formatNum(stat.value)}
                </div>
                <div className="text-xs text-white/50 mb-2">{stat.label}</div>
                <TrendArrow trend={stat.trend} pct={stat.trendPct} />
              </motion.div>
            ))}
          </div>
          {/* SDG Alignment */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide mb-3">
              SDG Alignment
            </p>
            <div className="flex flex-wrap gap-2">
              {portal.sdgAlignment.map((sdg) => (
                <Badge
                  key={sdg}
                  className="text-sm px-3 py-1"
                  style={{
                    background: `${portal.accentColor}20`,
                    color: portal.accentColor,
                    border: `1px solid ${portal.accentColor}40`,
                  }}
                >
                  {sdg}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Active Initiatives */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Active Initiatives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portal.initiatives.map((initiative, i) => (
              <InitiativeCard
                key={initiative.id}
                initiative={initiative}
                index={i + 1}
              />
            ))}
          </div>
        </section>

        {/* Resource Hub */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Resource Hub
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {portal.resources.map((resource, i) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                index={i + 1}
              />
            ))}
          </div>
        </section>

        {/* Partner Organizations */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Partner Organizations
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {portal.partners.map((partner, i) => (
              <PartnerCard key={partner.id} partner={partner} index={i + 1} />
            ))}
          </div>
        </section>

        {/* Volunteer Roles */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Get Involved
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {portal.volunteerRoles.map((role, i) => (
              <VolunteerCard key={role.id} role={role} index={i + 1} />
            ))}
          </div>
        </section>

        {/* FinFracFran Spotlight */}
        {portal.finFracFranSpotlight && (
          <section>
            <motion.div
              data-ocid="portals.finfracfran.panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8"
              style={{
                border: "1px solid oklch(0.72 0.18 75 / 0.4)",
                background: "oklch(0.72 0.18 75 / 0.06)",
              }}
            >
              <FFSpotlightHeader
                badge="FinFracFran™ Spotlight"
                headline="FinFracFran™ Spotlight"
                align="left"
                className="mb-4"
              />
              <p className="text-white/70 leading-relaxed mb-6">
                {portal.finFracFranSpotlight.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    label: "Adopting Nations",
                    value: portal.finFracFranSpotlight.adoptingNations,
                  },
                  {
                    label: "Adopting Cities",
                    value: portal.finFracFranSpotlight.adoptingCities,
                  },
                  {
                    label: "License Type",
                    value: portal.finFracFranSpotlight.licenseType,
                  },
                  {
                    label: "Replication Time",
                    value: portal.finFracFranSpotlight.replicationTime,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <div className="font-bold text-white text-lg">{value}</div>
                    <div className="text-xs text-white/50 mt-1">{label}</div>
                  </div>
                ))}
              </div>

              <blockquote
                className="border-l-4 pl-4 italic text-white/65 text-sm leading-relaxed mb-6"
                style={{ borderColor: "oklch(0.72 0.18 75 / 0.5)" }}
              >
                {portal.finFracFranSpotlight.successStory}
              </blockquote>

              <Button
                data-ocid="portals.finfracfran.request.button"
                className="font-semibold gap-2"
                style={{
                  background: "oklch(0.72 0.18 75)",
                  color: "oklch(0.12 0.02 0)",
                }}
                onClick={() =>
                  toast.success(
                    "Franchise package request submitted! Our FinFracFran™ team will be in touch within 48 hours.",
                  )
                }
              >
                ⚡ Request Franchise Package
              </Button>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
