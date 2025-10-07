import { WatchedList } from '../../../core/entities/watched-list'
import { Anime } from './anime'

export class AnimeList extends WatchedList<Anime> {
  compareItems(a: Anime, b: Anime): boolean {
    return a.id.toString() === b.id.toString()
  }
}
