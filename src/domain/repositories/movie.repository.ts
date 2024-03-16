import { Movie } from '../entities/Movie'

export interface MoviesRepository {
  create(anime: Movie): Promise<void>
}
