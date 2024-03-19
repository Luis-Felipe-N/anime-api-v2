import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'

import { GetPreviousEpisodeUseCase } from './get-previous-episode'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { makeSeason } from 'test/factories/make-season'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: GetPreviousEpisodeUseCase

describe('Get Next Episode', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository()

    sut = new GetPreviousEpisodeUseCase(
      inMemoryEpisodesRepository,
      inMemorySeasonsRepository,
    )
  })

  it('should be able to get the previous episode', async () => {
    const season = makeSeason()
    const season2 = makeSeason()

    await inMemorySeasonsRepository.create(season)
    await inMemorySeasonsRepository.create(season2)

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        seasonId: season.id,
        index: 1,
      }),
    )

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        seasonId: season.id,
        index: 2,
      }),
    )

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        seasonId: season2.id,
        index: 1,
      }),
    )

    const result = await sut.execute({
      seasonId: season.id.toString(),
      currentEpisodeIndex: 2,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episode.seasonId).toBe(season.id)
      expect(result.value.episode.index).toBe(1)
    }
  })
})
