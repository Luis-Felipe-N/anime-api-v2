import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { FetchSeasonsByAnimeUseCase } from '@/domain/application/use-cases/fetch-seasons-by-anime'
import { PrismaAnimesRepository } from '@/infra/database/repositories/prisma-animes-repository'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'
import { PrismaGenresRepository } from '@/infra/database/repositories/prisma-genres-repository'

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
