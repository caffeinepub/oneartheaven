// Union types
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type EndpointStatus = "active" | "beta" | "deprecated";
export type EndpointModule =
  | "governance"
  | "solutions"
  | "transparency"
  | "community"
  | "finfracfran"
  | "assembly"
  | "delegates";
export type AuthType = "bearer" | "api_key" | "oauth2" | "public";
export type PartnerType =
  | "ngo"
  | "un_agency"
  | "academic"
  | "corporate"
  | "finfracfran_licensee"
  | "government";
export type PartnerStatus = "active" | "pending" | "suspended";
export type WebhookEventType =
  | "proposal_created"
  | "proposal_voted"
  | "resolution_passed"
  | "solution_adopted"
  | "audit_triggered"
  | "contract_flagged"
  | "delegate_registered"
  | "finfracfran_license_issued"
  | "council_action"
  | "member_joined";
export type WebhookStatus = "active" | "paused" | "failed";
export type FFTier = "Seed" | "Growth" | "Scale" | "Global";

export interface APIEndpoint {
  id: string;
  name: string;
  method: HTTPMethod;
  path: string;
  description: string;
  status: EndpointStatus;
  module: EndpointModule;
  authType: AuthType;
  rateLimit: string;
  version: string;
  requestSchema?: string;
  responseSchema?: string;
  examplePayload?: string;
  changelog?: { date: string; version: string; note: string }[];
}

export interface IntegrationPartner {
  id: string;
  orgName: string;
  type: PartnerType;
  status: PartnerStatus;
  scopes: string[];
  ffTier?: FFTier;
  integrationDate: string;
  lastActive: string;
  description: string;
  country: string;
  webhookSubscriptions?: string[];
  apiKeyStatus: "active" | "rotated" | "revoked";
  contactEmail: string;
}

export interface WebhookConfig {
  id: string;
  eventType: WebhookEventType;
  targetUrl: string;
  status: WebhookStatus;
  lastTriggered: string;
  successCount: number;
  failCount: number;
  partnerId: string;
  secret?: string;
}

export interface APIUsageLog {
  id: string;
  endpointId: string;
  partnerId: string;
  timestamp: string;
  responseCode: number;
  latencyMs: number;
  method: HTTPMethod;
}

export interface IntegrationStats {
  totalEndpoints: number;
  activeEndpoints: number;
  totalPartners: number;
  activePartners: number;
  totalWebhooks: number;
  activeWebhooks: number;
  uptimePercent: number;
  apiCallsToday: number;
  apiCallsThisMonth: number;
}

export const HTTP_METHOD_CONFIG: Record<
  HTTPMethod,
  { color: string; bg: string }
> = {
  GET: { color: "oklch(0.7 0.18 195)", bg: "oklch(0.7 0.18 195 / 0.12)" },
  POST: { color: "oklch(0.7 0.18 140)", bg: "oklch(0.7 0.18 140 / 0.12)" },
  PUT: { color: "oklch(0.75 0.18 75)", bg: "oklch(0.75 0.18 75 / 0.12)" },
  DELETE: { color: "oklch(0.65 0.2 27)", bg: "oklch(0.65 0.2 27 / 0.12)" },
  PATCH: { color: "oklch(0.7 0.18 270)", bg: "oklch(0.7 0.18 270 / 0.12)" },
};

export const ENDPOINT_STATUS_CONFIG: Record<
  EndpointStatus,
  { label: string; color: string }
> = {
  active: { label: "Active", color: "oklch(0.7 0.18 140)" },
  beta: { label: "Beta", color: "oklch(0.75 0.18 75)" },
  deprecated: { label: "Deprecated", color: "oklch(0.55 0.08 260)" },
};

export const PARTNER_TYPE_CONFIG: Record<
  PartnerType,
  { label: string; color: string }
> = {
  ngo: { label: "NGO", color: "oklch(0.7 0.18 195)" },
  un_agency: { label: "UN Agency", color: "oklch(0.65 0.2 27)" },
  academic: { label: "Academic", color: "oklch(0.7 0.18 270)" },
  corporate: { label: "Corporate", color: "oklch(0.75 0.18 75)" },
  finfracfran_licensee: { label: "FinFracFran™", color: "oklch(0.72 0.16 75)" },
  government: { label: "Government", color: "oklch(0.7 0.18 140)" },
};

export const WEBHOOK_EVENT_CONFIG: Record<
  WebhookEventType,
  { label: string; color: string }
> = {
  proposal_created: { label: "Proposal Created", color: "oklch(0.7 0.18 195)" },
  proposal_voted: { label: "Proposal Voted", color: "oklch(0.7 0.18 270)" },
  resolution_passed: {
    label: "Resolution Passed",
    color: "oklch(0.7 0.18 140)",
  },
  solution_adopted: { label: "Solution Adopted", color: "oklch(0.72 0.16 75)" },
  audit_triggered: { label: "Audit Triggered", color: "oklch(0.65 0.2 27)" },
  contract_flagged: { label: "Contract Flagged", color: "oklch(0.65 0.2 27)" },
  delegate_registered: {
    label: "Delegate Registered",
    color: "oklch(0.7 0.15 195)",
  },
  finfracfran_license_issued: {
    label: "FF™ License Issued",
    color: "oklch(0.75 0.18 75)",
  },
  council_action: { label: "Council Action", color: "oklch(0.7 0.18 195)" },
  member_joined: { label: "Member Joined", color: "oklch(0.7 0.18 140)" },
};

export const MODULE_CONFIG: Record<
  EndpointModule,
  { label: string; emoji: string; color: string }
> = {
  governance: { label: "Governance", emoji: "⚖️", color: "oklch(0.72 0.16 75)" },
  solutions: { label: "Solutions", emoji: "💡", color: "oklch(0.7 0.18 195)" },
  transparency: {
    label: "Transparency",
    emoji: "🔍",
    color: "oklch(0.7 0.18 140)",
  },
  community: { label: "Community", emoji: "🤝", color: "oklch(0.7 0.18 270)" },
  finfracfran: {
    label: "FinFracFran™",
    emoji: "💎",
    color: "oklch(0.75 0.18 75)",
  },
  assembly: { label: "Assembly", emoji: "🌐", color: "oklch(0.65 0.2 27)" },
  delegates: { label: "Delegates", emoji: "👤", color: "oklch(0.7 0.15 195)" },
};
