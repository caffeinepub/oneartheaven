// ─── Onboarding & In-App Help System Types ─────────────────────────────────

export type TourRole =
  | "any"
  | "Delegate"
  | "OrgAdmin"
  | "Vendor"
  | "SuperAdmin";
export type TourStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "skipped";
export type StepPosition = "top" | "bottom" | "left" | "right" | "center";

export interface OnboardingStep {
  stepId: string;
  title: string;
  description: string;
  targetOcid?: string;
  position: StepPosition;
  navigateTo?: string;
  cardWidth?: number;
}

export interface OnboardingTour {
  tourId: string;
  name: string;
  description: string;
  targetRole: TourRole;
  steps: OnboardingStep[];
  completionKey: string;
  icon: string;
  estimatedMinutes: number;
  badgeLabel?: string;
}

export interface TourProgress {
  tourId: string;
  status: TourStatus;
  currentStepIndex: number;
  startedAt?: string;
  completedAt?: string;
  skippedAt?: string;
}

export interface HelpArticle {
  id: string;
  title: string;
  summary: string;
  docSectionId?: string;
  relatedRoutes: string[];
  tags: string[];
}

export interface HelpSearchResult {
  type: "article" | "tour" | "doc";
  id: string;
  title: string;
  summary: string;
  actionLabel: string;
  route?: string;
  tourId?: string;
  docSectionId?: string;
}

export const TOUR_ROLE_CONFIG: Record<
  TourRole,
  { label: string; color: string }
> = {
  any: { label: "All Users", color: "oklch(0.7 0.15 260)" },
  Delegate: { label: "Delegate", color: "oklch(0.7 0.18 200)" },
  OrgAdmin: { label: "Org Admin", color: "oklch(0.7 0.15 50)" },
  Vendor: { label: "Vendor", color: "oklch(0.7 0.17 155)" },
  SuperAdmin: { label: "Super Admin", color: "oklch(0.7 0.18 310)" },
};

export const TOUR_STATUS_CONFIG: Record<
  TourStatus,
  { label: string; color: string }
> = {
  not_started: { label: "Not Started", color: "oklch(0.5 0.03 260)" },
  in_progress: { label: "In Progress", color: "oklch(0.7 0.18 200)" },
  completed: { label: "Completed", color: "oklch(0.7 0.17 155)" },
  skipped: { label: "Skipped", color: "oklch(0.6 0.1 50)" },
};

export const ONBOARDING_STORAGE_PREFIX = "oeh_tour_";
export const WELCOME_SEEN_KEY = "oeh_welcome_seen";
