import type {
  ChatMessage,
  LivePoll,
  SessionAgendaItem,
  SessionParticipant,
  SessionRecord,
} from "./sessionTypes";

// ─── Seed Sessions ─────────────────────────────────────────────────────────

const SESSION_001: SessionRecord = {
  id: "sess-001",
  title: "Global Climate Finance Council — Emergency Session",
  type: "council-meeting",
  status: "active",
  councilId: "council-climate",
  councilName: "Climate Finance Council",
  scheduledAt: "2026-04-01T14:00:00Z",
  startedAt: "2026-04-01T14:03:00Z",
  description:
    "Emergency deliberation on the Green Transition Fund disbursement framework and carbon credit registry alignment.",
  agenda: [
    {
      id: "a001-1",
      title: "Opening Remarks & Quorum Confirmation",
      description:
        "Chair opens session and confirms quorum of participating delegates.",
      presenter: "Dr. Amara Diallo",
      presenterOrg: "Pacific Climate Cooperative",
      durationMinutes: 10,
      status: "completed",
      startedAt: "2026-04-01T14:03:00Z",
      completedAt: "2026-04-01T14:13:00Z",
    },
    {
      id: "a001-2",
      title: "Green Transition Fund Disbursement Proposal",
      description:
        "Review and vote on the proposed allocation framework for USD 2.4B in green transition funding.",
      presenter: "Finance Working Group",
      presenterOrg: "Global Finance Alliance",
      durationMinutes: 30,
      status: "active",
      startedAt: "2026-04-01T14:13:00Z",
      linkedResolutionId: "res-climate-001",
    },
    {
      id: "a001-3",
      title: "Carbon Credit Registry Standards",
      description:
        "Alignment vote on cross-platform carbon credit registry interoperability standards.",
      durationMinutes: 25,
      status: "pending",
    },
    {
      id: "a001-4",
      title: "Next Steps & Closing",
      description: "Chair summarizes outcomes and assigns action items.",
      durationMinutes: 10,
      status: "pending",
    },
  ] as SessionAgendaItem[],
  participants: [
    {
      userId: "u-001",
      displayName: "Dr. Amara Diallo",
      orgId: "org-1",
      orgName: "Pacific Climate Cooperative",
      role: "chair",
      joinedAt: "2026-04-01T13:58:00Z",
      speakingTimeSeconds: 420,
      votesCast: 0,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-002",
      displayName: "Sofia Reyes",
      orgId: "org-2",
      orgName: "Global Finance Alliance",
      role: "delegate",
      joinedAt: "2026-04-01T14:01:00Z",
      speakingTimeSeconds: 185,
      votesCast: 1,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-003",
      displayName: "Yusuf Al-Rashid",
      orgId: "org-3",
      orgName: "Eastern Mediterranean Council",
      role: "delegate",
      joinedAt: "2026-04-01T14:02:00Z",
      speakingTimeSeconds: 95,
      votesCast: 1,
      isActive: true,
      isMuted: true,
    },
    {
      userId: "u-004",
      displayName: "Lin Wei",
      orgId: "org-4",
      orgName: "Asia-Pacific Cooperative",
      role: "presenter",
      joinedAt: "2026-04-01T14:00:00Z",
      speakingTimeSeconds: 310,
      votesCast: 0,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-005",
      displayName: "Priya Nair",
      orgId: "org-5",
      orgName: "South Asia Development Network",
      role: "delegate",
      joinedAt: "2026-04-01T14:05:00Z",
      speakingTimeSeconds: 60,
      votesCast: 1,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-006",
      displayName: "Fatou Camara",
      orgId: "org-6",
      orgName: "West Africa Innovation Hub",
      role: "observer",
      joinedAt: "2026-04-01T14:08:00Z",
      speakingTimeSeconds: 0,
      votesCast: 0,
      isActive: true,
      isMuted: true,
    },
  ] as SessionParticipant[],
  polls: [
    {
      id: "poll-001",
      sessionId: "sess-001",
      question:
        "Should the Green Transition Fund prioritize SIDS (Small Island Developing States) allocations in Q1?",
      options: [
        { id: "opt-a", label: "Yes — prioritize SIDS", votes: 32 },
        { id: "opt-b", label: "No — maintain standard allocation", votes: 14 },
        { id: "opt-c", label: "Abstain", votes: 9 },
      ],
      status: "active",
      totalVotes: 55,
      openedAt: "2026-04-01T14:15:00Z",
    } as LivePoll,
  ],
  chat: [
    {
      id: "chat-001",
      sessionId: "sess-001",
      senderId: "u-002",
      senderName: "Sofia Reyes",
      senderOrg: "Global Finance Alliance",
      senderRole: "delegate",
      type: "message",
      body: "The disbursement framework needs clearer tiering for least-developed nations. We should table an amendment.",
      sentAt: "2026-04-01T14:10:00Z",
      reactions: { "👍": 4 },
      isFlagged: false,
    },
    {
      id: "chat-002",
      sessionId: "sess-001",
      senderId: "u-004",
      senderName: "Lin Wei",
      senderOrg: "Asia-Pacific Cooperative",
      senderRole: "presenter",
      type: "message",
      body: "Slide 7 shows the proposed tiering structure. SIDS allocations are already weighted 1.4x.",
      sentAt: "2026-04-01T14:11:00Z",
      reactions: {},
      isFlagged: false,
    },
    {
      id: "chat-003",
      sessionId: "sess-001",
      senderId: "system",
      senderName: "System",
      senderOrg: "",
      senderRole: "moderator",
      type: "system",
      body: "Poll opened: SIDS prioritization vote",
      sentAt: "2026-04-01T14:15:00Z",
      reactions: {},
      isFlagged: false,
    },
    {
      id: "chat-004",
      sessionId: "sess-001",
      senderId: "u-005",
      senderName: "Priya Nair",
      senderOrg: "South Asia Development Network",
      senderRole: "delegate",
      type: "message",
      body: "Support for the 1.4x weighting. South Asia has similar vulnerability profiles. Would advocate for inclusion.",
      sentAt: "2026-04-01T14:16:00Z",
      reactions: { "🌱": 3, "👍": 2 },
      isFlagged: false,
    },
  ] as ChatMessage[],
};

