import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type Permission,
  ROLE_CONFIG,
  ROLE_PERMISSIONS,
  type UserProfile,
  type UserRole,
} from "@/data/authTypes";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  role: UserRole;
  orgId: string | null;
  login: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  hasPermission: (permission: Permission) => boolean;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  role: "Anonymous",
  orgId: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  hasPermission: () => false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SELF_ASSIGNABLE_ROLES: UserRole[] = ["Delegate", "Vendor", "Observer"];
const ADMIN_ROLES: UserRole[] = ["SuperAdmin", "OrgAdmin"];

function storageKey(principalId: string) {
  return `oeh_profile_${principalId}`;
}

function loadProfile(principalId: string): UserProfile | null {
  try {
    const raw = localStorage.getItem(storageKey(principalId));
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: UserProfile) {
  try {
    localStorage.setItem(
      storageKey(profile.principalId),
      JSON.stringify(profile),
    );
  } catch {
    /* noop */
  }
}

function deleteProfile(principalId: string) {
  try {
    localStorage.removeItem(storageKey(principalId));
  } catch {
    /* noop */
  }
}

// ---------------------------------------------------------------------------
// Name Setup Modal
// ---------------------------------------------------------------------------

function NameSetupModal({
  open,
  onSave,
}: {
  open: boolean;
  onSave: (displayName: string, role: UserRole) => void;
}) {
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Observer");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!name.trim()) {
      setError("Please enter a display name.");
      return;
    }
    onSave(name.trim(), selectedRole);
  }

  return (
    <Dialog open={open} data-ocid="auth.setup.dialog">
      <DialogContent
        className="border-[oklch(var(--gold)/0.25)] max-w-md"
        style={{ background: "oklch(var(--cosmos-mid))" }}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle
            className="heading-card text-xl"
            style={{ color: "oklch(var(--gold))" }}
          >
            Welcome to ONEartHeaven™
          </DialogTitle>
          <DialogDescription className="text-[oklch(0.65_0.03_260)] text-sm">
            Set up your profile to get started. Choose a display name and your
            role on the platform.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-2">
          {/* Display name */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="auth-setup-name"
              className="text-[oklch(0.8_0.02_260)] text-sm font-medium"
            >
              Display Name
            </Label>
            <Input
              id="auth-setup-name"
              placeholder="Your name or alias"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="bg-[oklch(var(--cosmos-deep))] border-[oklch(var(--gold)/0.2)] text-[oklch(0.9_0.01_95)] placeholder:text-[oklch(0.45_0.03_260)] focus-visible:ring-[oklch(var(--gold)/0.4)]"
              data-ocid="auth.setup.input"
              autoFocus
            />
            {error && (
              <p
                className="text-xs text-[oklch(0.7_0.18_27)]"
                data-ocid="auth.setup.error_state"
              >
                {error}
              </p>
            )}
          </div>

          {/* Role selection */}
          <div className="flex flex-col gap-2">
            <Label className="text-[oklch(0.8_0.02_260)] text-sm font-medium">
              Role
            </Label>
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label="Select your role"
              data-ocid="auth.role.select"
            >
              {/* Self-assignable roles */}
              {SELF_ASSIGNABLE_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                    selectedRole === r
                      ? "border-[oklch(var(--gold)/0.5)] bg-[oklch(var(--gold)/0.08)]"
                      : "border-[oklch(1_0_0/0.08)] bg-[oklch(var(--cosmos-deep)/0.5)] hover:border-[oklch(var(--gold)/0.25)]"
                  }`}
                  aria-pressed={selectedRole === r}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                      selectedRole === r
                        ? "border-[oklch(var(--gold))] bg-[oklch(var(--gold))]"
                        : "border-[oklch(0.4_0.03_260)]"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[oklch(0.9_0.01_95)]">
                      {ROLE_CONFIG[r].label}
                    </p>
                    <p className="text-xs text-[oklch(0.55_0.03_260)]">
                      {r === "Delegate" &&
                        "Participate in governance, vote on resolutions"}
                      {r === "Vendor" &&
                        "List franchises, manage campaigns & enterprises"}
                      {r === "Observer" &&
                        "Read-only access to the full platform"}
                    </p>
                  </div>
                </button>
              ))}

              {/* Admin roles — disabled, informational */}
              {ADMIN_ROLES.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[oklch(1_0_0/0.05)] bg-[oklch(var(--cosmos-deep)/0.3)] opacity-50 cursor-not-allowed"
                  aria-disabled="true"
                >
                  <span className="w-4 h-4 rounded-full border-2 border-[oklch(0.3_0.02_260)] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[oklch(0.6_0.02_260)]">
                      {ROLE_CONFIG[r].label}
                    </p>
                    <p className="text-xs text-[oklch(0.45_0.02_260)]">
                      Assigned by admin
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="btn-gold w-full mt-1"
            data-ocid="auth.setup.submit_button"
          >
            Save Profile & Enter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// AuthProvider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear } = useInternetIdentity();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!identity) {
      setUserProfile(null);
      setShowSetup(false);
      return;
    }
    const principalId = identity.getPrincipal().toString();
    const saved = loadProfile(principalId);
    if (saved) {
      setUserProfile(saved);
    } else {
      setShowSetup(true);
    }
  }, [identity]);

  const handleSetupSave = useCallback(
    (displayName: string, role: UserRole) => {
      if (!identity) return;
      const principalId = identity.getPrincipal().toString();
      const profile: UserProfile = {
        principalId,
        displayName,
        role,
        orgId: null,
        joinedAt: new Date().toISOString(),
      };
      saveProfile(profile);
      setUserProfile(profile);
      setShowSetup(false);
    },
    [identity],
  );

  const logout = useCallback(() => {
    if (userProfile) {
      deleteProfile(userProfile.principalId);
    }
    setUserProfile(null);
    setShowSetup(false);
    clear();
  }, [clear, userProfile]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      const currentRole: UserRole = userProfile?.role ?? "Anonymous";
      return ROLE_PERMISSIONS[currentRole].includes(permission);
    },
    [userProfile],
  );

  const role: UserRole = userProfile?.role ?? "Anonymous";
  const orgId = userProfile?.orgId ?? null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        role,
        orgId,
        login,
        logout,
        updateProfile,
        hasPermission,
      }}
    >
      {children}
      <NameSetupModal open={showSetup} onSave={handleSetupSave} />
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
