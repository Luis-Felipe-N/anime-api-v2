import { Episode } from '@/domain/enterprise/entities/episode'

export interface FetchEpisodesByAnimeProps {
  animeId: string
  season?: number
}

export interface EpisodesRepository {
  create(episode: Episode): Promise<void>
  delete(episode: Episode): Promise<void>
  findBySlug(slug: string): Promise<Episode | null>
  findById(id: string): Promise<Episode | null>
  findByIndex(
    animeId: string,
    season: number,
    episodeIndex: number,
  ): Promise<Episode | null>
  findManyByAnime({
    animeId,
    season,
  }: FetchEpisodesByAnimeProps): Promise<Episode[]>
}
