import { PaginationParams } from 'src/core/types/pagination-params'
import { Comment } from 'src/domain/enterprise/entities/comment'

export interface CommentsRepository {
  create(comment: Comment): Promise<Comment>
  delete(comment: Comment): Promise<void>
  findById(id: string): Promise<Comment | null>
  fetchCommentsByEpisode(
    episodeId: string,
    params: PaginationParams,
  ): Promise<Comment[]>
}
