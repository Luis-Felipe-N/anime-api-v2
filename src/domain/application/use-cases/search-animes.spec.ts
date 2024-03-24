import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeAnime } from 'test/factories/make-anime'
import { SearchAnimeUseCase } from './search-animes'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: SearchAnimeUseCase

describe('Search Animes', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryGenresRepository = new InMemoryGenresRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
      inMemoryGenresRepository,
    )
    inMemoryGenresRepository = new InMemoryGenresRepository()

    sut = new SearchAnimeUseCase(inMemoryAnimesRepository)
  })

  it('should be able to search animes', async () => {
    await inMemoryAnimesRepository.create(
      makeAnime({
        title: 'Anime de ação',
      }),
    )

    await inMemoryAnimesRepository.create(
      makeAnime({
        title: 'Anime de terror',
      }),
    )

    const result = await sut.execute({
      keyword: 'acao',
      page: 1,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.animes).toHaveLength(1)
      expect(result.value.animes).toEqual([
        expect.objectContaining({
          title: 'Anime de ação',
        }),
      ])
    }
  })
})
