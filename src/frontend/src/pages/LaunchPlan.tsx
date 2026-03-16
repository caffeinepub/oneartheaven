import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Coins,
  Globe2,
  GraduationCap,
  HandshakeIcon,
  Heart,
  Landmark,
  Layers,
  Lightbulb,
  RefreshCw,
  Rocket,
  Scale,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const PHASES = [
  {
    num: "01",
    period: "2024–2025",
    title: "Foundation",
    color: "oklch(var(--gold))",
    items: [
      "Founding partners and first 50 organizations onboarded",
      "Core governance, assembly, and policy modules live",
      "Motoko on-chain backend deployed for persistent data",
      "FinFracFran™ pilot franchises launched in 3 regions",
      "Internet Identity multi-wallet authentication live",
      "Multi-tenant PaaS infrastructure established",
    ],
  },
  {
    num: "02",
    period: "2025–2027",
    title: "Regional Expansion",
    color: "oklch(0.72 0.16 155)",
    items: [
      "500+ organizations across 50+ nations onboarded",
      "Regional councils active on every continent",
      "White-label PaaS deployments for 20+ partner platforms",
      "Academy certifications launched in 10+ languages",
      "FinFracFran™ franchise network reaches 100+ locations",
      "Full API ecosystem open for third-party integrations",
    ],
  },
  {
    num: "03",
    period: "2027–2030",
    title: "Global Scale",
    color: "oklch(0.70 0.18 310)",
    items: [
      "10,000+ organizations — universal access for all",
      "Full FinFracFran™ franchise network spanning every region",
      "Multi-lingual support in 50+ languages",
      "Partnership with major global institutions and coalitions",
      "AI-augmented policy tools serving millions of participants",
      "Self-sustaining, community-governed platform economy",
    ],
  },
];

const STAKEHOLDERS = [
  {
    icon: Landmark,
    title: "Nations & Governments",
    desc: "Register as a national delegate, shape global policy, access the Governance Hub, and lead regional councils that drive real change.",
    color: "oklch(var(--gold))",
  },
  {
    icon: Building2,
    title: "Cities & Municipalities",
    desc: "Bring proven local solutions to the global stage, franchise successful programmes, and connect with peer cities worldwide.",
    color: "oklch(0.72 0.16 155)",
  },
  {
    icon: Heart,
    title: "NGOs & Civil Society",
    desc: "Access funding campaigns, co-create solutions with communities, and amplify your mission through the FinFracFran™ model.",
    color: "oklch(0.70 0.18 200)",
  },
  {
    icon: Users,
    title: "Cooperatives & Community Orgs",
    desc: "Build shared ownership models, pool resources with partners, and replicate cooperative structures at scale using our PaaS tools.",
    color: "oklch(0.68 0.17 275)",
  },
  {
    icon: TrendingUp,
    title: "Businesses & Enterprises",
    desc: "Invest in solutions, earn FinFracFran™ revenue, deploy white-label platforms, and become a verified enterprise partner.",
    color: "oklch(0.65 0.20 30)",
  },
  {
    icon: Sparkles,
    title: "Individuals & Citizens",
    desc: "Vote, propose ideas, earn certifications, participate in assemblies, and join the community that is shaping the world's future.",
    color: "oklch(0.72 0.16 310)",
  },
];

