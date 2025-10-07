import { WatchedList } from 'src/core/entities/watched-list'
import { Genre } from './genre'

export class GenreList extends WatchedList<Genre> {
  compareItems(a: Genre, b: Genre): boolean {
    return a.id.toString() === b.id.toString()
  }
}
