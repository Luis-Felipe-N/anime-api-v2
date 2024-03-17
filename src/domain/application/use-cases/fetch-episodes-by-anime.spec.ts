import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchEpisodeByAnimeUseCase } from './fetch-episodes-by-anime'
import { makeEpisode } from 'test/factories/make-episode'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: FetchEpisodeByAnimeUseCase

describe('Fetch Episodes by Anime', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    sut = new FetchEpisodeByAnimeUseCase(inMemoryEpisodesRepository)
  })

  it('should be able to fetch episodes of an anime', async () => {
    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 01',
      }),
    )

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 02',
      }),
    )

    const { episodes } = await sut.execute({
      animeId: 'anime-id',
    })

    expect(episodes).toHaveLength(2)
    expect(episodes).toEqual([
      expect.objectContaining({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 01',
      }),
      expect.objectContaining({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 02',
      }),
    ])
  })

  it('should be able to fetch episodes of an anime with a specific season', async () => {
    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 01',
        season: 1,
      }),
    )

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 02',
        season: 2,
      }),
    )

    const { episodes } = await sut.execute({
      animeId: 'anime-id',
      season: 2,
    })

    expect(episodes).toHaveLength(1)
    expect(episodes).toEqual([
      expect.objectContaining({
        animeId: new UniqueEntityId('anime-id'),
        title: 'Titulo do episódio 02',
      }),
    ])
  })

  it('should not be able to fetch episodes of a non-existent anime', async () => {
    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: new UniqueEntityId('anime-id-03'),
      }),
    )

    inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: new UniqueEntityId('anime-id-02'),
      }),
    )

    await expect(
      sut.execute({
        animeId: 'anime-id-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
