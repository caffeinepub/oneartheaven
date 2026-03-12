import {
  ENTERPRISE_PROFILES,
  FRANCHISE_OPPORTUNITIES,
  FUNDRAISING_CAMPAIGNS,
  INVESTMENT_ROUNDS,
  WALLET_RECORDS,
  financeStats,
} from "@/data/financeData";
import type {
  CampaignStatus,
  EnterpriseModel,
  EnterpriseProfile,
  FinanceStats,
  FranchiseCategory,
  FranchiseOpportunity,
  FranchiseTier,
  FundraisingCampaign,
  InvestmentRound,
  InvestmentStatus,
  InvestmentType,
  WalletRecord,
} from "@/data/financeTypes";
import { useMemo, useState } from "react";

export function useFranchises(
  tierFilter?: FranchiseTier | "all",
  categoryFilter?: FranchiseCategory | "all",
) {
  const [selectedFranchise, setSelectedFranchise] =
    useState<FranchiseOpportunity | null>(null);

  const filteredFranchises = useMemo(() => {
    return FRANCHISE_OPPORTUNITIES.filter((f) => {
      if (tierFilter && tierFilter !== "all" && f.tier !== tierFilter)
        return false;
      if (
        categoryFilter &&
        categoryFilter !== "all" &&
        f.category !== categoryFilter
      )
        return false;
      return true;
    });
  }, [tierFilter, categoryFilter]);

  const openFranchise = (franchise: FranchiseOpportunity) =>
    setSelectedFranchise(franchise);
  const closeFranchise = () => setSelectedFranchise(null);

  return {
    filteredFranchises,
    selectedFranchise,
    openFranchise,
    closeFranchise,
  };
}

export function useCampaigns(
  statusFilter?: CampaignStatus | "all",
  categoryFilter?: FranchiseCategory | "all",
) {
  const [selectedCampaign, setSelectedCampaign] =
    useState<FundraisingCampaign | null>(null);

  const filteredCampaigns = useMemo(() => {
    return FUNDRAISING_CAMPAIGNS.filter((c) => {
      if (statusFilter && statusFilter !== "all" && c.status !== statusFilter)
        return false;
      if (
        categoryFilter &&
        categoryFilter !== "all" &&
        c.category !== categoryFilter
      )
        return false;
      return true;
    });
  }, [statusFilter, categoryFilter]);

  const openCampaign = (campaign: FundraisingCampaign) =>
    setSelectedCampaign(campaign);
  const closeCampaign = () => setSelectedCampaign(null);

  return { filteredCampaigns, selectedCampaign, openCampaign, closeCampaign };
}

export function useEnterprises(modelFilter?: EnterpriseModel | "all") {
  const [selectedEnterprise, setSelectedEnterprise] =
    useState<EnterpriseProfile | null>(null);

  const filteredEnterprises = useMemo(() => {
    return ENTERPRISE_PROFILES.filter((e) => {
      if (modelFilter && modelFilter !== "all" && e.model !== modelFilter)
        return false;
      return true;
    });
  }, [modelFilter]);

  const openEnterprise = (enterprise: EnterpriseProfile) =>
    setSelectedEnterprise(enterprise);
  const closeEnterprise = () => setSelectedEnterprise(null);

  return {
    filteredEnterprises,
    selectedEnterprise,
    openEnterprise,
    closeEnterprise,
  };
}

export function useInvestmentRounds(
  typeFilter?: InvestmentType | "all",
  statusFilter?: InvestmentStatus | "all",
) {
  const [selectedRound, setSelectedRound] = useState<InvestmentRound | null>(
    null,
  );

  const filteredRounds = useMemo(() => {
    return INVESTMENT_ROUNDS.filter((r) => {
      if (typeFilter && typeFilter !== "all" && r.type !== typeFilter)
        return false;
      if (statusFilter && statusFilter !== "all" && r.status !== statusFilter)
        return false;
      return true;
    });
  }, [typeFilter, statusFilter]);

  const openRound = (round: InvestmentRound) => setSelectedRound(round);
  const closeRound = () => setSelectedRound(null);

  return { filteredRounds, selectedRound, openRound, closeRound };
}

export function useWallets(): { wallets: WalletRecord[] } {
  return { wallets: WALLET_RECORDS };
}

export function useFinanceStats(): FinanceStats {
  return financeStats;
}
