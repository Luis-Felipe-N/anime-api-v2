import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { FetchEpisodeBySeasonUseCase } from 'src/domain/application/use-cases/fetch-episodes-by-season'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'

export function makeFetchEpisodeBySeasonUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)

  const useCase = new FetchEpisodeBySeasonUseCase(
    episodesRepository,
    seasonsRepository,
  )

  return useCase
}
