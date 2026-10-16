import { sentrySvelteKit } from "@sentry/sveltekit/vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { fileURLToPath } from "url";
import { defineConfig, lazyPlugins } from "vite-plus";

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

// Local mkcert cert so dev can run at https://local.fcccanada.ca:42069.
// Falls back to plain http when the cert isn't there (CI, other machines).
const certDir = join(homedir(), "Documents/dev/.certs");
const certFile = join(certDir, "cert.pem");
const keyFile = join(certDir, "cert-key.pem");
const https =
  existsSync(certFile) && existsSync(keyFile)
    ? { cert: readFileSync(certFile), key: readFileSync(keyFile) }
    : undefined;
const devHost = "local.fcccanada.ca";

/**
 * With https on, Vite lists every hostname in the cert as a Local URL. The cert
 * is shared across projects, so only keep the ones this app actually answers to.
 * @returns {import('vite').Plugin}
 */
const trimCertUrls = () => ({
  name: "trim-cert-urls",
  apply: "serve",
  configureServer(server) {
    const printUrls = server.printUrls;
    server.printUrls = () => {
      const urls = server.resolvedUrls;
      if (urls) {
        urls.local = urls.local.filter((url) => {
          const { hostname } = new URL(url);
          return hostname === "localhost" || hostname === devHost;
        });
      }
      printUrls();
    };
  },
});

/**
 * postcss (pulled in by the email renderer) lazily `require`s fs/path/url to
 * load source maps from disk. Bundled for Workers, that turns into a top-level
 * `createRequire(import.meta.url)`, which throws because workerd has no
 * `import.meta.url`. Stub those modules like postcss's own `browser` field does.
 * @returns {import('vite').Plugin}
 */
const postcssWorkerShim = () => {
  const stubbed = new Set(["fs", "path", "url"]);
  const id = "\0postcss-node-builtin-stub";
  return {
    name: "postcss-worker-shim",
    enforce: "pre",
    resolveId(source, importer) {
      if (stubbed.has(source) && importer?.includes("/postcss/lib/")) return id;
    },
    load(source) {
      if (source === id) return "export default {}";
    },
  };
};

const svelteRunes = Object.fromEntries(
  ["$state", "$derived", "$effect", "$props", "$bindable", "$inspect", "$host"].map(
    (name) => [name, "readonly"],
  ),
);

export default defineConfig({
  // The workspace root is the web app; bare `vp dev`/`vp build` target it
  defaultPackage: ".",
  fmt: {
    useTabs: true,
    singleQuote: true,
    trailingComma: "es5",
    printWidth: 80,
    semi: false,
    ignorePatterns: [
      ".DS_Store",
      ".svelte-kit",
      "node_modules",
      "/build",
      "/package",
      ".env",
      ".env.*",
      "!.env.example",
      "vite.config.js*",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
      "CHANGELOG.md",
      ".release-please-manifest.json",
      // Generated: wrangler types / rendered email HTML
      "worker-configuration.d.ts",
      "supabase/templates",
    ],
  },
  lint: {
    categories: {
      correctness: "error",
    },
    env: {
      builtin: true,
      browser: true,
      node: true,
    },
    globals: {
      ...svelteRunes,
      AsyncDisposableStack: "readonly",
      DisposableStack: "readonly",
      SuppressedError: "readonly",
    },
    ignorePatterns: [
      "build/**",
      ".svelte-kit/**",
      ".wrangler/**",
      "apps/**",
      "playwright-report/**",
      "test-results/**",
      "package/**",
      "**/*.d.ts",
    ],
    rules: {
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    // Type-aware linting is off: SvelteKit route modules rely on zero-config
    // `$types` that only svelte-check injects, so tsgolint sees them as `any`.
    // `pnpm check` (svelte-check) remains the type checker.
  },
  staged: {
    "*": "vp check --fix",
  },
  test: {
    // Playwright specs live in tests/ and run via `pnpm test`
    include: ["src/**/*.test.ts", "apps/email-worker/**/*.test.ts"],
  },
  server: {
    port: 443,
    https,
    allowedHosts: [devHost],
    watch: {
      ignored: ["**/apps/**"],
    },
  },
  plugins: lazyPlugins(() => [
    postcssWorkerShim(),
    trimCertUrls(),
    tailwindcss(),
    // Uploads source maps when SENTRY_AUTH_TOKEN, SENTRY_ORG and SENTRY_PROJECT are set
    sentrySvelteKit({
      autoUploadSourceMaps: !!process.env.SENTRY_AUTH_TOKEN,
    }),
    sveltekit({
      adapter: adapter(),
      version: {
        name: pkg.version,
      },
      preprocess: vitePreprocess(),
    }),
  ]),
});
