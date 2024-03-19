import { makeSeason } from 'test/factories/make-season'
import { CreateAnimeUseCase } from './create-anime'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: CreateAnimeUseCase

describe('Create Anime', () => {
  beforeEach(() => {
    inMemorySeasonsRepository = new InMemorySeasonsRepository()
    inMemoryAnimesRepository = new InMemoryAnimesRepository(
      inMemorySeasonsRepository,
    )
    sut = new CreateAnimeUseCase(inMemoryAnimesRepository)
  })

  it('should be able to create an anime', async () => {
    const result = await sut.execute({
      banner: 'banner-link',
      cover: 'cover-link',
      description: 'Descrição do anime',
      title: 'Jujutsu',
      seasons: [],
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
      seasons: [season],
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
})
