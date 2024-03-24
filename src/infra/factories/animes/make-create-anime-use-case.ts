import { CreateAnimeUseCase } from '@/domain/application/use-cases/create-anime'
import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'

export function makeCreateAnimeUseCase() {
  const seasonsRepository = new PrismaSeasonsRepository()
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new CreateAnimeUseCase(animesRepository)

  return useCase
}
