import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { WatchedEpisodesRepository } from '../repositories/watched-episodes'
import { UsersRepository } from '../repositories/users-repository'

interface FetchWatchedEpisodesUseCaseRequest {
  userId: string
  page: number
}

type FetchWatchedEpisodesUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    watchedEpisodes: WatchedEpisode[]
  }
>

export class FetchWatchedEpisodesUseCase {
  constructor(
    private watchedEpisodesRepository: WatchedEpisodesRepository,
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    userId,
    page,
  }: FetchWatchedEpisodesUseCaseRequest): Promise<FetchWatchedEpisodesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const watchedEpisodes = await this.watchedEpisodesRepository.findManyByUserId(userId, {
      page,
    })

    return success({ watchedEpisodes })
  }
}
