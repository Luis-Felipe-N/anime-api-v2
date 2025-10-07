import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { FetchAnimesByGenreUseCase } from './fetch-animes-by-genre'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeGenre } from 'test/factories/make-genre'
import { makeAnime } from 'test/factories/make-anime'
import { GenreList } from 'src/domain/enterprise/entities/genre-list'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: FetchAnimesByGenreUseCase

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
    inMemoryGenresRepository = new InMemoryGenresRepository()

    sut = new FetchAnimesByGenreUseCase(
      inMemoryAnimesRepository,
      inMemoryGenresRepository,
    )
  })

  it('should be able to fetch animes by genre', async () => {
    const genreAcao = makeGenre({ title: 'acao' })
    const genreTerror = makeGenre({ title: 'terror' })

    await inMemoryGenresRepository.create(genreAcao)
    await inMemoryGenresRepository.create(genreTerror)

    await inMemoryAnimesRepository.create(
      makeAnime({
        title: 'Anime de ação',
        genres: new GenreList([genreAcao]),
      }),
    )

    await inMemoryAnimesRepository.create(
      makeAnime({
        title: 'Anime de terror',

        genres: new GenreList([genreTerror]),
      }),
    )

    const result = await sut.execute({
      genreSlug: genreAcao.slug.value,
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

  // it('should not be able to fetch animes of a non-existent genre', async () => {
  //   const genreAcao = makeGenre({ title: 'acao' })
  //   const genreTerror = makeGenre({ title: 'terror' })

  //   await inMemoryGenresRepository.create(genreAcao)
  //   await inMemoryGenresRepository.create(genreTerror)

  //   await inMemoryAnimesRepository.create(
  //     makeAnime({
  //       title: 'Anime de ação',
  //       genres: new GenreList([genreAcao]),
  //     }),
  //   )

  //   await inMemoryAnimesRepository.create(
  //     makeAnime({
  //       title: 'Anime de terror',

  //       genres: new GenreList([genreTerror]),
  //     }),
  //   )

  //   const result = await sut.execute({
  //     genreSlug: 'aventura',
  //     page: 1,
  //   })

  //   expect(result.isFailure()).toBe(true)
  // })
})
