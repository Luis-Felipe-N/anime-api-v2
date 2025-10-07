import { Either, failure, success } from '../../../core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'
import { Season } from '../../enterprise/entities/season'
import { AnimesRepository } from '../repositories/animes.repository'

interface FetchSeasonsByAnimeUseCaseRequest {
  animeId: string
}

type FetchSeasonsByAnimeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    seasons: Season[]
  }
>

export class FetchSeasonsByAnimeUseCase {
  constructor(
    private seasonRepository: SeasonsRepository,
    private animesRepository: AnimesRepository,
  ) {}

  async execute({
    animeId,
  }: FetchSeasonsByAnimeUseCaseRequest): Promise<FetchSeasonsByAnimeUseCaseResponse> {
    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    const seasons = await this.seasonRepository.findManyByAnime(animeId)

    return success({ seasons })
  }
}
