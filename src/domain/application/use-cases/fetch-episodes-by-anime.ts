import { Episode } from '@/domain/enterprise/entities/Episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchEpisodeByAnimeUseCaseRequest {
  animeId: string
  season?: number
}

type FetchEpisodeByAnimeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episodes: Episode[]
  }
>

export class FetchEpisodeByAnimeUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    animeId,
    season,
  }: FetchEpisodeByAnimeUseCaseRequest): Promise<FetchEpisodeByAnimeUseCaseResponse> {
    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    const episodes = await this.episodesRepository.fetchEpisodesByAnime({
      animeId,
      season,
    })

    return success({ episodes })
  }
}
