import { Either, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { WatchedEpisodesRepository } from '../repositories/watched-episodes'


interface FetchWatchedEpisodesUseCaseRequest {
  authorId: string
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
  ) { }

  async execute({
    authorId
  }: FetchWatchedEpisodesUseCaseRequest): Promise<FetchWatchedEpisodesUseCaseResponse> {

    const watchedEpisodes = await this.watchedEpisodesRepository.findManyByUserId(authorId)

    console.log({ watchedEpisodes })

    return success({ watchedEpisodes })
  }
}
