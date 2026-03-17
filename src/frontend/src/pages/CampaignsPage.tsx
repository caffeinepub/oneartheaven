import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCopy,
  Cpu,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Leaf,
  Megaphone,
  Network,
  Shield,
  Sparkles,
  Star,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform =
  | "Instagram"
  | "LinkedIn"
  | "X"
  | "Facebook"
  | "YouTube"
  | "TikTok";
type Category =
  | "Governance"
  | "Finance & Economy"
  | "Education"
  | "Climate & Sustainability"
  | "Community"
  | "Transparency"
  | "Solutions"
  | "Health & Wellness"
  | "Technology"
  | "Personal Empowerment";

interface Campaign {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  platforms: Platform[];
  headline: string;
  subline: string;
  bodyText: string;
  hashtags: string[];
  cta: string;
  ctaRoute: string;
  gradient: string;
  accentColor: string;
  Icon: React.ElementType;
}

// ─── Campaign Data ────────────────────────────────────────────────────────────

const CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    title: "NewWaysNow: Reimagine Governance",
    tagline: "Your voice. Your future. Your governance.",
    category: "Governance",
    platforms: ["LinkedIn", "X", "Facebook"],
    headline: "What if every voice shaped the future?",
    subline: "Participatory governance for the digital age.",
    bodyText:
      "ONEartHeaven™ is building governance systems where every person has a genuine seat at the table. No vetoes, no gatekeepers — just shared wisdom and collective direction.",
    hashtags: [
      "#NewWaysNow",
      "#ONEartHeaven",
      "#DecentralizedGovernance",
      "#PeoplesVoice",
      "#GlobalChange",
    ],
    cta: "Join the Assembly",
    ctaRoute: "/assembly",
    gradient: "from-indigo-900 via-purple-900 to-slate-900",
    accentColor: "#818cf8",
    Icon: Layers,
  },
  {
    id: "c2",
    title: "FinFracFran™: Wealth Redefined",
    tagline: "A new economic model built for everyone.",
    category: "Finance & Economy",
    platforms: ["LinkedIn", "Instagram", "TikTok"],
    headline: "Fraction it. Franchise it. Scale it globally.",
    subline: "A new economic model built for everyone, not just the few.",
    bodyText:
      "FinFracFran™ unlocks fractionalized ownership and franchise scaling so that ordinary people can build extraordinary, generational wealth. The economy is being rewritten — join us.",
    hashtags: [
      "#FinFracFran",
      "#AlternativeEconomy",
      "#WealthForAll",
      "#FranchiseYourFuture",
      "#ONEartHeaven",
    ],
    cta: "Explore Finance",
    ctaRoute: "/finance",
    gradient: "from-amber-900 via-yellow-900 to-orange-900",
    accentColor: "#fbbf24",
    Icon: Wallet,
  },
  {
    id: "c3",
    title: "Best Life Academy: Learn. Grow. Lead.",
    tagline: "Open-source knowledge for every mind on Earth.",
    category: "Education",
    platforms: ["YouTube", "TikTok", "Instagram"],
    headline: "Your best education has no gatekeepers.",
    subline: "Open-source knowledge for every mind on Earth.",
    bodyText:
      "The Academy offers certifications, courses, and incubation programs — freely accessible to every person, from any background, in any language. Knowledge is the foundation of freedom.",
    hashtags: [
      "#BestLifeAcademy",
      "#LifelongLearning",
      "#FreeEducation",
      "#ONEartHeaven",
      "#KnowledgeForAll",
    ],
    cta: "Start Learning",
    ctaRoute: "/academy",
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    accentColor: "#34d399",
    Icon: GraduationCap,
  },
  {
    id: "c4",
    title: "Climate Action Now: Your Planet Needs You",
    tagline: "Local wins scaled to global transformation.",
    category: "Climate & Sustainability",
    platforms: ["Instagram", "TikTok", "X", "YouTube"],
    headline: "The solutions already exist. We need to scale them.",
    subline:
      "Join a global network turning local climate wins into worldwide impact.",
    bodyText:
      "Every community has proven climate solutions. ONEartHeaven™ connects them, validates them, and scales them globally through the FinFracFran™ franchise model.",
    hashtags: [
      "#ClimateActionNow",
      "#Sustainability",
      "#ONEartHeaven",
      "#LocalToGlobal",
      "#GreenFuture",
    ],
    cta: "See Solutions",
    ctaRoute: "/sustainability",
    gradient: "from-green-900 via-emerald-900 to-lime-900",
    accentColor: "#4ade80",
    Icon: Leaf,
  },
  {
    id: "c5",
    title: "Community First: Build Together",
    tagline: "Find your people. Build your future.",
    category: "Community",
    platforms: ["Facebook", "Instagram", "X"],
    headline: "Every great movement starts with one great community.",
    subline: "Find your people. Build your future. Share your wins.",
    bodyText:
      "Local chapters, compassion communities, volunteer networks, and youth councils — ONEartHeaven™ Community Layer connects citizens everywhere into one resilient, caring global family.",
    hashtags: [
      "#CommunityFirst",
      "#BuildTogether",
      "#ONEartHeaven",
      "#LocalPower",
      "#GlobalNetwork",
    ],
    cta: "Join Community",
    ctaRoute: "/community",
    gradient: "from-rose-900 via-pink-900 to-fuchsia-900",
    accentColor: "#f472b6",
    Icon: Heart,
  },
  {
    id: "c6",
    title: "Transparency Wins: Open Everything",
    tagline: "Trust is built with radical openness.",
    category: "Transparency",
    platforms: ["LinkedIn", "X", "Facebook"],
    headline: "Radical transparency is the new competitive advantage.",
    subline: "See where every decision comes from and every dollar goes.",
    bodyText:
      "Our Transparency Portal exposes every budget line, AI decision, and governance action in real time. Accountability is not an afterthought — it is the foundation of everything we build.",
    hashtags: [
      "#TransparencyWins",
      "#OpenGovernance",
      "#AccountabilityNow",
      "#ONEartHeaven",
      "#TrustBuilt",
    ],
    cta: "See Disclosures",
    ctaRoute: "/transparency",
    gradient: "from-sky-900 via-blue-900 to-indigo-900",
    accentColor: "#38bdf8",
    Icon: Shield,
  },
  {
    id: "c7",
    title: "Solutions Exchange: Share What Works",
    tagline: "Upload. Share. Scale. Transform communities.",
    category: "Solutions",
    platforms: ["LinkedIn", "YouTube", "Facebook"],
    headline: "Your local solution is someone else's breakthrough.",
    subline: "Upload. Share. Scale. Transform communities everywhere.",
    bodyText:
      "The Solutions Exchange is an open marketplace of vetted, replicable solutions — each linked to resolutions and ready for FinFracFran™ adoption pathways across 194 nations.",
    hashtags: [
      "#SolutionsExchange",
      "#SharedProgress",
      "#ONEartHeaven",
      "#OpenInnovation",
      "#LocalToGlobal",
    ],
    cta: "Browse Solutions",
    ctaRoute: "/solutions",
    gradient: "from-violet-900 via-purple-900 to-indigo-900",
    accentColor: "#a78bfa",
    Icon: Zap,
  },
  {
    id: "c8",
    title: "Whole-Life Wellness: Thrive Completely",
    tagline: "Mind, body, community, and purpose — all together.",
    category: "Health & Wellness",
    platforms: ["Instagram", "TikTok", "YouTube"],
    headline: "Your best life is whole — mind, body, community, purpose.",
    subline: "Alternative approaches to living fully, not just surviving.",
    bodyText:
      "Our Thematic Action Portals for Health & Wellness connect practitioners, communities, and solutions across every dimension of human flourishing — from nutrition to mental health to civic joy.",
    hashtags: [
      "#WholeLifeWellness",
      "#BestLife",
      "#AlternativeApproaches",
      "#ThriveNotSurvive",
      "#ONEartHeaven",
    ],
    cta: "Explore Portals",
    ctaRoute: "/portals",
    gradient: "from-teal-900 via-cyan-900 to-sky-900",
    accentColor: "#22d3ee",
    Icon: Heart,
  },
  {
    id: "c9",
    title: "Delegate Your Vision",
    tagline: "Champion your community on the world stage.",
    category: "Governance",
    platforms: ["LinkedIn", "X"],
    headline: "Representation that actually represents you.",
    subline: "Become a delegate. Champion your community on the world stage.",
    bodyText:
      "Our Delegate Registry features profiles of founding delegates across 9 thematic councils — with expertise, voting records, and open applications for new community champions.",
    hashtags: [
      "#DelegateYourVision",
      "#RepresentationMatters",
      "#ONEartHeaven",
      "#YourVoice",
      "#GlobalDelegate",
    ],
    cta: "Meet Delegates",
    ctaRoute: "/delegates",
    gradient: "from-slate-900 via-gray-900 to-zinc-900",
    accentColor: "#94a3b8",
    Icon: Users,
  },
  {
    id: "c10",
    title: "PaaS for People: Build on Purpose",
    tagline: "Deploy your org's mission — no gatekeepers.",
    category: "Technology",
    platforms: ["LinkedIn", "X", "YouTube"],
    headline: "Deploy your org's mission — no code, no gatekeepers.",
    subline: "White-label the platform. Make it yours. Launch in days.",
    bodyText:
      "Our white-label PaaS lets any organization deploy a fully branded ONEartHeaven™ instance with custom domains, feature flags, and FinFracFran™ economic integration — from Starter to Global tiers.",
    hashtags: [
      "#PaaSForPeople",
      "#BuildOnPurpose",
      "#ONEartHeaven",
      "#DecentralizedTech",
      "#OpenPlatform",
    ],
    cta: "See Plans",
    ctaRoute: "/pricing",
    gradient: "from-blue-900 via-indigo-900 to-violet-900",
    accentColor: "#60a5fa",
    Icon: Cpu,
  },
  {
    id: "c11",
    title: "FinFracFran™ Franchising: Own Your Future",
    tagline: "Franchise proven models. Earn a stake.",
    category: "Finance & Economy",
    platforms: ["Facebook", "LinkedIn", "Instagram"],
    headline: "Why work for an economy that doesn't work for you?",
    subline:
      "Franchise proven models. Earn a stake. Build generational wealth.",
    bodyText:
      "As a FinFracFran™ vendor, you license proven governance and solutions models, earn fractional revenue shares, and scale into new markets — building lasting value for yourself and your community.",
    hashtags: [
      "#OwnYourFuture",
      "#FinFracFran",
      "#FranchiseEconomy",
      "#GenerationalWealth",
      "#ONEartHeaven",
    ],
    cta: "Become a Vendor",
    ctaRoute: "/vendor/register",
    gradient: "from-orange-900 via-amber-900 to-yellow-900",
    accentColor: "#fb923c",
    Icon: Wallet,
  },
  {
    id: "c12",
    title: "Global Councils: Shape Policy Together",
    tagline: "Contribute your expertise. Shift global direction.",
    category: "Governance",
    platforms: ["LinkedIn", "Facebook", "X"],
    headline: "Policy is too important to leave to politicians alone.",
    subline:
      "Join a thematic council. Contribute your expertise. Shift global direction.",
    bodyText:
      "Nine active councils governing Climate, Health, Education, Peace, and more — using weighted consensus so every expert voice shapes real-world policy without permanent veto power.",
    hashtags: [
      "#GlobalCouncils",
      "#PolicyForPeople",
      "#ONEartHeaven",
      "#SharedGovernance",
      "#CollectiveWisdom",
    ],
    cta: "See Councils",
    ctaRoute: "/councils",
    gradient: "from-purple-900 via-violet-900 to-indigo-900",
    accentColor: "#c084fc",
    Icon: Building2,
  },
  {
    id: "c13",
    title: "Personal Empowerment: Your Best Life, Your Way",
    tagline: "Tools, community, and knowledge for the life you want.",
    category: "Personal Empowerment",
    platforms: ["Instagram", "TikTok", "YouTube"],
    headline: "You don't need permission to live your best life.",
    subline:
      "Tools, community, and knowledge to help you build exactly the life you want.",
    bodyText:
      "ONEartHeaven™ puts the full stack of governance, economics, education, and community support in your hands — so you can design your private and professional life on your own terms.",
    hashtags: [
      "#PersonalEmpowerment",
      "#BestLifeYourWay",
      "#ONEartHeaven",
      "#AlternativeApproaches",
      "#LiveFully",
    ],
    cta: "Start Here",
    ctaRoute: "/register",
    gradient: "from-fuchsia-900 via-pink-900 to-rose-900",
    accentColor: "#e879f9",
    Icon: Star,
  },
  {
    id: "c14",
    title: "Open Integration: Connect Everything",
    tagline: "API-first, webhook-ready, built for scale.",
    category: "Technology",
    platforms: ["LinkedIn", "X", "YouTube"],
    headline: "Your tools. Our platform. One unified mission.",
    subline:
      "API-first, webhook-ready, and built for global integration at scale.",
    bodyText:
      "12 open API endpoints, 8 integration partners, real-time webhooks, and a developer portal — everything you need to connect your existing systems to the ONEartHeaven™ platform.",
    hashtags: [
      "#OpenIntegration",
      "#APIFirst",
      "#ONEartHeaven",
      "#ConnectEverything",
      "#TechForGood",
    ],
    cta: "View Integrations",
    ctaRoute: "/integrations",
    gradient: "from-cyan-900 via-sky-900 to-blue-900",
    accentColor: "#67e8f9",
    Icon: Network,
  },
  {
    id: "c15",
    title: "NewWaysNow: The Best Life Begins Today",
    tagline: "Join millions choosing alternative approaches to life.",
    category: "Personal Empowerment",
    platforms: ["Instagram", "TikTok", "Facebook", "YouTube", "X", "LinkedIn"],
    headline: "Every great change in the world started with one decision.",
    subline:
      "Join millions choosing alternative approaches to governance, economy, community, and life.",
    bodyText:
      "This is not a dream — it is a platform, a community, and a proven model that scales. Your decision to join creates a ripple that reaches every corner of our world.",
    hashtags: [
      "#NewWaysNow",
      "#BestLifeNow",
      "#ONEartHeaven",
      "#AlternativeApproaches",
      "#GlobalChange",
      "#TogetherWeThrive",
    ],
    cta: "Join ONEartHeaven™",
    ctaRoute: "/register",
    gradient: "from-yellow-900 via-amber-900 to-orange-900",
    accentColor: "#fcd34d",
    Icon: Globe,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_PLATFORMS: Platform[] = [
  "Instagram",
  "LinkedIn",
  "X",
  "Facebook",
  "YouTube",
  "TikTok",
];

const ALL_CATEGORIES: Category[] = [
  "Governance",
  "Finance & Economy",
  "Education",
  "Climate & Sustainability",
  "Community",
  "Transparency",
  "Solutions",
  "Health & Wellness",
  "Technology",
  "Personal Empowerment",
];

const PLATFORM_COLORS: Record<Platform, string> = {
  Instagram: "#e1306c",
  LinkedIn: "#0077b5",
  X: "#e7e9ea",
  Facebook: "#1877f2",
  YouTube: "#ff0000",
  TikTok: "#69c9d0",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlatformPill({ platform }: { platform: Platform }) {
  const color = PLATFORM_COLORS[platform];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        background: `${color}22`,
        border: `1px solid ${color}55`,
        color,
      }}
    >
      {platform}
    </span>
  );
}

