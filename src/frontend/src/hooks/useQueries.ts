import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ─── Local type stubs (backend binding not yet deployed) ─────────────────────
export interface PlatformStats {
  members: bigint;
  nations: bigint;
  solutions: bigint;
  volunteers: bigint;
  projects: bigint;
  communities: bigint;
}

export interface Announcement {
  id: bigint;
  title: string;
  body: string;
  date: string;
  priority: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

// Helper: safely call a backend method that may not be deployed yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callMethod(actor: unknown, method: string, ...args: unknown[]): any {
  const a = actor as Record<string, (...a: unknown[]) => unknown>;
  if (typeof a[method] === "function") return a[method](...args);
  return Promise.reject(new Error(`Method ${method} not deployed`));
}

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery<PlatformStats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) {
        return {
          members: BigInt(12500),
          nations: BigInt(147),
          solutions: BigInt(3200),
          volunteers: BigInt(8900),
          projects: BigInt(640),
          communities: BigInt(420),
        };
      }
      try {
        return await callMethod(actor, "getStats");
      } catch {
        return {
          members: 12500n,
          nations: 147n,
          solutions: 3200n,
          volunteers: 8900n,
          projects: 640n,
          communities: 420n,
        };
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useGetAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await callMethod(actor, "getAllAnnouncements");
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useGetSupportedLanguages() {
  const { actor, isFetching } = useActor();
  return useQuery<Language[]>({
    queryKey: ["languages"],
    queryFn: async () => {
      if (!actor) {
        return [
          { code: "en", name: "English", nativeName: "English" },
          { code: "es", name: "Spanish", nativeName: "Español" },
          { code: "fr", name: "French", nativeName: "Français" },
          { code: "ar", name: "Arabic", nativeName: "العربية" },
          { code: "zh", name: "Chinese", nativeName: "中文" },
          { code: "pt", name: "Portuguese", nativeName: "Português" },
          { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
          { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
          { code: "ru", name: "Russian", nativeName: "Русский" },
          { code: "de", name: "German", nativeName: "Deutsch" },
        ];
      }
      try {
        return await callMethod(actor, "getSupportedLanguages");
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      body,
      date,
      priority,
    }: {
      title: string;
      body: string;
      date: string;
      priority: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return callMethod(actor, "addAnnouncement", title, body, date, priority);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useRemoveAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return callMethod(actor, "removeAnnouncement", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}
