import { Episode } from '../entities/Episode'

export interface EpisodesRepository {
  create(Episode: Episode): Promise<void>
}
