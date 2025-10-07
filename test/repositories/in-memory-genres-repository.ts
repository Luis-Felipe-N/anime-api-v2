import { Genre } from 'src/domain/enterprise/entities/genre'
import { GenresRepository } from 'src/domain/application/repositories/genres.repository'

export class InMemoryGenresRepository implements GenresRepository {
  public items: Genre[] = []

  async create(genre: Genre): Promise<void> {
    this.items.push(genre)
  }

  async createMany(genres: Genre[]): Promise<void> {
    this.items.push(...genres)
  }

  async createFromScrapper(genre: Genre): Promise<void> {
    this.items.push(genre)
  }

  async createManyFromScrapper(genres: Genre[]): Promise<void> {
    this.items.push(...genres)
  }

  async delete(genre: Genre): Promise<void> {
    const genreIndex = this.items.findIndex((item) => item.id === genre.id)

    this.items.splice(genreIndex, 1)
  }

  async findBySlug(slug: string, animeId: string): Promise<Genre | null> {
    const genre = this.items.find(
      (item) => item.slug.value === slug && item.animeId.toString() === animeId,
    )

    if (!genre) {
      return null
    }

    return genre
  }

  async findById(id: string): Promise<Genre | null> {
    const genre = this.items.find((item) => item.id.toString() === id)

    if (!genre) {
      return null
    }

    return genre
  }
}
