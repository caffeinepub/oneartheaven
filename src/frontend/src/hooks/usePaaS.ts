import { getAllPlans, getSubscription } from "@/data/paasData";
import type {
  BillingPeriod,
  PaaSPlan,
  TenantSubscription,
} from "@/data/paasTypes";
import { useState } from "react";

// ---------------------------------------------------------------------------
// usePaaSPlans — public pricing page hook
// ---------------------------------------------------------------------------

export function usePaaSPlans() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const plans = getAllPlans();

  function displayPrice(plan: PaaSPlan): string {
    const price =
      billingPeriod === "annual" ? plan.annualPrice : plan.monthlyPrice;
    return `$${price.toLocaleString()}`;
  }

  const annualSavingsPct = 20;

  return {
    plans,
    billingPeriod,
    setBillingPeriod,
    displayPrice,
    annualSavingsPct,
  };
}

// ---------------------------------------------------------------------------
// usePaaSSubscription — tenant subscription dashboard hook
// ---------------------------------------------------------------------------

export interface UsageAlerts {
  members: boolean;
  listings: boolean;
  storage: boolean;
  apiCalls: boolean;
}

export function usePaaSSubscription(orgId: string | null) {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<string | null>(
    null,
  );
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const subscription: TenantSubscription | null = orgId
    ? (getSubscription(orgId) ?? null)
    : null;

  const allPlans = getAllPlans();
  const currentPlan =
    allPlans.find((p) => p.id === subscription?.planId) ?? null;

  const tierOrder: string[] = [
    "Starter",
    "Professional",
    "Enterprise",
    "Global",
  ];
  const currentTierIdx = currentPlan ? tierOrder.indexOf(currentPlan.tier) : -1;
  const upgradablePlans = allPlans.filter(
    (p) => tierOrder.indexOf(p.tier) > currentTierIdx,
  );

  // Usage alerts: fired when usage >= 80% of limit
  const usage = subscription?.usageStats;
  function alertFor(
    used: number | undefined,
    limit: number | null | undefined,
  ): boolean {
    if (!used || limit === null || limit === undefined) return false;
    return used / limit >= 0.8;
  }

  const usageAlerts: UsageAlerts = {
    members: alertFor(usage?.membersUsed, usage?.membersLimit),
    listings: alertFor(usage?.listingsUsed, usage?.listingsLimit),
    storage: alertFor(usage?.storageUsedGB, usage?.storageGBLimit),
    apiCalls: alertFor(usage?.apiCallsThisMonth, usage?.apiCallsLimit),
  };

  const hasAnyAlert = Object.values(usageAlerts).some(Boolean);

  function usagePct(
    used: number | undefined,
    limit: number | null | undefined,
  ): number {
    if (!used || limit === null || limit === undefined) return 0;
    return Math.min(100, Math.round((used / limit) * 100));
  }

  async function handleUpgrade() {
    if (!selectedUpgradePlan) return;
    setUpgrading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setUpgrading(false);
    setUpgradeSuccess(true);
    setTimeout(() => {
      setUpgradeSuccess(false);
      setUpgradeDialogOpen(false);
      setSelectedUpgradePlan(null);
    }, 2000);
  }

  return {
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
  };
}
