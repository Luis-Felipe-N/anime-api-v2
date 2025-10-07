import { PaginationParams } from '../../../core/types/pagination-params'
import { Episode } from '../../enterprise/entities/episode'

export interface EpisodesRepository {
  create(episode: Episode): Promise<void>
  createMany(episodes: Episode[]): Promise<void>
  createFromScrapper(episode: Episode, seasonId: string): Promise<void>
  createManyFromScrapper(episodes: Episode[], seasonId: string): Promise<void>
  delete(episode: Episode): Promise<void>
  findBySlug(slug: string): Promise<Episode | null>
  findById(id: string): Promise<Episode | null>
  findByIndex(seasonId: string, episodeIndex: number): Promise<Episode | null>
  findManyBySeason(
    seasonId: string,
    params: PaginationParams,
  ): Promise<Episode[]>
}