const FEATURES = [
  {
    icon: Scale,
    title: "Decentralized Governance",
    desc: "Participate in decisions that matter — votes, resolutions, and assemblies open to all.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    desc: "Every action, vote, and fund is openly tracked through the FinFracFran™ Disclosure Hub.",
  },
  {
    icon: Coins,
    title: "FinFracFran™ Economy",
    desc: "Earn from solutions you help scale through fractionalization and franchising incentives.",
  },
  {
    icon: Lightbulb,
    title: "AI-Augmented Policy",
    desc: "AI surfaces the best ideas, scenarios, and pathways — supporting, never replacing, human agency.",
  },
  {
    icon: GraduationCap,
    title: "Open Academy",
    desc: "Free learning, certifications, and idea incubation for every individual and organization.",
  },
  {
    icon: RefreshCw,
    title: "Solutions Exchange",
    desc: "Find proven local solutions and replicate them globally through the FinFracFran™ network.",
  },
  {
    icon: Layers,
    title: "White Label PaaS",
    desc: "Deploy your own branded governance platform powered by ONEartHeaven™ infrastructure.",
  },
  {
    icon: Globe2,
    title: "Multi-Lingual Access",
    desc: "Available in 10+ languages today, with 50+ languages planned as we grow together.",
  },
  {
    icon: Zap,
    title: "Persistent On-Chain Data",
    desc: "Powered by ICP decentralized infrastructure — your data is sovereign, permanent, and tamper-proof.",
  },
  {
    icon: Users,
    title: "Community & Assembly",
    desc: "Participatory governance at every level — local, regional, and global assemblies for all voices.",
  },
];

const FF_STEPS = [
  {
    num: "01",
    label: "Prove",
    desc: "A community demonstrates a working solution to a local challenge.",
    color: "oklch(var(--gold))",
  },
  {
    num: "02",
    label: "Fraction",
    desc: "The solution is broken into shareable, investable fractions for distributed ownership.",
    color: "oklch(0.72 0.16 155)",
  },
  {
    num: "03",
    label: "Franchise",
    desc: "Proven fractions are packaged as replicable franchises for other communities.",
    color: "oklch(0.70 0.18 200)",
  },
  {
    num: "04",
    label: "Scale",
    desc: "The franchise network grows — creators earn, communities thrive, the world benefits.",
    color: "oklch(0.72 0.16 310)",
  },
];

const COMMITMENTS = [
  {
    icon: HandshakeIcon,
    text: "We will work with you, not around you.",
    color: "oklch(var(--gold))",
  },
  {
    icon: Users,
    text: "Every voice will be heard and considered.",
    color: "oklch(0.72 0.16 155)",
  },
  {
    icon: Globe2,
    text: "Adoption will always be open and barrier-free.",
    color: "oklch(0.70 0.18 200)",
  },
  {
    icon: Coins,
    text: "Benefits will flow to all participants fairly.",
    color: "oklch(0.68 0.17 275)",
  },
  {
    icon: RefreshCw,
    text: "The platform will evolve with the community it serves.",
    color: "oklch(0.65 0.20 30)",
  },
  {
    icon: Scale,
    text: "No single entity will ever hold veto or exclusive control.",
    color: "oklch(0.72 0.16 310)",
  },
];

