import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAAS_FEATURE_ROWS, PAAS_TIER_CONFIG } from "@/data/paasTypes";
import { usePaaSPlans } from "@/hooks/usePaaS";
import { Link } from "@tanstack/react-router";
import { Check, HelpCircle, Minus, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatFeatureValue(
  value: number | boolean | null,
  type: string,
): React.ReactNode {
  if (type === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-emerald-400 mx-auto" />
    ) : (
      <Minus className="h-4 w-4 text-zinc-600 mx-auto" />
    );
  }
  if (value === null) {
    return (
      <span className="text-emerald-400 font-semibold text-xs">Unlimited</span>
    );
  }
  if (type === "storage") {
    return <span className="text-zinc-300 text-xs">{value as number} GB</span>;
  }
  if (type === "api") {
    const n = value as number;
    const fmt =
      n >= 1_000_000
        ? `${(n / 1_000_000).toFixed(0)}M`
        : n >= 1_000
          ? `${(n / 1_000).toFixed(0)}K`
          : String(n);
    return <span className="text-zinc-300 text-xs">{fmt}</span>;
  }
  if (type === "percent") {
    return <span className="text-zinc-300 text-xs">{value as number}%</span>;
  }
  return <span className="text-zinc-300 text-xs">{String(value)}</span>;
}

