import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/Anime'

interface GetAnimeBySlugUseCaseRequest {
  slug: string
}

interface GetAnimeBySlugUseCaseResponse {
  anime: Anime
}

export class GetAnimeBySlugUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    slug,
  }: GetAnimeBySlugUseCaseRequest): Promise<GetAnimeBySlugUseCaseResponse> {
    const anime = await this.animesRepository.findBySlug(slug)

    if (!anime) {
      throw new Error('Anime not found')
    }

    return { anime }
  }
}
