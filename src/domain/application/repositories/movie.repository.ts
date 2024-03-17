import { Movie } from '@/domain/enterprise/entities/movie'

export interface MoviesRepository {
  create(movie: Movie): Promise<void>
}
