import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Coins,
  Construction,
  Globe2,
  GraduationCap,
  Layers,
  Leaf,
  Network,
  ScrollText,
  Users,
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

// ─── Governance Hub Portal ───────────────────────────────────────────────────────────────────

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
  | "/community"
  | "/academy"
  | "/finance"
  | "/sustainability"
  | "/transparency"
  | "/integrations";

interface GovernancePortalCard {
  icon: React.ElementType;
  title: string;
  description: string;
  link?: AvailableRoute;
  phase: string;
  isAvailable: boolean;
  isHighlighted?: boolean;
  accentColor: string;
}

const GOVERNANCE_PORTALS: GovernancePortalCard[] = [
  {
    icon: ScrollText,
    title: "Founding Charter",
    description:
      "The living constitution of ONEartHeaven. Six founding articles, amendment history, and voting record.",
    link: "/charter",
    phase: "Phase 1.4 — Live",
    isAvailable: true,
    isHighlighted: true,
    accentColor: "var(--gold)",
  },
  {
    icon: Globe2,
    title: "Global Assembly",
    description:
      "Open deliberation forum for all registered members. AI-moderated. Every voice counts.",
    link: "/assembly",
    phase: "Phase 2.1 — Live",
    isAvailable: true,
    accentColor: "var(--teal)",
  },
  {
    icon: Layers,
    title: "Councils of Action",
    description:
      "9 thematic councils governing each domain through weighted consensus. No single veto.",
    phase: "Phase 2.2 — Live",
    link: "/councils",
    isAvailable: true,
    accentColor: "var(--gold-bright)",
  },
  {
    icon: BarChart3,
    title: "Resolution Tracker",
    description:
      "Live status of all proposals: drafted \u2192 debated \u2192 voted \u2192 implemented \u2192 measured.",
    phase: "Phase 2.3 — Live",
    link: "/resolutions",
    isAvailable: true,
    accentColor: "var(--teal-bright)",
  },
  {
    icon: Bot,
    title: "AI Policy Advisor",
    description:
      "AI analysis of proposals for unintended consequences, historical precedent, and Charter alignment.",
    phase: "Phase 2.4 — Live",
    link: "/policy-advisor",
    isAvailable: true,
    accentColor: "var(--gold)",
  },
  {
    icon: Users,
    title: "Delegate Registry",
    description:
      "Profiles of all 14 founding delegates across 9 councils. Expertise, voting records, AI alignment scores, and FinFracFran\u2122 roles.",
    phase: "Phase 2.5 — Live",
    link: "/delegates",
    isAvailable: true,
    accentColor: "var(--gold-bright)",
  },
  {
    icon: BookOpen,
    title: "Voting Record",
    description:
      "Active and closed votes on all Charter matters. Transparent. Immutable. On-chain.",
    link: "/charter",
    phase: "Phase 1.4 — Live",
    isAvailable: true,
    accentColor: "var(--teal)",
  },
  {
    icon: Network,
    title: "API & Integrations",
    description:
      "Open API layer for all governance, solutions, transparency, and FinFracFran\u2122 modules. 12 endpoints, 8 integration partners, real-time webhooks.",
    link: "/integrations",
    phase: "Phase 7 \u2014 Live",
    isAvailable: true,
    accentColor: "var(--teal)",
  },
  {
    icon: Coins,
    title: "Economic & Finance",
    description:
      "FinFracFran\u2122 franchise network, fundraising campaigns, enterprise profiles, investment rounds, and treasury across 194 nations.",
    link: "/finance",
    phase: "Phase 10 \u2014 Live",
    isAvailable: true,
    accentColor: "var(--gold)",
  },
  {
    icon: Leaf,
    title: "Sustainability & Impact",
    description:
      "17 SDG trackers, 142 global impact metrics, environmental intelligence from IPCC and UN-Habitat, and a nation progress leaderboard across 194 nations.",
    link: "/sustainability",
    phase: "Phase 8 \u2014 Live",
    isAvailable: true,
    accentColor: "var(--teal)",
  },
  {
    icon: GraduationCap,
    title: "Academy",
    description:
      "12 courses across governance, climate, health, and FinFracFran\u2122 tracks. Idea Incubator, training tracks, certifications, and FinFracFran\u2122 Academy programs for all levels.",
    link: "/academy",
    phase: "Phase 9 \u2014 Live",
    isAvailable: true,
    accentColor: "var(--gold-bright)",
  },
];

