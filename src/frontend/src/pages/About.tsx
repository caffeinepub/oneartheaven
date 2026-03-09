import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Brain,
  Check,
  Download,
  Eye,
  FileText,
  Globe,
  Layers,
  MapPin,
  Network,
  Star,
  UserPlus,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "All decisions, votes, and funding are visible on-chain. No hidden deals, no backroom negotiations — every action is permanently auditable by anyone on Earth.",
    color: "var(--gold)",
  },
  {
    icon: MapPin,
    title: "Subsidiarity",
    description:
      "Local solutions first. Every initiative must prove itself at the community level before scaling globally. Communities retain sovereignty over their own affairs.",
    color: "var(--teal)",
  },
  {
    icon: Brain,
    title: "AI-Augmented Governance",
    description:
      "Proposals are analyzed for unintended consequences, historical precedents, and Charter alignment by AI before any vote is cast. Intelligence serves humanity — not the other way around.",
    color: "var(--gold-bright)",
  },
  {
    icon: Globe,
    title: "Open Participation",
    description:
      "Every human being on Earth can contribute, propose, and vote — not just nation-states or governments. Individuals, cooperatives, NGOs, cities, and nations all have a voice.",
    color: "var(--teal-bright)",
  },
  {
    icon: Network,
    title: "Decentralized Infrastructure",
    description:
      "No single point of failure or political capture. Powered by ICP DePin — a global computer with no central authority that can be switched off or censored.",
    color: "var(--gold)",
  },
  {
    icon: Layers,
    title: "FinFracFran™ Economy",
    description:
      "Fractionalization and franchising enable capital-friendly, multi-country adoption at every scale — from individual entrepreneurs to multinational cooperatives — preserving local relevance.",
    color: "var(--teal)",
  },
];

const CHARTER_ARTICLES = [
  {
    number: "I",
    title: "Universal Membership",
    content:
      "Any individual, community, city, organization, cooperative, or nation may join ONEartHeaven. There are no vetoes. There are no exclusions based on geopolitical status, nationality, religion, ethnicity, or economic standing. Membership is a universal right — not a political privilege. Every member contributes according to their capacity and receives support according to their need.",
  },
  {
    number: "II",
    title: "Transparent Governance",
    content:
      "All resolutions, votes, deliberations, and funding flows are publicly verifiable on the Internet Computer blockchain. No resolution shall be passed, no funds disbursed, and no policy enacted without a complete, immutable on-chain record accessible to every member of ONEartHeaven and the global public. Opacity is incompatible with justice.",
  },
  {
    number: "III",
    title: "Solutions First",
    content:
      "Every initiative, resolution, and program within ONEartHeaven must demonstrate real-world applicability, measurable outcomes, and a clear path from proposal to implementation. Theory without action has no place here. Reports without implementation are waste. Every idea must have a responsible party, a timeline, an impact measure, and a public record of results.",
  },
  {
    number: "IV",
    title: "FinFracFran™ Principle",
    content:
      "All systems, solutions, frameworks, and programs within ONEartHeaven shall be designed for fractionalization and franchising — enabling rapid, capital-efficient adoption across cultures, communities, and continents. No good solution shall remain locked in one place when it can be adapted and deployed globally. The FinFracFran™ methodology ensures relevance through local adaptation while preserving the integrity of proven approaches.",
  },
];

const COMPARISONS = [
  {
    dimension: "Membership",
    un: "Nation-states only — billions excluded from formal participation",
    one: "Every human being, organization, cooperative, city, and nation welcomed",
  },
  {
    dimension: "Voting Power",
    un: "P5 veto power blocks global progress at the will of 5 nations",
    one: "Weighted consensus model — no single veto, no permanent privilege",
  },
  {
    dimension: "Transparency",
    un: "Opaque budgets, backroom deals, and non-public deliberations",
    one: "Full on-chain audit trail — every vote, dollar, and decision is public",
  },
  {
    dimension: "Speed",
    un: "Years to pass resolutions — crises outpace bureaucracy",
    one: "AI-accelerated deliberation with structured timelines and accountability",
  },
  {
    dimension: "Solutions",
    un: "Reports and declarations — rarely translated into measurable action",
    one: "Actionable solutions library with impact ledgers and replication toolkits",
  },
  {
    dimension: "Infrastructure",
    un: "Centralized, vulnerable to political capture and funding withdrawal",
    one: "ICP decentralized DePin — censorship-resistant, no single point of failure",
  },
  {
    dimension: "Funding",
    un: "Assessed contributions and donor dependency breed influence and bias",
    one: "FinFracFran™ community funding pools — diversified, transparent, community-directed",
  },
  {
    dimension: "Scale",
    un: "Top-down directives from headquarters to member states",
    one: "Bottom-up from local chapters globally, scaled only when proven",
  },
];

