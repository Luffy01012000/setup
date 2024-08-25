import * as esbuild from "esbuild";
import { createBuildSettings } from "./settings.mjs";

const settings = createBuildSettings({ minify: true, platform: "node" });

await esbuild.build(settings);
