import { Episode } from '@/domain/enterprise/entities/Episode'

export interface FetchEpisodesByAnimeProps {
  animeId: string
  season?: number
}

export interface EpisodesRepository {
  create(episode: Episode): Promise<void>
  findBySlug(slug: string): Promise<Episode | null>
  fetchEpisodesByAnime({
    animeId,
    season,
  }: FetchEpisodesByAnimeProps): Promise<Episode[]>
}
