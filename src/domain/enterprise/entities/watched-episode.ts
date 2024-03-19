import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface WatchedEpisodeProps {
  episodeId: UniqueEntityId
  userId: UniqueEntityId
  duration: number
  createdAt: Date
  updatedAt?: Date
}

export class WatchedEpisode extends Entity<WatchedEpisodeProps> {
  get episodeId() {
    return this.props.episodeId
  }

  get userId() {
    return this.props.userId
  }

  get duration() {
    return this.props.duration
  }

  set duration(duration: number) {
    this.props.duration = duration
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
