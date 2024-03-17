import { CreateAnimeUseCase } from './create-anime'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: CreateAnimeUseCase

describe('Create Anime', () => {
  beforeEach(() => {
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new CreateAnimeUseCase(inMemoryAnimesRepository)
  })

  it('should be able to create an anime', async () => {
    const result = await sut.execute({
      banner: '',
      cover: '',
      description: '',
      title: 'Jujutsu',
    })
    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.anime.title).toEqual('Jujutsu')
      expect(inMemoryAnimesRepository.items[0].id).toEqual(
        result.value.anime.id,
      )
    }
  })
})
