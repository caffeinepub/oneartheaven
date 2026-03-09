import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Coins,
  GraduationCap,
  Lightbulb,
  Network,
  Scale,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Portal {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  phase: string;
  accentColor: string;
  iconBg: string;
}

const PORTALS: Portal[] = [
  {
    title: "Governance & Assembly",
    description:
      "Open deliberation. AI-moderated consensus. Every voice counts regardless of nation, rank, or wealth.",
    path: "/governance",
    icon: Scale,
    phase: "Phase 2",
    accentColor: "oklch(0.72 0.16 75)",
    iconBg: "oklch(0.72 0.16 75 / 0.12)",
  },
  {
    title: "Solutions Exchange",
    description:
      "Proven local solutions scaled to global impact via the NewWaysNow matching engine.",
    path: "/solutions",
    icon: Lightbulb,
    phase: "Phase 3",
    accentColor: "oklch(0.72 0.18 85)",
    iconBg: "oklch(0.72 0.18 85 / 0.12)",
  },
  {
    title: "Communities",
    description:
      "Citizens, chapters, compassion communities, and volunteer exchange networks worldwide.",
    path: "/community",
    icon: Network,
    phase: "Phase 5",
    accentColor: "oklch(0.6 0.14 195)",
    iconBg: "oklch(0.6 0.14 195 / 0.12)",
  },
  {
    title: "Academy",
    description:
      "Whole-system education, idea incubation, and disciplined distillation and distribution of knowledge.",
    path: "/academy",
    icon: GraduationCap,
    phase: "Phase 9",
    accentColor: "oklch(0.65 0.18 270)",
    iconBg: "oklch(0.65 0.18 270 / 0.12)",
  },
  {
    title: "FinFracFran Economy",
    description:
      "Fractionalization, franchising, and ethical finance for all scales — from micro to mega enterprise.",
    path: "/finance",
    icon: Coins,
    phase: "Phase 10",
    accentColor: "oklch(0.7 0.2 140)",
    iconBg: "oklch(0.7 0.2 140 / 0.12)",
  },
  {
    title: "Creativity & Enterprise",
    description:
      "Ancient wisdom meets ultra-modern innovation. Hybrid enterprises for excellence in sustainable impact.",
    path: "/solutions",
    icon: Sparkles,
    phase: "Phase 4",
    accentColor: "oklch(0.65 0.22 30)",
    iconBg: "oklch(0.65 0.22 30 / 0.12)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function PortalCards() {
  return (
    <section
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
            Action Portals
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Enter the Platform
          </h2>
          <p
            className="mt-3 text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.62 0.03 260)" }}
          >
            Six interconnected domains of action — choose your arena, find your
            community, make your contribution.
          </p>
        </motion.div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PORTALS.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <motion.div key={portal.title} variants={cardVariants}>
                <Link
                  to={portal.path}
                  className="block portal-card rounded-2xl p-6 h-full group"
                  data-ocid={`portals.portal.item.${idx + 1}`}
                  style={{
                    background: "oklch(var(--cosmos-surface))",
                    border: "1px solid oklch(var(--gold-dim) / 0.18)",
                  }}
                >
                  <div className="flex flex-col h-full min-h-[200px]">
                    {/* Phase Badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: portal.iconBg }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: portal.accentColor }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          color: portal.accentColor,
                          background: `${portal.iconBg}`,
                        }}
                      >
                        {portal.phase}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display text-lg font-bold mb-2 transition-colors duration-200"
                      style={{ color: "oklch(0.9 0.02 260)" }}
                    >
                      {portal.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "oklch(0.6 0.03 260)" }}
                    >
                      {portal.description}
                    </p>

                    {/* CTA */}
                    <div
                      className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                      style={{ color: portal.accentColor }}
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
