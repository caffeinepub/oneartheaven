import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { VendorCategory, VendorTier } from "@/data/vendorTypes";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe,
  Mail,
  ShoppingBag,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: VendorCategory[] = [
  "Governance",
  "Health",
  "Education",
  "Climate",
  "Technology",
  "Peace",
  "Economy",
  "Food",
  "Culture",
  "Assembly",
];

const TIERS: {
  value: VendorTier;
  label: string;
  desc: string;
  color: string;
}[] = [
  {
    value: "Seed",
    label: "Seed",
    desc: "Getting started — up to $25K revenue",
    color: "text-teal-400",
  },
  {
    value: "Growth",
    label: "Growth",
    desc: "Scaling up — $25K–$100K revenue",
    color: "text-violet-400",
  },
  {
    value: "Scale",
    label: "Scale",
    desc: "Expanding globally — $100K–$500K revenue",
    color: "text-amber-400",
  },
  {
    value: "Global",
    label: "Global",
    desc: "Planet-scale operations — $500K+",
    color: "text-yellow-400",
  },
];

const STEPS = ["Organisation", "Contact", "FinFracFran™", "Submit"];

interface FormState {
  // Step 1
  orgName: string;
  orgType: string;
  country: string;
  region: string;
  website: string;
  // Step 2
  contactName: string;
  contactEmail: string;
  phone: string;
  // Step 3
  finfracfranTier: VendorTier;
  categories: VendorCategory[];
  // Step 4
  motivation: string;
}

const EMPTY_FORM: FormState = {
  orgName: "",
  orgType: "",
  country: "",
  region: "",
  website: "",
  contactName: "",
  contactEmail: "",
  phone: "",
  finfracfranTier: "Seed",
  categories: [],
  motivation: "",
};

