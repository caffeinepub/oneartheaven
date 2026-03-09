import { Check, X } from "lucide-react";
import { motion } from "motion/react";

const COMPARISONS = [
  {
    problem: "Bureaucratic gridlock — decisions take years",
    solution:
      "AI-augmented governance with smart consensus and rapid iteration",
  },
  {
    problem: "Veto-power inequality — 5 nations block the world",
    solution: "Weighted participation: no single veto, no permanent privilege",
  },
  {
    problem: "Opacity and systemic corruption",
    solution:
      "On-chain transparency: open budgets, public audit trails, forever",
  },
  {
    problem: "Disconnected from ordinary people",
    solution: "Every citizen on Earth can participate, propose, and vote",
  },
  {
    problem: "Slow crisis response — lives lost in delays",
    solution:
      "Real-time monitoring, AI early warning, decentralized rapid response",
  },
  {
    problem: "Nation-states only — billions excluded",
    solution: "Nations, cities, NGOs, cooperatives, individuals — all welcome",
  },
];

export function WhyONE() {
  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: "oklch(0.96 0.01 90)" }}
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
            style={{ color: "oklch(var(--teal))" }}
          >
            Why We Exist
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "oklch(var(--cosmos-deep))" }}
          >
            Why ONEartHeaven
            <br />
            <span style={{ color: "oklch(var(--gold))" }}>Over the UN?</span>
          </h2>
          <p
            className="mt-4 text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.4 0.03 260)" }}
          >
            We respect the ideals of the United Nations. But we are honest about
            its structural failures — and we have designed something
            categorically different.
          </p>
        </motion.div>

        {/* Column Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider"
            style={{
              background: "oklch(0.6 0.12 27 / 0.08)",
              color: "oklch(0.5 0.12 27)",
            }}
          >
            <X className="h-4 w-4" />
            The UN's Pitfalls
          </div>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider"
            style={{
              background: "oklch(var(--teal) / 0.1)",
              color: "oklch(var(--teal))",
            }}
          >
            <Check className="h-4 w-4" />
            ONEartHeaven's Answers
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="flex flex-col gap-3">
          {COMPARISONS.map((item, idx) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              data-ocid={`why.comparison.item.${idx + 1}`}
            >
              {/* Problem */}
              <div className="comparison-bad rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <X
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.6 0.14 27)" }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.35 0.04 260)" }}
                  >
                    {item.problem}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="comparison-good rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <Check
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: "oklch(0.25 0.04 260)" }}
                  >
                    {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p
            className="font-display text-xl font-bold mb-2"
            style={{ color: "oklch(var(--cosmos-deep))" }}
          >
            The world doesn't need another institution.
          </p>
          <p className="text-base" style={{ color: "oklch(0.4 0.03 260)" }}>
            It needs a living network of sovereign, compassionate, empowered
            humans — connected by purpose and powered by decentralized
            technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
