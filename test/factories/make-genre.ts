import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Genre, GenreProps } from '@/domain/enterprise/entities/genre'
import { faker } from '@faker-js/faker'

export function makeGenre(
  override: Partial<GenreProps> = {},
  id?: UniqueEntityId,
) {
  const genre = Genre.create(
    {
      title: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return genre
}
