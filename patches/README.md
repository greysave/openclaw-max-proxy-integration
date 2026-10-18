# Patches

None are shipped, and this is intentional.

Publication of this repository deliberately excludes operational patches (for example, modifications to a
third-party proxy's bind address, tool mapping or allowlists). They carry policy risk: they would make it
easier to route a consumer subscription through a shared or network-reachable endpoint, which the provider's
terms may not permit (see `../docs/terms-and-safe-use.md`). This repository is limited to documentation,
synthetic examples and a loopback-config validator (`../tools/validate-config.js`).

If a patch is ever added, it must: be an original "Greysave contributors" work, contain no upstream source
beyond minimal context (otherwise keep the upstream MIT notice from `../NOTICE` in the header), and contain no
live addresses, private tool allowlists or credentials.
