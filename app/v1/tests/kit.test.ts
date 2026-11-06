import { describe, expect, test } from "bun:test";
import {
  cpSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { messages, readLazurioLocale, resolveLocale } from "../kit/core/i18n";
import { type KitLock, verifyKit, verifyLock } from "../kit/core/lock";
import { nextTab } from "../kit/core/tabs";
import { dismissTimer, type Scheduler, toastHtml } from "../kit/core/toast";
import { iconsModule, TARGET } from "../scripts/icons";

// The kit is what other modules take: it must stay whole (its manifest and
// the lock), carry its icons unchanged from Iconoir, speak both languages and
// depend on nothing outside itself but React and Astro's types.
const kit = resolve(import.meta.dir, "../kit");
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)],
  );

describe("the kit", () => {
  test("is whole: every file matches its manifest", () => {
    expect(verifyKit(kit)).toEqual([]);
  });

  test("the kit's manifest finds an edit in place, a missing file and an extra file", () => {
    const dir = mkdtempSync(join(realpathSync.native(tmpdir()), "kit-"));
    try {
      cpSync(kit, dir, { recursive: true });
      expect(verifyKit(dir)).toEqual([]);
      writeFileSync(join(dir, "css/button.css"), "/* edited */\n", { flag: "a" });
      rmSync(join(dir, "core/html.ts"));
      writeFileSync(join(dir, "extra.css"), "");
      const problems = verifyKit(dir).join("\n");
      expect(problems).toContain("css/button.css: edited in place");
      expect(problems).toContain("core/html.ts: missing");
      expect(problems).toContain("extra.css: not part of the kit");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("the lock holds for the merged release and fails after an edit in the subtree", () => {
    const dir = mkdtempSync(join(realpathSync.native(tmpdir()), "module-"));
    const git = (...args: string[]) => {
      const run = Bun.spawnSync(
        ["git", "-c", "user.name=Test", "-c", "user.email=test@example.invalid", ...args],
        {
          cwd: dir,
          stdout: "pipe",
          stderr: "pipe",
        },
      );
      if (run.exitCode !== 0) throw new Error(run.stderr.toString());
      return run.stdout.toString().trim();
    };
    try {
      git("init", "-q");
      cpSync(kit, join(dir, "app/v3/design-system/app/v1/kit"), { recursive: true });
      git("add", "-A");
      git("commit", "-q", "-m", "take the design system");
      const lock: KitLock = {
        schema: "design-system.lock.v1",
        repository: "LazurioTemplates/design-system",
        tag: "v2.0.0",
        commit: git("rev-parse", "HEAD"),
        tree: git("rev-parse", "HEAD:app/v3/design-system"),
        prefix: "app/v3/design-system",
      };
      expect(verifyLock(dir, lock)).toEqual([]);
      writeFileSync(join(dir, "app/v3/design-system/app/v1/kit/css/button.css"), "/* edited */\n", {
        flag: "a",
      });
      git("commit", "-q", "-am", "edit in place");
      const problems = verifyLock(dir, lock).join("\n");
      expect(problems).toContain("is not LazurioTemplates/design-system v2.0.0");
      expect(problems).toContain("kit/css/button.css: edited in place");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("the icons are Iconoir's, unchanged", () => {
    expect(readFileSync(TARGET, "utf8")).toBe(iconsModule());
  });

  test("imports nothing outside itself but React, React DOM types and Astro's types", () => {
    const problems: string[] = [];
    for (const file of files(kit).filter((path) => /\.(ts|tsx|astro)$/.test(path))) {
      const name = relative(kit, file).split("\\").join("/");
      const text = readFileSync(file, "utf8");
      for (const [, from] of text.matchAll(/(?:import|export)[^"']*?from\s+["']([^"']+)["']/g)) {
        if (!from) continue;
        const allowed =
          from.startsWith("./") ||
          from.startsWith("../") ||
          [
            "react",
            "astro/types",
            "node:child_process",
            "node:crypto",
            "node:fs",
            "node:path",
          ].includes(from);
        if (!allowed) problems.push(`${name}: ${from}`);
        if (from.startsWith("../") && relative(kit, resolve(file, "..", from)).startsWith("..")) {
          problems.push(`${name}: leaves the kit (${from})`);
        }
      }
      if (/from\s+["']node:/.test(text) && name !== "core/lock.ts") {
        problems.push(`${name}: Node APIs belong only in core/lock.ts`);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("languages", () => {
  test("the components' own words exist in Czech and English", () => {
    const keys = (value: object): string[] =>
      Object.entries(value).flatMap(([key, item]) =>
        typeof item === "object" ? keys(item).map((k) => `${key}.${k}`) : [key],
      );
    expect(keys(messages.en).sort()).toEqual(keys(messages.cs).sort());
    for (const [key, value] of Object.entries(messages.en)) {
      if (typeof value === "string") expect(value, key).not.toBe(messages.cs[key as "close"]);
    }
  });

  test("an explicit choice wins, then Lazurio's language, then Czech", () => {
    expect(resolveLocale({ explicit: "en", lazurio: "cs" })).toBe("en");
    expect(resolveLocale({ explicit: null, lazurio: "en" })).toBe("en");
    expect(resolveLocale({ explicit: "de", lazurio: "fr" })).toBe("cs");
    expect(resolveLocale({})).toBe("cs");
  });

  test("Lazurio's language comes from the shell document, or nothing", async () => {
    const answer = (body: unknown, status = 200) =>
      (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
    expect(await readLazurioLocale(answer({ schema: "lazurio.shell.v1", locale: "en" }))).toBe(
      "en",
    );
    expect(await readLazurioLocale(answer({ locale: "de" }))).toBeNull();
    expect(await readLazurioLocale(answer({}, 404))).toBeNull();
    const broken = (async () => {
      throw new Error("offline");
    }) as unknown as typeof fetch;
    expect(await readLazurioLocale(broken)).toBeNull();
  });
});

describe("behaviour", () => {
  test("tabs move with the arrows, Home and End, and wrap", () => {
    expect(nextTab(0, "ArrowRight", 3)).toBe(1);
    expect(nextTab(2, "ArrowRight", 3)).toBe(0);
    expect(nextTab(0, "ArrowLeft", 3)).toBe(2);
    expect(nextTab(1, "Home", 3)).toBe(0);
    expect(nextTab(1, "End", 3)).toBe(2);
    expect(nextTab(1, "Enter", 3)).toBeNull();
    expect(nextTab(0, "ArrowRight", 0)).toBeNull();
  });

  test("a toast waits while hovered or focused, and leaves after both end", () => {
    let now = 0;
    let next = 1;
    const timers = new Map<number, { at: number; run: () => void }>();
    const scheduler: Scheduler = {
      set: (run, ms) => {
        timers.set(next, { at: now + ms, run });
        return next++;
      },
      clear: (id) => timers.delete(id),
    };
    const tick = (ms: number) => {
      now += ms;
      for (const [id, timer] of [...timers]) {
        if (timer.at <= now) {
          timers.delete(id);
          timer.run();
        }
      }
    };
    let closed = false;
    const timer = dismissTimer(
      1000,
      () => {
        closed = true;
      },
      scheduler,
    );
    tick(500);
    timer.hover(true);
    timer.focus(true);
    tick(5000);
    timer.hover(false);
    tick(5000);
    expect(closed).toBe(false);
    timer.focus(false);
    tick(999);
    expect(closed).toBe(false);
    tick(1);
    expect(closed).toBe(true);
  });

  test("a toast built as a string escapes its text", () => {
    const html = toastHtml(
      { tone: "danger", title: '<img src=x onerror="1">', body: "a & b" },
      "en",
    );
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img src=x onerror=&quot;1&quot;&gt;");
    expect(html).toContain("a &amp; b");
    expect(html).toContain("Error: ");
  });
});
