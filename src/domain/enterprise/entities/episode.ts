import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from '@/core/values-objects/slug'

import dayjs from 'dayjs'

export interface EpisodeProps {
  animeId: UniqueEntityId
  index: number
  season: number
  slug: Slug
  title: string
  description: string
  cover: string
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

  get season() {
    return this.props.season
  }

  get description() {
    return this.props.description
  }

  get cover() {
    return this.props.cover
  }

  get duration() {
    return this.props.duration
  }

  get createdAt() {
    return this.props.createdAt
  }

  get animeId() {
    return this.props.animeId
  }

  get slug() {
    return this.props.slug
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.props.description.slice(0, 80).trimEnd().concat('...')
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
