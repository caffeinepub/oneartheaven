// ─── Councils of Action Data Layer ───────────────────────────────────────────
// Phase 2.2 — Councils of Action

export type CouncilId =
  | "climate"
  | "health"
  | "peace"
  | "econ"
  | "edu"
  | "tech"
  | "foodwater"
  | "culture"
  | "general";

export type ResolutionStatus =
  | "draft"
  | "deliberating"
  | "voting"
  | "passed"
  | "rejected";

export interface SeatHolder {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  region: string;
  regionFlag: string;
  isChair: boolean;
  joinedYear: number;
}

export interface Subcommittee {
  id: string;
  name: string;
  focus: string;
  lead: string;
  memberCount: number;
}

export interface CouncilResolution {
  id: string;
  title: string;
  status: ResolutionStatus;
  aiScore: number;
  proposalLink?: string;
}

export interface CouncilDetail {
  id: CouncilId;
  name: string;
  shortName: string;
  icon: string;
  accentColor: string;
  mandate: string;
  description: string;
  memberCount: number;
  seatCount: number;
  meetingCadence: string;
  votingModel: {
    quorum: string;
    passThreshold: string;
    weightingBasis: string;
    consensusDescription: string;
    finFracFranNote?: string;
  };
  seatHolders: SeatHolder[];
  subcommittees: Subcommittee[];
  resolutions: CouncilResolution[];
  sdgAlignment: string[];
  finFracFranApplicable: boolean;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const COUNCILS_DATA: CouncilDetail[] = [
  // 1. ClimateAction Hub
  {
    id: "climate",
    name: "ClimateAction Hub",
    shortName: "ClimateAction",
    icon: "🌿",
    accentColor: "oklch(0.65 0.18 145)",
    mandate:
      "Coordinate global climate response, accelerate renewable energy transition, and build community-level disaster resilience across all member nations.",
    description:
      "Drives the most urgent work of our time — decarbonizing the global economy, protecting vulnerable ecosystems, and ensuring climate justice for frontline communities through open-source energy blueprints and FinFracFran™ replication.",
    memberCount: 5200,
    seatCount: 3,
    meetingCadence: "Monthly",
    votingModel: {
      quorum: "60% of registered council members",
      passThreshold: "Two-thirds majority (67%)",
      weightingBasis: "Climate vulnerability index + contribution pledges",
      consensusDescription:
        "Votes are weighted to amplify voices from climate-vulnerable nations (SIDS, LDCs, and frontline communities) while still requiring broad consensus. No single bloc can veto a resolution.",
      finFracFranNote:
        "FinFracFran™ franchise packages enable rapid national adoption of climate action frameworks — a single proven pilot in one city can be licensed and adapted by 50 municipalities within 90 days.",
    },
    seatHolders: [
      {
        id: "climate-s1",
        name: "Dr. Amara Diallo",
        role: "Chair",
        affiliation: "African Climate Institute, Dakar",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "climate-s2",
        name: "Lena Sundqvist",
        role: "Deputy Chair — Renewable Energy",
        affiliation: "Nordic Green Transition Consortium",
        region: "Northern Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "climate-s3",
        name: "Raul Esperanza Torres",
        role: "Lead — Disaster Resilience",
        affiliation: "Pacific-Latin Americas Climate Alliance",
        region: "Latin America",
        regionFlag: "🌎",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "climate-sub1",
        name: "Renewable Energy Blueprints",
        focus:
          "Open-source solar, wind, and micro-hydro deployment guides for all climate zones",
        lead: "Lena Sundqvist",
        memberCount: 142,
      },
      {
        id: "climate-sub2",
        name: "Disaster Response & Resilience",
        focus:
          "Early warning systems, community shelter protocols, and post-disaster rebuild standards",
        lead: "Raul Esperanza Torres",
        memberCount: 98,
      },
      {
        id: "climate-sub3",
        name: "Carbon Accounting & Verification",
        focus:
          "Transparent, on-chain carbon credit issuance and community-verified offset validation",
        lead: "Dr. Amara Diallo",
        memberCount: 76,
      },
    ],
    resolutions: [
      {
        id: "climate-r1",
        title: "Global Open-Source Renewable Energy Blueprints",
        status: "voting",
        aiScore: 94,
        proposalLink: "/assembly",
      },
      {
        id: "climate-r2",
        title: "Mandatory Climate Vulnerability Disclosures for Member States",
        status: "deliberating",
        aiScore: 82,
      },
      {
        id: "climate-r3",
        title: "Pacific Islands Climate Emergency Compact",
        status: "passed",
        aiScore: 96,
        proposalLink: "/assembly",
      },
    ],
    sdgAlignment: ["SDG 13", "SDG 7", "SDG 11"],
    finFracFranApplicable: true,
  },

  // 2. HealthForAll
  {
    id: "health",
    name: "HealthForAll",
    shortName: "HealthForAll",
    icon: "🏥",
    accentColor: "oklch(0.62 0.18 25)",
    mandate:
      "Achieve universal health access through community health worker networks, real-time disease surveillance, and equitable supply chains for medicines and diagnostics.",
    description:
      "Transforms the fractured global health architecture into a living, community-driven network — ensuring geography and income never determine access to life-saving care.",
    memberCount: 4800,
    seatCount: 4,
    meetingCadence: "Bi-monthly",
    votingModel: {
      quorum: "55% of registered council members",
      passThreshold:
        "Simple majority (51%) for operational; 60% for policy frameworks",
      weightingBasis: "Population health burden index + CHW network reach",
      consensusDescription:
        "Deliberation emphasizes lived experience from community health workers and patients alongside scientific expertise. A dedicated seat is reserved for frontline CHW representatives.",
      finFracFranNote:
        "Community health worker training programs are packaged as FinFracFran™ franchises — a proven curriculum from Kenya can be adapted and deployed in Papua New Guinea within weeks.",
    },
    seatHolders: [
      {
        id: "health-s1",
        name: "Dr. Fatima Al-Rashid",
        role: "Chair",
        affiliation: "Arab Public Health Federation, Amman",
        region: "Middle East",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "health-s2",
        name: "Emmanuel Osei",
        role: "Deputy Chair — CHW Networks",
        affiliation: "Community Health Alliance of Ghana",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "health-s3",
        name: "Dr. Priya Chandrasekaran",
        role: "Lead — Disease Surveillance",
        affiliation: "South Asian Epidemiology Consortium",
        region: "South Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "health-s4",
        name: "Ingrid Larsson-Voss",
        role: "Lead — Supply Chain & Equity",
        affiliation: "European Medicines Access Network",
        region: "Northern Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "health-sub1",
        name: "CHW Certification & Training",
        focus:
          "Global standards for community health worker training, certification, and compensation",
        lead: "Emmanuel Osei",
        memberCount: 187,
      },
      {
        id: "health-sub2",
        name: "Pandemic Preparedness & Surveillance",
        focus:
          "Real-time disease monitoring, outbreak response protocols, and open data sharing",
        lead: "Dr. Priya Chandrasekaran",
        memberCount: 134,
      },
      {
        id: "health-sub3",
        name: "Medicines & Diagnostics Access",
        focus:
          "Equitable procurement, local manufacturing incentives, and anti-counterfeiting standards",
        lead: "Ingrid Larsson-Voss",
        memberCount: 112,
      },
    ],
    resolutions: [
      {
        id: "health-r1",
        title: "Universal Community Health Worker Certification Standard",
        status: "deliberating",
        aiScore: 91,
        proposalLink: "/assembly",
      },
      {
        id: "health-r2",
        title: "Open-Source Rapid Diagnostic Protocol Library",
        status: "voting",
        aiScore: 88,
      },
      {
        id: "health-r3",
        title: "Pandemic Early Warning Network Integration",
        status: "passed",
        aiScore: 93,
      },
    ],
    sdgAlignment: ["SDG 3", "SDG 10"],
    finFracFranApplicable: true,
  },

  // 3. PeaceBuilders
  {
    id: "peace",
    name: "PeaceBuilders",
    shortName: "PeaceBuilders",
    icon: "🕊️",
    accentColor: "oklch(0.68 0.14 255)",
    mandate:
      "Prevent violent conflict through early warning systems, support community-led mediation, maintain a living peace accord registry, and create pathways for reconciliation and healing.",
    description:
      "Moves beyond state-centric diplomacy to center communities, civil society, and traditional peacemakers — combining AI-powered conflict early warning with trusted local mediators.",
    memberCount: 3200,
    seatCount: 4,
    meetingCadence: "Bi-monthly",
    votingModel: {
      quorum: "50% of registered council members",
      passThreshold:
        "Three-quarters majority (75%) for conflict intervention measures",
      weightingBasis: "Conflict exposure index + peace process experience",
      consensusDescription:
        "Resolutions involving active conflict zones require a supermajority to protect due process. Affected community representatives have speaking rights in all deliberations, even without a formal seat.",
    },
    seatHolders: [
      {
        id: "peace-s1",
        name: "Ambassador Kofi Mensah-Appiah",
        role: "Chair",
        affiliation: "West African Peace Foundation",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "peace-s2",
        name: "Nadia Volkov",
        role: "Deputy Chair — Mediation",
        affiliation: "Helsinki Dialogue Institute",
        region: "Eastern Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "peace-s3",
        name: "Dr. Leila Karimi",
        role: "Lead — Reconciliation Programs",
        affiliation: "Middle East Peacemakers Network",
        region: "Middle East",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "peace-s4",
        name: "Hiroshi Tanaka",
        role: "Lead — Conflict Early Warning",
        affiliation: "Asia-Pacific Security & Peace Center",
        region: "East Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "peace-sub1",
        name: "Conflict Early Warning AI Lab",
        focus:
          "Machine learning models for conflict prediction, open-source threat dashboards",
        lead: "Hiroshi Tanaka",
        memberCount: 89,
      },
      {
        id: "peace-sub2",
        name: "Community Mediation Network",
        focus:
          "Training and deploying local mediators, traditional conflict resolution methods",
        lead: "Nadia Volkov",
        memberCount: 143,
      },
      {
        id: "peace-sub3",
        name: "Peace Accord Registry & Implementation",
        focus:
          "On-chain peace agreement registry, compliance monitoring, and renegotiation support",
        lead: "Dr. Leila Karimi",
        memberCount: 67,
      },
    ],
    resolutions: [
      {
        id: "peace-r1",
        title: "Global Conflict Early Warning Data Sharing Protocol",
        status: "deliberating",
        aiScore: 85,
      },
      {
        id: "peace-r2",
        title: "Community Mediator Certification & Protection Framework",
        status: "voting",
        aiScore: 89,
      },
      {
        id: "peace-r3",
        title: "On-Chain Peace Accord Registry Launch",
        status: "passed",
        aiScore: 92,
      },
    ],
    sdgAlignment: ["SDG 16", "SDG 17"],
    finFracFranApplicable: false,
  },

  // 4. EconJustice
  {
    id: "econ",
    name: "EconJustice",
    shortName: "EconJustice",
    icon: "⚖️",
    accentColor: "oklch(0.72 0.18 75)",
    mandate:
      "Build fair, resilient economies through fair trade standards, inclusive microfinance networks, cooperative enterprise models, and transparent wealth distribution mechanisms.",
    description:
      "Reimagines the global economy from extractive to regenerative — combining FinFracFran™ cooperative frameworks with open microfinance networks and real-time inequality dashboards.",
    memberCount: 4100,
    seatCount: 4,
    meetingCadence: "Monthly",
    votingModel: {
      quorum: "55% of registered council members",
      passThreshold: "Simple majority (51%)",
      weightingBasis:
        "Economic vulnerability score + cooperative participation rate",
      consensusDescription:
        "Voting weights account for economic diversity, ensuring small cooperatives and emerging market participants have meaningful voice alongside larger institutional members.",
      finFracFranNote:
        "FinFracFran™ is central to this council's mandate — cooperative enterprise models are packaged as franchise frameworks enabling rapid, capital-light adoption with built-in profit-sharing.",
    },
    seatHolders: [
      {
        id: "econ-s1",
        name: "Prof. Celestine Uwimana",
        role: "Chair",
        affiliation: "East African Cooperative Federation",
        region: "East Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "econ-s2",
        name: "Carlos Vázquez Herrera",
        role: "Deputy Chair — Fair Trade",
        affiliation: "Latin America Fair Trade Coalition",
        region: "Latin America",
        regionFlag: "🌎",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "econ-s3",
        name: "Sunita Patel",
        role: "Lead — Microfinance Networks",
        affiliation: "South Asian Microfinance Alliance",
        region: "South Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "econ-s4",
        name: "Marcus Johansson",
        role: "Lead — Inequality Dashboards",
        affiliation: "Nordic Economic Justice Institute",
        region: "Northern Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "econ-sub1",
        name: "FinFracFran™ Cooperative Enterprise Lab",
        focus:
          "Designing and distributing cooperative enterprise franchise frameworks at all scales",
        lead: "Prof. Celestine Uwimana",
        memberCount: 156,
      },
      {
        id: "econ-sub2",
        name: "Fair Trade Standards & Registry",
        focus:
          "Open-source fair trade certification, supply chain transparency, and ethical sourcing",
        lead: "Carlos Vázquez Herrera",
        memberCount: 98,
      },
      {
        id: "econ-sub3",
        name: "Inclusive Microfinance Network",
        focus:
          "Connecting community lending circles globally via ICP-based transparent lending protocols",
        lead: "Sunita Patel",
        memberCount: 121,
      },
    ],
    resolutions: [
      {
        id: "econ-r1",
        title: "FinFracFran™ Municipal Cooperative Housing Framework",
        status: "passed",
        aiScore: 90,
        proposalLink: "/assembly",
      },
      {
        id: "econ-r2",
        title: "Global Fair Trade Digital Certification Standard",
        status: "deliberating",
        aiScore: 84,
      },
      {
        id: "econ-r3",
        title: "Open Microfinance Protocol on ICP",
        status: "voting",
        aiScore: 87,
      },
    ],
    sdgAlignment: ["SDG 8", "SDG 10", "SDG 1"],
    finFracFranApplicable: true,
  },

  // 5. EduVerse
  {
    id: "edu",
    name: "EduVerse",
    shortName: "EduVerse",
    icon: "📚",
    accentColor: "oklch(0.65 0.18 295)",
    mandate:
      "Open the world's best knowledge to every learner through open curriculum sharing, teacher exchange programs, literacy campaigns, and youth-led education innovation.",
    description:
      "Dismantles barriers to quality education through FinFracFran™ education franchises — a proven school model from Finland can be adapted for rural Mozambique, and a Brazilian curriculum can reach classrooms in Bangladesh.",
    memberCount: 5600,
    seatCount: 4,
    meetingCadence: "Monthly",
    votingModel: {
      quorum: "50% of registered council members",
      passThreshold: "Simple majority (51%)",
      weightingBasis: "Literacy gap index + teacher network reach",
      consensusDescription:
        "Youth delegates (under 25) hold 20% of effective voting weight, recognizing that education policy must be co-designed with learners. Open deliberation ensures every pedagogical tradition has a voice.",
      finFracFranNote:
        "Education curricula are distributed as FinFracFran™ packages — modular, translatable, and locally adaptable while maintaining quality standards and sharing innovations back to the global commons.",
    },
    seatHolders: [
      {
        id: "edu-s1",
        name: "Dr. Yewande Adeyemi",
        role: "Chair",
        affiliation: "Pan-African Open Education Initiative",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "edu-s2",
        name: "Mei-Ling Chow",
        role: "Deputy Chair — Open Curriculum",
        affiliation: "Southeast Asian Education Commons",
        region: "Southeast Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "edu-s3",
        name: "Tomás Reyes Molina",
        role: "Lead — Teacher Exchange",
        affiliation: "Latin American Pedagogy Network",
        region: "Latin America",
        regionFlag: "🌎",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "edu-s4",
        name: "Aïsha Kouyaté",
        role: "Youth Lead — Literacy Campaigns",
        affiliation: "West African Youth Education Movement",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "edu-sub1",
        name: "Open Curriculum Commons",
        focus:
          "Creative Commons education resources in 50+ languages, peer-reviewed and community-adapted",
        lead: "Mei-Ling Chow",
        memberCount: 213,
      },
      {
        id: "edu-sub2",
        name: "Global Teacher Exchange",
        focus:
          "Cross-border teacher placement, professional development credits, and mentorship networks",
        lead: "Tomás Reyes Molina",
        memberCount: 167,
      },
      {
        id: "edu-sub3",
        name: "Youth Literacy & Innovation Labs",
        focus:
          "Community literacy campaigns, youth-run innovation clubs, and maker spaces",
        lead: "Aïsha Kouyaté",
        memberCount: 189,
      },
    ],
    resolutions: [
      {
        id: "edu-r1",
        title: "Open Curriculum Commons — Global Launch",
        status: "passed",
        aiScore: 91,
      },
      {
        id: "edu-r2",
        title: "AI Ethics in Education Framework",
        status: "deliberating",
        aiScore: 83,
        proposalLink: "/assembly",
      },
      {
        id: "edu-r3",
        title: "Global Teacher Recognition & Exchange Protocol",
        status: "voting",
        aiScore: 88,
      },
    ],
    sdgAlignment: ["SDG 4", "SDG 5"],
    finFracFranApplicable: true,
  },

  // 6. TechForAll
  {
    id: "tech",
    name: "TechForAll",
    shortName: "TechForAll",
    icon: "💡",
    accentColor: "oklch(0.62 0.16 215)",
    mandate:
      "Accelerate digital inclusion through open-source technology, govern artificial intelligence ethically, and ensure ICP decentralized infrastructure serves all communities equally.",
    description:
      "Governs the technological foundation of ONEartHeaven and advocates for the global digital commons — ensuring technology remains a tool for liberation rather than concentration of power.",
    memberCount: 3900,
    seatCount: 4,
    meetingCadence: "Bi-weekly",
    votingModel: {
      quorum: "55% of registered council members",
      passThreshold: "Two-thirds majority (67%) for AI governance measures",
      weightingBasis: "Digital access gap + open-source contribution index",
      consensusDescription:
        "Technical expertise is balanced with community impact testimony. For AI-related resolutions, affected community representatives must have formal deliberation time before any vote.",
      finFracFranNote:
        "Open-source technology stacks are packaged as FinFracFran™ deployment kits — pre-configured, locally adaptable, and connected back to the global improvement commons.",
    },
    seatHolders: [
      {
        id: "tech-s1",
        name: "Kiri Waititi",
        role: "Chair",
        affiliation: "Pacific Digital Inclusion Foundation",
        region: "Pacific Islands",
        regionFlag: "🌏",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "tech-s2",
        name: "Dr. Oluwaseun Adeniyi",
        role: "Deputy Chair — Open Source",
        affiliation: "African Tech Commons Initiative",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "tech-s3",
        name: "Valentina Marchetti",
        role: "Lead — AI Ethics",
        affiliation: "European AI Safety & Ethics Council",
        region: "Southern Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "tech-s4",
        name: "Ravi Krishnamurthy",
        role: "Lead — ICP Infrastructure",
        affiliation: "India Decentralized Tech Consortium",
        region: "South Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "tech-sub1",
        name: "AI Ethics Governance Lab",
        focus:
          "AI charter development, algorithmic accountability, community impact assessment standards",
        lead: "Valentina Marchetti",
        memberCount: 134,
      },
      {
        id: "tech-sub2",
        name: "Open Source & Digital Commons",
        focus:
          "Curating, funding, and distributing open-source tools for global development use cases",
        lead: "Dr. Oluwaseun Adeniyi",
        memberCount: 178,
      },
      {
        id: "tech-sub3",
        name: "ICP Node & DePin Infrastructure",
        focus:
          "Decentralized infrastructure expansion, node onboarding, and resilience standards",
        lead: "Ravi Krishnamurthy",
        memberCount: 89,
      },
    ],
    resolutions: [
      {
        id: "tech-r1",
        title: "AI Ethics Charter Addendum — Community Rights",
        status: "draft",
        aiScore: 79,
        proposalLink: "/assembly",
      },
      {
        id: "tech-r2",
        title: "Open Source Tech Stack for Global Development",
        status: "passed",
        aiScore: 92,
      },
      {
        id: "tech-r3",
        title: "Digital Identity & Sovereignty Framework",
        status: "deliberating",
        aiScore: 86,
      },
    ],
    sdgAlignment: ["SDG 9", "SDG 17"],
    finFracFranApplicable: true,
  },

  // 7. FoodWater Sovereignty
  {
    id: "foodwater",
    name: "FoodWater Sovereignty",
    shortName: "FoodWater",
    icon: "🌾",
    accentColor: "oklch(0.68 0.2 55)",
    mandate:
      "Guarantee food and water security for all communities through agricultural innovation, fair water governance, famine prevention intelligence, and regenerative land stewardship.",
    description:
      "Addresses the most fundamental human rights through agroecological innovation, AI-powered famine early warning, and FinFracFran™ food cooperative networks that build resilient local food systems.",
    memberCount: 4400,
    seatCount: 4,
    meetingCadence: "Monthly",
    votingModel: {
      quorum: "55% of registered council members",
      passThreshold:
        "Simple majority (51%); 65% for emergency food aid mobilization",
      weightingBasis:
        "Food insecurity index + smallholder farmer representation",
      consensusDescription:
        "Smallholder farmers and indigenous food system custodians have guaranteed speaking rights, ensuring traditional ecological knowledge informs every resolution alongside agronomic science.",
      finFracFranNote:
        "FinFracFran™ food cooperative networks allow proven agroecological models to be adopted across similar climate and soil contexts worldwide, from community seed banks to water harvesting systems.",
    },
    seatHolders: [
      {
        id: "foodwater-s1",
        name: "Grace Mutua",
        role: "Chair",
        affiliation: "East African Smallholder Federation",
        region: "East Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "foodwater-s2",
        name: "Dr. Arjun Mehta",
        role: "Deputy Chair — Agricultural Innovation",
        affiliation: "South Asian Agroecology Consortium",
        region: "South Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "foodwater-s3",
        name: "María del Carmen Reyes",
        role: "Lead — Water Governance",
        affiliation: "Andean Water & Communities Alliance",
        region: "Latin America",
        regionFlag: "🌎",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "foodwater-s4",
        name: "Ibrahim Al-Farsi",
        role: "Lead — Famine Prevention",
        affiliation: "MENA Food Security Institute",
        region: "Middle East",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "foodwater-sub1",
        name: "Regenerative Agriculture Lab",
        focus:
          "Open-source agroecological practices, community seed banks, and soil restoration guides",
        lead: "Dr. Arjun Mehta",
        memberCount: 156,
      },
      {
        id: "foodwater-sub2",
        name: "Community Water Governance",
        focus:
          "Participatory water management, watershed restoration, and WASH infrastructure standards",
        lead: "María del Carmen Reyes",
        memberCount: 123,
      },
      {
        id: "foodwater-sub3",
        name: "Famine Early Warning Network",
        focus:
          "AI-integrated food system monitoring, emergency response triggers, and aid coordination",
        lead: "Ibrahim Al-Farsi",
        memberCount: 87,
      },
    ],
    resolutions: [
      {
        id: "foodwater-r1",
        title: "Open Seed Bank & Agroecological Commons",
        status: "passed",
        aiScore: 93,
      },
      {
        id: "foodwater-r2",
        title: "Community Water Rights Charter",
        status: "deliberating",
        aiScore: 88,
      },
      {
        id: "foodwater-r3",
        title: "AI Famine Early Warning Global Integration",
        status: "voting",
        aiScore: 91,
      },
    ],
    sdgAlignment: ["SDG 2", "SDG 6"],
    finFracFranApplicable: true,
  },

  // 8. CultureBridge
  {
    id: "culture",
    name: "CultureBridge",
    shortName: "CultureBridge",
    icon: "🎭",
    accentColor: "oklch(0.62 0.2 355)",
    mandate:
      "Protect, celebrate, and exchange the world's cultural heritage through arts programs, endangered language preservation, intercultural dialogue, and heritage site protection.",
    description:
      "Recognizes that cultural diversity is humanity's greatest collective treasure — from protecting endangered languages to creating intercultural exchange residencies that weave a richer, more empathetic global community.",
    memberCount: 2800,
    seatCount: 3,
    meetingCadence: "Quarterly",
    votingModel: {
      quorum: "45% of registered council members",
      passThreshold: "Simple majority (51%)",
      weightingBasis: "Cultural diversity index + heritage at-risk assessment",
      consensusDescription:
        "Indigenous cultural custodians and diaspora communities hold reserved deliberation slots, ensuring communities whose culture is most at stake drive the resolutions that protect it.",
    },
    seatHolders: [
      {
        id: "culture-s1",
        name: "Dr. Naledi Dlamini",
        role: "Chair",
        affiliation: "Southern African Cultural Heritage Network",
        region: "Southern Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "culture-s2",
        name: "Saoirse Ní Bhriain",
        role: "Deputy Chair — Language Preservation",
        affiliation: "European Minority Languages Council",
        region: "Western Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "culture-s3",
        name: "Kenji Watanabe",
        role: "Lead — Intercultural Exchange",
        affiliation: "Asia-Pacific Arts & Culture Foundation",
        region: "East Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "culture-sub1",
        name: "Endangered Languages Archive",
        focus:
          "Digital preservation, revitalization programs, and intergenerational transmission support",
        lead: "Saoirse Ní Bhriain",
        memberCount: 98,
      },
      {
        id: "culture-sub2",
        name: "Global Arts Exchange",
        focus:
          "Artist-in-residence programs, cultural festival networks, and open arts commons",
        lead: "Kenji Watanabe",
        memberCount: 134,
      },
      {
        id: "culture-sub3",
        name: "Heritage Protection & Repatriation",
        focus:
          "Cultural artifact registries, repatriation frameworks, and site protection protocols",
        lead: "Dr. Naledi Dlamini",
        memberCount: 76,
      },
    ],
    resolutions: [
      {
        id: "culture-r1",
        title: "Global Endangered Languages Digital Archive",
        status: "passed",
        aiScore: 89,
      },
      {
        id: "culture-r2",
        title: "Cultural Heritage Site Emergency Protection Protocol",
        status: "deliberating",
        aiScore: 82,
      },
      {
        id: "culture-r3",
        title: "Intercultural Arts Residency Exchange Program",
        status: "voting",
        aiScore: 85,
      },
    ],
    sdgAlignment: ["SDG 11", "SDG 10"],
    finFracFranApplicable: false,
  },

  // 9. General Assembly
  {
    id: "general",
    name: "General Assembly",
    shortName: "Gen. Assembly",
    icon: "🌐",
    accentColor: "oklch(0.72 0.16 75)",
    mandate:
      "Oversee cross-cutting governance matters, coordinate inter-council collaboration, steward Charter amendments, and ensure the integrity of ONEartHeaven's decentralized governance architecture.",
    description:
      "The capstone of ONEartHeaven's governance architecture — where all thematic councils converge, the guardian of the founding Charter, and the body that ensures no single interest group captures the whole.",
    memberCount: 8900,
    seatCount: 4,
    meetingCadence: "Monthly",
    votingModel: {
      quorum: "65% of registered council members",
      passThreshold: "Two-thirds majority (67%); 80% for Charter amendments",
      weightingBasis:
        "Equal weighting across all registered member communities",
      consensusDescription:
        "The most democratic body — no vulnerability weighting, no expertise bonus. Every registered member community has an equal voice. Charter amendments require 80% supermajority and a 30-day public deliberation period.",
      finFracFranNote:
        "FinFracFran™ governance packages allow ONEartHeaven's entire governance architecture to be adopted by cities, regions, and international bodies seeking decentralized, transparent governance.",
    },
    seatHolders: [
      {
        id: "general-s1",
        name: "Secretary-General Amina Osei-Bonsu",
        role: "Chair (Secretary-General)",
        affiliation: "ONEartHeaven Secretariat",
        region: "West Africa",
        regionFlag: "🌍",
        isChair: true,
        joinedYear: 2024,
      },
      {
        id: "general-s2",
        name: "Deputy SG Dmitri Volkov",
        role: "Deputy Chair — Inter-Council Coordination",
        affiliation: "ONEartHeaven Secretariat",
        region: "Eastern Europe",
        regionFlag: "🌍",
        isChair: false,
        joinedYear: 2024,
      },
      {
        id: "general-s3",
        name: "Ana Beatriz Santos",
        role: "Chief Transparency Officer",
        affiliation: "ONEartHeaven Transparency Office",
        region: "Latin America",
        regionFlag: "🌎",
        isChair: false,
        joinedYear: 2025,
      },
      {
        id: "general-s4",
        name: "Riya Sharma",
        role: "Chief AI Officer",
        affiliation: "ONEartHeaven AI Ethics Office",
        region: "South Asia",
        regionFlag: "🌏",
        isChair: false,
        joinedYear: 2025,
      },
    ],
    subcommittees: [
      {
        id: "general-sub1",
        name: "Charter Review & Amendment Committee",
        focus:
          "Stewarding the living constitution, managing amendment processes, and constitutional integrity",
        lead: "Secretary-General Amina Osei-Bonsu",
        memberCount: 45,
      },
      {
        id: "general-sub2",
        name: "Inter-Council Coordination Desk",
        focus:
          "Resolving jurisdictional overlaps, facilitating joint resolutions, and cross-council reporting",
        lead: "Deputy SG Dmitri Volkov",
        memberCount: 38,
      },
      {
        id: "general-sub3",
        name: "Transparency & Integrity Watchdog",
        focus:
          "On-chain audit trails, conflict of interest disclosures, and anti-corruption protocols",
        lead: "Ana Beatriz Santos",
        memberCount: 67,
      },
    ],
    resolutions: [
      {
        id: "general-r1",
        title: "FinFracFran™ Governance Package — Official Adoption",
        status: "passed",
        aiScore: 95,
      },
      {
        id: "general-r2",
        title: "Charter Article VII Amendment — Youth Voting Rights",
        status: "deliberating",
        aiScore: 90,
        proposalLink: "/charter",
      },
      {
        id: "general-r3",
        title: "Multi-Wallet & Multi-Lingual Platform Standard",
        status: "voting",
        aiScore: 88,
      },
    ],
    sdgAlignment: ["SDG 16", "SDG 17"],
    finFracFranApplicable: true,
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllCouncils(): CouncilDetail[] {
  return COUNCILS_DATA;
}

export function getCouncilById(id: string): CouncilDetail | undefined {
  return COUNCILS_DATA.find((c) => c.id === id);
}

export function getCouncilStats(): {
  totalCouncils: number;
  totalSeats: number;
  totalMembers: number;
  activeResolutions: number;
} {
  const totalSeats = COUNCILS_DATA.reduce((sum, c) => sum + c.seatCount, 0);
  const totalMembers = COUNCILS_DATA.reduce((sum, c) => sum + c.memberCount, 0);
  const activeResolutions = COUNCILS_DATA.reduce((sum, c) => {
    return (
      sum +
      c.resolutions.filter(
        (r) => r.status === "deliberating" || r.status === "voting",
      ).length
    );
  }, 0);

  return {
    totalCouncils: COUNCILS_DATA.length,
    totalSeats,
    totalMembers,
    activeResolutions,
  };
}
