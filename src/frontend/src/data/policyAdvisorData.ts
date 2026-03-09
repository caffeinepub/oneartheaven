import type { PolicyAnalysis } from "./policyAdvisorTypes";

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const POLICY_ANALYSES: PolicyAnalysis[] = [
  {
    id: "analysis-001",
    proposalId: "OEH-2025-001",
    proposalTitle: "Global Open-Source Renewable Energy Blueprints",
    councilId: "climate",
    councilName: "ClimateAction Hub",
    councilColor: "oklch(0.68 0.2 145)",
    analyzedAt: "2025-03-01T09:00:00Z",
    analyzerVersion: "ONEartHeaven AI v2.1",
    recommendation: "approve",
    alignmentScore: 92,
    charterAlignment: {
      overall: 92,
      articles: [
        {
          articleId: "art-1",
          articleTitle: "Preamble & Purpose",
          score: 96,
          notes:
            "Directly embodies the mission of open access to life-improving technologies.",
        },
        {
          articleId: "art-2",
          articleTitle: "Membership & Participation",
          score: 90,
          notes:
            "Open-source model ensures universal participation regardless of economic status.",
        },
        {
          articleId: "art-3",
          articleTitle: "Governance Structure",
          score: 88,
          notes:
            "Decentralized blueprint repository aligns with non-hierarchical governance principles.",
        },
        {
          articleId: "art-4",
          articleTitle: "Transparency & Accountability",
          score: 98,
          notes:
            "Full open-source licensing mandates complete technical transparency.",
        },
        {
          articleId: "art-5",
          articleTitle: "FinFracFran Economy",
          score: 94,
          notes:
            "Blueprint franchising model is a textbook FinFracFran™ application.",
        },
        {
          articleId: "art-6",
          articleTitle: "Youth & Future Generations",
          score: 86,
          notes:
            "Long-term climate benefits directly serve future generations.",
        },
      ],
    },
    recommendationRationale:
      "This proposal achieves exceptionally high Charter alignment and addresses a critical global infrastructure gap. Open-source renewable energy blueprints would remove cost and patent barriers that currently prevent developing nations from accelerating their energy transition. The proposal's decentralized distribution model mirrors ONEartHeaven's own structural principles. Minor conditions around quality assurance and localization standards are recommended before full adoption.",
    riskFlags: [
      {
        id: "rf-001-1",
        title: "Technology Obsolescence Risk",
        category: "Technical",
        severity: "low",
        description:
          "Blueprints may become outdated as renewable technology advances rapidly.",
        mitigation:
          "Establish a quarterly review cycle with a dedicated technology update committee.",
      },
      {
        id: "rf-001-2",
        title: "IP Conflict with Existing Patents",
        category: "Legal",
        severity: "medium",
        description:
          "Some blueprint elements may overlap with existing proprietary patents in specific jurisdictions.",
        mitigation:
          "Conduct a patent landscape analysis; engage legal working group to design around or license conflicting IP.",
      },
    ],
    unintendedConsequences: [
      {
        id: "uc-001-1",
        title: "Market disruption for local manufacturers",
        likelihood: "medium",
        impact: "moderate",
        affectedRegions: ["South Asia", "Sub-Saharan Africa"],
        preventionNote:
          "Include a local adaptation protocol that encourages regional manufacturers to participate as implementation partners rather than competitors.",
      },
    ],
    precedents: [
      {
        id: "prec-001-1",
        title: "OpenStreetMap Global Rollout",
        year: 2004,
        organization: "OpenStreetMap Foundation",
        outcome: "success",
        relevanceScore: 82,
        keyLessons: [
          "Community-maintained accuracy outperformed proprietary alternatives",
          "Local chapter model enabled rapid regional adoption",
          "Clear versioning prevents fragmentation",
        ],
        region: "Global",
      },
      {
        id: "prec-001-2",
        title: "CERN Open Hardware License Initiative",
        year: 2011,
        organization: "CERN",
        outcome: "success",
        relevanceScore: 91,
        keyLessons: [
          "Scientific hardware designs can be effectively open-sourced",
          "Certification systems build trust in open designs",
          "Modular design enables local adaptation",
        ],
        region: "Europe / Global",
      },
    ],
    finFracFran: {
      applicable: true,
      franchisabilityScore: 88,
      recommendedModel: "Regional Franchise Hubs with Local Adaptation Rights",
      fractionalizationOpportunities: [
        "Component-level blueprint licensing for specialized manufacturers",
        "Micro-installation packages for rural communities",
        "Training curriculum fractional licensing for technical schools",
      ],
      pilotRecommendation:
        "Launch in 3 regions: Sahel Africa, Pacific Islands, Central Asia — each with a FinFracFran™ hub managing local blueprint repositories.",
      adoptionBarriers: [
        "Local technical capacity gaps",
        "Grid integration regulatory complexity",
      ],
    },
    keyStrengths: [
      "Removes patent and cost barriers for developing nations",
      "Fully decentralized — no single point of control",
      "Directly aligned with Charter Article 4 on transparency",
      "FinFracFran™-ready architecture from inception",
    ],
    keyWeaknesses: [
      "Quality assurance framework not yet specified",
      "Lacks explicit mechanism for patent conflict resolution",
    ],
    suggestedAmendments: [
      "Add mandatory quality certification protocol before blueprint publication",
      "Include a patent conflict resolution clause referencing ONEartHeaven Legal Working Group",
      "Specify minimum localization requirements for regional adaptations",
    ],
    impactScope: "Global — 140+ nations",
    estimatedCost: "$12M initial repository + $2M/year maintenance",
    timeToImplement: "18–24 months to full deployment",
    sdgTags: ["SDG 7", "SDG 13", "SDG 17"],
  },
  {
    id: "analysis-002",
    proposalId: "OEH-2025-002",
    proposalTitle: "Universal Community Health Worker Certification Standard",
    councilId: "health",
    councilName: "HealthForAll",
    councilColor: "oklch(0.68 0.18 185)",
    analyzedAt: "2025-02-20T14:30:00Z",
    analyzerVersion: "ONEartHeaven AI v2.1",
    recommendation: "approve_with_conditions",
    alignmentScore: 87,
    charterAlignment: {
      overall: 87,
      articles: [
        {
          articleId: "art-1",
          articleTitle: "Preamble & Purpose",
          score: 94,
          notes: "Universal health access is a core Charter mandate.",
        },
        {
          articleId: "art-2",
          articleTitle: "Membership & Participation",
          score: 88,
          notes:
            "Open certification pathway allows participation from all member nations.",
        },
        {
          articleId: "art-3",
          articleTitle: "Governance Structure",
          score: 82,
          notes: "Certification body governance structure needs clarification.",
        },
        {
          articleId: "art-4",
          articleTitle: "Transparency & Accountability",
          score: 90,
          notes:
            "Public certification registry proposed — strong transparency.",
        },
        {
          articleId: "art-5",
          articleTitle: "FinFracFran Economy",
          score: 84,
          notes: "Training program franchising is viable and encouraged.",
        },
        {
          articleId: "art-6",
          articleTitle: "Youth & Future Generations",
          score: 80,
          notes:
            "Youth health worker pathways could be more explicitly included.",
        },
      ],
    },
    recommendationRationale:
      "The CHW Certification Standard addresses a critical gap in global health infrastructure. The proposal is strong but requires clearer governance for the certification body to avoid centralization of standards-setting power. Additionally, the cost structure for low-income nations needs explicit subsidy provisions before approval.",
    riskFlags: [
      {
        id: "rf-002-1",
        title: "Certification Body Centralization",
        category: "Governance",
        severity: "high",
        description:
          "The proposed single global certification authority risks becoming a new centralized power center contrary to Charter principles.",
        mitigation:
          "Replace with a distributed regional certification network with mutual recognition agreements.",
      },
      {
        id: "rf-002-2",
        title: "Cost Exclusion Risk",
        category: "Equity",
        severity: "medium",
        description:
          "Certification fees may exclude practitioners from low-income nations.",
        mitigation:
          "Introduce a tiered fee structure based on national GDP per capita with full waivers for least-developed nations.",
      },
    ],
    unintendedConsequences: [
      {
        id: "uc-002-1",
        title: "De-legitimization of existing local health systems",
        likelihood: "medium",
        impact: "significant",
        affectedRegions: ["Sub-Saharan Africa", "Pacific Islands"],
        preventionNote:
          "Include a legacy recognition pathway for experienced community health workers who pre-date the certification standard.",
      },
    ],
    precedents: [
      {
        id: "prec-002-1",
        title: "WHO Community Health Worker Task Shifting Guidelines",
        year: 2008,
        organization: "World Health Organization",
        outcome: "partial",
        relevanceScore: 88,
        keyLessons: [
          "Standardization improved outcomes but reduced local adaptation",
          "Implementation varied widely by nation",
          "Strong national ownership was key to success",
        ],
        region: "Global",
      },
    ],
    finFracFran: {
      applicable: true,
      franchisabilityScore: 76,
      recommendedModel:
        "Regional Certification Franchise with National Sub-Licensing",
      fractionalizationOpportunities: [
        "Modular training curriculum units that can be assembled per regional context",
        "Micro-certifications for specific health interventions",
      ],
      pilotRecommendation:
        "Pilot in 8 nations across 3 regions with different health system architectures before global rollout.",
      adoptionBarriers: [
        "National regulatory sovereignty concerns",
        "Language and cultural adaptation costs",
      ],
    },
    keyStrengths: [
      "Addresses critical gap in global health workforce quality",
      "Public certification registry ensures transparency",
      "Modular curriculum allows cultural adaptation",
    ],
    keyWeaknesses: [
      "Certification body governance is under-specified",
      "Fee structure may exclude the most vulnerable practitioners",
      "Youth health worker pathway not included",
    ],
    suggestedAmendments: [
      "Replace single certification authority with distributed regional network",
      "Add tiered fee structure with GDP-based waivers",
      "Include youth apprenticeship pathway for ages 16–25",
    ],
    impactScope: "Global — targeting 2.4M community health workers",
    estimatedCost: "$8M certification system + $15M/year operations",
    timeToImplement: "24–36 months",
    sdgTags: ["SDG 3", "SDG 10", "SDG 17"],
  },
  {
    id: "analysis-003",
    proposalId: "OEH-2025-014",
    proposalTitle: "AI Ethics Governance Charter Addendum",
    councilId: "tech",
    councilName: "TechForAll",
    councilColor: "oklch(0.65 0.18 270)",
    analyzedAt: "2025-03-05T11:15:00Z",
    analyzerVersion: "ONEartHeaven AI v2.1",
    recommendation: "revise",
    alignmentScore: 74,
    charterAlignment: {
      overall: 74,
      articles: [
        {
          articleId: "art-1",
          articleTitle: "Preamble & Purpose",
          score: 80,
          notes:
            "AI ethics broadly aligns with Charter purpose but scope is too narrow.",
        },
        {
          articleId: "art-2",
          articleTitle: "Membership & Participation",
          score: 72,
          notes:
            "Technical language may exclude non-technical members from meaningful participation.",
        },
        {
          articleId: "art-3",
          articleTitle: "Governance Structure",
          score: 68,
          notes:
            "Enforcement mechanisms are vague and may create governance ambiguity.",
        },
        {
          articleId: "art-4",
          articleTitle: "Transparency & Accountability",
          score: 78,
          notes:
            "Audit requirements are good but need clearer independence standards.",
        },
        {
          articleId: "art-5",
          articleTitle: "FinFracFran Economy",
          score: 70,
          notes:
            "AI ethics certification has franchising potential not yet explored.",
        },
        {
          articleId: "art-6",
          articleTitle: "Youth & Future Generations",
          score: 76,
          notes: "AI impacts on youth are mentioned but under-addressed.",
        },
      ],
    },
    recommendationRationale:
      "While the intent is critically important, this addendum has significant gaps that require revision before adoption. The enforcement mechanism lacks teeth, the language is overly technical, and it doesn't address AI systems already in use within ONEartHeaven itself (including this advisor). A revised draft should include self-application clauses, simpler language for broader member participation, and a clear appeals process.",
    riskFlags: [
      {
        id: "rf-003-1",
        title: "Regulatory Capture Risk",
        category: "Governance",
        severity: "high",
        description:
          "AI ethics oversight body could be captured by tech industry representatives with conflicts of interest.",
        mitigation:
          "Require supermajority representation from civil society, affected communities, and independent academics on all AI oversight bodies.",
      },
      {
        id: "rf-003-2",
        title: "Enforcement Vacuum",
        category: "Legal",
        severity: "high",
        description:
          "No clear enforcement mechanism or sanctions for violations are specified.",
        mitigation:
          "Add a graduated sanctions framework with transparent appeals process.",
      },
      {
        id: "rf-003-3",
        title: "Self-Application Gap",
        category: "Integrity",
        severity: "medium",
        description:
          "The addendum does not explicitly apply to AI systems used by ONEartHeaven itself.",
        mitigation:
          "Add explicit self-application clause covering all AI tools used in governance and decision support.",
      },
    ],
    unintendedConsequences: [
      {
        id: "uc-003-1",
        title: "Innovation chilling effect in Global South",
        likelihood: "medium",
        impact: "significant",
        affectedRegions: ["Sub-Saharan Africa", "South Asia", "Latin America"],
        preventionNote:
          "Include capacity-building provisions and compliance support specifically for nations without existing AI regulatory frameworks.",
      },
    ],
    precedents: [
      {
        id: "prec-003-1",
        title: "EU AI Act Development Process",
        year: 2021,
        organization: "European Union",
        outcome: "mixed",
        relevanceScore: 79,
        keyLessons: [
          "Risk-based tiering is effective but complex to implement",
          "Industry lobbying significantly weakened initial proposals",
          "Civil society inclusion improved final outcomes",
        ],
        region: "Europe",
      },
    ],
    finFracFran: {
      applicable: true,
      franchisabilityScore: 65,
      recommendedModel:
        "AI Ethics Certification Franchise for National Implementation",
      fractionalizationOpportunities: [
        "Module-based compliance training for different AI risk tiers",
        "Regional AI audit center franchises",
      ],
      pilotRecommendation:
        "Pilot AI ethics certification in 5 nations before mandating Charter-level requirements.",
      adoptionBarriers: [
        "Lack of technical expertise in many member nations",
        "Rapidly evolving AI landscape makes static standards risky",
      ],
    },
    keyStrengths: [
      "Addresses a critical and urgent governance gap",
      "Risk-based tiering approach is sound",
      "Public audit requirement is strong",
    ],
    keyWeaknesses: [
      "No enforcement mechanism or sanctions",
      "Overly technical language excludes non-technical members",
      "Does not apply to ONEartHeaven's own AI systems",
      "Appeals process completely absent",
    ],
    suggestedAmendments: [
      "Add self-application clause covering all AI used in ONEartHeaven governance",
      "Rewrite in plain language accessible to non-technical delegates",
      "Develop graduated sanctions framework with independent appeals tribunal",
      "Add capacity-building provisions for nations without AI regulatory frameworks",
      "Include mandatory review cycle every 18 months given rapid AI evolution",
    ],
    impactScope: "Global — all member nations deploying AI systems",
    estimatedCost: "$5M oversight body setup + $3M/year operations",
    timeToImplement: "12–18 months after revision",
    sdgTags: ["SDG 10", "SDG 16", "SDG 17"],
  },
  {
    id: "analysis-004",
    proposalId: "OEH-2025-007",
    proposalTitle: "Pacific Islands Climate-Resilient Agriculture Compact",
    councilId: "food",
    councilName: "FoodWater Sovereignty",
    councilColor: "oklch(0.72 0.18 85)",
    analyzedAt: "2025-02-28T16:00:00Z",
    analyzerVersion: "ONEartHeaven AI v2.1",
    recommendation: "approve",
    alignmentScore: 96,
    charterAlignment: {
      overall: 96,
      articles: [
        {
          articleId: "art-1",
          articleTitle: "Preamble & Purpose",
          score: 98,
          notes:
            "Exemplary alignment — directly addresses food sovereignty for climate-vulnerable populations.",
        },
        {
          articleId: "art-2",
          articleTitle: "Membership & Participation",
          score: 97,
          notes:
            "Co-designed with Pacific Island communities — model participatory process.",
        },
        {
          articleId: "art-3",
          articleTitle: "Governance Structure",
          score: 94,
          notes: "Island-led governance committee is structurally sound.",
        },
        {
          articleId: "art-4",
          articleTitle: "Transparency & Accountability",
          score: 96,
          notes:
            "Open data sharing on crop performance and water metrics is exemplary.",
        },
        {
          articleId: "art-5",
          articleTitle: "FinFracFran Economy",
          score: 95,
          notes: "Municipal cooperative model is a FinFracFran™ showcase.",
        },
        {
          articleId: "art-6",
          articleTitle: "Youth & Future Generations",
          score: 96,
          notes: "Explicit youth farmer apprenticeship program included.",
        },
      ],
    },
    recommendationRationale:
      "This proposal is among the highest-scoring analyses conducted by this system. It was co-designed with directly affected communities, uses proven climate-resilient agricultural techniques, integrates a FinFracFran™ cooperative ownership model, and includes explicit youth pathways. The urgency of climate-related food insecurity in the Pacific Islands justifies an expedited approval pathway.",
    riskFlags: [
      {
        id: "rf-004-1",
        title: "Sea Level Rise Outpacing Implementation",
        category: "Climate",
        severity: "medium",
        description:
          "Some target islands may face land loss before full implementation is complete.",
        mitigation:
          "Prioritize highest-risk islands for first implementation cohort; include floating/elevated agriculture techniques.",
      },
    ],
    unintendedConsequences: [
      {
        id: "uc-004-1",
        title: "Traditional practice displacement",
        likelihood: "low",
        impact: "moderate",
        affectedRegions: ["Pacific Islands"],
        preventionNote:
          "The proposal already includes traditional knowledge integration protocols — strengthen enforcement of this provision.",
      },
    ],
    precedents: [
      {
        id: "prec-004-1",
        title: "Samoa Agroforestry Resilience Program",
        year: 2017,
        organization: "UNDP Pacific",
        outcome: "success",
        relevanceScore: 94,
        keyLessons: [
          "Community land stewardship drove better outcomes than externally managed programs",
          "Species diversity was key to resilience",
          "Youth engagement doubled program reach",
        ],
        region: "Pacific Islands",
      },
    ],
    finFracFran: {
      applicable: true,
      franchisabilityScore: 92,
      recommendedModel: "Island Cooperative Agricultural Franchise Network",
      fractionalizationOpportunities: [
        "Seed bank fractional ownership across island cooperatives",
        "Water collection infrastructure micro-investment units",
        "Training program licensing to other small island developing states",
      ],
      pilotRecommendation:
        "Deploy immediately in Tuvalu, Kiribati, and Marshall Islands as highest-urgency sites.",
      adoptionBarriers: ["Logistics and shipping costs for remote islands"],
    },
    keyStrengths: [
      "Highest community co-design score in this review cycle",
      "Addresses immediate climate emergency with urgency",
      "Explicit youth farmer apprenticeship program",
      "FinFracFran™ cooperative model is exemplary",
      "Traditional knowledge integration built in from inception",
    ],
    keyWeaknesses: ["Logistics costs for remote islands not fully addressed"],
    suggestedAmendments: [
      "Add expedited approval pathway for proposals co-designed by directly affected communities",
      "Include regional shipping cost subsidy provision",
    ],
    impactScope: "Pacific Islands — 22 nations, ~2.4M people",
    estimatedCost: "$18M over 5 years",
    timeToImplement: "6–12 months initial deployment",
    sdgTags: ["SDG 2", "SDG 13", "SDG 14", "SDG 15"],
  },
  {
    id: "analysis-005",
    proposalId: "OEH-2025-003",
    proposalTitle: "Conflict Early Warning & Mediation Network",
    councilId: "peace",
    councilName: "PeaceBuilders",
    councilColor: "oklch(0.62 0.22 25)",
    analyzedAt: "2025-02-25T10:45:00Z",
    analyzerVersion: "ONEartHeaven AI v2.1",
    recommendation: "approve_with_conditions",
    alignmentScore: 81,
    charterAlignment: {
      overall: 81,
      articles: [
        {
          articleId: "art-1",
          articleTitle: "Preamble & Purpose",
          score: 90,
          notes: "Core peace mandate — highly aligned.",
        },
        {
          articleId: "art-2",
          articleTitle: "Membership & Participation",
          score: 78,
          notes:
            "Civil society inclusion in early warning networks needs strengthening.",
        },
        {
          articleId: "art-3",
          articleTitle: "Governance Structure",
          score: 75,
          notes:
            "Mediation authority boundaries and escalation protocols need clarification.",
        },
        {
          articleId: "art-4",
          articleTitle: "Transparency & Accountability",
          score: 80,
          notes: "Conflict data handling raises privacy and safety concerns.",
        },
        {
          articleId: "art-5",
          articleTitle: "FinFracFran Economy",
          score: 78,
          notes: "Regional mediation center franchise model is applicable.",
        },
        {
          articleId: "art-6",
          articleTitle: "Youth & Future Generations",
          score: 85,
          notes: "Youth peace ambassador program is a strong inclusion.",
        },
      ],
    },
    recommendationRationale:
      "The Conflict Early Warning Network addresses a genuine gap in global peace infrastructure. The proposal's community-based warning system is innovative and avoids the surveillance overreach of state-led systems. However, the mediation authority's powers need clearer delimitation to prevent overreach, and conflict data handling must comply with strict privacy standards given the safety risks to whistleblowers in conflict zones.",
    riskFlags: [
      {
        id: "rf-005-1",
        title: "Whistleblower Safety Risk",
        category: "Security",
        severity: "critical",
        description:
          "Community informants in conflict early warning networks face serious physical danger if identity is exposed.",
        mitigation:
          "Mandate end-to-end encryption, zero-knowledge data architecture, and anonymous reporting protocols before any deployment.",
      },
      {
        id: "rf-005-2",
        title: "Sovereignty Conflict",
        category: "Political",
        severity: "high",
        description:
          "National governments may view external early warning networks as intelligence gathering or interference in sovereign affairs.",
        mitigation:
          "Require explicit member nation consent for all monitoring within their territory; establish clear non-intervention protocols.",
      },
    ],
    unintendedConsequences: [
      {
        id: "uc-005-1",
        title: "Warning fatigue and false positive erosion of trust",
        likelihood: "medium",
        impact: "moderate",
        affectedRegions: ["Sub-Saharan Africa", "Middle East", "South Asia"],
        preventionNote:
          "Implement tiered alert levels and require minimum confidence threshold before escalation.",
      },
    ],
    precedents: [
      {
        id: "prec-005-1",
        title: "ECOWAS Early Warning and Response Network (ECOWARN)",
        year: 2002,
        organization: "ECOWAS",
        outcome: "partial",
        relevanceScore: 86,
        keyLessons: [
          "Regional ownership was critical to legitimacy",
          "Community monitors needed stronger protection protocols",
          "Politicization of warnings undermined credibility in several cases",
        ],
        region: "West Africa",
      },
    ],
    finFracFran: {
      applicable: true,
      franchisabilityScore: 72,
      recommendedModel: "Regional Peace Mediation Center Franchise",
      fractionalizationOpportunities: [
        "Conflict analysis training program licensing",
        "Mediation methodology certification",
      ],
      pilotRecommendation:
        "Begin with 3 regional hubs in West Africa, South Asia, and Central America where existing civil society networks are strongest.",
      adoptionBarriers: [
        "Government sovereignty concerns",
        "Security risks for field monitors",
      ],
    },
    keyStrengths: [
      "Community-based approach avoids state surveillance overreach",
      "Youth peace ambassador program is innovative",
      "Regional franchise model allows cultural adaptation",
    ],
    keyWeaknesses: [
      "Critical: no whistleblower protection protocol specified",
      "Mediation authority powers not clearly delimited",
      "Conflict data privacy framework absent",
    ],
    suggestedAmendments: [
      "Add mandatory end-to-end encryption and zero-knowledge data architecture before any deployment",
      "Define clear boundaries of mediation authority with explicit non-intervention protocols",
      "Require member nation consent for all territory-specific monitoring",
      "Add conflict data privacy framework aligned with highest international standards",
    ],
    impactScope:
      "Global — targeting active and latent conflict zones across 60+ nations",
    estimatedCost: "$22M network setup + $6M/year operations",
    timeToImplement: "18–30 months with phased regional rollout",
    sdgTags: ["SDG 16", "SDG 10", "SDG 17"],
  },
  {
    id: "analysis-006",
    proposalId: "OEH-2025-005",
    proposalTitle: "Charter Amendment VII: Youth Voting Rights Expansion",
    councilId: "general",
    councilName: "General Assembly",
    councilColor: "oklch(0.72 0.16 75)",
    analyzedAt: "2025-03-03T08:30:00Z",
    analyzerVersion: "ONEartHeaven AI v2.1",
    recommendation: "approve",
    alignmentScore: 89,
    charterAlignment: {
      overall: 89,
      articles: [
        {
          articleId: "art-1",
          articleTitle: "Preamble & Purpose",
          score: 92,
          notes:
            "Expanding democratic participation directly fulfills the Charter's foundational purpose.",
        },
        {
          articleId: "art-2",
          articleTitle: "Membership & Participation",
          score: 95,
          notes:
            "Directly expands the scope of Article 2 — excellent alignment.",
        },
        {
          articleId: "art-3",
          articleTitle: "Governance Structure",
          score: 86,
          notes:
            "Youth council integration into governance structure is well-specified.",
        },
        {
          articleId: "art-4",
          articleTitle: "Transparency & Accountability",
          score: 88,
          notes:
            "Youth voting record transparency is maintained under existing protocols.",
        },
        {
          articleId: "art-5",
          articleTitle: "FinFracFran Economy",
          score: 82,
          notes:
            "Youth cooperative participation provisions are a good FinFracFran™ entry point.",
        },
        {
          articleId: "art-6",
          articleTitle: "Youth & Future Generations",
          score: 98,
          notes: "This amendment is the embodiment of Article 6's mandate.",
        },
      ],
    },
    recommendationRationale:
      "Expanding voting rights to 16–25 year olds with a dedicated Youth Council addresses one of the UN's most criticized failures — the near-total exclusion of young people from formal decision-making. The proposal's weighted voting system for youth (0.6x weight on non-youth-specific matters, full weight on matters primarily affecting future generations) is a thoughtful balance. The implementation timeline is realistic.",
    riskFlags: [
      {
        id: "rf-006-1",
        title: "Age Verification Complexity",
        category: "Technical",
        severity: "low",
        description:
          "Age verification in decentralized identity systems requires careful implementation.",
        mitigation:
          "Use zero-knowledge age proofs compatible with ICP identity infrastructure.",
      },
      {
        id: "rf-006-2",
        title: "Youth Bloc Manipulation Risk",
        category: "Governance",
        severity: "medium",
        description:
          "Well-organized political actors could attempt to coordinate youth votes disproportionately.",
        mitigation:
          "Apply same anti-coordination rules as adult voting; include education on independent judgment in youth onboarding.",
      },
    ],
    unintendedConsequences: [
      {
        id: "uc-006-1",
        title: "Generational tension in voting outcomes",
        likelihood: "low",
        impact: "minor",
        affectedRegions: ["Global"],
        preventionNote:
          "Design inter-generational dialogue forums as a standing feature of the Youth Council to build mutual understanding.",
      },
    ],
    precedents: [
      {
        id: "prec-006-1",
        title: "Scotland's 16-Year-Old Voting Rights (Independence Referendum)",
        year: 2014,
        organization: "Scottish Government",
        outcome: "success",
        relevanceScore: 84,
        keyLessons: [
          "Youth turnout exceeded adult turnout when issues were relevant to them",
          "No evidence of increased manipulation or bloc voting",
          "Expanded participation increased overall legitimacy",
        ],
        region: "Europe",
      },
    ],
    finFracFran: {
      applicable: true,
      franchisabilityScore: 78,
      recommendedModel:
        "Youth Council Franchise Network — regional youth assemblies with standardized governance",
      fractionalizationOpportunities: [
        "Local youth chapter franchise model",
        "Youth cooperative investment pools",
      ],
      pilotRecommendation:
        "Implement Youth Council as a parallel deliberation track in Phase 1 before granting formal voting rights.",
      adoptionBarriers: [
        "Cultural resistance in some regions to youth political participation",
      ],
    },
    keyStrengths: [
      "Directly addresses the UN's youth exclusion failure",
      "Weighted voting is a thoughtful balance of inclusion and proportionality",
      "Zero-knowledge age verification preserves privacy",
      "Youth Council provides structured entry point",
    ],
    keyWeaknesses: [
      "Age verification technical implementation not yet specified",
      "Cultural resistance in some regions not addressed",
    ],
    suggestedAmendments: [
      "Specify zero-knowledge age proof standard for ICP identity integration",
      "Add cultural context guidelines for regions with lower youth political participation norms",
    ],
    impactScope: "Global — 1.8B people aged 16–25",
    estimatedCost: "$3M Youth Council infrastructure",
    timeToImplement: "12–18 months",
    sdgTags: ["SDG 10", "SDG 16", "SDG 17"],
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllAnalyses(): PolicyAnalysis[] {
  return POLICY_ANALYSES;
}

export function getAnalysis(id: string): PolicyAnalysis | undefined {
  return POLICY_ANALYSES.find((a) => a.id === id);
}

export function getAnalysisByProposal(
  proposalId: string,
): PolicyAnalysis | undefined {
  return POLICY_ANALYSES.find((a) => a.proposalId === proposalId);
}

export function getAnalysesByCouncil(councilId: string): PolicyAnalysis[] {
  return POLICY_ANALYSES.filter((a) => a.councilId === councilId);
}

export function getAnalysesByRecommendation(
  recommendation: string,
): PolicyAnalysis[] {
  return POLICY_ANALYSES.filter((a) => a.recommendation === recommendation);
}

export function getPolicyAdvisorStats() {
  const total = POLICY_ANALYSES.length;
  const avgScore = Math.round(
    POLICY_ANALYSES.reduce((sum, a) => sum + a.alignmentScore, 0) / total,
  );
  const approved = POLICY_ANALYSES.filter(
    (a) =>
      a.recommendation === "approve" ||
      a.recommendation === "approve_with_conditions",
  ).length;
  const criticalFlags = POLICY_ANALYSES.flatMap((a) => a.riskFlags).filter(
    (f) => f.severity === "critical",
  ).length;
  const finFracApplicable = POLICY_ANALYSES.filter(
    (a) => a.finFracFran.applicable,
  ).length;

  return { total, avgScore, approved, criticalFlags, finFracApplicable };
}

export function searchAnalyses(query: string): PolicyAnalysis[] {
  const q = query.toLowerCase();
  return POLICY_ANALYSES.filter(
    (a) =>
      a.proposalTitle.toLowerCase().includes(q) ||
      a.councilName.toLowerCase().includes(q) ||
      a.recommendationRationale.toLowerCase().includes(q),
  );
}
