export const EpisodeTypes: {
  CRUNCHYROLL: 'CRUNCHYROLL'
  ANIMESONLINE: 'ANIMESONLINE'
} = {
  CRUNCHYROLL: 'CRUNCHYROLL',
  ANIMESONLINE: 'ANIMESONLINE',
}

export type EpisodeTypes = (typeof EpisodeTypes)[keyof typeof EpisodeTypes]
