import { CreateSeasonUseCase } from './create-season'
import { InMemorySeasonsRepository } from 'test/repositories/in-memory-seasons-repository'
import { faker } from '@faker-js/faker'
// import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

let inMemorySeasonsRepository: InMemorySeasonsRepository
let sut: CreateSeasonUseCase

describe('Create Season', () => {
  beforeEach(() => {
    inMemorySeasonsRepository = new InMemorySeasonsRepository()
    sut = new CreateSeasonUseCase(inMemorySeasonsRepository)
  })

  it('should be able to create a episode', async () => {
    const result = await sut.execute({
      title: 'Mob Psycho 100 II',
      episodes: [
        {
          title: faker.lorem.sentence(),
          description: faker.lorem.text(),
          cover: faker.image.url(),
          duration: 800,
          index: 0,
        },
      ],
    })

    expect(result.isSuccess()).toBe(true)

    // if (result.isSuccess()) {
    //   expect(result.value.episode.title).toEqual('Titulo do episódio')
    //   expect(inMemoryEpisodesRepository.items[0].id).toEqual(
    //     result.value.episode.id,
    //   )
    // }
  })
})
