import { Either, success } from '@/core/either'
import { AnimesRepository } from '../repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'

type FetchPopularAnimesUseCaseResponse = Either<null, { animes: Anime[] }>

export class FetchPopularAnimesUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute(): Promise<FetchPopularAnimesUseCaseResponse> {
    const animes = await this.animesRepository.findManyPopular()

    return success({ animes })
  }
}
