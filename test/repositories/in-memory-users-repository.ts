import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const userMemory = this.items.find((user) => id === user.id)

    if (!userMemory) {
      return null
    }

    return userMemory
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const userMemory = this.items.find((user) => email === user.email)

    if (!userMemory) {
      return null
    }

    return userMemory
  }
}
