// ---------------------------------------------------------------------------
// Partnership & Ecosystem Hub — Seed Data
// Phase 13 · Area 8
// ---------------------------------------------------------------------------

import type {
  AgreementStatus,
  AgreementType,
  PartnerAgreement,
  PartnerProfile,
  PartnerRegion,
  PartnerStats,
  PartnerTier,
  PartnerType,
} from "./partnerTypes";

// ---------------------------------------------------------------------------
// 12 Partner Profiles (2 per major region + 2 global)
// ---------------------------------------------------------------------------

export const PARTNER_PROFILES: PartnerProfile[] = [
  // Africa
  {
    id: "partner-001",
    name: "African Union Development Agency",
    tagline: "Pan-African solutions for sustainable development",
    description:
      "AUDA-NEPAD drives continental development by coordinating regional initiatives, mobilising resources, and building partnerships for Africa's 55 member states.",
    type: "government",
    tier: "platinum",
    status: "active",
    country: "South Africa",
    region: "africa",
    coordinates: { lat: -25.7479, lng: 28.2293 },
    sdgFocus: ["governance", "education", "health", "agriculture"],
    contributionScore: 94,
    ffTier: "FinFracFran™ Tier 1",
    featuredQuote:
      "ONEartHeaven represents the kind of inclusive governance innovation Africa has long championed.",
    contactName: "Dr. Nkosazana Dlamini-Zuma",
    contactEmail: "partnerships@auda-nepad.org",
    website: "https://www.nepad.org",
    logoEmoji: "🌍",
    memberSince: "2024-03-01",
    agreementIds: ["agr-001", "agr-002"],
  },
  {
    id: "partner-002",
    name: "Nairobi Innovation Hub",
    tagline: "East Africa's premier tech and social enterprise ecosystem",
    description:
      "A thriving ecosystem of 400+ startups, labs, and global partners working on climate tech, fintech, and agritech solutions for African markets.",
    type: "ngo",
    tier: "gold",
    status: "active",
    country: "Kenya",
    region: "africa",
    coordinates: { lat: -1.2921, lng: 36.8219 },
    sdgFocus: ["technology", "finance", "community", "agriculture"],
    contributionScore: 87,
    ffTier: "FinFracFran™ Tier 2",
    featuredQuote:
      "Local innovation, global impact — that's the ONEartHeaven way.",
    contactName: "Amara Osei",
    contactEmail: "amara@nairobi-hub.co.ke",
    website: "https://nairobi-hub.co.ke",
    logoEmoji: "🔬",
    memberSince: "2024-05-15",
    agreementIds: ["agr-003"],
  },
  // Asia-Pacific
  {
    id: "partner-003",
    name: "Asia Pacific Cooperative Network",
    tagline: "Cooperative economics across 26 Asia-Pacific nations",
    description:
      "APCN connects 2,800 cooperatives across Asia-Pacific, advancing FinFracFran™ models and democratic enterprise structures from Japan to Papua New Guinea.",
    type: "ngo",
    tier: "gold",
    status: "active",
    country: "Japan",
    region: "asia-pacific",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    sdgFocus: ["finance", "community", "governance", "equality"],
    contributionScore: 89,
    ffTier: "FinFracFran™ Tier 2",
    featuredQuote:
      "The cooperative movement and decentralised governance are natural allies.",
    contactName: "Dr. Yuki Tanaka",
    contactEmail: "partnerships@apcn-coop.net",
    website: "https://apcn-coop.net",
    logoEmoji: "🤝",
    memberSince: "2024-04-20",
    agreementIds: ["agr-004"],
  },
  {
    id: "partner-004",
    name: "South Asian Development Consortium",
    tagline: "Bridging policy and practice across South Asia",
    description:
      "SADC brings together governments, civil society, and private sector actors from Bangladesh, India, Nepal, Pakistan, and Sri Lanka to co-create sustainable development solutions.",
    type: "ngo",
    tier: "silver",
    status: "active",
    country: "India",
    region: "asia-pacific",
    coordinates: { lat: 28.6139, lng: 77.209 },
    sdgFocus: ["health", "education", "water", "agriculture"],
    contributionScore: 82,
    ffTier: "FinFracFran™ Tier 3",
    contactName: "Priya Mehta",
    contactEmail: "priya@sadc-network.org",
    website: "https://sadc-network.org",
    logoEmoji: "🌏",
    memberSince: "2024-06-10",
    agreementIds: [],
  },
  // Europe
  {
    id: "partner-005",
    name: "Nordic Council of Municipalities",
    tagline: "Transparent local governance across 5 Nordic nations",
    description:
      "NCM represents 890 municipalities across Denmark, Finland, Iceland, Norway, and Sweden. Pioneers of open-data governance and participatory budget models.",
    type: "government",
    tier: "platinum",
    status: "active",
    country: "Sweden",
    region: "europe",
    coordinates: { lat: 59.3293, lng: 18.0686 },
    sdgFocus: ["governance", "climate", "energy", "community"],
    contributionScore: 96,
    ffTier: "FinFracFran™ Tier 1",
    featuredQuote:
      "Nordic municipalities have led transparent governance for decades — this platform scales it globally.",
    contactName: "James Whitfield",
    contactEmail: "j.whitfield@nordic-municipalities.org",
    website: "https://nordic-municipalities.org",
    logoEmoji: "🏛️",
    memberSince: "2024-01-15",
    agreementIds: ["agr-005", "agr-006"],
  },
  {
    id: "partner-006",
    name: "Global Governance Alliance",
    tagline: "Reforming multilateral institutions from within",
    description:
      "GGA is a coalition of 34 policy institutes and think tanks advocating for representative, transparent, and effective global governance structures.",
    type: "ngo",
    tier: "gold",
    status: "active",
    country: "Switzerland",
    region: "europe",
    coordinates: { lat: 46.9481, lng: 7.4474 },
    sdgFocus: ["governance", "peace", "equality", "finance"],
    contributionScore: 91,
    ffTier: "FinFracFran™ Tier 1",
    featuredQuote:
      "Genuine governance reform requires new structures, not patching old ones.",
    contactName: "Ambassador Chen Fang",
    contactEmail: "chen.fang@global-governance.org",
    website: "https://global-governance.org",
    logoEmoji: "⚖️",
    memberSince: "2024-02-01",
    agreementIds: ["agr-007"],
  },
  // Latin America
  {
    id: "partner-007",
    name: "Latin American Climate Collective",
    tagline: "Amazon-to-Andes climate solutions at scale",
    description:
      "LACC coordinates climate action across 12 Latin American nations, linking indigenous communities, governments, and NGOs on forest protection, clean energy, and water security.",
    type: "ngo",
    tier: "gold",
    status: "active",
    country: "Brazil",
    region: "latin-america",
    coordinates: { lat: -15.7942, lng: -47.8825 },
    sdgFocus: ["climate", "water", "community", "agriculture"],
    contributionScore: 88,
    ffTier: "FinFracFran™ Tier 2",
    featuredQuote:
      "The Amazon belongs to all of humanity — we protect it together.",
    contactName: "María Gonzalez",
    contactEmail: "maria@lacc-climate.org",
    logoEmoji: "🌿",
    memberSince: "2024-07-01",
    agreementIds: ["agr-008"],
  },
  {
    id: "partner-008",
    name: "Caribbean Innovation Institute",
    tagline: "Island-scale solutions with global applicability",
    description:
      "CII pioneers resilience solutions for small island developing states: coral-reef monitoring, blue economy finance, and circular waste systems adapted for other coastal communities worldwide.",
    type: "academic",
    tier: "silver",
    status: "active",
    country: "Jamaica",
    region: "latin-america",
    coordinates: { lat: 18.0179, lng: -76.8099 },
    sdgFocus: ["climate", "energy", "water", "technology"],
    contributionScore: 79,
    ffTier: "FinFracFran™ Tier 3",
    contactName: "Dr. Samuel Brown",
    contactEmail: "s.brown@caribbean-innovation.org",
    logoEmoji: "🏝️",
    memberSince: "2024-08-15",
    agreementIds: [],
  },
  // North America
  {
    id: "partner-009",
    name: "Open Governance Foundation",
    tagline: "Open standards for democratic digital infrastructure",
    description:
      "OGF develops and advocates for open-source civic technology: participatory budgeting platforms, e-petition tools, and AI transparency standards adopted by 23 US cities and 6 Canadian provinces.",
    type: "open-source",
    tier: "gold",
    status: "active",
    country: "United States",
    region: "north-america",
    coordinates: { lat: 38.9072, lng: -77.0369 },
    sdgFocus: ["governance", "technology", "community", "equality"],
    contributionScore: 85,
    ffTier: "FinFracFran™ Tier 2",
    featuredQuote:
      "Code is policy. Open governance requires open code — and ONEartHeaven delivers both.",
    contactName: "Sarah Chen",
    contactEmail: "sarah@open-governance.org",
    website: "https://open-governance.org",
    logoEmoji: "🔓",
    memberSince: "2024-03-20",
    agreementIds: [],
  },
  {
    id: "partner-010",
    name: "MIT Media Lab Governance Initiative",
    tagline: "Research-driven governance innovation",
    description:
      "MIT's Governance Initiative conducts applied research on AI policy, digital identity, and participatory systems, providing evidence-based insights to global policymakers and the ONEartHeaven platform.",
    type: "academic",
    tier: "platinum",
    status: "active",
    country: "United States",
    region: "north-america",
    coordinates: { lat: 42.3601, lng: -71.0942 },
    sdgFocus: ["technology", "governance", "education", "peace"],
    contributionScore: 93,
    ffTier: "FinFracFran™ Tier 1",
    featuredQuote:
      "Rigorous research and radical transparency go hand in hand.",
    contactName: "Prof. David Kim",
    contactEmail: "d.kim@media.mit.edu",
    website: "https://media.mit.edu",
    logoEmoji: "🎓",
    memberSince: "2024-02-28",
    agreementIds: [],
  },
  // Middle East
  {
    id: "partner-011",
    name: "MENA Water Stewardship Alliance",
    tagline: "Securing water futures across the Middle East & North Africa",
    description:
      "MWSA unites 18 governments and 40 NGOs on shared water governance, aquifer monitoring, and agricultural efficiency across the most water-stressed region on Earth.",
    type: "ngo",
    tier: "silver",
    status: "active",
    country: "Jordan",
    region: "middle-east",
    coordinates: { lat: 31.9539, lng: 35.9106 },
    sdgFocus: ["water", "agriculture", "climate", "community"],
    contributionScore: 81,
    ffTier: "FinFracFran™ Tier 3",
    contactName: "Fatima Al-Rashid",
    contactEmail: "f.alrashid@mena-water.org",
    logoEmoji: "💧",
    memberSince: "2024-09-01",
    agreementIds: [],
  },
  // Oceania
  {
    id: "partner-012",
    name: "Pacific Island Forum Secretariat",
    tagline: "Amplifying Pacific voices in global governance",
    description:
      "PIFS represents 18 Pacific Island nations advocating for climate justice, blue-economy sovereignty, and equitable access to global governance structures.",
    type: "government",
    tier: "gold",
    status: "active",
    country: "Fiji",
    region: "oceania",
    coordinates: { lat: -18.1248, lng: 178.4501 },
    sdgFocus: ["climate", "governance", "peace", "energy"],
    contributionScore: 86,
    ffTier: "FinFracFran™ Tier 2",
    featuredQuote:
      "For small islands, global governance is not abstract — it's survival.",
    contactName: "Henry Puna",
    contactEmail: "h.puna@forumsec.org",
    website: "https://forumsec.org",
    logoEmoji: "🌊",
    memberSince: "2024-06-30",
    agreementIds: [],
  },
];

