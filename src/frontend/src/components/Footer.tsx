import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { useGetSupportedLanguages } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Globe } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  ar: "🇸🇦",
  zh: "🇨🇳",
  pt: "🇧🇷",
  hi: "🇮🇳",
  sw: "🇰🇪",
  ru: "🇷🇺",
  de: "🇩🇪",
};

const FOOTER_LINKS = [
  {
    heading: "Platform",
    links: [
      { label: "Governance", path: "/governance" },
      { label: "Solutions", path: "/solutions" },
      { label: "Community", path: "/community" },
      { label: "Academy", path: "/academy" },
      { label: "Finance", path: "/finance" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { label: "About", path: "/about" },
      { label: "Charter", path: "/about" },
      { label: "FinFracFran™", path: "/finance" },
      { label: "Partnership", path: "/about" },
    ],
  },
  {
    heading: "Legal & Info",
    links: [
      { label: "Privacy Policy", path: "/about" },
      { label: "Terms of Use", path: "/about" },
      { label: "Open Source", path: "/about" },
      { label: "Contact", path: "/about" },
    ],
  },
];

export function Footer() {
  const { data: languages } = useGetSupportedLanguages();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const selectedLang = languages?.find((l) => l.code === selectedLanguage);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background: "oklch(0.07 0.03 260)",
        borderTop: "1px solid oklch(var(--gold) / 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/logo-onearthheaven-transparent.dim_400x120.png"
                alt="ONEartHeaven"
                className="h-7 w-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span
                className="font-display font-bold text-base"
                style={{ color: "oklch(var(--gold))" }}
              >
                ONEartHeaven™
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-5 max-w-xs"
              style={{ color: "oklch(0.55 0.03 260)" }}
            >
              The PlanetsPeacePalace — where local solutions become global
              transformation. Decentralized. Open. For all of humanity.
            </p>

            {/* FinFracFran mention */}
            <div
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{
                background: "oklch(var(--teal) / 0.1)",
                color: "oklch(var(--teal-bright))",
                border: "1px solid oklch(var(--teal) / 0.25)",
              }}
            >
              FinFracFran™ Methodology Applied
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "oklch(0.15 0.03 260)",
                  color: "oklch(0.55 0.03 260)",
                }}
                aria-label="GitHub"
                data-ocid="footer.github.link"
              >
                <SiGithub className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "oklch(0.15 0.03 260)",
                  color: "oklch(0.55 0.03 260)",
                }}
                aria-label="X (Twitter)"
                data-ocid="footer.twitter.link"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "oklch(0.15 0.03 260)",
                  color: "oklch(0.55 0.03 260)",
                }}
                aria-label="LinkedIn"
                data-ocid="footer.linkedin.link"
              >
                <SiLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "oklch(var(--gold) / 0.7)" }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm transition-colors duration-200 text-[oklch(0.5_0.03_260)] hover:text-[oklch(var(--gold))]"
                      data-ocid={`footer.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="border-t mb-8"
          style={{ borderColor: "oklch(var(--gold) / 0.08)" }}
        />

        {/* ICP Badge */}
        <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(0.55 0.16 260 / 0.12)",
              color: "oklch(0.65 0.12 260)",
              border: "1px solid oklch(0.55 0.16 260 / 0.25)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.12_260)] animate-pulse" />
            Powered by Internet Computer Protocol (ICP)
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(var(--teal) / 0.1)",
              color: "oklch(var(--teal-bright))",
              border: "1px solid oklch(var(--teal) / 0.2)",
            }}
          >
            Decentralized DePin Enterprise Infrastructure
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "oklch(0.38 0.03 260)" }}>
            © {currentYear} ONEartHeaven™. All rights reserved. NewWaysNow™ ·
            FinFracFran™ · PlanetsPeacePalace™
          </p>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs gap-1.5"
                  style={{ color: "oklch(0.45 0.03 260)" }}
                  data-ocid="footer.language.select"
                >
                  <Globe className="h-3 w-3" />
                  {LANGUAGE_FLAGS[selectedLanguage] ?? "🌐"}{" "}
                  {selectedLang?.code.toUpperCase() ?? "EN"}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[oklch(var(--cosmos-mid))] border-[oklch(var(--gold)/0.2)]"
                data-ocid="footer.language.dropdown_menu"
              >
                {(languages ?? []).map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="cursor-pointer text-xs text-[oklch(0.8_0.02_260)]"
                  >
                    {LANGUAGE_FLAGS[lang.code] ?? "🌐"} {lang.nativeName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Caffeine attribution */}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200 text-[oklch(0.38_0.03_260)] hover:text-[oklch(var(--gold))]"
              data-ocid="footer.caffeine.link"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
