// ---------------------------------------------------------------------------
// Partners Page — Phase 13, Area 8 (A8-4 + A8-5)
// /partners — Partnership & Ecosystem Hub
// ---------------------------------------------------------------------------

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PARTNER_PROFILES } from "@/data/partnerData";
import {
  AGREEMENT_TYPE_CONFIG,
  APPLICATION_STEPS,
  PARTNER_REGION_CONFIG,
  PARTNER_STATUS_CONFIG,
  PARTNER_TIER_CONFIG,
  PARTNER_TYPE_CONFIG,
  SDG_FOCUS_CONFIG,
} from "@/data/partnerTypes";
import type {
  AgreementType,
  PartnerApplicationForm,
  PartnerProfile,
  PartnerRegion,
  PartnerTier,
  PartnerType,
  SDGFocusArea,
} from "@/data/partnerTypes";
import {
  usePartner,
  usePartnerApplication,
  usePartners,
} from "@/hooks/usePartners";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Handshake,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Mercator coordinate conversion (viewBox 0 0 1000 500)
// ---------------------------------------------------------------------------
function latLngToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = (lng + 180) * (1000 / 360);
  const y = (90 - lat) * (500 / 180);
  return { x, y };
}

// Tier dot colors for the map
const TIER_DOT_COLORS: Record<string, string> = {
  platinum: "#D4A843",
  gold: "#60a5fa",
  silver: "#a3a3a3",
  bronze: "#f97316",
};

