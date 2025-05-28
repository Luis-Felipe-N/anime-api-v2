import { GetEpisodeLinkByIdUseCase } from '@/domain/application/use-cases/get-episode-link'
import { PrismaEpisodesRepository } from '@/infra/database/repositories/prisma-episodes-repository'

export function makeGetEpisodeLinkByIdUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()

  const useCase = new GetEpisodeLinkByIdUseCase(episodesRepository)

  return useCase
}