// ---------------------------------------------------------------------------
// 8 Partnership Agreements
// ---------------------------------------------------------------------------

export const PARTNER_AGREEMENTS: PartnerAgreement[] = [
  {
    id: "agr-001",
    partnerId: "partner-001",
    partnerName: "African Union Development Agency",
    type: "mou" as AgreementType,
    status: "active" as AgreementStatus,
    title: "Pan-African Governance Collaboration MOU",
    summary:
      "Framework for deploying ONEartHeaven governance modules across AUDA-NEPAD member states, with co-branded dashboards and localized SDG tracking.",
    terms: [
      "Joint pilot in 5 AU member states within 18 months",
      "Co-branded impact reports for 17 SDG tracking",
      "AUDA-NEPAD staff access to Academy certification tracks",
      "Quarterly governance review sessions",
    ],
    valueUSD: 250000,
    revenueSharePct: 12,
    signedAt: "2024-03-15",
    expiresAt: "2027-03-14",
    autoRenew: true,
    createdAt: "2024-03-01",
  },
  {
    id: "agr-002",
    partnerId: "partner-001",
    partnerName: "African Union Development Agency",
    type: "data-sharing" as AgreementType,
    status: "active" as AgreementStatus,
    title: "AU Development Data Integration",
    summary:
      "Bi-directional data sharing agreement for development statistics, SDG progress metrics, and regional governance indicators.",
    terms: [
      "Real-time SDG metric feeds from AU statistical agencies",
      "ONEartHeaven transparency portal integration",
      "Data sovereignty and GDPR-equivalent protections",
    ],
    signedAt: "2024-04-01",
    expiresAt: "2026-03-31",
    autoRenew: true,
    createdAt: "2024-03-20",
  },
  {
    id: "agr-003",
    partnerId: "partner-002",
    partnerName: "Nairobi Innovation Hub",
    type: "co-development" as AgreementType,
    status: "active" as AgreementStatus,
    title: "East Africa Tech Co-Development Agreement",
    summary:
      "Joint development of FinFracFran™ modules optimised for mobile-first East African markets, including M-Pesa integration and offline-capable governance tools.",
    terms: [
      "6-month co-dev sprint with 4 NIH engineers",
      "Mobile-first governance UI for feature phones",
      "Swahili localization and RTL testing",
      "Open-source release of core offline modules",
    ],
    valueUSD: 80000,
    signedAt: "2024-06-01",
    expiresAt: "2025-12-31",
    autoRenew: false,
    createdAt: "2024-05-15",
  },
  {
    id: "agr-004",
    partnerId: "partner-003",
    partnerName: "Asia Pacific Cooperative Network",
    type: "revenue-share" as AgreementType,
    status: "active" as AgreementStatus,
    title: "Asia-Pacific FinFracFran™ Revenue Share",
    summary:
      "APCN serves as exclusive FinFracFran™ distributor for cooperative sector across Asia-Pacific, with a tiered revenue share on all cooperative franchise placements.",
    terms: [
      "15% revenue share on all cooperative FF™ placements",
      "Minimum 20 placements per year",
      "Quarterly performance reviews",
      "APCN co-branding on all AP-region listings",
    ],
    valueUSD: 120000,
    revenueSharePct: 15,
    signedAt: "2024-05-01",
    expiresAt: "2027-04-30",
    autoRenew: true,
    createdAt: "2024-04-20",
  },
  {
    id: "agr-005",
    partnerId: "partner-005",
    partnerName: "Nordic Council of Municipalities",
    type: "integration" as AgreementType,
    status: "active" as AgreementStatus,
    title: "Nordic Open Data Governance Integration",
    summary:
      "Technical integration of Nordic municipal open-data platforms with ONEartHeaven transparency portal, enabling real-time financial disclosure and participatory budgeting.",
    terms: [
      "API integration with 890 municipal systems",
      "Real-time budget transparency feeds",
      "Joint citizen engagement pilot in 3 cities",
      "Open-source release of integration layer",
    ],
    valueUSD: 180000,
    signedAt: "2024-02-15",
    expiresAt: "2026-02-14",
    autoRenew: true,
    createdAt: "2024-01-15",
  },
  {
    id: "agr-006",
    partnerId: "partner-005",
    partnerName: "Nordic Council of Municipalities",
    type: "mou" as AgreementType,
    status: "active" as AgreementStatus,
    title: "Nordic Founding Partner MOU",
    summary:
      "Comprehensive founding partnership recognising NCM as a Platinum partner and establishing governance representation on the ONEartHeaven Advisory Council.",
    terms: [
      "Advisory Council seat for NCM representative",
      "Early access to all new platform features",
      "Co-authorship of best-practice governance publications",
      "Annual Nordic Governance Summit co-hosting",
    ],
    valueUSD: 50000,
    signedAt: "2024-01-20",
    expiresAt: "2029-01-19",
    autoRenew: true,
    createdAt: "2024-01-15",
  },
  {
    id: "agr-007",
    partnerId: "partner-006",
    partnerName: "Global Governance Alliance",
    type: "mou" as AgreementType,
    status: "active" as AgreementStatus,
    title: "Global Governance Reform Partnership",
    summary:
      "Strategic partnership for joint research, policy advocacy, and global governance reform initiatives, with GGA contributing research to ONEartHeaven's AI Policy Advisor.",
    terms: [
      "Quarterly policy research contributions",
      "AI Policy Advisor knowledge base integration",
      "Joint UN side-event representation",
      "GGA policy briefs published on platform",
    ],
    signedAt: "2024-02-10",
    expiresAt: "2027-02-09",
    autoRenew: true,
    createdAt: "2024-02-01",
  },
  {
    id: "agr-008",
    partnerId: "partner-007",
    partnerName: "Latin American Climate Collective",
    type: "data-sharing" as AgreementType,
    status: "active" as AgreementStatus,
    title: "Amazon Basin Climate Data Sharing",
    summary:
      "Real-time sharing of deforestation metrics, carbon sequestration data, and community-reported climate events for the ONEartHeaven impact dashboard.",
    terms: [
      "Weekly satellite-derived deforestation feeds",
      "Community reporting integration for 200+ villages",
      "SDG 13 (Climate Action) tracking and attribution",
      "Open access to anonymised community data",
    ],
    signedAt: "2024-07-15",
    expiresAt: "2026-07-14",
    autoRenew: true,
    createdAt: "2024-07-01",
  },
];

