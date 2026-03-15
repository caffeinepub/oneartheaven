/**
 * whitelabelTypes.ts
 * Types and configuration for Phase 12 White Label Tenant Configuration.
 */

export type WhiteLabelStatus = "draft" | "preview" | "active" | "suspended";

export interface WhiteLabelConfig {
  id: string;
  orgId: string;
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string; // hex
  secondaryColor: string; // hex
  accentColor: string; // hex
  fontFamily: string;
  customDomain: string;
  supportEmail: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  status: WhiteLabelStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BrandTheme {
  "--wl-primary": string;
  "--wl-secondary": string;
  "--wl-accent": string;
  "--wl-font": string;
}

export const WL_STATUS_CONFIG: Record<
  WhiteLabelStatus,
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "text-slate-400" },
  preview: { label: "Preview", color: "text-yellow-400" },
  active: { label: "Active", color: "text-emerald-400" },
  suspended: { label: "Suspended", color: "text-red-400" },
};

export const FONT_OPTIONS = [
  "Plus Jakarta Sans",
  "Bricolage Grotesque",
  "DM Sans",
  "Outfit",
  "Inter",
  "Poppins",
  "Nunito",
];
