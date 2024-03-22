import { PaginationParams } from '@/core/types/pagination-params'
import { Episode } from '@/domain/enterprise/entities/episode'

export interface EpisodesRepository {
  create(episode: Episode): Promise<void>
  createMany(episodes: Episode[]): Promise<void>
  delete(episode: Episode): Promise<void>
  findBySlug(slug: string): Promise<Episode | null>
  findById(id: string): Promise<Episode | null>
  findByIndex(seasonId: string, episodeIndex: number): Promise<Episode | null>
  findManyBySeason(
    seasonId: string,
    params: PaginationParams,
  ): Promise<Episode[]>
}
