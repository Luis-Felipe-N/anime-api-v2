import { Entity } from '@/core/entities/entity'
import { Slug } from '@/core/values-objects/slug'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Episode } from './episode'

export interface SeasonProps {
  title: string
  slug: Slug
  episodes: Episode[]
  createdAt: Date
  updatedAt?: Date
}

export class Season extends Entity<SeasonProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get episodes() {
    return this.props.episodes
  }

  set episodes(episodes: Episode[]) {
    this.props.episodes = episodes
    this.touch()
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

  static create(
    props: Optional<SeasonProps, 'createdAt' | 'slug' | 'episodes'>,
    id?: UniqueEntityId,
  ) {
    const season = new Season(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
        episodes: [],
      },
      id,
    )

    return season
  }
}
