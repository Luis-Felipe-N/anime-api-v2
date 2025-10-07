import { GetSeasonByIdUseCase } from 'src/domain/application/use-cases/get-season-by-id'
import { PrismaEpisodesRepository } from 'src/infra/database/repositories/prisma-episodes-repository'
import { PrismaSeasonsRepository } from 'src/infra/database/repositories/prisma-seasons-repository'

export function makeGetSeasonByIdUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)

  const useCase = new GetSeasonByIdUseCase(seasonsRepository)

  return useCase
}
