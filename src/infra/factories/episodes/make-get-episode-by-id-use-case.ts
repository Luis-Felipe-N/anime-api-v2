import { GetEpisodeByIdUseCase } from '@/domain/application/use-cases/get-episode-by-id'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'

export function makeGetEpisodeByIdUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()

  const useCase = new GetEpisodeByIdUseCase(episodesRepository)

  return useCase
}
