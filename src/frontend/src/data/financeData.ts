import type {
  EnterpriseProfile,
  FinanceStats,
  FranchiseOpportunity,
  FranchiseTier,
  FundraisingCampaign,
  InvestmentRound,
  WalletRecord,
} from "./financeTypes";

export const FRANCHISE_OPPORTUNITIES: FranchiseOpportunity[] = [
  {
    id: "FIN-FR-001",
    name: "ClimateAction Franchise Network",
    tier: "Growth",
    category: "Climate",
    description:
      "Decentralized franchise network deploying renewable energy microgrids, carbon monitoring, and climate adaptation toolkits across 74 nations.",
    nations: 74,
    revenueShare: 12,
    minInvestment: 50000,
    currency: "USD",
    licenseType: "Territorial License",
    status: "Active",
    adoptionCount: 148,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-002",
    name: "HealthForAll Cooperative Franchise",
    tier: "Scale",
    category: "Health",
    description:
      "Community health worker certification and cooperative franchise model providing primary healthcare access across 89 nations.",
    nations: 89,
    revenueShare: 15,
    minInvestment: 75000,
    currency: "USD",
    licenseType: "Cooperative License",
    status: "Active",
    adoptionCount: 267,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-003",
    name: "EduVerse Learning Centers",
    tier: "Growth",
    category: "Education",
    description:
      "Open curriculum franchise for community learning centers, digital literacy hubs, and vocational training programs in 82 nations.",
    nations: 82,
    revenueShare: 10,
    minInvestment: 30000,
    currency: "USD",
    licenseType: "Regional License",
    status: "Active",
    adoptionCount: 312,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-004",
    name: "PeaceBuilders Regional Hubs",
    tier: "Seed",
    category: "Peace",
    description:
      "Conflict early warning and mediation franchise supporting local peace architecture across 52 nations.",
    nations: 52,
    revenueShare: 8,
    minInvestment: 15000,
    currency: "USD",
    licenseType: "Community License",
    status: "Active",
    adoptionCount: 89,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-005",
    name: "FoodWater Distribution Networks",
    tier: "Scale",
    category: "Food",
    description:
      "Regenerative agriculture and clean water distribution franchise model operating across 71 nations with certified local operators.",
    nations: 71,
    revenueShare: 14,
    minInvestment: 60000,
    currency: "USD",
    licenseType: "Distribution License",
    status: "Active",
    adoptionCount: 198,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-006",
    name: "TechForAll Innovation Labs",
    tier: "Growth",
    category: "Technology",
    description:
      "AI governance toolkit and open-source innovation lab franchise serving 68 nations with digital infrastructure support.",
    nations: 68,
    revenueShare: 11,
    minInvestment: 40000,
    currency: "USD",
    licenseType: "Innovation License",
    status: "Active",
    adoptionCount: 156,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-007",
    name: "EconJustice Microfinance Nodes",
    tier: "Seed",
    category: "Economy",
    description:
      "Community microfinance and cooperative economic franchise providing capital access to underserved communities in 61 nations.",
    nations: 61,
    revenueShare: 9,
    minInvestment: 20000,
    currency: "USD",
    licenseType: "Community License",
    status: "Active",
    adoptionCount: 134,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-008",
    name: "CultureBridge Media Franchise",
    tier: "Seed",
    category: "Culture",
    description:
      "Endangered language preservation and cross-cultural media franchise operating community radio, film, and archive networks in 58 nations.",
    nations: 58,
    revenueShare: 7,
    minInvestment: 10000,
    currency: "USD",
    licenseType: "Media License",
    status: "Active",
    adoptionCount: 97,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-009",
    name: "Global Assembly Coordination Hubs",
    tier: "Global",
    category: "Assembly",
    description:
      "Premier global franchise for participatory governance coordination, linking 194 nations through decentralized assembly infrastructure.",
    nations: 194,
    revenueShare: 18,
    minInvestment: 150000,
    currency: "USD",
    licenseType: "Global License",
    status: "Active",
    adoptionCount: 42,
    finfracfranBadge: true,
  },
  {
    id: "FIN-FR-010",
    name: "GreenTech Renewable Energy Franchise",
    tier: "Global",
    category: "Climate",
    description:
      "Enterprise-grade renewable energy infrastructure franchise with sovereign-level partnerships across 74 nations.",
    nations: 74,
    revenueShare: 20,
    minInvestment: 200000,
    currency: "USD",
    licenseType: "Enterprise License",
    status: "Active",
    adoptionCount: 28,
    finfracfranBadge: true,
  },
];

