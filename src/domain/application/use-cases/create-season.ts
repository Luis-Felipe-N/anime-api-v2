import { Season } from '@/domain/enterprise/entities/season'
import { Either, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-epository'
import { Episode } from '@/domain/enterprise/entities/episode'

interface CreateSeasonUseCaseRequest {
  title: string
  episodes: {
    title: string
    description: string
    cover: string
    duration: number
    index: number
  }[]
}

type CreateSeasonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    season: Season
  }
>

export class CreateSeasonUseCase {
  constructor(private seasonsRepository: SeasonsRepository) {}

  async execute({
    title,
    episodes,
  }: CreateSeasonUseCaseRequest): Promise<CreateSeasonUseCaseResponse> {
    const season = Season.create({
      title,
    })

    await this.seasonsRepository.create(season)

    const seasonsEpisodes = episodes.map((episode) =>
      Episode.create({
        ...episode,
        seasonId: season.id,
      }),
    )

    season.episodes = seasonsEpisodes

    return success({ season })
  }
}
