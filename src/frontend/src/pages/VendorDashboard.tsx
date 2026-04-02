import { RequireRole } from "@/components/RequireRole";
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
import { Progress } from "@/components/ui/progress";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getListingsByVendor } from "@/data/marketplaceData";
import {
  LISTING_STATUS_CONFIG,
  LISTING_TIER_CONFIG,
  LISTING_TYPE_CONFIG,
} from "@/data/marketplaceTypes";
import type {
  VendorCategory,
  VendorListing,
  VendorListingStatus,
  VendorListingType,
  VendorRevenuePeriod,
  VendorTier,
} from "@/data/vendorTypes";
import {
  VENDOR_LISTING_STATUS_CONFIG,
  VENDOR_LISTING_TYPE_CONFIG,
  VENDOR_REVENUE_STATUS_CONFIG,
  VENDOR_TIER_CONFIG,
} from "@/data/vendorTypes";
import {
  useVendorListings,
  useVendorProfile,
  useVendorRevenue,
  useVendorStats,
  useVendorTierProgress,
} from "@/hooks/useVendor";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  DollarSign,
  Edit2,
  Globe,
  LayoutDashboard,
  ListFilter,
  Plus,
  Receipt,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const VENDOR_ID = "vendor-001";

const FINANCE_CATEGORIES: VendorCategory[] = [
  "Governance",
  "Economy",
  "Education",
  "Climate",
  "Health",
  "Peace",
  "Technology",
  "Culture",
  "Food",
  "Assembly",
];

const REVENUE_PERIODS: Array<VendorRevenuePeriod | "all"> = [
  "all",
  "Q1 2025",
  "Q2 2025",
  "Q3 2025",
  "Q4 2025",
];

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Add/Edit Listing Form ─────────────────────────────────────────────────
interface ListingFormState {
  type: VendorListingType;
  title: string;
  category: VendorCategory;
  description: string;
  targetAmount: string;
  nationsCount: string;
  finfracfranTier: VendorTier;
}

const DEFAULT_FORM: ListingFormState = {
  type: "franchise",
  title: "",
  category: "Governance",
  description: "",
  targetAmount: "",
  nationsCount: "",
  finfracfranTier: "Seed",
};

