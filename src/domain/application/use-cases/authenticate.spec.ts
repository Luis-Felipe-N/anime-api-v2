import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.usecase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const user = makeUser({
      email: 'testedasilva@gmail.com',
      password_hash: await hash('123456', 6),
    })
    await usersRepository.create(user)

    const result = await sut.execute({
      email: 'testedasilva@gmail.com',
      password: '123456',
    })
    console.log(result)

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.user.id).toEqual(expect.any(UniqueEntityId))
    }
  })

  // it('should no be able to authenticate with wrong email', async () => {
  //   await expect(
  //     sut.execute({
  //       email: 'testedasilva@gmail.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(InvalidCredentialsError)
  // })

  it('should no be able to authenticate with wrong password', async () => {
    const user = makeUser({
      email: 'testedasilva@gmail.com',
    })

    await usersRepository.create(user)

    const result = await sut.execute({
      email: 'testedasilva@gmail.com',
      password: '123456',
    })

    expect(result.isFailure()).toBe(true)

    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
