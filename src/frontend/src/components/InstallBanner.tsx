import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { Download, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function InstallBanner() {
  const { showBanner, triggerInstall, dismissBanner } = useInstallPrompt();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          role="complementary"
          aria-label="Install ONEartHeaven app"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-3 md:bottom-4 md:left-4 md:right-auto md:max-w-sm"
          style={{
            background: "oklch(0.14 0.05 260)",
            borderTop: "1px solid oklch(var(--gold) / 0.3)",
          }}
        >
          {/* Desktop card style — rounded-xl with border */}
          <div
            className="hidden md:block absolute inset-0 rounded-xl pointer-events-none"
            aria-hidden="true"
            style={{
              border: "1px solid oklch(0.22 0.04 260)",
              borderTop: "1px solid oklch(var(--gold) / 0.3)",
            }}
          />

          {/* Icon */}
          <div
            className="relative shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(var(--gold) / 0.1)",
              border: "1px solid oklch(var(--gold) / 0.3)",
            }}
          >
            <span className="text-lg" role="img" aria-label="Globe">
              🌍
            </span>
          </div>

          {/* Text */}
          <div className="relative flex-1 min-w-0">
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: "oklch(0.94 0.02 95)" }}
            >
              Install ONEartHeaven™
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.55 0.04 260)" }}
            >
              Add to your home screen for quick access
            </p>
          </div>

          {/* Install CTA */}
          <button
            type="button"
            onClick={triggerInstall}
            aria-label="Install ONEartHeaven app"
            className="relative shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[oklch(var(--gold)/0.6)] focus-visible:outline-none"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(0.08 0.03 260)",
            }}
          >
            <Download className="w-3 h-3" aria-hidden="true" />
            Install
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismissBanner}
            aria-label="Dismiss install prompt"
            className="relative shrink-0 p-1.5 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[oklch(var(--gold)/0.4)] focus-visible:outline-none"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
