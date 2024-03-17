import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { GetNextEpisodeUseCase } from './get-next-episode'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

import { makeAnime } from 'test/factories/make-anime'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: GetNextEpisodeUseCase

describe('Get Next Episode', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new GetNextEpisodeUseCase(
      inMemoryEpisodesRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to get the next episode', async () => {
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
      currentEpisodeIndex: 1,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episode.season).toBe(1)
      expect(result.value.episode.index).toBe(2)
    }
  })

  // it('should be able to get the next episode of the next season', async () => {
  //   const anime = makeAnime()

  //   await inMemoryAnimesRepository.create(anime)

  //   await inMemoryEpisodesRepository.create(
  //     makeEpisode({
  //       animeId: anime.id,
  //       season: 1,
  //       index: 1,
  //     }),
  //   )

  //   await inMemoryEpisodesRepository.create(
  //     makeEpisode({
  //       animeId: anime.id,
  //       season: 1,
  //       index: 2,
  //     }),
  //   )

  //   await inMemoryEpisodesRepository.create(
  //     makeEpisode({
  //       animeId: anime.id,
  //       season: 2,
  //       index: 1,
  //     }),
  //   )

  //   const result = await sut.execute({
  //     animeId: anime.id.toString(),
  //     season: 1,
  //     currentEpisodeIndex: 2,
  //   })

  //   expect(result.isSuccess()).toBe(true)

  //   if (result.isSuccess()) {
  //     expect(result.value.episode.season).toBe(2)
  //     expect(result.value.episode.index).toBe(1)
  //   }
  // })

  it('should not be able to get the next episode with invalid season', async () => {
    const anime = makeAnime()

    await inMemoryAnimesRepository.create(anime)

    const episode = makeEpisode({
      animeId: anime.id,
      season: 1,
      index: 1,
    })

    await inMemoryEpisodesRepository.create(episode)

    const result = await sut.execute({
      animeId: anime.id.toString(),
      season: 0,
      currentEpisodeIndex: 1,
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
