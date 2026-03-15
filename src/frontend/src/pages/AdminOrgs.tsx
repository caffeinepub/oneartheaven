import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ORG_STATUS_CONFIG,
  ORG_TYPE_CONFIG,
  type OrgStatus,
  type OrgType,
  type Organization,
} from "@/data/backendTypes";
import { getAllOrgs } from "@/data/orgData";
import { useCountUp } from "@/hooks/useCountUp";
import {
  Archive,
  BookOpen,
  Building2,
  ChevronRight,
  Clock,
  Coins,
  Filter,
  Globe,
  Leaf,
  Network,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Feature flag meta ──────────────────────────────────────────────────────
const FLAG_META: {
  key: keyof Omit<Organization["featureFlags"], "memberCap">;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "governance", label: "Governance", icon: Shield },
  { key: "finance", label: "Finance", icon: Coins },
  { key: "academy", label: "Academy", icon: BookOpen },
  { key: "sustainability", label: "Sustainability", icon: Leaf },
  { key: "transparency", label: "Transparency", icon: Globe },
  { key: "integrations", label: "Integrations", icon: Network },
];

const ORG_TYPES: OrgType[] = [
  "NGO",
  "Nation",
  "City",
  "Community",
  "Corporate",
  "Cooperative",
  "DAO",
  "Foundation",
];

