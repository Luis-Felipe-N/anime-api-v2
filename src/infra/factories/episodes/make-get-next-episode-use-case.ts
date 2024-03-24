import { GetNextEpisodeUseCase } from '@/domain/application/use-cases/get-next-episode'
import { PrismaAnimesRepository } from '@/infra/database/repositories/prisma-animes-repository'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'
import { PrismaGenresRepository } from '@/infra/database/repositories/prisma-genres-repository'
import { PrismaSeasonsRepository } from '@/infra/database/repositories/prisma-seasons-repository'

export function makeGetNextEpisodeUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository()
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