const SESSION_002: SessionRecord = {
  id: "sess-002",
  title: "FinFracFran™ Standards Working Group — Session 3",
  type: "working-group",
  status: "active",
  councilId: "council-finance",
  councilName: "FinFracFran™ Standards Body",
  scheduledAt: "2026-04-01T15:30:00Z",
  startedAt: "2026-04-01T15:32:00Z",
  description:
    "Third session on standardizing FinFracFran™ revenue attribution and payout protocols across all tenant types.",
  agenda: [
    {
      id: "a002-1",
      title: "Review of Session 2 Action Items",
      description:
        "Progress check on the 5 action items assigned in the previous session.",
      durationMinutes: 15,
      status: "completed",
      completedAt: "2026-04-01T15:47:00Z",
    },
    {
      id: "a002-2",
      title: "Payout Protocol Draft v0.3",
      description:
        "Line-by-line review of the updated payout protocol specification.",
      presenter: "Standards Drafting Committee",
      presenterOrg: "Global Finance Alliance",
      durationMinutes: 40,
      status: "active",
      startedAt: "2026-04-01T15:47:00Z",
    },
    {
      id: "a002-3",
      title: "Cross-Vendor Interoperability Clause",
      description:
        "Discussion and vote on mandatory interoperability requirements for all FF™ licensed vendors.",
      durationMinutes: 20,
      status: "pending",
    },
  ] as SessionAgendaItem[],
  participants: [
    {
      userId: "u-002",
      displayName: "Sofia Reyes",
      orgId: "org-2",
      orgName: "Global Finance Alliance",
      role: "chair",
      joinedAt: "2026-04-01T15:29:00Z",
      speakingTimeSeconds: 540,
      votesCast: 0,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-007",
      displayName: "Marco Ferreira",
      orgId: "org-1",
      orgName: "Pacific Climate Cooperative",
      role: "delegate",
      joinedAt: "2026-04-01T15:31:00Z",
      speakingTimeSeconds: 210,
      votesCast: 2,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-008",
      displayName: "Aiko Tanaka",
      orgId: "org-4",
      orgName: "Asia-Pacific Cooperative",
      role: "presenter",
      joinedAt: "2026-04-01T15:30:00Z",
      speakingTimeSeconds: 380,
      votesCast: 0,
      isActive: true,
      isMuted: false,
    },
    {
      userId: "u-009",
      displayName: "James Okafor",
      orgId: "org-6",
      orgName: "West Africa Innovation Hub",
      role: "delegate",
      joinedAt: "2026-04-01T15:33:00Z",
      speakingTimeSeconds: 120,
      votesCast: 1,
      isActive: false,
      isMuted: true,
    },
  ] as SessionParticipant[],
  polls: [
    {
      id: "poll-002",
      sessionId: "sess-002",
      question:
        "Should cross-vendor FF™ payout settlement occur within 48 hours or 72 hours of cycle close?",
      options: [
        { id: "opt-a", label: "48 hours", votes: 18 },
        { id: "opt-b", label: "72 hours", votes: 7 },
      ],
      status: "closed",
      totalVotes: 25,
      openedAt: "2026-04-01T15:42:00Z",
      closedAt: "2026-04-01T15:46:00Z",
    } as LivePoll,
  ],
  chat: [
    {
      id: "chat-005",
      sessionId: "sess-002",
      senderId: "u-007",
      senderName: "Marco Ferreira",
      senderOrg: "Pacific Climate Cooperative",
      senderRole: "delegate",
      type: "message",
      body: "Section 4.2 needs stronger language on audit trails. Propose adding: 'immutable ledger record required.'",
      sentAt: "2026-04-01T15:48:00Z",
      reactions: { "✅": 3 },
      isFlagged: false,
    },
    {
      id: "chat-006",
      sessionId: "sess-002",
      senderId: "u-008",
      senderName: "Aiko Tanaka",
      senderOrg: "Asia-Pacific Cooperative",
      senderRole: "presenter",
      type: "message",
      body: "Agreed. I'll add that to the redline. Also flagging the currency conversion clause needs review.",
      sentAt: "2026-04-01T15:49:00Z",
      reactions: {},
      isFlagged: false,
    },
    {
      id: "chat-007",
      sessionId: "sess-002",
      senderId: "system",
      senderName: "System",
      senderOrg: "",
      senderRole: "moderator",
      type: "system",
      body: "Poll closed: 48-hour settlement preferred (18 vs 7)",
      sentAt: "2026-04-01T15:46:00Z",
      reactions: {},
      isFlagged: false,
    },
  ] as ChatMessage[],
};

