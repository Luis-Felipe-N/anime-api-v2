import { CommentOnEpisodeUseCase } from '../../../domain/application/use-cases/comment-on-episode'
import { PrismaCommentsRepository } from '../../database/repositories/prisma-comments-repository'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'

export function makeCommentOnEpisodeUseCase() {
  const commentsRepository = new PrismaCommentsRepository()
  const episodesRepository = new PrismaEpisodesRepository()

  const useCase = new CommentOnEpisodeUseCase(
    commentsRepository,
    episodesRepository,
  )

  return useCase
}
