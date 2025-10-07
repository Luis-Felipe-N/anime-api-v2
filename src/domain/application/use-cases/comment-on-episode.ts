import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Comment } from 'src/domain/enterprise/entities/comment'
import { CommentsRepository } from 'src/domain/application/repositories/comment.repository'
import { Either, failure, success } from 'src/core/either'
import { EpisodesRepository } from '../repositories/episode.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CommentOnEpisodeUseCaseRequest {
  authorId: string
  episodeId: string
  content: string
}

type CommentOnEpisodeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    comment: Comment
  }
>

export class CommentOnEpisodeUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private episodesRepository: EpisodesRepository,
  ) {}

  async execute({
    authorId,
    content,
    episodeId,
  }: CommentOnEpisodeUseCaseRequest): Promise<CommentOnEpisodeUseCaseResponse> {
    const episode = await this.episodesRepository.findById(episodeId)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    const comment = Comment.create({
      authorId: new UniqueEntityId(authorId),
      episodeId: episode.id,
      content,
    })

    await this.commentsRepository.create(comment)

    return success({
      comment,
    })
  }
}
