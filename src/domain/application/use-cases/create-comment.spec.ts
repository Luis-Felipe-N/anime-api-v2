import { InMemoryCommentsRepository } from 'test/repositories/in-memory-comments-repository'
import { CreateCommentUseCase } from './create-comment'
import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { makeEpisode } from 'test/factories/make-episode'

let inMemoryCommentsRepository: InMemoryCommentsRepository
let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: CreateCommentUseCase

describe('Create comment', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryCommentsRepository()
    inMemoryEpisodesRepository = new InMemoryEpisodesRepository()

    sut = new CreateCommentUseCase(
      inMemoryCommentsRepository,
      inMemoryEpisodesRepository,
    )
  })

  it('should be able to create a comment', async () => {
    const episode = makeEpisode()

    inMemoryEpisodesRepository.create(episode)

    const result = await sut.execute({
      authorId: '1',
      episodeId: episode.id.toValue(),
      content: 'Conteúdo do comentário',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.comment.content).toEqual('Conteúdo do comentário')
      expect(inMemoryCommentsRepository.items[0].id).toEqual(
        result.value.comment.id,
      )
    }
  })
})
