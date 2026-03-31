import { CountUpNumber } from "@/components/CountUpNumber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  Coins,
  Construction,
  CreditCard,
  Globe,
  Globe2,
  GraduationCap,
  HelpCircle,
  Layers,
  Leaf,
  Megaphone,
  Network,
  Paintbrush,
  ScrollText,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

interface StubPageProps {
  title: string;
  phase: string;
  description: string;
  color?: string;
}

function StubPage({
  title,
  phase,
  description,
  color = "oklch(var(--gold))",
}: StubPageProps) {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg text-center"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            borderColor: `${color}33`,
            background: `${color}11`,
          }}
        >
          <Construction className="h-4 w-4" style={{ color }} />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color }}
          >
            {phase}
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: "oklch(0.6 0.03 260)" }}
        >
          {description}
        </p>

        <div
          className="w-48 mx-auto h-1 rounded-full mb-8"
          style={{ background: "oklch(0.2 0.03 260)" }}
        >
          <div
            className="h-full rounded-full animate-pulse"
            style={{
              width: "30%",
              background: `linear-gradient(90deg, ${color}, transparent)`,
            }}
          />
        </div>

        <Link to="/" data-ocid="stub.back.button">
          <Button
            variant="outline"
            className="gap-2 border-[oklch(var(--gold)/0.3)] text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.08)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}

// ─── Governance Hub Portal ──────────────────────────────────────────────────

type AvailableRoute =
  | "/"
  | "/about"
  | "/members"
  | "/governance"
  | "/charter"
  | "/assembly"
  | "/councils"
  | "/resolutions"
  | "/policy-advisor"
  | "/delegates"
  | "/solutions"
  | "/portals"
  | "/community"
  | "/academy"
  | "/finance"
  | "/sustainability"
  | "/transparency"
  | "/integrations"
  | "/admin/orgs"
  | "/admin/whitelabel"
  | "/pricing"
  | "/admin/subscription"
  | "/admin/analytics"
  | "/docs"
  | "/launch"
  | "/campaigns";

interface GovernancePortalCard {
  icon: React.ElementType;
  title: string;
  description: string;
  link?: AvailableRoute;
  phaseLabel: string;
  phaseNum: string;
  isAvailable: boolean;
  accentColor: string;
  accentColorRaw: string; // raw oklch L C H for CSS var usage
}

