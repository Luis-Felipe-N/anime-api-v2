import { WatchedList } from '@/core/entities/watched-list'
import { Episode } from './episode'

export class EpisodeList extends WatchedList<Episode> {
  compareItems(a: Episode, b: Episode): boolean {
    return a.id.toString() === b.id.toString()
  }
}
