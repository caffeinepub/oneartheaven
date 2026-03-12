import type {
  AIDecisionLog,
  AuditFinding,
  BudgetLine,
  FFDisclosure,
  OpenContract,
  TransparencyStats,
  VotingRecord,
} from "./transparencyTypes";

// ─── Budget Lines ─────────────────────────────────────────────────────────────

export const BUDGET_LINES: BudgetLine[] = [
  {
    id: "BL-001",
    category: "Programs",
    council: "Climate & Environment",
    allocated: 12500000,
    spent: 9870000,
    fiscalYear: "FY2025",
    finFracFranTag: "Growth",
    description:
      "Global reforestation and carbon capture initiatives across 47 nations.",
  },
  {
    id: "BL-002",
    category: "Technology",
    council: "Technology & AI",
    allocated: 8200000,
    spent: 7100000,
    fiscalYear: "FY2025",
    finFracFranTag: "Scale",
    description:
      "Open-source AI governance tools and decentralized infrastructure.",
  },
  {
    id: "BL-003",
    category: "Operations",
    council: "Governance Reform",
    allocated: 3400000,
    spent: 2100000,
    fiscalYear: "FY2025",
    description:
      "Core operations, secretariat, and multi-lingual communication services.",
  },
  {
    id: "BL-004",
    category: "Outreach",
    council: "Peace & Security",
    allocated: 5600000,
    spent: 5540000,
    fiscalYear: "FY2025",
    finFracFranTag: "Global",
    description:
      "Conflict prevention programs, peace educator training, and mediation networks.",
  },
  {
    id: "BL-005",
    category: "Research",
    council: "Global Health",
    allocated: 9800000,
    spent: 6200000,
    fiscalYear: "FY2025",
    finFracFranTag: "Growth",
    description:
      "Pandemic preparedness research and community health system strengthening.",
  },
  {
    id: "BL-006",
    category: "Emergency Reserve",
    council: "Food & Agriculture",
    allocated: 4000000,
    spent: 1200000,
    fiscalYear: "FY2025",
    description:
      "Emergency food security reserve for climate-induced crop failures.",
  },
];

// ─── Audit Findings ───────────────────────────────────────────────────────────

export const AUDIT_FINDINGS: AuditFinding[] = [
  {
    id: "AF-001",
    title: "Procurement Irregularities in Technology Infrastructure Spend",
    council: "Technology & AI",
    auditor: "Transparency International Unit 7",
    severity: "high",
    status: "in-progress",
    summary:
      "Three vendor contracts totalling $1.2M were awarded without competitive bidding in Q3 FY2024.",
    recommendation:
      "Implement mandatory open-tender process for all contracts >$50K.",
    resolvedCount: 2,
    totalRecommendations: 4,
    dateOpened: "2024-11-15",
    finFracFranDisclosure: "FinFracFran™ Scale license — disclosure filed",
  },
  {
    id: "AF-002",
    title: "Missing Milestone Reports — Climate Initiative BL-001",
    council: "Climate & Environment",
    auditor: "Internal Audit Division",
    severity: "medium",
    status: "resolved",
    summary:
      "Four quarterly milestone reports were not submitted on time for reforestation program.",
    recommendation: "Enforce automated reporting triggers within the platform.",
    resolvedCount: 3,
    totalRecommendations: 3,
    dateOpened: "2024-09-08",
  },
  {
    id: "AF-003",
    title: "Delegate Vote Weight Calculation Error (Q2 FY2025)",
    council: "Governance Reform",
    auditor: "External Audit Board",
    severity: "critical",
    status: "open",
    summary:
      "Weighted voting algorithm miscalculated abstain weights for 3 resolutions, potentially altering outcomes.",
    recommendation:
      "Re-run calculations with corrected weights and publish amendment.",
    resolvedCount: 0,
    totalRecommendations: 2,
    dateOpened: "2025-01-22",
  },
  {
    id: "AF-004",
    title: "FinFracFran™ Disclosure Lag — 7 Entities",
    council: "Economy & Finance",
    auditor: "FinFracFran™ Compliance Office",
    severity: "low",
    status: "closed",
    summary:
      "Seven Seed-tier entities failed to file quarterly disclosures within the 30-day window.",
    recommendation:
      "Issue automated reminders at 14 and 7 days before deadline.",
    resolvedCount: 2,
    totalRecommendations: 2,
    dateOpened: "2024-07-01",
    finFracFranDisclosure: "FinFracFran™ Seed — corrective action completed",
  },
  {
    id: "AF-005",
    title: "Food Security Emergency Reserve Drawdown Protocol Unclear",
    council: "Food & Agriculture",
    auditor: "Internal Audit Division",
    severity: "medium",
    status: "in-progress",
    summary:
      "No clear written protocol exists for accessing the $4M Emergency Reserve without full Council vote.",
    recommendation:
      "Draft and ratify Emergency Drawdown Protocol within 60 days.",
    resolvedCount: 1,
    totalRecommendations: 3,
    dateOpened: "2025-02-14",
  },
];

// ─── Voting Records ───────────────────────────────────────────────────────────

