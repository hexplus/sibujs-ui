// Points git at the committed `.githooks/` folder. Run by `npm install`
// (through `prepare`) and by `npm run hooks:install`.
//
// It is a no-op outside a git work tree — an npm tarball install, a CI checkout
// without `.git` — and in CI, where the workflow runs the same checks itself.

import { spawnSync } from "node:child_process";

if (process.env.CI) process.exit(0);

const inside = spawnSync("git", ["rev-parse", "--is-inside-work-tree"], { encoding: "utf8" });
if (inside.status !== 0 || inside.stdout.trim() !== "true") process.exit(0);

const set = spawnSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "inherit" });
if (set.status !== 0) {
  console.warn("Could not set core.hooksPath; run `git config core.hooksPath .githooks` by hand.");
  process.exit(0);
}
console.log("Git hooks installed (.githooks: pre-commit, pre-push).");
