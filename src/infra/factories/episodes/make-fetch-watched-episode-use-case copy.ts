import { FetchWatchedEpisodesUseCase } from '@/domain/application/use-cases/fetch-watched-episodes'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { PrismaWatchedEpisodesRepository } from '@/infra/database/repositories/prisma-watched-repository'

export function makeFetchWatchedByEpisodeUseCase() {
    const watchedRepository = new PrismaWatchedEpisodesRepository()
    const episodeRepository = new PrismaEpisodesRepository()
    const userRepository = new PrismaUsersRepository()

    const useCase = new FetchWatchedEpisodesUseCase(
        watchedRepository,
        userRepository,
        episodeRepository
    )

    return useCase
}
