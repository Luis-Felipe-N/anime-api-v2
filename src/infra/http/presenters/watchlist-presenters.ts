import { Watchlist } from '@/domain/enterprise/entities/watchlist'
import { AnimePresenter } from './anime-presenters'

// export interface UserProps {
//   name: string
//   email: string
//   password_hash: string
//   role: Type

//   // watchedepisodes Watched[]
//   // comments        Comment[]
// }

export class WatchlistPresenter {
  static toHTTP(watchlist: Watchlist) {

    return {
      id: watchlist.id.toString(),
      userId: watchlist.userId.toString(),
      // animes: watchlist.animes.getItems().map(AnimePresenter.toHTTP),
      createdAt: watchlist.createdAt,
      updatedAt: watchlist.updatedAt,
    }
  }
}
