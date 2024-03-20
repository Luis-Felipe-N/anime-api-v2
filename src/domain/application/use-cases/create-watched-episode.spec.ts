import { Either, failure, success } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WatchedEpisodesRepository } from '../repositories/watched-episodes'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateWatchedEpisodeUseCaseRequest {
  episodeId: string
  userId: string
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
  ) {}

  async execute({
    episodeId,
    userId,
    duration,
  }: CreateWatchedEpisodeUseCaseRequest): Promise<CreateWatchedEpisodeUseCaseResponse> {
    const episode = await this.episodesRepository.findById(episodeId)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    const watchedEpisode = WatchedEpisode.create({
      episodeId: episode.id,
      userId: new UniqueEntityId(userId),
      duration,
    })

    await this.watchedEpisodesRepository.create(watchedEpisode)

    return success({ watchedEpisode })
  }
}
