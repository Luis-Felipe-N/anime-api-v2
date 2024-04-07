import { Either, failure, success } from '@/core/either'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Watchlist } from '@/domain/enterprise/entities/watchlist'
import { UsersRepository } from '../repositories/users-repository'
import { WatchlistsRepository } from '../repositories/watchlist'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AddOnWatchlistRequest {
  userId: string
  animeId: string
}

type AddOnWatchlistResponse = Either<
  ResourceNotFoundError,
  {
    watchlist: Watchlist
  }
>

export class AddOnWatchlist {
  constructor(
    private usersRepository: UsersRepository,
    private watchlistRepository: WatchlistsRepository,
    private animesRepository: AnimesRepository
  ) {}

  async execute({
    userId,
    animeId
  }: AddOnWatchlistRequest): Promise<AddOnWatchlistResponse> {
    const user = this.usersRepository.findById(userId)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const anime = await this.animesRepository.findById(animeId)

    if (!anime) {
      return failure(new ResourceNotFoundError())
    }

    let watchlist = await this.watchlistRepository.findByUserIdOrCreate(userId)

    watchlist.animes.add(anime)

    await this.watchlistRepository.save(watchlist)

    return success({ watchlist })
  }
}
