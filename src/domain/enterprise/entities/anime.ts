import { Slug } from 'src/core/values-objects/slug'
import { Optional } from 'src/core/types/optional'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Entity } from 'src/core/entities/entity'
import { SeasonList } from './season-list'
import { GenreList } from './genre-list'
import { valideYoutubeVideoId } from 'src/core/uteis/valide-yotube-video-id'

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
    if (
      this.props.genres
        .getItems()
        .find(
          (item) =>
            item.slug.value === 'sem-censura' || item.slug.value === '18',
        )
    )
      return true
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

  get updatedAt() {
    return this.props.updatedAt
  }

  get rating() {
    return this.props.rating
  }

  get excerpt() {
    return this.props.description.slice(0, 120).trimEnd().concat('...')
  }

  get videoIdIsValid() {
    if (!this.props.trailerYtId) return false
    return valideYoutubeVideoId(this.props.trailerYtId)
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
