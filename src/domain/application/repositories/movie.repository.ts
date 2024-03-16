import { Movie } from '@/domain/enterprise/entities/Movie'

export interface MoviesRepository {
  create(movie: Movie): Promise<void>
}
