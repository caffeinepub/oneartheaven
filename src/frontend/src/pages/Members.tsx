import { MemberRegion, MemberStatus, MemberType } from "@/backend.d";
import type { MemberEntity } from "@/backend.d";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useApplyForMembership,
  useGetMembers,
  useRemoveMember,
  useUpdateMemberStatus,
} from "@/hooks/useMembers";
import {
  AlertCircle,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Search,
  Shield,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Type Helpers ─────────────────────────────────────────────────────────────

type FilterType = MemberType | "all";
type FilterStatus = MemberStatus | "all";
type FilterRegion = MemberRegion | "all";

// ─── Constants ────────────────────────────────────────────────────────────────

const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  [MemberType.nation]: "Nation",
  [MemberType.city]: "City",
  [MemberType.ngo]: "NGO",
  [MemberType.community]: "Community",
  [MemberType.corporate]: "Corporate",
  [MemberType.cooperative]: "Cooperative",
  [MemberType.individual]: "Individual",
};

const MEMBER_TYPE_COLORS: Record<
  MemberType,
  { bg: string; text: string; border: string }
> = {
  [MemberType.nation]: {
    bg: "oklch(0.55 0.14 195 / 0.15)",
    text: "oklch(0.72 0.16 190)",
    border: "oklch(0.55 0.14 195 / 0.35)",
  },
  [MemberType.city]: {
    bg: "oklch(0.5 0.15 260 / 0.15)",
    text: "oklch(0.7 0.18 255)",
    border: "oklch(0.5 0.15 260 / 0.35)",
  },
  [MemberType.ngo]: {
    bg: "oklch(0.55 0.18 290 / 0.15)",
    text: "oklch(0.72 0.2 285)",
    border: "oklch(0.55 0.18 290 / 0.35)",
  },
  [MemberType.community]: {
    bg: "oklch(0.55 0.16 145 / 0.15)",
    text: "oklch(0.72 0.18 140)",
    border: "oklch(0.55 0.16 145 / 0.35)",
  },
  [MemberType.corporate]: {
    bg: "oklch(0.6 0.18 40 / 0.15)",
    text: "oklch(0.75 0.2 38)",
    border: "oklch(0.6 0.18 40 / 0.35)",
  },
  [MemberType.cooperative]: {
    bg: "oklch(0.65 0.16 75 / 0.15)",
    text: "oklch(0.78 0.18 72)",
    border: "oklch(0.65 0.16 75 / 0.35)",
  },
  [MemberType.individual]: {
    bg: "oklch(0.6 0.18 340 / 0.15)",
    text: "oklch(0.75 0.2 340)",
    border: "oklch(0.6 0.18 340 / 0.35)",
  },
};

const STATUS_COLORS: Record<
  MemberStatus,
  { bg: string; text: string; dot: string }
> = {
  [MemberStatus.active]: {
    bg: "oklch(0.55 0.16 145 / 0.15)",
    text: "oklch(0.72 0.18 140)",
    dot: "oklch(0.72 0.18 140)",
  },
  [MemberStatus.observer]: {
    bg: "oklch(0.65 0.16 75 / 0.12)",
    text: "oklch(0.78 0.18 72)",
    dot: "oklch(0.78 0.18 72)",
  },
  [MemberStatus.applicant]: {
    bg: "oklch(0.4 0.04 260 / 0.3)",
    text: "oklch(0.65 0.04 260)",
    dot: "oklch(0.55 0.04 260)",
  },
  [MemberStatus.suspended]: {
    bg: "oklch(0.55 0.2 27 / 0.15)",
    text: "oklch(0.68 0.22 27)",
    dot: "oklch(0.68 0.22 27)",
  },
};

const REGION_LABELS: Record<MemberRegion, string> = {
  [MemberRegion.africa]: "Africa",
  [MemberRegion.asiaPacific]: "Asia-Pacific",
  [MemberRegion.europe]: "Europe",
  [MemberRegion.latinAmerica]: "Latin America",
  [MemberRegion.middleEast]: "Middle East",
  [MemberRegion.northAmerica]: "North America",
  [MemberRegion.global]: "Global",
};

const REGION_EMOJIS: Record<MemberRegion, string> = {
  [MemberRegion.africa]: "🌍",
  [MemberRegion.asiaPacific]: "🌏",
  [MemberRegion.europe]: "🇪🇺",
  [MemberRegion.latinAmerica]: "🌎",
  [MemberRegion.middleEast]: "🌙",
  [MemberRegion.northAmerica]: "🦅",
  [MemberRegion.global]: "🌐",
};

const MEMBER_TYPES: MemberType[] = [
  MemberType.nation,
  MemberType.city,
  MemberType.ngo,
  MemberType.community,
  MemberType.corporate,
  MemberType.cooperative,
  MemberType.individual,
];

