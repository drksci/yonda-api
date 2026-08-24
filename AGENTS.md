# AGENTS.md — Yonda Ecosystem Agent Guidelines

> Architectural directives, coding guidelines, licensing constraints, and skill workflows for AI coding agents operating across the **Yonda** (`yonda.wiki` / `yonda.fm`) ecosystem.

---

## 1. Project Context & Philosophy

- **Name**: Yonda (`yonda.wiki` / `yonda.fm`)
- **Author & Licensor**: Blake Carter (`blake@drksci.com` | `https://drksci.com`)
- **License**: PolyForm Noncommercial License 1.0.0 (Author retains all proprietary rights; free for community/non-commercial use).
- **Core Mission**: Transform regional travel and commuting into an ambient, real-time "Invisible Passenger" audio documentary by geofencing verified stories, indigenous lore, pioneer histories, and curated local trails.

---

## 2. Multi-Repository Map

```
yonda/
├── yonda-static/   # Nextra 4 + Next.js 15 static docs & marketing portal (Vercel)
├── yonda-cms/      # Directus Headless CMS + PostGIS / PostgreSQL database
├── yonda-api/      # Firebase Cloud Functions (Geohashing, LLM synthesizers, OSM scraper)
└── yonda-app/      # Flutter cross-platform mobile client (iOS, Android, CarPlay)
```

---

## 3. Engineering & Architecture Rules

### `yonda-static`
- Use **Nextra 4** with the docs theme and Next.js 15.
- All documentation in sub-projects (`yonda-app/docs/`, `yonda-cms/docs/`, `yonda-api/docs/`) must be consolidated via `scripts/sync-docs.mjs` before building (`npm run prebuild`).
- Maintain strict route precedence: static Nextra pages (`/`, `/about`, `/join`, `/guide`, `/docs/*`, `/privacy`, `/terms`) take priority; `/w/*` and `/api/v1/*` fall through via rewrites.

### `yonda-cms`
- Directus schema migrations must preserve PostGIS spatial geometries (`Point` & `Polygon`, SRID 4326).
- Respect multi-tenant row-level access control (`tenant_id`). Never bypass tenant isolation in API queries.

### `yonda-api`
- Endpoints must return standard `Cache-Control` headers (`s-maxage=600, stale-while-revalidate=1200`) to optimize edge caching and minimize serverless invocation costs.
- Spatial bounding queries must use geohashes (`ngeohash`) for sub-millisecond retrieval.
- LLM narration generation must produce RadioLab-structured payloads (vocal track + ambient soundscape loop + timestamped FX markers).

### `yonda-app`
- Flutter code must adhere to battery-safe background geolocation practices.
- Implement **preemptive bounding-box caching** (fetching 30-50 km along trajectory) to maintain 100% audio continuity across cellular dead-zones.
- Default to on-device TTS (`flutter_tts`) whenever network latency exceeds 250ms or in offline mode.

---

## 4. Git & Branching Conventions

- `main`: Production release branch.
- `staging`: Pre-release integration branch.
- `feat/<topic>`, `fix/<topic>`, `docs/<topic>`: Work branches.
- Commit messages should follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).

---

## 5. Available Agent Skills (`.agents/skills/`)

The workspace includes installed product and engineering skills from `assimovt/productskills`:
- `prd-writing`: Draft structured, developer-ready specifications.
- `problem-validation`: Stress test user pains and assumptions.
- `feature-prioritization`: RICE / MoSCoW filtering.
- `strategy-doc`: Formulate market and technical positioning.
- `roadmap-planning`: Milestone and horizon planning.
