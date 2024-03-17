import { Comment } from '@/domain/enterprise/entities/Comment'
import {
  CommentsRepository,
  FetchCommentsByEpisodeProps,
} from '@/domain/application/repositories/comment.repository'

export class InMemoryCommentsRepository implements CommentsRepository {
  public items: Comment[] = []

  async create(comment: Comment): Promise<void> {
    this.items.push(comment)
  }

  async fetchCommentsByEpisode({
    episodeId,
    page,
  }: FetchCommentsByEpisodeProps) {
    const comments = this.items
      .filter((item) => item.episodeId.toValue() === episodeId)
      .slice((page - 1) * 20, page * 20)

    return comments
  }
}
