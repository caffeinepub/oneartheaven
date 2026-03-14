import { ApprovalStatus } from "@/backend";

export type { ApprovalStatus };

export interface UserApplication {
  principalId: string;
  displayName: string;
  orgName: string;
  country: string;
  requestedRole: string;
  motivation: string;
  submittedAt: string;
  status: ApprovalStatus;
}

export interface ApprovalStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export const APPROVAL_STATUS_CONFIG: Record<
  ApprovalStatus,
  { label: string; color: string; badge: string }
> = {
  [ApprovalStatus.pending]: {
    label: "Pending",
    color: "oklch(0.75 0.15 70)",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  [ApprovalStatus.approved]: {
    label: "Approved",
    color: "oklch(0.72 0.16 160)",
    badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
  [ApprovalStatus.rejected]: {
    label: "Rejected",
    color: "oklch(0.65 0.18 27)",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
  },
};

export const SEED_APPLICATIONS: UserApplication[] = [
  {
    principalId: "2vxsx-fae",
    displayName: "Dr. Amara Osei",
    orgName: "African Climate Alliance",
    country: "Ghana",
    requestedRole: "Delegate",
    motivation:
      "I have spent 12 years working on climate adaptation policy across West Africa and believe ONEartHeaven™ can amplify grassroots solutions to global audiences. I want to bring local voices into the governance process.",
    submittedAt: "2026-03-01T08:30:00Z",
    status: ApprovalStatus.pending,
  },
  {
    principalId: "rdmx6-jaaaa-aaaaa-aaadq-cai",
    displayName: "Priya Ramachandran",
    orgName: "SustainTech Ventures India",
    country: "India",
    requestedRole: "Vendor",
    motivation:
      "Our company has developed micro-franchise models that have scaled clean energy access to over 200 rural communities. We want to list our FinFracFran™ franchise on the platform and connect with global capital.",
    submittedAt: "2026-03-03T14:15:00Z",
    status: ApprovalStatus.pending,
  },
  {
    principalId: "aaaaa-aa",
    displayName: "Lars Eriksson",
    orgName: "Nordic Peace Institute",
    country: "Sweden",
    requestedRole: "Delegate",
    motivation:
      "As a conflict resolution researcher and practitioner, I aim to contribute evidence-based peace frameworks to the resolution and policy advisor modules. Our institute has active programs in 14 countries.",
    submittedAt: "2026-03-05T11:00:00Z",
    status: ApprovalStatus.pending,
  },
  {
    principalId: "bbbbb-aa",
    displayName: "Sofia Mendes",
    orgName: "Favela Tech Cooperative",
    country: "Brazil",
    requestedRole: "Vendor",
    motivation:
      "We are a worker-owned tech cooperative building digital infrastructure for underserved communities in São Paulo. We need global partnership and capital access to scale our cooperative franchise model internationally.",
    submittedAt: "2026-03-07T16:45:00Z",
    status: ApprovalStatus.pending,
  },
  {
    principalId: "ccccc-aa",
    displayName: "Yusuf Al-Rashid",
    orgName: "Gulf Sustainability Council",
    country: "Jordan",
    requestedRole: "Observer",
    motivation:
      "Our council monitors environmental compliance across the MENA region. We would like observer access to the sustainability dashboard and transparency portal to benchmark against global standards.",
    submittedAt: "2026-03-10T09:20:00Z",
    status: ApprovalStatus.pending,
  },
];
