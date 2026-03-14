import { Button } from "@/components/ui/button";
import type { UserRole } from "@/data/authTypes";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
}

export function RequireRole({ roles, children }: RequireRoleProps) {
  const { role } = useAuth();

  if (roles.includes(role)) {
    return <>{children}</>;
  }

  return (
    <div
      className="flex items-center justify-center min-h-[60vh] px-4"
      data-ocid="auth.access_denied.panel"
    >
      <div
        className="cosmos-card rounded-2xl p-10 flex flex-col items-center text-center gap-5 max-w-md w-full"
        style={{
          background: "oklch(var(--cosmos-mid))",
          border: "1px solid oklch(var(--gold)/0.2)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "oklch(0.7_0.18_27/0.12)",
            border: "1px solid oklch(0.7_0.18_27/0.3)",
          }}
        >
          <Lock className="w-7 h-7 text-[oklch(0.7_0.18_27)]" />
        </div>

        <div className="flex flex-col gap-2">
          <h2
            className="heading-card text-xl"
            style={{ color: "oklch(var(--pearl))" }}
          >
            Access Restricted
          </h2>
          <p className="text-sm text-[oklch(0.6_0.03_260)] leading-relaxed">
            You don&apos;t have permission to view this page. This area is
            reserved for{" "}
            <span className="text-[oklch(var(--gold))]">
              {roles.join(" or ")}
            </span>{" "}
            roles.
          </p>
        </div>

        <Link to="/governance">
          <Button className="btn-gold" data-ocid="auth.access_denied.button">
            Go to Governance Hub
          </Button>
        </Link>
      </div>
    </div>
  );
}
