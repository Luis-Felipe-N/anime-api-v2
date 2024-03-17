import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

import { makeAnime } from 'test/factories/make-anime'
import { GetPreviousEpisodeUseCase } from './get-previous-episode'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: GetPreviousEpisodeUseCase

describe('Get Next Episode', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new GetPreviousEpisodeUseCase(
      inMemoryEpisodesRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to get episode by slug', async () => {
    const anime = makeAnime()

    await inMemoryAnimesRepository.create(anime)

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        season: 1,
        index: 1,
      }),
    )

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        season: 1,
        index: 2,
      }),
    )

    await inMemoryEpisodesRepository.create(
      makeEpisode({
        animeId: anime.id,
        season: 2,
        index: 1,
      }),
    )

    const result = await sut.execute({
      animeId: anime.id.toString(),
      season: 1,
      currentEpisodeIndex: 2,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episode.season).toBe(1)
      expect(result.value.episode.index).toBe(1)
    }
  })
})
