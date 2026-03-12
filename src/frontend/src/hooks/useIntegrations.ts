import {
  API_ENDPOINTS,
  API_USAGE_LOGS,
  INTEGRATION_PARTNERS,
  INTEGRATION_STATS,
  WEBHOOK_CONFIGS,
} from "@/data/integrationData";
import type {
  APIEndpoint,
  IntegrationPartner,
  WebhookConfig,
} from "@/data/integrationTypes";
import { useMemo, useState } from "react";

export function useAPIEndpoints(moduleFilter?: string, statusFilter?: string) {
  const [search, setSearch] = useState("");
  const [activeModule, setActiveModule] = useState(moduleFilter ?? "all");
  const [activeStatus, setActiveStatus] = useState(statusFilter ?? "all");
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(
    null,
  );

  const filtered = useMemo(() => {
    return API_ENDPOINTS.filter((ep) => {
      const matchModule = activeModule === "all" || ep.module === activeModule;
      const matchStatus = activeStatus === "all" || ep.status === activeStatus;
      const matchSearch =
        search === "" ||
        ep.name.toLowerCase().includes(search.toLowerCase()) ||
        ep.path.toLowerCase().includes(search.toLowerCase()) ||
        ep.description.toLowerCase().includes(search.toLowerCase());
      return matchModule && matchStatus && matchSearch;
    });
  }, [activeModule, activeStatus, search]);

  return {
    endpoints: filtered,
    search,
    setSearch,
    activeModule,
    setActiveModule,
    activeStatus,
    setActiveStatus,
    selectedEndpoint,
    openEndpoint: (ep: APIEndpoint) => setSelectedEndpoint(ep),
    closeEndpoint: () => setSelectedEndpoint(null),
    activeFilterCount:
      (activeModule !== "all" ? 1 : 0) +
      (activeStatus !== "all" ? 1 : 0) +
      (search !== "" ? 1 : 0),
    clearFilters: () => {
      setSearch("");
      setActiveModule("all");
      setActiveStatus("all");
    },
  };
}

export function useIntegrationPartners(
  typeFilter?: string,
  statusFilter?: string,
) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState(typeFilter ?? "all");
  const [activeStatus, setActiveStatus] = useState(statusFilter ?? "all");
  const [selectedPartner, setSelectedPartner] =
    useState<IntegrationPartner | null>(null);

  const filtered = useMemo(() => {
    return INTEGRATION_PARTNERS.filter((p) => {
      const matchType = activeType === "all" || p.type === activeType;
      const matchStatus = activeStatus === "all" || p.status === activeStatus;
      const matchSearch =
        search === "" ||
        p.orgName.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [activeType, activeStatus, search]);

  return {
    partners: filtered,
    search,
    setSearch,
    activeType,
    setActiveType,
    activeStatus,
    setActiveStatus,
    selectedPartner,
    openPartner: (p: IntegrationPartner) => setSelectedPartner(p),
    closePartner: () => setSelectedPartner(null),
    activeFilterCount:
      (activeType !== "all" ? 1 : 0) +
      (activeStatus !== "all" ? 1 : 0) +
      (search !== "" ? 1 : 0),
    clearFilters: () => {
      setSearch("");
      setActiveType("all");
      setActiveStatus("all");
    },
  };
}

export function useWebhooks(eventTypeFilter?: string) {
  const [activeEventType, setActiveEventType] = useState(
    eventTypeFilter ?? "all",
  );
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookConfig | null>(
    null,
  );

  const filtered = useMemo(() => {
    return WEBHOOK_CONFIGS.filter((wh) => {
      return activeEventType === "all" || wh.eventType === activeEventType;
    });
  }, [activeEventType]);

  return {
    webhooks: filtered,
    activeEventType,
    setActiveEventType,
    selectedWebhook,
    openWebhook: (wh: WebhookConfig) => setSelectedWebhook(wh),
    closeWebhook: () => setSelectedWebhook(null),
  };
}

export function useAPIUsageLogs(endpointId?: string) {
  return useMemo(() => {
    if (!endpointId) return API_USAGE_LOGS;
    return API_USAGE_LOGS.filter((log) => log.endpointId === endpointId);
  }, [endpointId]);
}

export function useIntegrationStats() {
  return INTEGRATION_STATS;
}
