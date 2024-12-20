import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { CreateEpisodeUseCase } from './create-episode'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeAnime } from 'test/factories/make-anime'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { makeSeason } from 'test/factories/make-season'
// import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: CreateEpisodeUseCase

describe('Create Anime', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryGenresRepository = new InMemoryGenresRepository()

    sut = new CreateEpisodeUseCase(
      inMemoryEpisodesRepository,
      inMemorySeasonsRepository,
    )
  })

  it('should be able to create a episode', async () => {
    const season = makeSeason()

    await inMemorySeasonsRepository.create(season)

    const result = await sut.execute({
      seasonId: season.id.toString(),
      title: 'Titulo do episódio',
      description: 'Descrição do episódio',
      cover: 'episode-cover-link',
      duration: 800,
      index: 0,
      season: 1,
      video: '',
      type: "ANIMESONLINE"
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episode.title).toEqual('Titulo do episódio')
      expect(inMemoryEpisodesRepository.items[0].id).toEqual(
        result.value.episode.id,
      )
    }
  })
})