function listingToForm(l: VendorListing): ListingFormState {
  return {
    type: l.type,
    title: l.title,
    category: l.category,
    description: l.description,
    targetAmount: String(l.targetAmount),
    nationsCount: String(l.nationsCount),
    finfracfranTier: l.finfracfranTier,
  };
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export function VendorDashboardPage() {
  return (
    <RequireRole roles={["Vendor", "SuperAdmin", "OrgAdmin"]}>
      <VendorDashboardInner />
    </RequireRole>
  );
}

function VendorDashboardInner() {
  const { profile } = useVendorProfile(VENDOR_ID);
  const listings = useVendorListings(VENDOR_ID);
  const revenue = useVendorRevenue(VENDOR_ID);
  const stats = useVendorStats(VENDOR_ID);
  const tierProgress = useVendorTierProgress(stats);

  const [addForm, setAddForm] = useState<ListingFormState>(DEFAULT_FORM);
  const [editForm, setEditForm] = useState<ListingFormState>(DEFAULT_FORM);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutDestination, setPayoutDestination] = useState("");

  function handleOpenEdit(l: VendorListing) {
    setEditForm(listingToForm(l));
    listings.openEdit(l);
  }

  function handleAddSubmit() {
    if (!addForm.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const newListing: VendorListing = {
      id: `listing-new-${Date.now()}`,
      vendorId: VENDOR_ID,
      orgId: profile?.orgId ?? "",
      type: addForm.type,
      title: addForm.title,
      category: addForm.category,
      description: addForm.description,
      status: "draft",
      targetAmount: Number(addForm.targetAmount) || 0,
      nationsCount: Number(addForm.nationsCount) || 0,
      finfracfranTier: addForm.finfracfranTier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    listings.addListing(newListing);
    setAddForm(DEFAULT_FORM);
    toast.success("Listing added successfully");
  }

  function handleEditSubmit() {
    if (!listings.editTarget) return;
    const updated: VendorListing = {
      ...listings.editTarget,
      type: editForm.type,
      title: editForm.title,
      category: editForm.category,
      description: editForm.description,
      targetAmount: Number(editForm.targetAmount) || 0,
      nationsCount: Number(editForm.nationsCount) || 0,
      finfracfranTier: editForm.finfracfranTier,
      updatedAt: new Date().toISOString(),
    };
    listings.saveListing(updated);
    toast.success("Listing updated");
  }

  function handleDeleteConfirm() {
    listings.deleteListing();
    toast.success("Listing deleted");
  }

  function handlePayoutSubmit() {
    revenue.closePayout();
    setPayoutAmount("");
    setPayoutDestination("");
    toast.success(
      "Payout request submitted. Processing within 3–5 business days.",
    );
  }

  const tierCfg = profile ? VENDOR_TIER_CONFIG[profile.finfracfranTier] : null;
  const recentListings = listings.listings.slice(0, 5);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-cosmos)" }}
    >
      {/* Isolation banner */}
      {profile && (
        <div className="bg-slate-800/80 border-b border-slate-700/50 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              You are managing listings and revenue for{" "}
              <span className="text-teal-400 font-medium">{profile.name}</span>{" "}
              only. Switching organizations will update this view.
            </span>
          </div>
        </div>
      )}

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        data-ocid="vendor.dashboard.hero"
        className="relative overflow-hidden py-16 px-4"
        style={{ background: "var(--gradient-teal)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Phase 11 · Area 6
              </span>
              {tierCfg && (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${tierCfg.bg} ${tierCfg.color} border-current/30`}
                >
                  <Star className="w-3 h-3" />
                  FinFracFran™ {profile?.finfracfranTier}
                </span>
              )}
              {profile && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/60 text-slate-300 border border-slate-600/50">
                  <Building2 className="w-3 h-3" />
                  {profile.type}
                </span>
              )}
            </div>

            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {profile?.name ?? "Vendor Dashboard"}
              </h1>
              <p className="mt-2 text-teal-200/80 text-lg">
                Vendor Self-Service Portal
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() =>
                  document
                    .getElementById("listings-full")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Manage Listings
              </Button>
              <Button
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() =>
                  document
                    .getElementById("revenue")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Receipt className="w-4 h-4 mr-2" />
                Revenue & Payouts
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────── */}
      <section
        data-ocid="vendor.dashboard.stats_panel"
        className="px-4 py-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              label: "Active Listings",
              value: stats?.activeListings ?? 0,
              icon: <ListFilter className="w-4 h-4" />,
              color: "text-teal-400",
            },
            {
              label: "Total Listings",
              value: stats?.totalListings ?? 0,
              icon: <LayoutDashboard className="w-4 h-4" />,
              color: "text-slate-300",
            },
            {
              label: "Total Revenue",
              value: formatUSD(stats?.totalGrossRevenue ?? 0),
              icon: <DollarSign className="w-4 h-4" />,
              color: "text-emerald-400",
              raw: true,
            },
            {
              label: "FF™ Earnings",
              value: formatUSD(stats?.totalFinfracfranEarnings ?? 0),
              icon: <Star className="w-4 h-4" />,
              color: "text-yellow-400",
              raw: true,
            },
            {
              label: "Nations Reached",
              value: stats?.nationsReached ?? 0,
              icon: <Globe className="w-4 h-4" />,
              color: "text-blue-400",
            },
            {
              label: "Pending Payouts",
              value: formatUSD(stats?.pendingPayouts ?? 0),
              icon: <TrendingUp className="w-4 h-4" />,
              color: "text-amber-400",
              raw: true,
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2"
            >
              <div className={`${s.color}`}>{s.icon}</div>
              <div className={`font-display font-bold text-xl ${s.color}`}>
                {s.value}
              </div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-12">
        {/* ── Quick Actions ─────────────────────────────────────────── */}
        <section data-ocid="vendor.dashboard.quick_actions.panel">
          <h2 className="font-display font-bold text-xl text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: <Plus className="w-6 h-6" />,
                label: "Add Listing",
                desc: "Create a new franchise, campaign, or enterprise listing",
                color: "text-teal-400",
                bg: "bg-teal-400/10 border-teal-500/30",
                ocid: "vendor.dashboard.quick_actions.add_listing.button",
                action: () => listings.openAdd(),
              },
              {
                icon: <Upload className="w-6 h-6" />,
                label: "Upload Report",
                desc: "Submit vendor activity and performance reports",
                color: "text-blue-400",
                bg: "bg-blue-400/10 border-blue-500/30",
                ocid: "vendor.dashboard.quick_actions.upload_report.button",
                action: () => toast.info("Report upload coming soon"),
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                label: "Request Payout",
                desc: "Submit a payout request for pending revenue",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10 border-emerald-500/30",
                ocid: "vendor.dashboard.quick_actions.request_payout.button",
                action: () => {
                  setPayoutAmount(String(stats?.pendingPayouts ?? ""));
                  revenue.openPayout(
                    revenue.allRecords.find((r) => r.status === "pending") ??
                      revenue.allRecords[0],
                  );
                },
              },
              {
                icon: <Zap className="w-6 h-6" />,
                label: "View Applications",
                desc: "Review vendor onboarding and partner applications",
                color: "text-violet-400",
                bg: "bg-violet-400/10 border-violet-500/30",
                ocid: "vendor.dashboard.quick_actions.view_applications.button",
                action: () => {
                  window.location.href = "/register";
                },
              },
            ].map((a) => (
              <motion.button
                key={a.label}
                data-ocid={a.ocid}
                onClick={a.action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-slate-900/60 border rounded-xl p-5 text-left flex flex-col gap-3 transition-all cursor-pointer ${a.bg}`}
              >
                <div className={a.color}>{a.icon}</div>
                <div>
                  <p className="font-semibold text-white text-sm">{a.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── Recent Listings Table ────────────────────────────────── */}
        <section id="listings">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-white">
              Recent Listings
            </h2>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white hover:border-teal-500"
              onClick={() =>
                document
                  .getElementById("listings-full")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <Table data-ocid="vendor.dashboard.listings.table">
              <TableHeader>
                <TableRow className="border-slate-700/50 hover:bg-transparent">
                  <TableHead className="text-slate-400">Type</TableHead>
                  <TableHead className="text-slate-400">Title</TableHead>
                  <TableHead className="text-slate-400 hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400 hidden lg:table-cell">
                    Nations
                  </TableHead>
                  <TableHead className="text-slate-400 hidden lg:table-cell">
                    FF™ Tier
                  </TableHead>
                  <TableHead className="text-slate-400 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentListings.map((l, idx) => {
                  const typeCfg = VENDOR_LISTING_TYPE_CONFIG[l.type];
                  const statusCfg = VENDOR_LISTING_STATUS_CONFIG[l.status];
                  const lTierCfg = VENDOR_TIER_CONFIG[l.finfracfranTier];
                  return (
                    <TableRow
                      key={l.id}
                      data-ocid={`vendor.dashboard.listings.item.${idx + 1}`}
                      className="border-slate-700/50 hover:bg-slate-800/40"
                    >
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeCfg.bg} ${typeCfg.color}`}
                        >
                          {typeCfg.label}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-slate-200 max-w-[180px] truncate">
                        {l.title}
                      </TableCell>
                      <TableCell className="text-slate-400 hidden md:table-cell">
                        {l.category}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusCfg.bg} ${statusCfg.color}`}
                        >
                          {statusCfg.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-300 hidden lg:table-cell">
                        {l.nationsCount}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lTierCfg.bg} ${lTierCfg.color}`}
                        >
                          {l.finfracfranTier}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            data-ocid={`vendor.dashboard.listings.edit_button.${idx + 1}`}
                            onClick={() => handleOpenEdit(l)}
                            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-teal-400 transition-colors"
                            aria-label="Edit listing"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            data-ocid={`vendor.dashboard.listings.delete_button.${idx + 1}`}
                            onClick={() => listings.openDelete(l)}
                            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                            aria-label="Delete listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* ── Full Listings Management ─────────────────────────────── */}
        <section id="listings-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-white">
              Listings Management
            </h2>
            <Button
              data-ocid="vendor.dashboard.listings.add_button"
              onClick={listings.openAdd}
              className="bg-teal-600 hover:bg-teal-500 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Listing
            </Button>
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-6">
            <Tabs
              value={listings.typeFilter}
              onValueChange={(v) =>
                listings.setTypeFilter(v as VendorListingType | "all")
              }
            >
              <TabsList className="bg-slate-900/60 border border-slate-700/50">
                {(["all", "franchise", "campaign", "enterprise"] as const).map(
                  (t) => (
                    <TabsTrigger
                      key={t}
                      value={t}
                      data-ocid="vendor.dashboard.listings.type.tab"
                      className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-slate-400"
                    >
                      {t === "all"
                        ? `All (${listings.typeCounts.all})`
                        : `${VENDOR_LISTING_TYPE_CONFIG[t].label} (${listings.typeCounts[t]})`}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex flex-wrap gap-2">
                {(["all", "active", "draft", "pending", "closed"] as const).map(
                  (s) => (
                    <button
                      type="button"
                      key={s}
                      data-ocid="vendor.dashboard.listings.status.tab"
                      onClick={() =>
                        listings.setStatusFilter(
                          s as VendorListingStatus | "all",
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        listings.statusFilter === s
                          ? "bg-teal-600/30 border-teal-500/60 text-teal-300"
                          : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {s === "all"
                        ? "All"
                        : VENDOR_LISTING_STATUS_CONFIG[s].label}
                    </button>
                  ),
                )}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <div className="relative">
                  <Input
                    data-ocid="vendor.dashboard.listings.search_input"
                    placeholder="Search listings…"
                    value={listings.search}
                    onChange={(e) => listings.setSearch(e.target.value)}
                    className="w-48 bg-slate-800/60 border-slate-600 text-slate-200 placeholder:text-slate-500 pr-8"
                  />
                  {listings.search && (
                    <button
                      type="button"
                      onClick={() => listings.setSearch("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cards grid */}
          {listings.filteredListings.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-12 text-center">
              <ListFilter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">
                No listings match your filters
              </p>
              <button
                type="button"
                onClick={() => {
                  listings.setTypeFilter("all");
                  listings.setStatusFilter("all");
                  listings.setSearch("");
                }}
                className="mt-2 text-xs text-teal-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {listings.filteredListings.map((l, idx) => {
                  const typeCfg = VENDOR_LISTING_TYPE_CONFIG[l.type];
                  const statusCfg = VENDOR_LISTING_STATUS_CONFIG[l.status];
                  const lTierCfg = VENDOR_TIER_CONFIG[l.finfracfranTier];
                  return (
                    <motion.div
                      key={l.id}
                      data-ocid={`vendor.dashboard.listings.item.${idx + 1}`}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                      className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 flex flex-col gap-3 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeCfg.bg} ${typeCfg.color}`}
                        >
                          {typeCfg.label}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusCfg.bg} ${statusCfg.color}`}
                        >
                          {statusCfg.label}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-white text-sm leading-snug">
                          {l.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {l.category}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-800/60 rounded-lg p-2">
                          <p className="text-xs text-slate-500">Target</p>
                          <p className="text-xs font-semibold text-slate-200">
                            {formatUSD(l.targetAmount)}
                          </p>
                        </div>
                        <div className="bg-slate-800/60 rounded-lg p-2">
                          <p className="text-xs text-slate-500">Nations</p>
                          <p className="text-xs font-semibold text-slate-200">
                            {l.nationsCount}
                          </p>
                        </div>
                        <div className="bg-slate-800/60 rounded-lg p-2">
                          <p className="text-xs text-slate-500">Tier</p>
                          <p
                            className={`text-xs font-semibold ${lTierCfg.color}`}
                          >
                            {l.finfracfranTier}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Button
                          data-ocid={`vendor.dashboard.listings.edit_button.${idx + 1}`}
                          size="sm"
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-300 hover:border-teal-500 hover:text-teal-300 text-xs"
                          onClick={() => handleOpenEdit(l)}
                        >
                          <Edit2 className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <Button
                          data-ocid={`vendor.dashboard.listings.delete_button.${idx + 1}`}
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-400 hover:border-red-500 hover:text-red-400 text-xs"
                          onClick={() => listings.openDelete(l)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ── Revenue & FF™ Attribution ─────────────────────────────── */}
        {/* u2500u2500 Marketplace Listings u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500u2500 */}
        <VendorMarketplaceSection vendorId={VENDOR_ID} />
        <section id="revenue">
          <h2 className="font-display font-bold text-xl text-white mb-6">
            Revenue & FinFracFran™ Attribution
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue table */}
            <div className="lg:col-span-2 space-y-4">
              <Tabs
                value={revenue.periodFilter}
                onValueChange={(v) =>
                  revenue.setPeriodFilter(v as VendorRevenuePeriod | "all")
                }
              >
                <TabsList className="bg-slate-900/60 border border-slate-700/50 flex-wrap h-auto gap-1">
                  {REVENUE_PERIODS.map((p) => (
                    <TabsTrigger
                      key={p}
                      value={p}
                      data-ocid="vendor.dashboard.revenue.period.tab"
                      className="data-[state=active]:bg-yellow-600/80 data-[state=active]:text-white text-slate-400 text-xs"
                    >
                      {p === "all" ? "All Periods" : p}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden">
                <Table data-ocid="vendor.dashboard.revenue.table">
                  <TableHeader>
                    <TableRow className="border-slate-700/50 hover:bg-transparent">
                      <TableHead className="text-slate-400 text-xs">
                        Period
                      </TableHead>
                      <TableHead className="text-slate-400 text-xs">
                        Gross Revenue
                      </TableHead>
                      <TableHead className="text-slate-400 text-xs hidden md:table-cell">
                        FF™ %
                      </TableHead>
                      <TableHead className="text-slate-400 text-xs hidden md:table-cell">
                        FF™ Share
                      </TableHead>
                      <TableHead className="text-slate-400 text-xs">
                        Net Revenue
                      </TableHead>
                      <TableHead className="text-slate-400 text-xs">
                        Status
                      </TableHead>
                      <TableHead className="text-slate-400 text-xs text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenue.filteredRecords.map((r, idx) => {
                      const revCfg = VENDOR_REVENUE_STATUS_CONFIG[r.status];
                      return (
                        <TableRow
                          key={r.id}
                          className="border-slate-700/50 hover:bg-slate-800/40"
                        >
                          <TableCell className="text-slate-200 font-medium text-sm">
                            {r.period}
                          </TableCell>
                          <TableCell className="text-slate-300 text-sm">
                            {formatUSD(r.grossRevenue)}
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm hidden md:table-cell">
                            {r.finfracfranSharePct}%
                          </TableCell>
                          <TableCell className="text-yellow-400 text-sm hidden md:table-cell">
                            {formatUSD(r.finfracfranShare)}
                          </TableCell>
                          <TableCell className="text-emerald-400 text-sm font-semibold">
                            {formatUSD(r.netRevenue)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${revCfg.bg} ${revCfg.color}`}
                            >
                              {revCfg.label}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {r.status === "pending" ? (
                              <Button
                                data-ocid={`vendor.dashboard.revenue.payout_button.${idx + 1}`}
                                size="sm"
                                className="bg-emerald-700/60 hover:bg-emerald-600 text-emerald-200 text-xs h-7"
                                onClick={() => {
                                  setPayoutAmount(String(r.netRevenue));
                                  revenue.openPayout(r);
                                }}
                              >
                                Request Payout
                              </Button>
                            ) : (
                              <span className="text-slate-600 text-xs">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}

                    {/* Totals row */}
                    <TableRow className="border-t-2 border-slate-600 bg-slate-800/40 hover:bg-slate-800/40">
                      <TableCell className="font-bold text-white text-sm">
                        Total
                      </TableCell>
                      <TableCell className="font-bold text-white text-sm">
                        {formatUSD(revenue.totals.gross)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell" />
                      <TableCell className="font-bold text-yellow-400 text-sm hidden md:table-cell">
                        {formatUSD(revenue.totals.ff)}
                      </TableCell>
                      <TableCell className="font-bold text-emerald-400 text-sm">
                        {formatUSD(revenue.totals.net)}
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* FF™ Tier Progress */}
            {tierProgress && (
              <div
                data-ocid="vendor.dashboard.tier_progress.panel"
                className="bg-slate-900/60 border border-yellow-500/20 rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-display font-bold text-white text-sm">
                    FF™ Tier Progression
                  </h3>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${VENDOR_TIER_CONFIG[tierProgress.currentTier].bg} ${VENDOR_TIER_CONFIG[tierProgress.currentTier].color}`}
                    >
                      {tierProgress.currentTier}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Current</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="text-center">
                    {tierProgress.nextTier ? (
                      <>
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${VENDOR_TIER_CONFIG[tierProgress.nextTier].bg} ${VENDOR_TIER_CONFIG[tierProgress.nextTier].color}`}
                        >
                          {tierProgress.nextTier}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Next</p>
                      </>
                    ) : (
                      <>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-yellow-400/10 text-yellow-400">
                          Max Tier
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Achieved</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={tierProgress.progressPct}
                    className="h-2 bg-slate-800"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{tierProgress.progressPct.toFixed(0)}% complete</span>
                    {tierProgress.nextTier && tierProgress.nextMilestone && (
                      <span>
                        {formatUSD(
                          tierProgress.nextMilestone -
                            tierProgress.totalRevenue,
                        )}{" "}
                        to go
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Milestones
                  </p>
                  {(["Seed", "Growth", "Scale", "Global"] as VendorTier[]).map(
                    (t) => {
                      const m = VENDOR_TIER_CONFIG[t].milestone;
                      const reached =
                        tierProgress.totalRevenue >= (t === "Seed" ? 0 : m);
                      return (
                        <div
                          key={t}
                          className="flex items-center justify-between text-xs"
                        >
                          <span
                            className={
                              reached
                                ? VENDOR_TIER_CONFIG[t].color
                                : "text-slate-600"
                            }
                          >
                            {t}
                          </span>
                          <span
                            className={
                              reached ? "text-slate-300" : "text-slate-600"
                            }
                          >
                            {m === Number.POSITIVE_INFINITY
                              ? "—"
                              : formatUSD(m)}
                          </span>
                        </div>
                      );
                    },
                  )}
                </div>

                <div className="mt-auto pt-2 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400">
                    Total gross revenue:{" "}
                    <span className="text-white font-semibold">
                      {formatUSD(tierProgress.totalRevenue)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── Add Listing Dialog ─────────────────────────────────────── */}
      <Dialog
        open={listings.addOpen}
        onOpenChange={(o) => {
          if (!o) listings.closeAdd();
        }}
      >
        <DialogContent
          data-ocid="vendor.dashboard.add_listing.dialog"
          className="bg-slate-900 border-slate-700 text-white max-w-lg"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Add New Listing
            </DialogTitle>
          </DialogHeader>
          <AddEditListingForm form={addForm} onChange={setAddForm} />
          <DialogFooter className="gap-2">
            <Button
              data-ocid="vendor.dashboard.add_listing.cancel_button"
              variant="outline"
              className="border-slate-600 text-slate-300"
              onClick={listings.closeAdd}
            >
              Cancel
            </Button>
            <Button
              data-ocid="vendor.dashboard.add_listing.submit_button"
              className="bg-teal-600 hover:bg-teal-500 text-white"
              onClick={handleAddSubmit}
            >
              Add Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Listing Sheet ─────────────────────────────────────── */}
      <Sheet
        open={!!listings.editTarget}
        onOpenChange={(o) => {
          if (!o) listings.closeEdit();
        }}
      >
        <SheetContent className="bg-slate-900 border-slate-700 text-white w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-display font-bold text-white">
              Edit Listing
            </SheetTitle>
          </SheetHeader>
          <AddEditListingForm form={editForm} onChange={setEditForm} />
          <div className="flex gap-3 mt-6">
            <Button
              data-ocid="vendor.dashboard.listings.cancel_button"
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300"
              onClick={listings.closeEdit}
            >
              Cancel
            </Button>
            <Button
              data-ocid="vendor.dashboard.listings.save_button"
              className="flex-1 bg-teal-600 hover:bg-teal-500 text-white"
              onClick={handleEditSubmit}
            >
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Delete Confirm Dialog ──────────────────────────────────── */}
      <AlertDialog
        open={!!listings.deleteTarget}
        onOpenChange={(o) => {
          if (!o) listings.closeDelete();
        }}
      >
        <AlertDialogContent
          data-ocid="vendor.dashboard.delete_listing.dialog"
          className="bg-slate-900 border-slate-700 text-white"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-white">
              Delete Listing?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This will permanently remove &ldquo;{listings.deleteTarget?.title}
              &rdquo;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="vendor.dashboard.delete_listing.cancel_button"
              className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="vendor.dashboard.delete_listing.confirm_button"
              className="bg-red-700 hover:bg-red-600 text-white"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Payout Dialog ─────────────────────────────────────────── */}
      <Dialog
        open={revenue.payoutOpen}
        onOpenChange={(o) => {
          if (!o) revenue.closePayout();
        }}
      >
        <DialogContent
          data-ocid="vendor.dashboard.payout.dialog"
          className="bg-slate-900 border-slate-700 text-white max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Request Payout
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {revenue.payoutTarget && (
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Period</span>
                  <span className="text-white font-medium">
                    {revenue.payoutTarget.period}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-400">Net Revenue</span>
                  <span className="text-emerald-400 font-semibold">
                    {formatUSD(revenue.payoutTarget.netRevenue)}
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm">
                Payout Amount (USD)
              </Label>
              <Input
                type="number"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                className="bg-slate-800/60 border-slate-600 text-white"
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-sm">
                Bank / Wallet Destination
              </Label>
              <Input
                value={payoutDestination}
                onChange={(e) => setPayoutDestination(e.target.value)}
                className="bg-slate-800/60 border-slate-600 text-white"
                placeholder="Bank account or wallet address"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="vendor.dashboard.payout.cancel_button"
              variant="outline"
              className="border-slate-600 text-slate-300"
              onClick={revenue.closePayout}
            >
              Cancel
            </Button>
            <Button
              data-ocid="vendor.dashboard.payout.submit_button"
              className="bg-emerald-700 hover:bg-emerald-600 text-white"
              onClick={handlePayoutSubmit}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Reusable Add/Edit Form ─────────────────────────────────────────────────
interface AddEditListingFormProps {
  form: ListingFormState;
  onChange: (f: ListingFormState) => void;
}

function AddEditListingForm({ form, onChange }: AddEditListingFormProps) {
  function set<K extends keyof ListingFormState>(
    key: K,
    value: ListingFormState[K],
  ) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-slate-300 text-sm">Type</Label>
        <Select
          value={form.type}
          onValueChange={(v) => set("type", v as VendorListingType)}
        >
          <SelectTrigger className="bg-slate-800/60 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {(
              ["franchise", "campaign", "enterprise"] as VendorListingType[]
            ).map((t) => (
              <SelectItem
                key={t}
                value={t}
                className="text-slate-200 focus:bg-slate-700"
              >
                {VENDOR_LISTING_TYPE_CONFIG[t].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-slate-300 text-sm">Title</Label>
        <Input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="bg-slate-800/60 border-slate-600 text-white placeholder:text-slate-500"
          placeholder="Listing title"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => set("category", v as VendorCategory)}
          >
            <SelectTrigger className="bg-slate-800/60 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {FINANCE_CATEGORIES.map((c) => (
                <SelectItem
                  key={c}
                  value={c}
                  className="text-slate-200 focus:bg-slate-700"
                >
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">FF™ Tier</Label>
          <Select
            value={form.finfracfranTier}
            onValueChange={(v) => set("finfracfranTier", v as VendorTier)}
          >
            <SelectTrigger className="bg-slate-800/60 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {(["Seed", "Growth", "Scale", "Global"] as VendorTier[]).map(
                (t) => (
                  <SelectItem
                    key={t}
                    value={t}
                    className="text-slate-200 focus:bg-slate-700"
                  >
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-slate-300 text-sm">Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="bg-slate-800/60 border-slate-600 text-white placeholder:text-slate-500 resize-none"
          placeholder="Describe this listing…"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">Target Amount (USD)</Label>
          <Input
            type="number"
            value={form.targetAmount}
            onChange={(e) => set("targetAmount", e.target.value)}
            className="bg-slate-800/60 border-slate-600 text-white"
            placeholder="0"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-slate-300 text-sm">Nations Count</Label>
          <Input
            type="number"
            value={form.nationsCount}
            onChange={(e) => set("nationsCount", e.target.value)}
            className="bg-slate-800/60 border-slate-600 text-white"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}

// Unused import guard

function VendorMarketplaceSection({ vendorId }: { vendorId: string }) {
  const listings = getListingsByVendor(vendorId);
  return (
    <section
      id="marketplace"
      className="rounded-xl p-6"
      style={{
        background: "oklch(0.12 0.03 260)",
        border: "1px solid oklch(0.22 0.03 260)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-xl text-white">
            My Marketplace Listings
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            FinFracFran™ franchise, fractional, and license opportunities you
            have listed.
          </p>
        </div>
        <Link to="/marketplace">
          <button
            type="button"
            data-ocid="vendor.marketplace.button"
            className="text-sm px-4 py-1.5 rounded-lg font-medium"
            style={{
              background: "oklch(0.72 0.16 75 / 0.15)",
              color: "oklch(0.72 0.16 75)",
              border: "1px solid oklch(0.72 0.16 75 / 0.30)",
            }}
          >
            Browse All Listings →
          </button>
        </Link>
      </div>
      {listings.length === 0 ? (
        <p
          className="text-sm py-8 text-center"
          style={{ color: "oklch(0.50 0.03 260)" }}
          data-ocid="vendor.marketplace.empty_state"
        >
          No marketplace listings yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            data-ocid="vendor.marketplace.table"
          >
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.22 0.03 260)" }}>
                {[
                  "Title",
                  "Type",
                  "Tier",
                  "Status",
                  "Min. Inv.",
                  "Applications",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "oklch(0.50 0.03 260)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((l, i) => (
                <tr
                  key={l.id}
                  data-ocid={`vendor.marketplace.row.${i + 1}`}
                  style={{ borderBottom: "1px solid oklch(0.18 0.03 260)" }}
                >
                  <td
                    className="px-3 py-3 font-medium"
                    style={{ color: "oklch(0.85 0.02 260)" }}
                  >
                    {l.title}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: LISTING_TYPE_CONFIG[l.type].bgColor,
                        color: LISTING_TYPE_CONFIG[l.type].color,
                      }}
                    >
                      {LISTING_TYPE_CONFIG[l.type].label}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${LISTING_TIER_CONFIG[l.tier].color}22`,
                        color: LISTING_TIER_CONFIG[l.tier].color,
                      }}
                    >
                      {LISTING_TIER_CONFIG[l.tier].label}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${LISTING_STATUS_CONFIG[l.status].color}22`,
                        color: LISTING_STATUS_CONFIG[l.status].color,
                      }}
                    >
                      {LISTING_STATUS_CONFIG[l.status].label}
                    </span>
                  </td>
                  <td
                    className="px-3 py-3 font-medium"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                  >
                    ${l.financials.minInvestment.toLocaleString()}
                  </td>
                  <td
                    className="px-3 py-3"
                    style={{ color: "oklch(0.68 0.03 260)" }}
                  >
                    {l.applicationsCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
