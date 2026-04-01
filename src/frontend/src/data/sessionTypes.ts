// ─── Session Types ─────────────────────────────────────────────────────────

export type LiveSessionStatus =
  | "scheduled"
  | "active"
  | "paused"
  | "closed"
  | "archived";
export type SessionType =
  | "council-meeting"
  | "assembly-plenary"
  | "working-group"
  | "public-hearing";
export type AgendaItemStatus = "pending" | "active" | "completed" | "skipped";
export type PollStatus = "draft" | "active" | "closed";
export type ParticipantRole =
  | "chair"
  | "delegate"
  | "observer"
  | "presenter"
  | "moderator";
export type ChatMessageType = "message" | "system" | "reaction";

export interface SessionAgendaItem {
  id: string;
  title: string;
  description: string;
  presenter?: string;
  presenterOrg?: string;
  durationMinutes: number;
  status: AgendaItemStatus;
  linkedResolutionId?: string;
  linkedPortalId?: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
}

export interface SessionParticipant {
  userId: string;
  displayName: string;
  orgId: string;
  orgName: string;
  role: ParticipantRole;
  joinedAt: string;
  speakingTimeSeconds: number;
  votesCast: number;
  isActive: boolean;
  isMuted: boolean;
}

export interface LivePollOption {
  id: string;
  label: string;
  votes: number;
}

export interface LivePoll {
  id: string;
  sessionId: string;
  question: string;
  options: LivePollOption[];
  status: PollStatus;
  totalVotes: number;
  openedAt: string;
  closedAt?: string;
  allowMultiple?: boolean;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  senderOrg: string;
  senderRole: ParticipantRole;
  type: ChatMessageType;
  body: string;
  sentAt: string;
  reactions: Record<string, number>;
  isFlagged: boolean;
}

export interface SessionOutcome {
  summary: string;
  linkedResolutionIds: string[];
  actionItems: string[];
  nextSessionDate?: string;
  attendanceCount: number;
}

export interface SessionRecord {
  id: string;
  title: string;
  type: SessionType;
  status: LiveSessionStatus;
  councilId: string;
  councilName: string;
  scheduledAt: string;
  startedAt?: string;
  endedAt?: string;
  durationMinutes?: number;
  agenda: SessionAgendaItem[];
  participants: SessionParticipant[];
  polls: LivePoll[];
  chat: ChatMessage[];
  outcome?: SessionOutcome;
  streamUrl?: string;
  recordingUrl?: string;
  description?: string;
  maxParticipants?: number;
}

// ─── Config Constants ──────────────────────────────────────────────────────

export const SESSION_STATUS_CONFIG: Record<
  LiveSessionStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    dotColor: string;
  }
> = {
  scheduled: {
    label: "Scheduled",
    color: "text-blue-400",
    bgColor: "bg-blue-500/15 border-blue-500/30",
    dotColor: "bg-blue-400",
  },
  active: {
    label: "Live",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/15 border-emerald-500/30",
    dotColor: "bg-emerald-400 animate-pulse",
  },
  paused: {
    label: "Paused",
    color: "text-amber-400",
    bgColor: "bg-amber-500/15 border-amber-500/30",
    dotColor: "bg-amber-400",
  },
  closed: {
    label: "Closed",
    color: "text-slate-400",
    bgColor: "bg-slate-500/15 border-slate-500/30",
    dotColor: "bg-slate-400",
  },
  archived: {
    label: "Archived",
    color: "text-slate-500",
    bgColor: "bg-slate-700/30 border-slate-600/20",
    dotColor: "bg-slate-500",
  },
};

export const SESSION_TYPE_CONFIG: Record<
  SessionType,
  {
    label: string;
    icon: string;
    description: string;
    color: string;
  }
> = {
  "council-meeting": {
    label: "Council Meeting",
    icon: "🏛️",
    description: "Formal deliberations by a thematic council",
    color: "text-violet-400",
  },
  "assembly-plenary": {
    label: "Assembly Plenary",
    icon: "🌐",
    description: "Full assembly plenary session",
    color: "text-gold",
  },
  "working-group": {
    label: "Working Group",
    icon: "⚙️",
    description: "Focused working group session",
    color: "text-sky-400",
  },
  "public-hearing": {
    label: "Public Hearing",
    icon: "📣",
    description: "Open public hearing",
    color: "text-rose-400",
  },
};

export const PARTICIPANT_ROLE_CONFIG: Record<
  ParticipantRole,
  {
    label: string;
    color: string;
    canModerate: boolean;
    canAdvanceAgenda: boolean;
  }
> = {
  chair: {
    label: "Chair",
    color: "text-amber-400",
    canModerate: true,
    canAdvanceAgenda: true,
  },
  delegate: {
    label: "Delegate",
    color: "text-sky-400",
    canModerate: false,
    canAdvanceAgenda: false,
  },
  observer: {
    label: "Observer",
    color: "text-slate-400",
    canModerate: false,
    canAdvanceAgenda: false,
  },
  presenter: {
    label: "Presenter",
    color: "text-emerald-400",
    canModerate: false,
    canAdvanceAgenda: false,
  },
  moderator: {
    label: "Moderator",
    color: "text-violet-400",
    canModerate: true,
    canAdvanceAgenda: false,
  },
};

export const AGENDA_STATUS_CONFIG: Record<
  AgendaItemStatus,
  {
    label: string;
    color: string;
  }
> = {
  pending: { label: "Pending", color: "text-slate-500" },
  active: { label: "In Progress", color: "text-emerald-400" },
  completed: { label: "Completed", color: "text-sky-400" },
  skipped: { label: "Skipped", color: "text-amber-400" },
};

export const POLL_STATUS_CONFIG: Record<
  PollStatus,
  {
    label: string;
    color: string;
  }
> = {
  draft: { label: "Draft", color: "text-slate-500" },
  active: { label: "Open", color: "text-emerald-400" },
  closed: { label: "Closed", color: "text-slate-400" },
};
