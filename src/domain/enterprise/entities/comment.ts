import { Entity } from '../../../core/entities/entity'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'
import { User } from './user'

export interface CommentProps {
  authorId: UniqueEntityId
  parentId?: UniqueEntityId | null
  episodeId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date | null
  author?: User | null
}

export class Comment extends Entity<CommentProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get parentId() {
    return this.props.parentId
  }

  get episodeId() {
    return this.props.episodeId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get author() {
    return this.props.author
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<CommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const comment = new Comment(
      {
        ...props,
        createdAt: new Date(),
        author: props.author ?? null
      },
      id,
    )

    return comment
  }
}
