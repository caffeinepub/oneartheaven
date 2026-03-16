import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Globe,
  Key,
  Layers,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type DocCategory =
  | "getting-started"
  | "authentication"
  | "tenants-orgs"
  | "vendors"
  | "api-reference"
  | "webhooks"
  | "white-label"
  | "finfracfran"
  | "sdks";

interface DocSection {
  id: string;
  category: DocCategory;
  title: string;
  description: string;
  content: string;
  codeExample?: { lang: string; label: string; snippet: string };
  updatedAt: string;
  readingMinutes: number;
}

// ─── Category Metadata ───────────────────────────────────────────────────────

const CATEGORIES: {
  id: DocCategory;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Sparkles,
    color: "oklch(0.72 0.16 75)",
    description: "Platform overview, quickstart guide, and key concepts",
  },
  {
    id: "authentication",
    label: "Authentication",
    icon: Key,
    color: "oklch(0.70 0.18 250)",
    description: "Internet Identity, roles, permissions, and approval pipeline",
  },
  {
    id: "tenants-orgs",
    label: "Tenants & Orgs",
    icon: Layers,
    color: "oklch(0.68 0.17 155)",
    description: "Multi-tenant architecture, org management, and member APIs",
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: Globe,
    color: "oklch(0.72 0.15 200)",
    description: "Vendor portal, listings management, and revenue attribution",
  },
  {
    id: "api-reference",
    label: "API Reference",
    icon: Code2,
    color: "oklch(0.70 0.18 310)",
    description: "Complete backend API reference for all endpoints",
  },
  {
    id: "webhooks",
    label: "Webhooks",
    icon: Webhook,
    color: "oklch(0.68 0.16 30)",
    description: "Event-driven webhook system for real-time integrations",
  },
  {
    id: "white-label",
    label: "White Label",
    icon: FileText,
    color: "oklch(0.70 0.18 310)",
    description: "White label configuration, CSS variables, and custom domains",
  },
  {
    id: "finfracfran",
    label: "FinFracFran™",
    icon: Zap,
    color: "oklch(0.72 0.16 75)",
    description: "Fractionalization, franchising, and revenue attribution APIs",
  },
  {
    id: "sdks",
    label: "SDKs & Tools",
    icon: Terminal,
    color: "oklch(0.68 0.16 140)",
    description: "TypeScript SDK, CLI tooling, and Motoko extension SDK",
  },
];

// ─── Doc Sections Data ───────────────────────────────────────────────────────

