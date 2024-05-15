import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { UploadAnimeBySlugUseCase } from '@/domain/application/use-cases/upload-anime-by-slug'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let inMemoryGenresRepository: InMemoryGenresRepository
let sut: UploadAnimeBySlugUseCase

describe('Upload Anime By Slug', () => {
  beforeEach(() => {
    inMemoryGenresRepository = new InMemoryGenresRepository()

    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
      inMemoryGenresRepository,
    )
    sut = new UploadAnimeBySlugUseCase(inMemoryAnimesRepository)
  })

  it('should be able to upload an anime by slug', async () => {
    const result = await sut.execute({
      slug: 'castlevania',
    })

    expect(result.isSuccess())

    if (result.isSuccess()) {
      expect(result.value.anime.title).toBe('Castlevania')
    }
  })

  // it('should be able to create an anime with seasons', async () => {
  //   const season = makeSeason({}, new UniqueEntityId('temp-01'))

  //   const result = await sut.execute({
  //     title: 'Jujutsu',
  //     banner: 'banner-link',
  //     cover: 'cover-link',
  //     description: 'Descrição do anime',
  //     nsfw: false,
  //     seasons: [season],
  //   })

  //   expect(result.isSuccess()).toBe(true)

  //   if (result.isSuccess()) {
  //     expect(result.value.anime.slug.value).toEqual('jujutsu')
  //     expect(inMemorySeasonsRepository.items).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           id: new UniqueEntityId('temp-01'),
  //         }),
  //       ]),
  //     )
  //   }
  // })
})
