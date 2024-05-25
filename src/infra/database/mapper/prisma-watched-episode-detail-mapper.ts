import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Prisma, Watched as PrismaWatchedEpisode, User as PrimaUser, Episode as PrismaEpisode } from '@prisma/client'
import { PrismaUserMapper } from './prisma-user-mapper'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { PrismaEpisodeMapper } from './prisma-episode-mapper'

type PrismaWatchedEpisodeDetails = PrismaWatchedEpisode & {
  author: PrimaUser | null
  episode: PrismaEpisode | null
}

export class PrismaWatchedEpisodeDetailsMapper {
  static toDomain(raw: PrismaWatchedEpisodeDetails): WatchedEpisode {

    return WatchedEpisode.create(
      {
        stopAt: raw.stopAt,
        authorId: new UniqueEntityId(raw.authorId),
        episodeId: new UniqueEntityId(raw.episodeId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        author: raw.author ? PrismaUserMapper.toDomain(raw.author) : null,
        episode: raw.episode ? PrismaEpisodeMapper.toDomain(raw.episode) : null,
      },
      new UniqueEntityId(raw.id),
    )
  }
}
