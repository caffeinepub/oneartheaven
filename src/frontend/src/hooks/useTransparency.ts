import {
  AI_DECISION_LOGS,
  AUDIT_FINDINGS,
  BUDGET_LINES,
  FF_DISCLOSURES,
  OPEN_CONTRACTS,
  TRANSPARENCY_STATS,
  VOTING_RECORDS,
} from "@/data/transparencyData";
import type {
  AIDecisionType,
  AuditSeverity,
  AuditStatus,
  FFTier,
  VoteOutcome,
} from "@/data/transparencyTypes";
import { useMemo, useState } from "react";

export function useBudgetLines(category?: string) {
  return useMemo(() => {
    if (!category || category === "all") return BUDGET_LINES;
    return BUDGET_LINES.filter((b) => b.category === category);
  }, [category]);
}

export function useAuditFindings(
  status?: AuditStatus | "all",
  severity?: AuditSeverity | "all",
) {
  return useMemo(() => {
    return AUDIT_FINDINGS.filter((a) => {
      if (status && status !== "all" && a.status !== status) return false;
      if (severity && severity !== "all" && a.severity !== severity)
        return false;
      return true;
    });
  }, [status, severity]);
}

export function useVotingRecords(search?: string, council?: string) {
  return useMemo(() => {
    return VOTING_RECORDS.filter((r) => {
      if (council && council !== "all" && r.council !== council) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.delegateName.toLowerCase().includes(q) &&
          !r.resolutionTitle.toLowerCase().includes(q) &&
          !r.resolutionId.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, council]);
}

export function useAIDecisionLogs(
  type?: AIDecisionType | "all",
  overrideOnly?: boolean,
) {
  return useMemo(() => {
    return AI_DECISION_LOGS.filter((d) => {
      if (type && type !== "all" && d.type !== type) return false;
      if (overrideOnly && !d.overrideFlag) return false;
      return true;
    });
  }, [type, overrideOnly]);
}

export function useOpenContracts(search?: string, status?: string) {
  return useMemo(() => {
    return OPEN_CONTRACTS.filter((c) => {
      if (status && status !== "all" && c.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.vendor.toLowerCase().includes(q) &&
          !c.council.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, status]);
}

export function useFFDisclosures(tier?: FFTier | "all") {
  return useMemo(() => {
    if (!tier || tier === "all") return FF_DISCLOSURES;
    return FF_DISCLOSURES.filter((d) => d.tier === tier);
  }, [tier]);
}

export function useTransparencyStats() {
  return TRANSPARENCY_STATS;
}

export function useFilterState<T>(initial: T): [T, (v: T) => void] {
  return useState<T>(initial);
}

// Re-export outcome type for components
export type { VoteOutcome };
