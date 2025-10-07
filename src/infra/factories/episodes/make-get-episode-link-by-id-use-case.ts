import { GetEpisodeLinkByIdUseCase } from '../../../domain/application/use-cases/get-episode-link'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'

export function makeGetEpisodeLinkByIdUseCase() {
  const episodesRepository = new PrismaEpisodesRepository()

  const useCase = new GetEpisodeLinkByIdUseCase(episodesRepository)

  return useCase
}
