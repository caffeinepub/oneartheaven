import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getTour } from "@/data/onboardingData";
import { useOnboardingTour } from "@/hooks/useOnboarding";
import { CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

interface OnboardingTourOverlayProps {
  tourId: string;
  onClose: () => void;
}

export function OnboardingTourOverlay({
  tourId,
  onClose,
}: OnboardingTourOverlayProps) {
  const {
    tour,
    progress,
    currentStep,
    isComplete,
    totalSteps,
    stepNumber,
    progressPct,
    startTour,
    nextStep,
    prevStep,
    skipTour,
  } = useOnboardingTour(tourId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only on mount
  useEffect(() => {
    if (progress.status === "not_started") startTour();
  }, []); // eslint-disable-line

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") nextStep();
      else if (e.key === "ArrowLeft") prevStep();
      else if (e.key === "Escape") {
        skipTour();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nextStep, prevStep, skipTour, onClose]);

  if (!tour) return null;

  const handleNext = () => {
    if (stepNumber >= totalSteps) {
      onClose();
    } else {
      nextStep();
    }
  };

  const handleSkip = () => {
    skipTour();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="tour-backdrop"
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-ocid="onboarding.overlay"
      >
        <motion.div
          key={`step-${stepNumber}`}
          className="relative bg-[oklch(var(--cosmos-mid))] border border-[oklch(var(--gold)/0.25)] rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          data-ocid="onboarding.step.card"
        >
          {/* Close */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-4 right-4 text-[oklch(0.5_0.03_260)] hover:text-[oklch(0.8_0.02_260)] transition-colors"
            data-ocid="onboarding.skip.button"
            aria-label="Skip tour"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{tour.icon}</span>
            <div>
              <p className="text-[oklch(0.5_0.03_260)] text-xs font-medium uppercase tracking-wider">
                {tour.name}
              </p>
              <p className="text-[oklch(0.55_0.04_260)] text-xs">
                Step {stepNumber} of {totalSteps} · ~{tour.estimatedMinutes} min
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <Progress
            value={progressPct}
            className="h-1.5 mb-5 bg-[oklch(0.2_0.02_260)]"
            data-ocid="onboarding.progress.bar"
          />

          {isComplete ? (
            /* Completion screen */
            <div className="text-center py-4">
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="h-12 w-12 text-[oklch(0.7_0.17_155)]" />
              </div>
              <h3 className="text-lg font-bold text-[oklch(0.9_0.02_260)] mb-2">
                Tour Complete!
              </h3>
              <p className="text-sm text-[oklch(0.6_0.04_260)] mb-4">
                You've completed the {tour.name} tour. Explore the platform with
                confidence.
              </p>
              <div className="text-xs text-[oklch(0.45_0.03_260)] mb-5">
                {tour.steps.map((s) => (
                  <div
                    key={s.stepId}
                    className="flex items-center gap-2 py-0.5"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[oklch(0.7_0.17_155)] flex-shrink-0" />
                    <span>{s.title}</span>
                  </div>
                ))}
              </div>
              <Button
                className="btn-gold w-full"
                onClick={onClose}
                data-ocid="onboarding.complete.close.button"
              >
                Start Exploring
              </Button>
            </div>
          ) : (
            /* Step content */
            <>
              <h3 className="text-base font-bold text-[oklch(0.92_0.02_260)] mb-2">
                {currentStep?.title}
              </h3>
              <p className="text-sm text-[oklch(0.65_0.04_260)] leading-relaxed mb-6">
                {currentStep?.description}
              </p>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  disabled={stepNumber === 1}
                  className="text-[oklch(0.55_0.04_260)] hover:text-[oklch(0.8_0.02_260)]"
                  data-ocid="onboarding.prev.button"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <span className="text-[oklch(0.4_0.03_260)] text-xs flex-1 text-center">
                  {stepNumber}/{totalSteps}
                </span>
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="btn-gold"
                  data-ocid="onboarding.next.button"
                >
                  {stepNumber >= totalSteps ? "Finish" : "Next"}
                  {stepNumber < totalSteps && (
                    <ChevronRight className="h-4 w-4 ml-1" />
                  )}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
