import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { CreateWatchedEpisodeUseCase } from '@/domain/application/use-cases/create-watched-episode'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { PrismaWatchedEpisodesRepository } from '@/infra/database/repositories/prisma-watched-repository'

export function makeCreateWatchedEpisodeUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const episodesRepository = new PrismaEpisodesRepository()
    const watchedRepository = new PrismaWatchedEpisodesRepository()

    const useCase = new CreateWatchedEpisodeUseCase(watchedRepository, episodesRepository)

    return useCase
}
