import { Episode } from 'src/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from 'src/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { SeasonsRepository } from '../repositories/seasons-repository'

interface GetPreviousEpisodeUseCaseRequest {
  seasonId: string
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
    private seasonsRepository: SeasonsRepository,
  ) {}

  async execute({
    seasonId,
    currentEpisodeIndex,
  }: GetPreviousEpisodeUseCaseRequest): Promise<GetPreviousEpisodeUseCaseResponse> {
    if (currentEpisodeIndex < 1) {
      return failure(new ResourceNotFoundError())
    }
    const season = await this.seasonsRepository.findById(seasonId)

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    const episode = await this.episodesRepository.findByIndex(
      season.id.toString(),
      currentEpisodeIndex - 1,
    )

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    return success({ episode })
  }
}
