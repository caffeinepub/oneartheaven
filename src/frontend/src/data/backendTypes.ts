/**
 * backendTypes.ts
 * Frontend-side type definitions that complement backend.d.ts.
 * Provides generic async wrappers and extended org/submission models
 * used by the useBackend.ts binding layer.
 */

// ─── Generic Async State Wrappers ─────────────────────────────────────────────

/** Wraps any backend query result with standard loading/error/data fields. */
export interface BackendCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Wraps a write/mutation operation with loading/error/success and reset. */
export interface MutationState {
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

// ─── Organization Types ───────────────────────────────────────────────────────

export type OrgType =
  | "NGO"
  | "Nation"
  | "City"
  | "Community"
  | "Corporate"
  | "Cooperative"
  | "DAO"
  | "Foundation";

export type OrgStatus = "active" | "pending" | "suspended" | "archived";

export interface OrgFeatureFlags {
  governance: boolean;
  finance: boolean;
  academy: boolean;
  sustainability: boolean;
  transparency: boolean;
  integrations: boolean;
  memberCap: number;
}

export interface Organization {
  orgId: string;
  name: string;
  type: OrgType;
  tier: string;
  status: OrgStatus;
  country: string;
  region: string;
  logoUrl: string;
  description: string;
  primaryColor: string;
  featureFlags: OrgFeatureFlags;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Vote Types ───────────────────────────────────────────────────────────────

export type VoteChoice = "yes" | "no" | "abstain";

export interface Vote {
  voteId: string;
  userId: string;
  orgId: string;
  resolutionId: string;
  choice: VoteChoice;
  weight: number;
  rationale: string;
  timestamp: string;
}

// ─── Submission Types ─────────────────────────────────────────────────────────

export type SubmissionType =
  | "idea"
  | "report"
  | "contract"
  | "whistleblower"
  | "membership"
  | "vendor_application"
  | "audit_request";

export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "archived";

export interface Submission {
  submissionId: string;
  userId: string;
  orgId: string;
  type: SubmissionType;
  payload: Record<string, string>;
  status: SubmissionStatus;
  attachmentIds: string[];
  submittedAt: string;
  reviewerId: string | null;
  reviewedAt: string | null;
  reviewNote: string | null;
}

// ─── Org-Member Link ──────────────────────────────────────────────────────────

export interface OrgMemberLink {
  userId: string;
  orgId: string;
  role: string;
  joinedAt: string;
  invitedBy: string | null;
  status: "active" | "suspended" | "pending";
}

// ─── Config Constants ─────────────────────────────────────────────────────────

export const ORG_TYPE_CONFIG: Record<
  OrgType,
  { label: string; color: string }
> = {
  NGO: { label: "NGO", color: "text-emerald-400" },
  Nation: { label: "Nation State", color: "text-blue-400" },
  City: { label: "City / Municipality", color: "text-cyan-400" },
  Community: { label: "Community", color: "text-teal-400" },
  Corporate: { label: "Corporate", color: "text-violet-400" },
  Cooperative: { label: "Cooperative", color: "text-amber-400" },
  DAO: { label: "DAO", color: "text-fuchsia-400" },
  Foundation: { label: "Foundation", color: "text-rose-400" },
};

export const ORG_STATUS_CONFIG: Record<
  OrgStatus,
  { label: string; color: string }
> = {
  active: { label: "Active", color: "text-emerald-400" },
  pending: { label: "Pending", color: "text-amber-400" },
  suspended: { label: "Suspended", color: "text-red-400" },
  archived: { label: "Archived", color: "text-slate-400" },
};

export const VOTE_CHOICE_CONFIG: Record<
  VoteChoice,
  { label: string; color: string }
> = {
  yes: { label: "Yes", color: "text-emerald-400" },
  no: { label: "No", color: "text-red-400" },
  abstain: { label: "Abstain", color: "text-slate-400" },
};

export const SUBMISSION_TYPE_CONFIG: Record<
  SubmissionType,
  { label: string; color: string }
> = {
  idea: { label: "Idea", color: "text-blue-400" },
  report: { label: "Report", color: "text-amber-400" },
  contract: { label: "Contract", color: "text-violet-400" },
  whistleblower: { label: "Whistleblower", color: "text-red-400" },
  membership: { label: "Membership", color: "text-emerald-400" },
  vendor_application: { label: "Vendor Application", color: "text-cyan-400" },
  audit_request: { label: "Audit Request", color: "text-orange-400" },
};

export const SUBMISSION_STATUS_CONFIG: Record<
  SubmissionStatus,
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "text-slate-400" },
  submitted: { label: "Submitted", color: "text-blue-400" },
  under_review: { label: "Under Review", color: "text-amber-400" },
  approved: { label: "Approved", color: "text-emerald-400" },
  rejected: { label: "Rejected", color: "text-red-400" },
  archived: { label: "Archived", color: "text-slate-500" },
};
