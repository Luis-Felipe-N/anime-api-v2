import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { FetchSeasonsByAnimeUseCase } from '../../../domain/application/use-cases/fetch-seasons-by-anime'
import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'

export function makeFetchSeasonsByAnimeUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )

  const useCase = new FetchSeasonsByAnimeUseCase(
    seasonsRepository,
    animesRepository,
  )

  return useCase
}