const SESSION_003: SessionRecord = {
  id: "sess-003",
  title: "Assembly Plenary — Q2 2026 Strategic Review",
  type: "assembly-plenary",
  status: "scheduled",
  councilId: "council-assembly",
  councilName: "Global Assembly",
  scheduledAt: "2026-04-08T10:00:00Z",
  description:
    "Quarterly review of platform-wide strategic initiatives, SDG alignment metrics, and the Phase 13 roadmap.",
  agenda: [
    {
      id: "a003-1",
      title: "Opening & Attendance",
      description: "Ceremonial opening and roll call.",
      durationMinutes: 15,
      status: "pending",
    },
    {
      id: "a003-2",
      title: "Phase 13 Progress Report",
      description:
        "Status on all 8 Phase 13 areas including AI, Localization, Sessions, and Impact.",
      durationMinutes: 30,
      status: "pending",
    },
    {
      id: "a003-3",
      title: "SDG Alignment Dashboard Review",
      description: "Platform impact metrics vs. UN SDG targets for Q1 2026.",
      durationMinutes: 25,
      status: "pending",
    },
    {
      id: "a003-4",
      title: "Delegate Motions",
      description: "Floor open for motions from registered delegates.",
      durationMinutes: 30,
      status: "pending",
    },
    {
      id: "a003-5",
      title: "Closing Resolution",
      description: "Vote on the Q2 strategic direction resolution.",
      durationMinutes: 20,
      status: "pending",
    },
  ] as SessionAgendaItem[],
  participants: [
    {
      userId: "u-001",
      displayName: "Dr. Amara Diallo",
      orgId: "org-1",
      orgName: "Pacific Climate Cooperative",
      role: "chair",
      joinedAt: "2026-04-08T09:50:00Z",
      speakingTimeSeconds: 0,
      votesCast: 0,
      isActive: false,
      isMuted: false,
    },
    {
      userId: "u-002",
      displayName: "Sofia Reyes",
      orgId: "org-2",
      orgName: "Global Finance Alliance",
      role: "moderator",
      joinedAt: "2026-04-08T09:52:00Z",
      speakingTimeSeconds: 0,
      votesCast: 0,
      isActive: false,
      isMuted: false,
    },
  ] as SessionParticipant[],
  polls: [],
  chat: [],
};

