# ONEartHeaven™

## Current State

All 12 phases are live. The About page was recently updated to replace a comparison table with a single-column "Our Commitments" section using warm, partnership-oriented language. The Portals and Charter pages still have minor traces of contrasting/oppositional language, and there is no dedicated worldwide launch and adoption plan section anywhere on the platform.

## Requested Changes (Diff)

### Add
- A "Worldwide Launch & Adoption Plan" section on the Home page (or as a standalone `/launch` route accessible from Governance Hub and Navbar), covering: phased global rollout strategy, adoption pathways for all stakeholder types (nations, NGOs, cities, cooperatives, individuals), FinFracFran™ scaling model, benefits and features overview for all users, and a call to join/partner.

### Modify
- `Charter.tsx` Preamble: Replace "Unlike the institutions of the past, we bind ourselves not to the interests of states alone" with affirming, partnership-oriented language that honors all past efforts and expresses transcendence through inclusion rather than contrast.
- `Portals.tsx` Hero: Enrich the hero subline to carry the same warm commitment-style voice as the new About page — emphasizing shared action, collaboration, and collective purpose.
- `Portals.tsx`: Add a short "Our Shared Commitments" strip near the top or bottom of the page, mirroring the About page's commitment cards but focused on portal-specific themes (local action, open resources, collective solutions, FinFracFran™ scaling).

### Remove
- The phrase "Unlike the institutions of the past" from Charter.tsx Preamble.
- Any implied adversarial framing in Charter.tsx Preamble lines 503–505.

## Implementation Plan

1. Update `Charter.tsx` Preamble text to remove "Unlike the institutions of the past" and replace with affirming partnership language.
2. Update `Portals.tsx` hero subline to carry commitment-style warmth.
3. Add a "Our Shared Commitments" strip to `Portals.tsx` with 4–6 commitment cards.
4. Create `LaunchPlan.tsx` page at `/launch` with: mission statement, phased rollout (Phase 1: Founding Partners, Phase 2: Regional Adoption, Phase 3: Global Scale), stakeholder pathways, benefits grid, FinFracFran™ scaling model, and a Join/Partner CTA section.
5. Wire `/launch` route in `App.tsx`, add Governance Hub card, add Navbar link.
6. Validate (lint + typecheck + build) and deploy.
