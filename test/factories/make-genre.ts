import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Genre, GenreProps } from '@/domain/enterprise/entities/genre'
import { PrismaGenreMapper } from '@/infra/database/mapper/prisma-genre-mapper'
import { prisma } from '@/infra/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export function makeGenre(
  override: Partial<GenreProps> = {},
  id?: UniqueEntityId,
) {
  const genre = Genre.create(
    {
      title: faker.lorem.sentence(),
      animeId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return genre
}

export async function makePrismaGenre(
  data: Partial<GenreProps> = {},
): Promise<Genre> {
  const genre = makeGenre(data)

  await prisma.genre.create({ data: PrismaGenreMapper.toPrisma(genre) })

  return genre
}
