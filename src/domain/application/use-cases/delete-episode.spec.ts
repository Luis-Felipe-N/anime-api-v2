import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteEpisodeUseCase } from './delete-episode'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: DeleteEpisodeUseCase

describe('Delete Episode', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    sut = new DeleteEpisodeUseCase(inMemoryEpisodesRepository)
  })

  it('should be able to delete an episode', async () => {
    const episode = makeEpisode({}, new UniqueEntityId('episode-id'))

    await inMemoryEpisodesRepository.create(episode)

    const result = await sut.execute({
      id: 'episode-id',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(inMemoryEpisodesRepository.items).toHaveLength(0)
    }
  })

  it('should not be able to delete a non-existent episode', async () => {
    const episode = makeEpisode({}, new UniqueEntityId('episode-id'))

    await inMemoryEpisodesRepository.create(episode)

    const result = await sut.execute({
      id: 'episode-id-02',
    })

    expect(result.isFailure()).toBe(true)

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
