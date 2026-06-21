import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

if (!process.env.STITCH_API_KEY) {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  try { process.loadEnvFile(path.join(projectRoot, ".env")); } catch {}
}

const globalRoot = path.join(path.dirname(path.dirname(process.execPath)), "lib", "node_modules");
const stitchPkg = path.join(globalRoot, "@google", "stitch-sdk");
const { StitchToolClient } = await import(pathToFileURL(path.join(stitchPkg, "dist", "src", "index.js")).href);

const [toolName, ...rest] = process.argv.slice(2);
const client = new StitchToolClient();

if (!toolName || toolName === "list") {
  const { tools } = await client.listTools();
  for (const t of tools) console.log(`${t.name}\t${(t.description || "").slice(0, 80).replace(/\n/g, " ")}`);
} else {
  const args = rest.length ? JSON.parse(rest.join(" ")) : {};
  const result = await client.callTool(toolName, args);
  console.log(JSON.stringify(result, null, 2));
}
await client.close();
