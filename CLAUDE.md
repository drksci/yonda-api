# CLAUDE.md — Yonda Architecture & Command Guide

## Build & Test Commands

```bash
# yonda-static (Nextra Docs & Static Portal)
cd yonda-static && npm install && npm run prebuild && npm run build

# yonda-cms (Headless Geo-CMS)
cd yonda-cms && docker compose up -d

# yonda-api (Firebase Functions & AI Services)
cd yonda-api && npm install && npm run build

# yonda-app (Flutter Mobile Client)
cd yonda-app && flutter pub get && flutter test
```

## Licensing Note
All code in this project is licensed under the **PolyForm Noncommercial License 1.0.0**.
Author / Rights Holder: **Blake Carter** (`blake@drksci.com` | `https://drksci.com`).
Commercial use is prohibited without explicit prior written license.
