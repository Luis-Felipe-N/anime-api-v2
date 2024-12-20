import { WatchlistAnime } from '@/domain/enterprise/entities/watchlist-anime'

export abstract class WatchlistAnimesRepository {
  abstract createMany(animes: WatchlistAnime[]): Promise<void>
  // abstract deleteMany(animes: WatchlistAnime[]): Promise<void>
}
