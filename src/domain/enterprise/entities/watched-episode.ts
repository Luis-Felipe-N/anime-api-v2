import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Episode, User } from '@prisma/client'

export interface WatchedEpisodeProps {
  episodeId: UniqueEntityId
  authorId: UniqueEntityId
  stopAt: number
  createdAt: Date
  updatedAt?: Date | null
  episode?: Episode | null
  author?: User | null
}

export class WatchedEpisode extends Entity<WatchedEpisodeProps> {
  get episodeId() {
    return this.props.episodeId
  }

  get authorId() {
    return this.props.authorId
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

  get episode() {
    return this.props.episode
  }

  get author() {
    return this.props.author
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<WatchedEpisodeProps, 'createdAt' | 'author' | 'episode'>,
    id?: UniqueEntityId,
  ) {
    const watchedEpisode = new WatchedEpisode(
      {
        ...props,
        createdAt: new Date(),
        episode: props.episode ?? null,
        author: props.author ?? null
      },
      id,
    )

    return watchedEpisode
  }
}
