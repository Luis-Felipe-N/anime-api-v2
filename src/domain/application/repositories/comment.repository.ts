import { PaginationParams } from '@/core/types/paginations-params'
import { Comment } from '@/domain/enterprise/entities/comment'

export interface FetchCommentsByEpisodeProps {
  episodeId: string
  params: PaginationParams
}

export interface CommentsRepository {
  create(comment: Comment): Promise<void>
  delete(comment: Comment): Promise<void>
  findById(id: string): Promise<Comment | null>
  fetchCommentsByEpisode({
    episodeId,
    params,
  }: FetchCommentsByEpisodeProps): Promise<Comment[]>
}
