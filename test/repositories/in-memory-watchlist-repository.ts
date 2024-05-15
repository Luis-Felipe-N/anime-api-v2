// import { UniqueEntityId } from "@/core/entities/unique-entity-id"
// import { WatchlistsRepository } from "@/domain/application/repositories/watchlist"
// // import { Watchlist } from "@/domain/enterprise/entities/watchlist"


// export class InMemoryWatchlistsRepository implements WatchlistsRepository {
//   public items: Watchlist[] = []

//   async create(watchlist: Watchlist) {
//     this.items.push(watchlist)

//     return watchlist
//   }


//   async save(watchlist: Watchlist) {
//     const watchlistIndex = this.items.findIndex((item) => item.id === watchlist.id)

//     this.items[watchlistIndex] = watchlist

//     return watchlist
//   }

//   async findById(id: string) {
//     const watchlistMemory = this.items.find((watchlist) => id === watchlist.id.toString())

//     if (!watchlistMemory) {
//       return null
//     }

//     return watchlistMemory
//   }

//   async findByUserId(userId: string) {
//     const watchlistMemory = this.items.find((watchlist) => userId === watchlist.userId.toString())

//     if (!watchlistMemory) {
//       return null
//     }

//     return watchlistMemory
//   }

//   async findByUserIdOrCreate(userId: string) {
//     const watchlistMemory = this.items.find((watchlist) => userId === watchlist.userId.toString())

//     if (!watchlistMemory) {

//       const watchlist = await this.create(Watchlist.create({
//         userId: new UniqueEntityId(userId),
//       }))

//       return watchlist
//     }

//     return watchlistMemory
//   }
// }
