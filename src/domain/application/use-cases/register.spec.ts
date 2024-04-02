import { beforeEach, expect, it, describe } from 'vitest'

import { RegisterUseCase } from './register'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register', async () => {
    const result = await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      expect(result.value.user.id).toEqual(expect.any(UniqueEntityId))
    }
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const passwordUserIsHashed = await compare(
        '123456',
        result.value.user.password_hash,
      )

      return expect(passwordUserIsHashed).toBe(true)
    }
  })

  it('Should not be able to register with email twice', async () => {
    await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    const result = await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
