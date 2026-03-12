import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  className?: string;
  lines?: number;
  showBadge?: boolean;
  showFooter?: boolean;
}

export function CardSkeleton({
  className,
  lines = 3,
  showBadge = true,
  showFooter = true,
}: CardSkeletonProps) {
  return (
    <div
      data-ocid="card.loading_state"
      className={cn(
        "rounded-xl border border-white/10 p-5 flex flex-col gap-4 overflow-hidden",
        "bg-white/[0.03]",
        className,
      )}
    >
      {/* Top row — badge(s) */}
      {showBadge && (
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded-full bg-white/8 animate-shimmer" />
          <div className="h-5 w-12 rounded-full bg-white/5 animate-shimmer" />
        </div>
      )}

      {/* Title lines */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-md bg-white/8 animate-shimmer" />
        {lines >= 2 && (
          <div className="h-4 w-1/2 rounded-md bg-white/6 animate-shimmer" />
        )}
        {lines >= 3 && (
          <div className="h-3 w-full rounded-md bg-white/5 animate-shimmer mt-1" />
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3">
        <div className="h-3 w-16 rounded-md bg-white/6 animate-shimmer" />
        <div className="h-3 w-16 rounded-md bg-white/5 animate-shimmer" />
        <div className="h-3 w-10 rounded-md bg-white/4 animate-shimmer" />
      </div>

      {/* Footer CTA */}
      {showFooter && (
        <div className="pt-1 border-t border-white/6">
          <div className="h-8 w-full rounded-lg bg-white/6 animate-shimmer" />
        </div>
      )}
    </div>
  );
}

export function CardSkeletonGrid({
  count = 6,
  className,
}: { count?: number; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders are positional
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
