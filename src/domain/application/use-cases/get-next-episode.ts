import { Episode } from '@/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'

interface GetNextEpisodeUseCaseRequest {
  seasonId: string
  currentEpisodeIndex: number
}

type GetNextEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episode: Episode
  }
>

export class GetNextEpisodeUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private seasonsRepository: SeasonsRepository,
  ) {}

  async execute({
    seasonId,
    currentEpisodeIndex,
  }: GetNextEpisodeUseCaseRequest): Promise<GetNextEpisodeUseCaseResponse> {
    const season = await this.seasonsRepository.findById(seasonId)

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    const episode = await this.episodesRepository.findByIndex(
      season.id.toString(),
      currentEpisodeIndex + 1,
    )

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    return success({ episode })
  }
}