export const FUNDRAISING_CAMPAIGNS: FundraisingCampaign[] = [
  {
    id: "FIN-CAM-001",
    title: "Community Solar Microgrid Fund",
    category: "Climate",
    description:
      "Funding deployment of solar microgrids in 12 off-grid communities across East Africa and Southeast Asia.",
    goalAmount: 500000,
    raisedAmount: 387000,
    currency: "USD",
    status: "Active",
    backers: 342,
    endDate: "2026-06-30",
    council: "ClimateAction",
    finfracfranTier: "Growth",
  },
  {
    id: "FIN-CAM-002",
    title: "Global Health Worker Training",
    category: "Health",
    description:
      "Certifying 2,000 community health workers in 18 nations through the HealthForAll cooperative training network.",
    goalAmount: 250000,
    raisedAmount: 250000,
    currency: "USD",
    status: "Goal Met",
    backers: 891,
    endDate: "2025-12-31",
    council: "HealthForAll",
    finfracfranTier: "Scale",
  },
  {
    id: "FIN-CAM-003",
    title: "Open Curriculum Commons",
    category: "Education",
    description:
      "Building an open-access curriculum commons for 14 nations, covering digital literacy, civic education, and vocational skills.",
    goalAmount: 180000,
    raisedAmount: 142000,
    currency: "USD",
    status: "Active",
    backers: 567,
    endDate: "2026-03-31",
    council: "EduVerse",
    finfracfranTier: "Growth",
  },
  {
    id: "FIN-CAM-004",
    title: "Peace Early Warning Network",
    category: "Peace",
    description:
      "Establishing a 24/7 conflict early warning network across 8 high-risk zones with community monitors and AI analysis.",
    goalAmount: 120000,
    raisedAmount: 45000,
    currency: "USD",
    status: "Open",
    backers: 213,
    endDate: "2026-09-30",
    council: "PeaceBuilders",
    finfracfranTier: "Seed",
  },
  {
    id: "FIN-CAM-005",
    title: "Regenerative Agriculture Fund",
    category: "Food",
    description:
      "Scaling regenerative agroforestry kits to 9,000 smallholder farmers across Sub-Saharan Africa and South Asia.",
    goalAmount: 300000,
    raisedAmount: 300000,
    currency: "USD",
    status: "Goal Met",
    backers: 721,
    endDate: "2025-11-30",
    council: "FoodWater",
    finfracfranTier: "Scale",
  },
  {
    id: "FIN-CAM-006",
    title: "AI Governance Toolkit",
    category: "Technology",
    description:
      "Developing and distributing open-source AI governance frameworks to 9 nations, with certification programs for local implementers.",
    goalAmount: 200000,
    raisedAmount: 89000,
    currency: "USD",
    status: "Open",
    backers: 334,
    endDate: "2026-07-31",
    council: "TechForAll",
    finfracfranTier: "Growth",
  },
  {
    id: "FIN-CAM-007",
    title: "Cultural Heritage Preservation",
    category: "Culture",
    description:
      "Digitizing and preserving cultural archives for 12 endangered languages with community-led media production grants.",
    goalAmount: 80000,
    raisedAmount: 80000,
    currency: "USD",
    status: "Goal Met",
    backers: 445,
    endDate: "2025-10-31",
    council: "CultureBridge",
    finfracfranTier: "Seed",
  },
  {
    id: "FIN-CAM-008",
    title: "Participatory Budget Platform",
    category: "Economy",
    description:
      "Launching participatory municipal budget platforms in 14 cities across 6 nations, empowering citizens to direct public spending.",
    goalAmount: 150000,
    raisedAmount: 62000,
    currency: "USD",
    status: "Open",
    backers: 189,
    endDate: "2026-05-31",
    council: "EconJustice",
    finfracfranTier: "Seed",
  },
];

