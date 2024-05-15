import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeGenre } from 'test/factories/make-genre'

import { GenreList } from '@/domain/enterprise/entities/genre-list'
import { FetchPopularAnimesUseCase } from './fetch-popular-animes'
import { makeAnime } from 'test/factories/make-anime'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: FetchPopularAnimesUseCase

describe('Fetch Animes by Season', () => {
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

    sut = new FetchPopularAnimesUseCase(inMemoryAnimesRepository)
  })

  it('should be able to fetch popular animes', async () => {
    const genreAcao = makeGenre({ title: 'acao' })
    const genreTerror = makeGenre({ title: 'terror' })

    await inMemoryGenresRepository.create(genreAcao)
    await inMemoryGenresRepository.create(genreTerror)

    makeAnime({
      title: '01 Anime de ação',
      genres: new GenreList([genreAcao]),
      rating: 2,
    })

    for (let index = 1; index <= 20; index++) {
      await inMemoryAnimesRepository.create(
        makeAnime({
          title: 'Anime de ação',
          genres: new GenreList([genreAcao]),
          rating: 8,
        }),
      )
    }

    await inMemoryAnimesRepository.create(
      makeAnime({
        title: 'Anime de terror',

        genres: new GenreList([genreTerror]),
      }),
    )

    const result = await sut.execute()

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.animes).toHaveLength(5)
      expect(result.value.animes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            rating: 8,
          }),
        ]),
      )
    }
  })
})
