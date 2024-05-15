import { EpisodesRepository } from '../repositories/episode.repository'
import { Episode } from '@/domain/enterprise/entities/episode'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EpisodeTypes } from '@/core/enums/episode-types.enum'
import { SeasonsRepository } from '../repositories/seasons-repository'

interface CreateEpisodeUseCaseRequest {
  seasonId: string
  title: string
  description: string
  cover: string
  index: number
  duration: number
  season: number
  video: string
  type: EpisodeTypes
}

type CreateEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episode: Episode
  }
>

export class CreateEpisodeUseCase {
  constructor(
    private episodesRepository: EpisodesRepository,
    private seasonsRepository: SeasonsRepository,
  ) { }

  async execute({
    seasonId,
    title,
    cover,
    description,
    duration,
    index,
    video,
    type,
  }: CreateEpisodeUseCaseRequest): Promise<CreateEpisodeUseCaseResponse> {
    const season = await this.seasonsRepository.findById(seasonId)

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    const episode = Episode.create({
      seasonId: season.id,
      title,
      description,
      cover,
      index,
      duration,
      video,
      type,
    })

    await this.episodesRepository.create(episode)

    return success({ episode })
  }
}
