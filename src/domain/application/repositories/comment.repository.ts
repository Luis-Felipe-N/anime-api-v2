import { Comment } from '@/domain/enterprise/entities/Comment'

export interface FetchCommentsByEpisodeProps {
  episodeId: string
  page: number
}

export interface CommentsRepository {
  create(comment: Comment): Promise<void>
  delete(comment: Comment): Promise<void>
  findById(id: string): Promise<Comment | null>
  fetchCommentsByEpisode({
    episodeId,
    page,
  }: FetchCommentsByEpisodeProps): Promise<Comment[]>
}
