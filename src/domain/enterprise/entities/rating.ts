import type { Optional } from "../../../core/types/optional"
import { Entity } from "../../../core/entities/entity"
import type { UniqueEntityId } from "../../../core/entities/unique-entity-id"


export interface RatingProps {
  userId: UniqueEntityId
  animeId: UniqueEntityId
  rating: number
  review?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Rating extends Entity<RatingProps> {
  get userId() {
    return this.props.userId
  }

  get animeId() {
    return this.props.animeId
  }

  get rating() {
    return this.props.rating
  }

  get review() {
    return this.props.review
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

  set rating(value: number) {
    // Exemplo de regra de negócio na entidade
    if (value < 1 || value > 5) {
      throw new Error('Rating must be between 1 and 5.')
    }
    this.props.rating = value
    this.touch()
  }

  set review(value: string | null | undefined) {
    this.props.review = value
    this.touch()
  }

  static create(
    props: Optional<RatingProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const rating = new Rating(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return rating
  }
}