const STATUS_FILTERS: Array<OrgStatus | "all"> = [
  "all",
  "active",
  "pending",
  "suspended",
  "archived",
];

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: string;
  delay: number;
}) {
  const count = useCountUp({ end: value, duration: 1200 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex flex-col items-center text-center gap-1.5 py-4 px-3"
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full mb-1"
        style={{
          background: `${accent}1a`,
          border: `1px solid ${accent}38`,
        }}
      >
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <div
        className="font-display text-3xl font-extrabold leading-none"
        style={{ color: accent }}
      >
        {count.toLocaleString()}
      </div>
      <div
        className="text-xs font-medium tracking-wide"
        style={{ color: "oklch(0.58 0.04 260)" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export function AdminOrgsPage() {
  const [orgs, setOrgs] = useState<Organization[]>(getAllOrgs);
  const [typeFilter, setTypeFilter] = useState<OrgType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<OrgStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "",
    type: "NGO" as OrgType,
    tier: "Seed",
    country: "",
    region: "",
    primaryColor: "#3b82f6",
  });

  // ─ Derived stats ──────────────────────────────────────────────────────────
  const totalOrgs = orgs.length;
  const activeOrgs = orgs.filter((o) => o.status === "active").length;
  const pendingOrgs = orgs.filter((o) => o.status === "pending").length;
  const avgMembers = Math.round(
    orgs.reduce((s, o) => s + o.memberCount, 0) / (orgs.length || 1),
  );

  // ─ Filtered list ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return orgs.filter((o) => {
      if (typeFilter !== "all" && o.type !== typeFilter) return false;
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (
        searchQuery &&
        !o.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !o.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [orgs, typeFilter, statusFilter, searchQuery]);

  // ─ Type counts for pills ──────────────────────────────────────────────────
  const typeCounts = useMemo(() => {
    const counts: Partial<Record<OrgType, number>> = {};
    for (const o of orgs) {
      counts[o.type] = (counts[o.type] ?? 0) + 1;
    }
    return counts;
  }, [orgs]);

  // ─ Handlers ───────────────────────────────────────────────────────────────
  function handleAddOrg() {
    if (!addForm.name.trim()) {
      toast.error("Organization name is required.");
      return;
    }
    const newOrg: Organization = {
      orgId: `org-${Date.now()}`,
      name: addForm.name.trim(),
      type: addForm.type,
      tier: addForm.tier,
      status: "pending",
      country: addForm.country || "TBD",
      region: addForm.region || "Global",
      logoUrl: "",
      description: `New ${addForm.type} organization.`,
      primaryColor: addForm.primaryColor,
      featureFlags: {
        governance: true,
        finance: false,
        academy: false,
        sustainability: false,
        transparency: false,
        integrations: false,
        memberCap: 1000,
      },
      memberCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrgs((prev) => [...prev, newOrg]);
    setShowAddDialog(false);
    setAddForm({
      name: "",
      type: "NGO",
      tier: "Seed",
      country: "",
      region: "",
      primaryColor: "#3b82f6",
    });
    toast.success(`Organization "${newOrg.name}" created successfully.`);
  }

  function handleSuspend() {
    if (!selectedOrg) return;
    setOrgs((prev) =>
      prev.map((o) =>
        o.orgId === selectedOrg.orgId
          ? { ...o, status: "suspended" as OrgStatus }
          : o,
      ),
    );
    setShowSuspendDialog(false);
    setShowDetailSheet(false);
    toast.success(`"${selectedOrg.name}" has been suspended.`);
  }

  function openDetail(org: Organization) {
    setSelectedOrg(org);
    setShowDetailSheet(true);
  }

  function resetFilters() {
    setTypeFilter("all");
    setStatusFilter("all");
    setSearchQuery("");
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="admin.orgs.page"
    >
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
        data-ocid="admin.orgs.hero.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.16 260 / 0.15) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden
        />
        <div
          className="absolute top-16 right-[8%] w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.16 260 / 0.07) 0%, transparent 70%)",
            filter: "blur(36px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "oklch(0.55 0.16 260 / 0.4)",
              background: "oklch(0.55 0.16 260 / 0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.72 0.15 260)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.15 260)" }}
            >
              Phase 11 · Multi-Tenancy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "oklch(var(--pearl))",
            }}
          >
            <span style={{ color: "oklch(0.72 0.15 260)" }}>Org</span>{" "}
            Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            Administer tenant organizations, configure feature flags, and manage
            membership caps.
          </motion.p>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <section
        data-ocid="admin.orgs.stats.section"
        className="relative py-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.04 260) 0%, oklch(0.12 0.045 260) 100%)",
          borderTop: "1px solid oklch(0.72 0.15 260 / 0.14)",
          borderBottom: "1px solid oklch(0.55 0.14 195 / 0.12)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Orgs"
              value={totalOrgs}
              icon={Building2}
              accent="oklch(0.72 0.15 260)"
              delay={0}
            />
            <StatCard
              label="Active Orgs"
              value={activeOrgs}
              icon={Zap}
              accent="oklch(0.68 0.18 155)"
              delay={0.07}
            />
            <StatCard
              label="Pending"
              value={pendingOrgs}
              icon={Clock}
              accent="oklch(0.72 0.18 75)"
              delay={0.14}
            />
            <StatCard
              label="Avg Members"
              value={avgMembers}
              icon={Users}
              accent="oklch(0.62 0.16 220)"
              delay={0.21}
            />
          </div>
        </div>
      </section>

      {/* ── Filter Bar ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setTypeFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              typeFilter === "all"
                ? "bg-[oklch(0.72_0.15_260/0.18)] border-[oklch(0.72_0.15_260/0.55)] text-[oklch(0.80_0.10_260)]"
                : "bg-transparent border-[oklch(1_0_0/0.08)] text-[oklch(0.55_0.04_260)] hover:border-[oklch(0.72_0.15_260/0.3)] hover:text-[oklch(0.75_0.08_260)]"
            }`}
            data-ocid="admin.orgs.type.tab"
          >
            All <span className="ml-1 opacity-70">{orgs.length}</span>
          </button>
          {ORG_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                typeFilter === type
                  ? "bg-[oklch(0.72_0.15_260/0.18)] border-[oklch(0.72_0.15_260/0.55)] text-[oklch(0.80_0.10_260)]"
                  : "bg-transparent border-[oklch(1_0_0/0.08)] text-[oklch(0.55_0.04_260)] hover:border-[oklch(0.72_0.15_260/0.3)] hover:text-[oklch(0.75_0.08_260)]"
              }`}
              data-ocid="admin.orgs.type.tab"
            >
              {ORG_TYPE_CONFIG[type].label}
              {typeCounts[type] ? (
                <span className="ml-1 opacity-70">{typeCounts[type]}</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Status pills + search + add */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.5 0.04 260)" }}
            />
            {STATUS_FILTERS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
                  statusFilter === s
                    ? "bg-[oklch(0.72_0.15_260/0.15)] border-[oklch(0.72_0.15_260/0.5)] text-[oklch(0.78_0.09_260)]"
                    : "bg-transparent border-[oklch(1_0_0/0.07)] text-[oklch(0.50_0.04_260)] hover:text-[oklch(0.70_0.06_260)]"
                }`}
                data-ocid="admin.orgs.status.tab"
              >
                {s === "all" ? "All Status" : ORG_STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: "oklch(0.5 0.04 260)" }}
              />
              <input
                type="text"
                placeholder="Search orgs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8 py-1.5 rounded-lg text-sm border outline-none focus:ring-2 w-52"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  borderColor: "oklch(1 0 0 / 0.1)",
                  color: "oklch(var(--pearl))",
                }}
                data-ocid="admin.orgs.search_input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X
                    className="h-3 w-3"
                    style={{ color: "oklch(0.5 0.04 260)" }}
                  />
                </button>
              )}
            </div>

            <Button
              size="sm"
              className="gap-1.5 text-xs"
              style={{
                background: "oklch(0.72 0.15 260)",
                color: "oklch(0.98 0.01 260)",
              }}
              onClick={() => setShowAddDialog(true)}
              data-ocid="admin.orgs.add.open_modal_button"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Org
            </Button>
          </div>
        </div>
      </section>

      {/* ── Orgs Grid ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
            data-ocid="admin.orgs.empty_state"
          >
            <XCircle
              className="h-12 w-12"
              style={{ color: "oklch(0.40 0.06 260)" }}
            />
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 260)" }}>
              No organizations match your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-xs"
              style={{
                borderColor: "oklch(0.72 0.15 260 / 0.4)",
                color: "oklch(0.72 0.15 260)",
              }}
            >
              Reset Filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((org, idx) => (
              <OrgCard
                key={org.orgId}
                org={org}
                index={idx + 1}
                onView={() => openDetail(org)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Create Org Dialog ──────────────────────────────────────── */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent
          className="max-w-md"
          style={{
            background: "oklch(0.13 0.04 260)",
            border: "1px solid oklch(0.72 0.15 260 / 0.25)",
          }}
          data-ocid="admin.orgs.add.dialog"
        >
          <DialogHeader>
            <DialogTitle
              className="font-display text-lg"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Create Organization
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.70 0.04 260)" }}>Name *</Label>
              <Input
                placeholder="Organization name"
                value={addForm.name}
                onChange={(e) =>
                  setAddForm((p) => ({ ...p, name: e.target.value }))
                }
                style={{
                  background: "oklch(0.10 0.03 260)",
                  borderColor: "oklch(1 0 0 / 0.1)",
                  color: "oklch(var(--pearl))",
                }}
                data-ocid="admin.orgs.add.input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label style={{ color: "oklch(0.70 0.04 260)" }}>Type</Label>
                <Select
                  value={addForm.type}
                  onValueChange={(v) =>
                    setAddForm((p) => ({ ...p, type: v as OrgType }))
                  }
                >
                  <SelectTrigger
                    style={{
                      background: "oklch(0.10 0.03 260)",
                      borderColor: "oklch(1 0 0 / 0.1)",
                      color: "oklch(var(--pearl))",
                    }}
                    data-ocid="admin.orgs.add.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORG_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {ORG_TYPE_CONFIG[t].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label style={{ color: "oklch(0.70 0.04 260)" }}>Tier</Label>
                <Select
                  value={addForm.tier}
                  onValueChange={(v) => setAddForm((p) => ({ ...p, tier: v }))}
                >
                  <SelectTrigger
                    style={{
                      background: "oklch(0.10 0.03 260)",
                      borderColor: "oklch(1 0 0 / 0.1)",
                      color: "oklch(var(--pearl))",
                    }}
                    data-ocid="admin.orgs.add.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Seed", "Growth", "Scale", "Global"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label style={{ color: "oklch(0.70 0.04 260)" }}>Country</Label>
                <Input
                  placeholder="e.g. Kenya"
                  value={addForm.country}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, country: e.target.value }))
                  }
                  style={{
                    background: "oklch(0.10 0.03 260)",
                    borderColor: "oklch(1 0 0 / 0.1)",
                    color: "oklch(var(--pearl))",
                  }}
                  data-ocid="admin.orgs.add.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label style={{ color: "oklch(0.70 0.04 260)" }}>Region</Label>
                <Input
                  placeholder="e.g. Africa"
                  value={addForm.region}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, region: e.target.value }))
                  }
                  style={{
                    background: "oklch(0.10 0.03 260)",
                    borderColor: "oklch(1 0 0 / 0.1)",
                    color: "oklch(var(--pearl))",
                  }}
                  data-ocid="admin.orgs.add.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.70 0.04 260)" }}>
                Primary Color
              </Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={addForm.primaryColor}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, primaryColor: e.target.value }))
                  }
                  className="w-10 h-10 rounded cursor-pointer border-0"
                  data-ocid="admin.orgs.add.input"
                />
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {addForm.primaryColor}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowAddDialog(false)}
              style={{ color: "oklch(0.6 0.04 260)" }}
              data-ocid="admin.orgs.add.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddOrg}
              style={{
                background: "oklch(0.72 0.15 260)",
                color: "oklch(0.98 0.01 260)",
              }}
              data-ocid="admin.orgs.add.submit_button"
            >
              Create Organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Org Detail Sheet ───────────────────────────────────────── */}
      {selectedOrg && (
        <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
          <SheetContent
            className="w-full sm:max-w-xl overflow-y-auto"
            style={{
              background: "oklch(0.12 0.04 260)",
              borderLeft: "1px solid oklch(0.72 0.15 260 / 0.2)",
            }}
            data-ocid="admin.orgs.detail.sheet"
          >
            <SheetHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <SheetTitle
                    className="font-display text-xl"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {selectedOrg.name}
                  </SheetTitle>
                  <Badge
                    className={`text-xs ${ORG_TYPE_CONFIG[selectedOrg.type].color} bg-transparent border`}
                    style={{ borderColor: "oklch(1 0 0 / 0.12)" }}
                  >
                    {ORG_TYPE_CONFIG[selectedOrg.type].label}
                  </Badge>
                  <Badge
                    className={`text-xs ${ORG_STATUS_CONFIG[selectedOrg.status].color} bg-transparent border`}
                    style={{ borderColor: "oklch(1 0 0 / 0.12)" }}
                  >
                    {ORG_STATUS_CONFIG[selectedOrg.status].label}
                  </Badge>
                </div>
              </div>
            </SheetHeader>

            <div className="space-y-6">
              {/* Info grid */}
              <div
                className="rounded-xl p-4 space-y-3"
                style={{
                  background: "oklch(0.10 0.03 260)",
                  border: "1px solid oklch(1 0 0 / 0.07)",
                }}
              >
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  Organization Info
                </h4>
                {(
                  [
                    ["Org ID", selectedOrg.orgId],
                    ["Country", selectedOrg.country],
                    ["Region", selectedOrg.region],
                    ["Tier", selectedOrg.tier],
                    ["Members", selectedOrg.memberCount.toLocaleString()],
                    [
                      "Created",
                      new Date(selectedOrg.createdAt).toLocaleDateString(),
                    ],
                    [
                      "Updated",
                      new Date(selectedOrg.updatedAt).toLocaleDateString(),
                    ],
                  ] as [string, string | number][]
                ).map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span style={{ color: "oklch(0.55 0.04 260)" }}>
                      {label}
                    </span>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "oklch(0.78 0.04 260)" }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.62 0.04 260)" }}
              >
                {selectedOrg.description}
              </p>

              <Separator style={{ background: "oklch(1 0 0 / 0.07)" }} />

              {/* Feature flags */}
              <div>
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  Feature Flags
                </h4>
                <div className="space-y-2.5">
                  {FLAG_META.map(({ key, label, icon: Icon }) => {
                    const enabled = selectedOrg.featureFlags[key];
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: enabled
                                ? "oklch(0.62 0.18 195)"
                                : "oklch(0.35 0.03 260)",
                            }}
                          />
                          <Icon
                            className="h-3.5 w-3.5"
                            style={{
                              color: enabled
                                ? "oklch(0.62 0.18 195)"
                                : "oklch(0.40 0.04 260)",
                            }}
                          />
                          <span
                            className="text-sm"
                            style={{
                              color: enabled
                                ? "oklch(0.78 0.04 260)"
                                : "oklch(0.48 0.04 260)",
                            }}
                          >
                            {label}
                          </span>
                        </div>
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: enabled
                              ? "oklch(0.62 0.18 195)"
                              : "oklch(0.40 0.04 260)",
                          }}
                        >
                          {enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Settings
                        className="h-3.5 w-3.5"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.62 0.04 260)" }}
                      >
                        Member Cap
                      </span>
                    </div>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "oklch(0.72 0.15 260)" }}
                    >
                      {selectedOrg.featureFlags.memberCap.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator style={{ background: "oklch(1 0 0 / 0.07)" }} />

              {/* Footer actions */}
              <div className="pb-4">
                <Button
                  variant="outline"
                  className="w-full gap-2 text-sm"
                  style={{
                    borderColor: "oklch(0.55 0.18 27 / 0.5)",
                    color: "oklch(0.65 0.18 27)",
                    background: "oklch(0.55 0.18 27 / 0.06)",
                  }}
                  onClick={() => setShowSuspendDialog(true)}
                  data-ocid="admin.orgs.detail.delete_button"
                >
                  <Archive className="h-4 w-4" />
                  Suspend Org
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* ── Suspend AlertDialog ────────────────────────────────────── */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent
          style={{
            background: "oklch(0.13 0.04 260)",
            border: "1px solid oklch(0.55 0.18 27 / 0.35)",
          }}
          data-ocid="admin.orgs.suspend.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="font-display"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Suspend {selectedOrg?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "oklch(0.62 0.04 260)" }}>
              This will suspend the organization and restrict access for all its
              members. The org can be reactivated later by a SuperAdmin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{ color: "oklch(0.6 0.04 260)" }}
              data-ocid="admin.orgs.suspend.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspend}
              style={{
                background: "oklch(0.55 0.18 27)",
                color: "oklch(0.98 0.01 27)",
              }}
              data-ocid="admin.orgs.suspend.confirm_button"
            >
              Confirm Suspend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

// ─── Org Card ──────────────────────────────────────────────────────────────
function OrgCard({
  org,
  index,
  onView,
}: {
  org: Organization;
  index: number;
  onView: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: ((index - 1) % 3) * 0.07 }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.14 0.04 260) 0%, oklch(0.12 0.035 260) 100%)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        borderLeft: `3px solid ${org.primaryColor}`,
      }}
      data-ocid={`admin.orgs.item.${index}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${org.primaryColor}0d 0%, transparent 65%)`,
        }}
      />

      <div className="relative p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="font-display text-base font-bold leading-snug mb-1"
              style={{ color: "oklch(var(--pearl))" }}
            >
              {org.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-semibold ${ORG_TYPE_CONFIG[org.type].color}`}
              >
                {ORG_TYPE_CONFIG[org.type].label}
              </span>
              <span style={{ color: "oklch(0.3 0.02 260)" }}>·</span>
              <span
                className={`text-xs font-medium ${ORG_STATUS_CONFIG[org.status].color}`}
              >
                {ORG_STATUS_CONFIG[org.status].label}
              </span>
            </div>
          </div>
          {/* FF Tier badge */}
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: "oklch(0.72 0.16 75 / 0.12)",
              border: "1px solid oklch(0.72 0.16 75 / 0.3)",
              color: "oklch(0.72 0.16 75)",
            }}
          >
            {org.tier}
          </span>
        </div>

        {/* Country / region */}
        <div
          className="flex items-center gap-1.5 text-xs mb-3"
          style={{ color: "oklch(0.55 0.04 260)" }}
        >
          <Globe className="h-3 w-3 flex-shrink-0" />
          {org.country} · {org.region}
        </div>

        {/* Member count */}
        <div
          className="flex items-center gap-1.5 text-xs mb-4"
          style={{ color: "oklch(0.58 0.04 260)" }}
        >
          <Users className="h-3 w-3 flex-shrink-0" />
          {org.memberCount.toLocaleString()} members
        </div>

        {/* Feature flag dots */}
        <div className="flex items-center gap-1.5 mb-4" title="Feature flags">
          {FLAG_META.map(({ key, label }) => (
            <span
              key={key}
              title={`${label}: ${org.featureFlags[key] ? "enabled" : "disabled"}`}
              className="w-2 h-2 rounded-full"
              style={{
                background: org.featureFlags[key]
                  ? "oklch(0.62 0.18 195)"
                  : "oklch(0.28 0.03 260)",
              }}
            />
          ))}
          <span
            className="text-xs ml-1"
            style={{ color: "oklch(0.42 0.04 260)" }}
          >
            features
          </span>
        </div>

        {/* View button */}
        <Button
          size="sm"
          variant="ghost"
          className="w-full gap-1.5 text-xs justify-between group-hover:bg-[oklch(1_0_0/0.04)] transition-colors"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.07)",
            borderRadius: "0 0 8px 8px",
            color: org.primaryColor,
          }}
          onClick={onView}
        >
          View Details
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}
