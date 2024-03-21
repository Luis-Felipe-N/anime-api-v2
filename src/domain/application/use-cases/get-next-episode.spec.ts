import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { GetNextEpisodeUseCase } from './get-next-episode'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeSeason } from 'test/factories/make-season'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: GetNextEpisodeUseCase

describe('Get Next Episode', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )

    sut = new GetNextEpisodeUseCase(
      inMemoryEpisodesRepository,
      inMemorySeasonsRepository,
    )
  })

  it('should be able to get the next episode', async () => {
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
      currentEpisodeIndex: 1,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episode.seasonId).toBe(season.id)
      expect(result.value.episode.index).toBe(2)
    }
  })

  // it('should be able to get the next episode of the next season', async () => {
  //   const season = makeSeason()
  //   const season2 = makeSeason()

  //   await inMemorySeasonsRepository.create(season)

  //   await inMemoryEpisodesRepository.create(
  //     makeEpisode({
  //       seasonId: season.id,
  //       index: 1,
  //     }),
  //   )

  //   await inMemoryEpisodesRepository.create(
  //     makeEpisode({
  //       seasonId: season.id,
  //       index: 2,
  //     }),
  //   )

  //   await inMemoryEpisodesRepository.create(
  //     makeEpisode({
  //       seasonId: season2.id,
  //       index: 1,
  //     }),
  //   )

  //   const result = await sut.execute({
  //     seasonId: season.id.toString(),
  //     currentEpisodeIndex: 2,
  //   })

  //   expect(result.isSuccess()).toBe(true)

  //   if (result.isSuccess()) {
  //     expect(result.value.episode.seasonId).toBe(season2.id)
  //     expect(result.value.episode.index).toBe(1)
  //   }
  // })

  it('should not be able to get the next episode with invalid season', async () => {
    const season = makeSeason()

    await inMemorySeasonsRepository.create(season)

    const episode = makeEpisode({
      seasonId: season.id,
      index: 1,
    })

    await inMemoryEpisodesRepository.create(episode)

    const result = await sut.execute({
      seasonId: 's',
      currentEpisodeIndex: 1,
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
