import { Comment } from '../entities/Comment'

export interface CommentsRepository {
  create(Comment: Comment): Promise<void>
}
