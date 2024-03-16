import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'

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
}
