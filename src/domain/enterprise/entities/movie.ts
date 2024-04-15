import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from '@/core/values-objects/slug'

interface MovieProps {
  title: string
  description: string
  slug: Slug
  banner: string
  cover: string
  createdAt: Date
  duration: number
}

export class Movie extends Entity<MovieProps> {
  static create(props: Optional<MovieProps, 'createdAt'>, id?: UniqueEntityId) {
    const episode = new Movie(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return episode
  }
}
