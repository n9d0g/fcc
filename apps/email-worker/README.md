# fcc-email

Cloudflare Email Worker for `@fcccanada.ca`. Email Routing's catch-all sends every
incoming message here; [`src/routes.ts`](src/routes.ts) decides where it goes.

- Known addresses (e.g. `hello@`) are forwarded. Plus tags work: `hello+anything@`.
- Unknown addresses bounce with "Address not found".
- Senders in `BLOCKED_SENDERS` bounce with "Message rejected".

## Adding an address

1. Verify the destination in Cloudflare: **Email → Email Routing → Destination addresses**.
2. Add it to `ROUTES` in `src/routes.ts`.
3. `pnpm email:deploy` from the repo root.

## Logs

`pnpm wrangler tail --config apps/email-worker/wrangler.jsonc` shows each message
as it's forwarded or rejected (Workers → fcc-email → Logs in the dashboard too).
