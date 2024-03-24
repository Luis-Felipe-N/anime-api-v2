import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { UploadAnimeBySlugUseCase } from '@/domain/application/use-cases/upload-anime-by-slug'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'

export function makeUploadAnimeBySlugUseCase() {
  const seasonsRepository = new PrismaSeasonsRepository()
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new UploadAnimeBySlugUseCase(animesRepository)

  return useCase
}
