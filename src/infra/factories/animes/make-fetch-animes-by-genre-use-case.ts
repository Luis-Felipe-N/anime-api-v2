import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { FetchAnimesByGenreUseCase } from '@/domain/application/use-cases/fetch-animes-by-genre'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'

export function makeFetchAnimesByGenreUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )
  const useCase = new FetchAnimesByGenreUseCase(
    animesRepository,
    genresRepository,
  )
  return useCase
}
