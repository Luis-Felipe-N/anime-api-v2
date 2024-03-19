import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { DeleteAnimeUseCase } from './delete-anime'
import { makeAnime } from 'test/factories/make-anime'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: DeleteAnimeUseCase

describe('Delete Anime', () => {
  beforeEach(() => {
    inMemorySeasonsRepository = new InMemorySeasonsRepository()
    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
    )
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
