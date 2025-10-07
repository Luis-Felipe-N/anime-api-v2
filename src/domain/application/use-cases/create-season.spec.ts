import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CreateSeasonUseCase } from './create-season'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { makeEpisode } from 'test/factories/make-episode'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeAnime } from 'test/factories/make-anime'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'

let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let sut: CreateSeasonUseCase

describe('Create Season', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryGenresRepository = new InMemoryGenresRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
      inMemoryGenresRepository,
    )
    sut = new CreateSeasonUseCase(
      inMemorySeasonsRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to create a season', async () => {
    const episode = makeEpisode({}, new UniqueEntityId('episode-01'))
    const anime = makeAnime()

    await inMemoryAnimesRepository.create(anime)

    const result = await sut.execute({
      title: 'Mob Psycho 100 II',
      animeId: anime.id.toString(),
      episodes: [episode],
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.season.title).toEqual('Mob Psycho 100 II')
      expect(inMemorySeasonsRepository.items[0].id).toEqual(
        result.value.season.id,
      )
    }
  })

  it('should be able to create a season with episodes', async () => {
    const episode = makeEpisode({}, new UniqueEntityId('episode-01'))
    const anime = makeAnime()

    await inMemoryAnimesRepository.create(anime)

    const result = await sut.execute({
      title: 'Mob Psycho 100 II',
      animeId: anime.id.toString(),
      episodes: [episode],
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.season.title).toEqual('Mob Psycho 100 II')
      expect(inMemoryEpisodesRepository.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: new UniqueEntityId('episode-01'),
          }),
        ]),
      )
    }
  })
})
