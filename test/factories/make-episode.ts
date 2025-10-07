import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Episode, EpisodeProps } from 'src/domain/enterprise/entities/episode'
import { PrismaEpisodeMapper } from 'src/infra/database/mapper/prisma-episode-mapper'
import { prisma } from 'src/infra/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export function makeEpisode(
  override: Partial<EpisodeProps> = {},
  id?: UniqueEntityId,
) {
  const episode = Episode.create(
    {
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      cover: faker.image.url(),
      duration: 800,
      index: 0,
      type: 'ANIMESONLINE',
      video: faker.internet.url(),
      seasonId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return episode
}

export async function makePrismaEpisode(
  data: Partial<EpisodeProps> = {},
): Promise<Episode> {
  const episode = makeEpisode(data)

  await prisma.episode.create({ data: PrismaEpisodeMapper.toPrisma(episode) })

  return episode
}