// ─── Section: Hero ─────────────────────────────────────────────────────────

function AboutHero() {
  return (
    <section
      data-ocid="about.hero.section"
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: "40vh", background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/about-hero-earth.dim_1600x640.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(var(--cosmos-deep) / 0.4) 0%, oklch(var(--cosmos-deep) / 0.7) 60%, oklch(var(--cosmos-deep)) 100%)",
          }}
        />
      </div>

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 50% 40%, oklch(0.72 0.16 75 / 0.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 50% at 50% 30%, oklch(0.55 0.14 195 / 0.08) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20 sm:py-28">
        {/* Phase badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            borderColor: "oklch(var(--teal) / 0.35)",
            background: "oklch(var(--teal) / 0.07)",
          }}
        >
          <FileText
            className="h-3.5 w-3.5"
            style={{ color: "oklch(var(--teal-bright))" }}
          />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            Phase 1.2 — About
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          <span className="gold-gradient-text">About ONEartHeaven™</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
          style={{ color: "oklch(0.78 0.03 260)" }}
        >
          A New Civilization Architecture for{" "}
          <span style={{ color: "oklch(var(--teal-bright))" }}>One Earth</span>,{" "}
          <span style={{ color: "oklch(var(--gold))" }}>One People</span>,{" "}
          <span style={{ color: "oklch(var(--pearl))" }}>One Future</span>
        </motion.p>

        {/* Founding Declaration */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <div
            className="absolute -left-4 top-0 bottom-0 w-0.5 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, oklch(var(--gold)) 0%, oklch(var(--teal)) 100%)",
            }}
          />
          <p
            className="text-base sm:text-lg italic font-medium leading-relaxed pl-6 text-left"
            style={{ color: "oklch(0.88 0.025 95)" }}
          >
            "Where the United Nations fell short, ONEartHeaven rises — open,
            transparent, intelligent, and unstoppable."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

// ─── Section: Vision & Values ──────────────────────────────────────────────

