import geohash from 'ngeohash'

/**
 * Calculates geohash grid clusters for spatial indexing and preemptive bounding box fetching.
 */
export function getBoundingBoxGeohashes(
  minLat: number,
  minLng: number,
  maxLat: number,
  maxLng: number,
  precision: number = 6
): string[] {
  return geohash.bboxes(minLat, minLng, maxLat, maxLng, precision)
}

/**
 * Encodes single latitude and longitude into geohash
 */
export function encodeCoordinates(latitude: number, longitude: number, precision: number = 7): string {
  return geohash.encode(latitude, longitude, precision)
}
