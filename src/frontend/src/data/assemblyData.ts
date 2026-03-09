// ─── Assembly Data Layer ─────────────────────────────────────────────────────
// Phase 2.1 — Global Assembly

export type CouncilId =
  | "climate"
  | "health"
  | "peace"
  | "econ"
  | "edu"
  | "tech"
  | "food"
  | "culture"
  | "general";

export type ProposalStatus =
  | "draft"
  | "deliberating"
  | "voting"
  | "passed"
  | "rejected"
  | "implemented";

export type RegionTag =
  | "africa"
  | "asia_pacific"
  | "europe"
  | "latin_america"
  | "middle_east"
  | "north_america"
  | "global";

export interface Council {
  id: CouncilId;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface VoteTally {
  for: number;
  against: number;
  abstain: number;
  threshold: number;
  quorum: number;
}

export interface DeliberationEntry {
  id: string;
  authorName: string;
  authorRegion: RegionTag;
  authorRole: string;
  content: string;
  timestamp: string;
  upvotes: number;
  sentiment: "supportive" | "critical" | "neutral" | "question";
}

export interface Proposal {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  councilId: CouncilId;
  status: ProposalStatus;
  submittedBy: string;
  submitterRegion: RegionTag;
  submittedDate: string;
  lastUpdated: string;
  regionTags: RegionTag[];
  aiAlignmentScore: number;
  aiAnalysisSummary: string;
  voteTally: VoteTally;
  deliberations: DeliberationEntry[];
  finfracfranApplicable: boolean;
  estimatedImpact: string;
}

export const STATUS_CONFIG: Record<
  ProposalStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  draft: {
    label: "Draft",
    color: "oklch(0.62 0.04 260)",
    bg: "oklch(0.18 0.03 260)",
    border: "oklch(0.28 0.04 260)",
  },
  deliberating: {
    label: "Deliberating",
    color: "oklch(0.72 0.18 85)",
    bg: "oklch(0.72 0.18 85 / 0.12)",
    border: "oklch(0.72 0.18 85 / 0.35)",
  },
  voting: {
    label: "Voting Open",
    color: "oklch(0.55 0.18 200)",
    bg: "oklch(0.55 0.18 200 / 0.12)",
    border: "oklch(0.55 0.18 200 / 0.35)",
  },
  passed: {
    label: "Passed",
    color: "oklch(0.68 0.2 145)",
    bg: "oklch(0.68 0.2 145 / 0.12)",
    border: "oklch(0.68 0.2 145 / 0.35)",
  },
  rejected: {
    label: "Rejected",
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.62 0.22 25 / 0.12)",
    border: "oklch(0.62 0.22 25 / 0.35)",
  },
  implemented: {
    label: "Implemented",
    color: "oklch(0.75 0.16 75)",
    bg: "oklch(0.75 0.16 75 / 0.12)",
    border: "oklch(0.75 0.16 75 / 0.35)",
  },
};

export const REGION_LABELS: Record<RegionTag, string> = {
  africa: "Africa",
  asia_pacific: "Asia-Pacific",
  europe: "Europe",
  latin_america: "Latin America",
  middle_east: "Middle East",
  north_america: "North America",
  global: "Global",
};

