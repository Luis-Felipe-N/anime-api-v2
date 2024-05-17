import { Either, failure, success } from '@/core/either'
import { Watchlist } from '@/domain/enterprise/entities/watchlist'
import { UsersRepository } from '../repositories/users-repository'
import { WatchlistsRepository } from '../repositories/watchlist'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WatchlistAnimeList } from '@/domain/enterprise/entities/watchlist-anime-list'
import { WatchlistAnime } from '@/domain/enterprise/entities/watchlist-anime'

interface AnimeOnWatchlistUseCaseRequest {
    userId: string
    animesIds: string[]
}

type AnimeOnWatchlistUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        watchlist: Watchlist
    }
>

export class AnimeOnWatchlistUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private watchlistRepository: WatchlistsRepository,
    ) { }

    async execute({
        userId,
        animesIds,
    }: AnimeOnWatchlistUseCaseRequest): Promise<AnimeOnWatchlistUseCaseResponse> {
        const user = this.usersRepository.findById(userId)

        if (!user) {
            return failure(new ResourceNotFoundError())
        }

        const watchlist =
            await this.watchlistRepository.findByUserIdOrCreate(userId)

        const watchlistAnimes = animesIds.map((animeId) => {
            return WatchlistAnime.create({
                watchlistId: watchlist.id,
                animeId: new UniqueEntityId(animeId),
            })
        })

        watchlist.animes = new WatchlistAnimeList(watchlistAnimes)

        const watchlistSaved = await this.watchlistRepository.save(watchlist)

        return success({ watchlist: watchlistSaved })
    }
}
