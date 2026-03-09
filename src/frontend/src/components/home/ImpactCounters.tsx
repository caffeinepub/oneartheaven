import { useGetStats } from "@/hooks/useQueries";
import { Globe2, Heart, Lightbulb, Network, Rocket, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StatConfig {
  key: keyof typeof SEED_STATS;
  label: string;
  icon: LucideIcon;
  suffix?: string;
}

const SEED_STATS = {
  members: 12500,
  nations: 147,
  solutions: 3200,
  volunteers: 8900,
  projects: 640,
  communities: 420,
};

const STAT_CONFIGS: StatConfig[] = [
  { key: "members", label: "Members Worldwide", icon: Users, suffix: "+" },
  { key: "nations", label: "Nations Represented", icon: Globe2, suffix: "" },
  {
    key: "solutions",
    label: "Solutions Published",
    icon: Lightbulb,
    suffix: "+",
  },
  { key: "volunteers", label: "Active Volunteers", icon: Heart, suffix: "+" },
  { key: "projects", label: "Projects Launched", icon: Rocket, suffix: "+" },
  {
    key: "communities",
    label: "Communities Formed",
    icon: Network,
    suffix: "+",
  },
];

function useCountUp(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const start = 0;
    const startTime = performance.now();

    function easeOut(t: number) {
      return 1 - (1 - t) ** 3;
    }

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      setCount(Math.floor(start + (target - start) * easedProgress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatCard({
  config,
  value,
  index,
}: { config: StatConfig; value: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, inView, 1800 + index * 150);
  const Icon = config.icon;

  function formatCount(n: number): string {
    if (n >= 10000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="impact-card rounded-xl p-6 flex flex-col items-center text-center group hover:shadow-cosmos transition-all duration-300"
      data-ocid={`impact.${config.key}.card`}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "oklch(var(--gold) / 0.12)",
          border: "1px solid oklch(var(--gold) / 0.25)",
        }}
      >
        <Icon className="h-6 w-6" style={{ color: "oklch(var(--gold))" }} />
      </div>

      {/* Count */}
      <div
        className="font-display text-3xl sm:text-4xl font-bold mb-1 tabular-nums"
        style={{ color: "oklch(var(--gold))" }}
      >
        {formatCount(count)}
        {config.suffix}
      </div>

      {/* Label */}
      <div
        className="text-sm font-medium"
        style={{ color: "oklch(0.65 0.03 260)" }}
      >
        {config.label}
      </div>
    </motion.div>
  );
}

export function ImpactCounters() {
  const { data: stats, isLoading } = useGetStats();

  const statValues = {
    members: stats ? Number(stats.members) : SEED_STATS.members,
    nations: stats ? Number(stats.nations) : SEED_STATS.nations,
    solutions: stats ? Number(stats.solutions) : SEED_STATS.solutions,
    volunteers: stats ? Number(stats.volunteers) : SEED_STATS.volunteers,
    projects: stats ? Number(stats.projects) : SEED_STATS.projects,
    communities: stats ? Number(stats.communities) : SEED_STATS.communities,
  };

  return (
    <section id="impact-section" className="section-cosmos py-20 sm:py-28">
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
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            Live Global Impact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Measuring What Matters
          </h2>
          <p
            className="mt-3 text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.65 0.03 260)" }}
          >
            Real-time metrics from the ONEartHeaven network — every number
            represents people, ideas, and action.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {STAT_CONFIGS.map((config, idx) => (
            <StatCard
              key={config.key}
              config={config}
              value={statValues[config.key]}
              index={idx}
            />
          ))}
        </div>

        {isLoading && (
          <p
            className="text-center text-xs mt-4"
            style={{ color: "oklch(0.5 0.03 260)" }}
            data-ocid="impact.loading_state"
          >
            Loading live statistics…
          </p>
        )}
      </div>
    </section>
  );
}
