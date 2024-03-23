import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Anime, AnimeProps } from '@/domain/enterprise/entities/anime'
import { PrismaAnimeMapper } from '@/infra/database/mapper/prisma-anime-mapper'
import { prisma } from '@/infra/database/prisma/prisma'
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
