// The lock of a module that takes the design system (docs/adoption.md, "Using
// the design system in another module"). The module merges a release as a
// Git subtree at `prefix` and records it in `design-system.lock.json`; its
// tests call `verifyLock`, which fails when the subtree is not the locked
// release (an edit in place, a file added or removed) or a file of the kit
// differs from the kit's manifest. Runs in Bun or Node (tests), never in a
// browser.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

export type KitLock = {
  /** `design-system.lock.v1`; a string, so a lock imported from JSON type-checks. */
  schema?: string;
  /** `<owner>/<repository>` of the design system that was merged. */
  repository: string;
  /** The release tag, for example `v2.0.0`; `main` for an Organization's design system without tags. */
  tag: string;
  /** The full commit that was merged. */
  commit: string;
  /** The Git tree of that commit (`git rev-parse <commit>^{tree}`). */
  tree: string;
  /** Where the design system lies in the module, for example `app/v3/design-system`. */
  prefix: string;
};

type Manifest = { schema: string; version: string; files: Record<string, string> };

const sha256 = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

/** Problems of the kit at `kitDir`: files that differ from its manifest, are missing or are extra. */
export function verifyKit(kitDir: string): string[] {
  const problems: string[] = [];
  const manifest = JSON.parse(readFileSync(join(kitDir, "manifest.json"), "utf8")) as Manifest;
  if (manifest.schema !== "design-system.kit-manifest.v1")
    problems.push("manifest.json: unknown schema");
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

/**
 * Problems of the module's merged design system at `root/<lock.prefix>`: its
 * committed subtree must be the locked release's tree, and its kit whole.
 */
export function verifyLock(root: string, lock: KitLock): string[] {
  const problems: string[] = [];
  if (lock.schema !== undefined && lock.schema !== "design-system.lock.v1")
    problems.push("lock: unknown schema");
  if (!/^[0-9a-f]{40}$/.test(lock.commit)) problems.push("lock: commit is not a full SHA");
  if (!/^[0-9a-f]{40}$/.test(lock.tree)) problems.push("lock: tree is not a full SHA");
  try {
    const tree = execFileSync("git", ["rev-parse", `HEAD:${lock.prefix}`], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (tree !== lock.tree) {
      problems.push(
        `${lock.prefix} is not ${lock.repository} ${lock.tag}: take changes by merging a release, then update the lock`,
      );
    }
  } catch {
    problems.push(`${lock.prefix}: Git cannot read it at HEAD`);
  }
  for (const problem of verifyKit(join(root, lock.prefix, "app/v1/kit")))
    problems.push(`kit/${problem}`);
  return problems;
}
