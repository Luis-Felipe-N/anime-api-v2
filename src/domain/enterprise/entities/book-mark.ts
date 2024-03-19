import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface BookMarkProps {
  episodeId: UniqueEntityId
  userId: UniqueEntityId
  duration: number
  createdAt: Date
  updatedAt?: Date
}

export class BookMark extends Entity<BookMarkProps> {
  get episodeId() {
    return this.props.episodeId
  }

  get userId() {
    return this.props.userId
  }

  get duration() {
    return this.props.duration
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

  set duration(duration: number) {
    this.props.duration = duration
    this.touch()
  }

  static create(
    props: Optional<BookMarkProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const bookMark = new BookMark(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return bookMark
  }
}
