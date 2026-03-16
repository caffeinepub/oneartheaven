import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Gavel,
  Scale,
  ScrollText,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Static Charter Data ─────────────────────────────────────────────────────

interface Article {
  romanNumeral: string;
  number: string;
  title: string;
  content: string;
  subClauses: string[];
  icon: React.ElementType;
  accentColor: string;
}

const CHARTER_ARTICLES: Article[] = [
  {
    romanNumeral: "I",
    number: "1",
    title: "Preamble & Purpose",
    icon: BookOpen,
    accentColor: "var(--gold)",
    content:
      "ONEartHeaven exists to serve the whole of humanity, the natural world, and future generations. Its purpose is to provide an open, transparent, and accountable framework for global cooperation that empowers local action and scales proven solutions worldwide.",
    subClauses: [
      "1.1 — ONEartHeaven shall operate on principles of radical transparency; all governance records, financial flows, and decision outcomes shall be publicly accessible on-chain.",
      "1.2 — The organization shall hold no permanent veto power for any single nation, entity, or group.",
      "1.3 — AI-augmented governance tools shall assist but never replace human deliberation and democratic decision-making.",
    ],
  },
  {
    romanNumeral: "II",
    number: "2",
    title: "Membership & Participation",
    icon: Scale,
    accentColor: "var(--teal)",
    content:
      "Membership in ONEartHeaven is open to all nations, cities, NGOs, cooperatives, corporations, communities, and individuals who commit to the Charter's principles. No entity shall be excluded on the basis of geography, economic status, religion, culture, or political system.",
    subClauses: [
      "2.1 — Any entity may apply for membership through the open registry.",
      "2.2 — Membership tiers carry equal foundational rights with differentiated responsibilities.",
      "2.3 — The FinFracFran model enables fractional membership participation, allowing communities of any size to engage proportionally.",
      "2.4 — Multi-wallet and multi-lingual access shall be supported to ensure universal participation across all regions.",
    ],
  },
  {
    romanNumeral: "III",
    number: "3",
    title: "Governance & Decision-Making",
    icon: Gavel,
    accentColor: "var(--gold-bright)",
    content:
      "ONEartHeaven is governed through a system of distributed councils, open assemblies, and transparent voting mechanisms. Power is distributed, not concentrated. Every registered member has a voice in matters that affect them.",
    subClauses: [
      "3.1 — The Global Assembly is the supreme deliberative body; all registered members may participate.",
      "3.2 — Thematic Councils govern domain-specific decisions through weighted consensus.",
      "3.3 — No single entity may hold more than 5% of total voting weight on any resolution.",
      "3.4 — AI Policy Advisors shall analyze all major proposals for unintended consequences and historical precedent before votes are cast.",
      "3.5 — Youth representatives (under 25) shall hold a guaranteed minimum 15% of seats in all Councils.",
    ],
  },
  {
    romanNumeral: "IV",
    number: "4",
    title: "Transparency & Accountability",
    icon: ShieldCheck,
    accentColor: "var(--teal-bright)",
    content:
      "ONEartHeaven holds itself to the highest standards of accountability. Every decision, expenditure, and outcome shall be recorded immutably on the Internet Computer blockchain and accessible to any person on Earth.",
    subClauses: [
      "4.1 — All budget allocations and expenditures shall be published in real-time on the Open Budget Dashboard.",
      "4.2 — An independent Corruption Watchdog, powered by AI pattern detection and anonymous reporting, shall operate continuously.",
      "4.3 — Performance Scorecards for all councils and programs shall be updated quarterly.",
      "4.4 — Whistleblower protections shall be enshrined and enforced through encrypted submission systems.",
    ],
  },
  {
    romanNumeral: "V",
    number: "5",
    title: "FinFracFran Economy",
    icon: ScrollText,
    accentColor: "var(--gold)",
    content:
      "The FinFracFran (Financial Fractionalization & Franchising) model is the economic backbone of ONEartHeaven. It enables any individual, community, or organization anywhere in the world to participate in, contribute to, and benefit from the platform's economic ecosystem at any scale.",
    subClauses: [
      "5.1 — Fractionalization: Any resource, project, or asset within the ecosystem may be divided into fractional units for broad participation and shared ownership.",
      "5.2 — Franchising: Proven local solutions shall be packaged as franchise blueprints, enabling rapid multi-country adoption.",
      "5.3 — Multi-wallet support shall enable participation across ICP, traditional finance, and cooperative treasury systems.",
      "5.4 — Quadratic funding and community-directed grant pools shall allocate resources democratically.",
      "5.5 — The ONEarth contribution credit system shall reward participation without speculative tokenization.",
    ],
  },
  {
    romanNumeral: "VI",
    number: "6",
    title: "Youth & Future Generations",
    icon: FileText,
    accentColor: "var(--teal)",
    content:
      "ONEartHeaven is built for the future. The voices, needs, and visions of young people and generations not yet born shall be structurally embedded in all governance and planning processes.",
    subClauses: [
      "6.1 — A dedicated Youth Council shall hold binding representation in all major Councils and the Global Assembly.",
      "6.2 — A Future Generations Commissioner shall represent the interests of those not yet born in all long-term planning.",
      "6.3 — Educational access to ONEartHeaven's Academy shall be free and open to all young people globally.",
      "6.4 — Youth-led pilot programs shall receive priority funding consideration in all grant cycles.",
    ],
  },
];

