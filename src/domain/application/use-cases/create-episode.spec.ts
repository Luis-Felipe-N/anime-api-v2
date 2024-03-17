import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'
import { CreateEpisodeUseCase } from './create-episode'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeAnime } from 'test/factories/make-anime'
// import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let inMemoryAnimesRepository: InMemoryAnimesRepository
let sut: CreateEpisodeUseCase

describe('Create Anime', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    inMemoryAnimesRepository = new InMemoryAnimesRepository()
    sut = new CreateEpisodeUseCase(
      inMemoryEpisodesRepository,
      inMemoryAnimesRepository,
    )
  })

  it('should be able to create a episode', async () => {
    const anime = makeAnime()

    inMemoryAnimesRepository.create(anime)

    const result = await sut.execute({
      animeId: anime.id.toValue(),
      title: 'Titulo do episódio',
      description: 'Descrição do episódio',
      cover: 'episode-cover-link',
      duration: 800,
      index: 0,
      season: 1,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.episode.title).toEqual('Titulo do episódio')
      expect(inMemoryEpisodesRepository.items[0].id).toEqual(
        result.value.episode.id,
      )
    }
  })
})
