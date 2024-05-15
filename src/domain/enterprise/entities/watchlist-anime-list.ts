import { WatchedList } from '@/core/entities/watched-list'
import { WatchlistAnime } from './watchlist-anime'

export class WatchlistAnimeList extends WatchedList<WatchlistAnime> {
  compareItems(a: WatchlistAnime, b: WatchlistAnime): boolean {
    return a.id.toString() === b.id.toString()
  }
}
