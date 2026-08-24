# Contributing to Yonda

Welcome! We welcome contributions to the Yonda open ecosystem.

## Branch Conventions

| Branch | Environment / Purpose | Deployment / Target |
|---|---|---|
| `main` | Production | Auto-deployed to `yonda.wiki` & `yonda.fm` via Vercel |
| `staging` | Staging / Pre-release | Auto-deployed to preview environment |
| `feat/*` | Feature development | Targeted to `staging` or `main` via PR |
| `fix/*` | Bug fixes | Targeted to `staging` or `main` via PR |
| `docs/*` | Documentation updates | Targeted to `main` via PR |

## Contribution Guidelines

1. **Fork or Branch**: Create a descriptive branch following the prefix conventions above.
2. **Local Testing**: Ensure `npm run prebuild && npm run build` completes with zero errors.
3. **Respect Indigenous Cultural Knowledge (ICIP)**: Sacred place names and cultural stories require consultation and approval from designated community elders.
4. **License Agreement**: All contributions are contributed under the PolyForm Noncommercial License 1.0.0.
