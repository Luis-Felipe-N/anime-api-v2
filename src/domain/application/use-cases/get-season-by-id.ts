import { Season } from '@/domain/enterprise/entities/season'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SeasonsRepository } from '../repositories/seasons-repository'

interface GetSeasonByIdUseCaseRequest {
  id: string
}

type GetSeasonByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    season: Season
  }
>

export class GetSeasonByIdUseCase {
  constructor(private seasonsRepository: SeasonsRepository) {}

  async execute({
    id,
  }: GetSeasonByIdUseCaseRequest): Promise<GetSeasonByIdUseCaseResponse> {
    const season = await this.seasonsRepository.findById(id)

    if (!season) {
      return failure(new ResourceNotFoundError())
    }

    return success({ season })
  }
}
