import type { HelpArticle, OnboardingTour } from "./onboardingTypes";

// ─── Tour Definitions ────────────────────────────────────────────────────────

export const ONBOARDING_TOURS: OnboardingTour[] = [
  {
    tourId: "platform-overview",
    name: "Platform Overview",
    description:
      "A guided tour of the ONEartHeaven™ platform — governance, solutions, community, and more.",
    targetRole: "any",
    estimatedMinutes: 5,
    icon: "🌍",
    completionKey: "platform_overview_complete",
    steps: [
      {
        stepId: "welcome",
        title: "Welcome to ONEartHeaven™",
        description:
          "This platform brings global governance, solutions exchange, and transparent decision-making to everyone. Let us show you around.",
        position: "center",
      },
      {
        stepId: "governance-hub",
        title: "Governance Hub",
        description:
          "The Governance Hub is your launchpad — access all platform modules, portals, and dashboards from one central place.",
        targetOcid: "governance.portal.card.1",
        position: "bottom",
        navigateTo: "/governance",
      },
      {
        stepId: "assembly",
        title: "Global Assembly",
        description:
          "Propose and vote on global resolutions. Every voice has weight — no permanent vetoes.",
        targetOcid: "assembly.hero.section",
        position: "bottom",
        navigateTo: "/assembly",
      },
      {
        stepId: "solutions",
        title: "Solutions Exchange",
        description:
          "Browse and contribute proven solutions to global challenges. Filter by region, theme, and impact.",
        targetOcid: "solutions.hero.section",
        position: "bottom",
        navigateTo: "/solutions",
      },
      {
        stepId: "transparency",
        title: "Transparency Portal",
        description:
          "All budget flows, AI decisions, and voting records are publicly auditable. Radical transparency is non-negotiable.",
        targetOcid: "transparency.hero.section",
        position: "bottom",
        navigateTo: "/transparency",
      },
      {
        stepId: "academy",
        title: "Academy",
        description:
          "Train, certify, and incubate ideas. The Academy powers the next generation of global problem-solvers.",
        targetOcid: "academy.hero.section",
        position: "bottom",
        navigateTo: "/academy",
      },
      {
        stepId: "finance",
        title: "FinFracFran™ Finance Layer",
        description:
          "Explore franchises, investment rounds, and cooperative funding models built on the FinFracFran™ economic framework.",
        targetOcid: "finance.hero.section",
        position: "bottom",
        navigateTo: "/finance",
      },
      {
        stepId: "docs",
        title: "Documentation",
        description:
          "Full API docs, SDK guides, and integration references are always one click away.",
        targetOcid: "docs.sidebar.section",
        position: "right",
        navigateTo: "/docs",
      },
      {
        stepId: "pricing",
        title: "PaaS Plans",
        description:
          "ONEartHeaven™ is available as a White Label PaaS. Choose a plan that fits your organization and launch your own branded platform.",
        targetOcid: "pricing.plans.section",
        position: "top",
        navigateTo: "/pricing",
      },
      {
        stepId: "complete",
        title: "You're all set!",
        description:
          "Explore, participate, and help shape a better world. Every action on this platform moves us toward transparent, inclusive global governance.",
        position: "center",
      },
    ],
  },
  {
    tourId: "org-admin-quickstart",
    name: "Org Admin Quickstart",
    description:
      "Learn how to manage your organization, configure white-label settings, and handle member approvals.",
    targetRole: "OrgAdmin",
    estimatedMinutes: 4,
    icon: "🏛️",
    completionKey: "org_admin_quickstart_complete",
    badgeLabel: "Admin",
    steps: [
      {
        stepId: "welcome-admin",
        title: "Welcome, Org Admin",
        description:
          "As an Org Admin, you control your organization's settings, members, white-label branding, and PaaS subscription.",
        position: "center",
      },
      {
        stepId: "orgs-page",
        title: "Org Management",
        description:
          "Create and manage organizations. Set feature flags, member caps, and per-tenant configuration from here.",
        targetOcid: "admin.orgs.page",
        position: "bottom",
        navigateTo: "/admin/orgs",
      },
      {
        stepId: "approvals",
        title: "Member Approval Pipeline",
        description:
          "Review and approve pending membership and vendor applications. All submissions route through this dashboard.",
        targetOcid: "approvals.page",
        position: "bottom",
        navigateTo: "/admin/approvals",
      },
      {
        stepId: "whitelabel",
        title: "White Label Studio",
        description:
          "Customize your organization's brand — colors, logo, typography, and custom domain — with a live preview.",
        targetOcid: "whitelabel.preview.panel",
        position: "right",
        navigateTo: "/admin/whitelabel",
      },
      {
        stepId: "subscription",
        title: "Subscription Dashboard",
        description:
          "Monitor your PaaS plan usage — members, listings, storage, and API calls. Upgrade when you need more capacity.",
        targetOcid: "subscription.plan.card",
        position: "bottom",
        navigateTo: "/admin/subscription",
      },
      {
        stepId: "org-switcher",
        title: "Org Switcher",
        description:
          "Use the org switcher in the top navigation bar to switch between organizations you manage.",
        targetOcid: "nav.org_switcher.button",
        position: "bottom",
      },
      {
        stepId: "tenant-branding",
        title: "Per-Tenant Branding",
        description:
          "Each org can have its own brand colors applied platform-wide. Switch orgs to see the theme change in real time.",
        position: "center",
      },
      {
        stepId: "complete-admin",
        title: "Ready to manage!",
        description:
          "You now know the key admin workflows. Check the Documentation portal for full API and integration references.",
        position: "center",
      },
    ],
  },
  {
    tourId: "vendor-quickstart",
    name: "Vendor Quickstart",
    description:
      "Get your vendor listings live, understand FinFracFran™ revenue attribution, and manage your dashboard.",
    targetRole: "Vendor",
    estimatedMinutes: 3,
    icon: "🏪",
    completionKey: "vendor_quickstart_complete",
    badgeLabel: "Vendor",
    steps: [
      {
        stepId: "welcome-vendor",
        title: "Welcome, Vendor!",
        description:
          "Your application was approved. This quick tour covers your dashboard, listings, and FinFracFran™ revenue tracking.",
        position: "center",
      },
      {
        stepId: "vendor-dashboard",
        title: "Vendor Dashboard",
        description:
          "Your command center — stats, recent listings, revenue summary, and quick actions all in one place.",
        targetOcid: "vendor.dashboard.page",
        position: "bottom",
        navigateTo: "/vendor/dashboard",
      },
      {
        stepId: "add-listing",
        title: "Add Your First Listing",
        description:
          'Create franchise opportunities, fundraising campaigns, or enterprise profiles. Use the "Add New Listing" button to get started.',
        targetOcid: "vendor.listings.section",
        position: "top",
      },
      {
        stepId: "revenue",
        title: "FinFracFran™ Revenue Attribution",
        description:
          "Track gross revenue, your FinFracFran™ share, and net earnings by quarter. Request payouts directly from this section.",
        targetOcid: "vendor.revenue.section",
        position: "top",
      },
      {
        stepId: "tier-progress",
        title: "Tier Progression",
        description:
          "As your revenue grows, you advance from Seed → Growth → Scale → Global, unlocking higher-tier benefits and visibility.",
        position: "center",
      },
      {
        stepId: "complete-vendor",
        title: "Let's go!",
        description:
          "Your vendor profile is live. Add your listings and start reaching organizations globally.",
        position: "center",
      },
    ],
  },
  {
    tourId: "delegate-quickstart",
    name: "Delegate Quickstart",
    description:
      "Learn how to vote on resolutions, submit proposals, and engage in the global assembly.",
    targetRole: "Delegate",
    estimatedMinutes: 3,
    icon: "🗳️",
    completionKey: "delegate_quickstart_complete",
    badgeLabel: "Delegate",
    steps: [
      {
        stepId: "welcome-delegate",
        title: "Welcome, Delegate!",
        description:
          "As a Delegate, you have voting rights in the Global Assembly. Your vote carries weight and shapes policy.",
        position: "center",
      },
      {
        stepId: "assembly-voting",
        title: "Global Assembly",
        description:
          "Browse active proposals, cast your vote, and track resolution progress. No permanent vetoes — weighted consensus drives decisions.",
        targetOcid: "assembly.hero.section",
        position: "bottom",
        navigateTo: "/assembly",
      },
      {
        stepId: "resolutions",
        title: "Resolutions Ledger",
        description:
          "All adopted and pending resolutions are publicly logged. Full traceability from proposal to ratification.",
        targetOcid: "resolutions.hero.section",
        position: "bottom",
        navigateTo: "/resolutions",
      },
      {
        stepId: "policy-advisor",
        title: "AI Policy Advisor",
        description:
          "Use the AI Policy Advisor to analyze proposals, compare global precedents, and draft evidence-based policy recommendations.",
        targetOcid: "policy.hero.section",
        position: "bottom",
        navigateTo: "/policy-advisor",
      },
      {
        stepId: "complete-delegate",
        title: "Ready to participate!",
        description:
          "Your voice matters in shaping global policy. Engage, vote, and help build consensus.",
        position: "center",
      },
    ],
  },
];

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: "ha-getting-started",
    title: "Getting Started with ONEartHeaven™",
    summary: "Platform overview, key features, and first steps.",
    docSectionId: "gs-overview",
    relatedRoutes: ["/", "/about"],
    tags: ["intro", "overview", "quickstart"],
  },
  {
    id: "ha-internet-identity",
    title: "Connecting with Internet Identity",
    summary: "How to log in with Internet Identity and manage your principal.",
    docSectionId: "auth-internet-identity",
    relatedRoutes: ["/register"],
    tags: ["auth", "login", "identity"],
  },
  {
    id: "ha-roles",
    title: "Roles & Permissions",
    summary: "Understanding Delegate, OrgAdmin, Vendor, and SuperAdmin roles.",
    docSectionId: "auth-roles",
    relatedRoutes: ["/register", "/admin/approvals"],
    tags: ["roles", "access", "permissions"],
  },
  {
    id: "ha-whitelabel",
    title: "Configuring White Label Branding",
    summary: "Set up custom colors, logo, and domain for your organization.",
    docSectionId: "wl-config",
    relatedRoutes: ["/admin/whitelabel"],
    tags: ["white-label", "branding", "admin"],
  },
  {
    id: "ha-pricing",
    title: "PaaS Plans & Pricing",
    summary: "Compare Starter, Professional, Enterprise, and Global plans.",
    docSectionId: "api-overview",
    relatedRoutes: ["/pricing", "/admin/subscription"],
    tags: ["pricing", "paas", "plans"],
  },
  {
    id: "ha-vendor",
    title: "Becoming a Vendor",
    summary: "Register, get approved, and start managing listings and revenue.",
    docSectionId: "v-overview",
    relatedRoutes: ["/vendor/register", "/vendor/dashboard"],
    tags: ["vendor", "listings", "finfracfran"],
  },
  {
    id: "ha-finfracfran",
    title: "FinFracFran™ Revenue Attribution",
    summary:
      "How revenue is tracked, attributed, and paid out through FinFracFran™.",
    docSectionId: "ff-revenue",
    relatedRoutes: ["/finance", "/vendor/dashboard"],
    tags: ["finfracfran", "revenue", "attribution"],
  },
  {
    id: "ha-docs-api",
    title: "API Reference Overview",
    summary: "Backend API endpoints, authentication, and integration patterns.",
    docSectionId: "api-overview",
    relatedRoutes: ["/docs", "/integrations"],
    tags: ["api", "docs", "integration"],
  },
  {
    id: "ha-webhooks",
    title: "Webhooks & Events",
    summary: "Subscribe to platform events with webhooks.",
    docSectionId: "wh-overview",
    relatedRoutes: ["/integrations", "/docs"],
    tags: ["webhooks", "events", "integration"],
  },
  {
    id: "ha-sustainability",
    title: "Sustainability Dashboard",
    summary:
      "Track SDG indicators, environmental metrics, and nation progress.",
    relatedRoutes: ["/sustainability"],
    tags: ["sdg", "sustainability", "impact"],
  },
  {
    id: "ha-academy",
    title: "Academy & Certifications",
    summary:
      "Browse courses, get certified, and submit ideas to the Incubator.",
    docSectionId: "gs-concepts",
    relatedRoutes: ["/academy"],
    tags: ["academy", "training", "certification"],
  },
  {
    id: "ha-assembly",
    title: "Voting in the Global Assembly",
    summary: "Cast votes, submit proposals, and track resolution status.",
    relatedRoutes: ["/assembly", "/resolutions"],
    tags: ["assembly", "voting", "governance"],
  },
];

export function getAllTours() {
  return ONBOARDING_TOURS;
}

export function getTour(tourId: string) {
  return ONBOARDING_TOURS.find((t) => t.tourId === tourId) ?? null;
}

export function getToursByRole(role: string) {
  return ONBOARDING_TOURS.filter(
    (t) => t.targetRole === "any" || t.targetRole === role,
  );
}

export function getHelpArticles(route: string) {
  return HELP_ARTICLES.filter((a) => a.relatedRoutes.includes(route));
}

export function searchHelpArticles(query: string) {
  const q = query.toLowerCase();
  return HELP_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q)),
  );
}
