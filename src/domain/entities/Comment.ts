import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

interface CommentProps {
  authorId: UniqueEntityId
  episodeId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Comment extends Entity<CommentProps> {
  get content() {
    return this.props.content
  }

  static create(
    props: Optional<CommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const comment = new Comment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return comment
  }
}
