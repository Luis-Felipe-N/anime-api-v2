import { Entity } from 'src/core/entities/entity'
import { Slug } from 'src/core/values-objects/slug'
import { Optional } from 'src/core/types/optional'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export interface GenreProps {
  animeId: UniqueEntityId
  title: string
  slug: Slug
}

export class Genre extends Entity<GenreProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get animeId() {
    return this.props.animeId
  }

  static create(props: Optional<GenreProps, 'slug'>, id?: UniqueEntityId) {
    const genre = new Genre(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id,
    )

    return genre
  }
}
