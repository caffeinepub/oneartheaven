// ---------------------------------------------------------------------------
// useNotifications — Notification & Communication Hub Hooks (Phase 13, Area 6)
// ---------------------------------------------------------------------------

import { useCallback, useMemo, useState } from "react";
import {
  SEED_THREADS,
  getActiveThreads,
  getAllNotifications,
  getMessagesByThread,
  getNotificationsByOrg,
} from "../data/notificationData";
import type {
  DirectMessage,
  MessageFilter,
  MessageThread,
  Notification,
  NotificationFilter,
  NotificationStatus,
} from "../data/notificationTypes";
import { NOTIFICATIONS_PER_PAGE } from "../data/notificationTypes";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ---------------------------------------------------------------------------
// useNotifications
// ---------------------------------------------------------------------------

export function useNotifications(orgId?: string) {
  const baseList = useMemo(
    () =>
      (orgId ? getNotificationsByOrg(orgId) : getAllNotifications()).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [orgId],
  );

  const [statuses, setStatuses] = useState<Record<string, NotificationStatus>>(
    {},
  );
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<NotificationFilter>({ status: "all" });
  const [page, setPage] = useState(1);

  // inline to keep deps readable
  const getEffectiveStatus = useCallback(
    (n: Notification): NotificationStatus => statuses[n.id] ?? n.status,
    [statuses],
  );

  const filtered = useMemo(() => {
    return baseList.filter((n) => {
      if (dismissed.has(n.id)) return false;
      const st = getEffectiveStatus(n);
      if (filter.status && filter.status !== "all" && st !== filter.status)
        return false;
      if (filter.type && filter.type !== "all" && n.type !== filter.type)
        return false;
      if (
        filter.priority &&
        filter.priority !== "all" &&
        n.priority !== filter.priority
      )
        return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        if (
          !n.title.toLowerCase().includes(q) &&
          !n.body.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [baseList, getEffectiveStatus, dismissed, filter]);

  const paginated = useMemo(
    () => filtered.slice(0, page * NOTIFICATIONS_PER_PAGE),
    [filtered, page],
  );

  const unreadCount = useMemo(
    () =>
      baseList.filter(
        (n) => !dismissed.has(n.id) && getEffectiveStatus(n) === "unread",
      ).length,
    [baseList, getEffectiveStatus, dismissed],
  );

  const urgentCount = useMemo(
    () =>
      baseList.filter(
        (n) =>
          !dismissed.has(n.id) &&
          getEffectiveStatus(n) === "unread" &&
          n.priority === "urgent",
      ).length,
    [baseList, getEffectiveStatus, dismissed],
  );

  const markRead = useCallback((id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "read" }));
  }, []);

  const markAllRead = useCallback(() => {
    setStatuses((prev) => {
      const updates: Record<string, NotificationStatus> = { ...prev };
      for (const n of baseList) {
        updates[n.id] = "read";
      }
      return updates;
    });
  }, [baseList]);

  const dismiss = useCallback((id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
  }, []);

  const loadMore = useCallback(() => setPage((p) => p + 1), []);

  const notificationsWithMeta = useMemo(
    () =>
      paginated.map((n) => ({
        ...n,
        status: getEffectiveStatus(n),
        relativeTime: relativeTime(n.createdAt),
      })),
    [paginated, getEffectiveStatus],
  );

  return {
    notifications: notificationsWithMeta,
    unreadCount,
    urgentCount,
    filter,
    updateFilter: (updates: Partial<NotificationFilter>) =>
      setFilter((prev) => ({ ...prev, ...updates })),
    resetFilter: () => setFilter({ status: "all" }),
    markRead,
    markAllRead,
    dismiss,
    loadMore,
    hasMore: filtered.length > page * NOTIFICATIONS_PER_PAGE,
    total: filtered.length,
  };
}

// ---------------------------------------------------------------------------
// useNotificationBadge
// ---------------------------------------------------------------------------

export function useNotificationBadge(orgId?: string) {
  const base = useMemo(
    () =>
      (orgId ? getNotificationsByOrg(orgId) : getAllNotifications()).filter(
        (n) => n.status === "unread",
      ),
    [orgId],
  );

  const [localStatuses] = useState<Record<string, NotificationStatus>>({});

  const unreadCount = base.filter(
    (n) => (localStatuses[n.id] ?? n.status) === "unread",
  ).length;
  const urgentCount = base.filter(
    (n) =>
      (localStatuses[n.id] ?? n.status) === "unread" && n.priority === "urgent",
  ).length;

  return {
    unreadCount,
    urgentCount,
    hasUrgent: urgentCount > 0,
    displayCount: unreadCount > 99 ? "99+" : String(unreadCount),
  };
}

// ---------------------------------------------------------------------------
// useMessages
// ---------------------------------------------------------------------------

export function useMessages(userId?: string) {
  const allThreads = useMemo(() => getActiveThreads(), []);
  const [threadFilter, setThreadFilter] = useState<MessageFilter>({
    archived: false,
  });
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<
    Record<string, DirectMessage[]>
  >({});
  const [isSending, setIsSending] = useState(false);
  const [newMessageBody, setNewMessageBody] = useState("");
  const [pinnedOverride, setPinnedOverride] = useState<Set<string>>(new Set());
  const [archivedOverride, setArchivedOverride] = useState<Set<string>>(
    new Set(),
  );
  const [unreadOverride, setUnreadOverride] = useState<Record<string, number>>(
    {},
  );

  const threads = useMemo(() => {
    let list: MessageThread[] = allThreads.filter((t) => {
      if (archivedOverride.has(t.id)) return false;
      if (threadFilter.archived === false && t.isArchived) return false;
      if (
        threadFilter.threadType &&
        threadFilter.threadType !== "all" &&
        t.type !== threadFilter.threadType
      )
        return false;
      if (threadFilter.search) {
        const q = threadFilter.search.toLowerCase();
        const nameMatch = t.name?.toLowerCase().includes(q);
        const participantMatch = t.participants.some(
          (p) =>
            p.name.toLowerCase().includes(q) || p.org.toLowerCase().includes(q),
        );
        if (!nameMatch && !participantMatch) return false;
      }
      return true;
    });
    list = list.map((t) => ({
      ...t,
      isPinned: pinnedOverride.has(t.id) ? !t.isPinned : t.isPinned,
      unreadCount: unreadOverride[t.id] ?? t.unreadCount,
    }));
    list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return list;
  }, [
    allThreads,
    threadFilter,
    pinnedOverride,
    archivedOverride,
    unreadOverride,
  ]);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) ?? null,
    [threads, activeThreadId],
  );

  const getThreadMessages = useCallback(
    (threadId: string): DirectMessage[] => {
      const seed = getMessagesByThread(threadId);
      const local = localMessages[threadId] ?? [];
      return [...seed, ...local].sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
      );
    },
    [localMessages],
  );

  const activeMessages = useMemo(
    () =>
      activeThreadId
        ? getThreadMessages(activeThreadId).map((m) => ({
            ...m,
            relativeTime: relativeTime(m.sentAt),
            isMine: m.fromId === (userId ?? "user-org1"),
          }))
        : [],
    [activeThreadId, getThreadMessages, userId],
  );

  const totalUnreadThreads = useMemo(
    () =>
      threads.filter((t) => (unreadOverride[t.id] ?? t.unreadCount) > 0).length,
    [threads, unreadOverride],
  );

  const selectThread = useCallback((threadId: string) => {
    setActiveThreadId(threadId);
    setUnreadOverride((prev) => ({ ...prev, [threadId]: 0 }));
  }, []);

  const sendMessage = useCallback(
    async (threadId: string, body: string) => {
      if (!body.trim()) return;
      setIsSending(true);
      await new Promise((r) => setTimeout(r, 400));
      const newMsg: DirectMessage = {
        id: `msg-local-${Date.now()}`,
        threadId,
        fromId: userId ?? "user-org1",
        fromName: "You",
        fromOrg: "Your Organization",
        body,
        sentAt: new Date().toISOString(),
        status: "sent",
        reactions: [],
      };
      setLocalMessages((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] ?? []), newMsg],
      }));
      setNewMessageBody("");
      setIsSending(false);
    },
    [userId],
  );

  const archiveThread = useCallback((threadId: string) => {
    setArchivedOverride((prev) => new Set([...prev, threadId]));
    setActiveThreadId((prev) => (prev === threadId ? null : prev));
  }, []);

  const pinThread = useCallback((threadId: string) => {
    setPinnedOverride((prev) => {
      const next = new Set(prev);
      if (next.has(threadId)) next.delete(threadId);
      else next.add(threadId);
      return next;
    });
  }, []);

  return {
    threads,
    activeThread,
    activeMessages,
    totalUnreadThreads,
    selectThread,
    sendMessage,
    archiveThread,
    pinThread,
    updateFilter: (updates: Partial<MessageFilter>) =>
      setThreadFilter((prev) => ({ ...prev, ...updates })),
    getThreadMessages,
    isSending,
    newMessageBody,
    setNewMessageBody,
  };
}

// ---------------------------------------------------------------------------
// useAllThreads (simple wrapper for Messages page)
// ---------------------------------------------------------------------------
export function useAllThreads() {
  return SEED_THREADS;
}
