import { InMemoryRatingsRepository } from 'test/repositories/in-memory-ratings-repository'
import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { RateAnimeUseCase } from './rate-anime'
import { makeAnime } from 'test/factories/make-anime'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { InMemoryGenresRepository } from 'test/repositories/in-memory-genres-repository'


let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let inMemorySeasonRepository: InMemorySeasonsRepository
let inMemoryGenreRepository: InMemoryGenresRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: RateAnimeUseCase 

describe('Rate Anime Use Case', () => {
  beforeEach(() => {
    inMemoryRatingsRepository = new InMemoryRatingsRepository()
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryGenreRepository = new InMemoryGenresRepository()
    inMemorySeasonRepository = new InMemorySeasonsRepository(inMemoryEpisodesRepository)
    inMemoryAnimesRepository = new InMemoryAnimesRepository(inMemorySeasonRepository, inMemoryGenreRepository)
    sut = new RateAnimeUseCase(
      inMemoryRatingsRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to rate an anime', async () => {
    const user = makeUser({}, new UniqueEntityId('user-01'))
    const anime = makeAnime({}, new UniqueEntityId('anime-01'))

    // Adiciona o anime ao repositório em memória para que o caso de uso o encontre
    inMemoryAnimesRepository.items.push(anime)

    const result = await sut.execute({
      userId: user.id.toString(),
      animeId: anime.id.toString(),
      rating: 5,
      review: 'O melhor anime de todos!',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryRatingsRepository.items).toHaveLength(1)
    expect(inMemoryRatingsRepository.items[0]).toMatchObject({
      rating: 5,
      review: 'O melhor anime de todos!',
      userId: user.id,
      animeId: anime.id,
    })
  })

  it('should be able to update an existing rating', async () => {
    const user = makeUser({}, new UniqueEntityId('user-01'))
    const anime = makeAnime({}, new UniqueEntityId('anime-01'))

    inMemoryAnimesRepository.items.push(anime)

    // O usuário primeiro avalia o anime
    await sut.execute({
      userId: user.id.toString(),
      animeId: anime.id.toString(),
      rating: 3,
      review: 'É bom.',
    })

    // Em seguida, o mesmo usuário atualiza a avaliação
    const result = await sut.execute({
      userId: user.id.toString(),
      animeId: anime.id.toString(),
      rating: 5,
      review: 'Mudei de ideia, é incrível!',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryRatingsRepository.items).toHaveLength(1) // Não deve criar um novo
    expect(inMemoryRatingsRepository.items[0]).toMatchObject({
      rating: 5,
      review: 'Mudei de ideia, é incrível!',
    })
  })
})