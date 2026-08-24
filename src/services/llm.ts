export interface NarrativeParams {
  title: string
  context: string
  themes: string[]
  speedKmh: number
  audienceMode: string
}

export interface RadioLabPayload {
  title: string
  narrative_short: string
  narrative_long: string
  ambience_track: string
  sound_fx_markers: Array<{ timestamp_sec: number; effect: string }>
  recommended_engine: 'eleven_labs' | 'native_tts'
}

/**
 * Generates RadioLab-style multi-track narrative script tailored for current vehicle speed & audience mode.
 */
export async function generateRadioLabNarrative(params: NarrativeParams): Promise<RadioLabPayload> {
  const isHighSpeed = params.speedKmh > 95
  const isMature = params.audienceMode === 'mature'

  return {
    title: params.title,
    narrative_short: `Up ahead on your path is ${params.title}. ${params.context.slice(0, 120)}...`,
    narrative_long: `Approaching ${params.title}. ${params.context} As you drive past, observe the surrounding landscape where early travellers recorded their first journeys.`,
    ambience_track: params.themes.includes('spooky') ? 'eerie_wind_loop' : 'acoustic_melancholy',
    sound_fx_markers: [
      { timestamp_sec: 8, effect: 'distant_ambient_chime' },
    ],
    recommended_engine: params.themes.includes('indigenous_lore') || isMature ? 'eleven_labs' : 'native_tts',
  }
}
