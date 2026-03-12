import type {
  AcademyCourse,
  AcademyStats,
  CertificationBadge,
  IdeaSubmission,
  TrainingTrack,
} from "./academyTypes";

// ─── Courses ──────────────────────────────────────────────────────────────────

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: "AC-001",
    title: "Foundations of Global Governance",
    category: "governance",
    level: "beginner",
    instructor: "Dr. Amara Diallo",
    instructorBio:
      "Former UN Special Advisor with 20 years in multilateral diplomacy and governance reform across 40 nations.",
    durationHours: 12,
    modules: [
      {
        id: "m1",
        title: "What is Global Governance?",
        type: "video",
        durationMinutes: 45,
      },
      {
        id: "m2",
        title: "Historical Context & Failures",
        type: "reading",
        durationMinutes: 60,
      },
      {
        id: "m3",
        title: "ONEartHeaven™ Model",
        type: "video",
        durationMinutes: 50,
      },
      {
        id: "m4",
        title: "Charter Deep Dive",
        type: "workshop",
        durationMinutes: 90,
      },
      {
        id: "m5",
        title: "Knowledge Assessment",
        type: "quiz",
        durationMinutes: 30,
      },
    ],
    sdgs: [16, 17],
    ffTag: false,
    enrollmentCount: 4820,
    rating: 4.8,
    status: "live",
    description:
      "A comprehensive introduction to global governance systems, the failures of the UN model, and how ONEartHeaven™ delivers a participatory, AI-augmented alternative. Ideal for newcomers and advocates.",
    certEligible: true,
  },
  {
    id: "AC-002",
    title: "FinFracFran™ Franchise Readiness",
    category: "finfracfran",
    level: "intermediate",
    instructor: "Marcus Osei",
    instructorBio:
      "FinFracFran™ Master Franchisee for West Africa. Scaled operations to 14 nations in 3 years.",
    durationHours: 18,
    modules: [
      {
        id: "m1",
        title: "FinFracFran™ Model Overview",
        type: "video",
        durationMinutes: 60,
      },
      {
        id: "m2",
        title: "Tier Progression: Seed to Global",
        type: "video",
        durationMinutes: 75,
      },
      {
        id: "m3",
        title: "Franchise Agreement Essentials",
        type: "reading",
        durationMinutes: 90,
      },
      {
        id: "m4",
        title: "Capital Mobilization Workshop",
        type: "workshop",
        durationMinutes: 120,
      },
      {
        id: "m5",
        title: "Compliance & Disclosure",
        type: "reading",
        durationMinutes: 60,
      },
      {
        id: "m6",
        title: "Final Assessment",
        type: "quiz",
        durationMinutes: 45,
      },
    ],
    sdgs: [1, 8, 10, 17],
    ffTag: true,
    ffTierRequired: "seed",
    enrollmentCount: 3210,
    rating: 4.9,
    status: "live",
    description:
      "Everything you need to launch a FinFracFran™ franchise. Covers the economic model, tier progression, legal frameworks, capital mobilization, and compliance standards for Seed-tier certification.",
    certEligible: true,
  },
  {
    id: "AC-003",
    title: "Climate Action Leadership",
    category: "climate",
    level: "intermediate",
    instructor: "Dr. Priya Nair",
    instructorBio:
      "Lead Climate Scientist at the Global Sustainability Council. IPCC contributor and TEDx speaker.",
    durationHours: 15,
    modules: [
      {
        id: "m1",
        title: "Climate Science Fundamentals",
        type: "video",
        durationMinutes: 55,
      },
      {
        id: "m2",
        title: "Policy to Action",
        type: "reading",
        durationMinutes: 70,
      },
      {
        id: "m3",
        title: "Community Climate Initiatives",
        type: "project",
        durationMinutes: 120,
      },
      {
        id: "m4",
        title: "SDG 13 Deep Dive",
        type: "video",
        durationMinutes: 50,
      },
      { id: "m5", title: "Assessment", type: "quiz", durationMinutes: 30 },
    ],
    sdgs: [13, 15, 7],
    ffTag: false,
    enrollmentCount: 5640,
    rating: 4.7,
    status: "live",
    description:
      "Practical training for community leaders and policymakers to translate climate commitments into measurable local action. Includes project templates used in 42 nations.",
    certEligible: true,
  },
  {
    id: "AC-004",
    title: "Community Health Systems Design",
    category: "health",
    level: "advanced",
    instructor: "Dr. Fatima Al-Rashid",
    instructorBio:
      "WHO Technical Lead for Community Health Innovation. Designed primary care models deployed in 28 low-resource settings.",
    durationHours: 20,
    modules: [
      {
        id: "m1",
        title: "Health Systems Architecture",
        type: "video",
        durationMinutes: 80,
      },
      {
        id: "m2",
        title: "Equity & Access Frameworks",
        type: "reading",
        durationMinutes: 90,
      },
      {
        id: "m3",
        title: "Digital Health Tools",
        type: "video",
        durationMinutes: 65,
      },
      {
        id: "m4",
        title: "Design Sprint",
        type: "project",
        durationMinutes: 180,
      },
      { id: "m5", title: "Assessment", type: "quiz", durationMinutes: 45 },
    ],
    sdgs: [3, 10],
    ffTag: false,
    enrollmentCount: 2980,
    rating: 4.8,
    status: "live",
    description:
      "Advanced methodology for designing community-centered health systems in low-to-middle income contexts. Combines WHO frameworks with ONEartHeaven™ subsidiarity principles.",
    certEligible: true,
  },
  {
    id: "AC-005",
    title: "Conflict Resolution & Peacebuilding",
    category: "peace",
    level: "intermediate",
    instructor: "Ambassador Samuel Okonkwo",
    instructorBio:
      "Former African Union Peace Mediator. 25 years of field experience in post-conflict reconstruction.",
    durationHours: 14,
    modules: [
      {
        id: "m1",
        title: "Anatomy of Conflict",
        type: "video",
        durationMinutes: 60,
      },
      {
        id: "m2",
        title: "Mediation Frameworks",
        type: "video",
        durationMinutes: 75,
      },
      {
        id: "m3",
        title: "Case Studies: Rwanda, Colombia, N. Ireland",
        type: "reading",
        durationMinutes: 90,
      },
      {
        id: "m4",
        title: "Field Simulation",
        type: "workshop",
        durationMinutes: 120,
      },
      { id: "m5", title: "Assessment", type: "quiz", durationMinutes: 30 },
    ],
    sdgs: [16, 10, 17],
    ffTag: false,
    enrollmentCount: 3450,
    rating: 4.9,
    status: "live",
    description:
      "Evidence-based conflict resolution and peacebuilding training drawing on decades of field experience. Includes real-world case studies and mediation simulations.",
    certEligible: true,
  },
  {
    id: "AC-006",
    title: "AI & Technology for Global Good",
    category: "technology",
    level: "beginner",
    instructor: "Yuki Tanaka",
    instructorBio:
      "AI Ethics Researcher, formerly at DeepMind. Advisor to 5 national governments on responsible AI deployment.",
    durationHours: 10,
    modules: [
      {
        id: "m1",
        title: "AI Fundamentals for Non-Techies",
        type: "video",
        durationMinutes: 50,
      },
      {
        id: "m2",
        title: "Ethical AI Frameworks",
        type: "reading",
        durationMinutes: 60,
      },
      {
        id: "m3",
        title: "AI in Governance",
        type: "video",
        durationMinutes: 55,
      },
      {
        id: "m4",
        title: "Hands-on Tools Lab",
        type: "workshop",
        durationMinutes: 90,
      },
      { id: "m5", title: "Assessment", type: "quiz", durationMinutes: 30 },
    ],
    sdgs: [9, 16, 17],
    ffTag: false,
    enrollmentCount: 6200,
    rating: 4.6,
    status: "live",
    description:
      "Demystifying AI for civil society leaders and policymakers. Covers AI fundamentals, ethical governance frameworks, and practical tools for deploying responsible AI in the public interest.",
    certEligible: false,
  },
  {
    id: "AC-007",
    title: "Transformational Leadership for Change Agents",
    category: "leadership",
    level: "advanced",
    instructor: "Dr. Elena Vasquez",
    instructorBio:
      "Executive Leadership Coach. Former Head of People at the World Bank. Coached 500+ senior leaders across 60 nations.",
    durationHours: 16,
    modules: [
      {
        id: "m1",
        title: "Leadership Identity",
        type: "video",
        durationMinutes: 60,
      },
      {
        id: "m2",
        title: "Systems Thinking",
        type: "reading",
        durationMinutes: 80,
      },
      {
        id: "m3",
        title: "Building Coalitions",
        type: "workshop",
        durationMinutes: 120,
      },
      {
        id: "m4",
        title: "Leading in Uncertainty",
        type: "live",
        durationMinutes: 90,
      },
      {
        id: "m5",
        title: "Capstone Project",
        type: "project",
        durationMinutes: 180,
      },
    ],
    sdgs: [16, 17, 10],
    ffTag: true,
    ffTierRequired: "growth",
    enrollmentCount: 2140,
    rating: 4.9,
    status: "live",
    description:
      "An immersive leadership development program for those driving systemic change. Combines coaching science, systems thinking, and coalition-building with FinFracFran™ distribution leadership models.",
    certEligible: true,
  },
  {
    id: "AC-008",
    title: "NewWaysNow Solutions Design",
    category: "solutions",
    level: "beginner",
    instructor: "Carlos Mendes",
    instructorBio:
      "Founder of 3 social enterprises. Solutions Designer for ONEartHeaven™ NewWaysNow Exchange.",
    durationHours: 8,
    modules: [
      {
        id: "m1",
        title: "Problem Framing",
        type: "video",
        durationMinutes: 45,
      },
      {
        id: "m2",
        title: "Human-Centered Design Basics",
        type: "video",
        durationMinutes: 55,
      },
      {
        id: "m3",
        title: "Validation Methods",
        type: "workshop",
        durationMinutes: 90,
      },
      {
        id: "m4",
        title: "Scaling Frameworks",
        type: "reading",
        durationMinutes: 60,
      },
    ],
    sdgs: [1, 2, 3, 10, 11],
    ffTag: false,
    enrollmentCount: 3780,
    rating: 4.7,
    status: "live",
    description:
      "Learn to design and validate local solutions that scale globally. Practical training in human-centered design, validation methods, and the ONEartHeaven™ solutions exchange process.",
    certEligible: false,
  },
  {
    id: "AC-009",
    title: "Cultural Intelligence & Global Citizenship",
    category: "culture",
    level: "beginner",
    instructor: "Dr. Zainab Hassan",
    instructorBio:
      "Cultural Anthropologist and Fulbright Scholar. Advisor on inclusive design to UNESCO.",
    durationHours: 9,
    modules: [
      {
        id: "m1",
        title: "Cultural Dimensions Framework",
        type: "video",
        durationMinutes: 50,
      },
      {
        id: "m2",
        title: "Navigating Cross-Cultural Tensions",
        type: "video",
        durationMinutes: 60,
      },
      {
        id: "m3",
        title: "Inclusive Communication",
        type: "workshop",
        durationMinutes: 90,
      },
      { id: "m4", title: "Assessment", type: "quiz", durationMinutes: 30 },
    ],
    sdgs: [10, 16, 17],
    ffTag: false,
    enrollmentCount: 4100,
    rating: 4.6,
    status: "live",
    description:
      "Develop the cultural intelligence needed to work effectively across borders, belief systems, and organizational contexts. Essential for all global change agents.",
    certEligible: false,
  },
  {
    id: "AC-010",
    title: "Public Finance & Impact Investing",
    category: "finance",
    level: "advanced",
    instructor: "Dr. Jean-Pierre Moreau",
    instructorBio:
      "Former Finance Director at African Development Bank. Structured $2B+ in development finance across 30 nations.",
    durationHours: 22,
    modules: [
      {
        id: "m1",
        title: "Development Finance Architecture",
        type: "video",
        durationMinutes: 80,
      },
      {
        id: "m2",
        title: "Impact Measurement Frameworks",
        type: "reading",
        durationMinutes: 90,
      },
      {
        id: "m3",
        title: "Blended Finance Structures",
        type: "video",
        durationMinutes: 75,
      },
      {
        id: "m4",
        title: "Deal Structuring Workshop",
        type: "workshop",
        durationMinutes: 180,
      },
      {
        id: "m5",
        title: "Final Assessment",
        type: "quiz",
        durationMinutes: 60,
      },
    ],
    sdgs: [1, 8, 10, 17],
    ffTag: true,
    ffTierRequired: "scale",
    enrollmentCount: 1680,
    rating: 4.8,
    status: "live",
    description:
      "Advanced training in public finance, impact investing, and blended finance for development professionals. Includes FinFracFran™ capital mobilization structures for Scale-tier franchisees.",
    certEligible: true,
  },
  {
    id: "AC-011",
    title: "Digital Governance & Blockchain Basics",
    category: "technology",
    level: "intermediate",
    instructor: "Kofi Mensah",
    instructorBio:
      "ICP Core Contributor and Smart Contract Developer. Specializes in decentralized governance on the Internet Computer.",
    durationHours: 13,
    modules: [
      {
        id: "m1",
        title: "Blockchain for Governance",
        type: "video",
        durationMinutes: 60,
      },
      {
        id: "m2",
        title: "ICP & DePin Architecture",
        type: "reading",
        durationMinutes: 75,
      },
      {
        id: "m3",
        title: "Smart Contract Lab",
        type: "project",
        durationMinutes: 150,
      },
      { id: "m4", title: "Assessment", type: "quiz", durationMinutes: 30 },
    ],
    sdgs: [9, 16, 17],
    ffTag: false,
    enrollmentCount: 2240,
    rating: 4.7,
    status: "live",
    description:
      "Practical training in blockchain-based governance on the Internet Computer Protocol. Covers decentralized identity, on-chain voting, and smart contract development for public institutions.",
    certEligible: true,
  },
  {
    id: "AC-012",
    title: "FinFracFran™ Distribution Leadership",
    category: "finfracfran",
    level: "expert",
    instructor: "Dr. Amara Diallo",
    instructorBio:
      "Global-tier FinFracFran™ Master. Designed the distribution leadership curriculum used in 94 nations.",
    durationHours: 30,
    modules: [
      {
        id: "m1",
        title: "Master Franchise Architecture",
        type: "video",
        durationMinutes: 90,
      },
      {
        id: "m2",
        title: "Multi-Country Rollout Strategy",
        type: "workshop",
        durationMinutes: 180,
      },
      {
        id: "m3",
        title: "Legal & Governance Structures",
        type: "reading",
        durationMinutes: 120,
      },
      {
        id: "m4",
        title: "Capital Raising at Scale",
        type: "live",
        durationMinutes: 90,
      },
      { id: "m5", title: "Capstone", type: "project", durationMinutes: 240 },
    ],
    sdgs: [1, 8, 10, 16, 17],
    ffTag: true,
    ffTierRequired: "global",
    enrollmentCount: 890,
    rating: 5.0,
    status: "live",
    description:
      "The apex FinFracFran™ program for Global-tier master franchisees. Covers multi-country rollout strategy, legal architectures, capital raising, and legacy distribution leadership for maximum global impact.",
    certEligible: true,
  },
];

