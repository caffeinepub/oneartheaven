import type { BillingRecord, PaaSPlan, TenantSubscription } from "./paasTypes";

// ---------------------------------------------------------------------------
// PaaS Plans
// ---------------------------------------------------------------------------

export const PAAS_PLANS: PaaSPlan[] = [
  {
    id: "plan-starter",
    tier: "Starter",
    name: "Starter",
    tagline: "Perfect for small NGOs and community organizations",
    monthlyPrice: 49,
    annualPrice: 39,
    highlighted: false,
    ctaLabel: "Get Started Free",
    limits: {
      membersLimit: 25,
      listingsLimit: 10,
      storageGB: 5,
      apiCallsPerMonth: 10000,
      whiteLabel: false,
      customDomain: false,
      slaPercent: 99,
      prioritySupport: false,
      analytics: false,
      vendorPortal: false,
      multiTenant: false,
      finfracfranIntegration: false,
    },
  },
  {
    id: "plan-professional",
    tier: "Professional",
    name: "Professional",
    tagline: "For growing organizations scaling their global impact",
    monthlyPrice: 199,
    annualPrice: 159,
    highlighted: true,
    badge: "Most Popular",
    ctaLabel: "Start Free Trial",
    limits: {
      membersLimit: 150,
      listingsLimit: 50,
      storageGB: 50,
      apiCallsPerMonth: 100000,
      whiteLabel: true,
      customDomain: false,
      slaPercent: 99.5,
      prioritySupport: false,
      analytics: true,
      vendorPortal: true,
      multiTenant: false,
      finfracfranIntegration: true,
    },
  },
  {
    id: "plan-enterprise",
    tier: "Enterprise",
    name: "Enterprise",
    tagline: "For multi-national organizations and nation-states",
    monthlyPrice: 799,
    annualPrice: 639,
    highlighted: false,
    ctaLabel: "Contact Sales",
    limits: {
      membersLimit: 1000,
      listingsLimit: 500,
      storageGB: 500,
      apiCallsPerMonth: 1000000,
      whiteLabel: true,
      customDomain: true,
      slaPercent: 99.9,
      prioritySupport: true,
      analytics: true,
      vendorPortal: true,
      multiTenant: true,
      finfracfranIntegration: true,
    },
  },
  {
    id: "plan-global",
    tier: "Global",
    name: "Global",
    tagline: "Unlimited scale for sovereign platforms and global bodies",
    monthlyPrice: 2999,
    annualPrice: 2399,
    highlighted: false,
    ctaLabel: "Contact Sales",
    limits: {
      membersLimit: null,
      listingsLimit: null,
      storageGB: null,
      apiCallsPerMonth: null,
      whiteLabel: true,
      customDomain: true,
      slaPercent: 99.99,
      prioritySupport: true,
      analytics: true,
      vendorPortal: true,
      multiTenant: true,
      finfracfranIntegration: true,
    },
  },
];

// ---------------------------------------------------------------------------
// Billing history helpers
// ---------------------------------------------------------------------------

function makeBilling(
  orgId: string,
  months: {
    period: string;
    amount: number;
    status: "paid" | "failed" | "pending";
    paidAt?: string;
  }[],
): BillingRecord[] {
  return months.map((m, i) => ({
    id: `bill-${orgId}-${i + 1}`,
    period: m.period,
    amount: m.amount,
    currency: "USD",
    status: m.status,
    paidAt: m.paidAt,
    invoiceUrl:
      m.status === "paid"
        ? `https://invoices.example.com/${orgId}-${i + 1}`
        : undefined,
  }));
}

// ---------------------------------------------------------------------------
// Org Subscriptions (one per seed org)
// ---------------------------------------------------------------------------

