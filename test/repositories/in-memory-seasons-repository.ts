import { SeasonsRepository } from '@/domain/application/repositories/seasons-repository'
import { Season } from '@/domain/enterprise/entities/season'

export class InMemorySeasonsRepository implements SeasonsRepository {
  public items: Season[] = []

  async create(season: Season): Promise<void> {
    this.items.push(season)
  }

  async createMany(seasons: Season[]): Promise<void> {
    this.items.push(...seasons)
  }

  async delete(season: Season): Promise<void> {
    const seasonIndex = this.items.findIndex((item) => item.id === season.id)

    this.items.splice(seasonIndex, 1)
  }

  async findBySlug(slug: string): Promise<Season | null> {
    const season = this.items.find((item) => item.slug.value === slug)

    if (!season) {
      return null
    }

    return season
  }

  async findById(id: string) {
    const season = this.items.find((item) => item.id.toString() === id)

    if (!season) {
      return null
    }

    return season
  }

  // async findManyByAnime({ animeId }: FetchSeasonsByAnimeProps) {
  //   const seasons = this.items.filter(
  //     (item) => item.animeId.toString() === animeId && item.season === season,
  //   )

  //   return seasons
  // }
}
