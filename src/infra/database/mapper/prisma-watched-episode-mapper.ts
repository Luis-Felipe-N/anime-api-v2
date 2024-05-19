import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'

// import { User } from '@/domain/enterprise/entities/user'
import { Prisma, Watched as PrismaWatched } from '@prisma/client'

export class PrismaWatchedEpisodeMapper {
    static toDomain(raw: PrismaWatched): WatchedEpisode {
        return WatchedEpisode.create(
            {
                episodeId: new UniqueEntityId(raw.episodeId),
                userId: new UniqueEntityId(raw.userId),
                stopAt: raw.stopAt,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityId(raw.id),
        )
    }

    static toPrisma(raw: WatchedEpisode): Prisma.WatchedUncheckedCreateInput {
        return {
            id: raw.id.toString(),
            stopAt: raw.stopAt,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            episodeId: raw.episodeId.toString(),
            userId: raw.userId.toString()
        }
    }
}
