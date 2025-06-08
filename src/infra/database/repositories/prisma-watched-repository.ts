import { prisma } from '../prisma/prisma'
import { Episode } from '@/domain/enterprise/entities/episode'
import { PaginationParams } from '@/core/types/pagination-params'
import { PrismaEpisodeMapper } from '../mapper/prisma-episode-mapper'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'
import { PrismaEpisodeDetailsMapper } from '../mapper/prisma-episode-detail-mapper'
import { WatchedEpisodesRepository } from '@/domain/application/repositories/watched-episodes'
import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'
import { PrismaWatchedEpisodeMapper } from '../mapper/prisma-watched-episode-mapper'
import { PrismaWatchedEpisodeDetailsMapper } from '../mapper/prisma-watched-episode-detail-mapper'

export class PrismaWatchedEpisodesRepository implements WatchedEpisodesRepository {

    async create(watchedEpisodes: WatchedEpisode) {
        const data = PrismaWatchedEpisodeMapper.toPrisma(watchedEpisodes)
        const watched = await prisma.watched.create({
            data,
            include: {
                author: true,
                episode: true
            },
        })

        return PrismaWatchedEpisodeDetailsMapper.toDomain(watched)
    }

    async save(watchedEpisodes: WatchedEpisode) {
        const data = PrismaWatchedEpisodeMapper.toPrisma(watchedEpisodes)

        const watched = await prisma.watched.update({
            where: {
                watchedIdentifier: {
                    authorId: data.authorId,
                    episodeId: data.episodeId
                }
            },
            include: {
                author: true,
                episode: true
            },
            data,
        })


        return PrismaWatchedEpisodeDetailsMapper.toDomain(watched)
    }

    async findByEpisodeAndUser(authorId: string, episodeId: string): Promise<WatchedEpisode | null> {
        const watched = await prisma.watched.findUnique({
            where: {
                watchedIdentifier: {
                    authorId,
                    episodeId
                }
            },
            include: {
                author: true,
                episode: true
            }
        })

        if (!watched) return null

        return PrismaWatchedEpisodeDetailsMapper.toDomain(watched)
    }

    findManyByUserId(authorId: string, params: PaginationParams): Promise<WatchedEpisode[]> {
        
    }
}
