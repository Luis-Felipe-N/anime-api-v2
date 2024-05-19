import { prisma } from '../prisma/prisma'
import { Episode } from '@/domain/enterprise/entities/episode'
import { PaginationParams } from '@/core/types/pagination-params'
import { PrismaEpisodeMapper } from '../mapper/prisma-episode-mapper'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'
import { PrismaEpisodeDetailsMapper } from '../mapper/prisma-episode-detail-mapper'
import { WatchedEpisodesRepository } from '@/domain/application/repositories/watched-episodes'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { PrismaWatchedEpisodeMapper } from '../mapper/prisma-watched-episode-mapper'

export class PrismaWatchedEpisodesRepository implements WatchedEpisodesRepository {
    // constructor() { }

    async create(watchedEpisodes: WatchedEpisode) {
        const data = PrismaWatchedEpisodeMapper.toPrisma(watchedEpisodes)
        const watched = await prisma.watched.create({
            data,
        })

        return PrismaWatchedEpisodeMapper.toDomain(watched)
    }

    async save(watchedEpisodes: WatchedEpisode) {
        const data = PrismaWatchedEpisodeMapper.toPrisma(watchedEpisodes)

        const watched = await prisma.watched.update({
            where: {
                watchedIdentifier: {
                    userId: data.userId,
                    episodeId: data.episodeId
                }
            },
            data,
        })

        return PrismaWatchedEpisodeMapper.toDomain(watched)
    }

    async findByEpisodeAndUser(userId: string, episodeId: string): Promise<WatchedEpisode | null> {
        const watched = await prisma.watched.findUnique({
            where: {
                watchedIdentifier: {
                    userId,
                    episodeId
                }
            }

        })

        if (!watched) return null

        return PrismaWatchedEpisodeMapper.toDomain(watched)
    }
}
