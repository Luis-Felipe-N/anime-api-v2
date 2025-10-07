import { Either, failure, success } from 'src/core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { WatchedEpisodesRepository } from '../repositories/watched-episodes'
import { WatchedEpisode } from 'src/domain/enterprise/entities/watched-episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateWatchedEpisodeUseCaseRequest {
  episodeId: string
  authorId: string
  duration: number
}

type CreateWatchedEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    watchedEpisode: WatchedEpisode
  }
>

export class CreateWatchedEpisodeUseCase {
  constructor(
    private watchedEpisodesRepository: WatchedEpisodesRepository,
    private episodesRepository: EpisodesRepository,
  ) { }

  async execute({
    episodeId,
    authorId,
    duration,
  }: CreateWatchedEpisodeUseCaseRequest): Promise<CreateWatchedEpisodeUseCaseResponse> {
    const episode = await this.episodesRepository.findById(episodeId)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    const hasWatchedEpisode = await this.watchedEpisodesRepository.findByEpisodeAndUser(authorId, episodeId)

    if (hasWatchedEpisode) {
      hasWatchedEpisode.stopAt = duration

      const watchedEpisodePrisma = await this.watchedEpisodesRepository.save(hasWatchedEpisode)

      return success({ watchedEpisode: watchedEpisodePrisma })
    } else {

      const watchedEpisode = WatchedEpisode.create({
        episodeId: episode.id,
        authorId: new UniqueEntityId(authorId),
        stopAt: duration,
      })

      const watchedEpisodePrisma = await this.watchedEpisodesRepository.create(watchedEpisode)

      return success({ watchedEpisode: watchedEpisodePrisma })
    }
  }
}