export const COUNCILS: Council[] = [
  {
    id: "climate",
    name: "ClimateAction",
    description: "Carbon, renewables, disaster response",
    color: "oklch(0.68 0.2 145)",
    icon: "🌿",
  },
  {
    id: "health",
    name: "HealthForAll",
    description: "Disease, medicine, community health",
    color: "oklch(0.65 0.18 0)",
    icon: "🏥",
  },
  {
    id: "peace",
    name: "PeaceBuilders",
    description: "Conflict prevention, mediation",
    color: "oklch(0.72 0.16 240)",
    icon: "🕊",
  },
  {
    id: "econ",
    name: "EconJustice",
    description: "Fair trade, microfinance, inequality",
    color: "oklch(0.72 0.18 85)",
    icon: "⚖️",
  },
  {
    id: "edu",
    name: "EduVerse",
    description: "Open curriculum, literacy, youth",
    color: "oklch(0.65 0.18 270)",
    icon: "📚",
  },
  {
    id: "tech",
    name: "TechForAll",
    description: "Open source, digital inclusion, AI ethics",
    color: "oklch(0.55 0.18 200)",
    icon: "💡",
  },
  {
    id: "food",
    name: "FoodWater",
    description: "Agriculture, water access, famine prevention",
    color: "oklch(0.7 0.2 55)",
    icon: "🌾",
  },
  {
    id: "culture",
    name: "CultureBridge",
    description: "Arts, language, heritage, exchange",
    color: "oklch(0.65 0.2 320)",
    icon: "🎭",
  },
  {
    id: "general",
    name: "General Assembly",
    description: "Cross-cutting global matters",
    color: "oklch(0.75 0.16 75)",
    icon: "🌍",
  },
];

