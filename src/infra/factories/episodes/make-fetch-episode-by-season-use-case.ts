import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { FetchEpisodeBySeasonUseCase } from '@/domain/application/use-cases/fetch-episodes-by-season'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'

export function makeFetchEpisodeBySeasonUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository()

  const useCase = new FetchEpisodeBySeasonUseCase(
    episodesRepository,
    seasonsRepository,
  )

  return useCase
}
