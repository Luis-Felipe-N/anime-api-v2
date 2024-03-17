import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { GetAnimeBySlugUseCase } from './get-anime-by-slug'
import { makeAnime } from 'test/factories/make-anime'
import { Slug } from '@/core/values-objects/slug'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: GetAnimeBySlugUseCase

describe('Get Anime by slug', () => {
  beforeEach(() => {
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new GetAnimeBySlugUseCase(inMemoryAnimesRepository)
  })

  it('should be able to get anime by slug', async () => {
    const animeCreated = makeAnime({
      slug: Slug.create('titulo-do-anime'),
    })

    inMemoryAnimesRepository.create(animeCreated)

    const { anime } = await sut.execute({
      slug: 'titulo-do-anime',
    })

    expect(animeCreated.id.toValue()).toEqual(anime.id.toValue())
  })

  it('should not be able to get anime with non-exists slug', async () => {
    await expect(
      sut.execute({
        slug: 'non-exists-slug',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
