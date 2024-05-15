import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryCommentsRepository } from 'test/repositories/in-memory-comments-repository'
import { DeleteCommentUseCase } from './delete-comment'
import { makeComment } from 'test/factories/make-comment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryCommentsRepository: InMemoryCommentsRepository
let sut: DeleteCommentUseCase

describe('Delete Comment', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryCommentsRepository()
    sut = new DeleteCommentUseCase(inMemoryCommentsRepository)
  })

  it('should be able to delete a comment', async () => {
    const comment = makeComment(
      {
        authorId: new UniqueEntityId('user-id'),
      },
      new UniqueEntityId('comment-id'),
    )

    await inMemoryCommentsRepository.create(comment)

    const result = await sut.execute({
      id: 'comment-id',
      userId: 'user-id',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(inMemoryCommentsRepository.items).toHaveLength(0)
    }
  })

  it('should not be able to delete a non-existent comment', async () => {
    const comment = makeComment(
      {
        authorId: new UniqueEntityId('user-id'),
      },
      new UniqueEntityId('comment-id'),
    )

    await inMemoryCommentsRepository.create(comment)

    const result = await sut.execute({
      id: 'comment-id-02',
      userId: 'user-id',
    })

    expect(result.isFailure()).toBe(true)

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a comment from another author', async () => {
    const comment = makeComment(
      {
        authorId: new UniqueEntityId('author-id-01'),
      },
      new UniqueEntityId('comment-id'),
    )

    await inMemoryCommentsRepository.create(comment)

    const result = await sut.execute({
      id: 'comment-id',
      userId: 'author-id-02',
    })

    expect(result.isFailure()).toBe(true)

    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
