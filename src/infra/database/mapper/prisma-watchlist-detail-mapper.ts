// import { UniqueEntityId } from '@/core/entities/unique-entity-id'
// import { AnimeList } from '@/domain/enterprise/entities/anime-list'

// import { Watchlist } from '@/domain/enterprise/entities/watchlist'
// import {
//   Watchlist as PrismaWatchlist,
//   Anime as PrismaAnime,
// } from '@prisma/client'
// import { PrismaAnimeMapper } from './prisma-anime-mapper'

// type PrismaWatchlistDetail = PrismaWatchlist & {
//   animes: PrismaAnime[]
// }

// export class PrismaWatchlistDetailMapper {
//   static toDomain(raw: PrismaWatchlistDetail): Watchlist {
//     return Watchlist.create(
//       {
//         userId: new UniqueEntityId(raw.userId),
//         animes: new AnimeList(raw.animes.map(PrismaAnimeMapper.toDomain)),
//         createdAt: raw.createdAt,
//         updatedAt: raw.updatedAt,
//       },
//       new UniqueEntityId(raw.id),
//     )
//   }
// }
