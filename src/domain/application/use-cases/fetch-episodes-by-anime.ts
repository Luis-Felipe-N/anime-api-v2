import { Episode } from '@/domain/enterprise/entities/Episode'
import { EpisodesRepository } from '../repositories/episode.repository'

interface FetchEpisodeByAnimeUseCaseRequest {
  animeId: string
  season?: number
}

interface FetchEpisodeByAnimeUseCaseResponse {
  episodes: Episode[]
}

export class FetchEpisodeByAnimeUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    animeId,
    season,
  }: FetchEpisodeByAnimeUseCaseRequest): Promise<FetchEpisodeByAnimeUseCaseResponse> {
    const episodes = await this.episodesRepository.fetchEpisodesByAnime({
      animeId,
      season,
    })

    if (!episodes.length) {
      throw new Error('Episodes not found')
    }

    return { episodes }
  }
}
