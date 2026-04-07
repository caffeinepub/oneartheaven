import { RequireRole } from "@/components/RequireRole";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApprovalStatus } from "@/data/approvalTypes";
import {
  APPROVAL_STATUS_CONFIG,
  type UserApplication,
} from "@/data/approvalTypes";
import { useActor } from "@/hooks/useActor";
import {
  computeApprovalStats,
  useListApprovals,
  useSetApproval,
} from "@/hooks/useApprovals";
import { UserRole } from "@/hooks/useBackend";
import {
  Building2,
  Calendar,
  CheckCircle,
  Globe2,
  Loader2,
  MapPin,
  MessageSquare,
  Search,
  ShieldOff,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "pending" | "approved" | "rejected";

function StatusBadge({ status }: { status: ApprovalStatus }) {
  const cfg = APPROVAL_STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.badge}`}
    >
      {cfg.label}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colorMap: Record<string, string> = {
    Delegate: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    Vendor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Observer: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
        colorMap[role] ?? "bg-slate-500/20 text-slate-300 border-slate-500/30"
      }`}
    >
      {role}
    </span>
  );
}

function ApplicationCard({
  app,
  index,
  onSelect,
  onApprove,
  onReject,
  isPending,
  pendingAction,
}: {
  app: UserApplication;
  index: number;
  onSelect: (app: UserApplication) => void;
  onApprove: (app: UserApplication) => void;
  onReject: (app: UserApplication) => void;
  isPending: boolean;
  pendingAction: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="cosmos-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{
        background: "oklch(var(--cosmos-mid))",
        border: "1px solid oklch(1_0_0/0.07)",
      }}
      data-ocid={`approvals.item.${index + 1}`}
    >
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-[oklch(var(--pearl))] truncate">
            {app.displayName}
          </span>
          <StatusBadge status={app.status} />
          <RoleBadge role={app.requestedRole} />
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-[oklch(0.55_0.03_260)]">
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" /> {app.orgName}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {app.country}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />{" "}
            {new Date(app.submittedAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-[oklch(0.4_0.03_260)] font-mono mt-1 truncate">
          {app.principalId.slice(0, 20)}…
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onSelect(app)}
          className="text-xs text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--pearl))]"
          data-ocid={`approvals.item.${index + 1}.button`}
        >
          Details
        </Button>
        {app.status === ApprovalStatus.pending && (
          <>
            <Button
              size="sm"
              disabled={
                isPending && pendingAction === `approve-${app.principalId}`
              }
              onClick={() => onApprove(app)}
              className="text-xs bg-teal-600/20 text-teal-300 border border-teal-500/30 hover:bg-teal-600/35"
              data-ocid={`approvals.item.${index + 1}.confirm_button`}
            >
              {isPending && pendingAction === `approve-${app.principalId}` ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              Approve
            </Button>
            <Button
              size="sm"
              disabled={
                isPending && pendingAction === `reject-${app.principalId}`
              }
              onClick={() => onReject(app)}
              className="text-xs bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/35"
              data-ocid={`approvals.item.${index + 1}.delete_button`}
            >
              {isPending && pendingAction === `reject-${app.principalId}` ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <ShieldOff className="w-3 h-3 mr-1" />
              )}
              Reject
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function ApprovalsContent() {
  const { data: applications = [], isLoading } = useListApprovals();
  const setApproval = useSetApproval();
  const { actor } = useActor();

  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<UserApplication | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [assigningRole, setAssigningRole] = useState<string>("user");

  const stats = useMemo(
    () => computeApprovalStats(applications),
    [applications],
  );

  const filtered = useMemo(() => {
    let list = applications;
    if (filterTab !== "all") {
      list = list.filter((a) => a.status === (filterTab as ApprovalStatus));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.displayName.toLowerCase().includes(q) ||
          a.orgName.toLowerCase().includes(q) ||
          a.principalId.toLowerCase().includes(q),
      );
    }
    return list;
  }, [applications, filterTab, search]);

  async function handleApprove(app: UserApplication) {
    const key = `approve-${app.principalId}`;
    setPendingAction(key);
    try {
      await setApproval.mutateAsync({
        principalId: app.principalId,
        status: ApprovalStatus.approved,
      });
      toast.success(`${app.displayName} approved successfully`);
    } catch {
      toast.error("Failed to approve. Please try again.");
    } finally {
      setPendingAction(null);
    }
  }

  async function handleReject(app: UserApplication) {
    const key = `reject-${app.principalId}`;
    setPendingAction(key);
    try {
      await setApproval.mutateAsync({
        principalId: app.principalId,
        status: ApprovalStatus.rejected,
      });
      toast.success(`${app.displayName}'s application rejected`);
    } catch {
      toast.error("Failed to reject. Please try again.");
    } finally {
      setPendingAction(null);
    }
  }

  async function handleAssignRole() {
    if (!selectedApp || !actor) return;
    try {
      const { Principal } = await import("@icp-sdk/core/principal");
      const principal = Principal.fromText(selectedApp.principalId);
      const roleValue = assigningRole as UserRole;
      const callableActor = actor as unknown as Record<
        string,
        (...args: unknown[]) => unknown
      >;
      const assignFn = callableActor.assignCallerUserRole;
      if (typeof assignFn === "function") {
        await assignFn(principal, roleValue);
      }
      toast.success(`Role updated to ${assigningRole}`);
    } catch {
      toast.error("Failed to assign role.");
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <div
        className="relative py-16 px-4"
        style={{ background: "var(--gradient-navy)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--gold)/0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--gold)/0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border mb-4"
            style={{
              color: "oklch(var(--gold))",
              borderColor: "oklch(var(--gold)/0.3)",
              background: "oklch(var(--gold)/0.08)",
            }}
          >
            Phase 11 — Area 2
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--gold))] animate-pulse" />
          </span>
          <h1
            className="text-3xl font-display font-bold tracking-tight mb-2"
            style={{ color: "oklch(var(--pearl))" }}
          >
            User Approval Dashboard
          </h1>
          <p className="text-[oklch(0.6_0.03_260)] text-sm mb-8">
            Review and approve platform access requests from around the world.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Pending",
                value: stats.pending,
                color: "text-amber-300",
              },
              {
                label: "Approved",
                value: stats.approved,
                color: "text-teal-300",
              },
              {
                label: "Rejected",
                value: stats.rejected,
                color: "text-red-300",
              },
              {
                label: "Total",
                value: stats.total,
                color: "text-[oklch(var(--pearl))]",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="cosmos-card rounded-xl px-4 py-3"
                style={{
                  background: "oklch(var(--cosmos-mid)/0.7)",
                  border: "1px solid oklch(1_0_0/0.08)",
                }}
                data-ocid={`approvals.stats.${stat.label.toLowerCase()}.card`}
              >
                <p className="text-xs text-[oklch(0.55_0.03_260)] mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold font-display ${stat.color}`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Tabs
            value={filterTab}
            onValueChange={(v) => setFilterTab(v as FilterTab)}
            data-ocid="approvals.filter.tab"
          >
            <TabsList className="bg-[oklch(var(--cosmos-mid))] border border-[oklch(1_0_0/0.07)]">
              {(["all", "pending", "approved", "rejected"] as FilterTab[]).map(
                (t) => (
                  <TabsTrigger
                    key={t}
                    value={t}
                    className="capitalize text-xs data-[state=active]:bg-[oklch(var(--gold)/0.15)] data-[state=active]:text-[oklch(var(--gold))]"
                    data-ocid={`approvals.${t}.tab`}
                  >
                    {t}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
          </Tabs>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.03_260)]" />
            <Input
              placeholder="Search by name or org..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[oklch(var(--cosmos-mid))] border-[oklch(1_0_0/0.08)] text-[oklch(0.9_0.01_95)] placeholder:text-[oklch(0.4_0.03_260)]"
              data-ocid="approvals.search.search_input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.45_0.03_260)] hover:text-[oklch(0.65_0.03_260)]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Applications list */}
        {isLoading ? (
          <div
            className="flex items-center justify-center py-20 text-[oklch(0.55_0.03_260)]"
            data-ocid="approvals.loading_state"
          >
            <Loader2 className="w-6 h-6 animate-spin mr-3" /> Loading
            applications...
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="cosmos-card rounded-2xl p-12 flex flex-col items-center text-center gap-4"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(1_0_0/0.07)",
            }}
            data-ocid="approvals.empty_state"
          >
            <Globe2 className="w-10 h-10 text-[oklch(0.4_0.03_260)]" />
            <p className="text-sm text-[oklch(0.55_0.03_260)]">
              No applications found
              {filterTab !== "all" ? ` in "${filterTab}"` : ""}.
            </p>
            {search && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearch("")}
                className="text-xs text-[oklch(var(--gold))]"
                data-ocid="approvals.clear_search.button"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((app, i) => (
              <ApplicationCard
                key={app.principalId}
                app={app}
                index={i}
                onSelect={setSelectedApp}
                onApprove={handleApprove}
                onReject={handleReject}
                isPending={setApproval.isPending}
                pendingAction={pendingAction}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedApp}
        onOpenChange={(open) => !open && setSelectedApp(null)}
      >
        <SheetContent
          className="w-full sm:max-w-lg overflow-y-auto"
          style={{
            background: "oklch(var(--cosmos-mid))",
            borderLeft: "1px solid oklch(var(--gold)/0.2)",
          }}
          data-ocid="approvals.detail.sheet"
        >
          {selectedApp && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <SheetTitle
                      className="text-lg font-display"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {selectedApp.displayName}
                    </SheetTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <StatusBadge status={selectedApp.status} />
                      <RoleBadge role={selectedApp.requestedRole} />
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-5">
                {/* Meta */}
                <div
                  className="rounded-xl p-4 flex flex-col gap-3 text-sm"
                  style={{
                    background: "oklch(var(--cosmos-deep))",
                    border: "1px solid oklch(1_0_0/0.07)",
                  }}
                >
                  {[
                    {
                      icon: Building2,
                      label: "Organization",
                      value: selectedApp.orgName,
                    },
                    {
                      icon: MapPin,
                      label: "Country",
                      value: selectedApp.country,
                    },
                    {
                      icon: Calendar,
                      label: "Submitted",
                      value: new Date(
                        selectedApp.submittedAt,
                      ).toLocaleDateString(),
                    },
                    {
                      icon: User,
                      label: "Principal",
                      value: `${selectedApp.principalId.slice(0, 28)}...`,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-[oklch(0.45_0.03_260)] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-[oklch(0.5_0.03_260)]">
                          {label}
                        </p>
                        <p className="text-sm text-[oklch(0.85_0.01_95)]">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Motivation */}
                {selectedApp.motivation && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.5_0.03_260)] flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5" /> Motivation
                    </h3>
                    <p className="text-sm text-[oklch(0.72_0.02_260)] leading-relaxed">
                      {selectedApp.motivation}
                    </p>
                  </div>
                )}

                {/* Actions */}
                {selectedApp.status === ApprovalStatus.pending && (
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-teal-600/20 text-teal-300 border border-teal-500/30 hover:bg-teal-600/35"
                      disabled={setApproval.isPending}
                      onClick={() => {
                        handleApprove(selectedApp);
                        setSelectedApp(null);
                      }}
                      data-ocid="approvals.detail.confirm_button"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Approve
                    </Button>
                    <Button
                      className="flex-1 bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/35"
                      disabled={setApproval.isPending}
                      onClick={() => {
                        handleReject(selectedApp);
                        setSelectedApp(null);
                      }}
                      data-ocid="approvals.detail.delete_button"
                    >
                      <ShieldOff className="w-4 h-4 mr-2" /> Reject
                    </Button>
                  </div>
                )}

                {/* Assign Role (for approved users) */}
                {selectedApp.status === ApprovalStatus.approved && (
                  <div
                    className="rounded-xl p-4 flex flex-col gap-3"
                    style={{
                      background: "oklch(var(--cosmos-deep))",
                      border: "1px solid oklch(var(--gold)/0.15)",
                    }}
                  >
                    <h3
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      Assign Backend Role
                    </h3>
                    <div className="flex gap-2">
                      <Select
                        value={assigningRole}
                        onValueChange={setAssigningRole}
                        data-ocid="approvals.detail.role.select"
                      >
                        <SelectTrigger className="flex-1 bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)] text-[oklch(0.85_0.01_95)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)]">
                          <SelectItem value={UserRole.admin}>Admin</SelectItem>
                          <SelectItem value={UserRole.user}>User</SelectItem>
                          <SelectItem value={UserRole.guest}>Guest</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleAssignRole}
                        className="btn-gold"
                        data-ocid="approvals.detail.save_button"
                      >
                        Assign
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  variant="ghost"
                  onClick={() => setSelectedApp(null)}
                  className="text-[oklch(0.55_0.03_260)] hover:text-[oklch(0.75_0.03_260)]"
                  data-ocid="approvals.detail.close_button"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function AdminApprovalsPage() {
  return (
    <RequireRole roles={["SuperAdmin", "OrgAdmin"]}>
      <ApprovalsContent />
    </RequireRole>
  );
}
