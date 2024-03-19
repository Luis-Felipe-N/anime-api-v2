import { Season } from '@/domain/enterprise/entities/season'

export interface FetchSeasonsByAnimeProps {
  animeId: string
  season?: number
}

export interface SeasonsRepository {
  create(season: Season): Promise<void>
  createMany(seasons: Season[]): Promise<void>
  delete(season: Season): Promise<void>
  findBySlug(slug: string): Promise<Season | null>
  findById(id: string): Promise<Season | null>
}
