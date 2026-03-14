import { useCountUp } from "@/hooks/useCountUp";

interface CountUpNumberProps {
  /** Accepts a number, a plain numeric string ("12"), or a locale-formatted
   *  string ("39,060"). Non-numeric strings ("$2.58M", "99.7%") are rendered
   *  as-is without animation. */
  value: number | string;
}

/**
 * Drop-in replacement for `{value}` in stats bars and cards.
 * Runs a count-up animation from 0 to the target value on mount.
 * Respects `prefers-reduced-motion` via the underlying useCountUp hook.
 */
export function CountUpNumber({ value }: CountUpNumberProps) {
  // Determine if the value is purely numeric (possibly locale-formatted)
  const raw = String(value).trim();
  // Strip commas to get a clean numeric string
  const stripped = raw.replace(/,/g, "");
  const end = Number.parseFloat(stripped);
  // Only animate if the original value was nothing but digits, commas, and
  // an optional single dot (i.e. no currency symbols, %, letters, etc.)
  const isSimple = /^[\d,]+(\.[\d]+)?$/.test(raw);

  const count = useCountUp({ end: isSimple && !Number.isNaN(end) ? end : 0 });

  if (!isSimple || Number.isNaN(end)) {
    // Non-numeric or complex format — render unchanged
    return <>{value}</>;
  }

  // Preserve locale formatting for large numbers
  if (raw.includes(",") || end >= 1000) {
    return <>{count.toLocaleString()}</>;
  }
  return <>{count}</>;
}
