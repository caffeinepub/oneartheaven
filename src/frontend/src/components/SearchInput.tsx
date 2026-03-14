import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "data-ocid"?: string;
  id?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
}

/**
 * Platform-wide consistent search input.
 * Includes a Search icon on the left and an X clear button when text is present.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  "data-ocid": ocid,
  id,
  "aria-label": ariaLabel,
  "aria-controls": ariaControls,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
        style={{ color: "oklch(0.45 0.04 260)" }}
        aria-hidden="true"
      />
      <Input
        data-ocid={ocid}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        aria-controls={ariaControls}
        type="search"
        autoComplete="off"
        className="pl-9 pr-8 h-9 text-sm bg-transparent border-[oklch(var(--teal)/0.2)] text-white placeholder:text-[oklch(0.38_0.04_260)] focus-visible:ring-[oklch(var(--teal)/0.35)] focus-visible:ring-offset-[oklch(var(--cosmos-deep))]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--teal)/0.5)] focus-visible:ring-offset-1 focus-visible:ring-offset-[oklch(var(--cosmos-deep))]"
        >
          <X className="h-3.5 w-3.5" style={{ color: "oklch(0.5 0.04 260)" }} />
        </button>
      )}
    </div>
  );
}
