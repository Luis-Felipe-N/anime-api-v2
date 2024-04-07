import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnimeList } from './anime-list'

export interface WatchlistProps {
  userId: UniqueEntityId
  animes: AnimeList
  createdAt: Date
  updatedAt?: Date
}

export class Watchlist extends Entity<WatchlistProps> {

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set animes(animes: AnimeList) {
    this.props.animes = animes

    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<WatchlistProps, 'createdAt' | 'animes'>,
    id?: UniqueEntityId,
  ) {
    const watchlist = new Watchlist(
      {
        ...props,
        createdAt: new Date(),
        animes: props.animes ?? new AnimeList()
      },
      id,
    )

    return watchlist
  }
}
