import { Handshake, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

const COMPARISONS = [
  {
    challenge:
      "Governance processes can be slow to respond to fast-moving crises",
    approach:
      "AI-augmented deliberation with smart consensus, clear timelines, and rapid iteration",
  },
  {
    challenge:
      "Concentrated decision-making power can limit broader representation",
    approach:
      "Weighted participation — every voice welcomed, no permanent gatekeeping",
  },
  {
    challenge:
      "Lack of financial transparency erodes trust in global institutions",
    approach:
      "On-chain transparency: open budgets, public audit trails, and community accountability",
  },
  {
    challenge:
      "Ordinary citizens often feel distant from global decision-making",
    approach:
      "Every individual on Earth can participate, propose, and contribute",
  },
  {
    challenge:
      "Crisis response can lag behind the urgency of real-world events",
    approach:
      "Real-time monitoring, AI early-warning systems, and decentralised rapid response",
  },
  {
    challenge:
      "Formal structures often exclude individuals, cities, and civil society",
    approach:
      "Nations, cities, NGOs, cooperatives, and individuals — all warmly welcomed",
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
            Our Approach
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "oklch(var(--cosmos-deep))" }}
          >
            Building Together —
            <br />
            <span style={{ color: "oklch(var(--gold))" }}>
              A New Chapter in Global Cooperation
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.4 0.03 260)" }}
          >
            We deeply respect the vision, ideals, and dedication of all who have
            worked toward a better world. ONEartHeaven is designed to complement
            those efforts — extending participation, deepening transparency, and
            bringing every idea and initiative to the centre for shared
            consideration.
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
            <Lightbulb className="h-4 w-4" />
            Challenges We Seek to Address
          </div>
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider"
            style={{
              background: "oklch(var(--teal) / 0.1)",
              color: "oklch(var(--teal))",
            }}
          >
            <Handshake className="h-4 w-4" />
            Our Collaborative Approach
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="flex flex-col gap-3">
          {COMPARISONS.map((item, idx) => (
            <motion.div
              key={item.challenge}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              data-ocid={`why.comparison.item.${idx + 1}`}
            >
              {/* Challenge */}
              <div className="comparison-bad rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <Lightbulb
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.6 0.14 27)" }}
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.35 0.04 260)" }}
                  >
                    {item.challenge}
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="comparison-good rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <Handshake
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: "oklch(0.25 0.04 260)" }}
                  >
                    {item.approach}
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
            In Thoughts, Words, and Deeds — committed to working with all.
          </p>
          <p className="text-base" style={{ color: "oklch(0.4 0.03 260)" }}>
            A living network of sovereign, compassionate, empowered humans —
            connected by purpose, powered by shared technology, and united in
            the spirit of sincere, sustainable solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