// ---------------------------------------------------------------------------
// WorldMap SVG — simplified land masses + partner dots
// ---------------------------------------------------------------------------
function WorldMap({
  activePartnerId,
  onDotClick,
}: {
  activePartnerId: string | null;
  onDotClick: (id: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Simplified continent paths (Mercator, viewBox 1000x500)
  const CONTINENTS = [
    // North America
    {
      id: "na",
      d: "M 80 60 L 130 55 L 200 50 L 235 60 L 245 85 L 260 95 L 255 120 L 240 140 L 220 155 L 200 160 L 185 175 L 175 195 L 160 205 L 145 215 L 130 220 L 120 210 L 108 200 L 100 185 L 90 170 L 75 155 L 68 130 L 65 105 L 70 80 Z",
    },
    // Greenland
    {
      id: "gl",
      d: "M 210 18 L 240 15 L 265 20 L 270 35 L 255 45 L 235 48 L 215 42 L 205 30 Z",
    },
    // Central America / Caribbean
    {
      id: "ca",
      d: "M 175 215 L 185 230 L 180 242 L 170 245 L 162 238 L 160 225 Z",
    },
    // South America
    {
      id: "sa",
      d: "M 185 235 L 210 225 L 240 230 L 260 245 L 270 265 L 275 295 L 270 330 L 255 360 L 240 385 L 220 400 L 210 410 L 200 405 L 195 385 L 190 360 L 180 330 L 172 305 L 168 280 L 170 255 L 178 240 Z",
    },
    // Europe
    {
      id: "eu",
      d: "M 440 50 L 470 45 L 500 50 L 510 60 L 505 75 L 515 85 L 510 95 L 495 100 L 480 105 L 465 110 L 450 105 L 438 95 L 432 80 L 435 65 Z",
    },
    // Scandinavia
    {
      id: "sc",
      d: "M 460 28 L 480 25 L 492 35 L 488 52 L 470 55 L 455 50 L 452 38 Z",
    },
    // UK + Ireland
    {
      id: "uk",
      d: "M 428 52 L 438 50 L 442 62 L 434 68 L 424 62 Z",
    },
    // Africa
    {
      id: "af",
      d: "M 450 120 L 485 115 L 515 118 L 540 130 L 548 150 L 545 175 L 540 205 L 530 235 L 515 265 L 500 290 L 490 310 L 480 325 L 470 330 L 460 325 L 450 310 L 442 290 L 438 265 L 435 240 L 432 210 L 432 180 L 435 155 L 440 135 Z",
    },
    // Madagascar
    {
      id: "mg",
      d: "M 528 265 L 535 260 L 542 270 L 540 290 L 530 295 L 524 282 Z",
    },
    // Middle East
    {
      id: "me",
      d: "M 530 115 L 570 110 L 590 115 L 595 130 L 585 145 L 565 150 L 545 148 L 533 138 Z",
    },
    // Russia / Central Asia
    {
      id: "ru",
      d: "M 510 30 L 600 22 L 700 18 L 780 22 L 800 35 L 790 50 L 760 55 L 730 58 L 700 60 L 670 65 L 640 68 L 615 72 L 590 75 L 568 80 L 550 78 L 535 70 L 520 58 L 510 45 Z",
    },
    // South Asia / India
    {
      id: "sa2",
      d: "M 600 120 L 640 115 L 660 120 L 662 140 L 650 160 L 635 175 L 620 178 L 608 165 L 600 148 L 596 132 Z",
    },
    // Southeast Asia
    {
      id: "sea",
      d: "M 680 130 L 720 125 L 740 132 L 742 148 L 730 160 L 710 165 L 695 158 L 682 145 Z",
    },
    // China / East Asia
    {
      id: "ea",
      d: "M 660 65 L 720 60 L 768 62 L 785 72 L 788 90 L 775 108 L 752 118 L 728 122 L 700 120 L 678 115 L 662 105 L 655 88 Z",
    },
    // Japan
    {
      id: "jp",
      d: "M 795 75 L 808 70 L 815 80 L 808 92 L 795 90 Z",
    },
    // Indonesia / Maritime SE Asia
    {
      id: "id",
      d: "M 700 170 L 760 165 L 790 170 L 800 180 L 790 190 L 760 192 L 730 190 L 705 182 Z",
    },
    // Australia
    {
      id: "au",
      d: "M 740 255 L 800 248 L 840 252 L 860 268 L 862 290 L 850 315 L 828 332 L 800 338 L 775 332 L 755 315 L 742 295 L 738 272 Z",
    },
    // New Zealand
    {
      id: "nz",
      d: "M 870 320 L 878 315 L 885 325 L 880 338 L 870 340 Z",
    },
    // Pacific Islands area (Fiji/Oceania)
    {
      id: "pi",
      d: "M 855 270 L 862 267 L 868 273 L 862 280 L 854 277 Z",
    },
  ];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: "#0d1117" }}
    >
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        style={{ display: "block", maxHeight: 420 }}
        aria-label="Global partner network map"
        role="img"
      >
        {/* Ocean background */}
        <rect width="1000" height="500" fill="#0d1117" />

        {/* Grid lines */}
        {[0, 125, 250, 375].map((y) => (
          <line
            key={`hl-${y}`}
            x1="0"
            y1={y}
            x2="1000"
            y2={y}
            stroke="#1a2332"
            strokeWidth="0.5"
          />
        ))}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
          <line
            key={`vl-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="500"
            stroke="#1a2332"
            strokeWidth="0.5"
          />
        ))}

        {/* Equator line */}
        <line
          x1="0"
          y1="250"
          x2="1000"
          y2="250"
          stroke="#1e3a2e"
          strokeWidth="1"
          strokeDasharray="6,6"
        />

        {/* Continent land masses */}
        {CONTINENTS.map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="#1e2a38"
            stroke="#2d3f52"
            strokeWidth="0.8"
          />
        ))}

        {/* Partner location dots */}
        {PARTNER_PROFILES.map((partner) => {
          const { x, y } = latLngToSvg(
            partner.coordinates.lat,
            partner.coordinates.lng,
          );
          const dotColor = TIER_DOT_COLORS[partner.tier] ?? "#888";
          const isActive = activePartnerId === partner.id;
          const isHovered = hoveredId === partner.id;

          return (
            <g key={partner.id}>
              {/* Pulsing ring for active partner */}
              {isActive && (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill="none"
                    stroke={dotColor}
                    strokeWidth="1.5"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="10;18;10"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill="none"
                    stroke={dotColor}
                    strokeWidth="1"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="r"
                      values="6;14;6"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="0.5s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.7;0;0.7"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="0.5s"
                    />
                  </circle>
                </>
              )}

              {/* Hover glow */}
              {isHovered && !isActive && (
                <circle cx={x} cy={y} r="10" fill={dotColor} opacity="0.2" />
              )}

              {/* Main dot */}
              <circle
                cx={x}
                cy={y}
                r={isActive || isHovered ? 6 : 5}
                fill={dotColor}
                stroke="white"
                strokeWidth="1.5"
                style={{ cursor: "pointer", transition: "r 0.15s ease" }}
                onClick={() => onDotClick(partner.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onDotClick(partner.id);
                }}
                onMouseEnter={() => setHoveredId(partner.id)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                tabIndex={0}
                aria-label={`View ${partner.name}`}
              />

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={x + 8}
                    y={y - 20}
                    width={partner.name.length * 5.2 + 16}
                    height={22}
                    rx="4"
                    fill="#111827"
                    stroke={dotColor}
                    strokeWidth="0.8"
                    opacity="0.96"
                  />
                  <text
                    x={x + 16}
                    y={y - 5}
                    fontSize="8"
                    fill="#e2e8f0"
                    fontFamily="system-ui, sans-serif"
                  >
                    {partner.name.length > 28
                      ? `${partner.name.slice(0, 28)}…`
                      : partner.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        className="flex items-center justify-center gap-5 px-4 py-3"
        style={{ borderTop: "1px solid #1e2a38" }}
      >
        {(["platinum", "gold", "silver", "bronze"] as const).map((tier) => {
          const cfg = PARTNER_TIER_CONFIG[tier];
          return (
            <div key={tier} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border-[1.5px] border-white/60"
                style={{ background: TIER_DOT_COLORS[tier] }}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: "oklch(0.58 0.03 260)" }}
              >
                {cfg.icon} {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero Stats
// ---------------------------------------------------------------------------
const HERO_STATS = [
  {
    label: "Partner Organisations",
    value: "12",
    icon: Building2,
    color: "oklch(var(--gold))",
  },
  {
    label: "Active Agreements",
    value: "8",
    icon: Handshake,
    color: "oklch(0.70 0.18 195)",
  },
  {
    label: "Active Partners",
    value: "11",
    icon: CheckCircle2,
    color: "oklch(0.70 0.18 140)",
  },
  {
    label: "Nations Represented",
    value: "12",
    icon: Globe2,
    color: "oklch(0.68 0.22 250)",
  },
];

// ---------------------------------------------------------------------------
// Partner Type tab pills
// ---------------------------------------------------------------------------
const TYPE_TABS: Array<{
  key: PartnerType | "all";
  label: string;
  icon: string;
}> = [
  { key: "all", label: "All Types", icon: "🌐" },
  { key: "government", label: "Government", icon: "🏛️" },
  { key: "ngo", label: "NGO", icon: "💚" },
  { key: "academic", label: "Academic", icon: "🎓" },
  { key: "corporate", label: "Corporate", icon: "🏢" },
  { key: "open-source", label: "Open Source", icon: "🔓" },
  { key: "founding", label: "Founding", icon: "⭐" },
];

// ---------------------------------------------------------------------------
// PartnerCard
// ---------------------------------------------------------------------------
function PartnerCard({
  partner,
  idx,
  onOpen,
}: {
  partner: PartnerProfile;
  idx: number;
  onOpen: (id: string) => void;
}) {
  const type = PARTNER_TYPE_CONFIG[partner.type];
  const tier = PARTNER_TIER_CONFIG[partner.tier];
  const region = PARTNER_REGION_CONFIG[partner.region];
  const status = PARTNER_STATUS_CONFIG[partner.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: (idx % 3) * 0.07 }}
    >
      <button
        type="button"
        onClick={() => onOpen(partner.id)}
        className="w-full text-left group relative rounded-2xl p-5 transition-all duration-200 flex flex-col gap-3"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.14 0.04 260) 0%, oklch(0.12 0.035 260) 100%)",
          border: "1px solid oklch(var(--teal) / 0.18)",
        }}
        data-ocid={`partners.card.${idx + 1}`}
      >
        {/* Hover overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${type.color}35`,
            background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${type.color}15 0%, transparent 65%)`,
          }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: type.bgColor,
              border: `1px solid ${type.color}30`,
            }}
          >
            {partner.logoEmoji}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: `${tier.color}18`,
                border: `1px solid ${tier.color}35`,
                color: tier.color,
              }}
            >
              {tier.icon} {tier.label}
            </span>
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{
                background: `${status.color}18`,
                color: status.color,
              }}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-sm leading-snug mb-1 line-clamp-2"
            style={{ color: "oklch(0.92 0.015 260)" }}
          >
            {partner.name}
          </h3>
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "oklch(0.62 0.03 260)" }}
          >
            {partner.tagline}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-medium"
            style={{ color: type.color }}
          >
            {type.icon} {type.label}
          </span>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.5 0.02 260)" }}
          >
            {region.flag} {partner.country}
          </span>
        </div>

        {/* Score bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px]"
              style={{ color: "oklch(0.5 0.02 260)" }}
            >
              Contribution Score
            </span>
            <span
              className="text-[10px] font-bold"
              style={{ color: "oklch(var(--gold))" }}
            >
              {partner.contributionScore}/100
            </span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "oklch(0.22 0.03 260)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${partner.contributionScore}%`,
                background:
                  "linear-gradient(90deg, oklch(var(--gold)), oklch(0.72 0.18 75))",
              }}
            />
          </div>
        </div>

        {/* SDG chips */}
        {partner.sdgFocus.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {partner.sdgFocus.slice(0, 3).map((sdg) => {
              const s = SDG_FOCUS_CONFIG[sdg];
              return (
                <span
                  key={sdg}
                  className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  {s.icon} {s.label}
                </span>
              );
            })}
            {partner.sdgFocus.length > 3 && (
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.2 0.02 260)",
                  color: "oklch(0.55 0.02 260)",
                }}
              >
                +{partner.sdgFocus.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200 pt-1"
          style={{ color: type.color }}
        >
          View Profile
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </button>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Partner Detail Sheet
// ---------------------------------------------------------------------------
function PartnerDetailSheet({
  partnerId,
  onClose,
  onApply,
}: {
  partnerId: string | null;
  onClose: () => void;
  onApply: () => void;
}) {
  const { partner, agreements, similarPartners } = usePartner(partnerId);

  if (!partnerId || !partner) return null;

  const type = PARTNER_TYPE_CONFIG[partner.type];
  const tier = PARTNER_TIER_CONFIG[partner.tier];
  const region = PARTNER_REGION_CONFIG[partner.region];

  return (
    <AnimatePresence>
      {partnerId && partner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{
              background: "oklch(0 0 0 / 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full z-50 w-full max-w-lg"
            style={{
              background: "oklch(var(--cosmos-mid))",
              borderLeft: "1px solid oklch(var(--gold) / 0.15)",
            }}
            data-ocid="partners.detail_sheet"
          >
            <ScrollArea className="h-full">
              <div className="p-6">
                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[oklch(var(--gold)/0.1)]"
                  style={{ color: "oklch(0.55 0.03 260)" }}
                  aria-label="Close panel"
                  data-ocid="partners.close_button"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-5 pr-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{
                      background: type.bgColor,
                      border: `1px solid ${type.color}30`,
                    }}
                  >
                    {partner.logoEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-bold text-lg leading-tight mb-1"
                      style={{ color: "oklch(0.92 0.015 260)" }}
                    >
                      {partner.name}
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.62 0.03 260)" }}
                    >
                      {partner.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${tier.color}18`,
                          border: `1px solid ${tier.color}35`,
                          color: tier.color,
                        }}
                      >
                        {tier.icon} {tier.label}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${type.color}15`,
                          color: type.color,
                        }}
                      >
                        {type.icon} {type.label}
                      </span>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.2 0.03 260)",
                          color: "oklch(0.62 0.03 260)",
                        }}
                      >
                        {region.flag} {partner.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contribution score */}
                <div
                  className="rounded-xl p-4 mb-5"
                  style={{
                    background: "oklch(var(--cosmos-deep))",
                    border: "1px solid oklch(var(--gold) / 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "oklch(0.65 0.03 260)" }}
                    >
                      Contribution Score
                    </span>
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      {partner.contributionScore}
                      <span className="text-sm font-medium opacity-60">
                        /100
                      </span>
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.18 0.02 260)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${partner.contributionScore}%`,
                        background:
                          "linear-gradient(90deg, oklch(var(--gold)), oklch(0.72 0.18 75))",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp
                      className="h-3 w-3"
                      style={{ color: "oklch(0.70 0.18 140)" }}
                    />
                    <span
                      className="text-[11px]"
                      style={{ color: "oklch(0.55 0.03 260)" }}
                    >
                      Member since{" "}
                      {new Date(partner.memberSince).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric" },
                      )}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "oklch(0.68 0.03 260)" }}
                >
                  {partner.description}
                </p>

                {/* Featured quote */}
                {partner.featuredQuote && (
                  <div
                    className="rounded-xl p-4 mb-5"
                    style={{
                      background: "oklch(var(--gold) / 0.06)",
                      border: "1px solid oklch(var(--gold) / 0.15)",
                    }}
                  >
                    <p
                      className="text-sm italic leading-relaxed"
                      style={{ color: "oklch(0.78 0.04 260)" }}
                    >
                      "{partner.featuredQuote}"
                    </p>
                    <p
                      className="text-xs mt-2 font-medium"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      — {partner.contactName}
                    </p>
                  </div>
                )}

                {/* SDG Focus */}
                <div className="mb-5">
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: "oklch(0.55 0.03 260)" }}
                  >
                    SDG Focus Areas
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.sdgFocus.map((sdg) => {
                      const s = SDG_FOCUS_CONFIG[sdg];
                      return (
                        <span
                          key={sdg}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: `${s.color}15`,
                            border: `1px solid ${s.color}30`,
                            color: s.color,
                          }}
                        >
                          {s.icon} {s.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Agreements */}
                {agreements.length > 0 && (
                  <div className="mb-5">
                    <h4
                      className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ color: "oklch(0.55 0.03 260)" }}
                    >
                      Active Agreements ({agreements.length})
                    </h4>
                    <div className="flex flex-col gap-2">
                      {agreements.map((agr) => {
                        const aType =
                          AGREEMENT_TYPE_CONFIG[agr.type as AgreementType];
                        return (
                          <div
                            key={agr.id}
                            className="rounded-xl p-3"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(1 0 0 / 0.06)",
                            }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p
                                className="text-xs font-semibold leading-snug"
                                style={{ color: "oklch(0.85 0.015 260)" }}
                              >
                                {agr.title}
                              </p>
                              <span
                                className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0"
                                style={{
                                  background: `${aType.color}18`,
                                  color: aType.color,
                                }}
                              >
                                {aType.label}
                              </span>
                            </div>
                            <p
                              className="text-xs leading-relaxed"
                              style={{ color: "oklch(0.58 0.03 260)" }}
                            >
                              {agr.summary}
                            </p>
                            {agr.valueUSD && (
                              <p
                                className="text-xs mt-1.5 font-medium"
                                style={{ color: "oklch(var(--gold))" }}
                              >
                                Value: ${(agr.valueUSD / 1000).toFixed(0)}K
                                {agr.revenueSharePct
                                  ? ` · ${agr.revenueSharePct}% revenue share`
                                  : ""}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Similar partners */}
                {similarPartners.length > 0 && (
                  <div className="mb-6">
                    <h4
                      className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ color: "oklch(0.55 0.03 260)" }}
                    >
                      More from {PARTNER_REGION_CONFIG[partner.region].label}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {similarPartners.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{
                            background: "oklch(var(--cosmos-deep))",
                            border: "1px solid oklch(1 0 0 / 0.06)",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                            style={{
                              background: PARTNER_TYPE_CONFIG[p.type].bgColor,
                            }}
                          >
                            {p.logoEmoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-xs font-medium truncate"
                              style={{ color: "oklch(0.82 0.015 260)" }}
                            >
                              {p.name}
                            </p>
                            <p
                              className="text-[10px] truncate"
                              style={{ color: "oklch(0.55 0.02 260)" }}
                            >
                              {p.country}
                            </p>
                          </div>
                          <span
                            className="text-[10px] font-bold"
                            style={{ color: "oklch(var(--gold))" }}
                          >
                            {p.contributionScore}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply CTA */}
                <Button
                  className="w-full gap-2"
                  style={{
                    background: "oklch(var(--gold))",
                    color: "oklch(0.15 0.02 260)",
                  }}
                  onClick={onApply}
                  data-ocid="partners.apply_button"
                >
                  <Handshake className="h-4 w-4" />
                  Become a Partner Like This
                </Button>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Partner Application Modal — 3-step
// ---------------------------------------------------------------------------
function PartnerApplicationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const app = usePartnerApplication();
  const SDG_OPTIONS = Object.entries(SDG_FOCUS_CONFIG) as Array<
    [SDGFocusArea, (typeof SDG_FOCUS_CONFIG)[SDGFocusArea]]
  >;
  const ORG_TYPES = Object.entries(PARTNER_TYPE_CONFIG) as Array<
    [PartnerType, (typeof PARTNER_TYPE_CONFIG)[PartnerType]]
  >;
  const AGR_TYPES = Object.entries(AGREEMENT_TYPE_CONFIG) as Array<
    [AgreementType, (typeof AGREEMENT_TYPE_CONFIG)[AgreementType]]
  >;

  function handleClose() {
    app.reset();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{
              background: "oklch(0 0 0 / 0.65)",
              backdropFilter: "blur(4px)",
            }}
            onClick={handleClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-2xl p-6"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(var(--gold) / 0.2)",
              boxShadow: "0 24px 80px oklch(0 0 0 / 0.5)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            data-ocid="partners.application_modal"
          >
            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[oklch(var(--gold)/0.1)]"
              style={{ color: "oklch(0.55 0.03 260)" }}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {app.isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-6 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.70 0.18 140 / 0.12)",
                    border: "1px solid oklch(0.70 0.18 140 / 0.25)",
                  }}
                >
                  <Check
                    className="h-8 w-8"
                    style={{ color: "oklch(0.70 0.18 140)" }}
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "oklch(0.92 0.015 260)" }}
                  >
                    Application Submitted!
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.62 0.03 260)" }}
                  >
                    Thank you for applying to the ONEartHeaven™ Partnership
                    Program. Our team will review your application and reach out
                    within 5–7 business days.
                  </p>
                </div>
                <Button
                  className="gap-2"
                  style={{
                    background: "oklch(var(--gold))",
                    color: "oklch(0.15 0.02 260)",
                  }}
                  onClick={handleClose}
                >
                  Done
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-5 pr-8">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3"
                    style={{
                      background: "oklch(var(--gold) / 0.1)",
                      border: "1px solid oklch(var(--gold) / 0.2)",
                    }}
                  >
                    <Handshake
                      className="h-3 w-3"
                      style={{ color: "oklch(var(--gold))" }}
                    />
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      Partner Application
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: "oklch(0.92 0.015 260)" }}
                  >
                    Become a Partner
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.58 0.03 260)" }}
                  >
                    Step {app.step + 1} of {app.totalSteps}: {app.stepLabel}
                  </p>
                </div>

                {/* Step indicators */}
                <div className="flex items-center gap-1.5 mb-6">
                  {APPLICATION_STEPS.map((label, i) => (
                    <div
                      key={label}
                      className="flex-1 flex items-center gap-1.5"
                    >
                      <div
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= app.step
                              ? "oklch(var(--gold))"
                              : "oklch(0.25 0.02 260)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={app.step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3 mb-6"
                  >
                    {app.step === 0 && (
                      <>
                        <FormField label="Organisation Name" required>
                          <input
                            type="text"
                            value={app.form.orgName}
                            onChange={(e) =>
                              app.updateField("orgName", e.target.value)
                            }
                            placeholder="e.g. Pacific Climate Alliance"
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: "oklch(0.88 0.015 260)",
                            }}
                            data-ocid="partners.form_input"
                          />
                        </FormField>
                        <FormField label="Organisation Type" required>
                          <select
                            value={app.form.orgType}
                            onChange={(e) =>
                              app.updateField(
                                "orgType",
                                e.target.value as PartnerType | "",
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: app.form.orgType
                                ? "oklch(0.88 0.015 260)"
                                : "oklch(0.5 0.02 260)",
                            }}
                            data-ocid="partners.form_select"
                          >
                            <option value="">Select type…</option>
                            {ORG_TYPES.map(([key, cfg]) => (
                              <option key={key} value={key}>
                                {cfg.icon} {cfg.label}
                              </option>
                            ))}
                          </select>
                        </FormField>
                        <div className="grid grid-cols-2 gap-3">
                          <FormField label="Country" required>
                            <input
                              type="text"
                              value={app.form.country}
                              onChange={(e) =>
                                app.updateField("country", e.target.value)
                              }
                              placeholder="e.g. Nigeria"
                              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                              style={{
                                background: "oklch(var(--cosmos-deep))",
                                border: "1px solid oklch(var(--gold) / 0.15)",
                                color: "oklch(0.88 0.015 260)",
                              }}
                              data-ocid="partners.form_input"
                            />
                          </FormField>
                          <FormField label="Website">
                            <input
                              type="url"
                              value={app.form.website}
                              onChange={(e) =>
                                app.updateField("website", e.target.value)
                              }
                              placeholder="https://…"
                              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                              style={{
                                background: "oklch(var(--cosmos-deep))",
                                border: "1px solid oklch(var(--gold) / 0.15)",
                                color: "oklch(0.88 0.015 260)",
                              }}
                              data-ocid="partners.form_input"
                            />
                          </FormField>
                        </div>
                        <FormField label="Contact Name" required>
                          <input
                            type="text"
                            value={app.form.contactName}
                            onChange={(e) =>
                              app.updateField("contactName", e.target.value)
                            }
                            placeholder="Full name"
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: "oklch(0.88 0.015 260)",
                            }}
                            data-ocid="partners.form_input"
                          />
                        </FormField>
                        <FormField label="Contact Email" required>
                          <input
                            type="email"
                            value={app.form.contactEmail}
                            onChange={(e) =>
                              app.updateField("contactEmail", e.target.value)
                            }
                            placeholder="email@org.example"
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: "oklch(0.88 0.015 260)",
                            }}
                            data-ocid="partners.form_input"
                          />
                        </FormField>
                      </>
                    )}

                    {app.step === 1 && (
                      <>
                        <FormField label="Mission Statement" required>
                          <textarea
                            value={app.form.mission}
                            onChange={(e) =>
                              app.updateField("mission", e.target.value)
                            }
                            placeholder="Describe your organisation's mission and how it aligns with ONEartHeaven™ values…"
                            rows={4}
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: "oklch(0.88 0.015 260)",
                            }}
                            data-ocid="partners.form_textarea"
                          />
                        </FormField>
                        <FormField
                          label="SDG Focus Areas (select all that apply)"
                          required
                        >
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {SDG_OPTIONS.map(([key, cfg]) => {
                              const isSelected =
                                app.form.sdgFocus.includes(key);
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => app.toggleSDG(key)}
                                  className="text-xs px-2.5 py-1 rounded-full transition-all duration-150"
                                  style={{
                                    background: isSelected
                                      ? `${cfg.color}22`
                                      : "oklch(0.18 0.02 260)",
                                    border: `1px solid ${isSelected ? `${cfg.color}50` : "oklch(0.28 0.02 260)"}`,
                                    color: isSelected
                                      ? cfg.color
                                      : "oklch(0.58 0.02 260)",
                                  }}
                                  data-ocid="partners.sdg_toggle"
                                >
                                  {cfg.icon} {cfg.label}
                                </button>
                              );
                            })}
                          </div>
                        </FormField>
                        <FormField label="Impact Description">
                          <textarea
                            value={app.form.impactDescription}
                            onChange={(e) =>
                              app.updateField(
                                "impactDescription",
                                e.target.value,
                              )
                            }
                            placeholder="Describe the impact your organisation has achieved…"
                            rows={3}
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: "oklch(0.88 0.015 260)",
                            }}
                            data-ocid="partners.form_textarea"
                          />
                        </FormField>
                      </>
                    )}

                    {app.step === 2 && (
                      <>
                        <FormField label="Preferred Partnership Type" required>
                          <select
                            value={app.form.preferredType}
                            onChange={(e) =>
                              app.updateField(
                                "preferredType",
                                e.target.value as AgreementType | "",
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: app.form.preferredType
                                ? "oklch(0.88 0.015 260)"
                                : "oklch(0.5 0.02 260)",
                            }}
                            data-ocid="partners.form_select"
                          >
                            <option value="">Select type…</option>
                            {AGR_TYPES.map(([key, cfg]) => (
                              <option key={key} value={key}>
                                {cfg.label}
                              </option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Expected Contribution" required>
                          <textarea
                            value={app.form.expectedContribution}
                            onChange={(e) =>
                              app.updateField(
                                "expectedContribution",
                                e.target.value,
                              )
                            }
                            placeholder="What can your organisation bring to this partnership?"
                            rows={4}
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                            style={{
                              background: "oklch(var(--cosmos-deep))",
                              border: "1px solid oklch(var(--gold) / 0.15)",
                              color: "oklch(0.88 0.015 260)",
                            }}
                            data-ocid="partners.form_textarea"
                          />
                        </FormField>
                        <div className="grid grid-cols-2 gap-3">
                          <FormField label="Timeline (months)">
                            <input
                              type="number"
                              value={app.form.timelineMonths}
                              onChange={(e) =>
                                app.updateField(
                                  "timelineMonths",
                                  Number(e.target.value),
                                )
                              }
                              min={3}
                              max={60}
                              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                              style={{
                                background: "oklch(var(--cosmos-deep))",
                                border: "1px solid oklch(var(--gold) / 0.15)",
                                color: "oklch(0.88 0.015 260)",
                              }}
                              data-ocid="partners.form_input"
                            />
                          </FormField>
                          <FormField label="How did you hear?">
                            <input
                              type="text"
                              value={app.form.referralSource}
                              onChange={(e) =>
                                app.updateField(
                                  "referralSource",
                                  e.target.value,
                                )
                              }
                              placeholder="e.g. UN Summit"
                              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                              style={{
                                background: "oklch(var(--cosmos-deep))",
                                border: "1px solid oklch(var(--gold) / 0.15)",
                                color: "oklch(0.88 0.015 260)",
                              }}
                              data-ocid="partners.form_input"
                            />
                          </FormField>
                        </div>
                      </>
                    )}

                    {/* Validation errors */}
                    {app.stepErrors.length > 0 && (
                      <div
                        className="flex items-start gap-2 px-3 py-2 rounded-xl"
                        style={{
                          background: "oklch(0.65 0.22 27 / 0.1)",
                          border: "1px solid oklch(0.65 0.22 27 / 0.2)",
                        }}
                      >
                        <XCircle
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.65 0.22 27)" }}
                        />
                        <ul className="flex flex-col gap-0.5">
                          {app.stepErrors.map((err) => (
                            <li
                              key={err}
                              className="text-xs"
                              style={{ color: "oklch(0.72 0.12 27)" }}
                            >
                              {err}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                  {app.step > 0 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={app.prevStep}
                      className="gap-1.5"
                      style={{ color: "oklch(0.65 0.03 260)" }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClose}
                      style={{ color: "oklch(0.65 0.03 260)" }}
                    >
                      Cancel
                    </Button>
                  )}

                  {app.step < app.totalSteps - 1 ? (
                    <Button
                      size="sm"
                      disabled={!app.canAdvance}
                      onClick={app.nextStep}
                      className="gap-1.5"
                      style={{
                        background: app.canAdvance
                          ? "oklch(var(--gold))"
                          : "oklch(0.28 0.02 260)",
                        color: app.canAdvance
                          ? "oklch(0.15 0.02 260)"
                          : "oklch(0.45 0.02 260)",
                      }}
                      data-ocid="partners.next_button"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      disabled={!app.canAdvance || app.isSubmitting}
                      onClick={app.submit}
                      className="gap-1.5"
                      style={{
                        background: app.canAdvance
                          ? "oklch(var(--gold))"
                          : "oklch(0.28 0.02 260)",
                        color: app.canAdvance
                          ? "oklch(0.15 0.02 260)"
                          : "oklch(0.45 0.02 260)",
                      }}
                      data-ocid="partners.submit_button"
                    >
                      {app.isSubmitting ? (
                        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Tiny form field wrapper
// ---------------------------------------------------------------------------
function FormField({
  label,
  required,
  children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-xs font-medium"
        style={{ color: "oklch(0.65 0.03 260)" }}
        role="presentation"
      >
        {label}
        {required && <span style={{ color: "oklch(0.65 0.22 27)" }}> *</span>}
      </span>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PartnersPage — main export
// ---------------------------------------------------------------------------
export function PartnersPage() {
  const [activeType, setActiveType] = useState<PartnerType | "all">("all");
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null,
  );
  const [applyOpen, setApplyOpen] = useState(false);

  const {
    partners,
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    totalCount,
    isEmpty,
  } = usePartners({ type: activeType });

  function handleTypeTab(type: PartnerType | "all") {
    setActiveType(type);
    updateFilter({ type: type === "all" ? "all" : type });
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="partners.page"
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
        data-ocid="partners.hero.section"
      >
        {/* Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.16 75 / 0.10) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 80% 70%, oklch(0.55 0.18 195 / 0.07) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "oklch(var(--gold) / 0.3)",
              background: "oklch(var(--gold) / 0.06)",
            }}
          >
            <Sparkles
              className="h-3.5 w-3.5"
              style={{ color: "oklch(var(--gold))" }}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold))" }}
            >
              Phase 13 · Partnerships
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.06,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="gold-gradient-text">Partnership</span>
            <br />
            <span style={{ color: "oklch(var(--pearl))" }}>
              & Ecosystem Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.65 0.04 260)" }}
          >
            Building a global coalition of governments, NGOs, academics, and
            innovators committed to transparent, inclusive, and effective
            governance for all.
          </motion.p>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10"
          >
            {HERO_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1.5 py-4 rounded-2xl"
                  style={{
                    background: "oklch(0.12 0.04 260 / 0.6)",
                    border: "1px solid oklch(var(--gold) / 0.12)",
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: s.color }} />
                  <span
                    className="text-2xl font-extrabold font-display"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[10px] font-medium text-center leading-tight"
                    style={{ color: "oklch(0.58 0.03 260)" }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
          >
            <Button
              size="lg"
              className="btn-gold gap-2"
              onClick={() => setApplyOpen(true)}
              data-ocid="partners.apply_hero.button"
            >
              <Handshake className="h-4 w-4" />
              Become a Partner
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-30 py-3 px-4 sm:px-6"
        style={{
          background: "oklch(var(--cosmos-deep) / 0.95)",
          borderBottom: "1px solid oklch(var(--gold) / 0.1)",
          backdropFilter: "blur(12px)",
        }}
        data-ocid="partners.filter.bar"
      >
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 items-center">
          {/* Type tabs */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            {TYPE_TABS.map((tab) => {
              const isActive = activeType === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTypeTab(tab.key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                  style={{
                    background: isActive
                      ? "oklch(var(--gold) / 0.15)"
                      : "oklch(0.15 0.03 260)",
                    border: `1px solid ${isActive ? "oklch(var(--gold) / 0.4)" : "oklch(var(--gold) / 0.1)"}`,
                    color: isActive
                      ? "oklch(var(--gold))"
                      : "oklch(0.62 0.03 260)",
                  }}
                  data-ocid={`partners.filter.${tab.key}`}
                >
                  {tab.icon} {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search + region */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                style={{ color: "oklch(0.5 0.03 260)" }}
              />
              <input
                type="text"
                placeholder="Search…"
                value={filters.search ?? ""}
                onChange={(e) => updateFilter({ search: e.target.value })}
                className="pl-8 pr-3 py-1.5 rounded-xl text-xs outline-none w-36"
                style={{
                  background: "oklch(0.15 0.03 260)",
                  border: "1px solid oklch(var(--gold) / 0.12)",
                  color: "oklch(0.85 0.015 260)",
                }}
                data-ocid="partners.search_input"
              />
            </div>
            <select
              value={filters.region ?? "all"}
              onChange={(e) =>
                updateFilter({
                  region: e.target.value as PartnerRegion | "all",
                })
              }
              className="px-3 py-1.5 rounded-xl text-xs outline-none"
              style={{
                background: "oklch(0.15 0.03 260)",
                border: "1px solid oklch(var(--gold) / 0.12)",
                color: "oklch(0.78 0.02 260)",
              }}
              data-ocid="partners.region_filter"
            >
              <option value="all">All Regions</option>
              {(
                Object.entries(PARTNER_REGION_CONFIG) as Array<
                  [PartnerRegion, { label: string; flag: string }]
                >
              ).map(([key, cfg]) => (
                <option key={key} value={key}>
                  {cfg.flag} {cfg.label}
                </option>
              ))}
            </select>
            <select
              value={filters.tier ?? "all"}
              onChange={(e) =>
                updateFilter({ tier: e.target.value as PartnerTier | "all" })
              }
              className="px-3 py-1.5 rounded-xl text-xs outline-none"
              style={{
                background: "oklch(0.15 0.03 260)",
                border: "1px solid oklch(var(--gold) / 0.12)",
                color: "oklch(0.78 0.02 260)",
              }}
              data-ocid="partners.tier_filter"
            >
              <option value="all">All Tiers</option>
              {(
                Object.entries(PARTNER_TIER_CONFIG) as Array<
                  [PartnerTier, { label: string; icon: string; color: string }]
                >
              ).map(([key, cfg]) => (
                <option key={key} value={key}>
                  {cfg.icon} {cfg.label}
                </option>
              ))}
            </select>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs transition-colors hover:opacity-80"
                style={{
                  background: "oklch(0.65 0.22 27 / 0.15)",
                  color: "oklch(0.72 0.12 27)",
                }}
                data-ocid="partners.clear_filters_button"
              >
                <XCircle className="h-3 w-3" />
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Global Partner Map ────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4"
        data-ocid="partners.map.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-base font-bold"
                style={{ color: "oklch(0.88 0.015 260)" }}
              >
                Global Partner Network
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0.03 260)" }}
              >
                {PARTNER_PROFILES.length} organisations across{" "}
                {new Set(PARTNER_PROFILES.map((p) => p.region)).size} regions —
                click any dot to view profile
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Globe2
                className="h-4 w-4"
                style={{ color: "oklch(0.68 0.22 250)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "oklch(0.65 0.03 260)" }}
              >
                {PARTNER_PROFILES.filter((p) => p.country).length} nations
              </span>
            </div>
          </div>
          <WorldMap
            activePartnerId={selectedPartnerId}
            onDotClick={setSelectedPartnerId}
          />
        </motion.div>
      </section>

      {/* ── Partner Grid ──────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20"
        data-ocid="partners.grid.section"
      >
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "oklch(0.58 0.03 260)" }}>
            {totalCount} partner{totalCount !== 1 ? "s" : ""} found
          </p>
          <select
            value={filters.sortBy ?? "score-desc"}
            onChange={(e) =>
              updateFilter({
                sortBy: e.target.value as
                  | "name"
                  | "score-desc"
                  | "newest"
                  | "tier",
              })
            }
            className="px-3 py-1.5 rounded-xl text-xs outline-none"
            style={{
              background: "oklch(0.15 0.03 260)",
              border: "1px solid oklch(var(--gold) / 0.12)",
              color: "oklch(0.78 0.02 260)",
            }}
            data-ocid="partners.sort_select"
          >
            <option value="score-desc">Highest Score</option>
            <option value="tier">By Tier</option>
            <option value="name">Alphabetical</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {isEmpty ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            data-ocid="partners.empty_state"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(0.15 0.03 260)",
                border: "1px solid oklch(var(--gold) / 0.15)",
              }}
            >
              <Shield
                className="h-8 w-8"
                style={{ color: "oklch(0.45 0.03 260)" }}
              />
            </div>
            <div className="text-center">
              <h3
                className="text-base font-semibold mb-1"
                style={{ color: "oklch(0.72 0.015 260)" }}
              >
                No partners found
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.5 0.02 260)" }}>
                Try adjusting your filters or search terms
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetFilters();
                setActiveType("all");
              }}
              className="gap-2"
              style={{
                borderColor: "oklch(var(--gold) / 0.3)",
                color: "oklch(var(--gold))",
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((partner, idx) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                idx={idx}
                onOpen={setSelectedPartnerId}
              />
            ))}
          </div>
        )}

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl p-8 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.14 0.05 260) 0%, oklch(0.12 0.04 260) 100%)",
            border: "1px solid oklch(var(--gold) / 0.2)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 100%, oklch(var(--gold) / 0.05) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <Handshake
              className="h-8 w-8 mx-auto mb-4"
              style={{ color: "oklch(var(--gold))" }}
            />
            <h3
              className="font-display text-xl font-bold mb-2"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Join the Partnership Network
            </h3>
            <p
              className="text-sm mb-6 max-w-sm mx-auto leading-relaxed"
              style={{ color: "oklch(0.62 0.03 260)" }}
            >
              Partner with ONEartHeaven™ to amplify your impact, access global
              networks, and help build transparent governance for all.
            </p>
            <Separator
              className="mb-6 max-w-xs mx-auto"
              style={{ background: "oklch(var(--gold) / 0.15)" }}
            />
            <Button
              size="lg"
              className="btn-gold gap-2"
              onClick={() => setApplyOpen(true)}
              data-ocid="partners.apply_footer.button"
            >
              <Handshake className="h-4 w-4" />
              Apply to Partner
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Detail Sheet */}
      <PartnerDetailSheet
        partnerId={selectedPartnerId}
        onClose={() => setSelectedPartnerId(null)}
        onApply={() => {
          setSelectedPartnerId(null);
          setApplyOpen(true);
        }}
      />

      {/* Application Modal */}
      <PartnerApplicationModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
      />
    </main>
  );
}
