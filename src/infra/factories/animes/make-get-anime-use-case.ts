import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { GetAnimeBySlugUseCase } from 'src/domain/application/use-cases/get-anime-by-slug'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'

export function makeGetAnimeBySlugUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new GetAnimeBySlugUseCase(animesRepository)

  return useCase
}
