import { Comment } from '@/domain/enterprise/entities/comment'
import { CommentsRepository } from '../repositories/comment.repository'
import { EpisodesRepository } from '../repositories/episode.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Either, failure, success } from '@/core/either'

interface FetchCommentsByEpisodeUseCaseRequest {
  episodeId: string
  page: number
}

type FetchCommentsByEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  { comments: Comment[] }
>

export class FetchCommentsByEpisodeUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private episodesRepository: EpisodesRepository,
  ) {}

  async execute({
    episodeId,
    page,
  }: FetchCommentsByEpisodeUseCaseRequest): Promise<FetchCommentsByEpisodeUseCaseResponse> {
    const episode = await this.episodesRepository.findById(episodeId)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    const comments = await this.commentsRepository.fetchCommentsByEpisode({
      episodeId,
      params: {
        page,
      },
    })

    return success({ comments })
  }
}
