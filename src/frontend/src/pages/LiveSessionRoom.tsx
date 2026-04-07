import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AGENDA_STATUS_CONFIG,
  PARTICIPANT_ROLE_CONFIG,
  SESSION_STATUS_CONFIG,
  SESSION_TYPE_CONFIG,
} from "@/data/sessionTypes";
import {
  useLiveSession,
  useSessionChat,
  useSessionPolls,
} from "@/hooks/useLiveSession";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  Mic,
  MicOff,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Cosmos palette shortcuts ─────────────────────────────────────────────────
const C = {
  deep: "oklch(var(--cosmos-deep))",
  mid: "oklch(var(--cosmos-mid))",
  surface: "oklch(0.18 0.03 260)",
  border: "oklch(0.22 0.04 260)",
  borderActive: "oklch(0.28 0.03 260)",
  textPrimary: "oklch(0.92 0.02 260)",
  textSecondary: "oklch(0.68 0.03 260)",
  textTertiary: "oklch(0.55 0.03 260)",
  gold: "oklch(var(--gold))",
  green: "oklch(0.70 0.18 140)",
  cyan: "oklch(0.65 0.18 200)",
} as const;

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function LiveSessionRoomPage() {
  const { sessionId } = useParams({ from: "/sessions/$sessionId" });
  const {
    session,
    agendaItems,
    currentAgendaItem,
    participants,
    advanceAgendaItem,
    closeSession,
    sessionNotFound,
  } = useLiveSession(sessionId);
  const {
    activePoll: poll,
    hasVoted,
    castVote,
    getResults,
  } = useSessionPolls(sessionId);
  const { messages, sendMessage } = useSessionChat(sessionId);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  if (sessionNotFound || !session) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: C.deep }}
      >
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: C.textSecondary }}>
            Session not found.
          </p>
          <Link
            to="/sessions"
            className="font-semibold transition-colors"
            style={{ color: C.gold }}
          >
            Back to Sessions
          </Link>
        </div>
      </div>
    );
  }

  const statusCfg = SESSION_STATUS_CONFIG[session.status];
  const typeCfg = SESSION_TYPE_CONFIG[session.type];
  const completedItems = agendaItems.filter(
    (a) => a.status === "completed",
  ).length;
  const progressPct =
    agendaItems.length > 0
      ? Math.round((completedItems / agendaItems.length) * 100)
      : 0;

  function handleSendChat() {
    if (!chatInput.trim()) return;
    sendMessage(chatInput.trim());
    setChatInput("");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.deep }}>
      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div
        className="px-4 py-3 flex items-center gap-3 border-b"
        style={{ background: C.mid, borderColor: C.border }}
      >
        <Link
          to="/sessions"
          className="flex items-center gap-1 text-sm transition-colors"
          style={{ color: C.textSecondary }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = C.gold;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = C.textSecondary;
          }}
          data-ocid="sessions.room.back.link"
        >
          <ArrowLeft className="h-4 w-4" />
          Sessions
        </Link>
        <ChevronRight className="h-3 w-3" style={{ color: C.textTertiary }} />
        <span
          className="font-medium text-sm truncate flex-1"
          style={{ color: C.textPrimary }}
        >
          {session.title}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${statusCfg.bgColor} ${statusCfg.color}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotColor}`}
            />
            {statusCfg.label}
          </span>
          <span
            className="text-xs hidden sm:block"
            style={{ color: C.textTertiary }}
          >
            {typeCfg.icon} {typeCfg.label}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: C.textSecondary }}
          >
            <Users className="h-3.5 w-3.5" />
            {participants.length}
          </span>
        </div>
      </div>

      {/* ── Agenda Progress Bar ──────────────────────────────────────────── */}
      <div
        className="border-b px-4 py-2"
        style={{
          background: "oklch(var(--cosmos-mid) / 0.6)",
          borderColor: C.border,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: C.textTertiary }}>
            Agenda
          </span>
          <Progress value={progressPct} className="h-1.5 flex-1" />
          <span className="text-xs" style={{ color: C.textSecondary }}>
            {completedItems}/{agendaItems.length}
          </span>
        </div>
      </div>

      {/* ── Main 3-Col Layout ────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Agenda Panel */}
        <aside
          className="hidden lg:flex w-64 xl:w-72 flex-col border-r overflow-y-auto"
          style={{
            background: "oklch(var(--cosmos-mid) / 0.7)",
            borderColor: C.border,
          }}
        >
          <div className="p-4 border-b" style={{ borderColor: C.border }}>
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: C.textTertiary }}
            >
              Agenda
            </p>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2">
            {agendaItems.map((item, idx) => {
              const statusCfgItem = AGENDA_STATUS_CONFIG[item.status];
              const isActive = item.status === "active";
              return (
                <div
                  key={item.id}
                  className="rounded-lg p-3 border transition-all"
                  style={{
                    background: isActive
                      ? "oklch(0.70 0.18 140 / 0.10)"
                      : item.status === "completed"
                        ? "oklch(0.18 0.03 260 / 0.5)"
                        : "oklch(0.18 0.03 260 / 0.25)",
                    borderColor: isActive
                      ? "oklch(0.70 0.18 140 / 0.30)"
                      : item.status === "completed"
                        ? "oklch(0.22 0.04 260 / 0.4)"
                        : "oklch(0.22 0.04 260 / 0.25)",
                    opacity: item.status === "completed" ? 0.65 : 1,
                  }}
                  data-ocid={`sessions.agenda.item.${idx + 1}`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-xs font-bold mt-0.5 shrink-0 ${statusCfgItem.color}`}
                    >
                      {idx + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{
                          color: isActive ? C.green : C.textSecondary,
                        }}
                      >
                        {item.title}
                      </p>
                      {item.presenter && (
                        <p
                          className="text-xs mt-0.5 truncate"
                          style={{ color: C.textTertiary }}
                        >
                          {item.presenter}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${statusCfgItem.color}`}>
                          {statusCfgItem.label}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.42 0.03 260)" }}
                        >
                          {item.durationMinutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {session.status === "active" && (
            <div className="p-3 border-t" style={{ borderColor: C.border }}>
              <Button
                size="sm"
                className="w-full text-xs"
                style={{
                  background: C.surface,
                  color: C.textSecondary,
                  border: `1px solid ${C.borderActive}`,
                }}
                onClick={() => {
                  advanceAgendaItem();
                  toast.success("Moved to next agenda item");
                }}
                data-ocid="sessions.room.advance_agenda.button"
              >
                Next Item <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </aside>

        {/* Center: Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Active agenda item */}
          {session.status === "active" && currentAgendaItem && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-5 mb-6 border"
              style={{
                background: "oklch(var(--cosmos-mid) / 0.8)",
                borderColor: "oklch(0.70 0.18 140 / 0.25)",
              }}
              data-ocid="sessions.room.active_item.panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: C.green }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: C.green }}
                >
                  Now in Session
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: C.textPrimary }}
              >
                {currentAgendaItem.title}
              </h2>
              <p className="text-sm" style={{ color: C.textSecondary }}>
                {currentAgendaItem.description}
              </p>
              {currentAgendaItem.presenter && (
                <p className="text-xs mt-2" style={{ color: C.textTertiary }}>
                  Presenter:{" "}
                  <span style={{ color: C.textSecondary }}>
                    {currentAgendaItem.presenter}
                  </span>
                </p>
              )}
            </motion.div>
          )}

          {/* Scheduled placeholder */}
          {session.status === "scheduled" && (
            <div
              className="rounded-xl p-6 mb-6 text-center border"
              style={{
                background: "oklch(0.55 0.18 200 / 0.08)",
                borderColor: "oklch(0.55 0.18 200 / 0.20)",
              }}
            >
              <p
                className="font-semibold text-lg mb-1"
                style={{ color: C.cyan }}
              >
                Session Scheduled
              </p>
              <p className="text-sm" style={{ color: C.textSecondary }}>
                This session begins{" "}
                {new Date(session.scheduledAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {formatTime(session.scheduledAt)} UTC
              </p>
            </div>
          )}

          {/* Session outcome */}
          {session.outcome && (
            <div
              className="rounded-xl p-5 mb-6 border"
              style={{
                background: "oklch(var(--cosmos-mid) / 0.8)",
                borderColor: C.border,
              }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: "oklch(0.80 0.02 260)" }}
              >
                Session Outcome
              </h3>
              <p className="text-sm mb-3" style={{ color: C.textSecondary }}>
                {session.outcome.summary}
              </p>
              {session.outcome.actionItems.length > 0 && (
                <ul className="flex flex-col gap-1">
                  {session.outcome.actionItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: C.textSecondary }}
                    >
                      <span className="mt-0.5" style={{ color: C.gold }}>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Live Poll */}
          {poll && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-5 mb-6 border"
              style={{
                background: "oklch(var(--cosmos-mid) / 0.8)",
                borderColor: "oklch(var(--gold) / 0.25)",
              }}
              data-ocid="sessions.room.poll.panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: C.gold }}
                >
                  Live Poll
                </span>
              </div>
              <p
                className="font-medium mb-4"
                style={{ color: "oklch(0.80 0.02 260)" }}
              >
                {poll.question}
              </p>
              <div className="flex flex-col gap-2">
                {getResults(poll).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (!hasVoted) castVote(poll.id, opt.id);
                    }}
                    disabled={hasVoted}
                    className="relative flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all border"
                    style={{
                      background: hasVoted
                        ? "oklch(0.18 0.03 260 / 0.6)"
                        : "oklch(0.18 0.03 260 / 0.8)",
                      borderColor: hasVoted ? C.border : C.borderActive,
                      cursor: hasVoted ? "default" : "pointer",
                    }}
                    data-ocid={`sessions.room.poll.option.${opt.id}`}
                  >
                    <div
                      className="absolute inset-0 rounded-lg transition-all"
                      style={{
                        background: "oklch(var(--gold) / 0.10)",
                        width: `${opt.pct}%`,
                        opacity: hasVoted ? 1 : 0,
                      }}
                    />
                    <span
                      className="relative text-sm flex-1"
                      style={{ color: C.textSecondary }}
                    >
                      {opt.label}
                    </span>
                    {hasVoted && (
                      <span
                        className="relative text-xs font-bold"
                        style={{ color: C.gold }}
                      >
                        {opt.pct}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: C.textTertiary }}>
                {poll.totalVotes} votes cast
              </p>
            </motion.div>
          )}

          {session.status === "active" && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                style={{
                  borderColor: "oklch(0.55 0.22 27 / 0.35)",
                  color: "oklch(0.65 0.22 27)",
                }}
                onClick={() => {
                  closeSession();
                  toast.info("Session closed");
                }}
                data-ocid="sessions.room.close_session.button"
              >
                Close Session
              </Button>
            </div>
          )}
        </main>

        {/* Right: Participants */}
        <aside
          className="hidden xl:flex w-56 flex-col border-l overflow-y-auto"
          style={{
            background: "oklch(var(--cosmos-mid) / 0.7)",
            borderColor: C.border,
          }}
        >
          <div className="p-4 border-b" style={{ borderColor: C.border }}>
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: C.textTertiary }}
            >
              Participants ({participants.length})
            </p>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-1">
            {participants.map((p, idx) => {
              const roleCfg = PARTICIPANT_ROLE_CONFIG[p.role];
              return (
                <div
                  key={p.userId}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg transition-colors"
                  style={{ background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.18 0.03 260 / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                  data-ocid={`sessions.participants.item.${idx + 1}`}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: p.isActive ? C.green : "oklch(0.30 0.03 260)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: C.textSecondary }}
                    >
                      {p.displayName}
                    </p>
                    <p className={`text-xs ${roleCfg.color}`}>
                      {roleCfg.label}
                    </p>
                  </div>
                  {p.isMuted ? (
                    <MicOff
                      className="h-3 w-3 shrink-0"
                      style={{ color: "oklch(0.35 0.03 260)" }}
                    />
                  ) : (
                    <Mic
                      className="h-3 w-3 shrink-0"
                      style={{ color: C.green }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* ── Chat Drawer ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-80 flex flex-col z-40 top-16 border-l"
            style={{
              background: C.mid,
              borderColor: C.border,
            }}
            data-ocid="sessions.room.chat.panel"
          >
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: C.border }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: C.textPrimary }}
              >
                Session Chat
              </span>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="transition-colors"
                style={{ color: C.textTertiary }}
                data-ocid="sessions.room.chat.close_button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="text-xs"
                  style={
                    msg.type === "system"
                      ? {
                          color: "oklch(0.42 0.03 260)",
                          fontStyle: "italic",
                          textAlign: "center",
                        }
                      : {}
                  }
                >
                  {msg.type !== "system" && (
                    <span className="font-semibold" style={{ color: C.gold }}>
                      {msg.senderName}:{" "}
                    </span>
                  )}
                  <span style={{ color: C.textSecondary }}>{msg.body}</span>
                </div>
              ))}
            </div>
            <div
              className="p-3 border-t flex gap-2"
              style={{ borderColor: C.border }}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Type a message…"
                className="flex-1 rounded-lg px-3 py-1.5 text-xs focus:outline-none border"
                style={{
                  background: C.surface,
                  borderColor: C.border,
                  color: C.textPrimary,
                }}
                data-ocid="sessions.room.chat.input"
              />
              <Button
                size="sm"
                onClick={handleSendChat}
                className="text-xs"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(0.10 0.02 75)",
                }}
                data-ocid="sessions.room.chat.submit_button"
              >
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Chat Button ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-30 transition-colors"
        style={{
          background: "oklch(var(--gold))",
          color: "oklch(0.10 0.02 75)",
        }}
        data-ocid="sessions.room.chat_open.button"
      >
        <MessageSquare className="h-5 w-5" />
        {messages.length > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
            style={{ background: C.green }}
          >
            {messages.length > 9 ? "9+" : messages.length}
          </span>
        )}
      </button>
    </div>
  );
}
