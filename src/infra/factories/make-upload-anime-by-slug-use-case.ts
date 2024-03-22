import { PrismaAnimesRepository } from '../database/repositories/prisma-animes-repository'
import { UploadAnimeBySlugUseCase } from '@/domain/application/use-cases/upload-anime-by-slug'
import { PrismaSeasonsRepository } from '../database/repositories/prisma-seasons-repository'

export function makeUploadAnimeBySlugUseCase() {
  const seasonsRepository = new PrismaSeasonsRepository()
  const animesRepository = new PrismaAnimesRepository(seasonsRepository)
  const useCase = new UploadAnimeBySlugUseCase(animesRepository)

  return useCase
}