const GOVERNANCE_PORTALS: GovernancePortalCard[] = [
  {
    icon: ScrollText,
    title: "Founding Charter",
    description:
      "The living constitution of ONEartHeaven. Six founding articles, amendment history, and voting record.",
    link: "/charter",
    phaseLabel: "Phase 1 · Founding",
    phaseNum: "01",
    isAvailable: true,
    accentColor: "oklch(var(--gold))",
    accentColorRaw: "var(--gold)",
  },
  {
    icon: Globe2,
    title: "Global Assembly",
    description:
      "Open deliberation forum for all registered members. AI-moderated. Every voice counts, everywhere.",
    link: "/assembly",
    phaseLabel: "Phase 2 · Assembly",
    phaseNum: "02",
    isAvailable: true,
    accentColor: "oklch(var(--teal))",
    accentColorRaw: "var(--teal)",
  },
  {
    icon: Layers,
    title: "Councils of Action",
    description:
      "9 thematic councils governing each domain through weighted consensus. No single veto power.",
    phaseLabel: "Phase 2 · Councils",
    phaseNum: "02",
    link: "/councils",
    isAvailable: true,
    accentColor: "oklch(var(--gold-bright))",
    accentColorRaw: "var(--gold-bright)",
  },
  {
    icon: BarChart3,
    title: "Resolution Tracker",
    description:
      "Live status of all proposals: drafted → debated → voted → implemented → measured.",
    phaseLabel: "Phase 2 · Resolutions",
    phaseNum: "02",
    link: "/resolutions",
    isAvailable: true,
    accentColor: "oklch(var(--teal-bright))",
    accentColorRaw: "var(--teal-bright)",
  },
  {
    icon: Bot,
    title: "AI Policy Advisor",
    description:
      "AI analysis of proposals for unintended consequences, historical precedent, and Charter alignment.",
    phaseLabel: "Phase 2 · AI Advisor",
    phaseNum: "02",
    link: "/policy-advisor",
    isAvailable: true,
    accentColor: "oklch(var(--gold))",
    accentColorRaw: "var(--gold)",
  },
  {
    icon: Users,
    title: "Delegate Registry",
    description:
      "Profiles of all 14 founding delegates across 9 councils. Expertise, voting records, AI alignment scores, and FinFracFran™ roles.",
    phaseLabel: "Phase 2 · Delegates",
    phaseNum: "02",
    link: "/delegates",
    isAvailable: true,
    accentColor: "oklch(var(--gold-bright))",
    accentColorRaw: "var(--gold-bright)",
  },
  {
    icon: Zap,
    title: "Solutions Exchange",
    description:
      "Open marketplace of vetted, replicable solutions. Linked to resolutions. FinFracFran™ adoption pathways for each.",
    link: "/solutions",
    phaseLabel: "Phase 3 · Solutions",
    phaseNum: "03",
    isAvailable: true,
    accentColor: "oklch(var(--teal))",
    accentColorRaw: "var(--teal)",
  },
  {
    icon: Globe,
    title: "Thematic Action Portals",
    description:
      "9 deep-dive portals for Climate, Health, Peace, Education, and more — with initiatives, partners, and volunteer roles.",
    link: "/portals",
    phaseLabel: "Phase 4 · Portals",
    phaseNum: "04",
    isAvailable: true,
    accentColor: "oklch(var(--gold))",
    accentColorRaw: "var(--gold)",
  },
  {
    icon: BookOpen,
    title: "Community Layer",
    description:
      "Citizens Portal, Local Chapters, Compassion Communities, Volunteer Exchange, and Youth Council across 8 cities.",
    link: "/community",
    phaseLabel: "Phase 5 · Community",
    phaseNum: "05",
    isAvailable: true,
    accentColor: "oklch(var(--teal-bright))",
    accentColorRaw: "var(--teal-bright)",
  },
  {
    icon: Shield,
    title: "Transparency Portal",
    description:
      "Budget tracker, audit findings, AI decision log, whistleblower channel, open contracts, and FinFracFran™ disclosure hub.",
    link: "/transparency",
    phaseLabel: "Phase 6 · Transparency",
    phaseNum: "06",
    isAvailable: true,
    accentColor: "oklch(var(--gold))",
    accentColorRaw: "var(--gold)",
  },
  {
    icon: Network,
    title: "API & Integrations",
    description:
      "Open API layer for governance, solutions, transparency, and FinFracFran™ modules. 12 endpoints, 8 integration partners, real-time webhooks.",
    link: "/integrations",
    phaseLabel: "Phase 7 · API",
    phaseNum: "07",
    isAvailable: true,
    accentColor: "oklch(var(--teal))",
    accentColorRaw: "var(--teal)",
  },
  {
    icon: Leaf,
    title: "Sustainability & Impact",
    description:
      "17 SDG trackers, 142 global impact metrics, environmental intelligence from IPCC and UN-Habitat across 194 nations.",
    link: "/sustainability",
    phaseLabel: "Phase 8 · Sustainability",
    phaseNum: "08",
    isAvailable: true,
    accentColor: "oklch(0.72 0.18 155)",
    accentColorRaw: "0.72 0.18 155",
  },
  {
    icon: GraduationCap,
    title: "Academy",
    description:
      "12 courses, Idea Incubator, training tracks, certifications, and FinFracFran™ Academy programs for all levels.",
    link: "/academy",
    phaseLabel: "Phase 9 · Academy",
    phaseNum: "09",
    isAvailable: true,
    accentColor: "oklch(var(--gold-bright))",
    accentColorRaw: "var(--gold-bright)",
  },
  {
    icon: Coins,
    title: "Economic & Finance",
    description:
      "FinFracFran™ franchise network, fundraising campaigns, enterprise profiles, investment rounds, and treasury across 194 nations.",
    link: "/finance",
    phaseLabel: "Phase 10 · Finance",
    phaseNum: "10",
    isAvailable: true,
    accentColor: "oklch(var(--gold))",
    accentColorRaw: "var(--gold)",
  },
  {
    icon: Building2,
    title: "Org Management",
    description:
      "Administer tenant organizations, configure feature flags, and manage membership caps.",
    link: "/admin/orgs",
    phaseLabel: "Phase 11 · Multi-Tenancy",
    phaseNum: "11",
    isAvailable: true,
    accentColor: "oklch(0.72 0.15 260)",
    accentColorRaw: "0.72 0.15 260",
  },
  {
    icon: Paintbrush,
    title: "White Label Studio",
    description:
      "Configure brand identity, colors, typography, and publishing settings for each tenant organization. Full PaaS white-labeling.",
    link: "/admin/whitelabel",
    phaseLabel: "Phase 12 · White Label",
    phaseNum: "12",
    isAvailable: true,
    accentColor: "oklch(0.70 0.18 310)",
    accentColorRaw: "0.70 0.18 310",
  },
  {
    icon: CreditCard,
    title: "Pricing & Plans",
    description:
      "Explore PaaS plans from Starter to Global. Compare features, FinFracFran™ tier alignment, and upgrade your organization's subscription.",
    link: "/pricing",
    phaseLabel: "Phase 12 · PaaS",
    phaseNum: "12",
    isAvailable: true,
    accentColor: "oklch(0.72 0.16 75)",
    accentColorRaw: "0.72 0.16 75",
  },
  {
    icon: BarChart3,
    title: "Subscription Dashboard",
    description:
      "Monitor your organization's active plan, usage metrics, billing history, and upgrade your subscription in real time.",
    link: "/admin/subscription",
    phaseLabel: "Phase 12 · Billing",
    phaseNum: "12",
    isAvailable: true,
    accentColor: "oklch(0.68 0.17 155)",
    accentColorRaw: "0.68 0.17 155",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description:
      "Developer & API docs, SDK guides, webhook references, and FinFracFran™ integration documentation.",
    link: "/docs",
    phaseLabel: "Phase 12 · Docs",
    phaseNum: "12",
    isAvailable: true,
    accentColor: "oklch(0.70 0.18 310)",
    accentColorRaw: "0.70 0.18 310",
  },
  {
    icon: HelpCircle,
    title: "Onboarding & Help",
    description:
      "Guided tours for every role, contextual help articles, and an in-app Help Center widget. Phase 12 onboarding system.",
    link: "/",
    phaseLabel: "Phase 12 · Onboarding",
    phaseNum: "12",
    isAvailable: true,
    accentColor: "oklch(0.70 0.18 200)",
    accentColorRaw: "0.70 0.18 200",
  },
  {
    icon: BarChart3,
    title: "Platform Analytics",
    description:
      "Super Admin analytics dashboard: platform-wide stats, 30-day trends, org metrics, vendor leaderboard, and platform health.",
    link: "/admin/analytics",
    phaseLabel: "Phase 12 · Analytics",
    phaseNum: "12",
    isAvailable: true,
    accentColor: "oklch(0.65 0.18 275)",
    accentColorRaw: "0.65 0.18 275",
  },
  {
    icon: Globe2,
    title: "Worldwide Launch Plan",
    description:
      "Global adoption roadmap, phased rollout strategy, stakeholder pathways, FinFracFran™ scaling model, and our commitments to every partner worldwide.",
    link: "/launch",
    phaseLabel: "Global · Launch",
    phaseNum: "13",
    isAvailable: true,
    accentColor: "oklch(var(--gold))",
    accentColorRaw: "0.88 0.025 95",
  },
  {
    icon: Bot,
    title: "AI Governance Intelligence",
    description:
      "AI-powered policy analysis, resolution drafting, impact forecasting, and conflict detection with real-time governance scoring.",
    link: "/policy-advisor",
    phaseLabel: "Phase 13 · AI",
    phaseNum: "13",
    isAvailable: true,
    accentColor: "oklch(0.68 0.22 290)",
    accentColorRaw: "0.68 0.22 290",
  },
  {
    icon: Globe,
    title: "Multi-Language & Localization",
    description:
      "10-language support with RTL layout, locale-aware formatting, and a Navbar language switcher. Inclusive global reach for all users.",
    link: "/governance",
    phaseLabel: "Phase 13 · i18n",
    phaseNum: "13",
    isAvailable: true,
    accentColor: "oklch(0.65 0.20 160)",
    accentColorRaw: "0.65 0.20 160",
  },
  {
    icon: Megaphone,
    title: "Campaign Hub",
    description:
      "Social media campaign designs across every life area — ready to share, adapt, and amplify worldwide. 15 campaigns, 6 platforms.",
    link: "/campaigns",
    phaseLabel: "Outreach · Campaigns",
    phaseNum: "✦",
    isAvailable: true,
    accentColor: "oklch(0.82 0.14 75)",
    accentColorRaw: "0.82 0.14 75",
  },
];