export const ORG_SUBSCRIPTIONS: TenantSubscription[] = [
  {
    orgId: "org-oneearth-platform-001",
    planId: "plan-global",
    tier: "Global",
    status: "active",
    billingPeriod: "annual",
    startDate: "2024-01-01",
    renewalDate: "2026-12-31",
    usageStats: {
      membersUsed: 4820,
      membersLimit: null,
      listingsUsed: 9341,
      listingsLimit: null,
      storageUsedGB: 847,
      storageGBLimit: null,
      apiCallsThisMonth: 8492310,
      apiCallsLimit: null,
    },
    billingHistory: makeBilling("org-oneearth-platform-001", [
      {
        period: "Jan 2026",
        amount: 2399,
        status: "paid",
        paidAt: "2026-01-01",
      },
      {
        period: "Dec 2025",
        amount: 2399,
        status: "paid",
        paidAt: "2025-12-01",
      },
      {
        period: "Nov 2025",
        amount: 2399,
        status: "paid",
        paidAt: "2025-11-01",
      },
    ]),
  },
  {
    orgId: "org-africa-climate-002",
    planId: "plan-starter",
    tier: "Starter",
    status: "trial",
    billingPeriod: "monthly",
    startDate: "2026-02-15",
    renewalDate: "2026-04-15",
    trialEndDate: "2026-04-15",
    usageStats: {
      membersUsed: 22,
      membersLimit: 25,
      listingsUsed: 7,
      listingsLimit: 10,
      storageUsedGB: 3.8,
      storageGBLimit: 5,
      apiCallsThisMonth: 7250,
      apiCallsLimit: 10000,
    },
    billingHistory: [],
  },
  {
    orgId: "org-euro-coop-003",
    planId: "plan-professional",
    tier: "Professional",
    status: "active",
    billingPeriod: "annual",
    startDate: "2025-03-01",
    renewalDate: "2026-03-01",
    usageStats: {
      membersUsed: 89,
      membersLimit: 150,
      listingsUsed: 34,
      listingsLimit: 50,
      storageUsedGB: 28.4,
      storageGBLimit: 50,
      apiCallsThisMonth: 54200,
      apiCallsLimit: 100000,
    },
    billingHistory: makeBilling("org-euro-coop-003", [
      { period: "Mar 2026", amount: 159, status: "paid", paidAt: "2026-03-01" },
      { period: "Feb 2026", amount: 159, status: "paid", paidAt: "2026-02-01" },
      { period: "Jan 2026", amount: 159, status: "paid", paidAt: "2026-01-01" },
    ]),
  },
  {
    orgId: "org-pacific-nations-004",
    planId: "plan-starter",
    tier: "Starter",
    status: "past_due",
    billingPeriod: "monthly",
    startDate: "2025-06-01",
    renewalDate: "2026-03-01",
    usageStats: {
      membersUsed: 14,
      membersLimit: 25,
      listingsUsed: 5,
      listingsLimit: 10,
      storageUsedGB: 1.2,
      storageGBLimit: 5,
      apiCallsThisMonth: 3100,
      apiCallsLimit: 10000,
    },
    billingHistory: makeBilling("org-pacific-nations-004", [
      { period: "Mar 2026", amount: 49, status: "failed" },
      { period: "Feb 2026", amount: 49, status: "paid", paidAt: "2026-02-01" },
    ]),
  },
  {
    orgId: "org-global-solutions-dao-005",
    planId: "plan-enterprise",
    tier: "Enterprise",
    status: "active",
    billingPeriod: "annual",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    usageStats: {
      membersUsed: 712,
      membersLimit: 1000,
      listingsUsed: 394,
      listingsLimit: 500,
      storageUsedGB: 412,
      storageGBLimit: 500,
      apiCallsThisMonth: 847200,
      apiCallsLimit: 1000000,
    },
    billingHistory: makeBilling("org-global-solutions-dao-005", [
      { period: "Jan 2026", amount: 639, status: "paid", paidAt: "2026-01-01" },
      { period: "Dec 2025", amount: 639, status: "paid", paidAt: "2025-12-01" },
      { period: "Nov 2025", amount: 639, status: "paid", paidAt: "2025-11-01" },
    ]),
  },
  {
    orgId: "org-finfracfran-hub-006",
    planId: "plan-global",
    tier: "Global",
    status: "active",
    billingPeriod: "annual",
    startDate: "2024-06-01",
    renewalDate: "2026-05-31",
    usageStats: {
      membersUsed: 3241,
      membersLimit: null,
      listingsUsed: 7458,
      listingsLimit: null,
      storageUsedGB: 2140,
      storageGBLimit: null,
      apiCallsThisMonth: 24891200,
      apiCallsLimit: null,
    },
    billingHistory: makeBilling("org-finfracfran-hub-006", [
      {
        period: "Mar 2026",
        amount: 2399,
        status: "paid",
        paidAt: "2026-03-01",
      },
      {
        period: "Feb 2026",
        amount: 2399,
        status: "paid",
        paidAt: "2026-02-01",
      },
      {
        period: "Jan 2026",
        amount: 2399,
        status: "paid",
        paidAt: "2026-01-01",
      },
    ]),
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getAllPlans(): PaaSPlan[] {
  return PAAS_PLANS;
}

export function getPlan(planId: string): PaaSPlan | undefined {
  return PAAS_PLANS.find((p) => p.id === planId);
}

export function getPlanByTier(tier: string): PaaSPlan | undefined {
  return PAAS_PLANS.find((p) => p.tier === tier);
}

export function getSubscription(orgId: string): TenantSubscription | undefined {
  return ORG_SUBSCRIPTIONS.find((s) => s.orgId === orgId);
}

export function getAllSubscriptions(): TenantSubscription[] {
  return ORG_SUBSCRIPTIONS;
}
