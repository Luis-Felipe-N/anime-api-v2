import { Comment } from '@/domain/enterprise/entities/Comment'

export interface CommentsRepository {
  create(comment: Comment): Promise<void>
}
