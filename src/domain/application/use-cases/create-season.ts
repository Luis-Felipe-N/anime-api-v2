import { Season } from '@/domain/enterprise/entities/season'
import { Either, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'
import { Episode } from '@/domain/enterprise/entities/episode'
import { EpisodeList } from '@/domain/enterprise/entities/episode-list'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateSeasonUseCaseRequest {
  title: string
  animeId: string
  episodes: Episode[]
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
    animeId,
    episodes,
  }: CreateSeasonUseCaseRequest): Promise<CreateSeasonUseCaseResponse> {
    const season = Season.create({
      title,
      animeId: new UniqueEntityId(animeId),
    })

    await this.seasonsRepository.create(season)

    const seasonsEpisodes = episodes.map((episode) =>
      Episode.create({
        title: episode.title,
        description: episode.description,
        cover: episode.cover,
        index: episode.index,
        duration: episode.duration,
        seasonId: season.id,
      }),
    )

    season.episodes = new EpisodeList(seasonsEpisodes)

    return success({ season })
  }
}
