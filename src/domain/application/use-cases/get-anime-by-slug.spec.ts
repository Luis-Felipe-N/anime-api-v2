import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { GetAnimeBySlugUseCase } from './get-anime-by-slug'
import { makeAnime } from 'test/factories/make-anime'
import { Slug } from '@/core/values-objects/slug'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryGenresRepository: InMemoryGenresRepository

let sut: GetAnimeBySlugUseCase

describe('Get Anime by slug', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()

    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryGenresRepository = new InMemoryGenresRepository()

    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
      inMemoryGenresRepository,
    )
    sut = new GetAnimeBySlugUseCase(inMemoryAnimesRepository)
  })

  it('should be able to get anime by slug', async () => {
    const animeCreated = makeAnime({
      slug: Slug.create('titulo-do-anime'),
    })

    await inMemoryAnimesRepository.create(animeCreated)

    const result = await sut.execute({
      slug: 'titulo-do-anime',
    })
    expect(result.isSuccess()).toBe(true)
  })

  it('should not be able to get anime with non-exists slug', async () => {
    const result = await sut.execute({
      slug: 'non-exists-slug',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
