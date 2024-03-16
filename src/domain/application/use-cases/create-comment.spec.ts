import { InMemoryCommentsRepository } from 'test/repositories/in-memory-comments-repository'
import { CreateCommentUseCase } from './create-comment'

let inMemoryCommentsRepository: InMemoryCommentsRepository
let sut: CreateCommentUseCase

describe('Create comment', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryCommentsRepository()
    sut = new CreateCommentUseCase(inMemoryCommentsRepository)
  })

  it('should be able to create a comment', async () => {
    const { comment } = await sut.execute({
      authorId: '1',
      episodeId: '1',
      content: 'Conteúdo do comentário',
    })

    expect(comment.content).toEqual('Conteúdo do comentário')
    expect(inMemoryCommentsRepository.items[0].id).toEqual(comment.id)
  })
})
