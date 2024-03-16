import { Episode } from '@/domain/enterprise/entities/Episode'

export interface EpisodesRepository {
  create(episode: Episode): Promise<void>
}