const DOC_SECTIONS: DocSection[] = [
  {
    id: "gs-overview",
    category: "getting-started",
    title: "Platform Overview",
    description: "What is ONEartHeaven™ and how does it work?",
    content:
      "ONEartHeaven™ (PlanetsPeacePalace) is a modular, AI-augmented, decentralized global governance platform built on the Internet Computer Protocol (ICP). It is designed to surpass traditional multilateral institutions by delivering transparent, participatory, and innovative solutions to global challenges.\n\nThe platform is built as a full-stack TypeScript/React + Motoko application, deployed on ICP/DePin decentralized infrastructure. It features modular data layers, hooks, and UI components, supporting multi-wallet access via Internet Identity and multi-lingual interfaces.",
    updatedAt: "2026-03-10",
    readingMinutes: 3,
  },
  {
    id: "gs-quickstart",
    category: "getting-started",
    title: "Quickstart Guide",
    description:
      "Get your organization running on the platform in under 10 minutes.",
    content:
      "Follow these steps to onboard your organization:\n\n1. Register at /register and complete the multi-step onboarding form.\n2. An admin will review and approve your application (usually within 24h).\n3. Upon approval, you'll be assigned an Org ID and default role.\n4. Log in with Internet Identity to access your org dashboard.\n5. Configure your white-label settings at /admin/whitelabel.\n6. Choose a PaaS plan at /pricing to unlock advanced features.",
    codeExample: {
      lang: "bash",
      label: "Install the JS SDK",
      snippet:
        "npm install @onearthheaven/sdk\n\n# or using pnpm\npnpm add @onearthheaven/sdk",
    },
    updatedAt: "2026-03-10",
    readingMinutes: 5,
  },
  {
    id: "gs-concepts",
    category: "getting-started",
    title: "Key Concepts",
    description:
      "Understand organizations, tenants, roles, and the FinFracFran™ model.",
    content:
      "**Organizations (Orgs)**: The primary unit of membership. Every user belongs to one or more orgs. Orgs have types (NGO, Nation, City, Cooperative, DAO, Foundation, Corporate) and tiers (Seed → Growth → Scale → Global).\n\n**Tenants**: Each org operates as an isolated tenant with its own data, branding, feature flags, and PaaS subscription.\n\n**Roles**: Platform-level roles include SuperAdmin, OrgAdmin, Delegate, Member, Vendor, and Guest. Roles control access to routes, features, and data.\n\n**FinFracFran™**: The platform's unique economic model combining fractionalization (splitting ownership) and franchising (replicating proven solutions across jurisdictions).",
    updatedAt: "2026-03-08",
    readingMinutes: 4,
  },
  {
    id: "auth-internet-identity",
    category: "authentication",
    title: "Internet Identity",
    description:
      "Authenticate users with ICP's Internet Identity — no passwords required.",
    content:
      "The platform uses Internet Identity (II) for authentication. II is a privacy-preserving identity system built on ICP that uses hardware authenticators (WebAuthn/FIDO2) rather than usernames and passwords.\n\nOn login, a user receives a scoped identity (principal) unique to this application. The principal is used to scope all data access and role assignments.",
    codeExample: {
      lang: "typescript",
      label: "Use the auth hook",
      snippet:
        'import { useInternetIdentity } from "@/hooks/useInternetIdentity";\n\nconst { login, clear, identity, loginStatus } = useInternetIdentity();\n\n// Login\nawait login();\n\n// Get principal\nconst principal = identity?.getPrincipal().toString();\n\n// Logout\nclear();',
    },
    updatedAt: "2026-03-09",
    readingMinutes: 4,
  },
  {
    id: "auth-roles",
    category: "authentication",
    title: "Roles & Permissions",
    description: "Role-based access control (RBAC) with six platform roles.",
    content:
      "Roles are assigned per-user and enforced both on the frontend (route guards) and backend (canister-level checks).\n\nAvailable roles:\n- SuperAdmin: Full platform access, can manage all orgs and users\n- OrgAdmin: Full access within their org\n- Delegate: Can vote on resolutions and submit proposals\n- Member: Can view org content and participate in community features\n- Vendor: Can manage vendor listings and revenue\n- Guest: Unauthenticated or pending-approval users",
    codeExample: {
      lang: "typescript",
      label: "Protect a route by role",
      snippet:
        'import { RequireRole } from "@/components/RequireRole";\n\n// In your route component\n<RequireRole role="OrgAdmin">\n  <AdminDashboard />\n</RequireRole>',
    },
    updatedAt: "2026-03-09",
    readingMinutes: 3,
  },
  {
    id: "to-architecture",
    category: "tenants-orgs",
    title: "Tenant Architecture",
    description:
      "How multi-tenancy works: isolation, context, and data scoping.",
    content:
      "Each organization is an isolated tenant. Tenant isolation is enforced at multiple levels:\n\n1. Frontend: TenantContext provides the active org; all data hooks filter by orgId.\n2. Backend: Motoko canister functions scope queries/mutations to the caller's org.\n3. Storage: Blob storage is scoped per-org so tenants cannot access each other's files.\n\nThe active tenant is resolved from the user's orgId on login. SuperAdmins can switch between any tenant using the org switcher in the Navbar.",
    updatedAt: "2026-03-08",
    readingMinutes: 5,
  },
  {
    id: "api-overview",
    category: "api-reference",
    title: "Backend API Overview",
    description:
      "Introduction to the Motoko canister API and calling conventions.",
    content:
      "The backend is a Motoko canister deployed on ICP. All API calls are made via the actor interface generated from the canister's Candid IDL.\n\nQuery calls (read-only, fast): getCallerUserProfile, getUserProfile, getCallerUserRole, isCallerAdmin, isCallerApproved, listApprovals, getMembers, getMember, getStats, getAllAnnouncements\n\nUpdate calls (state-changing): saveCallerUserProfile, assignCallerUserRole, requestApproval, setApproval, addMember, removeMember, applyForMembership, updateMemberStatus, updateStat, addAnnouncement, removeAnnouncement",
    codeExample: {
      lang: "typescript",
      label: "Call the backend",
      snippet:
        'import { useActor } from "@/hooks/useActor";\n\nconst { actor } = useActor();\n\n// Query call (fast)\nconst profile = await actor.getCallerUserProfile();\n\n// Update call (state-changing)\nawait actor.saveCallerUserProfile({\n  displayName: "Maria",\n  email: "maria@example.org",\n  orgId: "org-001",\n});',
    },
    updatedAt: "2026-03-10",
    readingMinutes: 6,
  },
  {
    id: "wl-config",
    category: "white-label",
    title: "White Label Configuration",
    description:
      "Apply custom branding per tenant using CSS variables and the White Label Studio.",
    content:
      "Each tenant can define a white-label config at /admin/whitelabel. The configuration includes brand name, logo, favicon, primary/secondary/accent colors, font family, tagline, and custom domain.\n\nWhen a tenant is active, the platform applies these CSS variables to :root:\n\n--wl-primary: the primary brand color\n--wl-secondary: the secondary color\n--wl-accent: the accent color\n--wl-font: the selected font family\n\nComponents that use var(--wl-primary) will automatically reflect the tenant's branding.",
    codeExample: {
      lang: "typescript",
      label: "Apply a white-label theme",
      snippet:
        'import { useWhiteLabel } from "@/data/useWhiteLabel";\n\nconst { applyTheme, resetToDefault, config } = useWhiteLabel(orgId);\n\n// Apply tenant theme\napplyTheme(config);\n\n// Reset to platform defaults\nresetToDefault();',
    },
    updatedAt: "2026-03-09",
    readingMinutes: 4,
  },
  {
    id: "ff-overview",
    category: "finfracfran",
    title: "FinFracFran™ Overview",
    description:
      "The economic model powering sustainable, inclusive global growth.",
    content:
      "FinFracFran™ is ONEartHeaven™'s proprietary economic model combining:\n\n**Fractionalization**: Splitting ownership of projects, assets, and revenue streams across multiple stakeholders — enabling capital-light participation globally.\n\n**Franchising**: Replicating proven solutions across jurisdictions — any city, nation, or cooperative can adopt a validated solution and run it under the ONEartHeaven™ umbrella.\n\n**Tiers**: Seed → Growth → Scale → Global. Each tier unlocks higher revenue share rates, more nations reached, and greater platform exposure.\n\nVendors earn a FinFracFran™ revenue share on every listing transaction. Share percentages range from 5% (Seed) to 12% (Global).",
    updatedAt: "2026-03-08",
    readingMinutes: 5,
  },
  {
    id: "sdk-js",
    category: "sdks",
    title: "JavaScript / TypeScript SDK",
    description:
      "Official JS/TS SDK for interacting with the ONEartHeaven™ platform.",
    content:
      "The official SDK provides typed wrappers for all backend APIs, authentication helpers, and utility functions for building integrations.\n\nThe SDK is designed to work in any JavaScript environment — browsers, Node.js, and edge runtimes.",
    codeExample: {
      lang: "typescript",
      label: "SDK usage example",
      snippet:
        'import { createClient } from "@onearthheaven/sdk";\n\nconst client = createClient({\n  canisterId: "your-canister-id",\n  identity: yourIdentity,\n});\n\n// Get user profile\nconst profile = await client.profiles.getCallerProfile();\n\n// List members\nconst members = await client.members.getAll();',
    },
    updatedAt: "2026-03-07",
    readingMinutes: 5,
  },
];

