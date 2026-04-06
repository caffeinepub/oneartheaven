import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { Download, X } from "lucide-react";

export function InstallBanner() {
  const { showBanner, triggerInstall, dismissBanner } = useInstallPrompt();

  if (!showBanner) return null;

  return (
    <div
      role="banner"
      aria-label="Install ONEartHeaven app"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-3 bg-[#0f1420] border-t border-[#D4A843]/30 shadow-2xl md:bottom-4 md:left-4 md:right-auto md:rounded-xl md:border md:max-w-sm"
    >
      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-lg bg-[#D4A843]/10 border border-[#D4A843]/30 flex items-center justify-center">
        <span className="text-lg">🌍</span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#f0ead6] leading-tight">
          Install ONEartHeaven™
        </p>
        <p className="text-xs text-[#9a9080] mt-0.5">
          Add to your home screen for quick access
        </p>
      </div>

      {/* Install CTA */}
      <button
        type="button"
        onClick={triggerInstall}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4A843] text-[#0a0e1a] text-xs font-bold hover:bg-[#c49a3a] transition-colors"
        aria-label="Install app"
      >
        <Download className="w-3 h-3" />
        Install
      </button>

      {/* Dismiss */}
      <button
        type="button"
        onClick={dismissBanner}
        className="shrink-0 p-1 rounded text-[#9a9080] hover:text-[#f0ead6] hover:bg-white/5 transition-colors"
        aria-label="Dismiss install banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
