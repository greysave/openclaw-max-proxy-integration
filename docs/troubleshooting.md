# Troubleshooting (generic)

- **Connection refused**: shim not running, or port mismatch between provider `baseUrl` and the shim's port.
- **Connection from container fails**: loopback inside a container is not the host's loopback. Run the shim in the same
  network namespace/service, or publish it to `127.0.0.1` on the host only and reach it via a host-only mechanism.
- **401/auth errors from the CLI**: re-run the CLI login as the same OS user the shim runs as.
- **Unknown model**: use a model alias the shim documents; keep aliases in the provider block.
- **Slow first token**: each request starts a CLI subprocess; this is inherent to the approach.
