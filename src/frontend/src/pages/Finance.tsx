import { CountUpNumber } from "@/components/CountUpNumber";
import {
  FFInlineBadge,
  FFSpotlightHeader,
  FFTierBadge,
} from "@/components/FFBrand";
import {
  SheetDetailHeader,
  SheetMetaRow,
  SheetSectionLabel,
} from "@/components/SheetDetailHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type {
  CampaignStatus,
  EnterpriseModel,
  FranchiseCategory,
  FranchiseTier,
  InvestmentRound,
  InvestmentStatus,
  InvestmentType,
  WalletRecord,
  WalletType,
} from "@/data/financeTypes";
import {
  CAMPAIGN_STATUS_CONFIG,
  ENTERPRISE_MODEL_CONFIG,
  FRANCHISE_TIER_CONFIG,
} from "@/data/financeTypes";
import {
  useCampaigns,
  useEnterprises,
  useFinanceStats,
  useFranchises,
  useInvestmentRounds,
  useWallets,
} from "@/hooks/useFinance";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Coins,
  DollarSign,
  Globe,
  Landmark,
  RotateCcw,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

const TIER_PILLS: Array<FranchiseTier | "all"> = [
  "all",
  "Seed",
  "Growth",
  "Scale",
  "Global",
];

const CATEGORY_PILLS: Array<FranchiseCategory | "all"> = [
  "all",
  "Governance",
  "Health",
  "Education",
  "Climate",
  "Technology",
  "Peace",
  "Economy",
  "Food",
  "Culture",
  "Assembly",
];

const CAMPAIGN_STATUS_PILLS: Array<CampaignStatus | "all"> = [
  "all",
  "Open",
  "Active",
  "Goal Met",
  "Closed",
];

const STATUS_CONFIG = {
  Active: { color: "oklch(0.65 0.18 142)", bg: "oklch(0.65 0.18 142 / 0.12)" },
  Pending: { color: "oklch(0.72 0.16 75)", bg: "oklch(0.72 0.16 75 / 0.12)" },
  Closed: { color: "oklch(0.52 0.04 260)", bg: "oklch(0.52 0.04 260 / 0.12)" },
};

const ENTERPRISE_MODEL_PILLS: Array<EnterpriseModel | "all"> = [
  "all",
  "Cooperative",
  "Hybrid",
  "DAO",
  "Foundation",
  "Social Enterprise",
];

