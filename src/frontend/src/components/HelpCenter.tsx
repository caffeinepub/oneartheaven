import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllTours } from "@/data/onboardingData";
import { useHelpCenter } from "@/hooks/useOnboarding";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ExternalLink,
  HelpCircle,
  PlayCircle,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const QUICK_LINKS = [
  { label: "Documentation", route: "/docs", icon: BookOpen },
  { label: "Pricing & Plans", route: "/pricing", icon: ExternalLink },
  { label: "Vendor Portal", route: "/vendor/register", icon: ExternalLink },
  { label: "Register", route: "/register", icon: ExternalLink },
];

interface HelpCenterProps {
  onStartTour?: (tourId: string) => void;
}

export function HelpCenter({ onStartTour }: HelpCenterProps) {
  const routerState = useRouterState();
  const currentRoute = routerState.location.pathname;
  const help = useHelpCenter(currentRoute);
  const allTours = getAllTours();

  return (
    <>
      {/* Floating ? button */}
      <button
        type="button"
        onClick={help.toggle}
        className="fixed bottom-6 right-6 z-[100] h-12 w-12 rounded-full btn-gold shadow-lg flex items-center justify-center text-lg font-bold transition-transform hover:scale-110 active:scale-95"
        aria-label="Open Help Center (press ?)"
        data-ocid="help.center.open_modal_button"
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      {/* Slide-in panel */}
      <AnimatePresence>
        {help.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[110] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={help.close}
              data-ocid="help.center.backdrop"
            />

            {/* Panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-[120] w-full max-w-sm bg-[oklch(var(--cosmos-mid))] border-l border-[oklch(var(--gold)/0.15)] shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              data-ocid="help.center.panel"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[oklch(1_0_0/0.06)]">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[var(--gold)]" />
                  <span className="font-semibold text-[oklch(0.9_0.02_260)]">
                    Help Center
                  </span>
                  <Badge className="text-[10px] px-1.5 py-0 bg-[oklch(var(--gold)/0.15)] text-[var(--gold)] border-[oklch(var(--gold)/0.3)]">
                    Phase 12
                  </Badge>
                </div>
                <button
                  type="button"
                  onClick={help.close}
                  className="text-[oklch(0.5_0.03_260)] hover:text-[oklch(0.8_0.02_260)]"
                  data-ocid="help.center.close.button"
                  aria-label="Close help center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search */}
              <div className="p-3 border-b border-[oklch(1_0_0/0.06)]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.45_0.03_260)]" />
                  <Input
                    placeholder="Search help articles…"
                    value={help.searchQuery}
                    onChange={(e) => help.setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-sm bg-[oklch(0.12_0.02_260)] border-[oklch(1_0_0/0.08)] text-[oklch(0.85_0.02_260)] placeholder:text-[oklch(0.4_0.03_260)]"
                    data-ocid="help.center.search_input"
                  />
                </div>

                {/* Search results */}
                {help.hasResults && (
                  <div className="mt-2 space-y-1">
                    {help.searchResults.slice(0, 5).map((r, i) => (
                      <div
                        key={r.id}
                        className="p-2 rounded-lg bg-[oklch(0.14_0.02_260)] hover:bg-[oklch(0.17_0.02_260)] cursor-pointer transition-colors"
                        data-ocid={`help.search.item.${i + 1}`}
                      >
                        <p className="text-xs font-medium text-[oklch(0.85_0.02_260)]">
                          {r.title}
                        </p>
                        <p className="text-[10px] text-[oklch(0.5_0.03_260)] mt-0.5">
                          {r.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {help.isEmpty && (
                  <p
                    className="text-xs text-[oklch(0.45_0.03_260)] mt-2 px-1"
                    data-ocid="help.search.empty_state"
                  >
                    No articles found for "{help.searchQuery}"
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {/* Context-aware articles */}
                {help.contextArticles.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.45_0.03_260)] mb-2">
                      On this page
                    </p>
                    <div className="space-y-1.5">
                      {help.contextArticles.map((a, i) => (
                        <div
                          key={a.id}
                          className="p-2.5 rounded-lg bg-[oklch(0.13_0.02_260)] border border-[oklch(1_0_0/0.05)] hover:border-[oklch(var(--gold)/0.2)] cursor-pointer transition-colors"
                          data-ocid={`help.context.item.${i + 1}`}
                        >
                          <p className="text-xs font-medium text-[oklch(0.85_0.02_260)]">
                            {a.title}
                          </p>
                          <p className="text-[10px] text-[oklch(0.5_0.03_260)] mt-0.5">
                            {a.summary}
                          </p>
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            {a.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 rounded text-[9px] bg-[oklch(var(--gold)/0.1)] text-[oklch(0.7_0.12_75)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guided Tours */}
                {onStartTour && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.45_0.03_260)] mb-2">
                      Guided Tours
                    </p>
                    <div className="space-y-1.5">
                      {allTours.map((tour, i) => (
                        <button
                          type="button"
                          key={tour.tourId}
                          onClick={() => {
                            onStartTour(tour.tourId);
                            help.close();
                          }}
                          className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-[oklch(0.13_0.02_260)] border border-[oklch(1_0_0/0.05)] hover:border-[oklch(var(--gold)/0.2)] text-left transition-colors"
                          data-ocid={`help.tour.item.${i + 1}`}
                        >
                          <span className="text-lg flex-shrink-0">
                            {tour.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[oklch(0.85_0.02_260)] truncate">
                              {tour.name}
                            </p>
                            <p className="text-[10px] text-[oklch(0.5_0.03_260)]">
                              {tour.steps.length} steps · ~
                              {tour.estimatedMinutes} min
                            </p>
                          </div>
                          <PlayCircle className="h-4 w-4 text-[oklch(0.6_0.08_155)] flex-shrink-0 ml-auto" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.45_0.03_260)] mb-2">
                    Quick Links
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_LINKS.map((link, i) => (
                      <Link
                        key={link.route}
                        to={link.route}
                        onClick={help.close}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[oklch(0.13_0.02_260)] hover:bg-[oklch(0.16_0.02_260)] text-[oklch(0.75_0.04_260)] text-xs transition-colors"
                        data-ocid={`help.quicklink.item.${i + 1}`}
                      >
                        <link.icon className="h-3 w-3 flex-shrink-0" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-[oklch(1_0_0/0.06)]">
                <p className="text-[10px] text-[oklch(0.4_0.03_260)] text-center">
                  Press{" "}
                  <kbd className="px-1 py-0.5 rounded text-[9px] bg-[oklch(0.18_0.02_260)] border border-[oklch(1_0_0/0.1)]">
                    ?
                  </kbd>{" "}
                  to open ·{" "}
                  <Link
                    to="/docs"
                    onClick={help.close}
                    className="text-[var(--gold)] hover:underline"
                  >
                    Full Docs
                  </Link>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
