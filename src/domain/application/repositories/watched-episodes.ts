import { WatchedEpisode } from '@/domain/enterprise/entities/watched-episode'

export interface WatchedEpisodesRepository {
  create(watchedEpisodes: WatchedEpisode): Promise<WatchedEpisode>
  save(save: WatchedEpisode): Promise<WatchedEpisode>
  findByEpisodeAndUser(authorId: string, episodeId: string): Promise<WatchedEpisode | null>
}
