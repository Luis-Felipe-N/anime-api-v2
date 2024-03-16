import { Anime } from '../entities/Anime'

export interface AnimesRepository {
  create(anime: Anime): Promise<void>
}
