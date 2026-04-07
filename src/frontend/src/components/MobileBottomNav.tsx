import { useNotificationBadge } from "@/hooks/useNotifications";
import { useRouterState } from "@tanstack/react-router";
import { Globe2, Home, Megaphone, ShoppingBag, Users } from "lucide-react";

interface NavTab {
  label: string;
  icon: React.ReactNode;
  href: string;
  ocid: string;
}

const TABS: NavTab[] = [
  {
    label: "Home",
    icon: <Home className="w-5 h-5" aria-hidden="true" />,
    href: "/",
    ocid: "mobile-nav.home.tab",
  },
  {
    label: "Governance",
    icon: <Globe2 className="w-5 h-5" aria-hidden="true" />,
    href: "/governance",
    ocid: "mobile-nav.governance.tab",
  },
  {
    label: "Campaigns",
    icon: <Megaphone className="w-5 h-5" aria-hidden="true" />,
    href: "/campaigns",
    ocid: "mobile-nav.campaigns.tab",
  },
  {
    label: "Marketplace",
    icon: <ShoppingBag className="w-5 h-5" aria-hidden="true" />,
    href: "/marketplace",
    ocid: "mobile-nav.marketplace.tab",
  },
  {
    label: "Community",
    icon: <Users className="w-5 h-5" aria-hidden="true" />,
    href: "/community",
    ocid: "mobile-nav.community.tab",
  },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function MobileBottomNav() {
  const routerState = useRouterState();
  const { unreadCount } = useNotificationBadge();
  const pathname = routerState.location.pathname;

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch backdrop-blur-sm"
      style={{
        background: "oklch(0.10 0.04 260 / 0.95)",
        borderTop: "1px solid oklch(0.22 0.04 260)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.href, pathname);
        const isGovernance = tab.href === "/governance";
        return (
          <a
            key={tab.href}
            href={tab.href}
            data-ocid={tab.ocid}
            aria-label={tab.label}
            aria-current={active ? "page" : undefined}
            className="relative flex-1 flex flex-col items-center justify-center min-h-[56px] min-w-[44px] gap-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--gold)/0.4)] focus-visible:ring-inset"
            style={{
              color: active ? "oklch(var(--gold))" : "oklch(0.50 0.04 260)",
            }}
          >
            {/* Icon + unread badge (Governance only) */}
            <div className="relative">
              {tab.icon}
              {isGovernance && unreadCount > 0 && (
                <span
                  aria-label={`${unreadCount} unread notifications`}
                  className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-[9px] font-bold min-w-[14px] h-[14px] px-0.5 motion-safe:animate-pulse"
                  style={{
                    background: "oklch(0.62 0.22 25)",
                    color: "oklch(0.97 0.01 95)",
                    border: "1px solid oklch(0.10 0.04 260)",
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>

            {/* Label */}
            <span className="text-[10px] font-medium leading-none tracking-wide">
              {tab.label}
            </span>

            {/* Active gold dot indicator */}
            {active && (
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "oklch(var(--gold))" }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
