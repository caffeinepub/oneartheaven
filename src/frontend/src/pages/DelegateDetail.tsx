import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DELEGATES } from "@/data/delegateData";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Brain,
  Calendar,
  Globe2,
  Languages,
  Linkedin,
  Mail,
  Scale,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function aiScoreColor(score: number): string {
  if (score >= 95) return "oklch(0.68 0.2 145)";
  if (score >= 88) return "oklch(0.72 0.16 75)";
  if (score >= 78) return "oklch(0.55 0.18 200)";
  return "oklch(0.62 0.22 25)";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl p-6"
      style={{
        background: "oklch(0.11 0.04 260 / 0.95)",
        border: "1px solid oklch(0.22 0.04 260)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "oklch(0.72 0.16 75 / 0.1)",
            border: "1px solid oklch(0.72 0.16 75 / 0.25)",
          }}
        >
          <Icon className="h-4 w-4" style={{ color: "oklch(0.72 0.16 75)" }} />
        </div>
        <h2
          className="font-display font-semibold text-base"
          style={{ color: "oklch(var(--pearl))" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function DelegateDetailPage() {
  const { delegateId } = useParams({ strict: false }) as { delegateId: string };
  const delegate = DELEGATES.find((d) => d.id === delegateId);

  if (!delegate) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: "oklch(var(--cosmos-deep))" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          data-ocid="delegates.error_state"
        >
          <Sparkles
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: "oklch(0.72 0.16 75 / 0.3)" }}
          />
          <h1
            className="font-display text-3xl font-bold mb-3"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Delegate Not Found
          </h1>
          <p className="text-sm mb-8" style={{ color: "oklch(0.5 0.04 260)" }}>
            This delegate profile does not exist or has been removed.
          </p>
          <Link to="/delegates" data-ocid="delegates.back.link">
            <Button
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(0.72 0.16 75 / 0.3)",
                color: "oklch(0.72 0.16 75)",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Delegates
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  const scoreColor = aiScoreColor(delegate.aiAlignmentScore);
  const alignedPct = Math.round(
    (delegate.votingRecord.aligned / delegate.votingRecord.total) * 100,
  );
  const abstainedPct = Math.round(
    (delegate.votingRecord.abstained / delegate.votingRecord.total) * 100,
  );
  const opposedPct = Math.round(
    (delegate.votingRecord.opposed / delegate.votingRecord.total) * 100,
  );

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Background glows */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, oklch(0.72 0.16 75 / 0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link to="/delegates" data-ocid="delegates.back.link">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 -ml-2"
              style={{ color: "oklch(0.6 0.04 260)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Delegate Registry
            </Button>
          </Link>
        </motion.div>

        {/* ── Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-8 mb-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.05 260 / 0.95), oklch(0.1 0.04 260 / 0.95))",
            border: delegate.isChair
              ? "1.5px solid oklch(0.72 0.16 75 / 0.45)"
              : "1px solid oklch(0.22 0.04 260)",
            boxShadow: delegate.isChair
              ? "0 0 40px oklch(0.72 0.16 75 / 0.08), 0 20px 60px oklch(0.05 0.03 260 / 0.4)"
              : "0 20px 60px oklch(0.05 0.03 260 / 0.4)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Large avatar */}
            <div
              className="relative flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.16 75 / 0.2), oklch(0.55 0.14 195 / 0.15))",
                border: "3px solid oklch(0.72 0.16 75 / 0.35)",
                color: "oklch(var(--pearl))",
              }}
            >
              {getInitials(delegate.name)}
              <span className="absolute -bottom-1 -right-1 text-2xl leading-none">
                {delegate.regionFlag}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1
                  className="font-display font-bold text-2xl sm:text-3xl leading-tight"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  {delegate.name}
                </h1>
                {delegate.isChair && (
                  <Badge
                    style={{
                      background: "oklch(0.72 0.16 75 / 0.12)",
                      border: "1px solid oklch(0.72 0.16 75 / 0.4)",
                      color: "oklch(0.72 0.16 75)",
                    }}
                  >
                    ★ Chair
                  </Badge>
                )}
              </div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                {delegate.title}
              </p>
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(0.5 0.04 260)" }}
              >
                {delegate.affiliation}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.55 0.14 195 / 0.1)",
                    border: "1px solid oklch(0.55 0.14 195 / 0.25)",
                    color: "oklch(0.65 0.14 195)",
                  }}
                >
                  <Globe2 className="h-3 w-3" />
                  {delegate.region}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.72 0.16 75 / 0.08)",
                    border: "1px solid oklch(0.72 0.16 75 / 0.2)",
                    color: "oklch(0.72 0.16 75 / 0.8)",
                  }}
                >
                  <Calendar className="h-3 w-3" />
                  Joined {delegate.joinedYear}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: `${scoreColor}18`,
                    border: `1px solid ${scoreColor}40`,
                    color: scoreColor,
                  }}
                >
                  <Brain className="h-3 w-3" />
                  AI Score: {delegate.aiAlignmentScore}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column (main) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Bio */}
            <Section title="Biography" icon={Sparkles} delay={0.2}>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                {delegate.bio}
              </p>
            </Section>

            {/* Council Memberships */}
            <Section title="Council Memberships" icon={Shield} delay={0.3}>
              <div className="flex flex-col gap-3">
                {delegate.councilMemberships.map((c, i) => (
                  <Link
                    key={c.councilId}
                    to="/councils/$councilId"
                    params={{ councilId: c.councilId }}
                    data-ocid={`delegates.council.link.${i + 1}`}
                    className="group flex items-center justify-between p-3 rounded-xl transition-all duration-200"
                    style={{
                      background: "oklch(0.14 0.04 260)",
                      border: "1px solid oklch(0.24 0.04 260)",
                    }}
                  >
                    <div>
                      <p
                        className="text-sm font-semibold group-hover:text-[oklch(0.72_0.16_75)] transition-colors"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {c.councilName}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.5 0.04 260)" }}
                      >
                        {c.role} · since {c.since}
                      </p>
                    </div>
                    <Badge
                      className="text-xs"
                      style={{
                        background: c.role.includes("Chair")
                          ? "oklch(0.72 0.16 75 / 0.1)"
                          : "oklch(0.55 0.14 195 / 0.1)",
                        border: c.role.includes("Chair")
                          ? "1px solid oklch(0.72 0.16 75 / 0.3)"
                          : "1px solid oklch(0.55 0.14 195 / 0.3)",
                        color: c.role.includes("Chair")
                          ? "oklch(0.72 0.16 75)"
                          : "oklch(0.65 0.14 195)",
                      }}
                    >
                      {c.role}
                    </Badge>
                  </Link>
                ))}
              </div>
            </Section>

            {/* Voting Record */}
            <Section title="Voting Record" icon={Scale} delay={0.4}>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "oklch(0.68 0.2 145 / 0.08)",
                    border: "1px solid oklch(0.68 0.2 145 / 0.2)",
                  }}
                >
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color: "oklch(0.68 0.2 145)" }}
                  >
                    {alignedPct}%
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.5 0.04 260)" }}
                  >
                    Aligned
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "oklch(0.72 0.18 85 / 0.08)",
                    border: "1px solid oklch(0.72 0.18 85 / 0.2)",
                  }}
                >
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color: "oklch(0.72 0.18 85)" }}
                  >
                    {abstainedPct}%
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.5 0.04 260)" }}
                  >
                    Abstained
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "oklch(0.62 0.22 25 / 0.08)",
                    border: "1px solid oklch(0.62 0.22 25 / 0.2)",
                  }}
                >
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color: "oklch(0.62 0.22 25)" }}
                  >
                    {opposedPct}%
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.5 0.04 260)" }}
                  >
                    Opposed
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div
                    className="flex justify-between text-xs mb-1.5"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    <span>
                      Charter Aligned ({delegate.votingRecord.aligned} votes)
                    </span>
                    <span>{alignedPct}%</span>
                  </div>
                  <Progress
                    value={alignedPct}
                    className="h-2"
                    style={{ background: "oklch(0.18 0.03 260)" }}
                  />
                </div>
                <div>
                  <div
                    className="flex justify-between text-xs mb-1.5"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    <span>
                      Abstained ({delegate.votingRecord.abstained} votes)
                    </span>
                    <span>{abstainedPct}%</span>
                  </div>
                  <Progress
                    value={abstainedPct}
                    className="h-2"
                    style={{ background: "oklch(0.18 0.03 260)" }}
                  />
                </div>
                <div>
                  <div
                    className="flex justify-between text-xs mb-1.5"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    <span>Opposed ({delegate.votingRecord.opposed} votes)</span>
                    <span>{opposedPct}%</span>
                  </div>
                  <Progress
                    value={opposedPct}
                    className="h-2"
                    style={{ background: "oklch(0.18 0.03 260)" }}
                  />
                </div>
              </div>
              <p
                className="text-xs mt-4"
                style={{ color: "oklch(0.42 0.03 260)" }}
              >
                {delegate.votingRecord.total} total votes cast across all
                councils
              </p>
            </Section>
          </div>

          {/* Right column (sidebar) */}
          <div className="flex flex-col gap-5">
            {/* Expertise Tags */}
            <Section title="Expertise" icon={Brain} delay={0.25}>
              <div className="flex flex-wrap gap-2">
                {delegate.expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "oklch(0.72 0.16 75 / 0.08)",
                      border: "1px solid oklch(0.72 0.16 75 / 0.22)",
                      color: "oklch(0.72 0.16 75 / 0.9)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section title="Languages" icon={Languages} delay={0.32}>
              <div className="flex flex-wrap gap-2">
                {delegate.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{
                      background: "oklch(0.55 0.14 195 / 0.1)",
                      border: "1px solid oklch(0.55 0.14 195 / 0.25)",
                      color: "oklch(0.65 0.14 195)",
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Section>

            {/* FinFracFran™ role */}
            {delegate.finFracFranRole && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.2 145 / 0.07), oklch(0.72 0.16 75 / 0.05))",
                  border: "1px solid oklch(0.68 0.2 145 / 0.3)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "oklch(0.68 0.2 145 / 0.12)",
                      border: "1px solid oklch(0.68 0.2 145 / 0.3)",
                    }}
                  >
                    <Sparkles
                      className="h-4 w-4"
                      style={{ color: "oklch(0.68 0.2 145)" }}
                    />
                  </div>
                  <h2
                    className="font-display font-semibold text-sm"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    FinFracFran™ Role
                  </h2>
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.68 0.2 145)" }}
                >
                  {delegate.finFracFranRole}
                </p>
              </motion.div>
            )}

            {/* Contact */}
            {(delegate.contactEmail || delegate.linkedinUrl) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.11 0.04 260 / 0.95)",
                  border: "1px solid oklch(0.22 0.04 260)",
                }}
              >
                <h2
                  className="font-display font-semibold text-sm mb-4"
                  style={{ color: "oklch(var(--pearl))" }}
                >
                  Contact & Links
                </h2>
                <div className="flex flex-col gap-3">
                  {delegate.contactEmail && (
                    <a
                      data-ocid="delegates.contact.link"
                      href={`mailto:${delegate.contactEmail}`}
                      className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80"
                      style={{ color: "oklch(0.55 0.14 195)" }}
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      {delegate.contactEmail}
                    </a>
                  )}
                  {delegate.linkedinUrl && (
                    <>
                      {delegate.contactEmail && (
                        <Separator
                          style={{ background: "oklch(0.2 0.03 260)" }}
                        />
                      )}
                      <a
                        data-ocid="delegates.linkedin.link"
                        href={delegate.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80"
                        style={{ color: "oklch(0.72 0.16 75)" }}
                      >
                        <Linkedin className="h-4 w-4 flex-shrink-0" />
                        LinkedIn Profile
                      </a>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
