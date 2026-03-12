// ─── Transparency & Accountability Types ─────────────────────────────────────

export interface BudgetLine {
  id: string;
  category: string;
  council: string;
  allocated: number;
  spent: number;
  fiscalYear: string;
  finFracFranTag?: string;
  description: string;
}

export type AuditSeverity = "critical" | "high" | "medium" | "low";
export type AuditStatus = "open" | "in-progress" | "resolved" | "closed";

export interface AuditFinding {
  id: string;
  title: string;
  council: string;
  auditor: string;
  severity: AuditSeverity;
  status: AuditStatus;
  summary: string;
  recommendation: string;
  resolvedCount: number;
  totalRecommendations: number;
  dateOpened: string;
  finFracFranDisclosure?: string;
}

export type VoteOutcome = "for" | "against" | "abstain";

export interface VotingRecord {
  id: string;
  resolutionId: string;
  resolutionTitle: string;
  delegateName: string;
  delegateNation: string;
  council: string;
  vote: VoteOutcome;
  voteWeight: number;
  date: string;
  rationale: string;
}

export type AIDecisionType =
  | "policy-analysis"
  | "risk-assessment"
  | "charter-review"
  | "recommendation";

export interface AIDecisionLog {
  id: string;
  type: AIDecisionType;
  title: string;
  council: string;
  confidenceScore: number;
  charterAlignment: number;
  overrideFlag: boolean;
  overrideRationale?: string;
  date: string;
  summary: string;
  modelVersion: string;
}

export type ContractStatus = "active" | "pending" | "completed" | "terminated";

export type ContractAuditEventType =
  | "award"
  | "review"
  | "amendment"
  | "payment"
  | "completion"
  | "flag";

export interface ContractPaymentMilestone {
  milestone: string;
  amount: number;
  currency: string;
  dueDate: string;
  paid: boolean;
  paidDate?: string;
}

export interface ContractAuditEvent {
  date: string;
  type: ContractAuditEventType;
  title: string;
  party: string;
  outcome: string;
}

export interface ContractAmendment {
  id: string;
  date: string;
  description: string;
  approvedBy: string;
  valueChange?: number;
}

export interface OpenContract {
  id: string;
  vendor: string;
  council: string;
  value: number;
  currency: string;
  status: ContractStatus;
  licenseType: string;
  startDate: string;
  endDate: string;
  description: string;
  scope?: string;
  deliverables?: string[];
  oversightLead?: { name: string; role: string };
  paymentSchedule?: ContractPaymentMilestone[];
  auditTrail?: ContractAuditEvent[];
  amendments?: ContractAmendment[];
}

export interface WhistleblowerReport {
  id: string;
  category: string;
  description: string;
  anonymous: boolean;
  submittedAt: string;
  status: "received" | "under-review" | "resolved";
}

export type FFTier = "Seed" | "Growth" | "Scale" | "Global";

export interface FFDisclosure {
  id: string;
  entityName: string;
  tier: FFTier;
  revenueShare: string;
  adoptingNations: number;
  complianceScore: number;
  licenseType: string;
  lastAuditDate: string;
  nextAuditDate: string;
  status: "compliant" | "under-review" | "flagged";
}

export interface TransparencyStats {
  auditsPublished: number;
  budgetLinesOpen: number;
  votesLogged: number;
  aiDecisionsReviewed: number;
}
