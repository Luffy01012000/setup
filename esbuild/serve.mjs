import esbuild from "esbuild";
import { createBuildSettings } from "./settings.mjs";

const settings = createBuildSettings({
  sourcemap: true,
  platform: "node",
  banner: {
    js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
  },
});

const ctx = await esbuild.context(settings);

await ctx.watch();

const { host, port } = await ctx.serve({
  port: 5500,
  servedir: "dist",
  fallback: "dist/index.html",
});

console.log(`Serving app at ${host}:${port}.`);
