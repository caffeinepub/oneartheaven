import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
}

/**
 * Animates a number from `start` to `end` over `duration` ms.
 * Instantly resolves to `end` when the user prefers reduced motion.
 */
export function useCountUp({
  end,
  duration = 1200,
  start = 0,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(prefersReducedMotion() ? end : start);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(end);
      return;
    }
    if (end === start) {
      setCount(end);
      return;
    }

    startTimeRef.current = 0;

    const animate = (ts: number) => {
      if (startTimeRef.current === 0) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a snappy, smooth feel
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(start + (end - start) * eased);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, start]);

  return count;
}
