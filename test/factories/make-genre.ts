import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Genre, GenreProps } from 'src/domain/enterprise/entities/genre'
import { PrismaGenreMapper } from 'src/infra/database/mapper/prisma-genre-mapper'
import { prisma } from 'src/infra/database/prisma/prisma'
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
