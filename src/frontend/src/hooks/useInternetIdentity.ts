// Re-export useInternetIdentity from the core-infrastructure package.
// Local imports throughout the codebase use "@/hooks/useInternetIdentity" —
// this shim bridges the local path to the installed package.
export {
  useInternetIdentity,
  type InternetIdentityContext,
  type Status,
} from "@caffeineai/core-infrastructure";
