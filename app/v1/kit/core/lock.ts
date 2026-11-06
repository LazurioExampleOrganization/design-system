// The lock of a module that takes the design system (docs/adoption.md, "Using
// the design system in another module"). The module merges a release of the
// design system as a subtree and records it in `design-system.lock.json`;
// its tests call `verifyKit`, which fails when a file of the kit was edited in
// place, a file is missing or added, or the kit is not the locked release.
// Runs in Bun or Node (tests), never in a browser.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

export type KitLock = {
  schema: "design-system.lock.v1";
  /** The design system's repository, for example `https://github.com/<owner>/design-system`. */
  repository: string;
  /** The release tag, for example `v2.0.0`, or `main` for an Organization's design system. */
  release: string;
  /** The full commit that was merged. */
  commit: string;
  /** Where the design system lies in the module, for example `app/v3/design-system`. */
  prefix: string;
  /** SHA-256 of the merged `app/v1/kit/manifest.json`. */
  manifest: string;
};

type Manifest = { schema: string; version: string; files: Record<string, string> };

const sha256 = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

/** Problems of the kit at `kitDir` (empty when it is intact and, with a lock, the locked one). */
export function verifyKit(kitDir: string, lock?: KitLock): string[] {
  const problems: string[] = [];
  const raw = readFileSync(join(kitDir, "manifest.json"));
  const manifest = JSON.parse(raw.toString("utf8")) as Manifest;
  if (manifest.schema !== "design-system.kit-manifest.v1")
    problems.push("manifest.json: unknown schema");
  if (lock) {
    if (lock.schema !== "design-system.lock.v1") problems.push("lock: unknown schema");
    if (!/^[0-9a-f]{40}$/.test(lock.commit)) problems.push("lock: commit is not a full SHA");
    if (sha256(raw) !== lock.manifest) {
      problems.push(
        "manifest.json differs from the lock: take the design system by merge, then update the lock",
      );
    }
  }
  const present = new Set(
    files(kitDir)
      .map((path) => relative(kitDir, path).split("\\").join("/"))
      .filter((path) => path !== "manifest.json"),
  );
  for (const [path, hash] of Object.entries(manifest.files)) {
    if (!present.has(path)) {
      problems.push(`${path}: missing`);
      continue;
    }
    present.delete(path);
    if (sha256(readFileSync(join(kitDir, path))) !== hash) {
      problems.push(`${path}: edited in place; change it in the design system and merge it`);
    }
  }
  for (const path of present) problems.push(`${path}: not part of the kit`);
  return problems;
}
