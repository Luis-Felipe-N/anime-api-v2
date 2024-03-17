import { FetchCommentsByEpisodeUseCase } from './fetch-comments-by-episode'
import { InMemoryCommentsRepository } from 'test/repositories/in-memory-comments-repository'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeComment } from 'test/factories/make-comment'
import { makeEpisode } from 'test/factories/make-episode'

let inMemoryCommentsRepository: InMemoryCommentsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: FetchCommentsByEpisodeUseCase

describe('Fetch Episodes by Anime', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryCommentsRepository()
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()

    sut = new FetchCommentsByEpisodeUseCase(
      inMemoryCommentsRepository,
      inMemoryEpisodesRepository,
    )
  })

  it('should be able to fetch comments of an episode', async () => {
    const episode = makeEpisode()

    inMemoryCommentsRepository.create(
      makeComment({
        episodeId: episode.id,
        content: 'Conteúdo do comentário',
      }),
    )

    const { comments } = await sut.execute({
      episodeId: episode.id.toString(),
      page: 1,
    })

    expect(comments).toHaveLength(1)
    expect(comments).toEqual([
      expect.objectContaining({
        episodeId: episode.id,
        content: 'Conteúdo do comentário',
      }),
    ])
  })

  // it('should not be able to fetch comments of an non-existent episode', async () => {
  //   expect(
  //     await sut.execute({
  //       episodeId: 'episode-id-02',
  //       page: 1,
  //     }),
  //   ).rejects.toBeInstanceOf(Error)
  // })
})
