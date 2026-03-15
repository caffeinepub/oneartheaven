/**
 * AdminWhiteLabel.tsx
 * Phase 12 — White Label Studio page at /admin/whitelabel
 * Protected for OrgAdmin + SuperAdmin roles.
 */

import { RequireRole } from "@/components/RequireRole";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SEED_WL_CONFIGS } from "@/data/whitelabelData";
import {
  FONT_OPTIONS,
  WL_STATUS_CONFIG,
  type WhiteLabelConfig,
  type WhiteLabelStatus,
} from "@/data/whitelabelTypes";
import { useWhiteLabel } from "@/hooks/useWhiteLabel";
import {
  Globe,
  Layers,
  Loader2,
  Monitor,
  Paintbrush,
  RotateCcw,
  Save,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Mini Browser Preview ───────────────────────────────────────────────────

function MiniBrowserPreview({ cfg }: { cfg: WhiteLabelConfig }) {
  return (
    <div
      data-ocid="wl.preview_panel"
      className="rounded-2xl overflow-hidden border shadow-2xl"
      style={{
        background: "oklch(0.10 0.04 260)",
        borderColor: "oklch(var(--gold) / 0.2)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{
          background: "oklch(0.13 0.04 260)",
          borderBottom: "1px solid oklch(var(--gold) / 0.1)",
        }}
      >
        <div className="flex gap-1.5">
          {[
            "oklch(0.6 0.2 27)",
            "oklch(0.7 0.18 80)",
            "oklch(0.6 0.18 145)",
          ].map((c) => (
            <span
              key={c}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
        <div
          className="flex-1 mx-2 px-3 py-1 rounded-md text-xs font-mono truncate"
          style={{
            background: "oklch(0.09 0.03 260)",
            color: "oklch(0.55 0.03 260)",
            border: "1px solid oklch(0.2 0.03 260)",
          }}
        >
          {cfg.customDomain || "your-org.oneeartheaven.org"}
        </div>
        <div
          className="text-xs px-2 py-0.5 rounded font-semibold"
          style={{
            background: `${cfg.primaryColor}22`,
            color: cfg.primaryColor,
            border: `1px solid ${cfg.primaryColor}44`,
          }}
        >
          Preview Mode
        </div>
      </div>

      {/* Page content */}
      <div className="p-5 space-y-4">
        {/* Navbar mockup */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded-lg"
          style={{
            background: `${cfg.primaryColor}12`,
            border: `1px solid ${cfg.primaryColor}25`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md"
              style={{ background: cfg.primaryColor }}
            />
            <span
              className="text-xs font-bold"
              style={{ color: cfg.primaryColor, fontFamily: cfg.fontFamily }}
            >
              {cfg.brandName || "Your Brand"}
            </span>
          </div>
          <div className="flex gap-1">
            {["Home", "About", "Platform"].map((label) => (
              <span
                key={label}
                className="text-[10px] px-2 py-0.5 rounded"
                style={{ color: "oklch(0.65 0.03 260)" }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Hero mockup */}
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${cfg.primaryColor}18 0%, ${cfg.secondaryColor}18 100%)`,
            border: `1px solid ${cfg.primaryColor}22`,
          }}
        >
          {cfg.tagline && (
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-2"
              style={{
                background: `${cfg.accentColor}18`,
                border: `1px solid ${cfg.accentColor}35`,
                color: cfg.accentColor,
                fontFamily: cfg.fontFamily,
              }}
            >
              <Sparkles className="h-2.5 w-2.5" />
              {cfg.tagline.slice(0, 40)}
              {cfg.tagline.length > 40 ? "…" : ""}
            </div>
          )}
          <h3
            className="text-sm font-bold leading-snug mb-1"
            style={{ color: cfg.primaryColor, fontFamily: cfg.fontFamily }}
          >
            {cfg.heroHeadline || "Your Headline"}
          </h3>
          <p
            className="text-[10px] leading-relaxed"
            style={{
              color: "oklch(0.65 0.04 260)",
              fontFamily: cfg.fontFamily,
            }}
          >
            {(cfg.heroSubline || "Your subline goes here").slice(0, 80)}
            {cfg.heroSubline && cfg.heroSubline.length > 80 ? "…" : ""}
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <div
              className="px-3 py-1 rounded-md text-[10px] font-semibold"
              style={{ background: cfg.primaryColor, color: "#fff" }}
            >
              Get Started
            </div>
            <div
              className="px-3 py-1 rounded-md text-[10px] font-semibold"
              style={{
                border: `1px solid ${cfg.accentColor}55`,
                color: cfg.accentColor,
              }}
            >
              Learn More
            </div>
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-medium"
            style={{ color: "oklch(0.55 0.03 260)" }}
          >
            Brand Colors:
          </span>
          <div className="flex gap-1.5">
            {[
              { color: cfg.primaryColor, label: "Primary" },
              { color: cfg.secondaryColor, label: "Secondary" },
              { color: cfg.accentColor, label: "Accent" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ background: color }}
                  title={label}
                />
              </div>
            ))}
          </div>
          <span
            className="text-[10px] ml-auto"
            style={{ color: "oklch(0.45 0.03 260)" }}
          >
            {cfg.fontFamily}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Config Form ────────────────────────────────────────────────────────────

interface ConfigFormProps {
  cfg: WhiteLabelConfig;
  onChange: (key: keyof WhiteLabelConfig, value: string) => void;
  onSocialChange: (key: string, value: string) => void;
  onSave: () => void;
  onPreviewLive: () => void;
  onReset: () => void;
  saveLoading: boolean;
  saveSuccess: boolean;
}

function ConfigForm({
  cfg,
  onChange,
  onSocialChange,
  onSave,
  onPreviewLive,
  onReset,
  saveLoading,
  saveSuccess,
}: ConfigFormProps) {
  return (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={["brand", "colors"]}>
        {/* Brand Identity */}
        <AccordionItem
          value="brand"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: "oklch(var(--gold))" }}
              />
              Brand Identity
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Brand Name
              </Label>
              <Input
                value={cfg.brandName}
                onChange={(e) => onChange("brandName", e.target.value)}
                placeholder="Your Organization Name"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.brand.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Tagline
              </Label>
              <Input
                value={cfg.tagline}
                onChange={(e) => onChange("tagline", e.target.value)}
                placeholder="Short tagline for your platform"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.brand.tagline_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Hero Headline
              </Label>
              <Input
                value={cfg.heroHeadline}
                onChange={(e) => onChange("heroHeadline", e.target.value)}
                placeholder="Main headline on your homepage"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.brand.headline_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Hero Subline
              </Label>
              <Textarea
                value={cfg.heroSubline}
                onChange={(e) => onChange("heroSubline", e.target.value)}
                placeholder="Supporting description for your hero section"
                rows={2}
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm resize-none"
                data-ocid="wl.brand.subline_textarea"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem
          value="colors"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Paintbrush
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.65 0.18 145)" }}
              />
              Colors
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            {(
              [
                {
                  key: "primaryColor",
                  label: "Primary Color",
                  ocid: "wl.colors.primary_input",
                },
                {
                  key: "secondaryColor",
                  label: "Secondary Color",
                  ocid: "wl.colors.secondary_input",
                },
                {
                  key: "accentColor",
                  label: "Accent Color",
                  ocid: "wl.colors.accent_input",
                },
              ] as {
                key: keyof WhiteLabelConfig;
                label: string;
                ocid: string;
              }[]
            ).map(({ key, label, ocid }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                  {label}
                </Label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg border shrink-0"
                    style={{
                      background: cfg[key] as string,
                      borderColor: "oklch(var(--gold) / 0.2)",
                    }}
                  />
                  <Input
                    value={cfg[key] as string}
                    onChange={(e) => onChange(key, e.target.value)}
                    placeholder="#000000"
                    className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9 font-mono"
                    data-ocid={ocid}
                  />
                  <input
                    type="color"
                    value={cfg[key] as string}
                    onChange={(e) => onChange(key, e.target.value)}
                    className="w-9 h-9 rounded-lg border cursor-pointer shrink-0"
                    style={{ borderColor: "oklch(var(--gold) / 0.2)" }}
                    aria-label={`${label} color picker`}
                  />
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Logo & Media */}
        <AccordionItem
          value="logo"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Layers
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.7 0.15 260)" }}
              />
              Logo &amp; Media
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Logo URL
              </Label>
              <Input
                value={cfg.logoUrl}
                onChange={(e) => onChange("logoUrl", e.target.value)}
                placeholder="https://yourorg.com/logo.png"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.logo.url_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Favicon URL
              </Label>
              <Input
                value={cfg.faviconUrl}
                onChange={(e) => onChange("faviconUrl", e.target.value)}
                placeholder="https://yourorg.com/favicon.ico"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.favicon.url_input"
              />
            </div>
            <p className="text-[11px] text-[oklch(0.48_0.04_260)] leading-relaxed">
              For file uploads, use the Blob Storage module in the Transparency
              or Admin sections to host your logo assets.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Typography */}
        <AccordionItem
          value="typography"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Type
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.72 0.18 75)" }}
              />
              Typography
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Font Family
              </Label>
              <Select
                value={cfg.fontFamily}
                onValueChange={(v) => onChange("fontFamily", v)}
              >
                <SelectTrigger
                  className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] h-9 text-sm"
                  data-ocid="wl.font.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[oklch(0.13_0.04_260)] border-[oklch(var(--gold)/0.2)]">
                  {FONT_OPTIONS.map((font) => (
                    <SelectItem
                      key={font}
                      value={font}
                      className="text-[oklch(0.85_0.02_260)] text-sm"
                    >
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Domain & Contact */}
        <AccordionItem
          value="domain"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Globe
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.65 0.18 195)" }}
              />
              Domain &amp; Contact
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Custom Domain
              </Label>
              <Input
                value={cfg.customDomain}
                onChange={(e) => onChange("customDomain", e.target.value)}
                placeholder="yourorg.oneeartheaven.org"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.domain.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Support Email
              </Label>
              <Input
                value={cfg.supportEmail}
                onChange={(e) => onChange("supportEmail", e.target.value)}
                placeholder="support@yourorg.com"
                type="email"
                className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                data-ocid="wl.contact.email_input"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Social Links */}
        <AccordionItem
          value="social"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Zap
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.75 0.18 55)" }}
              />
              Social Links
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            {[
              {
                key: "twitter",
                label: "Twitter / X",
                placeholder: "https://twitter.com/yourorg",
                ocid: "wl.social.twitter_input",
              },
              {
                key: "linkedin",
                label: "LinkedIn",
                placeholder: "https://linkedin.com/company/yourorg",
                ocid: "wl.social.linkedin_input",
              },
              {
                key: "github",
                label: "GitHub",
                placeholder: "https://github.com/yourorg",
                ocid: "wl.social.github_input",
              },
              {
                key: "website",
                label: "Website",
                placeholder: "https://yourorg.com",
                ocid: "wl.social.website_input",
              },
            ].map(({ key, label, placeholder, ocid }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                  {label}
                </Label>
                <Input
                  value={(cfg.socialLinks as Record<string, string>)[key] ?? ""}
                  onChange={(e) => onSocialChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] text-sm h-9"
                  data-ocid={ocid}
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Status */}
        <AccordionItem
          value="status"
          className="border-[oklch(var(--gold)/0.15)]"
        >
          <AccordionTrigger className="text-sm font-semibold text-[oklch(0.85_0.03_260)] hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Monitor
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.65 0.18 195)" }}
              />
              Status &amp; Publishing
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-[oklch(0.6_0.03_260)]">
                Configuration Status
              </Label>
              <Select
                value={cfg.status}
                onValueChange={(v) => onChange("status", v as WhiteLabelStatus)}
              >
                <SelectTrigger
                  className="bg-[oklch(0.10_0.03_260)] border-[oklch(var(--gold)/0.2)] text-[oklch(0.88_0.01_95)] h-9 text-sm"
                  data-ocid="wl.status.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[oklch(0.13_0.04_260)] border-[oklch(var(--gold)/0.2)]">
                  {(
                    Object.entries(WL_STATUS_CONFIG) as [
                      WhiteLabelStatus,
                      { label: string; color: string },
                    ][]
                  ).map(([status, conf]) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="text-[oklch(0.85_0.02_260)] text-sm"
                    >
                      {conf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div
              className="rounded-lg p-3 space-y-1.5 text-xs"
              style={{
                background: "oklch(0.10 0.03 260)",
                border: "1px solid oklch(var(--gold) / 0.12)",
              }}
            >
              <p className="text-[oklch(0.65_0.04_260)] font-medium">
                Status guide:
              </p>
              <ul className="space-y-1 text-[oklch(0.5_0.03_260)]">
                <li>
                  <span className="text-slate-400 font-semibold">Draft</span> —
                  Saved but not visible to tenants
                </li>
                <li>
                  <span className="text-yellow-400 font-semibold">Preview</span>{" "}
                  — Visible only to admins for testing
                </li>
                <li>
                  <span className="text-emerald-400 font-semibold">Active</span>{" "}
                  — Live for all org members
                </li>
                <li>
                  <span className="text-red-400 font-semibold">Suspended</span>{" "}
                  — Deactivated, reverts to platform defaults
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div
        className="flex flex-wrap gap-3 pt-2"
        style={{ borderTop: "1px solid oklch(var(--gold) / 0.12)" }}
      >
        <Button
          onClick={onPreviewLive}
          variant="outline"
          size="sm"
          className="gap-2 border-[oklch(0.65_0.18_195/0.4)] text-[oklch(0.65_0.18_195)] hover:bg-[oklch(0.65_0.18_195/0.08)] flex-1 sm:flex-none"
          data-ocid="wl.preview_live_button"
        >
          <Monitor className="h-3.5 w-3.5" />
          Preview Live
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="gap-2 border-[oklch(0.55_0.03_260/0.4)] text-[oklch(0.6_0.03_260)] hover:bg-[oklch(0.55_0.03_260/0.08)] flex-1 sm:flex-none"
          data-ocid="wl.reset_button"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
        <Button
          onClick={onSave}
          disabled={saveLoading}
          size="sm"
          className="gap-2 btn-gold flex-1 sm:flex-none"
          data-ocid="wl.save_button"
        >
          {saveLoading ? (
            <>
              <Loader2
                className="h-3.5 w-3.5 animate-spin"
                data-ocid="wl.save_button.loading_state"
              />
              Saving…
            </>
          ) : saveSuccess ? (
            <>
              <span data-ocid="wl.save_button.success_state">✓ Saved!</span>
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function AdminWhiteLabelPage() {
  return (
    <RequireRole roles={["SuperAdmin", "OrgAdmin"]}>
      <AdminWhiteLabelContent />
    </RequireRole>
  );
}

function AdminWhiteLabelContent() {
  const allConfigs = SEED_WL_CONFIGS;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeOrgId = allConfigs[activeIdx]?.orgId;

  const {
    previewConfig,
    setPreviewConfig,
    applyTheme,
    resetToDefault,
    saveConfig,
    saveState,
  } = useWhiteLabel(activeOrgId);

  // Local edit state seeded from the selected config
  const [editCfg, setEditCfg] = useState<WhiteLabelConfig>(
    allConfigs[activeIdx] ?? allConfigs[0],
  );

  function handleTabChange(idx: number) {
    setActiveIdx(idx);
    const cfg = allConfigs[idx];
    setEditCfg(cfg);
    setPreviewConfig(cfg);
  }

  function handleFieldChange(key: keyof WhiteLabelConfig, value: string) {
    setEditCfg((prev) => {
      const updated = { ...prev, [key]: value };
      setPreviewConfig(updated);
      return updated;
    });
  }

  function handleSocialChange(key: string, value: string) {
    setEditCfg((prev) => {
      const updated = {
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      };
      setPreviewConfig(updated);
      return updated;
    });
  }

  const statsData = [
    {
      label: "Total Configs",
      value: allConfigs.length,
      color: "oklch(var(--gold))",
    },
    {
      label: "Active",
      value: allConfigs.filter((c) => c.status === "active").length,
      color: "oklch(0.7 0.18 145)",
    },
    {
      label: "Draft / Preview",
      value: allConfigs.filter(
        (c) => c.status === "draft" || c.status === "preview",
      ).length,
      color: "oklch(0.75 0.18 75)",
    },
    {
      label: "Suspended",
      value: allConfigs.filter((c) => c.status === "suspended").length,
      color: "oklch(0.65 0.18 27)",
    },
  ];

  const displayCfg: WhiteLabelConfig = previewConfig ?? editCfg;

  return (
    <main
      className="min-h-screen pb-20"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-12 pb-10"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.12 0.05 260) 0%, oklch(0.10 0.04 260) 100%)",
          borderBottom: "1px solid oklch(var(--gold) / 0.12)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 60% 0%, oklch(0.72 0.16 75 / 0.10) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold"
                  style={{
                    borderColor: "oklch(var(--gold) / 0.3)",
                    background: "oklch(var(--gold) / 0.07)",
                    color: "oklch(var(--gold))",
                  }}
                >
                  <Paintbrush className="h-3 w-3" />
                  Phase 12 · White Label
                </div>
                <Badge
                  variant="outline"
                  className="border-[oklch(0.65_0.18_195/0.4)] text-[oklch(0.65_0.18_195)] text-[10px]"
                >
                  PaaS Studio
                </Badge>
              </div>
              <h1
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "oklch(var(--pearl))",
                }}
              >
                White Label{" "}
                <span style={{ color: "oklch(var(--gold))" }}>Studio</span>
              </h1>
              <p
                className="text-sm mt-2 max-w-lg"
                style={{ color: "oklch(0.6 0.04 260)" }}
              >
                Configure brand identity, colors, typography, and publishing
                settings for each tenant organization.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="py-5"
        style={{
          background: "oklch(0.11 0.04 260)",
          borderBottom: "1px solid oklch(var(--teal) / 0.12)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center text-center py-2"
              >
                <div
                  className="font-display text-3xl font-extrabold leading-none mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Config Selector Tabs */}
        <div
          className="flex flex-wrap gap-2"
          style={{
            borderBottom: "1px solid oklch(var(--gold) / 0.10)",
            paddingBottom: "1rem",
          }}
        >
          <span
            className="text-xs font-medium self-center mr-2"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            Config for:
          </span>
          {allConfigs.map((cfg, idx) => (
            <button
              key={cfg.id}
              type="button"
              onClick={() => handleTabChange(idx)}
              data-ocid={`wl.config_selector.tab.${idx + 1}`}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
              style={{
                background:
                  activeIdx === idx
                    ? `${cfg.primaryColor}22`
                    : "oklch(0.10 0.03 260)",
                borderColor:
                  activeIdx === idx
                    ? `${cfg.primaryColor}55`
                    : "oklch(var(--gold) / 0.15)",
                color:
                  activeIdx === idx ? cfg.primaryColor : "oklch(0.6 0.03 260)",
              }}
            >
              {cfg.brandName}
              <span
                className={`ml-1.5 inline-block w-1.5 h-1.5 rounded-full ${WL_STATUS_CONFIG[cfg.status].color.replace("text-", "bg-")}`}
              />
            </button>
          ))}
        </div>

        {/* Two-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "oklch(0.5 0.04 260)" }}
              >
                Live Preview
              </p>
              <MiniBrowserPreview cfg={displayCfg} />
              <div
                className="rounded-lg p-3 text-xs"
                style={{
                  background: "oklch(0.10 0.03 260)",
                  border: "1px solid oklch(var(--teal) / 0.18)",
                  color: "oklch(0.55 0.04 260)",
                }}
              >
                Preview updates in real time as you edit form fields. Click{" "}
                <span style={{ color: "oklch(0.65 0.18 195)" }}>
                  Preview Live
                </span>{" "}
                to apply the theme to the full platform.
              </div>
            </div>
          </div>

          {/* Right: Config Form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: "oklch(0.12 0.04 260)",
                border: "1px solid oklch(var(--gold) / 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="font-display font-bold text-lg"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  {displayCfg.brandName}
                </h2>
                <span
                  className={`text-xs font-semibold ${
                    WL_STATUS_CONFIG[displayCfg.status].color
                  }`}
                >
                  {WL_STATUS_CONFIG[displayCfg.status].label}
                </span>
              </div>

              <ConfigForm
                cfg={editCfg}
                onChange={handleFieldChange}
                onSocialChange={handleSocialChange}
                onSave={() => saveConfig(editCfg)}
                onPreviewLive={() => applyTheme(editCfg)}
                onReset={() => {
                  resetToDefault();
                  setEditCfg(allConfigs[activeIdx]);
                  setPreviewConfig(allConfigs[activeIdx]);
                }}
                saveLoading={saveState.loading}
                saveSuccess={saveState.success}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
