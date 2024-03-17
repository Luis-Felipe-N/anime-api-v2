import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment } from '@/domain/enterprise/entities/Comment'
import { CommentsRepository } from '@/domain/application/repositories/comment.repository'
import { Either, failure, success } from '@/core/either'
import { EpisodesRepository } from '../repositories/episode.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateCommentUseCaseRequest {
  authorId: string
  episodeId: string
  content: string
}

type CreateCommentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    comment: Comment
  }
>

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private episodesRepository: EpisodesRepository,
  ) {}

  async execute({
    authorId,
    content,
    episodeId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const episode = await this.episodesRepository.findById(episodeId)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    const comment = Comment.create({
      authorId: new UniqueEntityId(authorId),
      episodeId: episode.id,
      content,
    })

    this.commentsRepository.create(comment)

    return success({
      comment,
    })
  }
}
