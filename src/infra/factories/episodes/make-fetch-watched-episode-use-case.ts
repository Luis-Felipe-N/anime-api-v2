import { FetchWatchedEpisodesUseCase } from '../../../domain/application/use-cases/fetch-watched-episodes'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'
import { PrismaUsersRepository } from '../../database/repositories/prisma-users-repository'
import { PrismaWatchedEpisodesRepository } from '../../database/repositories/prisma-watched-repository'

export function makeFetchWatchedEpisodesUseCase() {
    const watchedRepository = new PrismaWatchedEpisodesRepository()

    const useCase = new FetchWatchedEpisodesUseCase(watchedRepository)

    return useCase
}
