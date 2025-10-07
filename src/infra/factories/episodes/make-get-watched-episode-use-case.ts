import { FetchWatchedEpisodesUseCase } from 'src/domain/application/use-cases/fetch-watched-episodes'
import { GetWatchedEpisodeUseCase } from 'src/domain/application/use-cases/get-watched-episode'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'
import { PrismaUsersRepository } from 'src/infra/database/repositories/prisma-users-repository'
import { PrismaWatchedEpisodesRepository } from 'src/infra/database/repositories/prisma-watched-repository'

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
