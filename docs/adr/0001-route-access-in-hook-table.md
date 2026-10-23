# Route access is enforced by one table in the server hook

Who may reach a route is decided by a single path-prefix → policy table checked in `hooks.server.ts`, not by `+layout.server.ts` gates or a gate call at the top of each load and action. SvelteKit form actions don't run layout loads, so a layout gate leaves every action open, and per-action calls fail silently the first time one is forgotten. The hook runs on every request, loads and actions alike, so a new route under a gated prefix is protected by default. Pages and actions still ask the Viewer for finer checks (such as "is this my post"), and RLS stays as the last line of defence.

## Considered Options

- **Per-subtree `+layout.server.ts` gates**: idiomatic SvelteKit, but they don't cover form actions, so each action would still need its own call.
- **A gate call in every load and action** (the previous approach): about 28 call sites, any one of which could be forgotten.