const MEMBER_STATUSES: MemberStatus[] = [
  MemberStatus.active,
  MemberStatus.observer,
  MemberStatus.applicant,
  MemberStatus.suspended,
];

const MEMBER_REGIONS: MemberRegion[] = [
  MemberRegion.africa,
  MemberRegion.asiaPacific,
  MemberRegion.europe,
  MemberRegion.latinAmerica,
  MemberRegion.middleEast,
  MemberRegion.northAmerica,
  MemberRegion.global,
];

// ─── Membership Tiers ────────────────────────────────────────────────────────

const MEMBERSHIP_TIERS = [
  {
    icon: Shield,
    title: "Nation / State",
    subtitle: "Sovereign entities",
    description:
      "Full voting rights on all resolutions. Eligible for Founding Council seats. Direct participation in Global Assembly deliberations.",
    color: "var(--teal)",
    colorBright: "var(--teal-bright)",
  },
  {
    icon: Building2,
    title: "City & Region",
    subtitle: "Urban & regional nodes",
    description:
      "Implementation-focused membership. Cities are the engines of change — local pilots that prove what works before global scaling.",
    color: "0.5 0.15 260",
    colorBright: "0.7 0.18 255",
  },
  {
    icon: Globe,
    title: "Organization",
    subtitle: "NGOs, corporates & co-ops",
    description:
      "Sector expertise and operational capacity. Organizations bring resources, networks, and specialized knowledge to the platform.",
    color: "0.55 0.18 290",
    colorBright: "0.72 0.2 285",
  },
  {
    icon: Star,
    title: "Individual",
    subtitle: "Citizens & innovators",
    description:
      "Grassroots voice and direct participation. Every human being has a place at the table — activists, researchers, entrepreneurs, dreamers.",
    color: "var(--gold)",
    colorBright: "var(--gold-bright)",
  },
];

// ─── Apply Form State ─────────────────────────────────────────────────────────

interface ApplyFormData {
  name: string;
  memberType: MemberType | "";
  region: MemberRegion | "";
  country: string;
  description: string;
  languages: string;
  website: string;
  contactEmail: string;
}

