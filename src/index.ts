import * as functions from 'firebase-functions'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { generateRadioLabNarrative } from './services/llm'
import { getBoundingBoxGeohashes } from './services/spatial'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'yonda-api', timestamp: new Date().toISOString() })
})

// Query POIs by bounding box
app.get('/pois', async (req: Request, res: Response) => {
  try {
    const minLat = parseFloat(req.query.minLat as string)
    const minLng = parseFloat(req.query.minLng as string)
    const maxLat = parseFloat(req.query.maxLat as string)
    const maxLng = parseFloat(req.query.maxLng as string)

    if (isNaN(minLat) || isNaN(minLng) || isNaN(maxLat) || isNaN(maxLng)) {
      res.status(400).json({ error: 'Missing valid bounding box coordinates (minLat, minLng, maxLat, maxLng)' })
      return
    }

    const hashes = getBoundingBoxGeohashes(minLat, minLng, maxLat, maxLng)

    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.json({
      type: 'FeatureCollection',
      geohash_clusters: hashes,
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [minLng + (maxLng - minLng) / 2, minLat + (maxLat - minLat) / 2],
          },
          properties: {
            id: 'sample_poi_01',
            title: 'Sample Scenic Lookout',
            theme_tags: ['history', 'culinary'],
            narrative: 'A historic vantage point offering panoramic vistas over the valley.',
            audio_config: {
              engine: 'native_tts',
              voice_id: 'en-au-x-local',
            },
          },
        },
      ],
    })
  } catch (error) {
    functions.logger.error('Error fetching POIs:', error)
    res.status(500).json({ error: 'Internal server error fetching POIs' })
  }
})

// Dynamic AI Narrative Generation
app.post('/synthesize', async (req: Request, res: Response) => {
  try {
    const { title, context, themes, speedKmh, audienceMode } = req.body
    if (!title || !context) {
      res.status(400).json({ error: 'Title and context are required for narrative synthesis.' })
      return
    }

    const narrative = await generateRadioLabNarrative({
      title,
      context,
      themes: themes || ['history'],
      speedKmh: speedKmh || 80,
      audienceMode: audienceMode || 'family',
    })

    res.json(narrative)
  } catch (error) {
    functions.logger.error('Error in synthesis endpoint:', error)
    res.status(500).json({ error: 'Failed to synthesize narrative' })
  }
})

export const api = functions.https.onRequest(app)
