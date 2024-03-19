import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeSeason } from 'test/factories/make-season'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { FetchEpisodeBySeasonUseCase } from './fetch-episodes-by-season'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: FetchEpisodeBySeasonUseCase

describe('Fetch Episodes by Season', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository()

    sut = new FetchEpisodeBySeasonUseCase(
      inMemoryEpisodesRepository,
      inMemorySeasonsRepository,
    )
  })

  it('should be able to fetch episodes of a season', async () => {
    const season = makeSeason()

    await inMemorySeasonsRepository.create(season)

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        seasonId: season.id,
        title: 'Titulo do episódio 01',
      }),
    )

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        seasonId: season.id,
        title: 'Titulo do episódio 02',
      }),
    )

    const result = await sut.execute({
      seasonId: season.id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episodes).toHaveLength(2)
      expect(result.value.episodes).toEqual([
        expect.objectContaining({
          seasonId: season.id,
          title: 'Titulo do episódio 01',
        }),
        expect.objectContaining({
          seasonId: season.id,
          title: 'Titulo do episódio 02',
        }),
      ])
    }
  })

  it('should not be able to fetch episodes of a non-existent season', async () => {
    const result = await sut.execute({
      seasonId: 'non-existent-season',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