const EMPTY_FORM: ApplyFormData = {
  name: "",
  memberType: "",
  region: "",
  country: "",
  description: "",
  languages: "",
  website: "",
  contactEmail: "",
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

function MemberTypeBadge({ type }: { type: MemberType }) {
  const colors = MEMBER_TYPE_COLORS[type];
  return (
    <span
      className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {MEMBER_TYPE_LABELS[type]}
    </span>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const colors = STATUS_COLORS[status];
  const label =
    status === MemberStatus.active
      ? "Active"
      : status === MemberStatus.observer
        ? "Observer"
        : status === MemberStatus.applicant
          ? "Applicant"
          : "Suspended";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full"
      style={{ background: colors.bg, color: colors.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: colors.dot }}
      />
      {label}
    </span>
  );
}

// ─── Member Card ─────────────────────────────────────────────────────────────

function MemberCard({
  member,
  index,
  onViewDetails,
}: {
  member: MemberEntity;
  index: number;
  onViewDetails: (m: MemberEntity) => void;
}) {
  const typeColors = MEMBER_TYPE_COLORS[member.memberType];

  return (
    <motion.article
      data-ocid={`members.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.36) }}
      className="cosmos-card rounded-2xl p-5 flex flex-col gap-3 group cursor-pointer hover:border-[oklch(var(--gold)/0.5)] transition-all duration-300"
      onClick={() => onViewDetails(member)}
      style={{
        borderLeft: `3px solid ${typeColors.border}`,
      }}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <MemberTypeBadge type={member.memberType} />
          <h3
            className="font-display font-bold text-base leading-snug line-clamp-2 group-hover:text-[oklch(var(--gold))] transition-colors"
            style={{ color: "oklch(var(--pearl))" }}
          >
            {member.name}
          </h3>
        </div>
        <StatusBadge status={member.status} />
      </div>

      {/* Location */}
      <div
        className="flex items-center gap-1.5 text-xs"
        style={{ color: "oklch(0.6 0.04 260)" }}
      >
        <MapPin className="h-3 w-3 shrink-0" />
        <span className="truncate">
          {member.country} · {REGION_EMOJIS[member.region]}{" "}
          {REGION_LABELS[member.region]}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed line-clamp-2 flex-1"
        style={{ color: "oklch(0.62 0.04 260)" }}
      >
        {member.description}
      </p>

      {/* Languages */}
      {member.languages.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {member.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded"
              style={{
                background: "oklch(var(--cosmos-surface))",
                color: "oklch(0.55 0.04 260)",
                border: "1px solid oklch(var(--gold-dim) / 0.2)",
              }}
            >
              {lang}
            </span>
          ))}
          {member.languages.length > 3 && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{ color: "oklch(0.45 0.04 260)" }}
            >
              +{member.languages.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer Row */}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "oklch(var(--gold-dim) / 0.15)" }}
      >
        <span className="text-[11px]" style={{ color: "oklch(0.45 0.04 260)" }}>
          Member since {member.joinedDate.split("-")[0]}
        </span>
        <Button
          variant="ghost"
          size="sm"
          data-ocid={`members.item.${index + 1}.button`}
          className="h-7 px-2 text-xs gap-1"
          style={{ color: "oklch(var(--gold))" }}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(member);
          }}
        >
          View
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.article>
  );
}

// ─── Member Detail Sheet ─────────────────────────────────────────────────────

function MemberDetailSheet({
  member,
  isAdmin,
  open,
  onClose,
}: {
  member: MemberEntity | null;
  isAdmin: boolean;
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateMemberStatus();
  const { mutate: removeMember, isPending: isRemoving } = useRemoveMember();

  if (!member) return null;

  function handleApprove() {
    if (!member) return;
    updateStatus(
      { id: member.id, status: MemberStatus.active },
      {
        onSuccess: () =>
          toast.success(`${member.name} approved as active member.`),
        onError: () => toast.error("Failed to update status."),
      },
    );
  }

  function handleSuspend() {
    if (!member) return;
    updateStatus(
      { id: member.id, status: MemberStatus.suspended },
      {
        onSuccess: () => toast.warning(`${member.name} has been suspended.`),
        onError: () => toast.error("Failed to update status."),
      },
    );
  }

  function handleRemove() {
    if (!member) return;
    removeMember(member.id, {
      onSuccess: () => {
        toast.success(`${member.name} has been removed.`);
        onClose();
      },
      onError: () => toast.error("Failed to remove member."),
    });
  }

  const typeColors = MEMBER_TYPE_COLORS[member.memberType];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        data-ocid="members.detail.sheet"
        className="w-full sm:max-w-lg overflow-y-auto"
        style={{
          background: "oklch(var(--cosmos-deep))",
          borderLeft: "1px solid oklch(var(--gold) / 0.2)",
        }}
      >
        <SheetHeader className="mb-6">
          <div className="flex items-start gap-3 mb-3">
            {/* Type icon */}
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{
                background: typeColors.bg,
                border: `1px solid ${typeColors.border}`,
              }}
            >
              {REGION_EMOJIS[member.region]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <MemberTypeBadge type={member.memberType} />
                <StatusBadge status={member.status} />
              </div>
              <SheetTitle
                className="font-display text-xl font-bold leading-snug"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {member.name}
              </SheetTitle>
            </div>
          </div>
          <SheetDescription
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            {member.description}
          </SheetDescription>
        </SheetHeader>

        {/* Details */}
        <div className="space-y-4">
          {/* Location */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(var(--gold-dim) / 0.15)",
            }}
          >
            <h4
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold-dim))" }}
            >
              Location
            </h4>
            <div className="flex items-center gap-2">
              <MapPin
                className="h-4 w-4 shrink-0"
                style={{ color: "oklch(var(--teal))" }}
              />
              <span
                className="text-sm"
                style={{ color: "oklch(0.8 0.03 260)" }}
              >
                {member.country} · {REGION_EMOJIS[member.region]}{" "}
                {REGION_LABELS[member.region]}
              </span>
            </div>
          </div>

          {/* Languages */}
          {member.languages.length > 0 && (
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: "oklch(var(--cosmos-mid))",
                border: "1px solid oklch(var(--gold-dim) / 0.15)",
              }}
            >
              <h4
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "oklch(var(--gold-dim))" }}
              >
                Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-xs font-mono uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(var(--cosmos-surface))",
                      color: "oklch(0.7 0.06 260)",
                      border: "1px solid oklch(var(--gold-dim) / 0.25)",
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Links */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(var(--gold-dim) / 0.15)",
            }}
          >
            <h4
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "oklch(var(--gold-dim))" }}
            >
              Contact & Links
            </h4>
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
                style={{ color: "oklch(var(--teal-bright))" }}
                data-ocid="members.detail.link"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                {member.website}
              </a>
            )}
            {member.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  {member.contactEmail}
                </span>
              </div>
            )}
          </div>

          {/* Membership Info */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(var(--gold-dim) / 0.15)",
            }}
          >
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "oklch(var(--gold-dim))" }}
            >
              Membership
            </h4>
            <div className="flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                Member since
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: "oklch(0.75 0.03 260)" }}
              >
                {member.joinedDate}
              </span>
            </div>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: "oklch(0.55 0.2 27 / 0.07)",
                border: "1px solid oklch(0.55 0.2 27 / 0.2)",
              }}
            >
              <h4
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "oklch(0.68 0.22 27)" }}
              >
                Admin Controls
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={handleApprove}
                  disabled={isUpdating || member.status === MemberStatus.active}
                  data-ocid="members.detail.confirm_button"
                  className="h-8 text-xs gap-1.5"
                  style={{
                    background: "oklch(0.55 0.16 145 / 0.2)",
                    border: "1px solid oklch(0.55 0.16 145 / 0.4)",
                    color: "oklch(0.72 0.18 140)",
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  onClick={handleSuspend}
                  disabled={
                    isUpdating || member.status === MemberStatus.suspended
                  }
                  data-ocid="members.detail.secondary_button"
                  className="h-8 text-xs gap-1.5"
                  style={{
                    background: "oklch(0.65 0.16 75 / 0.15)",
                    border: "1px solid oklch(0.65 0.16 75 / 0.35)",
                    color: "oklch(0.78 0.18 72)",
                  }}
                >
                  Suspend
                </Button>
                <Button
                  size="sm"
                  onClick={handleRemove}
                  disabled={isRemoving}
                  data-ocid="members.detail.delete_button"
                  className="h-8 text-xs gap-1.5"
                  style={{
                    background: "oklch(0.55 0.2 27 / 0.15)",
                    border: "1px solid oklch(0.55 0.2 27 / 0.35)",
                    color: "oklch(0.68 0.22 27)",
                  }}
                >
                  {isRemoving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : null}
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Apply Modal ──────────────────────────────────────────────────────────────

function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { isLoginSuccess, identity, login } = useInternetIdentity();
  const { mutate: applyForMembership, isPending } = useApplyForMembership();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplyFormData>(EMPTY_FORM);
  const [confirmed, setConfirmed] = useState(false);

  const isConnected = isLoginSuccess && !!identity;

  function update(field: keyof ApplyFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleClose() {
    setStep(1);
    setForm(EMPTY_FORM);
    setConfirmed(false);
    onClose();
  }

  function handleSubmit() {
    if (!form.memberType || !form.region) return;
    applyForMembership(
      {
        name: form.name,
        memberType: form.memberType as MemberType,
        region: form.region as MemberRegion,
        country: form.country,
        description: form.description,
        languages: form.languages
          .split(",")
          .map((l) => l.trim().toLowerCase())
          .filter(Boolean),
        website: form.website,
        contactEmail: form.contactEmail,
      },
      {
        onSuccess: () => {
          toast.success(
            "Application submitted! Your membership is under review.",
            {
              duration: 5000,
            },
          );
          handleClose();
        },
        onError: (err) => {
          toast.error("Submission failed. Please try again.", {
            description: err instanceof Error ? err.message : undefined,
          });
        },
      },
    );
  }

  const step1Valid =
    form.name.trim() && form.memberType && form.region && form.country.trim();
  const step2Valid =
    form.description.trim().length > 20 && form.contactEmail.includes("@");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="members.apply.dialog"
        className="sm:max-w-lg"
        style={{
          background: "oklch(var(--cosmos-deep))",
          border: "1px solid oklch(var(--gold) / 0.25)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-xl font-bold"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Apply for Membership
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.6 0.04 260)" }}>
            Join the PlanetsPeacePalace registry as a member of ONEartHeaven.
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background:
                    s === step
                      ? "oklch(var(--gold))"
                      : s < step
                        ? "oklch(0.55 0.14 195 / 0.3)"
                        : "oklch(var(--cosmos-surface))",
                  color:
                    s === step
                      ? "oklch(0.1 0.02 260)"
                      : s < step
                        ? "oklch(var(--teal-bright))"
                        : "oklch(0.4 0.04 260)",
                  border: `1px solid ${
                    s === step
                      ? "oklch(var(--gold))"
                      : s < step
                        ? "oklch(var(--teal) / 0.5)"
                        : "oklch(var(--gold-dim) / 0.2)"
                  }`,
                }}
              >
                {s < step ? <Check className="h-3.5 w-3.5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className="h-px w-8 rounded-full transition-all duration-300"
                  style={{
                    background:
                      s < step
                        ? "oklch(var(--teal) / 0.5)"
                        : "oklch(var(--gold-dim) / 0.15)",
                  }}
                />
              )}
            </div>
          ))}
          <span
            className="ml-auto text-xs"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            Step {step} of 3
          </span>
        </div>

        {/* Not Connected */}
        {!isConnected ? (
          <div
            className="flex flex-col items-center gap-4 py-8 text-center rounded-xl"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(var(--gold) / 0.15)",
            }}
            data-ocid="members.apply.error_state"
          >
            <Wallet
              className="h-10 w-10"
              style={{ color: "oklch(var(--gold-dim))" }}
            />
            <div>
              <p
                className="font-semibold mb-1"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Wallet connection required
              </p>
              <p className="text-sm" style={{ color: "oklch(0.58 0.04 260)" }}>
                Connect your wallet to apply for membership.
              </p>
            </div>
            <Button
              onClick={login}
              className="btn-gold gap-2"
              data-ocid="members.apply.primary_button"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            {/* Step 1 — Entity Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                    Entity Name{" "}
                    <span style={{ color: "oklch(0.68 0.22 27)" }}>*</span>
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Republic of Portugal, City of Lagos…"
                    data-ocid="members.apply.input"
                    style={{
                      background: "oklch(var(--cosmos-mid))",
                      borderColor: "oklch(var(--gold-dim) / 0.25)",
                      color: "oklch(var(--pearl))",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                    Entity Type{" "}
                    <span style={{ color: "oklch(0.68 0.22 27)" }}>*</span>
                  </Label>
                  <Select
                    value={form.memberType}
                    onValueChange={(v) => update("memberType", v)}
                  >
                    <SelectTrigger
                      data-ocid="members.apply.select"
                      style={{
                        background: "oklch(var(--cosmos-mid))",
                        borderColor: "oklch(var(--gold-dim) / 0.25)",
                        color: "oklch(var(--pearl))",
                      }}
                    >
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(var(--cosmos-mid))",
                        borderColor: "oklch(var(--gold-dim) / 0.2)",
                      }}
                    >
                      {MEMBER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {MEMBER_TYPE_LABELS[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                      Region{" "}
                      <span style={{ color: "oklch(0.68 0.22 27)" }}>*</span>
                    </Label>
                    <Select
                      value={form.region}
                      onValueChange={(v) => update("region", v)}
                    >
                      <SelectTrigger
                        style={{
                          background: "oklch(var(--cosmos-mid))",
                          borderColor: "oklch(var(--gold-dim) / 0.25)",
                          color: "oklch(var(--pearl))",
                        }}
                      >
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "oklch(var(--cosmos-mid))",
                          borderColor: "oklch(var(--gold-dim) / 0.2)",
                        }}
                      >
                        {MEMBER_REGIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {REGION_EMOJIS[r]} {REGION_LABELS[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                      Country{" "}
                      <span style={{ color: "oklch(0.68 0.22 27)" }}>*</span>
                    </Label>
                    <Input
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      placeholder="Country / Territory"
                      style={{
                        background: "oklch(var(--cosmos-mid))",
                        borderColor: "oklch(var(--gold-dim) / 0.25)",
                        color: "oklch(var(--pearl))",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — About */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                    Description{" "}
                    <span style={{ color: "oklch(0.68 0.22 27)" }}>*</span>
                  </Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Describe your entity, mission, and why you want to join ONEartHeaven…"
                    rows={4}
                    data-ocid="members.apply.textarea"
                    style={{
                      background: "oklch(var(--cosmos-mid))",
                      borderColor: "oklch(var(--gold-dim) / 0.25)",
                      color: "oklch(var(--pearl))",
                      resize: "none",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color:
                        form.description.length < 20
                          ? "oklch(0.68 0.22 27)"
                          : "oklch(0.45 0.04 260)",
                    }}
                  >
                    {form.description.length}/20 min characters
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                    Languages (comma-separated)
                  </Label>
                  <Input
                    value={form.languages}
                    onChange={(e) => update("languages", e.target.value)}
                    placeholder="en, es, fr, ar"
                    style={{
                      background: "oklch(var(--cosmos-mid))",
                      borderColor: "oklch(var(--gold-dim) / 0.25)",
                      color: "oklch(var(--pearl))",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                      Website
                    </Label>
                    <Input
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      placeholder="https://…"
                      style={{
                        background: "oklch(var(--cosmos-mid))",
                        borderColor: "oklch(var(--gold-dim) / 0.25)",
                        color: "oklch(var(--pearl))",
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.03 260)" }}>
                      Contact Email{" "}
                      <span style={{ color: "oklch(0.68 0.22 27)" }}>*</span>
                    </Label>
                    <Input
                      type="email"
                      value={form.contactEmail}
                      onChange={(e) => update("contactEmail", e.target.value)}
                      placeholder="you@org.com"
                      style={{
                        background: "oklch(var(--cosmos-mid))",
                        borderColor: "oklch(var(--gold-dim) / 0.25)",
                        color: "oklch(var(--pearl))",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(var(--cosmos-mid))",
                    border: "1px solid oklch(var(--gold-dim) / 0.2)",
                  }}
                >
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "oklch(0.55 0.04 260)" }}>Name</span>
                    <span
                      className="font-semibold text-right max-w-[180px] truncate"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {form.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "oklch(0.55 0.04 260)" }}>Type</span>
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {form.memberType
                        ? MEMBER_TYPE_LABELS[form.memberType as MemberType]
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "oklch(0.55 0.04 260)" }}>
                      Region
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {form.region
                        ? `${REGION_EMOJIS[form.region as MemberRegion]} ${REGION_LABELS[form.region as MemberRegion]}`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "oklch(0.55 0.04 260)" }}>
                      Country
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {form.country}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "oklch(0.55 0.04 260)" }}>
                      Contact
                    </span>
                    <span
                      className="font-semibold text-right max-w-[180px] truncate"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {form.contactEmail}
                    </span>
                  </div>
                </div>

                {/* Confirm Checkbox */}
                <label
                  className="flex items-start gap-3 cursor-pointer group"
                  data-ocid="members.apply.checkbox"
                >
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[oklch(var(--gold))]"
                  />
                  <span
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.6 0.04 260)" }}
                  >
                    I confirm that the information provided is accurate and that
                    I agree to the ONEartHeaven Founding Charter and membership
                    terms.
                  </span>
                </label>

                {/* Advisory */}
                <div
                  className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs"
                  style={{
                    background: "oklch(var(--teal) / 0.08)",
                    border: "1px solid oklch(var(--teal) / 0.2)",
                    color: "oklch(0.65 0.06 260)",
                  }}
                  data-ocid="members.apply.success_state"
                >
                  <AlertCircle
                    className="h-3.5 w-3.5 mt-0.5 shrink-0"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                  Your application will be reviewed by the ONEartHeaven Council.
                  You'll be notified via email when a decision is made.
                </div>
              </motion.div>
            )}
          </>
        )}

        {isConnected && (
          <DialogFooter className="gap-2 mt-2">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isPending}
                data-ocid="members.apply.cancel_button"
                style={{
                  borderColor: "oklch(var(--gold-dim) / 0.3)",
                  color: "oklch(0.65 0.04 260)",
                }}
              >
                Back
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleClose}
                data-ocid="members.apply.close_button"
                style={{
                  borderColor: "oklch(var(--gold-dim) / 0.3)",
                  color: "oklch(0.65 0.04 260)",
                }}
              >
                Cancel
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={step === 1 ? !step1Valid : !step2Valid}
                data-ocid="members.apply.primary_button"
                className="btn-gold"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isPending || !confirmed}
                data-ocid="members.apply.submit_button"
                className="btn-gold"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Region Cards ─────────────────────────────────────────────────────────────

function WorldRegionsSection({
  members,
  activeRegion,
  onRegionClick,
}: {
  members: MemberEntity[];
  activeRegion: FilterRegion;
  onRegionClick: (r: FilterRegion) => void;
}) {
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of members) {
      counts[m.region] = (counts[m.region] ?? 0) + 1;
    }
    return counts;
  }, [members]);

  return (
    <section
      data-ocid="members.regions.section"
      className="py-16 sm:py-20"
      style={{ background: "oklch(var(--cosmos-mid))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "oklch(var(--gold))" }}
          >
            Global Reach
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Members by <span className="gold-gradient-text">World Region</span>
          </h2>
          <p className="text-sm mt-2" style={{ color: "oklch(0.55 0.04 260)" }}>
            Click a region to filter the registry
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {MEMBER_REGIONS.map((region, idx) => {
            const count = regionCounts[region] ?? 0;
            const isActive = activeRegion === region;
            return (
              <motion.button
                key={region}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => onRegionClick(isActive ? "all" : region)}
                data-ocid={`members.regions.item.${idx + 1}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 cursor-pointer group"
                style={{
                  background: isActive
                    ? "oklch(var(--gold) / 0.12)"
                    : "oklch(var(--cosmos-surface) / 0.7)",
                  border: `1px solid ${isActive ? "oklch(var(--gold) / 0.5)" : "oklch(var(--gold-dim) / 0.18)"}`,
                  boxShadow: isActive
                    ? "0 0 20px oklch(var(--gold) / 0.1)"
                    : "none",
                }}
              >
                <span className="text-2xl">{REGION_EMOJIS[region]}</span>
                <span
                  className="text-xs font-semibold text-center leading-tight"
                  style={{
                    color: isActive
                      ? "oklch(var(--gold))"
                      : "oklch(0.7 0.03 260)",
                  }}
                >
                  {REGION_LABELS[region]}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{
                    color: isActive
                      ? "oklch(var(--gold-bright))"
                      : "oklch(0.5 0.04 260)",
                  }}
                >
                  {count} {count === 1 ? "member" : "members"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Membership Tiers Section ────────────────────────────────────────────────

function MembershipTiersSection() {
  return (
    <section
      data-ocid="members.tiers.section"
      className="py-16 sm:py-20"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "oklch(var(--teal-bright))" }}
          >
            Open to All
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Membership <span className="gold-gradient-text">Tiers</span>
          </h2>
          <p
            className="text-sm mt-2 max-w-lg mx-auto"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            Every entity type has a place — from sovereign nations to individual
            citizens. No hierarchy of worth, only diversity of function.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MEMBERSHIP_TIERS.map((tier, idx) => {
            const Icon = tier.icon;
            const colorVal = tier.color.startsWith("var")
              ? `oklch(${tier.color})`
              : `oklch(${tier.color})`;
            const colorBrightVal = tier.colorBright.startsWith("var")
              ? `oklch(${tier.colorBright})`
              : `oklch(${tier.colorBright})`;
            return (
              <motion.div
                key={tier.title}
                data-ocid={`members.tiers.item.${idx + 1}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="cosmos-card rounded-2xl p-6 flex flex-col gap-4 group"
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${colorVal} / 0.12`,
                    border: `1px solid ${colorVal} / 0.3`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: colorBrightVal }} />
                </div>

                <div>
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: colorBrightVal }}
                  >
                    {tier.subtitle}
                  </p>
                  <h3
                    className="font-display text-lg font-bold leading-snug"
                    style={{ color: "oklch(var(--pearl))" }}
                  >
                    {tier.title}
                  </h3>
                </div>

                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "oklch(0.6 0.04 260)" }}
                >
                  {tier.description}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  data-ocid={`members.tiers.item.${idx + 1}.button`}
                  className="justify-start px-0 text-xs gap-1 opacity-50 hover:opacity-60"
                  style={{ color: colorBrightVal }}
                >
                  Learn More
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function MembersHero({
  totalCount,
  onApply,
}: {
  totalCount: number;
  onApply: () => void;
}) {
  return (
    <section
      data-ocid="members.hero.section"
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: "38vh", background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/members-hero-globe.dim_1600x600.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-30"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(var(--cosmos-deep) / 0.5) 0%, oklch(var(--cosmos-deep) / 0.75) 60%, oklch(var(--cosmos-deep)) 100%)",
          }}
        />
      </div>

      {/* Radial glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 65% at 50% 40%, oklch(0.72 0.16 75 / 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 50% at 65% 35%, oklch(0.55 0.14 195 / 0.07) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-24">
        {/* Phase badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
          style={{
            borderColor: "oklch(var(--gold) / 0.3)",
            background: "oklch(var(--gold) / 0.07)",
          }}
        >
          <Users
            className="h-3.5 w-3.5"
            style={{ color: "oklch(var(--gold))" }}
          />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "oklch(var(--gold))" }}
          >
            Phase 1.3 — Registry
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-bold leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
        >
          <span className="gold-gradient-text">Member Nations</span>
          <br />
          <span style={{ color: "oklch(var(--pearl))" }}>& Communities</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "oklch(0.72 0.03 260)" }}
        >
          The PlanetsPeacePalace global registry of nations, cities, NGOs,
          cooperatives, communities, and individuals shaping ONE Earth as
          Heaven.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "oklch(var(--teal) / 0.12)",
              border: "1px solid oklch(var(--teal) / 0.3)",
              color: "oklch(var(--teal-bright))",
            }}
          >
            <Users className="h-4 w-4" />
            {totalCount} Members
          </span>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "oklch(var(--gold) / 0.1)",
              border: "1px solid oklch(var(--gold) / 0.25)",
              color: "oklch(var(--gold))",
            }}
          >
            <Globe className="h-4 w-4" />7 Regions
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
        >
          <Button
            size="lg"
            onClick={onApply}
            data-ocid="members.hero.primary_button"
            className="btn-gold gap-2 text-base px-8 h-12"
          >
            <Users className="h-5 w-5" />
            Apply for Membership
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MembersPage() {
  const { data: members = [], isLoading } = useGetMembers();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [regionFilter, setRegionFilter] = useState<FilterRegion>("all");
  const [selectedMember, setSelectedMember] = useState<MemberEntity | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  // Admin state (simplified — real check via backend)
  const isAdmin = false;

  const filteredMembers = useMemo(() => {
    const q = search.toLowerCase().trim();
    return members.filter((m) => {
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      const matchType = typeFilter === "all" || m.memberType === typeFilter;
      const matchStatus = statusFilter === "all" || m.status === statusFilter;
      const matchRegion = regionFilter === "all" || m.region === regionFilter;
      return matchSearch && matchType && matchStatus && matchRegion;
    });
  }, [members, search, typeFilter, statusFilter, regionFilter]);

  function openDetail(m: MemberEntity) {
    setSelectedMember(m);
    setDetailOpen(true);
  }

  return (
    <main>
      {/* Hero */}
      <MembersHero
        totalCount={members.length}
        onApply={() => setApplyOpen(true)}
      />

      {/* Search & Filter Bar */}
      <section
        data-ocid="members.filter.section"
        className="sticky top-16 z-40 py-4 border-b"
        style={{
          background: "oklch(var(--cosmos-deep) / 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "oklch(var(--gold-dim) / 0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
          {/* Search Row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.5 0.04 260)" }}
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members…"
                data-ocid="members.search_input"
                className="pl-9 h-9 text-sm"
                style={{
                  background: "oklch(var(--cosmos-mid))",
                  borderColor: "oklch(var(--gold-dim) / 0.2)",
                  color: "oklch(var(--pearl))",
                }}
              />
            </div>
            <span
              className="text-xs shrink-0"
              style={{ color: "oklch(0.45 0.04 260)" }}
            >
              {filteredMembers.length} / {members.length}
            </span>
          </div>

          {/* Filter Tabs Row */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Type Filter */}
            <div className="flex items-center gap-1 flex-wrap">
              {(["all", ...MEMBER_TYPES] as FilterType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  data-ocid="members.filter.tab"
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background:
                      typeFilter === type
                        ? "oklch(var(--gold) / 0.15)"
                        : "oklch(var(--cosmos-surface) / 0.6)",
                    border:
                      typeFilter === type
                        ? "1px solid oklch(var(--gold) / 0.45)"
                        : "1px solid oklch(var(--gold-dim) / 0.15)",
                    color:
                      typeFilter === type
                        ? "oklch(var(--gold))"
                        : "oklch(0.55 0.04 260)",
                  }}
                >
                  {type === "all"
                    ? "All Types"
                    : MEMBER_TYPE_LABELS[type as MemberType]}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div
              className="h-4 w-px mx-1 hidden sm:block"
              style={{ background: "oklch(var(--gold-dim) / 0.2)" }}
            />

            {/* Status Filter */}
            <div className="flex items-center gap-1">
              {(["all", ...MEMBER_STATUSES] as FilterStatus[]).map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  data-ocid="members.filter.tab"
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background:
                      statusFilter === status
                        ? "oklch(var(--teal) / 0.15)"
                        : "oklch(var(--cosmos-surface) / 0.6)",
                    border:
                      statusFilter === status
                        ? "1px solid oklch(var(--teal) / 0.4)"
                        : "1px solid oklch(var(--gold-dim) / 0.15)",
                    color:
                      statusFilter === status
                        ? "oklch(var(--teal-bright))"
                        : "oklch(0.55 0.04 260)",
                  }}
                >
                  {status === "all"
                    ? "All Status"
                    : status === MemberStatus.active
                      ? "Active"
                      : status === MemberStatus.observer
                        ? "Observer"
                        : status === MemberStatus.applicant
                          ? "Applicant"
                          : "Suspended"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section
        data-ocid="members.grid.section"
        className="py-12 sm:py-16"
        style={{ background: "oklch(var(--cosmos-deep))" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Grid heading */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="font-display text-xl sm:text-2xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {regionFilter !== "all" ? (
                  <>
                    {REGION_EMOJIS[regionFilter]}{" "}
                    <span className="gold-gradient-text">
                      {REGION_LABELS[regionFilter]}
                    </span>{" "}
                    Members
                  </>
                ) : (
                  <>
                    Global{" "}
                    <span className="gold-gradient-text">Member Registry</span>
                  </>
                )}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.45 0.04 260)" }}
              >
                Showing {filteredMembers.length} of {members.length} members
              </p>
            </div>
            <Button
              onClick={() => setApplyOpen(true)}
              data-ocid="members.grid.primary_button"
              className="btn-gold hidden sm:flex gap-2 h-9 text-sm"
            >
              <Users className="h-4 w-4" />
              Apply
            </Button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div
              data-ocid="members.grid.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((sk) => (
                <div
                  key={sk}
                  className="cosmos-card rounded-2xl p-5 h-52 animate-pulse"
                  style={{
                    background: "oklch(var(--cosmos-surface) / 0.5)",
                  }}
                />
              ))}
            </div>
          ) : filteredMembers.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid="members.grid.empty_state"
              className="flex flex-col items-center gap-4 py-20 text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "oklch(var(--cosmos-surface))",
                  border: "1px solid oklch(var(--gold-dim) / 0.2)",
                }}
              >
                <Users
                  className="h-7 w-7"
                  style={{ color: "oklch(0.35 0.04 260)" }}
                />
              </div>
              <div>
                <p
                  className="font-display text-lg font-semibold mb-1"
                  style={{ color: "oklch(0.55 0.03 260)" }}
                >
                  No members found
                </p>
                <p className="text-sm" style={{ color: "oklch(0.4 0.03 260)" }}>
                  Try adjusting your filters or search query.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                  setRegionFilter("all");
                }}
                data-ocid="members.grid.secondary_button"
                style={{
                  borderColor: "oklch(var(--gold-dim) / 0.3)",
                  color: "oklch(var(--gold-dim))",
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            /* Members Grid */
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMembers.map((member, idx) => (
                  <MemberCard
                    key={member.id.toString()}
                    member={member}
                    index={idx}
                    onViewDetails={openDetail}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* World Regions */}
      <WorldRegionsSection
        members={members}
        activeRegion={regionFilter}
        onRegionClick={(r) => {
          setRegionFilter(r);
          window.scrollTo({ top: 300, behavior: "smooth" });
        }}
      />

      {/* Membership Tiers */}
      <MembershipTiersSection />

      {/* Member Detail Sheet */}
      <MemberDetailSheet
        member={selectedMember}
        isAdmin={isAdmin}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedMember(null);
        }}
      />

      {/* Apply Modal */}
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </main>
  );
}
