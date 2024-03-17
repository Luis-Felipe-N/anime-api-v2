import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { DeleteAnimeUseCase } from './delete-anime'
import { makeAnime } from 'test/factories/make-anime'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: DeleteAnimeUseCase

describe('Delete Anime', () => {
  beforeEach(() => {
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new DeleteAnimeUseCase(inMemoryAnimesRepository)
  })

  it('should be able to delete an anime', async () => {
    const anime = makeAnime({}, new UniqueEntityId('anime-id'))

    await inMemoryAnimesRepository.create(anime)

    const result = await sut.execute({
      id: 'anime-id',
      userId: 'user-id',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(inMemoryAnimesRepository.items).toHaveLength(0)
    }
  })

  it('should not be able to delete a non-existent anime', async () => {
    const anime = makeAnime({}, new UniqueEntityId('anime-id'))

    await inMemoryAnimesRepository.create(anime)

    const result = await sut.execute({
      id: 'anime-id-02',
      userId: 'user-id',
    })

    expect(result.isFailure()).toBe(true)

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
