# Freedom in Christ Church

Official website and content tooling for [Freedom in Christ Church](https://fcccanada.ca) in Mississauga, ON. The site is a [SvelteKit](https://kit.svelte.dev/) app at the repo root; [Sanity Studio](https://sanity.io/) lives in `apps/cms`.

Managed with [pnpm](https://pnpm.io/) workspaces. Releases on `main` are handled by [release-please](https://github.com/googleapis/release-please).

## Prerequisites

- [Node.js](https://nodejs.org/) v24+ (see `.nvmrc`)
- [pnpm](https://pnpm.io/) v10+

Run `nvm use` in the project root if you use [nvm](https://github.com/nvm-sh/nvm).

## Getting started

```bash
git clone https://github.com/n9d0g/fcc.git
cd fcc
pnpm install
pnpm dev          # web only (port 42069)
pnpm cms:dev      # Sanity Studio (port 6969)
pnpm dev:all      # web + CMS in parallel
```

## Scripts

| Command                              | Description                                   |
| ------------------------------------ | --------------------------------------------- |
| `pnpm dev`                           | Start the website dev server                  |
| `pnpm dev:all`                       | Start website and CMS together                |
| `pnpm build`                         | Production build for Cloudflare               |
| `pnpm preview`                       | Build and run locally with Wrangler           |
| `pnpm deploy`                        | Deploy to Cloudflare (requires Wrangler auth) |
| `pnpm lint` / `pnpm format`          | Lint and format                               |
| `pnpm check`                         | Svelte/TypeScript check                       |
| `pnpm test`                          | Playwright tests                              |
| `pnpm cms:build` / `pnpm cms:deploy` | Build or deploy Sanity Studio                 |
| `pnpm clean` / `pnpm fresh`          | Remove artifacts and reinstall                |

## Environment variables

**Public** (build time — use `.env` locally and GitHub Actions secrets for deploys):

- `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`

See [`.env.example`](.env.example) for the full list.

**Private** (runtime — use [`.dev.vars`](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets) for `pnpm preview`, and Worker secrets in Cloudflare for production):

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put GOOGLE_RECAPTCHA_SECRET_KEY
wrangler secret put GOOGLE_MAPS_API_KEY
# repeat with --env qa or --env nate for preview environments
```

Ask a maintainer for secret values.

## Deploying (Cloudflare Workers)

Branches map to Workers environments:

| Branch | Worker (workers.dev) | Wrangler |
| --- | --- | --- |
| `main` | `fcc-prod` | `wrangler deploy` |
| `dev` | `fcc-qa` | `wrangler deploy --env qa` |
| `nate` | `fcc-nate` | `wrangler deploy --env nate` |

Until DNS cutover, each environment is served on `https://<worker-name>.<account-subdomain>.workers.dev` (see the deploy job log or Discord notification for the exact URL). Custom domains (`fcccanada.ca`, `dev.fcccanada.ca`, `nate.fcccanada.ca`) are not attached in `wrangler.jsonc` while the zone still has legacy Vercel DNS records.

Pushes to `main`, `dev`, and `nate` run [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml). CMS-only changes under `apps/cms/` do not trigger a web deploy.

### DNS cutover (after the domain transfer)

1. In Cloudflare DNS, remove the old Vercel `A` / `CNAME` records for `fcccanada.ca`, `dev`, and `nate`.
2. Restore `routes` in `wrangler.jsonc` with `custom_domain: true` for `fcccanada.ca`, `dev.fcccanada.ca`, and `nate.fcccanada.ca` (top-level for production, under `env.qa` and `env.nate`).
3. Optionally set `workers_dev` to `false` if you no longer want the `workers.dev` URLs.
4. Push to redeploy so Wrangler can attach the custom domains.

### GitHub secrets

- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`
- `DISCORD_WEBHOOK_URL` (optional deploy notifications)

### Dashboard setup

1. Add `fcccanada.ca` (and subdomains) to Cloudflare DNS.
2. Set Worker secrets per environment (see above).
3. In GitHub → Settings → Actions → General, enable **Allow GitHub Actions to create and approve pull requests** for release-please.
4. Add auth redirect URLs in Supabase and domains in reCAPTCHA for all hostnames.
5. After cutover, remove domains from Vercel and disconnect Vercel Git integration.

## Releases

On pushes to `main`, release-please opens or updates a release PR. Merging it bumps versions, updates `CHANGELOG.md` files, and creates GitHub releases with tags like `web-v3.24.0` and `cms-v1.6.0`.

Use [Conventional Commits](https://www.conventionalcommits.org/) with scopes, e.g. `feat(web): …` or `fix(cms): …`.

## Contributing

1. Branch from `dev`, make changes, then `pnpm build`, `pnpm lint`, and `pnpm format`.
2. Open a pull request against `dev`.

## Tech stack

- **Site:** SvelteKit, Svelte 5, Tailwind CSS v4, Skeleton UI
- **CMS:** Sanity Studio (`apps/cms`)
- **Auth:** Supabase
- **Hosting:** Cloudflare Workers (`@sveltejs/adapter-cloudflare`)
- **Formatter:** [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
