import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { Semver } from "./semver.ts";
import { assertThrows } from "https://deno.land/std@0.217.0/assert/assert_throws.ts";

Deno.test("Semver", async (t) => {
  const version = "1.2.3";

  await t.step("next version", () => {
    const semver = new Semver(version);
    assertEquals(semver.nextRelease("major"), "2.0.0");
    assertEquals(semver.nextRelease("minor"), "1.3.0");
    assertEquals(semver.nextRelease("patch"), "1.2.4");
  });

  await t.step("stringify", () => {
    const semver = new Semver(version);
    assertEquals(semver.toString(), version);
  });

  await t.step("invalid version", () => {
    assertThrows(() => new Semver("invalid"), Error, "Invalid Semver version");
  });

  await t.step("invalid next version", () => {
    const semver = new Semver(version);
    assertThrows(
      () => semver.nextRelease("invalid" as unknown as "major"),
      Error,
      "Invalid Semver version",
    );
  });

  await t.step("isValid", () => {
    assertEquals(Semver.isValid(version), true);
    assertEquals(Semver.isValid("invalid"), false);
  });
});