export const ENTERPRISE_PROFILES: EnterpriseProfile[] = [
  {
    id: "FIN-ENT-001",
    name: "GreenTech Solutions AG",
    model: "Hybrid",
    category: "Climate",
    description:
      "Hybrid enterprise combining corporate efficiency with cooperative values, delivering renewable energy solutions across 74 nations.",
    nations: 74,
    revenue: 2400000,
    currency: "USD",
    members: 340,
    finfracfranTier: "Scale",
    certifications: [
      "ISO 14001",
      "FinFracFran™ Scale Certified",
      "B Corp Equivalent",
    ],
  },
  {
    id: "FIN-ENT-002",
    name: "EduAccess Global Cooperative",
    model: "Cooperative",
    category: "Education",
    description:
      "Worker-owned cooperative delivering open educational resources and digital literacy programs across 82 nations.",
    nations: 82,
    revenue: 1800000,
    currency: "USD",
    members: 520,
    finfracfranTier: "Growth",
    certifications: [
      "ICA Cooperative Principles",
      "FinFracFran™ Growth",
      "UN SDG Aligned",
    ],
  },
  {
    id: "FIN-ENT-003",
    name: "MediGlobal Research DAO",
    model: "DAO",
    category: "Health",
    description:
      "Decentralized autonomous organization coordinating global health research, funding, and deployment across 89 nations.",
    nations: 89,
    revenue: 3100000,
    currency: "USD",
    members: 180,
    finfracfranTier: "Global",
    certifications: [
      "ICP DAO Verified",
      "FinFracFran™ Global",
      "WHO Partnership",
    ],
  },
  {
    id: "FIN-ENT-004",
    name: "PlanetsFund Holdings",
    model: "Foundation",
    category: "Assembly",
    description:
      "Philanthropic foundation channeling capital to ONEartHeaven™ initiatives across all 194 member nations.",
    nations: 194,
    revenue: 5200000,
    currency: "USD",
    members: 60,
    finfracfranTier: "Global",
    certifications: [
      "FATF Compliant",
      "FinFracFran™ Global",
      "Impact Verified",
    ],
  },
  {
    id: "FIN-ENT-005",
    name: "PeaceNet Social Enterprise",
    model: "Social Enterprise",
    category: "Peace",
    description:
      "Social enterprise delivering conflict resolution training, mediation services, and peace infrastructure in 52 nations.",
    nations: 52,
    revenue: 900000,
    currency: "USD",
    members: 290,
    finfracfranTier: "Seed",
    certifications: [
      "UN DPO Partner",
      "FinFracFran™ Seed",
      "Social Value Certified",
    ],
  },
  {
    id: "FIN-ENT-006",
    name: "FoodChain Cooperative",
    model: "Cooperative",
    category: "Food",
    description:
      "Agricultural cooperative connecting smallholder farmers to global markets through regenerative supply chains in 71 nations.",
    nations: 71,
    revenue: 1500000,
    currency: "USD",
    members: 410,
    finfracfranTier: "Growth",
    certifications: [
      "Fairtrade Aligned",
      "FinFracFran™ Growth",
      "Regenerative Certified",
    ],
  },
];

