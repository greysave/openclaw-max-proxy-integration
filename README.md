# openclaw-max-proxy-integration

Architecture notes, synthetic config examples and a small validator for wiring [OpenClaw](https://github.com/openclaw)
to a **local** OpenAI-compatible shim ([claude-max-api-proxy](https://github.com/wende/claude-max-api-proxy)) that wraps
the Claude Code CLI you are personally logged into.

> **Status: private staging, not published.**

## Read this first

- **Unofficial, not affiliated.** This is a community project. It is not affiliated with or endorsed by Anthropic,
  OpenClaw, or the proxy's authors.
- **Single-user, local use only.** The pattern is for *one person* running the proxy on *their own machine/network*, using
  *their own* Claude Code login, for *their own* interactive use. Never expose the proxy to other people, never run it as
  a hosted service, never share or route other users through your subscription, and never store or publish OAuth tokens.
- **Check the terms.** Subscription terms and usage policies change and may restrict third-party or automated use.
  You are responsible for reading and complying with Anthropic's current Consumer/Commercial Terms and Usage Policy.
- **For automated, multi-user, or product use, use Anthropic API keys** (Claude Console / API), which are the supported
  route for that. Point OpenClaw at the Anthropic API provider directly; you do not need this proxy.

## Credit

The proxy is by **Atal Ashutosh** ([atalovesyou/claude-max-api-proxy](https://github.com/atalovesyou/claude-max-api-proxy),
MIT), with an OpenClaw-oriented maintained fork at [wende/claude-max-api-proxy](https://github.com/wende/claude-max-api-proxy).
Their code is **not** included here; see [`NOTICE`](NOTICE) for the preserved upstream MIT text.

## What's inside

| Path | Purpose |
|---|---|
| `docs/architecture.md` | Request flow, trust boundaries, what the shim does and does not do |
| `docs/terms-and-safe-use.md` | Allowed vs. disallowed usage patterns, API-key recommendation |
| `docs/troubleshooting.md` | Common integration problems (generic) |
| `examples/openclaw-provider.example.json` | Synthetic provider block pointing at a loopback shim |
| `examples/compose.example.yaml` | Loopback-only container example; no credentials in the file |
| `tools/validate-config.js` | Checks an OpenClaw provider config for unsafe settings (non-loopback, 0.0.0.0, token-like strings) |
| `test/` | `node --test` suite using only synthetic inputs |
| `patches/README.md` | States that operational patches are intentionally excluded from publication (policy risk) |

## Quick start

```sh
npm test                                                # no dependencies
node tools/validate-config.js examples/openclaw-provider.example.json
```

Copy the example into your private OpenClaw config, keep the base URL on `127.0.0.1`, and authenticate the Claude Code
CLI yourself (`claude auth login`) in the environment where the shim runs. Nothing here handles credentials.

## License

MIT for original material (see [`LICENSE`](LICENSE)); upstream attribution in [`NOTICE`](NOTICE).
