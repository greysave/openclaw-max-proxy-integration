# Architecture

```
OpenClaw gateway --HTTP (OpenAI chat-completions format, loopback)--> local shim --spawn--> Claude Code CLI --> Anthropic
```

- **OpenClaw** is configured with a custom OpenAI-compatible provider whose base URL is `http://127.0.0.1:<port>/v1`.
  The API-key field is required by clients but ignored by the shim; use a dummy value, never a real secret.
- **The shim** (third-party, MIT) translates chat-completions requests into CLI invocations and maps responses back,
  including streaming. Per its own docs it also maps some OpenClaw tool names to Claude Code equivalents.
- **The CLI** holds the user's login. That credential never leaves the CLI's own config directory and must not be copied.

## Trust boundaries
1. Gateway → shim: loopback only; no auth. Treat the port as a bearer capability.
2. Shim → CLI: subprocess with untrusted prompt content; limit tools.
3. CLI → provider: governed by the provider's terms for your account type.

## Design notes
- Keep model aliases in one place (the provider block) so switching to a real API-key provider is a one-line change.
- Prefer one agent/cascade tier for the shim at most; keep an API-key fallback for automation and for rate-limit periods.
- Cap concurrency; interactive single-user traffic only.

## Moving to API keys
Replace the provider block with the Anthropic API provider and a secret *reference* (e.g. `secret:ANTHROPIC_API_KEY`).
No shim, no CLI subprocess, and it is the supported route for automation, multiple users, and products.
