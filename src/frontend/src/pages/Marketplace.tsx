import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  MarketplaceFilter,
  MarketplaceListing,
} from "@/data/marketplaceTypes";
import {
  APPLICATION_STEPS,
  GEOGRAPHY_CONFIG,
  IMPACT_CATEGORY_CONFIG,
  LISTING_STATUS_CONFIG,
  LISTING_TIER_CONFIG,
  LISTING_TYPE_CONFIG,
} from "@/data/marketplaceTypes";
import {
  useFranchiseApplication,
  useMarketplace,
  useMarketplaceListing,
} from "@/hooks/useMarketplace";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function formatUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

// ─── Listing Card ─────────────────────────────────────────────────────────────
function ListingCard({
  listing,
  onView,
}: {
  listing: MarketplaceListing;
  onView: () => void;
}) {
  const typeConf = LISTING_TYPE_CONFIG[listing.type];
  const geoConf = GEOGRAPHY_CONFIG[listing.geography];
  const catConf = IMPACT_CATEGORY_CONFIG[listing.impactCategory];
  const unitsLeft = listing.financials.availableUnits;
  const unitsTotal = listing.financials.totalUnits;
  const pct = Math.round((listing.financials.soldUnits / unitsTotal) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg"
      style={{
        borderColor: "oklch(0.28 0.03 260)",
        background: "oklch(0.12 0.03 260)",
        borderTopColor: typeConf.color,
        borderTopWidth: "3px",
      }}
    >
      <div className="flex items-start justify-between gap-2 px-4 pt-4">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: typeConf.bgColor, color: typeConf.color }}
        >
          {typeConf.icon} {typeConf.label}
        </span>
        {listing.status === "featured" && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
            ★ Featured
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 px-4 pb-4 pt-2 gap-2">
        <p className="text-xs" style={{ color: "oklch(0.55 0.03 260)" }}>
          {listing.vendorName}
        </p>
        <h3
          className="font-semibold text-base leading-snug"
          style={{ color: "oklch(0.92 0.02 260)" }}
        >
          {listing.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.60 0.03 260)" }}
        >
          {listing.tagline}
        </p>
        <div
          className="flex items-center gap-3 text-xs"
          style={{ color: "oklch(0.58 0.04 260)" }}
        >
          <span>
            {geoConf.flag} {geoConf.label}
          </span>
          <span>
            {catConf.icon} {catConf.label}
          </span>
        </div>
        <div
          className="grid grid-cols-3 gap-2 rounded-lg p-2 text-center text-xs mt-1"
          style={{ background: "oklch(0.16 0.03 260)" }}
        >
          <div>
            <div
              className="font-bold text-sm"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {formatUSD(listing.financials.minInvestment)}
            </div>
            <div style={{ color: "oklch(0.52 0.03 260)" }}>Min. Inv.</div>
          </div>
          <div>
            <div
              className="font-bold text-sm"
              style={{ color: "oklch(0.70 0.18 140)" }}
            >
              {listing.financials.projectedROI}%
            </div>
            <div style={{ color: "oklch(0.52 0.03 260)" }}>ROI</div>
          </div>
          <div>
            <div
              className="font-bold text-sm"
              style={{ color: "oklch(0.68 0.22 290)" }}
            >
              {listing.financials.ffEarningsPct}%
            </div>
            <div style={{ color: "oklch(0.52 0.03 260)" }}>FF™</div>
          </div>
        </div>
        <div className="mt-1">
          <div
            className="flex justify-between text-xs mb-1"
            style={{ color: "oklch(0.55 0.03 260)" }}
          >
            <span>{unitsLeft} units left</span>
            <span>{pct}% filled</span>
          </div>
          <Progress value={pct} className="h-1.5" />
        </div>
        <div className="flex flex-wrap gap-1">
          {listing.sdgIds.slice(0, 3).map((id) => (
            <span
              key={id}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "oklch(0.72 0.16 75 / 0.15)",
                color: "oklch(0.72 0.16 75)",
              }}
            >
              SDG {id}
            </span>
          ))}
          {listing.sdgIds.length > 3 && (
            <span className="text-xs" style={{ color: "oklch(0.50 0.03 260)" }}>
              +{listing.sdgIds.length - 3}
            </span>
          )}
        </div>
        <Button
          data-ocid="marketplace.listing.button"
          variant="outline"
          className="w-full mt-auto"
          style={{
            borderColor: typeConf.color,
            color: typeConf.color,
            background: typeConf.bgColor,
          }}
          onClick={onView}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Detail Sheet ─────────────────────────────────────────────────────────────
