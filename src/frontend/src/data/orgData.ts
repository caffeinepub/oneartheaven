/**
 * orgData.ts
 * Seed data for tenant organizations used in Phase 11 Area 5.
 */

import type { Organization } from "@/data/backendTypes";

export const PLATFORM_ORG_ID = "org-oneearth-platform-001";

export const SEED_ORGS: Organization[] = [
  {
    orgId: PLATFORM_ORG_ID,
    name: "ONEartHeaven™ Platform",
    type: "Foundation",
    tier: "Global",
    status: "active",
    country: "Global",
    region: "Global",
    logoUrl: "",
    description:
      "The root platform organization governing all ONEartHeaven™ operations, infrastructure, and global coordination.",
    primaryColor: "oklch(0.72 0.16 75)",
    featureFlags: {
      governance: true,
      finance: true,
      academy: true,
      sustainability: true,
      transparency: true,
      integrations: true,
      memberCap: 100000,
    },
    memberCount: 12847,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2025-03-01T00:00:00Z",
  },
  {
    orgId: "org-africa-climate-002",
    name: "African Climate Alliance",
    type: "NGO",
    tier: "Growth",
    status: "active",
    country: "Kenya",
    region: "Africa",
    logoUrl: "",
    description:
      "Pan-African NGO coordinating climate action, renewable energy transitions, and green finance across 54 African nations.",
    primaryColor: "oklch(0.68 0.18 155)",
    featureFlags: {
      governance: true,
      finance: true,
      academy: true,
      sustainability: true,
      transparency: false,
      integrations: false,
      memberCap: 5000,
    },
    memberCount: 347,
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    orgId: "org-eu-cooperative-003",
    name: "European Cooperative Network",
    type: "Cooperative",
    tier: "Scale",
    status: "active",
    country: "Germany",
    region: "Europe",
    logoUrl: "",
    description:
      "A cross-border European cooperative network advancing worker ownership, democratic enterprise, and FinFracFran™ adoption across the EU.",
    primaryColor: "oklch(0.72 0.17 260)",
    featureFlags: {
      governance: true,
      finance: true,
      academy: false,
      sustainability: true,
      transparency: true,
      integrations: true,
      memberCap: 10000,
    },
    memberCount: 823,
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2025-02-14T00:00:00Z",
  },
  {
    orgId: "org-pacific-nations-004",
    name: "Pacific Island Nations Council",
    type: "Nation",
    tier: "Seed",
    status: "active",
    country: "Fiji",
    region: "Oceania",
    logoUrl: "",
    description:
      "Collective governance body for 14 Pacific island nations coordinating climate resilience, ocean protection, and sovereignty.",
    primaryColor: "oklch(0.62 0.19 220)",
    featureFlags: {
      governance: true,
      finance: false,
      academy: false,
      sustainability: true,
      transparency: true,
      integrations: false,
      memberCap: 500,
    },
    memberCount: 156,
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    orgId: "org-global-solutions-dao-005",
    name: "Global Solutions DAO",
    type: "DAO",
    tier: "Scale",
    status: "active",
    country: "Decentralized",
    region: "Global",
    logoUrl: "",
    description:
      "Decentralized autonomous organization operating on ICP for global solutions funding, governance votes, and FinFracFran™ protocol development.",
    primaryColor: "oklch(0.70 0.19 300)",
    featureFlags: {
      governance: true,
      finance: true,
      academy: true,
      sustainability: false,
      transparency: true,
      integrations: true,
      memberCap: 50000,
    },
    memberCount: 3241,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2025-03-05T00:00:00Z",
  },
  {
    orgId: "org-finfracfran-hub-006",
    name: "FinFracFran™ Franchise Hub",
    type: "Corporate",
    tier: "Global",
    status: "active",
    country: "Singapore",
    region: "Asia",
    logoUrl: "",
    description:
      "Headquarters of the FinFracFran™ global franchise and fractionalization network, licensing the model across 194 nations.",
    primaryColor: "oklch(0.74 0.20 75)",
    featureFlags: {
      governance: true,
      finance: true,
      academy: true,
      sustainability: true,
      transparency: true,
      integrations: true,
      memberCap: 200000,
    },
    memberCount: 7458,
    createdAt: "2023-11-01T00:00:00Z",
    updatedAt: "2025-03-10T00:00:00Z",
  },
];

export function getAllOrgs(): Organization[] {
  return SEED_ORGS;
}

export function getOrg(orgId: string): Organization | undefined {
  return SEED_ORGS.find((o) => o.orgId === orgId);
}

export function getOrgsByType(type: Organization["type"]): Organization[] {
  return SEED_ORGS.filter((o) => o.type === type);
}

export function getActiveOrgs(): Organization[] {
  return SEED_ORGS.filter((o) => o.status === "active");
}

export function getOrgsByRegion(region: string): Organization[] {
  return SEED_ORGS.filter((o) => o.region === region);
}

export function getPlatformOrg(): Organization | undefined {
  return SEED_ORGS.find((o) => o.orgId === PLATFORM_ORG_ID);
}
