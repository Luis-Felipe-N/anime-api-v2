import { Rating } from '../../../domain/enterprise/entities/rating'

export interface RatingsRepository {
  create(rating: Rating): Promise<void>
  save(rating: Rating): Promise<void>
  findByUserIdAndAnimeId(userId: string, animeId: string): Promise<Rating | null>
  findManyByAnimeId(animeId: string, page: number): Promise<Rating[]>
  delete(rating: Rating): Promise<void>
}