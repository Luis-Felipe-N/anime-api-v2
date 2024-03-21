import { Slug } from '@/core/values-objects/slug'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { SeasonList } from './season-list'

enum EpisodeType {
  CRUNCHYROLL = 'CRUNCHYROLL',
  ANIMESONLINE = 'ANIMESONLINE',
}

export interface AnimeProps {
  title: string
  type: EpisodeType
  description: string
  slug: Slug
  banner: string | null
  cover: string | null
  nsfw: boolean
  trailerYtId: string | null
  authorId: UniqueEntityId
  seasons: SeasonList
  createdAt: Date
  updatedAt: Date | null
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

  get seasons() {
    return this.props.seasons
  }

  get createdAt() {
    return this.props.createdAt
  }

  get excerpt() {
    return this.props.description.slice(0, 120).trimEnd().concat('...')
  }

  set seasons(seasons: SeasonList) {
    this.props.seasons = seasons
  }

  static create(
    props: Optional<AnimeProps, 'createdAt' | 'slug' | 'seasons'>,
    id?: UniqueEntityId,
  ) {
    const anime = new Anime(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
        seasons: props.seasons ?? new SeasonList(),
      },
      id,
    )

    return anime
  }
}
