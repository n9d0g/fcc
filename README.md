# Freedom in Christ Church

This is the official monorepo for [Freedom in Christ Church](https://sauga.church), managed with [pnpm](https://pnpm.io/) workspaces and [Turborepo](https://turbo.build/).

## Apps

| App | Description | Tech |
| --- | --- | --- |
| `apps/web` | Main church website at [sauga.church](https://sauga.church) | SvelteKit, Svelte 5, Tailwind CSS v4, Skeleton UI |
| `apps/cms` | Content management system | Sanity Studio |

## Prerequisites

- [Node.js](https://nodejs.org/) v24+ (see `.nvmrc`)
- [pnpm](https://pnpm.io/) v10+

If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root to switch to the correct Node version.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/n9d0g/fcc.git
cd fcc
```

2. Install dependencies:

```bash
pnpm install
```

3. Start all apps in development mode:

```bash
pnpm dev
```

This runs both the web app (port 42069) and the CMS (port 6969) simultaneously via Turborepo.

To run a specific app:

```bash
pnpm --filter web dev
pnpm --filter cms dev
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `pnpm format` | Format code with Oxfmt |
| `pnpm clean` | Remove all `node_modules`, lock files, and build artifacts |
| `pnpm fresh` | Format, clean, and reinstall everything from scratch |
| `pnpm fresh:start` | Fresh install + start dev servers |
| `pnpm cms:deploy` | Deploy the Sanity CMS studio |

## Environment Variables

The web app requires several environment variables. Create a `.env.local` file in `apps/web/`:

```
SANITY_API_PROJECT_ID=
SANITY_API_DATASET=
SANITY_API_READ_TOKEN=
GOOGLE_EMAIL=
GOOGLE_EMAIL_PASSWORD=
GOOGLE_MAPS_API_KEY=
GOOGLE_RECAPTCHA_SECRET_KEY=
```

Ask a maintainer for the values.

## Contributing

1. Create a new branch from `dev-web`:

```bash
git checkout dev-web
git pull
git checkout -b your-branch-name
```

2. Make your changes and ensure they build:

```bash
pnpm build
```

3. Format your code before committing:

```bash
pnpm format
```

4. Push your branch and open a pull request against `dev-web`.

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Skeleton UI](https://skeleton.dev/)
- **CMS:** [Sanity](https://sanity.io/)
- **Formatter:** [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
- **Monorepo:** [pnpm workspaces](https://pnpm.io/workspaces) + [Turborepo](https://turbo.build/)
- **Hosting:** [Vercel](https://vercel.com/)
