import type { ActionPortal } from "./portalTypes";

export const ALL_PORTALS: ActionPortal[] = [
  {
    councilId: "climate",
    name: "ClimateAction Hub",
    shortName: "ClimateAction",
    icon: "🌿",
    accentColor: "oklch(0.65 0.18 145)",
    tagline:
      "Accelerating the global transition to a regenerative, zero-carbon civilization.",
    mandate:
      "Drive urgent, equitable climate action through open-source clean energy blueprints, community resilience programs, and FinFracFran™ franchise replication of proven low-carbon solutions worldwide.",
    volunteerCount: 4820,
    nationCount: 74,
    sdgAlignment: ["SDG 7", "SDG 11", "SDG 13", "SDG 15", "SDG 17"],
    impactStats: [
      {
        label: "Tonnes CO₂ Avoided",
        value: 2400000,
        unit: "tonnes_co2",
        trend: "up",
        trendPct: 18,
      },
      {
        label: "Nations Adopting",
        value: 74,
        unit: "nations",
        trend: "up",
        trendPct: 12,
      },
      {
        label: "Active Volunteers",
        value: 4820,
        unit: "people",
        trend: "up",
        trendPct: 9,
      },
      {
        label: "Communities Reached",
        value: 1340,
        unit: "communities",
        trend: "up",
        trendPct: 22,
      },
    ],
    initiatives: [
      {
        id: "cli-1",
        title: "Solar Microgrid Network Expansion",
        description:
          "Deploying open-source solar microgrid kits to 500 off-grid communities across Sub-Saharan Africa and Southeast Asia, enabling energy sovereignty and local manufacturing.",
        status: "active",
        progress: 67,
        leadOrg: "Africa Renewable Energy Alliance",
        region: "Sub-Saharan Africa & SE Asia",
        startDate: "2024-03-01",
        targetDate: "2025-12-31",
        participantCount: 2340,
        sdgTags: ["SDG 7", "SDG 13"],
        finFracFranEnabled: true,
      },
      {
        id: "cli-2",
        title: "Climate Refugee Legal Aid Network",
        description:
          "Providing legal support and documentation services for communities displaced by climate-related disasters, partnering with local bar associations and international legal aid societies.",
        status: "active",
        progress: 41,
        leadOrg: "Global Climate Justice Coalition",
        region: "Pacific Islands & South Asia",
        startDate: "2024-07-01",
        targetDate: "2026-06-30",
        participantCount: 890,
        sdgTags: ["SDG 13", "SDG 16"],
        finFracFranEnabled: false,
      },
      {
        id: "cli-3",
        title: "Youth Climate Leadership Training",
        description:
          "A 12-week curriculum equipping young leaders aged 16–28 with climate science, policy advocacy, and community organizing skills, delivered in 10 languages.",
        status: "launching",
        progress: 12,
        leadOrg: "EduVerse Climate Track",
        region: "Global",
        startDate: "2025-01-15",
        targetDate: "2025-12-31",
        participantCount: 320,
        sdgTags: ["SDG 4", "SDG 13", "SDG 17"],
        finFracFranEnabled: true,
      },
    ],
    resources: [
      {
        id: "cli-r1",
        title: "Community Solar Blueprint v3",
        description:
          "Complete technical guide for deploying and maintaining community-owned solar microgrids, including BOM, wiring diagrams, and maintenance schedules.",
        type: "toolkit",
        downloadCount: 8420,
        language: "EN / ES / FR / SW",
        url: "#",
        featured: true,
      },
      {
        id: "cli-r2",
        title: "Climate Vulnerability Assessment Guide",
        description:
          "Step-by-step methodology for assessing community-level climate vulnerability, including participatory mapping tools and risk scoring frameworks.",
        type: "guide",
        downloadCount: 4210,
        language: "EN / FR / PT",
        url: "#",
        featured: false,
      },
      {
        id: "cli-r3",
        title: "Carbon Accounting Template Suite",
        description:
          "Spreadsheet and reporting templates for municipal and cooperative carbon accounting aligned with IPCC Tier 1–3 methodologies.",
        type: "template",
        downloadCount: 3180,
        language: "EN / DE",
        url: "#",
        featured: false,
      },
      {
        id: "cli-r4",
        title: "IPCC Community Summary Dataset 2024",
        description:
          "Curated dataset of key IPCC AR6 findings with community-accessible summaries and region-specific projections.",
        type: "dataset",
        downloadCount: 2940,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "cli-p1",
        name: "Africa Renewable Energy Alliance",
        type: "ngo",
        region: "East Africa",
        description:
          "Pan-African coalition accelerating community-owned clean energy adoption across 32 countries.",
        memberSince: "2023",
      },
      {
        id: "cli-p2",
        name: "Nordic Green Consortium",
        type: "academic",
        region: "Northern Europe",
        description:
          "Research consortium providing technical standards and impact evaluation for open-source clean energy projects.",
        memberSince: "2023",
      },
      {
        id: "cli-p3",
        name: "Pacific Climate Foundation",
        type: "government",
        region: "Pacific",
        description:
          "Inter-governmental body representing 14 Pacific island nations in global climate negotiations and adaptation planning.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "cli-v1",
        title: "Solar Installation Trainer",
        description:
          "Train local technicians in community solar installation, maintenance, and troubleshooting using open-source blueprints.",
        skills: ["technical", "field"],
        commitment: "3 months, 20 hrs/week",
        openSlots: 48,
        region: "Global (field-based)",
      },
      {
        id: "cli-v2",
        title: "Community Climate Educator",
        description:
          "Facilitate climate literacy workshops and help communities develop local adaptation plans using our participatory toolkit.",
        skills: ["community", "advocacy"],
        commitment: "Flexible, 8 hrs/week",
        openSlots: 120,
        region: "Global (remote/hybrid)",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "Proven solar microgrid models are licensed as FinFracFran™ franchise packages, enabling any cooperative, municipality, or NGO to replicate a fully operational community energy system within 90 days.",
      adoptingNations: 12,
      adoptingCities: 47,
      licenseType: "Community Cooperative License",
      replicationTime: "90 days",
      successStory:
        '"In Kisumu, Kenya, a fishing cooperative licensed our microgrid package in March 2024. By June, 340 households had 24/7 clean power — cutting energy costs by 60% and enabling three new cottage industries. The same package was adapted in coastal Bangladesh six weeks later." — Amara Diallo, ClimateAction Hub Coordinator',
    },
  },
  {
    councilId: "health",
    name: "HealthForAll",
    shortName: "HealthForAll",
    icon: "🏥",
    accentColor: "oklch(0.62 0.18 25)",
    tagline:
      "Universal, community-rooted health systems — no one left outside.",
    mandate:
      "Expand community health worker networks, open-source medical protocols, and FinFracFran™ health cooperative franchises to achieve universal primary care access in underserved regions.",
    volunteerCount: 6140,
    nationCount: 89,
    sdgAlignment: ["SDG 3", "SDG 10", "SDG 17"],
    impactStats: [
      {
        label: "People Reached",
        value: 8700000,
        unit: "people",
        trend: "up",
        trendPct: 24,
      },
      {
        label: "Nations with CHW Networks",
        value: 89,
        unit: "nations",
        trend: "up",
        trendPct: 14,
      },
      {
        label: "Active Volunteers",
        value: 6140,
        unit: "people",
        trend: "up",
        trendPct: 11,
      },
      {
        label: "Health Cooperatives",
        value: 412,
        unit: "communities",
        trend: "up",
        trendPct: 31,
      },
    ],
    initiatives: [
      {
        id: "hlt-1",
        title: "Universal CHW Certification Rollout",
        description:
          "Standardizing community health worker training and certification across 89 nations using an open-source curriculum validated by WHO-aligned partners.",
        status: "active",
        progress: 72,
        leadOrg: "Global Health Commons Initiative",
        region: "Sub-Saharan Africa & South Asia",
        startDate: "2023-09-01",
        targetDate: "2025-09-01",
        participantCount: 3100,
        sdgTags: ["SDG 3", "SDG 17"],
        finFracFranEnabled: true,
      },
      {
        id: "hlt-2",
        title: "Maternal Health Emergency Protocol",
        description:
          "Deploying open-source maternal emergency care protocols and supply kits to 200 rural health posts lacking obstetric specialists.",
        status: "active",
        progress: 54,
        leadOrg: "Midwives Without Borders",
        region: "West Africa & Central Asia",
        startDate: "2024-02-01",
        targetDate: "2026-01-31",
        participantCount: 1240,
        sdgTags: ["SDG 3"],
        finFracFranEnabled: false,
      },
      {
        id: "hlt-3",
        title: "Mental Health First Response Training",
        description:
          "Equipping community volunteers with evidence-based mental health first aid skills, particularly for post-conflict and climate-displaced communities.",
        status: "launching",
        progress: 18,
        leadOrg: "PeaceBuilders Mental Health Taskforce",
        region: "Middle East & Horn of Africa",
        startDate: "2025-02-01",
        targetDate: "2025-12-31",
        participantCount: 480,
        sdgTags: ["SDG 3", "SDG 16"],
        finFracFranEnabled: true,
      },
    ],
    resources: [
      {
        id: "hlt-r1",
        title: "Open-Source CHW Curriculum v4",
        description:
          "Complete 6-month training curriculum for community health workers covering primary care, maternal health, and disease surveillance.",
        type: "toolkit",
        downloadCount: 11240,
        language: "EN / FR / SW / HI",
        url: "#",
        featured: true,
      },
      {
        id: "hlt-r2",
        title: "Community Health Diagnostic Guide",
        description:
          "Field-ready clinical decision trees and triage protocols for community health workers operating without specialist support.",
        type: "guide",
        downloadCount: 6820,
        language: "EN / ES / AR",
        url: "#",
        featured: false,
      },
      {
        id: "hlt-r3",
        title: "Essential Medicines Supply Template",
        description:
          "Procurement and inventory management templates for community health cooperatives managing essential medicines supply chains.",
        type: "template",
        downloadCount: 3940,
        language: "EN / FR",
        url: "#",
        featured: false,
      },
      {
        id: "hlt-r4",
        title: "Global Disease Burden Dataset 2024",
        description:
          "Curated WHO and academic dataset on disease burden by region, with community-level disaggregation for health planning.",
        type: "dataset",
        downloadCount: 4210,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "hlt-p1",
        name: "Global Health Commons Initiative",
        type: "ngo",
        region: "Global",
        description:
          "Leading open-source medical protocol development and CHW network coordination across 89 nations.",
        memberSince: "2023",
      },
      {
        id: "hlt-p2",
        name: "Aga Khan Health Sciences University",
        type: "academic",
        region: "South Asia",
        description:
          "Academic partner providing clinical validation for open-source CHW curricula and protocols.",
        memberSince: "2023",
      },
      {
        id: "hlt-p3",
        name: "Rwandan Ministry of Health",
        type: "government",
        region: "East Africa",
        description:
          "Pioneer in community health worker scale-up, sharing proven national models for FinFracFran™ replication.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "hlt-v1",
        title: "CHW Curriculum Translator",
        description:
          "Translate and culturally adapt the open-source CHW curriculum into local languages and health contexts.",
        skills: ["research", "community"],
        commitment: "2 months, 10 hrs/week",
        openSlots: 64,
        region: "Remote",
      },
      {
        id: "hlt-v2",
        title: "Community Health Coordinator",
        description:
          "Support local health cooperatives in implementing CHW networks and collecting impact data.",
        skills: ["community", "field"],
        commitment: "6 months, 15 hrs/week",
        openSlots: 38,
        region: "Field-based",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "The CHW Cooperative Model is licensed as a FinFracFran™ franchise, enabling any village health committee or cooperative to stand up a fully functional primary care network in under 60 days.",
      adoptingNations: 18,
      adoptingCities: 124,
      licenseType: "Health Cooperative License",
      replicationTime: "60 days",
      successStory:
        '"Our cooperative in Imo State, Nigeria licensed the CHW package in early 2024. By the end of Q2, we had 28 certified health workers serving 14,000 people — and trained our first cohort of trainers to carry it forward." — Dr. Ngozi Okafor, HealthForAll Nigeria Lead',
    },
  },
  {
    councilId: "peace",
    name: "PeaceBuilders",
    shortName: "PeaceBuilders",
    icon: "🕊️",
    accentColor: "oklch(0.68 0.14 255)",
    tagline:
      "From conflict hotspots to lasting coexistence — locally led, globally backed.",
    mandate:
      "Deploy early warning networks, community mediation systems, and intercultural dialogue programs to prevent, de-escalate, and transform conflicts from the grassroots up.",
    volunteerCount: 2980,
    nationCount: 52,
    sdgAlignment: ["SDG 16", "SDG 10", "SDG 17"],
    impactStats: [
      {
        label: "Conflicts De-escalated",
        value: 214,
        unit: "communities",
        trend: "up",
        trendPct: 8,
      },
      {
        label: "Nations with Early Warning",
        value: 52,
        unit: "nations",
        trend: "up",
        trendPct: 15,
      },
      {
        label: "Active Mediators",
        value: 2980,
        unit: "people",
        trend: "up",
        trendPct: 6,
      },
      {
        label: "Dialogue Circles Held",
        value: 4820,
        unit: "communities",
        trend: "up",
        trendPct: 19,
      },
    ],
    initiatives: [
      {
        id: "pce-1",
        title: "Conflict Early Warning & Response Network",
        description:
          "Building a decentralized network of community monitors and local mediators linked to a real-time early warning dashboard, covering 52 active conflict zones.",
        status: "active",
        progress: 58,
        leadOrg: "Frontline Peacemakers Network",
        region: "Sub-Saharan Africa & Middle East",
        startDate: "2024-01-01",
        targetDate: "2026-01-01",
        participantCount: 1840,
        sdgTags: ["SDG 16", "SDG 17"],
        finFracFranEnabled: false,
      },
      {
        id: "pce-2",
        title: "Intercultural Reconciliation Dialogues",
        description:
          "Structured dialogue series bringing together community leaders across ethnic, religious, and political divides using proven restorative justice methodologies.",
        status: "active",
        progress: 44,
        leadOrg: "Ubuntu Dialogue Institute",
        region: "East & West Africa",
        startDate: "2024-04-01",
        targetDate: "2025-12-31",
        participantCount: 920,
        sdgTags: ["SDG 10", "SDG 16"],
        finFracFranEnabled: false,
      },
      {
        id: "pce-3",
        title: "Youth Peace Ambassador Training",
        description:
          "Six-month intensive for young community leaders in mediation, nonviolent communication, and conflict transformation, with field mentorship placements.",
        status: "launching",
        progress: 8,
        leadOrg: "Global Youth Peace Corps",
        region: "Global",
        startDate: "2025-03-01",
        targetDate: "2025-09-30",
        participantCount: 240,
        sdgTags: ["SDG 4", "SDG 16"],
        finFracFranEnabled: false,
      },
    ],
    resources: [
      {
        id: "pce-r1",
        title: "Community Mediation Handbook",
        description:
          "Practical guide for community mediators covering facilitation techniques, power dynamics, and conflict transformation frameworks.",
        type: "guide",
        downloadCount: 5640,
        language: "EN / FR / AR / SW",
        url: "#",
        featured: true,
      },
      {
        id: "pce-r2",
        title: "Early Warning Data Dashboard Template",
        description:
          "Open-source template for building a community-level conflict early warning monitoring dashboard.",
        type: "template",
        downloadCount: 2840,
        language: "EN",
        url: "#",
        featured: false,
      },
      {
        id: "pce-r3",
        title: "Nonviolent Communication Toolkit",
        description:
          "Workshop facilitation kit for training communities in NVC principles and restorative dialogue practices.",
        type: "toolkit",
        downloadCount: 4120,
        language: "EN / ES / FR / AR",
        url: "#",
        featured: false,
      },
      {
        id: "pce-r4",
        title: "Global Conflict Hotspot Dataset",
        description:
          "Anonymized dataset of conflict triggers, escalation patterns, and de-escalation outcomes from 214 community cases.",
        type: "dataset",
        downloadCount: 1980,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "pce-p1",
        name: "Frontline Peacemakers Network",
        type: "ngo",
        region: "Global",
        description:
          "Coalition of 1,200 community mediators operating in active conflict zones across 40 nations.",
        memberSince: "2023",
      },
      {
        id: "pce-p2",
        name: "Uppsala Conflict Data Program",
        type: "academic",
        region: "Northern Europe",
        description:
          "Leading academic provider of structured conflict data and early warning methodology.",
        memberSince: "2023",
      },
      {
        id: "pce-p3",
        name: "AU Peace & Security Council Observers",
        type: "government",
        region: "Africa",
        description:
          "African Union observer partners providing diplomatic channel access for high-stakes mediation.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "pce-v1",
        title: "Community Mediator",
        description:
          "Facilitate structured dialogue and mediation sessions in conflict-affected communities using PeaceBuilders methodologies.",
        skills: ["community", "field", "advocacy"],
        commitment: "4 months, 15 hrs/week",
        openSlots: 72,
        region: "Field-based",
      },
      {
        id: "pce-v2",
        title: "Early Warning Data Analyst",
        description:
          "Monitor and analyze community early warning signals, updating risk dashboards and flagging escalation indicators.",
        skills: ["research", "technical"],
        commitment: "Flexible, 10 hrs/week",
        openSlots: 36,
        region: "Remote",
      },
    ],
  },
  {
    councilId: "econ",
    name: "EconJustice",
    shortName: "EconJustice",
    icon: "⚖️",
    accentColor: "oklch(0.72 0.18 75)",
    tagline:
      "Cooperative economies that work for everyone — not just shareholders.",
    mandate:
      "Advance economic justice through cooperative enterprise models, municipal housing frameworks, universal basic services pilots, and FinFracFran™ franchise scaling of proven equitable economic systems.",
    volunteerCount: 3410,
    nationCount: 61,
    sdgAlignment: ["SDG 1", "SDG 8", "SDG 10", "SDG 11", "SDG 17"],
    impactStats: [
      {
        label: "Cooperatives Launched",
        value: 1840,
        unit: "communities",
        trend: "up",
        trendPct: 28,
      },
      {
        label: "Nations with Programs",
        value: 61,
        unit: "nations",
        trend: "up",
        trendPct: 16,
      },
      {
        label: "Active Volunteers",
        value: 3410,
        unit: "people",
        trend: "up",
        trendPct: 7,
      },
      {
        label: "People in Housing Programs",
        value: 340000,
        unit: "people",
        trend: "up",
        trendPct: 34,
      },
    ],
    initiatives: [
      {
        id: "eco-1",
        title: "Municipal Cooperative Housing Scale-Up",
        description:
          "Replicating the proven community land trust + cooperative housing model across 12 cities, providing permanently affordable housing beyond market speculation.",
        status: "active",
        progress: 78,
        leadOrg: "Community Land Trust Network",
        region: "Latin America & Europe",
        startDate: "2023-06-01",
        targetDate: "2025-06-01",
        participantCount: 2840,
        sdgTags: ["SDG 11", "SDG 10"],
        finFracFranEnabled: true,
      },
      {
        id: "eco-2",
        title: "Platform Cooperative Accelerator",
        description:
          "Supporting 50 worker-owned digital platform cooperatives to build market-ready alternatives to extractive gig economy platforms.",
        status: "active",
        progress: 52,
        leadOrg: "Platform Coop Consortium",
        region: "Global",
        startDate: "2024-01-01",
        targetDate: "2025-12-31",
        participantCount: 1420,
        sdgTags: ["SDG 8", "SDG 10"],
        finFracFranEnabled: true,
      },
      {
        id: "eco-3",
        title: "Universal Basic Services Pilots",
        description:
          "Running 8 city-scale pilots of Universal Basic Services (housing, transport, healthcare, internet) to generate evidence for policy adoption.",
        status: "launching",
        progress: 22,
        leadOrg: "UCL Institute for Global Prosperity",
        region: "Northern Europe & Latin America",
        startDate: "2025-01-01",
        targetDate: "2026-12-31",
        participantCount: 580,
        sdgTags: ["SDG 1", "SDG 3", "SDG 11"],
        finFracFranEnabled: false,
      },
    ],
    resources: [
      {
        id: "eco-r1",
        title: "Cooperative Housing Replication Toolkit",
        description:
          "Complete guide to establishing a community land trust and cooperative housing entity, including legal templates for 20 jurisdictions.",
        type: "toolkit",
        downloadCount: 7840,
        language: "EN / ES / PT / FR",
        url: "#",
        featured: true,
      },
      {
        id: "eco-r2",
        title: "Platform Cooperative Legal Templates",
        description:
          "Legally reviewed governance and incorporation templates for platform cooperatives in 15 jurisdictions.",
        type: "template",
        downloadCount: 4920,
        language: "EN / ES",
        url: "#",
        featured: false,
      },
      {
        id: "eco-r3",
        title: "UBS Evidence Base Report 2024",
        description:
          "Comprehensive evidence review of Universal Basic Services pilots worldwide, with policy recommendations.",
        type: "report",
        downloadCount: 3640,
        language: "EN / FR",
        url: "#",
        featured: false,
      },
      {
        id: "eco-r4",
        title: "Global Inequality Metrics Dataset",
        description:
          "Curated dataset of Gini coefficients, wealth distribution, and cooperative sector size by nation.",
        type: "dataset",
        downloadCount: 2180,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "eco-p1",
        name: "Community Land Trust Network",
        type: "cooperative",
        region: "Global",
        description:
          "International network of 480 community land trusts sharing legal and operational best practices.",
        memberSince: "2023",
      },
      {
        id: "eco-p2",
        name: "UCL Institute for Global Prosperity",
        type: "academic",
        region: "Europe",
        description:
          "Academic lead on Universal Basic Services research and evidence-based policy advocacy.",
        memberSince: "2023",
      },
      {
        id: "eco-p3",
        name: "Barcelona Municipal Economy Office",
        type: "government",
        region: "Southern Europe",
        description:
          "Pioneer city for platform cooperativism and community wealth building, sharing municipal playbooks.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "eco-v1",
        title: "Cooperative Legal Advisor",
        description:
          "Provide legal guidance and adapt cooperative incorporation templates for new jurisdictions.",
        skills: ["research", "advocacy"],
        commitment: "3 months, 8 hrs/week",
        openSlots: 28,
        region: "Remote",
      },
      {
        id: "eco-v2",
        title: "Community Wealth Builder",
        description:
          "Support local communities in establishing cooperative enterprises and community land trusts using our replication toolkit.",
        skills: ["community", "field"],
        commitment: "6 months, 12 hrs/week",
        openSlots: 54,
        region: "Field-based",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "The cooperative housing model is packaged as a FinFracFran™ franchise, enabling any city or cooperative to replicate permanently affordable housing infrastructure within 6 months.",
      adoptingNations: 12,
      adoptingCities: 19,
      licenseType: "Municipal Cooperative License",
      replicationTime: "6 months",
      successStory:
        '"Medellín\'s cooperative housing cooperative licensed the FinFracFran™ package in 2023. By Q3 2024, 1,200 families were in permanently affordable homes — and the model had been adapted by three other Colombian cities." — Juan Camilo Restrepo, EconJustice Latin America',
    },
  },
  {
    councilId: "edu",
    name: "EduVerse",
    shortName: "EduVerse",
    icon: "📚",
    accentColor: "oklch(0.65 0.18 295)",
    tagline: "Open, joyful, lifelong learning — borderless and barrier-free.",
    mandate:
      "Build the world's most accessible open curriculum commons, empower educator cooperatives, and franchise proven learning ecosystems through FinFracFran™ to reach every child and adult outside formal education.",
    volunteerCount: 5620,
    nationCount: 82,
    sdgAlignment: ["SDG 4", "SDG 10", "SDG 17"],
    impactStats: [
      {
        label: "Learners Reached",
        value: 12400000,
        unit: "people",
        trend: "up",
        trendPct: 31,
      },
      {
        label: "Nations with Open Curriculum",
        value: 82,
        unit: "nations",
        trend: "up",
        trendPct: 18,
      },
      {
        label: "Educator Volunteers",
        value: 5620,
        unit: "people",
        trend: "up",
        trendPct: 14,
      },
      {
        label: "Schools Using Commons",
        value: 28400,
        unit: "schools",
        trend: "up",
        trendPct: 42,
      },
    ],
    initiatives: [
      {
        id: "edu-1",
        title: "Open Curriculum Commons Expansion",
        description:
          "Growing the multilingual open curriculum library to cover K-12 and adult learning pathways in 40 languages, with offline-first delivery for low-bandwidth environments.",
        status: "active",
        progress: 64,
        leadOrg: "Open Education Global",
        region: "Global",
        startDate: "2023-01-01",
        targetDate: "2026-01-01",
        participantCount: 4200,
        sdgTags: ["SDG 4", "SDG 10"],
        finFracFranEnabled: true,
      },
      {
        id: "edu-2",
        title: "Educator Cooperative Network",
        description:
          "Connecting 12,000 independent educators into cooperative structures that enable curriculum co-creation, peer mentorship, and fair income models.",
        status: "active",
        progress: 48,
        leadOrg: "Teachers Without Borders Cooperative",
        region: "South Asia & Africa",
        startDate: "2024-03-01",
        targetDate: "2025-12-31",
        participantCount: 2180,
        sdgTags: ["SDG 4", "SDG 8"],
        finFracFranEnabled: true,
      },
      {
        id: "edu-3",
        title: "Girls Education Access Sprint",
        description:
          "Emergency learning access program for girls out of school due to conflict, poverty, or cultural exclusion — combining distance learning, stipends, and community mentors.",
        status: "launching",
        progress: 14,
        leadOrg: "Malala Fund Partner Network",
        region: "West Africa & South Asia",
        startDate: "2025-02-01",
        targetDate: "2025-12-31",
        participantCount: 640,
        sdgTags: ["SDG 4", "SDG 5"],
        finFracFranEnabled: false,
      },
    ],
    resources: [
      {
        id: "edu-r1",
        title: "Open Curriculum Commons Portal",
        description:
          "Fully navigable open-source K-12 and adult learning curriculum library in 40 languages, downloadable for offline use.",
        type: "toolkit",
        downloadCount: 24800,
        language: "40+ languages",
        url: "#",
        featured: true,
      },
      {
        id: "edu-r2",
        title: "Educator Cooperative Setup Guide",
        description:
          "Step-by-step guide for forming an educator cooperative including governance, IP sharing, and revenue distribution models.",
        type: "guide",
        downloadCount: 6240,
        language: "EN / ES / FR / HI",
        url: "#",
        featured: false,
      },
      {
        id: "edu-r3",
        title: "Offline Learning Delivery Template",
        description:
          "Technical and pedagogical templates for deploying curriculum via SMS, radio, and printed materials in zero-connectivity areas.",
        type: "template",
        downloadCount: 4480,
        language: "EN / FR / SW",
        url: "#",
        featured: false,
      },
      {
        id: "edu-r4",
        title: "Global Out-of-School Children Dataset",
        description:
          "UNESCO-sourced data on out-of-school children by country, gender, and cause — updated 2024.",
        type: "dataset",
        downloadCount: 3120,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "edu-p1",
        name: "Open Education Global",
        type: "ngo",
        region: "Global",
        description:
          "International body championing open educational resources and open licensing standards.",
        memberSince: "2023",
      },
      {
        id: "edu-p2",
        name: "MIT Open Learning",
        type: "academic",
        region: "North America",
        description:
          "Academic partner providing curriculum design expertise and open courseware resources.",
        memberSince: "2023",
      },
      {
        id: "edu-p3",
        name: "Kenya Ministry of Education Open Learning Unit",
        type: "government",
        region: "East Africa",
        description:
          "Government pioneer in integrating open curriculum into national education systems.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "edu-v1",
        title: "Curriculum Developer",
        description:
          "Create and review open curriculum modules aligned with local learning standards and cultural contexts.",
        skills: ["research", "creative"],
        commitment: "Flexible, 8–12 hrs/week",
        openSlots: 180,
        region: "Remote",
      },
      {
        id: "edu-v2",
        title: "Community Learning Facilitator",
        description:
          "Facilitate learning circles and community study groups using the Open Curriculum Commons, particularly for adult learners.",
        skills: ["community", "field"],
        commitment: "4 months, 10 hrs/week",
        openSlots: 96,
        region: "Field-based",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "The Open Curriculum Commons school model is franchised as a FinFracFran™ package, enabling any cooperative, NGO, or local authority to establish a fully operational open learning center in 45 days.",
      adoptingNations: 14,
      adoptingCities: 68,
      licenseType: "Community Learning License",
      replicationTime: "45 days",
      successStory:
        '"Our learning cooperative in Kampala licensed the EduVerse franchise in early 2024. By mid-year, 1,800 out-of-school youth were enrolled in structured learning pathways — and we\'ve since trained two neighboring districts." — Fatima Al-Rashid, EduVerse East Africa',
    },
  },
  {
    councilId: "tech",
    name: "TechForAll",
    shortName: "TechForAll",
    icon: "💡",
    accentColor: "oklch(0.62 0.16 215)",
    tagline: "Open-source technology that empowers people — not platforms.",
    mandate:
      "Develop and deploy open-source AI governance tools, digital public infrastructure, and technology commons that ensure everyone benefits from technological progress.",
    volunteerCount: 4280,
    nationCount: 68,
    sdgAlignment: ["SDG 9", "SDG 16", "SDG 17"],
    impactStats: [
      {
        label: "Open-Source Tools Deployed",
        value: 840,
        unit: "communities",
        trend: "up",
        trendPct: 22,
      },
      {
        label: "Nations with AI Governance",
        value: 68,
        unit: "nations",
        trend: "up",
        trendPct: 19,
      },
      {
        label: "Tech Volunteers",
        value: 4280,
        unit: "people",
        trend: "up",
        trendPct: 16,
      },
      {
        label: "People with Digital Access",
        value: 3400000,
        unit: "people",
        trend: "up",
        trendPct: 27,
      },
    ],
    initiatives: [
      {
        id: "tec-1",
        title: "AI Governance Toolkit Deployment",
        description:
          "Rolling out the open-source AI ethics audit and governance toolkit to 68 nations, enabling communities to evaluate and govern AI systems affecting their lives.",
        status: "active",
        progress: 54,
        leadOrg: "Digital Public Infrastructure Lab",
        region: "Global",
        startDate: "2024-01-01",
        targetDate: "2025-12-31",
        participantCount: 1840,
        sdgTags: ["SDG 9", "SDG 16"],
        finFracFranEnabled: true,
      },
      {
        id: "tec-2",
        title: "Community Mesh Network Buildout",
        description:
          "Deploying community-owned mesh internet networks in 200 rural and peri-urban areas using open hardware and open protocols.",
        status: "active",
        progress: 38,
        leadOrg: "Althea Mesh Network Collective",
        region: "Latin America & Southeast Asia",
        startDate: "2024-04-01",
        targetDate: "2026-03-31",
        participantCount: 980,
        sdgTags: ["SDG 9", "SDG 10"],
        finFracFranEnabled: true,
      },
      {
        id: "tec-3",
        title: "ICP Decentralized App Accelerator",
        description:
          "Mentoring 30 teams building decentralized community infrastructure apps on ICP, focused on governance, health records, and cooperative finance.",
        status: "launching",
        progress: 16,
        leadOrg: "DFINITY Foundation Partners",
        region: "Global",
        startDate: "2025-01-01",
        targetDate: "2025-12-31",
        participantCount: 420,
        sdgTags: ["SDG 9", "SDG 17"],
        finFracFranEnabled: false,
      },
    ],
    resources: [
      {
        id: "tec-r1",
        title: "AI Ethics Governance Toolkit",
        description:
          "Complete toolkit for conducting community-led AI ethics audits including assessment frameworks, templates, and facilitation guides.",
        type: "toolkit",
        downloadCount: 9840,
        language: "EN / ZH / ES / FR",
        url: "#",
        featured: true,
      },
      {
        id: "tec-r2",
        title: "Mesh Network Setup Guide",
        description:
          "Technical guide for deploying community-owned mesh internet networks using open hardware and open protocols.",
        type: "guide",
        downloadCount: 4620,
        language: "EN / ES / PT",
        url: "#",
        featured: false,
      },
      {
        id: "tec-r3",
        title: "ICP DApp Starter Template",
        description:
          "Production-ready starter template for building decentralized community infrastructure applications on the Internet Computer.",
        type: "template",
        downloadCount: 6840,
        language: "EN",
        url: "#",
        featured: false,
      },
      {
        id: "tec-r4",
        title: "Global Digital Divide Dataset 2024",
        description:
          "Comprehensive dataset on internet access, device ownership, and digital skills by country, region, and demographic.",
        type: "dataset",
        downloadCount: 3280,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "tec-p1",
        name: "Digital Public Infrastructure Lab",
        type: "ngo",
        region: "Global",
        description:
          "Pioneer in open-source digital public goods and technology commons governance.",
        memberSince: "2023",
      },
      {
        id: "tec-p2",
        name: "DFINITY Foundation",
        type: "icp",
        region: "Global",
        description:
          "Core ICP infrastructure partner supporting decentralized application development for public benefit.",
        memberSince: "2023",
      },
      {
        id: "tec-p3",
        name: "MIT Media Lab Open Tech Group",
        type: "academic",
        region: "North America",
        description:
          "Academic partner for AI ethics research and open technology design methodologies.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "tec-v1",
        title: "Open-Source Developer",
        description:
          "Contribute to open-source tools in AI governance, mesh networking, or decentralized infrastructure.",
        skills: ["technical"],
        commitment: "Flexible, 10 hrs/week",
        openSlots: 140,
        region: "Remote",
      },
      {
        id: "tec-v2",
        title: "Digital Literacy Trainer",
        description:
          "Train community members in digital skills and safe technology use, with a focus on AI literacy and data rights.",
        skills: ["community", "advocacy"],
        commitment: "3 months, 8 hrs/week",
        openSlots: 62,
        region: "Field-based",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "The Community Mesh Network model is packaged as a FinFracFran™ franchise, enabling any cooperative or municipal authority to deploy community-owned internet infrastructure within 60 days.",
      adoptingNations: 9,
      adoptingCities: 34,
      licenseType: "Digital Commons License",
      replicationTime: "60 days",
      successStory:
        '"A housing cooperative in São Paulo licensed the mesh network package in Q2 2024. Within two months, 2,400 residents had broadband access at a fraction of commercial ISP cost — with the cooperative retaining full ownership." — Mei Lin Zhang, TechForAll APAC Lead',
    },
  },
  {
    councilId: "foodwater",
    name: "FoodWater Sovereignty",
    shortName: "FoodWater",
    icon: "🌾",
    accentColor: "oklch(0.68 0.2 55)",
    tagline:
      "Nourishing every community through regenerative food systems and water sovereignty.",
    mandate:
      "Ensure universal access to clean water and nutritious food through regenerative agroecology, community water governance, and FinFracFran™ replication of proven food sovereignty models.",
    volunteerCount: 3890,
    nationCount: 71,
    sdgAlignment: ["SDG 2", "SDG 6", "SDG 15", "SDG 12"],
    impactStats: [
      {
        label: "Hectares in Regenerative Farming",
        value: 840000,
        unit: "hectares",
        trend: "up",
        trendPct: 21,
      },
      {
        label: "Nations with Clean Water Programs",
        value: 71,
        unit: "nations",
        trend: "up",
        trendPct: 13,
      },
      {
        label: "Active Volunteers",
        value: 3890,
        unit: "people",
        trend: "up",
        trendPct: 8,
      },
      {
        label: "Liters Water Secured",
        value: 2400000000,
        unit: "liters_water",
        trend: "up",
        trendPct: 18,
      },
    ],
    initiatives: [
      {
        id: "fw-1",
        title: "Regenerative Agroforestry Scaling Program",
        description:
          "Replicating proven agroforestry kits and training programs to 9,000 smallholder farmers across dryland regions, combining food production with ecosystem restoration.",
        status: "active",
        progress: 61,
        leadOrg: "Sahel Greening Initiative",
        region: "West Africa & Central America",
        startDate: "2023-06-01",
        targetDate: "2025-12-31",
        participantCount: 2640,
        sdgTags: ["SDG 2", "SDG 15"],
        finFracFranEnabled: true,
      },
      {
        id: "fw-2",
        title: "Community Rainwater Harvesting Network",
        description:
          "Building community-owned rainwater harvesting and water purification systems in 350 villages facing seasonal water scarcity.",
        status: "active",
        progress: 49,
        leadOrg: "Water Cooperative Alliance",
        region: "South Asia & East Africa",
        startDate: "2024-02-01",
        targetDate: "2026-01-31",
        participantCount: 1820,
        sdgTags: ["SDG 6"],
        finFracFranEnabled: true,
      },
      {
        id: "fw-3",
        title: "Urban Food Forest Initiative",
        description:
          "Transforming underutilized urban land into community-managed food forests in 40 cities, combining nutrition access with urban greening.",
        status: "launching",
        progress: 19,
        leadOrg: "Urban Agroecology Network",
        region: "Global",
        startDate: "2025-01-01",
        targetDate: "2026-06-30",
        participantCount: 560,
        sdgTags: ["SDG 2", "SDG 11", "SDG 15"],
        finFracFranEnabled: false,
      },
    ],
    resources: [
      {
        id: "fw-r1",
        title: "Agroforestry Replication Toolkit",
        description:
          "Complete guide to establishing dryland agroforestry systems including species selection, planting calendars, and yield tracking tools.",
        type: "toolkit",
        downloadCount: 7640,
        language: "EN / FR / SW / HI",
        url: "#",
        featured: true,
      },
      {
        id: "fw-r2",
        title: "Community Water Governance Guide",
        description:
          "Framework and templates for establishing community-owned water governance structures with equitable access rules.",
        type: "guide",
        downloadCount: 4820,
        language: "EN / ES / AR",
        url: "#",
        featured: false,
      },
      {
        id: "fw-r3",
        title: "Rainwater Harvesting System Template",
        description:
          "Engineering templates and BOM for constructing community rainwater harvesting systems at village scale.",
        type: "template",
        downloadCount: 3480,
        language: "EN / FR / SW",
        url: "#",
        featured: false,
      },
      {
        id: "fw-r4",
        title: "Global Food Sovereignty Dataset",
        description:
          "Dataset on smallholder land tenure, food security indicators, and agroecological transition outcomes by region.",
        type: "dataset",
        downloadCount: 2940,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "fw-p1",
        name: "Sahel Greening Initiative",
        type: "ngo",
        region: "West Africa",
        description:
          "Leading the largest dryland reforestation and agroforestry program in Sub-Saharan Africa.",
        memberSince: "2023",
      },
      {
        id: "fw-p2",
        name: "CGIAR Agroecology Program",
        type: "academic",
        region: "Global",
        description:
          "International research body providing agronomic evidence and crop improvement for smallholder farming systems.",
        memberSince: "2023",
      },
      {
        id: "fw-p3",
        name: "Indian National Water Mission",
        type: "government",
        region: "South Asia",
        description:
          "Government partner sharing large-scale watershed management and community water governance expertise.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "fw-v1",
        title: "Agroforestry Field Trainer",
        description:
          "Train smallholder farmers in agroforestry techniques and support adaptation of planting systems to local soil and climate conditions.",
        skills: ["field", "technical"],
        commitment: "3 months, 20 hrs/week",
        openSlots: 84,
        region: "Field-based",
      },
      {
        id: "fw-v2",
        title: "Community Water Governance Facilitator",
        description:
          "Support communities in establishing water governance committees and equitable water access frameworks.",
        skills: ["community", "advocacy"],
        commitment: "4 months, 10 hrs/week",
        openSlots: 48,
        region: "Field-based",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "The regenerative agroforestry model is franchised as a FinFracFran™ package, enabling any smallholder cooperative or NGO to replicate a full dryland food system restoration program in 120 days.",
      adoptingNations: 9,
      adoptingCities: 42,
      licenseType: "Agroecology Commons License",
      replicationTime: "120 days",
      successStory:
        '"In the Tigray region of Ethiopia, a farmers\' cooperative licensed the agroforestry package in 2023. By harvest 2024, yields had increased by 40% and three seasonal streams had returned to the landscape." — Ibrahim Traore, FoodWater Sovereignty Sahel Lead',
    },
  },
  {
    councilId: "culture",
    name: "CultureBridge",
    shortName: "CultureBridge",
    icon: "🎭",
    accentColor: "oklch(0.62 0.2 355)",
    tagline:
      "Every language, every story, every tradition — preserved and celebrated.",
    mandate:
      "Safeguard endangered languages, amplify marginalized cultural expressions, and build intercultural bridges through digital preservation, creative exchange programs, and community storytelling infrastructure.",
    volunteerCount: 2640,
    nationCount: 58,
    sdgAlignment: ["SDG 4", "SDG 10", "SDG 16", "SDG 17"],
    impactStats: [
      {
        label: "Languages Documented",
        value: 312,
        unit: "communities",
        trend: "up",
        trendPct: 14,
      },
      {
        label: "Nations Participating",
        value: 58,
        unit: "nations",
        trend: "up",
        trendPct: 9,
      },
      {
        label: "Cultural Volunteers",
        value: 2640,
        unit: "people",
        trend: "up",
        trendPct: 11,
      },
      {
        label: "People in Exchange Programs",
        value: 480000,
        unit: "people",
        trend: "up",
        trendPct: 23,
      },
    ],
    initiatives: [
      {
        id: "clt-1",
        title: "Endangered Language Digital Archive",
        description:
          "Building a community-governed digital archive of 312 endangered languages, including spoken word recordings, grammar documentation, and teaching materials.",
        status: "active",
        progress: 56,
        leadOrg: "Endangered Languages Project",
        region: "Global",
        startDate: "2023-09-01",
        targetDate: "2026-09-01",
        participantCount: 1240,
        sdgTags: ["SDG 4", "SDG 10"],
        finFracFranEnabled: false,
      },
      {
        id: "clt-2",
        title: "Intercultural Creative Exchange",
        description:
          "Pairing artists, writers, and musicians from different cultural backgrounds for collaborative creative residencies and public-facing intercultural works.",
        status: "active",
        progress: 43,
        leadOrg: "Global Arts Solidarity Network",
        region: "Global",
        startDate: "2024-01-01",
        targetDate: "2025-12-31",
        participantCount: 820,
        sdgTags: ["SDG 10", "SDG 16"],
        finFracFranEnabled: false,
      },
      {
        id: "clt-3",
        title: "Indigenous Story Rights Protection",
        description:
          "Developing legal frameworks and digital rights tools to protect indigenous communities' ownership of their stories, traditions, and cultural IP from commercial extraction.",
        status: "launching",
        progress: 11,
        leadOrg: "Indigenous IP Commons",
        region: "Americas & Oceania",
        startDate: "2025-02-01",
        targetDate: "2026-01-31",
        participantCount: 280,
        sdgTags: ["SDG 10", "SDG 16"],
        finFracFranEnabled: false,
      },
    ],
    resources: [
      {
        id: "clt-r1",
        title: "Language Documentation Toolkit",
        description:
          "Methodology and tools for community-led endangered language documentation, including audio recording guides and metadata standards.",
        type: "toolkit",
        downloadCount: 5840,
        language: "EN / FR / ES / ZH",
        url: "#",
        featured: true,
      },
      {
        id: "clt-r2",
        title: "Cultural Exchange Program Design Guide",
        description:
          "Step-by-step guide to designing and running ethical intercultural exchange programs with community consent protocols.",
        type: "guide",
        downloadCount: 3240,
        language: "EN / FR / ES",
        url: "#",
        featured: false,
      },
      {
        id: "clt-r3",
        title: "Indigenous IP Rights Framework",
        description:
          "Legal framework templates for protecting indigenous cultural IP across 12 jurisdictions.",
        type: "template",
        downloadCount: 2640,
        language: "EN / ES / PT",
        url: "#",
        featured: false,
      },
      {
        id: "clt-r4",
        title: "Global Language Endangerment Dataset",
        description:
          "UNESCO-sourced data on endangered language vitality, speaker populations, and documentation status.",
        type: "dataset",
        downloadCount: 2180,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "clt-p1",
        name: "Endangered Languages Project",
        type: "ngo",
        region: "Global",
        description:
          "Global documentation project for endangered languages, partnering with 1,200 community linguists worldwide.",
        memberSince: "2023",
      },
      {
        id: "clt-p2",
        name: "SOAS Language Documentation Centre",
        type: "academic",
        region: "Europe",
        description:
          "Leading academic centre for endangered language research and community documentation methodology.",
        memberSince: "2023",
      },
      {
        id: "clt-p3",
        name: "New Zealand Te Ara Poutama Language Office",
        type: "government",
        region: "Oceania",
        description:
          "Pioneer in indigenous language revitalization, sharing the Māori language revival model for global adaptation.",
        memberSince: "2024",
      },
    ],
    volunteerRoles: [
      {
        id: "clt-v1",
        title: "Language Documentation Volunteer",
        description:
          "Work with community language keepers to document and archive endangered language recordings, stories, and teaching materials.",
        skills: ["research", "community", "creative"],
        commitment: "3 months, 8 hrs/week",
        openSlots: 92,
        region: "Remote/Field",
      },
      {
        id: "clt-v2",
        title: "Cultural Exchange Coordinator",
        description:
          "Coordinate intercultural creative exchange pairs and residencies, supporting artists and writers through the process.",
        skills: ["community", "creative"],
        commitment: "4 months, 10 hrs/week",
        openSlots: 36,
        region: "Remote",
      },
    ],
  },
  {
    councilId: "general",
    name: "General Assembly",
    shortName: "General Assembly",
    icon: "🌐",
    accentColor: "oklch(0.72 0.16 75)",
    tagline: "The open forum where every voice shapes our collective future.",
    mandate:
      "Serve as the supreme deliberative body of ONEartHeaven, enabling all registered members and communities to propose, debate, and vote on resolutions that transcend council boundaries, including charter amendments and cross-cutting global initiatives.",
    volunteerCount: 3120,
    nationCount: 194,
    sdgAlignment: ["SDG 16", "SDG 17", "SDG 10"],
    impactStats: [
      {
        label: "Resolutions Passed",
        value: 84,
        unit: "communities",
        trend: "up",
        trendPct: 12,
      },
      {
        label: "Nations Participating",
        value: 194,
        unit: "nations",
        trend: "stable",
      },
      {
        label: "Active Volunteers",
        value: 3120,
        unit: "people",
        trend: "up",
        trendPct: 7,
      },
      {
        label: "Members Voting",
        value: 128000,
        unit: "people",
        trend: "up",
        trendPct: 19,
      },
    ],
    initiatives: [
      {
        id: "gen-1",
        title: "Charter Amendment Process Reform",
        description:
          "Redesigning the charter amendment process to increase participation, reduce barriers for underrepresented communities, and add multilingual deliberation pathways.",
        status: "active",
        progress: 62,
        leadOrg: "ONEartHeaven Charter Committee",
        region: "Global",
        startDate: "2024-06-01",
        targetDate: "2025-06-01",
        participantCount: 1840,
        sdgTags: ["SDG 16", "SDG 10"],
        finFracFranEnabled: false,
      },
      {
        id: "gen-2",
        title: "Youth Voting Rights Implementation",
        description:
          "Implementing the Charter Amendment VII to extend full voting rights to members aged 16+ across all councils and the General Assembly.",
        status: "active",
        progress: 48,
        leadOrg: "Youth Delegates Coalition",
        region: "Global",
        startDate: "2024-09-01",
        targetDate: "2025-06-30",
        participantCount: 920,
        sdgTags: ["SDG 16", "SDG 4"],
        finFracFranEnabled: false,
      },
      {
        id: "gen-3",
        title: "FinFracFran™ Governance Framework",
        description:
          "Establishing the cross-council governance framework for FinFracFran™ licensing, ensuring equitable access, quality standards, and benefit-sharing across all franchise models.",
        status: "launching",
        progress: 24,
        leadOrg: "FinFracFran™ Standards Committee",
        region: "Global",
        startDate: "2025-01-01",
        targetDate: "2025-12-31",
        participantCount: 640,
        sdgTags: ["SDG 17", "SDG 16"],
        finFracFranEnabled: true,
      },
    ],
    resources: [
      {
        id: "gen-r1",
        title: "ONEartHeaven Deliberation Handbook",
        description:
          "Complete guide to participating in General Assembly deliberations including proposal formats, debate rules, and voting procedures.",
        type: "guide",
        downloadCount: 12840,
        language: "EN / ES / FR / AR / ZH / SW",
        url: "#",
        featured: true,
      },
      {
        id: "gen-r2",
        title: "FinFracFran™ Licensing Framework",
        description:
          "Full framework for FinFracFran™ franchise licensing including governance standards, quality criteria, and benefit-sharing models.",
        type: "toolkit",
        downloadCount: 7640,
        language: "EN / ES / FR",
        url: "#",
        featured: false,
      },
      {
        id: "gen-r3",
        title: "Participatory Governance Template Suite",
        description:
          "Templates for establishing participatory governance structures at community, city, and national scale.",
        type: "template",
        downloadCount: 5840,
        language: "EN / ES / FR / PT / ZH",
        url: "#",
        featured: false,
      },
      {
        id: "gen-r4",
        title: "Global Governance Outcomes Dataset",
        description:
          "Comparative dataset of governance outcomes across participatory vs. representative systems, updated 2024.",
        type: "dataset",
        downloadCount: 3280,
        language: "EN",
        url: "#",
        featured: false,
      },
    ],
    partners: [
      {
        id: "gen-p1",
        name: "International Institute for Democracy",
        type: "ngo",
        region: "Global",
        description:
          "Leading democracy research and capacity building organization, supporting ONEartHeaven governance design.",
        memberSince: "2023",
      },
      {
        id: "gen-p2",
        name: "Harvard Kennedy School Governance Lab",
        type: "academic",
        region: "North America",
        description:
          "Academic partner providing governance research, evaluation, and design expertise.",
        memberSince: "2023",
      },
      {
        id: "gen-p3",
        name: "ICP Foundation",
        type: "icp",
        region: "Global",
        description:
          "Infrastructure partner ensuring decentralized, censorship-resistant hosting for all ONEartHeaven governance infrastructure.",
        memberSince: "2023",
      },
    ],
    volunteerRoles: [
      {
        id: "gen-v1",
        title: "Assembly Deliberation Facilitator",
        description:
          "Facilitate multilingual online deliberations and ensure all voices are heard in General Assembly debates.",
        skills: ["community", "advocacy"],
        commitment: "Flexible, 8 hrs/week",
        openSlots: 80,
        region: "Remote",
      },
      {
        id: "gen-v2",
        title: "Governance Research Analyst",
        description:
          "Research governance innovations, track resolution implementation, and produce evidence reports for the Assembly.",
        skills: ["research"],
        commitment: "3 months, 10 hrs/week",
        openSlots: 32,
        region: "Remote",
      },
    ],
    finFracFranSpotlight: {
      summary:
        "The FinFracFran™ Governance Framework is being codified as a universal standard, enabling any cooperative, city, or organization to adopt and adapt ONEartHeaven's governance and economic models as a licensed franchise.",
      adoptingNations: 31,
      adoptingCities: 94,
      licenseType: "Universal Governance License",
      replicationTime: "30 days",
      successStory:
        '"Costa Rica\'s national cooperative federation licensed the FinFracFran™ governance package in 2024. Within one quarter, 48 cooperatives had adopted the framework — generating measurable gains in democratic participation and financial resilience." — Siosaia Taufa, General Assembly Pacific Representative',
    },
  },
];

export function getPortal(councilId: string): ActionPortal | undefined {
  return ALL_PORTALS.find((p) => p.councilId === councilId);
}

export function getPortalStats() {
  const totalVolunteers = ALL_PORTALS.reduce(
    (sum, p) => sum + p.volunteerCount,
    0,
  );
  const totalNations = Math.max(...ALL_PORTALS.map((p) => p.nationCount));
  const totalInitiatives = ALL_PORTALS.reduce(
    (sum, p) => sum + p.initiatives.length,
    0,
  );
  const totalPartners = ALL_PORTALS.reduce(
    (sum, p) => sum + p.partners.length,
    0,
  );
  return { totalVolunteers, totalNations, totalInitiatives, totalPartners };
}
