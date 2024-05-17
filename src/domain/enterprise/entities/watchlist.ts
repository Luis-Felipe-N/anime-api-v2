import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WatchlistAnimeList } from './watchlist-anime-list'

export interface WatchlistProps {
    userId: UniqueEntityId
    createdAt: Date
    updatedAt?: Date | null
    animes: WatchlistAnimeList
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

    get animes() {
        return this.props.animes
    }

    get animesCount() {
        return this.props.animes.getItems().length
    }

    set animes(animes: WatchlistAnimeList) {
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
                animes: props.animes ?? new WatchlistAnimeList(),
            },
            id,
        )

        return watchlist
    }
}
