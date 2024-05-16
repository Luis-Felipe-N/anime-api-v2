import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeSeason } from 'test/factories/make-season'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { FetchSeasonsByAnimeUseCase } from './fetch-seasons-by-anime'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { makeAnime } from 'test/factories/make-anime'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: FetchSeasonsByAnimeUseCase

describe('Fetch Seasons by Anime', () => {
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

    sut = new FetchSeasonsByAnimeUseCase(
      inMemorySeasonsRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to fetch seasons of an anime', async () => {
    const anime = makeAnime({
      title: 'Titulo do episódio 01',
    })
    const season = makeSeason({
      animeId: anime.id,
      title: 'Titulo do episódio 01',
    })

    await inMemorySeasonsRepository.create(season)

    await inMemoryAnimesRepository.create(anime)

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        seasonId: season.id,
        title: 'Titulo do episódio 02',
      }),
    )

    const result = await sut.execute({
      animeId: anime.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.seasons).toHaveLength(1)
      expect(result.value.seasons).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: season.id,
            title: 'Titulo do episódio 01',
          }),
        ]),
      )
    }
  })

  it('should not be able to fetch episodes of a non-existent season', async () => {
    const result = await sut.execute({
      animeId: 'non-existent-anime',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