const SESSION_004: SessionRecord = {
  id: "sess-004",
  title: "Digital Rights & Data Sovereignty — Public Hearing",
  type: "public-hearing",
  status: "scheduled",
  councilId: "council-tech",
  councilName: "Technology & Digital Rights Council",
  scheduledAt: "2026-04-10T13:00:00Z",
  description:
    "Open public hearing on data sovereignty rights for platform users across all jurisdictions. All community members welcome.",
  agenda: [
    {
      id: "a004-1",
      title: "Hearing Opens — Context Setting",
      description: "Moderator outlines scope and hearing protocols.",
      durationMinutes: 10,
      status: "pending",
    },
    {
      id: "a004-2",
      title: "Stakeholder Testimony: Civil Society",
      description:
        "NGO and civil society representatives present data rights concerns.",
      durationMinutes: 40,
      status: "pending",
    },
    {
      id: "a004-3",
      title: "Stakeholder Testimony: Technical Community",
      description:
        "Developers and technical contributors address implementation feasibility.",
      durationMinutes: 30,
      status: "pending",
    },
    {
      id: "a004-4",
      title: "Open Floor",
      description: "Community members may submit written or verbal testimony.",
      durationMinutes: 40,
      status: "pending",
    },
  ] as SessionAgendaItem[],
  participants: [
    {
      userId: "u-010",
      displayName: "Dr. Clara Hoffman",
      orgId: "org-3",
      orgName: "Eastern Mediterranean Council",
      role: "moderator",
      joinedAt: "2026-04-10T12:55:00Z",
      speakingTimeSeconds: 0,
      votesCast: 0,
      isActive: false,
      isMuted: false,
    },
  ] as SessionParticipant[],
  polls: [],
  chat: [],
};

const SESSION_005: SessionRecord = {
  id: "sess-005",
  title: "Sustainability SDG Alignment Council — Session 12",
  type: "council-meeting",
  status: "archived",
  councilId: "council-sustainability",
  councilName: "Sustainability Council",
  scheduledAt: "2026-03-15T09:00:00Z",
  startedAt: "2026-03-15T09:04:00Z",
  endedAt: "2026-03-15T11:02:00Z",
  durationMinutes: 118,
  description:
    "Session 12 of the Sustainability Council focusing on SDG 13 (Climate Action) and SDG 15 (Life on Land) metrics.",
  agenda: [
    {
      id: "a005-1",
      title: "SDG 13 Metrics Review",
      description: "Q1 climate action indicator dashboard.",
      durationMinutes: 40,
      status: "completed",
    },
    {
      id: "a005-2",
      title: "Forest Cover Initiative Vote",
      description: "Resolution on 30x30 forest conservation pledge.",
      durationMinutes: 35,
      status: "completed",
      linkedResolutionId: "res-sdg-015",
    },
    {
      id: "a005-3",
      title: "Impact Report Ratification",
      description:
        "Formal ratification of the Q1 sustainability impact report.",
      durationMinutes: 30,
      status: "completed",
    },
    {
      id: "a005-4",
      title: "Session Close",
      description: "Chair closes session and issues press summary.",
      durationMinutes: 13,
      status: "completed",
    },
  ] as SessionAgendaItem[],
  participants: [
    {
      userId: "u-003",
      displayName: "Yusuf Al-Rashid",
      orgId: "org-3",
      orgName: "Eastern Mediterranean Council",
      role: "chair",
      joinedAt: "2026-03-15T09:00:00Z",
      speakingTimeSeconds: 1840,
      votesCast: 0,
      isActive: false,
      isMuted: false,
    },
    {
      userId: "u-005",
      displayName: "Priya Nair",
      orgId: "org-5",
      orgName: "South Asia Development Network",
      role: "delegate",
      joinedAt: "2026-03-15T09:02:00Z",
      speakingTimeSeconds: 620,
      votesCast: 3,
      isActive: false,
      isMuted: false,
    },
    {
      userId: "u-006",
      displayName: "Fatou Camara",
      orgId: "org-6",
      orgName: "West Africa Innovation Hub",
      role: "delegate",
      joinedAt: "2026-03-15T09:01:00Z",
      speakingTimeSeconds: 480,
      votesCast: 3,
      isActive: false,
      isMuted: false,
    },
  ] as SessionParticipant[],
  polls: [],
  chat: [],
  outcome: {
    summary:
      "Council ratified the Q1 Sustainability Impact Report and passed the 30x30 Forest Conservation Resolution with 94% approval. SDG 13 metrics show 12% improvement vs. Q4 2025. Three action items assigned to working groups for Q2.",
    linkedResolutionIds: ["res-sdg-015"],
    actionItems: [
      "Working Group A: Draft ocean biodiversity protocol by May 1",
      "Working Group B: Update carbon sequestration calculation methodology",
      "Secretariat: Publish Q1 Impact Report to public portal by March 31",
    ],
    nextSessionDate: "2026-06-15T09:00:00Z",
    attendanceCount: 3,
  },
};

