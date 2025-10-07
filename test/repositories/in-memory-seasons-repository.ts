import { SeasonsRepository } from 'src/domain/application/repositories/seasons-repository'
import { Season } from 'src/domain/enterprise/entities/season'
import { InMemoryEpisodesRepository } from './in-memory-episodes-repository'

export class InMemorySeasonsRepository implements SeasonsRepository {
  public items: Season[] = []

  constructor(private episodesRepository: InMemoryEpisodesRepository) {}

  async create(season: Season): Promise<void> {
    this.items.push(season)

    this.episodesRepository.createMany(season.episodes.getItems())
  }

  async createMany(seasons: Season[]): Promise<void> {
    this.items.push(...seasons)
  }

  async createFromScrapper(season: Season): Promise<void> {
    this.items.push(season)

    this.episodesRepository.createManyFromScrapper(season.episodes.getItems())
  }

  async createManyFromScrapper(seasons: Season[]): Promise<void> {
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

  async findManyByAnime(animeId: string): Promise<Season[]> {
    const seasons = this.items
      .filter((item) => item.animeId.toString() === animeId)
      .sort(function (o1, o2) {
        return o1.createdAt.getTime() - o2.createdAt.getTime()
      })

    return seasons
  }
}
