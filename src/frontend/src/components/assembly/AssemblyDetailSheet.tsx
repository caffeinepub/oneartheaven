import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  COUNCILS,
  type Proposal,
  REGION_LABELS,
  STATUS_CONFIG,
} from "@/data/assemblyData";
import {
  Bot,
  Calendar,
  CheckCircle2,
  FileText,
  Globe2,
  MapPin,
  MessageSquare,
  MinusCircle,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Sentiment Icons ──────────────────────────────────────────────────────────

const SENTIMENT_CONFIG = {
  supportive: {
    icon: ThumbsUp,
    color: "oklch(0.68 0.2 145)",
    label: "Supportive",
  },
  critical: {
    icon: ThumbsDown,
    color: "oklch(0.62 0.22 25)",
    label: "Critical",
  },
  question: {
    icon: MessageSquare,
    color: "oklch(0.72 0.18 85)",
    label: "Question",
  },
  neutral: {
    icon: MinusCircle,
    color: "oklch(0.55 0.04 260)",
    label: "Neutral",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Proposal["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  );
}

function VoteBar({
  proposal,
  userVote,
  onVote,
}: {
  proposal: Proposal;
  userVote?: "for" | "against" | "abstain";
  onVote: (v: "for" | "against" | "abstain") => void;
}) {
  const { voteTally, status } = proposal;
  const total = voteTally.for + voteTally.against + voteTally.abstain;
  const pctFor = total > 0 ? Math.round((voteTally.for / total) * 100) : 0;
  const pctAgainst =
    total > 0 ? Math.round((voteTally.against / total) * 100) : 0;
  const pctAbstain =
    total > 0 ? Math.round((voteTally.abstain / total) * 100) : 0;
  const canVote = status === "voting" || status === "deliberating";
  const quorumReached = total >= voteTally.quorum;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "oklch(0.10 0.025 260)",
        border: "1px solid oklch(0.18 0.03 260)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-semibold"
          style={{ color: "oklch(0.80 0.03 260)" }}
        >
          Current Vote Tally
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "oklch(0.50 0.04 260)" }}>
            {total.toLocaleString()} votes
          </span>
          {quorumReached ? (
            <Badge
              className="text-xs"
              style={{
                background: "oklch(0.68 0.2 145 / 0.12)",
                border: "1px solid oklch(0.68 0.2 145 / 0.35)",
                color: "oklch(0.68 0.2 145)",
              }}
            >
              Quorum Met
            </Badge>
          ) : (
            <Badge
              className="text-xs"
              style={{
                background: "oklch(0.72 0.18 85 / 0.12)",
                border: "1px solid oklch(0.72 0.18 85 / 0.3)",
                color: "oklch(0.72 0.18 85)",
              }}
            >
              {total.toLocaleString()}/{voteTally.quorum.toLocaleString()}{" "}
              quorum
            </Badge>
          )}
        </div>
      </div>

      {total > 0 ? (
        <>
          {/* Stacked bar */}
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pctFor}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-l-full"
              style={{ background: "oklch(0.68 0.2 145)" }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pctAgainst}%` }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              style={{ background: "oklch(0.62 0.22 25)" }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pctAbstain}%` }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="rounded-r-full"
              style={{ background: "oklch(0.35 0.04 260)" }}
            />
          </div>
          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              {
                label: "For",
                pct: pctFor,
                count: voteTally.for,
                color: "oklch(0.68 0.2 145)",
              },
              {
                label: "Against",
                pct: pctAgainst,
                count: voteTally.against,
                color: "oklch(0.62 0.22 25)",
              },
              {
                label: "Abstain",
                pct: pctAbstain,
                count: voteTally.abstain,
                color: "oklch(0.42 0.04 260)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center p-2 rounded-lg"
                style={{ background: "oklch(0.13 0.025 260)" }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ color: item.color }}
                >
                  {item.pct}%
                </span>
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  {item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          {/* Threshold indicator */}
          <div className="mt-2">
            <div
              className="flex justify-between text-xs mb-1"
              style={{ color: "oklch(0.50 0.04 260)" }}
            >
              <span>Threshold required: {voteTally.threshold}%</span>
              <span
                style={{
                  color:
                    pctFor >= voteTally.threshold
                      ? "oklch(0.68 0.2 145)"
                      : "oklch(0.62 0.04 260)",
                }}
              >
                {pctFor >= voteTally.threshold
                  ? "Threshold reached"
                  : `${voteTally.threshold - pctFor}% to go`}
              </span>
            </div>
            <Progress
              value={pctFor}
              className="h-1.5"
              style={{ background: "oklch(0.18 0.03 260)" }}
            />
          </div>
        </>
      ) : (
        <p
          className="text-sm text-center py-3"
          style={{ color: "oklch(0.45 0.04 260)" }}
        >
          No votes cast yet — be the first.
        </p>
      )}

      {/* Vote buttons */}
      {canVote && (
        <div className="flex gap-2 mt-4">
          {(["for", "against", "abstain"] as const).map((v) => {
            const isActive = userVote === v;
            const colors = {
              for: "oklch(0.68 0.2 145)",
              against: "oklch(0.62 0.22 25)",
              abstain: "oklch(0.50 0.04 260)",
            };
            const labels = {
              for: "Vote For",
              against: "Vote Against",
              abstain: "Abstain",
            };
            const icons = {
              for: CheckCircle2,
              against: XCircle,
              abstain: MinusCircle,
            };
            const Icon = icons[v];
            return (
              <Button
                key={v}
                data-ocid={`assembly.detail.vote_${v}.button`}
                variant="outline"
                size="sm"
                onClick={() => onVote(v)}
                className="flex-1 gap-1.5 text-xs font-semibold transition-all duration-200"
                style={{
                  borderColor: isActive ? colors[v] : "oklch(0.22 0.04 260)",
                  color: isActive ? colors[v] : "oklch(0.55 0.04 260)",
                  background: isActive
                    ? `${colors[v].replace("oklch(", "oklch(").replace(")", " / 0.1)")}`
                    : "transparent",
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {labels[v]}
              </Button>
            );
          })}
        </div>
      )}
      {userVote && (
        <p
          className="text-xs text-center mt-2"
          style={{ color: "oklch(0.55 0.18 200)" }}
        >
          Your vote has been recorded.
        </p>
      )}
    </div>
  );
}

function AIPanel({ proposal }: { proposal: Proposal }) {
  const scoreColor =
    proposal.aiAlignmentScore >= 85
      ? "oklch(0.68 0.2 145)"
      : proposal.aiAlignmentScore >= 70
        ? "oklch(0.72 0.18 85)"
        : "oklch(0.62 0.22 25)";

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.10 0.03 220) 0%, oklch(0.09 0.025 260) 100%)",
        border: "1px solid oklch(0.55 0.18 200 / 0.2)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ background: "oklch(0.55 0.18 200 / 0.15)" }}
        >
          <Bot className="h-4 w-4" style={{ color: "oklch(0.55 0.18 200)" }} />
        </div>
        <span
          className="text-sm font-bold tracking-wide"
          style={{ color: "oklch(0.55 0.18 200)" }}
        >
          AI Policy Advisor
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs" style={{ color: "oklch(0.50 0.04 260)" }}>
            Charter Alignment
          </span>
          <span className="text-lg font-bold" style={{ color: scoreColor }}>
            {proposal.aiAlignmentScore}
          </span>
          <span className="text-xs" style={{ color: "oklch(0.50 0.04 260)" }}>
            /100
          </span>
        </div>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.68 0.04 260)" }}
      >
        {proposal.aiAnalysisSummary}
      </p>
      {proposal.finfracfranApplicable && (
        <div
          className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{
            background: "oklch(0.72 0.18 85 / 0.1)",
            border: "1px solid oklch(0.72 0.18 85 / 0.25)",
            color: "oklch(0.72 0.18 85)",
          }}
        >
          <Zap className="h-3.5 w-3.5" />
          FinFracFran™ applicable — fractionalization and franchise models
          available
        </div>
      )}
    </div>
  );
}

