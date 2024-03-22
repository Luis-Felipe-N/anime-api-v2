import { makeSeason } from 'test/factories/make-season'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { UploadAnimeBySlugUseCase } from '@/domain/application/use-cases/upload-anime-by-slug'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: UploadAnimeBySlugUseCase

describe('Upload Anime By Slug', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemorySeasonsRepository = new InMemorySeasonsRepository(
      inMemoryEpisodesRepository,
    )
    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
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
    // if (result.isSuccess()) {
    //   expect(result.value.anime.title).toEqual('Jujutsu')
    //   expect(inMemoryAnimesRepository.items[0].id).toEqual(
    //     result.value.anime.id,
    //   )
    // }
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