function EnterpriseSection() {
  const [modelFilter, setModelFilter] = useState<EnterpriseModel | "all">(
    "all",
  );
  const {
    filteredEnterprises,
    selectedEnterprise,
    openEnterprise,
    closeEnterprise,
  } = useEnterprises(modelFilter);

  return (
    <>
      <section id="enterprises" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "oklch(0.72 0.16 75 / 0.12)",
                color: "oklch(0.72 0.16 75)",
                border: "1px solid oklch(0.72 0.16 75 / 0.25)",
              }}
            >
              Phase 10 · Finance
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.80 0.18 75), oklch(0.65 0.14 55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Enterprise Directory
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.62 0.02 260)" }}
            >
              Hybrid enterprise models driving global impact through
              FinFracFran™ frameworks
            </p>
          </motion.div>

          {/* Model Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {ENTERPRISE_MODEL_PILLS.map((pill) => {
              const isActive = modelFilter === pill;
              const config =
                pill !== "all" ? ENTERPRISE_MODEL_CONFIG[pill] : null;
              const count =
                pill === "all"
                  ? filteredEnterprises.length
                  : filteredEnterprises.filter((e) => e.model === pill).length;
              return (
                <button
                  type="button"
                  key={pill}
                  data-ocid={`enterprise.${pill === "all" ? "all" : pill.toLowerCase().replace(/ /g, "_")}.tab`}
                  onClick={() => setModelFilter(pill)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: "oklch(0.72 0.16 75)",
                          color: "oklch(0.08 0.03 260)",
                          boxShadow: "0 0 14px oklch(0.72 0.16 75 / 0.35)",
                        }
                      : {
                          background: "oklch(0.14 0.02 260)",
                          color: config ? config.color : "oklch(0.62 0.02 260)",
                          border: `1px solid ${config ? `${config.color} / 0.3)` : "oklch(0.28 0.03 260)"}`,
                        }
                  }
                >
                  {pill === "all" ? "All" : pill}
                  {!isActive && (
                    <span
                      className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                      style={{
                        background: "oklch(0.18 0.02 260)",
                        color: "oklch(0.52 0.02 260)",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Cards Grid */}
          {filteredEnterprises.length === 0 ? (
            <motion.div
              data-ocid="enterprise.empty_state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 py-24 rounded-2xl border"
              style={{
                background: "oklch(0.11 0.02 260)",
                borderColor: "oklch(0.22 0.03 260)",
              }}
            >
              <Landmark
                className="w-12 h-12"
                style={{ color: "oklch(0.38 0.03 260)" }}
              />
              <p
                className="text-lg font-medium"
                style={{ color: "oklch(0.62 0.02 260)" }}
              >
                No enterprises match this model
              </p>
              <Button
                data-ocid="enterprise.reset.button"
                variant="outline"
                onClick={() => setModelFilter("all")}
                className="gap-2"
                style={{
                  borderColor: "oklch(0.72 0.16 75 / 0.4)",
                  color: "oklch(0.72 0.16 75)",
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnterprises.map((enterprise, idx) => {
                const modelConfig = ENTERPRISE_MODEL_CONFIG[enterprise.model];
                const tierConfig =
                  FRANCHISE_TIER_CONFIG[enterprise.finfracfranTier];
                return (
                  <motion.div
                    key={enterprise.id}
                    data-ocid={`enterprise.item.${idx + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="rounded-2xl border p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300 group"
                    style={{
                      background: "oklch(0.11 0.02 260)",
                      borderColor: "oklch(0.22 0.03 260)",
                    }}
                    whileHover={{
                      borderColor: `${modelConfig.color} / 0.35)`,
                      y: -2,
                    }}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "oklch(0.16 0.02 260)",
                          color: "oklch(0.45 0.02 260)",
                        }}
                      >
                        {enterprise.id}
                      </span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                          style={{
                            color: modelConfig.color,
                            borderColor: `${modelConfig.color} / 0.35)`,
                            background: `${modelConfig.color} / 0.08)`,
                          }}
                        >
                          {enterprise.model}
                        </span>
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                          style={{
                            color: tierConfig.color,
                            borderColor: `${tierConfig.color} / 0.35)`,
                            background: `${tierConfig.color} / 0.08)`,
                          }}
                        >
                          {enterprise.finfracfranTier}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3
                      className="text-lg font-bold leading-tight"
                      style={{ color: "oklch(0.92 0.02 260)" }}
                    >
                      {enterprise.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.58 0.02 260)" }}
                    >
                      {enterprise.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex gap-4 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Globe
                          className="w-3.5 h-3.5"
                          style={{ color: "oklch(0.55 0.14 195)" }}
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.82 0.02 260)" }}
                        >
                          {enterprise.nations}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.45 0.02 260)" }}
                        >
                          nations
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign
                          className="w-3.5 h-3.5"
                          style={{ color: "oklch(0.72 0.16 75)" }}
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.82 0.02 260)" }}
                        >
                          {formatCurrency(enterprise.revenue)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users
                          className="w-3.5 h-3.5"
                          style={{ color: "oklch(0.65 0.18 142)" }}
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.82 0.02 260)" }}
                        >
                          {enterprise.members}
                        </span>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1.5">
                      {enterprise.certifications.slice(0, 2).map((cert) => (
                        <span
                          key={cert}
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{
                            background: "oklch(0.18 0.03 260)",
                            color: "oklch(0.58 0.02 260)",
                            border: "1px solid oklch(0.25 0.03 260)",
                          }}
                        >
                          {cert}
                        </span>
                      ))}
                      {enterprise.certifications.length > 2 && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{
                            background: "oklch(0.18 0.03 260)",
                            color: "oklch(0.45 0.02 260)",
                            border: "1px solid oklch(0.25 0.03 260)",
                          }}
                        >
                          +{enterprise.certifications.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      data-ocid={`enterprise.view_profile.button.${idx + 1}`}
                      size="sm"
                      onClick={() => openEnterprise(enterprise)}
                      className="mt-auto gap-2 font-semibold"
                      style={{
                        background: "oklch(0.72 0.16 75 / 0.12)",
                        color: "oklch(0.72 0.16 75)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.3)",
                      }}
                    >
                      View Profile
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Detail Sheet */}
      <Sheet
        open={!!selectedEnterprise}
        onOpenChange={(open) => !open && closeEnterprise()}
      >
        <SheetContent
          data-ocid="enterprise.sheet"
          side="right"
          className="w-full sm:max-w-xl p-0 border-l"
          style={{
            background: "oklch(0.09 0.02 260)",
            borderColor: "oklch(0.22 0.03 260)",
          }}
        >
          {selectedEnterprise &&
            (() => {
              const e = selectedEnterprise;
              const modelConfig = ENTERPRISE_MODEL_CONFIG[e.model];
              const tierConfig = FRANCHISE_TIER_CONFIG[e.finfracfranTier];
              return (
                <>
                  <SheetHeader
                    className="px-6 pt-6 pb-4 border-b"
                    style={{ borderColor: "oklch(0.18 0.02 260)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <SheetTitle
                          className="text-xl font-bold leading-tight"
                          style={{ color: "oklch(0.92 0.02 260)" }}
                        >
                          {e.name}
                        </SheetTitle>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                            style={{
                              color: modelConfig.color,
                              borderColor: `${modelConfig.color} / 0.35)`,
                              background: `${modelConfig.color} / 0.1)`,
                            }}
                          >
                            {e.model}
                          </span>
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                            style={{
                              color: tierConfig.color,
                              borderColor: `${tierConfig.color} / 0.35)`,
                              background: `${tierConfig.color} / 0.1)`,
                            }}
                          >
                            {e.finfracfranTier}
                          </span>
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.65 0.18 142 / 0.12)",
                              color: "oklch(0.65 0.18 142)",
                              border: "1px solid oklch(0.65 0.18 142 / 0.3)",
                            }}
                          >
                            Active
                          </span>
                        </div>
                      </div>
                      <Button
                        data-ocid="enterprise.sheet.close_button"
                        variant="ghost"
                        size="sm"
                        onClick={closeEnterprise}
                        className="shrink-0 mt-0.5"
                        style={{ color: "oklch(0.45 0.02 260)" }}
                      >
                        ✕
                      </Button>
                    </div>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-160px)]">
                    <div className="px-6 py-6 flex flex-col gap-6">
                      {/* Stats Row */}
                      <div
                        className="grid grid-cols-3 gap-4 p-4 rounded-xl"
                        style={{
                          background: "oklch(0.13 0.02 260)",
                          border: "1px solid oklch(0.22 0.03 260)",
                        }}
                      >
                        <div className="text-center">
                          <Globe
                            className="w-4 h-4 mx-auto mb-1"
                            style={{ color: "oklch(0.55 0.14 195)" }}
                          />
                          <div
                            className="text-xl font-bold"
                            style={{ color: "oklch(0.88 0.02 260)" }}
                          >
                            {e.nations}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "oklch(0.45 0.02 260)" }}
                          >
                            Nations
                          </div>
                        </div>
                        <div className="text-center">
                          <DollarSign
                            className="w-4 h-4 mx-auto mb-1"
                            style={{ color: "oklch(0.72 0.16 75)" }}
                          />
                          <div
                            className="text-xl font-bold"
                            style={{ color: "oklch(0.88 0.02 260)" }}
                          >
                            {formatCurrency(e.revenue)}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "oklch(0.45 0.02 260)" }}
                          >
                            Revenue
                          </div>
                        </div>
                        <div className="text-center">
                          <Users
                            className="w-4 h-4 mx-auto mb-1"
                            style={{ color: "oklch(0.65 0.18 142)" }}
                          />
                          <div
                            className="text-xl font-bold"
                            style={{ color: "oklch(0.88 0.02 260)" }}
                          >
                            {e.members}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "oklch(0.45 0.02 260)" }}
                          >
                            Members
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4
                          className="text-sm font-semibold uppercase tracking-widest mb-2"
                          style={{ color: "oklch(0.45 0.02 260)" }}
                        >
                          About
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "oklch(0.68 0.02 260)" }}
                        >
                          {e.description}
                        </p>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4
                          className="text-sm font-semibold uppercase tracking-widest mb-3"
                          style={{ color: "oklch(0.45 0.02 260)" }}
                        >
                          Certifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {e.certifications.map((cert) => (
                            <span
                              key={cert}
                              className="text-xs px-3 py-1 rounded-full"
                              style={{
                                background: "oklch(0.18 0.03 260)",
                                color: "oklch(0.68 0.02 260)",
                                border: "1px solid oklch(0.28 0.03 260)",
                              }}
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Apply CTA */}
                      <div className="flex flex-col gap-3 pt-2">
                        <Button
                          data-ocid="enterprise.apply_partnership.button"
                          className="w-full font-semibold gap-2"
                          style={{
                            background: "oklch(0.72 0.16 75)",
                            color: "oklch(0.08 0.03 260)",
                          }}
                          onClick={() => {
                            toast.success(
                              "Partnership inquiry submitted. Our team will contact you within 48 hours.",
                            );
                            closeEnterprise();
                          }}
                        >
                          <Zap className="w-4 h-4" />
                          Apply for Partnership
                        </Button>
                        <Button
                          data-ocid="enterprise.sheet.cancel_button"
                          variant="outline"
                          className="w-full"
                          style={{
                            borderColor: "oklch(0.35 0.03 260)",
                            color: "oklch(0.62 0.02 260)",
                          }}
                          onClick={closeEnterprise}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </>
              );
            })()}
        </SheetContent>
      </Sheet>
    </>
  );
}

// ===== INVESTMENT ROUNDS SECTION =====

const INVESTMENT_TYPE_COLORS: Record<
  string,
  { text: string; bg: string; border: string }
> = {
  Grant: {
    text: "oklch(0.65 0.16 180)",
    bg: "oklch(0.65 0.16 180 / 0.12)",
    border: "oklch(0.65 0.16 180 / 0.3)",
  },
  Equity: {
    text: "oklch(0.62 0.18 255)",
    bg: "oklch(0.62 0.18 255 / 0.12)",
    border: "oklch(0.62 0.18 255 / 0.3)",
  },
  "Revenue Share": {
    text: "oklch(0.78 0.18 75)",
    bg: "oklch(0.78 0.18 75 / 0.12)",
    border: "oklch(0.78 0.18 75 / 0.3)",
  },
  "Impact Bond": {
    text: "oklch(0.68 0.18 142)",
    bg: "oklch(0.68 0.18 142 / 0.12)",
    border: "oklch(0.68 0.18 142 / 0.3)",
  },
  "Community Bond": {
    text: "oklch(0.72 0.16 75)",
    bg: "oklch(0.72 0.16 75 / 0.12)",
    border: "oklch(0.72 0.16 75 / 0.3)",
  },
  Convertible: {
    text: "oklch(0.70 0.18 310)",
    bg: "oklch(0.70 0.18 310 / 0.12)",
    border: "oklch(0.70 0.18 310 / 0.3)",
  },
};

const INVESTMENT_STATUS_COLORS: Record<
  InvestmentStatus,
  { text: string; bg: string }
> = {
  Open: { text: "oklch(0.68 0.18 142)", bg: "oklch(0.68 0.18 142 / 0.12)" },
  Closed: { text: "oklch(0.55 0.04 260)", bg: "oklch(0.55 0.04 260 / 0.1)" },
  "Coming Soon": {
    text: "oklch(0.72 0.16 75)",
    bg: "oklch(0.72 0.16 75 / 0.12)",
  },
};

const INVESTMENT_TYPES: Array<InvestmentType | "all"> = [
  "all",
  "Grant",
  "Equity",
  "Revenue Share",
  "Impact Bond",
  "Community Bond",
  "Convertible",
];

const INVESTMENT_STATUS_PILLS: Array<InvestmentStatus | "all"> = [
  "all",
  "Open",
  "Closed",
  "Coming Soon",
];

function InvestmentRoundsSection() {
  const [typeFilter, setTypeFilter] = useState<InvestmentType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<InvestmentStatus | "all">(
    "all",
  );
  const { filteredRounds, selectedRound, openRound, closeRound } =
    useInvestmentRounds(typeFilter, statusFilter);

  const allRounds = useInvestmentRounds().filteredRounds;
  const totalTarget = allRounds.reduce((s, r) => s + r.targetAmount, 0);
  const totalRaised = allRounds.reduce((s, r) => s + r.raisedAmount, 0);
  const openCount = allRounds.filter((r) => r.status === "Open").length;

  return (
    <section
      id="investment"
      data-ocid="finance.investment.section"
      style={{ background: "oklch(0.10 0.02 260)" }}
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full border"
              style={{
                color: "oklch(0.78 0.18 75)",
                borderColor: "oklch(0.78 0.18 75 / 0.4)",
                background: "oklch(0.78 0.18 75 / 0.08)",
              }}
            >
              PHASE 10 · INVESTMENT
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.90 0.18 75) 0%, oklch(0.82 0.22 55) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Investment Rounds
          </h2>
          <p
            style={{ color: "oklch(0.70 0.04 260)" }}
            className="text-lg max-w-2xl"
          >
            Capital mobilization through transparent, FinFracFran™-aligned
            investment instruments — from impact bonds to equity rounds —
            funding global solutions at scale.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              {
                label: "Total Rounds",
                value: String(allRounds.length),
                icon: "📊",
              },
              { label: "Open Now", value: String(openCount), icon: "🟢" },
              {
                label: "Total Target",
                value: formatCurrency(totalTarget),
                icon: "🎯",
              },
              {
                label: "Total Raised",
                value: formatCurrency(totalRaised),
                icon: "💰",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "oklch(0.78 0.18 75 / 0.08)",
                  border: "1px solid oklch(0.78 0.18 75 / 0.25)",
                  color: "oklch(0.88 0.10 75)",
                }}
              >
                <span>{stat.icon}</span>
                <span style={{ color: "oklch(0.70 0.04 260)" }}>
                  {stat.label}:
                </span>
                <span
                  style={{ color: "oklch(0.90 0.18 75)" }}
                  className="font-semibold"
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-3"
        >
          {/* Type tabs */}
          <div className="flex flex-wrap gap-2">
            {INVESTMENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                data-ocid="finance.investment.type_filter.tab"
                onClick={() => setTypeFilter(t)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={
                  typeFilter === t
                    ? {
                        background: "oklch(0.78 0.18 75)",
                        color: "oklch(0.12 0.02 260)",
                      }
                    : {
                        background: "oklch(0.15 0.02 260)",
                        border: "1px solid oklch(0.25 0.03 260)",
                        color: "oklch(0.65 0.04 260)",
                      }
                }
              >
                {t === "all" ? "All Types" : t}
              </button>
            ))}
          </div>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {INVESTMENT_STATUS_PILLS.map((s) => (
              <button
                key={s}
                type="button"
                data-ocid="finance.investment.status_filter.tab"
                onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  statusFilter === s
                    ? {
                        background: "oklch(0.62 0.18 255)",
                        color: "#fff",
                      }
                    : {
                        background: "oklch(0.15 0.02 260)",
                        border: "1px solid oklch(0.25 0.03 260)",
                        color: "oklch(0.60 0.04 260)",
                      }
                }
              >
                {s === "all" ? "All Statuses" : s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        {filteredRounds.length === 0 ? (
          <div
            data-ocid="finance.investment.empty_state"
            className="text-center py-16 rounded-2xl"
            style={{
              background: "oklch(0.13 0.02 260)",
              border: "1px solid oklch(0.20 0.03 260)",
            }}
          >
            <div className="text-4xl mb-3">🔍</div>
            <p
              style={{ color: "oklch(0.65 0.04 260)" }}
              className="text-lg mb-4"
            >
              No rounds match these filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setTypeFilter("all");
                setStatusFilter("all");
              }}
              className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRounds.map((round, i) => {
              const typeColor =
                INVESTMENT_TYPE_COLORS[round.type] ??
                INVESTMENT_TYPE_COLORS.Grant;
              const statusColor = INVESTMENT_STATUS_COLORS[round.status];
              const progress =
                round.targetAmount > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (round.raisedAmount / round.targetAmount) * 100,
                      ),
                    )
                  : 0;

              return (
                <motion.div
                  key={round.id}
                  data-ocid={`finance.investment.round.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "oklch(0.13 0.02 260)",
                    border: `1px solid ${typeColor.border}`,
                    boxShadow: `0 0 0 0 ${typeColor.bg}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 8px 32px ${typeColor.bg}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Card header row */}
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        background: "oklch(0.18 0.02 260)",
                        color: "oklch(0.55 0.04 260)",
                      }}
                    >
                      {round.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: typeColor.text,
                          background: typeColor.bg,
                          border: `1px solid ${typeColor.border}`,
                        }}
                      >
                        {round.type}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: statusColor.text,
                          background: statusColor.bg,
                        }}
                      >
                        {round.status}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold leading-snug"
                    style={{ color: "oklch(0.92 0.06 260)" }}
                  >
                    {round.title}
                  </h3>

                  {/* Category + council */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                        color: "oklch(0.60 0.06 260)",
                      }}
                    >
                      📂 {round.category}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.18 0.03 260)",
                        color: "oklch(0.60 0.06 260)",
                      }}
                    >
                      🏛 {round.council}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div
                      className="flex justify-between text-xs"
                      style={{ color: "oklch(0.60 0.04 260)" }}
                    >
                      <span>{formatCurrency(round.raisedAmount)} raised</span>
                      <span>
                        {formatCurrency(round.targetAmount)} target · {progress}
                        %
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "oklch(0.20 0.02 260)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
                        style={{
                          background:
                            round.status === "Closed"
                              ? "oklch(0.55 0.04 260)"
                              : "linear-gradient(90deg, oklch(0.72 0.18 75), oklch(0.82 0.22 55))",
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {round.minTicket > 0 && (
                        <span style={{ color: "oklch(0.65 0.04 260)" }}>
                          Min:{" "}
                          <span
                            style={{ color: "oklch(0.80 0.10 75)" }}
                            className="font-semibold"
                          >
                            {formatCurrency(round.minTicket)}
                          </span>
                        </span>
                      )}
                      <span style={{ color: "oklch(0.65 0.04 260)" }}>
                        Returns:{" "}
                        <span
                          style={{ color: "oklch(0.75 0.12 142)" }}
                          className="font-medium"
                        >
                          {round.returns}
                        </span>
                      </span>
                    </div>
                    {round.finfracfranRequired && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: "oklch(0.78 0.18 75)",
                          background: "oklch(0.78 0.18 75 / 0.12)",
                          border: "1px solid oklch(0.78 0.18 75 / 0.35)",
                        }}
                      >
                        ✦ FinFracFran™
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => openRound(round)}
                    className="w-full mt-1 font-semibold"
                    style={{
                      background: typeColor.bg,
                      border: `1px solid ${typeColor.border}`,
                      color: typeColor.text,
                    }}
                  >
                    View Details <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedRound} onOpenChange={(o) => !o && closeRound()}>
        <SheetContent
          data-ocid="finance.investment.detail.sheet"
          side="right"
          className="w-full sm:max-w-xl p-0"
          style={{ background: "oklch(0.11 0.02 260)", border: "none" }}
        >
          {selectedRound &&
            (() => {
              const typeColor =
                INVESTMENT_TYPE_COLORS[selectedRound.type] ??
                INVESTMENT_TYPE_COLORS.Grant;
              const statusColor =
                INVESTMENT_STATUS_COLORS[selectedRound.status];
              const progress =
                selectedRound.targetAmount > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (selectedRound.raisedAmount /
                          selectedRound.targetAmount) *
                          100,
                      ),
                    )
                  : 0;

              return (
                <>
                  <SheetHeader
                    className="p-6 border-b"
                    style={{ borderColor: "oklch(0.20 0.03 260)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{
                          background: "oklch(0.18 0.02 260)",
                          color: "oklch(0.55 0.04 260)",
                        }}
                      >
                        {selectedRound.id}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: typeColor.text,
                          background: typeColor.bg,
                          border: `1px solid ${typeColor.border}`,
                        }}
                      >
                        {selectedRound.type}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          color: statusColor.text,
                          background: statusColor.bg,
                        }}
                      >
                        {selectedRound.status}
                      </span>
                    </div>
                    <SheetTitle
                      className="text-2xl font-bold leading-tight"
                      style={{ color: "oklch(0.92 0.06 260)" }}
                    >
                      {selectedRound.title}
                    </SheetTitle>
                  </SheetHeader>

                  <ScrollArea className="h-[calc(100vh-160px)]">
                    <div className="p-6 space-y-6">
                      {/* Description */}
                      <p
                        style={{ color: "oklch(0.68 0.04 260)" }}
                        className="leading-relaxed"
                      >
                        {selectedRound.description}
                      </p>

                      {/* Financial details */}
                      <div
                        className="rounded-xl p-5 space-y-4"
                        style={{
                          background: "oklch(0.14 0.02 260)",
                          border: "1px solid oklch(0.20 0.03 260)",
                        }}
                      >
                        <h4
                          className="text-sm font-semibold uppercase tracking-widest"
                          style={{ color: "oklch(0.60 0.04 260)" }}
                        >
                          Financial Details
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div
                              className="text-xs mb-1"
                              style={{ color: "oklch(0.55 0.04 260)" }}
                            >
                              Target Amount
                            </div>
                            <div
                              className="text-xl font-bold"
                              style={{ color: "oklch(0.90 0.18 75)" }}
                            >
                              {formatCurrency(selectedRound.targetAmount)}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-xs mb-1"
                              style={{ color: "oklch(0.55 0.04 260)" }}
                            >
                              Raised So Far
                            </div>
                            <div
                              className="text-xl font-bold"
                              style={{ color: "oklch(0.72 0.18 142)" }}
                            >
                              {formatCurrency(selectedRound.raisedAmount)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div
                            className="flex justify-between text-xs mb-1.5"
                            style={{ color: "oklch(0.60 0.04 260)" }}
                          >
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div
                            className="h-3 rounded-full overflow-hidden"
                            style={{ background: "oklch(0.20 0.02 260)" }}
                          >
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${progress}%`,
                                background:
                                  selectedRound.status === "Closed"
                                    ? "oklch(0.55 0.04 260)"
                                    : "linear-gradient(90deg, oklch(0.72 0.18 75), oklch(0.82 0.22 55))",
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <div
                              className="text-xs mb-1"
                              style={{ color: "oklch(0.55 0.04 260)" }}
                            >
                              Min Ticket Size
                            </div>
                            <div
                              className="font-semibold"
                              style={{ color: "oklch(0.80 0.08 260)" }}
                            >
                              {selectedRound.minTicket > 0
                                ? formatCurrency(selectedRound.minTicket)
                                : "Open (Grant)"}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-xs mb-1"
                              style={{ color: "oklch(0.55 0.04 260)" }}
                            >
                              Returns
                            </div>
                            <div
                              className="font-semibold"
                              style={{ color: "oklch(0.75 0.12 142)" }}
                            >
                              {selectedRound.returns}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Council + category */}
                      <div
                        className="rounded-xl p-4 flex gap-4"
                        style={{
                          background: "oklch(0.14 0.02 260)",
                          border: "1px solid oklch(0.20 0.03 260)",
                        }}
                      >
                        <div className="flex-1">
                          <div
                            className="text-xs mb-1"
                            style={{ color: "oklch(0.55 0.04 260)" }}
                          >
                            Council
                          </div>
                          <div
                            className="font-medium"
                            style={{ color: "oklch(0.80 0.08 260)" }}
                          >
                            {selectedRound.council}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div
                            className="text-xs mb-1"
                            style={{ color: "oklch(0.55 0.04 260)" }}
                          >
                            Category
                          </div>
                          <div
                            className="font-medium"
                            style={{ color: "oklch(0.80 0.08 260)" }}
                          >
                            {selectedRound.category}
                          </div>
                        </div>
                      </div>

                      {/* FinFracFran callout */}
                      {selectedRound.finfracfranRequired && (
                        <div
                          className="rounded-xl p-4"
                          style={{
                            background: "oklch(0.78 0.18 75 / 0.08)",
                            border: "1px solid oklch(0.78 0.18 75 / 0.35)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              style={{ color: "oklch(0.78 0.18 75)" }}
                              className="font-bold text-sm"
                            >
                              ✦ FinFracFran™ Required
                            </span>
                          </div>
                          <p
                            className="text-sm"
                            style={{ color: "oklch(0.68 0.08 75)" }}
                          >
                            This investment round requires active FinFracFran™
                            membership or franchise enrollment. Participation
                            unlocks access to the global franchise network,
                            royalty streams, and co-investment opportunities.
                          </p>
                        </div>
                      )}

                      {/* CTA */}
                      <Button
                        data-ocid="finance.investment.express_interest.button"
                        className="w-full py-3 font-bold text-base"
                        disabled={selectedRound.status === "Closed"}
                        onClick={() => {
                          toast.success(
                            `Interest registered for ${selectedRound.title}`,
                            {
                              description:
                                "Our team will reach out with next steps within 48 hours.",
                            },
                          );
                        }}
                        style={{
                          background:
                            selectedRound.status === "Closed"
                              ? "oklch(0.20 0.02 260)"
                              : "linear-gradient(135deg, oklch(0.72 0.18 75), oklch(0.82 0.22 55))",
                          color:
                            selectedRound.status === "Closed"
                              ? "oklch(0.45 0.04 260)"
                              : "oklch(0.12 0.02 260)",
                          border: "none",
                        }}
                      >
                        {selectedRound.status === "Closed"
                          ? "Round Closed"
                          : "Express Interest →"}
                      </Button>
                    </div>
                  </ScrollArea>
                </>
              );
            })()}
        </SheetContent>
      </Sheet>
    </section>
  );
}