export function GovernancePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* \u2500\u2500 Hero \u2500\u2500 */}
      <section
        data-ocid="governance.hero.section"
        className="relative overflow-hidden py-20 sm:py-28"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.72 0.16 75 / 0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 30% 70%, oklch(0.55 0.14 195 / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Standardized grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(var(--gold) / 0.3)",
              background: "oklch(var(--gold) / 0.07)",
            }}
          >
            <Users
              className="h-3.5 w-3.5"
              style={{ color: "oklch(var(--gold))" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold))" }}
            >
              Phase 2 \u2014 Governance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-hero-xl font-display mb-5"
          >
            <span className="gold-gradient-text">Governance & Assembly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            Where every voice counts.{" "}
            <span style={{ color: "oklch(var(--teal-bright))" }}>
              Transparent.
            </span>{" "}
            <span style={{ color: "oklch(var(--gold))" }}>AI-augmented.</span>{" "}
            <span style={{ color: "oklch(var(--pearl))" }}>Decentralized.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-sm max-w-xl mx-auto"
            style={{ color: "oklch(0.52 0.04 260)" }}
          >
            The Founding Charter, Global Assembly, Councils of Action,
            Resolution Tracker, AI Policy Advisor, and Delegate Registry are all
            live in Phase 2.
          </motion.p>

          {/* Hero CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mt-8"
          >
            <a href="#portals">
              <Button
                size="lg"
                className="btn-gold gap-2 hover:scale-105 transition-transform"
                data-ocid="governance.explore.primary_button"
              >
                Explore Governance Portals
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gradient separator */}
      <div
        className="h-px mx-auto"
        style={{
          maxWidth: "240px",
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.35), oklch(var(--teal) / 0.3), transparent)",
        }}
      />

      {/* \u2500\u2500 Portal Cards \u2500\u2500 */}
      <section
        data-ocid="governance.portals.section"
        className="py-16 sm:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOVERNANCE_PORTALS.map((portal, idx) => {
              const Icon = portal.icon;
              const cardContent = (
                <motion.div
                  key={portal.title}
                  data-ocid={`governance.portal.card.${idx + 1}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="relative rounded-2xl p-6 group transition-all duration-300 h-full"
                  style={{
                    background: portal.isHighlighted
                      ? "linear-gradient(135deg, oklch(0.14 0.045 260) 0%, oklch(0.12 0.035 260) 100%)"
                      : "oklch(var(--cosmos-surface) / 0.9)",
                    border: portal.isHighlighted
                      ? "1.5px solid oklch(var(--gold) / 0.5)"
                      : portal.isAvailable
                        ? "1px solid oklch(var(--teal) / 0.25)"
                        : "1px solid oklch(var(--gold-dim) / 0.15)",
                    boxShadow: portal.isHighlighted
                      ? "0 0 30px oklch(var(--gold) / 0.1), 0 10px 40px oklch(0.05 0.03 260 / 0.4)"
                      : "none",
                    cursor: portal.isAvailable ? "pointer" : "default",
                  }}
                >
                  {portal.isAvailable && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 80% 80% at 50% 0%, oklch(${portal.accentColor} / 0.05) 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  {portal.isHighlighted && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        className="text-xs font-bold tracking-wide"
                        style={{
                          background: "oklch(var(--gold) / 0.15)",
                          border: "1px solid oklch(var(--gold) / 0.4)",
                          color: "oklch(var(--gold))",
                        }}
                      >
                        Now Available
                      </Badge>
                    </div>
                  )}

                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                    style={{
                      background: `oklch(${portal.accentColor} / 0.1)`,
                      border: `1px solid oklch(${portal.accentColor} / 0.25)`,
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: `oklch(${portal.accentColor})` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{
                        color: portal.isAvailable
                          ? `oklch(${portal.accentColor})`
                          : "oklch(0.42 0.04 260)",
                      }}
                    >
                      {portal.phase}
                    </span>
                    {!portal.isAvailable && (
                      <Construction
                        className="h-3 w-3"
                        style={{ color: "oklch(0.42 0.04 260)" }}
                      />
                    )}
                  </div>

                  <h3
                    className="font-display text-lg font-bold mb-2.5 leading-snug"
                    style={{
                      color: portal.isAvailable
                        ? "oklch(var(--pearl))"
                        : "oklch(0.55 0.04 260)",
                    }}
                  >
                    {portal.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{
                      color: portal.isAvailable
                        ? "oklch(0.62 0.04 260)"
                        : "oklch(0.42 0.04 260)",
                    }}
                  >
                    {portal.description}
                  </p>

                  {portal.isAvailable ? (
                    <div
                      data-ocid={`governance.portal.link.${idx + 1}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                      style={{ color: `oklch(${portal.accentColor})` }}
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                        color: "oklch(0.42 0.04 260)",
                        border: "1px solid oklch(0.22 0.04 260)",
                      }}
                    >
                      Coming Soon
                    </div>
                  )}
                </motion.div>
              );

              return portal.isAvailable && portal.link ? (
                <Link
                  key={portal.title}
                  to={portal.link}
                  data-ocid={`governance.portal.card.${idx + 1}`}
                  className="block h-full"
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={portal.title} className="h-full">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Back to Home \u2500\u2500 */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link to="/" data-ocid="governance.back.link">
            <Button
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(var(--gold) / 0.3)",
                color: "oklch(var(--gold))",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export function AcademyPage() {
  return (
    <StubPage
      title="Academy"
      phase="Phase 9 \u2014 In Development"
      description="Whole Academy for Education, Engagement Engineering, Ideas Incubation, Training for all levels, and disciplined distillation and distribution."
      color="oklch(0.65 0.18 270)"
    />
  );
}

export function FinancePage() {
  return (
    <StubPage
      title="FinFracFran Economy"
      phase="Phase 10 \u2014 In Development"
      description="Financial ecosystem, FinFracFran\u2122 fractionalization and franchising methodologies, ethical fundraising, multi-wallet support, and economic resilience tools."
      color="oklch(0.7 0.2 140)"
    />
  );
}
