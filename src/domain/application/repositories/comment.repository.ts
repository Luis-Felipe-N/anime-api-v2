import { PaginationParams } from '@/core/types/pagination-params'
import { Comment } from '@/domain/enterprise/entities/comment'

export interface CommentsRepository {
  create(comment: Comment): Promise<Comment>
  delete(comment: Comment): Promise<void>
  findById(id: string): Promise<Comment | null>
  fetchCommentsByEpisode(
    episodeId: string,
    params: PaginationParams,
  ): Promise<Comment[]>
}