export function FinancePage() {
  const stats = useFinanceStats();

  const [franchiseTierFilter, setFranchiseTierFilter] = useState<
    FranchiseTier | "all"
  >("all");
  const [franchiseCategoryFilter, setFranchiseCategoryFilter] = useState<
    FranchiseCategory | "all"
  >("all");

  const {
    filteredFranchises,
    selectedFranchise,
    openFranchise,
    closeFranchise,
  } = useFranchises(franchiseTierFilter, franchiseCategoryFilter);

  const [campaignStatusFilter, setCampaignStatusFilter] = useState<
    CampaignStatus | "all"
  >("all");

  const { filteredCampaigns, selectedCampaign, openCampaign, closeCampaign } =
    useCampaigns(campaignStatusFilter);

  const statCards = [
    {
      label: "Franchise Opportunities",
      value: stats.totalFranchises.toString(),
      icon: Landmark,
      accent: "oklch(0.65 0.18 142)",
      bg: "oklch(0.65 0.18 142 / 0.08)",
      border: "oklch(0.65 0.18 142 / 0.25)",
      iconBg: "oklch(0.65 0.18 142 / 0.15)",
    },
    {
      label: "Active Campaigns",
      value: stats.activeCampaigns.toString(),
      icon: Zap,
      accent: "oklch(0.6 0.14 195)",
      bg: "oklch(0.6 0.14 195 / 0.08)",
      border: "oklch(0.6 0.14 195 / 0.25)",
      iconBg: "oklch(0.6 0.14 195 / 0.15)",
    },
    {
      label: "Capital Raised",
      value: formatCurrency(stats.totalRaised),
      icon: DollarSign,
      accent: "oklch(0.72 0.16 75)",
      bg: "oklch(0.72 0.16 75 / 0.08)",
      border: "oklch(0.72 0.16 75 / 0.25)",
      iconBg: "oklch(0.72 0.16 75 / 0.15)",
    },
    {
      label: "Nations Reached",
      value: stats.nationsReached.toString(),
      icon: Globe,
      accent: "oklch(0.65 0.18 270)",
      bg: "oklch(0.65 0.18 270 / 0.08)",
      border: "oklch(0.65 0.18 270 / 0.25)",
      iconBg: "oklch(0.65 0.18 270 / 0.15)",
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <section
        data-ocid="finance.hero.section"
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, oklch(0.28 0.1 142 / 0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, oklch(0.30 0.12 75 / 0.30) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 50% 0%, oklch(0.14 0.05 260 / 0.8) 0%, oklch(0.08 0.03 260) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.9 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "oklch(0.65 0.18 142)" }}
        />
        <div
          className="absolute bottom-1/4 right-16 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "oklch(0.72 0.16 75)" }}
        />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <Badge
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 border"
              style={{
                background: "oklch(0.65 0.18 142 / 0.15)",
                borderColor: "oklch(0.65 0.18 142 / 0.4)",
                color: "oklch(0.75 0.18 142)",
              }}
            >
              Phase 10
            </Badge>
            <span
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "oklch(0.65 0.18 142)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(0.65 0.18 142)" }}
              />
              FinFracFran™ Economy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-hero-xl font-display mb-6"
          >
            <span style={{ color: "oklch(var(--pearl))" }}>Invest. </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.65 0.18 142) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Franchise.
            </span>
            <br />
            <span style={{ color: "oklch(var(--pearl))" }}>Grow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: "oklch(0.75 0.02 260)" }}
          >
            FinFracFran™ economy — where capital meets community, and local
            enterprise scales globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              data-ocid="finance.explore_franchises.button"
              size="lg"
              className="font-semibold gap-2 hover:scale-105 transition-transform"
              style={{
                background: "oklch(0.65 0.18 142)",
                color: "oklch(0.08 0.03 260)",
              }}
              onClick={() =>
                document
                  .getElementById("franchises")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Landmark className="w-4 h-4" />
              Explore Franchises
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              data-ocid="finance.view_campaigns.button"
              size="lg"
              variant="outline"
              className="font-semibold gap-2"
              style={{
                borderColor: "oklch(0.72 0.16 75 / 0.5)",
                color: "oklch(0.80 0.16 75)",
                background: "oklch(0.72 0.16 75 / 0.08)",
              }}
              onClick={() =>
                document
                  .getElementById("campaigns")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Coins className="w-4 h-4" />
              View Campaigns
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        data-ocid="finance.stats.section"
        className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            >
              <div
                className="rounded-xl p-5 border h-full"
                style={{
                  background: card.bg,
                  borderColor: card.border,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: card.iconBg }}
                  >
                    <card.icon
                      className="w-5 h-5"
                      style={{ color: card.accent }}
                    />
                  </div>
                  <TrendingUp
                    className="w-4 h-4"
                    style={{ color: "oklch(0.65 0.18 142)" }}
                  />
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: card.accent,
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}
                >
                  <CountUpNumber value={card.value} />
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.65 0.02 260)" }}
                >
                  {card.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Franchise Directory */}
      <div id="franchises" />
      <section
        data-ocid="finance.franchise.section"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Badge
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 border"
              style={{
                background: "oklch(0.65 0.18 142 / 0.12)",
                borderColor: "oklch(0.65 0.18 142 / 0.35)",
                color: "oklch(0.72 0.16 142)",
              }}
            >
              Phase 10
            </Badge>
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.55 0.02 260)" }}
            >
              FinFracFran™ Licensed Opportunities
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              background:
                "linear-gradient(135deg, oklch(0.90 0.05 142) 0%, oklch(0.65 0.18 142) 60%, oklch(0.55 0.14 195) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Franchise Opportunities
          </h2>
          <p
            className="text-sm max-w-2xl"
            style={{ color: "oklch(0.62 0.02 260)" }}
          >
            FinFracFran™ licensed franchises across all tiers — find your entry
            point and scale globally.
          </p>
        </motion.div>

        {/* Tier Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {TIER_PILLS.map((tier, i) => {
            const isActive = franchiseTierFilter === tier;
            const tierCfg = tier !== "all" ? FRANCHISE_TIER_CONFIG[tier] : null;
            return (
              <button
                type="button"
                key={tier}
                data-ocid={`finance.franchise_tier.tab.${i + 1}`}
                onClick={() => setFranchiseTierFilter(tier)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{
                  background: isActive
                    ? tier === "all"
                      ? "oklch(0.65 0.18 142)"
                      : (tierCfg?.color ?? "oklch(0.65 0.18 142)")
                    : "oklch(var(--cosmos-surface) / 0.5)",
                  borderColor: isActive
                    ? tier === "all"
                      ? "oklch(0.65 0.18 142)"
                      : (tierCfg?.color ?? "oklch(0.65 0.18 142)")
                    : "oklch(0.35 0.03 260)",
                  color: isActive
                    ? "oklch(0.08 0.03 260)"
                    : "oklch(0.65 0.02 260)",
                }}
              >
                {tier === "all" ? "All Tiers" : tier}
              </button>
            );
          })}
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-1.5 mb-8"
        >
          {CATEGORY_PILLS.map((cat, i) => {
            const isActive = franchiseCategoryFilter === cat;
            return (
              <button
                type="button"
                key={cat}
                data-ocid={`finance.franchise_category.tab.${i + 1}`}
                onClick={() => setFranchiseCategoryFilter(cat)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200"
                style={{
                  background: isActive
                    ? "oklch(0.65 0.18 142 / 0.18)"
                    : "oklch(var(--cosmos-surface) / 0.3)",
                  borderColor: isActive
                    ? "oklch(0.65 0.18 142 / 0.6)"
                    : "oklch(0.30 0.02 260)",
                  color: isActive
                    ? "oklch(0.78 0.15 142)"
                    : "oklch(0.55 0.02 260)",
                }}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            );
          })}
        </motion.div>

        {/* Cards Grid or Empty State */}
        {filteredFranchises.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="finance.franchise.empty_state"
            className="rounded-2xl border p-12 text-center"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.4)",
              borderColor: "oklch(0.65 0.18 142 / 0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "oklch(0.65 0.18 142 / 0.1)" }}
            >
              <Landmark
                className="w-6 h-6"
                style={{ color: "oklch(0.65 0.18 142)" }}
              />
            </div>
            <p
              className="text-base font-semibold mb-2"
              style={{ color: "oklch(var(--pearl))" }}
            >
              No franchises match your filters
            </p>
            <p
              className="text-sm mb-5"
              style={{ color: "oklch(0.55 0.02 260)" }}
            >
              Try adjusting the tier or category filters to see more
              opportunities.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(0.65 0.18 142 / 0.4)",
                color: "oklch(0.72 0.14 142)",
              }}
              onClick={() => {
                setFranchiseTierFilter("all");
                setFranchiseCategoryFilter("all");
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFranchises.map((franchise, i) => {
              const tierCfg = FRANCHISE_TIER_CONFIG[franchise.tier];
              const statusCfg = STATUS_CONFIG[franchise.status];
              return (
                <motion.div
                  key={franchise.id}
                  data-ocid={`finance.franchise.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border flex flex-col overflow-hidden group"
                  style={{
                    background: "oklch(var(--cosmos-surface) / 0.6)",
                    borderColor: "oklch(0.65 0.18 142 / 0.2)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="px-5 pt-5 pb-4 border-b"
                    style={{ borderColor: "oklch(0.65 0.18 142 / 0.1)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-mono"
                        style={{ color: "oklch(0.45 0.02 260)" }}
                      >
                        {franchise.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {franchise.finfracfranBadge && (
                          <span
                            className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border"
                            style={{
                              background: "oklch(0.80 0.18 85 / 0.12)",
                              borderColor: "oklch(0.80 0.18 85 / 0.35)",
                              color: "oklch(0.82 0.16 85)",
                            }}
                          >
                            <Award className="w-3 h-3" />
                            FF™
                          </span>
                        )}
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                          style={{
                            background: `${tierCfg.color.replace(")", ` / ${tierCfg.bgOpacity})`)})`,
                            borderColor: `${tierCfg.color.replace(")", " / 0.35)")}`,
                            color: tierCfg.color,
                          }}
                        >
                          {franchise.tier}
                        </span>
                      </div>
                    </div>
                    <h3
                      className="font-bold text-base mb-1 leading-snug"
                      style={{
                        color: "oklch(var(--pearl))",
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                      }}
                    >
                      {franchise.name}
                    </h3>
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded border mb-2"
                      style={{
                        background: "oklch(0.65 0.18 142 / 0.08)",
                        borderColor: "oklch(0.65 0.18 142 / 0.2)",
                        color: "oklch(0.68 0.14 142)",
                      }}
                    >
                      {franchise.category}
                    </span>
                    <p
                      className="text-sm leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.02 260)" }}
                    >
                      {franchise.description}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 py-4 flex-1 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Globe
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.65 0.18 270)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.02 260)" }}
                        >
                          {franchise.nations} nations
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.65 0.18 142)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.02 260)" }}
                        >
                          {franchise.revenueShare}% rev share
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.72 0.16 75)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.02 260)" }}
                        >
                          Min {formatCurrency(franchise.minInvestment)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.55 0.14 195)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.02 260)" }}
                        >
                          {franchise.adoptionCount} adopted
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full border font-medium"
                          style={{
                            background: statusCfg.bg,
                            borderColor: `${statusCfg.color.replace(")", " / 0.35)")}`,
                            color: statusCfg.color,
                          }}
                        >
                          {franchise.status}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.45 0.02 260)" }}
                        >
                          {franchise.licenseType}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="text-xs h-7 px-3 font-semibold"
                        style={{
                          background: "oklch(0.65 0.18 142 / 0.15)",
                          color: "oklch(0.78 0.15 142)",
                          border: "1px solid oklch(0.65 0.18 142 / 0.3)",
                        }}
                        onClick={() => openFranchise(franchise)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Franchise Detail Sheet */}
      <Sheet
        open={!!selectedFranchise}
        onOpenChange={(open) => !open && closeFranchise()}
      >
        <SheetContent
          data-ocid="finance.franchise_detail.sheet"
          side="right"
          className="w-full sm:max-w-lg p-0 border-l"
          style={{
            background: "oklch(0.09 0.04 260)",
            borderColor: "oklch(0.65 0.18 142 / 0.25)",
          }}
        >
          {selectedFranchise && (
            <>
              {/* SheetDetailHeader applied via component */}
              <SheetDetailHeader
                badges={[
                  {
                    label: selectedFranchise.id,
                    color: "oklch(0.50 0.04 260)",
                    bg: "oklch(0.16 0.02 260)",
                    border: "oklch(0.25 0.03 260)",
                  },
                  {
                    label: selectedFranchise.tier,
                    color: FRANCHISE_TIER_CONFIG[selectedFranchise.tier].color,
                    bg: `${FRANCHISE_TIER_CONFIG[selectedFranchise.tier].color.replace(")", " / 0.12)")}`,
                    border: `${FRANCHISE_TIER_CONFIG[selectedFranchise.tier].color.replace(")", " / 0.30)")}`,
                  },
                  {
                    label: selectedFranchise.status,
                    color: STATUS_CONFIG[selectedFranchise.status].color,
                    bg: `${STATUS_CONFIG[selectedFranchise.status].color.replace(")", " / 0.12)")}`,
                    border: `${STATUS_CONFIG[selectedFranchise.status].color.replace(")", " / 0.25)")}`,
                  },
                ]}
                title={selectedFranchise.name}
                subtitle={`${selectedFranchise.description?.slice(0, 100)}...`}
                onClose={closeFranchise}
                closeOcid="finance.franchise_detail.close_button"
                accentColor="oklch(0.65 0.18 142)"
              />
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="px-6 py-5 space-y-6">
                  {/* Description */}
                  <div>
                    <h4
                      className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: "oklch(0.50 0.02 260)" }}
                    >
                      Overview
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.72 0.02 260)" }}
                    >
                      {selectedFranchise.description}
                    </p>
                  </div>

                  {/* Stats grid */}
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      background: "oklch(var(--cosmos-surface) / 0.5)",
                      borderColor: "oklch(0.65 0.18 142 / 0.15)",
                    }}
                  >
                    <h4
                      className="text-xs font-semibold uppercase tracking-wider mb-4"
                      style={{ color: "oklch(0.50 0.02 260)" }}
                    >
                      Key Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "Nations",
                          value: selectedFranchise.nations.toString(),
                          icon: Globe,
                          color: "oklch(0.65 0.18 270)",
                        },
                        {
                          label: "Revenue Share",
                          value: `${selectedFranchise.revenueShare}%`,
                          icon: TrendingUp,
                          color: "oklch(0.65 0.18 142)",
                        },
                        {
                          label: "Min Investment",
                          value: formatCurrency(
                            selectedFranchise.minInvestment,
                          ),
                          icon: DollarSign,
                          color: "oklch(0.72 0.16 75)",
                        },
                        {
                          label: "Adoptions",
                          value: selectedFranchise.adoptionCount.toString(),
                          icon: Users,
                          color: "oklch(0.55 0.14 195)",
                        },
                      ].map((metric) => (
                        <div
                          key={metric.label}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="p-1.5 rounded-lg shrink-0"
                            style={{
                              background: `${metric.color.replace(")", " / 0.12)")}`,
                            }}
                          >
                            <metric.icon
                              className="w-3.5 h-3.5"
                              style={{ color: metric.color }}
                            />
                          </div>
                          <div>
                            <div
                              className="text-xs"
                              style={{ color: "oklch(0.48 0.02 260)" }}
                            >
                              {metric.label}
                            </div>
                            <div
                              className="text-sm font-bold"
                              style={{ color: "oklch(var(--pearl))" }}
                            >
                              {metric.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="mt-4 pt-4 border-t flex items-center justify-between"
                      style={{ borderColor: "oklch(0.65 0.18 142 / 0.1)" }}
                    >
                      <div>
                        <div
                          className="text-xs"
                          style={{ color: "oklch(0.48 0.02 260)" }}
                        >
                          Category
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "oklch(0.72 0.02 260)" }}
                        >
                          {selectedFranchise.category}
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-xs"
                          style={{ color: "oklch(0.48 0.02 260)" }}
                        >
                          License Type
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "oklch(0.72 0.02 260)" }}
                        >
                          {selectedFranchise.licenseType}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FinFracFran™ callout */}
                  {selectedFranchise.finfracfranBadge && (
                    <div
                      className="rounded-xl border p-4"
                      style={{
                        background: "oklch(0.80 0.18 85 / 0.06)",
                        borderColor: "oklch(0.80 0.18 85 / 0.3)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Award
                          className="w-4 h-4"
                          style={{ color: "oklch(0.82 0.16 85)" }}
                        />
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: "oklch(0.82 0.16 85)" }}
                        >
                          FinFracFran™ Certified
                        </span>
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "oklch(0.72 0.04 85)" }}
                      >
                        This franchise is part of the global FinFracFran™
                        franchise licensing network — enabling rapid,
                        capital-friendly adoption across nations with full
                        governance and revenue-share transparency.
                      </p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      data-ocid="finance.franchise_apply.button"
                      className="w-full font-semibold"
                      style={{
                        background: "oklch(0.65 0.18 142)",
                        color: "oklch(0.08 0.03 260)",
                      }}
                      onClick={() => {
                        toast.success(
                          "Application submitted. Our team will contact you shortly.",
                        );
                        closeFranchise();
                      }}
                    >
                      Apply for Franchise
                    </Button>
                    <Button
                      data-ocid="finance.franchise_detail.close_button"
                      variant="outline"
                      className="w-full"
                      style={{
                        borderColor: "oklch(0.35 0.03 260)",
                        color: "oklch(0.62 0.02 260)",
                      }}
                      onClick={closeFranchise}
                    >
                      Back to Directory
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Fundraising Campaign Hub ── */}
      <div id="campaigns" />
      <section
        data-ocid="finance.campaigns.section"
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Badge
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 border"
              style={{
                background: "oklch(0.72 0.16 75 / 0.12)",
                borderColor: "oklch(0.72 0.16 75 / 0.35)",
                color: "oklch(0.80 0.14 75)",
              }}
            >
              Phase 10
            </Badge>
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.55 0.02 260)" }}
            >
              FinFracFran™ Capital Mobilization
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              background:
                "linear-gradient(135deg, oklch(0.92 0.08 85) 0%, oklch(0.80 0.18 75) 45%, oklch(0.55 0.14 195) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Fundraising Campaigns
          </h2>
          <p
            className="text-sm max-w-2xl"
            style={{ color: "oklch(0.62 0.02 260)" }}
          >
            Back the missions that matter — fuel global solutions through
            community-powered campaigns with full FinFracFran™ transparency.
          </p>
        </motion.div>

        {/* Status Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CAMPAIGN_STATUS_PILLS.map((status, i) => {
            const isActive = campaignStatusFilter === status;
            const statusCfg =
              status !== "all" ? CAMPAIGN_STATUS_CONFIG[status] : null;
            const activeColor = statusCfg?.color ?? "oklch(0.72 0.16 75)";
            return (
              <button
                type="button"
                key={status}
                data-ocid={`finance.campaign_status.tab.${i + 1}`}
                onClick={() => setCampaignStatusFilter(status)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{
                  background: isActive
                    ? activeColor
                    : "oklch(var(--cosmos-surface) / 0.5)",
                  borderColor: isActive ? activeColor : "oklch(0.35 0.03 260)",
                  color: isActive
                    ? "oklch(0.08 0.03 260)"
                    : "oklch(0.65 0.02 260)",
                }}
              >
                {status === "all" ? "All Campaigns" : status}
              </button>
            );
          })}
        </motion.div>

        {/* Cards Grid or Empty State */}
        {filteredCampaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="finance.campaign.empty_state"
            className="rounded-2xl border p-12 text-center"
            style={{
              background: "oklch(var(--cosmos-surface) / 0.4)",
              borderColor: "oklch(0.72 0.16 75 / 0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "oklch(0.72 0.16 75 / 0.1)" }}
            >
              <Coins
                className="w-6 h-6"
                style={{ color: "oklch(0.72 0.16 75)" }}
              />
            </div>
            <p
              className="text-base font-semibold mb-2"
              style={{ color: "oklch(var(--pearl))" }}
            >
              No campaigns match this filter
            </p>
            <p
              className="text-sm mb-5"
              style={{ color: "oklch(0.55 0.02 260)" }}
            >
              Try selecting a different status to explore all active campaigns.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(0.72 0.16 75 / 0.4)",
                color: "oklch(0.80 0.14 75)",
              }}
              onClick={() => setCampaignStatusFilter("all")}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filter
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCampaigns.map((campaign, i) => {
              const statusCfg = CAMPAIGN_STATUS_CONFIG[campaign.status];
              const pct = Math.min(
                100,
                Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
              );
              const progressColor =
                pct >= 80
                  ? "oklch(0.65 0.18 142)"
                  : pct >= 40
                    ? "oklch(0.72 0.16 75)"
                    : "oklch(0.55 0.14 195)";
              const tierCfg = campaign.finfracfranTier
                ? FRANCHISE_TIER_CONFIG[campaign.finfracfranTier]
                : null;

              return (
                <motion.div
                  key={campaign.id}
                  data-ocid={`finance.campaign.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border flex flex-col overflow-hidden"
                  style={{
                    background: "oklch(var(--cosmos-surface) / 0.6)",
                    borderColor: "oklch(0.72 0.16 75 / 0.2)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="px-5 pt-5 pb-4 border-b"
                    style={{ borderColor: "oklch(0.72 0.16 75 / 0.1)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-mono"
                        style={{ color: "oklch(0.45 0.02 260)" }}
                      >
                        {campaign.id}
                      </span>
                      {tierCfg && (
                        <span
                          className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border"
                          style={{
                            background: `${tierCfg.color.replace(")", ` / ${tierCfg.bgOpacity})`)})`,
                            borderColor: `${tierCfg.color.replace(")", " / 0.35)")}`,
                            color: tierCfg.color,
                          }}
                        >
                          <Award className="w-3 h-3" />
                          FF™ {campaign.finfracfranTier}
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-bold text-base mb-1 leading-snug"
                      style={{
                        color: "oklch(var(--pearl))",
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                      }}
                    >
                      {campaign.title}
                    </h3>
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded border mb-2"
                      style={{
                        background: "oklch(0.72 0.16 75 / 0.08)",
                        borderColor: "oklch(0.72 0.16 75 / 0.2)",
                        color: "oklch(0.80 0.14 75)",
                      }}
                    >
                      {campaign.category}
                    </span>
                    <p
                      className="text-sm leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.02 260)" }}
                    >
                      {campaign.description}
                    </p>
                  </div>

                  {/* Progress + Body */}
                  <div className="px-5 py-4 flex-1 flex flex-col gap-3">
                    {/* Progress bar */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: progressColor }}
                        >
                          {pct}% funded
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.50 0.02 260)" }}
                        >
                          {formatCurrency(campaign.raisedAmount)} /{" "}
                          {formatCurrency(campaign.goalAmount)}
                        </span>
                      </div>
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ background: "oklch(0.20 0.02 260)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: progressColor,
                          }}
                        />
                      </div>
                    </div>

                    {/* Meta row */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Users
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.55 0.14 195)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.02 260)" }}
                        >
                          {campaign.backers.toLocaleString()} backers
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "oklch(0.65 0.14 310)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.02 260)" }}
                        >
                          {campaign.endDate}
                        </span>
                      </div>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full border font-medium"
                          style={{
                            background: `${statusCfg.color.replace(")", " / 0.12)")}`,
                            borderColor: `${statusCfg.color.replace(")", " / 0.35)")}`,
                            color: statusCfg.color,
                          }}
                        >
                          {statusCfg.label}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.45 0.02 260)" }}
                        >
                          {campaign.council}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="text-xs h-7 px-3 font-semibold"
                        style={{
                          background: "oklch(0.72 0.16 75 / 0.15)",
                          color: "oklch(0.85 0.14 75)",
                          border: "1px solid oklch(0.72 0.16 75 / 0.3)",
                        }}
                        onClick={() => openCampaign(campaign)}
                      >
                        Back This Campaign
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Campaign Detail Sheet */}
      <Sheet
        open={!!selectedCampaign}
        onOpenChange={(open) => !open && closeCampaign()}
      >
        <SheetContent
          data-ocid="finance.campaign_detail.sheet"
          side="right"
          className="w-full sm:max-w-lg p-0 border-l"
          style={{
            background: "oklch(0.09 0.04 260)",
            borderColor: "oklch(0.72 0.16 75 / 0.25)",
          }}
        >
          {selectedCampaign &&
            (() => {
              const statusCfg = CAMPAIGN_STATUS_CONFIG[selectedCampaign.status];
              const pct = Math.min(
                100,
                Math.round(
                  (selectedCampaign.raisedAmount /
                    selectedCampaign.goalAmount) *
                    100,
                ),
              );
              const progressColor =
                pct >= 80
                  ? "oklch(0.65 0.18 142)"
                  : pct >= 40
                    ? "oklch(0.72 0.16 75)"
                    : "oklch(0.55 0.14 195)";
              const tierCfg = selectedCampaign.finfracfranTier
                ? FRANCHISE_TIER_CONFIG[selectedCampaign.finfracfranTier]
                : null;

              return (
                <>
                  <SheetHeader
                    className="px-6 pt-6 pb-5 border-b"
                    style={{ borderColor: "oklch(0.72 0.16 75 / 0.15)" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className="text-xs font-mono"
                            style={{ color: "oklch(0.45 0.02 260)" }}
                          >
                            {selectedCampaign.id}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full border font-medium"
                            style={{
                              background: `${statusCfg.color.replace(")", " / 0.12)")}`,
                              borderColor: `${statusCfg.color.replace(")", " / 0.35)")}`,
                              color: statusCfg.color,
                            }}
                          >
                            {statusCfg.label}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded border"
                            style={{
                              background: "oklch(0.72 0.16 75 / 0.08)",
                              borderColor: "oklch(0.72 0.16 75 / 0.2)",
                              color: "oklch(0.80 0.14 75)",
                            }}
                          >
                            {selectedCampaign.category}
                          </span>
                        </div>
                        <SheetTitle
                          className="text-xl font-bold leading-snug"
                          style={{
                            color: "oklch(var(--pearl))",
                            fontFamily: "'Cabinet Grotesk', sans-serif",
                          }}
                        >
                          {selectedCampaign.title}
                        </SheetTitle>
                      </div>
                    </div>
                  </SheetHeader>

                  <ScrollArea className="h-[calc(100vh-180px)]">
                    <div className="px-6 py-5 space-y-6">
                      {/* Description */}
                      <div>
                        <h4
                          className="text-xs font-semibold uppercase tracking-widest mb-3"
                          style={{ color: "oklch(0.50 0.02 260)" }}
                        >
                          About This Campaign
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "oklch(0.72 0.02 260)" }}
                        >
                          {selectedCampaign.description}
                        </p>
                      </div>

                      {/* Fundraising Progress */}
                      <div
                        className="rounded-xl border p-4"
                        style={{
                          background: "oklch(var(--cosmos-surface) / 0.5)",
                          borderColor: "oklch(0.72 0.16 75 / 0.15)",
                        }}
                      >
                        <h4
                          className="text-xs font-semibold uppercase tracking-wider mb-4"
                          style={{ color: "oklch(0.50 0.02 260)" }}
                        >
                          Fundraising Progress
                        </h4>

                        {/* Large progress bar */}
                        <div className="mb-4">
                          <div className="flex items-end justify-between mb-2">
                            <span
                              className="text-3xl font-bold"
                              style={{
                                color: progressColor,
                                fontFamily: "'Cabinet Grotesk', sans-serif",
                              }}
                            >
                              {pct}%
                            </span>
                            <span
                              className="text-sm"
                              style={{ color: "oklch(0.55 0.02 260)" }}
                            >
                              of goal
                            </span>
                          </div>
                          <Progress
                            value={pct}
                            className="h-3 rounded-full"
                            style={{
                              background: "oklch(0.18 0.02 260)",
                            }}
                          />
                        </div>

                        {/* Raised vs Goal */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div
                              className="text-xs mb-0.5"
                              style={{ color: "oklch(0.48 0.02 260)" }}
                            >
                              Raised
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: progressColor }}
                            >
                              {formatCurrency(selectedCampaign.raisedAmount)}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-xs mb-0.5"
                              style={{ color: "oklch(0.48 0.02 260)" }}
                            >
                              Goal
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: "oklch(var(--pearl))" }}
                            >
                              {formatCurrency(selectedCampaign.goalAmount)}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-xs mb-0.5"
                              style={{ color: "oklch(0.48 0.02 260)" }}
                            >
                              Backers
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: "oklch(var(--pearl))" }}
                            >
                              {selectedCampaign.backers.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-xs mb-0.5"
                              style={{ color: "oklch(0.48 0.02 260)" }}
                            >
                              Currency
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: "oklch(var(--pearl))" }}
                            >
                              {selectedCampaign.currency}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Campaign Details */}
                      <div
                        className="rounded-xl border p-4"
                        style={{
                          background: "oklch(var(--cosmos-surface) / 0.5)",
                          borderColor: "oklch(0.72 0.16 75 / 0.15)",
                        }}
                      >
                        <h4
                          className="text-xs font-semibold uppercase tracking-wider mb-4"
                          style={{ color: "oklch(0.50 0.02 260)" }}
                        >
                          Campaign Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <CalendarDays
                              className="w-4 h-4 shrink-0"
                              style={{ color: "oklch(0.65 0.14 310)" }}
                            />
                            <div>
                              <div
                                className="text-xs"
                                style={{ color: "oklch(0.48 0.02 260)" }}
                              >
                                End Date
                              </div>
                              <div
                                className="text-sm font-medium"
                                style={{ color: "oklch(0.78 0.02 260)" }}
                              >
                                {selectedCampaign.endDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Globe
                              className="w-4 h-4 shrink-0"
                              style={{ color: "oklch(0.65 0.18 270)" }}
                            />
                            <div>
                              <div
                                className="text-xs"
                                style={{ color: "oklch(0.48 0.02 260)" }}
                              >
                                Council
                              </div>
                              <div
                                className="text-sm font-medium"
                                style={{ color: "oklch(0.78 0.02 260)" }}
                              >
                                {selectedCampaign.council}
                              </div>
                            </div>
                          </div>
                          {tierCfg && (
                            <div className="flex items-center gap-3">
                              <Award
                                className="w-4 h-4 shrink-0"
                                style={{ color: tierCfg.color }}
                              />
                              <div>
                                <div
                                  className="text-xs"
                                  style={{ color: "oklch(0.48 0.02 260)" }}
                                >
                                  FinFracFran™ Tier
                                </div>
                                <div
                                  className="text-sm font-bold"
                                  style={{ color: tierCfg.color }}
                                >
                                  {selectedCampaign.finfracfranTier}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col gap-3 pt-2">
                        <Button
                          data-ocid="finance.campaign_back.button"
                          className="w-full font-semibold gap-2"
                          style={{
                            background: "oklch(0.72 0.16 75)",
                            color: "oklch(0.08 0.03 260)",
                          }}
                          onClick={() => {
                            toast.success(
                              "Thank you! Your backing has been recorded.",
                            );
                            closeCampaign();
                          }}
                        >
                          <Coins className="w-4 h-4" />
                          Back This Campaign
                        </Button>
                        <Button
                          data-ocid="finance.campaign_detail.close_button"
                          variant="outline"
                          className="w-full"
                          style={{
                            borderColor: "oklch(0.35 0.03 260)",
                            color: "oklch(0.62 0.02 260)",
                          }}
                          onClick={closeCampaign}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </>
              );
            })()}
        </SheetContent>
      </Sheet>

      {/* Section Anchor Shells */}
      {/* ===== ENTERPRISE PROFILES SECTION ===== */}
      <EnterpriseSection />
      <InvestmentRoundsSection />
      <WalletsSection />
      <FinFracFranFinanceSection />
      <MarketplaceQuickLink />
    </main>
  );
}

