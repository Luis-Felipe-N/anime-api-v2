import { Anime } from '@/domain/enterprise/entities/Anime'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'

export class InMemoryAnimesRepository implements AnimesRepository {
  public items: Anime[] = []

  async create(anime: Anime): Promise<void> {
    this.items.push(anime)
  }

  async findBySlug(slug: string): Promise<Anime | null> {
    const anime = this.items.find((item) => item.slug.value === slug)
    console.log(this.items)
    if (!anime) {
      return null
    }

    return anime
  }
}
