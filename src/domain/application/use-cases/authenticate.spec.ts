import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.usecase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Teste da Silva',
      email: 'testedasilva@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'testedasilva@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should no be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'testedasilva@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should no be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Teste da Silva',
      email: 'testedasilva@gmail.com',
      password_hash: await hash('123321', 6),
    })

    await expect(
      sut.execute({
        email: 'testedasilva@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
