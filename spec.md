# ONEartHeaven™ — Area 2: User Approval Pipeline

## Current State
- Area 1 (Authorization) is complete: `authTypes.ts`, `AuthContext.tsx`, `useAuth.ts`, `RequireRole.tsx` are all live.
- `backend.d.ts` has authorization functions (`getCallerUserRole`, `assignCallerUserRole`, `isCallerAdmin`, etc.) but does NOT yet include user-approval functions (`isCallerApproved`, `requestApproval`, `listApprovals`, `setApproval`).
- `/admin/approvals` route exists as a stub placeholder (shows "Area 2 — Coming Soon").
- `user-approval` component has now been selected alongside `authorization`.

## Requested Changes (Diff)

### Add
- `src/data/approvalTypes.ts` — TypeScript interfaces: `UserApplication`, `ApprovalStatus`, `OrgInvite`, `ApprovalStats`; seed data for demo pending applications
- `src/hooks/useApprovals.ts` — hooks for pending/approved/rejected lists using backend `listApprovals`; `useRequestApproval` for submitters; `useApprovalStats`
- `/register` route and `RegisterPage` component — applicant registration form (name, org, country, role requested, motivation); calls `requestApproval()` from backend; shows pending status screen after submit
- `/admin/approvals` fully built — replaces stub with live admin dashboard: pending applications table, Approve/Reject actions via `setApproval`, role assignment, applicant detail sheet
- Navbar: add "Request Access" CTA for unauthenticated/unapproved users; add "Approvals" link in admin nav

### Modify
- `backend.d.ts` — regenerated to include user-approval functions: `isCallerApproved`, `requestApproval`, `listApprovals`, `setApproval`, plus updated `UserApprovalInfo` type
- `App.tsx` — add `/register` route

### Remove
- Admin stub placeholder content in `AdminApprovalsPage` (replaced by full implementation)

## Implementation Plan
1. Regenerate Motoko backend to include user-approval + authorization models
2. Build `approvalTypes.ts` with interfaces and seed data
3. Build `useApprovals.ts` hook
4. Build `RegisterPage` at `/register` — form + pending screen
5. Build full `AdminApprovalsPage` at `/admin/approvals` — applications table + detail sheet + approve/reject
6. Update Navbar with "Request Access" and admin "Approvals" links
7. Wire `/register` route in `App.tsx`
8. Validate and deploy