// ─── Amendment Data ───────────────────────────────────────────────────────────

type AmendmentOutcome = "Passed" | "Rejected" | "Pending";

interface Amendment {
  number: number;
  title: string;
  article: string;
  proposedBy: string;
  proposedDate: string;
  votedDate: string;
  outcome: AmendmentOutcome;
  votes?: { yes: number; no: number; abstain: number };
}

const AMENDMENTS: Amendment[] = [
  {
    number: 1,
    title: "Youth Seat Guarantee Increase",
    article: "Article III",
    proposedBy: "Youth Council Founding Delegates",
    proposedDate: "2024-03-15",
    votedDate: "2024-04-01",
    outcome: "Passed",
    votes: { yes: 847, no: 112, abstain: 43 },
  },
  {
    number: 2,
    title: "Single-Entity Voting Cap Reduction",
    article: "Article III",
    proposedBy: "Transparency Oversight Council",
    proposedDate: "2024-05-20",
    votedDate: "2024-06-10",
    outcome: "Passed",
    votes: { yes: 1203, no: 89, abstain: 67 },
  },
  {
    number: 3,
    title: "FinFracFran Multi-Currency Protocol",
    article: "Article V",
    proposedBy: "EconJustice Council",
    proposedDate: "2024-09-01",
    votedDate: "—",
    outcome: "Pending",
  },
];

// ─── Voting Record Data ────────────────────────────────────────────────────────

interface VoteOption {
  label: string;
  count: number;
}

interface CharterVote {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Closed";
  dateRange: string;
  options: VoteOption[];
}

const CHARTER_VOTES: CharterVote[] = [
  {
    id: 1,
    title: "Adoption of AI Policy Advisor Protocol v2",
    description:
      "Ratify the updated AI Policy Advisor framework governing how AI analysis is integrated into the resolution voting process.",
    status: "Closed",
    dateRange: "Ended 2024-11-30",
    options: [
      { label: "Yes — Adopt v2 immediately", count: 634 },
      { label: "Yes — Adopt v2 after 90-day review", count: 412 },
      { label: "No — Retain current protocol", count: 78 },
      { label: "Abstain", count: 56 },
    ],
  },
  {
    id: 2,
    title: "FinFracFran Multi-Currency Protocol — Charter Vote",
    description:
      "Approve the amendment to Article V enabling multi-currency wallet integration, including ICP, cooperative treasury tokens, and traditional finance bridges.",
    status: "Active",
    dateRange: "Ends 2025-02-15",
    options: [
      { label: "Yes — Adopt the amendment", count: 289 },
      { label: "No — Reject the amendment", count: 34 },
      { label: "Abstain", count: 12 },
    ],
  },
];