// ─── Idea Submissions ─────────────────────────────────────────────────────────

export const IDEA_SUBMISSIONS: IdeaSubmission[] = [
  {
    id: "ID-001",
    title: "SolarSchool Network — Off-Grid Education Hubs",
    category: "technology",
    submitter: "Amina Diallo",
    submitterRegion: "West Africa",
    description:
      "Deploy solar-powered, internet-connected micro-schools in rural communities without grid access. Each hub serves 50–200 students and hosts community learning sessions for adults in the evenings.",
    stage: "piloting",
    votes: 847,
    ffPotential: true,
    mentors: ["Dr. Priya Nair", "Yuki Tanaka"],
    linkedCourses: ["AC-006", "AC-008"],
  },
  {
    id: "ID-002",
    title: "Community Water Stewardship Protocol",
    category: "climate",
    submitter: "Rafael Torres",
    submitterRegion: "Latin America",
    description:
      "A community-owned water monitoring and stewardship system using low-cost IoT sensors, local governance structures, and real-time data dashboards for basin-wide water security.",
    stage: "adopted",
    votes: 1203,
    ffPotential: true,
    mentors: ["Dr. Priya Nair"],
    linkedSolutions: ["SOL-014"],
  },
  {
    id: "ID-003",
    title: "Mobile Conflict Early Warning System",
    category: "peace",
    submitter: "Oumar Sy",
    submitterRegion: "Sahel Region",
    description:
      "A mobile-based early warning system for inter-community tensions using anonymous reporting, AI pattern analysis, and rapid response protocols connected to regional peacebuilders.",
    stage: "incubating",
    votes: 612,
    ffPotential: false,
    mentors: ["Ambassador Samuel Okonkwo"],
  },
  {
    id: "ID-004",
    title: "Youth Governance Simulation Platform",
    category: "governance",
    submitter: "Maria Kowalski",
    submitterRegion: "Eastern Europe",
    description:
      "An online simulation platform where young people aged 14–25 practice governance, deliberation, and policy-making using ONEartHeaven™ structures. Used in 23 schools across 8 nations.",
    stage: "piloting",
    votes: 934,
    ffPotential: true,
    linkedCourses: ["AC-001", "AC-007"],
  },
  {
    id: "ID-005",
    title: "Diaspora-to-Impact Remittance Model",
    category: "finance",
    submitter: "Emmanuel Asante",
    submitterRegion: "UK/Ghana Corridor",
    description:
      "Redirect a fraction of diaspora remittances into community development projects in origin countries, using FinFracFran™ governance structures to ensure accountability and measurable impact.",
    stage: "review",
    votes: 445,
    ffPotential: true,
    linkedCourses: ["AC-002", "AC-010"],
  },
  {
    id: "ID-006",
    title: "Open-Source Health Clinic Protocol",
    category: "health",
    submitter: "Dr. Anika Sharma",
    submitterRegion: "South Asia",
    description:
      "A fully documented, open-source protocol for establishing low-cost, high-quality primary health clinics in under-resourced communities. All materials freely downloadable and adaptable.",
    stage: "adopted",
    votes: 1560,
    ffPotential: false,
    mentors: ["Dr. Fatima Al-Rashid"],
    linkedSolutions: ["SOL-007"],
  },
  {
    id: "ID-007",
    title: "Regenerative Agri-Tourism Franchise",
    category: "culture",
    submitter: "Lucia Ferreira",
    submitterRegion: "Brazil",
    description:
      "FinFracFran™-enabled agri-tourism franchise connecting urban visitors with regenerative farms, funding rural livelihoods while educating participants about food systems and biodiversity.",
    stage: "incubating",
    votes: 378,
    ffPotential: true,
    linkedCourses: ["AC-002", "AC-003"],
  },
  {
    id: "ID-008",
    title: "Civic AI Assistant for Local Councils",
    category: "governance",
    submitter: "Sven Eriksson",
    submitterRegion: "Scandinavia",
    description:
      "A lightweight AI assistant for local councils that summarizes proposals, tracks implementation, surfaces citizen feedback, and flags unintended policy consequences before they occur.",
    stage: "draft",
    votes: 289,
    ffPotential: false,
  },
];

