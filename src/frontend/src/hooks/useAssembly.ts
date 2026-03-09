// ─── useAssembly Hook ─────────────────────────────────────────────────────────
// Phase 2.1 — Global Assembly state management

import {
  COUNCILS,
  type CouncilId,
  PROPOSALS,
  type Proposal,
  type ProposalStatus,
  type RegionTag,
  getAssemblyStats,
  getVotePercentages,
} from "@/data/assemblyData";
import { useCallback, useMemo, useState } from "react";

export type SortOrder = "newest" | "oldest" | "most_votes" | "ai_score";

export interface AssemblyFilters {
  search: string;
  status: ProposalStatus | "all";
  council: CouncilId | "all";
  region: RegionTag | "all";
  sort: SortOrder;
}

const DEFAULT_FILTERS: AssemblyFilters = {
  search: "",
  status: "all",
  council: "all",
  region: "all",
  sort: "newest",
};

export function useAssembly() {
  const [filters, setFilters] = useState<AssemblyFilters>(DEFAULT_FILTERS);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null,
  );
  const [userVotes, setUserVotes] = useState<
    Record<string, "for" | "against" | "abstain">
  >({});
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const filteredProposals = useMemo(() => {
    let result = [...PROPOSALS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.submittedBy.toLowerCase().includes(q),
      );
    }

    if (filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    }

    if (filters.council !== "all") {
      result = result.filter((p) => p.councilId === filters.council);
    }

    if (filters.region !== "all") {
      result = result.filter(
        (p) =>
          p.submitterRegion === filters.region ||
          p.regionTags.includes(filters.region as RegionTag),
      );
    }

    switch (filters.sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.submittedDate).getTime() -
            new Date(a.submittedDate).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.submittedDate).getTime() -
            new Date(b.submittedDate).getTime(),
        );
        break;
      case "most_votes":
        result.sort(
          (a, b) =>
            b.voteTally.for +
            b.voteTally.against +
            b.voteTally.abstain -
            (a.voteTally.for + a.voteTally.against + a.voteTally.abstain),
        );
        break;
      case "ai_score":
        result.sort((a, b) => b.aiAlignmentScore - a.aiAlignmentScore);
        break;
    }

    return result;
  }, [filters]);

  const selectedProposal = useMemo(
    () =>
      selectedProposalId
        ? (PROPOSALS.find((p) => p.id === selectedProposalId) ?? null)
        : null,
    [selectedProposalId],
  );

  const castVote = useCallback(
    (proposalId: string, vote: "for" | "against" | "abstain") => {
      setUserVotes((prev) => ({ ...prev, [proposalId]: vote }));
    },
    [],
  );

  const updateFilter = useCallback(
    <K extends keyof AssemblyFilters>(key: K, value: AssemblyFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const stats = useMemo(() => getAssemblyStats(), []);

  const getVotePct = useCallback(
    (proposal: Proposal) => getVotePercentages(proposal.voteTally),
    [],
  );

  return {
    proposals: filteredProposals,
    allProposals: PROPOSALS,
    councils: COUNCILS,
    stats,
    selectedProposal,
    selectedProposalId,
    setSelectedProposalId,
    filters,
    updateFilter,
    resetFilters,
    userVotes,
    castVote,
    submitDialogOpen,
    setSubmitDialogOpen,
    getVotePct,
  };
}
