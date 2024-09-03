import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { exec, execSync } from "./mod.ts";

Deno.test("@m3o/results", async (t) => {
  await t.step("sync execution", () => {
    const res = execSync(() => 1);
    assertEquals(res.result, 1);
    assertEquals(res.error, null);

    const errorRes = execSync(() => {
      throw new Error("error");
    });
    assertEquals(errorRes.result, null);
    assertEquals(errorRes.error?.message, "error");
  });

  await t.step("async execution", async () => {
    const res = await exec(() => Promise.resolve(1));
    assertEquals(res.result, 1);
    assertEquals(res.error, null);

    const errorRes = await exec(async () => {
      await Promise.reject("error");
    });
    assertEquals(errorRes.result, null);
    assertEquals(errorRes.error?.message, "error");
  });
});