export const PROPOSALS: Proposal[] = [
  {
    id: "prop-001",
    title: "Global Open-Source Renewable Energy Blueprint Repository",
    summary:
      "Establish a freely accessible, peer-reviewed repository of renewable energy installation blueprints adaptable for communities of 50 to 500,000 people.",
    fullText:
      "## Background\nThe current energy transition is slowed by proprietary barriers. Communities in the Global South cannot afford licensed technology. Meanwhile, proven designs from Chile, Bangladesh, and Denmark sit unused.\n\n## Proposal\nONEartHeaven will establish the Global Open Energy Repository (GOER):\n1. All blueprints licensed under Creative Commons BY-SA\n2. Peer-reviewed by a technical council of engineers and community practitioners\n3. Searchable by community size, climate zone, available materials, and budget\n4. Each blueprint includes a full FinFracFran™ replication kit\n\n## FinFracFran™ Application\nEach blueprint includes fractionalization tiers and franchise modules for local installers.\n\n## Expected Outcomes\n- 10,000+ communities accessing clean energy blueprints within 3 years\n- 40% cost reduction vs proprietary equivalents\n- 2 million tonnes CO2 avoided annually by Year 5",
    councilId: "climate",
    status: "voting",
    submittedBy: "Pacific Climate Warriors",
    submitterRegion: "asia_pacific",
    submittedDate: "2025-11-12",
    lastUpdated: "2026-01-08",
    regionTags: ["africa", "asia_pacific", "latin_america", "global"],
    aiAlignmentScore: 91,
    aiAnalysisSummary:
      "High alignment with Charter Articles 1, 3, and 5. No significant unintended consequences identified. Similar initiatives in Bangladesh and Kenya show 3–5x faster deployment vs proprietary models. Recommend adding a quality assurance standard before vote.",
    voteTally: {
      for: 1842,
      against: 234,
      abstain: 118,
      threshold: 60,
      quorum: 1000,
    },
    deliberations: [
      {
        id: "d-001-1",
        authorName: "Dr. Amara Diallo",
        authorRegion: "africa",
        authorRole: "Council Member, TechForAll",
        content:
          "This fills a critical gap. In Senegal we have seen communities stall for 18 months waiting for licensed designs they cannot afford. A Creative Commons approach accelerates adoption by 3x based on our field data.",
        timestamp: "2025-11-20",
        upvotes: 184,
        sentiment: "supportive",
      },
      {
        id: "d-001-2",
        authorName: "Ibrahim Al-Rashid",
        authorRegion: "middle_east",
        authorRole: "Energy Engineer",
        content:
          "Support the direction. I would add a mandatory safety certification layer — open source does not mean unreviewed. We need a distributed peer-review network to validate blueprints before publication.",
        timestamp: "2025-11-24",
        upvotes: 211,
        sentiment: "supportive",
      },
      {
        id: "d-001-3",
        authorName: "Lena Hofmann",
        authorRegion: "europe",
        authorRole: "IP Law Specialist",
        content:
          "Clarification needed: does BY-SA licensing conflict with national energy infrastructure regulations in signatory nations?",
        timestamp: "2025-12-01",
        upvotes: 97,
        sentiment: "question",
      },
    ],
    finfracfranApplicable: true,
    estimatedImpact:
      "2M+ people with clean energy access, 2M tonnes CO2/year avoided",
  },
  {
    id: "prop-002",
    title: "Universal Community Health Worker Certification Standard",
    summary:
      "Create a globally portable, AI-assisted certification pathway for community health workers recognised across all ONEartHeaven member states — enabling rapid deployment in crisis zones.",
    fullText:
      "## Problem\nDuring health crises, trained community health workers (CHWs) were blocked from serving across borders due to incompatible national certification systems.\n\n## Proposal\nEstablish the ONEartHeaven CHW Universal Standard:\n1. A modular competency framework (core + specialisation tracks)\n2. AI-assisted assessment available in 40+ languages\n3. Blockchain-anchored credentials on ICP — portable, tamper-proof\n4. Member nations agree to reciprocal recognition within 90 days",
    councilId: "health",
    status: "deliberating",
    submittedBy: "Doctors Without Borders",
    submitterRegion: "global",
    submittedDate: "2025-12-03",
    lastUpdated: "2026-01-15",
    regionTags: ["africa", "asia_pacific", "middle_east", "global"],
    aiAlignmentScore: 88,
    aiAnalysisSummary:
      "Strong alignment with Charter Articles 2 and 4. Historical precedent: WHO Basic Emergency Care framework achieved 60-country adoption in 4 years using similar modular approach. Main risk: political resistance from national medical boards.",
    voteTally: {
      for: 923,
      against: 145,
      abstain: 88,
      threshold: 65,
      quorum: 800,
    },
    deliberations: [
      {
        id: "d-002-1",
        authorName: "Dr. Maria Santos",
        authorRegion: "latin_america",
        authorRole: "Public Health Director, Medellín",
        content:
          "Medellín has 1,400 CHWs who could serve across Colombia and Venezuela immediately with this standard. The ICP credential anchoring is exactly right.",
        timestamp: "2025-12-10",
        upvotes: 156,
        sentiment: "supportive",
      },
      {
        id: "d-002-2",
        authorName: "Yuki Tanaka",
        authorRegion: "asia_pacific",
        authorRole: "Health Policy Researcher",
        content:
          "Caution on the 90-day recognition clause. Japan and South Korea have strong domestic health worker associations that will push back. Suggest making initial recognition optional with an 18-month ratification window.",
        timestamp: "2025-12-18",
        upvotes: 102,
        sentiment: "critical",
      },
    ],
    finfracfranApplicable: true,
    estimatedImpact:
      "500,000+ CHWs with portable credentials, 30% faster crisis deployment",
  },
  {
    id: "prop-003",
    title: "FinFracFran™ Municipal Cooperative Housing Protocol",
    summary:
      "Replicate the Mondragon housing cooperative model using FinFracFran™ fractionalization — enabling any city to launch an affordable cooperative housing programme with minimum capital.",
    fullText:
      "## Context\nThe housing affordability crisis is a global failure. FinFracFran™ allows the Mondragon model to be fractionalised across smaller communities and franchised to city governments.\n\n## Protocol Components\n1. Fractional Ownership Module: 12 tiers from micro-investor (100 ICP) to anchor institution\n2. City Franchise Agreement: Standard legal template adapted to 45 jurisdictions\n3. AI Development Advisor: Scans local zoning, assesses feasibility\n4. FinFracFran™ Scaling Engine: Next city deploys in 60 days\n\n## Current Status\nPassed pilot assessment in 12 cities including Amsterdam, Medellín, Nairobi, Colombo.",
    councilId: "econ",
    status: "passed",
    submittedBy: "Mondragon Corporation",
    submitterRegion: "europe",
    submittedDate: "2025-09-15",
    lastUpdated: "2025-12-20",
    regionTags: ["europe", "africa", "latin_america", "asia_pacific", "global"],
    aiAlignmentScore: 94,
    aiAnalysisSummary:
      "Highest FinFracFran™ alignment score to date. Charter Article 5 fully satisfied. 12-city pilot data is robust. Recommendation: include ICP-denominated unit of account option alongside local currency.",
    voteTally: {
      for: 2841,
      against: 312,
      abstain: 201,
      threshold: 60,
      quorum: 1500,
    },
    deliberations: [
      {
        id: "d-003-1",
        authorName: "Arjun Patel",
        authorRegion: "asia_pacific",
        authorRole: "Urban Planning, Colombo Pilot",
        content:
          "Colombo pilot outcome: 340 families housed in 14 months. Cost per unit 38% below private market. Strongly endorse full passage.",
        timestamp: "2025-11-05",
        upvotes: 388,
        sentiment: "supportive",
      },
    ],
    finfracfranApplicable: true,
    estimatedImpact: "50,000 affordable housing units in 12 cities by Year 3",
  },
  {
    id: "prop-004",
    title: "ONEartHeaven AI Ethics & Governance Charter Addendum",
    summary:
      "Amend the Founding Charter with an AI Ethics Addendum establishing binding principles for how AI systems operate — with transparency, non-bias, and human override requirements.",
    fullText:
      "## Rationale\nThe ONEartHeaven platform deploys AI in high-stakes governance contexts. Without a binding AI ethics framework, we risk replicating algorithmic harms.\n\n## Proposed Addendum (Article 7)\n- Transparency: All AI decisions must be explainable in plain language\n- Non-bias audit: Quarterly bias audits by an independent regional panel\n- Human override: Any AI recommendation can be overridden by 20% member petition\n- Open weights: Core AI models must have publicly inspectable architectures\n- Data sovereignty: No member data used to train AI without explicit consent",
    councilId: "tech",
    status: "draft",
    submittedBy: "Dr. Amara Diallo",
    submitterRegion: "africa",
    submittedDate: "2026-01-20",
    lastUpdated: "2026-02-01",
    regionTags: ["global"],
    aiAlignmentScore: 82,
    aiAnalysisSummary:
      "This proposal was partially analysed by the AI Policy Advisor — appropriate given its subject. Aligns with Charter Article 3 and is consistent with EU AI Act and UNESCO AI Recommendation. Legal review recommended for the 'open weights' clause.",
    voteTally: { for: 0, against: 0, abstain: 0, threshold: 70, quorum: 2000 },
    deliberations: [
      {
        id: "d-004-1",
        authorName: "Sofia Chen",
        authorRegion: "asia_pacific",
        authorRole: "AI Safety Researcher",
        content:
          "This is necessary. I have reviewed 40+ governance AI deployments and the ones without binding ethics frameworks all drifted toward serving the most powerful voices.",
        timestamp: "2026-01-25",
        upvotes: 245,
        sentiment: "supportive",
      },
      {
        id: "d-004-2",
        authorName: "Thomas Eriksen",
        authorRegion: "europe",
        authorRole: "Technology Policy, Nordic Council",
        content:
          "The open weights clause needs refinement. 'Publicly inspectable architecture' is ambiguous. Recommend specifying mandatory model cards and audit trails instead.",
        timestamp: "2026-01-28",
        upvotes: 178,
        sentiment: "critical",
      },
    ],
    finfracfranApplicable: false,
    estimatedImpact:
      "Binding AI governance framework for all ONEartHeaven AI deployments",
  },
  {
    id: "prop-005",
    title: "Pacific Islands Climate Emergency Compact",
    summary:
      "Establish an emergency protocol giving Pacific Island nations priority access to the ONEartHeaven Climate Fund with fast-tracked relocation assistance and binding loss-and-damage commitments.",
    fullText:
      "## Urgency\nKiribati, Tuvalu, Marshall Islands and 9 other Pacific nations face existential threat within 30 years. Existing UN mechanisms are too slow.\n\n## Compact Terms\n1. Climate Fund Priority Tier: Pacific Island nations receive Tier 1 access — funds released within 72 hours of declared emergency\n2. Relocation Protocol: Pre-negotiated bilateral agreements with 8 member nations, full citizenship pathway\n3. Loss and Damage Formula: High-emission members contribute 0.1% of annual revenue\n4. Traditional Knowledge Protection: Pacific traditional knowledge attributed and compensated\n\n## FinFracFran™ Application\nFranchising the relocation protocol to other climate-vulnerable regions using the Pacific model as the tested template.",
    councilId: "climate",
    status: "deliberating",
    submittedBy: "Pacific Climate Warriors",
    submitterRegion: "asia_pacific",
    submittedDate: "2026-01-05",
    lastUpdated: "2026-02-10",
    regionTags: ["asia_pacific", "global"],
    aiAlignmentScore: 96,
    aiAnalysisSummary:
      "Highest urgency score in current Assembly cycle. Full alignment with Charter Articles 1, 3, and 4. The 0.1% revenue contribution formula is modelled on successful precedents. Main deliberation needed: definition of 'annual revenue' for cooperative and NGO members.",
    voteTally: {
      for: 1205,
      against: 88,
      abstain: 142,
      threshold: 65,
      quorum: 1200,
    },
    deliberations: [
      {
        id: "d-005-1",
        authorName: "Sione Tuilagi",
        authorRegion: "asia_pacific",
        authorRole: "Pacific Climate Warriors",
        content:
          "My island will be underwater. This is not a policy debate for us — it is survival. We ask every member to vote their conscience, not their politics.",
        timestamp: "2026-01-12",
        upvotes: 1042,
        sentiment: "supportive",
      },
      {
        id: "d-005-2",
        authorName: "Priya Nair",
        authorRegion: "asia_pacific",
        authorRole: "International Law, NUS",
        content:
          "The relocation protocol is groundbreaking. Legal counsel from 6 receiving nations confirms it is workable. I am drafting model bilateral agreement language.",
        timestamp: "2026-01-19",
        upvotes: 534,
        sentiment: "supportive",
      },
      {
        id: "d-005-3",
        authorName: "Carlos Mendoza",
        authorRegion: "latin_america",
        authorRole: "Economic Policy Advisor",
        content:
          "How does the 0.1% revenue formula treat cooperative members whose revenue fluctuates significantly? Suggest a 3-year rolling average.",
        timestamp: "2026-01-26",
        upvotes: 267,
        sentiment: "question",
      },
    ],
    finfracfranApplicable: true,
    estimatedImpact:
      "2M climate-displaced persons with legal relocation pathway, $4B+ Loss & Damage fund",
  },
];

export interface AssemblyStats {
  totalProposals: number;
  activeVotes: number;
  deliberating: number;
  passed: number;
  members: number;
  countries: number;
}

export function getAssemblyStats(): AssemblyStats {
  return {
    totalProposals: PROPOSALS.length,
    activeVotes: PROPOSALS.filter((p) => p.status === "voting").length,
    deliberating: PROPOSALS.filter((p) => p.status === "deliberating").length,
    passed: PROPOSALS.filter(
      (p) => p.status === "passed" || p.status === "implemented",
    ).length,
    members: 12847,
    countries: 94,
  };
}

export function getCouncil(id: CouncilId): Council | undefined {
  return COUNCILS.find((c) => c.id === id);
}

export function getProposalsByStatus(status: ProposalStatus): Proposal[] {
  return PROPOSALS.filter((p) => p.status === status);
}

export function getVotePercentages(tally: VoteTally) {
  const total = tally.for + tally.against + tally.abstain;
  if (total === 0) return { for: 0, against: 0, abstain: 0, total: 0 };
  return {
    for: Math.round((tally.for / total) * 100),
    against: Math.round((tally.against / total) * 100),
    abstain: Math.round((tally.abstain / total) * 100),
    total,
  };
}