export const VOTING_RECORDS: VotingRecord[] = [
  {
    id: "VR-001",
    resolutionId: "RES-2025-001",
    resolutionTitle: "Global Carbon Neutrality Acceleration Framework",
    delegateName: "Amara Diallo",
    delegateNation: "🇸🇳",
    council: "Climate & Environment",
    vote: "for",
    voteWeight: 1.4,
    date: "2025-01-18",
    rationale:
      "The framework aligns with Charter Article III and Senegal's NDC commitments. Acceleration targets are ambitious but achievable with FinFracFran™ financing mechanisms.",
  },
  {
    id: "VR-002",
    resolutionId: "RES-2025-001",
    resolutionTitle: "Global Carbon Neutrality Acceleration Framework",
    delegateName: "Lars Eriksson",
    delegateNation: "🇸🇪",
    council: "Climate & Environment",
    vote: "for",
    voteWeight: 1.2,
    date: "2025-01-18",
    rationale:
      "Strong scientific consensus supports these targets. Nordic nations committed to lead by example.",
  },
  {
    id: "VR-003",
    resolutionId: "RES-2025-002",
    resolutionTitle: "Universal AI Governance & Ethics Charter Amendment",
    delegateName: "Mei Lin Zhang",
    delegateNation: "🇨🇳",
    council: "Technology & AI",
    vote: "abstain",
    voteWeight: 1.3,
    date: "2025-02-05",
    rationale:
      "Abstaining pending further consultation with regional technology partners. Not opposed in principle but require clarification on sovereignty provisions.",
  },
  {
    id: "VR-004",
    resolutionId: "RES-2025-002",
    resolutionTitle: "Universal AI Governance & Ethics Charter Amendment",
    delegateName: "Dr. Aisha Okonkwo",
    delegateNation: "🇳🇬",
    council: "Technology & AI",
    vote: "for",
    voteWeight: 1.5,
    date: "2025-02-05",
    rationale:
      "Africa cannot be left behind in AI governance standards. This amendment ensures equitable participation.",
  },
  {
    id: "VR-005",
    resolutionId: "RES-2025-003",
    resolutionTitle: "Pandemic Preparedness Global Fund Resolution",
    delegateName: "Dr. Priya Nair",
    delegateNation: "🇮🇳",
    council: "Global Health",
    vote: "for",
    voteWeight: 1.6,
    date: "2025-02-20",
    rationale:
      "India's experience with COVID-19 demonstrated catastrophic cost of under-preparedness. This fund is essential.",
  },
  {
    id: "VR-006",
    resolutionId: "RES-2025-003",
    resolutionTitle: "Pandemic Preparedness Global Fund Resolution",
    delegateName: "Roberto Sánchez",
    delegateNation: "🇲🇽",
    council: "Global Health",
    vote: "against",
    voteWeight: 1.1,
    date: "2025-02-20",
    rationale:
      "Funding mechanism concentrates too much control in northern hemisphere institutions. Requires restructuring before support.",
  },
  {
    id: "VR-007",
    resolutionId: "RES-2025-004",
    resolutionTitle: "Open Education Resources Global Access Mandate",
    delegateName: "Fatima Al-Rashid",
    delegateNation: "🇯🇴",
    council: "Education",
    vote: "for",
    voteWeight: 1.2,
    date: "2025-03-02",
    rationale:
      "Open educational resources directly address knowledge inequality across the Arab world and beyond.",
  },
  {
    id: "VR-008",
    resolutionId: "RES-2025-004",
    resolutionTitle: "Open Education Resources Global Access Mandate",
    delegateName: "James Osei",
    delegateNation: "🇬🇭",
    council: "Education",
    vote: "for",
    voteWeight: 1.3,
    date: "2025-03-02",
    rationale:
      "Ghana's education system has demonstrated 40% improvement with open-resource pilots. Scaling this globally is a moral imperative.",
  },
];

// ─── AI Decision Logs ─────────────────────────────────────────────────────────

