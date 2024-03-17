import { CreateEpisodeUseCase } from './create-episode'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
// import { InMemoryAnimesRepository } from 'test/repositories/in-memory-animes-repository'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: CreateEpisodeUseCase

describe('Create Anime', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    sut = new CreateEpisodeUseCase(inMemoryEpisodesRepository)
  })

  it('should be able to create a episode', async () => {
    const { episode } = await sut.execute({
      animeId: '1',
      title: 'Titulo do episódio',
      description: 'Descrição do episódio',
      cover: 'episode-cover-link',
      duration: 800,
      index: 0,
    })

    expect(episode.title).toEqual('Titulo do episódio')
    expect(inMemoryEpisodesRepository.items[0].id).toEqual(episode.id)
  })
})
