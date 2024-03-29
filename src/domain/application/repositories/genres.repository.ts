import { Genre } from '@/domain/enterprise/entities/genre'

export interface FetchGenresByAnimeProps {
  animeId: string
  season?: number
}

export interface GenresRepository {
  create(genre: Genre): Promise<void>
  createMany(genres: Genre[]): Promise<void>
  delete(genre: Genre): Promise<void>
  findBySlug(slug: string): Promise<Genre | null>
  findById(id: string): Promise<Genre | null>
}
