import { Episode } from '@/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AnimesRepository } from '../repositories/animes.repository'

interface GetPreviousEpisodeUseCaseRequest {
  animeId: string
  season: number
  currentEpisodeIndex: number
}

type GetPreviousEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episode: Episode
  }
>

export class GetPreviousEpisodeUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    animeId,
    season,
    currentEpisodeIndex,
  }: GetPreviousEpisodeUseCaseRequest): Promise<GetPreviousEpisodeUseCaseResponse> {
    if (season < 1 || currentEpisodeIndex < 1) {
      return failure(new ResourceNotFoundError())
    }

    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    const episode = await this.episodesRepository.findByIndex(
      animeId,
      season,
      currentEpisodeIndex - 1,
    )

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    return success({ episode })
  }
}
