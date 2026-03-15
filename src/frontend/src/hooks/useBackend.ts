/**
 * useBackend.ts
 * Typed frontend binding layer for all backendInterface API groups.
 * Each hook group wraps the corresponding actor calls with:
 *   - loading / error / data state
 *   - react-query caching and invalidation
 *   - graceful fallback when actor is not yet available
 *
 * This file is the single source of truth for all backend API access.
 * Replace actor stubs with real canister calls by updating useActor().
 */

import type { Announcement, PlatformStats, UserProfile } from "@/backend";
import { ApprovalStatus, UserRole } from "@/backend";
import type { MemberEntity, UserApprovalInfo } from "@/backend";
import { MemberRegion, MemberStatus, MemberType, StatType } from "@/backend";
import type { BackendCallState, MutationState } from "@/data/backendTypes";
import { useActor } from "@/hooks/useActor";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// ─── Re-export enums so callers don't need to reach into backend directly ─────
export {
  ApprovalStatus,
  UserRole,
  MemberType,
  MemberRegion,
  MemberStatus,
  StatType,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Builds a stable BackendCallState object from a react-query result. */
function toCallState<T>(
  data: T | undefined,
  isLoading: boolean,
  error: Error | null,
  refetch: () => void,
): BackendCallState<T> {
  return {
    data: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

// ─── 1. Profile Group ─────────────────────────────────────────────────────────

/**
 * useUserProfile
 * Reads and writes the caller's UserProfile from the backend.
 */
export function useUserProfile(): BackendCallState<UserProfile> & {
  save: (profile: UserProfile) => Promise<void>;
  saving: boolean;
} {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });

  const mutation = useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    ...toCallState(
      query.data ?? undefined,
      query.isLoading,
      query.error as Error | null,
      query.refetch,
    ),
    save: mutation.mutateAsync,
    saving: mutation.isPending,
  };
}

/**
 * useOtherUserProfile
 * Reads any user's profile by Principal.
 */
export function useOtherUserProfile(
  principal: Principal | null,
): BackendCallState<UserProfile> {
  const { actor, isFetching } = useActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ["userProfile", principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getUserProfile(principal);
    },
    enabled: !!actor && !isFetching && !!principal,
  });
  return toCallState(
    query.data ?? undefined,
    query.isLoading,
    query.error as Error | null,
    query.refetch,
  );
}

// ─── 2. Role Group ────────────────────────────────────────────────────────────

/**
 * useCallerRole
 * Returns the caller's current backend role, and provides an assign mutation.
 */
export function useCallerRole(): BackendCallState<UserRole> & {
  isAdmin: boolean;
  assign: (user: Principal, role: UserRole) => Promise<void>;
  assigning: boolean;
} {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const roleQuery = useQuery<UserRole>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });

  const isAdminQuery = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  const assignMutation = useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerRole"] });
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });

  return {
    ...toCallState(
      roleQuery.data,
      roleQuery.isLoading,
      roleQuery.error as Error | null,
      roleQuery.refetch,
    ),
    isAdmin: isAdminQuery.data ?? false,
    assign: (user, role) => assignMutation.mutateAsync({ user, role }),
    assigning: assignMutation.isPending,
  };
}

// ─── 3. Approval Group ────────────────────────────────────────────────────────

/**
 * useBackendApprovals
 * Full approval pipeline: check status, request, list (admin), set (admin).
 */
