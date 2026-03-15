/**
 * TenantContext.tsx
 * Provides the active tenant/org context based on the authenticated user's orgId.
 * Applies per-tenant CSS variable --tenant-accent and exposes feature flag helpers.
 */

import type { OrgFeatureFlags, Organization } from "@/data/backendTypes";
import { getOrg } from "@/data/orgData";
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
  isFeatureEnabled: (
    feature: keyof Omit<OrgFeatureFlags, "memberCap">,
  ) => boolean;
  setActiveOrgId: (orgId: string | null) => void;
}

const TenantContext = createContext<TenantContextValue>({
  activeOrg: null,
  featureFlags: null,
  isFeatureEnabled: () => true,
  setActiveOrgId: () => {},
});

const PLATFORM_GOLD = "oklch(0.72 0.16 75)";

export function TenantProvider({ children }: { children: ReactNode }) {
  const { userProfile: profile, orgId: authOrgId } = useAuth();
  const [overrideOrgId, setOverrideOrgId] = useState<string | null>(null);

  const resolvedOrgId = overrideOrgId ?? authOrgId ?? null;
  const activeOrg = resolvedOrgId ? (getOrg(resolvedOrgId) ?? null) : null;

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

  // On logout, reset override
  useEffect(() => {
    if (!profile && !authOrgId) setOverrideOrgId(null);
  }, [profile, authOrgId]);

  const value = useMemo<TenantContextValue>(
    () => ({
      activeOrg,
      featureFlags: activeOrg?.featureFlags ?? null,
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
      },
    }),
    [activeOrg],
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

export function useTenantContext() {
  return useContext(TenantContext);
}
