import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'
import { UploadAnimesUseCase } from '../../../domain/application/use-cases/upload-animes'

export function makeUploadAnimeUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new UploadAnimesUseCase(animesRepository)

  return useCase
}
