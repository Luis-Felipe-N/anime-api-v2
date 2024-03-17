import { Episode } from '@/domain/enterprise/entities/Episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { AnimesRepository } from '../repositories/animes.repository'

interface FetchEpisodeByAnimeUseCaseRequest {
  animeId: string
  season?: number
}

interface FetchEpisodeByAnimeUseCaseResponse {
  episodes: Episode[]
}

export class FetchEpisodeByAnimeUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    animeId,
    season,
  }: FetchEpisodeByAnimeUseCaseRequest): Promise<FetchEpisodeByAnimeUseCaseResponse> {
    const anime = this.animesRepository.findById(animeId)

    if (!anime) {
      throw new Error('Anime not found')
    }

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