function ValuesSection() {
  return (
    <section
      data-ocid="about.values.section"
      className="py-20 sm:py-28"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(var(--gold))" }}
          >
            What We Stand For
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">
            Our Vision & <span className="gold-gradient-text">Core Values</span>
          </h2>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            Six principles that distinguish ONEartHeaven from every
            international institution that came before it — designed to endure,
            scale, and serve all of humanity.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_VALUES.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                data-ocid={`about.values.item.${idx + 1}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="cosmos-card rounded-2xl p-6 transition-all duration-300 group cursor-default"
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `oklch(${value.color} / 0.12)`,
                    border: `1px solid oklch(${value.color} / 0.25)`,
                  }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: `oklch(${value.color})` }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display text-lg font-bold mb-2.5 leading-snug"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  {value.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.62 0.04 260)" }}
                >
                  {value.description}
                </p>

                {/* Decorative accent line */}
                <div
                  className="mt-5 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, oklch(${value.color}) 0%, transparent 100%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Founding Charter ─────────────────────────────────────────────

function CharterSection() {
  return (
    <section
      data-ocid="about.charter.section"
      className="py-20 sm:py-28"
      style={{ background: "oklch(var(--cosmos-mid))" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            Foundational Document
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-3">
            The Founding <span className="gold-gradient-text">Charter</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: "oklch(0.6 0.04 260)" }}
          >
            A living document. Amended by consensus. Permanent on-chain.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px mb-10 mx-auto"
          style={{
            width: "200px",
            background:
              "linear-gradient(90deg, transparent, oklch(var(--gold)), transparent)",
          }}
        />

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {CHARTER_ARTICLES.map((article, idx) => (
              <AccordionItem
                key={article.number}
                value={`article-${article.number}`}
                data-ocid={`about.charter.panel.${idx + 1}`}
                className="rounded-xl overflow-hidden border-0"
                style={{
                  background: "oklch(var(--cosmos-surface) / 0.7)",
                  border: "1px solid oklch(var(--gold-dim) / 0.2)",
                }}
              >
                <AccordionTrigger
                  className="px-6 py-5 hover:no-underline group"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  <div className="flex items-center gap-4 text-left">
                    {/* Article Number Badge */}
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm"
                      style={{
                        background: "oklch(var(--gold) / 0.12)",
                        border: "1px solid oklch(var(--gold) / 0.3)",
                        color: "oklch(var(--gold))",
                      }}
                    >
                      {article.number}
                    </div>
                    <div>
                      <span
                        className="text-xs font-semibold tracking-widest uppercase block mb-0.5"
                        style={{ color: "oklch(var(--gold-dim))" }}
                      >
                        Article {article.number}
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold">
                        {article.title}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-14">
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: "oklch(0.68 0.04 260)" }}
                    >
                      {article.content}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Charter Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-3 justify-center"
        >
          <Button
            variant="outline"
            disabled
            data-ocid="about.charter.download.button"
            className="gap-2 opacity-60"
            style={{
              borderColor: "oklch(var(--gold) / 0.35)",
              color: "oklch(var(--gold))",
            }}
          >
            <Download className="h-4 w-4" />
            Download Charter PDF
            <span
              className="ml-1 text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "oklch(var(--gold) / 0.12)",
                color: "oklch(var(--gold-dim))",
              }}
            >
              Coming Soon
            </span>
          </Button>

          <Button
            variant="outline"
            disabled
            data-ocid="about.charter.amend.button"
            className="gap-2 opacity-60"
            style={{
              borderColor: "oklch(var(--teal) / 0.35)",
              color: "oklch(var(--teal-bright))",
            }}
          >
            <FileText className="h-4 w-4" />
            Propose Amendment
            <span
              className="ml-1 text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "oklch(var(--teal) / 0.1)",
                color: "oklch(var(--teal))",
              }}
            >
              Phase 2
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Comparison Table ────────────────────────────────────────────

function ComparisonSection() {
  return (
    <section
      data-ocid="about.comparison.section"
      className="py-20 sm:py-28"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.65 0.12 27)" }}
          >
            Why We Exist
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">
            Why ONEartHeaven,{" "}
            <span className="gold-gradient-text">Not the UN</span>
          </h2>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            We honour the ideals behind the United Nations. But we are honest
            about its structural failures — and we have designed something
            categorically different.
          </p>
        </motion.div>

        {/* Column Headers */}
        <div className="hidden md:grid grid-cols-[200px_1fr_1fr] gap-3 mb-3 px-4">
          <div />
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider"
            style={{
              background: "oklch(0.55 0.1 27 / 0.1)",
              color: "oklch(0.65 0.12 27)",
            }}
          >
            <X className="h-4 w-4" />
            The United Nations
          </div>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider"
            style={{
              background: "oklch(var(--teal) / 0.1)",
              color: "oklch(var(--teal-bright))",
            }}
          >
            <Check className="h-4 w-4" />
            ONEartHeaven
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="flex flex-col gap-3">
          {COMPARISONS.map((item, idx) => (
            <motion.div
              key={item.dimension}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-3"
            >
              {/* Dimension Label */}
              <div className="flex items-center md:justify-end pr-0 md:pr-4">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {item.dimension}
                </span>
              </div>

              {/* UN (Bad) */}
              <div className="comparison-bad rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <X
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.6 0.14 27)" }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.75 0.04 260)" }}
                  >
                    {item.un}
                  </p>
                </div>
              </div>

              {/* ONEartHeaven (Good) */}
              <div className="comparison-good rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <Check
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(var(--teal-bright))" }}
                  />
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: "oklch(0.82 0.04 200)" }}
                  >
                    {item.one}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Founding Council ────────────────────────────────────────────

const COUNCIL_SEATS = [
  {
    id: 1,
    label: "Founder Seat 1",
    status: "Seat Reserved",
    note: "Visionary Needed",
  },
  {
    id: 2,
    label: "Founder Seat 2",
    status: "Seat Reserved",
    note: "Visionary Needed",
  },
  {
    id: 3,
    label: "Founder Seat 3",
    status: "Seat Reserved",
    note: "Visionary Needed",
  },
];

function CouncilSection() {
  return (
    <section
      data-ocid="about.council.section"
      className="py-20 sm:py-28"
      style={{ background: "oklch(var(--cosmos-mid))" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(var(--gold))" }}
          >
            Leadership Circle
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">
            Founding <span className="gold-gradient-text">Council</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            Visionary leaders who will shape the foundation of ONEartHeaven.
            Three founding seats await the right voices.
          </p>
        </motion.div>

        {/* Council Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Reserved Seats */}
          {COUNCIL_SEATS.map((seat, idx) => (
            <motion.div
              key={seat.id}
              data-ocid={`about.council.item.${idx + 1}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="cosmos-card rounded-2xl p-6 text-center"
            >
              {/* Avatar Placeholder */}
              <div
                className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center relative"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.2 0.04 260), oklch(0.15 0.03 260))",
                  border: "2px dashed oklch(var(--gold-dim) / 0.35)",
                }}
              >
                {/* Pulsing dot */}
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: "oklch(var(--gold-dim))" }}
                />
              </div>

              {/* Seat Label */}
              <div
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                style={{
                  background: "oklch(var(--gold) / 0.08)",
                  border: "1px solid oklch(var(--gold) / 0.2)",
                  color: "oklch(var(--gold-dim))",
                }}
              >
                {seat.label}
              </div>

              <p
                className="font-display text-base font-bold mb-1"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                {seat.status}
              </p>
              <p className="text-sm" style={{ color: "oklch(0.45 0.04 260)" }}>
                {seat.note}
              </p>
            </motion.div>
          ))}

          {/* Apply to Join Card */}
          <motion.div
            data-ocid="about.council.item.4"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="rounded-2xl p-6 text-center relative overflow-hidden group"
            style={{
              background: "oklch(0.14 0.045 260)",
              border: "1.5px solid oklch(var(--gold) / 0.45)",
              boxShadow: "0 0 30px oklch(var(--gold) / 0.08)",
            }}
          >
            {/* Background glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(var(--gold) / 0.05) 0%, transparent 70%)",
              }}
            />

            {/* Icon */}
            <div
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center relative z-10"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--gold) / 0.15), oklch(var(--gold) / 0.08))",
                border: "2px solid oklch(var(--gold) / 0.4)",
              }}
            >
              <Star
                className="h-8 w-8"
                style={{ color: "oklch(var(--gold))" }}
              />
            </div>

            {/* Label */}
            <div
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 relative z-10"
              style={{
                background: "oklch(var(--gold) / 0.15)",
                border: "1px solid oklch(var(--gold) / 0.4)",
                color: "oklch(var(--gold))",
              }}
            >
              Founder Seat 4
            </div>

            <p
              className="font-display text-base font-bold mb-1 relative z-10"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Join as Founder
            </p>
            <p
              className="text-sm mb-5 relative z-10"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              Shape the future of global cooperation
            </p>

            <Button
              data-ocid="about.council.apply.button"
              className="btn-gold gap-2 w-full relative z-10"
              disabled
            >
              <UserPlus className="h-4 w-4" />
              Apply to Join
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Join CTA ────────────────────────────────────────────────────

