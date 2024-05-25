import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { CreateWatchedEpisodeUseCase } from './create-watched-episode'
import { InMemoryWatchedEpisodesRepository } from 'test/repositories/in-memory-watched-episode'
import { makeSeason } from 'test/factories/make-season'
import { makeEpisode } from 'test/factories/make-episode'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryWatchedEpisodesRepository: InMemoryWatchedEpisodesRepository
let sut: CreateWatchedEpisodeUseCase

describe('Create Watched Episode', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryWatchedEpisodesRepository = new InMemoryWatchedEpisodesRepository()
    sut = new CreateWatchedEpisodeUseCase(inMemoryWatchedEpisodesRepository, inMemoryEpisodesRepository)
  })

  it('should be able to create watched episode', async () => {
    const season = makeSeason()

    await inMemorySeasonsRepository.create(season)

    const episode = makeEpisode({
      seasonId: season.id,
      title: 'Titulo do episódio',
    })

    await inMemoryEpisodesRepository.create(episode)


    const result = await sut.execute({
      duration: 240,
      episodeId: episode.id.toString(),
      authorId: 'user-id'
    })
    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.watchedEpisode.episodeId).toEqual(episode.id)
    }
  })
})
