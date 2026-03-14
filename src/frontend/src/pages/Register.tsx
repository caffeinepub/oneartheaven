import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApprovalStatus, useRequestApproval } from "@/hooks/useApprovals";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Loader2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ROLE_OPTIONS = [
  {
    value: "Delegate",
    label: "Delegate",
    description:
      "Participate in governance, vote on resolutions, and represent your community",
    icon: ShieldCheck,
    color: "teal",
  },
  {
    value: "Vendor",
    label: "Vendor",
    description:
      "List franchises, manage campaigns, and access the FinFracFran™ ecosystem",
    icon: Building2,
    color: "purple",
  },
  {
    value: "Observer",
    label: "Observer",
    description:
      "Read-only access to explore the full platform and all public data",
    icon: Globe2,
    color: "slate",
  },
];

type Step = "login" | "form" | "success";

export function RegisterPage() {
  const { isAuthenticated, userProfile, login } = useAuth();
  const { data: isApproved } = useApprovalStatus();
  const requestApproval = useRequestApproval();

  const [step, setStep] = useState<Step>(isAuthenticated ? "form" : "login");
  const [displayName, setDisplayName] = useState(
    userProfile?.displayName ?? "",
  );
  const [orgName, setOrgName] = useState("");
  const [country, setCountry] = useState("");
  const [requestedRole, setRequestedRole] = useState("Observer");
  const [motivation, setMotivation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceId] = useState(
    () => `OEH-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
  );

  // If already approved, show success card
  if (isApproved) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "oklch(var(--cosmos-deep))" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cosmos-card rounded-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-5"
          style={{
            background: "oklch(var(--cosmos-mid))",
            border: "1px solid oklch(var(--gold)/0.25)",
          }}
          data-ocid="register.already_approved.panel"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "oklch(0.72_0.16_160/0.15)",
              border: "1px solid oklch(0.72_0.16_160/0.35)",
            }}
          >
            <BadgeCheck className="w-8 h-8 text-teal-300" />
          </div>
          <div className="flex flex-col gap-2">
            <h2
              className="heading-card text-xl"
              style={{ color: "oklch(var(--pearl))" }}
            >
              You already have access
            </h2>
            <p className="text-sm text-[oklch(0.6_0.03_260)] leading-relaxed">
              Your account is approved and active. Head to the Governance Hub to
              get started.
            </p>
          </div>
          <Link to="/governance">
            <Button
              className="btn-gold gap-2"
              data-ocid="register.governance_hub.button"
            >
              Go to Governance Hub <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!displayName.trim()) newErrors.displayName = "Display name is required";
    if (!orgName.trim()) newErrors.orgName = "Organization name is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (motivation.trim().length < 50)
      newErrors.motivation = "Motivation must be at least 50 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await requestApproval.mutateAsync();
      setStep("success");
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--cosmos-deep))" }}
    >
      {/* Hero */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "var(--gradient-navy)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--gold)/0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--gold)/0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-6"
              style={{
                color: "oklch(var(--gold))",
                borderColor: "oklch(var(--gold)/0.3)",
                background: "oklch(var(--gold)/0.08)",
              }}
            >
              Phase 11 — Area 2
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(var(--gold))] animate-pulse" />
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-display font-bold tracking-tight mb-4"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Join the Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[oklch(0.65_0.03_260)] text-lg leading-relaxed"
          >
            Request access to ONEartHeaven™ — the world&apos;s first
            decentralized global governance platform.
          </motion.p>
        </div>
      </div>

      {/* Form container */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {step === "login" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cosmos-card rounded-2xl p-8 flex flex-col items-center text-center gap-6"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(var(--gold)/0.2)",
            }}
            data-ocid="register.login.panel"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(var(--gold)/0.1)",
                border: "1px solid oklch(var(--gold)/0.25)",
              }}
            >
              <Wallet
                className="w-7 h-7"
                style={{ color: "oklch(var(--gold))" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2
                className="heading-card text-xl"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Step 1 — Connect Your Wallet
              </h2>
              <p className="text-sm text-[oklch(0.6_0.03_260)] leading-relaxed">
                Connect via Internet Identity to get your decentralized
                principal ID. This is your immutable identity on the platform.
              </p>
            </div>
            <Button
              className="btn-gold gap-2"
              onClick={() => {
                login();
                setTimeout(() => {
                  if (isAuthenticated) setStep("form");
                }, 2000);
              }}
              data-ocid="register.connect_wallet.button"
            >
              <Wallet className="w-4 h-4" /> Connect with Internet Identity
            </Button>
            <p className="text-xs text-[oklch(0.45_0.03_260)]">
              Already connected?{" "}
              <button
                type="button"
                onClick={() => setStep("form")}
                className="underline text-[oklch(var(--gold))] hover:opacity-80"
                data-ocid="register.skip_to_form.button"
              >
                Continue to form
              </button>
            </p>
          </motion.div>
        )}

        {step === "form" && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            data-ocid="register.form.panel"
          >
            <div
              className="cosmos-card rounded-2xl p-8 flex flex-col gap-5"
              style={{
                background: "oklch(var(--cosmos-mid))",
                border: "1px solid oklch(var(--gold)/0.2)",
              }}
            >
              <h2
                className="heading-card text-lg"
                style={{ color: "oklch(var(--gold))" }}
              >
                Step 2 — Your Details
              </h2>

              {/* Display Name */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="reg-name"
                  className="text-sm font-medium text-[oklch(0.8_0.02_260)] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" /> Display Name
                </Label>
                <Input
                  id="reg-name"
                  placeholder="Your full name or alias"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    setErrors((p) => ({ ...p, displayName: "" }));
                  }}
                  className="bg-[oklch(var(--cosmos-deep))] border-[oklch(var(--gold)/0.2)] text-[oklch(0.9_0.01_95)] placeholder:text-[oklch(0.4_0.03_260)]"
                  data-ocid="register.name.input"
                />
                {errors.displayName && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="register.name.error_state"
                  >
                    {errors.displayName}
                  </p>
                )}
              </div>

              {/* Org Name */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="reg-org"
                  className="text-sm font-medium text-[oklch(0.8_0.02_260)] flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5" /> Organization
                </Label>
                <Input
                  id="reg-org"
                  placeholder="Your organization or institution"
                  value={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value);
                    setErrors((p) => ({ ...p, orgName: "" }));
                  }}
                  className="bg-[oklch(var(--cosmos-deep))] border-[oklch(var(--gold)/0.2)] text-[oklch(0.9_0.01_95)] placeholder:text-[oklch(0.4_0.03_260)]"
                  data-ocid="register.org.input"
                />
                {errors.orgName && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="register.org.error_state"
                  >
                    {errors.orgName}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="reg-country"
                  className="text-sm font-medium text-[oklch(0.8_0.02_260)] flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" /> Country
                </Label>
                <Input
                  id="reg-country"
                  placeholder="Your country of residence or operation"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setErrors((p) => ({ ...p, country: "" }));
                  }}
                  className="bg-[oklch(var(--cosmos-deep))] border-[oklch(var(--gold)/0.2)] text-[oklch(0.9_0.01_95)] placeholder:text-[oklch(0.4_0.03_260)]"
                  data-ocid="register.country.input"
                />
                {errors.country && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="register.country.error_state"
                  >
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div
              className="cosmos-card rounded-2xl p-8 flex flex-col gap-4"
              style={{
                background: "oklch(var(--cosmos-mid))",
                border: "1px solid oklch(var(--gold)/0.2)",
              }}
            >
              <h2
                className="heading-card text-lg"
                style={{ color: "oklch(var(--gold))" }}
              >
                Requested Role
              </h2>
              <div
                className="flex flex-col gap-3"
                role="radiogroup"
                aria-label="Select your requested role"
                data-ocid="register.role.select"
              >
                {ROLE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = requestedRole === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRequestedRole(opt.value)}
                      className={`flex items-start gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-150 ${
                        isSelected
                          ? "border-[oklch(var(--gold)/0.5)] bg-[oklch(var(--gold)/0.07)]"
                          : "border-[oklch(1_0_0/0.07)] bg-[oklch(var(--cosmos-deep)/0.4)] hover:border-[oklch(var(--gold)/0.25)]"
                      }`}
                      aria-pressed={isSelected}
                      data-ocid={`register.role.${opt.value.toLowerCase()}.radio`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-[oklch(var(--gold)/0.15)] text-[oklch(var(--gold))]"
                            : "bg-[oklch(1_0_0/0.05)] text-[oklch(0.5_0.03_260)]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1">
                        <p
                          className={`text-sm font-semibold ${
                            isSelected
                              ? "text-[oklch(var(--pearl))]"
                              : "text-[oklch(0.75_0.02_260)]"
                          }`}
                        >
                          {opt.label}
                        </p>
                        <p className="text-xs text-[oklch(0.5_0.03_260)] leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border-2 shrink-0 mt-1 transition-all ${
                          isSelected
                            ? "border-[oklch(var(--gold))] bg-[oklch(var(--gold))]"
                            : "border-[oklch(0.4_0.03_260)]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motivation */}
            <div
              className="cosmos-card rounded-2xl p-8 flex flex-col gap-4"
              style={{
                background: "oklch(var(--cosmos-mid))",
                border: "1px solid oklch(var(--gold)/0.2)",
              }}
            >
              <h2
                className="heading-card text-lg"
                style={{ color: "oklch(var(--gold))" }}
              >
                Motivation Statement
              </h2>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="reg-motivation"
                  className="text-sm text-[oklch(0.6_0.03_260)] flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Why do you want to
                  join? (min. 50 characters)
                </Label>
                <Textarea
                  id="reg-motivation"
                  placeholder="Describe your background, mission, and how you plan to contribute to the platform..."
                  value={motivation}
                  onChange={(e) => {
                    setMotivation(e.target.value);
                    setErrors((p) => ({ ...p, motivation: "" }));
                  }}
                  rows={5}
                  className="bg-[oklch(var(--cosmos-deep))] border-[oklch(var(--gold)/0.2)] text-[oklch(0.9_0.01_95)] placeholder:text-[oklch(0.4_0.03_260)] resize-none"
                  data-ocid="register.motivation.textarea"
                />
                <div className="flex justify-between items-center">
                  {errors.motivation ? (
                    <p
                      className="text-xs text-red-400"
                      data-ocid="register.motivation.error_state"
                    >
                      {errors.motivation}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    className={`text-xs ${
                      motivation.length >= 50
                        ? "text-teal-400"
                        : "text-[oklch(0.45_0.03_260)]"
                    }`}
                  >
                    {motivation.length} / 50 min
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="btn-gold w-full h-12 text-base gap-2"
              disabled={requestApproval.isPending}
              data-ocid="register.submit_button"
            >
              {requestApproval.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Application <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.form>
        )}

        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="cosmos-card rounded-2xl p-10 flex flex-col items-center text-center gap-6"
            style={{
              background: "oklch(var(--cosmos-mid))",
              border: "1px solid oklch(0.72_0.16_160/0.35)",
            }}
            data-ocid="register.success.panel"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(0.72_0.16_160/0.15)",
                border: "1px solid oklch(0.72_0.16_160/0.35)",
              }}
            >
              <CheckCircle2 className="w-10 h-10 text-teal-300" />
            </div>
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border self-center bg-amber-500/10 text-amber-300 border-amber-500/25">
                Pending Review
              </span>
              <h2
                className="heading-card text-2xl"
                style={{ color: "oklch(var(--pearl))" }}
              >
                Application Submitted!
              </h2>
              <p className="text-sm text-[oklch(0.6_0.03_260)] leading-relaxed max-w-sm">
                Your access request has been submitted and is pending admin
                review. You will be notified once approved.
              </p>
            </div>
            <div
              className="px-6 py-3 rounded-xl font-mono text-sm"
              style={{
                background: "oklch(var(--cosmos-deep))",
                border: "1px solid oklch(var(--gold)/0.2)",
                color: "oklch(var(--gold))",
              }}
              data-ocid="register.reference_id.panel"
            >
              Reference: {referenceId}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link to="/governance" className="flex-1">
                <Button
                  className="btn-gold w-full gap-2"
                  data-ocid="register.success.governance_hub.button"
                >
                  Go to Governance Hub <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-[oklch(var(--gold)/0.25)] text-[oklch(var(--pearl))]"
                  data-ocid="register.success.home.button"
                >
                  Return Home
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
