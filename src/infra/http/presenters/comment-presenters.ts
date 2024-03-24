import { Comment } from '@/domain/enterprise/entities/comment'

export class CommentPresenter {
  static toHTTP(comment: Comment) {
    return {
      id: comment.id.toString(),
      content: comment.content,
      authorId: comment.authorId.toString(),
      episodeId: comment.episodeId.toString,
      parentId: comment.parentId,
      updatedAt: comment.updatedAt,
      createdAt: comment.createdAt,
    }
  }
}
