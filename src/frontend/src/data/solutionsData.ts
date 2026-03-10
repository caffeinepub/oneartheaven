import type { Solution } from "./solutionsTypes";

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const SOLUTIONS: Solution[] = [
  {
    id: "sol-001",
    code: "NWN-2024-001",
    title: "Community Solar Microgrids",
    tagline:
      "Decentralised renewable energy owned and operated by local cooperatives.",
    category: "energy",
    stage: "proven",
    region: "africa",
    impactScale: "national",
    problemStatement:
      "650 million Africans lack reliable electricity, stifling economic growth and quality of life. Centralised grid infrastructure is expensive, slow to deploy, and vulnerable to failure.",
    approach:
      "FinFracFran™-licensed solar microgrid kits (20–200 kW) installed and operated by local energy cooperatives. Fractional ownership enables community members to invest from as little as $50. Revenue is shared proportionally. Blueprint is open-source; licensing covers training, insurance, and AI monitoring.",
    provenResults:
      "47 microgrids live across 12 nations. Average electrification timeline reduced from 8 years to 14 months. 94% of energy revenue reinvested locally. CO₂ avoidance: 84,000 tonnes/year.",
    impactMetrics: [
      { label: "Households Electrified", value: "128,000", unit: "households" },
      { label: "Nations Adopted", value: "12", unit: "nations" },
      { label: "CO₂ Avoided", value: "84,000", unit: "tonnes/yr" },
      { label: "Local Revenue Share", value: "94%", unit: "reinvested" },
    ],
    sdgs: ["sdg7", "sdg8", "sdg13", "sdg17"],
    adoptingNations: [
      {
        nationCode: "KE",
        nationName: "Kenya",
        region: "africa",
        adoptedYear: 2022,
        stage: "proven",
      },
      {
        nationCode: "GH",
        nationName: "Ghana",
        region: "africa",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "TZ",
        nationName: "Tanzania",
        region: "africa",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "BD",
        nationName: "Bangladesh",
        region: "asia_pacific",
        adoptedYear: 2023,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "finfracfran_standard",
      franchiseFee: "$8,000",
      revenueShare: "4% of annual revenue",
      minCapital: "$25,000",
      adoptingNations: 12,
      notes:
        "Includes hardware sourcing network, AI monitoring platform, and cooperative governance templates.",
    },
    aiScore: {
      overall: 94,
      novelty: 88,
      scalability: 97,
      replicability: 96,
      equityImpact: 95,
      analysis:
        "Exemplary model combining clean energy deployment with cooperative economics. High replicability across sub-Saharan Africa and Southeast Asia. FinFracFran™ structure dramatically lowers capital barriers.",
    },
    councilId: "climate-action",
    featured: true,
    submittedBy: "Amara Diallo, ClimateAction Council",
    submittedDate: "2022-03-15",
    lastUpdated: "2025-08-10",
    imageColor: "oklch(0.78 0.18 75)",
  },
  {
    id: "sol-002",
    code: "NWN-2024-002",
    title: "Community Health Worker Certification Network",
    tagline:
      "AI-assisted training and accreditation for frontline health workers worldwide.",
    category: "health",
    stage: "scaling",
    region: "global",
    impactScale: "global",
    problemStatement:
      "18 million health workers are needed globally to achieve universal health coverage. Rural and remote communities are most underserved. Existing training pathways are inaccessible, expensive, and not locally adapted.",
    approach:
      "Standardised yet locally adaptable CHW curriculum delivered via mobile-first AI tutoring. FinFracFran™ licensing allows NGOs, governments, and social enterprises to deploy the programme under a shared quality framework. Community health workers earn micro-credentials recognised across 18 partner nations.",
    provenResults:
      "42,000 CHWs certified. Average cost per certification: $180 (vs $1,400 conventional). Child mortality in pilot regions down 22% in 3 years. 18 nations have integrated the credential into national health systems.",
    impactMetrics: [
      { label: "CHWs Certified", value: "42,000", unit: "workers" },
      { label: "Nations Integrated", value: "18", unit: "nations" },
      { label: "Cost Reduction", value: "87%", unit: "vs conventional" },
      { label: "Child Mortality Δ", value: "−22%", unit: "pilot regions" },
    ],
    sdgs: ["sdg3", "sdg4", "sdg10", "sdg17"],
    adoptingNations: [
      {
        nationCode: "IN",
        nationName: "India",
        region: "asia_pacific",
        adoptedYear: 2022,
        stage: "scaling",
      },
      {
        nationCode: "NG",
        nationName: "Nigeria",
        region: "africa",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "ET",
        nationName: "Ethiopia",
        region: "africa",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "PH",
        nationName: "Philippines",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "finfracfran_premium",
      franchiseFee: "$12,000",
      revenueShare: "5% of certification fees",
      minCapital: "$30,000",
      adoptingNations: 18,
      notes:
        "Premium tier includes AI tutoring customisation, national accreditation support, and CHW alumni network access.",
    },
    aiScore: {
      overall: 91,
      novelty: 85,
      scalability: 95,
      replicability: 93,
      equityImpact: 97,
      analysis:
        "High equity impact with proven cost-efficiency. AI-assisted curriculum adapts to local disease burden and language. Excellent candidate for rapid adoption across low-income nations.",
    },
    councilId: "health-for-all",
    featured: true,
    submittedBy: "Dr. Fatima Al-Rashid, HealthForAll Council",
    submittedDate: "2022-07-20",
    lastUpdated: "2025-09-01",
    imageColor: "oklch(0.7 0.18 150)",
  },
  {
    id: "sol-003",
    code: "NWN-2024-003",
    title: "Regenerative Agroforestry Kits",
    tagline:
      "Proven food security through tree-crop integration — deployable in 90 days.",
    category: "food_water",
    stage: "proven",
    region: "latin_america",
    impactScale: "regional",
    problemStatement:
      "Monoculture farming has depleted soils across 40% of arable land. Smallholder farmers face declining yields and climate volatility with no capital to transition.",
    approach:
      "Packaged agroforestry kits (seed stock, composting system, AI soil monitoring sensor, training manual in 12 languages) sold via FinFracFran™ cooperative distributors. Each kit covers 0.5–2 ha and pays back in 18 months.",
    provenResults:
      "Deployed across 9 nations. Average yield increase: 34%. Soil organic matter up 61% over 3 years. 14,000 smallholder families lifted above food poverty line.",
    impactMetrics: [
      { label: "Families Lifted", value: "14,000", unit: "families" },
      { label: "Nations Deployed", value: "9", unit: "nations" },
      { label: "Yield Increase", value: "34%", unit: "avg. per farm" },
      { label: "Soil Regeneration", value: "61%", unit: "organic matter ↑" },
    ],
    sdgs: ["sdg2", "sdg13", "sdg15", "sdg1"],
    adoptingNations: [
      {
        nationCode: "BR",
        nationName: "Brazil",
        region: "latin_america",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "CO",
        nationName: "Colombia",
        region: "latin_america",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "PE",
        nationName: "Peru",
        region: "latin_america",
        adoptedYear: 2024,
        stage: "piloting",
      },
      {
        nationCode: "ID",
        nationName: "Indonesia",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "finfracfran_standard",
      franchiseFee: "$5,000",
      revenueShare: "3% of kit sales",
      minCapital: "$15,000",
      adoptingNations: 9,
      notes:
        "Kit distributors operate as FinFracFran™ cooperatives, sharing bulk purchasing power and training resources.",
    },
    aiScore: {
      overall: 89,
      novelty: 82,
      scalability: 91,
      replicability: 94,
      equityImpact: 92,
      analysis:
        "Highly replicable in tropical and subtropical climates. Strong community ownership model. AI soil monitoring provides data for continuous improvement.",
    },
    councilId: "food-water",
    featured: false,
    submittedBy: "Carlos Vega, FoodWater Sovereignty Council",
    submittedDate: "2023-01-10",
    lastUpdated: "2025-07-15",
    imageColor: "oklch(0.72 0.16 195)",
  },
  {
    id: "sol-004",
    code: "NWN-2023-011",
    title: "Open Curriculum Commons Initiative",
    tagline:
      "Universal open-source learning for the 300 million children without quality schooling.",
    category: "education",
    stage: "scaling",
    region: "global",
    impactScale: "global",
    problemStatement:
      "300 million children worldwide have no access to quality education. Proprietary curricula are expensive, centrally controlled, and culturally irrelevant to local contexts.",
    approach:
      "Fully open-source, modular curriculum framework adaptable to any language, culture, or resource level. AI localisation engine translates and adapts content. FinFracFran™ licensing enables NGOs, schools, and social enterprises to deploy and customise while contributing back to the commons.",
    provenResults:
      "14 nations with formal adoption. 2.4 million learners reached. 94 languages supported. Average learning outcome improvement: 28% vs baseline.",
    impactMetrics: [
      { label: "Learners Reached", value: "2.4M", unit: "learners" },
      { label: "Languages", value: "94", unit: "supported" },
      { label: "Nations Adopted", value: "14", unit: "nations" },
      { label: "Outcome Uplift", value: "28%", unit: "avg. improvement" },
    ],
    sdgs: ["sdg4", "sdg10", "sdg16", "sdg17"],
    adoptingNations: [
      {
        nationCode: "RW",
        nationName: "Rwanda",
        region: "africa",
        adoptedYear: 2022,
        stage: "proven",
      },
      {
        nationCode: "UG",
        nationName: "Uganda",
        region: "africa",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "BD",
        nationName: "Bangladesh",
        region: "asia_pacific",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "BO",
        nationName: "Bolivia",
        region: "latin_america",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "open_source",
      franchiseFee: "None (open source)",
      revenueShare: "Optional 2% contribution to Commons Fund",
      minCapital: "$5,000",
      adoptingNations: 14,
      notes:
        "Core curriculum is free. Premium support, AI localisation, and teacher training available via FinFracFran™ cooperative agreements.",
    },
    aiScore: {
      overall: 93,
      novelty: 90,
      scalability: 98,
      replicability: 97,
      equityImpact: 96,
      analysis:
        "Exceptional equity impact and near-unlimited scalability. Open-source commons model with FinFracFran™ overlay creates sustainable funding while preserving universal access.",
    },
    councilId: "edu-verse",
    featured: true,
    submittedBy: "Prof. Mei Lin, EduVerse Council",
    submittedDate: "2022-11-05",
    lastUpdated: "2025-09-10",
    imageColor: "oklch(0.68 0.18 270)",
  },
  {
    id: "sol-005",
    code: "NWN-2024-005",
    title: "Conflict Early Warning & Mediation Network",
    tagline:
      "AI-powered conflict prediction and community-led mediation before violence erupts.",
    category: "peace",
    stage: "piloting",
    region: "africa",
    impactScale: "regional",
    problemStatement:
      "Most violent conflicts are predictable 60–90 days in advance yet prevention infrastructure is underfunded. Once violence begins, costs escalate 200× compared to early intervention.",
    approach:
      "AI model trained on 40 years of conflict data monitors 120 risk indicators in real-time. Local mediation networks (trained via FinFracFran™ cooperative structure) are activated when risk exceeds threshold. All data shared transparently with participating nations.",
    provenResults:
      "4 pilot nations. 7 of 9 high-risk situations de-escalated via mediation. Estimated cost savings: $240M in avoided conflict costs. 0 civilian casualties in de-escalated zones.",
    impactMetrics: [
      { label: "Risk Situations Resolved", value: "7/9", unit: "de-escalated" },
      { label: "Pilot Nations", value: "4", unit: "nations" },
      {
        label: "Cost Savings Estimated",
        value: "$240M",
        unit: "avoided costs",
      },
      { label: "Civilian Casualties", value: "0", unit: "in pilot zones" },
    ],
    sdgs: ["sdg16", "sdg17", "sdg10"],
    adoptingNations: [
      {
        nationCode: "ML",
        nationName: "Mali",
        region: "africa",
        adoptedYear: 2024,
        stage: "piloting",
      },
      {
        nationCode: "SS",
        nationName: "South Sudan",
        region: "africa",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "cooperative",
      franchiseFee: "$18,000",
      revenueShare: "6% of mediation service fees",
      minCapital: "$50,000",
      adoptingNations: 4,
      notes:
        "Mediators trained under FinFracFran™ cooperative structure share AI platform costs. Requires national government partnership.",
    },
    aiScore: {
      overall: 87,
      novelty: 92,
      scalability: 83,
      replicability: 85,
      equityImpact: 91,
      analysis:
        "High novelty in combining AI prediction with community mediation. Scalability constrained by need for local trust networks. Equity impact exceptional — benefits most vulnerable populations.",
    },
    councilId: "peace-builders",
    featured: false,
    submittedBy: "Ambassador Kofi Mensah, PeaceBuilders Council",
    submittedDate: "2023-06-18",
    lastUpdated: "2025-08-22",
    imageColor: "oklch(0.72 0.14 220)",
  },
  {
    id: "sol-006",
    code: "NWN-2023-019",
    title: "Municipal Cooperative Housing Framework",
    tagline:
      "Affordable housing at scale via FinFracFran™ cooperative ownership — no developer profit extraction.",
    category: "economy",
    stage: "proven",
    region: "europe",
    impactScale: "national",
    problemStatement:
      "Housing costs in 140+ cities have reached crisis levels. Developer-led models extract wealth from communities while delivering inadequate supply. Municipal governments lack capital for public housing.",
    approach:
      "Residents form FinFracFran™ housing cooperatives, acquiring fractional ownership in buildings collectively. AI-optimised design reduces construction costs by 28%. Revenue from commercial ground floors cross-subsidises residential rents. Municipal governments provide land; cooperatives raise capital via community bonds.",
    provenResults:
      "12 nations, 19 cities, 8,400 affordable units delivered. Average resident monthly cost: 31% below market rate. 94% resident satisfaction. $0 public subsidy per unit (self-financing model).",
    impactMetrics: [
      { label: "Affordable Units", value: "8,400", unit: "units" },
      { label: "Cities", value: "19", unit: "cities" },
      { label: "Below Market", value: "31%", unit: "avg. discount" },
      { label: "Public Subsidy", value: "$0", unit: "per unit" },
    ],
    sdgs: ["sdg11", "sdg8", "sdg10", "sdg1"],
    adoptingNations: [
      {
        nationCode: "DE",
        nationName: "Germany",
        region: "europe",
        adoptedYear: 2022,
        stage: "proven",
      },
      {
        nationCode: "NL",
        nationName: "Netherlands",
        region: "europe",
        adoptedYear: 2022,
        stage: "proven",
      },
      {
        nationCode: "UY",
        nationName: "Uruguay",
        region: "latin_america",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "JP",
        nationName: "Japan",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "finfracfran_premium",
      franchiseFee: "$25,000",
      revenueShare: "3.5% of annual rental income",
      minCapital: "$200,000",
      adoptingNations: 12,
      notes:
        "Includes legal cooperative structure templates for 40+ jurisdictions, AI design tools, and community bond issuance support.",
    },
    aiScore: {
      overall: 92,
      novelty: 86,
      scalability: 94,
      replicability: 90,
      equityImpact: 98,
      analysis:
        "Transformative housing model with exceptional equity impact. Self-financing structure removes dependency on public subsidy, enabling rapid scaling. Legal complexity across jurisdictions is the primary barrier.",
    },
    councilId: "econ-justice",
    featured: true,
    submittedBy: "Elena Vasquez, EconJustice Council",
    submittedDate: "2022-09-14",
    lastUpdated: "2025-09-05",
    imageColor: "oklch(0.75 0.18 85)",
  },
  {
    id: "sol-007",
    code: "NWN-2024-007",
    title: "AI Governance Toolkit for Local Councils",
    tagline:
      "Open-source AI tools enabling transparent, participatory governance at every scale.",
    category: "technology",
    stage: "piloting",
    region: "global",
    impactScale: "national",
    problemStatement:
      "Governments at all levels lack tools for AI-augmented participatory governance. Proprietary solutions lock communities into vendor dependencies and exclude citizens from decision-making.",
    approach:
      "Open-source toolkit: AI meeting summariser, proposal impact analyser, citizen sentiment aggregator, budget visualiser, and multi-lingual participatory voting platform. FinFracFran™ cooperative tech support networks provide implementation and training.",
    provenResults:
      "9 nations piloting. 340 councils using the toolkit. Citizen participation in budgeting decisions up 3.4× vs baseline. Decision cycle time reduced 58%.",
    impactMetrics: [
      { label: "Councils Using", value: "340", unit: "councils" },
      { label: "Nations Piloting", value: "9", unit: "nations" },
      { label: "Citizen Participation Δ", value: "3.4×", unit: "increase" },
      { label: "Decision Cycle Δ", value: "−58%", unit: "time reduction" },
    ],
    sdgs: ["sdg16", "sdg9", "sdg17", "sdg10"],
    adoptingNations: [
      {
        nationCode: "EE",
        nationName: "Estonia",
        region: "europe",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "TW",
        nationName: "Taiwan",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
      {
        nationCode: "IS",
        nationName: "Iceland",
        region: "europe",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "open_source",
      franchiseFee: "None (open source)",
      revenueShare: "Optional 3% tech support cooperative contribution",
      minCapital: "$8,000",
      adoptingNations: 9,
      notes:
        "Core toolkit is open source. FinFracFran™ cooperative tech support networks operate on a shared cost model.",
    },
    aiScore: {
      overall: 88,
      novelty: 91,
      scalability: 90,
      replicability: 89,
      equityImpact: 87,
      analysis:
        "High novelty in open-source AI governance tools. Excellent compatibility with existing government systems. Multi-lingual support critical for global adoption.",
    },
    councilId: "tech-for-all",
    featured: false,
    submittedBy: "Dr. Yuki Tanaka, TechForAll Council",
    submittedDate: "2023-04-22",
    lastUpdated: "2025-08-30",
    imageColor: "oklch(0.65 0.18 300)",
  },
  {
    id: "sol-008",
    code: "NWN-2023-008",
    title: "Endangered Language Digital Preservation",
    tagline:
      "AI-powered language documentation and revival — keeping humanity's knowledge alive.",
    category: "culture",
    stage: "scaling",
    region: "global",
    impactScale: "global",
    problemStatement:
      "One language dies every 40 days. With each language, millennia of ecological, medical, and cultural knowledge is lost. 3,000 of 7,000 human languages are endangered.",
    approach:
      "AI speech-to-text and NLP tools trained for low-resource languages. Community linguists trained via FinFracFran™ cooperative model. Digital archives stored on ICP decentralised infrastructure. Gamified language learning apps for youth engagement.",
    provenResults:
      "847 languages documented. 12 nations with formal revival programmes. 94,000 hours of language audio archived. 3 previously dormant languages now taught in schools.",
    impactMetrics: [
      { label: "Languages Documented", value: "847", unit: "languages" },
      { label: "Audio Hours Archived", value: "94,000", unit: "hours" },
      { label: "Nations with Programmes", value: "12", unit: "nations" },
      { label: "Revived Languages", value: "3", unit: "now taught" },
    ],
    sdgs: ["sdg4", "sdg10", "sdg16", "sdg17"],
    adoptingNations: [
      {
        nationCode: "NZ",
        nationName: "New Zealand",
        region: "oceania",
        adoptedYear: 2022,
        stage: "proven",
      },
      {
        nationCode: "CA",
        nationName: "Canada",
        region: "north_america",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "BR",
        nationName: "Brazil",
        region: "latin_america",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "AU",
        nationName: "Australia",
        region: "oceania",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "cooperative",
      franchiseFee: "$6,000",
      revenueShare: "4% of app subscription revenue",
      minCapital: "$20,000",
      adoptingNations: 12,
      notes:
        "Community linguist cooperatives operate the documentation programmes; digital archive and AI tools provided centrally.",
    },
    aiScore: {
      overall: 90,
      novelty: 93,
      scalability: 88,
      replicability: 86,
      equityImpact: 94,
      analysis:
        "High cultural equity impact preserving irreplaceable human knowledge. AI tools effective for low-resource languages. ICP decentralised storage ensures permanence.",
    },
    councilId: "culture-bridge",
    featured: false,
    submittedBy: "Dr. Aroha Ngata, CultureBridge Council",
    submittedDate: "2022-05-30",
    lastUpdated: "2025-07-28",
    imageColor: "oklch(0.7 0.2 30)",
  },
  {
    id: "sol-009",
    code: "NWN-2024-009",
    title: "Participatory Budget Platform",
    tagline:
      "Citizens decide how public money is spent — transparent, accountable, on-chain.",
    category: "governance",
    stage: "scaling",
    region: "latin_america",
    impactScale: "national",
    problemStatement:
      "Public trust in government budget decisions is at historic lows. Corruption and misallocation cost developing nations $1 trillion annually. Citizens are excluded from decisions about their own communities.",
    approach:
      "Open-source participatory budgeting platform with on-chain vote recording (ICP). Citizens propose, deliberate, and vote on municipal budget allocations. AI transparency engine flags anomalies and cross-references outcomes. FinFracFran™ cooperative tech teams deploy and maintain locally.",
    provenResults:
      "14 nations, 8.2 million citizens participating. Average reduction in budget misallocation: 34%. Citizen trust in municipal government up 41% in participating cities.",
    impactMetrics: [
      { label: "Citizens Participating", value: "8.2M", unit: "citizens" },
      { label: "Nations Adopted", value: "14", unit: "nations" },
      {
        label: "Misallocation Reduction",
        value: "34%",
        unit: "avg. reduction",
      },
      { label: "Trust Increase", value: "41%", unit: "avg. uplift" },
    ],
    sdgs: ["sdg16", "sdg11", "sdg10", "sdg17"],
    adoptingNations: [
      {
        nationCode: "BR",
        nationName: "Brazil",
        region: "latin_america",
        adoptedYear: 2021,
        stage: "proven",
      },
      {
        nationCode: "PY",
        nationName: "Paraguay",
        region: "latin_america",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "EC",
        nationName: "Ecuador",
        region: "latin_america",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "PH",
        nationName: "Philippines",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "finfracfran_standard",
      franchiseFee: "$10,000",
      revenueShare: "4.5% of SaaS subscription fees",
      minCapital: "$35,000",
      adoptingNations: 14,
      notes:
        "Municipal government partnership required. On-chain recording via ICP ensures tamper-proof audit trail.",
    },
    aiScore: {
      overall: 91,
      novelty: 87,
      scalability: 94,
      replicability: 92,
      equityImpact: 93,
      analysis:
        "Strong demonstrated impact on governance quality and citizen trust. ICP on-chain recording is a meaningful differentiator. High replicability across democratic systems at all income levels.",
    },
    councilId: "general-assembly",
    featured: true,
    submittedBy: "Ricardo Morales, General Assembly",
    submittedDate: "2021-11-20",
    lastUpdated: "2025-09-12",
    imageColor: "oklch(0.72 0.16 75)",
  },
  {
    id: "sol-010",
    code: "NWN-2024-010",
    title: "Rainwater Harvesting & Purification Systems",
    tagline:
      "Low-cost, community-maintained water security for 2.2 billion people without safe water.",
    category: "food_water",
    stage: "proven",
    region: "asia_pacific",
    impactScale: "national",
    problemStatement:
      "2.2 billion people lack safe drinking water. Centralised water infrastructure is too expensive for remote communities. Existing rainwater harvesting is inefficient and often contaminated.",
    approach:
      "Modular rainwater harvesting kits (1,000–50,000L capacity) with biosand filtration, AI water quality monitoring via mobile app, and solar UV purification. Deployed and maintained by community water cooperatives under FinFracFran™ model.",
    provenResults:
      "7 nations, 180,000 beneficiaries. Waterborne illness reduced 78% in pilot communities. Average kit payback period: 14 months. 96% system uptime due to cooperative maintenance model.",
    impactMetrics: [
      { label: "Beneficiaries", value: "180,000", unit: "people" },
      { label: "Nations Deployed", value: "7", unit: "nations" },
      { label: "Illness Reduction", value: "78%", unit: "waterborne" },
      { label: "System Uptime", value: "96%", unit: "avg. maintained" },
    ],
    sdgs: ["sdg6", "sdg3", "sdg13", "sdg11"],
    adoptingNations: [
      {
        nationCode: "NP",
        nationName: "Nepal",
        region: "asia_pacific",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "KH",
        nationName: "Cambodia",
        region: "asia_pacific",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "TZ",
        nationName: "Tanzania",
        region: "africa",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "finfracfran_standard",
      franchiseFee: "$4,000",
      revenueShare: "3% of kit sales revenue",
      minCapital: "$12,000",
      adoptingNations: 7,
      notes:
        "Water cooperative operators receive training, AI monitoring access, and bulk hardware pricing through FinFracFran™ network.",
    },
    aiScore: {
      overall: 88,
      novelty: 79,
      scalability: 92,
      replicability: 95,
      equityImpact: 96,
      analysis:
        "Extremely high replicability and equity impact. Straightforward technology made powerful by cooperative maintenance model and AI monitoring. Applicable in virtually any geography.",
    },
    councilId: "food-water",
    featured: false,
    submittedBy: "Priya Sharma, FoodWater Sovereignty Council",
    submittedDate: "2023-02-14",
    lastUpdated: "2025-08-05",
    imageColor: "oklch(0.72 0.16 195)",
  },
  {
    id: "sol-011",
    code: "NWN-2024-011",
    title: "Global Pandemic Preparedness Network",
    tagline:
      "Decentralised early-warning and rapid-response infrastructure — never again unprepared.",
    category: "health",
    stage: "scaling",
    region: "global",
    impactScale: "global",
    problemStatement:
      "COVID-19 cost 20 million lives and $28 trillion globally. The world had no decentralised infrastructure for pandemic early warning, supply chain coordination, or equitable vaccine distribution.",
    approach:
      "94 regional preparedness hubs networked via ICP decentralised infrastructure. AI epidemiological surveillance monitors 6,000 data streams. FinFracFran™ cooperative pharmaceutical manufacturing ensures equitable supply. Open-source protocols shared across all member nations.",
    provenResults:
      "94 hubs operational across 31 nations. 3 potential outbreaks detected and contained in pilot period. Vaccine equity index improved from 0.34 to 0.71 in participating nations.",
    impactMetrics: [
      { label: "Nations Networked", value: "31", unit: "nations" },
      { label: "Preparedness Hubs", value: "94", unit: "regional hubs" },
      { label: "Outbreaks Contained", value: "3", unit: "pilot period" },
      { label: "Vaccine Equity Index", value: "0.71", unit: "(from 0.34)" },
    ],
    sdgs: ["sdg3", "sdg17", "sdg9", "sdg10"],
    adoptingNations: [
      {
        nationCode: "GH",
        nationName: "Ghana",
        region: "africa",
        adoptedYear: 2023,
        stage: "scaling",
      },
      {
        nationCode: "SG",
        nationName: "Singapore",
        region: "asia_pacific",
        adoptedYear: 2023,
        stage: "proven",
      },
      {
        nationCode: "BR",
        nationName: "Brazil",
        region: "latin_america",
        adoptedYear: 2024,
        stage: "scaling",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "hybrid",
      franchiseFee: "$40,000",
      revenueShare: "5% of pharmaceutical manufacturing revenue",
      minCapital: "$500,000",
      adoptingNations: 31,
      notes:
        "Hybrid public-private-cooperative model. National governments provide hub infrastructure; FinFracFran™ operators manage pharmaceutical manufacturing and AI monitoring.",
    },
    aiScore: {
      overall: 95,
      novelty: 91,
      scalability: 96,
      replicability: 93,
      equityImpact: 97,
      analysis:
        "Critical global infrastructure with high urgency. Decentralised ICP architecture provides resilience. FinFracFran™ pharmaceutical manufacturing directly addresses vaccine equity gap.",
    },
    councilId: "health-for-all",
    featured: true,
    submittedBy: "Dr. James Osei, HealthForAll Council",
    submittedDate: "2023-08-01",
    lastUpdated: "2025-09-15",
    imageColor: "oklch(0.7 0.18 150)",
  },
  {
    id: "sol-012",
    code: "NWN-2024-012",
    title: "Climate-Resilient Coastal Agriculture",
    tagline:
      "Saltwater-tolerant crop systems protecting 300M coastal farmers from rising seas.",
    category: "environment",
    stage: "piloting",
    region: "asia_pacific",
    impactScale: "regional",
    problemStatement:
      "Sea level rise and saltwater intrusion threaten 300 million coastal farmers across Asia and Africa. Traditional crops fail in saline soils, forcing migration and food insecurity.",
    approach:
      "Combination of salt-tolerant crop varieties, raised-bed farming with drainage systems, mangrove restoration, and AI salinity monitoring. FinFracFran™ cooperative structure enables shared seed banks, equipment, and AI advisory services across regions.",
    provenResults:
      "3 nations piloting. 12,000 farmers trained. Crop yields sustained at 85% of pre-saltwater-intrusion levels. Mangrove restoration rate: 4,200 hectares/year.",
    impactMetrics: [
      { label: "Farmers Protected", value: "12,000", unit: "trained" },
      { label: "Nations Piloting", value: "3", unit: "nations" },
      { label: "Yield Preservation", value: "85%", unit: "of pre-intrusion" },
      { label: "Mangrove Restored", value: "4,200 ha", unit: "per year" },
    ],
    sdgs: ["sdg13", "sdg2", "sdg14", "sdg15"],
    adoptingNations: [
      {
        nationCode: "BD",
        nationName: "Bangladesh",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
      {
        nationCode: "VN",
        nationName: "Vietnam",
        region: "asia_pacific",
        adoptedYear: 2024,
        stage: "piloting",
      },
    ],
    finFracFran: {
      available: true,
      licenseType: "cooperative",
      franchiseFee: "$7,000",
      revenueShare: "3.5% of crop sales revenue",
      minCapital: "$25,000",
      adoptingNations: 3,
      notes:
        "Cooperative seed banks and shared AI advisory services reduce individual farmer costs by up to 60%.",
    },
    aiScore: {
      overall: 86,
      novelty: 84,
      scalability: 85,
      replicability: 88,
      equityImpact: 92,
      analysis:
        "High urgency with clear climate adaptation mandate. Salt-tolerant crop systems combined with mangrove restoration address both food security and ecosystem resilience. Early pilot stage — more data needed.",
    },
    councilId: "climate-action",
    featured: false,
    submittedBy: "Dr. Nguyen Thi Hoa, ClimateAction Council",
    submittedDate: "2024-01-15",
    lastUpdated: "2025-08-18",
    imageColor: "oklch(0.72 0.18 140)",
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllSolutions(): Solution[] {
  return SOLUTIONS;
}

export function getSolution(id: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.id === id);
}

export function getSolutionsByCategory(category: string): Solution[] {
  if (category === "all") return SOLUTIONS;
  return SOLUTIONS.filter((s) => s.category === category);
}

export function getSolutionsByStage(stage: string): Solution[] {
  return SOLUTIONS.filter((s) => s.stage === stage);
}

export function searchSolutions(query: string): Solution[] {
  const q = query.toLowerCase();
  return SOLUTIONS.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.problemStatement.toLowerCase().includes(q),
  );
}

export interface SolutionStats {
  total: number;
  totalNationsAdopting: number;
  avgAiScore: number;
  finFracFranAvailable: number;
  byCategory: Record<string, number>;
  byStage: Record<string, number>;
}

export function getSolutionStats(): SolutionStats {
  const allNations = new Set<string>();
  let finFracFranCount = 0;
  let totalScore = 0;
  const byCategory: Record<string, number> = {};
  const byStage: Record<string, number> = {};

  for (const s of SOLUTIONS) {
    for (const n of s.adoptingNations) allNations.add(n.nationCode);
    if (s.finFracFran.available) finFracFranCount++;
    totalScore += s.aiScore.overall;
    byCategory[s.category] = (byCategory[s.category] ?? 0) + 1;
    byStage[s.stage] = (byStage[s.stage] ?? 0) + 1;
  }

  return {
    total: SOLUTIONS.length,
    totalNationsAdopting: allNations.size,
    avgAiScore: Math.round(totalScore / SOLUTIONS.length),
    finFracFranAvailable: finFracFranCount,
    byCategory,
    byStage,
  };
}
