import { Quote } from "lucide-react";
import { motion } from "motion/react";

export function MissionStatement() {
  return (
    <section className="py-20 sm:py-28 bg-[oklch(0.97_0.008_95)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            style={{ color: "oklch(var(--teal))" }}
          >
            Our Mandate
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ color: "oklch(var(--cosmos-deep))" }}
          >
            NewWaysNow: Local Solutions
            <br />
            <span style={{ color: "oklch(var(--gold))" }}>
              to Global Problems
            </span>
          </h2>
        </motion.div>

        {/* Two Column Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className="font-display text-xl font-bold mb-4"
              style={{ color: "oklch(var(--cosmos-deep))" }}
            >
              A New Kind of Global Institution
            </h3>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "oklch(0.35 0.03 260)" }}
            >
              ONEartHeaven is not another top-down governing body. It is a
              living network of communities, innovators, governments, and
              individuals who believe that the answers to humanity's greatest
              challenges already exist — scattered across villages, cities, and
              labs around the world.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.35 0.03 260)" }}
            >
              Our mission is to surface those answers, validate them, and scale
              them — rapidly, transparently, and at minimal cost — to every
              corner of the planet that needs them most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className="font-display text-xl font-bold mb-4"
              style={{ color: "oklch(var(--cosmos-deep))" }}
            >
              Built on Decentralized Trust
            </h3>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "oklch(0.35 0.03 260)" }}
            >
              Powered by the Internet Computer Protocol (ICP), ONEartHeaven
              operates on infrastructure that no single nation, corporation, or
              government can control. Every decision, vote, budget, and outcome
              is permanently recorded and publicly auditable.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.35 0.03 260)" }}
            >
              AI augments human wisdom — analyzing proposals, detecting
              conflicts, predicting outcomes — while real humans retain
              sovereignty over every decision that matters.
            </p>
          </motion.div>
        </div>

        {/* Callout Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div
            className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
            style={{
              background: "oklch(0.13 0.04 260)",
              border: "1px solid oklch(var(--gold) / 0.2)",
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, oklch(var(--gold) / 0.06) 0%, transparent 70%)",
              }}
            />

            <Quote
              className="h-8 w-8 mb-6"
              style={{ color: "oklch(var(--gold) / 0.5)" }}
            />
            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-white mb-6">
              "Wherever answers have arisen, we recalculate how best they may be
              applied to their international counterparts for corresponding
              implementation, impact, and scope — in the biggest picture across
              the world."
            </blockquote>
            <cite
              className="not-italic text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold))" }}
            >
              — ONEartHeaven Charter Preamble
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
