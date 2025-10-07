import { Episode } from '../../enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from '../../../core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetEpisodeByIdUseCaseRequest {
  id: string
}

type GetEpisodeByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    episode: Episode
  }
>

export class GetEpisodeByIdUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    id,
  }: GetEpisodeByIdUseCaseRequest): Promise<GetEpisodeByIdUseCaseResponse> {
    const episode = await this.episodesRepository.findById(id)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    return success({ episode })
  }
}
