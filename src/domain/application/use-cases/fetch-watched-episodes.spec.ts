import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { makeSeason } from 'test/factories/make-season'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryWatchedEpisodesRepository } from 'test/repositories/in-memory-watched-episode'
import { FetchWatchedEpisodesUseCase } from './fetch-watched-episodes'
import { makeUser } from 'test/factories/make-user'
import { makeWatchedEpisode } from 'test/factories/make-watched-episode'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryWatchedEpisodesRepository: InMemoryWatchedEpisodesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: FetchWatchedEpisodesUseCase

describe('Fetch Watched Episodes', () => {
  beforeEach(() => {
    inMemoryWatchedEpisodesRepository = new InMemoryWatchedEpisodesRepository()
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(inMemoryEpisodesRepository)
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new FetchWatchedEpisodesUseCase(
      inMemoryWatchedEpisodesRepository,
      inMemoryUsersRepository,
      inMemoryEpisodesRepository
    )
  })

  it('should be able to fetch watched episodes from user', async () => {
    const season = makeSeason()
    const user = makeUser()

    await inMemoryUsersRepository.create(user)
    await inMemorySeasonsRepository.create(season)

    const episode01 = makeEpisode({
      seasonId: season.id,
      title: 'Titulo do episódio 02',
    })

    await inMemoryEpisodesRepository.create(
      episode01
    )

    const episode02 = makeEpisode({
      seasonId: season.id,
      title: 'Titulo do episódio 01',
    })
    await inMemoryEpisodesRepository.create(
      episode02
    )

    await inMemoryWatchedEpisodesRepository.create(makeWatchedEpisode({
      episodeId: episode01.id,
      authorId: user.id
    }))

    await inMemoryWatchedEpisodesRepository.create(makeWatchedEpisode({
      episodeId: episode02.id,
      authorId: user.id
    }))

    const result = await sut.execute({
      authorId: user.id.toString(),
      episodeId: episode02.id.toString()
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.watchedEpisode).toBeTruthy()
      expect(result.value.watchedEpisode.episodeId).toEqual(episode02.id)
    }
  })
})
