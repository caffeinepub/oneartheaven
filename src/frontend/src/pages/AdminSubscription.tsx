import { RequireRole } from "@/components/RequireRole";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  BILLING_STATUS_CONFIG,
  PAAS_FEATURE_ROWS,
  PAAS_TIER_CONFIG,
  SUBSCRIPTION_STATUS_CONFIG,
} from "@/data/paasTypes";
import { useAuth } from "@/hooks/useAuth";
import { usePaaSSubscription } from "@/hooks/usePaaS";
import { useTenant } from "@/hooks/useTenant";
import {
  AlertTriangle,
  ArrowUpCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  CreditCard,
  Loader2,
  Minus,
  ServerCrash,
} from "lucide-react";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatApiCalls(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatFeatureCellValue(
  value: number | boolean | null,
  type: string,
): React.ReactNode {
  if (type === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-emerald-400" />
    ) : (
      <Minus className="h-4 w-4 text-zinc-600" />
    );
  }
  if (value === null)
    return (
      <span className="text-emerald-400 font-semibold text-xs">Unlimited</span>
    );
  if (type === "storage")
    return <span className="text-zinc-300 text-xs">{value as number} GB</span>;
  if (type === "api")
    return (
      <span className="text-zinc-300 text-xs">
        {formatApiCalls(value as number)}
      </span>
    );
  if (type === "percent")
    return <span className="text-zinc-300 text-xs">{value as number}%</span>;
  return <span className="text-zinc-300 text-xs">{String(value)}</span>;
}

// ---------------------------------------------------------------------------
// Inner page (needs auth data injected)
// ---------------------------------------------------------------------------

