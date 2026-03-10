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

export type InitiativeStatus = "active" | "launching" | "complete" | "paused";
export type ResourceType =
  | "guide"
  | "toolkit"
  | "dataset"
  | "video"
  | "template"
  | "report";
export type VolunteerSkill =
  | "technical"
  | "field"
  | "research"
  | "community"
  | "advocacy"
  | "creative";
export type PartnerType =
  | "ngo"
  | "academic"
  | "government"
  | "cooperative"
  | "icp"
  | "media";
export type ImpactUnit =
  | "people"
  | "nations"
  | "communities"
  | "schools"
  | "hectares"
  | "tonnes_co2"
  | "liters_water";

export interface ImpactStat {
  label: string;
  value: number;
  unit: ImpactUnit | string;
  trend: "up" | "down" | "stable";
  trendPct?: number;
}

export interface ActiveInitiative {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  progress: number;
  leadOrg: string;
  region: string;
  startDate: string;
  targetDate: string;
  participantCount: number;
  sdgTags: string[];
  finFracFranEnabled: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  downloadCount: number;
  language: string;
  url: string;
  featured: boolean;
}

export interface PartnerOrg {
  id: string;
  name: string;
  type: PartnerType;
  region: string;
  description: string;
  memberSince: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  description: string;
  skills: VolunteerSkill[];
  commitment: string;
  openSlots: number;
  region: string;
}

export interface FinFracFranSpotlight {
  summary: string;
  adoptingNations: number;
  adoptingCities: number;
  licenseType: string;
  replicationTime: string;
  successStory: string;
}

export interface ActionPortal {
  councilId: CouncilId;
  name: string;
  shortName: string;
  icon: string;
  accentColor: string;
  tagline: string;
  mandate: string;
  impactStats: ImpactStat[];
  sdgAlignment: string[];
  initiatives: ActiveInitiative[];
  resources: ResourceItem[];
  partners: PartnerOrg[];
  volunteerRoles: VolunteerRole[];
  finFracFranSpotlight?: FinFracFranSpotlight;
  volunteerCount: number;
  nationCount: number;
}

export const COUNCIL_PORTAL_CONFIG: Record<
  CouncilId,
  { color: string; icon: string; name: string }
> = {
  climate: {
    color: "oklch(0.65 0.18 145)",
    icon: "🌿",
    name: "ClimateAction Hub",
  },
  health: { color: "oklch(0.62 0.18 25)", icon: "🏥", name: "HealthForAll" },
  peace: { color: "oklch(0.68 0.14 255)", icon: "🕊️", name: "PeaceBuilders" },
  econ: { color: "oklch(0.72 0.18 75)", icon: "⚖️", name: "EconJustice" },
  edu: { color: "oklch(0.65 0.18 295)", icon: "📚", name: "EduVerse" },
  tech: { color: "oklch(0.62 0.16 215)", icon: "💡", name: "TechForAll" },
  foodwater: {
    color: "oklch(0.68 0.2 55)",
    icon: "🌾",
    name: "FoodWater Sovereignty",
  },
  culture: { color: "oklch(0.62 0.2 355)", icon: "🎭", name: "CultureBridge" },
  general: {
    color: "oklch(0.72 0.16 75)",
    icon: "🌐",
    name: "General Assembly",
  },
};
