import { EpisodesRepository } from '../repositories/episode.repository'
import { Episode } from '@/domain/enterprise/entities/episode'
import { AnimesRepository } from '../repositories/animes.repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateEpisodeUseCaseRequest {
  animeId: string
  title: string
  description: string
  cover: string
  index: number
  duration: number
  season: number
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
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    animeId,
    title,
    cover,
    description,
    duration,
    index,
    season,
  }: CreateEpisodeUseCaseRequest): Promise<CreateEpisodeUseCaseResponse> {
    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    const episode = Episode.create({
      animeId: anime.id,
      title,
      description,
      cover,
      index,
      duration,
      season,
    })

    await this.episodesRepository.create(episode)

    return success({ episode })
  }
}
