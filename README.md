# yonda-api

> Firebase Cloud Functions and AI Narrative Synthesis Backend for Yonda (`yonda.wiki` / `yonda.fm`).

## Overview

`yonda-api` provides backend microservices for geospatial bounding box calculations, geohash cluster generation, automated OpenStreetMap scraping, and real-time AI narrative synthesis with RadioLab-style soundscape formatting.

## Endpoints

- `GET /pois` — Queries points of interest by latitude/longitude bounding box with geohash indexing.
- `POST /synthesize` — Synthesizes narrative payloads with speed-adjusted scripts and audio engine routing.
- `GET /health` — Health check endpoint.

## Local Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start Firebase Emulators
npm run serve
```

## Deploying to Firebase

```bash
firebase deploy --only functions
```
