// @ts-ignore

import { WatchlistsRepository } from '@/domain/application/repositories/watchlist'
import { prisma } from '../prisma/prisma'
import { Watchlist } from '@/domain/enterprise/entities/watchlist'
import { PrismaWatchlistMapper } from '../mapper/prisma-watchlist-mapper'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PrismaWatchlistDetailMapper } from '../mapper/prisma-watchlist-detail-mapper'
import { WatchlistAnimesRepository } from '@/domain/application/repositories/question-animes.repository'

export class PrismaWatchlistsRepository implements WatchlistsRepository {
    constructor(private watchlistAnimesRepository: WatchlistAnimesRepository) { }
    async findById(id: string) {
        const watchlist = await prisma.watchlist.findUnique({
            where: {
                id,
            },
        })

        if (!watchlist) {
            return null
        }

        return PrismaWatchlistMapper.toDomain(watchlist)
    }

    async create(watchlist: Watchlist) {
        const data = PrismaWatchlistMapper.toPrisma(watchlist)

        const watchlistPrisma = await prisma.watchlist.create({
            data
        })

        await this.watchlistAnimesRepository.createMany(watchlist.animes.getItems())

        return PrismaWatchlistMapper.toDomain(watchlistPrisma)
    }

    async findByUserId(userId: string) {
        const watchlist = await prisma.watchlist.findUnique({
            where: {
                userId,
            },
            include: { animes: true },
        })

        if (!watchlist) {
            return null
        }

        return PrismaWatchlistMapper.toDomain(watchlist)
    }

    async findByUserIdOrCreate(userId: string) {

        const watchlist = await prisma.watchlist.findUnique({
            where: {
                userId,
            },
            include: {
                animes: true,
            },
        })

        if (!watchlist) {
            const watchlist = await this.create(
                Watchlist.create({
                    userId: new UniqueEntityId(userId),

                }),
            )
            return watchlist
        }

        console.log("EEEEEEEEEEEEE", watchlist)

        return PrismaWatchlistMapper.toDomain(watchlist)
    }

    async save(watchlist: Watchlist) {
        const data = PrismaWatchlistMapper.toPrisma(watchlist)
        console.log(data, data.animes)
        const watchlistPrisma = await prisma.watchlist.update({
            where: {
                id: data.id,
            },
            include: {
                animes: true,
            },
            data: {
                ...data,
                animes: data.animes,
            },
        })

        return PrismaWatchlistMapper.toDomain(watchlistPrisma)
    }
}
