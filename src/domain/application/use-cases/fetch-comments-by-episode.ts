import { Comment } from '@/domain/enterprise/entities/Comment'
import { CommentsRepository } from '../repositories/comment.repository'
import { EpisodesRepository } from '../repositories/episode.repository'

interface FetchCommentsByEpisodeUseCaseRequest {
  episodeId: string
  page: number
}

interface FetchCommentsByEpisodeUseCaseResponse {
  comments: Comment[]
}

export class FetchCommentsByEpisodeUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private episodesRepository: EpisodesRepository,
  ) {}

  async execute({
    episodeId,
    page,
  }: FetchCommentsByEpisodeUseCaseRequest): Promise<FetchCommentsByEpisodeUseCaseResponse> {
    const episode = this.episodesRepository.findById(episodeId)

    if (!episode) {
      throw new Error('Episode not found')
    }

    const comments = await this.commentsRepository.fetchCommentsByEpisode({
      episodeId,
      page,
    })

    if (!comments.length) {
      throw new Error('Comments not found')
    }

    return { comments }
  }
}