// ===== WALLETS & TREASURY SECTION =====
function WalletsSection() {
  const { wallets } = useWallets();
  const [selectedWallet, setSelectedWallet] = useState<WalletRecord | null>(
    null,
  );

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
  const lastTx = wallets
    .map((w) => w.lastTransaction)
    .sort()
    .reverse()[0];

  const WALLET_TYPE_CONFIG: Record<
    WalletType,
    { color: string; bg: string; label: string }
  > = {
    "DAO Treasury": {
      color: "oklch(0.72 0.16 75)",
      bg: "oklch(0.72 0.16 75 / 0.12)",
      label: "DAO Treasury",
    },
    "Multi-Sig": {
      color: "oklch(0.72 0.18 185)",
      bg: "oklch(0.72 0.18 185 / 0.12)",
      label: "Multi-Sig",
    },
    Custodial: {
      color: "oklch(0.65 0.18 255)",
      bg: "oklch(0.65 0.18 255 / 0.12)",
      label: "Custodial",
    },
    "Non-Custodial": {
      color: "oklch(0.68 0.18 145)",
      bg: "oklch(0.68 0.18 145 / 0.12)",
      label: "Non-Custodial",
    },
  };

  return (
    <section
      id="wallets"
      data-ocid="finance.wallets.section"
      className="py-20"
      style={{ background: "oklch(0.10 0.04 260)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
            >
              <Landmark
                className="w-6 h-6"
                style={{ color: "oklch(0.72 0.16 75)" }}
              />
            </div>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{
                fontFamily: "Fraunces, serif",
                color: "oklch(0.94 0.02 90)",
              }}
            >
              Wallets &amp; Treasury
            </h2>
          </div>
          <p
            className="text-base max-w-2xl"
            style={{ color: "oklch(0.58 0.03 260)" }}
          >
            Real-time treasury holdings, multi-sig controls, and on-chain
            custody across DAO and community wallets.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            {
              label: "Total Treasury",
              value: formatCurrency(totalBalance),
              icon: DollarSign,
              color: "oklch(0.72 0.16 75)",
            },
            {
              label: "Active Wallets",
              value: wallets
                .filter((w) => w.status === "Active")
                .length.toString(),
              icon: Landmark,
              color: "oklch(0.72 0.18 185)",
            },
            {
              label: "Last Transaction",
              value: lastTx,
              icon: CalendarDays,
              color: "oklch(0.65 0.18 255)",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border p-5 flex items-center gap-4"
              style={{
                background: "oklch(0.13 0.04 260)",
                borderColor: "oklch(0.22 0.03 260)",
              }}
            >
              <div
                className="p-2.5 rounded-lg shrink-0"
                style={{ background: `${stat.color} / 0.12` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <div
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: "oklch(0.94 0.02 90)" }}
                >
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Wallet Cards Grid */}
        {wallets.length === 0 ? (
          <div
            data-ocid="finance.wallets.empty_state"
            className="rounded-2xl border py-16 text-center"
            style={{
              background: "oklch(0.13 0.04 260)",
              borderColor: "oklch(0.22 0.03 260)",
            }}
          >
            <Landmark
              className="w-10 h-10 mx-auto mb-3"
              style={{ color: "oklch(0.38 0.03 260)" }}
            />
            <p style={{ color: "oklch(0.52 0.03 260)" }}>No wallets found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {wallets.map((wallet, idx) => {
              const cfg = WALLET_TYPE_CONFIG[wallet.type];
              return (
                <motion.div
                  key={wallet.id}
                  data-ocid={`finance.wallet.item.${idx + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                  style={{
                    background: "oklch(0.13 0.04 260)",
                    borderColor: "oklch(0.22 0.03 260)",
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: cfg.bg }}
                      >
                        <Landmark
                          className="w-4 h-4"
                          style={{ color: cfg.color }}
                        />
                      </div>
                      <div>
                        <div
                          className="text-xs font-mono mb-0.5"
                          style={{ color: "oklch(0.45 0.03 260)" }}
                        >
                          {wallet.id}
                        </div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: "oklch(0.88 0.02 260)" }}
                        >
                          {wallet.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        style={{
                          background: cfg.bg,
                          color: cfg.color,
                          borderColor: `${cfg.color} / 0.3`,
                        }}
                      >
                        {cfg.label}
                      </Badge>
                      <Badge
                        style={{
                          background:
                            wallet.status === "Active"
                              ? "oklch(0.60 0.18 145 / 0.15)"
                              : "oklch(0.48 0.03 260 / 0.15)",
                          color:
                            wallet.status === "Active"
                              ? "oklch(0.72 0.18 145)"
                              : "oklch(0.52 0.03 260)",
                        }}
                      >
                        {wallet.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Balance */}
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "oklch(0.45 0.03 260)" }}
                    >
                      Balance
                    </div>
                    <div
                      className="text-3xl font-bold tracking-tight"
                      style={{
                        color: cfg.color,
                        fontFamily: "Fraunces, serif",
                      }}
                    >
                      {formatCurrency(wallet.balance)}
                    </div>
                  </div>

                  {/* Address + last tx */}
                  <div className="flex flex-col gap-1">
                    <div
                      className="text-xs font-mono truncate"
                      style={{ color: "oklch(0.48 0.03 260)" }}
                      title={wallet.address}
                    >
                      {wallet.address.length > 28
                        ? `${wallet.address.slice(0, 28)}…`
                        : wallet.address}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.42 0.03 260)" }}
                    >
                      Last tx: {wallet.lastTransaction}
                    </div>
                  </div>

                  {/* View Details */}
                  <Button
                    data-ocid={`finance.wallet.open_modal_button.${idx + 1}`}
                    size="sm"
                    variant="outline"
                    className="w-full mt-auto gap-2"
                    style={{
                      borderColor: cfg.color,
                      color: cfg.color,
                    }}
                    onClick={() => setSelectedWallet(wallet)}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    View Details
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedWallet}
        onOpenChange={(open) => !open && setSelectedWallet(null)}
      >
        <SheetContent
          data-ocid="finance.wallet.sheet"
          side="right"
          className="w-full sm:max-w-lg border-l"
          style={{
            background: "oklch(0.10 0.04 260)",
            borderColor: "oklch(0.22 0.03 260)",
          }}
        >
          {selectedWallet &&
            (() => {
              const cfg = WALLET_TYPE_CONFIG[selectedWallet.type];
              return (
                <>
                  <SheetHeader
                    className="pb-4 border-b"
                    style={{ borderColor: "oklch(0.22 0.03 260)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl"
                        style={{ background: cfg.bg }}
                      >
                        <Landmark
                          className="w-5 h-5"
                          style={{ color: cfg.color }}
                        />
                      </div>
                      <div>
                        <SheetTitle
                          className="text-left"
                          style={{
                            color: "oklch(0.94 0.02 90)",
                            fontFamily: "Fraunces, serif",
                          }}
                        >
                          {selectedWallet.name}
                        </SheetTitle>
                        <div
                          className="text-xs font-mono mt-0.5"
                          style={{ color: "oklch(0.45 0.03 260)" }}
                        >
                          {selectedWallet.id}
                        </div>
                      </div>
                    </div>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-120px)] pr-2">
                    <div className="py-6 flex flex-col gap-5">
                      {[
                        { label: "Type", value: selectedWallet.type },
                        {
                          label: "Balance",
                          value: `${formatCurrency(selectedWallet.balance)} ${selectedWallet.currency}`,
                        },
                        { label: "Status", value: selectedWallet.status },
                        {
                          label: "Full Address",
                          value: selectedWallet.address,
                        },
                        {
                          label: "Last Transaction",
                          value: selectedWallet.lastTransaction,
                        },
                      ].map((row) => (
                        <div key={row.label} className="flex flex-col gap-1">
                          <div
                            className="text-xs"
                            style={{ color: "oklch(0.45 0.03 260)" }}
                          >
                            {row.label}
                          </div>
                          <div
                            className="text-sm font-medium font-mono break-all"
                            style={{ color: "oklch(0.88 0.02 260)" }}
                          >
                            {row.value}
                          </div>
                        </div>
                      ))}
                      <Button
                        data-ocid="finance.wallet.close_button"
                        variant="outline"
                        className="w-full mt-4"
                        style={{
                          borderColor: "oklch(0.30 0.03 260)",
                          color: "oklch(0.60 0.03 260)",
                        }}
                        onClick={() => setSelectedWallet(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </ScrollArea>
                </>
              );
            })()}
        </SheetContent>
      </Sheet>
    </section>
  );
}

// ===== FINFRACFRAN™ FINANCE SPOTLIGHT SECTION =====
function FinFracFranFinanceSection() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyName, setApplyName] = useState("");
  const [applyOrg, setApplyOrg] = useState("");
  const [applyTier, setApplyTier] = useState<FranchiseTier | "">("");
  const [applyMsg, setApplyMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const PROGRAMS = [
    {
      title: "Franchise Capital Access",
      desc: "Unlock tiered capital facilities from $10K (Seed) to $5M+ (Global) through the FinFracFran™ network. Revenue-share financing with zero equity dilution.",
      icon: Coins,
      color: "oklch(0.72 0.16 75)",
    },
    {
      title: "Revenue Distribution Model",
      desc: "Automated royalty splits across local franchisees, regional hubs, and the global DAO treasury — transparent, on-chain, real-time.",
      icon: TrendingUp,
      color: "oklch(0.72 0.18 185)",
    },
    {
      title: "Nation Adoption Funding",
      desc: "Country-level adoption packages with co-financing from ONEartHeaven™ impact bonds, multilateral partners, and community bonds.",
      icon: Globe,
      color: "oklch(0.65 0.18 255)",
    },
  ];

  const TIERS = [
    { tier: "Seed", minInvest: "$10K", milestone: "1 nation pilot" },
    { tier: "Growth", minInvest: "$100K", milestone: "5 nations active" },
    { tier: "Scale", minInvest: "$500K", milestone: "20 nations active" },
    { tier: "Global", minInvest: "$5M+", milestone: "50+ nations" },
  ];

  const handleApplySubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplyOpen(false);
      setApplyName("");
      setApplyOrg("");
      setApplyTier("");
      setApplyMsg("");
      toast.success(
        "Application submitted! Our team will reach out within 48 hours.",
      );
    }, 1200);
  };

  return (
    <section
      id="finfracfran-finance"
      data-ocid="finance.finfracfran.section"
      className="py-20 relative overflow-hidden"
      style={{ background: "oklch(0.09 0.04 260)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.72 0.16 75 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FFSpotlightHeader
          badge="FinFracFran™ Finance Spotlight"
          headline="Finance the Future"
          subline="FinFracFran™ turns governance into revenue — enabling every franchise, enterprise, and nation to participate in sustainable economic growth."
          align="center"
          className="mb-14"
        />

        {/* Featured Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PROGRAMS.map((prog, idx) => (
            <motion.div
              key={prog.title}
              data-ocid={`finance.finfracfran.item.${idx + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: "oklch(0.13 0.04 260)",
                borderColor: "oklch(0.22 0.03 260)",
              }}
            >
              <div
                className="p-3 rounded-xl w-fit"
                style={{ background: `${prog.color} / 0.12` }}
              >
                <prog.icon className="w-6 h-6" style={{ color: prog.color }} />
              </div>
              <div>
                <h3
                  className="font-bold text-lg mb-1"
                  style={{
                    color: "oklch(0.94 0.02 90)",
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  {prog.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.58 0.03 260)" }}
                >
                  {prog.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tier Progression Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border p-8 mb-10"
          style={{
            background: "oklch(0.13 0.04 260)",
            borderColor: "oklch(0.30 0.06 75 / 0.4)",
          }}
        >
          <h3
            className="text-xl font-bold mb-6 text-center"
            style={{
              color: "oklch(0.82 0.16 75)",
              fontFamily: "Fraunces, serif",
            }}
          >
            Tier Progression &amp; Finance Milestones
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map((t, idx) => {
              const tierCfg = FRANCHISE_TIER_CONFIG[t.tier as FranchiseTier];
              return (
                <div
                  key={t.tier}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{
                      background: "oklch(0.22 0.03 260)",
                      color: tierCfg?.color ?? "oklch(0.72 0.03 260)",
                      border: `2px solid ${tierCfg?.color ?? "oklch(0.30 0.03 260)"}`,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: tierCfg?.color ?? "oklch(0.72 0.03 260)" }}
                  >
                    {t.tier}
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: "oklch(0.82 0.16 75)" }}
                  >
                    {t.minInvest}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    {t.milestone}
                  </div>
                  {idx < TIERS.length - 1 && (
                    <ArrowRight
                      className="hidden md:block absolute translate-x-[3.5rem] w-4 h-4"
                      style={{ color: "oklch(0.38 0.03 260)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Apply CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button
            data-ocid="finance.finfracfran.open_modal_button"
            size="lg"
            className="gap-2 font-semibold px-8"
            style={{
              background: "oklch(0.72 0.16 75)",
              color: "oklch(0.08 0.03 260)",
            }}
            onClick={() => setApplyOpen(true)}
          >
            <Coins className="w-5 h-5" />
            Apply for FinFracFran™ Finance Access
          </Button>
        </motion.div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent
          data-ocid="finance.finfracfran.dialog"
          className="sm:max-w-md"
          style={{
            background: "oklch(0.12 0.04 260)",
            borderColor: "oklch(0.22 0.03 260)",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{
                color: "oklch(0.94 0.02 90)",
                fontFamily: "Fraunces, serif",
              }}
            >
              Apply for FinFracFran™ Finance Access
            </DialogTitle>
            <DialogDescription style={{ color: "oklch(0.52 0.03 260)" }}>
              Complete this form and our team will contact you within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label style={{ color: "oklch(0.72 0.02 260)" }}>Full Name</Label>
              <Input
                data-ocid="finance.finfracfran.input"
                placeholder="Your full name"
                value={applyName}
                onChange={(e) => setApplyName(e.target.value)}
                style={{
                  background: "oklch(0.16 0.04 260)",
                  borderColor: "oklch(0.28 0.03 260)",
                  color: "oklch(0.88 0.02 260)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label style={{ color: "oklch(0.72 0.02 260)" }}>
                Organization
              </Label>
              <Input
                placeholder="Organization name"
                value={applyOrg}
                onChange={(e) => setApplyOrg(e.target.value)}
                style={{
                  background: "oklch(0.16 0.04 260)",
                  borderColor: "oklch(0.28 0.03 260)",
                  color: "oklch(0.88 0.02 260)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label style={{ color: "oklch(0.72 0.02 260)" }}>
                Tier Interest
              </Label>
              <select
                data-ocid="finance.finfracfran.select"
                value={applyTier}
                onChange={(e) =>
                  setApplyTier(e.target.value as FranchiseTier | "")
                }
                className="rounded-md border px-3 py-2 text-sm"
                style={{
                  background: "oklch(0.16 0.04 260)",
                  borderColor: "oklch(0.28 0.03 260)",
                  color: applyTier
                    ? "oklch(0.88 0.02 260)"
                    : "oklch(0.45 0.03 260)",
                }}
              >
                <option value="">Select a tier…</option>
                {(["Seed", "Growth", "Scale", "Global"] as FranchiseTier[]).map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label style={{ color: "oklch(0.72 0.02 260)" }}>Message</Label>
              <Textarea
                data-ocid="finance.finfracfran.textarea"
                placeholder="Briefly describe your interest and use case…"
                value={applyMsg}
                onChange={(e) => setApplyMsg(e.target.value)}
                rows={3}
                style={{
                  background: "oklch(0.16 0.04 260)",
                  borderColor: "oklch(0.28 0.03 260)",
                  color: "oklch(0.88 0.02 260)",
                }}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="finance.finfracfran.cancel_button"
              variant="outline"
              onClick={() => setApplyOpen(false)}
              style={{
                borderColor: "oklch(0.30 0.03 260)",
                color: "oklch(0.60 0.03 260)",
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="finance.finfracfran.submit_button"
              disabled={submitting || !applyName || !applyOrg || !applyTier}
              onClick={handleApplySubmit}
              style={{
                background: "oklch(0.72 0.16 75)",
                color: "oklch(0.08 0.03 260)",
              }}
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function MarketplaceQuickLink() {
  return (
    <section
      className="mx-auto max-w-5xl px-4 pb-12"
      data-ocid="finance.marketplace.section"
    >
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.06 75 / 0.30), oklch(0.12 0.04 260))",
          border: "1px solid oklch(0.72 0.16 75 / 0.25)",
        }}
      >
        <div>
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "oklch(0.72 0.16 75)" }}
          >
            Phase 13 · Marketplace
          </div>
          <h3
            className="text-xl font-bold mb-1"
            style={{ color: "oklch(0.92 0.02 260)" }}
          >
            FinFracFran™ Marketplace
          </h3>
          <p className="text-sm" style={{ color: "oklch(0.62 0.04 260)" }}>
            Explore franchise, fractional, and license opportunities. Invest in
            scalable solutions worldwide and apply to operate proven models in
            your region.
          </p>
        </div>
        <Link to="/marketplace">
          <button
            type="button"
            data-ocid="finance.marketplace.button"
            className="shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.68 0.18 55))",
              color: "oklch(0.08 0.03 260)",
            }}
          >
            Browse Marketplace →
          </button>
        </Link>
      </div>
    </section>
  );
}
