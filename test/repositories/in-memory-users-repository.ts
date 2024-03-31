import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const userMemory = this.items.find((user) => id === user.id.toString())

    if (!userMemory) {
      return null
    }

    return userMemory
  }

  async create(user: User) {
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
