import { beforeEach, describe, expect, it } from 'vitest'

import { GetUserProfileUseCase } from './get-user-profile.usecase'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const user = makeUser({
      name: 'Teste da Silva',

      email: 'testedasilva@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const createdUser = await usersRepository.create(user)

    const result = await sut.execute({ userId: createdUser.id.toString() })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.user.name).toBe('Teste da Silva')
    }
  })

  it('should not be able to get user profile with wrong id', async () => {
    const result = await sut.execute({ userId: 'non-exists-id' })

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
