/**
 * TenantContext.tsx
 * Provides the active tenant/org context based on the authenticated user's orgId.
 * Applies per-tenant CSS variable --tenant-accent, white-label CSS variables,
 * dynamic document.title, favicon, and exposes feature flag helpers.
 */

import type { OrgFeatureFlags, Organization } from "@/data/backendTypes";
import { getOrg } from "@/data/orgData";
import { getWhiteLabelConfig } from "@/data/whitelabelData";
import type { WhiteLabelConfig } from "@/data/whitelabelTypes";
import { useAuth } from "@/hooks/useAuth";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface TenantContextValue {
  activeOrg: Organization | null;
  featureFlags: OrgFeatureFlags | null;
  activeWhiteLabel: WhiteLabelConfig | null;
  isFeatureEnabled: (
    feature: keyof Omit<OrgFeatureFlags, "memberCap">,
  ) => boolean;
  setActiveOrgId: (orgId: string | null) => void;
}

const TenantContext = createContext<TenantContextValue>({
  activeOrg: null,
  featureFlags: null,
  activeWhiteLabel: null,
  isFeatureEnabled: () => true,
  setActiveOrgId: () => {},
});

const PLATFORM_GOLD = "oklch(0.72 0.16 75)";
const PLATFORM_TITLE = "ONEartHeaven\u2122";
const PLATFORM_FAVICON = "/favicon.ico";

function applyWhiteLabel(config: WhiteLabelConfig) {
  const root = document.documentElement;
  root.style.setProperty("--wl-primary", config.primaryColor);
  root.style.setProperty("--wl-secondary", config.secondaryColor);
  root.style.setProperty("--wl-accent", config.accentColor);
  root.style.setProperty("--wl-font", config.fontFamily);
  document.title = `${config.brandName} \u2014 ONEartHeaven\u2122 PaaS`;
  if (config.faviconUrl) {
    const link =
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null) ??
      (() => {
        const el = document.createElement("link");
        el.rel = "icon";
        document.head.appendChild(el);
        return el;
      })();
    link.href = config.faviconUrl;
  }
}

function resetWhiteLabel() {
  const root = document.documentElement;
  root.style.removeProperty("--wl-primary");
  root.style.removeProperty("--wl-secondary");
  root.style.removeProperty("--wl-accent");
  root.style.removeProperty("--wl-font");
  document.title = PLATFORM_TITLE;
  const link = document.querySelector(
    "link[rel~='icon']",
  ) as HTMLLinkElement | null;
  if (link) link.href = PLATFORM_FAVICON;
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const { userProfile: profile, orgId: authOrgId } = useAuth();
  const [overrideOrgId, setOverrideOrgId] = useState<string | null>(null);

  const resolvedOrgId = overrideOrgId ?? authOrgId ?? null;
  const activeOrg = resolvedOrgId ? (getOrg(resolvedOrgId) ?? null) : null;
  const activeWhiteLabel = resolvedOrgId
    ? (getWhiteLabelConfig(resolvedOrgId) ?? null)
    : null;

  // Apply/remove tenant accent color
  useEffect(() => {
    const root = document.documentElement;
    if (activeOrg?.primaryColor) {
      root.style.setProperty("--tenant-accent", activeOrg.primaryColor);
    } else {
      root.style.removeProperty("--tenant-accent");
    }
    return () => {
      root.style.removeProperty("--tenant-accent");
    };
  }, [activeOrg]);

  // Apply/reset white-label CSS variables, title, and favicon
  useEffect(() => {
    if (activeWhiteLabel) {
      applyWhiteLabel(activeWhiteLabel);
    } else {
      resetWhiteLabel();
    }
    return () => {
      resetWhiteLabel();
    };
  }, [activeWhiteLabel]);

  // On logout, reset override
  useEffect(() => {
    if (!profile && !authOrgId) setOverrideOrgId(null);
  }, [profile, authOrgId]);

  const value = useMemo<TenantContextValue>(
    () => ({
      activeOrg,
      featureFlags: activeOrg?.featureFlags ?? null,
      activeWhiteLabel,
      isFeatureEnabled: (feature) => {
        if (!activeOrg) return true; // Platform default: all enabled
        return activeOrg.featureFlags[feature] === true;
      },
      setActiveOrgId: (id) => {
        setOverrideOrgId(id);
        const org = id ? getOrg(id) : null;
        const root = document.documentElement;
        if (org?.primaryColor) {
          root.style.setProperty("--tenant-accent", org.primaryColor);
        } else {
          root.style.setProperty("--tenant-accent", PLATFORM_GOLD);
        }
        // Apply white-label immediately on switch (effect will sync on re-render)
        const wl = id ? getWhiteLabelConfig(id) : null;
        if (wl) {
          applyWhiteLabel(wl);
        } else {
          resetWhiteLabel();
        }
      },
    }),
    [activeOrg, activeWhiteLabel],
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

export function useTenantContext() {
  return useContext(TenantContext);
}
