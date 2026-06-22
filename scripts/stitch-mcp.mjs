import path from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

// Load .env from the project root if STITCH_API_KEY isn't already exported
// in the process environment (OpenCode's {env:...} interpolation only reads
// the parent process env, not dotenv files).
if (!process.env.STITCH_API_KEY) {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  try {
    process.loadEnvFile(path.join(projectRoot, ".env"));
  } catch {
    // .env is optional if the key is already in the environment
  }
}

// @google/stitch-sdk is installed globally (npm install -g). Its bundled
// @modelcontextprotocol/sdk lives nested inside its own node_modules, so bare
// ESM imports from the project dir cannot resolve it. Resolve via absolute
// file URLs derived from the global node_modules root instead.
const globalRoot = execSync("npm root -g", { encoding: "utf-8" }).trim();
const stitchPkg = path.join(globalRoot, "@google", "stitch-sdk");
const mcpSdk = path.join(
  stitchPkg,
  "node_modules",
  "@modelcontextprotocol",
  "sdk",
);

const { StitchProxy } = await import(
  pathToFileURL(path.join(stitchPkg, "dist", "src", "index.js")).href
);
const { StdioServerTransport } = await import(
  pathToFileURL(path.join(mcpSdk, "dist", "esm", "server", "stdio.js")).href
);

const proxy = new StitchProxy();
const transport = new StdioServerTransport();
await proxy.start(transport);
