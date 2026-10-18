# Security

## Rules for this repository
- No credentials, OAuth tokens, `~/.claude` contents, API keys, session data, logs, hostnames, IPs, or IDs from any real
  deployment. Examples use `127.0.0.1`, `example.invalid` and `*-placeholder` values only.
- No hosted-service configs and nothing that helps share or route other users through a personal subscription.
- Run a secret scanner (gitleaks/trufflehog) before every push; `tools/validate-config.js` guards config examples.

## Deployment hardening (for adopters)
- Bind the shim to loopback only. It has no authentication of its own; anyone who can reach the port can spend your quota.
- Do not publish the port through a reverse proxy, tunnel, or compose `ports:` on `0.0.0.0`.
- Keep the Claude Code credential directory out of images, git, backups you share, and logs.
- The shim spawns a CLI subprocess with model-influenced input: keep tool allowlists minimal and run it unprivileged.

## Reporting
Report vulnerabilities privately through the hosting platform's private security advisory feature; do not open public issues for them.