export const INVESTMENT_ROUNDS: InvestmentRound[] = [
  {
    id: "FIN-INV-001",
    title: "Climate Infrastructure Bond",
    type: "Impact Bond",
    category: "Climate",
    description:
      "Social impact bond financing renewable energy infrastructure across 12 climate-vulnerable nations with guaranteed return.",
    targetAmount: 1000000,
    raisedAmount: 720000,
    currency: "USD",
    status: "Open",
    minTicket: 5000,
    returns: "6–8% annual return",
    council: "ClimateAction",
    finfracfranRequired: true,
  },
  {
    id: "FIN-INV-002",
    title: "Health Equity Grant Round 3",
    type: "Grant",
    category: "Health",
    description:
      "Non-dilutive grant funding for community health worker programs, medical supply chains, and rural clinic infrastructure.",
    targetAmount: 500000,
    raisedAmount: 500000,
    currency: "USD",
    status: "Closed",
    minTicket: 0,
    returns: "Non-dilutive grant",
    council: "HealthForAll",
    finfracfranRequired: false,
  },
  {
    id: "FIN-INV-003",
    title: "EduTech Equity Round",
    type: "Equity",
    category: "Education",
    description:
      "Series A equity round for EduAccess Global Cooperative, funding platform expansion and content localization in 20 new nations.",
    targetAmount: 750000,
    raisedAmount: 320000,
    currency: "USD",
    status: "Open",
    minTicket: 10000,
    returns: "15–25% equity stake",
    council: "EduVerse",
    finfracfranRequired: true,
  },
  {
    id: "FIN-INV-004",
    title: "FinFracFran™ Revenue Share Pool",
    type: "Revenue Share",
    category: "Assembly",
    description:
      "Pooled revenue share investment across all FinFracFran™ franchise tiers, distributing returns from global franchise network royalties.",
    targetAmount: 2000000,
    raisedAmount: 1400000,
    currency: "USD",
    status: "Open",
    minTicket: 2500,
    returns: "8–12% revenue share",
    council: "Global Assembly",
    finfracfranRequired: true,
  },
  {
    id: "FIN-INV-005",
    title: "Community Bond Series A",
    type: "Community Bond",
    category: "Economy",
    description:
      "Fixed-return community bond financing local economic development and microfinance node expansion in 61 nations.",
    targetAmount: 300000,
    raisedAmount: 180000,
    currency: "USD",
    status: "Open",
    minTicket: 1000,
    returns: "5% fixed return",
    council: "EconJustice",
    finfracfranRequired: false,
  },
  {
    id: "FIN-INV-006",
    title: "AgriTech Convertible Note",
    type: "Convertible",
    category: "Food",
    description:
      "Convertible note financing AgriTech innovation in regenerative farming, converting to equity at next institutional round.",
    targetAmount: 400000,
    raisedAmount: 0,
    currency: "USD",
    status: "Coming Soon",
    minTicket: 25000,
    returns: "Converts at next equity round",
    council: "FoodWater",
    finfracfranRequired: false,
  },
];

export const WALLET_RECORDS: WalletRecord[] = [
  {
    id: "FIN-WAL-001",
    name: "DAO Treasury",
    type: "DAO Treasury",
    balance: 4200000,
    currency: "USD",
    address: "oearth-dao-treasury-001",
    status: "Active",
    lastTransaction: "2026-03-10",
  },
  {
    id: "FIN-WAL-002",
    name: "Operations Multi-Sig",
    type: "Multi-Sig",
    balance: 890000,
    currency: "USD",
    address: "oearth-multisig-ops-002",
    status: "Active",
    lastTransaction: "2026-03-11",
  },
  {
    id: "FIN-WAL-003",
    name: "Custodial Reserve",
    type: "Custodial",
    balance: 1500000,
    currency: "USD",
    address: "oearth-custodial-reserve-003",
    status: "Active",
    lastTransaction: "2026-03-09",
  },
  {
    id: "FIN-WAL-004",
    name: "Community Non-Custodial",
    type: "Non-Custodial",
    balance: 320000,
    currency: "USD",
    address: "oearth-community-nc-004",
    status: "Active",
    lastTransaction: "2026-03-12",
  },
];

export const financeStats: FinanceStats = {
  totalFranchises: 10,
  activeCampaigns: 4,
  totalRaised: 1355000,
  nationsReached: 194,
  enterpriseProfiles: 6,
  openInvestmentRounds: 4,
};

// Helper functions
export const getAllFranchises = (): FranchiseOpportunity[] =>
  FRANCHISE_OPPORTUNITIES;

export const getFranchise = (id: string): FranchiseOpportunity | undefined =>
  FRANCHISE_OPPORTUNITIES.find((f) => f.id === id);

export const getFranchisesByTier = (
  tier: FranchiseTier,
): FranchiseOpportunity[] =>
  FRANCHISE_OPPORTUNITIES.filter((f) => f.tier === tier);

export const getAllCampaigns = (): FundraisingCampaign[] =>
  FUNDRAISING_CAMPAIGNS;

export const getOpenCampaigns = (): FundraisingCampaign[] =>
  FUNDRAISING_CAMPAIGNS.filter(
    (c) => c.status === "Open" || c.status === "Active",
  );

export const getEnterprises = (): EnterpriseProfile[] => ENTERPRISE_PROFILES;

export const getOpenInvestmentRounds = (): InvestmentRound[] =>
  INVESTMENT_ROUNDS.filter((r) => r.status === "Open");

export const getWallets = (): WalletRecord[] => WALLET_RECORDS;

export const getFinanceStats = (): FinanceStats => financeStats;
