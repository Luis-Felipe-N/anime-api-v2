import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { WatchedEpisode, WatchedEpisodeProps } from 'src/domain/enterprise/entities/watched-episode'
import { PrismaWatchedEpisodeMapper } from 'src/infra/database/mapper/prisma-watched-episode-mapper'
import { prisma } from 'src/infra/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export function makeWatchedEpisode(
  override: Partial<WatchedEpisodeProps> = {},
  id?: UniqueEntityId,
) {
  const watchedEpisode = WatchedEpisode.create(
    {
      authorId: new UniqueEntityId(),
      episodeId: new UniqueEntityId(),
      stopAt: faker.number.float(),
      ...override,
    },
    id,
  )

  return watchedEpisode
}

export async function makePrismaWatchedEpisode(
  data: Partial<WatchedEpisodeProps> = {},
): Promise<WatchedEpisode> {
  const watchedEpisode = makeWatchedEpisode(data)

  await prisma.watched.create({ data: PrismaWatchedEpisodeMapper.toPrisma(watchedEpisode) })

  return watchedEpisode
}
