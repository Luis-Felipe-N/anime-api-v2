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

  async findBySlug(slug: string): Promise<Episode | null> {
    const episode = this.items.find((item) => item.slug.value === slug)

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
