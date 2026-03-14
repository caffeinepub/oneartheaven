import { ApprovalStatus, type UserApprovalInfo } from "@/backend";
import {
  type ApprovalStats,
  SEED_APPLICATIONS,
  type UserApplication,
} from "@/data/approvalTypes";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Check if the current caller is approved
// ---------------------------------------------------------------------------

export function useApprovalStatus() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["approvalStatus"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerApproved();
    },
    enabled: !!actor && !isFetching,
  });
}

// ---------------------------------------------------------------------------
// Request approval (mutation)
// ---------------------------------------------------------------------------

export function useRequestApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.requestApproval();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvalStatus"] });
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
  });
}

// ---------------------------------------------------------------------------
// List all approvals (admin only) — merges backend data with seed for demo
// ---------------------------------------------------------------------------

export function useListApprovals() {
  const { actor, isFetching } = useActor();
  return useQuery<UserApplication[]>({
    queryKey: ["approvals"],
    queryFn: async (): Promise<UserApplication[]> => {
      if (!actor) return SEED_APPLICATIONS;
      let backendList: UserApprovalInfo[] = [];
      try {
        backendList = await actor.listApprovals();
      } catch {
        // Fall back to seed only if backend fails
        return SEED_APPLICATIONS;
      }
      // Map real backend entries
      const backendMapped: UserApplication[] = backendList.map((item) => ({
        principalId: item.principal.toString(),
        displayName: `${item.principal.toString().slice(0, 10)}...`,
        orgName: "—",
        country: "—",
        requestedRole: "Observer",
        motivation: "",
        submittedAt: new Date().toISOString(),
        status: item.status,
      }));
      // Merge: seed entries not already in backend list
      const backendIds = new Set(backendMapped.map((a) => a.principalId));
      const seedExtras = SEED_APPLICATIONS.filter(
        (a) => !backendIds.has(a.principalId),
      );
      return [...backendMapped, ...seedExtras];
    },
    enabled: !!actor && !isFetching,
  });
}

// ---------------------------------------------------------------------------
// Compute stats from a list of applications
// ---------------------------------------------------------------------------

export function computeApprovalStats(apps: UserApplication[]): ApprovalStats {
  const pending = apps.filter(
    (a) => a.status === ApprovalStatus.pending,
  ).length;
  const approved = apps.filter(
    (a) => a.status === ApprovalStatus.approved,
  ).length;
  const rejected = apps.filter(
    (a) => a.status === ApprovalStatus.rejected,
  ).length;
  return { pending, approved, rejected, total: apps.length };
}

// ---------------------------------------------------------------------------
// Set approval status (admin mutation)
// ---------------------------------------------------------------------------

export function useSetApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      principalId,
      status,
    }: {
      principalId: string;
      status: ApprovalStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      const principal = Principal.fromText(principalId);
      return actor.setApproval(principal, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
  });
}
