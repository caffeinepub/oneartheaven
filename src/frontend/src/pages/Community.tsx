import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  CITIZEN_SPOTLIGHTS,
  COMPASSION_COMMUNITIES,
  LOCAL_CHAPTERS,
  VOLUNTEER_ROLES,
  YOUTH_COUNCIL_MEMBERS,
} from "@/data/communityData";
import type {
  CompassionCategory,
  RegionTag,
  VolunteerSkill,
} from "@/data/communityTypes";
import { useCommunity } from "@/hooks/useCommunity";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Globe2,
  GraduationCap,
  Heart,
  Leaf,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────────────────────────

const REGION_LABELS: Record<RegionTag, string> = {
  africa: "Africa",
  asia_pacific: "Asia-Pacific",
  europe: "Europe",
  latin_america: "Latin America",
  middle_east: "Middle East",
  north_america: "North America",
  south_asia: "South Asia",
  global: "Global",
};

const REGION_FLAGS: Record<RegionTag, string> = {
  africa: "🌍",
  asia_pacific: "🌏",
  europe: "🇪🇺",
  latin_america: "🌎",
  middle_east: "🌙",
  north_america: "🗽",
  south_asia: "🕌",
  global: "🌐",
};

const CATEGORY_ICONS: Record<CompassionCategory, React.ElementType> = {
  mental_health: Heart,
  refugees: Globe2,
  elderly: Star,
  youth: Sparkles,
  environment: Leaf,
  gender_equity: Shield,
  disability: Users,
};

const CATEGORY_LABELS: Record<CompassionCategory, string> = {
  mental_health: "Mental Health",
  refugees: "Refugees",
  elderly: "Elderly Care",
  youth: "Youth Empowerment",
  environment: "Environmental Justice",
  gender_equity: "Gender Equity",
  disability: "Disability Rights",
};

const SKILL_LABELS: Record<VolunteerSkill, string> = {
  legal: "Legal",
  medical: "Medical",
  tech: "Tech",
  education: "Education",
  advocacy: "Advocacy",
  media: "Media",
  finance: "Finance",
  logistics: "Logistics",
  research: "Research",
  translation: "Translation",
  design: "Design",
  community_organizing: "Community Org.",
};

const URGENCY_COLORS = {
  low: "oklch(0.6 0.14 140)",
  medium: "oklch(0.68 0.16 60)",
  high: "oklch(0.65 0.18 40)",
  critical: "oklch(0.6 0.22 20)",
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "oklch(0.55 0.14 195)",
  "oklch(0.65 0.18 140)",
  "oklch(0.62 0.16 300)",
  "oklch(0.7 0.16 60)",
  "oklch(0.6 0.22 20)",
  "oklch(0.65 0.2 270)",
];

// ── Sub-components ───────────────────────────────────────────────────────────

function JoinCitizenDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!name || !country || !email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setName("");
      setCountry("");
      setEmail("");
      toast.success(
        "Welcome to ONEartHeaven! Your citizenship application is under review.",
      );
    }, 1200);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-ocid="community.join.open_modal_button"
          className="gap-2 font-semibold"
          style={{
            background: "oklch(var(--gold))",
            color: "oklch(0.1 0.02 260)",
          }}
        >
          <Globe2 className="h-4 w-4" />
          Become a Citizen
        </Button>
      </DialogTrigger>
      <DialogContent
        data-ocid="community.join.dialog"
        className="sm:max-w-md"
        style={{
          background: "oklch(0.1 0.035 260)",
          border: "1px solid oklch(var(--gold) / 0.25)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-xl"
            style={{ color: "oklch(var(--gold))" }}
          >
            Join ONEartHeaven
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.6 0.04 260)" }}>
            Register as an ONEarth Citizen — your voice in global governance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Your country"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!name || !country || !email || loading}
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(0.1 0.02 260)",
            }}
          >
            {loading ? "Registering..." : "Register as Citizen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StartChapterDialog() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!city || !country || !contact) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success(
        `Chapter application for ${city} submitted! Our team will be in touch.`,
      );
    }, 1200);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-ocid="community.start_chapter.open_modal_button"
          variant="outline"
          className="gap-2"
          style={{
            borderColor: "oklch(0.55 0.14 195 / 0.5)",
            color: "oklch(0.55 0.14 195)",
          }}
        >
          <Building2 className="h-4 w-4" />
          Start a Chapter
        </Button>
      </DialogTrigger>
      <DialogContent
        data-ocid="community.start_chapter.dialog"
        className="sm:max-w-md"
        style={{
          background: "oklch(0.1 0.035 260)",
          border: "1px solid oklch(0.55 0.14 195 / 0.3)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-xl"
            style={{ color: "oklch(0.55 0.14 195)" }}
          >
            Start a Local Chapter
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.6 0.04 260)" }}>
            Bring ONEartHeaven to your city. We'll help you get set up.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Your country"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>Your Email</Label>
            <Input
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="your@email.com"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!city || !country || !contact || loading}
            style={{ background: "oklch(0.55 0.14 195)", color: "white" }}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function YouthApplyDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [vision, setVision] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!name || !age || !country || !vision) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success(
        "Youth Council application submitted! You'll hear back within 2 weeks.",
      );
    }, 1400);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-ocid="community.youth.apply.open_modal_button"
          className="gap-2 font-semibold"
          style={{
            background: "oklch(0.68 0.2 140)",
            color: "white",
          }}
        >
          <GraduationCap className="h-4 w-4" />
          Apply to Youth Council
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          background: "oklch(0.1 0.035 260)",
          border: "1px solid oklch(0.68 0.2 140 / 0.3)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-xl"
            style={{ color: "oklch(0.68 0.2 140)" }}
          >
            Apply to the Youth Council
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.6 0.04 260)" }}>
            Ages 14–30. All nations welcome. Your generation's voice in global
            governance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.75 0.04 260)" }}>Full Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  background: "oklch(0.14 0.035 260)",
                  borderColor: "oklch(0.25 0.04 260)",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.75 0.04 260)" }}>Age</Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 22"
                min={14}
                max={30}
                style={{
                  background: "oklch(0.14 0.035 260)",
                  borderColor: "oklch(0.25 0.04 260)",
                }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Your country"
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label style={{ color: "oklch(0.75 0.04 260)" }}>
              Your Vision (150+ words)
            </Label>
            <Textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Describe the change you want to create through global governance..."
              rows={5}
              style={{
                background: "oklch(0.14 0.035 260)",
                borderColor: "oklch(0.25 0.04 260)",
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              !name || !age || !country || vision.length < 50 || loading
            }
            style={{ background: "oklch(0.68 0.2 140)", color: "white" }}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function CommunityPage() {
  const community = useCommunity();
  const [applyRole, setApplyRole] = useState<string | null>(null);
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyMotivation, setApplyMotivation] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);
  const [skillFilter, setSkillFilter] = useState<VolunteerSkill | "all">("all");
  const [chapterRegionFilter, setChapterRegionFilter] = useState<
    RegionTag | "all"
  >("all");
  const [chapterSearch, setChapterSearch] = useState("");

  const allSkills: VolunteerSkill[] = [
    "legal",
    "medical",
    "tech",
    "education",
    "advocacy",
    "media",
    "finance",
    "logistics",
    "research",
    "translation",
    "design",
    "community_organizing",
  ];

  const filteredChapters = LOCAL_CHAPTERS.filter((c) => {
    const search = chapterSearch.toLowerCase();
    const matchesSearch =
      chapterSearch === "" ||
      c.name.toLowerCase().includes(search) ||
      c.city.toLowerCase().includes(search) ||
      c.country.toLowerCase().includes(search);
    const matchesRegion =
      chapterRegionFilter === "all" || c.region === chapterRegionFilter;
    return matchesSearch && matchesRegion;
  });

  const filteredRoles = VOLUNTEER_ROLES.filter((r) => {
    return skillFilter === "all" || r.skills.includes(skillFilter);
  });

  function handleApplySubmit() {
    if (!applyName || !applyEmail) return;
    setApplyLoading(true);
    setTimeout(() => {
      setApplyLoading(false);
      setApplyRole(null);
      setApplyName("");
      setApplyEmail("");
      setApplyMotivation("");
      toast.success(
        "Volunteer application submitted! You'll hear back within 5 business days.",
      );
    }, 1400);
  }

  const selectedRole = applyRole
    ? VOLUNTEER_ROLES.find((r) => r.id === applyRole)
    : null;

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* ── Section 1: Hero ───────────────────────────────────────── */}
      <section
        data-ocid="community.hero.section"
        className="relative overflow-hidden py-24 sm:py-32"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.55 0.14 195 / 0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 80%, oklch(var(--gold) / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Standardized grid texture */}
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "oklch(0.55 0.14 195 / 0.4)",
              background: "oklch(0.55 0.14 195 / 0.08)",
            }}
          >
            <Users
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.55 0.14 195)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.55 0.14 195)" }}
            >
              Phase 5 — Community Layer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-hero-xl font-display mb-5"
          >
            <span className="gold-gradient-text">ONEartHeaven™</span>
            <br />
            <span style={{ color: "oklch(0.55 0.14 195)" }}>
              Community Layer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.72 0.03 260)" }}
          >
            Where Global Governance Meets Local Action.
            <span style={{ color: "oklch(0.55 0.14 195)" }}>
              {" "}
              284K+ citizens
            </span>
            ,<span style={{ color: "oklch(var(--gold))" }}> 8 chapters</span>,
            <span style={{ color: "oklch(0.72 0.03 260)" }}> 194 nations.</span>
          </motion.p>

          {/* Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto"
          >
            {[
              {
                label: "ONEarth Citizens",
                value: formatNumber(community.stats.totalCitizens),
                color: "oklch(0.55 0.14 195)",
              },
              {
                label: "Local Chapters",
                value: community.stats.localChapters.toString(),
                color: "oklch(var(--gold))",
              },
              {
                label: "Volunteers",
                value: formatNumber(community.stats.volunteers),
                color: "oklch(0.68 0.2 140)",
              },
              {
                label: "Nations",
                value: community.stats.nations.toString(),
                color: "oklch(0.65 0.18 300)",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl px-4 py-5"
                style={{
                  background: "oklch(0.12 0.035 260)",
                  border: `1px solid ${stat.color}33`,
                }}
              >
                <div
                  className="font-display text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.04 260)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <JoinCitizenDialog />
            <Button
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "oklch(0.55 0.14 195 / 0.4)",
                color: "oklch(0.55 0.14 195)",
              }}
              onClick={() => {
                document
                  .getElementById("volunteers-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Become a Volunteer
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Citizens Spotlight ──────────────────────────── */}
      <section data-ocid="community.citizens.section" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                borderColor: "oklch(0.55 0.14 195 / 0.3)",
                color: "oklch(0.55 0.14 195)",
              }}
            >
              <Globe2 className="h-3.5 w-3.5" /> ONEarth Citizens Portal
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "oklch(var(--pearl))" }}
            >
              The People Behind the Planet
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              ONEarth Citizens are the heartbeat of this platform — activists,
              researchers, educators, healers, and builders from every corner of
              the world, united by a single mission:{" "}
              <span style={{ color: "oklch(var(--gold))" }}>NewWaysNow</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CITIZEN_SPOTLIGHTS.map((citizen, idx) => (
              <motion.div
                key={citizen.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.11 0.035 260)",
                  border: "1px solid oklch(0.55 0.14 195 / 0.15)",
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: `${AVATAR_COLORS[idx % AVATAR_COLORS.length]}22`,
                      border: `2px solid ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}55`,
                      color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                    }}
                  >
                    {getInitials(citizen.name)}
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {citizen.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.14 195)" }}
                    >
                      {REGION_FLAGS[citizen.region]} {citizen.country}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.52 0.04 260)" }}
                    >
                      {citizen.role}
                    </div>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "oklch(0.62 0.04 260)" }}
                >
                  {citizen.contribution}
                </p>
                <div
                  className="text-xs font-semibold px-3 py-2 rounded-lg"
                  style={{
                    background: "oklch(0.55 0.14 195 / 0.08)",
                    color: "oklch(0.55 0.14 195)",
                    border: "1px solid oklch(0.55 0.14 195 / 0.2)",
                  }}
                >
                  💡 {citizen.impact}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <JoinCitizenDialog />
          </div>
        </div>
      </section>

      {/* ── Section 3: Local Chapters ──────────────────────────────── */}
      <section
        data-ocid="community.chapters.section"
        className="py-20"
        style={{ background: "oklch(0.085 0.03 260)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-6"
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
                style={{
                  borderColor: "oklch(var(--gold) / 0.3)",
                  color: "oklch(var(--gold))",
                }}
              >
                <MapPin className="h-3.5 w-3.5" /> Local Chapters
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {LOCAL_CHAPTERS.length} Chapters Worldwide
              </h2>
              <p
                className="text-sm mt-2"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                Active hubs where global governance meets local action.
              </p>
            </div>
            <StartChapterDialog />
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.45 0.04 260)" }}
              />
              <input
                data-ocid="community.chapters.search_input"
                type="text"
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                placeholder="Search chapters by city, country..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                style={{
                  background: "oklch(0.12 0.035 260)",
                  border: "1px solid oklch(0.22 0.04 260)",
                  color: "oklch(0.82 0.03 260)",
                  outline: "none",
                }}
              />
            </div>
            <Select
              value={chapterRegionFilter}
              onValueChange={(v) =>
                setChapterRegionFilter(v as RegionTag | "all")
              }
            >
              <SelectTrigger
                data-ocid="community.chapters.region.select"
                className="w-full sm:w-48"
                style={{
                  background: "oklch(0.12 0.035 260)",
                  borderColor: "oklch(0.22 0.04 260)",
                  color: "oklch(0.75 0.04 260)",
                }}
              >
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.12 0.035 260)",
                  borderColor: "oklch(0.22 0.04 260)",
                }}
              >
                <SelectItem value="all">All Regions</SelectItem>
                {(Object.entries(REGION_LABELS) as [RegionTag, string][]).map(
                  ([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Chapter Cards */}
          {filteredChapters.length === 0 ? (
            <div
              className="text-center py-16"
              style={{ color: "oklch(0.45 0.04 260)" }}
            >
              No chapters match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredChapters.map((chapter, idx) => (
                <motion.div
                  key={chapter.id}
                  data-ocid={`community.chapter.card.${idx + 1}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{
                    background: "oklch(0.115 0.035 260)",
                    border: "1px solid oklch(var(--gold) / 0.15)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl mb-1">
                        {REGION_FLAGS[chapter.region]}
                      </div>
                      <div
                        className="font-semibold text-sm leading-snug"
                        style={{ color: "oklch(var(--pearl))" }}
                      >
                        {chapter.city}, {chapter.country}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.52 0.04 260)" }}
                      >
                        {chapter.name}
                      </div>
                    </div>
                    <Badge
                      className="text-xs capitalize"
                      style={{
                        background:
                          chapter.status === "active"
                            ? "oklch(0.68 0.2 140 / 0.15)"
                            : chapter.status === "forming"
                              ? "oklch(0.68 0.16 60 / 0.15)"
                              : "oklch(0.6 0.22 20 / 0.15)",
                        color:
                          chapter.status === "active"
                            ? "oklch(0.68 0.2 140)"
                            : chapter.status === "forming"
                              ? "oklch(0.68 0.16 60)"
                              : "oklch(0.6 0.22 20)",
                        border: "none",
                      }}
                    >
                      {chapter.status}
                    </Badge>
                  </div>

                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    <Users className="h-3.5 w-3.5" />
                    {chapter.memberCount.toLocaleString()} members
                    <span style={{ color: "oklch(0.35 0.04 260)" }}>·</span>
                    Est. {chapter.foundedYear}
                  </div>

                  <div className="space-y-1">
                    {chapter.activeProjects.slice(0, 2).map((p) => (
                      <div
                        key={p}
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "oklch(0.62 0.04 260)" }}
                      >
                        <Zap
                          className="h-3 w-3 flex-shrink-0"
                          style={{ color: "oklch(var(--gold))" }}
                        />
                        {p}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {chapter.focusAreas.map((a) => (
                      <span
                        key={a}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: "oklch(0.55 0.14 195 / 0.1)",
                          color: "oklch(0.55 0.14 195)",
                          border: "1px solid oklch(0.55 0.14 195 / 0.2)",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  {chapter.finFracFranEnabled && (
                    <div
                      className="text-xs font-semibold px-2.5 py-1 rounded-full self-start"
                      style={{
                        background: "oklch(var(--gold) / 0.1)",
                        color: "oklch(var(--gold))",
                        border: "1px solid oklch(var(--gold) / 0.3)",
                      }}
                    >
                      FinFracFran™ Enabled
                    </div>
                  )}

                  <div
                    className="text-xs mt-auto"
                    style={{ color: "oklch(0.45 0.04 260)" }}
                  >
                    Lead:{" "}
                    <span style={{ color: "oklch(0.65 0.04 260)" }}>
                      {chapter.lead}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 4: Compassion Communities ─────────────────────── */}
      <section data-ocid="community.compassion.section" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                borderColor: "oklch(0.65 0.18 300 / 0.3)",
                color: "oklch(0.65 0.18 300)",
              }}
            >
              <Heart className="h-3.5 w-3.5" /> Compassion Communities
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Global Circles of Care
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              Thematic communities organized around shared human needs — rooted
              in compassion, powered by collective action.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPASSION_COMMUNITIES.map((community, idx) => {
              const Icon = CATEGORY_ICONS[community.category];
              return (
                <motion.div
                  key={community.id}
                  data-ocid={`community.compassion.card.${idx + 1}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: "oklch(0.11 0.035 260)",
                    border: "1px solid oklch(0.18 0.04 260)",
                    borderLeft: `4px solid ${community.color}`,
                  }}
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${community.color}18`,
                          border: `1px solid ${community.color}40`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: community.color }}
                        />
                      </div>
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: "oklch(var(--pearl))" }}
                        >
                          {community.name}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "oklch(0.52 0.04 260)" }}
                        >
                          {CATEGORY_LABELS[community.category]}
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "oklch(0.62 0.04 260)" }}
                    >
                      {community.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div
                        className="rounded-xl p-3 text-center"
                        style={{ background: `${community.color}0d` }}
                      >
                        <div
                          className="font-bold text-lg"
                          style={{ color: community.color }}
                        >
                          {formatNumber(community.memberCount)}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "oklch(0.52 0.04 260)" }}
                        >
                          Members
                        </div>
                      </div>
                      <div
                        className="rounded-xl p-3 text-center"
                        style={{ background: `${community.color}0d` }}
                      >
                        <div
                          className="font-bold text-lg"
                          style={{ color: community.color }}
                        >
                          {community.activeInitiatives}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: "oklch(0.52 0.04 260)" }}
                        >
                          Initiatives
                        </div>
                      </div>
                    </div>

                    <div
                      className="text-xs px-3 py-2 rounded-lg mb-4"
                      style={{
                        background: `${community.color}0d`,
                        color: "oklch(0.68 0.04 260)",
                        border: `1px solid ${community.color}25`,
                      }}
                    >
                      ✨ {community.impactStatement}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {community.regions.map((r) => (
                        <span
                          key={r}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.16 0.04 260)",
                            color: "oklch(0.55 0.04 260)",
                          }}
                        >
                          {REGION_FLAGS[r]} {REGION_LABELS[r]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 pb-5 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs font-semibold"
                      style={{ background: community.color, color: "white" }}
                      onClick={() =>
                        toast.success(`Welcome to ${community.name}!`)
                      }
                    >
                      {community.joinCTA}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: `${community.color}40`,
                        color: community.color,
                      }}
                      onClick={() =>
                        toast.success(`Opening ${community.name} resources...`)
                      }
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 5: Volunteer Exchange ──────────────────────────── */}
      <section
        id="volunteers-section"
        data-ocid="community.volunteers.section"
        className="py-20"
        style={{ background: "oklch(0.085 0.03 260)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-6"
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
                style={{
                  borderColor: "oklch(0.68 0.2 140 / 0.3)",
                  color: "oklch(0.68 0.2 140)",
                }}
              >
                <BriefcaseBusiness className="h-3.5 w-3.5" /> Volunteer &
                Expertise Exchange
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold"
                style={{ color: "oklch(var(--pearl))" }}
              >
                {VOLUNTEER_ROLES.length} Open Roles
              </h2>
              <p
                className="text-sm mt-2"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                Lend your expertise. Shape the future. Work with councils
                worldwide.
              </p>
            </div>
          </motion.div>

          {/* Skill Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSkillFilter("all")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background:
                  skillFilter === "all"
                    ? "oklch(0.68 0.2 140)"
                    : "oklch(0.12 0.035 260)",
                color: skillFilter === "all" ? "white" : "oklch(0.55 0.04 260)",
                border: "1px solid oklch(0.22 0.04 260)",
              }}
            >
              All Skills
            </button>
            {allSkills.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => setSkillFilter(skill)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background:
                    skillFilter === skill
                      ? "oklch(0.68 0.2 140)"
                      : "oklch(0.12 0.035 260)",
                  color:
                    skillFilter === skill ? "white" : "oklch(0.55 0.04 260)",
                  border: "1px solid oklch(0.22 0.04 260)",
                }}
              >
                {SKILL_LABELS[skill]}
              </button>
            ))}
          </div>

          {filteredRoles.length === 0 ? (
            <div
              className="text-center py-16"
              style={{ color: "oklch(0.45 0.04 260)" }}
            >
              No roles match the selected filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoles.map((role, idx) => (
                <motion.div
                  key={role.id}
                  data-ocid={`community.role.card.${idx + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{
                    background: "oklch(0.115 0.035 260)",
                    border: "1px solid oklch(0.18 0.04 260)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className="font-semibold text-sm leading-snug"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {role.title}
                    </div>
                    <Badge
                      className="text-xs capitalize flex-shrink-0"
                      style={{
                        background: `${URGENCY_COLORS[role.urgency]}18`,
                        color: URGENCY_COLORS[role.urgency],
                        border: "none",
                      }}
                    >
                      {role.urgency}
                    </Badge>
                  </div>

                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    {role.organization}
                  </div>

                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.6 0.04 260)" }}
                  >
                    {role.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {role.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          background: "oklch(0.68 0.2 140 / 0.1)",
                          color: "oklch(0.68 0.2 140)",
                          border: "1px solid oklch(0.68 0.2 140 / 0.25)",
                        }}
                      >
                        {SKILL_LABELS[s]}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    <span>{role.isRemote ? "🌐 Remote" : "📍 On-site"}</span>
                    <span style={{ color: "oklch(0.3 0.04 260)" }}>·</span>
                    <span>{role.openSlots} slots open</span>
                    <span style={{ color: "oklch(0.3 0.04 260)" }}>·</span>
                    <span>{REGION_LABELS[role.region]}</span>
                  </div>

                  {role.finFracFranRole && (
                    <div
                      className="text-xs font-semibold px-2.5 py-1 rounded-full self-start"
                      style={{
                        background: "oklch(var(--gold) / 0.1)",
                        color: "oklch(var(--gold))",
                        border: "1px solid oklch(var(--gold) / 0.3)",
                      }}
                    >
                      FinFracFran™ Role
                    </div>
                  )}

                  <Button
                    size="sm"
                    className="mt-auto text-xs font-semibold w-full"
                    style={{
                      background: "oklch(0.68 0.2 140)",
                      color: "white",
                    }}
                    onClick={() => setApplyRole(role.id)}
                  >
                    Apply for This Role
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Apply Sheet */}
      <Sheet
        open={!!applyRole}
        onOpenChange={(open) => {
          if (!open) setApplyRole(null);
        }}
      >
        <SheetContent
          data-ocid="community.apply.sheet"
          style={{
            background: "oklch(0.1 0.035 260)",
            borderLeft: "1px solid oklch(0.68 0.2 140 / 0.3)",
          }}
        >
          <SheetHeader className="mb-6">
            <SheetTitle
              className="font-display text-xl"
              style={{ color: "oklch(0.68 0.2 140)" }}
            >
              Apply: {selectedRole?.title}
            </SheetTitle>
            <SheetDescription style={{ color: "oklch(0.6 0.04 260)" }}>
              {selectedRole?.organization} ·{" "}
              {selectedRole ? REGION_LABELS[selectedRole.region] : ""}
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.75 0.04 260)" }}>Full Name</Label>
              <Input
                value={applyName}
                onChange={(e) => setApplyName(e.target.value)}
                placeholder="Your full name"
                style={{
                  background: "oklch(0.14 0.035 260)",
                  borderColor: "oklch(0.25 0.04 260)",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.75 0.04 260)" }}>Email</Label>
              <Input
                type="email"
                value={applyEmail}
                onChange={(e) => setApplyEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  background: "oklch(0.14 0.035 260)",
                  borderColor: "oklch(0.25 0.04 260)",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label style={{ color: "oklch(0.75 0.04 260)" }}>
                Why this role? (optional)
              </Label>
              <Textarea
                value={applyMotivation}
                onChange={(e) => setApplyMotivation(e.target.value)}
                placeholder="Share your motivation and relevant experience..."
                rows={5}
                style={{
                  background: "oklch(0.14 0.035 260)",
                  borderColor: "oklch(0.25 0.04 260)",
                }}
              />
            </div>
            <Button
              data-ocid="community.apply.submit_button"
              onClick={handleApplySubmit}
              disabled={!applyName || !applyEmail || applyLoading}
              className="w-full font-semibold"
              style={{ background: "oklch(0.68 0.2 140)", color: "white" }}
            >
              {applyLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Section 6: Youth Council ───────────────────────────────── */}
      <section data-ocid="community.youth.section" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                borderColor: "oklch(0.68 0.2 140 / 0.3)",
                color: "oklch(0.68 0.2 140)",
              }}
            >
              <GraduationCap className="h-3.5 w-3.5" /> Youth Council
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "oklch(var(--pearl))" }}
            >
              Next Generation of Global Governance
            </h2>
            <div className="flex items-center justify-center gap-6 mb-5">
              <div className="text-center">
                <div
                  className="font-bold text-2xl"
                  style={{ color: "oklch(0.68 0.2 140)" }}
                >
                  Ages 16–27
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Age Range
                </div>
              </div>
              <div
                className="h-10 w-px"
                style={{ background: "oklch(0.2 0.04 260)" }}
              />
              <div className="text-center">
                <div
                  className="font-bold text-2xl"
                  style={{ color: "oklch(0.68 0.2 140)" }}
                >
                  8 Nations
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Represented
                </div>
              </div>
              <div
                className="h-10 w-px"
                style={{ background: "oklch(0.2 0.04 260)" }}
              />
              <div className="text-center">
                <div
                  className="font-bold text-2xl"
                  style={{ color: "oklch(0.68 0.2 140)" }}
                >
                  {formatNumber(community.stats.youthMembers)}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Youth Members
                </div>
              </div>
            </div>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              Young leaders aged 14–30 holding formal advisory seats in the
              ONEartHeaven governance structure. No tokenism — real power, real
              accountability.
            </p>
          </motion.div>

          {/* Youth Council Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {YOUTH_COUNCIL_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.id}
                data-ocid={`community.youth.member.card.${idx + 1}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "oklch(0.11 0.035 260)",
                  border: "1px solid oklch(0.68 0.2 140 / 0.18)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: `${AVATAR_COLORS[idx % AVATAR_COLORS.length]}22`,
                      border: `2px solid ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}55`,
                      color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                    }}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {member.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.52 0.04 260)" }}
                    >
                      {REGION_FLAGS[member.region]} {member.country} · Age{" "}
                      {member.age}
                    </div>
                  </div>
                </div>

                <Badge
                  className="self-start text-xs"
                  style={{
                    background: "oklch(0.68 0.2 140 / 0.12)",
                    color: "oklch(0.68 0.2 140)",
                    border: "none",
                  }}
                >
                  {member.role}
                </Badge>

                <div className="flex flex-wrap gap-1">
                  {member.focus.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: "oklch(0.14 0.035 260)",
                        color: "oklch(0.55 0.04 260)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <blockquote
                  className="text-xs italic leading-relaxed border-l-2 pl-3"
                  style={{
                    color: "oklch(0.62 0.04 260)",
                    borderColor: "oklch(0.68 0.2 140 / 0.4)",
                  }}
                >
                  "{member.quote}"
                </blockquote>

                <div
                  className="text-xs mt-auto"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  Tenure: {member.tenure}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 mb-10"
            style={{
              background: "oklch(0.11 0.035 260)",
              border: "1px solid oklch(0.68 0.2 140 / 0.2)",
            }}
          >
            <h3
              className="font-display text-xl font-bold mb-6"
              style={{ color: "oklch(var(--pearl))" }}
            >
              <BookOpen
                className="inline-block h-5 w-5 mr-2"
                style={{ color: "oklch(0.68 0.2 140)" }}
              />
              Upcoming Youth Council Events
            </h3>
            <div className="space-y-4">
              {[
                {
                  date: "Apr 15, 2026",
                  title: "Youth Governance Summit 2026",
                  location: "Nairobi, Kenya + Virtual",
                  desc: "Annual gathering of Youth Council members and 500+ youth delegates from 80 nations.",
                },
                {
                  date: "May 3, 2026",
                  title: "AI Ethics Hackathon for Youth",
                  location: "Global — Remote",
                  desc: "48-hour hackathon co-hosted with TechForAll Council. Teams build open-source AI accountability tools.",
                },
                {
                  date: "Jun 21, 2026",
                  title: "Climate Youth Emergency Forum",
                  location: "Mumbai, India + Virtual",
                  desc: "Youth-led emergency session on Pacific Islands Climate Emergency Compact — open deliberation and vote.",
                },
              ].map((event) => (
                <div
                  key={event.title}
                  className="flex gap-4 items-start p-4 rounded-xl"
                  style={{ background: "oklch(0.14 0.04 260)" }}
                >
                  <div
                    className="text-center rounded-xl px-3 py-2 flex-shrink-0"
                    style={{
                      background: "oklch(0.68 0.2 140 / 0.12)",
                      border: "1px solid oklch(0.68 0.2 140 / 0.25)",
                      minWidth: "72px",
                    }}
                  >
                    <div
                      className="text-xs font-bold"
                      style={{ color: "oklch(0.68 0.2 140)" }}
                    >
                      {event.date.split(",")[0].split(" ")[0]}
                    </div>
                    <div
                      className="text-lg font-bold leading-none"
                      style={{ color: "oklch(0.68 0.2 140)" }}
                    >
                      {event.date.split(" ")[1].replace(",", "")}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: "oklch(var(--pearl))" }}
                    >
                      {event.title}
                    </div>
                    <div
                      className="text-xs mb-1.5"
                      style={{ color: "oklch(0.55 0.14 195)" }}
                    >
                      📍 {event.location}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.04 260)" }}
                    >
                      {event.desc}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0 text-xs gap-1"
                    style={{
                      borderColor: "oklch(0.68 0.2 140 / 0.4)",
                      color: "oklch(0.68 0.2 140)",
                    }}
                    onClick={() => toast.success("RSVP submitted!")}
                  >
                    RSVP <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center">
            <YouthApplyDialog />
          </div>
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "oklch(0.085 0.03 260)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              <span className="gold-gradient-text">
                Your Voice. Your Planet.
              </span>
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              Join 284,000+ citizens already shaping the future of global
              governance — from your neighborhood to the world stage.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <JoinCitizenDialog />
              <StartChapterDialog />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
