import { CreateAnimeUseCase } from '@/domain/application/use-cases/create-anime'
import { PrismaAnimesRepository } from '../database/repositories/prisma-animes-repository'

export function makeCreateAnimeUseCase() {
  const animesRepository = new PrismaAnimesRepository()
  const useCase = new CreateAnimeUseCase(animesRepository)

  return useCase
}
