import { Episode } from 'src/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from 'src/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'

interface FetchEpisodeBySeasonUseCaseRequest {
  seasonId: string
  page: number
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
  ) { }

  async execute({
    seasonId,
    page,
  }: FetchEpisodeBySeasonUseCaseRequest): Promise<FetchEpisodeBySeasonUseCaseResponse> {
    const season = await this.seasonsRepository.findById(seasonId)

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    const episodes = await this.episodesRepository.findManyBySeason(seasonId, {
      page: Number(page),
    })

    return success({ episodes })
  }
}
