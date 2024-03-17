import { Episode } from '@/domain/enterprise/entities/Episode'
import {
  EpisodesRepository,
  FetchEpisodesByAnimeProps,
} from '@/domain/application/repositories/episode.repository'

export class InMemoryEpisodesRepository implements EpisodesRepository {
  public items: Episode[] = []

  async create(episode: Episode): Promise<void> {
    this.items.push(episode)
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
    const episode = this.items.find((item) => item.id.toValue() === id)

    if (!episode) {
      return null
    }

    return episode
  }

  async fetchEpisodesByAnime({
    animeId,
    season = 1,
  }: FetchEpisodesByAnimeProps) {
    const episodes = this.items.filter(
      (item) => item.animeId.toValue() === animeId && item.season === season,
    )

    return episodes
  }
}
