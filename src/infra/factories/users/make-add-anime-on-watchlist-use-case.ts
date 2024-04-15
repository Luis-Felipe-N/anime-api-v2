import { AddAnimeOnWatchlistUseCase } from '@/domain/application/use-cases/add-anime-on-watchlist'
import { GetUserProfileUseCase } from '@/domain/application/use-cases/get-user-profile'
import { PrismaAnimesRepository } from '@/infra/database/repositories/prisma-animes-repository'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'
import { PrismaGenresRepository } from '@/infra/database/repositories/prisma-genres-repository'
import { PrismaSeasonsRepository } from '@/infra/database/repositories/prisma-seasons-repository'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { PrismaWatchlistsRepository } from '@/infra/database/repositories/prisma-watchlists-repository'

export function makeAddAnimeOnWatchlistUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )

  const watchlistsRepository = new PrismaWatchlistsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AddAnimeOnWatchlistUseCase(
    usersRepository,
    watchlistsRepository,
    animesRepository,
  )
  return useCase
}