function HashtagPill({ tag }: { tag: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: "oklch(0.72 0.16 75 / 0.12)",
        border: "1px solid oklch(0.72 0.16 75 / 0.28)",
        color: "oklch(0.88 0.08 75)",
      }}
    >
      {tag}
    </span>
  );
}

function CampaignCard({
  campaign,
  index,
}: { campaign: Campaign; index: number }) {
  const { Icon } = campaign;
  const [isHovered, setIsHovered] = useState(false);

  function handleCopy() {
    const text = `${campaign.headline}\n\n${campaign.bodyText}\n\n${campaign.hashtags.join(" ")}`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Headline + hashtags copied to clipboard!", {
        description: campaign.title,
        duration: 3000,
      });
    });
  }

  // Map gradient class to a CSS-variable-based style since Tailwind JIT can't always resolve dynamic bg classes
  const gradientMap: Record<string, string> = {
    "from-indigo-900 via-purple-900 to-slate-900":
      "linear-gradient(135deg, #1e1b4b, #3b0764, #0f172a)",
    "from-amber-900 via-yellow-900 to-orange-900":
      "linear-gradient(135deg, #451a03, #3d2900, #431407)",
    "from-emerald-900 via-teal-900 to-cyan-900":
      "linear-gradient(135deg, #022c22, #042f2e, #083344)",
    "from-green-900 via-emerald-900 to-lime-900":
      "linear-gradient(135deg, #052e16, #022c22, #1a2e05)",
    "from-rose-900 via-pink-900 to-fuchsia-900":
      "linear-gradient(135deg, #4c0519, #500724, #4a044e)",
    "from-sky-900 via-blue-900 to-indigo-900":
      "linear-gradient(135deg, #082f49, #1e3a5f, #1e1b4b)",
    "from-violet-900 via-purple-900 to-indigo-900":
      "linear-gradient(135deg, #2e1065, #3b0764, #1e1b4b)",
    "from-teal-900 via-cyan-900 to-sky-900":
      "linear-gradient(135deg, #042f2e, #083344, #082f49)",
    "from-slate-900 via-gray-900 to-zinc-900":
      "linear-gradient(135deg, #0f172a, #111827, #18181b)",
    "from-blue-900 via-indigo-900 to-violet-900":
      "linear-gradient(135deg, #1e3a5f, #1e1b4b, #2e1065)",
    "from-orange-900 via-amber-900 to-yellow-900":
      "linear-gradient(135deg, #431407, #451a03, #3d2900)",
    "from-purple-900 via-violet-900 to-indigo-900":
      "linear-gradient(135deg, #3b0764, #2e1065, #1e1b4b)",
    "from-fuchsia-900 via-pink-900 to-rose-900":
      "linear-gradient(135deg, #4a044e, #500724, #4c0519)",
    "from-cyan-900 via-sky-900 to-blue-900":
      "linear-gradient(135deg, #083344, #082f49, #1e3a5f)",
    "from-yellow-900 via-amber-900 to-orange-900":
      "linear-gradient(135deg, #3d2900, #451a03, #431407)",
  };

  const bgStyle =
    gradientMap[campaign.gradient] ??
    gradientMap["from-indigo-900 via-purple-900 to-slate-900"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
      className="flex flex-col rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "oklch(0.13 0.04 260)",
        border: isHovered
          ? `1px solid ${campaign.accentColor}33`
          : "1px solid oklch(1 0 0 / 0.08)",
        boxShadow: isHovered
          ? `0 8px 32px oklch(0 0 0 / 0.45), 0 0 0 1px ${campaign.accentColor}44, 0 4px 20px ${campaign.accentColor}1a`
          : "0 4px 24px oklch(0 0 0 / 0.35)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        transition:
          "box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
      }}
      data-ocid={`campaigns.item.${index + 1}`}
    >
      {/* Gradient banner header — Fix 1: taller h-28, bigger icon, stacked badge+pills */}
      <div
        className="relative h-28 flex items-center justify-between px-4"
        style={{ background: bgStyle }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl"
            style={{
              background: `${campaign.accentColor}25`,
              border: `1px solid ${campaign.accentColor}50`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: campaign.accentColor }} />
          </div>
        </div>
        {/* Fix 1: category badge on top, platform pills below — stacked */}
        <div className="flex flex-col items-end gap-1.5">
          <Badge
            className="text-xs font-semibold tracking-wide"
            style={{
              background: `${campaign.accentColor}22`,
              border: `1px solid ${campaign.accentColor}55`,
              color: campaign.accentColor,
            }}
          >
            {campaign.category}
          </Badge>
          <div className="flex items-center gap-1 flex-wrap justify-end max-w-[160px]">
            {campaign.platforms.map((p) => (
              <PlatformPill key={p} platform={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex-1 flex flex-col p-5 gap-4">
        {/* Fix 2: Title text-lg font-bold, tagline brighter color */}
        <div>
          <h3
            className="font-display text-lg font-bold leading-snug mb-1"
            style={{ color: "oklch(var(--pearl))" }}
          >
            {campaign.title}
          </h3>
          <p className="text-xs" style={{ color: "oklch(0.60 0.06 260)" }}>
            {campaign.tagline}
          </p>
        </div>

        {/* Fix 2: Headline text-base font-semibold italic, subline brighter */}
        <div
          className="rounded-xl px-4 py-3"
          style={{
            background: `${campaign.accentColor}0d`,
            borderLeft: `3px solid ${campaign.accentColor}`,
          }}
        >
          <p
            className="font-display text-base font-semibold italic leading-snug mb-1"
            style={{ color: campaign.accentColor }}
          >
            "{campaign.headline}"
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(0.68 0.04 260)" }}
          >
            {campaign.subline}
          </p>
        </div>

        {/* Fix 2: Body text-sm, brighter color */}
        <p
          className="text-sm leading-relaxed flex-grow"
          style={{ color: "oklch(0.62 0.04 260)" }}
        >
          {campaign.bodyText}
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5">
          {campaign.hashtags.map((tag) => (
            <HashtagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between gap-2 px-5 py-3"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
      >
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="gap-1.5 text-xs h-8"
          style={{
            borderColor: "oklch(1 0 0 / 0.15)",
            color: "oklch(0.65 0.04 260)",
            background: "transparent",
          }}
          data-ocid={`campaigns.copy.button.${index + 1}`}
        >
          <ClipboardCopy className="w-3.5 h-3.5" />
          Copy Campaign
        </Button>
        <a
          href={campaign.ctaRoute}
          data-ocid={`campaigns.cta.link.${index + 1}`}
        >
          <Button
            size="sm"
            className="gap-1.5 text-xs h-8 font-semibold"
            style={{
              background: `${campaign.accentColor}22`,
              border: `1px solid ${campaign.accentColor}55`,
              color: campaign.accentColor,
            }}
          >
            <Sparkles className="w-3 h-3" />
            {campaign.cta}
          </Button>
        </a>
      </div>
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CampaignsPage() {
  const [activePlatform, setActivePlatform] = useState<Platform | "All">("All");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered = CAMPAIGNS.filter((c) => {
    const platformMatch =
      activePlatform === "All" || c.platforms.includes(activePlatform);
    const categoryMatch =
      activeCategory === "All" || c.category === activeCategory;
    return platformMatch && categoryMatch;
  });

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
      data-ocid="campaigns.page"
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="campaigns.hero.section"
        className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
      >
        {/* Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.16 75 / 0.10) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 15% 80%, oklch(0.55 0.14 195 / 0.08) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none hero-grid-texture"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "oklch(0.72 0.16 75 / 0.35)",
              background: "oklch(0.72 0.16 75 / 0.07)",
            }}
          >
            <Megaphone
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.88 0.12 75)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.88 0.12 75)" }}
            >
              Alternative Approaches · Campaign Hub
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mb-5"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "oklch(var(--pearl))",
            }}
          >
            <span className="gold-gradient-text">Alternative Approaches</span>
            <br />
            <span style={{ color: "oklch(var(--pearl))" }}>
              to Your Best Life
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(0.62 0.04 260)" }}
          >
            15 campaign designs across every dimension of living — ready to
            share, adapt, and amplify worldwide. Each one connects people to the
            highest possible quality of life.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { label: "15 Campaigns", icon: Megaphone },
              { label: "10 Life Areas", icon: Globe },
              { label: "6 Platforms", icon: Network },
              { label: "1 Shared Vision", icon: Sparkles },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "oklch(0.14 0.04 260)",
                  border: "1px solid oklch(0.72 0.16 75 / 0.2)",
                  color: "oklch(0.88 0.08 75)",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ──────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-20 py-4"
        style={{
          background: "oklch(0.10 0.04 260 / 0.96)",
          borderBottom: "1px solid oklch(0.72 0.16 75 / 0.12)",
          backdropFilter: "blur(12px)",
        }}
        data-ocid="campaigns.filter.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
          {/* Platform tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span
              className="text-xs font-semibold shrink-0"
              style={{ color: "oklch(0.50 0.04 260)" }}
            >
              Platform:
            </span>
            {(["All", ...ALL_PLATFORMS] as const).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setActivePlatform(p as Platform | "All")}
                className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150"
                style={
                  activePlatform === p
                    ? {
                        background: "oklch(0.72 0.16 75 / 0.18)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.5)",
                        color: "oklch(0.88 0.12 75)",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        color: "oklch(0.55 0.04 260)",
                      }
                }
                data-ocid="campaigns.platform.tab"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span
              className="text-xs font-semibold shrink-0"
              style={{ color: "oklch(0.50 0.04 260)" }}
            >
              Category:
            </span>
            {(["All", ...ALL_CATEGORIES] as const).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat as Category | "All")}
                className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150"
                style={
                  activeCategory === cat
                    ? {
                        background: "oklch(0.55 0.14 195 / 0.18)",
                        border: "1px solid oklch(0.55 0.14 195 / 0.5)",
                        color: "oklch(0.75 0.12 195)",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        color: "oklch(0.55 0.04 260)",
                      }
                }
                data-ocid="campaigns.category.tab"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Campaign Grid ─────────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
        data-ocid="campaigns.grid.section"
      >
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
              data-ocid="campaigns.empty_state"
            >
              <CheckCircle2
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "oklch(0.45 0.04 260)" }}
              />
              <p
                className="text-base"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                No campaigns match those filters. Try adjusting your selection.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="campaigns.list"
            >
              {filtered.map((campaign, i) => (
                <CampaignCard key={campaign.id} campaign={campaign} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        {filtered.length > 0 && (
          <p
            className="text-center text-xs mt-8"
            style={{ color: "oklch(0.45 0.04 260)" }}
          >
            Showing {filtered.length} of {CAMPAIGNS.length} campaigns
          </p>
        )}
      </section>

      {/* ── Bottom CTA Banner ─────────────────────────────────────────────── */}
      <section
        data-ocid="campaigns.cta.section"
        className="relative overflow-hidden py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.10 0.04 260) 0%, oklch(0.13 0.06 240) 50%, oklch(0.10 0.04 260) 100%)",
          borderTop: "1px solid oklch(0.72 0.16 75 / 0.12)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.72 0.16 75 / 0.05) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Megaphone
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: "oklch(0.88 0.12 75)" }}
            />
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "oklch(var(--pearl))",
              }}
            >
              Ready to launch your own campaign?
            </h2>
            <p
              className="text-base sm:text-lg mb-8 leading-relaxed"
              style={{ color: "oklch(0.62 0.04 260)" }}
            >
              Register your organization and get full access to the Campaign Hub
              — customize, co-brand, and amplify these designs across every
              channel worldwide.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/register"
                data-ocid="campaigns.register.primary_button"
              >
                <Button
                  size="lg"
                  className="btn-gold gap-2 px-8 py-5 text-base"
                >
                  <Users className="h-4 w-4" />
                  Register Now
                </Button>
              </Link>
              <Link
                to="/pricing"
                data-ocid="campaigns.pricing.secondary_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8 py-5 text-base"
                  style={{
                    borderColor: "oklch(0.55 0.14 195 / 0.4)",
                    color: "oklch(0.75 0.12 195)",
                    background: "oklch(0.55 0.14 195 / 0.06)",
                  }}
                >
                  <BookOpen className="h-4 w-4" />
                  See Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer attribution ────────────────────────────────────────────── */}
      <div
        className="py-6 text-center"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
      >
        <p className="text-xs" style={{ color: "oklch(0.42 0.03 260)" }}>
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "oklch(0.55 0.04 260)" }}
          >
            Built with ❤️ using caffeine.ai
          </a>
        </p>
      </div>
    </main>
  );
}
