# ONEartHeaven — A6-5: Messages Page

## Current State
- notificationTypes.ts, notificationData.ts, useNotifications.ts live with 30 notifications, 10 threads, useMessages hook.
- Navbar bell icon + dropdown live (A6-4 complete). Footer link points to /messages but page not built.
- No Messages.tsx, no /messages route in App.tsx.
- stubs.tsx has Governance Hub cards for Areas 1-5 only.
- Navbar NAV_LINKS has no Messages entry.

## Requested Changes (Diff)

### Add
- src/frontend/src/pages/Messages.tsx — two-panel layout: thread list (left) + chat view (right). Pinned threads first, unread badges, last message preview. Message bubbles (sent=right/gold, received=left/dark). Send input. New message modal. Mobile responsive.
- /messages route in App.tsx
- Messages Governance Hub card in stubs.tsx (Phase 13 badge)
- MessageSquare icon button with unread thread count badge in Navbar right controls (desktop + mobile)

### Modify
- App.tsx: add messagesRoute, wire into routeTree
- stubs.tsx: add Messages card to GOVERNANCE_HUB_CARDS
- Navbar.tsx: add MessageSquare icon button next to bell

### Remove
- Nothing

## Implementation Plan
1. Create Messages.tsx using useMessages hook
2. Add /messages route to App.tsx
3. Add Messages card to stubs.tsx
4. Add MessageSquare icon button to Navbar
5. Validate and deploy
