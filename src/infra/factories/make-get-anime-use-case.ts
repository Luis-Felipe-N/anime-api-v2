import { PrismaAnimesRepository } from '../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../database/repositories/prisma-genres-repository'
import { GetAnimeBySlugUseCase } from '@/domain/application/use-cases/get-anime-by-slug'

export function makeGetAnimeBySlugUseCase() {
  const seasonsRepository = new PrismaSeasonsRepository()
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new GetAnimeBySlugUseCase(animesRepository)

  return useCase
}