export function LaunchPlanPage() {
  return (
    <main
      data-ocid="launch.page"
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <section
        data-ocid="launch.hero.section"
        className="relative overflow-hidden pt-24 pb-20 px-4"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.55 0.18 75 / 0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, oklch(0.88 0.025 95 / 0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{
                background: "oklch(var(--gold) / 0.15)",
                color: "oklch(var(--gold))",
                border: "1px solid oklch(var(--gold) / 0.3)",
              }}
            >
              <Rocket className="h-3.5 w-3.5" />
              Global Launch Strategy · 2024–2030
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.025 95), oklch(var(--gold-bright)), oklch(0.78 0.15 75))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A Plan for Worldwide
            </span>
            <br />
            <span style={{ color: "oklch(0.92 0.015 95)" }}>Adoption</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            From founding partners to planetary scale — a clear, open, and
            inclusive roadmap for bringing ONEartHeaven™ to every nation,
            community, and individual who seeks a better way forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link to="/register">
              <Button
                size="lg"
                className="btn-gold gap-2 hover:scale-105 transition-transform"
                data-ocid="launch.register.primary_button"
              >
                <Sparkles className="h-4 w-4" />
                Join as a Founding Partner
              </Button>
            </Link>
            <Link to="/governance">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 hover:scale-105 transition-transform"
                style={{
                  borderColor: "oklch(var(--gold) / 0.4)",
                  color: "oklch(var(--gold))",
                }}
                data-ocid="launch.explore.secondary_button"
              >
                Explore the Platform <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Phased Rollout */}
      <section
        data-ocid="launch.phases.section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{
              background: "oklch(var(--gold) / 0.15)",
              color: "oklch(var(--gold))",
            }}
          >
            Phased Rollout
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
            style={{ color: "oklch(var(--gold-bright))" }}
          >
            From Foundation to Global Scale
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            A three-phase roadmap designed for steady, inclusive growth — each
            phase building on the last, always in partnership with the
            communities we serve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              data-ocid={`launch.phase.card.${i + 1}`}
              className="rounded-2xl p-8 flex flex-col gap-5"
              style={{
                background: "oklch(0.13 0.02 260 / 0.8)",
                border: "1px solid oklch(0.22 0.03 260)",
                borderTop: `3px solid ${phase.color}`,
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="text-5xl font-display font-black leading-none"
                  style={{ color: `${phase.color}`, opacity: 0.25 }}
                >
                  {phase.num}
                </span>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: `color-mix(in oklch, ${phase.color} 15%, transparent)`,
                    color: phase.color,
                  }}
                >
                  {phase.period}
                </span>
              </div>
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "oklch(0.92 0.015 95)" }}
                >
                  {phase.title}
                </h3>
              </div>
              <ul className="space-y-2.5 flex-1">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "oklch(0.72 0.02 260)" }}
                  >
                    <CheckCircle2
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: phase.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Who Can Join */}
      <section
        data-ocid="launch.stakeholders.section"
        className="py-20"
        style={{ background: "oklch(0.10 0.015 260 / 0.5)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{
                background: "oklch(0.72 0.16 155 / 0.15)",
                color: "oklch(0.72 0.16 155)",
              }}
            >
              Who Can Join
            </span>
            <h2
              className="text-3xl sm:text-4xl font-display font-bold mb-4"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              A Platform for Everyone
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "oklch(0.72 0.03 260)" }}
            >
              ONEartHeaven™ is designed for every stakeholder — from sovereign
              nations to individual citizens. Every pathway leads to meaningful
              participation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAKEHOLDERS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-ocid={`launch.stakeholder.card.${i + 1}`}
                className="rounded-xl p-6 flex flex-col gap-4"
                style={{
                  background: "oklch(0.13 0.02 260 / 0.8)",
                  border: "1px solid oklch(0.22 0.03 260)",
                  borderLeft: `4px solid ${s.color}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklch, ${s.color} 15%, transparent)`,
                  }}
                >
                  <s.icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "oklch(0.92 0.015 95)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.68 0.02 260)" }}
                  >
                    {s.desc}
                  </p>
                </div>
                <Link to="/register">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs gap-1 px-0 hover:gap-2 transition-all"
                    style={{ color: s.color }}
                    data-ocid={`launch.stakeholder.link.${i + 1}`}
                  >
                    Join now <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Benefits & Features */}
      <section
        data-ocid="launch.features.section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{
              background: "oklch(0.70 0.18 310 / 0.15)",
              color: "oklch(0.72 0.16 310)",
            }}
          >
            Benefits & Features
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
            style={{ color: "oklch(var(--gold-bright))" }}
          >
            Everything You Need to Participate and Thrive
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            From governance tools to economic incentives — every feature is
            designed to empower every participant, at every level.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              data-ocid={`launch.feature.card.${i + 1}`}
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{
                background: "oklch(0.13 0.02 260 / 0.8)",
                border: "1px solid oklch(0.22 0.03 260)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(var(--gold) / 0.12)" }}
              >
                <f.icon
                  className="h-4.5 w-4.5"
                  style={{ color: "oklch(var(--gold))" }}
                />
              </div>
              <div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: "oklch(0.92 0.015 95)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.62 0.02 260)" }}
                >
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: FinFracFran™ Model */}
      <section
        data-ocid="launch.finfracfran.section"
        className="py-20"
        style={{ background: "oklch(0.10 0.015 260 / 0.5)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{
                background: "oklch(0.65 0.20 30 / 0.15)",
                color: "oklch(0.65 0.20 30)",
              }}
            >
              FinFracFran™ Scaling Model
            </span>
            <h2
              className="text-3xl sm:text-4xl font-display font-bold mb-4"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              How Solutions Scale to Every Corner of the World
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "oklch(0.72 0.03 260)" }}
            >
              The FinFracFran™ model enables rapid, inclusive economic
              participation — turning local breakthroughs into global movements,
              with value flowing back to every contributor.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {FF_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                data-ocid={`launch.finfracfran.step.${i + 1}`}
                className="relative flex flex-col items-center text-center p-6"
              >
                {/* Connector arrow */}
                {i < FF_STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
                    style={{ color: "oklch(0.45 0.04 260)" }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl font-black font-display"
                  style={{
                    background: `color-mix(in oklch, ${step.color} 18%, transparent)`,
                    border: `2px solid ${step.color}`,
                    color: step.color,
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: step.color }}
                >
                  {step.label}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.02 260)" }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 rounded-xl p-6 text-center"
            style={{
              background: "oklch(0.13 0.02 260 / 0.8)",
              border: "1px solid oklch(0.22 0.03 260)",
            }}
          >
            <p className="text-sm" style={{ color: "oklch(0.72 0.03 260)" }}>
              <span
                className="font-bold"
                style={{ color: "oklch(var(--gold))" }}
              >
                FinFracFran™
              </span>{" "}
              is the economic backbone of ONEartHeaven™ — a model where every
              proven solution becomes an investable, replicable asset. Creators,
              investors, communities, and franchisees all share in the value
              generated as solutions spread around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Our Commitments */}
      <section
        data-ocid="launch.commitments.section"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{
              background: "oklch(var(--gold) / 0.15)",
              color: "oklch(var(--gold))",
            }}
          >
            Our Commitments
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
            style={{ color: "oklch(var(--gold-bright))" }}
          >
            Our Commitments to Every Partner
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            These are not aspirations — they are the founding principles by
            which every decision on this platform is made and held accountable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {COMMITMENTS.map((c, i) => (
            <motion.div
              key={c.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-ocid={`launch.commitment.card.${i + 1}`}
              className="rounded-xl p-5 flex gap-4 items-start"
              style={{
                background: "oklch(0.13 0.02 260 / 0.8)",
                border: "1px solid oklch(0.22 0.03 260)",
                borderLeft: `4px solid ${c.color}`,
              }}
            >
              <div
                className="mt-0.5 shrink-0 p-2 rounded-lg"
                style={{
                  background: `color-mix(in oklch, ${c.color} 12%, transparent)`,
                }}
              >
                <c.icon className="h-5 w-5" style={{ color: c.color }} />
              </div>
              <p
                className="text-sm leading-relaxed font-medium"
                style={{ color: "oklch(0.82 0.02 260)" }}
              >
                {c.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 6: CTA */}
      <section
        data-ocid="launch.cta.section"
        className="py-24"
        style={{ background: "oklch(0.10 0.015 260 / 0.5)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{
                background: "oklch(var(--gold) / 0.15)",
                border: "1px solid oklch(var(--gold) / 0.3)",
              }}
            >
              <Globe2
                className="h-8 w-8"
                style={{ color: "oklch(var(--gold))" }}
              />
            </div>
            <h2
              className="text-3xl sm:text-5xl font-display font-bold mb-5 leading-tight"
              style={{ color: "oklch(0.92 0.015 95)" }}
            >
              Ready to Help Shape a Better World?
            </h2>
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: "oklch(0.72 0.03 260)" }}
            >
              Join the founding generation of ONEartHeaven™ — the people,
              organizations, and communities who will define how the platform
              grows and who it serves.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="btn-gold gap-2 hover:scale-105 transition-transform"
                  data-ocid="launch.cta.register.primary_button"
                >
                  <Sparkles className="h-4 w-4" />
                  Register Your Organization
                </Button>
              </Link>
              <Link to="/charter">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 hover:scale-105 transition-transform"
                  style={{
                    borderColor: "oklch(var(--gold) / 0.4)",
                    color: "oklch(var(--gold))",
                  }}
                  data-ocid="launch.cta.charter.secondary_button"
                >
                  <BookOpen className="h-4 w-4" />
                  Read the Charter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
