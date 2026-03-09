import { Button } from "@/components/ui/button";
import { useGetAnnouncements } from "@/hooks/useQueries";
import { Megaphone, X } from "lucide-react";
import { useState } from "react";

export function AnnouncementsBar() {
  const { data: announcements } = useGetAnnouncements();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  if (!announcements || announcements.length === 0) return null;

  const visible = announcements.filter((a) => !dismissed.has(a.id.toString()));
  if (visible.length === 0) return null;

  const top = visible[0];

  const priorityColors: Record<string, string> = {
    high: "from-[oklch(0.65_0.22_27)] to-[oklch(0.55_0.18_27)]",
    medium: "from-[oklch(0.55_0.16_260)] to-[oklch(0.45_0.18_230)]",
    low: "from-[oklch(0.45_0.14_195)] to-[oklch(0.4_0.12_200)]",
  };

  const gradientClass =
    priorityColors[top.priority?.toLowerCase()] ?? priorityColors.medium;

  return (
    <div
      className={`announcement-bar bg-gradient-to-r ${gradientClass} py-2.5 px-4`}
      data-ocid="announcements.panel"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <Megaphone className="h-4 w-4 text-white shrink-0 opacity-90" />
        <div className="flex-1 min-w-0">
          <span className="text-white text-sm font-semibold mr-2">
            {top.title}
          </span>
          <span className="text-white/80 text-sm truncate hidden sm:inline">
            {top.body}
          </span>
        </div>
        <span className="text-white/60 text-xs shrink-0 hidden md:block">
          {top.date}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10 shrink-0"
          onClick={() =>
            setDismissed((prev) => new Set([...prev, top.id.toString()]))
          }
          data-ocid="announcements.close.button"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
