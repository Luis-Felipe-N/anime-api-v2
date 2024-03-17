import { Comment } from '@/domain/enterprise/entities/Comment'

export interface FetchCommentsByEpisodeProps {
  episodeId: string
  page: number
}

export interface CommentsRepository {
  create(comment: Comment): Promise<void>
  fetchCommentsByEpisode({
    episodeId,
    page,
  }: FetchCommentsByEpisodeProps): Promise<Comment[]>
}
