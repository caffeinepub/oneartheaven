import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Announcement, Language, PlatformStats } from "../backend.d";
import { useActor } from "./useActor";

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
      return actor.getStats();
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
      return actor.getAllAnnouncements();
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
      return actor.getSupportedLanguages();
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
      return actor.addAnnouncement(title, body, date, priority);
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
      return actor.removeAnnouncement(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}