function AdminSubscriptionInner() {
  const { orgId } = useAuth();
  const { activeOrg } = useTenant();

  const {
    subscription,
    currentPlan,
    upgradablePlans,
    usageAlerts,
    hasAnyAlert,
    usagePct,
    upgradeDialogOpen,
    setUpgradeDialogOpen,
    selectedUpgradePlan,
    setSelectedUpgradePlan,
    upgrading,
    upgradeSuccess,
    handleUpgrade,
  } = usePaaSSubscription(orgId);

  const statusCfg = subscription
    ? SUBSCRIPTION_STATUS_CONFIG[subscription.status]
    : null;
  const tierCfg = currentPlan ? PAAS_TIER_CONFIG[currentPlan.tier] : null;
  const usage = subscription?.usageStats;

  return (
    <div className="min-h-screen bg-[oklch(var(--cosmos-deep))]">
      {/* ── Hero ── */}
      <section
        className="relative py-16 px-4"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, oklch(0.3 0.1 265 / 0.5), transparent), oklch(var(--cosmos-deep))",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-3 border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs tracking-widest uppercase">
              Phase 12 · PaaS
            </Badge>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Subscription & Billing
              </h1>
              {statusCfg && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    statusCfg.color
                  } ${statusCfg.bg} border-current/30`}
                >
                  {statusCfg.label}
                </span>
              )}
              {tierCfg && currentPlan && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    tierCfg.color
                  } ${tierCfg.bg}`}
                >
                  {tierCfg.icon} {currentPlan.tier} Plan
                </span>
              )}
            </div>
            {activeOrg && (
              <p className="text-zinc-400 text-sm">{activeOrg.name}</p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-8">
        {/* ── Usage alert banner ── */}
        {hasAnyAlert && (
          <motion.div
            data-ocid="subscription.usage_alert.panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300"
          >
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm flex-1">
              You are approaching usage limits. Upgrade your plan to avoid
              service interruptions.
            </p>
            <Button
              size="sm"
              className="btn-gold text-xs shrink-0"
              onClick={() => setUpgradeDialogOpen(true)}
            >
              Upgrade Plan
            </Button>
          </motion.div>
        )}

        {/* ── Current plan card ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(0.1_0.02_260)] p-6"
        >
          <h2 className="text-lg font-display font-semibold text-white mb-5">
            Current Plan
          </h2>
          {currentPlan ? (
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {tierCfg && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tierCfg.color
                      } ${tierCfg.bg}`}
                    >
                      {tierCfg.icon} {currentPlan.tier}
                    </span>
                  )}
                  <span className="text-xl font-bold text-white">
                    {currentPlan.name}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">{currentPlan.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mt-2">
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />$
                    {subscription?.billingPeriod === "annual"
                      ? currentPlan.annualPrice
                      : currentPlan.monthlyPrice}
                    /mo{" "}
                    {subscription?.billingPeriod === "annual"
                      ? "(billed annually)"
                      : "(monthly)"}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    Renews {subscription?.renewalDate}
                  </span>
                  {subscription?.trialEndDate && (
                    <span className="flex items-center gap-1 text-blue-400">
                      Trial ends {subscription.trialEndDate}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="btn-gold text-xs"
                  onClick={() => setUpgradeDialogOpen(true)}
                  data-ocid="subscription.upgrade.open_modal_button"
                >
                  <ArrowUpCircle className="h-4 w-4 mr-1.5" /> Upgrade Plan
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="text-xs border-[oklch(1_0_0/0.12)] text-zinc-500 cursor-not-allowed"
                          data-ocid="subscription.billing.button"
                        >
                          <CreditCard className="h-4 w-4 mr-1.5" /> Manage
                          Billing
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Coming soon</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center gap-3 text-zinc-500"
              data-ocid="subscription.plan.empty_state"
            >
              <ServerCrash className="h-5 w-5" />
              <p className="text-sm">
                No subscription found for this organization. Switch to an org
                with an active subscription.
              </p>
            </div>
          )}
        </motion.section>

        {/* ── Usage bars ── */}
        {usage && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(0.1_0.02_260)] p-6"
          >
            <h2 className="text-lg font-display font-semibold text-white mb-6">
              Resource Usage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Members */}
              <UsageBar
                label="Team Members"
                used={usage.membersUsed}
                limit={usage.membersLimit}
                alert={usageAlerts.members}
                pct={usagePct(usage.membersUsed, usage.membersLimit)}
                format={(n) => String(n)}
                ocid="subscription.usage.members"
              />
              {/* Listings */}
              <UsageBar
                label="Active Listings"
                used={usage.listingsUsed}
                limit={usage.listingsLimit}
                alert={usageAlerts.listings}
                pct={usagePct(usage.listingsUsed, usage.listingsLimit)}
                format={(n) => String(n)}
                ocid="subscription.usage.listings"
              />
              {/* Storage */}
              <UsageBar
                label="Storage"
                used={usage.storageUsedGB}
                limit={usage.storageGBLimit}
                alert={usageAlerts.storage}
                pct={usagePct(usage.storageUsedGB, usage.storageGBLimit)}
                format={(n) => `${n} GB`}
                ocid="subscription.usage.storage"
              />
              {/* API Calls */}
              <UsageBar
                label="API Calls This Month"
                used={usage.apiCallsThisMonth}
                limit={usage.apiCallsLimit}
                alert={usageAlerts.apiCalls}
                pct={usagePct(usage.apiCallsThisMonth, usage.apiCallsLimit)}
                format={formatApiCalls}
                ocid="subscription.usage.api-calls"
              />
            </div>
          </motion.section>
        )}

        {/* ── Plan features summary ── */}
        {currentPlan && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(0.1_0.02_260)] p-6"
          >
            <h2 className="text-lg font-display font-semibold text-white mb-5">
              Plan Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {PAAS_FEATURE_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between py-1.5 border-b border-[oklch(1_0_0/0.05)]"
                >
                  <span className="text-sm text-zinc-400">{row.label}</span>
                  <span className="text-right">
                    {formatFeatureCellValue(
                      currentPlan.limits[row.key] as number | boolean | null,
                      row.type,
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Billing history ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(0.1_0.02_260)] p-6"
        >
          <h2 className="text-lg font-display font-semibold text-white mb-5">
            Billing History
          </h2>
          {subscription?.billingHistory &&
          subscription.billingHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <Table data-ocid="subscription.billing_history.table">
                <TableHeader>
                  <TableRow className="border-[oklch(1_0_0/0.08)]">
                    <TableHead className="text-zinc-400">Period</TableHead>
                    <TableHead className="text-zinc-400">Amount</TableHead>
                    <TableHead className="text-zinc-400">Status</TableHead>
                    <TableHead className="text-zinc-400">Paid At</TableHead>
                    <TableHead className="text-zinc-400">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscription.billingHistory.map((record, idx) => {
                    const bCfg = BILLING_STATUS_CONFIG[record.status];
                    return (
                      <TableRow
                        key={record.id}
                        data-ocid={`subscription.billing_history.item.${idx + 1}`}
                        className="border-[oklch(1_0_0/0.06)] hover:bg-[oklch(1_0_0/0.02)]"
                      >
                        <TableCell className="text-zinc-300 font-medium">
                          {record.period}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          ${record.amount.toLocaleString()} {record.currency}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${bCfg.color} ${bCfg.bg}`}
                          >
                            {bCfg.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-zinc-400 text-sm">
                          {record.paidAt ?? "—"}
                        </TableCell>
                        <TableCell>
                          {record.invoiceUrl ? (
                            <a
                              href={record.invoiceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-yellow-400 hover:underline"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-zinc-600 text-xs">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div
              className="flex items-center gap-3 text-zinc-500 py-8 justify-center"
              data-ocid="subscription.billing_history.empty_state"
            >
              <CreditCard className="h-5 w-5" />
              <p className="text-sm">No billing records yet.</p>
            </div>
          )}
        </motion.section>
      </div>

      {/* ── Upgrade Dialog ── */}
      <AlertDialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <AlertDialogContent
          className="bg-[oklch(0.12_0.02_260)] border-[oklch(1_0_0/0.1)] max-w-2xl"
          data-ocid="subscription.upgrade.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl font-display">
              Upgrade Your Plan
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Select a plan to upgrade to. The new plan activates immediately on
              a prorated basis.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            {upgradablePlans.length === 0 && (
              <p className="text-zinc-500 text-sm col-span-3 text-center py-4">
                You are already on the highest plan.
              </p>
            )}
            {upgradablePlans.map((plan, idx) => {
              const cfg = PAAS_TIER_CONFIG[plan.tier];
              const isSelected = selectedUpgradePlan === plan.id;
              return (
                <button
                  type="button"
                  key={plan.id}
                  data-ocid={`subscription.upgrade.plan.${idx + 1}`}
                  onClick={() => setSelectedUpgradePlan(plan.id)}
                  className={`rounded-xl p-4 border text-left transition-all duration-150 ${
                    isSelected
                      ? "border-yellow-400/60 ring-2 ring-yellow-400/30 bg-yellow-400/5"
                      : "border-[oklch(1_0_0/0.1)] hover:border-[oklch(1_0_0/0.2)] bg-[oklch(0.1_0.02_260)]"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${cfg.color} block mb-1`}
                  >
                    {cfg.icon} {plan.tier}
                  </span>
                  <span className="text-white font-bold text-base block">
                    {plan.name}
                  </span>
                  <span className="text-zinc-400 text-xs block mt-1">
                    ${plan.monthlyPrice}/mo
                  </span>
                </button>
              );
            })}
          </div>

          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpgradeDialogOpen(false)}
              disabled={upgrading}
              className="border-[oklch(1_0_0/0.12)] text-zinc-300"
              data-ocid="subscription.upgrade.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="btn-gold min-w-[140px]"
              disabled={!selectedUpgradePlan || upgrading || upgradeSuccess}
              onClick={handleUpgrade}
              data-ocid="subscription.upgrade.confirm_button"
            >
              {upgradeSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Upgraded!
                </>
              ) : upgrading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Upgrading...
                </>
              ) : (
                "Confirm Upgrade"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// UsageBar sub-component
// ---------------------------------------------------------------------------

interface UsageBarProps {
  label: string;
  used: number;
  limit: number | null;
  alert: boolean;
  pct: number;
  format: (n: number) => string;
  ocid: string;
}

function UsageBar({
  label,
  used,
  limit,
  alert,
  pct,
  format,
  ocid,
}: UsageBarProps) {
  const isUnlimited = limit === null;
  return (
    <div data-ocid={ocid}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-zinc-300 font-medium flex items-center gap-1.5">
          {alert && <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
          {label}
        </span>
        {isUnlimited ? (
          <span className="text-xs font-semibold text-emerald-400">
            Unlimited
          </span>
        ) : (
          <span
            className={`text-xs font-medium ${
              alert ? "text-amber-400" : "text-zinc-400"
            }`}
          >
            {format(used)} / {format(limit as number)}
          </span>
        )}
      </div>
      {!isUnlimited && (
        <Progress
          value={pct}
          className={`h-2 ${
            alert ? "[&>div]:bg-amber-400" : "[&>div]:bg-yellow-400"
          }`}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Export (wrapped in RequireRole)
// ---------------------------------------------------------------------------

export function AdminSubscriptionPage() {
  return (
    <RequireRole roles={["OrgAdmin", "SuperAdmin"]}>
      <AdminSubscriptionInner />
    </RequireRole>
  );
}