const SESSION_006: SessionRecord = {
  id: "sess-006",
  title: "Academy Curriculum Review — Working Group Session 1",
  type: "working-group",
  status: "archived",
  councilId: "council-academy",
  councilName: "Academy & Learning Council",
  scheduledAt: "2026-03-20T11:00:00Z",
  startedAt: "2026-03-20T11:05:00Z",
  endedAt: "2026-03-20T12:35:00Z",
  durationMinutes: 90,
  description:
    "First working group session to review the FinFracFran™ certification track curriculum for 2026.",
  agenda: [
    {
      id: "a006-1",
      title: "Curriculum Scope Review",
      description: "Overview of all 6 FinFracFran™ certification modules.",
      durationMinutes: 25,
      status: "completed",
    },
    {
      id: "a006-2",
      title: "Assessment Framework",
      description: "Design of practical assessment and portfolio requirements.",
      durationMinutes: 35,
      status: "completed",
    },
    {
      id: "a006-3",
      title: "Pilot Cohort Planning",
      description:
        "Selection criteria and timeline for the 2026 pilot cohort of 50 learners.",
      durationMinutes: 30,
      status: "completed",
    },
  ] as SessionAgendaItem[],
  participants: [
    {
      userId: "u-004",
      displayName: "Lin Wei",
      orgId: "org-4",
      orgName: "Asia-Pacific Cooperative",
      role: "chair",
      joinedAt: "2026-03-20T11:02:00Z",
      speakingTimeSeconds: 1240,
      votesCast: 0,
      isActive: false,
      isMuted: false,
    },
    {
      userId: "u-009",
      displayName: "James Okafor",
      orgId: "org-6",
      orgName: "West Africa Innovation Hub",
      role: "delegate",
      joinedAt: "2026-03-20T11:04:00Z",
      speakingTimeSeconds: 680,
      votesCast: 2,
      isActive: false,
      isMuted: false,
    },
  ] as SessionParticipant[],
  polls: [],
  chat: [],
  outcome: {
    summary:
      "Working group finalized the FinFracFran™ certification track structure across 6 modules. Pilot cohort of 50 learners approved for Q3 2026 launch. Assessment framework aligned with Academy's existing competency model.",
    linkedResolutionIds: [],
    actionItems: [
      "Lin Wei: Finalize Module 3 content outline by April 10",
      "James Okafor: Source 3 external facilitators for the pilot cohort",
      "Academy Secretariat: Build enrollment portal workflow for pilot",
    ],
    nextSessionDate: "2026-04-20T11:00:00Z",
    attendanceCount: 2,
  },
};

const ALL_SESSIONS: SessionRecord[] = [
  SESSION_001,
  SESSION_002,
  SESSION_003,
  SESSION_004,
  SESSION_005,
  SESSION_006,
];

// ─── Helper Functions ──────────────────────────────────────────────────────

export function getAllSessions(): SessionRecord[] {
  return ALL_SESSIONS;
}

export function getSession(id: string): SessionRecord | undefined {
  return ALL_SESSIONS.find((s) => s.id === id);
}

export function getActiveSessions(): SessionRecord[] {
  return ALL_SESSIONS.filter((s) => s.status === "active");
}

export function getScheduledSessions(): SessionRecord[] {
  return ALL_SESSIONS.filter((s) => s.status === "scheduled");
}

export function getArchivedSessions(): SessionRecord[] {
  return ALL_SESSIONS.filter(
    (s) => s.status === "archived" || s.status === "closed",
  );
}

export function getSessionsByCouncil(councilId: string): SessionRecord[] {
  return ALL_SESSIONS.filter((s) => s.councilId === councilId);
}

export function getSessionsByStatus(status: string): SessionRecord[] {
  return ALL_SESSIONS.filter((s) => s.status === status);
}