function JoinCTASection() {
  return (
    <section
      data-ocid="about.join.section"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(var(--gold) / 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 50% at 50% 60%, oklch(var(--teal) / 0.05) 0%, transparent 65%)",
        }}
      />

      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(var(--gold) / 0.3) 30%, oklch(var(--teal) / 0.3) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(var(--gold) / 0.35)",
              background: "oklch(var(--gold) / 0.07)",
            }}
          >
            <span className="text-lg">🌍</span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold))" }}
            >
              NewWaysNow
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              color: "oklch(var(--pearl))",
            }}
          >
            Ready to Help Build{" "}
            <span className="gold-gradient-text">a Better World?</span>
          </h2>

          {/* Subtext */}
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.68 0.04 260)" }}
          >
            ONEartHeaven is open to everyone. Join as a citizen, a local
            chapter, a solution contributor, or a founding partner.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/community" data-ocid="about.join.primary_button">
              <Button
                size="lg"
                className="btn-gold gap-2 text-base px-8 py-3 h-auto"
              >
                <UserPlus className="h-5 w-5" />
                Join as a Citizen
              </Button>
            </Link>
            <Link to="/solutions" data-ocid="about.join.secondary_button">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base px-8 py-3 h-auto"
                style={{
                  borderColor: "oklch(var(--gold) / 0.4)",
                  color: "oklch(var(--gold))",
                }}
              >
                <Globe className="h-5 w-5" />
                Explore Solutions
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <main>
      <AboutHero />
      <ValuesSection />
      <CharterSection />
      <ComparisonSection />
      <CouncilSection />
      <JoinCTASection />
    </main>
  );
}
