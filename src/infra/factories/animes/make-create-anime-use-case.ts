import { CreateAnimeUseCase } from 'src/domain/application/use-cases/create-anime'
import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'

export function makeCreateAnimeUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new CreateAnimeUseCase(animesRepository)

  return useCase
}
