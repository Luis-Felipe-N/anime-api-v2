import { Either, failure, success } from '@/core/either'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { EpisodesRepository } from '../repositories/episode.repository'

interface DeleteEpisodeUseCaseRequest {
  id: string
  userId: string
}

type DeleteEpisodeUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteEpisodeUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    id,
  }: DeleteEpisodeUseCaseRequest): Promise<DeleteEpisodeUseCaseResponse> {
    const episode = await this.episodesRepository.findById(id)

    if (!episode) {
      return failure(new ResourceNotFoundError())
    }

    // TODO: Verificar permissão para excluir

    await this.episodesRepository.delete(episode)

    return success({})
  }
}
