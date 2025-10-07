import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

import { User } from 'src/domain/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        role: raw.role,
        email: raw.email,
        name: raw.name,
        password_hash: raw.password_hash,
        avatar: raw.avatar,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: User): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      role: raw.role,
      email: raw.email,
      name: raw.name,
      password_hash: raw.password_hash,
      avatar: raw.avatar,
    }
  }
}