// ─── Helper: Get outcome styles ───────────────────────────────────────────────

function getOutcomeStyle(outcome: AmendmentOutcome) {
  switch (outcome) {
    case "Passed":
      return {
        bg: "oklch(0.45 0.14 155 / 0.15)",
        border: "oklch(0.55 0.15 155 / 0.35)",
        color: "oklch(0.72 0.14 155)",
        icon: CheckCircle2,
      };
    case "Rejected":
      return {
        bg: "oklch(0.55 0.1 27 / 0.1)",
        border: "oklch(0.65 0.12 27 / 0.3)",
        color: "oklch(0.65 0.12 27)",
        icon: XCircle,
      };
    case "Pending":
      return {
        bg: "oklch(var(--gold) / 0.08)",
        border: "oklch(var(--gold) / 0.25)",
        color: "oklch(var(--gold))",
        icon: Clock,
      };
  }
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function CharterHero() {
  return (
    <section
      data-ocid="charter.hero.section"
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: "48vh", background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Decorative parchment texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 80% at 50% 0%, oklch(0.72 0.16 75 / 0.15) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 20% 80%, oklch(0.55 0.14 195 / 0.1) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 20%, oklch(0.72 0.16 75 / 0.08) 0%, transparent 55%)
          `,
        }}
      />

      {/* Subtle document grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.8 0.02 95) 0px, transparent 1px, transparent 48px, oklch(0.8 0.02 95) 48px)",
        }}
      />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 70% at 50% 45%, oklch(0.72 0.16 75 / 0.07) 0%, transparent 70%)",
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
          <ScrollText
            className="h-3.5 w-3.5"
            style={{ color: "oklch(var(--teal-bright))" }}
          />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            Phase 1.4 — Governance Charter
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-hero-xl font-display mb-5"
        >
          <span className="gold-gradient-text">
            The ONEartHeaven Founding Charter
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium tracking-wide"
          style={{ color: "oklch(0.68 0.04 260)" }}
        >
          A Living Constitution{" "}
          <span style={{ color: "oklch(var(--gold-dim))" }}>·</span> Ratified
          January 1, 2024{" "}
          <span style={{ color: "oklch(var(--gold-dim))" }}>·</span> Version 1.0
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button
            variant="outline"
            disabled
            data-ocid="charter.download.button"
            className="gap-2 opacity-60"
            style={{
              borderColor: "oklch(var(--gold) / 0.35)",
              color: "oklch(var(--gold))",
            }}
          >
            <Download className="h-4 w-4" />
            Download Charter PDF
            <span
              className="ml-1 text-xs px-2 py-0.5 rounded-full"
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
            data-ocid="charter.propose.button"
            className="gap-2 opacity-60"
            style={{
              borderColor: "oklch(var(--teal) / 0.35)",
              color: "oklch(var(--teal-bright))",
            }}
          >
            <FileText className="h-4 w-4" />
            Propose Amendment
            <span
              className="ml-1 text-xs px-2 py-0.5 rounded-full"
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

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(var(--cosmos-deep)))",
        }}
      />
    </section>
  );
}

// ─── Section: Preamble ────────────────────────────────────────────────────────

function PreambleSection() {
  return (
    <section
      data-ocid="charter.preamble.section"
      className="py-20 sm:py-24"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Gradient separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px mb-14 mx-auto"
          style={{
            width: "180px",
            background:
              "linear-gradient(90deg, transparent, oklch(var(--gold)), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Section label */}
          <p
            className="text-center text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: "oklch(var(--gold))" }}
          >
            Preamble
          </p>

          {/* Preamble Card */}
          <div
            className="relative rounded-2xl p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.14 0.04 260) 0%, oklch(0.12 0.035 260) 100%)",
              border: "1px solid oklch(var(--gold) / 0.2)",
              boxShadow:
                "0 0 60px oklch(var(--gold) / 0.05), 0 20px 40px oklch(0.05 0.02 260 / 0.4)",
            }}
          >
            {/* Decorative gold corner ornament — top left */}
            <div
              className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--gold) / 0.12) 0%, transparent 60%)",
                borderRadius: "1rem 0 0 0",
              }}
            />
            {/* Decorative gold corner ornament — bottom right */}
            <div
              className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(315deg, oklch(var(--gold) / 0.08) 0%, transparent 60%)",
                borderRadius: "0 0 1rem 0",
              }}
            />

            {/* Open quote mark */}
            <div
              className="font-display text-7xl sm:text-9xl leading-none mb-4 select-none"
              style={{ color: "oklch(var(--gold) / 0.2)" }}
              aria-hidden="true"
            >
              "
            </div>

            {/* Left gold accent bar */}
            <div className="flex gap-6 sm:gap-8">
              <div
                className="hidden sm:block w-0.5 shrink-0 rounded-full self-stretch"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(var(--gold)) 0%, oklch(var(--teal)) 100%)",
                }}
              />
              <blockquote>
                <p
                  className="font-display text-lg sm:text-xl leading-relaxed font-medium italic"
                  style={{ color: "oklch(0.88 0.025 95)" }}
                >
                  We, the peoples and communities of ONEartHeaven, united in our
                  commitment to justice, sustainability, peace, and shared
                  prosperity, hereby establish this Charter as the living
                  constitution of our global community. Building upon the wisdom
                  and dedication of all who came before us, we bind ourselves to
                  every human being, every community, and every living system on
                  Earth — honoring the work of all global institutions while
                  opening new pathways for participation, transparency, and
                  shared progress. We commit to radical transparency,
                  decentralized power, AI-augmented wisdom, and the FinFracFran
                  principles of fractionalization and franchising for universal
                  participation.
                </p>
                <footer
                  className="mt-6 text-sm font-semibold tracking-wide"
                  style={{ color: "oklch(var(--gold-dim))" }}
                >
                  — The Founding Assembly of ONEartHeaven, January 1, 2024
                </footer>
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Living Constitution (Articles) ──────────────────────────────────

function ArticlesSection() {
  return (
    <section
      data-ocid="charter.articles.section"
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
          className="text-center mb-14"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            The Living Constitution
          </p>
          <h2
            className="font-display font-bold leading-tight text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          >
            Six <span className="gold-gradient-text">Founding Articles</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.6 0.04 260)" }}
          >
            The constitutional foundation of ONEartHeaven. Each article is a
            living clause — amendable by consensus, permanent on-chain.
          </p>
        </motion.div>

        {/* Gradient separator */}
        <div
          className="h-px mb-10 mx-auto"
          style={{
            width: "200px",
            background:
              "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.5), transparent)",
          }}
        />

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {CHARTER_ARTICLES.map((article, idx) => {
              const Icon = article.icon;
              return (
                <AccordionItem
                  key={article.romanNumeral}
                  value={`article-${article.romanNumeral}`}
                  data-ocid={`charter.article.panel.${idx + 1}`}
                  className="rounded-2xl overflow-hidden border-0"
                  style={{
                    background: "oklch(var(--cosmos-surface) / 0.8)",
                    border: `1px solid oklch(${article.accentColor} / 0.15)`,
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 hover:no-underline hover:bg-[oklch(var(--cosmos-deep)/0.3)] transition-colors group"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    <div className="flex items-center gap-4 text-left w-full">
                      {/* Roman numeral badge */}
                      <div
                        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-sm"
                        style={{
                          background: `oklch(${article.accentColor} / 0.1)`,
                          border: `1.5px solid oklch(${article.accentColor} / 0.3)`,
                          color: `oklch(${article.accentColor})`,
                        }}
                      >
                        {article.romanNumeral}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className="text-xs font-semibold tracking-widest uppercase block mb-0.5"
                          style={{
                            color: `oklch(${article.accentColor} / 0.7)`,
                          }}
                        >
                          Article {article.number}
                        </span>
                        <span className="font-display text-base sm:text-lg font-bold block leading-snug">
                          {article.title}
                        </span>
                      </div>

                      {/* Icon — rightmost on desktop */}
                      <Icon
                        className="hidden sm:block h-5 w-5 shrink-0 mr-2 opacity-35"
                        style={{ color: `oklch(${article.accentColor})` }}
                      />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-7">
                    {/* Thin accent top border */}
                    <div
                      className="h-px mb-5"
                      style={{
                        background: `linear-gradient(90deg, oklch(${article.accentColor} / 0.3) 0%, transparent 60%)`,
                      }}
                    />

                    <div className="pl-0 sm:pl-15 space-y-5">
                      {/* Main paragraph */}
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: "oklch(0.72 0.03 260)" }}
                      >
                        {article.content}
                      </p>

                      {/* Sub-clauses */}
                      <ul className="space-y-2.5">
                        {article.subClauses.map((clause) => (
                          <li key={clause} className="flex items-start gap-3">
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{
                                background: `oklch(${article.accentColor})`,
                              }}
                            />
                            <span
                              className="text-sm leading-relaxed font-mono"
                              style={{ color: "oklch(0.62 0.04 260)" }}
                            >
                              {clause}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Amendment Timeline ─────────────────────────────────────────────

function AmendmentSection() {
  return (
    <section
      data-ocid="charter.amendments.section"
      className="py-20 sm:py-28"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(var(--gold))" }}
          >
            Amendment Record
          </p>
          <h2
            className="font-display font-bold leading-tight text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          >
            Amendment <span className="gold-gradient-text">History</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.6 0.04 260)" }}
          >
            All changes to the Founding Charter — proposed, debated, voted, and
            permanently recorded on-chain.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(180deg, oklch(var(--gold) / 0.4) 0%, oklch(var(--teal) / 0.3) 50%, oklch(var(--gold) / 0.15) 100%)",
            }}
          />

          <div className="space-y-8 pl-16 sm:pl-20">
            {AMENDMENTS.map((amendment, idx) => {
              const style = getOutcomeStyle(amendment.outcome);
              const OutcomeIcon = style.icon;
              const totalVotes = amendment.votes
                ? amendment.votes.yes +
                  amendment.votes.no +
                  amendment.votes.abstain
                : 0;

              return (
                <motion.div
                  key={amendment.number}
                  data-ocid={`charter.amendment.item.${idx + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-10 sm:-left-12 top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: "oklch(var(--cosmos-deep))",
                      borderColor: style.color,
                      boxShadow: `0 0 10px ${style.color}40`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: style.color }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl p-5 sm:p-6"
                    style={{
                      background: "oklch(var(--cosmos-surface) / 0.8)",
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="text-xs font-bold tracking-widest uppercase font-mono"
                            style={{ color: "oklch(0.5 0.04 260)" }}
                          >
                            Amendment {amendment.number}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: "oklch(var(--gold) / 0.08)",
                              color: "oklch(var(--gold-dim))",
                              border: "1px solid oklch(var(--gold) / 0.2)",
                            }}
                          >
                            {amendment.article}
                          </span>
                        </div>
                        <h3
                          className="font-display text-base sm:text-lg font-bold"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          {amendment.title}
                        </h3>
                      </div>

                      {/* Outcome badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0"
                        style={{
                          background: style.bg,
                          border: `1px solid ${style.border}`,
                          color: style.color,
                        }}
                      >
                        <OutcomeIcon className="h-3.5 w-3.5" />
                        {amendment.outcome}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div
                      className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs mb-4"
                      style={{ color: "oklch(0.52 0.04 260)" }}
                    >
                      <span>
                        <span className="font-semibold">Proposed by:</span>{" "}
                        {amendment.proposedBy}
                      </span>
                      <span>
                        <span className="font-semibold">Proposed:</span>{" "}
                        {amendment.proposedDate}
                      </span>
                      <span>
                        <span className="font-semibold">Vote date:</span>{" "}
                        {amendment.votedDate}
                      </span>
                    </div>

                    {/* Vote tallies */}
                    {amendment.votes && totalVotes > 0 ? (
                      <div className="space-y-2">
                        {/* Yes bar */}
                        <div className="flex items-center gap-3">
                          <span
                            className="text-xs font-semibold w-16 text-right shrink-0"
                            style={{ color: "oklch(0.72 0.14 155)" }}
                          >
                            Yes
                          </span>
                          <div
                            className="flex-1 rounded-full overflow-hidden h-2"
                            style={{
                              background: "oklch(0.18 0.03 260)",
                            }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(amendment.votes.yes / totalVotes) * 100}%`,
                                background:
                                  "linear-gradient(90deg, oklch(0.55 0.15 155), oklch(0.72 0.14 155))",
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-mono w-12 shrink-0"
                            style={{ color: "oklch(0.72 0.14 155)" }}
                          >
                            {amendment.votes.yes.toLocaleString()}
                          </span>
                        </div>
                        {/* No bar */}
                        <div className="flex items-center gap-3">
                          <span
                            className="text-xs font-semibold w-16 text-right shrink-0"
                            style={{ color: "oklch(0.65 0.12 27)" }}
                          >
                            No
                          </span>
                          <div
                            className="flex-1 rounded-full overflow-hidden h-2"
                            style={{
                              background: "oklch(0.18 0.03 260)",
                            }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(amendment.votes.no / totalVotes) * 100}%`,
                                background:
                                  "linear-gradient(90deg, oklch(0.55 0.1 27), oklch(0.65 0.12 27))",
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-mono w-12 shrink-0"
                            style={{ color: "oklch(0.65 0.12 27)" }}
                          >
                            {amendment.votes.no.toLocaleString()}
                          </span>
                        </div>
                        {/* Abstain bar */}
                        <div className="flex items-center gap-3">
                          <span
                            className="text-xs font-semibold w-16 text-right shrink-0"
                            style={{ color: "oklch(0.52 0.04 260)" }}
                          >
                            Abstain
                          </span>
                          <div
                            className="flex-1 rounded-full overflow-hidden h-2"
                            style={{
                              background: "oklch(0.18 0.03 260)",
                            }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(amendment.votes.abstain / totalVotes) * 100}%`,
                                background: "oklch(0.35 0.04 260)",
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-mono w-12 shrink-0"
                            style={{ color: "oklch(0.52 0.04 260)" }}
                          >
                            {amendment.votes.abstain.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="text-xs italic"
                        style={{ color: "oklch(0.52 0.04 260)" }}
                      >
                        Voting in progress — results will be recorded on-chain
                        upon close.
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Voting Record ───────────────────────────────────────────────────

function VotingRecordSection() {
  return (
    <section
      data-ocid="charter.voting.section"
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
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            Active & Closed Votes
          </p>
          <h2
            className="font-display font-bold leading-tight text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          >
            Voting <span className="gold-gradient-text">Record</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.6 0.04 260)" }}
          >
            All Charter votes — open, closed, and in progress. Every outcome
            immutably recorded on the Internet Computer.
          </p>
        </motion.div>

        {/* Vote Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {CHARTER_VOTES.map((vote, idx) => {
            const total = vote.options.reduce((sum, o) => sum + o.count, 0);
            const isActive = vote.status === "Active";

            return (
              <motion.div
                key={vote.id}
                data-ocid={`charter.vote.card.${idx + 1}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="rounded-2xl p-6 sm:p-7 relative overflow-hidden"
                style={{
                  background: "oklch(var(--cosmos-surface) / 0.9)",
                  border: isActive
                    ? "1.5px solid oklch(0.55 0.14 155 / 0.4)"
                    : "1px solid oklch(var(--gold-dim) / 0.2)",
                  boxShadow: isActive
                    ? "0 0 30px oklch(0.55 0.14 155 / 0.08)"
                    : "none",
                }}
              >
                {/* Active pulse glow */}
                {isActive && (
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right, oklch(0.55 0.14 155 / 0.4) 0%, transparent 70%)",
                    }}
                  />
                )}

                {/* Top row: Status badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={
                      isActive
                        ? {
                            background: "oklch(0.45 0.14 155 / 0.15)",
                            border: "1px solid oklch(0.55 0.15 155 / 0.35)",
                            color: "oklch(0.72 0.14 155)",
                          }
                        : {
                            background: "oklch(0.2 0.03 260)",
                            border: "1px solid oklch(0.3 0.03 260)",
                            color: "oklch(0.55 0.04 260)",
                          }
                    }
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    )}
                    {vote.status}
                  </div>

                  <span
                    className="text-xs font-mono"
                    style={{ color: "oklch(0.48 0.04 260)" }}
                  >
                    {vote.dateRange}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-base sm:text-lg font-bold mb-2 leading-snug"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  {vote.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "oklch(0.58 0.04 260)" }}
                >
                  {vote.description}
                </p>

                {/* Vote bars */}
                <div className="space-y-2.5">
                  {vote.options.map((option, optIdx) => {
                    const pct = total > 0 ? (option.count / total) * 100 : 0;
                    const isTopOption = optIdx === 0;
                    return (
                      <div key={option.label}>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="text-xs leading-tight"
                            style={{
                              color: isTopOption
                                ? "oklch(var(--pearl))"
                                : "oklch(0.55 0.04 260)",
                              fontWeight: isTopOption ? 600 : 400,
                            }}
                          >
                            {option.label}
                          </span>
                          <span
                            className="text-xs font-mono ml-3 shrink-0"
                            style={{
                              color: isTopOption
                                ? "oklch(var(--gold))"
                                : "oklch(0.48 0.04 260)",
                            }}
                          >
                            {option.count.toLocaleString()} ({pct.toFixed(1)}%)
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ background: "oklch(0.18 0.03 260)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: idx * 0.12 + optIdx * 0.05,
                              ease: "easeOut",
                            }}
                            style={{
                              background: isTopOption
                                ? "linear-gradient(90deg, oklch(var(--gold-dim)), oklch(var(--gold)))"
                                : "oklch(0.3 0.04 260)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total votes */}
                <p
                  className="mt-4 text-xs font-mono text-right"
                  style={{ color: "oklch(0.42 0.04 260)" }}
                >
                  {total.toLocaleString()} total votes cast
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Back to Governance Hub ─────────────────────────────────────────

function BackToGovernanceSection() {
  return (
    <section
      data-ocid="charter.back.section"
      className="py-16 sm:py-20"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Gradient separator */}
      <div
        className="h-px mb-14 mx-auto"
        style={{
          width: "280px",
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.35), oklch(var(--teal) / 0.3), transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "oklch(var(--gold-dim))" }}
          >
            Continue Exploring
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
            Return to the{" "}
            <span className="gold-gradient-text">Governance Hub</span>
          </h3>
          <p
            className="text-base max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: "oklch(0.6 0.04 260)" }}
          >
            Explore the Global Assembly, Councils of Action, Resolution Tracker,
            and AI Policy Advisor — launching in Phase 2.
          </p>

          <Link to="/governance" data-ocid="charter.back.link">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-base px-8 py-3 h-auto"
              style={{
                borderColor: "oklch(var(--gold) / 0.4)",
                color: "oklch(var(--gold))",
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Governance Hub
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function CharterPage() {
  return (
    <main>
      <CharterHero />
      <PreambleSection />
      <ArticlesSection />
      <AmendmentSection />
      <VotingRecordSection />
      <BackToGovernanceSection />
    </main>
  );
}
