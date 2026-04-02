import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTenantContext } from "@/context/TenantContext";
import { ROLE_CONFIG } from "@/data/authTypes";
import { getAllOrgs } from "@/data/orgData";
import { useAuth } from "@/hooks/useAuth";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useLocale } from "@/hooks/useLocale";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronsUpDown,
  Copy,
  CreditCard,
  Globe,
  LogOut,
  Menu,
  Paintbrush,
  PlayCircle,
  ShieldCheck,
  ShoppingBag,
  Tag,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const NAV_LINKS: { label: string; path: string; badge?: string }[] = [
  { label: "Home", path: "/" as const },
  { label: "About", path: "/about" as const },
  { label: "Members", path: "/members" as const },
  { label: "Governance", path: "/governance" as const },
  { label: "Sessions", path: "/sessions" as const, badge: "Live" },
  { label: "Solutions", path: "/solutions" as const },
  { label: "Community", path: "/community" as const },
  { label: "Academy", path: "/academy" as const },
  { label: "Finance", path: "/finance" as const },
  { label: "Sustainability", path: "/sustainability" as const },
  { label: "Transparency", path: "/transparency" as const },
  { label: "Integrations", path: "/integrations" as const },
  { label: "Pricing", path: "/pricing" as const },
  { label: "Docs", path: "/docs" as const },
  { label: "Launch Plan", path: "/launch" as const },
  { label: "Campaigns", path: "/campaigns" as const },
  { label: "Policy Advisor", path: "/policy-advisor" as const, badge: "AI" },
  { label: "Impact", path: "/impact" as const, badge: "New" },
];

const ADMIN_ROLES = ["SuperAdmin", "OrgAdmin"] as const;

function truncatePrincipal(p: string) {
  return p.length <= 12 ? p : `${p.slice(0, 6)}\u2026${p.slice(-4)}`;
}

function truncate(str: string, max: number) {
  return str.length <= max ? str : `${str.slice(0, max)}\u2026`;
}

function OrgSwitcherDropdown() {
  const { activeOrg, setActiveOrgId } = useTenantContext();
  const allOrgs = getAllOrgs();

  return (
    <DropdownMenuContent
      align="end"
      style={{ width: 240 }}
      className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)]"
      data-ocid="nav.org_switcher.dropdown_menu"
    >
      <DropdownMenuLabel className="text-xs text-[oklch(0.5_0.03_260)] font-normal pb-1">
        Switch Organization
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-[oklch(1_0_0/0.06)] mb-1" />
      {allOrgs.map((org, idx) => {
        const isActive = activeOrg?.orgId === org.orgId;
        return (
          <DropdownMenuItem
            key={org.orgId}
            onClick={() => setActiveOrgId(org.orgId)}
            data-ocid={`nav.org_switcher.item.${idx + 1}`}
            className="cursor-pointer flex items-center gap-2 min-h-[36px] px-2"
          >
            <span
              className="rounded-full inline-block shrink-0"
              style={{ background: org.primaryColor, width: 6, height: 6 }}
            />
            <span
              className={`flex-1 text-sm truncate ${isActive ? "text-[oklch(var(--gold))]" : "text-[oklch(0.8_0.02_260)]"}`}
            >
              {truncate(org.name, 22)}
            </span>
            <span className="text-xs text-[oklch(0.5_0.03_260)] shrink-0">
              {org.type}
            </span>
            {isActive && (
              <CheckCircle2
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: "oklch(var(--gold))" }}
              />
            )}
          </DropdownMenuItem>
        );
      })}
      <DropdownMenuSeparator className="bg-[oklch(1_0_0/0.06)] my-1" />
      <DropdownMenuItem
        onClick={() => setActiveOrgId(null)}
        data-ocid="nav.org_switcher.platform.button"
        className="cursor-pointer flex items-center gap-2 min-h-[36px] px-2"
      >
        <Globe
          className="h-3.5 w-3.5 shrink-0"
          style={{
            color: activeOrg === null ? "oklch(var(--gold))" : undefined,
          }}
        />
        <span
          className={`flex-1 text-sm ${activeOrg === null ? "text-[oklch(var(--gold))]" : "text-[oklch(0.8_0.02_260)]"}`}
        >
          Platform View
        </span>
        {activeOrg === null && (
          <CheckCircle2
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "oklch(var(--gold))" }}
          />
        )}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