function DeliberationCard({
  entry,
  index,
}: {
  entry: Proposal["deliberations"][number];
  index: number;
}) {
  const sentCfg = SENTIMENT_CONFIG[entry.sentiment];
  const SentIcon = sentCfg.icon;

  return (
    <motion.div
      data-ocid={`assembly.deliberation.item.${index + 1}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="relative pl-4"
      style={{ borderLeft: `2px solid ${sentCfg.color}33` }}
    >
      {/* Author row */}
      <div className="flex items-start gap-2 mb-2">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-0.5 text-xs font-bold"
          style={{
            background: `${sentCfg.color.replace("oklch(", "oklch(").replace(")", " / 0.15)")}`,
            color: sentCfg.color,
          }}
        >
          {entry.authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.85 0.03 260)" }}
            >
              {entry.authorName}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                color: sentCfg.color,
                background: `${sentCfg.color.replace("oklch(", "oklch(").replace(")", " / 0.1)")}`,
              }}
            >
              <SentIcon className="h-2.5 w-2.5 inline mr-1" />
              {sentCfg.label}
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-xs mt-0.5"
            style={{ color: "oklch(0.45 0.04 260)" }}
          >
            <span>{entry.authorRole}</span>
            <span>·</span>
            <MapPin className="h-2.5 w-2.5" />
            <span>{REGION_LABELS[entry.authorRegion]}</span>
            <span>·</span>
            <Calendar className="h-2.5 w-2.5" />
            <span>{entry.timestamp}</span>
          </div>
        </div>
        <div
          className="flex items-center gap-1 shrink-0"
          style={{ color: "oklch(0.50 0.04 260)" }}
        >
          <ThumbsUp className="h-3 w-3" />
          <span className="text-xs">{entry.upvotes}</span>
        </div>
      </div>
      {/* Content */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.65 0.04 260)" }}
      >
        {entry.content}
      </p>
    </motion.div>
  );
}

// ─── Main Detail Sheet ────────────────────────────────────────────────────────

interface Props {
  proposal: Proposal | null;
  onClose: () => void;
  userVote?: "for" | "against" | "abstain";
  onVote: (vote: "for" | "against" | "abstain") => void;
}

export function AssemblyDetailSheet({
  proposal,
  onClose,
  userVote,
  onVote,
}: Props) {
  const council = proposal
    ? COUNCILS.find((c) => c.id === proposal.councilId)
    : null;

  return (
    <Sheet
      open={!!proposal}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        data-ocid="assembly.detail.sheet"
        side="right"
        className="w-full sm:max-w-2xl p-0 border-l"
        style={{
          background: "oklch(0.09 0.025 260)",
          borderColor: "oklch(0.18 0.03 260)",
        }}
      >
        <AnimatePresence mode="wait">
          {proposal && (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="h-full flex flex-col"
            >
              {/* Header */}
              <SheetHeader
                className="px-5 pt-5 pb-4 shrink-0"
                style={{ borderBottom: "1px solid oklch(0.16 0.03 260)" }}
              >
                {/* Council + status row */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {council && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        color: council.color,
                        background: `${council.color.replace("oklch(", "oklch(").replace(")", " / 0.12)")}`,
                        border: `1px solid ${council.color.replace("oklch(", "oklch(").replace(")", " / 0.28)")}`,
                      }}
                    >
                      {council.icon} {council.name}
                    </span>
                  )}
                  <StatusPill status={proposal.status} />
                  {proposal.finfracfranApplicable && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{
                        color: "oklch(0.72 0.18 85)",
                        background: "oklch(0.72 0.18 85 / 0.1)",
                        border: "1px solid oklch(0.72 0.18 85 / 0.25)",
                      }}
                    >
                      FinFracFran™
                    </span>
                  )}
                </div>

                <SheetTitle
                  className="font-display font-bold text-lg leading-snug text-left"
                  style={{ color: "oklch(0.92 0.02 260)" }}
                >
                  {proposal.title}
                </SheetTitle>

                {/* Meta row */}
                <div
                  className="flex items-center gap-4 flex-wrap mt-2 text-xs"
                  style={{ color: "oklch(0.48 0.04 260)" }}
                >
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {proposal.submittedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {REGION_LABELS[proposal.submitterRegion]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Submitted {proposal.submittedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe2 className="h-3 w-3" />
                    {proposal.regionTags
                      .map((r) => REGION_LABELS[r])
                      .join(", ")}
                  </span>
                </div>

                {/* Impact */}
                {proposal.estimatedImpact && (
                  <div
                    className="mt-3 flex items-start gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{
                      background: "oklch(0.55 0.18 200 / 0.08)",
                      border: "1px solid oklch(0.55 0.18 200 / 0.2)",
                    }}
                  >
                    <TrendingUp
                      className="h-3.5 w-3.5 shrink-0 mt-0.5"
                      style={{ color: "oklch(0.55 0.18 200)" }}
                    />
                    <span style={{ color: "oklch(0.68 0.04 260)" }}>
                      <span
                        className="font-semibold"
                        style={{ color: "oklch(0.55 0.18 200)" }}
                      >
                        Estimated impact:{" "}
                      </span>
                      {proposal.estimatedImpact}
                    </span>
                  </div>
                )}
              </SheetHeader>

              {/* Scrollable body */}
              <ScrollArea className="flex-1 overflow-auto">
                <div className="px-5 py-5 space-y-6">
                  {/* Full text */}
                  <section>
                    <h3
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: "oklch(0.50 0.04 260)" }}
                    >
                      Full Proposal
                    </h3>
                    <div
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: "oklch(0.72 0.04 260)" }}
                    >
                      {proposal.fullText.split(/\n/).map((line, i) => {
                        const lineKey = `line-${i}-${line.slice(0, 12)}`;
                        if (line.startsWith("## ")) {
                          return (
                            <h4
                              key={lineKey}
                              className="font-bold mt-4 mb-1 text-base"
                              style={{ color: "oklch(0.85 0.03 260)" }}
                            >
                              {line.replace("## ", "")}
                            </h4>
                          );
                        }
                        return (
                          <p
                            key={lineKey}
                            className={line === "" ? "mb-2" : "mb-1"}
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </section>

                  <Separator style={{ background: "oklch(0.16 0.03 260)" }} />

                  {/* Vote tally */}
                  <section>
                    <h3
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: "oklch(0.50 0.04 260)" }}
                    >
                      Vote
                    </h3>
                    <VoteBar
                      proposal={proposal}
                      userVote={userVote}
                      onVote={onVote}
                    />
                  </section>

                  <Separator style={{ background: "oklch(0.16 0.03 260)" }} />

                  {/* AI analysis */}
                  <section>
                    <h3
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: "oklch(0.50 0.04 260)" }}
                    >
                      AI Analysis
                    </h3>
                    <AIPanel proposal={proposal} />
                  </section>

                  <Separator style={{ background: "oklch(0.16 0.03 260)" }} />

                  {/* Deliberations */}
                  <section>
                    <h3
                      className="text-xs font-bold uppercase tracking-widest mb-4"
                      style={{ color: "oklch(0.50 0.04 260)" }}
                    >
                      Deliberations ({proposal.deliberations.length})
                    </h3>
                    <div className="space-y-5">
                      {proposal.deliberations.map((entry, idx) => (
                        <DeliberationCard
                          key={entry.id}
                          entry={entry}
                          index={idx}
                        />
                      ))}
                    </div>
                    {proposal.deliberations.length === 0 && (
                      <p
                        className="text-sm"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        No deliberations yet. Be the first to contribute.
                      </p>
                    )}
                  </section>

                  {/* Bottom padding */}
                  <div className="h-4" />
                </div>
              </ScrollArea>

              {/* Footer */}
              <div
                className="px-5 py-4 shrink-0 flex gap-3"
                style={{ borderTop: "1px solid oklch(0.16 0.03 260)" }}
              >
                <Button
                  data-ocid="assembly.detail.close.button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-[oklch(0.22_0.04_260)] text-[oklch(0.62_0.04_260)]"
                >
                  Close
                </Button>
                <Button
                  data-ocid="assembly.detail.deliberate.button"
                  className="flex-1 font-semibold gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.18 200) 0%, oklch(0.48 0.16 220) 100%)",
                    color: "oklch(0.96 0.01 260)",
                    border: "none",
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                  Add Deliberation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