// ---------------------------------------------------------------------------
// Pre-computed stats
// ---------------------------------------------------------------------------

export const PARTNER_STATS: PartnerStats = {
  total: 12,
  active: 12,
  byType: {
    founding: 0,
    "regional-champion": 0,
    academic: 2,
    ngo: 5,
    corporate: 0,
    government: 3,
    "open-source": 1,
  } as Record<PartnerType, number>,
  byRegion: {
    africa: 2,
    "asia-pacific": 2,
    europe: 2,
    "latin-america": 2,
    "middle-east": 1,
    "north-america": 2,
    oceania: 1,
    global: 0,
  } as Record<PartnerRegion, number>,
  byTier: {
    platinum: 4,
    gold: 5,
    silver: 3,
    bronze: 0,
  } as Record<PartnerTier, number>,
  nations: 12,
  sdgsCovered: 12,
  avgScore: 87,
  totalAgreementValue: 803000,
};

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getAllPartners(): PartnerProfile[] {
  return PARTNER_PROFILES;
}

export function getPartner(id: string): PartnerProfile | undefined {
  return PARTNER_PROFILES.find((p) => p.id === id);
}

export function getPartnersByType(type: PartnerType): PartnerProfile[] {
  return PARTNER_PROFILES.filter((p) => p.type === type);
}

export function getPartnersByRegion(region: PartnerRegion): PartnerProfile[] {
  return PARTNER_PROFILES.filter((p) => p.region === region);
}

export function getPartnersByTier(tier: PartnerTier): PartnerProfile[] {
  return PARTNER_PROFILES.filter((p) => p.tier === tier);
}

export function getActivePartners(): PartnerProfile[] {
  return PARTNER_PROFILES.filter((p) => p.status === "active");
}

export function getPartnerAgreements(partnerId: string): PartnerAgreement[] {
  return PARTNER_AGREEMENTS.filter((a) => a.partnerId === partnerId);
}

export function getAllAgreements(): PartnerAgreement[] {
  return PARTNER_AGREEMENTS;
}

export function getPartnersBySDG(sdg: string): PartnerProfile[] {
  return PARTNER_PROFILES.filter((p) =>
    p.sdgFocus.includes(sdg as PartnerProfile["sdgFocus"][number]),
  );
}

export function searchPartners(query: string): PartnerProfile[] {
  const q = query.toLowerCase();
  return PARTNER_PROFILES.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q),
  );
}

export function getFeaturedPartners(): PartnerProfile[] {
  return PARTNER_PROFILES.filter((p) => p.tier === "platinum");
}
