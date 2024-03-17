import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { FetchEpisodeByAnimeUseCase } from './fetch-episodes-by-anime'
import { makeEpisode } from 'test/factories/make-episode'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { makeAnime } from 'test/factories/make-anime'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: FetchEpisodeByAnimeUseCase

describe('Fetch Episodes by Anime', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new FetchEpisodeByAnimeUseCase(
      inMemoryEpisodesRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to fetch episodes of an anime', async () => {
    const anime = makeAnime()

    inMemoryAnimesRepository.create(anime)

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        title: 'Titulo do episódio 01',
      }),
    )

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        title: 'Titulo do episódio 02',
      }),
    )

    const result = await sut.execute({
      animeId: anime.id.toValue(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episodes).toHaveLength(2)
      expect(result.value.episodes).toEqual([
        expect.objectContaining({
          animeId: anime.id,
          title: 'Titulo do episódio 01',
        }),
        expect.objectContaining({
          animeId: anime.id,
          title: 'Titulo do episódio 02',
        }),
      ])
    }
  })

  it('should be able to fetch episodes of an anime with a specific season', async () => {
    const anime = makeAnime()

    inMemoryAnimesRepository.create(anime)

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        title: 'Titulo do episódio 01',
        season: 1,
      }),
    )

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        title: 'Titulo do episódio 02',
        season: 2,
      }),
    )

    const result = await sut.execute({
      animeId: anime.id.toValue(),
      season: 2,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episodes).toHaveLength(1)
      expect(result.value.episodes).toEqual([
        expect.objectContaining({
          animeId: anime.id,
          title: 'Titulo do episódio 02',
        }),
      ])
    }
  })

  it('should not be able to fetch episodes of a non-existent anime', async () => {
    const result = await sut.execute({
      animeId: 'non-existent-anime',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
