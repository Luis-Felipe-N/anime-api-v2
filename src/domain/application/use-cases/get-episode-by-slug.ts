import { Episode } from '../../enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from '../../../core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetEpisodeBySlugUseCaseRequest {
  slug: string
}

type GetEpisodeBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episode: Episode
  }
>

export class GetEpisodeBySlugUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    slug,
  }: GetEpisodeBySlugUseCaseRequest): Promise<GetEpisodeBySlugUseCaseResponse> {
    const episode = await this.episodesRepository.findBySlug(slug)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    return success({ episode })
  }
}
