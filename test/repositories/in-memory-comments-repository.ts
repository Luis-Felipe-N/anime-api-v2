import { Comment } from '@/domain/enterprise/entities/Comment'
import { CommentsRepository } from '@/domain/application/repositories/comment.repository'

export class InMemoryCommentsRepository implements CommentsRepository {
  public items: Comment[] = []

  async create(comment: Comment): Promise<void> {
    this.items.push(comment)
  }
}
