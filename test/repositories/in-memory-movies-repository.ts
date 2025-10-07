import { Movie } from 'src/domain/enterprise/entities/movie'
import { MoviesRepository } from 'src/domain/application/repositories/movie.repository'

export class InMemoryMoviesRepository implements MoviesRepository {
  public items: Movie[] = []

  async create(movie: Movie): Promise<void> {
    this.items.push(movie)
  }
}
