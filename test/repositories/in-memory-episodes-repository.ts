import { Episode } from '@/domain/enterprise/entities/episode'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'

export class InMemoryEpisodesRepository implements EpisodesRepository {
  public items: Episode[] = []

  async create(episode: Episode): Promise<void> {
    this.items.push(episode)
  }

  async createMany(episodes: Episode[]): Promise<void> {
    this.items.push(...episodes)
  }

  async createFromScrapper(episode: Episode): Promise<void> {
    this.items.push(episode)
  }

  async createManyFromScrapper(episodes: Episode[]): Promise<void> {
    this.items.push(...episodes)
  }

  async delete(episode: Episode): Promise<void> {
    const episodeIndex = this.items.findIndex((item) => item.id === episode.id)

    this.items.splice(episodeIndex, 1)
  }

  async findBySlug(slug: string): Promise<Episode | null> {
    const episode = this.items.find((item) => item.slug.value === slug)

    if (!episode) {
      return null
    }

    return episode
  }

  async findById(id: string) {
    const episode = this.items.find((item) => item.id.toString() === id)

    if (!episode) {
      return null
    }

    return episode
  }

  async findByIndex(seasonId: string, episodeIndex: number) {
    const episode = this.items.find(
      (item) =>
        item.index === episodeIndex &&
        item.seasonId.toString() === seasonId.toString(),
    )

    if (!episode) return null

    return episode
  }

  async findManyBySeason(seasonId: string) {
    const episodes = this.items.filter(
      (item) => item.seasonId.toString() === seasonId,
    )

    return episodes
  }
}
