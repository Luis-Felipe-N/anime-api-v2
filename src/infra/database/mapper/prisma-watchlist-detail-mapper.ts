import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnimeList } from '@/domain/enterprise/entities/anime-list'

import { Watchlist } from '@/domain/enterprise/entities/watchlist'
import {
    Watchlist as PrismaWatchlist,
    Anime as PrismaAnime,
} from '@prisma/client'
import { PrismaAnimeMapper } from './prisma-anime-mapper'
import { WatchlistAnimeList } from '@/domain/enterprise/entities/watchlist-anime-list'
import { PrismaWatchlistMapper } from './prisma-watchlist-mapper'
import { PrismaWatchlistOnAnimesMapper } from './prisma-watchlist-anime-mapper'
import { Anime } from '@/domain/enterprise/entities/anime'

type PrismaWatchlistDetail = PrismaWatchlist & {
    animes: PrismaAnime[]
}

export class PrismaWatchlistDetailMapper {
    static toDomain(raw: PrismaWatchlistDetail): Watchlist {
        const animes = raw.animes.map(PrismaAnimeMapper.toDomain)
        return Watchlist.create(
            {
                userId: new UniqueEntityId(raw.userId),
                animes: new AnimeList(animes),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityId(raw.id),
        )
    }
}
