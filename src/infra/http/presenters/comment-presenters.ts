import { Comment } from '@/domain/enterprise/entities/comment'
import { UserPresenter } from './user-presenters'

export class CommentPresenter {
  static toHTTP(comment: Comment) {
    return {
      id: comment.id.toString(),
      content: comment.content,
      episodeId: comment.episodeId.toString,
      parentId: comment.parentId,
      updatedAt: comment.updatedAt,
      createdAt: comment.createdAt,
      author: comment.author && UserPresenter.toHTTP(comment.author),
    }
  }
}
