import { Badge } from "@/components/ui/badge";
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Session not found.</p>
          <Link to="/sessions" className="text-amber-400 hover:underline">
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
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center gap-3">
        <Link
          to="/sessions"
          className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors text-sm"
          data-ocid="sessions.room.back.link"
        >
          <ArrowLeft className="h-4 w-4" />
          Sessions
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-200 font-medium text-sm truncate flex-1">
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
          <span className="text-slate-500 text-xs hidden sm:block">
            {typeCfg.icon} {typeCfg.label}
          </span>
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Users className="h-3.5 w-3.5" />
            {participants.length}
          </span>
        </div>
      </div>

      {/* Agenda Progress Bar */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Agenda</span>
          <Progress value={progressPct} className="h-1.5 flex-1" />
          <span className="text-xs text-slate-400">
            {completedItems}/{agendaItems.length}
          </span>
        </div>
      </div>

      {/* Main 3-Col Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Agenda Panel */}
        <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-slate-900/60 border-r border-slate-800 overflow-y-auto">
          <div className="p-4 border-b border-slate-800">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
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
                  className={`rounded-lg p-3 border transition-all ${
                    isActive
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : item.status === "completed"
                        ? "bg-slate-800/40 border-slate-700/30 opacity-60"
                        : "bg-slate-800/20 border-slate-700/20"
                  }`}
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
                        className={`text-sm font-medium leading-snug ${isActive ? "text-emerald-300" : "text-slate-300"}`}
                      >
                        {item.title}
                      </p>
                      {item.presenter && (
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {item.presenter}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${statusCfgItem.color}`}>
                          {statusCfgItem.label}
                        </span>
                        <span className="text-xs text-slate-600">
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
            <div className="p-3 border-t border-slate-800">
              <Button
                size="sm"
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs"
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
          {session.status === "active" && currentAgendaItem && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/60 border border-emerald-500/20 rounded-xl p-5 mb-6"
              data-ocid="sessions.room.active_item.panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  Now in Session
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-1">
                {currentAgendaItem.title}
              </h2>
              <p className="text-slate-400 text-sm">
                {currentAgendaItem.description}
              </p>
              {currentAgendaItem.presenter && (
                <p className="text-xs text-slate-500 mt-2">
                  Presenter:{" "}
                  <span className="text-slate-300">
                    {currentAgendaItem.presenter}
                  </span>
                </p>
              )}
            </motion.div>
          )}

          {session.status === "scheduled" && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6 text-center">
              <p className="text-blue-300 font-semibold text-lg mb-1">
                Session Scheduled
              </p>
              <p className="text-slate-400 text-sm">
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

          {session.outcome && (
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 mb-6">
              <h3 className="text-slate-200 font-semibold mb-2">
                Session Outcome
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                {session.outcome.summary}
              </p>
              {session.outcome.actionItems.length > 0 && (
                <ul className="flex flex-col gap-1">
                  {session.outcome.actionItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-400"
                    >
                      <span className="text-amber-400 mt-0.5">•</span>
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
              className="bg-slate-800/60 border border-amber-500/20 rounded-xl p-5 mb-6"
              data-ocid="sessions.room.poll.panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  Live Poll
                </span>
              </div>
              <p className="text-slate-200 font-medium mb-4">{poll.question}</p>
              <div className="flex flex-col gap-2">
                {getResults(poll).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (!hasVoted) castVote(poll.id, opt.id);
                    }}
                    disabled={hasVoted}
                    className={`relative flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                      hasVoted
                        ? "border-slate-700 bg-slate-800/50 cursor-default"
                        : "border-slate-600 bg-slate-800/60 hover:border-amber-500/50 hover:bg-amber-500/5 cursor-pointer"
                    }`}
                    data-ocid={`sessions.room.poll.option.${opt.id}`}
                  >
                    <div
                      className="absolute inset-0 rounded-lg bg-amber-500/10 transition-all"
                      style={{
                        width: `${opt.pct}%`,
                        opacity: hasVoted ? 1 : 0,
                      }}
                    />
                    <span className="relative text-sm text-slate-300 flex-1">
                      {opt.label}
                    </span>
                    {hasVoted && (
                      <span className="relative text-xs text-amber-400 font-bold">
                        {opt.pct}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                {poll.totalVotes} votes cast
              </p>
            </motion.div>
          )}

          {session.status === "active" && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
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
        <aside className="hidden xl:flex w-56 flex-col bg-slate-900/60 border-l border-slate-800 overflow-y-auto">
          <div className="p-4 border-b border-slate-800">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Participants ({participants.length})
            </p>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2">
            {participants.map((p, idx) => {
              const roleCfg = PARTICIPANT_ROLE_CONFIG[p.role];
              return (
                <div
                  key={p.userId}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-800/40"
                  data-ocid={`sessions.participants.item.${idx + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${p.isActive ? "bg-emerald-400" : "bg-slate-600"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-300 truncate">
                      {p.displayName}
                    </p>
                    <p className={`text-xs ${roleCfg.color}`}>
                      {roleCfg.label}
                    </p>
                  </div>
                  {p.isMuted ? (
                    <MicOff className="h-3 w-3 text-slate-600 shrink-0" />
                  ) : (
                    <Mic className="h-3 w-3 text-emerald-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Chat Drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-700 flex flex-col z-40 top-16"
            data-ocid="sessions.room.chat.panel"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-sm font-semibold text-slate-200">
                Session Chat
              </span>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="text-slate-500 hover:text-slate-300"
                data-ocid="sessions.room.chat.close_button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`text-xs ${msg.type === "system" ? "text-slate-600 italic text-center" : ""}`}
                >
                  {msg.type !== "system" && (
                    <span className="font-semibold text-amber-400">
                      {msg.senderName}:{" "}
                    </span>
                  )}
                  <span className="text-slate-300">{msg.body}</span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-800 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Type a message…"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                data-ocid="sessions.room.chat.input"
              />
              <Button
                size="sm"
                onClick={handleSendChat}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs"
                data-ocid="sessions.room.chat.submit_button"
              >
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-amber-600 hover:bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg z-30 transition-colors"
        data-ocid="sessions.room.chat_open.button"
      >
        <MessageSquare className="h-5 w-5" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
            {messages.length > 9 ? "9+" : messages.length}
          </span>
        )}
      </button>
    </div>
  );
}
