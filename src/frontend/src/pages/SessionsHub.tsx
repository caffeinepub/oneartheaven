import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SESSION_TYPE_CONFIG } from "@/data/sessionTypes";
import { useAllSessions, useScheduledSessions } from "@/hooks/useLiveSession";
import { Link } from "@tanstack/react-router";
import {
  Archive,
  CalendarClock,
  ChevronRight,
  Clock,
  Lock,
  Radio,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

function formatScheduledDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function SessionsHubPage() {
  const { all, active, scheduled, archived } = useAllSessions();
  const { rsvpStatus, toggleRSVP } = useScheduledSessions();

  return (
    <div className="min-h-screen bg-slate-950" data-ocid="sessions.page">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/15 border border-violet-500/30 text-violet-300">
                Phase 13 · Real-Time Collaboration
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {active.length} Live Now
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-slate-100 mb-3"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Live Council Sessions
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-8">
              Join live deliberations, cast votes, and shape decisions in real
              time across all councils and working groups.
            </p>
            {/* Stats Row */}
            <div
              className="flex flex-wrap gap-3"
              data-ocid="sessions.stats.row"
            >
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300">
                  {active.length}
                </span>
                <span className="text-sm text-slate-400">Active</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
                <CalendarClock className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">
                  {scheduled.length}
                </span>
                <span className="text-sm text-slate-400">Scheduled</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-700/40 border border-slate-700/30 rounded-lg px-4 py-2">
                <Archive className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-400">
                  {archived.length}
                </span>
                <span className="text-sm text-slate-500">Archived</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-700/30 border border-slate-700/20 rounded-lg px-4 py-2">
                <Users className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-400">
                  {all.reduce((n, s) => n + s.participants.length, 0)}
                </span>
                <span className="text-sm text-slate-500">
                  Total Participants
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-12">
        {/* Active Sessions */}
        {active.length > 0 && (
          <section data-ocid="sessions.active.section">
            <div
              className="flex items-center gap-3 mb-5"
              style={{
                borderLeft: "4px solid oklch(0.72 0.19 148)",
                paddingLeft: 14,
              }}
            >
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Live Now
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                {active.length}
              </Badge>
              <h2 className="text-xl font-bold text-slate-100">
                Active Sessions
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {active.map((session, idx) => {
                const typeCfg = SESSION_TYPE_CONFIG[session.type];
                const completedItems = session.agenda.filter(
                  (a) => a.status === "completed",
                ).length;
                const activeItem = session.agenda.find(
                  (a) => a.status === "active",
                );
                const progressPct =
                  session.agenda.length > 0
                    ? Math.round((completedItems / session.agenda.length) * 100)
                    : 0;
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="group bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all"
                    data-ocid={`sessions.active.item.${idx + 1}`}
                  >
                    {/* Card Top */}
                    <div className="flex items-start justify-between p-4 pb-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <span>{typeCfg.icon}</span>
                        {typeCfg.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    </div>
                    <div className="px-4 pb-3">
                      <h3 className="font-bold text-slate-100 text-base leading-snug mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        {session.councilName}
                      </p>
                      {/* Agenda Progress */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-500">
                          Item {completedItems + (activeItem ? 1 : 0)} of{" "}
                          {session.agenda.length}
                        </span>
                        {activeItem && (
                          <span className="text-xs text-emerald-400 truncate max-w-[120px]">
                            — {activeItem.title}
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-3">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users className="h-3.5 w-3.5" />
                        {session.participants.length} participants
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <Link
                        to="/sessions/$sessionId"
                        params={{ sessionId: session.id }}
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-slate-950 font-semibold text-sm transition-colors"
                        data-ocid={`sessions.active.join.button.${idx + 1}`}
                      >
                        Join Session <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Scheduled Sessions */}
        <section data-ocid="sessions.scheduled.section">
          <div
            className="flex items-center gap-3 mb-5"
            style={{
              borderLeft: "4px solid oklch(0.65 0.18 250)",
              paddingLeft: 14,
            }}
          >
            <CalendarClock className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Upcoming
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              Scheduled Sessions
            </h2>
          </div>
          {scheduled.length === 0 ? (
            <p
              className="text-slate-500 text-sm"
              data-ocid="sessions.scheduled.empty_state"
            >
              No scheduled sessions at this time.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduled.map((session, idx) => {
                const typeCfg = SESSION_TYPE_CONFIG[session.type];
                const isRsvpd = rsvpStatus(session.id);
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/30 hover:bg-slate-800/80 transition-all"
                    data-ocid={`sessions.scheduled.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between p-4 pb-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <span>{typeCfg.icon}</span>
                        {typeCfg.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-300">
                        Scheduled
                      </span>
                    </div>
                    <div className="px-4 pb-3">
                      <h3 className="font-bold text-slate-100 text-base leading-snug mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        {session.councilName}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-blue-300 mb-2">
                        <Clock className="h-3.5 w-3.5" />
                        {formatScheduledDate(session.scheduledAt)}
                      </div>
                      <p className="text-xs text-slate-500">
                        {session.agenda.length} agenda items
                      </p>
                    </div>
                    <div className="px-4 pb-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          toggleRSVP(session.id);
                          toast.success(
                            isRsvpd ? "RSVP removed" : "RSVP confirmed!",
                          );
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all border ${
                          isRsvpd
                            ? "bg-emerald-600/80 hover:bg-emerald-600 text-slate-950 border-emerald-600"
                            : "bg-transparent hover:bg-slate-700/50 text-slate-300 border-slate-600"
                        }`}
                        data-ocid={`sessions.scheduled.rsvp.button.${idx + 1}`}
                      >
                        {isRsvpd ? "✓ RSVP'd" : "RSVP"}
                      </button>
                      <Link
                        to="/sessions/$sessionId"
                        params={{ sessionId: session.id }}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 text-sm transition-all"
                        data-ocid={`sessions.scheduled.view.link.${idx + 1}`}
                      >
                        View <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Past Sessions */}
        <section data-ocid="sessions.archived.section">
          <div
            className="flex items-center gap-3 mb-5"
            style={{
              borderLeft: "4px solid oklch(0.50 0.03 260)",
              paddingLeft: 14,
            }}
          >
            <Archive className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              History
            </span>
            <h2 className="text-xl font-bold text-slate-100">Past Sessions</h2>
          </div>
          {archived.length === 0 ? (
            <p
              className="text-slate-500 text-sm"
              data-ocid="sessions.archived.empty_state"
            >
              No past sessions.
            </p>
          ) : (
            <div className="rounded-xl border border-slate-800 overflow-hidden">
              {archived.map((session, idx) => {
                const typeCfg = SESSION_TYPE_CONFIG[session.type];
                const summarySnippet =
                  session.outcome?.summary?.slice(0, 80) ??
                  "Session completed.";
                return (
                  <div
                    key={session.id}
                    className={`flex items-center gap-4 px-5 py-4 ${
                      idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-800/30"
                    } hover:bg-slate-800/60 transition-colors border-b border-slate-800/50 last:border-0`}
                    data-ocid={`sessions.archived.item.${idx + 1}`}
                  >
                    <span className="text-xl shrink-0">{typeCfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-200 text-sm truncate">
                        {session.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {session.councilName}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                      {session.durationMinutes && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-700/60 border border-slate-700/40 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {formatDuration(session.durationMinutes)}
                        </span>
                      )}
                      <span className="text-xs text-slate-600">
                        {new Date(session.scheduledAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                    <p className="hidden lg:block text-xs text-slate-500 max-w-xs truncate">
                      {summarySnippet}
                      {summarySnippet.length >= 80 ? "…" : ""}
                    </p>
                    <Link
                      to="/sessions/$sessionId"
                      params={{ sessionId: session.id }}
                      className="shrink-0 flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                      data-ocid={`sessions.archived.view.link.${idx + 1}`}
                    >
                      View <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Chair Tools */}
        <section data-ocid="sessions.chair_tools.section">
          <div
            className="rounded-xl bg-slate-900/60 border border-slate-700 overflow-hidden"
            style={{ borderLeft: "4px solid oklch(var(--gold))" }}
          >
            <div className="p-6">
              <div className="flex items-start gap-3 mb-2">
                <Radio className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-100 text-lg">
                    Chair &amp; Moderator Tools
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Council chairs and moderators can create sessions, set
                    agendas, and invite participants.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 mb-5">
                {["Create Session", "Set Agenda", "Invite Participants"].map(
                  (label) => (
                    <button
                      key={label}
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-700 text-slate-500 bg-slate-800/40 cursor-not-allowed"
                      data-ocid={`sessions.chair_tools.${label.toLowerCase().replace(/ /g, "_")}.button`}
                    >
                      <Lock className="h-3 w-3" />
                      {label}
                      <span className="text-slate-600">· Phase 13</span>
                    </button>
                  ),
                )}
              </div>
              <p className="text-xs text-slate-600">
                Contact your council admin to request chair access.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
