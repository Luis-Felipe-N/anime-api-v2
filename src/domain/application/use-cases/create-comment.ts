import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment } from '@/domain/enterprise/entities/Comment'
import { CommentsRepository } from '@/domain/application/repositories/comment.repository'

interface CreateCommentUseCaseRequest {
  authorId: string
  episodeId: string
  content: string
}

interface CreateCommentUseCaseResponse {
  comment: Comment
}

export class CreateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    authorId,
    content,
    episodeId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const comment = Comment.create({
      authorId: new UniqueEntityId(authorId),
      episodeId: new UniqueEntityId(episodeId),
      content,
    })

    this.commentsRepository.create(comment)

    return {
      comment,
    }
  }
}
