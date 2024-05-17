import { WatchlistAnimesRepository } from '@/domain/application/repositories/question-animes.repository'
import { WatchlistAnime } from '@/domain/enterprise/entities/watchlist-anime'
import { prisma } from '../prisma/prisma'
import { PrismaWatchlistOnAnimesMapper } from '../mapper/prisma-watchlist-anime-mapper'

export class PrismaWatchlistAnimesRepository
    implements WatchlistAnimesRepository {
    async createMany(watchlists: WatchlistAnime[]): Promise<void> {
        if (watchlists.length === 0) {
            return
        }

        const data = PrismaWatchlistOnAnimesMapper.toPrismaUpdateMany(watchlists)

        await prisma.watchlistOnAnimes.updateMany(data)
    }
}
