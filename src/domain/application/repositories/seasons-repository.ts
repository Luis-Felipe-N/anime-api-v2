import { Season } from '../../enterprise/entities/season'

export interface FetchSeasonsByAnimeProps {
  animeId: string
  season?: number
}

export interface SeasonsRepository {
  create(season: Season): Promise<void>
  createMany(seasons: Season[]): Promise<void>
  createFromScrapper(season: Season, animeId: string): Promise<void>
  createManyFromScrapper(seasons: Season[], animeId: string): Promise<void>
  delete(season: Season): Promise<void>
  findBySlug(slug: string): Promise<Season | null>
  findById(id: string): Promise<Season | null>
  findManyByAnime(animeId: string): Promise<Season[]>
}
