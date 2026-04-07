import { createActor } from "@/backend";
import type { Backend } from "@/backend";
// Local shim for useActor — wraps the core-infrastructure hook with the
// project's createActor function pre-bound, so callers can use
// `const { actor, isFetching } = useActor()` without passing createActor each time.
import { useActor as _useActor } from "@caffeineai/core-infrastructure";

export function useActor(): { actor: Backend | null; isFetching: boolean } {
  return _useActor(createActor);
}
