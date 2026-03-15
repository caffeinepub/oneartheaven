/**
 * useWhiteLabel.ts
 * Hook for Phase 12 White Label Tenant Configuration.
 */

import {
  getAllWhiteLabelConfigs,
  getWhiteLabelConfig,
} from "@/data/whitelabelData";
import type { WhiteLabelConfig } from "@/data/whitelabelTypes";
import { useState } from "react";
import { toast } from "sonner";

export interface SaveState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useWhiteLabel(orgId?: string) {
  const initialConfig = orgId
    ? getWhiteLabelConfig(orgId)
    : getAllWhiteLabelConfigs()[0];

  const [allConfigs, setAllConfigs] = useState<WhiteLabelConfig[]>(
    getAllWhiteLabelConfigs(),
  );
  const [previewConfig, setPreviewConfig] = useState<
    WhiteLabelConfig | undefined
  >(initialConfig);
  const [saveState, setSaveState] = useState<SaveState>({
    loading: false,
    error: null,
    success: false,
  });

  const config = orgId
    ? allConfigs.find((c) => c.orgId === orgId)
    : allConfigs[0];

  function applyTheme(cfg: WhiteLabelConfig) {
    const root = document.documentElement;
    root.style.setProperty("--wl-primary", cfg.primaryColor);
    root.style.setProperty("--wl-secondary", cfg.secondaryColor);
    root.style.setProperty("--wl-accent", cfg.accentColor);
    root.style.setProperty("--wl-font", cfg.fontFamily);
  }

  function resetToDefault() {
    const root = document.documentElement;
    root.style.removeProperty("--wl-primary");
    root.style.removeProperty("--wl-secondary");
    root.style.removeProperty("--wl-accent");
    root.style.removeProperty("--wl-font");
  }

  function updatePreviewField(key: keyof WhiteLabelConfig, value: string) {
    setPreviewConfig((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  }

  async function saveConfig(cfg: WhiteLabelConfig): Promise<void> {
    setSaveState({ loading: true, error: null, success: false });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAllConfigs((prev) => {
        const idx = prev.findIndex((c) => c.id === cfg.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...cfg, updatedAt: new Date().toISOString() };
          return next;
        }
        return [...prev, { ...cfg, updatedAt: new Date().toISOString() }];
      });
      setSaveState({ loading: false, error: null, success: true });
      toast.success("White label configuration saved successfully");
      setTimeout(() => setSaveState((s) => ({ ...s, success: false })), 2500);
    } catch {
      setSaveState({
        loading: false,
        error: "Failed to save configuration",
        success: false,
      });
      toast.error("Failed to save white label configuration");
    }
  }

  return {
    config,
    allConfigs,
    previewConfig,
    setPreviewConfig,
    applyTheme,
    resetToDefault,
    updatePreviewField,
    saveConfig,
    saveState,
  };
}