function DetailSheet({
  listingId,
  onClose,
  onApply,
}: {
  listingId: string;
  onClose: () => void;
  onApply: () => void;
}) {
  const { listing, similarListings, unitsProgress, isAlmostFull } =
    useMarketplaceListing(listingId);

  if (!listing) return null;

  const typeConf = LISTING_TYPE_CONFIG[listing.type];
  const tierConf = LISTING_TIER_CONFIG[listing.tier];
  const statusConf = LISTING_STATUS_CONFIG[listing.status];
  const geoConf = GEOGRAPHY_CONFIG[listing.geography];
  const catConf = IMPACT_CATEGORY_CONFIG[listing.impactCategory];
  const canApply = listing.status === "active" || listing.status === "featured";

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 w-full cursor-default"
        style={{ background: "oklch(0 0 0 / 0.60)", border: "none" }}
        onClick={onClose}
        aria-label="Close panel"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-y-auto w-full max-w-lg"
        data-ocid="marketplace.listing.panel"
        style={{
          background: "oklch(0.10 0.03 260)",
          borderLeft: "1px solid oklch(0.24 0.03 260)",
        }}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
          style={{
            background: "oklch(0.10 0.03 260)",
            borderBottom: "1px solid oklch(0.20 0.03 260)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: typeConf.bgColor, color: typeConf.color }}
            >
              {typeConf.icon} {typeConf.label}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${statusConf.color}22`,
                color: statusConf.color,
              }}
            >
              {statusConf.label}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="marketplace.listing.close_button"
          >
            <X className="h-5 w-5" style={{ color: "oklch(0.55 0.03 260)" }} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5">
          <div>
            <div className="flex gap-2 mb-1">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: `${tierConf.color}22`,
                  color: tierConf.color,
                }}
              >
                {tierConf.label}
              </span>
            </div>
            <h2
              className="text-xl font-bold mb-1"
              style={{ color: "oklch(0.92 0.02 260)" }}
            >
              {listing.title}
            </h2>
            <p className="text-sm" style={{ color: "oklch(0.62 0.04 260)" }}>
              {listing.tagline}
            </p>
            <div
              className="flex items-center gap-3 mt-2 text-xs"
              style={{ color: "oklch(0.55 0.04 260)" }}
            >
              <span>
                {geoConf.flag} {geoConf.label}
              </span>
              <span>
                {catConf.icon} {catConf.label}
              </span>
              <span style={{ color: "oklch(0.52 0.03 260)" }}>
                by {listing.vendorName}
              </span>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.68 0.03 260)" }}
          >
            {listing.description}
          </p>

          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.55 0.03 260)" }}
            >
              Key Highlights
            </h4>
            <ul className="flex flex-col gap-1.5">
              {listing.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "oklch(0.72 0.03 260)" }}
                >
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: typeConf.color }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(0.24 0.03 260)" }}
          >
            <div
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
              style={{
                background: "oklch(0.16 0.04 260)",
                color: "oklch(0.55 0.03 260)",
              }}
            >
              Financials
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  [
                    "Min. Investment",
                    formatUSD(listing.financials.minInvestment),
                  ],
                  ["Ask Price", formatUSD(listing.financials.askPrice)],
                  ["Revenue Share", `${listing.financials.revenueSharePct}%`],
                  ["Projected ROI", `${listing.financials.projectedROI}%`],
                  [
                    "Payback Period",
                    `${listing.financials.paybackMonths} months`,
                  ],
                  ["FF™ Earnings", `${listing.financials.ffEarningsPct}%`],
                  [
                    "Units Available",
                    `${listing.financials.availableUnits} / ${listing.financials.totalUnits}`,
                  ],
                  ["Units Sold", String(listing.financials.soldUnits)],
                ].map(([label, value]) => (
                  <tr
                    key={label}
                    style={{ borderTop: "1px solid oklch(0.18 0.03 260)" }}
                  >
                    <td
                      className="px-4 py-2"
                      style={{ color: "oklch(0.55 0.03 260)" }}
                    >
                      {label}
                    </td>
                    <td
                      className="px-4 py-2 text-right font-medium"
                      style={{ color: "oklch(0.88 0.02 260)" }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div
              className="flex justify-between text-xs mb-1"
              style={{ color: "oklch(0.52 0.03 260)" }}
            >
              <span>Units availability</span>
              <span>{unitsProgress}% sold</span>
            </div>
            <Progress value={unitsProgress} className="h-2" />
            {isAlmostFull && (
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                ⚠ Almost full — only {listing.financials.availableUnits} units
                remaining
              </p>
            )}
          </div>

          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.55 0.03 260)" }}
            >
              SDG Alignment
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {listing.sdgIds.map((id) => (
                <span
                  key={id}
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    background: "oklch(0.72 0.16 75 / 0.15)",
                    color: "oklch(0.72 0.16 75)",
                  }}
                >
                  SDG {id}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: "oklch(0.18 0.03 260)",
                  color: "oklch(0.52 0.03 260)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {similarListings.length > 0 && (
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "oklch(0.55 0.03 260)" }}
              >
                Similar Listings
              </h4>
              <div className="flex flex-col gap-2">
                {similarListings.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.15 0.03 260)",
                      border: "1px solid oklch(0.22 0.03 260)",
                    }}
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.82 0.02 260)" }}
                      >
                        {s.title}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.50 0.03 260)" }}
                      >
                        {formatUSD(s.financials.minInvestment)} min &middot;{" "}
                        {s.financials.projectedROI}% ROI
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: LISTING_TYPE_CONFIG[s.type].bgColor,
                        color: LISTING_TYPE_CONFIG[s.type].color,
                      }}
                    >
                      {LISTING_TYPE_CONFIG[s.type].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {canApply ? (
            <Button
              data-ocid="marketplace.listing.open_modal_button"
              className="w-full font-bold text-base"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.68 0.18 55))",
                color: "oklch(0.08 0.03 260)",
              }}
              onClick={onApply}
            >
              Apply Now
            </Button>
          ) : (
            <Button disabled className="w-full">
              Closed
            </Button>
          )}
        </div>
      </motion.div>
    </>
  );
}

// ─── Application Modal ────────────────────────────────────────────────────────
function ApplicationModal({
  listingId,
  listingTitle,
  onClose,
}: {
  listingId: string;
  listingTitle: string;
  onClose: () => void;
}) {
  const app = useFranchiseApplication(listingId);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        style={{ background: "oklch(0 0 0 / 0.70)", border: "none" }}
        onClick={onClose}
        aria-label="Close modal"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg rounded-2xl flex flex-col max-h-[90vh] overflow-hidden"
        data-ocid="marketplace.application.modal"
        style={{
          background: "oklch(0.11 0.03 260)",
          border: "1px solid oklch(0.26 0.03 260)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid oklch(0.20 0.03 260)" }}
        >
          <div>
            <h3
              className="font-bold text-base"
              style={{ color: "oklch(0.92 0.02 260)" }}
            >
              Apply for Listing
            </h3>
            <p
              className="text-xs mt-0.5 truncate max-w-xs"
              style={{ color: "oklch(0.55 0.03 260)" }}
            >
              {listingTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="marketplace.application.close_button"
          >
            <X className="h-5 w-5" style={{ color: "oklch(0.55 0.03 260)" }} />
          </button>
        </div>

        {!app.isSuccess && (
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ borderBottom: "1px solid oklch(0.18 0.03 260)" }}
          >
            {APPLICATION_STEPS.map((label, i) => {
              const n = i + 1;
              const active = app.step === n;
              const done = app.step > n;
              return (
                <div key={label} className="flex items-center gap-1.5 flex-1">
                  <div
                    className="flex items-center justify-center rounded-full text-xs font-bold w-6 h-6 shrink-0"
                    style={{
                      background: done
                        ? "oklch(0.70 0.18 140)"
                        : active
                          ? "oklch(0.72 0.16 75)"
                          : "oklch(0.22 0.03 260)",
                      color:
                        done || active
                          ? "oklch(0.08 0.03 260)"
                          : "oklch(0.52 0.03 260)",
                    }}
                  >
                    {done ? "✓" : n}
                  </div>
                  <span
                    className="text-xs hidden sm:block"
                    style={{
                      color: active
                        ? "oklch(0.82 0.02 260)"
                        : "oklch(0.48 0.03 260)",
                    }}
                  >
                    {label}
                  </span>
                  {i < APPLICATION_STEPS.length - 1 && (
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.24 0.03 260)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {app.isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
              data-ocid="marketplace.application.success_state"
            >
              <CheckCircle2
                className="h-14 w-14"
                style={{ color: "oklch(0.70 0.18 140)" }}
              />
              <h3
                className="text-xl font-bold"
                style={{ color: "oklch(0.92 0.02 260)" }}
              >
                Application Submitted!
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.62 0.03 260)" }}>
                Your application for{" "}
                <strong style={{ color: "oklch(0.80 0.02 260)" }}>
                  {listingTitle}
                </strong>{" "}
                has been received. The vendor will review and respond within 5
                business days.
              </p>
              {app.submittedApp && (
                <div
                  className="w-full rounded-lg p-3 text-left text-sm"
                  style={{
                    background: "oklch(0.16 0.04 260)",
                    border: "1px solid oklch(0.24 0.03 260)",
                  }}
                >
                  <div style={{ color: "oklch(0.55 0.03 260)" }}>
                    Organisation:
                  </div>
                  <div style={{ color: "oklch(0.85 0.02 260)" }}>
                    {app.submittedApp.orgName}
                  </div>
                  <div
                    className="mt-2"
                    style={{ color: "oklch(0.55 0.03 260)" }}
                  >
                    Territory:
                  </div>
                  <div style={{ color: "oklch(0.85 0.02 260)" }}>
                    {app.submittedApp.proposedTerritory}
                  </div>
                  <div
                    className="mt-2"
                    style={{ color: "oklch(0.55 0.03 260)" }}
                  >
                    Funding Commitment:
                  </div>
                  <div style={{ color: "oklch(0.72 0.16 75)" }}>
                    {formatUSD(app.submittedApp.fundingAmount)}
                  </div>
                </div>
              )}
              <Button
                data-ocid="marketplace.application.close_button"
                className="w-full"
                style={{
                  background: "oklch(0.72 0.16 75)",
                  color: "oklch(0.08 0.03 260)",
                }}
                onClick={onClose}
              >
                Done
              </Button>
            </motion.div>
          ) : app.step === 1 ? (
            <div className="flex flex-col gap-4">
              <FormField
                label="Organisation Name"
                error={app.stepErrors.orgName}
              >
                <Input
                  data-ocid="marketplace.application.input"
                  value={app.form.orgName}
                  onChange={(e) => app.updateField("orgName", e.target.value)}
                  placeholder="Your organisation"
                  style={inputStyle}
                />
              </FormField>
              <FormField
                label="Contact Name"
                error={app.stepErrors.contactName}
              >
                <Input
                  value={app.form.contactName}
                  onChange={(e) =>
                    app.updateField("contactName", e.target.value)
                  }
                  placeholder="Full name"
                  style={inputStyle}
                />
              </FormField>
              <FormField
                label="Contact Email"
                error={app.stepErrors.contactEmail}
              >
                <Input
                  type="email"
                  value={app.form.contactEmail}
                  onChange={(e) =>
                    app.updateField("contactEmail", e.target.value)
                  }
                  placeholder="email@organisation.org"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Team Size">
                <Input
                  type="number"
                  value={app.form.teamSize}
                  onChange={(e) => app.updateField("teamSize", e.target.value)}
                  placeholder="5"
                  style={inputStyle}
                />
              </FormField>
            </div>
          ) : app.step === 2 ? (
            <div className="flex flex-col gap-4">
              <FormField
                label="Proposed Territory"
                error={app.stepErrors.proposedTerritory}
              >
                <Input
                  value={app.form.proposedTerritory}
                  onChange={(e) =>
                    app.updateField("proposedTerritory", e.target.value)
                  }
                  placeholder="e.g. East Africa, Kenya"
                  style={inputStyle}
                />
              </FormField>
              <FormField
                label="Funding Commitment (USD)"
                error={app.stepErrors.fundingAmount}
              >
                <Input
                  type="number"
                  value={app.form.fundingAmount}
                  onChange={(e) =>
                    app.updateField("fundingAmount", e.target.value)
                  }
                  placeholder="100000"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Deployment Timeline">
                <Select
                  value={app.form.timelineMonths}
                  onValueChange={(v) => app.updateField("timelineMonths", v)}
                >
                  <SelectTrigger style={inputStyle}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.14 0.03 260)",
                      border: "1px solid oklch(0.26 0.03 260)",
                    }}
                  >
                    {["3", "6", "12", "18", "24"].map((m) => (
                      <SelectItem
                        key={m}
                        value={m}
                        className="text-slate-200 focus:bg-slate-700"
                      >
                        {m} months
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <FormField
                label="Why are you applying?"
                error={app.stepErrors.motivation}
              >
                <Textarea
                  value={app.form.motivation}
                  onChange={(e) =>
                    app.updateField("motivation", e.target.value)
                  }
                  placeholder="Describe your mission alignment and readiness (min 20 characters)..."
                  rows={4}
                  style={inputStyle}
                />
              </FormField>
              <FormField label="SDG Focus" error={app.stepErrors.sdgFocus}>
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((id) => {
                    const sel = app.form.sdgFocus.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => app.toggleSDG(id)}
                        data-ocid="marketplace.application.checkbox"
                        className="flex items-center justify-center rounded text-sm font-bold h-9 transition-all"
                        style={{
                          background: sel
                            ? "oklch(0.72 0.16 75 / 0.20)"
                            : "oklch(0.18 0.03 260)",
                          border: sel
                            ? "2px solid oklch(0.72 0.16 75)"
                            : "1px solid oklch(0.26 0.03 260)",
                          color: sel
                            ? "oklch(0.72 0.16 75)"
                            : "oklch(0.55 0.03 260)",
                        }}
                      >
                        {id}
                      </button>
                    );
                  })}
                </div>
              </FormField>
            </div>
          )}
        </div>

        {!app.isSuccess && (
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderTop: "1px solid oklch(0.20 0.03 260)" }}
          >
            <Button
              data-ocid="marketplace.application.cancel_button"
              variant="outline"
              onClick={app.step === 1 ? onClose : app.prevStep}
              style={{
                borderColor: "oklch(0.30 0.03 260)",
                color: "oklch(0.62 0.03 260)",
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {app.step === 1 ? "Cancel" : "Back"}
            </Button>
            {app.step < 3 ? (
              <Button
                data-ocid="marketplace.application.primary_button"
                disabled={!app.canAdvance}
                onClick={app.nextStep}
                style={{
                  background: "oklch(0.72 0.16 75)",
                  color: "oklch(0.08 0.03 260)",
                  opacity: app.canAdvance ? 1 : 0.5,
                }}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                data-ocid="marketplace.application.submit_button"
                disabled={app.isSubmitting || !app.canAdvance}
                onClick={app.submit}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.68 0.18 55))",
                  color: "oklch(0.08 0.03 260)",
                }}
              >
                {app.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "oklch(0.16 0.04 260)",
  borderColor: "oklch(0.28 0.03 260)",
  color: "oklch(0.88 0.02 260)",
};

function FormField({
  label,
  error,
  children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label style={{ color: "oklch(0.72 0.02 260)" }}>{label}</Label>
      {children}
      {error && (
        <p
          className="text-xs"
          style={{ color: "oklch(0.65 0.15 27)" }}
          data-ocid="marketplace.application.error_state"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function MarketplacePage() {
  const market = useMarketplace();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [applyId, setApplyId] = useState<string | null>(null);

  const selectedListing = selectedId
    ? market.allListings.find((l) => l.id === selectedId)
    : null;

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.03 260)" }}
    >
      {/* Hero */}
      <section
        className="relative px-4 py-16 sm:py-20 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.13 0.06 260) 0%, oklch(0.08 0.03 260) 100%)",
          borderBottom: "1px solid oklch(0.18 0.03 260)",
        }}
        data-ocid="marketplace.section"
      >
        <div className="max-w-3xl mx-auto">
          <Badge
            className="mb-4 font-semibold"
            style={{
              background: "oklch(0.72 0.16 75 / 0.15)",
              color: "oklch(0.72 0.16 75)",
              border: "1px solid oklch(0.72 0.16 75 / 0.30)",
            }}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Phase 13 · Marketplace
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.94 0.02 260)" }}
          >
            FinFracFran™ Marketplace
          </h1>
          <p className="text-lg" style={{ color: "oklch(0.62 0.04 260)" }}>
            Discover, invest, and franchise proven solutions — scale impact
            through shared economic opportunity.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              ["Total Listings", String(market.stats.totalListings)],
              ["Active", String(market.stats.activeListings)],
              ["Total Volume", formatUSD(market.stats.totalVolumeUSD)],
              ["Avg ROI", `${market.stats.avgROI}%`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="px-4 py-2 rounded-xl text-center"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.24 0.03 260)",
                }}
              >
                <div
                  className="font-bold text-lg"
                  style={{ color: "oklch(0.72 0.16 75)" }}
                >
                  {value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.52 0.03 260)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section
        className="sticky top-0 z-30 px-4 py-3"
        style={{
          background: "oklch(0.10 0.03 260 / 0.95)",
          borderBottom: "1px solid oklch(0.18 0.03 260)",
          backdropFilter: "blur(12px)",
        }}
        data-ocid="marketplace.filter.panel"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            {(
              [
                "all",
                "franchise",
                "fractional",
                "campaign",
                "license",
                "partnership",
              ] as const
            ).map((t) => {
              const conf = t === "all" ? null : LISTING_TYPE_CONFIG[t];
              const active = market.filters.type === t;
              return (
                <button
                  key={t}
                  type="button"
                  data-ocid="marketplace.filter.tab"
                  onClick={() => market.updateFilter("type", t)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: active
                      ? conf
                        ? conf.bgColor
                        : "oklch(0.72 0.16 75 / 0.15)"
                      : "oklch(0.16 0.03 260)",
                    color: active
                      ? conf
                        ? conf.color
                        : "oklch(0.72 0.16 75)"
                      : "oklch(0.55 0.03 260)",
                    border: active
                      ? `1px solid ${conf ? conf.color : "oklch(0.72 0.16 75)"}`
                      : "1px solid oklch(0.24 0.03 260)",
                  }}
                >
                  {conf ? `${conf.icon} ${conf.label}` : "All"}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.50 0.03 260)" }}
              />
              <Input
                data-ocid="marketplace.search_input"
                placeholder="Search listings…"
                value={market.filters.search ?? ""}
                onChange={(e) => market.updateFilter("search", e.target.value)}
                className="pl-9"
                style={inputStyle}
              />
            </div>

            <Select
              value={market.filters.tier ?? "all"}
              onValueChange={(v) =>
                market.updateFilter("tier", v as MarketplaceFilter["tier"])
              }
            >
              <SelectTrigger
                data-ocid="marketplace.filter.select"
                className="w-32"
                style={inputStyle}
              >
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.14 0.03 260)",
                  border: "1px solid oklch(0.26 0.03 260)",
                }}
              >
                <SelectItem
                  value="all"
                  className="text-slate-200 focus:bg-slate-700"
                >
                  All Tiers
                </SelectItem>
                {(["starter", "growth", "scale", "enterprise"] as const).map(
                  (t) => (
                    <SelectItem
                      key={t}
                      value={t}
                      className="text-slate-200 focus:bg-slate-700"
                    >
                      {LISTING_TIER_CONFIG[t].label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>

            <Select
              value={market.filters.geography ?? "all"}
              onValueChange={(v) =>
                market.updateFilter(
                  "geography",
                  v as MarketplaceFilter["geography"],
                )
              }
            >
              <SelectTrigger
                data-ocid="marketplace.filter.select"
                className="w-36"
                style={inputStyle}
              >
                <SelectValue placeholder="Geography" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.14 0.03 260)",
                  border: "1px solid oklch(0.26 0.03 260)",
                }}
              >
                <SelectItem
                  value="all"
                  className="text-slate-200 focus:bg-slate-700"
                >
                  All Regions
                </SelectItem>
                {(Object.keys(GEOGRAPHY_CONFIG) as Geography[]).map((g) => (
                  <SelectItem
                    key={g}
                    value={g}
                    className="text-slate-200 focus:bg-slate-700"
                  >
                    {GEOGRAPHY_CONFIG[g].flag} {GEOGRAPHY_CONFIG[g].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={market.filters.sortBy ?? "newest"}
              onValueChange={(v) =>
                market.updateFilter("sortBy", v as MarketplaceFilter["sortBy"])
              }
            >
              <SelectTrigger
                data-ocid="marketplace.filter.select"
                className="w-36"
                style={inputStyle}
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.14 0.03 260)",
                  border: "1px solid oklch(0.26 0.03 260)",
                }}
              >
                {(
                  [
                    ["newest", "Newest"],
                    ["price-asc", "Price: Low-High"],
                    ["price-desc", "Price: High-Low"],
                    ["roi-desc", "Highest ROI"],
                    ["units-remaining", "Units Available"],
                    ["applications", "Most Applied"],
                  ] as const
                ).map(([v, label]) => (
                  <SelectItem
                    key={v}
                    value={v}
                    className="text-slate-200 focus:bg-slate-700"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {market.activeFilterCount > 0 && (
              <Button
                data-ocid="marketplace.filter.button"
                variant="outline"
                size="sm"
                onClick={market.resetFilters}
                style={{
                  borderColor: "oklch(0.30 0.03 260)",
                  color: "oklch(0.60 0.03 260)",
                }}
              >
                <X className="h-3 w-3 mr-1" />
                Clear ({market.activeFilterCount})
              </Button>
            )}

            <span
              className="text-xs ml-auto"
              style={{ color: "oklch(0.48 0.03 260)" }}
            >
              {market.totalCount} listing{market.totalCount !== 1 ? "s" : ""}{" "}
              found
            </span>
          </div>
        </div>
      </section>

      {/* Listings grid */}
      <section
        className="max-w-7xl mx-auto px-4 py-8"
        data-ocid="marketplace.list"
      >
        {market.isEmpty ? (
          <div
            className="flex flex-col items-center gap-4 py-20 text-center"
            data-ocid="marketplace.empty_state"
          >
            <ShoppingCart
              className="h-14 w-14"
              style={{ color: "oklch(0.35 0.03 260)" }}
            />
            <p
              className="text-lg font-medium"
              style={{ color: "oklch(0.60 0.03 260)" }}
            >
              No listings match your filters
            </p>
            <Button
              data-ocid="marketplace.filter.button"
              variant="outline"
              onClick={market.resetFilters}
              style={{
                borderColor: "oklch(0.30 0.03 260)",
                color: "oklch(0.60 0.03 260)",
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {market.listings.map((listing, i) => (
              <div key={listing.id} data-ocid={`marketplace.item.${i + 1}`}>
                <ListingCard
                  listing={listing}
                  onView={() => setSelectedId(listing.id)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedId && (
          <DetailSheet
            key={selectedId}
            listingId={selectedId}
            onClose={() => setSelectedId(null)}
            onApply={() => setApplyId(selectedId)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {applyId && (
          <ApplicationModal
            key={applyId}
            listingId={applyId}
            listingTitle={selectedListing?.title ?? ""}
            onClose={() => setApplyId(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

type Geography = keyof typeof GEOGRAPHY_CONFIG;
