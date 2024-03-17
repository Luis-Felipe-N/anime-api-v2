import { Either, failure, success } from '@/core/either'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { CommentsRepository } from '../repositories/comment.repository'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteCommentUseCaseRequest {
  id: string
  userId: string
}

type DeleteCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    id,
    userId,
  }: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findById(id)

    if (!comment) {
      return failure(new ResourceNotFoundError())
    }

    if (userId !== comment.authorId.toString()) {
      return failure(new NotAllowedError())
    }
    await this.commentsRepository.delete(comment)

    return success({})
  }
}