export function useBackendApprovals(): {
  isApproved: BackendCallState<boolean>;
  approvals: BackendCallState<UserApprovalInfo[]>;
  request: () => Promise<void>;
  requesting: boolean;
  setStatus: (user: Principal, status: ApprovalStatus) => Promise<void>;
  setting: boolean;
} {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const isApprovedQuery = useQuery<boolean>({
    queryKey: ["isApproved"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerApproved();
    },
    enabled: !!actor && !isFetching,
  });

  const approvalsQuery = useQuery<UserApprovalInfo[]>({
    queryKey: ["approvals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listApprovals();
    },
    enabled: !!actor && !isFetching,
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.requestApproval();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isApproved"] });
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
  });

  const setMutation = useMutation({
    mutationFn: async ({
      user,
      status,
    }: { user: Principal; status: ApprovalStatus }) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.setApproval(user, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
  });

  return {
    isApproved: toCallState(
      isApprovedQuery.data,
      isApprovedQuery.isLoading,
      isApprovedQuery.error as Error | null,
      isApprovedQuery.refetch,
    ),
    approvals: toCallState(
      approvalsQuery.data,
      approvalsQuery.isLoading,
      approvalsQuery.error as Error | null,
      approvalsQuery.refetch,
    ),
    request: requestMutation.mutateAsync,
    requesting: requestMutation.isPending,
    setStatus: (user, status) => setMutation.mutateAsync({ user, status }),
    setting: setMutation.isPending,
  };
}

// ─── 4. Member Group ──────────────────────────────────────────────────────────

/**
 * useBackendMembers
 * Full member management: list, get, add, remove, apply, update status.
 */
export function useBackendMembers(): {
  members: BackendCallState<MemberEntity[]>;
  getMember: (id: bigint) => BackendCallState<MemberEntity | null>;
  add: (params: AddMemberParams) => Promise<bigint>;
  remove: (id: bigint) => Promise<void>;
  apply: (params: ApplyMembershipParams) => Promise<bigint>;
  updateStatus: (id: bigint, status: MemberStatus) => Promise<void>;
  mutating: boolean;
} {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const membersQuery = useQuery<MemberEntity[]>({
    queryKey: ["members"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMembers();
    },
    enabled: !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async (p: AddMemberParams) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.addMember(
        p.name,
        p.memberType,
        p.region,
        p.country,
        p.description,
        p.joinedDate,
        p.status,
        p.languages,
        p.website,
        p.contactEmail,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.removeMember(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const applyMutation = useMutation({
    mutationFn: async (p: ApplyMembershipParams) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.applyForMembership(
        p.name,
        p.memberType,
        p.region,
        p.country,
        p.description,
        p.languages,
        p.website,
        p.contactEmail,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: MemberStatus }) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.updateMemberStatus(id, status);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const getMember = useCallback(
    (id: bigint): BackendCallState<MemberEntity | null> => {
      const found = membersQuery.data?.find((m) => m.id === id) ?? null;
      return toCallState(
        found,
        membersQuery.isLoading,
        membersQuery.error as Error | null,
        membersQuery.refetch,
      );
    },
    [membersQuery],
  );

  const mutating =
    addMutation.isPending ||
    removeMutation.isPending ||
    applyMutation.isPending ||
    updateStatusMutation.isPending;

  return {
    members: toCallState(
      membersQuery.data,
      membersQuery.isLoading,
      membersQuery.error as Error | null,
      membersQuery.refetch,
    ),
    getMember,
    add: addMutation.mutateAsync,
    remove: removeMutation.mutateAsync,
    apply: applyMutation.mutateAsync,
    updateStatus: (id, status) =>
      updateStatusMutation.mutateAsync({ id, status }),
    mutating,
  };
}

// ─── Member param types ───────────────────────────────────────────────────────

export interface AddMemberParams {
  name: string;
  memberType: MemberType;
  region: MemberRegion;
  country: string;
  description: string;
  joinedDate: string;
  status: MemberStatus;
  languages: string[];
  website: string;
  contactEmail: string;
}

export interface ApplyMembershipParams {
  name: string;
  memberType: MemberType;
  region: MemberRegion;
  country: string;
  description: string;
  languages: string[];
  website: string;
  contactEmail: string;
}

// ─── 5. Stats Group ───────────────────────────────────────────────────────────

/**
 * useBackendStats
 * Reads and updates platform-level aggregate stats.
 */
export function useBackendStats(): BackendCallState<PlatformStats> & {
  update: (statType: StatType, value: bigint) => Promise<void>;
  updating: boolean;
} {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const statsQuery = useQuery<PlatformStats>({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor)
        return {
          members: 0n,
          communities: 0n,
          projects: 0n,
          volunteers: 0n,
          nations: 0n,
          solutions: 0n,
        };
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      statType,
      value,
    }: { statType: StatType; value: bigint }) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.updateStat(statType, value);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["platformStats"] }),
  });

  return {
    ...toCallState(
      statsQuery.data,
      statsQuery.isLoading,
      statsQuery.error as Error | null,
      statsQuery.refetch,
    ),
    update: (statType, value) =>
      updateMutation.mutateAsync({ statType, value }),
    updating: updateMutation.isPending,
  };
}

// ─── 6. Announcements Group ───────────────────────────────────────────────────

/**
 * useAnnouncements
 * Full announcement management: list, add, remove.
 */
export function useAnnouncements(): BackendCallState<Announcement[]> & {
  add: (
    title: string,
    body: string,
    date: string,
    priority: string,
  ) => Promise<bigint>;
  remove: (id: bigint) => Promise<void>;
  mutating: boolean;
} {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });

  const addMutation = useMutation({
    mutationFn: async ({
      title,
      body,
      date,
      priority,
    }: { title: string; body: string; date: string; priority: string }) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.addAnnouncement(title, body, date, priority);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.removeAnnouncement(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  return {
    ...toCallState(
      query.data,
      query.isLoading,
      query.error as Error | null,
      query.refetch,
    ),
    add: (title, body, date, priority) =>
      addMutation.mutateAsync({ title, body, date, priority }),
    remove: removeMutation.mutateAsync,
    mutating: addMutation.isPending || removeMutation.isPending,
  };
}

// ─── Void export to prevent unused import warnings ───────────────────────────
export type { BackendCallState, MutationState };
