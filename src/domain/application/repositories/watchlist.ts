import { Watchlist } from 'src/domain/enterprise/entities/watchlist'

export interface WatchlistsRepository {
    create(watchlist: Watchlist): Promise<Watchlist>
    save(watchlist: Watchlist): Promise<Watchlist>
    findById(id: string): Promise<Watchlist | null>
    findByUserId(userId: string): Promise<Watchlist | null>
    findByUserIdOrCreate(userId: string): Promise<Watchlist>
}
