import { AnimeGenres } from '@/domain/enterprise/entities/anime-genres'

export interface AnimeGenresRepository {
  create(genre: AnimeGenres): Promise<void>
  createMany(genres: AnimeGenres[]): Promise<void>
  delete(genre: AnimeGenres): Promise<void>
  findBySlug(slug: string): Promise<AnimeGenres | null>
  findById(id: string): Promise<AnimeGenres | null>
  findManyByAnime(animeId: string): Promise<AnimeGenres | null>
}
