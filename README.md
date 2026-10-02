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

| Branch | Worker     | Live URL                                                                         | Wrangler                     |
| ------ | ---------- | -------------------------------------------------------------------------------- | ---------------------------- |
| `main` | `fcc-prod` | [fcccanada.ca](https://fcccanada.ca) (`www` → apex via Cloudflare redirect rule) | `wrangler deploy`            |
| `dev`  | `fcc-qa`   | [dev.fcccanada.ca](https://dev.fcccanada.ca) (+ `workers.dev` fallback)          | `wrangler deploy --env qa`   |
| `nate` | `fcc-nate` | `workers.dev` until `nate.fcccanada.ca` cutover                                  | `wrangler deploy --env nate` |

Before the first production deploy with custom domains, remove legacy Vercel DNS for the apex, `www`, and `*` wildcard (see cutover checklist below). Set Worker secrets on `fcc-prod` (`wrangler secret put …` without `--env`). Add a Cloudflare **Redirect Rule** so `www.fcccanada.ca` permanently redirects to `https://fcccanada.ca` with path and query preserved.

Pushes to `main`, `dev`, and `nate` run [`.github/workflows/deploy-web.yml`](.github/workflows/deploy-web.yml). CMS-only changes under `apps/cms/` do not trigger a web deploy.

### Production DNS cutover (before merging to `main`)

Delete in Cloudflare DNS: apex `A` (`76.76.21.21`), both `www` `A` records, both `*` wildcard `A` records, and `_domainconnect` → Vercel. Keep `crm`, `dev` (QA Worker), MX/TXT (mail and Resend), and CAA. Merge `dev` → `main` immediately after so Wrangler can attach `fcccanada.ca` and `www.fcccanada.ca`.

### Nate cutover (later)

1. Remove any `nate` DNS if added manually; add `routes` with `custom_domain: true` for `nate.fcccanada.ca` under `env.nate` (and keep `routes: []` override removed or replaced with the nate hostname only).
2. Set secrets with `--env nate`, update Supabase and reCAPTCHA, then push to `nate`.
3. Optionally set `workers_dev` to `false` when you no longer need `workers.dev` URLs.

### GitHub secrets

- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`
- `DISCORD_WEBHOOK_URL` (optional deploy notifications)
- `SANITY_AUTH_TOKEN` (CMS Studio deploys on `main`)

### Dashboard setup

1. Add `fcccanada.ca` (and subdomains) to Cloudflare DNS.
2. Set Worker secrets per environment (see above).
3. In GitHub → Settings → Actions → General, enable **Allow GitHub Actions to create and approve pull requests** for release-please.
4. Add auth redirect URLs in Supabase and domains in reCAPTCHA for all hostnames.
5. After cutover, remove domains from Vercel and disconnect Vercel Git integration.

## Releases

On pushes to `main`, release-please opens or updates a release PR. Merging it bumps the repo version in root `package.json`, updates root `CHANGELOG.md`, and creates a GitHub release with a tag like `v3.24.1`. CMS changes are included in that single version and changelog.

Use [Conventional Commits](https://www.conventionalcommits.org/) with scopes, e.g. `feat(web): …` or `fix(cms): …`.

## CMS deploys

Pushes to `main` that change `apps/cms/**` run the **Deploy CMS to Sanity** workflow and publish Studio to [fcc.sanity.studio](https://fcc.sanity.studio). You can also trigger a deploy manually from the Actions tab.

Set the `SANITY_AUTH_TOKEN` repository secret to a Sanity API token with **Deploy Studio** permission ([sanity.io/manage](https://www.sanity.io/manage) → API → Tokens).

## Contributing

1. Branch from `dev`, make changes, then `pnpm build`, `pnpm lint`, and `pnpm format`.
2. Open a pull request against `dev`.

## Tech stack

- **Site:** SvelteKit, Svelte 5, Tailwind CSS v4, Skeleton UI
- **CMS:** Sanity Studio (`apps/cms`)
- **Auth:** Supabase
- **Hosting:** Cloudflare Workers (`@sveltejs/adapter-cloudflare`)
- **Formatter:** [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
