import { AnimeOnWatchlistUseCase } from '@/domain/application/use-cases/anime-on-watchlist'
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository'
import { PrismaWatchlistAnimesRepository } from '@/infra/database/repositories/prisma-watchlist-animes-repository'
import { PrismaWatchlistsRepository } from '@/infra/database/repositories/prisma-watchlists-repository'

export function makeAnimeOnWatchlistUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const watchlistsAnimesRepository = new PrismaWatchlistAnimesRepository()
  const watchlistsRepository = new PrismaWatchlistsRepository(watchlistsAnimesRepository)
  const useCase = new AnimeOnWatchlistUseCase(usersRepository, watchlistsRepository)

  return useCase
}