// ─── Training Tracks ──────────────────────────────────────────────────────────

export const TRAINING_TRACKS: TrainingTrack[] = [
  {
    id: "TT-001",
    name: "Governance Leadership Pathway",
    category: "governance",
    description:
      "A comprehensive pathway for aspiring global governance leaders. Covers charter design, deliberative democracy, AI-augmented policy, and multi-stakeholder coalition building.",
    totalWeeks: 16,
    moduleCount: 24,
    targetAudience: "Civil society leaders, policymakers, public servants",
    certifications: ["CB-001", "CB-003"],
    enrollmentCount: 1240,
  },
  {
    id: "TT-002",
    name: "FinFracFran™ Franchise Excellence Track",
    category: "finfracfran",
    description:
      "The official FinFracFran™ certification pathway from Seed to Global tier. Combines business acumen, governance fluency, capital mobilization, and distribution leadership into a unified excellence track.",
    totalWeeks: 24,
    moduleCount: 36,
    targetAudience: "Entrepreneurs, investors, distribution leaders",
    ffTierRequired: "seed",
    certifications: ["CB-004", "CB-008"],
    enrollmentCount: 980,
  },
  {
    id: "TT-003",
    name: "Climate Action Practitioner Track",
    category: "climate",
    description:
      "Equip yourself with the science, policy, and community tools to drive meaningful climate action. From IPCC frameworks to community-led green transitions, this track prepares frontline climate leaders.",
    totalWeeks: 12,
    moduleCount: 18,
    targetAudience:
      "Environmental advocates, local government officials, NGO staff",
    certifications: ["CB-002"],
    enrollmentCount: 2100,
  },
  {
    id: "TT-004",
    name: "Digital Governance & ICP Technology Track",
    category: "technology",
    description:
      "Master blockchain-based governance on the Internet Computer Protocol. This track prepares tech-enabled governance practitioners for the decentralized future of public administration.",
    totalWeeks: 10,
    moduleCount: 15,
    targetAudience: "Technologists, developers, digital government innovators",
    certifications: ["CB-005"],
    enrollmentCount: 760,
  },
  {
    id: "TT-005",
    name: "Systems Leadership for Global Impact",
    category: "leadership",
    description:
      "Develop the systems thinking, coalition-building, and adaptive leadership skills required to drive lasting change in complex, multi-stakeholder environments across nations and cultures.",
    totalWeeks: 14,
    moduleCount: 20,
    targetAudience: "Senior leaders, executive directors, program directors",
    ffTierRequired: "growth",
    certifications: ["CB-006", "CB-007"],
    enrollmentCount: 890,
  },
  {
    id: "TT-006",
    name: "Peacebuilding & Conflict Transformation",
    category: "peacebuilding",
    description:
      "A practitioner-focused track combining conflict analysis, mediation skills, post-conflict reconstruction, and community reconciliation. Draws on field experience across 5 continents.",
    totalWeeks: 12,
    moduleCount: 16,
    targetAudience: "Mediators, diplomats, community reconciliation workers",
    certifications: ["CB-002"],
    enrollmentCount: 620,
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────

export const CERTIFICATION_BADGES: CertificationBadge[] = [
  {
    id: "CB-001",
    name: "Global Governance Foundation",
    level: "foundation",
    issuingBody: "ONEartHeaven™ Academy",
    description:
      "Foundational competency in global governance principles, charter design, and deliberative democracy.",
    criteria: [
      "Complete Foundations of Global Governance course",
      "Pass governance principles assessment with 80%+ score",
      "Submit a 1,500-word governance reform proposal",
      "Participate in one live deliberation session",
    ],
    ffRecognition: false,
    earnedCount: 3420,
  },
  {
    id: "CB-002",
    name: "Climate & Peace Practitioner",
    level: "practitioner",
    issuingBody: "ONEartHeaven™ Academy",
    description:
      "Practitioner-level competency in climate action leadership and peacebuilding methodologies.",
    criteria: [
      "Complete Climate Action Leadership course",
      "Complete Conflict Resolution & Peacebuilding course",
      "Pass dual-track assessment with 75%+ score",
      "Design and present a community action plan",
      "Complete 20 hours of field practice",
    ],
    ffRecognition: false,
    earnedCount: 1840,
  },
  {
    id: "CB-003",
    name: "AI Governance Expert",
    level: "expert",
    issuingBody: "ONEartHeaven™ Academy",
    description:
      "Expert-level competency in AI-augmented governance design, ethical AI deployment, and digital policy.",
    criteria: [
      "Complete AI & Technology for Global Good course",
      "Complete Foundations of Global Governance course",
      "Pass AI governance expert assessment with 85%+",
      "Design an AI governance policy framework",
      "Present findings to a review panel",
      "Approved by Academy Review Committee",
    ],
    ffRecognition: false,
    earnedCount: 420,
  },
  {
    id: "CB-004",
    name: "FinFracFran™ Certified Practitioner",
    level: "practitioner",
    issuingBody: "FinFracFran™ Academy Institute",
    description:
      "Officially certified to operate and grow a FinFracFran™ Seed or Growth-tier franchise.",
    criteria: [
      "Complete FinFracFran™ Franchise Readiness course",
      "Pass franchise operations assessment with 80%+",
      "Submit a franchise business plan",
      "Complete compliance & disclosure module",
      "Sign the FinFracFran™ Practitioner Agreement",
    ],
    ffRecognition: true,
    earnedCount: 2160,
  },
  {
    id: "CB-005",
    name: "ICP Digital Governance Developer",
    level: "practitioner",
    issuingBody: "ICP Developer Alliance",
    description:
      "Certified to build and deploy governance applications on the Internet Computer Protocol.",
    criteria: [
      "Complete Digital Governance & Blockchain Basics course",
      "Deploy one smart contract on ICP mainnet",
      "Pass ICP technical assessment with 75%+",
      "Submit a governance dApp project for review",
    ],
    ffRecognition: false,
    earnedCount: 680,
  },
  {
    id: "CB-006",
    name: "Systems Leadership Practitioner",
    level: "practitioner",
    issuingBody: "ONEartHeaven™ Academy",
    description:
      "Practitioner competency in systems thinking, adaptive leadership, and multi-stakeholder coalition building.",
    criteria: [
      "Complete Transformational Leadership for Change Agents course",
      "Pass leadership competency assessment with 80%+",
      "Complete a 360-degree leadership feedback process",
      "Present a systems change initiative",
    ],
    ffRecognition: true,
    earnedCount: 1020,
  },
  {
    id: "CB-007",
    name: "Global Impact Leadership Master",
    level: "master",
    issuingBody: "ONEartHeaven™ Academy",
    description:
      "The highest leadership credential awarded by ONEartHeaven™ Academy. Reserved for demonstrated impact at scale.",
    criteria: [
      "Hold Systems Leadership Practitioner certification",
      "Lead an initiative impacting 10,000+ people",
      "Complete peer review panel presentation",
      "Two endorsements from Academy Faculty",
      "Complete Transformational Leadership capstone project",
      "Approved by Governing Council",
    ],
    ffRecognition: true,
    earnedCount: 94,
  },
  {
    id: "CB-008",
    name: "FinFracFran™ Master Franchisee",
    level: "master",
    issuingBody: "FinFracFran™ Academy Institute",
    description:
      "The apex FinFracFran™ credential. Recognizes Global-tier masters who have scaled franchises across multiple nations.",
    criteria: [
      "Hold FinFracFran™ Certified Practitioner credential",
      "Complete FinFracFran™ Distribution Leadership course",
      "Operate active franchise in 3+ nations",
      "Pass Global-tier compliance audit",
      "Present multi-country impact report",
      "Endorsed by FinFracFran™ Governing Board",
    ],
    ffRecognition: true,
    earnedCount: 48,
  },
];

// ─── Aggregate Stats ──────────────────────────────────────────────────────────

export const ACADEMY_STATS: AcademyStats = {
  totalCourses: 12,
  totalLearners: 39060,
  ideasSubmitted: 247,
  certificationsIssued: 12064,
  nationsReached: 147,
  instructors: 38,
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllCourses(): AcademyCourse[] {
  return ACADEMY_COURSES;
}

export function getCourse(id: string): AcademyCourse | undefined {
  return ACADEMY_COURSES.find((c) => c.id === id);
}

export function getCoursesByCategory(category: string): AcademyCourse[] {
  return ACADEMY_COURSES.filter((c) => c.category === category);
}

export function getAllIdeas(): IdeaSubmission[] {
  return IDEA_SUBMISSIONS;
}

export function getAllTracks(): TrainingTrack[] {
  return TRAINING_TRACKS;
}

export function getAllCertifications(): CertificationBadge[] {
  return CERTIFICATION_BADGES;
}

export function getCertification(id: string): CertificationBadge | undefined {
  return CERTIFICATION_BADGES.find((c) => c.id === id);
}

export function getAcademyStats(): AcademyStats {
  return ACADEMY_STATS;
}