// ─── Code Block Component ─────────────────────────────────────────────────────

function CodeBlock({
  lang,
  label,
  snippet,
}: { lang: string; label: string; snippet: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-lg overflow-hidden border border-white/10 my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-xs font-medium text-white/50">{label}</span>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 text-white/40 border-white/20"
          >
            {lang}
          </Badge>
          <button
            type="button"
            onClick={handleCopy}
            className="text-white/40 hover:text-white/80 transition-colors"
            data-ocid="docs.code.copy"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <pre className="p-4 text-xs text-white/80 overflow-x-auto font-mono leading-relaxed bg-black/40">
        {snippet}
      </pre>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export function DocsPortalPage() {
  const [activeCategory, setActiveCategory] =
    useState<DocCategory>("getting-started");
  const [activeSectionId, setActiveSectionId] = useState<string>("gs-overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredSections = searchQuery
    ? DOC_SECTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : DOC_SECTIONS.filter((s) => s.category === activeCategory);

  const activeSection = DOC_SECTIONS.find((s) => s.id === activeSectionId);

  const categorySections = (cat: DocCategory) =>
    DOC_SECTIONS.filter((s) => s.category === cat);

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.015_265)]">
      {/* Hero */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-[oklch(0.12_0.025_265)] to-[oklch(0.08_0.015_265)]">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-[oklch(0.70_0.18_310)]/20 text-[oklch(0.85_0.12_310)] border-[oklch(0.70_0.18_310)]/30 text-xs">
              Phase 12
            </Badge>
            <Badge
              variant="outline"
              className="text-white/50 border-white/20 text-xs"
            >
              API v1.0
            </Badge>
            <Badge
              variant="outline"
              className="text-white/50 border-white/20 text-xs"
            >
              SDK v1.0.0-beta
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Developer & API Documentation
          </h1>
          <p className="text-white/60 max-w-2xl text-sm">
            Comprehensive guides, API references, SDK docs, and FinFracFran™
            integration documentation for the ONEartHeaven™ PaaS platform.
          </p>
          {/* Search */}
          <div className="relative max-w-md mt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="pl-9 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[oklch(0.72_0.16_75)]/60"
              data-ocid="docs.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id && !searchQuery;
            const sectionCount = categorySections(cat.id).length;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery("");
                  const first = categorySections(cat.id)[0];
                  if (first) setActiveSectionId(first.id);
                }}
                data-ocid={`docs.${cat.id}.tab`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: isActive ? cat.color : undefined }}
                />
                <span className="flex-1 truncate">{cat.label}</span>
                <span className="text-xs text-white/30">{sectionCount}</span>
              </button>
            );
          })}
          <Separator className="my-2 bg-white/10" />
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Built with caffeine.ai
          </a>
        </aside>

        {/* Mobile category toggle */}
        <div className="lg:hidden w-full mb-4">
          <Button
            variant="outline"
            className="w-full border-white/20 text-white/70 bg-white/5"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-ocid="docs.sidebar.toggle"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {CATEGORIES.find((c) => c.id === activeCategory)?.label ??
              "Select Category"}
            <ChevronRight
              className={`h-4 w-4 ml-auto transition-transform ${sidebarOpen ? "rotate-90" : ""}`}
            />
          </Button>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 border border-white/10 rounded-lg overflow-hidden bg-[oklch(0.10_0.02_265)]"
              >
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSearchQuery("");
                        const first = categorySections(cat.id)[0];
                        if (first) setActiveSectionId(first.id);
                        setSidebarOpen(false);
                      }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" style={{ color: cat.color }} />
                      {cat.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search results or section list */}
          {searchQuery ? (
            <div>
              <p className="text-sm text-white/40 mb-4">
                {filteredSections.length} result
                {filteredSections.length !== 1 ? "s" : ""} for &ldquo;
                {searchQuery}&rdquo;
              </p>
              {filteredSections.length === 0 ? (
                <div
                  className="text-center py-12 text-white/30"
                  data-ocid="docs.search.empty_state"
                >
                  <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
                  <p>No results found. Try a different search term.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredSections.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => {
                        const cat = CATEGORIES.find((c) => c.id === s.category);
                        if (cat) setActiveCategory(cat.id);
                        setActiveSectionId(s.id);
                        setSearchQuery("");
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                    >
                      <div className="font-medium text-white text-sm">
                        {s.title}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {s.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-6">
              {/* Section list */}
              <div className="w-44 shrink-0 hidden xl:block">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2 px-2">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </p>
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <div className="space-y-0.5 pr-2">
                    {filteredSections.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setActiveSectionId(s.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all ${
                          activeSectionId === s.id
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/40 hover:text-white/70 hover:bg-white/5"
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Section content */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  {activeSection ? (
                    <motion.div
                      key={activeSection.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Breadcrumb */}
                      <div className="flex items-center gap-1.5 text-xs text-white/30 mb-4">
                        <Link
                          to="/docs"
                          className="hover:text-white/50 transition-colors"
                        >
                          Docs
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white/40">
                          {
                            CATEGORIES.find(
                              (c) => c.id === activeSection.category,
                            )?.label
                          }
                        </span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white/60">
                          {activeSection.title}
                        </span>
                      </div>

                      {/* Title & meta */}
                      <h2 className="text-xl font-bold text-white mb-1">
                        {activeSection.title}
                      </h2>
                      <p className="text-white/50 text-sm mb-2">
                        {activeSection.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-white/30 mb-6">
                        <span>{activeSection.readingMinutes} min read</span>
                        <span>Updated {activeSection.updatedAt}</span>
                      </div>
                      <Separator className="bg-white/10 mb-6" />

                      {/* Content */}
                      <div className="prose prose-invert prose-sm max-w-none">
                        {activeSection.content.split("\n\n").map((para) => (
                          <p
                            key={`para-${para.slice(0, 20)}`}
                            className="text-white/70 leading-relaxed mb-4 text-sm"
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Code example */}
                      {activeSection.codeExample && (
                        <CodeBlock {...activeSection.codeExample} />
                      )}

                      {/* Related sections */}
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
                          Continue Reading
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {filteredSections
                            .filter((s) => s.id !== activeSection.id)
                            .slice(0, 2)
                            .map((s, i) => (
                              <button
                                type="button"
                                key={s.id}
                                onClick={() => setActiveSectionId(s.id)}
                                data-ocid={`docs.related.item.${i + 1}`}
                                className="text-left px-4 py-3 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-white/70 text-sm group-hover:text-white transition-colors">
                                    {s.title}
                                  </span>
                                  <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
                                </div>
                                <p className="text-xs text-white/30 mt-0.5">
                                  {s.description}
                                </p>
                              </button>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Welcome / category overview
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <BookOpen className="h-10 w-10 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40 text-sm">
                        Select a section to get started
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category overview cards (shown when no section selected yet) */}
      {!activeSectionId && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const count = categorySections(cat.id).length;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const first = categorySections(cat.id)[0];
                    if (first) setActiveSectionId(first.id);
                  }}
                  data-ocid={`docs.category.item.${i + 1}`}
                  className="text-left p-5 rounded-xl border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${cat.color}22` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: cat.color }} />
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">
                    {cat.label}
                  </div>
                  <div className="text-xs text-white/40 mb-2">
                    {cat.description}
                  </div>
                  <div className="text-xs text-white/25">
                    {count} section{count !== 1 ? "s" : ""}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-white/25">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/60 transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
