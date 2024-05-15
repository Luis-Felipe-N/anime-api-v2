import { Entity } from '@/core/entities/entity'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface WatchlistAnimeProps {
  watchlistId: UniqueEntityId
  animeId: UniqueEntityId
}

export class WatchlistAnime extends Entity<WatchlistAnimeProps> {
  get watchlistId() {
    return this.props.watchlistId
  }

  get animeId() {
    return this.props.animeId
  }

  static create(props: WatchlistAnimeProps, id?: UniqueEntityId) {
    const watchlistAnime = new WatchlistAnime(props, id)

    return watchlistAnime
  }
}
