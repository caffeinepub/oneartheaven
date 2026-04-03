// ---------------------------------------------------------------------------
// Notification & Communication Hub — Types (Phase 13, Area 6)
// ---------------------------------------------------------------------------

export type NotificationType =
  | "resolution_passed"
  | "vote_requested"
  | "session_scheduled"
  | "approval_required"
  | "vendor_approved"
  | "payout_processed"
  | "impact_milestone"
  | "ai_insight_ready"
  | "system_alert"
  | "message_received"
  | "tour_available"
  | "subscription_alert"
  | "partner_joined"
  | "sdg_threshold";

export type NotificationPriority = "low" | "medium" | "high" | "urgent";
export type NotificationStatus = "unread" | "read" | "dismissed" | "actioned";
export type MessageStatus = "sent" | "delivered" | "read";
export type ThreadType = "direct" | "group" | "announcement";

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  body: string;
  recipientId: string;
  orgId: string;
  actionRoute?: string;
  actionLabel?: string;
  sourceId?: string;
  sourceType?: string;
  meta?: Record<string, string | number | boolean>;
  createdAt: string;
  readAt?: string;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  userIds: string[];
}

export interface DirectMessage {
  id: string;
  threadId: string;
  fromId: string;
  fromName: string;
  fromOrg: string;
  body: string;
  sentAt: string;
  status: MessageStatus;
  reactions: MessageReaction[];
  isSystemMessage?: boolean;
}

export interface ThreadParticipant {
  userId: string;
  name: string;
  org: string;
  role: string;
  lastReadAt?: string;
}

export interface MessageThread {
  id: string;
  type: ThreadType;
  name?: string;
  participants: ThreadParticipant[];
  lastMessage?: DirectMessage;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationFilter {
  status?: NotificationStatus | "all";
  type?: NotificationType | "all";
  priority?: NotificationPriority | "all";
  orgId?: string;
  search?: string;
}

export interface MessageFilter {
  threadType?: ThreadType | "all";
  search?: string;
  archived?: boolean;
  pinned?: boolean;
}

export interface NotificationTypeConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  defaultRoute?: string;
}

export const NOTIFICATION_TYPE_CONFIG: Record<
  NotificationType,
  NotificationTypeConfig
