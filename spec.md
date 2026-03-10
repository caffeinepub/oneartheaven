# ONEartHeaven — Phase 5: Community Layer

## Current State
- `/community` route exists but renders a stub page with placeholder text
- All Phase 1–4 pages are live: Home, About, Members, Governance, Charter, Assembly, Councils, Resolutions, Policy Advisor, Delegates, Solutions, Portals
- Data layers and hooks exist for portals, solutions, resolutions, delegates, and assembly

## Requested Changes (Diff)

### Add
- `src/data/communityTypes.ts` — TypeScript types for all community entities
- `src/data/communityData.ts` — Seed data for chapters, volunteers, compassion communities, youth council, citizen profiles
- `src/hooks/useCommunity.ts` — Filter/search/select state management hook
- `src/pages/Community.tsx` — Full community hub page replacing the stub
- Five major sections in the Community page:
  1. Hero with live stats (citizens, chapters, volunteers, nations)
  2. ONEarth Citizens Portal — member stats, join CTA, featured citizen spotlights
  3. Local Chapters — searchable grid of chapters by region with active projects, members, contact
  4. Compassion Communities — thematic care groups (Mental Health, Refugees, Elderly, Youth, Environment) with join/contribute CTAs
  5. Volunteer & Expertise Exchange — skill-based matching, open roles with expertise tags, apply flow
  6. Youth Council — dedicated youth governance body, seat holders, upcoming events, apply CTA

### Modify
- `src/pages/stubs.tsx` — Remove `CommunityPage` stub export (Community.tsx takes over)
- `src/App.tsx` — Update `/community` route to import from the new `Community.tsx` page

### Remove
- `CommunityPage` stub from `stubs.tsx`

## Implementation Plan
1. Create `communityTypes.ts` with all TypeScript interfaces and union types
2. Create `communityData.ts` with seed data: 8 chapters, 5 compassion communities, 12 volunteer roles, 8 youth council members, 6 citizen spotlights
3. Create `useCommunity.ts` hook with filter/search/tab state
4. Build `Community.tsx` page with all 6 sections
5. Update `stubs.tsx` to remove CommunityPage
6. Update `App.tsx` to import CommunityPage from `Community.tsx`
