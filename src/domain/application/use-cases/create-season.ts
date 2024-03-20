import { Season } from '@/domain/enterprise/entities/season'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'
import { Episode } from '@/domain/enterprise/entities/episode'
import { EpisodeList } from '@/domain/enterprise/entities/episode-list'
import { AnimesRepository } from '../repositories/animes.repository'

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
  constructor(
    private seasonsRepository: SeasonsRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    title,
    animeId,
    episodes,
  }: CreateSeasonUseCaseRequest): Promise<CreateSeasonUseCaseResponse> {
    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    const season = Season.create({
      title,
      animeId: anime.id,
    })

    const seasonsEpisodes = episodes.map((episode) =>
      Episode.create(
        {
          title: episode.title,
          description: episode.description,
          cover: episode.cover,
          index: episode.index,
          duration: episode.duration,
          seasonId: season.id,
          slug: episode.slug,
        },
        episode.id,
      ),
    )

    season.episodes = new EpisodeList(seasonsEpisodes)
    await this.seasonsRepository.create(season)

    return success({ season })
  }
}
