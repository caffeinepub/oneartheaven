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
import { Textarea } from "@/components/ui/textarea";
import { COUNCILS } from "@/data/assemblyData";
import { CheckCircle2, Globe2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const REGION_OPTIONS = [
  { value: "africa", label: "Africa" },
  { value: "asia_pacific", label: "Asia-Pacific" },
  { value: "europe", label: "Europe" },
  { value: "latin_america", label: "Latin America" },
  { value: "middle_east", label: "Middle East" },
  { value: "north_america", label: "North America" },
  { value: "global", label: "Global" },
];

export function SubmitProposalDialog({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    council: "",
    region: "",
    summary: "",
    fullText: "",
    impact: "",
  });

  const isValid =
    form.title.trim().length >= 10 &&
    form.council &&
    form.region &&
    form.summary.trim().length >= 30 &&
    form.fullText.trim().length >= 100;

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!isValid) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);
    setStep("submitted");
    toast.success("Proposal submitted to the Global Assembly for review.");
  }

  function handleClose() {
    onOpenChange(false);
    setTimeout(() => {
      setStep("form");
      setForm({
        title: "",
        council: "",
        region: "",
        summary: "",
        fullText: "",
        impact: "",
      });
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="assembly.submit.dialog"
        className="sm:max-w-xl border"
        style={{
          background: "oklch(0.10 0.025 260)",
          borderColor: "oklch(0.18 0.03 260)",
        }}
      >
        {step === "form" ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl"
                  style={{ background: "oklch(0.55 0.18 200 / 0.15)" }}
                >
                  <Globe2
                    className="h-5 w-5"
                    style={{ color: "oklch(0.55 0.18 200)" }}
                  />
                </div>
                <DialogTitle
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.92 0.02 260)" }}
                >
                  Submit a Proposal
                </DialogTitle>
              </div>
              <DialogDescription style={{ color: "oklch(0.55 0.04 260)" }}>
                Proposals are reviewed by the relevant Council before entering
                deliberation. Provide as much detail as possible.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Title */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="proposal-title"
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(0.60 0.04 260)" }}
                >
                  Proposal Title *
                </Label>
                <Input
                  id="proposal-title"
                  data-ocid="assembly.submit.title.input"
                  placeholder="A clear, specific title (min 10 characters)"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.85_0.02_260)] placeholder:text-[oklch(0.38_0.04_260)]"
                />
              </div>

              {/* Council + Region */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "oklch(0.60 0.04 260)" }}
                  >
                    Council *
                  </Label>
                  <Select
                    value={form.council}
                    onValueChange={(v) => handleChange("council", v)}
                  >
                    <SelectTrigger
                      data-ocid="assembly.submit.council.select"
                      className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)]"
                    >
                      <SelectValue placeholder="Select council" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNCILS.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.icon} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "oklch(0.60 0.04 260)" }}
                  >
                    Primary Region *
                  </Label>
                  <Select
                    value={form.region}
                    onValueChange={(v) => handleChange("region", v)}
                  >
                    <SelectTrigger
                      data-ocid="assembly.submit.region.select"
                      className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.75_0.03_260)]"
                    >
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGION_OPTIONS.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="proposal-summary"
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(0.60 0.04 260)" }}
                >
                  Summary *{" "}
                  <span
                    style={{ color: "oklch(0.45 0.04 260)", fontWeight: 400 }}
                  >
                    (min 30 chars)
                  </span>
                </Label>
                <Textarea
                  id="proposal-summary"
                  data-ocid="assembly.submit.summary.textarea"
                  placeholder="A brief overview of what you are proposing and why it matters…"
                  rows={2}
                  value={form.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.82_0.03_260)] placeholder:text-[oklch(0.38_0.04_260)] resize-none"
                />
              </div>

              {/* Full text */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="proposal-text"
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(0.60 0.04 260)" }}
                >
                  Full Proposal Text *{" "}
                  <span
                    style={{ color: "oklch(0.45 0.04 260)", fontWeight: 400 }}
                  >
                    (min 100 chars)
                  </span>
                </Label>
                <Textarea
                  id="proposal-text"
                  data-ocid="assembly.submit.fulltext.textarea"
                  placeholder="Include background, the specific ask, implementation steps, and any FinFracFran™ application…"
                  rows={5}
                  value={form.fullText}
                  onChange={(e) => handleChange("fullText", e.target.value)}
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.82_0.03_260)] placeholder:text-[oklch(0.38_0.04_260)] resize-none"
                />
              </div>

              {/* Estimated impact */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="proposal-impact"
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(0.60 0.04 260)" }}
                >
                  Estimated Impact{" "}
                  <span
                    style={{ color: "oklch(0.45 0.04 260)", fontWeight: 400 }}
                  >
                    (optional)
                  </span>
                </Label>
                <Input
                  id="proposal-impact"
                  data-ocid="assembly.submit.impact.input"
                  placeholder="e.g. 500,000 people with access to clean water by Year 3"
                  value={form.impact}
                  onChange={(e) => handleChange("impact", e.target.value)}
                  className="bg-transparent border-[oklch(0.22_0.04_260)] text-[oklch(0.85_0.02_260)] placeholder:text-[oklch(0.38_0.04_260)]"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                data-ocid="assembly.submit.cancel.button"
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-[oklch(0.22_0.04_260)] text-[oklch(0.55_0.04_260)]"
              >
                Cancel
              </Button>
              <Button
                data-ocid="assembly.submit.submit.button"
                type="button"
                disabled={!isValid || isSubmitting}
                onClick={handleSubmit}
                className="gap-2 font-semibold"
                style={{
                  background: isValid
                    ? "linear-gradient(135deg, oklch(0.55 0.18 200) 0%, oklch(0.48 0.16 220) 100%)"
                    : "oklch(0.20 0.03 260)",
                  color: isValid
                    ? "oklch(0.96 0.01 260)"
                    : "oklch(0.40 0.04 260)",
                  border: "none",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit to Assembly"
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div
            data-ocid="assembly.submit.success_state"
            className="flex flex-col items-center justify-center text-center py-8 gap-4"
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full"
              style={{ background: "oklch(0.68 0.2 145 / 0.15)" }}
            >
              <CheckCircle2
                className="h-8 w-8"
                style={{ color: "oklch(0.68 0.2 145)" }}
              />
            </div>
            <div>
              <h3
                className="font-display text-xl font-bold mb-2"
                style={{ color: "oklch(0.92 0.02 260)" }}
              >
                Proposal Submitted
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.60 0.04 260)" }}
              >
                Your proposal has been received and will be reviewed by the
                relevant Council before entering deliberation. You will be
                notified when it is published.
              </p>
            </div>
            <Button
              data-ocid="assembly.submit.done.button"
              type="button"
              onClick={handleClose}
              className="mt-2 font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 200) 0%, oklch(0.48 0.16 220) 100%)",
                color: "oklch(0.96 0.01 260)",
                border: "none",
              }}
            >
              Back to Assembly
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