const PLATFORM_STATS = [
  {
    label: "Phases Live",
    value: 10,
    suffix: "",
    icon: Sparkles,
    accent: "var(--gold)",
  },
  {
    label: "Active Routes",
    value: 18,
    suffix: "+",
    icon: Network,
    accent: "var(--teal)",
  },
  {
    label: "Nations Served",
    value: 194,
    suffix: "",
    icon: Globe2,
    accent: "var(--gold-bright)",
  },
  {
    label: "Councils Active",
    value: 9,
    suffix: "",
    icon: Layers,
    accent: "var(--teal-bright)",
  },
  {
    label: "FinFracFran™ Partners",
    value: 8,
    suffix: "",
    icon: Coins,
    accent: "var(--gold)",
  },
];

export function GovernancePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="governance.page"
    >
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        data-ocid="governance.hero.section"
        className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
      >
        {/* Deep multi-layer atmospheric gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 0%, oklch(0.72 0.16 75 / 0.13) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 80%, oklch(0.55 0.14 195 / 0.09) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 10% 60%, oklch(0.65 0.18 260 / 0.07) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />
        {/* Decorative floating orbs */}
        <div
          className="absolute top-16 right-[8%] w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.16 75 / 0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-12 left-[5%] w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.14 195 / 0.07) 0%, transparent 70%)",
            filter: "blur(32px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Platform badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "oklch(var(--gold) / 0.35)",
              background: "oklch(var(--gold) / 0.07)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(var(--teal-bright))" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold))" }}
            >
              ONEartHeaven™ Command Center
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="font-display mb-4"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 5.25rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              fontWeight: 800,
            }}
          >
            <span className="gold-gradient-text">Governance</span>
            <br />
            <span style={{ color: "oklch(var(--pearl))" }}>
              &amp; Command Hub
            </span>
          </motion.h1>

          {/* Platform tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-3 leading-relaxed"
            style={{ color: "oklch(0.65 0.04 260)" }}
          >
            Where humanity’s greatest challenges meet its most innovative
            solutions.{" "}
            <span style={{ color: "oklch(var(--teal-bright))" }}>
              Transparent.
            </span>{" "}
            <span style={{ color: "oklch(var(--gold))" }}>AI-augmented.</span>{" "}
            <span style={{ color: "oklch(var(--pearl))" }}>Decentralized.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="text-sm max-w-xl mx-auto mb-10"
            style={{ color: "oklch(0.50 0.04 260)" }}
          >
            All 12 phases are live — from the Founding Charter to the
            FinFracFran™ Economic Layer and White Label PaaS Studio. Navigate
            the full platform below.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a href="#portals">
              <Button
                size="lg"
                className="btn-gold gap-2 text-base px-7 py-5"
                data-ocid="governance.explore.primary_button"
              >
                <Sparkles className="h-4 w-4" />
                Explore All Phases
              </Button>
            </a>
            <Link to="/charter">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base px-7 py-5"
                style={{
                  borderColor: "oklch(var(--teal) / 0.45)",
                  color: "oklch(var(--teal-bright))",
                  background: "oklch(var(--teal) / 0.06)",
                }}
                data-ocid="governance.charter.secondary_button"
              >
                <ScrollText className="h-4 w-4" />
                Read the Charter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Platform Stats Bar ───────────────────────────── */}
      <section
        data-ocid="governance.stats.section"
        className="relative py-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.04 260) 0%, oklch(0.12 0.045 260) 100%)",
          borderTop: "1px solid oklch(var(--gold) / 0.12)",
          borderBottom: "1px solid oklch(var(--teal) / 0.12)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PLATFORM_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex flex-col items-center text-center gap-1.5 py-3"
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full mb-1"
                    style={{
                      background: `oklch(${stat.accent} / 0.1)`,
                      border: `1px solid oklch(${stat.accent} / 0.22)`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: `oklch(${stat.accent})` }}
                    />
                  </div>
                  <div
                    className="font-display text-3xl font-extrabold leading-none"
                    style={{ color: `oklch(${stat.accent})` }}
                  >
                    <CountUpNumber value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div
                    className="text-xs font-medium tracking-wide"
                    style={{ color: "oklch(0.58 0.04 260)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section Divider ──────────────────────────────────── */}
      <div
        id="portals"
        className="relative flex items-center justify-center py-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.045 260) 0%, oklch(var(--cosmos-deep)) 100%)",
        }}
      >
        <div
          className="absolute inset-x-0 h-px top-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(var(--gold) / 0.25) 25%, oklch(var(--teal) / 0.25) 75%, transparent 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-3 px-6 py-2.5 rounded-full"
          style={{
            background: "oklch(var(--cosmos-deep))",
            border: "1px solid oklch(var(--gold) / 0.25)",
          }}
        >
          <Sparkles
            className="h-4 w-4"
            style={{ color: "oklch(var(--gold))" }}
          />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "oklch(var(--gold))" }}
          >
            All Phases Live
          </span>
          <Sparkles
            className="h-4 w-4"
            style={{ color: "oklch(var(--teal))" }}
          />
        </motion.div>
      </div>

      {/* ── Portal Cards Grid ───────────────────────────────────── */}
      <section
        data-ocid="governance.portals.section"
        className="pb-20 sm:pb-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOVERNANCE_PORTALS.map((portal, idx) => {
              const Icon = portal.icon;

              const cardInner = (
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, delay: (idx % 3) * 0.09 }}
                  key={portal.title}
                  className="relative rounded-2xl p-6 group transition-all duration-300 h-full flex flex-col"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.14 0.04 260) 0%, oklch(0.12 0.035 260) 100%)",
                    border: "1px solid oklch(var(--teal) / 0.18)",
                  }}
                >
                  {/* Hover glow overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${portal.accentColor}18 0%, transparent 65%)`,
                      boxShadow: `inset 0 0 0 1px ${portal.accentColor}35`,
                    }}
                  />

                  {/* Phase number badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full text-xs font-extrabold tracking-tight font-display"
                      style={{
                        background: `${portal.accentColor}18`,
                        border: `1.5px solid ${portal.accentColor}45`,
                        color: portal.accentColor,
                      }}
                    >
                      {portal.phaseNum}
                    </div>

                    {/* Live pill */}
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "oklch(0.55 0.14 195 / 0.12)",
                        border: "1px solid oklch(var(--teal) / 0.3)",
                        color: "oklch(var(--teal-bright))",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: "oklch(var(--teal-bright))" }}
                      />
                      Live
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                    style={{
                      background: `${portal.accentColor}12`,
                      border: `1px solid ${portal.accentColor}28`,
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: portal.accentColor }}
                    />
                  </div>

                  {/* Phase label */}
                  <div
                    className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: portal.accentColor, opacity: 0.85 }}
                  >
                    {portal.phaseLabel}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-lg font-bold mb-2.5 leading-snug"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {portal.title}
                  </h3>

                  {/* Description — flex-grow so all cards align CTAs at bottom */}
                  <p
                    className="text-sm leading-relaxed flex-grow"
                    style={{ color: "oklch(0.62 0.04 260)" }}
                  >
                    {portal.description}
                  </p>

                  {/* Explore CTA */}
                  <div
                    className="mt-5 pt-4"
                    style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
                  >
                    <div
                      className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                      style={{ color: portal.accentColor }}
                      data-ocid={`governance.portal.link.${idx + 1}`}
                    >
                      Explore Module
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </motion.div>
              );

              return portal.link ? (
                <Link
                  key={portal.title}
                  to={portal.link}
                  className="block h-full hover:-translate-y-1 transition-transform duration-200"
                  data-ocid={
                    portal.title === "Documentation"
                      ? "governance.docs.card"
                      : `governance.portal.card.${idx + 1}`
                  }
                  aria-label={`Open ${portal.title}`}
                >
                  {cardInner}
                </Link>
              ) : (
                <div key={portal.title} className="h-full">
                  {cardInner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ────────────────────────────────────────── */}
      <section
        data-ocid="governance.footer-cta.section"
        className="relative overflow-hidden py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.10 0.04 260) 0%, oklch(0.12 0.06 240) 50%, oklch(0.10 0.04 260) 100%)",
          borderTop: "1px solid oklch(var(--gold) / 0.12)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.72 0.16 75 / 0.06) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
              style={{
                borderColor: "oklch(var(--gold) / 0.3)",
                background: "oklch(var(--gold) / 0.07)",
              }}
            >
              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: "oklch(var(--gold))" }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "oklch(var(--gold))" }}
              >
                NewWaysNow — Local solutions, global impact
              </span>
            </div>

            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "oklch(var(--pearl))",
              }}
            >
              Ready to shape the future?
            </h2>

            <p
              className="text-base sm:text-lg mb-8 leading-relaxed"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              Join delegates, citizens, and partners from 194 nations building a
              transparent, AI-augmented, and participatory world.
            </p>

            <Separator
              className="mb-8 mx-auto w-24"
              style={{ background: "oklch(var(--gold) / 0.25)" }}
            />

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/community">
                <Button
                  size="lg"
                  className="btn-gold gap-2 px-8 py-5 text-base"
                  data-ocid="governance.join.primary_button"
                >
                  <Users className="h-4 w-4" />
                  Join the Community
                </Button>
              </Link>
              <Link to="/charter">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8 py-5 text-base"
                  style={{
                    borderColor: "oklch(var(--teal) / 0.4)",
                    color: "oklch(var(--teal-bright))",
                    background: "oklch(var(--teal) / 0.06)",
                  }}
                  data-ocid="governance.charter.secondary_button"
                >
                  <ScrollText className="h-4 w-4" />
                  Read the Charter
                </Button>
              </Link>
              <Link to="/">
                <Button
                  size="lg"
                  variant="ghost"
                  className="gap-2 px-8 py-5 text-base"
                  style={{ color: "oklch(0.62 0.04 260)" }}
                  data-ocid="governance.home.link"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export function AcademyPage() {
  return (
    <StubPage
      title="Academy"
      phase="Phase 9 — In Development"
      description="Whole Academy for Education, Engagement Engineering, Ideas Incubation, Training for all levels, and disciplined distillation and distribution."
      color="oklch(0.65 0.18 270)"
    />
  );
}

export function FinancePage() {
  return (
    <StubPage
      title="FinFracFran Economy"
      phase="Phase 10 — In Development"
      description="Financial ecosystem, FinFracFran™ fractionalization and franchising methodologies, ethical fundraising, multi-wallet support, and economic resilience tools."
      color="oklch(0.7 0.2 140)"
    />
  );
}
