import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { WatchedEpisodesRepository } from '../repositories/watched-episodes'
import { UsersRepository } from '../repositories/users-repository'
import { EpisodesRepository } from '../repositories/episode.repository'

interface FetchWatchedEpisodesUseCaseRequest {
  episodeId: string
  authorId: string
}

type FetchWatchedEpisodesUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    watchedEpisode: WatchedEpisode
  }
>

export class FetchWatchedEpisodesUseCase {
  constructor(
    private watchedEpisodesRepository: WatchedEpisodesRepository,
    private usersRepository: UsersRepository,
    private episodesRepository: EpisodesRepository,
  ) { }

  async execute({
    authorId, episodeId
  }: FetchWatchedEpisodesUseCaseRequest): Promise<FetchWatchedEpisodesUseCaseResponse> {
    const episode = await this.episodesRepository.findById(episodeId)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    const watchedEpisode = await this.watchedEpisodesRepository.findByEpisodeAndUser(authorId, episodeId)

    if (!watchedEpisode) {
      return failure(new ResourceNotFoundError())
    }
    return success({ watchedEpisode })
  }
}
