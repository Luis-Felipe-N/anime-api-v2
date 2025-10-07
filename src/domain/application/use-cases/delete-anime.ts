import { Either, failure, success } from '../../../core/either'
import { AnimesRepository } from '../repositories/animes.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAnimeUseCaseRequest {
  id: string
  userId: string
}

type DeleteAnimeUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteAnimeUseCase {
  constructor(private animesRepository: AnimesRepository) {}

  async execute({
    id,
  }: DeleteAnimeUseCaseRequest): Promise<DeleteAnimeUseCaseResponse> {
    const anime = await this.animesRepository.findById(id)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    // TODO: Verificar permissão para excluir

    await this.animesRepository.delete(anime)

    return success({})
  }
}
