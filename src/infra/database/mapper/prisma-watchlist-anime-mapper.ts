// import { UniqueEntityId } from '@/core/entities/unique-entity-id'
// import { WatchlistAnime } from '@/domain/enterprise/entities/watchlist-anime'
// import { Prisma, WatchlistOnAnimes as PrismaAttachment } from '@prisma/client'

// export class PrismaWatchlistOnAnimesMapper {
//   static toDomain(raw: PrismaAttachment): WatchlistAnime {
//     if (!raw.watchlistId) {
//       throw new Error('Invalid attachment type.')
//     }

//     return WatchlistAnime.create(
//       {
//         animeId: new UniqueEntityId(raw.animeId),
//         watchlistId: new UniqueEntityId(raw.watchlistId),
//       },
//       new UniqueEntityId(raw.animeId),
//     )
//   }

//   static toPrismaUpdateMany(
//     watchlistAnimes: WatchlistAnime[],
//   ): Prisma.WatchlistOnAnimesUpdateManyArgs {
//     const watchlistAnimeIds = watchlistAnimes.map((watchlistAnime) => {
//       return watchlistAnime.animeId.toString()
//     })

//     return {
//       where: {
//         id: {
//           in: watchlistAnimeIds,
//         },
//       },
//       data: {
//         watchlistId: watchlistAnimes[0].watchlistId.toString(),
//         // watchlist: attachments[0].questionId.toString(),
//       },
//     }
//   }
// }
