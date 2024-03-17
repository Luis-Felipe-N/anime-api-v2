import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Anime, AnimeProps } from '@/domain/enterprise/entities/Anime'
import { faker } from '@faker-js/faker'

export function makeAnime(
  override: Partial<AnimeProps> = {},
  id?: UniqueEntityId,
) {
  const anime = Anime.create(
    {
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      banner: faker.image.url(),
      cover: faker.image.url(),
      ...override,
    },
    id,
  )

  return anime
}
