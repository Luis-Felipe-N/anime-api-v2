import { PaginationParams } from 'src/core/types/pagination-params'
import { WatchedEpisode } from 'src/domain/enterprise/entities/watched-episode'

export interface WatchedEpisodesRepository {
  create(watchedEpisodes: WatchedEpisode): Promise<WatchedEpisode>
  save(save: WatchedEpisode): Promise<WatchedEpisode>
  findByEpisodeAndUser(authorId: string, episodeId: string): Promise<WatchedEpisode | null>
  findManyByUserId(authorId: string): Promise<WatchedEpisode[]>
}
