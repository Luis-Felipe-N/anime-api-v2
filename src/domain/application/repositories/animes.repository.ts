import { Anime } from '@/domain/enterprise/entities/Anime'

export interface AnimesRepository {
  create(anime: Anime): Promise<void>
  findBySlug(slug: string): Promise<Anime | null>
  findById(id: string): Promise<Anime | null>
  delete(anime: Anime): Promise<void>
}