> = {
  resolution_passed: {
    label: "Resolution Passed",
    icon: "\u2696\ufe0f",
    color: "oklch(0.72 0.18 145)",
    bgColor: "oklch(0.72 0.18 145 / 0.12)",
    borderColor: "oklch(0.72 0.18 145 / 0.3)",
    defaultRoute: "/resolutions",
  },
  vote_requested: {
    label: "Vote Requested",
    icon: "U0001f5f3\ufe0f",
    color: "oklch(0.78 0.18 55)",
    bgColor: "oklch(0.78 0.18 55 / 0.12)",
    borderColor: "oklch(0.78 0.18 55 / 0.3)",
    defaultRoute: "/governance",
  },
  session_scheduled: {
    label: "Session Scheduled",
    icon: "U0001f4c5",
    color: "oklch(0.72 0.16 240)",
    bgColor: "oklch(0.72 0.16 240 / 0.12)",
    borderColor: "oklch(0.72 0.16 240 / 0.3)",
    defaultRoute: "/sessions",
  },
  approval_required: {
    label: "Approval Required",
    icon: "U0001f514",
    color: "oklch(0.75 0.2 30)",
    bgColor: "oklch(0.75 0.2 30 / 0.12)",
    borderColor: "oklch(0.75 0.2 30 / 0.3)",
    defaultRoute: "/admin/approvals",
  },
  vendor_approved: {
    label: "Vendor Approved",
    icon: "U0001f3ea",
    color: "oklch(0.72 0.18 145)",
    bgColor: "oklch(0.72 0.18 145 / 0.12)",
    borderColor: "oklch(0.72 0.18 145 / 0.3)",
    defaultRoute: "/vendor/dashboard",
  },
  payout_processed: {
    label: "Payout Processed",
    icon: "U0001f4b0",
    color: "oklch(0.78 0.18 75)",
    bgColor: "oklch(0.78 0.18 75 / 0.12)",
    borderColor: "oklch(0.78 0.18 75 / 0.3)",
    defaultRoute: "/vendor/dashboard",
  },
  impact_milestone: {
    label: "Impact Milestone",
    icon: "U0001f30d",
    color: "oklch(0.72 0.18 145)",
    bgColor: "oklch(0.72 0.18 145 / 0.12)",
    borderColor: "oklch(0.72 0.18 145 / 0.3)",
    defaultRoute: "/impact",
  },
  ai_insight_ready: {
    label: "AI Insight Ready",
    icon: "U0001f916",
    color: "oklch(0.72 0.18 290)",
    bgColor: "oklch(0.72 0.18 290 / 0.12)",
    borderColor: "oklch(0.72 0.18 290 / 0.3)",
    defaultRoute: "/policy-advisor",
  },
  system_alert: {
    label: "System Alert",
    icon: "\u26a0\ufe0f",
    color: "oklch(0.75 0.2 30)",
    bgColor: "oklch(0.75 0.2 30 / 0.12)",
    borderColor: "oklch(0.75 0.2 30 / 0.3)",
  },
  message_received: {
    label: "Message Received",
    icon: "U0001f4ac",
    color: "oklch(0.72 0.16 200)",
    bgColor: "oklch(0.72 0.16 200 / 0.12)",
    borderColor: "oklch(0.72 0.16 200 / 0.3)",
    defaultRoute: "/messages",
  },
  tour_available: {
    label: "Tour Available",
    icon: "U0001f5fa\ufe0f",
    color: "oklch(0.72 0.16 240)",
    bgColor: "oklch(0.72 0.16 240 / 0.12)",
    borderColor: "oklch(0.72 0.16 240 / 0.3)",
  },
  subscription_alert: {
    label: "Subscription Alert",
    icon: "U0001f4b3",
    color: "oklch(0.75 0.2 30)",
    bgColor: "oklch(0.75 0.2 30 / 0.12)",
    borderColor: "oklch(0.75 0.2 30 / 0.3)",
    defaultRoute: "/admin/subscription",
  },
  partner_joined: {
    label: "Partner Joined",
    icon: "U0001f91d",
    color: "oklch(0.78 0.18 75)",
    bgColor: "oklch(0.78 0.18 75 / 0.12)",
    borderColor: "oklch(0.78 0.18 75 / 0.3)",
  },
  sdg_threshold: {
    label: "SDG Threshold Reached",
    icon: "U0001f3af",
    color: "oklch(0.72 0.18 145)",
    bgColor: "oklch(0.72 0.18 145 / 0.12)",
    borderColor: "oklch(0.72 0.18 145 / 0.3)",
    defaultRoute: "/impact",
  },
};

export const NOTIFICATION_PRIORITY_CONFIG: Record<
  NotificationPriority,
  { label: string; color: string }
> = {
  low: { label: "Low", color: "oklch(0.55 0.02 260)" },
  medium: { label: "Medium", color: "oklch(0.72 0.16 240)" },
  high: { label: "High", color: "oklch(0.78 0.18 55)" },
  urgent: { label: "Urgent", color: "oklch(0.65 0.22 27)" },
};

export const THREAD_TYPE_CONFIG: Record<
  ThreadType,
  { label: string; icon: string; color: string }
> = {
  direct: {
    label: "Direct Message",
    icon: "U0001f4ac",
    color: "oklch(0.72 0.16 200)",
  },
  group: { label: "Group", icon: "U0001f465", color: "oklch(0.72 0.16 240)" },
  announcement: {
    label: "Announcement",
    icon: "U0001f4e2",
    color: "oklch(0.78 0.18 75)",
  },
};

export const NOTIFICATION_STORAGE_KEY = "oeh_notifications";
export const MESSAGE_STORAGE_KEY = "oeh_messages";
export const NOTIFICATIONS_PER_PAGE = 20;
