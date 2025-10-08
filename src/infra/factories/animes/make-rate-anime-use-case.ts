import { RateAnimeUseCase } from "../../../domain/application/use-cases/rate-anime"
import { PrismaAnimesRepository } from "../../database/repositories/prisma-animes-repository"
import { PrismaSeasonsRepository } from '../../database/repositories/prisma-seasons-repository'
import { PrismaGenresRepository } from '../../database/repositories/prisma-genres-repository'
import { PrismaEpisodesRepository } from '../../database/repositories/prisma-episodes-repository'

export function makeRateAnimeUseCase() {
  const ratingsRepository = new PrismaRatingsRepository()
  const episodesRepository = new PrismaEpisodesRepository()
  const seasonsRepository = new PrismaSeasonsRepository(episodesRepository)
  const genresRepository = new PrismaGenresRepository()
  const animesRepository = new PrismaAnimesRepository(
    seasonsRepository,
    genresRepository
  )
  const useCase = new RateAnimeUseCase(ratingsRepository, animesRepository)

  return useCase
}