import { CountUpNumber } from "@/components/CountUpNumber";
import {
  FFInlineBadge,
  FFSpotlightHeader,
  FFTierBadge,
} from "@/components/FFBrand";
import { SearchInput } from "@/components/SearchInput";
import {
  SheetDetailHeader,
  SheetSectionLabel,
} from "@/components/SheetDetailHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  SheetClose,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { INTEGRATION_PARTNERS, WEBHOOK_CONFIGS } from "@/data/integrationData";
import {
  ENDPOINT_STATUS_CONFIG,
  HTTP_METHOD_CONFIG,
  MODULE_CONFIG,
  PARTNER_TYPE_CONFIG,
  WEBHOOK_EVENT_CONFIG,
} from "@/data/integrationTypes";
import {
  useAPIEndpoints,
  useIntegrationPartners,
  useIntegrationStats,
  useWebhooks,
} from "@/hooks/useIntegrations";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  FileDown,
  Globe,
  Key,
  Layers,
  Server,
  Users,
  Webhook,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helper: HTTP Method Badge ──────────────────────────────────────────────────
function MethodBadge({ method }: { method: string }) {
  const config = HTTP_METHOD_CONFIG[method as keyof typeof HTTP_METHOD_CONFIG];
  if (!config) return null;
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold tracking-wide"
      style={{
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}33`,
      }}
    >
      {method}
    </span>
  );
}

// ─── Auth badge ─────────────────────────────────────────────────────────────────
function AuthBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    public: "oklch(0.7 0.18 140)",
    bearer: "oklch(0.7 0.18 195)",
    api_key: "oklch(0.72 0.16 75)",
    oauth2: "oklch(0.7 0.18 270)",
  };
  const labels: Record<string, string> = {
    public: "Public",
    bearer: "Bearer",
    api_key: "API Key",
    oauth2: "OAuth2",
  };
  const color = colors[type] ?? "oklch(0.6 0.04 260)";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
      style={{
        color,
        background: `${color.replace(")", " / 0.12)")}`,
        border: `1px solid ${color}33`,
      }}
    >
      <Key className="h-3 w-3" />
      {labels[type] ?? type}
    </span>
  );
}

// ─── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const config =
    ENDPOINT_STATUS_CONFIG[status as keyof typeof ENDPOINT_STATUS_CONFIG];
  if (!config) return null;
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        color: config.color,
        background: `${config.color.replace(")", " / 0.1)")}`,
        border: `1px solid ${config.color}33`,
      }}
    >
      {config.label}
    </span>
  );
}

// ─── Partner Status Badge ───────────────────────────────────────────────────────
function PartnerStatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; label: string }> = {
    active: { color: "oklch(0.7 0.18 140)", label: "Active" },
    pending: { color: "oklch(0.75 0.18 75)", label: "Pending" },
    suspended: { color: "oklch(0.65 0.2 27)", label: "Suspended" },
  };
  const c = map[status] ?? { color: "oklch(0.6 0.04 260)", label: status };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        color: c.color,
        background: `${c.color.replace(")", " / 0.1)")}`,
        border: `1px solid ${c.color}33`,
      }}
    >
      {c.label}
    </span>
  );
}

// ─── Code Block ─────────────────────────────────────────────────────────────────
function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1px solid oklch(0.25 0.04 260)" }}
    >
      <div
        className="px-3 py-1.5 text-xs font-mono font-semibold"
        style={{
          background: "oklch(0.12 0.03 260)",
          color: "oklch(0.6 0.04 260)",
        }}
      >
        {label}
      </div>
      <pre
        className="p-3 text-xs font-mono overflow-auto"
        style={{
          background: "oklch(0.09 0.02 260)",
          color: "oklch(0.75 0.08 195)",
          maxHeight: "160px",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

// ─── Module tabs list ───────────────────────────────────────────────────────────
const MODULE_TABS = [
  { key: "all", label: "All", emoji: "✦" },
  ...Object.entries(MODULE_CONFIG).map(([key, val]) => ({
    key,
    label: val.label,
    emoji: val.emoji,
  })),
];

const STATUS_TABS = ["all", "active", "beta", "deprecated"] as const;

const PARTNER_TYPE_TABS = [
  { key: "all", label: "All" },
  { key: "ngo", label: "NGO" },
  { key: "un_agency", label: "UN Agency" },
  { key: "academic", label: "Academic" },
  { key: "corporate", label: "Corporate" },
  { key: "government", label: "Government" },
  { key: "finfracfran_licensee", label: "FinFracFran™" },
];

const PARTNER_STATUS_TABS = ["all", "active", "pending", "suspended"] as const;

// ─── Main Page ──────────────────────────────────────────────────────────────────
export function IntegrationsPage() {
  const stats = useIntegrationStats();
  const epState = useAPIEndpoints();
  const partnerState = useIntegrationPartners();
  const whState = useWebhooks();
  const [whGroupFilter, setWhGroupFilter] = useState("all");
  const [addWebhookOpen, setAddWebhookOpen] = useState(false);
  const [whEventType, setWhEventType] = useState("");
  const [whTargetUrl, setWhTargetUrl] = useState("");
  const [whSecretKey, setWhSecretKey] = useState("");

  const WH_GROUP_TABS = [
    { key: "all", label: "All" },
    { key: "proposal", label: "Proposal Events" },
    { key: "voting", label: "Voting Alerts" },
    { key: "solution", label: "Solution Events" },
    { key: "audit", label: "Audit Triggers" },
    { key: "finfracfran", label: "FinFracFran™ Events" },
    { key: "member", label: "Member & Delegate Events" },
  ];

  const WH_GROUP_EVENTS: Record<string, string[]> = {
    proposal: ["proposal_created", "proposal_voted"],
    voting: ["resolution_passed"],
    solution: ["solution_adopted"],
    audit: ["audit_triggered", "contract_flagged"],
    finfracfran: ["finfracfran_license_issued"],
    member: ["delegate_registered", "member_joined", "council_action"],
  };

  const filteredWebhooks = WEBHOOK_CONFIGS.filter((wh) => {
    if (whGroupFilter === "all") return true;
    const events = WH_GROUP_EVENTS[whGroupFilter] ?? [];
    return events.includes(wh.eventType);
  });

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="integrations.page"
    >
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        data-ocid="integrations.hero.section"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.08 0.06 220) 0%, oklch(0.06 0.03 260) 50%, oklch(0.09 0.04 195) 100%)",
        }}
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.55 0.14 195 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.14 195 / 0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, oklch(0.55 0.14 195 / 0.12) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.55 0.14 195 / 0.4)",
              background: "oklch(0.55 0.14 195 / 0.08)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.7 0.18 140)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.7 0.18 195)" }}
            >
              Phase 7 — Open API Layer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-hero-xl font-display mb-5"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.1 195), oklch(0.7 0.18 195), oklch(0.6 0.2 220))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Open API.
            </span>{" "}
            <span className="text-white">Open World.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: "oklch(0.65 0.06 220)" }}
          >
            The ONEartHeaven open integration layer connects governance,
            solutions, transparency, and FinFracFran™ modules to the world. 12
            endpoints. 8 partners. Real-time webhooks. Fully auditable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button
              onClick={() =>
                document
                  .getElementById("endpoints")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="gap-2 font-semibold hover:scale-105 transition-transform"
              style={{
                background: "oklch(0.55 0.14 195)",
                color: "white",
                border: "none",
              }}
              data-ocid="integrations.explore_endpoints.button"
            >
              <Server className="h-4 w-4" />
              Explore Endpoints
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("developer")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gap-2 font-semibold"
              style={{
                borderColor: "oklch(0.55 0.14 195 / 0.4)",
                color: "oklch(0.7 0.18 195)",
              }}
              data-ocid="integrations.developer_portal.button"
            >
              <Globe className="h-4 w-4" />
              Developer Portal
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        className="py-8 border-y"
        style={{ borderColor: "oklch(0.18 0.04 260)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Active Endpoints",
                value: stats.activeEndpoints,
                color: "oklch(0.7 0.18 195)",
                icon: Server,
              },
              {
                label: "Integration Partners",
                value: stats.activePartners,
                color: "oklch(0.65 0.14 170)",
                icon: Users,
              },
              {
                label: "Active Webhooks",
                value: stats.activeWebhooks,
                color: "oklch(0.72 0.16 75)",
                icon: Webhook,
              },
              {
                label: "API Uptime",
                value: `${stats.uptimePercent}%`,
                color: "oklch(0.7 0.18 140)",
                icon: CheckCircle2,
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "oklch(var(--cosmos-surface) / 0.6)",
                    border: `1px solid ${stat.color}22`,
                  }}
                >
                  <Icon
                    className="h-5 w-5 mx-auto mb-2"
                    style={{ color: stat.color }}
                  />
                  <div
                    className="text-2xl font-bold font-display"
                    style={{ color: stat.color }}
                  >
                    <CountUpNumber value={stat.value} />
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Part C: Endpoint Directory ── */}
      <section id="endpoints" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Server
                className="h-6 w-6"
                style={{ color: "oklch(0.7 0.18 195)" }}
              />
              <h2
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                API Endpoint Directory
              </h2>
            </div>
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 260)" }}>
              {stats.totalEndpoints} endpoints across{" "}
              {Object.keys(MODULE_CONFIG).length} modules. All governance,
              solutions, and FinFracFran™ data is accessible.
            </p>
          </motion.div>

          {/* Module Tabs */}
          <div
            className="flex flex-wrap gap-2 mb-4"
            data-ocid="integrations.module.tab"
          >
            {MODULE_TABS.map((tab) => (
              <button
                type="button"
                key={tab.key}
                onClick={() => epState.setActiveModule(tab.key)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background:
                    epState.activeModule === tab.key
                      ? "oklch(0.55 0.14 195 / 0.2)"
                      : "oklch(var(--cosmos-surface) / 0.5)",
                  color:
                    epState.activeModule === tab.key
                      ? "oklch(0.7 0.18 195)"
                      : "oklch(0.55 0.04 260)",
                  border:
                    epState.activeModule === tab.key
                      ? "1px solid oklch(0.55 0.14 195 / 0.4)"
                      : "1px solid oklch(0.2 0.03 260)",
                }}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>

          {/* Status Pills + Search */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex gap-2">
              {STATUS_TABS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => epState.setActiveStatus(s)}
                  className="px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all"
                  style={{
                    background:
                      epState.activeStatus === s
                        ? "oklch(0.55 0.14 195 / 0.2)"
                        : "transparent",
                    color:
                      epState.activeStatus === s
                        ? "oklch(0.7 0.18 195)"
                        : "oklch(0.45 0.04 260)",
                    border:
                      epState.activeStatus === s
                        ? "1px solid oklch(0.55 0.14 195 / 0.35)"
                        : "1px solid oklch(0.2 0.03 260)",
                  }}
                >
                  {s === "all"
                    ? "All Status"
                    : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            <SearchInput
              data-ocid="integrations.endpoints.search_input"
              value={epState.search}
              onChange={epState.setSearch}
              placeholder="Search endpoints..."
              className="flex-1 min-w-[180px]"
            />

            {epState.activeFilterCount > 0 && (
              <button
                type="button"
                onClick={epState.clearFilters}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{
                  color: "oklch(0.65 0.2 27)",
                  border: "1px solid oklch(0.65 0.2 27 / 0.3)",
                }}
                data-ocid="integrations.endpoints.clear.button"
              >
                <X className="h-3 w-3" />
                Clear ({epState.activeFilterCount})
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            {epState.endpoints.length === 0 ? (
              <motion.div
                key="ep-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
                data-ocid="integrations.endpoints.empty_state"
              >
                <Server
                  className="h-10 w-10 mx-auto mb-4"
                  style={{ color: "oklch(0.3 0.04 260)" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  No endpoints match your filters.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={epState.clearFilters}
                  className="mt-3"
                  data-ocid="integrations.endpoints.reset.button"
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="ep-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                data-ocid="integrations.endpoints.list"
              >
                {epState.endpoints.map((ep, idx) => {
                  const modCfg = MODULE_CONFIG[ep.module];
                  return (
                    <motion.div
                      key={ep.id}
                      data-ocid={`integrations.endpoints.item.${idx + 1}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="rounded-xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{
                        background: "oklch(var(--cosmos-surface) / 0.7)",
                        border: "1px solid oklch(0.2 0.04 260)",
                        boxShadow: "0 4px 20px oklch(0.05 0.03 260 / 0.3)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <MethodBadge method={ep.method} />
                        <StatusBadge status={ep.status} />
                      </div>

                      <div>
                        <div
                          className="font-mono text-xs mb-1 break-all"
                          style={{ color: "oklch(0.7 0.18 195)" }}
                        >
                          {ep.path}
                        </div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          {ep.name}
                        </div>
                      </div>

                      <p
                        className="text-xs leading-relaxed line-clamp-2"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                      >
                        {ep.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            color: modCfg.color,
                            background: `${modCfg.color.replace(")", " / 0.1)")}`,
                            border: `1px solid ${modCfg.color.replace(")", " / 0.25)")}`,
                          }}
                        >
                          {modCfg.emoji} {modCfg.label}
                        </span>
                        <AuthBadge type={ep.authType} />
                        <span
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{
                            color: "oklch(0.55 0.04 260)",
                            background: "oklch(0.14 0.03 260)",
                            border: "1px solid oklch(0.2 0.04 260)",
                          }}
                        >
                          {ep.rateLimit}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            color: "oklch(0.55 0.04 260)",
                            background: "oklch(0.14 0.03 260)",
                            border: "1px solid oklch(0.2 0.04 260)",
                          }}
                        >
                          {ep.version}
                        </span>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full mt-1 text-xs font-semibold"
                        style={{
                          color: "oklch(0.7 0.18 195)",
                          border: "1px solid oklch(0.55 0.14 195 / 0.2)",
                        }}
                        onClick={() => epState.openEndpoint(ep)}
                        data-ocid={`integrations.endpoints.view_docs.button.${idx + 1}`}
                      >
                        View Docs
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Endpoint Detail Sheet ── */}
      <Sheet
        open={!!epState.selectedEndpoint}
        onOpenChange={(open) => !open && epState.closeEndpoint()}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto"
          style={{
            background: "oklch(0.08 0.03 260)",
            borderLeft: "1px solid oklch(0.2 0.04 260)",
          }}
          data-ocid="integrations.endpoint.sheet"
        >
          {epState.selectedEndpoint && (
            <>
              <SheetDetailHeader
                badges={[
                  {
                    label: epState.selectedEndpoint.method,
                    color:
                      HTTP_METHOD_CONFIG[epState.selectedEndpoint.method]
                        ?.color ?? "oklch(0.65 0.14 220)",
                    bg: "oklch(0.65 0.14 220 / 0.12)",
                    border: "oklch(0.65 0.14 220 / 0.30)",
                  },
                  {
                    label: epState.selectedEndpoint.status,
                    color:
                      ENDPOINT_STATUS_CONFIG[epState.selectedEndpoint.status]
                        ?.color ?? "oklch(0.65 0.18 142)",
                    bg: "oklch(0.65 0.18 142 / 0.12)",
                    border: "oklch(0.65 0.18 142 / 0.30)",
                  },
                  {
                    label: epState.selectedEndpoint.version,
                    color: "oklch(0.72 0.16 75)",
                    bg: "oklch(0.72 0.16 75 / 0.10)",
                    border: "oklch(0.72 0.16 75 / 0.30)",
                  },
                ]}
                title={epState.selectedEndpoint.name}
                subtitle={epState.selectedEndpoint.path}
                onClose={() => epState.closeEndpoint()}
                closeOcid="integrations.endpoint.sheet.close_button"
                accentColor="oklch(0.55 0.14 195)"
              />

              <div className="space-y-5">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  {epState.selectedEndpoint.description}
                </p>

                <div
                  className="flex flex-wrap gap-3 p-3 rounded-lg"
                  style={{
                    background: "oklch(0.11 0.03 260)",
                    border: "1px solid oklch(0.18 0.03 260)",
                  }}
                >
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "oklch(0.45 0.04 260)" }}
                    >
                      Auth
                    </div>
                    <AuthBadge type={epState.selectedEndpoint.authType} />
                  </div>
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "oklch(0.45 0.04 260)" }}
                    >
                      Rate Limit
                    </div>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: "oklch(0.72 0.16 75)" }}
                    >
                      {epState.selectedEndpoint.rateLimit}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "oklch(0.45 0.04 260)" }}
                    >
                      Module
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.7 0.18 195)" }}
                    >
                      {MODULE_CONFIG[epState.selectedEndpoint.module]?.emoji}{" "}
                      {MODULE_CONFIG[epState.selectedEndpoint.module]?.label}
                    </span>
                  </div>
                </div>

                {epState.selectedEndpoint.requestSchema && (
                  <CodeBlock
                    code={epState.selectedEndpoint.requestSchema}
                    label="Request Schema"
                  />
                )}
                {epState.selectedEndpoint.responseSchema && (
                  <CodeBlock
                    code={epState.selectedEndpoint.responseSchema}
                    label="Response Schema"
                  />
                )}
                {epState.selectedEndpoint.examplePayload && (
                  <CodeBlock
                    code={epState.selectedEndpoint.examplePayload}
                    label="Example"
                  />
                )}

                {epState.selectedEndpoint.changelog &&
                  epState.selectedEndpoint.changelog.length > 0 && (
                    <div>
                      <div
                        className="text-xs font-semibold mb-3 uppercase tracking-widest"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        Changelog
                      </div>
                      <div className="space-y-2">
                        {epState.selectedEndpoint.changelog.map((entry) => (
                          <div
                            key={`${entry.version}-${entry.date}`}
                            className="flex items-start gap-3"
                          >
                            <span
                              className="text-xs font-mono mt-0.5"
                              style={{
                                color: "oklch(0.72 0.16 75)",
                                minWidth: "70px",
                              }}
                            >
                              {entry.version}
                            </span>
                            <span
                              className="text-xs"
                              style={{
                                color: "oklch(0.45 0.04 260)",
                                minWidth: "80px",
                              }}
                            >
                              {entry.date}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "oklch(0.65 0.04 260)" }}
                            >
                              {entry.note}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Part D: Integration Partners ── */}
      <section
        id="partners"
        className="py-16 sm:py-20"
        style={{ borderTop: "1px solid oklch(0.15 0.03 260)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users
                className="h-6 w-6"
                style={{ color: "oklch(0.65 0.14 170)" }}
              />
              <h2
                className="font-display text-2xl sm:text-3xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Integration Partners
              </h2>
            </div>
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 260)" }}>
              {stats.activePartners} active partners across UN agencies, NGOs,
              academic institutions, governments, and FinFracFran™ licensees.
            </p>
          </motion.div>

          {/* Partner Type Filter */}
          <div
            className="flex flex-wrap gap-2 mb-4"
            data-ocid="integrations.partners.type.tab"
          >
            {PARTNER_TYPE_TABS.map((tab) => {
              const typeCfg =
                tab.key !== "all"
                  ? PARTNER_TYPE_CONFIG[
                      tab.key as keyof typeof PARTNER_TYPE_CONFIG
                    ]
                  : null;
              const color = typeCfg?.color ?? "oklch(0.65 0.14 170)";
              const active = partnerState.activeType === tab.key;
              return (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => partnerState.setActiveType(tab.key)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: active
                      ? `${color.replace(")", " / 0.15)")}`
                      : "oklch(var(--cosmos-surface) / 0.5)",
                    color: active ? color : "oklch(0.55 0.04 260)",
                    border: active
                      ? `1px solid ${color.replace(")", " / 0.4)")}`
                      : "1px solid oklch(0.2 0.03 260)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Partner Status + Search */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex gap-2">
              {PARTNER_STATUS_TABS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => partnerState.setActiveStatus(s)}
                  className="px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all"
                  style={{
                    background:
                      partnerState.activeStatus === s
                        ? "oklch(0.65 0.14 170 / 0.2)"
                        : "transparent",
                    color:
                      partnerState.activeStatus === s
                        ? "oklch(0.65 0.14 170)"
                        : "oklch(0.45 0.04 260)",
                    border:
                      partnerState.activeStatus === s
                        ? "1px solid oklch(0.65 0.14 170 / 0.35)"
                        : "1px solid oklch(0.2 0.03 260)",
                  }}
                >
                  {s === "all"
                    ? "All Status"
                    : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            <SearchInput
              data-ocid="integrations.partners.search_input"
              value={partnerState.search}
              onChange={partnerState.setSearch}
              placeholder="Search partners..."
              className="flex-1 min-w-[180px]"
            />

            {partnerState.activeFilterCount > 0 && (
              <button
                type="button"
                onClick={partnerState.clearFilters}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{
                  color: "oklch(0.65 0.2 27)",
                  border: "1px solid oklch(0.65 0.2 27 / 0.3)",
                }}
                data-ocid="integrations.partners.clear.button"
              >
                <X className="h-3 w-3" />
                Clear ({partnerState.activeFilterCount})
              </button>
            )}
          </div>

          {/* Partners Grid */}
          <AnimatePresence mode="wait">
            {partnerState.partners.length === 0 ? (
              <motion.div
                key="partner-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
                data-ocid="integrations.partners.empty_state"
              >
                <Users
                  className="h-10 w-10 mx-auto mb-4"
                  style={{ color: "oklch(0.3 0.04 260)" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  No partners match your filters.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={partnerState.clearFilters}
                  className="mt-3"
                  data-ocid="integrations.partners.reset.button"
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="partner-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                data-ocid="integrations.partners.list"
              >
                {partnerState.partners.map((partner, idx) => {
                  const typeCfg = PARTNER_TYPE_CONFIG[partner.type];
                  return (
                    <motion.div
                      key={partner.id}
                      data-ocid={`integrations.partners.item.${idx + 1}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="rounded-xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{
                        background: "oklch(var(--cosmos-surface) / 0.7)",
                        border: "1px solid oklch(0.2 0.04 260)",
                        boxShadow: "0 4px 20px oklch(0.05 0.03 260 / 0.3)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded font-semibold"
                          style={{
                            color: typeCfg.color,
                            background: `${typeCfg.color.replace(")", " / 0.1)")}`,
                            border: `1px solid ${typeCfg.color.replace(")", " / 0.25)")}`,
                          }}
                        >
                          {typeCfg.label}
                        </span>
                        <PartnerStatusBadge status={partner.status} />
                      </div>

                      <div>
                        <div
                          className="font-display font-bold text-base"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          {partner.orgName}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.5 0.04 260)" }}
                        >
                          📍 {partner.country}
                        </div>
                      </div>

                      <p
                        className="text-xs leading-relaxed line-clamp-2"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                      >
                        {partner.description}
                      </p>

                      {/* Scopes */}
                      <div className="flex flex-wrap gap-1.5">
                        {partner.scopes.slice(0, 3).map((scope) => (
                          <span
                            key={scope}
                            className="text-xs px-1.5 py-0.5 rounded font-mono"
                            style={{
                              color: "oklch(0.65 0.14 170)",
                              background: "oklch(0.65 0.14 170 / 0.1)",
                              border: "1px solid oklch(0.65 0.14 170 / 0.2)",
                            }}
                          >
                            {scope}
                          </span>
                        ))}
                        {partner.scopes.length > 3 && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              color: "oklch(0.45 0.04 260)",
                              background: "oklch(0.14 0.03 260)",
                            }}
                          >
                            +{partner.scopes.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* FF Tier */}
                      {partner.ffTier && (
                        <FFTierBadge
                          tier={partner.ffTier ?? ""}
                          size="xs"
                          showIcon
                        />
                      )}

                      <div
                        className="flex gap-2 mt-auto text-xs"
                        style={{ color: "oklch(0.4 0.04 260)" }}
                      >
                        <span>Joined {partner.integrationDate}</span>
                        <span>·</span>
                        <span>Active {partner.lastActive}</span>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full mt-1 text-xs font-semibold"
                        style={{
                          color: "oklch(0.65 0.14 170)",
                          border: "1px solid oklch(0.65 0.14 170 / 0.2)",
                        }}
                        onClick={() => partnerState.openPartner(partner)}
                        data-ocid={`integrations.partners.view.button.${idx + 1}`}
                      >
                        View Integration
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Partner Detail Sheet ── */}
      <Sheet
        open={!!partnerState.selectedPartner}
        onOpenChange={(open) => !open && partnerState.closePartner()}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto"
          style={{
            background: "oklch(0.08 0.03 260)",
            borderLeft: "1px solid oklch(0.2 0.04 260)",
          }}
          data-ocid="integrations.partner.sheet"
        >
          {partnerState.selectedPartner &&
            (() => {
              const p = partnerState.selectedPartner;
              const typeCfg = PARTNER_TYPE_CONFIG[p.type];
              const keyStatusMap: Record<
                string,
                { icon: typeof CheckCircle2; color: string; label: string }
              > = {
                active: {
                  icon: CheckCircle2,
                  color: "oklch(0.7 0.18 140)",
                  label: "Active",
                },
                rotated: {
                  icon: AlertCircle,
                  color: "oklch(0.75 0.18 75)",
                  label: "Rotated",
                },
                revoked: {
                  icon: XCircle,
                  color: "oklch(0.65 0.2 27)",
                  label: "Revoked",
                },
              };
              const keyStatus =
                keyStatusMap[p.apiKeyStatus] ?? keyStatusMap.active;
              const KeyIcon = keyStatus.icon;
              return (
                <>
                  <SheetHeader className="mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded font-semibold"
                        style={{
                          color: typeCfg.color,
                          background: `${typeCfg.color.replace(")", " / 0.12)")}`,
                          border: `1px solid ${typeCfg.color.replace(")", " / 0.3)")}`,
                        }}
                      >
                        {typeCfg.label}
                      </span>
                      <PartnerStatusBadge status={p.status} />
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        📍 {p.country}
                      </span>
                    </div>
                    <SheetTitle
                      className="font-display font-bold text-xl"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {p.orgName}
                    </SheetTitle>
                  </SheetHeader>

                  <div className="space-y-5">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.65 0.04 260)" }}
                    >
                      {p.description}
                    </p>

                    {/* Scopes */}
                    <div>
                      <div
                        className="text-xs font-semibold mb-2 uppercase tracking-widest"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        API Scopes
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.scopes.map((scope) => (
                          <span
                            key={scope}
                            className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{
                              color: "oklch(0.65 0.14 170)",
                              background: "oklch(0.65 0.14 170 / 0.1)",
                              border: "1px solid oklch(0.65 0.14 170 / 0.25)",
                            }}
                          >
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* API Key Status */}
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{
                        background: "oklch(0.11 0.03 260)",
                        border: "1px solid oklch(0.18 0.03 260)",
                      }}
                    >
                      <KeyIcon
                        className="h-4 w-4"
                        style={{ color: keyStatus.color }}
                      />
                      <div>
                        <div
                          className="text-xs font-semibold"
                          style={{ color: keyStatus.color }}
                        >
                          API Key: {keyStatus.label}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.45 0.04 260)" }}
                        >
                          Last active: {p.lastActive}
                        </div>
                      </div>
                    </div>

                    {/* Webhook Subscriptions */}
                    {p.webhookSubscriptions &&
                      p.webhookSubscriptions.length > 0 && (
                        <div>
                          <div
                            className="text-xs font-semibold mb-2 uppercase tracking-widest"
                            style={{ color: "oklch(0.45 0.04 260)" }}
                          >
                            Webhook Subscriptions
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {p.webhookSubscriptions.map((evt) => (
                              <span
                                key={evt}
                                className="text-xs px-2 py-0.5 rounded capitalize"
                                style={{
                                  color: "oklch(0.7 0.18 195)",
                                  background: "oklch(0.7 0.18 195 / 0.1)",
                                  border: "1px solid oklch(0.7 0.18 195 / 0.2)",
                                }}
                              >
                                {evt.replace(/_/g, " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* FinFracFran Tier */}
                    {p.ffTier && (
                      <div
                        className="p-3 rounded-lg"
                        style={{
                          background: "oklch(0.72 0.16 75 / 0.08)",
                          border: "1px solid oklch(0.72 0.16 75 / 0.25)",
                        }}
                      >
                        <div
                          className="text-xs font-semibold mb-1 uppercase tracking-widest"
                          style={{ color: "oklch(0.72 0.16 75)" }}
                        >
                          💎 FinFracFran™ Licensing
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "oklch(0.7 0.1 260)" }}
                        >
                          Tier:{" "}
                          <span style={{ color: "oklch(0.72 0.16 75)" }}>
                            {p.ffTier}
                          </span>
                        </div>
                        <div
                          className="text-xs mt-1"
                          style={{ color: "oklch(0.5 0.04 260)" }}
                        >
                          Active licensee since {p.integrationDate}
                        </div>
                      </div>
                    )}

                    {/* Contact */}
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg"
                      style={{
                        background: "oklch(0.11 0.03 260)",
                        border: "1px solid oklch(0.18 0.03 260)",
                      }}
                    >
                      <Globe
                        className="h-4 w-4"
                        style={{ color: "oklch(0.55 0.14 195)" }}
                      />
                      <div>
                        <div
                          className="text-xs font-semibold"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          Technical Contact
                        </div>
                        <div
                          className="text-xs mt-0.5 font-mono"
                          style={{ color: "oklch(0.7 0.18 195)" }}
                        >
                          {p.contactEmail}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
        </SheetContent>
      </Sheet>

      {/* ── Part E: Webhook Configuration Panel ── */}
      <section
        id="webhooks"
        className="py-16 sm:py-20"
        style={{ borderTop: "1px solid oklch(0.15 0.03 260)" }}
        data-ocid="integrations.webhooks.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <Zap
                  className="h-6 w-6"
                  style={{ color: "oklch(0.75 0.18 75)" }}
                />
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Webhook Configuration
                </h2>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.75 0.18 75 / 0.15)",
                    color: "oklch(0.75 0.18 75)",
                    border: "1px solid oklch(0.75 0.18 75 / 0.3)",
                  }}
                >
                  Phase 7
                </span>
              </div>
              {/* Add Webhook Dialog */}
              <Dialog open={addWebhookOpen} onOpenChange={setAddWebhookOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="integrations.webhooks.add_modal_button"
                    style={{
                      borderColor: "oklch(0.75 0.18 75 / 0.4)",
                      color: "oklch(0.75 0.18 75)",
                      background: "oklch(0.75 0.18 75 / 0.08)",
                    }}
                  >
                    <Zap className="h-3.5 w-3.5 mr-1.5" />
                    Add Webhook
                  </Button>
                </DialogTrigger>
                <DialogContent
                  data-ocid="integrations.webhooks.dialog"
                  style={{
                    background: "oklch(0.09 0.04 260)",
                    border: "1px solid oklch(0.18 0.03 260)",
                  }}
                >
                  <DialogHeader>
                    <DialogTitle style={{ color: "oklch(var(--pearl))" }}>
                      Register Webhook
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                      <Label style={{ color: "oklch(0.65 0.04 260)" }}>
                        Event Type
                      </Label>
                      <Select
                        value={whEventType}
                        onValueChange={setWhEventType}
                      >
                        <SelectTrigger
                          data-ocid="integrations.webhooks.dialog.select"
                          style={{
                            background: "oklch(0.12 0.03 260)",
                            borderColor: "oklch(0.2 0.03 260)",
                            color: "oklch(var(--pearl))",
                          }}
                        >
                          <SelectValue placeholder="Select event type..." />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            background: "oklch(0.1 0.04 260)",
                            borderColor: "oklch(0.2 0.03 260)",
                          }}
                        >
                          {(
                            Object.keys(WEBHOOK_EVENT_CONFIG) as Array<
                              keyof typeof WEBHOOK_EVENT_CONFIG
                            >
                          ).map((evt) => (
                            <SelectItem
                              key={evt}
                              value={evt}
                              style={{ color: "oklch(var(--pearl))" }}
                            >
                              {WEBHOOK_EVENT_CONFIG[evt].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label style={{ color: "oklch(0.65 0.04 260)" }}>
                        Target URL
                      </Label>
                      <Input
                        data-ocid="integrations.webhooks.dialog.input"
                        placeholder="https://your-endpoint.com/webhook"
                        value={whTargetUrl}
                        onChange={(e) => setWhTargetUrl(e.target.value)}
                        style={{
                          background: "oklch(0.12 0.03 260)",
                          borderColor: "oklch(0.2 0.03 260)",
                          color: "oklch(var(--pearl))",
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label style={{ color: "oklch(0.65 0.04 260)" }}>
                        Secret Key
                      </Label>
                      <Input
                        data-ocid="integrations.webhooks.dialog.secret_input"
                        type="password"
                        placeholder="wh_secret_..."
                        value={whSecretKey}
                        onChange={(e) => setWhSecretKey(e.target.value)}
                        style={{
                          background: "oklch(0.12 0.03 260)",
                          borderColor: "oklch(0.2 0.03 260)",
                          color: "oklch(var(--pearl))",
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      data-ocid="integrations.webhooks.dialog.cancel_button"
                      onClick={() => setAddWebhookOpen(false)}
                      style={{
                        borderColor: "oklch(0.25 0.03 260)",
                        color: "oklch(0.55 0.04 260)",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      data-ocid="integrations.webhooks.dialog.submit_button"
                      disabled={!whEventType || !whTargetUrl}
                      onClick={() => {
                        toast.success("Webhook registered successfully");
                        setAddWebhookOpen(false);
                        setWhEventType("");
                        setWhTargetUrl("");
                        setWhSecretKey("");
                      }}
                      style={{
                        background: "oklch(0.75 0.18 75)",
                        color: "oklch(0.08 0.03 260)",
                      }}
                    >
                      Register Webhook
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 260)" }}>
              Real-time event delivery to your systems. Monitor, test, and
              manage webhook subscriptions across all ONEartHeaven™ modules.
            </p>
          </motion.div>

          {/* Event Type Group Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {WH_GROUP_TABS.map((tab) => {
              const active = whGroupFilter === tab.key;
              const goldColor = "oklch(0.75 0.18 75)";
              return (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setWhGroupFilter(tab.key)}
                  data-ocid="integrations.webhooks.filter.tab"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background: active
                      ? "oklch(0.75 0.18 75 / 0.15)"
                      : "oklch(var(--cosmos-surface) / 0.5)",
                    color: active ? goldColor : "oklch(0.55 0.04 260)",
                    border: active
                      ? "1px solid oklch(0.75 0.18 75 / 0.4)"
                      : "1px solid oklch(0.2 0.03 260)",
                  }}
                >
                  {tab.label}
                  {tab.key !== "all" && (
                    <span
                      className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: active
                          ? "oklch(0.75 0.18 75 / 0.2)"
                          : "oklch(0.15 0.03 260)",
                        color: active ? goldColor : "oklch(0.45 0.04 260)",
                      }}
                    >
                      {(WH_GROUP_EVENTS[tab.key] ?? []).reduce(
                        (acc, evt) =>
                          acc +
                          WEBHOOK_CONFIGS.filter((wh) => wh.eventType === evt)
                            .length,
                        0,
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Webhook Cards Grid or Empty State */}
          <AnimatePresence mode="wait">
            {filteredWebhooks.length === 0 ? (
              <motion.div
                key="wh-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 gap-4"
                data-ocid="integrations.webhooks.empty_state"
              >
                <Zap
                  className="h-10 w-10"
                  style={{ color: "oklch(0.3 0.04 260)" }}
                />
                <p style={{ color: "oklch(0.45 0.04 260)" }}>
                  No webhooks match this filter
                </p>
                <button
                  type="button"
                  onClick={() => setWhGroupFilter("all")}
                  className="text-sm underline"
                  style={{ color: "oklch(0.75 0.18 75)" }}
                >
                  Reset filter
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="wh-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {filteredWebhooks.map((wh, idx) => {
                  const evtCfg = WEBHOOK_EVENT_CONFIG[wh.eventType];
                  const statusColor =
                    wh.status === "active"
                      ? "oklch(0.7 0.18 140)"
                      : wh.status === "paused"
                        ? "oklch(0.75 0.18 75)"
                        : "oklch(0.65 0.2 27)";
                  const statusLabel =
                    wh.status === "active"
                      ? "Active"
                      : wh.status === "paused"
                        ? "Paused"
                        : "Failed";
                  const successRate =
                    wh.successCount + wh.failCount > 0
                      ? Math.round(
                          (wh.successCount / (wh.successCount + wh.failCount)) *
                            100,
                        )
                      : 100;
                  const truncUrl =
                    wh.targetUrl.length > 45
                      ? `${wh.targetUrl.slice(0, 42)}...`
                      : wh.targetUrl;
                  return (
                    <motion.div
                      key={wh.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      data-ocid={`integrations.webhooks.item.${idx + 1}`}
                      className="rounded-xl p-5 flex flex-col gap-3"
                      style={{
                        background: "oklch(0.1 0.04 260)",
                        border: "1px solid oklch(0.18 0.03 260)",
                      }}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
                            style={{
                              background: `${evtCfg.color.replace(")", " / 0.12)")}`,
                              color: evtCfg.color,
                              border: `1px solid ${evtCfg.color.replace(")", " / 0.3)")}`,
                            }}
                          >
                            {evtCfg.label}
                          </span>
                          <span
                            className="font-mono text-xs"
                            style={{ color: "oklch(0.45 0.04 260)" }}
                          >
                            {wh.id}
                          </span>
                        </div>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{
                            background: `${statusColor.replace(")", " / 0.12)")}`,
                            color: statusColor,
                            border: `1px solid ${statusColor.replace(")", " / 0.3)")}`,
                          }}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      {/* Target URL */}
                      <div
                        className="font-mono text-xs truncate"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                        title={wh.targetUrl}
                      >
                        {truncUrl}
                      </div>

                      {/* Delivery Stats */}
                      <div className="flex items-center gap-4 text-xs">
                        <span
                          className="flex items-center gap-1"
                          style={{ color: "oklch(0.7 0.18 140)" }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {wh.successCount.toLocaleString()}
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{ color: "oklch(0.65 0.2 27)" }}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          {wh.failCount}
                        </span>
                        <span style={{ color: "oklch(0.45 0.04 260)" }}>
                          {successRate}% success
                        </span>
                      </div>

                      {/* Last Triggered */}
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.4 0.04 260)" }}
                      >
                        Last:{" "}
                        {new Date(wh.lastTriggered).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-3"
                          data-ocid={`integrations.webhooks.test_button.${idx + 1}`}
                          onClick={() => {
                            toast.success(
                              `Webhook test delivered successfully to ${truncUrl}`,
                            );
                          }}
                          style={{ color: "oklch(0.65 0.04 260)" }}
                        >
                          Test
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-3"
                          data-ocid={`integrations.webhooks.view_button.${idx + 1}`}
                          onClick={() => whState.openWebhook(wh)}
                          style={{ color: "oklch(0.75 0.18 75)" }}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Webhook Detail Sheet ── */}
      <Sheet
        open={!!whState.selectedWebhook}
        onOpenChange={(open) => {
          if (!open) whState.closeWebhook();
        }}
      >
        <SheetContent
          data-ocid="integrations.webhooks.sheet"
          className="w-full sm:max-w-xl overflow-y-auto"
          style={{
            background: "oklch(0.08 0.04 260)",
            borderLeft: "1px solid oklch(0.18 0.03 260)",
          }}
        >
          {whState.selectedWebhook &&
            (() => {
              const wh = whState.selectedWebhook;
              const evtCfg = WEBHOOK_EVENT_CONFIG[wh.eventType];
              const statusColor =
                wh.status === "active"
                  ? "oklch(0.7 0.18 140)"
                  : wh.status === "paused"
                    ? "oklch(0.75 0.18 75)"
                    : "oklch(0.65 0.2 27)";
              const successRate =
                wh.successCount + wh.failCount > 0
                  ? Math.round(
                      (wh.successCount / (wh.successCount + wh.failCount)) *
                        100,
                    )
                  : 100;
              const partner = INTEGRATION_PARTNERS.find(
                (p) => p.id === wh.partnerId,
              );
              const lastDt = new Date(wh.lastTriggered);
              const minus1h = new Date(lastDt.getTime() - 3600000);
              const minus2h = new Date(lastDt.getTime() - 7200000);
              return (
                <>
                  <SheetHeader className="mb-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
                          style={{
                            background: `${evtCfg.color.replace(")", " / 0.12)")}`,
                            color: evtCfg.color,
                            border: `1px solid ${evtCfg.color.replace(")", " / 0.3)")}`,
                          }}
                        >
                          {evtCfg.label}
                        </span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${statusColor.replace(")", " / 0.12)")}`,
                            color: statusColor,
                            border: `1px solid ${statusColor.replace(")", " / 0.3)")}`,
                          }}
                        >
                          {wh.status.charAt(0).toUpperCase() +
                            wh.status.slice(1)}
                        </span>
                      </div>
                      <SheetClose
                        data-ocid="integrations.webhooks.sheet.close_button"
                        className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                        style={{ color: "oklch(0.55 0.04 260)" }}
                      >
                        <X className="h-4 w-4" />
                      </SheetClose>
                    </div>
                    <SheetTitle
                      className="font-mono text-sm mt-2"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {wh.id}
                    </SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6 text-sm">
                    {/* Target URL */}
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        Target URL
                      </div>
                      <div
                        className="font-mono text-xs p-3 rounded-lg break-all"
                        style={{
                          background: "oklch(0.12 0.03 260)",
                          color: "oklch(0.75 0.18 75)",
                          border: "1px solid oklch(0.2 0.03 260)",
                        }}
                      >
                        {wh.targetUrl}
                      </div>
                    </div>

                    {/* Partner */}
                    {partner && (
                      <div>
                        <div
                          className="text-xs font-semibold uppercase tracking-widest mb-2"
                          style={{ color: "oklch(0.45 0.04 260)" }}
                        >
                          Integration Partner
                        </div>
                        <div
                          className="p-3 rounded-lg"
                          style={{
                            background: "oklch(0.12 0.03 260)",
                            border: "1px solid oklch(0.2 0.03 260)",
                          }}
                        >
                          <p
                            style={{ color: "oklch(var(--pearl))" }}
                            className="font-medium"
                          >
                            {partner.orgName}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "oklch(0.45 0.04 260)" }}
                          >
                            {partner.country}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Delivery Stats */}
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        Delivery Statistics
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            label: "Successful",
                            value: wh.successCount.toLocaleString(),
                            color: "oklch(0.7 0.18 140)",
                          },
                          {
                            label: "Failed",
                            value: wh.failCount.toString(),
                            color: "oklch(0.65 0.2 27)",
                          },
                          {
                            label: "Success Rate",
                            value: `${successRate}%`,
                            color: "oklch(0.75 0.18 75)",
                          },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="p-3 rounded-lg text-center"
                            style={{
                              background: "oklch(0.12 0.03 260)",
                              border: "1px solid oklch(0.2 0.03 260)",
                            }}
                          >
                            <div
                              className="font-bold text-base"
                              style={{ color: s.color }}
                            >
                              {s.value}
                            </div>
                            <div
                              className="text-xs mt-0.5"
                              style={{ color: "oklch(0.45 0.04 260)" }}
                            >
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Last Triggered */}
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        Last Triggered
                      </div>
                      <div style={{ color: "oklch(var(--pearl))" }}>
                        {lastDt.toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>

                    {/* Recent Deliveries */}
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest mb-3"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        Recent Deliveries
                      </div>
                      <div className="space-y-2">
                        {[
                          { time: lastDt, latency: 92 },
                          { time: minus1h, latency: 108 },
                          { time: minus2h, latency: 84 },
                        ].map((delivery) => (
                          <div
                            key={delivery.time.getTime()}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{
                              background: "oklch(0.12 0.03 260)",
                              border: "1px solid oklch(0.2 0.03 260)",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2
                                className="h-3.5 w-3.5"
                                style={{ color: "oklch(0.7 0.18 140)" }}
                              />
                              <span
                                className="text-xs font-mono"
                                style={{ color: "oklch(0.7 0.18 140)" }}
                              >
                                200
                              </span>
                              <span
                                className="text-xs"
                                style={{ color: "oklch(0.45 0.04 260)" }}
                              >
                                {delivery.time.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <span
                              className="text-xs font-mono"
                              style={{ color: "oklch(0.55 0.04 260)" }}
                            >
                              {delivery.latency}ms
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
        </SheetContent>
      </Sheet>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* F1 ── Developer Portal                                           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section id="developer" className="px-4 md:px-8 lg:px-16 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4"
            style={{
              background: "oklch(0.25 0.06 230 / 0.6)",
              color: "oklch(0.75 0.12 195)",
              border: "1px solid oklch(0.45 0.12 195 / 0.3)",
            }}
          >
            <Code2 className="w-3 h-3" />
            Phase 7 — Developer Portal
          </div>
          <h2
            className="text-4xl font-bold mb-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.92 0.05 210), oklch(0.75 0.14 195))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Developer Portal
          </h2>
          <p style={{ color: "oklch(0.65 0.04 240)" }} className="text-lg">
            Build on the Open Governance Layer
          </p>
        </motion.div>

        {/* ── Getting Started Steps ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14"
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            Getting Started
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Register",
                desc: "Create your ONEartHeaven developer account and accept the API terms",
              },
              {
                step: "02",
                title: "Get API Key",
                desc: "Generate credentials for Bearer Token, API Key, or OAuth2 access",
              },
              {
                step: "03",
                title: "Make Your First Call",
                desc: "Use our sandbox to test endpoints before going live",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="relative rounded-xl p-6 border"
                style={{
                  background: "oklch(0.17 0.04 240 / 0.8)",
                  borderColor: "oklch(0.45 0.12 195 / 0.25)",
                }}
              >
                <div
                  className="text-5xl font-black mb-3 leading-none"
                  style={{
                    color: "oklch(0.35 0.08 195 / 0.5)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.step}
                </div>
                <h4
                  className="text-base font-semibold mb-2"
                  style={{ color: "oklch(0.88 0.04 220)" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.60 0.04 240)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SDK Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14"
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            SDKs & Libraries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🟨",
                lang: "JavaScript / TypeScript",
                desc: "Full-featured SDK for browser and Node.js environments with TypeScript types included.",
                id: "js",
              },
              {
                emoji: "🐍",
                lang: "Python",
                desc: "Async-first Python client for integrating ONEartHeaven APIs into data pipelines and backends.",
                id: "py",
              },
              {
                emoji: "∞",
                lang: "Motoko",
                desc: "Native ICP canister bindings for building on-chain governance integrations and DeFi hooks.",
                id: "mo",
              },
            ].map((sdk) => (
              <Card
                key={sdk.id}
                className="border"
                style={{
                  background: "oklch(0.17 0.04 240 / 0.8)",
                  borderColor: "oklch(0.40 0.08 195 / 0.25)",
                }}
              >
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-2">{sdk.emoji}</div>
                  <CardTitle
                    className="text-base"
                    style={{ color: "oklch(0.88 0.04 220)" }}
                  >
                    {sdk.lang}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.60 0.04 240)" }}
                  >
                    {sdk.desc}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid={`sdk.${sdk.id}.button`}
                    onClick={() =>
                      toast.success(`${sdk.lang} SDK download initiated`)
                    }
                    className="border w-full"
                    style={{
                      borderColor: "oklch(0.45 0.12 195 / 0.4)",
                      color: "oklch(0.75 0.12 195)",
                    }}
                  >
                    Download SDK
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* ── OpenAPI Spec Download ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl p-6 border"
          style={{
            background: "oklch(0.17 0.04 240 / 0.8)",
            borderColor: "oklch(0.45 0.12 195 / 0.25)",
          }}
        >
          <div className="flex-1">
            <h4
              className="font-semibold mb-1"
              style={{ color: "oklch(0.88 0.04 220)" }}
            >
              OpenAPI Specification
            </h4>
            <p className="text-sm" style={{ color: "oklch(0.60 0.04 240)" }}>
              Download the full OpenAPI 3.1 spec to generate clients, validate
              integrations, or import into Postman/Insomnia.
            </p>
          </div>
          <Button
            data-ocid="developer.openapi.button"
            onClick={() => toast.success("OpenAPI spec download initiated")}
            className="shrink-0"
            style={{ background: "oklch(0.45 0.14 195)", color: "white" }}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Download OpenAPI Spec (v1)
          </Button>
        </motion.div>

        {/* ── Rate Limit Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-14"
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            Rate Limits by Tier
          </h3>
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "oklch(0.40 0.08 195 / 0.25)" }}
          >
            <Table>
              <TableHeader>
                <TableRow
                  style={{
                    background: "oklch(0.18 0.05 240 / 0.9)",
                    borderColor: "oklch(0.35 0.06 240 / 0.4)",
                  }}
                >
                  <TableHead style={{ color: "oklch(0.72 0.06 220)" }}>
                    Tier
                  </TableHead>
                  <TableHead style={{ color: "oklch(0.72 0.06 220)" }}>
                    Req / Min
                  </TableHead>
                  <TableHead style={{ color: "oklch(0.72 0.06 220)" }}>
                    Req / Day
                  </TableHead>
                  <TableHead style={{ color: "oklch(0.72 0.06 220)" }}>
                    Auth Required
                  </TableHead>
                  <TableHead style={{ color: "oklch(0.72 0.06 220)" }}>
                    FinFracFran™
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    tier: "Public",
                    rpm: "30",
                    rpd: "1,000",
                    auth: "No",
                    ff: "No",
                  },
                  {
                    tier: "Authenticated",
                    rpm: "120",
                    rpd: "10,000",
                    auth: "Bearer / API Key",
                    ff: "No",
                  },
                  {
                    tier: "Partner",
                    rpm: "500",
                    rpd: "100,000",
                    auth: "OAuth2",
                    ff: "Optional",
                  },
                  {
                    tier: "FinFracFran™ Licensee",
                    rpm: "2,000",
                    rpd: "Unlimited",
                    auth: "OAuth2",
                    ff: "Yes",
                  },
                ].map((row, i) => (
                  <TableRow
                    key={row.tier}
                    data-ocid={`ratelimit.row.${i + 1}`}
                    style={{
                      background:
                        i % 2 === 0
                          ? "oklch(0.15 0.04 240 / 0.5)"
                          : "oklch(0.17 0.04 240 / 0.5)",
                      borderColor: "oklch(0.35 0.06 240 / 0.3)",
                    }}
                  >
                    <TableCell
                      className="font-medium"
                      style={{
                        color:
                          row.ff === "Yes"
                            ? "oklch(0.82 0.12 80)"
                            : "oklch(0.85 0.04 220)",
                      }}
                    >
                      {row.tier}
                    </TableCell>
                    <TableCell
                      style={{ color: "oklch(0.72 0.08 195)" }}
                      className="font-mono"
                    >
                      {row.rpm}
                    </TableCell>
                    <TableCell
                      style={{ color: "oklch(0.72 0.08 195)" }}
                      className="font-mono"
                    >
                      {row.rpd}
                    </TableCell>
                    <TableCell style={{ color: "oklch(0.65 0.04 240)" }}>
                      {row.auth}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        style={
                          row.ff === "Yes"
                            ? {
                                background: "oklch(0.35 0.10 80 / 0.3)",
                                color: "oklch(0.82 0.12 80)",
                                border: "1px solid oklch(0.55 0.12 80 / 0.4)",
                              }
                            : row.ff === "Optional"
                              ? {
                                  background: "oklch(0.30 0.08 195 / 0.3)",
                                  color: "oklch(0.72 0.10 195)",
                                  border:
                                    "1px solid oklch(0.50 0.10 195 / 0.3)",
                                }
                              : {
                                  background: "oklch(0.22 0.03 240 / 0.5)",
                                  color: "oklch(0.55 0.03 240)",
                                  border:
                                    "1px solid oklch(0.40 0.04 240 / 0.3)",
                                }
                        }
                      >
                        {row.ff}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* ── Authentication Guide ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            Authentication Guide
          </h3>
          <Tabs defaultValue="bearer" className="w-full">
            <TabsList
              className="mb-4"
              style={{
                background: "oklch(0.18 0.05 240 / 0.8)",
                border: "1px solid oklch(0.35 0.06 240 / 0.4)",
              }}
            >
              <TabsTrigger
                value="bearer"
                data-ocid="auth.bearer.tab"
                style={{ color: "oklch(0.65 0.04 240)" }}
              >
                Bearer Token
              </TabsTrigger>
              <TabsTrigger
                value="apikey"
                data-ocid="auth.apikey.tab"
                style={{ color: "oklch(0.65 0.04 240)" }}
              >
                API Key
              </TabsTrigger>
              <TabsTrigger
                value="oauth2"
                data-ocid="auth.oauth2.tab"
                style={{ color: "oklch(0.65 0.04 240)" }}
              >
                OAuth2
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bearer">
              <div
                className="rounded-xl border p-6"
                style={{
                  background: "oklch(0.16 0.04 240 / 0.8)",
                  borderColor: "oklch(0.40 0.08 195 / 0.25)",
                }}
              >
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  Include your Bearer token in the{" "}
                  <code
                    className="px-1 py-0.5 rounded text-xs"
                    style={{
                      background: "oklch(0.22 0.05 240)",
                      color: "oklch(0.75 0.12 195)",
                    }}
                  >
                    Authorization
                  </code>{" "}
                  header of every request. Tokens are scoped and expire after 24
                  hours.
                </p>
                <pre
                  className="rounded-lg p-4 text-sm font-mono overflow-x-auto"
                  style={{
                    background: "oklch(0.11 0.03 240)",
                    color: "oklch(0.75 0.12 195)",
                  }}
                >
                  {`curl https://api.onearthheaven.org/v1/resolutions \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="apikey">
              <div
                className="rounded-xl border p-6"
                style={{
                  background: "oklch(0.16 0.04 240 / 0.8)",
                  borderColor: "oklch(0.40 0.08 195 / 0.25)",
                }}
              >
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  Use the{" "}
                  <code
                    className="px-1 py-0.5 rounded text-xs"
                    style={{
                      background: "oklch(0.22 0.05 240)",
                      color: "oklch(0.75 0.12 195)",
                    }}
                  >
                    X-API-Key
                  </code>{" "}
                  header for server-to-server integrations. API keys do not
                  expire but can be revoked from your dashboard.
                </p>
                <pre
                  className="rounded-lg p-4 text-sm font-mono overflow-x-auto"
                  style={{
                    background: "oklch(0.11 0.03 240)",
                    color: "oklch(0.75 0.12 195)",
                  }}
                >
                  {`curl https://api.onearthheaven.org/v1/solutions \
  -H "X-API-Key: <your_key>" \
  -H "Accept: application/json"`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="oauth2">
              <div
                className="rounded-xl border p-6"
                style={{
                  background: "oklch(0.16 0.04 240 / 0.8)",
                  borderColor: "oklch(0.40 0.08 195 / 0.25)",
                }}
              >
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  OAuth2 Client Credentials flow is required for Partner and
                  FinFracFran™ tier access. Exchange your client credentials for
                  an access token:
                </p>
                <pre
                  className="rounded-lg p-4 text-sm font-mono overflow-x-auto"
                  style={{
                    background: "oklch(0.11 0.03 240)",
                    color: "oklch(0.75 0.12 195)",
                  }}
                >
                  {`# 1. Exchange credentials for access token
curl -X POST https://auth.onearthheaven.org/oauth2/token \
  -d "grant_type=client_credentials" \
  -d "client_id=<your_client_id>" \
  -d "client_secret=<your_secret>" \
  -d "scope=governance:read finfracfran:write"

# 2. Use the token
curl https://api.onearthheaven.org/v1/finfracfran/license/apply \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* F2 ── FinFracFran™ API Spotlight                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        id="finfracfran-api"
        className="px-4 md:px-8 lg:px-16 py-20"
        style={{ background: "oklch(0.14 0.03 240 / 0.6)" }}
      >
        {/* Section Header */}
        <FFSpotlightHeader
          badge="FinFracFran™ API Spotlight"
          headline="FinFracFran™ API Spotlight"
          subline="Power your franchise with open data and automation — standardized endpoints for every tier."
          align="left"
          className="mb-12"
        />

        {/* ── Featured Endpoint Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14"
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            Featured Endpoints
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                type: "GET",
                path: "/v1/finfracfran/disclosures",
                desc: "Retrieve all public FinFracFran™ disclosure records with compliance scores and adoption data.",
                auth: "Public",
                status: "Active",
                id: "disclosures",
              },
              {
                type: "POST",
                path: "/v1/finfracfran/license/apply",
                desc: "Submit a new franchise license application with tier selection and organization details.",
                auth: "OAuth2",
                status: "Active",
                id: "apply",
              },
              {
                type: "WEBHOOK",
                path: "finfracfran_license_issued",
                desc: "Fires when a new FinFracFran™ license is approved. Receive real-time franchise issuance events.",
                auth: "Authenticated",
                status: "Active",
                id: "webhook",
              },
            ].map((ep) => (
              <Card
                key={ep.id}
                className="border"
                style={{
                  background: "oklch(0.17 0.04 240 / 0.8)",
                  borderColor: "oklch(0.55 0.12 80 / 0.2)",
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge
                      className="text-xs font-mono font-bold px-2 py-0.5"
                      style={
                        ep.type === "GET"
                          ? {
                              background: "oklch(0.28 0.10 195 / 0.4)",
                              color: "oklch(0.72 0.12 195)",
                              border: "1px solid oklch(0.48 0.12 195 / 0.4)",
                            }
                          : ep.type === "POST"
                            ? {
                                background: "oklch(0.25 0.10 145 / 0.4)",
                                color: "oklch(0.72 0.12 145)",
                                border: "1px solid oklch(0.48 0.12 145 / 0.4)",
                              }
                            : {
                                background: "oklch(0.32 0.10 80 / 0.4)",
                                color: "oklch(0.82 0.12 80)",
                                border: "1px solid oklch(0.55 0.12 80 / 0.4)",
                              }
                      }
                    >
                      {ep.type}
                    </Badge>
                    <Badge
                      className="text-xs"
                      style={{
                        background: "oklch(0.28 0.08 145 / 0.3)",
                        color: "oklch(0.72 0.10 145)",
                        border: "1px solid oklch(0.48 0.10 145 / 0.3)",
                      }}
                    >
                      {ep.status}
                    </Badge>
                  </div>
                  <CardTitle
                    className="text-sm font-mono break-all"
                    style={{ color: "oklch(0.82 0.12 80)" }}
                  >
                    {ep.path}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.60 0.04 240)" }}
                  >
                    {ep.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      className="text-xs"
                      style={{
                        background: "oklch(0.22 0.05 240 / 0.5)",
                        color: "oklch(0.65 0.06 220)",
                        border: "1px solid oklch(0.40 0.06 240 / 0.3)",
                      }}
                    >
                      <Key className="w-2.5 h-2.5 mr-1" />
                      {ep.auth}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-ocid={`ff-api.${ep.id}.button`}
                      onClick={() => toast.info("Opening documentation...")}
                      style={{ color: "oklch(0.82 0.12 80)" }}
                    >
                      View Docs →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* ── Tier Progression Showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14"
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            Tier Progression
          </h3>
          <div className="relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.55 0.12 195), oklch(0.55 0.12 80))",
              }}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  tier: "Seed",
                  color: "oklch(0.55 0.12 195)",
                  bg: "oklch(0.25 0.08 195 / 0.3)",
                  border: "oklch(0.45 0.12 195 / 0.4)",
                  cap: "Basic disclosure reads + license application",
                },
                {
                  tier: "Growth",
                  color: "oklch(0.55 0.14 240)",
                  bg: "oklch(0.25 0.08 240 / 0.3)",
                  border: "oklch(0.45 0.12 240 / 0.4)",
                  cap: "Adoption tracking + partner webhook subscriptions",
                },
                {
                  tier: "Scale",
                  color: "oklch(0.72 0.14 65)",
                  bg: "oklch(0.30 0.10 65 / 0.3)",
                  border: "oklch(0.52 0.14 65 / 0.4)",
                  cap: "Royalty calculation API + multi-nation reporting",
                },
                {
                  tier: "Global",
                  color: "oklch(0.82 0.12 80)",
                  bg: "oklch(0.32 0.10 80 / 0.3)",
                  border: "oklch(0.55 0.12 80 / 0.4)",
                  cap: "Unlimited API + dedicated integration support",
                },
              ].map((t, i) => (
                <motion.div
                  key={t.tier}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="relative flex flex-col items-center text-center rounded-xl p-5 border"
                  style={{ background: t.bg, borderColor: t.border }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3 text-sm font-bold z-10"
                    style={{
                      background: t.bg,
                      border: `2px solid ${t.color}`,
                      color: t.color,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="mb-3">
                    <FFTierBadge tier={t.tier} size="sm" showIcon />
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.62 0.04 240)" }}
                  >
                    {t.cap}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Apply for API Access ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <Zap
            className="w-10 h-10 mb-4"
            style={{ color: "oklch(0.82 0.12 80)" }}
          />
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: "oklch(0.88 0.04 220)" }}
          >
            Ready to Build with FinFracFran™?
          </h3>
          <p
            className="mb-6 max-w-lg"
            style={{ color: "oklch(0.65 0.04 240)" }}
          >
            Apply for API access and unlock the full power of the FinFracFran™
            licensing ecosystem for your organization.
          </p>
          <FFApiAccessDialog />
        </motion.div>
      </section>

      {/* ── Footer spacer ── */}
      <div className="py-16" />
    </main>
  );
}

// ─── FinFracFran™ API Access Dialog ────────────────────────────────────────────
function FFApiAccessDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    org: "",
    email: "",
    useCase: "",
    tier: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.org.trim()) e.org = "Organization name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.useCase.trim() || form.useCase.trim().length < 20)
      e.useCase = "Please describe your use case (min 20 characters)";
    if (!form.tier) e.tier = "Please select a tier";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success(
      "Your application has been submitted. We'll be in touch within 48 hours.",
    );
    setOpen(false);
    setForm({ org: "", email: "", useCase: "", tier: "" });
    setErrors({});
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          data-ocid="ff-api.apply.open_modal_button"
          className="font-semibold px-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.14 80), oklch(0.55 0.16 72))",
            color: "oklch(0.10 0.02 240)",
          }}
        >
          <Zap className="w-4 h-4 mr-2" />
          Apply for API Access
        </Button>
      </DialogTrigger>
      <DialogContent
        data-ocid="ff-api.apply.dialog"
        className="max-w-lg"
        style={{
          background: "oklch(0.16 0.04 240)",
          border: "1px solid oklch(0.55 0.12 80 / 0.3)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "oklch(0.88 0.04 220)" }}>
            Apply for FinFracFran™ API Access
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div>
            <Label style={{ color: "oklch(0.72 0.04 220)" }}>
              Organization Name
            </Label>
            <Input
              data-ocid="ff-api.apply.input"
              placeholder="Your organization name"
              value={form.org}
              onChange={(e) => setForm((p) => ({ ...p, org: e.target.value }))}
              className="mt-1"
              style={{
                background: "oklch(0.12 0.03 240)",
                borderColor: "oklch(0.40 0.06 240 / 0.5)",
                color: "oklch(0.88 0.04 220)",
              }}
            />
            {errors.org && (
              <p
                data-ocid="ff-api.apply.error_state"
                className="text-xs mt-1"
                style={{ color: "oklch(0.65 0.18 25)" }}
              >
                {errors.org}
              </p>
            )}
          </div>
          <div>
            <Label style={{ color: "oklch(0.72 0.04 220)" }}>Email</Label>
            <Input
              data-ocid="ff-api.email.input"
              placeholder="contact@organization.org"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className="mt-1"
              style={{
                background: "oklch(0.12 0.03 240)",
                borderColor: "oklch(0.40 0.06 240 / 0.5)",
                color: "oklch(0.88 0.04 220)",
              }}
            />
            {errors.email && (
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.65 0.18 25)" }}
              >
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Label style={{ color: "oklch(0.72 0.04 220)" }}>
              Use Case{" "}
              <span className="text-xs opacity-60">(min 20 chars)</span>
            </Label>
            <Textarea
              data-ocid="ff-api.apply.textarea"
              placeholder="Describe how you plan to use the FinFracFran™ API..."
              value={form.useCase}
              onChange={(e) =>
                setForm((p) => ({ ...p, useCase: e.target.value }))
              }
              className="mt-1 resize-none"
              rows={3}
              style={{
                background: "oklch(0.12 0.03 240)",
                borderColor: "oklch(0.40 0.06 240 / 0.5)",
                color: "oklch(0.88 0.04 220)",
              }}
            />
            {errors.useCase && (
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.65 0.18 25)" }}
              >
                {errors.useCase}
              </p>
            )}
          </div>
          <div>
            <Label style={{ color: "oklch(0.72 0.04 220)" }}>
              Requested Tier
            </Label>
            <Select
              value={form.tier}
              onValueChange={(v) => setForm((p) => ({ ...p, tier: v }))}
            >
              <SelectTrigger
                data-ocid="ff-api.apply.select"
                className="mt-1"
                style={{
                  background: "oklch(0.12 0.03 240)",
                  borderColor: "oklch(0.40 0.06 240 / 0.5)",
                  color: "oklch(0.88 0.04 220)",
                }}
              >
                <SelectValue placeholder="Select a tier" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.16 0.04 240)",
                  borderColor: "oklch(0.40 0.06 240 / 0.5)",
                }}
              >
                {["Seed", "Growth", "Scale", "Global"].map((t) => (
                  <SelectItem
                    key={t}
                    value={t.toLowerCase()}
                    style={{ color: "oklch(0.82 0.04 220)" }}
                  >
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tier && (
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.65 0.18 25)" }}
              >
                {errors.tier}
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            data-ocid="ff-api.apply.cancel_button"
            onClick={() => setOpen(false)}
            style={{ color: "oklch(0.60 0.04 240)" }}
          >
            Cancel
          </Button>
          <Button
            data-ocid="ff-api.apply.submit_button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.14 80), oklch(0.55 0.16 72))",
              color: "oklch(0.10 0.02 240)",
            }}
          >
            {loading ? (
              <span
                data-ocid="ff-api.apply.loading_state"
                className="flex items-center gap-2"
              >
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-label="Loading"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
