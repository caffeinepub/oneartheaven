import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetSupportedLanguages } from "@/hooks/useQueries";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Copy, Globe, LogOut, Menu, Wallet } from "lucide-react";
import { motion } from "motion/react";
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
  sw: "\uD83C\uDDF0\uD83C\uDDEA",
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
  { label: "Transparency", path: "/transparency" as const },
  { label: "Integrations", path: "/integrations" as const },
];

function truncatePrincipal(principal: string): string {
  if (principal.length <= 12) return principal;
  return `${principal.slice(0, 6)}\u2026${principal.slice(-4)}`;
}

export function Navbar() {
  const { location } = useRouterState();
  const { login, clear, identity, isLoggingIn, isLoginSuccess } =
    useInternetIdentity();
  const { data: languages } = useGetSupportedLanguages();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isConnected = isLoginSuccess && !!identity;
  const principal = identity?.getPrincipal().toString() ?? "";
  const selectedLang = languages?.find((l) => l.code === selectedLanguage);
  const currentPath = location.pathname;

  function handleCopyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal);
      toast.success("Principal ID copied to clipboard");
    }
  }

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

        {/* Center Nav Links — Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                    : "text-[oklch(0.75_0.02_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 text-[oklch(0.75_0.02_260)] hover:text-[oklch(var(--gold))]"
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
                  {lang.nativeName}{" "}
                  <span className="ml-auto text-xs opacity-50">
                    {lang.code.toUpperCase()}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Connect Button */}
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 btn-gold text-xs font-mono"
                  data-ocid="nav.wallet.button"
                >
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.2_140)] animate-pulse" />
                  {truncatePrincipal(principal)}
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)]"
                data-ocid="nav.wallet.dropdown_menu"
              >
                <DropdownMenuItem
                  onClick={handleCopyPrincipal}
                  className="cursor-pointer text-[oklch(0.8_0.02_260)]"
                  data-ocid="nav.wallet.copy.button"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Principal ID
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={clear}
                  className="cursor-pointer text-[oklch(0.7_0.15_27)]"
                  data-ocid="nav.wallet.disconnect.button"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="hidden sm:flex btn-gold items-center gap-1.5"
              data-ocid="nav.connect_wallet.button"
            >
              <Wallet className="h-4 w-4" />
              {isLoggingIn ? "Connecting\u2026" : "Connect Wallet"}
            </Button>
          )}

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[oklch(0.75_0.02_260)]"
                data-ocid="nav.mobile_menu.button"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[oklch(var(--cosmos-deep))] border-l border-[oklch(var(--gold)/0.15)] w-72"
              data-ocid="nav.mobile_menu.sheet"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <span
                    className="font-display font-bold text-base"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    ONEartHeaven
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = currentPath === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? "text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                          : "text-[oklch(0.75_0.02_260)] hover:text-[oklch(var(--gold))] hover:bg-[oklch(var(--gold)/0.06)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-[oklch(var(--gold)/0.12)] flex flex-col gap-3">
                {/* Mobile Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2 text-[oklch(0.75_0.02_260)]"
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
                        className="cursor-pointer text-sm text-[oklch(0.8_0.02_260)]"
                      >
                        {LANGUAGE_FLAGS[lang.code] ?? "\uD83C\uDF10"}{" "}
                        {lang.nativeName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Wallet Button */}
                {isConnected ? (
                  <Button
                    size="sm"
                    onClick={clear}
                    variant="outline"
                    className="border-[oklch(0.7_0.15_27/0.4)] text-[oklch(0.7_0.15_27)] justify-start gap-2"
                    data-ocid="nav.mobile.wallet.disconnect.button"
                  >
                    <LogOut className="h-4 w-4" />
                    Disconnect Wallet
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="btn-gold gap-2"
                    data-ocid="nav.mobile.connect_wallet.button"
                  >
                    <Wallet className="h-4 w-4" />
                    {isLoggingIn ? "Connecting\u2026" : "Connect Wallet"}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
