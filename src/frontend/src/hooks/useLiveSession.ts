import {
  getActiveSessions,
  getAllSessions,
  getArchivedSessions,
  getScheduledSessions,
  getSession,
} from "@/data/sessionData";
import type {
  AgendaItemStatus,
  LivePoll,
  SessionRecord,
} from "@/data/sessionTypes";
import { useCallback, useMemo, useState } from "react";

// ─── useLiveSession ────────────────────────────────────────────────────────

export function useLiveSession(sessionId: string) {
  const [session, setSession] = useState<SessionRecord | null>(
    () => getSession(sessionId) ?? null,
  );
  const [agendaItems, setAgendaItems] = useState(
    () => getSession(sessionId)?.agenda ?? [],
  );

  const currentAgendaItem = useMemo(
    () => agendaItems.find((a) => a.status === "active") ?? null,
    [agendaItems],
  );

  const participants = session?.participants ?? [];
  const activeParticipants = participants.filter((p) => p.isActive);
  const activePoll = session?.polls.find((p) => p.status === "active") ?? null;

  function advanceAgendaItem() {
    setAgendaItems((prev) => {
      const activeIdx = prev.findIndex((a) => a.status === "active");
      if (activeIdx === -1) {
        // Start first pending
        const firstPending = prev.findIndex((a) => a.status === "pending");
        if (firstPending === -1) return prev;
        return prev.map((a, i) =>
          i === firstPending
            ? { ...a, status: "active" as AgendaItemStatus }
            : a,
        );
      }
      return prev.map((a, i) => {
        if (i === activeIdx)
          return {
            ...a,
            status: "completed" as AgendaItemStatus,
            completedAt: new Date().toISOString(),
          };
        if (i === activeIdx + 1 && a.status === "pending")
          return {
            ...a,
            status: "active" as AgendaItemStatus,
            startedAt: new Date().toISOString(),
          };
        return a;
      });
    });
  }

  function closeSession() {
    setSession((prev) => (prev ? { ...prev, status: "closed" } : null));
  }

  const sessionNotFound = session === null;

  return {
    session,
    agendaItems,
    currentAgendaItem,
    participants,
    activeParticipants,
    activePoll,
    advanceAgendaItem,
    closeSession,
    sessionNotFound,
  };
}

// ─── useSessionPolls ────────────────────────────────────────────────────────

export function useSessionPolls(sessionId: string) {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const session = getSession(sessionId);
  const polls = session?.polls ?? [];

  const activePoll = polls.find((p) => p.status === "active") ?? null;
  const closedPolls = polls.filter((p) => p.status === "closed");

  function castVote(pollId: string, optionId: string) {
    setVotes((prev) => ({ ...prev, [pollId]: optionId }));
  }

  function getResults(poll: LivePoll) {
    return poll.options.map((opt) => ({
      ...opt,
      pct:
        poll.totalVotes > 0
          ? Math.round((opt.votes / poll.totalVotes) * 100)
          : 0,
    }));
  }

  const userVote = activePoll ? (votes[activePoll.id] ?? null) : null;
  const hasVoted = !!userVote;
  const timeRemaining = null; // Simulated — no real timer

  return {
    activePoll,
    closedPolls,
    userVote,
    castVote,
    getResults,
    hasVoted,
    timeRemaining,
  };
}

// ─── useSessionChat ────────────────────────────────────────────────────────

export function useSessionChat(sessionId: string) {
  const initial = getSession(sessionId)?.chat ?? [];
  const [messages, setMessages] = useState(initial);

  const sendMessage = useCallback(
    (body: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sessionId,
          senderId: "current-user",
          senderName: "You",
          senderOrg: "Your Organization",
          senderRole: "delegate" as const,
          type: "message" as const,
          body,
          sentAt: new Date().toISOString(),
          reactions: {},
          isFlagged: false,
        },
      ]);
    },
    [sessionId],
  );

  function reactToMessage(msgId: string, emoji: string) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? {
              ...m,
              reactions: {
                ...m.reactions,
                [emoji]: (m.reactions[emoji] ?? 0) + 1,
              },
            }
          : m,
      ),
    );
  }

  function moderationFlag(msgId: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, isFlagged: true } : m)),
    );
  }

  return {
    messages,
    sendMessage,
    reactToMessage,
    moderationFlag,
    messageCount: messages.length,
  };
}

// ─── useScheduledSessions ─────────────────────────────────────────────────

export function useScheduledSessions(councilId?: string) {
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());

  const scheduled = useMemo(() => {
    const all = getScheduledSessions();
    return councilId ? all.filter((s) => s.councilId === councilId) : all;
  }, [councilId]);

  const active = getActiveSessions();

  function toggleRSVP(sessionId: string) {
    setRsvps((prev) => {
      const next = new Set(prev);
      if (next.has(sessionId)) next.delete(sessionId);
      else next.add(sessionId);
      return next;
    });
  }

  return {
    scheduledSessions: scheduled,
    activeSessions: active,
    upcomingCount: scheduled.length,
    rsvpStatus: (id: string) => rsvps.has(id),
    toggleRSVP,
  };
}

// ─── useAllSessions ────────────────────────────────────────────────────────

export function useAllSessions() {
  const all = getAllSessions();
  const active = all.filter((s) => s.status === "active");
  const scheduled = all.filter((s) => s.status === "scheduled");
  const archived = getArchivedSessions();

  const byType = useMemo(
    () => ({
      "council-meeting": all.filter((s) => s.type === "council-meeting"),
      "assembly-plenary": all.filter((s) => s.type === "assembly-plenary"),
      "working-group": all.filter((s) => s.type === "working-group"),
      "public-hearing": all.filter((s) => s.type === "public-hearing"),
    }),
    [all],
  );

  return {
    all,
    active,
    scheduled,
    archived,
    totalCount: all.length,
    byType,
  };
}
