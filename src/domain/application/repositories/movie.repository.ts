import { Movie } from '../../enterprise/entities/movie'

export interface MoviesRepository {
  create(movie: Movie): Promise<void>
}
