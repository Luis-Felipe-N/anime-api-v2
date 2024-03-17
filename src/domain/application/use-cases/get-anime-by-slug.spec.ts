import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { GetAnimeBySlugUseCase } from './get-anime-by-slug'
import { Anime } from '@/domain/enterprise/entities/Anime'
// import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: GetAnimeBySlugUseCase

describe('Get Anime by slug', () => {
  beforeEach(() => {
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new GetAnimeBySlugUseCase(inMemoryAnimesRepository)
  })

  it('should be able to get anime by slug', async () => {
    const animeCreated = Anime.create({
      banner: 'banner-link',
      cover: 'cover-link',
      description: 'Descrição do anime',
      title: 'Jujutsu',
    })

    inMemoryAnimesRepository.create(animeCreated)

    const { anime } = await sut.execute({
      slug: 'jujutsu',
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
