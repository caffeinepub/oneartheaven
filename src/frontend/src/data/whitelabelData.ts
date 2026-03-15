/**
 * whitelabelData.ts
 * Seed white-label configs for Phase 12 Area 1.
 */

import type { WhiteLabelConfig } from "@/data/whitelabelTypes";

export const SEED_WL_CONFIGS: WhiteLabelConfig[] = [
  {
    id: "wl-africa-climate-001",
    orgId: "org-africa-climate-002",
    brandName: "African Climate Alliance",
    tagline: "Pan-African Climate Action for a Green Future",
    heroHeadline: "Climate Justice Starts Here",
    heroSubline:
      "Coordinating renewable energy transitions and green finance across 54 African nations.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#16a34a",
    secondaryColor: "#14532d",
    accentColor: "#4ade80",
    fontFamily: "Plus Jakarta Sans",
    customDomain: "climate.oneeartheaven.org",
    supportEmail: "support@africanclimatealliance.org",
    socialLinks: {
      twitter: "https://twitter.com/AfricanClimate",
      linkedin: "https://linkedin.com/company/african-climate-alliance",
      website: "https://africanclimatealliance.org",
    },
    status: "active",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "wl-eu-cooperative-002",
    orgId: "org-eu-cooperative-003",
    brandName: "European Cooperative Network",
    tagline: "Worker Ownership. Democratic Enterprise. FinFracFran™.",
    heroHeadline: "Building a Cooperative Europe",
    heroSubline:
      "Advancing worker ownership and democratic enterprise models across the European Union.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#1d4ed8",
    secondaryColor: "#1e3a8a",
    accentColor: "#38bdf8",
    fontFamily: "DM Sans",
    customDomain: "coop.oneeartheaven.org",
    supportEmail: "hello@eucooperative.net",
    socialLinks: {
      twitter: "https://twitter.com/EUCooperative",
      linkedin: "https://linkedin.com/company/eu-cooperative-network",
      github: "https://github.com/eu-cooperative",
      website: "https://eucooperative.net",
    },
    status: "preview",
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "wl-global-dao-003",
    orgId: "org-global-solutions-dao-005",
    brandName: "Global Solutions DAO",
    tagline: "Decentralized Governance for a Borderless World",
    heroHeadline: "Govern the Future on ICP",
    heroSubline:
      "Decentralized autonomous governance, FinFracFran™ protocol development, and global solutions funding.",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#7c3aed",
    secondaryColor: "#4c1d95",
    accentColor: "#e879f9",
    fontFamily: "Outfit",
    customDomain: "dao.oneeartheaven.org",
    supportEmail: "ops@globalsolutionsdao.xyz",
    socialLinks: {
      twitter: "https://twitter.com/GlobalSolDAO",
      github: "https://github.com/global-solutions-dao",
      website: "https://globalsolutionsdao.xyz",
    },
    status: "draft",
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2025-03-01T00:00:00Z",
  },
];

export function getWhiteLabelConfig(
  orgId: string,
): WhiteLabelConfig | undefined {
  return SEED_WL_CONFIGS.find((c) => c.orgId === orgId);
}

export function getAllWhiteLabelConfigs(): WhiteLabelConfig[] {
  return SEED_WL_CONFIGS;
}
