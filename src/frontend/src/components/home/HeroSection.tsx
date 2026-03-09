import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  function scrollToNext() {
    const section = document.getElementById("impact-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Background Globe Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-globe.dim_1600x900.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Radial glow center effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.55 0.16 195 / 0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 40%, oklch(0.72 0.16 75 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            borderColor: "oklch(var(--gold) / 0.35)",
            background: "oklch(var(--gold) / 0.08)",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "oklch(var(--gold))" }}
          >
            PlanetsPeacePalace
          </span>
          <span className="text-lg">🌍</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          <span className="gold-gradient-text">ONE Earth.</span>
          <br />
          <span className="gold-gradient-text">ONE Heaven.</span>
          <br />
          <span
            className="text-white"
            style={{ fontSize: "0.75em", fontWeight: 400 }}
          >
            ONE Future.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "oklch(0.78 0.03 260)" }}
        >
          The{" "}
          <span style={{ color: "oklch(var(--teal-bright))" }}>
            PlanetsPeacePalace
          </span>{" "}
          — where local solutions become global transformation. Decentralized.
          Open. Powered by human intelligence and AI wisdom.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link to="/governance" data-ocid="hero.join_assembly.button">
            <Button
              size="lg"
              className="btn-gold gap-2 text-base px-7 py-3 h-auto"
            >
              Join the Assembly
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/solutions" data-ocid="hero.explore_solutions.button">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base px-7 py-3 h-auto border-[oklch(var(--teal)/0.5)] text-[oklch(var(--teal-bright))] hover:bg-[oklch(var(--teal)/0.1)] hover:border-[oklch(var(--teal))]"
            >
              Explore Solutions
            </Button>
          </Link>
          <Link to="/about" data-ocid="hero.learn_more.button">
            <Button
              size="lg"
              variant="ghost"
              className="text-base px-7 py-3 h-auto text-[oklch(0.72_0.02_260)] hover:text-white hover:bg-white/5"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Stats teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-wrap gap-6 justify-center"
        >
          {[
            { value: "147+", label: "Nations" },
            { value: "12.5K+", label: "Members" },
            { value: "3.2K+", label: "Solutions" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(var(--gold))" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: "oklch(0.6_0.03_260)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator cursor-pointer flex flex-col items-center gap-1 group"
        aria-label="Scroll to content"
        data-ocid="hero.scroll.button"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.55_0.04_260)" }}
        >
          Discover
        </span>
        <ChevronDown
          className="h-5 w-5 group-hover:text-[oklch(var(--gold))] transition-colors"
          style={{ color: "oklch(0.5_0.04_260)" }}
        />
      </motion.button>
    </section>
  );
}
