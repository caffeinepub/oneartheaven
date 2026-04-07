import { Badge } from "@/components/ui/badge";
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

// ─── Cosmos palette shortcuts ────────────────────────────────────────────────
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
} as const;

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
    <div
      className="min-h-screen"
      style={{ background: C.deep }}
      data-ocid="sessions.page"
    >
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="relative border-b py-14 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(var(--cosmos-deep)) 0%, oklch(0.12 0.05 240) 50%, oklch(var(--cosmos-deep)) 100%)",
          borderColor: C.border,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: "oklch(0.55 0.18 280 / 0.15)",
                  borderColor: "oklch(0.55 0.18 280 / 0.3)",
                  color: "oklch(0.75 0.18 280)",
                }}
              >
                Phase 13 · Real-Time Collaboration
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                style={{
                  background: "oklch(0.70 0.18 140 / 0.15)",
                  borderColor: "oklch(0.70 0.18 140 / 0.3)",
                  color: "oklch(0.70 0.18 140)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "oklch(0.70 0.18 140)" }}
                />
                {active.length} Live Now
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl font-bold mb-3"
              style={{
                color: C.textPrimary,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Live Council Sessions
            </h1>
            <p
              className="text-lg max-w-2xl mb-8"
              style={{ color: C.textSecondary }}
            >
              Join live deliberations, cast votes, and shape decisions in real
              time across all councils and working groups.
            </p>

            {/* Stats Row */}
            <div
              className="flex flex-wrap gap-3"
              data-ocid="sessions.stats.row"
            >
              {/* Active */}
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-2 border"
                style={{
                  background: "oklch(0.70 0.18 140 / 0.10)",
                  borderColor: "oklch(0.70 0.18 140 / 0.25)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "oklch(0.70 0.18 140)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.75 0.18 140)" }}
                >
                  {active.length}
                </span>
                <span className="text-sm" style={{ color: C.textSecondary }}>
                  Active
                </span>
              </div>
              {/* Scheduled */}
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-2 border"
                style={{
                  background: "oklch(0.55 0.18 200 / 0.10)",
                  borderColor: "oklch(0.55 0.18 200 / 0.25)",
                }}
              >
                <CalendarClock
                  className="h-4 w-4"
                  style={{ color: "oklch(0.65 0.18 200)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.70 0.18 200)" }}
                >
                  {scheduled.length}
                </span>
                <span className="text-sm" style={{ color: C.textSecondary }}>
                  Scheduled
                </span>
              </div>
              {/* Archived */}
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-2 border"
                style={{
                  background: "oklch(0.18 0.03 260 / 0.6)",
                  borderColor: "oklch(0.22 0.04 260 / 0.5)",
                }}
              >
                <Archive
                  className="h-4 w-4"
                  style={{ color: C.textTertiary }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: C.textSecondary }}
                >
                  {archived.length}
                </span>
                <span className="text-sm" style={{ color: C.textTertiary }}>
                  Archived
                </span>
              </div>
              {/* Participants */}
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-2 border"
                style={{
                  background: "oklch(0.18 0.03 260 / 0.4)",
                  borderColor: "oklch(0.22 0.04 260 / 0.35)",
                }}
              >
                <Users className="h-4 w-4" style={{ color: C.textTertiary }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: C.textSecondary }}
                >
                  {all.reduce((n, s) => n + s.participants.length, 0)}
                </span>
                <span className="text-sm" style={{ color: C.textTertiary }}>
                  Total Participants
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
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
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.70 0.18 140)" }}
              >
                Live Now
              </span>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(0.70 0.18 140)" }}
              />
              <Badge
                className="text-xs border"
                style={{
                  background: "oklch(0.70 0.18 140 / 0.20)",
                  borderColor: "oklch(0.70 0.18 140 / 0.35)",
                  color: "oklch(0.80 0.18 140)",
                }}
              >
                {active.length}
              </Badge>
              <h2
                className="text-xl font-bold"
                style={{ color: C.textPrimary }}
              >
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
                    className="group rounded-xl overflow-hidden transition-all"
                    style={{
                      background: C.mid,
                      border: `1px solid ${C.border}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.70 0.18 140 / 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        C.border;
                    }}
                    data-ocid={`sessions.active.item.${idx + 1}`}
                  >
                    {/* Card Top */}
                    <div className="flex items-start justify-between p-4 pb-3">
                      <span
                        className="flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: C.textSecondary }}
                      >
                        <span>{typeCfg.icon}</span>
                        {typeCfg.label}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold border"
                        style={{
                          background: "oklch(0.70 0.18 140 / 0.15)",
                          borderColor: "oklch(0.70 0.18 140 / 0.35)",
                          color: "oklch(0.72 0.18 140)",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: "oklch(0.70 0.18 140)" }}
                        />
                        LIVE
                      </span>
                    </div>
                    <div className="px-4 pb-3">
                      <h3
                        className="font-bold text-base leading-snug mb-1"
                        style={{ color: C.textPrimary }}
                      >
                        {session.title}
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: C.textTertiary }}
                      >
                        {session.councilName}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs"
                          style={{ color: C.textTertiary }}
                        >
                          Item {completedItems + (activeItem ? 1 : 0)} of{" "}
                          {session.agenda.length}
                        </span>
                        {activeItem && (
                          <span
                            className="text-xs truncate max-w-[120px]"
                            style={{ color: "oklch(0.70 0.18 140)" }}
                          >
                            — {activeItem.title}
                          </span>
                        )}
                      </div>
                      <div
                        className="w-full rounded-full h-1.5 mb-3"
                        style={{ background: "oklch(0.22 0.04 260 / 0.7)" }}
                      >
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{
                            width: `${progressPct}%`,
                            background: "oklch(0.70 0.18 140)",
                          }}
                        />
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: C.textTertiary }}
                      >
                        <Users className="h-3.5 w-3.5" />
                        {session.participants.length} participants
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <Link
                        to="/sessions/$sessionId"
                        params={{ sessionId: session.id }}
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg font-semibold text-sm transition-colors"
                        style={{
                          background: "oklch(0.60 0.18 140 / 0.85)",
                          color: "oklch(0.08 0.02 140)",
                        }}
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
            <CalendarClock
              className="h-4 w-4"
              style={{ color: "oklch(0.65 0.18 200)" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.18 200)" }}
            >
              Upcoming
            </span>
            <h2 className="text-xl font-bold" style={{ color: C.textPrimary }}>
              Scheduled Sessions
            </h2>
          </div>

          {scheduled.length === 0 ? (
            <p
              className="text-sm"
              style={{ color: C.textTertiary }}
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
                    className="rounded-xl overflow-hidden transition-all"
                    style={{
                      background: C.mid,
                      border: `1px solid ${C.border}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.55 0.18 200 / 0.40)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        C.border;
                    }}
                    data-ocid={`sessions.scheduled.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between p-4 pb-3">
                      <span
                        className="flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: C.textSecondary }}
                      >
                        <span>{typeCfg.icon}</span>
                        {typeCfg.label}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border"
                        style={{
                          background: "oklch(0.55 0.18 200 / 0.15)",
                          borderColor: "oklch(0.55 0.18 200 / 0.30)",
                          color: "oklch(0.70 0.18 200)",
                        }}
                      >
                        Scheduled
                      </span>
                    </div>
                    <div className="px-4 pb-3">
                      <h3
                        className="font-bold text-base leading-snug mb-1"
                        style={{ color: C.textPrimary }}
                      >
                        {session.title}
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: C.textTertiary }}
                      >
                        {session.councilName}
                      </p>
                      <div
                        className="flex items-center gap-1.5 text-xs mb-2"
                        style={{ color: "oklch(0.70 0.18 200)" }}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {formatScheduledDate(session.scheduledAt)}
                      </div>
                      <p className="text-xs" style={{ color: C.textTertiary }}>
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
                        className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all border"
                        style={
                          isRsvpd
                            ? {
                                background: "oklch(0.60 0.18 140 / 0.85)",
                                color: "oklch(0.08 0.02 140)",
                                borderColor: "oklch(0.60 0.18 140)",
                              }
                            : {
                                background: "transparent",
                                color: C.textSecondary,
                                borderColor: C.borderActive,
                              }
                        }
                        data-ocid={`sessions.scheduled.rsvp.button.${idx + 1}`}
                      >
                        {isRsvpd ? "✓ RSVP'd" : "RSVP"}
                      </button>
                      <Link
                        to="/sessions/$sessionId"
                        params={{ sessionId: session.id }}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-all"
                        style={{
                          borderColor: C.borderActive,
                          color: C.textSecondary,
                        }}
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
            <Archive className="h-4 w-4" style={{ color: C.textTertiary }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: C.textTertiary }}
            >
              History
            </span>
            <h2 className="text-xl font-bold" style={{ color: C.textPrimary }}>
              Past Sessions
            </h2>
          </div>

          {archived.length === 0 ? (
            <p
              className="text-sm"
              style={{ color: C.textTertiary }}
              data-ocid="sessions.archived.empty_state"
            >
              No past sessions.
            </p>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${C.border}` }}
            >
              {archived.map((session, idx) => {
                const typeCfg = SESSION_TYPE_CONFIG[session.type];
                const summarySnippet =
                  session.outcome?.summary?.slice(0, 80) ??
                  "Session completed.";
                return (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 px-5 py-4 transition-colors"
                    style={{
                      background:
                        idx % 2 === 0
                          ? "oklch(var(--cosmos-deep) / 0.8)"
                          : "oklch(var(--cosmos-mid) / 0.5)",
                      borderBottom:
                        idx < archived.length - 1
                          ? `1px solid ${C.border}`
                          : "none",
                    }}
                    data-ocid={`sessions.archived.item.${idx + 1}`}
                  >
                    <span className="text-xl shrink-0">{typeCfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-sm truncate"
                        style={{ color: "oklch(0.80 0.02 260)" }}
                      >
                        {session.title}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: C.textTertiary }}
                      >
                        {session.councilName}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                      {session.durationMinutes && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs"
                          style={{
                            background: "oklch(0.18 0.03 260 / 0.6)",
                            borderColor: "oklch(0.22 0.04 260 / 0.5)",
                            color: C.textSecondary,
                          }}
                        >
                          <Clock className="h-3 w-3" />
                          {formatDuration(session.durationMinutes)}
                        </span>
                      )}
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.45 0.03 260)" }}
                      >
                        {new Date(session.scheduledAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                    <p
                      className="hidden lg:block text-xs max-w-xs truncate"
                      style={{ color: C.textTertiary }}
                    >
                      {summarySnippet}
                      {summarySnippet.length >= 80 ? "…" : ""}
                    </p>
                    <Link
                      to="/sessions/$sessionId"
                      params={{ sessionId: session.id }}
                      className="shrink-0 flex items-center gap-1 text-xs font-semibold transition-colors"
                      style={{ color: C.gold }}
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
            className="rounded-xl overflow-hidden"
            style={{
              background: C.mid,
              borderLeft: `4px solid ${C.gold}`,
              border: `1px solid ${C.border}`,
            }}
          >
            <div className="p-6">
              <div className="flex items-start gap-3 mb-2">
                <Radio
                  className="h-5 w-5 shrink-0 mt-0.5"
                  style={{ color: C.gold }}
                />
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: C.textPrimary }}
                  >
                    Chair &amp; Moderator Tools
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: C.textSecondary }}
                  >
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border cursor-not-allowed"
                      style={{
                        background: C.surface,
                        borderColor: C.border,
                        color: C.textTertiary,
                      }}
                      data-ocid={`sessions.chair_tools.${label.toLowerCase().replace(/ /g, "_")}.button`}
                    >
                      <Lock className="h-3 w-3" />
                      {label}
                      <span style={{ color: "oklch(0.42 0.03 260)" }}>
                        · Phase 13
                      </span>
                    </button>
                  ),
                )}
              </div>
              <p className="text-xs" style={{ color: "oklch(0.42 0.03 260)" }}>
                Contact your council admin to request chair access.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
