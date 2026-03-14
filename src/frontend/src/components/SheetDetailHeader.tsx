import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BadgeConfig {
  label: string;
  color?: string; // oklch color string
  bg?: string;
  border?: string;
}

interface SheetDetailHeaderProps {
  badges?: BadgeConfig[];
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  onClose: () => void;
  closeOcid?: string;
  /** Gradient accent color stop (oklch) for the divider line */
  accentColor?: string;
  /** aria-label for the sheet panel (for screen readers) */
  panelLabel?: string;
}

/**
 * Standardized sheet header for all detail sheets across ONEartHeaven™.
 * Provides: badge row · bold title · subtitle/meta · close button · gradient divider
 */
export function SheetDetailHeader({
  badges = [],
  title,
  subtitle,
  meta,
  onClose,
  closeOcid = "sheet.close_button",
  accentColor = "oklch(0.55 0.14 195)",
}: SheetDetailHeaderProps) {
  return (
    <div
      className="px-6 pt-6 pb-0"
      style={{ borderBottom: "1px solid oklch(0.18 0.02 260)" }}
    >
      <div className="flex items-start justify-between gap-3 pb-5">
        <div className="flex-1 min-w-0">
          {/* Badge row */}
          {badges.length > 0 && (
            <ul
              className="flex items-center gap-2 flex-wrap mb-3 list-none p-0"
              aria-label="Labels"
            >
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1"
                  style={{
                    color: b.color ?? "oklch(0.75 0.10 220)",
                    background: b.bg ?? "oklch(0.75 0.10 220 / 0.12)",
                    borderColor: b.border ?? "oklch(0.75 0.10 220 / 0.30)",
                  }}
                >
                  {b.label}
                </li>
              ))}
            </ul>
          )}

          {/* Title */}
          <h2
            className="font-display text-2xl font-bold leading-tight tracking-tight"
            style={{ color: "oklch(0.94 0.02 260)" }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-sm mt-1 leading-relaxed"
              style={{ color: "oklch(0.60 0.04 260)" }}
            >
              {subtitle}
            </p>
          )}

          {/* Custom meta node */}
          {meta && <div className="mt-2">{meta}</div>}
        </div>

        {/* Close button */}
        <Button
          data-ocid={closeOcid}
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="shrink-0 h-9 w-9 rounded-full hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[oklch(var(--teal)/0.6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(var(--cosmos-deep))]"
          style={{ color: "oklch(0.50 0.03 260)" }}
          aria-label="Close panel"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Gradient divider */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, ${accentColor}, oklch(0.35 0.06 260), transparent)`,
        }}
      />
    </div>
  );
}

/** Standardized section label used inside sheet bodies */
export function SheetSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: "oklch(0.50 0.04 260)" }}
    >
      {children}
    </p>
  );
}

/** Key-value metadata row used inside sheet bodies */
export function SheetMetaRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm" style={{ color: "oklch(0.55 0.04 260)" }}>
        {label}
      </span>
      <span
        className="text-sm font-semibold text-right"
        style={{ color: "oklch(0.88 0.02 260)" }}
      >
        {value}
      </span>
    </div>
  );
}

/** Sticky footer for sheet CTAs */
export function SheetCTAFooter({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="sticky bottom-0 px-6 py-4 flex flex-col gap-2"
      style={{
        borderTop: "1px solid oklch(0.18 0.02 260)",
        background: "oklch(0.09 0.02 260)",
      }}
    >
      {children}
    </div>
  );
}
