#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgPath = join(__dirname, "package.json");

// ── Helpers ──────────────────────────────────────────────────────────────────

function run(cmd, opts = {}) {
  try {
    execSync(cmd, { stdio: "inherit", cwd: __dirname, ...opts });
    return true;
  } catch (err) {
    console.error(`  Command failed: ${cmd} (exit code: ${err.status})`);
    return null;
  }
}

function runSilent(cmd) {
  try {
    return execSync(cmd, { cwd: __dirname, encoding: "utf-8" }).trim();
  } catch {
    return null;
  }
}

function readPkg() {
  return JSON.parse(readFileSync(pkgPath, "utf-8"));
}

function writePkg(pkg) {
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function abort(msg) {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
}

function log(msg) {
  console.log(`\n► ${msg}`);
}

function bumpVersion(version, type) {
  const [major, minor, patch] = version.split(".").map(Number);
  switch (type) {
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "major":
      return `${major + 1}.0.0`;
    default:
      return null;
  }
}

// ── Pre-flight checks ───────────────────────────────────────────────────────

async function preflight() {
  log("Running pre-flight checks...");

  // Check for uncommitted changes
  const status = runSilent("git status --porcelain");
  if (status) {
    abort("Working directory is not clean. Commit or stash changes first.");
  }

  // Check current branch
  const branch = runSilent("git rev-parse --abbrev-ref HEAD");
  if (branch && !["main", "master"].includes(branch)) {
    console.warn(`\n⚠ You are on branch "${branch}", not main/master.`);
    const proceed = await ask("Continue anyway? (y/N) ");
    if (proceed.toLowerCase() !== "y") {
      abort("Aborted.");
    }
  }

  // Check npm login
  const whoami = runSilent("npm whoami");
  if (!whoami) {
    abort("Not logged in to npm. Run `npm login` first.");
  }
  console.log(`  Logged in as: ${whoami}`);
}

// ── Version selection ────────────────────────────────────────────────────────

async function selectVersion() {
  const pkg = readPkg();
  const current = pkg.version;

  console.log(`\n  Current version: ${current}`);
  console.log(`  1) patch → ${bumpVersion(current, "patch")}`);
  console.log(`  2) minor → ${bumpVersion(current, "minor")}`);
  console.log(`  3) major → ${bumpVersion(current, "major")}`);
  console.log(`  4) custom`);

  const choice = await ask("\nSelect version bump (1-4): ");

  let newVersion;
  switch (choice) {
    case "1":
      newVersion = bumpVersion(current, "patch");
      break;
    case "2":
      newVersion = bumpVersion(current, "minor");
      break;
    case "3":
      newVersion = bumpVersion(current, "major");
      break;
    case "4":
      newVersion = await ask("Enter custom version: ");
      if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(newVersion)) {
        abort(`Invalid version format: "${newVersion}"`);
      }
      break;
    default:
      abort("Invalid choice.");
  }

  const confirm = await ask(`\n  Bump ${current} → ${newVersion}? (y/N) `);
  if (confirm.toLowerCase() !== "y") {
    abort("Aborted.");
  }

  return newVersion;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║      sibujs-ui — Publish to npm          ║");
  console.log("╚══════════════════════════════════════════╝");

  // 1. Pre-flight
  await preflight();

  // 2. Version bump
  const newVersion = await selectVersion();
  const pkg = readPkg();
  pkg.version = newVersion;
  writePkg(pkg);
  console.log(`  Updated package.json to v${newVersion}`);

  // 3. Lint
  log("Linting...");
  run("npm run lint");

  // 4. Build
  log("Building...");
  if (run("npm run build") === null) {
    // Restore version on failure
    pkg.version = readPkg().version;
    abort("Build failed.");
  }

  // 5. Git commit & tag
  log("Creating git commit and tag...");
  run(`git add package.json`);
  run(`git commit -m "release: v${newVersion}"`);
  run(`git tag v${newVersion}`);

  // 6. Publish
  log("Publishing to npm...");
  if (run("npm publish --access public") === null) {
    abort(
      `Publish failed. Git commit and tag v${newVersion} were created — you may need to revert them.`
    );
  }

  // 7. Push
  log("Pushing to remote...");
  run("git push");
  run("git push --tags");

  // 8. Done
  console.log("\n╔══════════════════════════════════════════╗");
  console.log(`║  ✔ Published sibujs-ui@${newVersion.padEnd(17)}║`);
  console.log(`║  https://www.npmjs.com/package/sibujs-ui  ║`);
  console.log("╚══════════════════════════════════════════╝\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
