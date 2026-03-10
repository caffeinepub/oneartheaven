// ─── Types ────────────────────────────────────────────────────────────────────

export interface CouncilMembership {
  councilId: string;
  councilName: string;
  role: string;
  since: number;
}

export interface VotingRecord {
  total: number;
  aligned: number;
  abstained: number;
  opposed: number;
}

export interface DelegateProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  affiliation: string;
  region: string;
  regionFlag: string;
  isChair: boolean;
  bio: string;
  expertiseTags: string[];
  languages: string[];
  councilMemberships: CouncilMembership[];
  votingRecord: VotingRecord;
  aiAlignmentScore: number;
  finFracFranRole?: string;
  joinedYear: number;
  contactEmail?: string;
  linkedinUrl?: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const DELEGATES: DelegateProfile[] = [
  {
    id: "amara-osei",
    name: "Dr. Amara Osei",
    title: "Chair, Climate & Environment Council",
    role: "Chair",
    affiliation: "African Climate Policy Institute",
    region: "West Africa",
    regionFlag: "🌍",
    isChair: true,
    bio: "Dr. Osei is a leading climate scientist and policy architect who has spent 20 years designing carbon-neutral frameworks for sub-Saharan Africa. She pioneered the continent's first community-owned solar microgrid standards and chairs the ONEartHeaven Climate Council. Her research on climate-induced migration has shaped two landmark international accords.",
    expertiseTags: [
      "Climate Finance",
      "Carbon Markets",
      "Community Energy",
      "Migration Policy",
    ],
    languages: ["English", "French", "Twi", "Hausa"],
    councilMemberships: [
      {
        councilId: "climate",
        councilName: "Climate & Environment",
        role: "Chair",
        since: 2022,
      },
      {
        councilId: "econ",
        councilName: "Economic Justice",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 87, aligned: 79, abstained: 5, opposed: 3 },
    aiAlignmentScore: 94,
    finFracFranRole: "Regional Franchise Coordinator – West Africa",
    joinedYear: 2022,
    contactEmail: "a.osei@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/amara-osei",
  },
  {
    id: "li-wei",
    name: "Ambassador Li Wei",
    title: "Co-Chair, Technology & Innovation Council",
    role: "Chair",
    affiliation: "Asia-Pacific Digital Governance Forum",
    region: "East Asia",
    regionFlag: "🌏",
    isChair: true,
    bio: "Ambassador Li Wei has spent 15 years at the intersection of technology diplomacy and AI governance, representing China at multiple multilateral digital rights conventions. As Co-Chair of the Technology Council, he leads the AI Ethics Sub-committee and authored the ONEartHeaven Algorithmic Accountability Charter. He is a vocal advocate for open-source infrastructure across emerging markets.",
    expertiseTags: [
      "AI Governance",
      "Cybersecurity",
      "Digital Rights",
      "Open Source Policy",
    ],
    languages: ["Mandarin", "English", "Japanese"],
    councilMemberships: [
      {
        councilId: "tech",
        councilName: "Technology & Innovation",
        role: "Co-Chair",
        since: 2022,
      },
      {
        councilId: "general",
        councilName: "General Assembly Committee",
        role: "Member",
        since: 2022,
      },
    ],
    votingRecord: { total: 104, aligned: 88, abstained: 10, opposed: 6 },
    aiAlignmentScore: 89,
    finFracFranRole: "Digital Infrastructure Franchise Lead – APAC",
    joinedYear: 2022,
    contactEmail: "l.wei@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/ambassador-li-wei",
  },
  {
    id: "maya-rodriguez",
    name: "Dr. Maya Rodríguez",
    title: "Chair, Health & Wellbeing Council",
    role: "Chair",
    affiliation: "Pan-American Health Innovation Alliance",
    region: "Latin America",
    regionFlag: "🌎",
    isChair: true,
    bio: "Dr. Rodríguez built community health networks across five Latin American countries before joining ONEartHeaven's founding cohort. Her work on universal healthcare access through decentralized care nodes is considered a model for the Global South. She directs the ONEartHeaven health equity framework and sits on the Food & Water sub-committee for nutrition policy.",
    expertiseTags: [
      "Global Health Equity",
      "Community Medicine",
      "Pandemic Preparedness",
      "Nutrition Policy",
    ],
    languages: ["Spanish", "English", "Portuguese"],
    councilMemberships: [
      {
        councilId: "health",
        councilName: "Health & Wellbeing",
        role: "Chair",
        since: 2022,
      },
      {
        councilId: "foodwater",
        councilName: "Food & Water Security",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 91, aligned: 84, abstained: 4, opposed: 3 },
    aiAlignmentScore: 96,
    finFracFranRole: "Health Franchise Coordinator – Americas",
    joinedYear: 2022,
    contactEmail: "m.rodriguez@onearthheaven.org",
  },
  {
    id: "fatima-al-rashid",
    name: "H.E. Fatima Al-Rashid",
    title: "Chair, Peace & Security Council",
    role: "Chair",
    affiliation: "Gulf Dialogue & Reconciliation Center",
    region: "Middle East",
    regionFlag: "🕌",
    isChair: true,
    bio: "Her Excellency Fatima Al-Rashid served as lead mediator in three major regional peace negotiations before co-founding the Gulf Dialogue and Reconciliation Center. She brings deep expertise in post-conflict reconstruction, disarmament verification, and hybrid justice systems. At ONEartHeaven she leads the Peace Council and advises on conflict-sensitive economic development.",
    expertiseTags: [
      "Conflict Mediation",
      "Disarmament",
      "Post-Conflict Reconstruction",
      "Hybrid Justice",
    ],
    languages: ["Arabic", "English", "French"],
    councilMemberships: [
      {
        councilId: "peace",
        councilName: "Peace & Security",
        role: "Chair",
        since: 2022,
      },
      {
        councilId: "culture",
        councilName: "Culture & Pluralism",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 78, aligned: 71, abstained: 6, opposed: 1 },
    aiAlignmentScore: 92,
    joinedYear: 2022,
    contactEmail: "f.alrashid@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/fatima-alrashid",
  },
  {
    id: "sofia-lindqvist",
    name: "Prof. Sofia Lindqvist",
    title: "Co-Chair, Education & Knowledge Council",
    role: "Chair",
    affiliation: "Nordic Institute for Global Learning",
    region: "Northern Europe",
    regionFlag: "🌐",
    isChair: true,
    bio: "Professor Lindqvist is a world-renowned educational reformer whose open-curriculum framework has been adopted by 23 countries. She leads the Education Council's multilingual literacy initiative and spearheads ONEartHeaven's Academy roadmap. Her research on decentralized credentialing inspired the platform's reputation and badging system.",
    expertiseTags: [
      "Educational Policy",
      "Open Curriculum",
      "Multilingual Literacy",
      "Decentralized Credentials",
    ],
    languages: ["Swedish", "English", "German", "French"],
    councilMemberships: [
      {
        councilId: "edu",
        councilName: "Education & Knowledge",
        role: "Co-Chair",
        since: 2022,
      },
      {
        councilId: "tech",
        councilName: "Technology & Innovation",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 95, aligned: 86, abstained: 7, opposed: 2 },
    aiAlignmentScore: 91,
    finFracFranRole: "Education Franchise Lead – Europe",
    joinedYear: 2022,
    contactEmail: "s.lindqvist@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/sofia-lindqvist",
  },
  {
    id: "kofi-mensah",
    name: "Kofi Mensah",
    title: "Member, Economic Justice Council",
    role: "Member",
    affiliation: "Pan-African Economic Liberation Fund",
    region: "East Africa",
    regionFlag: "🌍",
    isChair: false,
    bio: "Kofi Mensah is an economist and activist who designed debt-relief frameworks for 11 African nations and pioneered cooperative fintech infrastructure. He champions FinFracFran™ as a vehicle for sovereign wealth building in postcolonial economies. He serves on the Economic Justice Council and co-leads the FinFracFran™ working group.",
    expertiseTags: [
      "Debt Relief",
      "Cooperative Finance",
      "FinFracFran™ Economics",
      "Sovereign Wealth",
    ],
    languages: ["English", "Swahili", "French"],
    councilMemberships: [
      {
        councilId: "econ",
        councilName: "Economic Justice",
        role: "Member",
        since: 2022,
      },
      {
        councilId: "foodwater",
        councilName: "Food & Water Security",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 72, aligned: 63, abstained: 6, opposed: 3 },
    aiAlignmentScore: 88,
    finFracFranRole: "FinFracFran™ Working Group Lead",
    joinedYear: 2022,
    contactEmail: "k.mensah@onearthheaven.org",
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    title: "Member, Climate & Environment Council",
    role: "Member",
    affiliation: "South Asian Environmental Justice Consortium",
    region: "South Asia",
    regionFlag: "🌏",
    isChair: false,
    bio: "Dr. Priya Nair is a hydrology and water-rights specialist whose field work in the Ganges basin shaped international water-sharing protocols. She sits on the Climate Council with a focus on freshwater systems and monsoon adaptation. Her advocacy for indigenous water rights has earned her recognition from UNESCO and three national governments.",
    expertiseTags: [
      "Water Rights",
      "Climate Adaptation",
      "Indigenous Policy",
      "Hydrology",
    ],
    languages: ["Tamil", "Hindi", "English"],
    councilMemberships: [
      {
        councilId: "climate",
        councilName: "Climate & Environment",
        role: "Member",
        since: 2022,
      },
      {
        councilId: "foodwater",
        councilName: "Food & Water Security",
        role: "Member",
        since: 2022,
      },
    ],
    votingRecord: { total: 80, aligned: 71, abstained: 7, opposed: 2 },
    aiAlignmentScore: 90,
    joinedYear: 2022,
    contactEmail: "p.nair@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/priya-nair",
  },
  {
    id: "james-okafor",
    name: "Amb. James Okafor",
    title: "Member, Peace & Security Council",
    role: "Member",
    affiliation: "West African Peacekeeping Network",
    region: "Central Africa",
    regionFlag: "🌍",
    isChair: false,
    bio: "Ambassador Okafor is a retired brigadier general turned peace diplomat, with two decades of experience in UN peacekeeping missions across Central and West Africa. He leads the ONEartHeaven early-warning conflict prevention sub-committee and is developing an AI-powered threat-monitoring system for civilian protection. He is fluent in four languages and has authored the 'Peacekeepers Without Borders' protocol.",
    expertiseTags: [
      "Peacekeeping Operations",
      "Conflict Prevention",
      "AI Early Warning",
      "Civilian Protection",
    ],
    languages: ["English", "French", "Igbo", "Yoruba"],
    councilMemberships: [
      {
        councilId: "peace",
        councilName: "Peace & Security",
        role: "Member",
        since: 2022,
      },
      {
        councilId: "tech",
        councilName: "Technology & Innovation",
        role: "Member",
        since: 2024,
      },
    ],
    votingRecord: { total: 66, aligned: 58, abstained: 5, opposed: 3 },
    aiAlignmentScore: 87,
    joinedYear: 2022,
    contactEmail: "j.okafor@onearthheaven.org",
  },
  {
    id: "elena-vasquez",
    name: "Elena Vásquez",
    title: "Member, Culture & Pluralism Council",
    role: "Member",
    affiliation: "Iberoamerican Cultural Heritage Foundation",
    region: "Southern Europe",
    regionFlag: "🌐",
    isChair: false,
    bio: "Elena Vásquez is a cultural anthropologist and UNESCO Heritage advisor who has documented 200+ endangered cultural traditions across Latin America and the Iberian Peninsula. She chairs the ONEartHeaven pluralism sub-committee and architects the platform's multilingual identity framework. Her documentary series on indigenous knowledge systems has reached 40 million viewers worldwide.",
    expertiseTags: [
      "Cultural Heritage",
      "Linguistic Diversity",
      "Indigenous Knowledge",
      "Media & Narrative",
    ],
    languages: ["Spanish", "Portuguese", "English", "Catalan"],
    councilMemberships: [
      {
        councilId: "culture",
        councilName: "Culture & Pluralism",
        role: "Member",
        since: 2022,
      },
      {
        councilId: "edu",
        councilName: "Education & Knowledge",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 74, aligned: 65, abstained: 8, opposed: 1 },
    aiAlignmentScore: 85,
    joinedYear: 2022,
    linkedinUrl: "https://linkedin.com/in/elena-vasquez",
  },
  {
    id: "ravi-krishnan",
    name: "Dr. Ravi Krishnan",
    title: "Member, Technology & Innovation Council",
    role: "Member",
    affiliation: "IIT Bangalore Centre for Decentralized Systems",
    region: "South Asia",
    regionFlag: "🌏",
    isChair: false,
    bio: "Dr. Ravi Krishnan is the architect of ONEartHeaven's ICP-based infrastructure and a pioneer in decentralized protocol design. His research on zero-knowledge proofs applied to governance verification has been cited over 3,000 times. He leads the platform's open-source working group and mentors 200+ blockchain developers across emerging markets.",
    expertiseTags: [
      "Decentralized Infrastructure",
      "Zero-Knowledge Proofs",
      "ICP Protocol",
      "Open-Source Governance",
    ],
    languages: ["Tamil", "English", "Hindi"],
    councilMemberships: [
      {
        councilId: "tech",
        councilName: "Technology & Innovation",
        role: "Member",
        since: 2022,
      },
      {
        councilId: "general",
        councilName: "General Assembly Committee",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 88, aligned: 79, abstained: 6, opposed: 3 },
    aiAlignmentScore: 93,
    finFracFranRole: "Technology Franchise Architect – South Asia",
    joinedYear: 2022,
    contactEmail: "r.krishnan@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/ravi-krishnan",
  },
  {
    id: "aroha-ngata",
    name: "Aroha Ngata",
    title: "Chair, Food & Water Security Council",
    role: "Chair",
    affiliation: "Pacific Indigenous Resource Coalition",
    region: "Oceania",
    regionFlag: "🌊",
    isChair: true,
    bio: "Aroha Ngata is a Māori environmental leader and food sovereignty advocate whose regenerative agriculture frameworks have been adopted across Pacific Island nations. She chairs the Food & Water Security Council and leads the platform's ocean health initiative. Her integration of mātauranga Māori (traditional ecological knowledge) into modern governance protocols is considered groundbreaking.",
    expertiseTags: [
      "Food Sovereignty",
      "Ocean Health",
      "Indigenous Ecology",
      "Regenerative Agriculture",
    ],
    languages: ["English", "Māori", "Samoan"],
    councilMemberships: [
      {
        councilId: "foodwater",
        councilName: "Food & Water Security",
        role: "Chair",
        since: 2022,
      },
      {
        councilId: "climate",
        councilName: "Climate & Environment",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 69, aligned: 63, abstained: 4, opposed: 2 },
    aiAlignmentScore: 97,
    finFracFranRole: "Pacific Islands Franchise Lead",
    joinedYear: 2022,
    contactEmail: "a.ngata@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/aroha-ngata",
  },
  {
    id: "olivier-martin",
    name: "Prof. Olivier Martin",
    title: "Member, Economic Justice Council",
    role: "Member",
    affiliation: "European Institute for Inclusive Economics",
    region: "Western Europe",
    regionFlag: "🌐",
    isChair: false,
    bio: "Professor Martin is a heterodox economist whose Universal Basic Resources framework has been adopted as a pilot in 12 European municipalities. He co-designed the FinFracFran™ capitalization model and advises the Economic Justice Council on alternative monetary systems, wealth redistribution protocols, and hybrid cooperative-enterprise structures.",
    expertiseTags: [
      "Universal Basic Resources",
      "Alternative Monetary Systems",
      "Cooperative Economics",
      "Wealth Redistribution",
    ],
    languages: ["French", "English", "German"],
    councilMemberships: [
      {
        councilId: "econ",
        councilName: "Economic Justice",
        role: "Member",
        since: 2022,
      },
      {
        councilId: "edu",
        councilName: "Education & Knowledge",
        role: "Member",
        since: 2024,
      },
    ],
    votingRecord: { total: 77, aligned: 68, abstained: 7, opposed: 2 },
    aiAlignmentScore: 86,
    finFracFranRole: "FinFracFran™ Model Architect – Europe",
    joinedYear: 2022,
    contactEmail: "o.martin@onearthheaven.org",
  },
  {
    id: "yasmin-hassan",
    name: "Dr. Yasmin Hassan",
    title: "Member, Health & Wellbeing Council",
    role: "Member",
    affiliation: "East African Medical Research Collaborative",
    region: "East Africa",
    regionFlag: "🌍",
    isChair: false,
    bio: "Dr. Hassan is an epidemiologist and public health innovator who developed a community-based disease surveillance system now deployed across 14 African nations. She leads the ONEartHeaven mental health task force and advocates for decolonizing global health data standards. Her mobile clinic network model has served over 2 million patients in underserved regions.",
    expertiseTags: [
      "Epidemiology",
      "Mental Health Policy",
      "Community Surveillance",
      "Health Data Sovereignty",
    ],
    languages: ["Arabic", "English", "Swahili", "Somali"],
    councilMemberships: [
      {
        councilId: "health",
        councilName: "Health & Wellbeing",
        role: "Member",
        since: 2023,
      },
      {
        councilId: "general",
        councilName: "General Assembly Committee",
        role: "Member",
        since: 2023,
      },
    ],
    votingRecord: { total: 54, aligned: 49, abstained: 3, opposed: 2 },
    aiAlignmentScore: 91,
    joinedYear: 2023,
    contactEmail: "y.hassan@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/yasmin-hassan",
  },
  {
    id: "carlos-fuentes",
    name: "Carlos Fuentes Jr.",
    title: "Co-Chair, Economic Justice Council",
    role: "Chair",
    affiliation: "Latin American Solidarity Economy Network",
    region: "Central America",
    regionFlag: "🌎",
    isChair: true,
    bio: "Carlos Fuentes Jr. has spent 18 years building solidarity economy networks in Central and South America, connecting cooperatives, credit unions, and social enterprises into a unified FinFracFran™ ecosystem. As Co-Chair of Economic Justice, he leads the platform's entrepreneurship and resource resilience agenda. His micro-franchise model for sustainable livelihoods is now deployed in 9 countries.",
    expertiseTags: [
      "Solidarity Economy",
      "Micro-Finance",
      "Social Enterprise",
      "Resource Resilience",
    ],
    languages: ["Spanish", "English", "Quechua"],
    councilMemberships: [
      {
        councilId: "econ",
        councilName: "Economic Justice",
        role: "Co-Chair",
        since: 2022,
      },
      {
        councilId: "health",
        councilName: "Health & Wellbeing",
        role: "Member",
        since: 2024,
      },
    ],
    votingRecord: { total: 83, aligned: 74, abstained: 6, opposed: 3 },
    aiAlignmentScore: 88,
    finFracFranRole: "Micro-Franchise Deployment Lead – Central/South America",
    joinedYear: 2022,
    contactEmail: "c.fuentes@onearthheaven.org",
    linkedinUrl: "https://linkedin.com/in/carlos-fuentes-jr",
  },
];

export const DELEGATE_REGIONS = [
  "All Regions",
  ...Array.from(new Set(DELEGATES.map((d) => d.region))).sort(),
];

export const DELEGATE_COUNCIL_OPTIONS = [
  { value: "all", label: "All Councils" },
  { value: "climate", label: "Climate & Environment" },
  { value: "health", label: "Health & Wellbeing" },
  { value: "peace", label: "Peace & Security" },
  { value: "econ", label: "Economic Justice" },
  { value: "edu", label: "Education & Knowledge" },
  { value: "tech", label: "Technology & Innovation" },
  { value: "foodwater", label: "Food & Water Security" },
  { value: "culture", label: "Culture & Pluralism" },
  { value: "general", label: "General Assembly" },
];
