import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { GetSeasonByIdUseCase } from './get-season-by-id'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeSeason } from 'test/factories/make-season'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: GetSeasonByIdUseCase

describe('Get Season by id', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    sut = new GetSeasonByIdUseCase(inMemorySeasonsRepository)
  })

  it('should be able to get season by id', async () => {
    const newSeason = makeSeason({}, new UniqueEntityId('id-da-season'))

    await inMemorySeasonsRepository.create(newSeason)

    const result = await sut.execute({
      id: 'id-da-season',
    })

    expect(result.isSuccess()).toBe(true)
  })

  it('should not be able to get season with non-exists id', async () => {
    const result = await sut.execute({
      id: 'non-exists-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
