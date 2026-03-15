import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { useTenantContext } from "@/context/TenantContext";
import { ROLE_CONFIG } from "@/data/authTypes";
import { getAllOrgs } from "@/data/orgData";
import { useAuth } from "@/hooks/useAuth";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetSupportedLanguages } from "@/hooks/useQueries";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronsUpDown,
  Copy,
  Globe,
  LogOut,
  Menu,
  ShieldCheck,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const LANGUAGE_FLAGS: Record<string, string> = {
  en: "\uD83C\uDDEC\uD83C\uDDE7",
  es: "\uD83C\uDDEA\uD83C\uDDF8",
  fr: "\uD83C\uDDEB\uD83C\uDDF7",
  ar: "\uD83C\uDDF8\uD83C\uDDE6",
  zh: "\uD83C\uDDE8\uD83C\uDDF3",
  pt: "\uD83C\uDDE7\uD83C\uDDF7",
  hi: "\uD83C\uDDEE\uD83C\uDDF3",
  sw: "\uD83C\uDDF0\uD83C\uDDE6",
  ru: "\uD83C\uDDF7\uD83C\uDDFA",
  de: "\uD83C\uDDE9\uD83C\uDDEA",
};

const NAV_LINKS = [
  { label: "Home", path: "/" as const },
  { label: "About", path: "/about" as const },
  { label: "Members", path: "/members" as const },
  { label: "Governance", path: "/governance" as const },
  { label: "Solutions", path: "/solutions" as const },
  { label: "Community", path: "/community" as const },
  { label: "Academy", path: "/academy" as const },
  { label: "Finance", path: "/finance" as const },
  { label: "Sustainability", path: "/sustainability" as const },
  { label: "Transparency", path: "/transparency" as const },
  { label: "Integrations", path: "/integrations" as const },
];

const ADMIN_ROLES = ["SuperAdmin", "OrgAdmin"] as const;

function truncatePrincipal(p: string) {
  return p.length <= 12 ? p : `${p.slice(0, 6)}\u2026${p.slice(-4)}`;
}

function truncate(str: string, max: number) {
  return str.length <= max ? str : `${str.slice(0, max)}\u2026`;
}

/** Shared Org Switcher dropdown content used by both desktop and mobile triggers */
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
              style={{
                background: org.primaryColor,
                width: 6,
                height: 6,
              }}
            />
            <span
              className={`flex-1 text-sm truncate ${
                isActive
                  ? "text-[oklch(var(--gold))]"
                  : "text-[oklch(0.8_0.02_260)]"
              }`}
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
          className={`flex-1 text-sm ${
            activeOrg === null
              ? "text-[oklch(var(--gold))]"
              : "text-[oklch(0.8_0.02_260)]"
          }`}
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

export function Navbar() {
  const { location } = useRouterState();
  const {
    login: iiLogin,
    identity,
    isLoggingIn,
    isLoginSuccess,
  } = useInternetIdentity();
  const { userProfile, role, logout: authLogout } = useAuth();
  const { data: languages } = useGetSupportedLanguages();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const { activeOrg } = useTenantContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isConnected = isLoginSuccess && !!identity;
  const principal = identity?.getPrincipal().toString() ?? "";
  const selectedLang = languages?.find((l) => l.code === selectedLanguage);
  const currentPath = location.pathname;

  const roleConfig = ROLE_CONFIG[role];
  const isAdmin = ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]);

  function handleCopyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal);
      toast.success("Principal ID copied to clipboard");
    }
  }

  function handleDisconnect() {
    authLogout();
  }

  const orgDotColor = activeOrg?.primaryColor ?? "oklch(0.72 0.16 75)";
  const orgLabel = activeOrg ? truncate(activeOrg.name, 16) : "Platform";

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
          <span
            className="font-display font-bold text-lg tracking-tight"
            style={{ color: "oklch(var(--gold))" }}
          >
            ONEartHeaven
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
                {link.label}
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
          {/* Admin-only links */}
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
                  {LANGUAGE_FLAGS[selectedLanguage] ?? "\uD83C\uDF10"}{" "}
                  {selectedLang?.code.toUpperCase() ?? "EN"}
                </span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)] w-48"
              data-ocid="nav.language.dropdown_menu"
            >
              {(languages ?? []).map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`cursor-pointer text-sm ${
                    selectedLanguage === lang.code
                      ? "text-[oklch(var(--gold))]"
                      : "text-[oklch(0.8_0.02_260)]"
                  }`}
                >
                  {LANGUAGE_FLAGS[lang.code] ?? "\uD83C\uDF10"}{" "}
                  {lang.nativeName}
                  <span className="ml-auto text-xs opacity-50">
                    {lang.code.toUpperCase()}
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
                <DropdownMenuItem
                  onClick={handleDisconnect}
                  className="cursor-pointer text-[oklch(0.7_0.15_27)]"
                  data-ocid="nav.wallet.disconnect.button"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
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

      {/* Mobile drawer overlay */}
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
                >
                  ONEartHeaven™
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

              {/* User info */}
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
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  {/* Admin Org Management */}
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
                  {/* Admin Approvals */}
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
                      {LANGUAGE_FLAGS[selectedLanguage] ?? "\uD83C\uDF10"}{" "}
                      {selectedLang?.nativeName ?? "English"}
                      <ChevronDown className="h-3 w-3 ml-auto opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)] w-52"
                  >
                    {(languages ?? []).map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className="cursor-pointer text-sm text-[oklch(0.8_0.02_260)] min-h-[40px]"
                      >
                        {LANGUAGE_FLAGS[lang.code] ?? "\uD83C\uDF10"}{" "}
                        {lang.nativeName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {isConnected ? (
                  <Button
                    size="sm"
                    onClick={handleDisconnect}
                    variant="outline"
                    className="border-[oklch(0.7_0.15_27/0.4)] text-[oklch(0.7_0.15_27)] justify-start gap-2"
                    data-ocid="nav.mobile.wallet.disconnect.button"
                  >
                    <LogOut className="h-4 w-4" /> Disconnect
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
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
