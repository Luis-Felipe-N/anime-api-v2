import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile.usecase'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Teste da Silva',
      email: 'testedasilva@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.name).toBe('Teste da Silva')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({ userId: 'non-exists-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
