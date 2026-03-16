import {
  getAllTours,
  getHelpArticles,
  getTour,
  searchHelpArticles,
} from "@/data/onboardingData";
import {
  ONBOARDING_STORAGE_PREFIX,
  type TourProgress,
  type TourStatus,
} from "@/data/onboardingTypes";
import { useCallback, useEffect, useMemo, useState } from "react";

// ─── Storage helpers ──────────────────────────────────────────────────────────

function loadProgress(tourId: string): TourProgress {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_PREFIX + tourId);
    if (raw) return JSON.parse(raw) as TourProgress;
  } catch {}
  return { tourId, status: "not_started", currentStepIndex: 0 };
}

function saveProgress(progress: TourProgress) {
  try {
    localStorage.setItem(
      ONBOARDING_STORAGE_PREFIX + progress.tourId,
      JSON.stringify(progress),
    );
  } catch {}
}

// ─── useTourProgress ─────────────────────────────────────────────────────────

export function useTourProgress(tourId: string) {
  const [progress, setProgress] = useState<TourProgress>(() =>
    loadProgress(tourId),
  );

  const update = useCallback((patch: Partial<TourProgress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...patch };
      saveProgress(next);
      return next;
    });
  }, []);

  const startTour = useCallback(
    () =>
      update({
        status: "in_progress",
        currentStepIndex: 0,
        startedAt: new Date().toISOString(),
      }),
    [update],
  );

  const nextStep = useCallback((totalSteps: number) => {
    setProgress((prev) => {
      const nextIndex = prev.currentStepIndex + 1;
      const isDone = nextIndex >= totalSteps;
      const next: TourProgress = {
        ...prev,
        currentStepIndex: isDone ? totalSteps - 1 : nextIndex,
        status: isDone ? "completed" : "in_progress",
        ...(isDone ? { completedAt: new Date().toISOString() } : {}),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const prevStep = useCallback(
    () =>
      update({ currentStepIndex: Math.max(0, progress.currentStepIndex - 1) }),
    [update, progress.currentStepIndex],
  );

  const skipTour = useCallback(
    () => update({ status: "skipped", skippedAt: new Date().toISOString() }),
    [update],
  );

  const completeTour = useCallback(
    () =>
      update({ status: "completed", completedAt: new Date().toISOString() }),
    [update],
  );

  const resetTour = useCallback(() => {
    const fresh: TourProgress = {
      tourId,
      status: "not_started",
      currentStepIndex: 0,
    };
    saveProgress(fresh);
    setProgress(fresh);
  }, [tourId]);

  return {
    progress,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    resetTour,
  };
}

// ─── useOnboardingTour ────────────────────────────────────────────────────────

export function useOnboardingTour(tourId: string) {
  const tour = useMemo(() => getTour(tourId), [tourId]);
  const {
    progress,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    resetTour,
  } = useTourProgress(tourId);

  const totalSteps = tour?.steps.length ?? 0;
  const currentStep = tour?.steps[progress.currentStepIndex] ?? null;
  const isActive = progress.status === "in_progress";
  const isComplete = progress.status === "completed";
  const stepNumber = progress.currentStepIndex + 1;
  const progressPct = totalSteps > 0 ? (stepNumber / totalSteps) * 100 : 0;

  const handleNext = useCallback(
    () => nextStep(totalSteps),
    [nextStep, totalSteps],
  );

  return {
    tour,
    progress,
    currentStep,
    isActive,
    isComplete,
    totalSteps,
    stepNumber,
    progressPct,
    startTour,
    nextStep: handleNext,
    prevStep,
    skipTour,
    completeTour,
    resetTour,
  };
}

// ─── useAllToursProgress ──────────────────────────────────────────────────────

export function useAllToursProgress() {
  const tours = getAllTours();
  const progresses = tours.map((t) => loadProgress(t.tourId));
  const completedCount = progresses.filter(
    (p) => p.status === "completed",
  ).length;
  const totalCount = tours.length;
  const overallPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return { progresses, completedCount, totalCount, overallPct };
}

// ─── useHelpCenter ────────────────────────────────────────────────────────────

export function useHelpCenter(route: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const contextArticles = useMemo(() => getHelpArticles(route), [route]);
  const searchResults = useMemo(
    () =>
      searchQuery.trim().length > 1 ? searchHelpArticles(searchQuery) : [],
    [searchQuery],
  );

  // keyboard shortcut: ? key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
    searchQuery,
    setSearchQuery,
    contextArticles,
    searchResults,
    hasResults: searchResults.length > 0,
    isEmpty: searchQuery.trim().length > 1 && searchResults.length === 0,
  };
}

// ─── useFirstLoginTour ────────────────────────────────────────────────────────
// Auto-trigger appropriate tour once per role on first login

export function useFirstLoginTour(isLoggedIn: boolean, role: string | null) {
  const [autoStartTourId, setAutoStartTourId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !role) return;
    const tourMap: Record<string, string> = {
      Delegate: "delegate-quickstart",
      OrgAdmin: "org-admin-quickstart",
      Vendor: "vendor-quickstart",
    };
    const tourId = tourMap[role] ?? "platform-overview";
    const progress = loadProgress(tourId);
    if (progress.status === "not_started") {
      // slight delay so the page finishes rendering
      const timer = setTimeout(() => setAutoStartTourId(tourId), 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, role]);

  return { autoStartTourId, clearAutoStart: () => setAutoStartTourId(null) };
}
