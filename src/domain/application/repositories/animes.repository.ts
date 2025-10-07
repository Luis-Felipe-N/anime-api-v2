import { PaginationParams } from '../../../core/types/pagination-params'
import { Anime } from '../../enterprise/entities/anime'

export interface AnimesRepository {
  create(anime: Anime): Promise<void>
  createFromScrapper(anime: Anime): Promise<void>
  save(anime: Anime): Promise<void>
  findBySlug(slug: string): Promise<Anime | null>
  findById(id: string): Promise<Anime | null>
  delete(anime: Anime): Promise<void>
  findManyByGenre(genreSlug: string, params: PaginationParams): Promise<Anime[]>
  findManyByKeyword(keyword: string, params: PaginationParams): Promise<Anime[]>
  findManyPopular(): Promise<Anime[]>
}
