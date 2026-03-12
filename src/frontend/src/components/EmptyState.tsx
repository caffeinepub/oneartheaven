import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LucideIcon, SearchX } from "lucide-react";

interface EmptyStateProps {
  /** Lucide icon component to display */
  icon?: LucideIcon;
  /** Primary heading text */
  heading: string;
  /** Secondary subline text */
  subline?: string;
  /** Reset / clear filters callback */
  onReset?: () => void;
  /** Label for the reset button */
  resetLabel?: string;
  /** Additional className for the container */
  className?: string;
  /** data-ocid for the container */
  "data-ocid"?: string;
}

export function EmptyState({
  icon: Icon = SearchX,
  heading,
  subline,
  onReset,
  resetLabel = "Reset Filters",
  className,
  "data-ocid": dataOcid,
}: EmptyStateProps) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl py-16 px-8 text-center",
        "border border-white/8 bg-white/[0.02]",
        className,
      )}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/6 border border-white/10">
        <Icon className="w-6 h-6 text-white/30" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-white/70 text-sm">{heading}</p>
        {subline && (
          <p className="text-xs text-white/40 max-w-xs mx-auto">{subline}</p>
        )}
      </div>
      {onReset && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          data-ocid="empty_state.button"
          className="mt-1 border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
        >
          {resetLabel}
        </Button>
      )}
    </div>
  );
}
