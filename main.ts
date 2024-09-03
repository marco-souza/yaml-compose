/**
 * @module
 *
 * This module contains a CLI script for composing a YAML file from a folder into a unique file.
 *
 * @example
 * ```sh
 * deno run --allow-read --allow-write main.ts ./folder ./output.yaml
 * ```
 */
import { yamlCompose } from "@m3o/yaml-merge";
import * as path from "path";

if (import.meta.main) {
  let [folder, output] = Deno.args ?? [];
  if (!folder || !output) {
    console.error("You need to pass the folder and output file");
    Deno.exit(1);
  }

  const dirname = Deno.cwd();
  folder = path.resolve(dirname, folder);
  output = path.resolve(dirname, output);

  console.log(`Composing YAML file from ${folder}...`);
  yamlCompose({ path: folder, output });

  console.log(`YAML file composed (${output})! 🎉`);
  Deno.exit(0);
}
