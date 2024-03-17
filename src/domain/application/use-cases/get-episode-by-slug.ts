import { Episode } from '@/domain/enterprise/entities/Episode'
import { EpisodesRepository } from '../repositories/episode.repository'

interface GetEpisodeBySlugUseCaseRequest {
  slug: string
}

interface GetEpisodeBySlugUseCaseResponse {
  episode: Episode
}

export class GetEpisodeBySlugUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    slug,
  }: GetEpisodeBySlugUseCaseRequest): Promise<GetEpisodeBySlugUseCaseResponse> {
    const episode = await this.episodesRepository.findBySlug(slug)

    if (!episode) {
      throw new Error('Anime not found')
    }

    return { episode }
  }
}
