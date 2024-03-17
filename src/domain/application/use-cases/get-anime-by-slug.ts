import { Either, failure, success } from '@/core/either'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAnimeBySlugUseCaseRequest {
  slug: string
}

type GetAnimeBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    anime: Anime
  }
>

export class GetAnimeBySlugUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    slug,
  }: GetAnimeBySlugUseCaseRequest): Promise<GetAnimeBySlugUseCaseResponse> {
    const anime = await this.animesRepository.findBySlug(slug)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    return success({ anime })
  }
}
