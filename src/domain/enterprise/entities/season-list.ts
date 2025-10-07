import { WatchedList } from 'src/core/entities/watched-list'
import { Season } from './season'

export class SeasonList extends WatchedList<Season> {
  compareItems(a: Season, b: Season): boolean {
    return a.id.toString() === b.id.toString()
  }
}
