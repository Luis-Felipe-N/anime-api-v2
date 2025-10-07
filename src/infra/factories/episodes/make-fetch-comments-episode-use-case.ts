import { CommentOnEpisodeUseCase } from 'src/domain/application/use-cases/comment-on-episode'
import { FetchCommentsByEpisodeUseCase } from 'src/domain/application/use-cases/fetch-comments-by-episode'
import { PrismaCommentsRepository } from 'src/infra/database/repositories/prisma-comments-repository'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'

export function makeFetchCommentsByEpisodeUseCase() {
    const commentsRepository = new PrismaCommentsRepository()
    const episodesRepository = new PrismaEpisodesRepository()

    const useCase = new FetchCommentsByEpisodeUseCase(
        commentsRepository,
        episodesRepository,
    )

    return useCase
}