interface NavbarProps {
  onStartTour?: (tourId: string) => void;
}

export function Navbar({ onStartTour }: NavbarProps = {}) {
  const { location } = useRouterState();
  const {
    login: iiLogin,
    identity,
    isLoggingIn,
    isLoginSuccess,
  } = useInternetIdentity();
  const { userProfile, role, logout: authLogout } = useAuth();
  const { locale, setLocale, flag, nativeName, supportedLocales } = useLocale();
  const { activeOrg, activeWhiteLabel } = useTenantContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isConnected = isLoginSuccess && !!identity;
  const principal = identity?.getPrincipal().toString() ?? "";
  const currentPath = location.pathname;

  const roleConfig = ROLE_CONFIG[role];
  const isAdmin = ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]);
  const isVendor = role === "Vendor";
  const showBecomeVendor = !isVendor && !isAdmin;

  function handleCopyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal);
      toast.success("Principal ID copied to clipboard");
    }
  }

  const orgDotColor = activeOrg?.primaryColor ?? "oklch(0.72 0.16 75)";
  const orgLabel = activeOrg ? truncate(activeOrg.name, 16) : "Platform";

  // Derive brand display name from white-label config if active
  const brandName = activeWhiteLabel?.brandName ?? "ONEartHeaven";
  const isBranded = !!activeWhiteLabel;

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.home.link"
        >
          <img
            src="/assets/generated/logo-onearthheaven-transparent.dim_400x120.png"
            alt="ONEartHeaven"
            className="h-8 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {isBranded && (
            <span
              className="text-[oklch(0.5_0.03_260)] text-xs select-none"
              aria-hidden="true"
            >
              |
            </span>
          )}
          <span
            className="font-display font-bold text-lg tracking-tight"
            style={{ color: "oklch(var(--gold))" }}
            data-ocid="nav.brand.name"
          >
            {brandName}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center overflow-x-auto">
          {NAV_LINKS.map((link) => {
            const active = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  active
                    ? "text-[oklch(var(--gold))]"
                    : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                }`}
              >
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center px-1 py-0 rounded text-[9px] font-bold bg-[oklch(0.55_0.22_290/0.25)] text-[oklch(0.78_0.18_290)] border border-[oklch(0.68_0.22_290/0.4)] leading-4">
                      {link.badge}
                    </span>
                  )}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 rounded-full"
                    style={{ background: "var(--gradient-gold)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin/orgs"
              data-ocid="nav.orgs.link"
              className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                currentPath === "/admin/orgs"
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
              }`}
            >
              <Building2 className="w-3 h-3" /> Org Management
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/approvals"
              data-ocid="nav.approvals.link"
              className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                currentPath === "/admin/approvals"
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
              }`}
            >
              <ShieldCheck className="w-3 h-3" /> Approvals
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/whitelabel"
              data-ocid="nav.whitelabel.link"
              className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                currentPath === "/admin/whitelabel"
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
              }`}
            >
              <Paintbrush className="w-3 h-3" /> White Label
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/subscription"
              data-ocid="nav.subscription.link"
              className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                currentPath === "/admin/subscription"
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
              }`}
            >
              <CreditCard className="w-3 h-3" /> Subscription
            </Link>
          )}
          {role === "SuperAdmin" && (
            <Link
              to="/admin/analytics"
              data-ocid="nav.analytics.link"
              className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                currentPath === "/admin/analytics"
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
              }`}
            >
              <BarChart3 className="w-3 h-3" /> Analytics
            </Link>
          )}
          {isVendor && (
            <Link
              to="/vendor/dashboard"
              data-ocid="nav.vendor_dashboard.link"
              className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                currentPath === "/vendor/dashboard"
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
              }`}
            >
              <ShoppingBag className="w-3 h-3" /> Vendor Dashboard
            </Link>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Org Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)] px-2 max-w-[160px]"
                data-ocid="nav.org_switcher.button"
              >
                <span
                  className="rounded-full inline-block shrink-0"
                  style={{ background: orgDotColor, width: 8, height: 8 }}
                />
                <span className="text-xs truncate">{orgLabel}</span>
                <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <OrgSwitcherDropdown />
          </DropdownMenu>

          {/* Language picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))]"
                data-ocid="nav.language.select"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">
                  {flag} {locale.toUpperCase()}
                </span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)] w-48"
              data-ocid="nav.language.dropdown_menu"
            >
              {supportedLocales.map((lc) => (
                <DropdownMenuItem
                  key={lc.locale}
                  onClick={() => setLocale(lc.locale)}
                  className={`cursor-pointer text-sm ${locale === lc.locale ? "text-[oklch(var(--gold))]" : "text-[oklch(0.8_0.02_260)]"}`}
                  data-ocid={`nav.language.item.${lc.locale}`}
                >
                  {lc.flag} {lc.nativeName}
                  <span className="ml-auto text-xs opacity-50">
                    {lc.locale.toUpperCase()}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 btn-gold text-xs"
                  data-ocid="nav.wallet.button"
                >
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.2_140)] animate-pulse" />
                  {userProfile?.displayName
                    ? userProfile.displayName
                    : truncatePrincipal(principal)}
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)] min-w-[180px]"
                data-ocid="nav.wallet.dropdown_menu"
              >
                <div className="px-3 py-2 border-b border-[oklch(1_0_0/0.06)]">
                  <p className="text-xs text-[oklch(0.5_0.03_260)] mb-1">
                    Signed in as
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${roleConfig.badge}`}
                    data-ocid="nav.role.toggle"
                  >
                    {roleConfig.label}
                  </span>
                  {userProfile && (
                    <p className="text-xs font-mono text-[oklch(0.45_0.03_260)] mt-1 truncate max-w-[150px]">
                      {truncatePrincipal(principal)}
                    </p>
                  )}
                </div>
                <DropdownMenuItem
                  onClick={handleCopyPrincipal}
                  className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                  data-ocid="nav.wallet.copy.button"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Principal ID
                </DropdownMenuItem>
                {showBecomeVendor && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/vendor/register"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.become_vendor.button"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" /> Become a Vendor
                    </Link>
                  </DropdownMenuItem>
                )}
                {isVendor && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/vendor/dashboard"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.vendor_dashboard.button"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" /> Vendor Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/orgs"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.orgs.button"
                    >
                      <Building2 className="h-4 w-4 mr-2" /> Org Management
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/approvals"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.approvals.button"
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" /> Approvals
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/whitelabel"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.whitelabel.button"
                    >
                      <Paintbrush className="h-4 w-4 mr-2" /> White Label Studio
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/subscription"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.subscription.button"
                    >
                      <CreditCard className="h-4 w-4 mr-2" /> Subscription
                    </Link>
                  </DropdownMenuItem>
                )}
                {role === "SuperAdmin" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/analytics"
                      className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                      data-ocid="nav.wallet.analytics.button"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> Platform Analytics
                    </Link>
                  </DropdownMenuItem>
                )}
                {onStartTour && isConnected && (
                  <DropdownMenuItem
                    onClick={() => {
                      const tourMap: Record<string, string> = {
                        Delegate: "delegate-quickstart",
                        OrgAdmin: "org-admin-quickstart",
                        Vendor: "vendor-quickstart",
                      };
                      const tourId = tourMap[role ?? ""] ?? "platform-overview";
                      onStartTour(tourId);
                    }}
                    className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                    data-ocid="nav.wallet.restart_tour.button"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" /> Restart Tour
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={authLogout}
                  className="cursor-pointer text-[oklch(0.7_0.15_27)]"
                  data-ocid="nav.wallet.disconnect.button"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/pricing">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5 text-xs text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                  data-ocid="nav.pricing.button"
                >
                  <Tag className="h-3.5 w-3.5" /> Pricing
                </Button>
              </Link>
              <Link to="/vendor/register">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5 text-xs text-[oklch(0.65_0.18_195)] hover:text-[oklch(0.75_0.15_195)] hover:bg-[oklch(0.65_0.18_195/0.08)]"
                  data-ocid="nav.become_vendor.button"
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Become a Vendor
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5 text-xs text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--pearl))]"
                  data-ocid="nav.request_access.button"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Request Access
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={iiLogin}
                disabled={isLoggingIn}
                className="btn-gold items-center gap-1.5"
                data-ocid="nav.connect_wallet.button"
              >
                <Wallet className="h-4 w-4" />
                {isLoggingIn ? "Connecting\u2026" : "Connect Wallet"}
              </Button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--gold)/0.5)]"
            aria-label="Open navigation menu"
            data-ocid="nav.mobile_menu.button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col lg:hidden"
              style={{
                background: "oklch(var(--cosmos-deep))",
                borderLeft: "1px solid oklch(var(--gold) / 0.15)",
              }}
              data-ocid="nav.mobile_menu.sheet"
            >
              <div
                className="flex items-center justify-between px-5 h-16 shrink-0"
                style={{ borderBottom: "1px solid oklch(var(--gold) / 0.10)" }}
              >
                <span
                  className="font-display font-bold text-base"
                  style={{ color: "oklch(var(--gold))" }}
                  data-ocid="nav.brand.name"
                >
                  {brandName}
                  {isBranded ? "" : "\u2122"}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors text-[oklch(0.55_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--gold)/0.5)]"
                  aria-label="Close navigation menu"
                  data-ocid="nav.mobile_menu.close_button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {isConnected && (
                <div
                  className="px-4 py-3 flex items-center gap-3"
                  style={{
                    borderBottom: "1px solid oklch(var(--gold) / 0.08)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[oklch(0.88_0.01_95)] truncate">
                      {userProfile?.displayName ?? truncatePrincipal(principal)}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border mt-0.5 ${roleConfig.badge}`}
                      data-ocid="nav.mobile.role.toggle"
                    >
                      {roleConfig.label}
                    </span>
                  </div>
                </div>
              )}

              {/* Mobile Org Switcher */}
              <div
                className="px-4 py-2"
                style={{ borderBottom: "1px solid oklch(var(--gold) / 0.08)" }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)] min-h-[44px]"
                      data-ocid="nav.mobile.org_switcher.button"
                    >
                      <span
                        className="rounded-full inline-block shrink-0"
                        style={{ background: orgDotColor, width: 8, height: 8 }}
                      />
                      <span className="text-sm flex-1 text-left truncate">
                        {orgLabel}
                      </span>
                      <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <OrgSwitcherDropdown />
                </DropdownMenu>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="flex flex-col gap-0.5">
                  {NAV_LINKS.map((link, i) => {
                    const active = currentPath === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                            active
                              ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                              : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)] active:bg-[oklch(var(--gold)/0.12)]"
                          }`}
                        >
                          {active && (
                            <span
                              className="w-1 h-4 rounded-full shrink-0"
                              style={{ background: "var(--gradient-gold)" }}
                            />
                          )}
                          {!active && <span className="w-1 shrink-0" />}
                          <span className="flex items-center gap-1.5">
                            {link.label}
                            {link.badge && (
                              <span className="inline-flex items-center px-1 py-0 rounded text-[9px] font-bold bg-[oklch(0.55_0.22_290/0.25)] text-[oklch(0.78_0.18_290)] border border-[oklch(0.68_0.22_290/0.4)] leading-4">
                                {link.badge}
                              </span>
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      to="/admin/orgs"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.orgs.link"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                        currentPath === "/admin/orgs"
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      <span className="w-1 shrink-0" />
                      <Building2 className="w-4 h-4" /> Org Management
                    </Link>
                  )}
                  {isAdmin && (
                    <Link
                      to="/admin/approvals"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.approvals.link"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                        currentPath === "/admin/approvals"
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      <span className="w-1 shrink-0" />
                      <ShieldCheck className="w-4 h-4" /> Approvals
                    </Link>
                  )}
                  {isAdmin && (
                    <Link
                      to="/admin/whitelabel"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.whitelabel.link"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                        currentPath === "/admin/whitelabel"
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      <span className="w-1 shrink-0" />
                      <Paintbrush className="w-4 h-4" /> White Label
                    </Link>
                  )}
                  {isAdmin && (
                    <Link
                      to="/admin/subscription"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.subscription.link"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                        currentPath === "/admin/subscription"
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      <span className="w-1 shrink-0" />
                      <CreditCard className="w-4 h-4" /> Subscription
                    </Link>
                  )}
                  {role === "SuperAdmin" && (
                    <Link
                      to="/admin/analytics"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.analytics.link"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                        currentPath === "/admin/analytics"
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      <span className="w-1 shrink-0" />
                      <BarChart3 className="w-4 h-4" /> Analytics
                    </Link>
                  )}
                  {isVendor && (
                    <Link
                      to="/vendor/dashboard"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.vendor_dashboard.link"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] ${
                        currentPath === "/vendor/dashboard"
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.65_0.03_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      <span className="w-1 shrink-0" />
                      <ShoppingBag className="w-4 h-4" /> Vendor Dashboard
                    </Link>
                  )}
                  {showBecomeVendor && (
                    <Link
                      to="/vendor/register"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="nav.mobile.become_vendor.link"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[48px] text-[oklch(0.65_0.18_195)] hover:text-[oklch(0.75_0.15_195)] hover:bg-[oklch(0.65_0.18_195/0.08)]"
                    >
                      <span className="w-1 shrink-0" />
                      <ShoppingBag className="w-4 h-4" /> Become a Vendor
                    </Link>
                  )}
                </div>
              </div>

              <div
                className="px-4 py-5 flex flex-col gap-3 shrink-0"
                style={{ borderTop: "1px solid oklch(var(--gold) / 0.10)" }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2 text-[oklch(0.65_0.03_260)] w-full"
                      data-ocid="nav.mobile.language.select"
                    >
                      <Globe className="h-4 w-4" />
                      {flag} {nativeName}
                      <ChevronDown className="h-3 w-3 ml-auto opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)] w-52"
                  >
                    {supportedLocales.map((lc) => (
                      <DropdownMenuItem
                        key={lc.locale}
                        onClick={() => setLocale(lc.locale)}
                        className={`cursor-pointer text-sm min-h-[40px] ${locale === lc.locale ? "text-[oklch(var(--gold))]" : "text-[oklch(0.8_0.02_260)]"}`}
                        data-ocid={`nav.mobile.language.item.${lc.locale}`}
                      >
                        {lc.flag} {lc.nativeName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {isConnected ? (
                  <Button
                    size="sm"
                    onClick={authLogout}
                    variant="outline"
                    className="border-[oklch(0.7_0.15_27/0.4)] text-[oklch(0.7_0.15_27)] justify-start gap-2"
                    data-ocid="nav.mobile.wallet.disconnect.button"
                  >
                    <LogOut className="h-4 w-4" /> Disconnect
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/vendor/register"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 border-[oklch(0.65_0.18_195/0.3)] text-[oklch(0.65_0.18_195)]"
                        data-ocid="nav.mobile.become_vendor.button"
                      >
                        <ShoppingBag className="h-4 w-4" /> Become a Vendor
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 border-[oklch(var(--gold)/0.25)] text-[oklch(var(--pearl))]"
                        data-ocid="nav.mobile.request_access.button"
                      >
                        <UserPlus className="h-4 w-4" /> Request Access
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => {
                        iiLogin();
                        setMobileOpen(false);
                      }}
                      disabled={isLoggingIn}
                      className="btn-gold gap-2 w-full"
                      data-ocid="nav.mobile.connect_wallet.button"
                    >
                      <Wallet className="h-4 w-4" />
                      {isLoggingIn ? "Connecting\u2026" : "Connect Wallet"}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
