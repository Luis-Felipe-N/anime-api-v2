import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface WatchedEpisodeProps {
  episodeId: UniqueEntityId
  userId: UniqueEntityId
  stopAt: number
  createdAt: Date
  updatedAt?: Date | null
}

export class WatchedEpisode extends Entity<WatchedEpisodeProps> {
  get episodeId() {
    return this.props.episodeId
  }

  get userId() {
    return this.props.userId
  }

  get stopAt() {
    return this.props.stopAt
  }

  set stopAt(stopAt: number) {
    this.props.stopAt = stopAt
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<WatchedEpisodeProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const watchedEpisode = new WatchedEpisode(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return watchedEpisode
  }
}
