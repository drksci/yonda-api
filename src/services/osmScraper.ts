/**
 * Overpass OSM Scraper Service for automated POI discovery
 */
export async function queryOverpassPOIs(
  south: number,
  west: number,
  north: number,
  east: number,
  amenity: string = 'bakery'
): Promise<any[]> {
  const overpassQuery = `
    [out:json][timeout:25];
    (
      node["amenity"="${amenity}"](${south},${west},${north},${east});
      way["amenity"="${amenity}"](${south},${west},${north},${east});
    );
    out center;
  `
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.elements || []
  } catch (error) {
    console.error('Error fetching Overpass data:', error)
    return []
  }
}
