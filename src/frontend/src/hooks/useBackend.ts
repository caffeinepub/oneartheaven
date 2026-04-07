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

import type { BackendCallState, MutationState } from "@/data/backendTypes";
import { useActor } from "@/hooks/useActor";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// ─── Local enum stubs (backend binding not yet deployed) ─────────────────────
export enum ApprovalStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum UserRole {
  guest = "guest",
  user = "user",
  observer = "observer",
  delegate = "delegate",
  vendor = "vendor",
  admin = "admin",
  superAdmin = "superAdmin",
}

export enum MemberType {
  nation = "nation",
  city = "city",
  ngo = "ngo",
  community = "community",
  corporate = "corporate",
  cooperative = "cooperative",
  business = "business",
  individual = "individual",
}

export enum MemberRegion {
  africa = "africa",
  asiaPacific = "asiaPacific",
  asia = "asia",
  europe = "europe",
  latinAmerica = "latinAmerica",
  northAmerica = "northAmerica",
  middleEast = "middleEast",
  oceania = "oceania",
  global = "global",
}

export enum MemberStatus {
  active = "active",
  pending = "pending",
  observer = "observer",
  applicant = "applicant",
  suspended = "suspended",
  archived = "archived",
}

export enum StatType {
  members = "members",
  communities = "communities",
  projects = "projects",
  volunteers = "volunteers",
  nations = "nations",
  solutions = "solutions",
}

// ─── Local type stubs ────────────────────────────────────────────────────────
export interface UserProfile {
  displayName: string;
  email: string;
  orgId: string;
  role?: UserRole;
  bio?: string;
  avatarUrl?: string;
}

export interface UserApprovalInfo {
  principal: { toString: () => string };
  status: ApprovalStatus;
}

export interface MemberEntity {
  id: bigint;
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

export interface PlatformStats {
  members: bigint;
  communities: bigint;
  projects: bigint;
  volunteers: bigint;
  nations: bigint;
  solutions: bigint;
}

export interface Announcement {
  id: bigint;
  title: string;
  body: string;
  date: string;
  priority: string;
}

// ─── Helper: safely call a backend method that may not be deployed yet ────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callMethod(actor: unknown, method: string, ...args: unknown[]): any {
  const a = actor as Record<string, (...a: unknown[]) => unknown>;
  if (typeof a[method] === "function") return a[method](...args);
  return Promise.reject(new Error(`Method ${method} not deployed`));
}

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
      try {
        return await callMethod(actor, "getCallerUserProfile");
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });

  const mutation = useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(actor, "saveCallerUserProfile", profile);
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

export function useOtherUserProfile(
  principal: Principal | null,
): BackendCallState<UserProfile> {
  const { actor, isFetching } = useActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ["userProfile", principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      try {
        return await callMethod(actor, "getUserProfile", principal);
      } catch {
        return null;
      }
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
      try {
        return await callMethod(actor, "getCallerUserRole");
      } catch {
        return UserRole.guest;
      }
    },
    enabled: !!actor && !isFetching,
  });

  const isAdminQuery = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await callMethod(actor, "isCallerAdmin");
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });

  const assignMutation = useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: UserRole }) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(actor, "assignCallerUserRole", user, role);
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
      try {
        return await callMethod(actor, "isCallerApproved");
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });

  const approvalsQuery = useQuery<UserApprovalInfo[]>({
    queryKey: ["approvals"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await callMethod(actor, "listApprovals");
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(actor, "requestApproval");
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
      return callMethod(actor, "setApproval", user, status);
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
      try {
        return await callMethod(actor, "getMembers");
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async (p: AddMemberParams) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(
        actor,
        "addMember",
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
      ) as Promise<bigint>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(actor, "removeMember", id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const applyMutation = useMutation({
    mutationFn: async (p: ApplyMembershipParams) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(
        actor,
        "applyForMembership",
        p.name,
        p.memberType,
        p.region,
        p.country,
        p.description,
        p.languages,
        p.website,
        p.contactEmail,
      ) as Promise<bigint>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: MemberStatus }) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(actor, "updateMemberStatus", id, status);
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

// ─── 5. Stats Group ───────────────────────────────────────────────────────────

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
      try {
        return await callMethod(actor, "getStats");
      } catch {
        return {
          members: 0n,
          communities: 0n,
          projects: 0n,
          volunteers: 0n,
          nations: 0n,
          solutions: 0n,
        };
      }
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
      return callMethod(actor, "updateStat", statType, value);
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
      try {
        return await callMethod(actor, "getAllAnnouncements");
      } catch {
        return [];
      }
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
      return callMethod(
        actor,
        "addAnnouncement",
        title,
        body,
        date,
        priority,
      ) as Promise<bigint>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Wallet not connected");
      return callMethod(actor, "removeAnnouncement", id);
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
