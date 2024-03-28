import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from '@/core/values-objects/slug'

import dayjs from 'dayjs'

export const Type: {
  CRUNCHYROLL: 'CRUNCHYROLL'
  ANIMESONLINE: 'ANIMESONLINE'
} = {
  CRUNCHYROLL: 'CRUNCHYROLL',
  ANIMESONLINE: 'ANIMESONLINE',
}

export type Type = (typeof Type)[keyof typeof Type]

export interface EpisodeProps {
  seasonId: UniqueEntityId
  index: number
  type: Type
  slug: Slug
  title: string
  description: string | null
  cover: string
  video: string
  duration: number
  createdAt: Date
}

export class Episode extends Entity<EpisodeProps> {
  get title() {
    return this.props.title
  }

  get index() {
    return this.props.index
  }

  get seasonId() {
    return this.props.seasonId
  }

  get description() {
    return this.props.description
  }

  get cover() {
    return this.props.cover
  }

  get video() {
    return this.props.video
  }

  get duration() {
    return this.props.duration
  }

  get createdAt() {
    return this.props.createdAt
  }

  get slug() {
    return this.props.slug
  }

  get type() {
    return this.props.type
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    if (this.props.description) {
      return this.props.description.slice(0, 80).trimEnd().concat('...')
    }
  }

  static create(
    props: Optional<EpisodeProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const episode = new Episode(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return episode
  }
}
