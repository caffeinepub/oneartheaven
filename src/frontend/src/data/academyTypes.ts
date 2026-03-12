// ─── Academy Types ────────────────────────────────────────────────────────────

export type CourseCategory =
  | "governance"
  | "finfracfran"
  | "climate"
  | "health"
  | "peace"
  | "technology"
  | "leadership"
  | "solutions"
  | "culture"
  | "finance";

export type CourseLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type IdeaStage =
  | "draft"
  | "review"
  | "incubating"
  | "piloting"
  | "adopted";

export type TrackCategory =
  | "governance"
  | "finfracfran"
  | "climate"
  | "technology"
  | "leadership"
  | "peacebuilding";

export type CertLevel = "foundation" | "practitioner" | "expert" | "master";

export type ModuleType =
  | "video"
  | "reading"
  | "quiz"
  | "project"
  | "live"
  | "workshop";

export type FFTier = "seed" | "growth" | "scale" | "global";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface CourseModule {
  id: string;
  title: string;
  type: ModuleType;
  durationMinutes: number;
  completed?: boolean;
}

export interface AcademyCourse {
  id: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  instructor: string;
  instructorBio: string;
  durationHours: number;
  modules: CourseModule[];
  sdgs: number[];
  ffTag?: boolean;
  ffTierRequired?: FFTier;
  enrollmentCount: number;
  rating: number;
  status: "live" | "beta" | "coming_soon";
  description: string;
  certEligible: boolean;
}

export interface IdeaSubmission {
  id: string;
  title: string;
  category: CourseCategory;
  submitter: string;
  submitterRegion: string;
  description: string;
  stage: IdeaStage;
  votes: number;
  ffPotential: boolean;
  mentors?: string[];
  linkedSolutions?: string[];
  linkedCourses?: string[];
}

export interface TrainingTrack {
  id: string;
  name: string;
  category: TrackCategory;
  description: string;
  totalWeeks: number;
  moduleCount: number;
  targetAudience: string;
  ffTierRequired?: FFTier;
  certifications: string[];
  enrollmentCount: number;
}

export interface CertificationBadge {
  id: string;
  name: string;
  level: CertLevel;
  issuingBody: string;
  description: string;
  criteria: string[];
  ffRecognition: boolean;
  earnedCount: number;
}

export interface AcademyStats {
  totalCourses: number;
  totalLearners: number;
  ideasSubmitted: number;
  certificationsIssued: number;
  nationsReached: number;
  instructors: number;
}

// ─── Config Constants ─────────────────────────────────────────────────────────

export const COURSE_CATEGORY_CONFIG: Record<
  CourseCategory,
  { label: string; color: string; emoji: string }
> = {
  governance: { label: "Governance", color: "oklch(0.72 0.16 75)", emoji: "🏛️" },
  finfracfran: {
    label: "FinFracFran™",
    color: "oklch(0.76 0.18 75)",
    emoji: "💰",
  },
  climate: { label: "Climate", color: "oklch(0.68 0.18 160)", emoji: "🌿" },
  health: { label: "Health", color: "oklch(0.65 0.18 25)", emoji: "❤️" },
  peace: { label: "Peace", color: "oklch(0.65 0.12 240)", emoji: "☮️" },
  technology: {
    label: "Technology",
    color: "oklch(0.62 0.18 270)",
    emoji: "💻",
  },
  leadership: {
    label: "Leadership",
    color: "oklch(0.68 0.16 310)",
    emoji: "⭐",
  },
  solutions: { label: "Solutions", color: "oklch(0.65 0.16 195)", emoji: "🔧" },
  culture: { label: "Culture", color: "oklch(0.68 0.14 350)", emoji: "🎨" },
  finance: { label: "Finance", color: "oklch(0.65 0.18 140)", emoji: "📊" },
};

export const COURSE_LEVEL_CONFIG: Record<
  CourseLevel,
  { label: string; color: string }
> = {
  beginner: { label: "Beginner", color: "oklch(0.68 0.18 160)" },
  intermediate: { label: "Intermediate", color: "oklch(0.72 0.16 75)" },
  advanced: { label: "Advanced", color: "oklch(0.65 0.18 25)" },
  expert: { label: "Expert", color: "oklch(0.62 0.18 270)" },
};

export const IDEA_STAGE_CONFIG: Record<
  IdeaStage,
  { label: string; color: string; step: number }
> = {
  draft: { label: "Draft", color: "oklch(0.52 0.04 260)", step: 1 },
  review: { label: "Under Review", color: "oklch(0.72 0.16 75)", step: 2 },
  incubating: { label: "Incubating", color: "oklch(0.65 0.18 195)", step: 3 },
  piloting: { label: "Piloting", color: "oklch(0.62 0.18 270)", step: 4 },
  adopted: { label: "Adopted", color: "oklch(0.68 0.18 160)", step: 5 },
};

export const TRACK_CATEGORY_CONFIG: Record<
  TrackCategory,
  { label: string; color: string; emoji: string }
> = {
  governance: { label: "Governance", color: "oklch(0.72 0.16 75)", emoji: "🏛️" },
  finfracfran: {
    label: "FinFracFran™",
    color: "oklch(0.76 0.18 75)",
    emoji: "💰",
  },
  climate: { label: "Climate", color: "oklch(0.68 0.18 160)", emoji: "🌿" },
  technology: {
    label: "Technology",
    color: "oklch(0.62 0.18 270)",
    emoji: "💻",
  },
  leadership: {
    label: "Leadership",
    color: "oklch(0.68 0.16 310)",
    emoji: "⭐",
  },
  peacebuilding: {
    label: "Peacebuilding",
    color: "oklch(0.65 0.12 240)",
    emoji: "☮️",
  },
};

export const CERT_LEVEL_CONFIG: Record<
  CertLevel,
  { label: string; color: string; bgColor: string }
> = {
  foundation: {
    label: "Foundation",
    color: "oklch(0.65 0.16 195)",
    bgColor: "oklch(0.65 0.16 195 / 0.12)",
  },
  practitioner: {
    label: "Practitioner",
    color: "oklch(0.62 0.18 240)",
    bgColor: "oklch(0.62 0.18 240 / 0.12)",
  },
  expert: {
    label: "Expert",
    color: "oklch(0.72 0.18 65)",
    bgColor: "oklch(0.72 0.18 65 / 0.12)",
  },
  master: {
    label: "Master",
    color: "oklch(0.76 0.18 75)",
    bgColor: "oklch(0.76 0.18 75 / 0.12)",
  },
};
