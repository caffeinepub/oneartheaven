export type RegionTag =
  | "africa"
  | "asia_pacific"
  | "europe"
  | "latin_america"
  | "middle_east"
  | "north_america"
  | "south_asia"
  | "global";

export type CompassionCategory =
  | "mental_health"
  | "refugees"
  | "elderly"
  | "youth"
  | "environment"
  | "gender_equity"
  | "disability";

export type VolunteerSkill =
  | "legal"
  | "medical"
  | "tech"
  | "education"
  | "advocacy"
  | "media"
  | "finance"
  | "logistics"
  | "research"
  | "translation"
  | "design"
  | "community_organizing";

export type ChapterStatus = "active" | "forming" | "suspended";
export type CommitmentLevel = "full_time" | "part_time" | "occasional";

export interface LocalChapter {
  id: string;
  name: string;
  region: RegionTag;
  country: string;
  city: string;
  memberCount: number;
  status: ChapterStatus;
  lead: string;
  foundedYear: number;
  activeProjects: string[];
  focusAreas: string[];
  contactEmail: string;
  finFracFranEnabled: boolean;
}

export interface CompassionCommunity {
  id: string;
  name: string;
  category: CompassionCategory;
  description: string;
  memberCount: number;
  activeInitiatives: number;
  regions: RegionTag[];
  leadOrg: string;
  impactStatement: string;
  joinCTA: string;
  color: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  skills: VolunteerSkill[];
  region: RegionTag;
  commitment: CommitmentLevel;
  organization: string;
  description: string;
  openSlots: number;
  urgency: "low" | "medium" | "high" | "critical";
  isRemote: boolean;
  finFracFranRole: boolean;
}

export interface YouthCouncilMember {
  id: string;
  name: string;
  country: string;
  region: RegionTag;
  age: number;
  role: string;
  focus: string[];
  tenure: string;
  quote: string;
}

export interface CitizenSpotlight {
  id: string;
  name: string;
  country: string;
  region: RegionTag;
  role: string;
  contribution: string;
  impact: string;
  joinedYear: number;
  council?: string;
}

export interface CommunityStats {
  totalCitizens: number;
  localChapters: number;
  volunteers: number;
  nations: number;
  compassionCommunities: number;
  youthMembers: number;
}
