import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Anime, AnimeProps } from 'src/domain/enterprise/entities/anime'
import { PrismaAnimeMapper } from 'src/infra/database/mapper/prisma-anime-mapper'
import { prisma } from 'src/infra/database/prisma/prisma'
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
      nsfw: false,
      trailerYtId: faker.internet.url(),
      rating: 9,
      ...override,
    },
    id,
  )

  return anime
}

export async function makePrismaAnime(
  data: Partial<AnimeProps> = {},
): Promise<Anime> {
  const anime = makeAnime(data)

  await prisma.anime.create({ data: PrismaAnimeMapper.toPrisma(anime) })

  return anime
}
