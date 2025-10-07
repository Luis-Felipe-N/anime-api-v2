import { CommentOnEpisodeUseCase } from '../../../domain/application/use-cases/comment-on-episode'
import { FetchCommentsByEpisodeUseCase } from '../../../domain/application/use-cases/fetch-comments-by-episode'
import { PrismaCommentsRepository } from '../../database/repositories/prisma-comments-repository'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'

export function makeFetchCommentsByEpisodeUseCase() {
    const commentsRepository = new PrismaCommentsRepository()
    const episodesRepository = new PrismaEpisodesRepository()

    const useCase = new FetchCommentsByEpisodeUseCase(
        commentsRepository,
        episodesRepository,
    )

    return useCase
}
