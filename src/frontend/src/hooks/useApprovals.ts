import {
  type ApprovalStats,
  ApprovalStatus,
  SEED_APPLICATIONS,
  type UserApplication,
} from "@/data/approvalTypes";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Stub type for UserApprovalInfo (backend not yet deployed)
interface UserApprovalInfo {
  principal: { toString: () => string };
  status: ApprovalStatus;
}

// Helper: safely call a backend method that may not be deployed yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callMethod(actor: unknown, method: string, ...args: unknown[]): any {
  const a = actor as Record<string, (...a: unknown[]) => unknown>;
  if (typeof a[method] === "function") return a[method](...args);
  return Promise.reject(new Error(`Method ${method} not deployed`));
}

// ---------------------------------------------------------------------------
// Check if the current caller is approved
// ---------------------------------------------------------------------------

export function useApprovalStatus() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["approvalStatus"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return (await callMethod(actor, "isCallerApproved")) as boolean;
      } catch {
        return false;
      }
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
      return callMethod(actor, "requestApproval");
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
        backendList = (await callMethod(
          actor,
          "listApprovals",
        )) as UserApprovalInfo[];
      } catch {
        return SEED_APPLICATIONS;
      }
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
      return callMethod(actor, "setApproval", principal, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
  });
}
