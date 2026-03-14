export type UserRole =
  | "SuperAdmin"
  | "OrgAdmin"
  | "Delegate"
  | "Vendor"
  | "Observer"
  | "Anonymous";

export type Permission =
  | "read"
  | "write"
  | "submit"
  | "approve"
  | "manage_org"
  | "manage_users"
  | "manage_platform";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SuperAdmin: [
    "read",
    "write",
    "submit",
    "approve",
    "manage_org",
    "manage_users",
    "manage_platform",
  ],
  OrgAdmin: [
    "read",
    "write",
    "submit",
    "approve",
    "manage_org",
    "manage_users",
  ],
  Delegate: ["read", "write", "submit"],
  Vendor: ["read", "write", "submit"],
  Observer: ["read"],
  Anonymous: ["read"],
};

export const ROLE_CONFIG: Record<
  UserRole,
  { label: string; color: string; badge: string }
> = {
  SuperAdmin: {
    label: "Super Admin",
    color: "oklch(0.75 0.18 55)",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  OrgAdmin: {
    label: "Org Admin",
    color: "oklch(0.72 0.16 260)",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  Delegate: {
    label: "Delegate",
    color: "oklch(0.72 0.16 180)",
    badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
  Vendor: {
    label: "Vendor",
    color: "oklch(0.72 0.16 300)",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  Observer: {
    label: "Observer",
    color: "oklch(0.65 0.03 260)",
    badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  },
  Anonymous: {
    label: "Guest",
    color: "oklch(0.55 0.02 260)",
    badge: "bg-slate-700/40 text-slate-400 border-slate-600/30",
  },
};

export interface UserProfile {
  principalId: string;
  displayName: string;
  role: UserRole;
  orgId: string | null;
  joinedAt: string;
}