// ─── Step progress bar ────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div
      className="flex items-center gap-2 mb-8"
      data-ocid="vendor_register.step_indicator.panel"
    >
      {STEPS.map((label, idx) => {
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                  done
                    ? "bg-[oklch(0.65_0.18_142)] border-[oklch(0.65_0.18_142)] text-white"
                    : active
                      ? "border-[oklch(var(--gold))] text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.08)]"
                      : "border-[oklch(0.3_0.02_260)] text-[oklch(0.45_0.03_260)] bg-transparent"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span
                className={`text-xs whitespace-nowrap hidden sm:block ${
                  active
                    ? "text-[oklch(var(--gold))]"
                    : done
                      ? "text-[oklch(0.65_0.18_142)]"
                      : "text-[oklch(0.4_0.02_260)]"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-px w-8 sm:w-16 transition-all ${
                  done
                    ? "bg-[oklch(0.65_0.18_142)]"
                    : "bg-[oklch(0.25_0.02_260)]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Organisation Info ────────────────────────────────────────────────

function Step1({
  form,
  set,
}: { form: FormState; set: (p: Partial<FormState>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="vr-org-name"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
        >
          Organisation Name *
        </label>
        <Input
          placeholder="e.g. African Climate Alliance"
          value={form.orgName}
          onChange={(e) => set({ orgName: e.target.value })}
          className="bg-[oklch(0.14_0.02_260)] border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)]"
          data-ocid="vendor_register.step1.org_name.input"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="vr-org-type"
            className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
          >
            Organisation Type *
          </label>
          <select
            value={form.orgType}
            onChange={(e) => set({ orgType: e.target.value })}
            className="w-full h-10 rounded-md px-3 text-sm bg-[oklch(0.14_0.02_260)] border border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)] focus:outline-none focus:ring-2 focus:ring-[oklch(var(--gold)/0.5)]"
            data-ocid="vendor_register.step1.org_type.select"
          >
            <option value="">Select type…</option>
            {[
              "NGO",
              "Nation",
              "Cooperative",
              "Corporate",
              "DAO",
              "Foundation",
              "Community",
              "City",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="vr-country"
            className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
          >
            Country *
          </label>
          <Input
            placeholder="e.g. Kenya"
            value={form.country}
            onChange={(e) => set({ country: e.target.value })}
            className="bg-[oklch(0.14_0.02_260)] border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)]"
            data-ocid="vendor_register.step1.country.input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="vr-region"
            className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
          >
            Region *
          </label>
          <select
            value={form.region}
            onChange={(e) => set({ region: e.target.value })}
            className="w-full h-10 rounded-md px-3 text-sm bg-[oklch(0.14_0.02_260)] border border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)] focus:outline-none focus:ring-2 focus:ring-[oklch(var(--gold)/0.5)]"
            data-ocid="vendor_register.step1.region.select"
          >
            <option value="">Select region…</option>
            {[
              "Africa",
              "Americas",
              "Asia",
              "Europe",
              "Oceania",
              "MENA",
              "Global",
            ].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="vr-website"
            className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
          >
            Website
          </label>
          <Input
            placeholder="https://"
            value={form.website}
            onChange={(e) => set({ website: e.target.value })}
            className="bg-[oklch(0.14_0.02_260)] border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)]"
            data-ocid="vendor_register.step1.website.input"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Contact Info ─────────────────────────────────────────────────────

function Step2({
  form,
  set,
}: { form: FormState; set: (p: Partial<FormState>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="vr-contact-name"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
        >
          Contact Name *
        </label>
        <Input
          placeholder="Full name"
          value={form.contactName}
          onChange={(e) => set({ contactName: e.target.value })}
          className="bg-[oklch(0.14_0.02_260)] border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)]"
          data-ocid="vendor_register.step2.contact_name.input"
        />
      </div>
      <div>
        <label
          htmlFor="vr-contact-email"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
        >
          Contact Email *
        </label>
        <Input
          type="email"
          placeholder="vendor@yourorg.org"
          value={form.contactEmail}
          onChange={(e) => set({ contactEmail: e.target.value })}
          className="bg-[oklch(0.14_0.02_260)] border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)]"
          data-ocid="vendor_register.step2.contact_email.input"
        />
      </div>
      <div>
        <label
          htmlFor="vr-phone"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
        >
          Phone (optional)
        </label>
        <Input
          placeholder="+1 555 000 0000"
          value={form.phone}
          onChange={(e) => set({ phone: e.target.value })}
          className="bg-[oklch(0.14_0.02_260)] border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)]"
          data-ocid="vendor_register.step2.phone.input"
        />
      </div>
    </div>
  );
}

// ─── Step 3: FinFracFran™ Tier & Categories ───────────────────────────────────

function Step3({
  form,
  set,
}: { form: FormState; set: (p: Partial<FormState>) => void }) {
  function toggleCategory(cat: VendorCategory) {
    const next = form.categories.includes(cat)
      ? form.categories.filter((c) => c !== cat)
      : [...form.categories, cat];
    set({ categories: next });
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="vr-ff-tier"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-3"
        >
          FinFracFran™ Entry Tier *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIERS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => set({ finfracfranTier: t.value })}
              data-ocid={`vendor_register.step3.tier_${t.value.toLowerCase()}.toggle`}
              className={`text-left p-4 rounded-xl border transition-all ${
                form.finfracfranTier === t.value
                  ? "border-[oklch(var(--gold)/0.6)] bg-[oklch(var(--gold)/0.07)]"
                  : "border-[oklch(0.25_0.02_260)] bg-[oklch(0.12_0.01_260)] hover:border-[oklch(0.35_0.02_260)]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Star className={`w-3.5 h-3.5 ${t.color}`} />
                <span className={`font-semibold text-sm ${t.color}`}>
                  {t.label}
                </span>
                {form.finfracfranTier === t.value && (
                  <CheckCircle2
                    className="w-3.5 h-3.5 ml-auto"
                    style={{ color: "oklch(var(--gold))" }}
                  />
                )}
              </div>
              <p className="text-xs text-[oklch(0.5_0.03_260)]">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="vr-categories"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-2"
        >
          Categories (select all that apply) *
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = form.categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                data-ocid={`vendor_register.step3.category_${cat.toLowerCase()}.toggle`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? "border-[oklch(var(--gold)/0.6)] text-[oklch(var(--gold))] bg-[oklch(var(--gold)/0.1)]"
                    : "border-[oklch(0.25_0.02_260)] text-[oklch(0.55_0.03_260)] hover:border-[oklch(0.35_0.02_260)] hover:text-[oklch(0.75_0.03_260)]"
                }`}
              >
                {active && <span className="mr-1">✓</span>}
                {cat}
              </button>
            );
          })}
        </div>
        {form.categories.length === 0 && (
          <p className="text-xs text-[oklch(0.55_0.12_27)] mt-1.5">
            Select at least one category.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Step 4: Motivation & Submit ──────────────────────────────────────────────

function Step4({
  form,
  set,
}: { form: FormState; set: (p: Partial<FormState>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="vr-motivation"
          className="block text-xs text-[oklch(0.55_0.03_260)] mb-1.5"
        >
          Why do you want to become an ONEartHeaven™ Vendor? *
        </label>
        <textarea
          rows={5}
          placeholder="Describe your organisation's mission, what solutions you offer, and how you plan to contribute to the platform..."
          value={form.motivation}
          onChange={(e) => set({ motivation: e.target.value })}
          className="w-full rounded-md px-3 py-2 text-sm bg-[oklch(0.14_0.02_260)] border border-[oklch(0.25_0.02_260)] text-[oklch(0.9_0.01_95)] placeholder-[oklch(0.4_0.02_260)] resize-none focus:outline-none focus:ring-2 focus:ring-[oklch(var(--gold)/0.5)]"
          data-ocid="vendor_register.step4.motivation.textarea"
        />
        <p className="text-xs text-[oklch(0.4_0.03_260)] mt-1">
          {form.motivation.length} / 500 characters
        </p>
      </div>

      {/* Summary card */}
      <div
        className="rounded-xl p-4 space-y-2"
        style={{
          background: "oklch(0.14 0.02 260)",
          border: "1px solid oklch(var(--gold)/0.15)",
        }}
      >
        <p className="text-xs font-semibold text-[oklch(var(--gold))] uppercase tracking-wider mb-3">
          Application Summary
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          <span className="text-[oklch(0.5_0.03_260)]">Organisation</span>
          <span className="text-[oklch(0.85_0.01_95)] truncate">
            {form.orgName || "—"}
          </span>
          <span className="text-[oklch(0.5_0.03_260)]">Type</span>
          <span className="text-[oklch(0.85_0.01_95)]">
            {form.orgType || "—"}
          </span>
          <span className="text-[oklch(0.5_0.03_260)]">Country</span>
          <span className="text-[oklch(0.85_0.01_95)]">
            {form.country || "—"}
          </span>
          <span className="text-[oklch(0.5_0.03_260)]">Contact</span>
          <span className="text-[oklch(0.85_0.01_95)] truncate">
            {form.contactEmail || "—"}
          </span>
          <span className="text-[oklch(0.5_0.03_260)]">FF™ Tier</span>
          <span className="text-[oklch(var(--gold))] font-semibold">
            {form.finfracfranTier}
          </span>
          <span className="text-[oklch(0.5_0.03_260)]">Categories</span>
          <span className="text-[oklch(0.85_0.01_95)] truncate">
            {form.categories.join(", ") || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Confirmation screen ──────────────────────────────────────────────────────

function ConfirmationScreen({
  refId,
  orgName,
}: { refId: string; orgName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8 space-y-6"
      data-ocid="vendor_register.confirmation.panel"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: "oklch(0.65 0.18 142 / 0.15)",
          border: "2px solid oklch(0.65 0.18 142 / 0.4)",
        }}
      >
        <BadgeCheck className="w-10 h-10 text-[oklch(0.65_0.18_142)]" />
      </div>
      <div>
        <h2 className="text-2xl font-display font-bold text-[oklch(0.9_0.01_95)] mb-2">
          Application Received!
        </h2>
        <p className="text-[oklch(0.6_0.03_260)] text-sm max-w-sm mx-auto">
          Your vendor application for{" "}
          <strong className="text-[oklch(0.85_0.01_95)]">{orgName}</strong> has
          been submitted and is under review.
        </p>
      </div>
      <div
        className="inline-block px-5 py-3 rounded-xl text-sm"
        style={{
          background: "oklch(0.14 0.02 260)",
          border: "1px solid oklch(var(--gold)/0.2)",
        }}
      >
        <p className="text-xs text-[oklch(0.5_0.03_260)] mb-1">Reference ID</p>
        <p className="font-mono font-bold text-[oklch(var(--gold))] tracking-wider">
          {refId}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[oklch(0.5_0.03_260)]">Next steps:</p>
        <div className="text-left max-w-xs mx-auto space-y-2">
          {[
            "Your application is sent to the admin approval queue",
            "An admin will review and assign your Vendor role",
            "You'll be able to access your Vendor Dashboard once approved",
          ].map((step) => (
            <div
              key={step}
              className="flex items-start gap-2 text-xs text-[oklch(0.6_0.03_260)]"
            >
              <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[oklch(var(--gold))]" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link to="/governance">
          <Button
            variant="outline"
            className="border-[oklch(var(--gold)/0.3)] text-[oklch(var(--pearl))]"
            data-ocid="vendor_register.confirmation.governance.link"
          >
            <Globe className="w-4 h-4 mr-2" /> Explore Platform
          </Button>
        </Link>
        <Link to="/vendor/dashboard">
          <Button
            className="btn-gold"
            data-ocid="vendor_register.confirmation.dashboard.link"
          >
            <ShoppingBag className="w-4 h-4 mr-2" /> Go to Vendor Dashboard
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function VendorRegisterPage() {
  const { role } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [refId] = useState(
    () => `VND-${Date.now().toString(36).toUpperCase()}`,
  );

  function set(partial: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (
        !form.orgName.trim() ||
        !form.orgType ||
        !form.country ||
        !form.region
      ) {
        toast.error("Please fill in all required fields.");
        return false;
      }
    }
    if (step === 1) {
      if (!form.contactName.trim() || !form.contactEmail.trim()) {
        toast.error("Contact name and email are required.");
        return false;
      }
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.contactEmail)) {
        toast.error("Please enter a valid email address.");
        return false;
      }
    }
    if (step === 2) {
      if (form.categories.length === 0) {
        toast.error("Please select at least one category.");
        return false;
      }
    }
    if (step === 3) {
      if (form.motivation.trim().length < 30) {
        toast.error(
          "Please provide at least 30 characters in your motivation.",
        );
        return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  }

  function handleSubmit() {
    if (!validateStep()) return;
    setSubmitted(true);
    toast.success(`Vendor application submitted! Reference ID: ${refId}`);
  }

  const isVendor = role === "Vendor";

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-cosmos)" }}
    >
      {/* Hero */}
      <div
        className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "var(--gradient-teal)" }}
      >
        <div className="hero-grid-texture" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "oklch(0.65 0.18 195 / 0.15)",
              border: "1px solid oklch(0.65 0.18 195 / 0.35)",
              color: "oklch(0.75 0.15 195)",
            }}
          >
            <ShoppingBag className="w-3 h-3" />
            Phase 11 — Vendor Self-Service Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[oklch(0.95_0.01_95)] mb-3">
            Become a Vendor
          </h1>
          <p className="text-[oklch(0.7_0.04_220)] text-base max-w-lg mx-auto">
            Join the ONEartHeaven™ Vendor Network. List your franchises,
            campaigns, and enterprise offerings — and earn FinFracFran™
            attribution across 194 nations.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Already a vendor notice */}
        {isVendor && !submitted && (
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-6 text-sm"
            style={{
              background: "oklch(0.65 0.18 142 / 0.1)",
              border: "1px solid oklch(0.65 0.18 142 / 0.3)",
            }}
          >
            <BadgeCheck className="w-5 h-5 text-[oklch(0.65_0.18_142)] shrink-0" />
            <div>
              <p className="font-semibold text-[oklch(0.75_0.15_142)]">
                You are already a Vendor.
              </p>
              <p className="text-[oklch(0.55_0.03_260)] text-xs mt-0.5">
                Your account has the Vendor role.{" "}
                <Link
                  to="/vendor/dashboard"
                  className="underline text-[oklch(var(--gold))]"
                >
                  Go to your dashboard
                </Link>
              </p>
            </div>
          </div>
        )}

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "oklch(0.11 0.015 260)",
            border: "1px solid oklch(var(--gold) / 0.12)",
          }}
        >
          {submitted ? (
            <ConfirmationScreen refId={refId} orgName={form.orgName} />
          ) : (
            <>
              <StepIndicator current={step} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg font-display font-bold text-[oklch(0.9_0.01_95)] mb-1">
                    {step === 0 && "Organisation Information"}
                    {step === 1 && "Contact Details"}
                    {step === 2 && "FinFracFran™ Profile"}
                    {step === 3 && "Motivation & Review"}
                  </h2>
                  <p className="text-xs text-[oklch(0.5_0.03_260)] mb-6">
                    {step === 0 && "Tell us about your organisation."}
                    {step === 1 &&
                      "Who should we contact about this application?"}
                    {step === 2 &&
                      "Select your FinFracFran™ entry tier and the categories you operate in."}
                    {step === 3 &&
                      "Review your application and explain your goals."}
                  </p>

                  {step === 0 && <Step1 form={form} set={set} />}
                  {step === 1 && <Step2 form={form} set={set} />}
                  {step === 2 && <Step3 form={form} set={set} />}
                  {step === 3 && <Step4 form={form} set={set} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[oklch(0.2_0.02_260)]">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="text-[oklch(0.55_0.03_260)] hover:text-[oklch(var(--pearl))] gap-1.5 disabled:opacity-30"
                  data-ocid="vendor_register.back.button"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="btn-gold gap-1.5"
                    data-ocid="vendor_register.next.button"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="btn-gold gap-1.5"
                    data-ocid="vendor_register.submit.button"
                  >
                    <Mail className="w-4 h-4" /> Submit Application
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
