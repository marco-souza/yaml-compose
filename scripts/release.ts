#!/usr/bin/env -S deno run --allow-read --allow-writ

import { type ReleaseKind, Semver } from "../semver.ts";

const filePath = Deno.cwd() + "/deno.json";
const denoConfig = Deno.readFileSync(filePath);

const denoJson = JSON.parse(new TextDecoder().decode(denoConfig));
const currentVersion = denoJson.version;

const [release = "patch"] = Deno.args;
const newVersion = new Semver(currentVersion).nextRelease(
  release as ReleaseKind,
);

denoJson.version = newVersion;

Deno.writeFileSync(
  filePath,
  new TextEncoder().encode(JSON.stringify(denoJson, null, 2)),
);

console.log(`Bumped version from ${currentVersion} to ${newVersion}`);

const commitNewVersion = new Deno.Command("git", {
  args: ["commit", "-am", `'Bump version to ${newVersion}'`],
});
const output = await commitNewVersion.output();

if (!output.success) {
  console.error("Failed to commit new version");
  Deno.exit(1);
}

console.log("Committed new version");

const tagNewVersion = new Deno.Command("git", { args: ["tag", newVersion] });
const tagOutput = await tagNewVersion.output();
if (!tagOutput.success) {
  console.error("Failed to tag new version");
  Deno.exit(1);
}

console.log(`Tagged new version ${newVersion}`);
