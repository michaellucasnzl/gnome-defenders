# Stitch MCP Scripts

These scripts let OpenCode (or any MCP client) talk to Google Stitch's design API over stdio, bypassing the OpenCode HTTP-transport bug that causes OAuth Dynamic Client Registration (DCR) failures.

## Why this exists

OpenCode ignores configured HTTP headers for `type: "remote"` MCP servers and instead attempts OAuth DCR. Google Stitch doesn't support DCR, so the remote connection fails with `Incompatible auth server: does not support dynamic client registration`.

The workaround is to run Stitch as a **local stdio subprocess** using the official `@google/stitch-sdk` package, which handles authentication internally via the `X-Goog-Api-Key` header.

## Files

| File | Purpose |
|------|---------|
| `stitch-mcp.mjs` | stdio MCP proxy server — launched by OpenCode via `opencode.json` |
| `stitch-call.mjs` | CLI helper for calling Stitch tools directly from a shell (useful for debugging or when OpenCode's session hasn't reloaded MCP config yet) |

## Prerequisites

```bash
npm install -g @google/stitch-sdk
```

The API key must be in the project root `.env` file:

```
STITCH_API_KEY=your-key-here
```

## OpenCode configuration

`opencode.json` runs the proxy as a local subprocess:

```json
"stitch": {
  "type": "local",
  "command": ["node", "scripts/stitch-mcp.mjs"],
  "enabled": true,
  "env": {
    "STITCH_API_KEY": "{env:STITCH_API_KEY}"
  }
}
```

After changing `opencode.json`, **quit and restart OpenCode** — config is loaded once at startup and not hot-reloaded.

## Direct CLI usage

```bash
# List all available Stitch tools
node scripts/stitch-call.mjs list

# Call a specific tool with JSON arguments
node scripts/stitch-call.mjs get_project '{"name":"projects/8285073436482784614"}'
node scripts/stitch-call.mjs list_screens '{"projectId":"8285073436482784614"}'
```

## How it works

`stitch-mcp.mjs` instantiates `StitchProxy` from the SDK and connects it to a `StdioServerTransport`. The proxy forwards JSON-RPC requests to `https://stitch.googleapis.com/mcp`, attaching the `X-Goog-Api-Key` header from `STITCH_API_KEY`.

Both packages are installed globally and the MCP SDK is nested inside stitch-sdk's `node_modules`, so the launcher resolves them via absolute file URLs derived from Node's install path rather than bare ESM imports.
