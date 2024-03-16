import { Movie } from '@/domain/enterprise/entities/Movie'
import { MoviesRepository } from '@/domain/application/repositories/movie.repository'

export class InMemoryMoviesRepository implements MoviesRepository {
  public items: Movie[] = []

  async create(movie: Movie): Promise<void> {
    this.items.push(movie)
  }
}
