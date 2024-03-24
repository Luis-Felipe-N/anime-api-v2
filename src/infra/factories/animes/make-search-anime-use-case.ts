import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { SearchAnimeUseCase } from '@/domain/application/use-cases/search-animes'

export function makeSearchAnimeUseCase() {
  const seasonsRepository = new PrismaSeasonsRepository()
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new SearchAnimeUseCase(animesRepository)

  return useCase
}
