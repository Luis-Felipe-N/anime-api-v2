import { Entity } from '@/core/entities/entity'
import { Slug } from '@/core/values-objects/slug'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AnimeProps {
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

  get description() {
    return this.props.description
  }

  get slug() {
    return this.props.slug
  }

  get banner() {
    return this.props.banner
  }

  get cover() {
    return this.props.cover
  }

  get createdAt() {
    return this.props.createdAt
  }

  get excerpt() {
    return this.props.description.slice(0, 120).trimEnd().concat('...')
  }

  static create(
    props: Optional<AnimeProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const anime = new Anime(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return anime
  }
}
