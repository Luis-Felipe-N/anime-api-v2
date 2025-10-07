import { FetchWatchedEpisodesUseCase } from 'src/domain/application/use-cases/fetch-watched-episodes'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'
import { PrismaUsersRepository } from 'src/infra/database/repositories/prisma-users-repository'
import { PrismaWatchedEpisodesRepository } from 'src/infra/database/repositories/prisma-watched-repository'

export function makeFetchWatchedEpisodesUseCase() {
    const watchedRepository = new PrismaWatchedEpisodesRepository()

    const useCase = new FetchWatchedEpisodesUseCase(watchedRepository)

    return useCase
}
