import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/enterprise/entities/user'
import { PrismaUserMapper } from '@/infra/database/mapper/prisma-user-mapper'

import { prisma } from '@/infra/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      avatar: faker.image.avatar(),
      role: 'USER',
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password_hash: faker.word.sample(),
      ...override,
    },
    id,
  )

  return user
}

export async function makePrismaUser(
  data: Partial<UserProps> = {},
): Promise<User> {
  const user = makeUser(data)

  await prisma.user.create({ data: PrismaUserMapper.toPrisma(user) })

  return user
}
