import { Anime } from '@/domain/enterprise/entities/Anime'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'

export class InMemoryAnimesRepository implements AnimesRepository {
  public items: Anime[] = []

  async create(anime: Anime): Promise<void> {
    this.items.push(anime)
  }

  async findBySlug(slug: string): Promise<Anime | null> {
    const anime = this.items.find((item) => item.slug.value === slug)

    if (!anime) {
      return null
    }

    return anime
  }

  async findById(id: string): Promise<Anime | null> {
    const anime = this.items.find((item) => item.id.toValue() === id)

    if (!anime) {
      return null
    }

    return anime
  }
}
