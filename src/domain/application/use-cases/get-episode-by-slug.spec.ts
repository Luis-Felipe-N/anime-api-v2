import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { GetEpisodeBySlugUseCase } from './get-episode-by-slug'
import { Episode } from '@/domain/enterprise/entities/Episode'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: GetEpisodeBySlugUseCase

describe('Get Episode by slug', () => {
  beforeEach(() => {
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
    sut = new GetEpisodeBySlugUseCase(inMemoryEpisodesRepository)
  })

  it('should be able to get episode by slug', async () => {
    const newEpisode = Episode.create({
      animeId: new UniqueEntityId(),
      title: 'Titulo do episódio',
      slug: Slug.create('titulo-do-episodio'),
      description: 'Descrição do episódio',
      cover: 'episode-cover-link',
      duration: 800,
      index: 0,
      season: 1,
    })

    inMemoryEpisodesRepository.create(newEpisode)

    const { episode } = await sut.execute({
      slug: 'titulo-do-episodio',
    })

    expect(newEpisode.id.toValue()).toEqual(episode.id.toValue())
  })

  it('should not be able to get episode with non-exists slug', async () => {
    await expect(
      sut.execute({
        slug: 'non-exists-slug',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
