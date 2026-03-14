/**
 * FFBrand — Shared FinFracFran™ brand components
 *
 * Use these across all pages to ensure consistent FinFracFran™ styling:
 *  - FFTierBadge     : tier pill (Seed / Growth / Scale / Global)
 *  - FFInlineBadge   : small "FF™" card badge
 *  - FFSpotlightHeader : full section header for spotlight/dedicated FF sections
 */

import { Coins } from "lucide-react";
import { motion } from "motion/react";

// ─── Tier color map ────────────────────────────────────────────────────────────
export type FFTier = "Seed" | "Growth" | "Scale" | "Global";

export const FF_TIER_STYLES: Record<
  FFTier,
  { bg: string; text: string; border: string; label: string }
> = {
  Seed: {
    bg: "bg-teal-500/20",
    text: "text-teal-300",
    border: "border-teal-500/30",
    label: "Seed",
  },
  Growth: {
    bg: "bg-blue-500/20",
    text: "text-blue-300",
    border: "border-blue-500/30",
    label: "Growth",
  },
  Scale: {
    bg: "bg-amber-500/20",
    text: "text-amber-300",
    border: "border-amber-500/30",
    label: "Scale",
  },
  Global: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-300",
    border: "border-yellow-500/30",
    label: "Global",
  },
};

// ─── FFTierBadge ───────────────────────────────────────────────────────────────
interface FFTierBadgeProps {
  tier: FFTier | string;
  size?: "xs" | "sm";
  showIcon?: boolean;
}

export function FFTierBadge({
  tier,
  size = "sm",
  showIcon = false,
}: FFTierBadgeProps) {
  const styles = FF_TIER_STYLES[tier as FFTier] ?? {
    bg: "bg-slate-500/20",
    text: "text-slate-300",
    border: "border-slate-500/30",
    label: tier,
  };

  const sizeClasses =
    size === "xs" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2.5 py-0.5";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses}`}
    >
      {showIcon && <span className="text-[8px] leading-none">⬡</span>}
      {styles.label}
    </span>
  );
}

// ─── FFInlineBadge ─────────────────────────────────────────────────────────────
interface FFInlineBadgeProps {
  label?: string;
  size?: "xs" | "sm";
}

export function FFInlineBadge({
  label = "FF™",
  size = "xs",
}: FFInlineBadgeProps) {
  const sizeClasses =
    size === "xs" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5";

  return (
    <span
      className={`inline-flex items-center gap-0.5 font-bold rounded-full border ${sizeClasses}`}
      style={{
        background: "oklch(0.72 0.18 75 / 0.15)",
        color: "oklch(0.85 0.18 75)",
        borderColor: "oklch(0.72 0.18 75 / 0.35)",
      }}
    >
      ✦ {label}
    </span>
  );
}

// ─── FFSpotlightHeader ─────────────────────────────────────────────────────────
interface FFSpotlightHeaderProps {
  /** Badge pill label, e.g. "FinFracFran™ Spotlight" */
  badge?: string;
  /** Main headline */
  headline: string;
  /** Subline muted text */
  subline?: string;
  /** Left-aligned vs centered (default: centered) */
  align?: "left" | "center";
  /** Additional className for the wrapper */
  className?: string;
}

export function FFSpotlightHeader({
  badge = "FinFracFran™ Spotlight",
  headline,
  subline,
  align = "center",
  className = "",
}: FFSpotlightHeaderProps) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${alignClass} ${className}`}
    >
      {/* Gold badge pill */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border ${align === "left" ? "" : ""}`}
        style={{
          background: "oklch(0.72 0.18 75 / 0.12)",
          color: "oklch(0.85 0.18 75)",
          borderColor: "oklch(0.72 0.18 75 / 0.30)",
        }}
      >
        <Coins className="w-4 h-4" />
        {badge}
      </div>

      {/* Gold gradient headline */}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${align === "center" ? "" : ""}`}
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          background:
            "linear-gradient(135deg, oklch(0.88 0.20 75) 0%, oklch(0.78 0.18 85) 50%, oklch(0.72 0.18 185) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {headline}
      </h2>

      {/* Muted subline */}
      {subline && (
        <p
          className={`text-base sm:text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
          style={{ color: "oklch(0.58 0.03 260)" }}
        >
          {subline}
        </p>
      )}
    </motion.div>
  );
}

// ─── FFSectionWrapper ──────────────────────────────────────────────────────────
/** Full section wrapper with gold radial glow background */
interface FFSectionWrapperProps {
  id?: string;
  "data-ocid"?: string;
  children: React.ReactNode;
  className?: string;
}

export function FFSectionWrapper({
  id,
  "data-ocid": dataOcid,
  children,
  className = "",
}: FFSectionWrapperProps) {
  return (
    <section
      id={id}
      data-ocid={dataOcid}
      className={`py-20 relative overflow-hidden ${className}`}
      style={{ background: "oklch(0.09 0.04 260)" }}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.72 0.18 75 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