export const AI_DECISION_LOGS: AIDecisionLog[] = [
  {
    id: "ADL-001",
    type: "policy-analysis",
    title: "Carbon Framework Unintended Consequences Analysis",
    council: "Climate & Environment",
    confidenceScore: 94,
    charterAlignment: 97,
    overrideFlag: false,
    date: "2025-01-15",
    summary:
      "Analysis identified 3 potential trade disruption risks in Article 7 of the resolution. Recommended mitigation clauses added to final draft.",
    modelVersion: "ONEarth-AI v2.4.1",
  },
  {
    id: "ADL-002",
    type: "risk-assessment",
    title: "AI Ethics Amendment Risk Assessment",
    council: "Technology & AI",
    confidenceScore: 88,
    charterAlignment: 91,
    overrideFlag: true,
    overrideRationale:
      "Delegate consensus overrode AI recommendation to delay vote, citing political window closing.",
    date: "2025-02-03",
    summary:
      "AI flagged insufficient consultation period with developing nations. Delegates voted to proceed with expanded implementation timeline instead.",
    modelVersion: "ONEarth-AI v2.4.1",
  },
  {
    id: "ADL-003",
    type: "charter-review",
    title: "Pandemic Fund Charter Compliance Review",
    council: "Global Health",
    confidenceScore: 96,
    charterAlignment: 88,
    overrideFlag: false,
    date: "2025-02-18",
    summary:
      "Resolution text aligns with Charter Articles II, V, and VII. One ambiguity in Article IV regarding regional autonomy — suggested clarifying language adopted.",
    modelVersion: "ONEarth-AI v2.5.0",
  },
  {
    id: "ADL-004",
    type: "recommendation",
    title: "Education Mandate Implementation Pathway",
    council: "Education",
    confidenceScore: 91,
    charterAlignment: 95,
    overrideFlag: false,
    date: "2025-02-28",
    summary:
      "Recommended phased 3-year rollout with FinFracFran™ Seed licences for low-income nations. Cost savings projected at 34% vs immediate global deployment.",
    modelVersion: "ONEarth-AI v2.5.0",
  },
  {
    id: "ADL-005",
    type: "risk-assessment",
    title: "Food Reserve Emergency Protocol Risk Flags",
    council: "Food & Agriculture",
    confidenceScore: 82,
    charterAlignment: 79,
    overrideFlag: false,
    date: "2025-03-01",
    summary:
      "Flagged 5 scenarios where existing protocol creates bottlenecks in emergency response. Drafting committee notified.",
    modelVersion: "ONEarth-AI v2.5.0",
  },
];

// ─── Open Contracts ───────────────────────────────────────────────────────────

export const OPEN_CONTRACTS = [
  {
    id: "OC-001",
    vendor: "GreenTech Solutions AG",
    council: "Climate & Environment",
    value: 2400000,
    currency: "USD",
    status: "active" as const,
    licenseType: "FinFracFran™ Growth",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    description:
      "Carbon monitoring satellite data processing and reporting infrastructure.",
  },
  {
    id: "OC-002",
    vendor: "OpenAI Commons Foundation",
    council: "Technology & AI",
    value: 1800000,
    currency: "USD",
    status: "active" as const,
    licenseType: "Open Source",
    startDate: "2025-02-15",
    endDate: "2026-02-14",
    description:
      "AI governance tooling development and maintenance for ONEartHeaven platform.",
  },
  {
    id: "OC-003",
    vendor: "MediGlobal Research Consortium",
    council: "Global Health",
    value: 3100000,
    currency: "USD",
    status: "pending" as const,
    licenseType: "FinFracFran™ Scale",
    startDate: "2025-04-01",
    endDate: "2027-03-31",
    description:
      "Pandemic preparedness research network across 18 partner institutions.",
  },
  {
    id: "OC-004",
    vendor: "EduAccess Global Ltd",
    council: "Education",
    value: 920000,
    currency: "USD",
    status: "active" as const,
    licenseType: "FinFracFran™ Seed",
    startDate: "2025-01-15",
    endDate: "2025-07-15",
    description:
      "Open educational resource platform development and multi-lingual content creation.",
  },
  {
    id: "OC-005",
    vendor: "PeaceNet Consulting Group",
    council: "Peace & Security",
    value: 550000,
    currency: "USD",
    status: "completed" as const,
    licenseType: "Standard",
    startDate: "2024-06-01",
    endDate: "2024-12-31",
    description:
      "Conflict early-warning system integration and mediator training program delivery.",
  },
];

// ─── FinFracFran™ Disclosures ─────────────────────────────────────────────────

export const FF_DISCLOSURES: FFDisclosure[] = [
  {
    id: "FFD-001",
    entityName: "GreenTech Solutions AG",
    tier: "Growth",
    revenueShare: "8%",
    adoptingNations: 14,
    complianceScore: 96,
    licenseType: "FinFracFran™ Growth — Standard",
    lastAuditDate: "2025-01-10",
    nextAuditDate: "2025-07-10",
    status: "compliant",
  },
  {
    id: "FFD-002",
    entityName: "EduAccess Global Ltd",
    tier: "Seed",
    revenueShare: "3%",
    adoptingNations: 6,
    complianceScore: 88,
    licenseType: "FinFracFran™ Seed — Learning Edition",
    lastAuditDate: "2024-12-01",
    nextAuditDate: "2025-06-01",
    status: "compliant",
  },
  {
    id: "FFD-003",
    entityName: "MediGlobal Research Consortium",
    tier: "Scale",
    revenueShare: "12%",
    adoptingNations: 28,
    complianceScore: 72,
    licenseType: "FinFracFran™ Scale — Research",
    lastAuditDate: "2025-02-01",
    nextAuditDate: "2025-05-01",
    status: "under-review",
  },
  {
    id: "FFD-004",
    entityName: "PlanetsFund Holdings",
    tier: "Global",
    revenueShare: "18%",
    adoptingNations: 72,
    complianceScore: 98,
    licenseType: "FinFracFran™ Global — Elite",
    lastAuditDate: "2025-03-01",
    nextAuditDate: "2025-09-01",
    status: "compliant",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────

export const TRANSPARENCY_STATS: TransparencyStats = {
  auditsPublished: 23,
  budgetLinesOpen: 6,
  votesLogged: 8,
  aiDecisionsReviewed: 5,
};
