import { Slug } from '@/core/values-objects/slug'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { SeasonList } from './season-list'
import { GenreList } from './genre-list'

export interface AnimeProps {
  title: string
  description: string
  slug: Slug
  seasons: SeasonList
  genres: GenreList
  banner: string | null
  cover: string | null
  nsfw: boolean
  trailerYtId: string | null
  createdAt: Date
  updatedAt?: Date | null
  rating: number
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

  get nsfw() {
    return this.props.nsfw
  }

  get trailerYtId() {
    return this.props.trailerYtId
  }

  get seasons() {
    return this.props.seasons
  }

  get genres() {
    return this.props.genres
  }

  get createdAt() {
    return this.props.createdAt
  }

  get rating() {
    return this.props.rating
  }

  get excerpt() {
    return this.props.description.slice(0, 120).trimEnd().concat('...')
  }

  set seasons(seasons: SeasonList) {
    this.props.seasons = seasons

    this.touch()
  }

  set genres(genres: GenreList) {
    this.props.genres = genres

    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AnimeProps, 'createdAt' | 'slug' | 'seasons' | 'genres'>,
    id?: UniqueEntityId,
  ) {
    const anime = new Anime(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
        seasons: props.seasons ?? new SeasonList(),
        genres: props.genres ?? new GenreList(),
      },
      id,
    )

    return anime
  }
}
