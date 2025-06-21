import { FetchWatchedEpisodesUseCase } from '@/domain/application/use-cases/fetch-watched-episodes'
import { GetWatchedEpisodeUseCase } from '@/domain/application/use-cases/get-watched-episode'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { PrismaWatchedEpisodesRepository } from '@/infra/database/repositories/prisma-watched-repository'

export function makeGetWatchedByEpisodeUseCase() {
    const watchedRepository = new PrismaWatchedEpisodesRepository()
    const episodeRepository = new PrismaEpisodesRepository()
    const userRepository = new PrismaUsersRepository()

    const useCase = new GetWatchedEpisodeUseCase(
        watchedRepository,
        userRepository,
        episodeRepository
    )

    return useCase
}
