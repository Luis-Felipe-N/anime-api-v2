import { Episode } from '@/domain/enterprise/entities/Episode'
import { EpisodesRepository } from '@/domain/application/repositories/episode.repository'

export class InMemoryEpisodesRepository implements EpisodesRepository {
  public items: Episode[] = []

  async create(episode: Episode): Promise<void> {
    this.items.push(episode)
  }
}
