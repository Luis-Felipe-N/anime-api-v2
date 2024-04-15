import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Watchlist } from '@/domain/enterprise/entities/watchlist'
import { Prisma, Watchlist as PrismaWatchlist } from '@prisma/client'

export class PrismaWatchlistMapper {
  static toDomain(raw: PrismaWatchlist): Watchlist {
    return Watchlist.create(
      {
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Watchlist): Prisma.WatchlistUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      userId: raw.userId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}
