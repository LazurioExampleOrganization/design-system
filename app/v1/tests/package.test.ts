import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import packageJson from "../package.json";

// The design system is a package that modules add as a Git dependency on a
// released tag (docs/adoption.md). This test does what a module does, in
// clean projects: it makes a Git repository of this tree, installs the
// package from it at a commit (`git+file://`, the same Git path as
// `git+ssh://` of an Organization's private repository), then builds an Astro
// site and type-checks, bundles and renders a React App with it.
const root = resolve(import.meta.dir, "../../..");
const bun = process.execPath;
const base = realpathSync.native(tmpdir());
const env = {
  HOME: process.env.HOME ?? "",
  PATH:
    dirname(process.execPath) +
    (process.platform === "win32" ? ";" : ":") +
    (process.env.PATH ?? ""),
};
let work = "";
let spec = "";

function run(cmd: string[], cwd: string) {
  const result = Bun.spawnSync(cmd, { cwd, env, stdout: "pipe", stderr: "pipe" });
  if (result.exitCode !== 0) {
    throw new Error(`${cmd.join(" ")} failed in ${cwd}:\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout.toString();
}

const git = (cwd: string, ...args: string[]) =>
  run(
    ["git", "-c", "user.name=Test", "-c", "user.email=test@example.invalid", ...args],
    cwd,
  ).trim();

function write(dir: string, files: Record<string, string>) {
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), content);
  }
}

// React Apps are built on the stack profile app@2026.11: TypeScript 7, Vite 8.
const APP_PROFILE = { typescript: "7.0.2", vite: "8.3.5", "@vitejs/plugin-react": "6.2.1" };

const pin = (
  name: keyof typeof packageJson.devDependencies | keyof typeof packageJson.dependencies,
) => ({ ...packageJson.dependencies, ...packageJson.devDependencies })[name];

beforeAll(() => {
  work = mkdtempSync(join(base, "ds-package-"));
  // The repository as a tag of it would hold it: every tracked and new file.
  const repo = join(work, "design-system");
  mkdirSync(repo);
  const files = run(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard"], root)
    .split("\0")
    .filter(Boolean);
  for (const file of files) {
    try {
      mkdirSync(dirname(join(repo, file)), { recursive: true });
      copyFileSync(join(root, file), join(repo, file));
    } catch {
      // A file deleted in the worktree but still tracked.
    }
  }
  git(repo, "init", "-q");
  git(repo, "add", "-A");
  git(repo, "commit", "-q", "-m", "release");
  spec = `git+${pathToFileURL(repo).href}#${git(repo, "rev-parse", "HEAD")}`;
}, 120_000);

afterAll(() => {
  if (work) rmSync(work, { recursive: true, force: true });
});

describe("the package in a clean project", () => {
  test("an Astro site installs it, imports its styles and components, and builds", () => {
    const site = join(work, "site");
    write(site, {
      "package.json": JSON.stringify({
        name: "site",
        private: true,
        type: "module",
        dependencies: { astro: pin("astro"), "design-system": spec },
      }),
      "astro.config.mjs":
        'import { defineConfig } from "astro/config";\nexport default defineConfig({});\n',
      "tsconfig.json": JSON.stringify({ extends: "astro/tsconfigs/strict" }),
      "src/pages/index.astro": [
        "---",
        'import "design-system/styles.css";',
        'import { Badge, Button, Dialog, TextField, ToastRegion } from "design-system/astro";',
        'import Tabs from "design-system/astro/Tabs.astro";',
        'import { brandName } from "design-system/brand";',
        'import { color } from "design-system/tokens";',
        "---",
        '<html lang="cs"><head><meta charset="utf-8" /><title>{brandName}</title></head><body>',
        '<Button variant="primary" data-ds-dialog-open="d">Uložit</Button>',
        '<Badge tone="success">Zaplaceno</Badge>',
        '<TextField id="f" label="Firma" hint="Jak ve smlouvě." />',
        '<Tabs label="Části" items={[{ id: "a", label: "A" }, { id: "b", label: "B" }]}><p slot="a">A</p><p slot="b">B</p></Tabs>',
        '<Dialog id="d" title="Smazat?">Tělo</Dialog>',
        // biome-ignore lint/suspicious/noTemplateCurlyInString: Astro source text, not a template literal of this test
        "<p style={`color:${color.light.ink}`}>ok</p>",
        "<ToastRegion /></body></html>",
        "",
      ].join("\n"),
    });
    run([bun, "install"], site);
    expect(readFileSync(join(site, "bun.lock"), "utf8")).toContain(`"design-system@${spec}"`);
    run([bun, "x", "astro", "build"], site);
    const html = readFileSync(join(site, "dist/index.html"), "utf8");
    expect(html).toContain('class="ds-button ds-button--primary"');
    expect(html).toContain('class="ds-badge ds-badge--success"');
    expect(html).toContain('<dialog class="ds-dialog"');
    expect(html).toContain('role="tablist"');
    const assets = readdirSync(join(site, "dist/_astro"));
    const css = assets
      .filter((name) => name.endsWith(".css"))
      .map((name) => readFileSync(join(site, "dist/_astro", name), "utf8"))
      .join("\n");
    expect(css).toContain("--ds-color-ink");
    expect(css).toContain(".ds-button");
    expect(assets.some((name) => name.endsWith(".woff2"))).toBe(true);
  }, 240_000);

  test("a React App installs it, type-checks against it, bundles and renders it", () => {
    const app = join(work, "react-app");
    write(app, {
      "package.json": JSON.stringify({
        name: "react-app",
        private: true,
        type: "module",
        dependencies: { react: pin("react"), "react-dom": pin("react-dom"), "design-system": spec },
        devDependencies: {
          "@types/react": pin("@types/react"),
          "@types/react-dom": pin("@types/react-dom"),
          ...APP_PROFILE,
        },
      }),
      // The tsconfig of the app profile (lazurio module create --stack vite-react),
      // without vite/client: the package declares its stylesheets itself.
      "tsconfig.json": JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          moduleResolution: "Bundler",
          moduleDetection: "force",
          jsx: "react-jsx",
          resolveJsonModule: true,
          verbatimModuleSyntax: true,
          noEmit: true,
          strict: true,
          noUncheckedIndexedAccess: true,
          noFallthroughCasesInSwitch: true,
          skipLibCheck: true,
          types: [],
        },
        include: ["src"],
      }),
      "src/App.tsx": [
        'import { Alert, Badge, Button, Dialog, Table, Tabs, TextField, Toast, ToastRegion } from "design-system/react";',
        'import { color, resolveLocale } from "design-system";',
        "",
        "export function App() {",
        '  const locale = resolveLocale({ explicit: "en" });',
        "  return (",
        "    <main style={{ color: color.light.ink }}>",
        '      <Button variant="primary" busy locale={locale}>Save</Button>',
        '      <Badge tone="warning">Overdue</Badge>',
        '      <TextField id="name" label="Name" hint="As in the contract." locale={locale} />',
        '      <Alert tone="danger" title="Failed" locale={locale}>Try again.</Alert>',
        '      <Tabs label="Parts" items={[{ id: "a", label: "A" }]} panels={{ a: "A" }} />',
        '      <Table id="t" caption="Invoices"><tbody><tr><td>1</td></tr></tbody></Table>',
        '      <Dialog id="d" title="Delete?" open={false}>Body</Dialog>',
        '      <ToastRegion locale={locale}><Toast title="Saved" locale={locale} /></ToastRegion>',
        "    </main>",
        "  );",
        "}",
        "",
      ].join("\n"),
      "src/main.tsx": [
        'import "design-system/styles.css";',
        'import { createRoot } from "react-dom/client";',
        'import { App } from "./App";',
        "",
        'const element = document.getElementById("root");',
        "if (element) createRoot(element).render(<App />);",
        "",
      ].join("\n"),
      "index.html":
        '<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>App</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
      "vite.config.ts":
        'import react from "@vitejs/plugin-react";\nimport { defineConfig } from "vite";\nexport default defineConfig({ plugins: [react()] });\n',
      "render.tsx": [
        'import { renderToStaticMarkup } from "react-dom/server";',
        'import { App } from "./src/App";',
        "console.log(renderToStaticMarkup(<App />));",
        "",
      ].join("\n"),
    });
    run([bun, "install"], app);
    expect(readFileSync(join(app, "bun.lock"), "utf8")).toContain(`"design-system@${spec}"`);
    run([bun, "x", "tsc", "--noEmit", "-p", "."], app);
    // Vite compiles the package's TSX from node_modules, its CSS and its fonts.
    run([bun, "x", "vite", "build"], app);
    const assets = join(app, "dist/assets");
    const built = readdirSync(assets);
    const read = (suffix: string) =>
      built
        .filter((name) => name.endsWith(suffix))
        .map((name) => readFileSync(join(assets, name), "utf8"))
        .join("\n");
    expect(read(".css")).toContain("--ds-color-ink");
    expect(read(".js")).toContain("ds-button");
    expect(built.some((name) => name.endsWith(".woff2"))).toBe(true);
    const html = run([bun, "render.tsx"], app);
    expect(html).toContain('class="ds-button ds-button--primary"');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain("Loading");
    expect(html).toContain('<dialog class="ds-dialog"');
  }, 240_000);
});
