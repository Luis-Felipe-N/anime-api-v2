import { Comment } from '@/domain/enterprise/entities/comment'
import { CommentsRepository } from '@/domain/application/repositories/comment.repository'
import { PaginationParams } from '@/core/types/pagination-params'

export class InMemoryCommentsRepository implements CommentsRepository {
  public items: Comment[] = []

  async create(comment: Comment): Promise<void> {
    this.items.push(comment)
  }

  async delete(comment: Comment): Promise<void> {
    const commentIndex = this.items.findIndex((item) => item.id === comment.id)

    this.items.splice(commentIndex, 1)
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = this.items.find((item) => item.id.toString() === id)

    if (!comment) {
      return null
    }

    return comment
  }

  async fetchCommentsByEpisode(episodeId: string, params: PaginationParams) {
    const comments = this.items
      .filter((item) => item.episodeId.toString() === episodeId)
      .slice((params.page - 1) * 20, params.page * 20)

    return comments
  }
}
