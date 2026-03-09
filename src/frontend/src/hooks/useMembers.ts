import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MemberRegion, MemberStatus, MemberType } from "../backend.d";
import type { MemberEntity } from "../backend.d";
import { useActor } from "./useActor";

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_MEMBERS: MemberEntity[] = [
  {
    id: BigInt(1),
    name: "Republic of Costa Rica",
    memberType: MemberType.nation,
    region: MemberRegion.latinAmerica,
    country: "Costa Rica",
    status: MemberStatus.active,
    description:
      "A global pioneer in environmental policy and renewable energy, Costa Rica has abolished its military and leads the world in carbon neutrality and biodiversity protection.",
    languages: ["es", "en"],
    website: "https://www.presidencia.go.cr",
    contactEmail: "intl@presidencia.go.cr",
    joinedDate: "2024-01-15",
  },
  {
    id: BigInt(2),
    name: "City of Amsterdam",
    memberType: MemberType.city,
    region: MemberRegion.europe,
    country: "Netherlands",
    status: MemberStatus.active,
    description:
      "Amsterdam's doughnut economics model is redefining urban sustainability — measuring prosperity not by GDP but by meeting human needs within planetary boundaries.",
    languages: ["nl", "en", "fr"],
    website: "https://www.amsterdam.nl",
    contactEmail: "international@amsterdam.nl",
    joinedDate: "2024-02-08",
  },
  {
    id: BigInt(3),
    name: "Doctors Without Borders",
    memberType: MemberType.ngo,
    region: MemberRegion.global,
    country: "Switzerland",
    status: MemberStatus.active,
    description:
      "MSF delivers emergency medical aid to people affected by conflict, epidemics, disasters, or exclusion from healthcare in over 70 countries worldwide.",
    languages: ["en", "fr", "es", "ar"],
    website: "https://www.msf.org",
    contactEmail: "office@msf.org",
    joinedDate: "2024-01-20",
  },
  {
    id: BigInt(4),
    name: "Mondragon Corporation",
    memberType: MemberType.cooperative,
    region: MemberRegion.europe,
    country: "Spain",
    status: MemberStatus.active,
    description:
      "The world's largest worker-owned cooperative federation — 80,000 worker-owners across 95 cooperatives demonstrating that democratic enterprise outperforms shareholder capitalism.",
    languages: ["es", "eu", "en"],
    website: "https://www.mondragon-corporation.com",
    contactEmail: "info@mondragon.edu",
    joinedDate: "2024-03-01",
  },
  {
    id: BigInt(5),
    name: "Ubuntu Village Network — Rwanda",
    memberType: MemberType.community,
    region: MemberRegion.africa,
    country: "Rwanda",
    status: MemberStatus.active,
    description:
      "A grassroots network of 240 villages applying Ubuntu philosophy to post-conflict reconciliation, regenerative agriculture, and community-led governance.",
    languages: ["rw", "en", "fr"],
    website: "https://ubuntuvillage.rw",
    contactEmail: "connect@ubuntuvillage.rw",
    joinedDate: "2024-03-18",
  },
  {
    id: BigInt(6),
    name: "Republic of Bhutan",
    memberType: MemberType.nation,
    region: MemberRegion.asiaPacific,
    country: "Bhutan",
    status: MemberStatus.active,
    description:
      "Bhutan pioneered Gross National Happiness as an alternative to GDP and remains carbon-negative — absorbing more CO2 than it emits. A living proof that a different measure of progress works.",
    languages: ["dz", "en"],
    website: "https://www.bhutan.gov.bt",
    contactEmail: "mfa@mfa.gov.bt",
    joinedDate: "2024-04-05",
  },
  {
    id: BigInt(7),
    name: "Patagonia Inc.",
    memberType: MemberType.corporate,
    region: MemberRegion.northAmerica,
    country: "United States",
    status: MemberStatus.active,
    description:
      "The outdoor apparel company that declared Earth its only shareholder — donating 100% of its $100M+ annual profits to environmental causes and proving profit and purpose coexist.",
    languages: ["en", "es", "de"],
    website: "https://www.patagonia.com",
    contactEmail: "grants@patagonia.com",
    joinedDate: "2024-04-22",
  },
  {
    id: BigInt(8),
    name: "Amal Alliance",
    memberType: MemberType.ngo,
    region: MemberRegion.middleEast,
    country: "Jordan",
    status: MemberStatus.observer,
    description:
      "Operating across Syria, Lebanon, Jordan, and Turkey — delivering education to 1.8 million displaced children and youth through innovative, accelerated learning programs.",
    languages: ["ar", "en", "tr"],
    website: "https://www.amalalliance.org",
    contactEmail: "partnerships@amalalliance.org",
    joinedDate: "2024-05-10",
  },
  {
    id: BigInt(9),
    name: "Dr. Amara Diallo",
    memberType: MemberType.individual,
    region: MemberRegion.africa,
    country: "Senegal",
    status: MemberStatus.active,
    description:
      "Epidemiologist, AI health researcher, and founder of the West Africa Digital Health Initiative. Pioneering mobile diagnostics for rural communities across 12 African nations.",
    languages: ["fr", "wo", "en"],
    website: "https://amaradiallo.org",
    contactEmail: "dr.diallo@wadhi.org",
    joinedDate: "2024-05-28",
  },
  {
    id: BigInt(10),
    name: "City of Medellín",
    memberType: MemberType.city,
    region: MemberRegion.latinAmerica,
    country: "Colombia",
    status: MemberStatus.active,
    description:
      "Once the world's most violent city, Medellín transformed through social urbanism — cable cars connecting hillside communities, urban acupuncture, and radical public investment in the most marginalized.",
    languages: ["es"],
    website: "https://www.medellin.gov.co",
    contactEmail: "alcaldia@medellin.gov.co",
    joinedDate: "2024-06-14",
  },
  {
    id: BigInt(11),
    name: "Pacific Climate Warriors",
    memberType: MemberType.community,
    region: MemberRegion.asiaPacific,
    country: "Fiji",
    status: MemberStatus.active,
    description:
      "Indigenous island communities from 15 Pacific nations standing on the frontlines of climate change — demanding justice through nonviolent direct action, traditional knowledge, and international law.",
    languages: ["en", "fj", "to"],
    website: "https://www.350pacific.org",
    contactEmail: "pacific@350.org",
    joinedDate: "2024-07-02",
  },
  {
    id: BigInt(12),
    name: "FinFracFran Institute",
    memberType: MemberType.ngo,
    region: MemberRegion.global,
    country: "International",
    status: MemberStatus.applicant,
    description:
      "The global research and implementation body for the FinFracFran™ methodology — developing fractionalization and franchising frameworks for rapid, capital-friendly scaling of proven solutions across continents.",
    languages: ["en", "es", "fr", "ar", "zh"],
    website: "https://finfracfran.org",
    contactEmail: "institute@finfracfran.org",
    joinedDate: "2024-07-15",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useGetMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<MemberEntity[]>({
    queryKey: ["members"],
    queryFn: async () => {
      if (!actor) return SEED_MEMBERS;
      const result = await actor.getMembers();
      return result.length > 0 ? result : SEED_MEMBERS;
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useGetMember(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<MemberEntity | null>({
    queryKey: ["member", id.toString()],
    queryFn: async () => {
      if (!actor) return SEED_MEMBERS.find((m) => m.id === id) ?? null;
      return actor.getMember(id);
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useApplyForMembership() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      memberType: MemberType;
      region: MemberRegion;
      country: string;
      description: string;
      languages: string[];
      website: string;
      contactEmail: string;
    }) => {
      if (!actor) throw new Error("Wallet not connected");
      return actor.applyForMembership(
        params.name,
        params.memberType,
        params.region,
        params.country,
        params.description,
        params.languages,
        params.website,
        params.contactEmail,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useUpdateMemberStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: MemberStatus;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMemberStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useRemoveMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.removeMember(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
