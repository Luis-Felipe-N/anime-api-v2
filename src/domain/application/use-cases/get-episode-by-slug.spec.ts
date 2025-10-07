import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { GetEpisodeBySlugUseCase } from './get-episode-by-slug'
import { Slug } from 'src/core/values-objects/slug'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeEpisode } from 'test/factories/make-episode'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: GetEpisodeBySlugUseCase

describe('Get Episode by slug', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    sut = new GetEpisodeBySlugUseCase(inMemoryEpisodesRepository)
  })

  it('should be able to get episode by slug', async () => {
    const newEpisode = makeEpisode({
      slug: Slug.create('titulo-do-episodio'),
    })

    await inMemoryEpisodesRepository.create(newEpisode)

    const result = await sut.execute({
      slug: 'titulo-do-episodio',
    })

    expect(result.isSuccess()).toBe(true)
  })

  it('should not be able to get episode with non-exists slug', async () => {
    const result = await sut.execute({
      slug: 'non-exists-slug',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
