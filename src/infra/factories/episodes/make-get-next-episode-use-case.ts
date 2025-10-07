import { GetNextEpisodeUseCase } from '../../../domain/application/use-cases/get-next-episode'
import { PrismaAnimesRepository } from '../../database/repositories/prisma-animes-repository'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'

export function makeGetNextEpisodeUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository,
  )

  const useCase = new GetNextEpisodeUseCase(
    episodesRepository,
    seasonsRepository,
    animesRepository,
  )

  return useCase
}
