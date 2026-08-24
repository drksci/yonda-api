# Automated OpenStreetMap Scraper

The `yonda-api` scraper runs periodic cron extraction jobs querying the Overpass API:

```
[OpenStreetMap Overpass API] ──► [Filter High-Rated Nodes] ──► [AI Summarizer] ──► [Drafts Queue]
```

- Targets nodes tagged `amenity=bakery`, `amenity=pub`, `tourism=viewpoint`, `historic=*`.
- Summarizes Google Places and OSM reviews into snappy driving trivia.
- Writes records to `yonda-cms` marked as `source: ai_generated`.
