# Freedom in Christ Church CMS App

This is the content management system for the Freedom in Christ Church.

## Local development

Studio runs on **http://localhost:6969** (see `sanity.cli.ts`).

### CORS (required for local Studio)

Sanity only auto-allows `localhost:3333` and your hosted `*.sanity.studio` URL. Because this project uses port **6969**, add it in the Sanity project dashboard:

1. Open [manage.sanity.io](https://www.sanity.io/manage) → project `ygo45klz` → **API** → **CORS origins**
2. Add `http://localhost:6969`
3. Enable **Allow credentials**

Or from `apps/cms` (after `npx sanity login`):

```sh
npx sanity cors add http://localhost:6969 --credentials
```

Without this, authenticated API calls and WebSockets can fail with "Load failed" / "access control checks" in the browser console.

`http://localhost:6969` is already registered on project `ygo45klz`. If errors persist, open the dashboard entry and confirm **Allow credentials** is enabled.

## Deploy

From the repo root:

```sh
pnpm cms:deploy
```

Or from `apps/cms`:

```sh
pnpm deploy
```
