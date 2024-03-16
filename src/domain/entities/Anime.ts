import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'
import { Slug } from '../values-objects/slug'

interface AnimeProps {
  title: string
  description: string
  slug: Slug
  banner: string
  cover: string
  createdAt: Date
}

export class Anime extends Entity<AnimeProps> {
  get title() {
    return this.props.title
  }

  static create(props: Optional<AnimeProps, 'createdAt'>, id?: UniqueEntityId) {
    const anime = new Anime(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return anime
  }
}
