import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { makeSeason } from 'test/factories/make-season'
import { CreateAnimeUseCase } from './create-anime'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeGenre } from 'test/factories/make-genre'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: CreateAnimeUseCase

describe('Create Anime', () => {
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
    sut = new CreateAnimeUseCase(inMemoryAnimesRepository)
  })

  it('should be able to create an anime', async () => {
    const result = await sut.execute({
      banner: 'banner-link',
      cover: 'cover-link',
      description: 'Descrição do anime',
      title: 'Jujutsu',
      nsfw: false,
      seasons: [],
      genres: [],
    })
    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.anime.title).toEqual('Jujutsu')
      expect(inMemoryAnimesRepository.items[0].id).toEqual(
        result.value.anime.id,
      )
    }
  })

  it('should be able to create an anime with seasons', async () => {
    const season = makeSeason({}, new UniqueEntityId('temp-01'))

    const result = await sut.execute({
      title: 'Jujutsu',
      banner: 'banner-link',
      cover: 'cover-link',
      description: 'Descrição do anime',
      nsfw: false,
      seasons: [season],
      genres: [],
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.anime.slug.value).toEqual('jujutsu')
      expect(inMemorySeasonsRepository.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: new UniqueEntityId('temp-01'),
          }),
        ]),
      )
    }
  })

  it('should be able to create an anime with genres', async () => {
    const genre = makeGenre({}, new UniqueEntityId('genero-acao'))

    const result = await sut.execute({
      title: 'Jujutsu',
      banner: 'banner-link',
      cover: 'cover-link',
      description: 'Descrição do anime',
      nsfw: false,
      seasons: [],
      genres: [genre],
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.anime.slug.value).toEqual('jujutsu')
      expect(inMemoryGenresRepository.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: new UniqueEntityId('genero-acao'),
          }),
        ]),
      )
    }
  })
})
