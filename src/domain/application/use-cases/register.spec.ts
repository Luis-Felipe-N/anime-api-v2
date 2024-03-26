import { beforeEach, expect, it, describe } from 'vitest'

import { RegisterUseCase } from './register.usecase'
import { InMemoryUsersRepository } from '@/repositories/memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    const passwordUserIsHashed = await compare('123456', user.password_hash)

    return expect(passwordUserIsHashed).toBe(true)
  })

  it('Should not be able to register with email twice', async () => {
    await sut.execute({
      name: 'Teste da Silva',
      email: 'testedasilva01@gmail.com',
      password: '123456',
    })

    expect(
      sut.execute({
        name: 'Teste da Silva',
        email: 'testedasilva01@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
