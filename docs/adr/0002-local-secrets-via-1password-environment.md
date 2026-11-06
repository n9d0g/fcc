# Local secrets come from a 1Password environment mounted as `.env`

Local `.env` values are served by a 1Password environment, which mounts `.env` as a named pipe instead of a regular file. Vite+ loads env files that are named pipes, and `wrangler dev` falls back to `.env` when there is no `.dev.vars`, so nothing else needs to change and no secrets are stored on disk. `.env.example` stays as the committed list of keys for anyone without 1Password access and as a reference for CI. CI and deployed Workers still use GitHub Actions secrets and `wrangler secret put` (#463 tracks whether to move those too).

## Considered Options

- **Plain `.env` and `.dev.vars` files shared out of band** (the previous approach): secrets sat on disk, and every developer's copy drifted.
- **`op run` / `op inject` with `op://` references**: works with any tool, but every script would need wrapping, or a generated file would have to be kept around.

## Consequences

- `.env` can be read only while 1Password is running and unlocked, and each read streams it once. Scripts must read it through a loader, not `stat` it or expect a regular file.
- A `.dev.vars` file silently overrides `.env` for `wrangler dev`, so don't create one.
- Values in `.env` don't reach `process.env` in `vite.config.js`, so CI-only build keys (Sentry source map upload) stay out of the 1Password environment.