const FAQ_ITEMS = [
  {
    q: "What is ONEartHeaven™ PaaS?",
    a: "ONEartHeaven™ PaaS is a fully managed, decentralized governance platform built on the Internet Computer Protocol. It provides organizations, nations, cooperatives, and DAOs with all the infrastructure needed to run transparent, participatory governance at any scale — from local communities to global bodies.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. You can upgrade at any time from your Subscription Dashboard, and the new plan activates immediately on a prorated basis. Downgrades take effect at the next billing cycle. No data is lost when switching plans.",
  },
  {
    q: "What happens when I exceed usage limits?",
    a: "You'll receive in-app alerts when you reach 80% of any resource limit. Exceeding a limit will temporarily restrict new additions (members, listings, API calls) until you upgrade or the billing cycle resets. Core governance features always remain accessible.",
  },
  {
    q: "Is white labeling available on all plans?",
    a: "White label branding — including custom logo, colors, fonts, and tagline — is available on the Professional plan and above. Custom domain support (e.g., governance.yourorg.org) is included in the Enterprise and Global tiers.",
  },
  {
    q: "How does FinFracFran™ integration work?",
    a: "FinFracFran™ is ONEartHeaven's fractionalized franchise model for scaling proven governance solutions. Professional plans and above gain access to the full FinFracFran™ API, royalty attribution, and franchise marketplace, enabling organizations to license and replicate their governance models globally.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — the Professional plan includes a 30-day free trial with full feature access, no credit card required. The Starter plan is always available at $49/month with no trial needed. Enterprise and Global plans include a custom evaluation period arranged through our sales team.",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export function PricingPage() {
  const { plans, billingPeriod, setBillingPeriod, displayPrice } =
    usePaaSPlans();

  return (
    <div className="min-h-screen bg-[oklch(var(--cosmos-deep))]">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-24 px-4"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.35 0.12 265 / 0.5), transparent), oklch(var(--cosmos-deep))",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs tracking-widest uppercase">
              Phase 12 · PaaS
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Power Your Organization on{" "}
            <span style={{ color: "oklch(var(--gold))" }}>ONEartHeaven™</span>{" "}
            PaaS
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            Decentralized governance infrastructure for communities, NGOs,
            cooperatives, nation-states, and global bodies. Built on the
            Internet Computer Protocol.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            className="inline-flex items-center gap-1 p-1 rounded-full bg-[oklch(0.12_0.02_260)] border border-[oklch(1_0_0/0.08)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              data-ocid="pricing.billing_toggle.monthly"
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingPeriod === "monthly"
                  ? "bg-[oklch(var(--cosmos-mid))] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annual")}
              data-ocid="pricing.billing_toggle.annual"
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                billingPeriod === "annual"
                  ? "bg-[oklch(var(--cosmos-mid))] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Annual
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-400/15 text-emerald-400">
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, idx) => {
            const tierCfg = PAAS_TIER_CONFIG[plan.tier];
            const isHighlighted = plan.highlighted;
            return (
              <motion.div
                key={plan.id}
                data-ocid={`pricing.plan.${idx + 1}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + idx * 0.08 }}
                className={`relative flex flex-col rounded-2xl p-6 border ${
                  isHighlighted
                    ? "ring-2 ring-violet-500/50 border-violet-500/30 bg-[oklch(0.13_0.03_270)]"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(0.1_0.02_260)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white shadow">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${tierCfg.color} ${tierCfg.bg}`}
                  >
                    {tierCfg.icon} {plan.tier}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="mb-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={billingPeriod}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="text-4xl font-display font-bold text-white"
                    >
                      {displayPrice(plan)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-zinc-500 text-sm ml-1">/mo</span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-xs text-zinc-500 mb-4">billed annually</p>
                )}

                <p className="text-xs text-zinc-500 mb-6">
                  FinFracFran™ Tier:{" "}
                  <span className={`font-semibold ${tierCfg.color}`}>
                    {tierCfg.finfracfran}
                  </span>
                </p>

                <div className="mt-auto">
                  <Link to="/register">
                    <Button
                      data-ocid={`pricing.plan.cta.${idx + 1}`}
                      className={`w-full ${
                        isHighlighted
                          ? "btn-gold"
                          : "bg-transparent border border-[oklch(1_0_0/0.15)] text-zinc-200 hover:bg-[oklch(1_0_0/0.06)]"
                      }`}
                    >
                      {plan.ctaLabel}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Feature comparison table ── */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <motion.h2
          className="text-2xl font-display font-bold text-white text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Compare All Features
        </motion.h2>

        <div className="overflow-x-auto rounded-2xl border border-[oklch(1_0_0/0.08)]">
          <table
            data-ocid="pricing.feature_table.table"
            className="w-full text-sm"
          >
            <thead>
              <tr className="border-b border-[oklch(1_0_0/0.08)]">
                <th className="text-left py-4 px-5 text-zinc-400 font-medium w-48">
                  Feature
                </th>
                {plans.map((plan) => {
                  const cfg = PAAS_TIER_CONFIG[plan.tier];
                  return (
                    <th
                      key={plan.id}
                      className={`py-4 px-4 text-center font-semibold ${
                        plan.highlighted ? cfg.color : "text-zinc-300"
                      }`}
                    >
                      {plan.tier}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {PAAS_FEATURE_ROWS.map((row, rIdx) => (
                <tr
                  key={row.key}
                  className={`border-b border-[oklch(1_0_0/0.05)] transition-colors ${
                    rIdx % 2 === 0 ? "bg-[oklch(0.08_0.02_260/0.5)]" : ""
                  }`}
                >
                  <td className="py-3.5 px-5 text-zinc-300 font-medium">
                    {row.label}
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-3.5 px-4 text-center">
                      {formatFeatureValue(
                        plan.limits[row.key] as number | boolean | null,
                        row.type,
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FinFracFran™ alignment ── */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-display font-bold text-white mb-3">
            Aligned with FinFracFran™
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Every PaaS tier maps directly to a FinFracFran™ franchise level,
            enabling seamless economic participation at every stage.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {plans.map((plan, idx) => {
            const cfg = PAAS_TIER_CONFIG[plan.tier];
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="rounded-xl p-5 border border-[oklch(1_0_0/0.08)] bg-[oklch(0.1_0.02_260)] text-center"
              >
                <span className="text-3xl mb-2 block">{cfg.icon}</span>
                <p className="text-xs text-zinc-500 mb-0.5">PaaS Tier</p>
                <p className={`text-sm font-bold ${cfg.color} mb-3`}>
                  {plan.tier}
                </p>
                <div
                  className="w-full h-px mb-3"
                  style={{ background: "oklch(1 0 0 / 0.07)" }}
                />
                <p className="text-xs text-zinc-500 mb-0.5">FinFracFran™</p>
                <p className={`text-sm font-bold ${cfg.color}`}>
                  {cfg.finfracfran}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <motion.h2
          className="text-2xl font-display font-bold text-white text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem
              key={item.q}
              value={`faq-${idx}`}
              data-ocid={`pricing.faq.item.${idx + 1}`}
              className="border border-[oklch(1_0_0/0.08)] rounded-xl px-5 bg-[oklch(0.1_0.02_260)] data-[state=open]:border-[oklch(var(--gold)/0.2)]"
            >
              <AccordionTrigger className="text-zinc-200 text-sm font-medium hover:text-white hover:no-underline py-4">
                <span className="flex items-center gap-2 text-left">
                  <HelpCircle className="h-4 w-4 text-zinc-500 shrink-0" />
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 text-sm leading-relaxed pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, oklch(0.35 0.14 75 / 0.12), transparent)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Zap
            className="h-10 w-10 mx-auto mb-5"
            style={{ color: "oklch(var(--gold))" }}
          />
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Join thousands of organizations building transparent, participatory
            governance on ONEartHeaven™.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="btn-gold px-8"
                data-ocid="pricing.bottom_cta.primary_button"
              >
                Start Free Trial
              </Button>
            </Link>
            <a href="mailto:sales@onearthheaven.org">
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-[oklch(var(--gold)/0.3)] text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                data-ocid="pricing.bottom_cta.secondary_button"
              >
                Contact Sales
              </Button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
