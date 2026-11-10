# ohmybug-e2e-fixture

A tiny bookshelf service used as a known-answer fixture for OhMyBug's end-to-end checks.
It is not a product and takes no contributions.

- `base`: the service without the change.
- `planted`: one change on top of `base`, with one planted defect.
- `clean`: a harmless change on top of `base`, with nothing wrong in it.
- `big`: `planted` plus a large generated data file, so the diff is over the inline size.
- `scan`: the `planted` change split into a few commits, for repository scans.

Run: `node src/server.js` (Node 18+, no dependencies).
