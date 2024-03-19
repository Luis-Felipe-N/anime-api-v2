import { Episode } from '@/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'

interface FetchEpisodeBySeasonUseCaseRequest {
  seasonId: string
}

type FetchEpisodeBySeasonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episodes: Episode[]
  }
>

export class FetchEpisodeBySeasonUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private seasonsRepository: SeasonsRepository,
  ) {}

  async execute({
    seasonId,
  }: FetchEpisodeBySeasonUseCaseRequest): Promise<FetchEpisodeBySeasonUseCaseResponse> {
    const season = await this.seasonsRepository.findById(seasonId)

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    const episodes = await this.episodesRepository.findManyBySeason(seasonId)

    return success({ episodes })
  }
}
