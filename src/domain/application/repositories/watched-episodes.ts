import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'

export interface WatchedEpisodesRepository {
  create(watchedEpisodes: WatchedEpisode): Promise<void>
}
