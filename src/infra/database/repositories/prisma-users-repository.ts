import { UsersRepository } from 'src/domain/application/repositories/users-repository'
import { prisma } from '../prisma/prisma'
import { PrismaUserMapper } from '../mapper/prisma-user-mapper'
import { User } from 'src/domain/enterprise/entities/user'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User) {
    const data = PrismaUserMapper.toPrisma(user)
    const userPrisma = await prisma.user.create({
      data,
    })

    return PrismaUserMapper.toDomain(userPrisma)
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
