import type {
  APIEndpoint,
  APIUsageLog,
  IntegrationPartner,
  IntegrationStats,
  WebhookConfig,
} from "./integrationTypes";

export const API_ENDPOINTS: APIEndpoint[] = [
  {
    id: "ep-001",
    name: "List Proposals",
    method: "GET",
    path: "/v1/governance/proposals",
    description:
      "Returns a paginated list of all governance proposals. Supports filtering by status, council, and date range. No authentication required for read access.",
    status: "active",
    module: "governance",
    authType: "public",
    rateLimit: "200/min",
    version: "v1",
    requestSchema: `{
  "page": "number (optional, default: 1)",
  "limit": "number (optional, default: 20, max: 100)",
  "status": "draft | review | voting | passed | implementation | completed",
  "council": "string (optional)",
  "from": "ISO 8601 date string (optional)",
  "to": "ISO 8601 date string (optional)"
}`,
    responseSchema: `{
  "proposals": [
    {
      "id": "string",
      "title": "string",
      "council": "string",
      "status": "string",
      "votesFor": "number",
      "votesAgainst": "number",
      "createdAt": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}`,
    examplePayload: `GET /v1/governance/proposals?status=voting&council=climate&limit=5

Response 200 OK
{
  "proposals": [
    {
      "id": "prop-2024-042",
      "title": "Pacific Islands Climate Emergency Compact",
      "council": "ClimateAction",
      "status": "voting",
      "votesFor": 847,
      "votesAgainst": 103,
      "createdAt": "2024-11-15T09:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 5
}`,
    changelog: [
      {
        date: "2024-11-01",
        version: "v1.2",
        note: "Added council filter parameter",
      },
      {
        date: "2024-09-15",
        version: "v1.1",
        note: "Added date range filtering",
      },
      { date: "2024-07-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-002",
    name: "Submit Proposal",
    method: "POST",
    path: "/v1/governance/proposals",
    description:
      "Creates a new governance proposal. Requires delegate-level authentication. Proposals enter the draft stage automatically and undergo AI pre-screening.",
    status: "active",
    module: "governance",
    authType: "bearer",
    rateLimit: "10/min",
    version: "v1",
    requestSchema: `{
  "title": "string (required, max 200 chars)",
  "summary": "string (required, max 1000 chars)",
  "council": "string (required)",
  "body": "string (required, markdown)",
  "sdgs": "string[] (optional, SDG IDs)",
  "attachments": "string[] (optional, IPFS hashes)"
}`,
    responseSchema: `{
  "id": "string",
  "status": "draft",
  "aiScreeningJobId": "string",
  "createdAt": "string"
}`,
    changelog: [
      {
        date: "2024-10-01",
        version: "v1.1",
        note: "AI pre-screening integration",
      },
      { date: "2024-07-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-003",
    name: "List Resolutions",
    method: "GET",
    path: "/v1/governance/resolutions",
    description:
      "Returns all passed resolutions with full voting records, implementation milestones, and FinFracFran™ adoption data.",
    status: "active",
    module: "governance",
    authType: "public",
    rateLimit: "200/min",
    version: "v1",
    responseSchema: `{
  "resolutions": [
    {
      "id": "string",
      "title": "string",
      "council": "string",
      "passedAt": "string",
      "implementationStatus": "string",
      "nationsAdopted": "number"
    }
  ]
}`,
    changelog: [
      {
        date: "2024-11-15",
        version: "v1.1",
        note: "Added FinFracFran™ adoption data",
      },
      { date: "2024-07-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-004",
    name: "List Solutions",
    method: "GET",
    path: "/v1/solutions",
    description:
      "Browse all solutions in the NewWaysNow Solutions Exchange. Filter by category, adoption stage, SDG alignment, and FinFracFran™ availability.",
    status: "active",
    module: "solutions",
    authType: "public",
    rateLimit: "200/min",
    version: "v1",
    requestSchema: `{
  "category": "string (optional)",
  "stage": "proven | scaling | piloting | research | deprecated",
  "sdg": "string (optional, SDG number)",
  "finfracfranOnly": "boolean (optional)",
  "region": "string (optional)"
}`,
    changelog: [
      {
        date: "2024-10-20",
        version: "v1.1",
        note: "Added FinFracFran™ filter",
      },
      { date: "2024-08-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-005",
    name: "Submit Solution",
    method: "POST",
    path: "/v1/solutions/submit",
    description:
      "Submit a new local solution for AI scoring and review by the NewWaysNow Exchange committee. Solutions scoring above 75 are fast-tracked for global adoption.",
    status: "active",
    module: "solutions",
    authType: "bearer",
    rateLimit: "5/min",
    version: "v1",
    requestSchema: `{
  "title": "string (required)",
  "category": "string (required)",
  "problem": "string (required)",
  "approach": "string (required)",
  "results": "string (required)",
  "region": "string (required)",
  "sdgs": "string[] (optional)",
  "contactEmail": "string (required)"
}`,
    changelog: [
      { date: "2024-11-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-006",
    name: "Budget Tracker",
    method: "GET",
    path: "/v1/transparency/budget",
    description:
      "Returns real-time budget allocation and expenditure data across all councils and programs. Requires API key for detailed line-item access.",
    status: "active",
    module: "transparency",
    authType: "api_key",
    rateLimit: "60/min",
    version: "v1",
    responseSchema: `{
  "fiscalYear": "string",
  "totalAllocated": "number",
  "totalSpent": "number",
  "lines": [
    {
      "category": "string",
      "allocated": "number",
      "spent": "number",
      "council": "string"
    }
  ]
}`,
    changelog: [
      { date: "2024-09-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-007",
    name: "Open Contracts",
    method: "GET",
    path: "/v1/transparency/contracts",
    description:
      "Returns all open contracts with vendor details, values, FinFracFran™ license types, and audit trails. API key required.",
    status: "active",
    module: "transparency",
    authType: "api_key",
    rateLimit: "60/min",
    version: "v1",
    changelog: [
      { date: "2024-10-15", version: "v1.1", note: "Added audit trail data" },
      { date: "2024-09-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-008",
    name: "Member Registry",
    method: "GET",
    path: "/v1/community/members",
    description:
      "Returns paginated list of registered community members. Beta — currently in limited partner access. Bearer token required.",
    status: "beta",
    module: "community",
    authType: "bearer",
    rateLimit: "30/min",
    version: "v1",
    changelog: [
      {
        date: "2024-11-20",
        version: "v1.0-beta",
        note: "Beta release to limited partners",
      },
    ],
  },
  {
    id: "ep-009",
    name: "FF™ Disclosures",
    method: "GET",
    path: "/v1/finfracfran/disclosures",
    description:
      "Returns all FinFracFran™ franchise disclosures including tier, compliance scores, adopting nations, revenue share breakdowns, and audit histories.",
    status: "active",
    module: "finfracfran",
    authType: "public",
    rateLimit: "200/min",
    version: "v1",
    changelog: [
      {
        date: "2024-10-01",
        version: "v1.1",
        note: "Added compliance checklist data",
      },
      { date: "2024-08-15", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-010",
    name: "Apply for FF™ License",
    method: "POST",
    path: "/v1/finfracfran/license/apply",
    description:
      "Submit a FinFracFran™ franchise license application. Requires OAuth2 authentication. Applications are reviewed by the FinFracFran™ council within 30 days.",
    status: "active",
    module: "finfracfran",
    authType: "oauth2",
    rateLimit: "2/min",
    version: "v1",
    requestSchema: `{
  "orgName": "string (required)",
  "country": "string (required)",
  "tier": "Seed | Growth | Scale | Global (required)",
  "proposedRevenueShare": "number (required, 0-100)",
  "businessPlan": "string (required, markdown)",
  "sdgFocus": "string[] (optional)",
  "existingPartnerships": "string[] (optional)"
}`,
    changelog: [
      { date: "2024-09-15", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-011",
    name: "List Delegates",
    method: "GET",
    path: "/v1/assembly/delegates",
    description:
      "Returns all registered delegates with council assignments, voting records, AI alignment scores, and FinFracFran™ roles. Publicly accessible.",
    status: "active",
    module: "delegates",
    authType: "public",
    rateLimit: "200/min",
    version: "v1",
    responseSchema: `{
  "delegates": [
    {
      "id": "string",
      "name": "string",
      "council": "string",
      "country": "string",
      "aiAlignmentScore": "number",
      "votesThisTerm": "number",
      "ffRole": "string"
    }
  ]
}`,
    changelog: [
      {
        date: "2024-11-01",
        version: "v1.1",
        note: "Added AI alignment scores",
      },
      { date: "2024-07-01", version: "v1.0", note: "Initial release" },
    ],
  },
  {
    id: "ep-012",
    name: "Delete Proposal (Deprecated)",
    method: "DELETE",
    path: "/v1/governance/proposals/:id",
    description:
      "Deprecated. Use PATCH /v1/governance/proposals/:id/status to archive proposals. Hard deletion is no longer permitted under the Founding Charter transparency requirements.",
    status: "deprecated",
    module: "governance",
    authType: "bearer",
    rateLimit: "5/min",
    version: "v1",
    changelog: [
      {
        date: "2024-10-01",
        version: "v1.1",
        note: "Deprecated — use PATCH /status endpoint",
      },
      { date: "2024-07-01", version: "v1.0", note: "Initial release" },
    ],
  },
];

export const INTEGRATION_PARTNERS: IntegrationPartner[] = [
  {
    id: "partner-001",
    orgName: "UNDP Innovation Facility",
    type: "un_agency",
    status: "active",
    scopes: [
      "proposals:read",
      "resolutions:read",
      "solutions:read",
      "delegates:read",
      "budget:read",
    ],
    integrationDate: "2024-07-15",
    lastActive: "2024-12-10",
    description:
      "The UNDP Innovation Facility integrates ONEartHeaven governance data to inform their global development programme tracking and SDG alignment monitoring.",
    country: "United States",
    webhookSubscriptions: ["resolution_passed", "solution_adopted"],
    apiKeyStatus: "active",
    contactEmail: "innovation@undp.org",
  },
  {
    id: "partner-002",
    orgName: "Oxford Global Governance Institute",
    type: "academic",
    status: "active",
    scopes: [
      "proposals:read",
      "resolutions:read",
      "delegates:read",
      "voting_records:read",
    ],
    integrationDate: "2024-08-01",
    lastActive: "2024-12-09",
    description:
      "Oxford GGI uses the Delegate Registry and Voting Records API to power longitudinal research into decentralised governance effectiveness and democratic innovation.",
    country: "United Kingdom",
    webhookSubscriptions: [
      "proposal_created",
      "proposal_voted",
      "delegate_registered",
    ],
    apiKeyStatus: "active",
    contactEmail: "governance@oxfordggi.ac.uk",
  },
  {
    id: "partner-003",
    orgName: "GreenTech Solutions AG",
    type: "finfracfran_licensee",
    status: "active",
    scopes: [
      "solutions:read",
      "finfracfran:read",
      "finfracfran:write",
      "contracts:read",
    ],
    ffTier: "Growth",
    integrationDate: "2024-09-01",
    lastActive: "2024-12-11",
    description:
      "GreenTech Solutions AG is a FinFracFran™ Growth-tier licensee operating community solar microgrids across 12 nations under the NewWaysNow Solutions Exchange framework.",
    country: "Switzerland",
    webhookSubscriptions: [
      "solution_adopted",
      "finfracfran_license_issued",
      "audit_triggered",
    ],
    apiKeyStatus: "active",
    contactEmail: "api@greentech-ag.com",
  },
  {
    id: "partner-004",
    orgName: "EduAccess Global Ltd",
    type: "finfracfran_licensee",
    status: "active",
    scopes: ["solutions:read", "finfracfran:read", "community:read"],
    ffTier: "Scale",
    integrationDate: "2024-09-15",
    lastActive: "2024-12-08",
    description:
      "EduAccess Global operates the Open Curriculum Commons under a FinFracFran™ Scale license across 14 nations. Integration powers their student enrollment tracking.",
    country: "Kenya",
    webhookSubscriptions: ["solution_adopted", "member_joined"],
    apiKeyStatus: "rotated",
    contactEmail: "tech@eduaccess.global",
  },
  {
    id: "partner-005",
    orgName: "MediGlobal Research Consortium",
    type: "ngo",
    status: "active",
    scopes: [
      "solutions:read",
      "proposals:read",
      "resolutions:read",
      "finfracfran:read",
    ],
    ffTier: "Seed",
    integrationDate: "2024-10-01",
    lastActive: "2024-12-07",
    description:
      "MediGlobal integrates the Health council's solutions and proposals to coordinate CHW certification programs across 18 nations via their consortium network.",
    country: "Brazil",
    webhookSubscriptions: ["resolution_passed", "council_action"],
    apiKeyStatus: "active",
    contactEmail: "systems@mediglobal.org",
  },
  {
    id: "partner-006",
    orgName: "Estonia Digital Government Agency",
    type: "government",
    status: "active",
    scopes: [
      "proposals:read",
      "resolutions:read",
      "transparency:read",
      "budget:read",
      "contracts:read",
    ],
    integrationDate: "2024-10-15",
    lastActive: "2024-12-11",
    description:
      "Estonia's DGA integrates ONEartHeaven transparency data into their national open governance dashboard as a model for other nations adopting digital governance standards.",
    country: "Estonia",
    webhookSubscriptions: [
      "resolution_passed",
      "audit_triggered",
      "contract_flagged",
    ],
    apiKeyStatus: "active",
    contactEmail: "opendata@dga.ee",
  },
  {
    id: "partner-007",
    orgName: "PeaceNet Consulting Group",
    type: "ngo",
    status: "pending",
    scopes: ["proposals:read", "solutions:read", "delegates:read"],
    integrationDate: "2024-11-20",
    lastActive: "2024-11-25",
    description:
      "PeaceNet is awaiting approval for integration to access PeaceBuilders council proposals and conflict early warning solution data for their mediation network.",
    country: "Switzerland",
    webhookSubscriptions: ["proposal_created", "council_action"],
    apiKeyStatus: "active",
    contactEmail: "digital@peacenet.ch",
  },
  {
    id: "partner-008",
    orgName: "Global Cities Alliance",
    type: "ngo",
    status: "active",
    scopes: ["solutions:read", "community:read", "proposals:read"],
    integrationDate: "2024-11-01",
    lastActive: "2024-12-06",
    description:
      "The Global Cities Alliance integrates Solutions Exchange data to match city-level challenges with proven NewWaysNow solutions from their 194-city network.",
    country: "Netherlands",
    webhookSubscriptions: [
      "solution_adopted",
      "member_joined",
      "council_action",
    ],
    apiKeyStatus: "active",
    contactEmail: "api@globalcities.org",
  },
];

export const WEBHOOK_CONFIGS: WebhookConfig[] = [
  {
    id: "wh-001",
    eventType: "proposal_created",
    targetUrl: "https://api.oxfordggi.ac.uk/webhooks/onearthheaven",
    status: "active",
    lastTriggered: "2024-12-09T14:22:00Z",
    successCount: 287,
    failCount: 3,
    partnerId: "partner-002",
  },
  {
    id: "wh-002",
    eventType: "proposal_voted",
    targetUrl: "https://api.oxfordggi.ac.uk/webhooks/onearthheaven/votes",
    status: "active",
    lastTriggered: "2024-12-10T09:41:00Z",
    successCount: 1843,
    failCount: 12,
    partnerId: "partner-002",
  },
  {
    id: "wh-003",
    eventType: "resolution_passed",
    targetUrl: "https://hooks.undp.org/onearthheaven/resolutions",
    status: "active",
    lastTriggered: "2024-12-05T16:00:00Z",
    successCount: 42,
    failCount: 0,
    partnerId: "partner-001",
  },
  {
    id: "wh-004",
    eventType: "solution_adopted",
    targetUrl: "https://platform.greentech-ag.com/api/adoption-sync",
    status: "active",
    lastTriggered: "2024-12-11T08:15:00Z",
    successCount: 156,
    failCount: 7,
    partnerId: "partner-003",
  },
  {
    id: "wh-005",
    eventType: "audit_triggered",
    targetUrl: "https://opendata.dga.ee/onearthheaven/audits",
    status: "active",
    lastTriggered: "2024-12-03T11:30:00Z",
    successCount: 28,
    failCount: 1,
    partnerId: "partner-006",
  },
  {
    id: "wh-006",
    eventType: "contract_flagged",
    targetUrl: "https://opendata.dga.ee/onearthheaven/contracts",
    status: "active",
    lastTriggered: "2024-11-28T09:00:00Z",
    successCount: 14,
    failCount: 2,
    partnerId: "partner-006",
  },
  {
    id: "wh-007",
    eventType: "delegate_registered",
    targetUrl: "https://api.oxfordggi.ac.uk/webhooks/delegates",
    status: "paused",
    lastTriggered: "2024-11-15T12:00:00Z",
    successCount: 14,
    failCount: 0,
    partnerId: "partner-002",
  },
  {
    id: "wh-008",
    eventType: "finfracfran_license_issued",
    targetUrl: "https://platform.greentech-ag.com/api/license-sync",
    status: "active",
    lastTriggered: "2024-12-01T10:00:00Z",
    successCount: 9,
    failCount: 0,
    partnerId: "partner-003",
  },
  {
    id: "wh-009",
    eventType: "council_action",
    targetUrl: "https://mediglobal.org/api/council-sync",
    status: "active",
    lastTriggered: "2024-12-08T14:00:00Z",
    successCount: 63,
    failCount: 4,
    partnerId: "partner-005",
  },
  {
    id: "wh-010",
    eventType: "member_joined",
    targetUrl: "https://api.globalcities.org/onearthheaven/members",
    status: "active",
    lastTriggered: "2024-12-10T17:30:00Z",
    successCount: 1247,
    failCount: 18,
    partnerId: "partner-008",
  },
];

export const API_USAGE_LOGS: APIUsageLog[] = [
  {
    id: "log-001",
    endpointId: "ep-001",
    partnerId: "partner-001",
    timestamp: "2024-12-11T08:01:00Z",
    responseCode: 200,
    latencyMs: 82,
    method: "GET",
  },
  {
    id: "log-002",
    endpointId: "ep-004",
    partnerId: "partner-003",
    timestamp: "2024-12-11T08:15:00Z",
    responseCode: 200,
    latencyMs: 94,
    method: "GET",
  },
  {
    id: "log-003",
    endpointId: "ep-002",
    partnerId: "partner-002",
    timestamp: "2024-12-11T09:00:00Z",
    responseCode: 201,
    latencyMs: 340,
    method: "POST",
  },
  {
    id: "log-004",
    endpointId: "ep-006",
    partnerId: "partner-006",
    timestamp: "2024-12-11T09:30:00Z",
    responseCode: 200,
    latencyMs: 115,
    method: "GET",
  },
  {
    id: "log-005",
    endpointId: "ep-011",
    partnerId: "partner-001",
    timestamp: "2024-12-11T10:05:00Z",
    responseCode: 200,
    latencyMs: 67,
    method: "GET",
  },
  {
    id: "log-006",
    endpointId: "ep-005",
    partnerId: "partner-005",
    timestamp: "2024-12-11T10:22:00Z",
    responseCode: 201,
    latencyMs: 510,
    method: "POST",
  },
  {
    id: "log-007",
    endpointId: "ep-009",
    partnerId: "partner-003",
    timestamp: "2024-12-11T10:45:00Z",
    responseCode: 200,
    latencyMs: 78,
    method: "GET",
  },
  {
    id: "log-008",
    endpointId: "ep-001",
    partnerId: "partner-007",
    timestamp: "2024-12-11T11:00:00Z",
    responseCode: 401,
    latencyMs: 22,
    method: "GET",
  },
  {
    id: "log-009",
    endpointId: "ep-003",
    partnerId: "partner-002",
    timestamp: "2024-12-11T11:15:00Z",
    responseCode: 200,
    latencyMs: 91,
    method: "GET",
  },
  {
    id: "log-010",
    endpointId: "ep-007",
    partnerId: "partner-006",
    timestamp: "2024-12-11T11:30:00Z",
    responseCode: 200,
    latencyMs: 130,
    method: "GET",
  },
  {
    id: "log-011",
    endpointId: "ep-010",
    partnerId: "partner-004",
    timestamp: "2024-12-10T14:00:00Z",
    responseCode: 201,
    latencyMs: 720,
    method: "POST",
  },
  {
    id: "log-012",
    endpointId: "ep-001",
    partnerId: "partner-008",
    timestamp: "2024-12-10T15:00:00Z",
    responseCode: 429,
    latencyMs: 8,
    method: "GET",
  },
  {
    id: "log-013",
    endpointId: "ep-004",
    partnerId: "partner-005",
    timestamp: "2024-12-10T16:00:00Z",
    responseCode: 200,
    latencyMs: 88,
    method: "GET",
  },
  {
    id: "log-014",
    endpointId: "ep-008",
    partnerId: "partner-001",
    timestamp: "2024-12-09T09:00:00Z",
    responseCode: 200,
    latencyMs: 152,
    method: "GET",
  },
  {
    id: "log-015",
    endpointId: "ep-002",
    partnerId: "partner-006",
    timestamp: "2024-12-09T10:30:00Z",
    responseCode: 400,
    latencyMs: 45,
    method: "POST",
  },
  {
    id: "log-016",
    endpointId: "ep-011",
    partnerId: "partner-003",
    timestamp: "2024-12-08T08:00:00Z",
    responseCode: 200,
    latencyMs: 70,
    method: "GET",
  },
  {
    id: "log-017",
    endpointId: "ep-006",
    partnerId: "partner-004",
    timestamp: "2024-12-08T09:45:00Z",
    responseCode: 200,
    latencyMs: 110,
    method: "GET",
  },
  {
    id: "log-018",
    endpointId: "ep-005",
    partnerId: "partner-008",
    timestamp: "2024-12-07T14:00:00Z",
    responseCode: 500,
    latencyMs: 980,
    method: "POST",
  },
  {
    id: "log-019",
    endpointId: "ep-003",
    partnerId: "partner-001",
    timestamp: "2024-12-07T15:30:00Z",
    responseCode: 200,
    latencyMs: 95,
    method: "GET",
  },
  {
    id: "log-020",
    endpointId: "ep-009",
    partnerId: "partner-004",
    timestamp: "2024-12-06T11:00:00Z",
    responseCode: 200,
    latencyMs: 80,
    method: "GET",
  },
];

export const INTEGRATION_STATS: IntegrationStats = {
  totalEndpoints: 12,
  activeEndpoints: 9,
  totalPartners: 8,
  activePartners: 6,
  totalWebhooks: 10,
  activeWebhooks: 9,
  uptimePercent: 99.7,
  apiCallsToday: 4821,
  apiCallsThisMonth: 142650,
};

// ─── Helper Functions ───────────────────────────────────────────────────────────
export function getAllEndpoints(): APIEndpoint[] {
  return API_ENDPOINTS;
}

export function getEndpoint(id: string): APIEndpoint | undefined {
  return API_ENDPOINTS.find((ep) => ep.id === id);
}

export function getEndpointsByModule(module: string): APIEndpoint[] {
  return API_ENDPOINTS.filter((ep) => ep.module === module);
}

export function getAllPartners(): IntegrationPartner[] {
  return INTEGRATION_PARTNERS;
}

export function getPartner(id: string): IntegrationPartner | undefined {
  return INTEGRATION_PARTNERS.find((p) => p.id === id);
}

export function getPartnersByType(type: string): IntegrationPartner[] {
  return INTEGRATION_PARTNERS.filter((p) => p.type === type);
}

export function getAllWebhooks(): WebhookConfig[] {
  return WEBHOOK_CONFIGS;
}

export function getWebhooksByEvent(eventType: string): WebhookConfig[] {
  return WEBHOOK_CONFIGS.filter((wh) => wh.eventType === eventType);
}

export function getIntegrationStats(): IntegrationStats {
  return INTEGRATION_STATS;
}
